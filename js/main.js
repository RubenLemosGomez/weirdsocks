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

    const MAX_SCALE_X = 2.0; // allow stretch without blowing up font-size
    const EDGE_INSET_PX = 16; // safety inset to avoid edge clipping

    allNavLinks.forEach(item => {
      // Reset transform to measure accurately
      item.style.transform = 'none';
      void item.offsetWidth;

      const containerWidth = item.getBoundingClientRect().width;
      if (!(containerWidth > 0)) return;

      const targetWidth = Math.max(0, containerWidth - EDGE_INSET_PX);
      if (!(targetWidth > 0)) return;

      const computed = window.getComputedStyle(item);

      // Measure real rendered text width using a temporary span
      const measureTextWidth = () => {
        const measurer = document.createElement('span');
        measurer.textContent = item.textContent || '';
        measurer.style.position = 'absolute';
        measurer.style.left = '-99999px';
        measurer.style.top = '-99999px';
        measurer.style.whiteSpace = 'nowrap';
        measurer.style.fontFamily = computed.fontFamily;
        measurer.style.fontSize = window.getComputedStyle(item).fontSize;
        measurer.style.fontWeight = computed.fontWeight;
        measurer.style.fontStyle = computed.fontStyle;
        measurer.style.letterSpacing = computed.letterSpacing;
        measurer.style.textTransform = computed.textTransform;
        measurer.style.lineHeight = computed.lineHeight;
        document.body.appendChild(measurer);
        const width = measurer.getBoundingClientRect().width;
        measurer.remove();
        return width;
      };

      let textWidth = measureTextWidth();
      if (!(textWidth > 0)) return;

      // Desired scale to touch both edges
      let desiredScaleX = targetWidth / textWidth;

      const scaleX = Math.min(desiredScaleX, MAX_SCALE_X);
      item.style.transformOrigin = 'center center';
      item.style.transform = `scaleX(${scaleX})`;
      item.dataset.fitScaleX = String(scaleX);
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

