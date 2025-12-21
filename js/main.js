/* ================================================= */
/* WEIRDSOCKS - JavaScript Principal                 */
/* Navegación, easter eggs y mini player 2000s       */
/* ================================================= */

document.addEventListener('DOMContentLoaded', function() {

  /* ============================================= */
  /* NAVEGACIÓN STICKY                             */
  /* ============================================= */

  const nav = document.getElementById('mainNav');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
  });

  /* ============================================= */
  /* SMOOTH SCROLL LINKS INTERIORES (si los usas)  */
  /* ============================================= */

  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
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
  /* FORMULARIO DE CONTACTO (otras páginas)        */
  /* ============================================= */

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('¡Gracias por tu mensaje! Te responderemos pronto 🎸');
      this.reset();
    });
  }

  /* ============================================= */
  /* EASTER EGG - KONAMI CODE                      */
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
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        activarModoSecreto();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  function activarModoSecreto() {
    document.body.style.animation = 'rainbow 3s infinite';

    alert('🎸 ¡MODO SECRETO ACTIVADO! 🎸\n\nLos calcetines han despertado...\nVisita: archivo-x.html');

    const style = document.createElement('style');
    style.textContent = `
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg) saturate(1); }
        100% { filter: hue-rotate(360deg) saturate(1.5); }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      document.body.style.animation = '';
    }, 10000);
  }

  /* ============================================= */
  /* EASTER EGG 2 - Triple click en la bio         */
  /* ============================================= */

  const bioHint = document.querySelector('.bio-hint');
  if (bioHint) {
    let clickCount = 0;
    bioHint.addEventListener('click', function() {
      clickCount++;
      if (clickCount === 3) {
        this.innerHTML = 'los calcetines perdidos están en: La Dimensión Calcetines 👾';
        clickCount = 0;
      }
    });
  }

  /* ============================================= */
  /* MINI PLAYER 2000s FRUTIGER AERO               */
  /* ============================================= */

  // Lista de temas; pon URLs a tus archivos o a previews propios.
  const tracks = [
    {
      title: 'ntp',
      url: 'https://p.scdn.co/mp3-preview/0000000000000000000000000000000000000000?cid=demo' // cámbialo por un mp3 tuyo
    }
    // puedes añadir más:
    // { title: 'otro tema', url: 'ruta.mp3' }
  ];

  let currentIndex = 0;
  let isPlaying = false;

  const audio = new Audio(tracks[currentIndex].url);

  const titleEl    = document.getElementById('ws-title');
  const playBtn    = document.getElementById('ws-play');
  const prevBtn    = document.getElementById('ws-prev');
  const nextBtn    = document.getElementById('ws-next');
  const progressEl = document.getElementById('ws-progress');
  const timeCurEl  = document.getElementById('ws-time-current');
  const timeTotEl  = document.getElementById('ws-time-total');

  function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function loadTrack(i) {
    currentIndex = (i + tracks.length) % tracks.length;
    audio.src = tracks[currentIndex].url;
    titleEl && (titleEl.textContent = tracks[currentIndex].title);
    progressEl && (progressEl.style.width = '0%');
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (!isPlaying) {
        audio.play();
        isPlaying = true;
        playBtn.textContent = '⏸';
      } else {
        audio.pause();
        isPlaying = false;
        playBtn.textContent = '▶';
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      loadTrack(currentIndex - 1);
      if (isPlaying) audio.play();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      loadTrack(currentIndex + 1);
      if (isPlaying) audio.play();
    });
  }

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration || !progressEl) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    progressEl.style.width = pct + '%';

    if (timeCurEl) timeCurEl.textContent = formatTime(audio.currentTime);
    if (timeTotEl) timeTotEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('ended', () => {
    loadTrack(currentIndex + 1);
    if (isPlaying) audio.play();
  });

  loadTrack(0);

  /* ============================================= */
  /* ANIMACIÓN DE APARICIÓN AL HACER SCROLL (si hay) */
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

  const animateElements = document.querySelectorAll('.tour-date-item, .friend-box');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });

  /* ============================================= */
  /* LOG                                           */
  /* ============================================= */

  console.log('WEIRDSOCKS web loaded successfully');
  console.log('Tip: Prueba el Konami Code para descubrir un secreto...');
});
