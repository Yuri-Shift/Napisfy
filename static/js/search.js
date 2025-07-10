// Search page specific JavaScript
$(document).ready(function() {
    // Get search query from URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    
    if (query) {
        $('#searchInput').val(query);
        performSearchOnPage(query);
    }
    
    // Setup search filters
    setupSearchFilters();
});

function performSearchOnPage(query) {
    // Update page title and header
    $('title').text(`MusicStream - Resultado da busca por "${query}"`);
    $('.search-header h1').text(`Resultado da busca por "${query}"`);
    
    // Load search results for each category
    loadAllSearchResults(query);
    loadSongsResults(query);
    loadArtistsResults(query);
    loadAlbumsResults(query);
    loadPlaylistsResults(query);
}

function setupSearchFilters() {
    // Tab switching functionality
    $('.search-filters .nav-link').on('click', function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        
        // Update active tab
        $('.search-filters .nav-link').removeClass('active');
        $(this).addClass('active');
        
        // Show corresponding content
        $('.tab-pane').removeClass('show active');
        $(target).addClass('show active');
        
        // Load content if not already loaded
        const tabName = target.substring(1); // Remove #
        if (tabName !== 'all' && $(target).children().length === 0) {
            loadTabContent(tabName);
        }
    });
}

function loadAllSearchResults(query) {
    // This is already loaded in the HTML for demo purposes
    // In a real app, you would make API calls here
    console.log('Loading all search results for:', query);
}

function loadSongsResults(query) {
    const container = $('#songs .songs-list');
    
    // Sample songs data
    const songs = [
        {
            title: 'Blinding Lights',
            artist: 'The Weeknd',
            album: 'After Hours',
            duration: '3:20',
            image: 'https://via.placeholder.com/50x50/1DB954/ffffff?text=BL'
        },
        {
            title: 'Save Your Tears',
            artist: 'The Weeknd',
            album: 'After Hours',
            duration: '3:35',
            image: 'https://via.placeholder.com/50x50/1ED760/ffffff?text=SYT'
        },
        {
            title: 'Die For You',
            artist: 'The Weeknd',
            album: 'Starboy',
            duration: '4:20',
            image: 'https://via.placeholder.com/50x50/1AA34A/ffffff?text=DFY'
        },
        {
            title: 'Starboy',
            artist: 'The Weeknd ft. Daft Punk',
            album: 'Starboy',
            duration: '3:50',
            image: 'https://via.placeholder.com/50x50/FF6B6B/ffffff?text=SB'
        },
        {
            title: 'Earned It',
            artist: 'The Weeknd',
            album: 'Beauty Behind the Madness',
            duration: '4:37',
            image: 'https://via.placeholder.com/50x50/4ECDC4/ffffff?text=EI'
        },
        {
            title: 'Can\'t Feel My Face',
            artist: 'The Weeknd',
            album: 'Beauty Behind the Madness',
            duration: '3:35',
            image: 'https://via.placeholder.com/50x50/45B7D1/ffffff?text=CFMF'
        },
        {
            title: 'The Hills',
            artist: 'The Weeknd',
            album: 'Beauty Behind the Madness',
            duration: '4:02',
            image: 'https://via.placeholder.com/50x50/96CEB4/ffffff?text=TH'
        },
        {
            title: 'Often',
            artist: 'The Weeknd',
            album: 'Beauty Behind the Madness',
            duration: '4:09',
            image: 'https://via.placeholder.com/50x50/FECA57/ffffff?text=O'
        }
    ];
    
    container.empty();
    songs.forEach((song, index) => {
        const songHtml = `
            <div class="song-item" data-song="${song.title.toLowerCase().replace(/\s+/g, '-')}">
                <div class="row align-items-center">
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
                        <div class="song-artist text-muted">${song.artist}</div>
                    </div>
                    <div class="col-auto d-none d-md-block">
                        <div class="text-muted small">${song.album}</div>
                    </div>
                    <div class="col-auto">
                        <span class="song-duration text-muted">${song.duration}</span>
                    </div>
                    <div class="col-auto">
                        <div class="dropdown">
                            <button class="btn btn-link text-light" data-bs-toggle="dropdown">
                                <i class="fas fa-ellipsis-h"></i>
                            </button>
                            <ul class="dropdown-menu bg-secondary">
                                <li><a class="dropdown-item text-light" href="#">Adicionar à playlist</a></li>
                                <li><a class="dropdown-item text-light" href="#">Curtir</a></li>
                                <li><a class="dropdown-item text-light" href="#">Ir para álbum</a></li>
                                <li><a class="dropdown-item text-light" href="#">Compartilhar</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.append(songHtml);
    });
}

function loadArtistsResults(query) {
    const container = $('#artistsResults');
    
    // Sample artists data
    const artists = [
        {
            name: 'The Weeknd',
            followers: '85.2M ouvintes mensais',
            image: 'https://via.placeholder.com/200x200/1DB954/ffffff?text=The+Weeknd',
            verified: true
        },
        {
            name: 'Bruno Mars',
            followers: '67.8M ouvintes mensais',
            image: 'https://via.placeholder.com/200x200/1ED760/ffffff?text=Bruno+Mars',
            verified: true
        },
        {
            name: 'Dua Lipa',
            followers: '73.1M ouvintes mensais',
            image: 'https://via.placeholder.com/200x200/1AA34A/ffffff?text=Dua+Lipa',
            verified: true
        },
        {
            name: 'Ariana Grande',
            followers: '81.5M ouvintes mensais',
            image: 'https://via.placeholder.com/200x200/FF6B6B/ffffff?text=Ariana',
            verified: true
        },
        {
            name: 'Drake',
            followers: '92.3M ouvintes mensais',
            image: 'https://via.placeholder.com/200x200/4ECDC4/ffffff?text=Drake',
            verified: true
        },
        {
            name: 'Billie Eilish',
            followers: '64.2M ouvintes mensais',
            image: 'https://via.placeholder.com/200x200/45B7D1/ffffff?text=Billie',
            verified: true
        }
    ];
    
    container.empty();
    artists.forEach(artist => {
        const artistHtml = `
            <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                <div class="artist-card" onclick="goToArtist('${artist.name.toLowerCase().replace(/\s+/g, '-')}')">
                    <div class="card bg-transparent border-0">
                        <img src="${artist.image}" class="card-img-top artist-image rounded-circle" alt="${artist.name}">
                        <div class="card-body p-2 text-center">
                            <h6 class="card-title mb-1">
                                ${artist.name}
                                ${artist.verified ? '<i class="fas fa-check-circle text-primary ms-1"></i>' : ''}
                            </h6>
                            <p class="card-text text-muted small">${artist.followers}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.append(artistHtml);
    });
}

function loadAlbumsResults(query) {
    const container = $('#albumsResults');
    
    // Sample albums data
    const albums = [
        {
            title: 'After Hours',
            artist: 'The Weeknd',
            year: '2020',
            image: 'https://via.placeholder.com/200x200/1DB954/ffffff?text=After+Hours'
        },
        {
            title: 'Dawn FM',
            artist: 'The Weeknd',
            year: '2022',
            image: 'https://via.placeholder.com/200x200/1ED760/ffffff?text=Dawn+FM'
        },
        {
            title: 'Starboy',
            artist: 'The Weeknd',
            year: '2016',
            image: 'https://via.placeholder.com/200x200/1AA34A/ffffff?text=Starboy'
        },
        {
            title: 'Beauty Behind the Madness',
            artist: 'The Weeknd',
            year: '2015',
            image: 'https://via.placeholder.com/200x200/FF6B6B/ffffff?text=Beauty'
        },
        {
            title: 'Kiss Land',
            artist: 'The Weeknd',
            year: '2013',
            image: 'https://via.placeholder.com/200x200/4ECDC4/ffffff?text=Kiss+Land'
        },
        {
            title: 'Trilogy',
            artist: 'The Weeknd',
            year: '2012',
            image: 'https://via.placeholder.com/200x200/45B7D1/ffffff?text=Trilogy'
        }
    ];
    
    container.empty();
    albums.forEach(album => {
        const albumHtml = `
            <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                <div class="album-card" onclick="goToAlbum('${album.title.toLowerCase().replace(/\s+/g, '-')}')">
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
                            <p class="card-text text-muted small">${album.year} • ${album.artist}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.append(albumHtml);
    });
}

function loadPlaylistsResults(query) {
    const container = $('#playlistsResults');
    
    // Sample playlists data
    const playlists = [
        {
            title: 'This Is The Weeknd',
            description: 'Os maiores sucessos de The Weeknd',
            image: 'https://via.placeholder.com/200x200/1DB954/ffffff?text=This+Is',
            curator: 'MusicStream'
        },
        {
            title: 'The Weeknd Deep Cuts',
            description: 'Faixas menos conhecidas de The Weeknd',
            image: 'https://via.placeholder.com/200x200/1ED760/ffffff?text=Deep+Cuts',
            curator: 'MusicStream'
        },
        {
            title: 'R&B Central',
            description: 'O melhor do R&B contemporâneo',
            image: 'https://via.placeholder.com/200x200/1AA34A/ffffff?text=R%26B',
            curator: 'MusicStream'
        },
        {
            title: 'Dark Pop',
            description: 'Pop sombrio e atmosférico',
            image: 'https://via.placeholder.com/200x200/FF6B6B/ffffff?text=Dark+Pop',
            curator: 'MusicStream'
        },
        {
            title: 'Weekend Vibes',
            description: 'Para curtir o fim de semana',
            image: 'https://via.placeholder.com/200x200/4ECDC4/ffffff?text=Weekend',
            curator: 'MusicStream'
        },
        {
            title: 'Night Drive',
            description: 'Trilha sonora perfeita para a noite',
            image: 'https://via.placeholder.com/200x200/45B7D1/ffffff?text=Night',
            curator: 'MusicStream'
        }
    ];
    
    container.empty();
    playlists.forEach(playlist => {
        const playlistHtml = `
            <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                <div class="album-card">
                    <div class="card bg-transparent border-0">
                        <div class="position-relative">
                            <img src="${playlist.image}" class="card-img-top album-cover" alt="${playlist.title}">
                            <div class="play-overlay">
                                <button class="btn btn-primary rounded-circle">
                                    <i class="fas fa-play"></i>
                                </button>
                            </div>
                        </div>
                        <div class="card-body p-2">
                            <h6 class="card-title mb-1">${playlist.title}</h6>
                            <p class="card-text text-muted small">${playlist.description}</p>
                            <p class="card-text text-muted small">Por ${playlist.curator}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.append(playlistHtml);
    });
}

function loadTabContent(tabName) {
    const query = $('#searchInput').val();
    
    switch(tabName) {
        case 'songs':
            loadSongsResults(query);
            break;
        case 'artists':
            loadArtistsResults(query);
            break;
        case 'albums':
            loadAlbumsResults(query);
            break;
        case 'playlists':
            loadPlaylistsResults(query);
            break;
    }
}

// Enhanced search functionality
function performAdvancedSearch(query, filters = {}) {
    // In a real application, this would make API calls with filters
    console.log('Performing advanced search:', query, filters);
    
    // Show loading state
    showSearchLoading();
    
    // Simulate API delay
    setTimeout(() => {
        hideSearchLoading();
        // Load results based on filters
        if (filters.type) {
            loadFilteredResults(query, filters.type);
        } else {
            loadAllSearchResults(query);
        }
    }, 1000);
}

function showSearchLoading() {
    $('.tab-content').addClass('loading');
}

function hideSearchLoading() {
    $('.tab-content').removeClass('loading');
}

function loadFilteredResults(query, type) {
    switch(type) {
        case 'track':
            loadSongsResults(query);
            break;
        case 'artist':
            loadArtistsResults(query);
            break;
        case 'album':
            loadAlbumsResults(query);
            break;
        case 'playlist':
            loadPlaylistsResults(query);
            break;
    }
}

// Search suggestions functionality
function showSearchSuggestions(query) {
    const suggestions = [
        'The Weeknd',
        'The Weeknd - Blinding Lights',
        'The Weeknd - After Hours',
        'The Weeknd - Save Your Tears',
        'The Hills - The Weeknd',
        'Earned It - The Weeknd'
    ].filter(item => item.toLowerCase().includes(query.toLowerCase()));
    
    if (suggestions.length > 0 && query.length > 0) {
        const suggestionsHtml = suggestions.map(suggestion => 
            `<div class="suggestion-item p-2 text-light" data-suggestion="${suggestion}">
                <i class="fas fa-search me-2 text-muted"></i>${suggestion}
            </div>`
        ).join('');
        
        const dropdown = $(`
            <div class="search-suggestions position-absolute w-100 bg-secondary border border-secondary rounded mt-1" 
                 style="top: 100%; z-index: 1000; max-height: 300px; overflow-y: auto;">
                ${suggestionsHtml}
            </div>
        `);
        
        // Remove existing suggestions
        $('.search-suggestions').remove();
        
        // Add new suggestions
        $('.search-input').parent().append(dropdown);
        
        // Handle suggestion clicks
        $('.suggestion-item').on('click', function() {
            const suggestion = $(this).data('suggestion');
            $('#searchInput').val(suggestion);
            $('.search-suggestions').remove();
            performSearch(suggestion);
        });
    }
}

// Add event listener for search input on search page
$(document).on('input', '#searchInput', function() {
    const query = $(this).val();
    if (query.length > 1) {
        showSearchSuggestions(query);
    } else {
        $('.search-suggestions').remove();
    }
});

// Hide suggestions when clicking outside
$(document).on('click', function(e) {
    if (!$(e.target).closest('.search-input, .search-suggestions').length) {
        $('.search-suggestions').remove();
    }
});

// Recent searches functionality
function saveRecentSearch(query) {
    let recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    
    // Remove if already exists
    recentSearches = recentSearches.filter(search => search !== query);
    
    // Add to beginning
    recentSearches.unshift(query);
    
    // Keep only last 10 searches
    recentSearches = recentSearches.slice(0, 10);
    
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
}

function loadRecentSearches() {
    return JSON.parse(localStorage.getItem('recentSearches') || '[]');
}

// Clear search functionality
function clearSearch() {
    $('#searchInput').val('');
    $('.search-suggestions').remove();
    
    // Reset to default state or redirect to home
    window.location.href = 'index.html';
}

// Export functions for global use
window.showSearchResults = function() {
    window.location.href = 'search.html';
};

// Auto-focus search input on search page
$(document).ready(function() {
    if (window.location.pathname.includes('search.html')) {
        $('#searchInput').focus();
    }
});
