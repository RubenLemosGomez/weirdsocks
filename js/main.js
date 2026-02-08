// WEIRDSOCKS - Main JavaScript
// Loading screen and interactions

document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const mainContent = document.getElementById('mainContent');
  
  // Show loading screen for 2.5 seconds on initial load
  setTimeout(() => {
    loader.classList.add('hidden');
    mainContent.classList.add('visible');
    // Fit nav items after content is visible
    fitNavItems();
  }, 2500);

  // Refit once fonts are ready (important for accurate text measurement)
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      fitNavItems();
    });
  }

  // Fit each nav text to fill its container width
  function fitNavItems() {
    const allNavLinks = document.querySelectorAll(
      '.center-nav .nav-item, .bottom-gallery .nav-item, .nav a'
    );

    allNavLinks.forEach(item => {
      const label = (item.textContent || '').trim().toUpperCase();

      // HOME: custom optimization
      if (label === 'HOME') {
        item.style.fontSize = '12vh';
        item.style.transform = 'scaleX(2.3)';
        item.dataset.fitScaleX = '2.3';
        return;
      }

      // MUSIC: custom optimization
      if (label === 'MUSIC') {
        item.style.fontSize = '11vh';
        item.style.transform = 'scaleX(2.25)';
        item.dataset.fitScaleX = '2.25';
        return;
      }

      // TOUR: custom optimization
      if (label === 'TOUR') {
        item.style.fontSize = '12.5vh';
        item.style.transform = 'scaleX(2.35)';
        item.dataset.fitScaleX = '2.35';
        return;
      }

      // GALLERY: custom optimization
      if (label === 'GALLERY') {
        item.style.fontSize = '7.8vw';
        item.style.transform = 'scaleX(2.15)';
        item.dataset.fitScaleX = '2.15';
        return;
      }

      // CONTACT: custom optimization
      if (label === 'CONTACT') {
        item.style.fontSize = '8.2vw';
        item.style.transform = 'scaleX(2.05)';
        item.dataset.fitScaleX = '2.05';
        return;
      }

      // Fallback for any other items (shouldn't happen but just in case)
      item.style.fontSize = '8vw';
      item.style.transform = 'scaleX(2.0)';
      item.dataset.fitScaleX = '2.0';
    });
  }

  // Refit on resize
  window.addEventListener('resize', fitNavItems);
  
  // Add loading screen transition when clicking navigation links
  const navLinks = document.querySelectorAll('.nav-item, .nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetUrl = link.getAttribute('href');
      
      // Show loader
      loader.classList.remove('hidden');
      mainContent.classList.remove('visible');
      
      // Navigate after short delay
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 800);
    });
  });

  // Update hover to keep fit scale
  const allItems = document.querySelectorAll(
    '.center-nav .nav-item, .bottom-gallery .nav-item, .nav a'
  );
  allItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const sx = Number(item.dataset.fitScaleX || 1);
      item.style.transform = `scaleX(${sx}) scaleY(1.05)`;
    });
    item.addEventListener('mouseleave', () => {
      const sx = Number(item.dataset.fitScaleX || 1);
      item.style.transform = `scaleX(${sx}) scaleY(1)`;
    });
  });
});

