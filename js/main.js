document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('mainNav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.pageYOffset;
    if (current > lastScroll && current > 80) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
    lastScroll = current;
  });

  const bioHint = document.querySelector('.bio-hint');
  if (bioHint) {
    let clicks = 0;
    bioHint.addEventListener('click', () => {
      clicks++;
      if (clicks === 3) {
        bioHint.textContent = 'los calcetines perdidos estaban en tu carpeta “descargas”.';
        clicks = 0;
      }
    });
  }

  // === MINI PLAYER SIMPLE (usa tus propios audios) ===
  const tracks = [
    {
      title: 'weirdsocks – ntp',
      url: 'audio/ntp.mp3'   // cambia a la ruta real de tu mp3
    }
  ];

  let index = 0;
  let playing = false;
  const audio = new Audio(tracks[0].url);

  const titleEl   = document.getElementById('ws-title');
  const playBtn   = document.getElementById('ws-play');
  const prevBtn   = document.getElementById('ws-prev');
  const nextBtn   = document.getElementById('ws-next');
  const progEl    = document.getElementById('ws-progress');
  const curEl     = document.getElementById('ws-time-current');
  const totalEl   = document.getElementById('ws-time-total');

  function format(t) {
    if (!t || Number.isNaN(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function load(i) {
    index = (i + tracks.length) % tracks.length;
    audio.src = tracks[index].url;
    if (titleEl) titleEl.textContent = tracks[index].title;
    if (progEl) progEl.style.width = '0%';
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (!playing) {
        audio.play();
        playing = true;
        playBtn.textContent = '⏸';
      } else {
        audio.pause();
        playing = false;
        playBtn.textContent = '▶';
      }
    });
  }

  prevBtn && prevBtn.addEventListener('click', () => {
    load(index - 1);
    if (playing) audio.play();
  });

  nextBtn && nextBtn.addEventListener('click', () => {
    load(index + 1);
    if (playing) audio.play();
  });

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    if (progEl) progEl.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
    if (curEl) curEl.textContent = format(audio.currentTime);
    if (totalEl) totalEl.textContent = format(audio.duration);
  });

  audio.addEventListener('ended', () => {
    load(index + 1);
    if (playing) audio.play();
  });

  load(0);
});
