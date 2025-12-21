document.addEventListener('DOMContentLoaded', () => {
  
  // Scroll nav
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

  // Mini player
  const tracks = [
    { title: 'ntp', url: 'audio/ntp.mp3' }
  ];

  let index = 0;
  let playing = false;
  const audio = new Audio(tracks[0].url);

  const titleEl = document.getElementById('track-title');
  const playBtn = document.getElementById('play-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const progressEl = document.getElementById('progress');
  const currentEl = document.getElementById('current-time');
  const totalEl = document.getElementById('total-time');

  function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function loadTrack(i) {
    index = (i + tracks.length) % tracks.length;
    audio.src = tracks[index].url;
    if (titleEl) titleEl.textContent = tracks[index].title;
    if (progressEl) progressEl.style.width = '0%';
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

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      loadTrack(index - 1);
      if (playing) audio.play();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      loadTrack(index + 1);
      if (playing) audio.play();
    });
  }

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    if (progressEl) {
      progressEl.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
    }
    if (currentEl) currentEl.textContent = formatTime(audio.currentTime);
    if (totalEl) totalEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('ended', () => {
    loadTrack(index + 1);
    if (playing) audio.play();
  });

  loadTrack(0);
});
