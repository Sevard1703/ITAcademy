export function initAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach((item) => item.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  reveals.forEach((item) => observer.observe(item));

  const counters = document.querySelectorAll('[data-count]');
  counters.forEach((counter) => {
    const target = Number(counter.dataset.count || 0);
    const suffix = counter.dataset.suffix || '';
    let current = 0;
    const duration = 1200;
    const stepTime = Math.max(16, duration / target);
    const interval = setInterval(() => {
      current += 1;
      counter.textContent = `${current}${suffix}`;
      if (current >= target) {
        clearInterval(interval);
      }
    }, stepTime);
  });
}
