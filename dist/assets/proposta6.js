(() => {
  const region = document.querySelector('.s6-showcase');
  if (!region) return;
  const slides = [...region.querySelectorAll('[data-slide]')];
  const buttons = [...region.querySelectorAll('[data-show-slide]')];
  const controls = region.querySelector('.s6-slide-controls');
  const status = region.querySelector('.s6-slide-status');
  const select = index => {
    slides.forEach((slide,i) => { slide.hidden = i !== index; });
    buttons.forEach((button,i) => { button.setAttribute('aria-pressed', String(i === index)); });
    status.textContent = `0${index + 1} / 0${slides.length}`;
  };
  controls.hidden = false;
  buttons.forEach((button,index) => {
    button.addEventListener('click', () => select(index));
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % slides.length;
      if (event.key === 'ArrowLeft') next = (index + slides.length - 1) % slides.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = slides.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        select(next);
        buttons[next].focus();
      }
    });
  });
})();
