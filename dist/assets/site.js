
document.documentElement.classList.add("enhanced");

const mapPanel = document.querySelector("[data-map]");
if (mapPanel) {
  const mapButton = mapPanel.querySelector("[data-map-toggle]");
  const mapFrame = mapPanel.querySelector("[data-map-frame]");
  const mapPlaceholder = mapPanel.querySelector("[data-map-placeholder]");
  mapButton.hidden = false;
  mapButton.addEventListener("click", () => {
    const showMap = mapFrame.hidden;
    if (showMap) mapFrame.src = mapFrame.dataset.src;
    else mapFrame.removeAttribute("src");
    mapFrame.hidden = !showMap;
    mapPlaceholder.hidden = showMap;
    mapButton.setAttribute("aria-expanded", String(showMap));
    mapButton.textContent = showMap ? "Chiudi la mappa" : "Mostra mappa Google Maps";
  });
}

const menuButton = document.querySelector("[data-menu-trigger]");
const navigation = document.querySelector("[data-navigation]");
if (menuButton && navigation) {
  const desktop = window.matchMedia("(min-width: 52rem)");

  function closeMenu(restoreFocus = false) {
    menuButton.setAttribute("aria-expanded", "false");
    navigation.removeAttribute("data-open");
    if (restoreFocus) menuButton.focus();
  }

  menuButton.addEventListener("click", () => {
    const opened = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!opened));
    navigation.toggleAttribute("data-open", !opened);
  });
  navigation.addEventListener("click", event => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && navigation.hasAttribute("data-open")) closeMenu(true);
  });
  document.addEventListener("click", event => {
    if (navigation.hasAttribute("data-open") && !event.target.closest(".site-header")) closeMenu();
  });
  desktop.addEventListener("change", () => closeMenu());
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (!reducedMotion.matches && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      if (entry.boundingClientRect.top > 90) entry.target.classList.add("is-in");
      revealObserver.unobserve(entry.target);
    }
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));
}

const progress = document.querySelector(".progress");
if (progress && !reducedMotion.matches) {
  let pending = false;
  function updateProgress() {
    const scrollable = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = "scaleX(" + Math.min(1, scrollable > 0 ? scrollY / scrollable : 0) + ")";
    pending = false;
  }
  function scheduleProgress() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(updateProgress);
  }
  addEventListener("scroll", scheduleProgress, { passive: true });
  addEventListener("resize", scheduleProgress);
  updateProgress();
}

const filterGroup = document.querySelector("[data-filters]");
if (filterGroup) {
  const controls = [...filterGroup.querySelectorAll("button")];
  const cards = [...document.querySelectorAll("[data-project-category]")];
  const status = document.querySelector("[data-filter-status]");
  filterGroup.hidden = false;
  filterGroup.addEventListener("click", event => {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;
    const filter = button.dataset.filter;
    controls.forEach(control => control.setAttribute("aria-pressed", String(control === button)));
    let visible = 0;
    for (const card of cards) {
      card.hidden = filter !== "tutti" && !card.dataset.projectCategory.split(" ").includes(filter);
      if (!card.hidden) visible += 1;
    }
    status.textContent = visible === 1 ? "1 lavoro" : visible + " lavori";
  });
}

const dialog = document.querySelector("[data-lightbox]");
if (dialog && typeof dialog.showModal === "function") {
  const thumbnails = [...document.querySelectorAll("[data-gallery-item]")];
  const image = dialog.querySelector("img");
  const caption = dialog.querySelector("[data-lightbox-caption]");
  const controls = [...dialog.querySelectorAll("[data-step]")];
  let currentIndex = 0;
  let opener;

  function displayImage(index) {
    currentIndex = (index + thumbnails.length) % thumbnails.length;
    const item = thumbnails[currentIndex];
    image.src = item.href;
    image.alt = item.querySelector("img").alt;
    caption.textContent = image.alt + " · " + (currentIndex + 1) + " / " + thumbnails.length;
  }

  for (const [index, thumbnail] of thumbnails.entries()) {
    thumbnail.addEventListener("click", event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = thumbnail;
      displayImage(index);
      dialog.showModal();
    });
  }
  controls.forEach(button => {
    button.hidden = thumbnails.length < 2;
    button.addEventListener("click", () => displayImage(currentIndex + Number(button.dataset.step)));
  });
  dialog.querySelector("[data-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") displayImage(currentIndex - 1);
    if (event.key === "ArrowRight") displayImage(currentIndex + 1);
  });
  dialog.addEventListener("close", () => {
    image.removeAttribute("src");
    opener?.focus();
  });
}

const contactForm = document.querySelector("[data-contact-form]");
if (contactForm) {
  contactForm.hidden = false;
  const topic = new URLSearchParams(location.search).get("interesse");
  const topicField = contactForm.elements.intervento;
  if (topic && [...topicField.options].some(option => option.value === topic)) topicField.value = topic;
  contactForm.addEventListener("submit", event => {
    event.preventDefault();
    const fields = new FormData(contactForm);
    const get = key => String(fields.get(key) || "").trim();
    const subject = "Richiesta Sirio Costruzioni" + (get("intervento") ? " — " + get("intervento") : "");
    const body = [
      "Buongiorno,",
      "",
      get("messaggio"),
      "",
      "Nome: " + get("nome"),
      "Recapito: " + get("recapito"),
      "Comune: " + get("comune"),
      "Intervento: " + (get("intervento") || "da definire")
    ].join("\r\n");
    const email = document.querySelector("[data-direct-email]").getAttribute("href");
    location.href = email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    contactForm.querySelector("[data-form-status]").textContent = "Controlla la bozza nella tua app di posta e inviala quando è pronta.";
  });
}
