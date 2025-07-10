// Simple test to verify if everything is loading
console.log('=== NAPISFY DEBUG START ===');

// Check if jQuery is loaded
if (typeof jQuery !== 'undefined') {
    console.log('✓ jQuery is loaded');
} else {
    console.log('✗ jQuery is NOT loaded');
}

// Check if Bootstrap is loaded
if (typeof bootstrap !== 'undefined') {
    console.log('✓ Bootstrap is loaded');
} else {
    console.log('✗ Bootstrap is NOT loaded');
}

// Check if Howler is loaded
if (typeof Howl !== 'undefined') {
    console.log('✓ Howler.js is loaded');
} else {
    console.log('✗ Howler.js is NOT loaded');
}

// Check DOM elements
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM is ready');
    
    // Check if player element exists
    const player = document.getElementById('musicPlayer');
    if (player) {
        console.log('✓ Player element found');
        console.log('Player display style:', player.style.display);
    } else {
        console.log('✗ Player element NOT found');
    }
    
    // Check if music player class exists
    setTimeout(() => {
        if (window.musicPlayer) {
            console.log('✓ Music Player class is initialized');
        } else {
            console.log('✗ Music Player class is NOT initialized');
        }
    }, 2000);
});

console.log('=== NAPISFY DEBUG END ===');
