// Artist page specific JavaScript
$(document).ready(function() {
    // Get artist ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id') || 'the-weeknd';
    
    // Load artist data
    loadArtistData(artistId);
    
    // Setup artist-specific functionality
    setupArtistPage();
});

function loadArtistData(artistId) {
    // Sample artist data - in a real app, this would come from an API
    const artistData = {
        'the-weeknd': {
            name: 'The Weeknd',
            monthlyListeners: '85.2 milhões',
            followers: '47M',
            verified: true,
            bio: {
                short: 'Abel Makkonen Tesfaye, conhecido profissionalmente como The Weeknd, é um cantor, compositor e produtor musical canadense. Conhecido por seu estilo musical eclético e persona sombria, The Weeknd ganhou aclamação crítica e sucesso comercial após lançar vários mixtapes no final de 2010.',
                full: 'Suas canções frequentemente exploram temas de hedonismo, amor tóxico e melancolia, e são notáveis por seus vocais expressivos e uso frequente de sintetizadores. Ele ganhou vários prêmios, incluindo quatro Grammy Awards, e teve múltiplos álbums certificados multi-platina.'
            },
            image: 'https://via.placeholder.com/280x280/1DB954/ffffff?text=The+Weeknd',
            genres: ['R&B', 'Pop', 'Alternative R&B', 'Synthpop'],
            popularSongs: [
                {
                    rank: 1,
                    title: 'Blinding Lights',
                    plays: '2,847,392,156',
                    duration: '3:20',
                    album: 'After Hours',
                    image: 'https://via.placeholder.com/50x50/1DB954/ffffff?text=BL',
                    liked: true
                },
                {
                    rank: 2,
                    title: 'Save Your Tears',
                    plays: '1,234,567,890',
                    duration: '3:35',
                    album: 'After Hours',
                    image: 'https://via.placeholder.com/50x50/1ED760/ffffff?text=SYT',
                    liked: false
                },
                {
                    rank: 3,
                    title: 'Die For You',
                    plays: '987,654,321',
                    duration: '4:20',
                    album: 'Starboy',
                    image: 'https://via.placeholder.com/50x50/1AA34A/ffffff?text=DFY',
                    liked: false
                },
                {
                    rank: 4,
                    title: 'Starboy',
                    plays: '756,432,189',
                    duration: '3:50',
                    album: 'Starboy',
                    image: 'https://via.placeholder.com/50x50/FF6B6B/ffffff?text=SB',
                    liked: false
                },
                {
                    rank: 5,
                    title: 'Earned It',
                    plays: '623,891,456',
                    duration: '4:37',
                    album: 'Beauty Behind the Madness',
                    image: 'https://via.placeholder.com/50x50/4ECDC4/ffffff?text=EI',
                    liked: false
                }
            ],
            albums: [
                {
                    title: 'After Hours',
                    year: '2020',
                    type: 'Álbum',
                    image: 'https://via.placeholder.com/200x200/1DB954/ffffff?text=After+Hours',
                    id: 'after-hours'
                },
                {
                    title: 'Dawn FM',
                    year: '2022',
                    type: 'Álbum',
                    image: 'https://via.placeholder.com/200x200/1ED760/ffffff?text=Dawn+FM',
                    id: 'dawn-fm'
                },
                {
                    title: 'Starboy',
                    year: '2016',
                    type: 'Álbum',
                    image: 'https://via.placeholder.com/200x200/1AA34A/ffffff?text=Starboy',
                    id: 'starboy'
                },
                {
                    title: 'Beauty Behind the Madness',
                    year: '2015',
                    type: 'Álbum',
                    image: 'https://via.placeholder.com/200x200/FF6B6B/ffffff?text=Beauty',
                    id: 'beauty-behind-the-madness'
                },
                {
                    title: 'Kiss Land',
                    year: '2013',
                    type: 'Álbum',
                    image: 'https://via.placeholder.com/200x200/4ECDC4/ffffff?text=Kiss+Land',
                    id: 'kiss-land'
                }
            ],
            relatedArtists: [
                {
                    name: 'Drake',
                    image: 'https://via.placeholder.com/200x200/1DB954/ffffff?text=Drake',
                    id: 'drake'
                },
                {
                    name: 'Bruno Mars',
                    image: 'https://via.placeholder.com/200x200/1ED760/ffffff?text=Bruno+Mars',
                    id: 'bruno-mars'
                },
                {
                    name: 'Dua Lipa',
                    image: 'https://via.placeholder.com/200x200/1AA34A/ffffff?text=Dua+Lipa',
                    id: 'dua-lipa'
                },
                {
                    name: 'Ariana Grande',
                    image: 'https://via.placeholder.com/200x200/FF6B6B/ffffff?text=Ariana',
                    id: 'ariana-grande'
                },
                {
                    name: 'Billie Eilish',
                    image: 'https://via.placeholder.com/200x200/4ECDC4/ffffff?text=Billie',
                    id: 'billie-eilish'
                }
            ]
        }
        // Add more artists as needed
    };
    
    const artist = artistData[artistId] || artistData['the-weeknd'];
    
    // Update page content
    updateArtistHeader(artist);
    updatePopularSongs(artist.popularSongs);
    updateArtistAlbums(artist.albums);
    updateArtistBio(artist);
    updateRelatedArtists(artist.relatedArtists);
}

function updateArtistHeader(artist) {
    // Update page title
    $('title').text(`MusicStream - ${artist.name}`);
    
    // Update breadcrumb
    $('.breadcrumb-item').last().text(artist.name);
    
    // Update artist image
    $('.artist-image-large img').attr('src', artist.image).attr('alt', artist.name);
    
    // Update artist info
    $('.artist-info h1').text(artist.name);
    $('.artist-info p').text(artist.monthlyListeners + ' de ouvintes mensais');
    
    // Update verification badge
    if (artist.verified) {
        $('.artist-info .d-flex').show();
    } else {
        $('.artist-info .d-flex').hide();
    }
}

function updatePopularSongs(songs) {
    const container = $('.popular-songs');
    container.empty();
    
    songs.forEach(song => {
        const songElement = $(`
            <div class="song-item popular-song" data-song="${song.title.toLowerCase().replace(/\s+/g, '-')}">
                <div class="row align-items-center">
                    <div class="col-auto">
                        <div class="song-rank">${song.rank}</div>
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-link text-light play-btn">
                            <i class="fas fa-play"></i>
                        </button>
                    </div>
                    <div class="col-auto">
                        <img src="${song.image}" alt="Album" class="song-cover">
                    </div>
                    <div class="col">
                        <div class="song-title">${song.title}</div>
                        <div class="song-plays text-muted">${song.plays} reproduções</div>
                    </div>
                    <div class="col-auto">
                        <span class="song-duration text-muted">${song.duration}</span>
                    </div>
                    <div class="col-auto">
                        <div class="track-actions">
                            <button class="btn btn-link text-light like-btn">
                                <i class="${song.liked ? 'fas text-primary' : 'far'} fa-heart"></i>
                            </button>
                            <div class="dropdown">
                                <button class="btn btn-link text-light" data-bs-toggle="dropdown">
                                    <i class="fas fa-ellipsis-h"></i>
                                </button>
                                <ul class="dropdown-menu bg-secondary">
                                    <li><a class="dropdown-item text-light" href="#">Adicionar à fila</a></li>
                                    <li><a class="dropdown-item text-light" href="#">Adicionar à playlist</a></li>
                                    <li><a class="dropdown-item text-light" href="#">Ir para álbum</a></li>
                                    <li><a class="dropdown-item text-light" href="#">Compartilhar</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
        
        container.append(songElement);
    });
    
    // Add show more/less button
    const showMoreBtn = $(`
        <button class="btn btn-link text-muted mt-3 show-more-btn">
            <span class="show-text">Mostrar mais</span>
            <span class="hide-text" style="display: none;">Mostrar menos</span>
        </button>
    `);
    
    container.append(showMoreBtn);
}

function updateArtistAlbums(albums) {
    const container = $('#albumsSection .row');
    container.empty();
    
    albums.forEach(album => {
        const albumCard = $(`
            <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                <div class="album-card" onclick="goToAlbum('${album.id}')">
                    <div class="card bg-transparent border-0">
                        <div class="position-relative">
                            <img src="${album.image}" class="card-img-top album-cover" alt="${album.title}">
                            <div class="play-overlay">
                                <button class="btn btn-primary rounded-circle">
                                    <i class="fas fa-play"></i>
                                </button>
                            </div>
                        </div>
                        <div class="card-body p-2">
                            <h6 class="card-title mb-1">${album.title}</h6>
                            <p class="card-text text-muted small">${album.year} • ${album.type}</p>
                        </div>
                    </div>
                </div>
            </div>
        `);
        
        container.append(albumCard);
    });
}

function updateArtistBio(artist) {
    // Update bio content
    $('.bio-content p').first().text(artist.bio.short);
    $('.bio-content p').last().text(artist.bio.full);
    
    // Update artist stats
    $('.artist-stats .row').html(`
        <div class="col-sm-6">
            <strong>${artist.monthlyListeners.split(' ')[0]}</strong><br>
            <span class="text-muted">Ouvintes mensais</span>
        </div>
        <div class="col-sm-6">
            <strong>${artist.followers}</strong><br>
            <span class="text-muted">Seguidores</span>
        </div>
    `);
}

function updateRelatedArtists(relatedArtists) {
    const container = $('#relatedArtistsSection .row');
    container.empty();
    
    relatedArtists.forEach(artist => {
        const artistCard = $(`
            <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                <div class="artist-card" onclick="goToArtist('${artist.id}')">
                    <div class="card bg-transparent border-0">
                        <img src="${artist.image}" class="card-img-top artist-image rounded-circle" alt="${artist.name}">
                        <div class="card-body p-2 text-center">
                            <h6 class="card-title mb-1">${artist.name}</h6>
                            <p class="card-text text-muted small">Artista</p>
                        </div>
                    </div>
                </div>
            </div>
        `);
        
        container.append(artistCard);
    });
}

function setupArtistPage() {
    // Play artist button
    $('.play-artist-btn').on('click', function() {
        playArtist();
    });
    
    // Follow/unfollow artist
    $('.follow-btn').on('click', function() {
        toggleArtistFollow($(this));
    });
    
    // Show more/less popular songs
    $(document).on('click', '.show-more-btn', function() {
        togglePopularSongs($(this));
    });
    
    // Enhanced song interactions
    $(document).on('click', '.popular-song', function(e) {
        if (!$(e.target).closest('button, .dropdown').length) {
            const songTitle = $(this).find('.song-title').text();
            const songArtist = 'The Weeknd'; // In real app, get from data
            const songCover = $(this).find('.song-cover').attr('src');
            playArtistTrack(songTitle, songArtist, songCover, $(this));
        }
    });
    
    // Song play buttons
    $(document).on('click', '.popular-song .play-btn', function(e) {
        e.stopPropagation();
        const songElement = $(this).closest('.popular-song');
        const songTitle = songElement.find('.song-title').text();
        const songCover = songElement.find('.song-cover').attr('src');
        playArtistTrack(songTitle, 'The Weeknd', songCover, songElement);
    });
}

function playArtist() {
    console.log('Playing artist');
    
    // Update button state
    const playBtn = $('.play-artist-btn');
    const icon = playBtn.find('i');
    
    if (icon.hasClass('fa-play')) {
        icon.removeClass('fa-play').addClass('fa-pause');
        playBtn.html('<i class="fas fa-pause me-2"></i>Pausar');
        
        // Play first popular song
        const firstSong = $('.popular-song').first();
        const songTitle = firstSong.find('.song-title').text();
        const songCover = firstSong.find('.song-cover').attr('src');
        playArtistTrack(songTitle, 'The Weeknd', songCover, firstSong);
    } else {
        icon.removeClass('fa-pause').addClass('fa-play');
        playBtn.html('<i class="fas fa-play me-2"></i>Reproduzir');
        
        // Pause current track
        pauseCurrentTrack();
    }
}

function playArtistTrack(title, artist, cover, songElement) {
    console.log('Playing artist track:', title);
    
    // Remove previous playing state
    $('.popular-song').removeClass('playing');
    $('.popular-song .play-btn i').removeClass('fa-pause').addClass('fa-play');
    
    // Add playing state to current song
    songElement.addClass('playing');
    songElement.find('.play-btn i').removeClass('fa-play').addClass('fa-pause');
    
    // Update player
    updatePlayerDisplay(title, artist, cover);
    
    // Show music player
    $('#musicPlayer').fadeIn();
    $('.play-pause-btn i').removeClass('fa-play').addClass('fa-pause');
    
    // Update artist play button
    $('.play-artist-btn').html('<i class="fas fa-pause me-2"></i>Pausar');
    
    // Start playback
    playCurrentTrack();
    
    // Save to recently played
    saveToRecentlyPlayed(title, artist, cover);
}

function toggleArtistFollow(button) {
    const icon = button.find('i');
    const isFollowing = icon.hasClass('fa-user-check');
    
    if (isFollowing) {
        icon.removeClass('fa-user-check').addClass('fa-user-plus');
        button.html('<i class="fas fa-user-plus me-2"></i>Seguir');
        showNotification('Você não está mais seguindo este artista', 'info');
    } else {
        icon.removeClass('fa-user-plus').addClass('fa-user-check');
        button.html('<i class="fas fa-user-check me-2"></i>Seguindo');
        showNotification('Agora você está seguindo este artista', 'success');
    }
    
    // Save follow state
    const artistId = new URLSearchParams(window.location.search).get('id') || 'the-weeknd';
    saveArtistFollowState(artistId, !isFollowing);
}

function togglePopularSongs(button) {
    const showText = button.find('.show-text');
    const hideText = button.find('.hide-text');
    const isExpanded = showText.is(':hidden');
    
    if (isExpanded) {
        // Show less
        showText.show();
        hideText.hide();
        
        // Hide additional songs (keep only first 5)
        $('.popular-song:gt(4)').slideUp();
    } else {
        // Show more
        showText.hide();
        hideText.show();
        
        // Show additional songs
        loadMorePopularSongs();
        $('.popular-song:gt(4)').slideDown();
    }
}

function loadMorePopularSongs() {
    // Add more popular songs if not already loaded
    const currentSongs = $('.popular-song').length;
    if (currentSongs <= 5) {
        const moreSongs = [
            {
                rank: 6,
                title: 'The Hills',
                plays: '567,234,891',
                duration: '4:02',
                album: 'Beauty Behind the Madness',
                image: 'https://via.placeholder.com/50x50/96CEB4/ffffff?text=TH',
                liked: false
            },
            {
                rank: 7,
                title: 'Can\'t Feel My Face',
                plays: '498,765,123',
                duration: '3:35',
                album: 'Beauty Behind the Madness',  
                image: 'https://via.placeholder.com/50x50/FECA57/ffffff?text=CFMF',
                liked: false
            },
            {
                rank: 8,
                title: 'Often',
                plays: '387,654,912',
                duration: '4:09',
                album: 'Beauty Behind the Madness',
                image: 'https://via.placeholder.com/50x50/FF9FF3/ffffff?text=O',
                liked: false
            },
            {
                rank: 9,
                title: 'Wicked Games',
                plays: '334,567,823',
                duration: '5:25',
                album: 'House of Balloons',
                image: 'https://via.placeholder.com/50x50/54A0FF/ffffff?text=WG',
                liked: false
            },
            {
                rank: 10,
                title: 'Take My Breath',
                plays: '289,123,456',
                duration: '3:40',
                album: 'Dawn FM',
                image: 'https://via.placeholder.com/50x50/5F27CD/ffffff?text=TMB',
                liked: false
            }
        ];
        
        const container = $('.popular-songs');
        const showMoreBtn = container.find('.show-more-btn');
        
        moreSongs.forEach(song => {
            const songElement = $(`
                <div class="song-item popular-song" data-song="${song.title.toLowerCase().replace(/\s+/g, '-')}" style="display: none;">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <div class="song-rank">${song.rank}</div>
                        </div>
                        <div class="col-auto">
                            <button class="btn btn-link text-light play-btn">
                                <i class="fas fa-play"></i>
                            </button>
                        </div>
                        <div class="col-auto">
                            <img src="${song.image}" alt="Album" class="song-cover">
                        </div>
                        <div class="col">
                            <div class="song-title">${song.title}</div>
                            <div class="song-plays text-muted">${song.plays} reproduções</div>
                        </div>
                        <div class="col-auto">
                            <span class="song-duration text-muted">${song.duration}</span>
                        </div>
                        <div class="col-auto">
                            <div class="track-actions">
                                <button class="btn btn-link text-light like-btn">
                                    <i class="far fa-heart"></i>
                                </button>
                                <div class="dropdown">
                                    <button class="btn btn-link text-light" data-bs-toggle="dropdown">
                                        <i class="fas fa-ellipsis-h"></i>
                                    </button>
                                    <ul class="dropdown-menu bg-secondary">
                                        <li><a class="dropdown-item text-light" href="#">Adicionar à fila</a></li>
                                        <li><a class="dropdown-item text-light" href="#">Adicionar à playlist</a></li>
                                        <li><a class="dropdown-item text-light" href="#">Ir para álbum</a></li>
                                        <li><a class="dropdown-item text-light" href="#">Compartilhar</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
            
            showMoreBtn.before(songElement);
        });
    }
}

// Artist-specific utility functions
function saveArtistFollowState(artistId, isFollowing) {
    let followedArtists = JSON.parse(localStorage.getItem('followedArtists') || '[]');
    
    if (isFollowing && !followedArtists.includes(artistId)) {
        followedArtists.push(artistId);
    } else if (!isFollowing && followedArtists.includes(artistId)) {
        followedArtists = followedArtists.filter(id => id !== artistId);
    }
    
    localStorage.setItem('followedArtists', JSON.stringify(followedArtists));
}

function saveToRecentlyPlayed(title, artist, cover) {
    let recentlyPlayed = JSON.parse(localStorage.getItem('recentlyPlayed') || '[]');
    
    // Remove if already exists
    recentlyPlayed = recentlyPlayed.filter(item => item.title !== title);
    
    // Add to beginning
    recentlyPlayed.unshift({
        title: title,
        artist: artist,
        cover: cover,
        timestamp: Date.now()
    });
    
    // Keep only last 50 items
    recentlyPlayed = recentlyPlayed.slice(0, 50);
    
    localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
}

// Artist radio functionality
function startArtistRadio() {
    console.log('Starting artist radio');
    showNotification('Rádio do artista iniciado', 'success');
    
    // In a real app, this would start a radio based on the artist
    playArtist();
}

// Shuffle artist songs
function shuffleArtistSongs() {
    console.log('Shuffling artist songs');
    showNotification('Reprodução aleatória ativada', 'info');
    
    // Enable shuffle mode
    $('.shuffle-btn').addClass('text-primary');
    localStorage.setItem('shuffleMode', 'true');
    
    // Start playing
    playArtist();
}

// Auto-load saved follow state
$(document).ready(function() {
    const artistId = new URLSearchParams(window.location.search).get('id') || 'the-weeknd';
    const followedArtists = JSON.parse(localStorage.getItem('followedArtists') || '[]');
    
    if (followedArtists.includes(artistId)) {
        $('.follow-btn').html('<i class="fas fa-user-check me-2"></i>Seguindo');
    }
});

// Enhanced artist page interactions
$(document).on('click', '.album-card .play-overlay button', function(e) {
    e.stopPropagation();
    const albumCard = $(this).closest('.album-card');
    const albumTitle = albumCard.find('.card-title').text();
    
    console.log('Playing album from artist page:', albumTitle);
    showNotification(`Reproduzindo ${albumTitle}`, 'success');
    
    // In a real app, this would start playing the album
    $('#musicPlayer').fadeIn();
    $('.play-pause-btn i').removeClass('fa-play').addClass('fa-pause');
});

// Artist page keyboard shortcuts
$(document).on('keydown', function(e) {
    if (!$('input, textarea').is(':focus') && window.location.pathname.includes('artist.html')) {
        switch(e.which) {
            case 70: // F key - follow/unfollow artist
                e.preventDefault();
                $('.follow-btn').click();
                break;
            case 82: // R key - start artist radio
                e.preventDefault();
                startArtistRadio();
                break;
            case 83: // S key - shuffle artist songs
                e.preventDefault();
                shuffleArtistSongs();
                break;
        }
    }
});
