// Album page specific JavaScript
$(document).ready(function() {
    // Get album ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const albumId = urlParams.get('id') || 'after-hours';
    
    // Load album data
    loadAlbumData(albumId);
    
    // Setup album-specific functionality
    setupAlbumPage();
});

function loadAlbumData(albumId) {
    // Sample album data - in a real app, this would come from an API
    const albumData = {
        'after-hours': {
            title: 'After Hours',
            artist: 'The Weeknd',
            year: '2020',
            genre: 'R&B, Pop, Synthpop',
            label: 'XO, Republic Records',
            producer: 'The Weeknd, Max Martin, Ahmad Balshe',
            image: 'https://via.placeholder.com/300x300/1DB954/ffffff?text=After+Hours',
            description: 'After Hours é o quarto álbum de estúdio do artista canadense The Weeknd. Foi lançado em 20 de março de 2020 pela XO e Republic Records. O álbum apresenta os sucessos "Heartless", "Blinding Lights" e "Save Your Tears".',
            totalTracks: 14,
            duration: '56 min 16 seg',
            tracks: [
                { number: 1, title: 'Alone Again', duration: '4:10', plays: '523,847,392' },
                { number: 2, title: 'Too Late', duration: '3:59', plays: '287,123,456' },
                { number: 3, title: 'Hardest to Love', duration: '3:31', plays: '195,673,892' },
                { number: 4, title: 'Blinding Lights', duration: '3:20', plays: '2,847,392,156', popular: true },
                { number: 5, title: 'In Your Eyes', duration: '3:57', plays: '687,234,891' },
                { number: 6, title: 'Save Your Tears', duration: '3:35', plays: '1,234,567,890' },
                { number: 7, title: 'Repeat After Me (Interlude)', duration: '3:15', plays: '156,432,789' },
                { number: 8, title: 'After Hours', duration: '6:01', plays: '445,678,123' },
                { number: 9, title: 'Snowchild', duration: '4:07', plays: '298,765,432' },
                { number: 10, title: 'Escape from LA', duration: '5:55', plays: '234,567,891' },
                { number: 11, title: 'Heartless', duration: '3:18', plays: '1,567,890,123' },
                { number: 12, title: 'Faith', duration: '4:43', plays: '345,678,912' },
                { number: 13, title: 'Until I Bleed Out', duration: '8:11', plays: '423,789,156' },
                { number: 14, title: 'Final Lullaby', duration: '3:25', plays: '187,654,321' }
            ]
        },
        'dawn-fm': {
            title: 'Dawn FM',
            artist: 'The Weeknd',
            year: '2022',
            genre: 'Synthwave, R&B, Pop',
            label: 'XO, Republic Records',
            producer: 'The Weeknd, Max Martin, OPN',
            image: 'https://via.placeholder.com/300x300/1ED760/ffffff?text=Dawn+FM',
            description: 'Dawn FM é o quinto álbum de estúdio de The Weeknd, lançado em 7 de janeiro de 2022. O álbum é conceitual e apresenta uma narrativa de rádio, com Jim Carrey como locutor.',
            totalTracks: 16,
            duration: '51 min 32 seg',
            tracks: [
                { number: 1, title: 'Dawn FM', duration: '1:34', plays: '234,567,890' },
                { number: 2, title: 'Gasoline', duration: '3:32', plays: '456,789,123' },
                { number: 3, title: 'How Do I Make You Love Me?', duration: '3:30', plays: '345,678,234' },
                { number: 4, title: 'Take My Breath', duration: '3:40', plays: '789,123,456', popular: true },
                { number: 5, title: 'Sacrifice', duration: '3:08', plays: '567,890,234' },
                { number: 6, title: 'A Tale By Quincy', duration: '1:57', plays: '123,456,789' },
                { number: 7, title: 'Out of Time', duration: '3:34', plays: '678,234,567' },
                { number: 8, title: 'Here We Go... Again', duration: '4:02', plays: '234,567,123' },
                { number: 9, title: 'Best Friends', duration: '2:43', plays: '345,678,901' },
                { number: 10, title: 'Is There Someone Else?', duration: '3:19', plays: '456,789,234' },
                { number: 11, title: 'Starry Eyes', duration: '3:20', plays: '567,123,890' },
                { number: 12, title: 'Every Angel is Terrifying', duration: '1:48', plays: '123,890,456' },
                { number: 13, title: 'Don\'t Break My Heart', duration: '3:25', plays: '789,456,123' },
                { number: 14, title: 'I Heard You\'re Married', duration: '4:10', plays: '234,123,567' },
                { number: 15, title: 'Less Than Zero', duration: '3:31', plays: '456,567,890' },
                { number: 16, title: 'Phantom Regret by Jim', duration: '5:39', plays: '345,234,678' }
            ]
        }
        // Add more albums as needed
    };
    
    const album = albumData[albumId] || albumData['after-hours'];
    
    // Update page content
    updateAlbumHeader(album);
    updateAlbumInfo(album);
    updateTracklist(album.tracks);
    loadRelatedAlbums(album.artist);
}

function updateAlbumHeader(album) {
    // Update page title
    $('title').text(`MusicStream - ${album.title} - ${album.artist}`);
    
    // Update breadcrumb
    $('.breadcrumb-item').last().text(album.title);
    
    // Update album cover
    $('.album-cover-large img').attr('src', album.image).attr('alt', album.title);
    
    // Update album info
    $('.album-info h1').text(album.title);
    $('.album-meta').html(`
        <img src="https://via.placeholder.com/30x30/1DB954/ffffff?text=${album.artist.charAt(0)}" 
             alt="${album.artist}" class="rounded-circle me-2">
        <span class="fw-bold me-3">${album.artist}</span>
        <span class="text-muted me-3">•</span>
        <span class="text-muted me-3">${album.year}</span>
        <span class="text-muted me-3">•</span>
        <span class="text-muted me-3">${album.totalTracks} músicas</span>
        <span class="text-muted me-3">•</span>
        <span class="text-muted">${album.duration}</span>
    `);
}

function updateAlbumInfo(album) {
    // Update album description
    $('.album-info-section p').text(album.description);
    
    // Update album details
    $('.album-details').html(`
        <div class="row">
            <div class="col-sm-6">
                <strong>Data de lançamento:</strong><br>
                <span class="text-muted">${getFormattedDate(album.year)}</span>
            </div>
            <div class="col-sm-6">
                <strong>Gravadora:</strong><br>
                <span class="text-muted">${album.label}</span>
            </div>
            <div class="col-sm-6 mt-3">
                <strong>Gênero:</strong><br>
                <span class="text-muted">${album.genre}</span>
            </div>
            <div class="col-sm-6 mt-3">
                <strong>Produtor:</strong><br>
                <span class="text-muted">${album.producer}</span>
            </div>
        </div>
    `);
}

function updateTracklist(tracks) {
    const tbody = $('.tracklist-body');
    tbody.empty();
    
    tracks.forEach(track => {
        const isLiked = isTrackLiked(track.title);
        const trackRow = $(`
            <tr class="track-row" data-track="${track.number}">
                <td>
                    <div class="track-number">
                        <span class="number">${track.number}</span>
                        <button class="btn btn-link text-light play-btn" style="display: none;">
                            <i class="fas fa-play"></i>
                        </button>
                    </div>
                </td>
                <td>
                    <div class="track-info">
                        <div class="track-title ${track.popular ? 'popular-track' : ''}">${track.title}</div>
                        <div class="track-artist text-muted">The Weeknd</div>
                    </div>
                </td>
                <td class="text-muted">${track.plays}</td>
                <td class="text-muted">${track.duration}</td>
                <td>
                    <div class="track-actions">
                        <button class="btn btn-link text-light like-btn">
                            <i class="${isLiked ? 'fas text-primary' : 'far'} fa-heart"></i>
                        </button>
                        <div class="dropdown">
                            <button class="btn btn-link text-light" data-bs-toggle="dropdown">
                                <i class="fas fa-ellipsis-h"></i>
                            </button>
                            <ul class="dropdown-menu bg-secondary">
                                <li><a class="dropdown-item text-light" href="#">Adicionar à fila</a></li>
                                <li><a class="dropdown-item text-light" href="#">Adicionar à playlist</a></li>
                                <li><a class="dropdown-item text-light" href="#">Ir para rádio da música</a></li>
                                <li><a class="dropdown-item text-light" href="#">Compartilhar</a></li>
                            </ul>
                        </div>
                    </div>
                </td>
            </tr>
        `);
        
        tbody.append(trackRow);
    });
}

function setupAlbumPage() {
    // Play album button
    $('.play-album-btn').on('click', function() {
        playAlbum();
    });
    
    // Save/unsave album
    $('.follow-btn').on('click', function() {
        toggleAlbumSave($(this));
    });
    
    // Enhanced track hover effects
    $(document).on('mouseenter', '.track-row', function() {
        $(this).find('.number').hide();
        $(this).find('.play-btn').show();
    });
    
    $(document).on('mouseleave', '.track-row', function() {
        if (!$(this).hasClass('playing')) {
            $(this).find('.number').show();
            $(this).find('.play-btn').hide();
        }
    });
    
    // Track play functionality
    $(document).on('click', '.track-row .play-btn', function(e) {
        e.stopPropagation();
        const trackRow = $(this).closest('.track-row');
        const trackNumber = trackRow.data('track');
        playTrackFromAlbum(trackNumber, trackRow);
    });
    
    // Double-click to play track
    $(document).on('dblclick', '.track-row', function() {
        const trackNumber = $(this).data('track');
        playTrackFromAlbum(trackNumber, $(this));
    });
}

function playAlbum() {
    console.log('Playing entire album');
    
    // Update button state
    const playBtn = $('.play-album-btn');
    const icon = playBtn.find('i');
    
    if (icon.hasClass('fa-play')) {
        icon.removeClass('fa-play').addClass('fa-pause');
        playBtn.html('<i class="fas fa-pause me-2"></i>Pausar');
        
        // Play first track
        playTrackFromAlbum(1, $('.track-row').first());
    } else {
        icon.removeClass('fa-pause').addClass('fa-play');
        playBtn.html('<i class="fas fa-play me-2"></i>Reproduzir');
        
        // Pause current track
        pauseCurrentTrack();
    }
    
    // Show player
    $('#musicPlayer').fadeIn();
}

function playTrackFromAlbum(trackNumber, trackElement) {
    console.log('Playing track number:', trackNumber);
    
    // Remove previous playing state
    $('.track-row').removeClass('playing');
    $('.track-row .play-btn i').removeClass('fa-pause').addClass('fa-play');
    
    // Add playing state to current track
    trackElement.addClass('playing');
    trackElement.find('.play-btn i').removeClass('fa-play').addClass('fa-pause');
    trackElement.find('.play-btn').show();
    trackElement.find('.number').hide();
    
    // Get track info
    const trackTitle = trackElement.find('.track-title').text();
    const trackArtist = trackElement.find('.track-artist').text();
    const albumCover = $('.album-cover-large img').attr('src');
    
    // Update player
    updatePlayerDisplay(trackTitle, trackArtist, albumCover);
    
    // Show and update music player
    $('#musicPlayer').fadeIn();
    $('.play-pause-btn i').removeClass('fa-play').addClass('fa-pause');
    
    // Update album play button
    $('.play-album-btn').html('<i class="fas fa-pause me-2"></i>Pausar');
    
    // Start playback
    playCurrentTrack();
    
    // Save to recently played
    saveToRecentlyPlayed(trackTitle, trackArtist, albumCover);
}

function toggleAlbumSave(button) {
    const icon = button.find('i');
    const isSaved = icon.hasClass('fa-heart');
    
    if (isSaved) {
        icon.removeClass('fa-heart').addClass('fa-heart');
        button.html('<i class="far fa-heart me-2"></i>Salvar');
        showNotification('Álbum removido da biblioteca', 'success');
    } else {
        icon.removeClass('fa-heart').addClass('fa-heart');
        button.html('<i class="fas fa-heart me-2"></i>Salvo');
        showNotification('Álbum adicionado à biblioteca', 'success');
    }
    
    // Save state
    const albumId = new URLSearchParams(window.location.search).get('id') || 'after-hours';
    saveAlbumState(albumId, !isSaved);
}

function loadRelatedAlbums(artistName) {
    // Sample related albums
    const relatedAlbums = [
        {
            title: 'Dawn FM',
            year: '2022',
            image: 'https://via.placeholder.com/200x200/1ED760/ffffff?text=Dawn+FM',
            id: 'dawn-fm'
        },
        {
            title: 'Starboy',
            year: '2016',
            image: 'https://via.placeholder.com/200x200/1AA34A/ffffff?text=Starboy',
            id: 'starboy'
        },
        {
            title: 'Beauty Behind the Madness',
            year: '2015',
            image: 'https://via.placeholder.com/200x200/FF6B6B/ffffff?text=Beauty',
            id: 'beauty-behind-the-madness'
        }
    ];
    
    const container = $('.mb-5').last().find('.row');
    container.empty();
    
    relatedAlbums.forEach(album => {
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
                            <p class="card-text text-muted small">${album.year}</p>
                        </div>
                    </div>
                </div>
            </div>
        `);
        container.append(albumCard);
    });
}

// Utility functions
function isTrackLiked(trackTitle) {
    const likedTracks = JSON.parse(localStorage.getItem('likedTracks') || '[]');
    return likedTracks.includes(trackTitle.toLowerCase().replace(/\s+/g, '-'));
}

function saveAlbumState(albumId, isSaved) {
    let savedAlbums = JSON.parse(localStorage.getItem('savedAlbums') || '[]');
    
    if (isSaved && !savedAlbums.includes(albumId)) {
        savedAlbums.push(albumId);
    } else if (!isSaved && savedAlbums.includes(albumId)) {
        savedAlbums = savedAlbums.filter(id => id !== albumId);
    }
    
    localStorage.setItem('savedAlbums', JSON.stringify(savedAlbums));
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

function getFormattedDate(year) {
    // In a real app, this would format the actual release date
    const dates = {
        '2020': '20 de março de 2020',
        '2022': '7 de janeiro de 2022',
        '2016': '25 de novembro de 2016',
        '2015': '28 de agosto de 2015'
    };
    
    return dates[year] || `${year}`;
}

// Enhanced keyboard shortcuts for album page
$(document).on('keydown', function(e) {
    if (!$('input, textarea').is(':focus')) {
        switch(e.which) {
            case 32: // Spacebar - play/pause
                e.preventDefault();
                $('.play-pause-btn').click();
                break;
            case 37: // Left arrow - previous track
                e.preventDefault();
                $('.prev-btn').click();
                break;
            case 39: // Right arrow - next track
                e.preventDefault();
                $('.next-btn').click();
                break;
            case 76: // L key - like current track
                e.preventDefault();
                $('.track-row.playing .like-btn').click();
                break;
        }
    }
});

// Auto-load saved album state
$(document).ready(function() {
    const albumId = new URLSearchParams(window.location.search).get('id') || 'after-hours';
    const savedAlbums = JSON.parse(localStorage.getItem('savedAlbums') || '[]');
    
    if (savedAlbums.includes(albumId)) {
        $('.follow-btn').html('<i class="fas fa-heart me-2"></i>Salvo');
    }
});
