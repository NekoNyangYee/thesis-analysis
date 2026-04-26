const sections = document.querySelectorAll('.slide');
const navLinks = document.querySelectorAll('.nav-list a');

// Fade-in observer: triggers when slide enters viewport
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      // Fade out when leaving viewport (only if scrolled past significantly)
      const rect = entry.target.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) {
        entry.target.classList.remove('visible');
      }
    }
  });
}, { threshold: 0.15 });

sections.forEach(s => fadeObserver.observe(s));

// Active link highlighting on scroll
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObserver.observe(s));

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  const slides = Array.from(sections);
  const current = slides.findIndex(s => {
    const r = s.getBoundingClientRect();
    return r.top >= -50 && r.top < window.innerHeight / 2;
  });
  if (e.key === 'ArrowDown' || e.key === 'PageDown') {
    e.preventDefault();
    const next = slides[Math.min(current + 1, slides.length - 1)];
    next?.scrollIntoView({ behavior: 'smooth' });
  } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
    e.preventDefault();
    const prev = slides[Math.max(current - 1, 0)];
    prev?.scrollIntoView({ behavior: 'smooth' });
  }
});
