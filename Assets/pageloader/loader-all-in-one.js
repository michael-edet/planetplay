// Planet Play Loader - Simple & Effective
(function() {
  'use strict';
  
  // Your logo path
  const LOGO_PATH = '/Assets/image/logo/20240428_221650.png';
  const MIN_DISPLAY_TIME = 2000; // 2 seconds minimum
  
  // Inject CSS
  const style = document.createElement('style');
  style.textContent = `
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
        
        .loader-content {
            text-align: center;
        }
        
        .logo-container {
            width: 120px;
            height: 120px;
            margin: 0 auto 30px;
            animation: zoomInOut 2s ease-in-out infinite;
        }
        
        .logo-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 50%;
            filter: drop-shadow(0 0 15px rgba(29, 185, 84, 0.6));
        }
        
        .loading-dots {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin: 25px 0;
        }
        
        .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #1db954;
            animation: dotPulse 1.5s ease-in-out infinite;
        }
        
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        .dot:nth-child(4) { animation-delay: 0.6s; }
        
        .loading-text {
            color: #b3b3b3;
            font-size: 14px;
            letter-spacing: 2px;
            margin-top: 15px;
        }
        
        @keyframes zoomInOut {
            0%, 100% { transform: scale(0.9); }
            50% { transform: scale(1.1); }
        }
        
        @keyframes dotPulse {
            0%, 100% { 
                transform: scale(0.8);
                opacity: 0.7;
            }
            50% { 
                transform: scale(1.2);
                opacity: 1;
            }
        }
    `;
  document.head.appendChild(style);
  
  // Create and inject loader HTML
  const loader = document.createElement('div');
  loader.className = 'planet-play-loader';
  loader.innerHTML = `
        <div class="loader-content">
            <div class="logo-container">
                <img src="${LOGO_PATH}" alt="Planet Play" class="logo-image">
            </div>
            <div class="loading-dots">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
            <div class="loading-text">LOADING</div>
        </div>
    `;
  document.body.prepend(loader);
  
  // Loader controller
  const startTime = Date.now();
  let loaderHidden = false;
  
  function hideLoader() {
    if (loaderHidden) return;
    
    const elapsed = Date.now() - startTime;
    const remaining = MIN_DISPLAY_TIME - elapsed;
    
    if (remaining > 0) {
      // Wait until minimum display time is reached
      setTimeout(hideLoader, remaining);
      return;
    }
    
    loader.classList.add('hidden');
    loaderHidden = true;
    
    // Remove from DOM after transition
    setTimeout(() => {
      if (loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
    }, 500);
  }
  
  // Start hiding process when page loads
  window.addEventListener('load', hideLoader);
  
  // Fallback: hide after 5 seconds max
  setTimeout(hideLoader, 5000);
  
})();