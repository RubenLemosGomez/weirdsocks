// Esperar a que cargue el DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Referencias a elementos
    const video = document.getElementById('mainVideo');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    const loginForm = document.getElementById('loginForm');
    const registerButton = document.querySelector('.register-button');

    // Control de reproducción
    if (playBtn && video) {
        playBtn.addEventListener('click', function() {
            video.play();
            console.log('Video playing');
        });
    }

    // Control de pausa
    if (pauseBtn && video) {
        pauseBtn.addEventListener('click', function() {
            video.pause();
            console.log('Video paused');
        });
    }

    // Control de mute/unmute
    let isMuted = false;
    if (muteBtn && video) {
        muteBtn.addEventListener('click', function() {
            if (isMuted) {
                video.muted = false;
                muteBtn.querySelector('.btn-icon').textContent = '🔊';
                isMuted = false;
            } else {
                video.muted = true;
                muteBtn.querySelector('.btn-icon').textContent = '🔇';
                isMuted = true;
            }
        });
    }

    // Formulario de login
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username && password) {
                alert(`¡Bienvenido a WEIRDSOCKS, ${username}! 🎸🎵`);
                // Aquí irían las validaciones reales
            } else {
                alert('Por favor completa todos los campos');
            }
        });
    }

    // Botón de registro
    if (registerButton) {
        registerButton.addEventListener('click', function() {
            alert('¡Próximamente! Sigue a WEIRDSOCKS en Instagram @weirdsocks para enterarte primero 🦋✨');
        });
    }

    // Easter egg: Konami code
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateSecretMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateSecretMode() {
        document.body.style.animation = 'rainbow 2s infinite';
        alert('🎸 ¡MODO SECRETO ACTIVADO! Descubriste el easter egg de WEIRDSOCKS 🎸');
        
        // Añadir animación rainbow
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    // Efecto de partículas al hacer hover en el logo
    const logo = document.querySelector('.site-logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.animation = 'logoGlow 0.5s ease-in-out';
        });
    }

});
