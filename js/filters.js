export function initCourseFilters() {
  const filterRoot = document.querySelector('[data-course-filter]');
  if (!filterRoot) return;

  const searchInput = filterRoot.querySelector('[data-search]');
  const levelSelect = filterRoot.querySelector('[data-level]');
  const durationSelect = filterRoot.querySelector('[data-duration]');
  const sortSelect = filterRoot.querySelector('[data-sort]');
  const cards = Array.from(filterRoot.querySelectorAll('.course-card'));

  const getCourseData = (card) => ({
    title: card.dataset.title || '',
    level: card.dataset.level || '',
    duration: Number(card.dataset.duration || 0),
    price: Number(card.dataset.price || 0),
    category: card.dataset.category || ''
  });

  const applyFilters = () => {
    const query = (searchInput?.value || '').trim().toLowerCase();
    const level = levelSelect?.value || 'all';
    const duration = durationSelect?.value || 'all';
    const sort = sortSelect?.value || 'default';

    let filtered = cards.filter((card) => {
      const data = getCourseData(card);
      const matchesSearch = !query || data.title.toLowerCase().includes(query);
      const matchesLevel = level === 'all' || data.level === level;
      const matchesDuration = duration === 'all' || (
        duration === 'short' && data.duration <= 3 ||
        duration === 'medium' && data.duration > 3 && data.duration <= 6 ||
        duration === 'long' && data.duration > 6
      );
      return matchesSearch && matchesLevel && matchesDuration;
    });

    if (sort === 'price-asc') {
      filtered = filtered.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
    } else if (sort === 'price-desc') {
      filtered = filtered.sort((a, b) => Number(b.dataset.price) - Number(a.dataset.price));
    }

    cards.forEach((card) => {
      card.classList.add('hidden');
    });

    filtered.forEach((card) => {
      card.classList.remove('hidden');
    });

    const emptyState = filterRoot.querySelector('[data-empty-state]');
    if (emptyState) {
      emptyState.classList.toggle('hidden', filtered.length > 0);
    }
  };

  [searchInput, levelSelect, durationSelect, sortSelect].forEach((el) => {
    el?.addEventListener('input', applyFilters);
    el?.addEventListener('change', applyFilters);
  });

  applyFilters();
}
