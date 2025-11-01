// Planet Play Loader - All in One Implementation
(function() {
    'use strict';
    
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
        
        .loader-container {
            text-align: center;
            position: relative;
        }
        
        .logo-container {
            margin-bottom: 30px;
            position: relative;
        }
        
        .logo-placeholder {
            width: 120px;
            height: 120px;
            background: linear-gradient(135deg, #1db954, #1ed760);
            border-radius: 50%;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #121212;
            font-weight: bold;
            animation: zoomInOut 2s ease-in-out infinite;
            box-shadow: 0 0 30px rgba(29, 185, 84, 0.3);
            position: relative;
            z-index: 10;
        }
        
        .logo-text {
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 1px;
        }
        
        .logo-image {
            width: 80%;
            height: 80%;
            object-fit: contain;
            border-radius: 50%;
        }
        
        .loading-dots {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 20px;
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
            letter-spacing: 2px;
        }
        
        .progress-bar {
            width: 200px;
            height: 4px;
            background-color: #333;
            border-radius: 2px;
            margin: 20px auto 0;
            overflow: hidden;
        }
        
        .progress {
            height: 100%;
            width: 0%;
            background-color: #1db954;
            border-radius: 2px;
            animation: progressLoad 3s ease-in-out forwards;
        }
        
        .pulse-ring {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 120px;
            height: 120px;
            border: 2px solid rgba(29, 185, 84, 0.3);
            border-radius: 50%;
            animation: pulseRing 2s ease-out infinite;
        }
        
        .pulse-ring:nth-child(2) {
            animation-delay: 0.5s;
        }
        
        .pulse-ring:nth-child(3) {
            animation-delay: 1s;
        }
        
        @keyframes zoomInOut {
            0% {
                transform: scale(0.8);
                box-shadow: 0 0 20px rgba(29, 185, 84, 0.4);
            }
            50% {
                transform: scale(1);
                box-shadow: 0 0 40px rgba(29, 185, 84, 0.7);
            }
            100% {
                transform: scale(0.8);
                box-shadow: 0 0 20px rgba(29, 185, 84, 0.4);
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
                width: 0%;
            }
            20% {
                width: 25%;
            }
            40% {
                width: 50%;
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
                transform: translateX(-50%) scale(0.8);
                opacity: 1;
            }
            100% {
                transform: translateX(-50%) scale(1.5);
                opacity: 0;
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
                        <!-- Logo will be inserted here by JavaScript -->
                        <span class="logo-text">PLANET PLAY</span>
                    </div>
                </div>
                
                <div class="loading-dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
                
                <div class="loading-text">LOADING</div>
                
                <div class="progress-bar">
                    <div class="progress"></div>
                </div>
            </div>
        </div>
    `;

    // Create loader element and inject HTML
    const loaderElement = document.createElement('div');
    loaderElement.innerHTML = loaderHTML;
    document.body.prepend(loaderElement.firstElementChild);

    // Planet Play Loader Class
    class PlanetPlayLoader {
        constructor(options = {}) {
            this.options = {
                logoUrl: options.logoUrl || 'null',
                logoAlt: options.logoAlt || 'Planet Play Logo',
                loadingText: options.loadingText || 'LOADING',
                duration: options.duration || 3000,
                autoStart: options.autoStart !== false,
                ...options
            };
            
            this.loader = document.querySelector('.planet-play-loader');
            this.logoPlaceholder = document.querySelector('.logo-placeholder');
            this.loadingTextElement = document.querySelector('.loading-text');
            
            this.init();
        }
        
        init() {
            // Set custom loading text if provided
            if (this.options.loadingText && this.loadingTextElement) {
                this.loadingTextElement.textContent = this.options.loadingText;
            }
            
            // Set custom logo if provided
            if (this.options.logoUrl && this.logoPlaceholder) {
                this.setLogo(this.options.logoUrl, this.options.logoAlt);
            }
            
            // Auto start if enabled
            if (this.options.autoStart) {
                this.show();
                
                // Auto hide after duration
                setTimeout(() => {
                    this.hide();
                }, this.options.duration);
            }
        }
        
        setLogo(url, alt = 'Logo') {
            if (this.logoPlaceholder) {
                this.logoPlaceholder.innerHTML = '';
                const img = document.createElement('img');
                img.src = url;
                img.alt = alt;
                img.className = 'logo-image';
                this.logoPlaceholder.appendChild(img);
            }
        }
        
        setLoadingText(text) {
            if (this.loadingTextElement) {
                this.loadingTextElement.textContent = text;
            }
        }
        
        show() {
            if (this.loader) {
                this.loader.classList.remove('hidden');
            }
        }
        
        hide() {
            if (this.loader) {
                this.loader.classList.add('hidden');
                
                // Remove from DOM after transition
                setTimeout(() => {
                    if (this.loader && this.loader.parentNode) {
                        this.loader.parentNode.removeChild(this.loader);
                    }
                }, 500);
            }
        }
        
        // For manual control in single page applications
        showForPageTransition() {
            this.show();
            
            // Simulate loading for page transitions
            setTimeout(() => {
                this.hide();
            }, 1500);
        }
    }

    // Initialize loader when DOM is ready
    function initLoader() {
        // Create global loader instance
        window.PlanetPlayLoader = new PlanetPlayLoader({
            // Customize these options as needed:
             logoUrl: '/Assets/image/logo/20240428_221650.png',
             loadingText: 'LOADING PLANET PLAY',
             duration: 4000,
            autoStart: true
        });
        
        // Also handle page load event as backup
        window.addEventListener('load', function() {
            setTimeout(() => {
                if (window.PlanetPlayLoader) {
                    window.PlanetPlayLoader.hide();
                }
            }, 1000);
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLoader);
    } else {
        initLoader();
    }

})();