// Music Player with Howler.js
class MusicPlayer {
    constructor() {
        this.currentSound = null;
        this.currentTrack = null;
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 0;
        this.volume = 0.6;
        this.playlist = [];
        this.currentTrackIndex = 0;
        this.isRepeat = false;
        this.isShuffle = false;
        this.isLoading = false;
        
        this.initializePlayer();
    }

    initializePlayer() {
        // Cache DOM elements
        this.playerElement = document.getElementById('musicPlayer');
        this.playPauseBtn = document.querySelector('.play-pause-btn');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.shuffleBtn = document.querySelector('.shuffle-btn');
        this.repeatBtn = document.querySelector('.repeat-btn');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.progressBar = document.querySelector('.progress-bar');
        this.currentTimeDisplay = document.querySelector('.current-time');
        this.totalTimeDisplay = document.querySelector('.total-time');
        this.trackNameDisplay = document.querySelector('.player-track-name');
        this.artistNameDisplay = document.querySelector('.player-artist-name');
        this.albumCoverDisplay = document.querySelector('.player-album-cover');
        this.likeBtn = document.querySelector('.like-btn');
        this.volumeBtn = document.querySelector('.volume-btn');
        this.queueBtn = document.querySelector('.queue-btn');

        // Bind events
        this.bindEvents();
        
        // Set initial volume
        this.setVolume(this.volume);
        
        console.log('Music Player initialized with Howler.js');
    }

    bindEvents() {
        // Play/Pause button
        if (this.playPauseBtn) {
            this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        }

        // Previous/Next buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.playPrevious());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.playNext());
        }

        // Shuffle and Repeat buttons
        if (this.shuffleBtn) {
            this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
        }
        if (this.repeatBtn) {
            this.repeatBtn.addEventListener('click', () => this.toggleRepeat());
        }

        // Volume control
        if (this.volumeSlider) {
            this.volumeSlider.addEventListener('input', (e) => {
                this.setVolume(e.target.value / 100);
            });
        }

        // Volume mute/unmute
        if (this.volumeBtn) {
            this.volumeBtn.addEventListener('click', () => this.toggleMute());
        }

        // Progress bar click
        if (this.progressBar && this.progressBar.parentElement) {
            this.progressBar.parentElement.addEventListener('click', (e) => {
                this.seek(e);
            });
        }

        // Like button
        if (this.likeBtn) {
            this.likeBtn.addEventListener('click', () => this.toggleLike());
        }

        // Queue button
        if (this.queueBtn) {
            this.queueBtn.addEventListener('click', () => this.showQueue());
        }

        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName.toLowerCase() !== 'input') {
                switch(e.code) {
                    case 'Space':
                        e.preventDefault();
                        this.togglePlayPause();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.skipBackward();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.skipForward();
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        this.volumeUp();
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        this.volumeDown();
                        break;
                }
            }
        });
    }

    loadTrack(track) {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.updatePlayPauseButton('loading');
        
        // Stop current track if playing
        if (this.currentSound) {
            this.currentSound.stop();
            this.currentSound.unload();
        }

        this.currentTrack = track;
        
        // Create new Howl instance
        this.currentSound = new Howl({
            src: [track.url],
            format: track.format || ['mp3', 'wav', 'ogg'],
            volume: this.volume,
            onload: () => {
                this.isLoading = false;
                this.duration = this.currentSound.duration();
                this.updateTrackInfo();
                this.updateTimeDisplay();
                this.showPlayer();
                console.log('Track loaded:', track.name);
            },
            onloaderror: (id, error) => {
                this.isLoading = false;
                console.error('Error loading track:', error);
                this.showError('Erro ao carregar música');
                this.updatePlayPauseButton('play');
            },
            onplay: () => {
                this.isPlaying = true;
                this.updatePlayPauseButton('pause');
                this.startProgressUpdate();
            },
            onpause: () => {
                this.isPlaying = false;
                this.updatePlayPauseButton('play');
                this.stopProgressUpdate();
            },
            onstop: () => {
                this.isPlaying = false;
                this.updatePlayPauseButton('play');
                this.stopProgressUpdate();
                this.resetProgress();
            },
            onend: () => {
                this.isPlaying = false;
                this.updatePlayPauseButton('play');
                this.stopProgressUpdate();
                this.handleTrackEnd();
            }
        });
    }

    play() {
        if (!this.currentSound) return;
        
        if (this.isLoading) {
            setTimeout(() => this.play(), 100);
            return;
        }
        
        this.currentSound.play();
    }

    pause() {
        if (this.currentSound) {
            this.currentSound.pause();
        }
    }

    togglePlayPause() {
        if (!this.currentSound) {
            // Load first track if available
            if (this.playlist.length > 0) {
                this.loadTrack(this.playlist[0]);
                return;
            }
            // Or load demo track
            this.loadDemoTrack();
            return;
        }

        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    loadDemoTrack() {
        const demoTrack = {
            id: 'demo-1',
            name: 'Música de Demonstração',
            artist: 'Artista Demo',
            album: 'Álbum Demo',
            url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
            format: ['wav'],
            cover: 'https://via.placeholder.com/300x300?text=Demo+Album',
            duration: 30
        };
        this.loadTrack(demoTrack);
    }

    playNext() {
        if (this.playlist.length === 0) return;
        
        let nextIndex;
        if (this.isShuffle) {
            nextIndex = Math.floor(Math.random() * this.playlist.length);
        } else {
            nextIndex = (this.currentTrackIndex + 1) % this.playlist.length;
        }
        
        this.currentTrackIndex = nextIndex;
        this.loadTrack(this.playlist[nextIndex]);
    }

    playPrevious() {
        if (this.playlist.length === 0) return;
        
        let prevIndex;
        if (this.isShuffle) {
            prevIndex = Math.floor(Math.random() * this.playlist.length);
        } else {
            prevIndex = this.currentTrackIndex === 0 ? 
                       this.playlist.length - 1 : 
                       this.currentTrackIndex - 1;
        }
        
        this.currentTrackIndex = prevIndex;
        this.loadTrack(this.playlist[prevIndex]);
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        
        if (this.currentSound) {
            this.currentSound.volume(this.volume);
        }
        
        if (this.volumeSlider) {
            this.volumeSlider.value = this.volume * 100;
        }
        
        this.updateVolumeIcon();
    }

    toggleMute() {
        if (this.volume > 0) {
            this.previousVolume = this.volume;
            this.setVolume(0);
        } else {
            this.setVolume(this.previousVolume || 0.7);
        }
    }

    volumeUp() {
        this.setVolume(this.volume + 0.1);
    }

    volumeDown() {
        this.setVolume(this.volume - 0.1);
    }

    seek(event) {
        if (!this.currentSound || this.duration === 0) return;
        
        const progressContainer = event.currentTarget;
        const rect = progressContainer.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const percentage = x / rect.width;
        const seekTime = percentage * this.duration;
        
        this.currentSound.seek(seekTime);
        this.updateProgressBar(percentage);
    }

    skipForward() {
        if (!this.currentSound) return;
        const currentTime = this.currentSound.seek();
        this.currentSound.seek(Math.min(currentTime + 10, this.duration));
    }

    skipBackward() {
        if (!this.currentSound) return;
        const currentTime = this.currentSound.seek();
        this.currentSound.seek(Math.max(currentTime - 10, 0));
    }

    toggleShuffle() {
        this.isShuffle = !this.isShuffle;
        this.shuffleBtn.classList.toggle('active', this.isShuffle);
        this.shuffleBtn.style.color = this.isShuffle ? '#1DB954' : '';
    }

    toggleRepeat() {
        this.isRepeat = !this.isRepeat;
        this.repeatBtn.classList.toggle('active', this.isRepeat);
        this.repeatBtn.style.color = this.isRepeat ? '#1DB954' : '';
    }

    toggleLike() {
        if (!this.currentTrack) return;
        
        const icon = this.likeBtn.querySelector('i');
        const isLiked = icon.classList.contains('fas');
        
        if (isLiked) {
            icon.classList.remove('fas');
            icon.classList.add('far');
            this.likeBtn.style.color = '';
        } else {
            icon.classList.remove('far');
            icon.classList.add('fas');
            this.likeBtn.style.color = '#1DB954';
        }
        
        // TODO: Send like status to server
        console.log('Track liked:', !isLiked);
    }

    updateTrackInfo() {
        if (!this.currentTrack) return;
        
        if (this.trackNameDisplay) {
            this.trackNameDisplay.textContent = this.currentTrack.name;
        }
        if (this.artistNameDisplay) {
            this.artistNameDisplay.textContent = this.currentTrack.artist;
        }
        if (this.albumCoverDisplay) {
            this.albumCoverDisplay.src = this.currentTrack.cover || 'https://via.placeholder.com/60x60?text=♪';
        }
    }

    updatePlayPauseButton(state) {
        if (!this.playPauseBtn) return;
        
        const icon = this.playPauseBtn.querySelector('i');
        if (!icon) return;
        
        icon.className = '';
        
        switch(state) {
            case 'play':
                icon.className = 'fas fa-play';
                this.playPauseBtn.disabled = false;
                break;
            case 'pause':
                icon.className = 'fas fa-pause';
                this.playPauseBtn.disabled = false;
                break;
            case 'loading':
                icon.className = 'fas fa-spinner fa-spin';
                this.playPauseBtn.disabled = true;
                break;
        }
    }

    updateVolumeIcon() {
        if (!this.volumeBtn) return;
        
        const icon = this.volumeBtn.querySelector('i');
        if (!icon) return;
        
        icon.className = '';
        
        if (this.volume === 0) {
            icon.className = 'fas fa-volume-mute';
        } else if (this.volume < 0.5) {
            icon.className = 'fas fa-volume-down';
        } else {
            icon.className = 'fas fa-volume-up';
        }
    }

    startProgressUpdate() {
        this.progressInterval = setInterval(() => {
            if (this.currentSound && this.isPlaying) {
                this.currentTime = this.currentSound.seek();
                this.updateProgressBar();
                this.updateTimeDisplay();
            }
        }, 100);
    }

    stopProgressUpdate() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }

    updateProgressBar(percentage = null) {
        if (!this.progressBar) return;
        
        const progress = percentage !== null ? percentage : 
                        (this.duration > 0 ? this.currentTime / this.duration : 0);
        
        this.progressBar.style.width = `${progress * 100}%`;
    }

    updateTimeDisplay() {
        if (this.currentTimeDisplay) {
            this.currentTimeDisplay.textContent = this.formatTime(this.currentTime);
        }
        if (this.totalTimeDisplay) {
            this.totalTimeDisplay.textContent = this.formatTime(this.duration);
        }
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    resetProgress() {
        this.currentTime = 0;
        this.updateProgressBar(0);
        this.updateTimeDisplay();
    }

    handleTrackEnd() {
        if (this.isRepeat) {
            this.currentSound.seek(0);
            this.play();
        } else if (this.playlist.length > 1) {
            this.playNext();
        } else {
            this.resetProgress();
        }
    }

    showPlayer() {
        if (this.playerElement) {
            this.playerElement.style.display = 'block';
            console.log('✓ Player exibido');
        } else {
            console.log('✗ Elemento do player não encontrado');
        }
    }

    hidePlayer() {
        if (this.playerElement) {
            this.playerElement.style.display = 'none';
        }
    }

    showQueue() {
        const queueModal = new bootstrap.Modal(document.getElementById('queueModal'));
        queueModal.show();
        
        // Update queue display
        this.updateQueueDisplay();
    }

    updateQueueDisplay() {
        const queueList = document.getElementById('queueList');
        if (!queueList) return;
        
        queueList.innerHTML = '';
        
        this.playlist.forEach((track, index) => {
            const queueItem = document.createElement('div');
            queueItem.className = `queue-item d-flex align-items-center p-2 ${
                index === this.currentTrackIndex ? 'bg-primary bg-opacity-25' : ''
            }`;
            
            queueItem.innerHTML = `
                <img src="${track.cover || 'https://via.placeholder.com/50x50?text=♪'}" 
                     class="queue-item-cover me-3" alt="Cover" style="width: 50px; height: 50px;">
                <div class="flex-grow-1">
                    <div class="queue-item-name">${track.name}</div>
                    <div class="queue-item-artist text-muted">${track.artist}</div>
                </div>
                <div class="queue-item-duration text-muted">${this.formatTime(track.duration || 0)}</div>
                <button class="btn btn-link text-light ms-2 queue-item-remove" data-index="${index}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            queueList.appendChild(queueItem);
        });
    }

    showError(message) {
        // TODO: Implement error display
        console.error(message);
    }

    // Public methods for external use
    addToPlaylist(track) {
        this.playlist.push(track);
        console.log('Track added to playlist:', track.name);
    }

    loadPlaylist(tracks) {
        this.playlist = tracks;
        this.currentTrackIndex = 0;
        console.log('Playlist loaded with', tracks.length, 'tracks');
    }

    playTrack(track) {
        this.loadTrack(track);
    }
}

// Initialize music player when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎵 Inicializando Music Player...');
    
    // Check dependencies
    if (typeof Howl === 'undefined') {
        console.error('❌ Howler.js não está carregado!');
        return;
    }
    
    if (typeof $ === 'undefined') {
        console.error('❌ jQuery não está carregado!');
    }
    
    console.log('✅ Dependências carregadas');
    
    try {
        window.musicPlayer = new MusicPlayer();
        console.log('✅ Music Player inicializado com sucesso!');
        
        // Show player immediately for testing
        window.musicPlayer.showPlayer();
        
    } catch (error) {
        console.error('❌ Erro ao inicializar Music Player:', error);
    }
    
    // Example usage - you can remove this in production
    setTimeout(() => {
        // Add some demo tracks
        const demoTracks = [
            {
                id: 'demo-1',
                name: 'Música de Demonstração 1',
                artist: 'Artista Demo',
                album: 'Álbum Demo',
                url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
                format: ['wav'],
                cover: 'https://via.placeholder.com/300x300?text=Demo+1',
                duration: 30
            },
            {
                id: 'demo-2',
                name: 'Música de Demonstração 2',
                artist: 'Outro Artista',
                album: 'Outro Álbum',
                url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
                format: ['wav'],
                cover: 'https://via.placeholder.com/300x300?text=Demo+2',
                duration: 25
            }
        ];
        
        window.musicPlayer.loadPlaylist(demoTracks);
    }, 1000);
});

// Global function to play track from anywhere in the application
function playTrack(trackData) {
    if (window.musicPlayer) {
        window.musicPlayer.playTrack(trackData);
    }
}

// Global function to add track to playlist
function addToPlaylist(trackData) {
    if (window.musicPlayer) {
        window.musicPlayer.addToPlaylist(trackData);
    }
}

// ==== FUNÇÕES DE INTEGRAÇÃO COM DJANGO ====

// Função para tocar uma música específica do banco de dados
async function playTrackFromDB(trackId) {
    try {
        console.log('🎵 Carregando música ID:', trackId);
        
        // Buscar detalhes da música via API
        const response = await fetch(`/api/cancao/${trackId}/`);
        if (!response.ok) {
            throw new Error('Erro ao carregar música');
        }
        
        const trackData = await response.json();
        console.log('🎵 Música carregada:', trackData);
        
        // Tocar a música
        if (window.musicPlayer) {
            window.musicPlayer.playTrack(trackData);
        }
        
    } catch (error) {
        console.error('❌ Erro ao carregar música:', error);
        showErrorMessage('Erro ao carregar a música. Tente novamente.');
    }
}

// Função para tocar todas as músicas de um álbum
async function playAlbumFromDB(albumId) {
    try {
        console.log('🎵 Carregando álbum ID:', albumId);
        
        // Buscar músicas do álbum via API
        const response = await fetch(`/api/album/${albumId}/cancoes/`);
        if (!response.ok) {
            throw new Error('Erro ao carregar álbum');
        }
        
        const albumData = await response.json();
        console.log('🎵 Álbum carregado:', albumData);
        
        if (albumData.tracks && albumData.tracks.length > 0) {
            // Carregar playlist com as músicas do álbum
            if (window.musicPlayer) {
                window.musicPlayer.loadPlaylist(albumData.tracks);
                window.musicPlayer.playTrack(albumData.tracks[0]);
            }
        } else {
            showErrorMessage('Este álbum não contém músicas.');
        }
        
    } catch (error) {
        console.error('❌ Erro ao carregar álbum:', error);
        showErrorMessage('Erro ao carregar o álbum. Tente novamente.');
    }
}

// Função para carregar todas as músicas disponíveis
async function loadAllTracks() {
    try {
        console.log('🎵 Carregando todas as músicas...');
        
        // Buscar todas as músicas via API
        const response = await fetch('/api/cancoes/');
        if (!response.ok) {
            throw new Error('Erro ao carregar músicas');
        }
        
        const data = await response.json();
        console.log('🎵 Músicas carregadas:', data.tracks.length);
        
        if (data.tracks && data.tracks.length > 0) {
            // Carregar playlist com todas as músicas
            if (window.musicPlayer) {
                window.musicPlayer.loadPlaylist(data.tracks);
            }
            return data.tracks;
        } else {
            showErrorMessage('Nenhuma música encontrada no banco de dados.');
            return [];
        }
        
    } catch (error) {
        console.error('❌ Erro ao carregar músicas:', error);
        showErrorMessage('Erro ao carregar as músicas. Tente novamente.');
        return [];
    }
}

// Função para tocar uma playlist específica
async function playPlaylistFromDB(playlistId) {
    try {
        console.log('🎵 Carregando playlist ID:', playlistId);
        
        // Implementar API para playlists se necessário
        // Por enquanto, vamos carregar todas as músicas
        const tracks = await loadAllTracks();
        
        if (tracks.length > 0 && window.musicPlayer) {
            window.musicPlayer.loadPlaylist(tracks);
            window.musicPlayer.playTrack(tracks[0]);
        }
        
    } catch (error) {
        console.error('❌ Erro ao carregar playlist:', error);
        showErrorMessage('Erro ao carregar a playlist. Tente novamente.');
    }
}

// Função para buscar e tocar músicas
async function searchAndPlay(query) {
    try {
        console.log('🔍 Buscando:', query);
        
        // Buscar músicas via API de busca
        const response = await fetch(`/buscar/?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Erro na busca');
        }
        
        // Esta função precisaria de uma API JSON para busca
        // Por enquanto, vamos carregar todas as músicas e filtrar
        const allTracks = await loadAllTracks();
        const filteredTracks = allTracks.filter(track => 
            track.name.toLowerCase().includes(query.toLowerCase()) ||
            track.artist.toLowerCase().includes(query.toLowerCase()) ||
            track.album.toLowerCase().includes(query.toLowerCase())
        );
        
        if (filteredTracks.length > 0 && window.musicPlayer) {
            window.musicPlayer.loadPlaylist(filteredTracks);
            window.musicPlayer.playTrack(filteredTracks[0]);
        } else {
            showErrorMessage('Nenhuma música encontrada para: ' + query);
        }
        
    } catch (error) {
        console.error('❌ Erro na busca:', error);
        showErrorMessage('Erro na busca. Tente novamente.');
    }
}

// Função para mostrar mensagens de erro
function showErrorMessage(message) {
    // Criar uma notificação simples
    const notification = document.createElement('div');
    notification.className = 'alert alert-danger position-fixed';
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: fadeIn 0.3s ease-in;
    `;
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-exclamation-triangle me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remover automaticamente após 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Função para mostrar o player
function showPlayer() {
    const musicPlayer = document.getElementById('musicPlayer');
    if (musicPlayer) {
        musicPlayer.style.display = 'block';
        console.log('🎵 Player exibido');
    }
}

// Função para ocultar o player
function hidePlayer() {
    const musicPlayer = document.getElementById('musicPlayer');
    if (musicPlayer) {
        musicPlayer.style.display = 'none';
        console.log('🎵 Player ocultado');
    }
}

// Função para alternar visibilidade do player
function togglePlayer() {
    const musicPlayer = document.getElementById('musicPlayer');
    if (musicPlayer) {
        const isVisible = musicPlayer.style.display !== 'none';
        musicPlayer.style.display = isVisible ? 'none' : 'block';
        console.log('🎵 Player', isVisible ? 'ocultado' : 'exibido');
    }
}

// Função para inicializar o player com dados do Django
async function initPlayerWithDjangoData() {
    try {
        console.log('🎵 Inicializando player com dados do Django...');
        
        // Carregar todas as músicas disponíveis
        const tracks = await loadAllTracks();
        
        if (tracks.length > 0) {
            console.log(`🎵 Player inicializado com ${tracks.length} músicas`);
            showPlayer();
        } else {
            console.log('ℹ️ Nenhuma música encontrada no banco de dados');
        }
        
    } catch (error) {
        console.error('❌ Erro ao inicializar player:', error);
    }
}

// ==== FIM DAS FUNÇÕES DE INTEGRAÇÃO ====

// Inicializar player global quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar um pouco para garantir que todos os elementos estão carregados
    setTimeout(() => {
        console.log('🎵 Inicializando Music Player...');
        
        // Criar instância global do player
        window.musicPlayer = new MusicPlayer();
        
        // Aguardar mais um pouco e carregar dados do Django
        setTimeout(() => {
            if (typeof initPlayerWithDjangoData === 'function') {
                initPlayerWithDjangoData();
            }
        }, 1000);
    }, 500);
});

// Função para garantir que o player está pronto
function ensurePlayerReady() {
    if (!window.musicPlayer) {
        window.musicPlayer = new MusicPlayer();
    }
    return window.musicPlayer;
}
