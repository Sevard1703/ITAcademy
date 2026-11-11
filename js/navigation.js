export function initNavigation() {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('.site-nav');
  const currentPage = document.body.dataset.page;

  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 18);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (currentPage) {
    document.querySelectorAll('.site-nav a').forEach((link) => {
      const href = link.getAttribute('href');
      const isActive = href && href.replace('./', '') === `${currentPage}.html`;
      if (isActive) {
        link.classList.add('active');
      }
    });
  }

  const backToTop = document.querySelector('[data-back-to-top]');
  if (backToTop) {
    const toggleVisibility = () => {
      backToTop.classList.toggle('hidden', window.scrollY < 300);
    };
    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
