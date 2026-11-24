(() => {
  const header = document.querySelector('.site-header, .p-header');
  const bars = [...document.querySelectorAll('.mobile-contact, .proposal-switcher')];
  if (!bars.length) return;

  function keepFocusVisible(target) {
    // Dialogs are in the top layer and scroll independently of the page.
    if (target.closest('dialog[open], .skip, .p-skip') || bars.some(bar => bar.contains(target))) return;

    const rect = target.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const margin = 8;
    const viewport = window.visualViewport;
    const viewportTop = viewport?.offsetTop ?? 0;
    const viewportBottom = viewportTop + (viewport?.height ?? window.innerHeight);
    let top = viewportTop + margin;
    let bottom = viewportBottom - margin;

    if (header && !header.contains(target)) {
      top = Math.max(top, header.getBoundingClientRect().bottom + margin);
    }
    for (const bar of bars) {
      const cover = bar.getBoundingClientRect();
      if (cover.height && cover.top < viewportBottom && cover.bottom > viewportTop &&
          rect.left < cover.right + margin && rect.right > cover.left - margin) {
        bottom = Math.min(bottom, cover.top - margin);
      }
    }
    if (bottom <= top) return;

    // If a large control cannot fit, reveal its start instead of its far edge.
    const distance = rect.top < top || rect.height > bottom - top
      ? rect.top - top
      : Math.max(0, rect.bottom - bottom);
    if (Math.abs(distance) >= 1) window.scrollBy({top: distance, behavior: 'instant'});
  }

  document.addEventListener('focusin', ({target}) => {
    if (!(target instanceof HTMLElement) || !target.matches(':focus-visible')) return;
    requestAnimationFrame(() => {
      if (document.activeElement === target) keepFocusVisible(target);
    });
  });
})();
