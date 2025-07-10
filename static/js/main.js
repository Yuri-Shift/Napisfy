// Main JavaScript file for MusicStream
$(document).ready(function() {
    // Initialize the application
    initializeApp();
    
    // Load content for home page
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        loadHomeContent();
    }
});

// Initialize application
function initializeApp() {
    // Search functionality
    setupSearch();
    
    // Music player setup
    setupMusicPlayer();
    
    // Global event listeners
    setupGlobalEvents();
    
    // Load user preferences
    loadUserPreferences();
}

// Search functionality
function setupSearch() {
    const searchInput = $('#searchInput');
    const searchBtn = $('.search-btn');
    
    // Search on Enter key
    searchInput.on('keypress', function(e) {
        if (e.which === 13) {
            performSearch($(this).val());
        }
    });
    
    // Search on button click
    searchBtn.on('click', function() {
        performSearch(searchInput.val());
    });
    
    // Auto-complete (basic implementation)
    searchInput.on('input', function() {
        const query = $(this).val();
        if (query.length > 2) {
            // Implement autocomplete suggestions here
            showSearchSuggestions(query);
        } else {
            hideSearchSuggestions();
        }
    });
}

function performSearch(query) {
    if (query.trim() === '') return;
    
    // Redirect to search page with query
    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
}

function showSearchSuggestions(query) {
    // Basic suggestion implementation
    const suggestions = [
        'The Weeknd',
        'Blinding Lights',
        'After Hours',
        'Bruno Mars',
        'Dua Lipa',
        'Ariana Grande'
    ].filter(item => item.toLowerCase().includes(query.toLowerCase()));
    
    // Create and show suggestions dropdown
    // Implementation would go here
}

function hideSearchSuggestions() {
    // Hide suggestions dropdown
    $('.search-suggestions').remove();
}

// Music Player Setup
function setupMusicPlayer() {
    const player = $('#musicPlayer');
    const playPauseBtn = $('.play-pause-btn');
    const prevBtn = $('.prev-btn');
    const nextBtn = $('.next-btn');
    const shuffleBtn = $('.shuffle-btn');
    const repeatBtn = $('.repeat-btn');
    const likeBtn = $('.like-btn');
    const volumeSlider = $('#volumeSlider');
    const queueBtn = $('.queue-btn');
    
    // Play/Pause functionality
    playPauseBtn.on('click', function() {
        togglePlayPause();
    });
    
    // Previous/Next track
    prevBtn.on('click', function() {
        playPreviousTrack();
    });
    
    nextBtn.on('click', function() {
        playNextTrack();
    });
    
    // Shuffle and repeat
    shuffleBtn.on('click', function() {
        toggleShuffle();
    });
    
    repeatBtn.on('click', function() {
        toggleRepeat();
    });
    
    // Like/Unlike track
    $(document).on('click', '.like-btn', function(e) {
        e.stopPropagation();
        toggleLike($(this));
    });
    
    // Volume control
    volumeSlider.on('input', function() {
        setVolume($(this).val());
    });
    
    // Queue modal
    queueBtn.on('click', function() {
        loadQueue();
    });
    
    // Progress bar interaction
    $('.progress').on('click', function(e) {
        const progressBar = $(this);
        const clickPosition = e.offsetX / progressBar.width();
        seekToPosition(clickPosition);
    });
}

function togglePlayPause() {
    const playIcon = $('.play-pause-btn i');
    const isPlaying = playIcon.hasClass('fa-pause');
    
    if (isPlaying) {
        playIcon.removeClass('fa-pause').addClass('fa-play');
        // Pause audio
        pauseCurrentTrack();
    } else {
        playIcon.removeClass('fa-play').addClass('fa-pause');
        // Play audio
        playCurrentTrack();
    }
}

function playCurrentTrack() {
    // Implement audio playback
    console.log('Playing current track');
    updatePlayerProgress();
}

function pauseCurrentTrack() {
    // Implement audio pause
    console.log('Pausing current track');
}

function playPreviousTrack() {
    // Implement previous track logic
    console.log('Playing previous track');
}

function playNextTrack() {
    // Implement next track logic
    console.log('Playing next track');
}

function toggleShuffle() {
    const shuffleBtn = $('.shuffle-btn');
    shuffleBtn.toggleClass('text-primary');
    const isShuffleOn = shuffleBtn.hasClass('text-primary');
    
    // Save shuffle state
    localStorage.setItem('shuffleMode', isShuffleOn);
    console.log('Shuffle:', isShuffleOn ? 'ON' : 'OFF');
}

function toggleRepeat() {
    const repeatBtn = $('.repeat-btn');
    const repeatModes = ['off', 'all', 'one'];
    let currentMode = repeatBtn.data('mode') || 'off';
    let nextModeIndex = (repeatModes.indexOf(currentMode) + 1) % repeatModes.length;
    let nextMode = repeatModes[nextModeIndex];
    
    // Update button appearance
    repeatBtn.removeClass('text-primary text-warning').data('mode', nextMode);
    
    if (nextMode === 'all') {
        repeatBtn.addClass('text-primary');
        repeatBtn.find('i').removeClass('fa-redo-alt').addClass('fa-redo');
    } else if (nextMode === 'one') {
        repeatBtn.addClass('text-warning');
        repeatBtn.find('i').removeClass('fa-redo').addClass('fa-redo-alt');
    }
    
    // Save repeat state
    localStorage.setItem('repeatMode', nextMode);
    console.log('Repeat mode:', nextMode);
}

function toggleLike(button) {
    const icon = button.find('i');
    const isLiked = icon.hasClass('fas');
    
    if (isLiked) {
        icon.removeClass('fas text-primary').addClass('far');
    } else {
        icon.removeClass('far').addClass('fas text-primary');
    }
    
    // Save like state
    const trackId = button.closest('[data-song], [data-track]').data('song') || button.closest('[data-song], [data-track]').data('track');
    if (trackId) {
        saveLikeState(trackId, !isLiked);
    }
}

function setVolume(volume) {
    // Implement volume control
    console.log('Setting volume to:', volume);
    localStorage.setItem('volume', volume);
}

function seekToPosition(position) {
    // Implement seek functionality
    console.log('Seeking to position:', position);
    const progressBar = $('.progress-bar');
    progressBar.css('width', (position * 100) + '%');
}

function updatePlayerProgress() {
    // Simulate progress update
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        if (progress > 100) {
            clearInterval(interval);
            playNextTrack();
            return;
        }
        
        $('.progress-bar').css('width', progress + '%');
        
        // Update time display
        const currentTime = Math.floor((progress / 100) * 210); // Assuming 3:30 song
        $('.current-time').text(formatTime(currentTime));
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Global event listeners
function setupGlobalEvents() {
    // Song/track play buttons
    $(document).on('click', '.play-btn', function(e) {
        e.stopPropagation();
        const songElement = $(this).closest('[data-song], [data-track]');
        const songId = songElement.data('song') || songElement.data('track');
        playTrack(songId, songElement);
    });
    
    // Album/artist cards
    $(document).on('click', '.album-card', function() {
        const albumId = $(this).data('album') || 'after-hours';
        goToAlbum(albumId);
    });
    
    $(document).on('click', '.artist-card', function() {
        const artistId = $(this).data('artist') || 'the-weeknd';
        goToArtist(artistId);
    });
    
    // Track rows
    $(document).on('click', '.track-row, .song-item', function(e) {
        if (!$(e.target).closest('button, .dropdown').length) {
            const trackId = $(this).data('track') || $(this).data('song');
            if (trackId) {
                playTrack(trackId, $(this));
            }
        }
    });
    
    // Show more/less functionality
    $(document).on('click', '.show-more-btn', function() {
        const showText = $(this).find('.show-text');
        const hideText = $(this).find('.hide-text');
        const isExpanded = showText.is(':hidden');
        
        if (isExpanded) {
            showText.show();
            hideText.hide();
            // Hide additional content
        } else {
            showText.hide();
            hideText.show();
            // Show additional content
        }
    });
}

function playTrack(trackId, element) {
    console.log('Playing track:', trackId);
    
    // Update player with track information
    const trackTitle = element.find('.track-title, .song-title').text() || 'Unknown Track';
    const trackArtist = element.find('.track-artist, .song-artist').text() || 'Unknown Artist';
    const trackCover = element.find('img').attr('src') || 'https://via.placeholder.com/60x60/1DB954/ffffff?text=♪';
    
    updatePlayerDisplay(trackTitle, trackArtist, trackCover);
    
    // Show player if hidden
    $('#musicPlayer').fadeIn();
    
    // Start playing
    $('.play-pause-btn i').removeClass('fa-play').addClass('fa-pause');
    playCurrentTrack();
}

function updatePlayerDisplay(title, artist, cover) {
    $('.player-track-name').text(title);
    $('.player-artist-name').text(artist);
    $('.player-album-cover').attr('src', cover);
}

function loadQueue() {
    // Load current queue
    const queueList = $('#queueList');
    queueList.empty();
    
    // Sample queue data
    const queue = [
        { title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20', playing: true },
        { title: 'Save Your Tears', artist: 'The Weeknd', duration: '3:35', playing: false },
        { title: 'Die For You', artist: 'The Weeknd', duration: '4:20', playing: false }
    ];
    
    queue.forEach((track, index) => {
        const queueItem = $(`
            <div class="queue-item ${track.playing ? 'playing' : ''}" data-track="${index}">
                <div class="d-flex align-items-center">
                    <img src="https://via.placeholder.com/40x40/1DB954/ffffff?text=♪" 
                         alt="Album" class="me-3 rounded">
                    <div class="flex-grow-1">
                        <div class="fw-semibold">${track.title}</div>
                        <div class="text-muted small">${track.artist}</div>
                    </div>
                    <div class="text-muted small">${track.duration}</div>
                    <button class="btn btn-link text-light ms-2">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `);
        queueList.append(queueItem);
    });
}

// Load home page content
function loadHomeContent() {
    loadRecentlyPlayed();
    loadFeaturedPlaylists();
    loadTopArtists();
    loadNewReleases();
}

function loadRecentlyPlayed() {
    const container = $('#recentlyPlayed');
    const items = [
        { title: 'After Hours', artist: 'The Weeknd', image: 'https://th.bing.com/th/id/OIP.zhyyGzXVOS5eSy08FVpupQAAAA?w=210&h=211&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
        { title: 'Dawn FM', artist: 'The Weeknd', image: 'https://via.placeholder.com/200x200/1ED760/ffffff?text=Dawn+FM' },
        { title: 'Starboy', artist: 'The Weeknd', image: 'https://via.placeholder.com/200x200/1AA34A/ffffff?text=Starboy' },
        { title: '24K Magic', artist: 'Bruno Mars', image: 'https://via.placeholder.com/200x200/FF6B6B/ffffff?text=24K+Magic' },
        { title: 'Future Nostalgia', artist: 'Dua Lipa', image: 'https://via.placeholder.com/200x200/4ECDC4/ffffff?text=Future+Nostalgia' },
        { title: 'Positions', artist: 'Ariana Grande', image: 'https://via.placeholder.com/200x200/45B7D1/ffffff?text=Positions' }
    ];
    
    container.empty();
    items.forEach(item => {
        const cardHtml = `
            <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                <div class="album-card" data-album="${item.title.toLowerCase().replace(/\s+/g, '-')}">
                    <div class="card bg-transparent border-0">
                        <div class="position-relative">
                            <img src="${item.image}" class="card-img-top album-cover" alt="${item.title}">
                            <div class="play-overlay">
                                <button class="btn btn-primary rounded-circle">
                                    <i class="fas fa-play"></i>
                                </button>
                            </div>
                        </div>
                        <div class="card-body p-2">
                            <h6 class="card-title mb-1">${item.title}</h6>
                            <p class="card-text text-muted small">${item.artist}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.append(cardHtml);
    });
}

function loadFeaturedPlaylists() {
    const container = $('#featuredPlaylists');
    const items = [
        { title: 'Top Hits 2024', description: 'Os maiores sucessos do ano', image: 'https://via.placeholder.com/200x200/1DB954/ffffff?text=Top+2024' },
        { title: 'Chill Vibes', description: 'Para relaxar e curtir', image: 'https://via.placeholder.com/200x200/1ED760/ffffff?text=Chill' },
        { title: 'Workout Mix', description: 'Energia para treinar', image: 'https://via.placeholder.com/200x200/1AA34A/ffffff?text=Workout' },
        { title: 'Love Songs', description: 'Românticas de todos os tempos', image: 'https://via.placeholder.com/200x200/FF6B6B/ffffff?text=Love' },
        { title: 'Rock Classics', description: 'Clássicos do rock', image: 'https://via.placeholder.com/200x200/4ECDC4/ffffff?text=Rock' },
        { title: 'Hip Hop Nation', description: 'O melhor do hip hop', image: 'https://via.placeholder.com/200x200/45B7D1/ffffff?text=Hip+Hop' }
    ];
    
    container.empty();
    items.forEach(item => {
        const cardHtml = `
            <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                <div class="album-card">
                    <div class="card bg-transparent border-0">
                        <div class="position-relative">
                            <img src="${item.image}" class="card-img-top album-cover" alt="${item.title}">
                            <div class="play-overlay">
                                <button class="btn btn-primary rounded-circle">
                                    <i class="fas fa-play"></i>
                                </button>
                            </div>
                        </div>
                        <div class="card-body p-2">
                            <h6 class="card-title mb-1">${item.title}</h6>
                            <p class="card-text text-muted small">${item.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.append(cardHtml);
    });
}

function loadTopArtists() {
    const container = $('#topArtists');
    const items = [
        { name: 'The Weeknd', image: 'https://via.placeholder.com/200x200/1DB954/ffffff?text=The+Weeknd' },
        { name: 'Bruno Mars', image: 'https://via.placeholder.com/200x200/1ED760/ffffff?text=Bruno+Mars' },
        { name: 'Dua Lipa', image: 'https://via.placeholder.com/200x200/1AA34A/ffffff?text=Dua+Lipa' },
        { name: 'Ariana Grande', image: 'https://via.placeholder.com/200x200/FF6B6B/ffffff?text=Ariana' },
        { name: 'Drake', image: 'https://via.placeholder.com/200x200/4ECDC4/ffffff?text=Drake' },
        { name: 'Billie Eilish', image: 'https://via.placeholder.com/200x200/45B7D1/ffffff?text=Billie' }
    ];
    
    container.empty();
    items.forEach(item => {
        const cardHtml = `
            <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                <div class="artist-card" data-artist="${item.name.toLowerCase().replace(/\s+/g, '-')}">
                    <div class="card bg-transparent border-0">
                        <img src="${item.image}" class="card-img-top artist-image rounded-circle" alt="${item.name}">
                        <div class="card-body p-2 text-center">
                            <h6 class="card-title mb-1">${item.name}</h6>
                            <p class="card-text text-muted small">Artista</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.append(cardHtml);
    });
}

function loadNewReleases() {
    const container = $('#newReleases');
    const items = [
        { title: 'New Album 2024', artist: 'Various Artists', image: 'https://via.placeholder.com/200x200/1DB954/ffffff?text=New+2024' },
        { title: 'Latest Hits', artist: 'Top Artists', image: 'https://via.placeholder.com/200x200/1ED760/ffffff?text=Latest' },
        { title: 'Fresh Sounds', artist: 'Rising Stars', image: 'https://via.placeholder.com/200x200/1AA34A/ffffff?text=Fresh' },
        { title: 'New Discoveries', artist: 'Indie Artists', image: 'https://via.placeholder.com/200x200/FF6B6B/ffffff?text=Discover' },
        { title: 'Hot Singles', artist: 'Popular Artists', image: 'https://via.placeholder.com/200x200/4ECDC4/ffffff?text=Hot' },
        { title: 'Breaking Artists', artist: 'New Talents', image: 'https://via.placeholder.com/200x200/45B7D1/ffffff?text=Breaking' }
    ];
    
    container.empty();
    items.forEach(item => {
        const cardHtml = `
            <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                <div class="album-card">
                    <div class="card bg-transparent border-0">
                        <div class="position-relative">
                            <img src="${item.image}" class="card-img-top album-cover" alt="${item.title}">
                            <div class="play-overlay">
                                <button class="btn btn-primary rounded-circle">
                                    <i class="fas fa-play"></i>
                                </button>
                            </div>
                        </div>
                        <div class="card-body p-2">
                            <h6 class="card-title mb-1">${item.title}</h6>
                            <p class="card-text text-muted small">${item.artist}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.append(cardHtml);
    });
}

// Navigation functions
function goToAlbum(albumId) {
    window.location.href = `album.html?id=${albumId}`;
}

function goToArtist(artistId) {
    window.location.href = `artist.html?id=${artistId}`;
}

function showSearchResults() {
    window.location.href = 'search.html';
}

// User preferences
function loadUserPreferences() {
    // Load saved volume
    const savedVolume = localStorage.getItem('volume');
    if (savedVolume) {
        $('#volumeSlider').val(savedVolume);
        setVolume(savedVolume);
    }
    
    // Load saved shuffle state
    const shuffleMode = localStorage.getItem('shuffleMode');
    if (shuffleMode === 'true') {
        $('.shuffle-btn').addClass('text-primary');
    }
    
    // Load saved repeat state
    const repeatMode = localStorage.getItem('repeatMode');
    if (repeatMode && repeatMode !== 'off') {
        const repeatBtn = $('.repeat-btn');
        repeatBtn.data('mode', repeatMode);
        if (repeatMode === 'all') {
            repeatBtn.addClass('text-primary');
        } else if (repeatMode === 'one') {
            repeatBtn.addClass('text-warning');
            repeatBtn.find('i').removeClass('fa-redo').addClass('fa-redo-alt');
        }
    }
}

function saveLikeState(trackId, isLiked) {
    let likedTracks = JSON.parse(localStorage.getItem('likedTracks') || '[]');
    
    if (isLiked && !likedTracks.includes(trackId)) {
        likedTracks.push(trackId);
    } else if (!isLiked && likedTracks.includes(trackId)) {
        likedTracks = likedTracks.filter(id => id !== trackId);
    }
    
    localStorage.setItem('likedTracks', JSON.stringify(likedTracks));
}

// Utility functions
function showNotification(message, type = 'info') {
    const toast = $(`
        <div class="toast align-items-center text-white bg-${type} border-0 position-fixed" 
             style="top: 90px; right: 20px; z-index: 9999;" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" 
                        data-bs-dismiss="toast"></button>
            </div>
        </div>
    `);
    
    $('body').append(toast);
    const bsToast = new bootstrap.Toast(toast[0]);
    bsToast.show();
    
    // Remove toast element after it's hidden
    toast.on('hidden.bs.toast', function() {
        $(this).remove();
    });
}

// Animation helpers
function animateAlbumShowcase() {
    const albums = $('.album-item');
    let currentIndex = 0;
    
    setInterval(() => {
        albums.removeClass('active');
        albums.eq(currentIndex).addClass('active');
        currentIndex = (currentIndex + 1) % albums.length;
    }, 3000);
}

// Initialize album showcase animation on home page
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    $(document).ready(function() {
        setTimeout(animateAlbumShowcase, 2000);
    });
}
