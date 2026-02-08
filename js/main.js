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

  // Fit each nav text to fill its container width
  function fitNavItems() {
    const allNavLinks = document.querySelectorAll(
      '.center-nav .nav-item, .bottom-gallery .nav-item, .nav a'
    );
    allNavLinks.forEach(item => {
      // Reset transform to measure natural text width
      item.style.transform = 'none';
      // Force reflow so measurement is accurate
      void item.offsetWidth;
      const containerWidth = window.innerWidth;
      const textWidth = item.scrollWidth;
      if (textWidth > 0 && containerWidth > 0) {
        // Scale to 99% of viewport to avoid horizontal scrollbar
        const scaleX = (containerWidth * 0.99) / textWidth;
        item.style.transform = `scaleX(${scaleX})`;
        item.dataset.fitScaleX = scaleX;
      }
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
      const sx = item.dataset.fitScaleX || 1;
      item.style.transform = `scaleX(${sx}) scaleY(1.1)`;
    });
    item.addEventListener('mouseleave', () => {
      const sx = item.dataset.fitScaleX || 1;
      item.style.transform = `scaleX(${sx}) scaleY(1)`;
    });
  });
});

