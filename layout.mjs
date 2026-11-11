
import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {business, images, services} from "./content.mjs";

const manifest = JSON.parse(readFileSync(new URL("./image-manifest.json", import.meta.url), "utf8"));
const stylesheet = readFileSync(new URL("./dist/assets/site.css", import.meta.url));
const stylesheetVersion = createHash("sha256").update(stylesheet).digest("hex").slice(0, 12);
const scriptVersion = createHash("sha256").update(readFileSync(new URL("./dist/assets/site.js", import.meta.url))).digest("hex").slice(0, 12);
const previewArg = process.argv.find(arg => arg.startsWith("--preview="));
export const preview = Boolean(previewArg);
export const origin = preview ? new URL(previewArg.slice(10)).origin : "https://www.siriocostruzionisrl.com";

export const icons = {
  arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  diagonal: '<path d="M6 18 18 6M8 6h10v10"/>',
  phone: '<path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2c-3-1.2-5.8-4-7-7l2-2-2-5Z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  zoom: '<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5M7 10h6m-3-3v6"/>'
};

const entities = {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};
export const escape = value => String(value).replace(/[&<>"']/g, char => entities[char]);
export const route = path => path ? "/" + path.replace(/^\/+|\/+$/g, "") + "/" : "/";
export const absolute = path => new URL(path, origin).href;
export const icon = (name, attributes = "") => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${attributes}>${icons[name]}</svg>`;
export const paragraph = text => `<p>${escape(text)}</p>`;
export const eyebrow = text => `<p class="eyebrow">${escape(text)}</p>`;
export const btn = (href, label, theme = "") => `<a class="btn${theme ? " btn-" + theme : ""}" href="${escape(href)}">${escape(label)} ${icon("arrow")}</a>`;
export const textLink = (href, label, symbol = "arrow") => `<a class="text-link" href="${escape(href)}">${escape(label)} ${icon(symbol)}</a>`;
export const interest = (topic = "") => route("contatti") + (topic ? "?interesse=" + encodeURIComponent(topic) : "") + "#richiesta";

const pageItems = [
  ["chi-siamo", "Impresa"], ["servizi", "Servizi"], ["lavori", "Lavori"], ["appartamenti-in-vendita", "Immobili"], ["contatti", "Contatti"]
];

const plan = '<svg class="blueprint" viewBox="0 0 540 330" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M-20 235 233 84l268 99-250 160zM71 232V133L229 35l186 66v112M71 133l168 57 176-89M239 190v98m-12-253V8M-15 109l285 105M130 280l282-177M12 256l259-158m-54 212 283-165M84 170l145-88 170 60-159 95zM113 187l57-34 107 39-58 36zM309 165l58-34 38 13-57 36zM68 90l390 144m-31-149v156M458 82v192M36 280l444-256"/></svg>';

function brand() {
  const {w, h, files} = manifest.logo;
  return `<a class="brand brand-original" href="/" aria-label="Sirio Costruzioni, Home"><img src="/assets/images/${files[0].file}" width="${w}" height="${h}" alt="Sirio Costruzioni" decoding="async"></a>`;
}

function header(active, current) {
  const links = pageItems.map(([path, label]) => `<a href="${route(path)}"${active === path ? ' aria-current="' + (route(path) === current ? "page" : "location") + '"' : ""}>${label}</a>`).join("");
  return `<a class="skip" href="#contenuto">Vai al contenuto</a><header class="site-header"><div class="head-row shell">${brand()}<button class="menu-trigger" type="button" data-menu-trigger aria-expanded="false" aria-controls="menu-principale">${icon("menu", "data-icon-open")} ${icon("close", "data-icon-close")} Menu</button><nav class="navigation" id="menu-principale" data-navigation aria-label="Menu principale">${links}${btn(interest(), "Sopralluogo")}</nav></div><div class="progress" aria-hidden="true"></div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="shell"><div class="foot-grid"><div>${brand()}<p>Impresa edile a Sirolo<br>Riviera del Conero · Provincia di Ancona</p></div><div><h2>Pagine e servizi</h2><ul>${pageItems.map(([url, label]) => `<li><a href="${route(url)}">${label}</a></li>`).join("")}${services.map(service => `<li><a href="${route(service.id)}">${escape(service.title)}</a></li>`).join("")}</ul></div><div><h2>Recapiti</h2><ul><li><a href="tel:${business.telephone}">${business.phoneLabel}</a></li><li><a href="mailto:${business.email}">${business.email}</a></li><li><a href="${business.maps}" rel="noreferrer">${business.address}</a></li><li><a href="${business.facebook}" rel="noreferrer">Facebook</a></li></ul></div></div><div class="foot-legal"><p>${business.name} · P. IVA ${business.vat}</p><p><a href="${route("privacy")}">Privacy</a></p><p><a href="${route("cookie")}">Cookie</a></p></div></div></footer><aside class="mobile-contact" aria-label="Contatti rapidi"><a href="tel:${business.telephone}">${icon("phone")} Chiama</a><a href="${interest()}">Richiedi sopralluogo ${icon("arrow")}</a></aside>`;
}

function breadcrumb(items) {
  if (!items.length) return "";
  const crumb = [["/", "Home"], ...items];
  return `<nav class="breadcrumb shell" aria-label="Percorso di navigazione"><ol>${crumb.map(([href, label], index) => index === crumb.length - 1
    ? `<li><span aria-current="page">${escape(label)}</span></li>`
    : `<li><a href="${escape(href)}">${escape(label)}</a></li>`).join("")}</ol></nav>`;
}

const imageInfo = photo => {
  const key = Object.keys(images).find(name => images[name] === photo);
  const entry = manifest[key];
  if (!entry) throw new Error("Immagine mancante: " + photo.file);
  return entry;
};

export const imagePath = photo => "/assets/images/" + imageInfo(photo).files.at(-1).file;
export const photo = (item, {eager = false, sizes = "(min-width: 52rem) 33vw, (min-width: 37rem) 50vw, 100vw", alt = item.alt} = {}) => {
  const {w, h, files} = imageInfo(item);
  const srcset = files.length > 1 ? ` srcset="${files.map(variant => "/assets/images/" + variant.file + " " + variant.w + "w").join(", ")}" sizes="${sizes}"` : "";
  return `<img src="${imagePath(item)}"${srcset} width="${w}" height="${h}" alt="${escape(alt)}" decoding="async"${eager ? ' fetchpriority="high"' : ' loading="lazy"'}>`;
};

export const frame = (item, caption, eager = false) => `<figure class="frame">${photo(item, {eager, sizes:"(min-width: 52rem) 47vw, 100vw"})}<figcaption>${escape(caption)}</figcaption></figure>`;
export const projectRoute = project => route("lavori/" + project.id);

export function projectCards(projects, headingTag = "h3") {
  return `<div class="project-grid">${projects.map(p => `<article class="project-card reveal" data-project-category="${p.categories}"><a href="${projectRoute(p)}" aria-labelledby="titolo-${p.id}"><div class="image-wrap">${photo(p.pictures[0])}</div><div class="project-copy"><div class="project-meta">${escape([p.city, p.type].filter(Boolean).join(" · "))}</div><${headingTag} id="titolo-${p.id}">${escape(p.name)}</${headingTag}><p>${escape(p.lead)}</p></div>${icon("diagonal",'class="project-icon"')}</a></article>`).join("")}</div>`;
}

export function pageIntro(label, title, lead) {
  return `<section class="page-top shell">${eyebrow(label)}<h1>${escape(title)}</h1><p class="lede">${escape(lead)}</p></section>`;
}

export function sectionHead(label, title, link = "") {
  return `<div class="section-head reveal"><div>${eyebrow(label)}<h2>${title}</h2></div>${link}</div>`;
}

export function callToAction({label = "Parliamo del tuo progetto", title = "Il primo passo è un sopralluogo.", copy = "Raccontaci dove si trova l’immobile e che tipo di lavoro hai in mente.", topic = "", button = "Richiedi un sopralluogo"} = {}) {
  return `<section class="cta-panel section-small">${plan}<div class="shell"><div>${eyebrow(label)}<h2>${escape(title)}</h2><p>${escape(copy)}</p></div><div class="actions">${btn(interest(topic),button,"light")}${textLink("tel:" + business.telephone, business.phoneLabel, "phone")}</div></div></section>`;
}

export function serviceRows() {
  const rows = services.map(service => [route(service.id), service.title, service.label]);
  return `<div class="service-list">${rows.map(([href,title,subtitle],i) => `<a class="service-row" href="${href}"><span class="number">0${i + 1}</span><div><h3>${escape(title)}</h3><p>${escape(subtitle)}</p></div>${icon("diagonal")}</a>`).join("")}</div>`;
}

export function processSection() {
  const steps = [
    ["Sopralluogo", "Vediamo l’immobile o il lotto e raccogliamo le esigenze prima di definire le lavorazioni."],
    ["Progetto e preventivo", "Con il cliente e i tecnici coinvolti definiamo l’intervento, i materiali e le fasi di lavoro."],
    ["Cantiere", "Coordiniamo le lavorazioni e seguiamo il progetto fino alla consegna delle opere concordate."]
  ];
  return `<section class="section-small tint"><div class="shell">${sectionHead("Il metodo", "Da dove iniziamo.")}<div class="process-grid">${steps.map(([name,copy],i) => `<div class="step reveal"><span>0${i + 1} /</span><h3>${name}</h3><p>${copy}</p></div>`).join("")}</div></div></section>`;
}

export function photoGallery(pictures, title = "Galleria fotografica") {
  return `<section class="section-small rule"><div class="shell">${sectionHead("Immagini del progetto", escape(title))}<div class="gallery-grid">${pictures.map(item => `<a class="gallery-button" data-gallery-item href="${imagePath(item)}">${photo(item)}<span class="zoom">${icon("zoom")}</span></a>`).join("")}</div><dialog class="lightbox" data-lightbox aria-labelledby="lightbox-title"><div class="lightbox-top"><strong id="lightbox-title">Immagini del progetto</strong><button type="button" data-close autofocus aria-label="Chiudi il visualizzatore">✕</button></div><img alt=""><div class="lightbox-bottom"><button type="button" data-step="-1" aria-label="Foto precedente">←</button><p data-lightbox-caption aria-live="polite"></p><button type="button" data-step="1" aria-label="Foto successiva">→</button></div></dialog></div></section>`;
}

const company = {
  "@context":"https://schema.org",
  "@type":"HomeAndConstructionBusiness",
  "@id": origin + "/#impresa",
  name: business.name,
  url: origin + "/",
  logo: absolute("/assets/images/logo-originale.webp"),
  image: absolute(imagePath(images.villa)),
  telephone: business.telephone,
  email: business.email,
  vatID: "IT" + business.vat,
  address: {"@type":"PostalAddress", streetAddress:"Via Molini I 18", addressLocality:"Sirolo", addressRegion:"AN", postalCode:"60020", addressCountry:"IT"},
  areaServed: {"@type":"AdministrativeArea", name:"Provincia di Ancona"},
  hasMap: business.maps,
  sameAs: [business.facebook]
};

const website = {
  "@context":"https://schema.org",
  "@type":"WebSite",
  "@id":origin + "/#sito",
  url:origin + "/",
  name:"Sirio Costruzioni",
  inLanguage:"it-IT",
  publisher:{"@id":company["@id"]}
};

const jsonScript = data => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g,"\\u003c")}</script>`;

export function layout({path, title, description, body, active, crumbs = [], image = images.villa, schema, pageType = "WebPage", noindex = false}) {
  const url = absolute(path);
  const fullTitle = title.includes("Sirio Costruzioni") ? title : title + " | Sirio Costruzioni";
  const ogImage = absolute(imagePath(image));
  const {w, h} = imageInfo(image);
  const primaryImage = {"@context":"https://schema.org", "@type":"ImageObject", "@id":url + "#immagine", url:ogImage, contentUrl:ogImage, width:w, height:h, caption:image.alt};
  const webpage = {"@context":"https://schema.org", "@type":pageType, "@id":url + "#pagina", url, name:fullTitle, description, inLanguage:"it-IT", isPartOf:{"@id":website["@id"]}, about:{"@id":company["@id"]}, primaryImageOfPage:{"@id":primaryImage["@id"]}};
  const data = [company, website, primaryImage, webpage];
  if (crumbs.length) {
    webpage.breadcrumb = {"@id":url + "#percorso"};
    data.push({"@context":"https://schema.org", "@type":"BreadcrumbList", "@id":url + "#percorso", itemListElement: [["/","Home"],...crumbs].map(([href,name], index) => ({"@type":"ListItem",position:index + 1,name,item:absolute(href)}))});
  }
  if (schema) {
    const entityId = url + "#contenuto-principale";
    webpage.mainEntity = {"@id":entityId};
    data.push({"@context":"https://schema.org", "@id":entityId, url, ...schema});
  }
  return `<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#f7f5ee">
  <title>${escape(fullTitle)}</title>
  <meta name="description" content="${escape(description)}">
  <meta name="robots" content="${preview || noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="it_IT">
  <meta property="og:site_name" content="Sirio Costruzioni">
  <meta property="og:title" content="${escape(fullTitle)}">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:alt" content="${escape(image.alt)}">
  <meta property="og:image:width" content="${w}">
  <meta property="og:image:height" content="${h}">
  <meta property="og:image:type" content="image/webp">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escape(fullTitle)}">
  <meta name="twitter:description" content="${escape(description)}">
  <meta name="twitter:image" content="${ogImage}">
  <meta name="twitter:image:alt" content="${escape(image.alt)}">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/site.css?v=${stylesheetVersion}">
  <script src="/assets/site.js?v=${scriptVersion}" defer></script>
  ${data.map(jsonScript).join("\n  ")}
</head>
<body>
${header(active, path)}
<main id="contenuto" tabindex="-1">${breadcrumb(crumbs)}
${body}
</main>
${footer()}
</body>
</html>`;
}
