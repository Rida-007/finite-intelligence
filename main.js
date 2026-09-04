const scrollPercentEl = document.getElementById('scroll-percent');

// Update Scroll Percent Text
window.addEventListener('scroll', () => {
  if (scrollPercentEl) {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) : 0;
    const pct = Math.floor(scrollPercent * 100).toString().padStart(3, '0');
    if (scrollPercentEl.innerText !== pct) {
        scrollPercentEl.innerText = pct;
    }
  }
}, { passive: true });

// === HERO VIDEO VIEWPORT OBSERVER ===
const heroVideo = document.getElementById('hero-video');
const heroSection = document.getElementById('hero-section');

if (heroVideo && heroSection) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // When entering viewport, restart and play
        heroVideo.currentTime = 0;
        heroVideo.play().catch(e => console.log("Autoplay prevented:", e));
      } else {
        // When leaving viewport, pause to save resources
        heroVideo.pause();
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Triggers when at least 10% of hero section is visible
  });

  videoObserver.observe(heroSection);
}

// === INTERSECTION OBSERVER FOR FADE INS ===
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add fade-in classes to elements
const styleFadeIn = document.createElement('style');
styleFadeIn.innerHTML = `
  .topic-list li, .wwd-row, .story-text p {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .topic-list li.visible, .wwd-row.visible, .story-text p.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(styleFadeIn);

document.querySelectorAll('.topic-list li, .wwd-row, .story-text p').forEach(el => {
  observer.observe(el);
});

// === NAVBAR 9-DOT MENU TOGGLE ===
const menuToggle = document.getElementById('menu-toggle');
const navOverlay = document.getElementById('nav-overlay');
const overlayLinks = document.querySelectorAll('.overlay-link');

if (menuToggle && navOverlay) {
  menuToggle.addEventListener('click', () => {
    navOverlay.classList.toggle('active');
  });

  // Close menu when a link is clicked
  overlayLinks.forEach(link => {
    link.addEventListener('click', () => {
      navOverlay.classList.remove('active');
    });
  });
}
