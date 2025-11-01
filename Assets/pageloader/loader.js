// Page Loader Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loader
    initLoader();
});

function initLoader() {
    // Remove the 'loaded' class to show the loader
    document.body.classList.remove('loaded');
    
    // Check if page is fully loaded
    window.addEventListener('load', function() {
        // Wait a moment to show the loading animation
        setTimeout(function() {
            hideLoader();
        }, 2000);
    });
    
    // Fallback: hide loader after 4 seconds max
    setTimeout(function() {
        hideLoader();
    }, 4000);
}

function hideLoader() {
    document.body.classList.add('loaded');
    
    // Optional: Add a smooth transition effect
    const loader = document.querySelector('.loader-container');
    if (loader) {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.5s ease';
        
        setTimeout(function() {
            loader.style.display = 'none';
        }, 500);
    }
}

// Optional: Show loader during page transitions
function showLoader() {
    document.body.classList.remove('loaded');
    const loader = document.querySelector('.loader-container');
    if (loader) {
        loader.style.display = 'flex';
        loader.style.opacity = '1';
    }
}

// Export functions for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initLoader, hideLoader, showLoader };
}