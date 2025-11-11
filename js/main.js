/* ================================================= */
/* WEIRDSOCKS - JavaScript Principal                */
/* Funcionalidades: Navegación, scroll, interactions */
/* ================================================= */

document.addEventListener('DOMContentLoaded', function() {
    
    /* ============================================= */
    /* NAVEGACIÓN STICKY - Efecto al hacer scroll   */
    /* ============================================= */
    const nav = document.getElementById('mainNav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Si scrolleas hacia abajo, oculta nav
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.style.transform = 'translateY(-100%)';
        } 
        // Si scrolleas hacia arriba, muestra nav
        else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    /* ============================================= */
    /* SMOOTH SCROLL - Click en links del nav       */
    /* ============================================= */
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Solo para links internos (#)
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    /* ============================================= */
    /* FORMULARIO DE CONTACTO - Validación básica   */
    /* ============================================= */
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí irían validaciones reales y envío a backend
            // Por ahora, solo alerta de confirmación
            alert('¡Gracias por tu mensaje! Te responderemos pronto 🎸');
            
            // Resetear formulario
            this.reset();
        });
    }
    
    /* ============================================= */
    /* EASTER EGG - Konami Code                     */
    /* Código: ↑ ↑ ↓ ↓ ← → ← → B A                */
    /* ============================================= */
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 
        'ArrowDown', 'ArrowDown', 
        'ArrowLeft', 'ArrowRight', 
        'ArrowLeft', 'ArrowRight', 
        'b', 'a'
    ];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        // Verificar si la tecla coincide con el código
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            // Si completó el código
            if (konamiIndex === konamiCode.length) {
                activarModoSecreto();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activarModoSecreto() {
        // Cambiar a modo rainbow
        document.body.style.animation = 'rainbow 3s infinite';
        
        // Alert con mensaje secreto
        alert('🎸 ¡MODO SECRETO ACTIVADO! 🎸\n\nLos calcetines han despertado...\nVisita: archivo-x.html');
        
        // Añadir CSS de animación rainbow
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg) saturate(1); }
                100% { filter: hue-rotate(360deg) saturate(1.5); }
            }
        `;
        document.head.appendChild(style);
        
        // Resetear después de 10 segundos
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
    }
    
    /* ============================================= */
    /* EASTER EGG 2 - Click secreto en bio          */
    /* ============================================= */
    const bioHint = document.querySelector('.bio-hint');
    
    if (bioHint) {
        let clickCount = 0;
        bioHint.addEventListener('click', function() {
            clickCount++;
            
            if (clickCount === 3) {
                // Tercer click revela secreto
                this.innerHTML = '<small>Los calcetines perdidos están en: <a href="dimension-calcetines.html" style="color: #ff00ff;">La Dimensión Calcetines</a></small>';
                clickCount = 0;
            }
        });
    }
    
    /* ============================================= */
    /* ANIMACIÓN DE APARICIÓN AL HACER SCROLL       */
    /* ============================================= */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    const animateElements = document.querySelectorAll('.tour-item, .photo-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
    
    /* ============================================= */
    /* GALERÍA - Click para ampliar (opcional)      */
    /* ============================================= */
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const imgSrc = img.getAttribute('src');
            
            // Crear overlay con imagen grande
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                cursor: pointer;
            `;
            
            const largeImg = document.createElement('img');
            largeImg.src = imgSrc;
            largeImg.style.cssText = `
                max-width: 90%;
                max-height: 90vh;
                object-fit: contain;
            `;
            
            overlay.appendChild(largeImg);
            document.body.appendChild(overlay);
            
            // Click para cerrar
            overlay.addEventListener('click', () => {
                document.body.removeChild(overlay);
            });
        });
    });
    
    console.log('🎸 WEIRDSOCKS web loaded successfully');
    console.log('Tip: Prueba el Konami Code para descubrir un secreto...');
    
});
