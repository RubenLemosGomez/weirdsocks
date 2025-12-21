// WEIRDSOCKS - Main JavaScript
// Loading screen and interactions

document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const mainContent = document.getElementById('mainContent');
  
  // Show loading screen for 2.5 seconds
  setTimeout(() => {
    loader.classList.add('hidden');
    mainContent.classList.add('visible');
  }, 2500);
  
  // Preload background gif for smoother experience
  const bgGif = new Image();
  bgGif.src = 'https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif';
});

