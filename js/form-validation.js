export function initForms() {
  const forms = document.querySelectorAll('form[data-demo-form]');

  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      let isValid = true;

      form.querySelectorAll('[data-validate]').forEach((field) => {
        const name = field.dataset.validate;
        const value = (field.value || '').trim();
        const errorEl = field.parentElement?.querySelector('.error-text');
        let hasError = false;

        if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          hasError = true;
        }

        if (name === 'phone' && !/^\+?[\d\s()-]{7,}$/.test(value)) {
          hasError = true;
        }

        if (name === 'required' && value.length < 2) {
          hasError = true;
        }

        if (field.tagName === 'SELECT' && !value) {
          hasError = true;
        }

        field.classList.toggle('has-error', hasError);
        if (errorEl) {
          errorEl.style.display = hasError ? 'block' : 'none';
        }
        if (hasError) isValid = false;
      });

      const successMessage = form.querySelector('.success-message');
      if (successMessage) {
        successMessage.classList.toggle('show', isValid);
      }

      if (!isValid) return;

      const button = form.querySelector('button[type="submit"]');
      if (button) {
        const originalText = button.textContent;
        button.disabled = true;
        button.textContent = 'Отправлено';
        setTimeout(() => {
          button.disabled = false;
          button.textContent = originalText;
          form.reset();
        }, 1400);
      }
    });
  });

  const faqItems = document.querySelectorAll('.accordion-item');
  faqItems.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    const content = item.querySelector('.accordion-content');
    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.classList.toggle('open', !isOpen);
      content.style.maxHeight = isOpen ? '0px' : `${content.scrollHeight + 8}px`;
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}
