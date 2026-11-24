import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {business, images} from './content.mjs';
import {renderSix} from './proposta6.mjs';

// Le quattro direzioni Stitch sono reinterpretate dai rispettivi export.
// Il sito originale rimane la fonte dei contenuti e dei recapiti aziendali.
export const proposals = [
  {id: 1, name: 'L’originale editoriale', short: 'Originale', theme: 'original', source: 'Sirio-Costruzioni-Sito-v1 (3).zip', description: 'La prima versione del sito: titoli serif, carta avorio, blu Conero e un portfolio fotografico in primo piano.', tags: ['Editoriale', 'Serif', 'Avorio e blu']},
  {id: 2, name: 'Conero contemporaneo', short: 'Conero', theme: 'conero', source: 'stitch_sirio_costruzioni_website_redesign (2).zip → home_sirio_costruzioni', description: 'Blu profondo e dettagli ottone. Una presenza solida, con grandi fotografie e sezioni dedicate alle specializzazioni.', tags: ['Blu e ottone', 'Plus Jakarta Sans', 'Autorevole']},
  {id: 3, name: 'Tradizione e cantiere', short: 'Tradizione', theme: 'tradition', source: 'stitch_design_sito_impresa_edile.zip → home_variante_tradizione_cantiere', description: 'Colori della terra, immagini d’archivio e lavori di oggi. Un racconto vicino alle persone e alla storia della famiglia Canuti.', tags: ['Sabbia e terracotta', 'Storia', 'Artigianale']},
  {id: 4, name: 'Eleganza e architettura', short: 'Eleganza', theme: 'elegance', source: 'stitch_design_sito_impresa_edile.zip → home_variante_elegance_architettura', description: 'Fotografia a tutta larghezza, toni travertino e ampi spazi. Un percorso essenziale dedicato a ville, dimore e recupero.', tags: ['Travertino', 'Outfit e Inter', 'Architettura']},
  {id: 5, name: 'Servizi e contatto rapido', short: 'Servizi', theme: 'services', source: 'stitch_design_sito_impresa_edile.zip → home_variante_servizi_conversione_rapida', description: 'Servizi subito leggibili, schede interattive e contatti diretti. Una home pratica, pensata per avviare una richiesta.', tags: ['Blu e terracotta', 'Schede servizi', 'Contatto diretto']},
  {id: 6, name: 'Progetti solidi', short: 'Progetti', theme: 'future', source: 'Ricerca online: Pizzarotti, Webuild, Turner Construction, Mace e Skanska', description: 'Una direzione contemporanea ispirata alla comunicazione delle grandi imprese edili: titoli ampi, griglia tecnica, fotografie aziendali e un accento verde lime.', tags: ['Carbone e lime', 'Inter', 'Progetti e competenze']},
];

const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const link = route => `../${route}/index.html`;
const manifest = JSON.parse(readFileSync(new URL('./image-manifest.json', import.meta.url), 'utf8'));
const paths = {
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>', diagonal: '<path d="M6 18 18 6M6 6h12v12"/>',
  phone: '<path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2c-3-1.2-5.8-4-7-7l2-2-2-5Z"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  house: '<path d="m3 11 9-8 9 8M5 10v11h14V10M10 21v-7h4v7"/>',
  stone: '<path d="M3 4h18v16H3zM3 9h18M3 15h18M9 4v5M15 9v6M9 15v5"/>',
  plan: '<path d="M4 3h16v18H4zM4 10h8v11M12 3v7h8M16 15h4M4 6h4"/>',
  shield: '<path d="M12 2 3 6v6c0 6 9 10 9 10s9-4 9-10V6z"/><path d="m8 12 3 3 5-6"/>',
  tools: '<path d="m5 3 16 16-3 3L2 6zM14 6l4-4 4 4-4 4M3 21l6-6"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 5 9 8 9-8"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
};
const icon = name => `<svg class="p-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.arrow}</svg>`;
function photo(key, {eager = false, className = '', sizes = '(min-width: 900px) 50vw, 100vw'} = {}) {
  const image = images[key];
  const info = manifest[key];
  return `<img class="${className}" src="../assets/images/${image.file}.webp" srcset="${info.files.map(f => `../assets/images/${f.file} ${f.w}w`).join(', ')}" sizes="${sizes}" width="${info.w}" height="${info.h}" alt="${esc(image.alt)}" decoding="async" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'}>`;
}
const eyebrow = text => `<p class="p-eyebrow">${text}</p>`;
const button = (href, label, kind = '', symbol = 'arrow') => `<a class="p-button ${kind}" href="${esc(href)}">${label}${icon(symbol)}</a>`;
const textLink = (href, label) => `<a class="p-text-link" href="${esc(href)}">${label}${icon('diagonal')}</a>`;
const heading = (label, title, subtitle = '') => `<div class="p-section-heading"><div>${eyebrow(label)}<h2>${title}</h2></div>${subtitle ? `<p>${subtitle}</p>` : ''}</div>`;
const logo = () => `<img src="../assets/images/logo-originale.webp" alt="Sirio Costruzioni" width="400" height="130">`;

function header(id) {
  return `<a class="p-skip" href="#contenuto">Vai al contenuto</a><header class="p-header"><div class="p-header-inner"><a class="p-brand" href="index.html" aria-label="Sirio Costruzioni, home">${logo()}</a><nav class="p-navigation" id="navigazione" aria-label="Navigazione principale"><a href="#impresa">L’impresa</a><a href="#servizi">${id === 4 ? 'Le nostre opere' : 'Cosa facciamo'}</a><a href="#lavori">Progetti</a><a href="#contatti">Contatti</a>${button('#richiesta', 'Parliamo del tuo progetto', 'p-nav-cta')}</nav><div class="p-header-actions"><a class="p-phone" href="tel:${business.telephone}" aria-label="Chiama Sirio Costruzioni">${icon('phone')}</a><button class="p-menu" type="button" aria-label="Apri menu" aria-expanded="false" aria-controls="navigazione" data-menu>${icon('menu')}</button></div></div></header>`;
}

function switcher(id) {
  return `<aside class="proposal-switcher" aria-label="Confronta le proposte di home"><a class="proposal-all" href="../proposte/index.html" aria-label="Tutte le proposte">Proposte</a><nav aria-label="Seleziona proposta">${proposals.map(p => `<a href="../${p.id}/index.html" title="${esc(p.name)}" aria-label="Proposta ${p.id}: ${esc(p.name)}"${id === p.id ? ' aria-current="page"' : ''}>0${p.id}</a>`).join('')}</nav></aside>`;
}

function footer(dark = false) {
  return `<footer class="p-footer${dark ? ' p-footer-dark' : ''}"><div class="p-container"><div class="p-footer-grid"><div class="p-footer-brand">${logo()}<p>Costruire, recuperare, abitare.<br>Un’impresa di famiglia nella Riviera del Conero.</p><a href="${business.facebook}" rel="noreferrer">Facebook ${icon('diagonal')}</a></div><div><h2>Esplora</h2><a href="${link('chi-siamo')}">La nostra storia</a><a href="${link('ristrutturazione-e-restauri')}">Ristrutturazioni e restauri</a><a href="${link('ville-e-casali')}">Ville e casali</a><a href="${link('appartamenti-in-vendita')}">Immobili</a><a href="${link('lavori')}">Tutti i progetti</a></div><div><h2>Ci trovi a Sirolo</h2><p>${business.address}</p><a href="tel:${business.telephone}">${business.phoneLabel}</a><a class="p-email" href="mailto:${business.email}">${business.email}</a><a href="${business.maps}" rel="noreferrer">Indicazioni stradali ${icon('diagonal')}</a></div></div><div class="p-legal"><p>© ${new Date().getUTCFullYear()} ${business.name} · P. IVA ${business.vat}</p><div><a href="${link('privacy')}">Privacy</a><a href="${link('cookie')}">Cookie</a><a href="../proposte/index.html">Tutte le proposte</a></div></div></div></footer>`;
}

const steps = [
  ['01', 'Ci incontriamo.', 'Partiamo da un sopralluogo: ascoltiamo le tue esigenze e osserviamo l’immobile o il terreno.'],
  ['02', 'Diamo forma alle idee.', 'Definiamo con te e con i tecnici il progetto, i materiali, le lavorazioni e il preventivo.'],
  ['03', 'Costruiamo con cura.', 'Coordiniamo il cantiere e seguiamo ogni fase, fino alla consegna delle opere concordate.'],
];
function method(dark = false) {
  return `<section class="p-section p-method${dark ? ' p-dark' : ''}" id="metodo"><div class="p-container">${heading('Un percorso condiviso', dark ? 'Il percorso, chiavi in mano.' : 'Dal primo incontro<br>all’ultimo dettaglio.', 'Il tuo progetto, seguito dalle persone che lo realizzano.')}<div class="p-steps">${steps.map(([n,title,text]) => `<article><span class="p-step-number">${n}</span><h3>${title}</h3><p>${text}</p></article>`).join('')}</div></div></section>`;
}

const specialties = [
  ['tools', 'Manutenzioni edili', 'Interventi ordinari e straordinari per prenderci cura degli edifici esistenti.'],
  ['house', 'Edilizia residenziale', 'Nuove abitazioni, ville e spazi da vivere, dal progetto al cantiere.'],
  ['shield', 'Consolidamenti strutturali', 'Recupero e adeguamento delle strutture, con le verifiche dei tecnici coinvolti.'],
  ['plan', 'Ampliamenti e coperture', 'Nuovi spazi, tetti in legno e opere esterne su misura per ogni edificio.'],
];
function expertise() {
  return `<section class="p-section p-expertise"><div class="p-container">${heading('Competenze edili', 'Il mestiere, in ogni intervento.')}<div class="p-expertise-grid">${specialties.map(([symbol,title,text],i) => `<a href="${link(i % 2 ? 'ville-e-casali' : 'ristrutturazione-e-restauri')}">${icon(symbol)}<h3>${title}</h3><p>${text}</p><span class="p-card-arrow">${icon('diagonal')}</span></a>`).join('')}</div></div></section>`;
}

const serviceData = [
  {key: 'numana', title: 'Ristrutturazioni e restauri', label: 'Il valore di ciò che esiste', route: 'ristrutturazione-e-restauri', text: 'Restituiamo vita a edifici, case e rustici. Un lavoro attento alle murature, ai materiali e alla storia di ogni luogo.', tags: ['Pietra del Conero', 'Recupero', 'Restauro']},
  {key: 'casale', title: 'Ville e casali', label: 'Spazi da vivere, luoghi da abitare', route: 'ville-e-casali', text: 'Costruiamo ville e recuperiamo casali in dialogo con il paesaggio del Conero, tra pietra, legno e spazi aperti.', tags: ['Nuove costruzioni', 'Casali', 'Ville']},
  {key: 'castelfidardo2', title: 'Immobili a Castelfidardo', label: 'Un nuovo modo di abitare', route: 'appartamenti-in-vendita', text: 'Scopri il progetto residenziale di Castelfidardo. Contattaci per conoscere caratteristiche e disponibilità aggiornate.', tags: ['Residenziale', 'Spazi esterni', 'Castelfidardo']},
];
function serviceCards() {
  return `<div class="p-service-grid">${serviceData.map((s,i) => `<article class="p-service-card"><a class="p-card-photo" href="${link(s.route)}">${photo(s.key, {sizes: '(min-width: 900px) 32vw, 100vw'})}<span class="p-photo-badge">0${i+1} / ${s.tags[0]}</span></a><div class="p-service-copy">${eyebrow(s.label)}<h3><a href="${link(s.route)}">${s.title}</a></h3><p>${s.text}</p>${textLink(link(s.route), 'Esplora il servizio')}</div></article>`).join('')}</div>`;
}

const selected = [
  ['casale', 'Casale in pietra del Conero', 'Sirolo · Pietra e paesaggio', 'casale-pietra-sirolo', 'Progetto di Danilo e Nicola Guerri'],
  ['villa', 'Villa con piscina', 'Sirolo · Abitare gli esterni', 'villa-piscina-sirolo', 'Progetto di Alessandro Riboldi'],
  ['numana', 'Palazzina in pietra', 'Numana · Recupero nel borgo', 'palazzina-pietra-numana', 'Centro storico di Numana'],
  ['fornace', 'La vecchia fornace', 'Restauro · Memoria e materia', 'restauro-vecchia-fornace', 'Progetto di Filiberto Andreoli'],
];
function portfolio({count = 3, title = 'Progetti che parlano di noi.'} = {}) {
  return `<section class="p-section p-portfolio" id="lavori"><div class="p-container">${heading('Dal nostro portfolio', title, 'Interventi reali, nel territorio che conosciamo.')}<div class="p-project-grid p-project-count-${count}">${selected.slice(0,count).map(([key,title,caption,id,credit],i) => `<article><a class="p-project-image" href="${link('lavori/'+id)}">${photo(key, {sizes: '(min-width: 900px) 40vw, 100vw'})}<span>${icon('diagonal')}</span></a><div class="p-project-caption"><p>${caption}</p><span>0${i+1}</span></div><h3><a href="${link('lavori/'+id)}">${title}</a></h3><p class="p-credit">${credit}</p></article>`).join('')}</div><div class="p-section-end">${textLink(link('lavori'), 'Tutti i nostri lavori')}</div></div></section>`;
}

function people() {
  return `<div class="p-people">${business.people.map(([name,phone,tel]) => `<a href="tel:${tel}"><span class="p-person-initials" aria-hidden="true">${name.split(' ').map(w=>w[0]).join('')}</span><span><strong>${name}</strong><small>${phone}</small></span>${icon('phone')}</a>`).join('')}</div>`;
}

function form() {
  return `<div class="p-form-panel" id="richiesta">${eyebrow('Il tuo progetto parte da qui')}<h3>Raccontaci la tua idea.</h3><p>Compila i campi per preparare una richiesta. Potrai rileggerla e inviarla dalla tua app di posta.</p><form data-proposal-form action="mailto:${business.email}" method="get"><label for="nome">Nome e cognome <span aria-hidden="true">*</span></label><input id="nome" name="nome" autocomplete="name" placeholder="Es. Mario Rossi" required maxlength="80"><div class="p-form-row"><div><label for="recapito">Email o telefono <span aria-hidden="true">*</span></label><input id="recapito" name="recapito" autocomplete="email" placeholder="Come possiamo ricontattarti?" required maxlength="120"></div><div><label for="comune">Comune dell’intervento</label><input id="comune" name="comune" autocomplete="address-level2" placeholder="Es. Sirolo" maxlength="80"></div></div><label for="intervento">Di cosa hai bisogno?</label><select id="intervento" name="intervento"><option>Ristrutturazione o restauro</option><option>Villa, casale o nuova costruzione</option><option>Immobili a Castelfidardo</option><option>Manutenzione o consolidamento</option><option>Altro intervento</option></select><label for="messaggio">Qualche dettaglio in più <span class="p-optional">(facoltativo)</span></label><textarea id="messaggio" name="messaggio" rows="3" maxlength="1000" placeholder="L’immobile, i tuoi desideri, il lavoro che hai in mente…"></textarea><p class="p-form-privacy">I campi con * sono obbligatori. Leggi l’<a href="${link('privacy')}">informativa privacy</a>.</p><button class="p-button" type="submit">Prepara la richiesta email ${icon('mail')}</button><p class="p-form-status" data-form-status role="status"></p><a class="p-form-email" data-email-draft hidden>Apri la bozza nella tua app di posta ${icon('diagonal')}</a><noscript><p>Scrivi direttamente a <a href="mailto:${business.email}">${business.email}</a>.</p></noscript></form></div>`;
}

function contacts({title = 'Le persone, prima<br>del progetto.', dark = false} = {}) {
  return `<section class="p-section p-contact${dark ? ' p-dark' : ''}" id="contatti"><div class="p-container p-contact-grid"><div>${eyebrow('Un filo diretto con la famiglia Canuti')}<h2>${title}</h2><p class="p-lead">Parla con chi segue il tuo progetto, dal primo incontro al lavoro in cantiere.</p>${people()}<div class="p-contact-office"><a href="tel:${business.telephone}">${icon('phone')}<span>Ufficio di Sirolo<strong>${business.phoneLabel}</strong></span></a><a href="${business.maps}" rel="noreferrer">${icon('pin')}<span>Vieni a trovarci<strong>${business.address}</strong></span></a><a class="p-email" href="mailto:${business.email}">${icon('mail')}${business.email}</a></div></div>${form()}</div></section>`;
}

function story({extended = false} = {}) {
  return `<section class="p-section p-story" id="impresa"><div class="p-container p-story-grid"><div class="p-story-photo">${photo('archivio')}<span>Dall’archivio · Riviera del Conero</span></div><div class="p-story-copy">${eyebrow('Una storia di famiglia')}<h2>Le nostre radici.<br>Il tuo domani.</h2><p class="p-lead">Un’impresa di famiglia, un legame con Sirolo che dura da oltre cinquant’anni.</p><p>La nostra storia inizia nei primi anni Sessanta con Franco e Roberto Canuti. Oggi Annalisa, Pierfranco e Riccardo portano avanti il mestiere, con la stessa cura per i materiali e per le persone.</p>${extended ? '<p>Dal recupero dei casali in pietra alle nuove abitazioni, mettiamo l’esperienza del territorio al servizio di ogni progetto. Lavoriamo con i committenti, le maestranze e i tecnici coinvolti, un cantiere alla volta.</p><div class="p-story-note">'+icon('shield')+'<p><strong>Esperienza, responsabilità, cura.</strong> Le esigenze del cliente e le caratteristiche dell’immobile guidano ogni intervento.</p></div>' : ''}${textLink(link('chi-siamo'), 'La storia di Sirio')}</div></div></section>`;
}

function conero() {
  return `<section class="p-conero-hero p-dark"><div class="p-container p-conero-hero-grid"><div class="p-hero-copy">${eyebrow('Sirolo · Riviera del Conero')}<h1>Sirio<br>Costruzioni<span class="p-gold-dot">.</span></h1><p class="p-lead">La solidità dell’esperienza.<br>La cura di un’impresa di famiglia.</p><p>Ville, casali e ristrutturazioni. Diamo forma ai tuoi progetti, nel paesaggio che ci appartiene.</p><div class="p-actions">${button('#richiesta', 'Richiedi un sopralluogo')}${button('tel:'+business.telephone, business.phoneLabel, 'p-button-outline', 'phone')}</div><div class="p-hero-detail"><span></span> Oltre cinquant’anni di esperienza nel Conero</div></div><figure class="p-conero-hero-image">${photo('villa', {eager:true})}<figcaption>${icon('pin')} Villa con piscina · Sirolo <span>Dal nostro portfolio</span></figcaption><span class="p-image-corner" aria-hidden="true">S<br>C</span></figure></div><div class="p-container p-facts"><div><strong>50+</strong><span>Anni di esperienza</span></div><div><strong>Canuti</strong><span>Una storia di famiglia</span></div><div><strong>Conero</strong><span>Il nostro territorio</span></div></div></section><section class="p-section p-services-section" id="servizi"><div class="p-container">${heading('I nostri ambiti', 'Soluzioni solide.<br>Progetti unici.', 'Ristrutturare, costruire, recuperare: un approccio attento alla materia e al luogo.')} ${serviceCards()}</div></section>${story()}${portfolio()}${method()}${expertise()}${contacts({dark:true,title:'Parliamo della<br>tua prossima casa.'})}`;
}

function tradition() {
  return `<section class="p-tradition-hero"><div class="p-container p-tradition-hero-grid"><div class="p-hero-copy">${eyebrow('Un mestiere che attraversa il tempo')}<h1>Maestri edili<br>nel <span>Conero.</span></h1><p class="p-lead">La forza delle nostre radici.<br>La cura per quello che verrà.</p><p>Dagli anni Sessanta costruiamo e recuperiamo edifici a Sirolo e in provincia di Ancona. Con le mani, con la testa, con la passione di una famiglia.</p><div class="p-actions">${button('#richiesta', 'Iniziamo dal tuo progetto')}${textLink('#impresa','La nostra storia')}</div></div><div class="p-history-pair"><figure class="p-history-then">${photo('archivio',{eager:true})}<figcaption>Le nostre radici · Il Conero</figcaption></figure><figure class="p-history-now">${photo('casale',{eager:true})}<figcaption>I nostri lavori · Sirolo</figcaption></figure><span class="p-history-seal">SIRIO<br><strong>Una storia<br>di famiglia</strong><span>SIROLO · CONERO</span></span></div></div></section><section class="p-tradition-facts"><div class="p-container"><div>${icon('tools')}<strong>50+</strong><span>Anni di mestiere</span></div><div>${icon('house')}<strong>Canuti</strong><span>Impresa di famiglia</span></div><div>${icon('stone')}<strong>Pietra</strong><span>L’identità del Conero</span></div><div>${icon('pin')}<strong>Sirolo</strong><span>Il nostro punto di partenza</span></div></div></section>${story({extended:true})}${portfolio({count:4,title:'Il nostro lavoro,<br>la nostra firma.'})}<section class="p-section p-tradition-services" id="servizi"><div class="p-container">${heading('Cosa possiamo fare insieme', 'Diamo nuova vita<br>ai tuoi spazi.')}<div class="p-tradition-service-list">${serviceData.map((s,i) => `<a href="${link(s.route)}"><span>0${i+1}</span><h3>${s.title}</h3><p>${s.text}</p>${icon('diagonal')}</a>`).join('')}</div></div></section>${method()}${expertise()}${contacts()}`;
}

function elegance() {
  return `<section class="p-elegance-hero"><div class="p-elegance-image">${photo('villa',{eager:true,sizes:'100vw'})}</div><div class="p-container p-elegance-hero-content">${eyebrow('Sirio Costruzioni · Sirolo')}<h1>La materia.<br>Lo spazio.<br><span>La tua casa.</span></h1><p>Architetture da abitare, nel cuore del Conero.</p><div class="p-actions">${button('#lavori','Esplora le nostre opere','p-button-light')}${textLink('#richiesta','Parliamo del tuo progetto')}</div></div><div class="p-elegance-photo-caption"><span>Villa con piscina · Sirolo</span><span>Progetto di Alessandro Riboldi</span></div><a class="p-scroll" href="#servizi" aria-label="Scopri le nostre opere">Scorri <span>↓</span></a></section><section class="p-elegance-intro"><div class="p-container">${eyebrow('Maestria edile, sensibilità contemporanea')}<p>Ogni luogo ha una storia.<br>Ogni casa, una <em>nuova possibilità.</em></p><span>Da oltre cinquant’anni costruiamo e recuperiamo edifici nella Riviera del Conero, seguendo il dialogo tra materia, paesaggio e persone.</span></div></section><section class="p-section p-elegance-works" id="servizi"><div class="p-container">${heading('Le nostre specializzazioni','Opere e dimore<br>di carattere.')}<div class="p-elegance-service-grid">${[serviceData[1],serviceData[0],serviceData[2]].map((s,i) => `<article><a class="p-elegance-service-photo" href="${link(s.route)}">${photo(s.key,{sizes:'(min-width: 900px) 40vw, 100vw'})}<span>0${i+1}</span></a><div class="p-elegance-service-copy">${eyebrow(s.label)}<h3>${s.title}</h3><p>${s.text}</p>${textLink(link(s.route),'Scopri di più')}</div></article>`).join('')}</div></div></section>${portfolio({count:2,title:'Abitare il paesaggio.'})}${method()}${story()}${contacts({title:'Ogni progetto<br>inizia da un dialogo.'})}`;
}

function serviceTabs() {
  return `<section class="p-section p-service-tabs" id="servizi"><div class="p-container">${heading('Le nostre specializzazioni','Di cosa hai bisogno?', 'Un percorso diverso per ogni immobile. La stessa cura per il tuo progetto.')}<div class="p-tabs" role="tablist" aria-label="Scegli un servizio">${serviceData.map((s,i)=>`<button id="tab-${i}" type="button" role="tab" aria-selected="${i===0}" aria-controls="servizio-${i}" tabindex="${i===0 ? 0 : -1}">${icon(['stone','house','plan'][i])}${['Ristrutturazioni','Ville e casali','Immobili'][i]}</button>`).join('')}</div><div class="p-tab-panels">${serviceData.map((s,i)=>`<article class="p-tab-panel" role="tabpanel" id="servizio-${i}" aria-labelledby="tab-${i}" tabindex="0"${i ? ' hidden' : ''}><div class="p-tab-photo">${photo(s.key)}<span>${s.tags[0]}</span></div><div class="p-tab-copy">${eyebrow(s.label)}<h3>${s.title}</h3><p>${s.text}</p><ul class="p-service-tags">${s.tags.map(t=>`<li>${icon('check')}${t}</li>`).join('')}</ul><div class="p-actions">${button('#richiesta','Parliamone insieme')}${textLink(link(s.route),'Approfondisci')}</div></div></article>`).join('')}</div><noscript><style>.p-tabs{display:none}.p-tab-panel[hidden]{display:grid!important}</style></noscript></div></section>`;
}

function services() {
  return `<section class="p-services-hero"><div class="p-container"><div class="p-services-hero-panel p-dark"><div class="p-services-hero-copy">${eyebrow('Da Sirolo, per il tuo progetto')}<h1>Dalla pietra del Conero<br> alla casa che <span>immagini.</span></h1><p class="p-lead">Ristrutturazioni, ville e casali. Un unico interlocutore, dalla prima idea al cantiere.</p><div class="p-actions">${button('#richiesta','Richiedi un sopralluogo')}${button('tel:'+business.telephone,'Chiama ora','p-button-outline','phone')}</div><div class="p-services-trust"><span>${icon('check')}Oltre 50 anni di esperienza</span><span>${icon('check')}Gestione familiare</span></div></div><figure>${photo('numana',{eager:true})}<figcaption>Il nostro lavoro · Centro storico di Numana</figcaption></figure></div><div class="p-quick-contacts"><a href="tel:${business.telephone}">${icon('phone')}<span><strong>Chiamaci</strong>${business.phoneLabel}</span>${icon('diagonal')}</a><a href="${business.maps}" rel="noreferrer">${icon('pin')}<span><strong>Vieni in sede</strong>Via Molini I 18 · Sirolo</span>${icon('diagonal')}</a><a href="#richiesta">${icon('plan')}<span><strong>Raccontaci il progetto</strong>Partiamo da un confronto</span>${icon('diagonal')}</a></div></div></section>${serviceTabs()}${method(true)}${expertise()}<section class="p-services-about" id="impresa"><div class="p-container"><div>${eyebrow('Il filo diretto con chi costruisce')}<h2>Un’impresa di famiglia.<br>Persone su cui contare.</h2></div><div><p>La storia di Sirio inizia a Sirolo nei primi anni Sessanta. Oggi Annalisa, Pierfranco e Riccardo Canuti portano avanti l’attività, a contatto con i clienti e con i tecnici dei progetti.</p>${textLink(link('chi-siamo'),'Conosci la nostra impresa')}</div></div></section>${portfolio({count:2,title:'Dai progetti ai fatti.'})}${contacts({title:'Hai un immobile.<br>Hai un’idea.<br>Parliamone.'})}`;
}

function page(proposal, body) {
  const fonts = proposal.id === 2 ? ['plus-jakarta-sans','space-grotesk'] : ['outfit','inter'];
  return `<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, follow"><meta name="theme-color" content="${proposal.id===2 ? '#07182e' : '#f6f3ee'}"><title>0${proposal.id} · ${esc(proposal.name)} | Sirio Costruzioni</title><meta name="description" content="${esc(proposal.description)}"><link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">${fonts.map(f=>`<link rel="preload" href="../assets/fonts/${f}-latin.woff2" as="font" type="font/woff2" crossorigin>`).join('')}<link rel="stylesheet" href="../assets/proposte.css"><link rel="stylesheet" href="../assets/confronto.css"><script src="../assets/proposte.js" defer></script><script src="../assets/focus.js" defer></script></head><body class="proposal theme-${proposal.theme}">${header(proposal.id)}<main id="contenuto" tabindex="-1">${body}</main>${footer(proposal.id===2)}${switcher(proposal.id)}</body></html>`;
}

function gallery() {
  const previewSizes = '(max-width: 370px) calc(100vw - 58px), (max-width: 650px) calc(100vw - 66px), (max-width: 900px) calc(50vw - 62.5px), (max-width: 1460px) calc(45vw - 52px), 605px';
  const previewImage = ({id, name}) => {
    const base = `../assets/proposte/anteprima-${id}`;
    const variants = [400, 640, 960].map(width => `${base}-${width}.webp ${width}w`);
    const loading = id === 1 ? ' fetchpriority="high"' : id > 2 ? ' loading="lazy"' : '';
    return `<img src="${base}.webp" srcset="${[...variants, `${base}.webp 1440w`].join(', ')}" sizes="${previewSizes}" alt="Anteprima della home ${esc(name)}" width="1440" height="1020"${loading}>`;
  };
  return `<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, follow"><meta name="theme-color" content="#f6f3ee"><title>Sei direzioni, una sola Sirio | Proposte home</title><meta name="description" content="Confronta sei proposte per la home di Sirio Costruzioni: l’originale, quattro direzioni Stitch e una nuova direzione ispirata alle imprese edili internazionali."><link rel="icon" href="../assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="../assets/proposte.css"><script src="../assets/proposte.js" defer></script></head><body class="proposal p-gallery"><header class="p-gallery-header"><a class="p-brand" href="../index.html" aria-label="Il sito originale">${logo()}</a><span>Studio delle home · Novembre 2026</span><a href="../index.html">Il sito completo ${icon('diagonal')}</a></header><main id="contenuto"><section class="p-gallery-intro p-container">${eyebrow('Sirio Costruzioni · Esplorazioni di stile')}<h1>Sei direzioni.<br><span>La stessa identità.</span></h1><div><p>Un nuovo sito per raccontare il vostro modo di costruire. Sei home da esplorare, confrontare e scegliere.</p><span>01 originale + 04 interpretazioni Stitch + 01 nuova direzione<br>Ogni proposta si adatta a desktop, tablet e smartphone.</span></div></section><section class="p-gallery-list p-container" aria-label="Le sei proposte">${proposals.map(p=>`<article class="p-gallery-card gallery-${p.theme}"><a class="p-gallery-preview" href="../${p.id}/index.html" aria-label="Esplora ${esc(p.name)}">${previewImage(p)}<span class="p-gallery-number">0${p.id}</span><span class="p-gallery-open">Esplora la home ${icon('diagonal')}</span></a><div class="p-gallery-description"><h2><a href="../${p.id}/index.html">${p.name}</a></h2><p>${p.description}</p><ul>${p.tags.map(t=>`<li>${t}</li>`).join('')}</ul><details><summary>Riferimento di partenza</summary><p>${esc(p.source)}</p></details></div></article>`).join('')}<article class="p-gallery-outro">${eyebrow('Come orientarsi')}<h2>Quale Sirio<br>vi somiglia?</h2><p>Esplorate le home e confrontate atmosfera, leggibilità e percorso verso il contatto. Fotografie e riferimenti aziendali sono condivisi: cambia il modo di raccontarli.</p><p>All’interno di ogni home, il selettore in basso permette di passare da una proposta all’altra.</p>${textLink('../1/index.html','Parti dall’originale')}</article></section></main><footer class="p-gallery-footer p-container"><span>Sirio Costruzioni · Proposte di home</span><a href="../index.html">Torna al sito completo ${icon('arrow')}</a></footer></body></html>`;
}

// Le copie sono relative: funzionano su hosting statico e aprendo Proposte.html da disco.
function relativeOriginal(html) {
  return html.replace(/\b(href|src)="(\/[^\"]*)"/g, (_, attribute, value) => {
    if (value === '/') return `${attribute}="index.html"`;
    const url = new URL(value, 'https://example.invalid');
    const path = url.pathname.endsWith('/') ? url.pathname + 'index.html' : url.pathname;
    return `${attribute}="..${path}${esc(url.search)}${url.hash}"`;
  }).replaceAll('srcset="/assets/', 'srcset="../assets/').replaceAll(', /assets/', ', ../assets/');
}

export function buildProposals(output) {
  const write = (file, text) => {const path=join(output,file);mkdirSync(dirname(path),{recursive:true});writeFileSync(path,text,'utf8');};
  let original = relativeOriginal(readFileSync(join(output,'index.html'),'utf8'));
  original = original.replace(/<title>.*?<\/title>/, '<title>01 · L’originale editoriale | Sirio Costruzioni</title>')
    .replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex, follow">')
    .replace('</head>', '<link rel="stylesheet" href="../assets/confronto.css"><script src="../assets/proposte.js" defer></script></head>')
    .replace('</body>', `${switcher(1)}</body>`);
  write('1/index.html', original);
  [conero, tradition, elegance, services].forEach((render,i)=>write(`${i+2}/index.html`,page(proposals[i+1],render())));
  write('6/index.html', renderSix({icon,form,people,logo,switcher,proposal:proposals[5]}));
  write('proposte/index.html',gallery());
  console.log('6 proposte home + pagina di confronto generate in dist.');
}
