// Planet Play Loader - Complete Implementation
(function() {
    'use strict';
    
    // Your logo path - CHANGE THIS TO YOUR ACTUAL LOGO PATH
    const YOUR_LOGO_PATH = '/Assets/image/logo/20240428_221650.png';
    
    // Inject CSS for the loader
    const loaderCSS = `
        .planet-play-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #121212;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .planet-play-loader.hidden {
            opacity: 0;
            pointer-events: none;
        }
        
        .planet-play-loader.removed {
            display: none;
        }
        
        .loader-container {
            text-align: center;
            position: relative;
        }
        
        .logo-container {
            margin-bottom: 30px;
            position: relative;
        }
        
        .logo-placeholder {
            width: 150px;
            height: 150px;
            background: transparent;
            border-radius: 50%;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: zoomInOut 2s ease-in-out infinite;
            position: relative;
            z-index: 10;
            overflow: hidden;
            padding: 10px;
        }
        
        .logo-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 50%;
            filter: drop-shadow(0 0 20px rgba(29, 185, 84, 0.5));
        }
        
        .loading-dots {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 30px;
        }
        
        .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #1db954;
            animation: dotPulse 1.5s ease-in-out infinite;
        }
        
        .dot:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .dot:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        .dot:nth-child(4) {
            animation-delay: 0.6s;
        }
        
        .loading-text {
            margin-top: 20px;
            color: #b3b3b3;
            font-size: 14px;
            letter-spacing: 3px;
            font-weight: 300;
        }
        
        .progress-bar {
            width: 250px;
            height: 3px;
            background-color: #333;
            border-radius: 2px;
            margin: 25px auto 0;
            overflow: hidden;
        }
        
        .progress {
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, #1db954, #1ed760);
            border-radius: 2px;
            animation: progressLoad 2.5s ease-in-out forwards;
        }
        
        .pulse-ring {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 160px;
            height: 160px;
            border: 2px solid rgba(29, 185, 84, 0.3);
            border-radius: 50%;
            animation: pulseRing 2s ease-out infinite;
        }
        
        .pulse-ring:nth-child(2) {
            animation-delay: 0.7s;
        }
        
        .pulse-ring:nth-child(3) {
            animation-delay: 1.4s;
        }
        
        @keyframes zoomInOut {
            0% {
                transform: scale(0.9);
            }
            50% {
                transform: scale(1.1);
            }
            100% {
                transform: scale(0.9);
            }
        }
        
        @keyframes dotPulse {
            0%, 100% {
                transform: scale(0.8);
                opacity: 0.5;
            }
            50% {
                transform: scale(1.2);
                opacity: 1;
            }
        }
        
        @keyframes progressLoad {
            0% {
                width: 5%;
            }
            20% {
                width: 30%;
            }
            40% {
                width: 55%;
            }
            60% {
                width: 75%;
            }
            80% {
                width: 90%;
            }
            100% {
                width: 100%;
            }
        }
        
        @keyframes pulseRing {
            0% {
                transform: translate(-50%, -50%) scale(0.8);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(1.5);
                opacity: 0;
            }
        }

        /* Responsive design */
        @media (max-width: 768px) {
            .logo-placeholder {
                width: 120px;
                height: 120px;
            }
            
            .pulse-ring {
                width: 140px;
                height: 140px;
            }
            
            .progress-bar {
                width: 200px;
            }
        }

        @media (max-width: 480px) {
            .logo-placeholder {
                width: 100px;
                height: 100px;
            }
            
            .pulse-ring {
                width: 120px;
                height: 120px;
            }
            
            .progress-bar {
                width: 180px;
            }
            
            .loading-text {
                font-size: 12px;
                letter-spacing: 2px;
            }
        }
    `;

    // Create style element and inject CSS
    const styleElement = document.createElement('style');
    styleElement.textContent = loaderCSS;
    document.head.appendChild(styleElement);

    // Create loader HTML
    const loaderHTML = `
        <div class="planet-play-loader">
            <div class="loader-container">
                <div class="logo-container">
                    <div class="pulse-ring"></div>
                    <div class="pulse-ring"></div>
                    <div class="pulse-ring"></div>
                    <div class="logo-placeholder">
                        <img src="${YOUR_LOGO_PATH}" alt="Planet Play Logo" class="logo-image" onerror="handleLogoError(this)">
                    </div>
                </div>
                
                <div class="loading-dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
                
                <div class="loading-text">LOADING PLANET PLAY</div>
                
                <div class="progress-bar">
                    <div class="progress"></div>
                </div>
            </div>
        </div>
    `;

    // Handle logo loading errors
    window.handleLogoError = function(img) {
        console.error('Logo failed to load:', img.src);
        // Fallback to text if logo doesn't load
        img.style.display = 'none';
        const placeholder = img.parentElement;
        placeholder.innerHTML = '<div style="color: #1db954; font-size: 14px; font-weight: bold;">PLANET PLAY</div>';
        placeholder.style.background = 'linear-gradient(135deg, #1db954, #1ed760)';
    };

    // Create loader element and inject HTML
    const loaderElement = document.createElement('div');
    loaderElement.innerHTML = loaderHTML;
    document.body.prepend(loaderElement.firstElementChild);

    // Planet Play Loader Controller
    class PlanetPlayLoader {
        constructor() {
            this.loader = document.querySelector('.planet-play-loader');
            this.progressBar = document.querySelector('.progress');
            this.isVisible = true;
            
            this.init();
        }
        
        init() {
            // Preload the logo image
            this.preloadLogo();
            
            // Set up event listeners
            this.setupEventListeners();
            
            console.log('Planet Play Loader initialized');
        }
        
        preloadLogo() {
            const img = new Image();
            img.src = YOUR_LOGO_PATH;
            img.onload = () => {
                console.log('Logo loaded successfully');
            };
            img.onerror = () => {
                console.warn('Logo could not be loaded, using fallback');
            };
        }
        
        setupEventListeners() {
            // Hide loader when page is fully loaded
            window.addEventListener('load', () => {
                setTimeout(() => {
                    this.hide();
                }, 1000);
            });
            
            // Fallback: hide after 4 seconds max
            setTimeout(() => {
                if (this.isVisible) {
                    this.hide();
                }
            }, 4000);
        }
        
        hide() {
            if (!this.isVisible) return;
            
            this.isVisible = false;
            
            if (this.loader) {
                this.loader.classList.add('hidden');
                
                // Remove from DOM after transition
                setTimeout(() => {
                    if (this.loader && this.loader.parentNode) {
                        this.loader.classList.add('removed');
                    }
                }, 500);
            }
        }
        
        show() {
            this.isVisible = true;
            if (this.loader) {
                this.loader.classList.remove('hidden', 'removed');
            }
        }
        
        // For manual control in single page applications
        showForPageTransition(duration = 1500) {
            this.show();
            
            // Reset progress bar animation
            if (this.progressBar) {
                this.progressBar.style.animation = 'none';
                setTimeout(() => {
                    this.progressBar.style.animation = 'progressLoad 2.5s ease-in-out forwards';
                }, 10);
            }
            
            // Hide after specified duration
            setTimeout(() => {
                this.hide();
            }, duration);
        }
    }

    // Initialize loader when DOM is ready
    function initLoader() {
        // Make sure body has loaded and is visible
        document.body.style.visibility = 'hidden';
        
        // Create global loader instance
        window.PlanetPlayLoader = new PlanetPlayLoader();
        
        // When loader is done, show the page content
        const checkLoaderHidden = setInterval(() => {
            if (!window.PlanetPlayLoader.isVisible) {
                document.body.style.visibility = 'visible';
                clearInterval(checkLoaderHidden);
            }
        }, 100);
    }

    // Start the loader
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLoader);
    } else {
        initLoader();
    }

})();