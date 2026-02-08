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

    const MAX_SCALE_X = 2.2;
    const MAX_FONT_BOOST = 1.65;
    const INSET_NORMAL_PX = 6;
    const INSET_ACTIVE_PX = 22;

    allNavLinks.forEach(item => {
      const label = (item.textContent || '').trim().toUpperCase();

      // GALLERY: custom optimization
      if (label === 'GALLERY') {
        item.style.fontSize = '7.8vw';
        item.style.transform = 'scaleX(2.0)';
        item.dataset.fitScaleX = '2.0';
        return;
      }

      // CONTACT: custom optimization
      if (label === 'CONTACT') {
        item.style.fontSize = '8.2vw';
        item.style.transform = 'scaleX(1.9)';
        item.dataset.fitScaleX = '1.9';
        return;
      }

      // For all other items: use the complex auto-fit logic
      if (!item.dataset.baseFontSize) {
        item.dataset.baseFontSize = window.getComputedStyle(item).fontSize;
      }

      item.style.transform = 'none';
      item.style.fontSize = item.dataset.baseFontSize;
      void item.offsetWidth;

      const containerWidth = item.getBoundingClientRect().width;
      if (!(containerWidth > 0)) return;

      let perSideInset = item.classList.contains('active') ? INSET_ACTIVE_PX : INSET_NORMAL_PX;
      const targetWidth = Math.max(0, containerWidth - (perSideInset * 2));
      if (!(targetWidth > 0)) return;

      const computed = window.getComputedStyle(item);

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

      let desiredScaleX = targetWidth / textWidth;

      if (desiredScaleX > MAX_SCALE_X) {
        const baseFontPx = parseFloat(item.dataset.baseFontSize);
        if (Number.isFinite(baseFontPx) && baseFontPx > 0) {
          const neededBoost = desiredScaleX / MAX_SCALE_X;
          const appliedBoost = Math.min(neededBoost, MAX_FONT_BOOST);
          item.style.fontSize = `${baseFontPx * appliedBoost}px`;
          void item.offsetWidth;
          textWidth = measureTextWidth();
          if (textWidth > 0) desiredScaleX = targetWidth / textWidth;
        }
      }

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

