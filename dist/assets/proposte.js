(() => {
  // Le pagine originali hanno già una copia per l'apertura diretta da disco.
  if (window.location.protocol === 'file:') {
    const originalRoutes = new Set(['chi-siamo', 'servizi', 'lavori', 'ville-e-casali', 'ristrutturazione-e-restauri', 'appartamenti-in-vendita', 'contatti', 'privacy', 'cookie']);
    document.querySelectorAll('a[href]').forEach(anchor => {
      const href = anchor.getAttribute('href');
      if (href === '../index.html') anchor.href = '../../anteprima/index.html';
      else if (href.startsWith('../') && originalRoutes.has(href.slice(3).split('/')[0])) {
        anchor.href = '../../anteprima/' + href.slice(3);
      }
    });
  }

  const menuButton = document.querySelector('[data-menu]');
  const navigation = document.getElementById('navigazione');
  if (menuButton && navigation) {
    const closeMenu = () => {
      navigation.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Apri menu');
    };
    menuButton.addEventListener('click', event => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      navigation.classList.toggle('is-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
      if (open && event.detail === 0) navigation.querySelector('a[href]')?.focus();
    });
    navigation.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuButton.focus();
      }
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.p-header')) closeMenu();
    });
    document.addEventListener('focusin', event => {
      if (navigation.classList.contains('is-open') && !event.target.closest('.p-header')) closeMenu();
    });
    window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
  }

  document.querySelectorAll('[role="tablist"]').forEach(tablist => {
    const tabs = [...tablist.querySelectorAll('[role="tab"]')];
    const activate = (tab, focus = false) => {
      tabs.forEach(item => {
        const selected = item === tab;
        item.setAttribute('aria-selected', String(selected));
        item.tabIndex = selected ? 0 : -1;
        document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
      });
      if (focus) tab.focus();
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) {
          event.preventDefault();
          activate(tabs[next], true);
        }
      });
    });
  });

  document.querySelectorAll('[data-proposal-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const values = new FormData(form);
      const text = name => String(values.get(name) || '').trim();
      const subject = 'Richiesta sopralluogo · ' + text('intervento');
      const body = [
        'Buongiorno Sirio Costruzioni,', '',
        'vorrei informazioni per un intervento.', '',
        'Nome: ' + text('nome'),
        'Recapito: ' + text('recapito'),
        'Comune: ' + text('comune'),
        'Intervento: ' + text('intervento'), '',
        text('messaggio'), '', 'Grazie.',
      ].join('\n');
      // Il sito è statico: nessuna conferma fittizia di invio o raccolta remota.
      const destination = form.getAttribute('action') + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      const draft = form.querySelector('[data-email-draft]');
      draft.href = destination;
      draft.hidden = false;
      form.querySelector('[data-form-status]').textContent = 'La bozza è pronta. Aprila dal collegamento qui sotto, rileggila e inviala dalla tua app di posta. Nessun messaggio è stato ancora inviato.';
      draft.focus();
    });
  });
})();
