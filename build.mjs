
import {mkdirSync, rmSync, writeFileSync} from "node:fs";
import {dirname, join} from "node:path";
import {fileURLToPath} from "node:url";
import {business, images, projects, services} from "./content.mjs";
import {buildProposals} from "./proposte.mjs";
import {absolute, btn, callToAction, escape, eyebrow, frame, icon, imagePath, interest, layout, origin, pageIntro, paragraph, photo, photoGallery, preview, processSection, projectCards, projectRoute, route, sectionHead, serviceRows, textLink} from "./layout.mjs";

const output = fileURLToPath(new URL("./dist/", import.meta.url));
const pages = [];

function write(file, content) {
  const path = join(output, file);
  mkdirSync(dirname(path), {recursive:true});
  writeFileSync(path, content, "utf8");
}
function page(id, details) {
  const path = route(id);
  pages.push({path, ...details});
  write(id ? id + "/index.html" : "index.html", layout({path,...details}));
}
function pick(ids) {
  return ids.map(id => {
    const result = projects.find(project => project.id === id);
    if (!result) throw new Error("Progetto mancante: " + id);
    return result;
  });
}
const crumb = (id, label) => [route(id), label];
const worksCrumb = crumb("lavori", "Lavori");
const servicesCrumb = crumb("servizi", "Servizi");
const section = (contents, classes = "section") => `<section class="${classes}"><div class="shell">${contents}</div></section>`;
const projectIntro = (label, title, lead, cover, caption, inner = "") => `<section class="shell page-hero editorial-grid"><div class="hero-copy">${eyebrow(label)}<h1>${escape(title)}</h1><p class="lede">${escape(lead)}</p>${inner}</div>${frame(cover,caption,true)}</section>`;
const relatedSection = (selected, label = "Portfolio", title = "Lavori correlati.") => section(sectionHead(label,title,textLink(route("lavori"),"Vedi tutti i lavori")) + projectCards(selected),"section-small rule");

const featured = pick(["villa-piscina-sirolo","casale-pietra-sirolo","locanda-rocco-sirolo"]);
const homeHero = `<section class="shell home-hero"><div class="hero-copy">${eyebrow("Impresa edile a Sirolo · Riviera del Conero")}<h1>Costruiamo ville.<br>Recuperiamo <em class="display-accent">casali.</em></h1><p class="lede">Un’impresa di famiglia a Sirolo per costruire ville, recuperare casali in pietra e ristrutturare edifici nel Conero e in provincia di Ancona.</p><div class="actions">${btn(interest(),"Richiedi un sopralluogo")}${textLink(route("lavori"),"Guarda i nostri lavori")}</div></div><figure class="hero-media"><div class="hero-image-wrap">${photo(images.villa,{eager:true,sizes:"(min-width: 52rem) 47vw, 100vw"})}<span class="hero-index">Dal nostro portfolio</span></div><figcaption><span>Villa con piscina · Sirolo</span><span>01 / Conero</span></figcaption></figure></section>`;
const facts = `<section class="facts" aria-label="Sirio in breve"><div class="shell"><div class="fact"><strong>Dagli anni ’60</strong><span>Una storia di famiglia</span></div><div class="fact"><strong>Sirolo</strong><span>Riviera del Conero</span></div><div class="fact"><strong>Ville e casali</strong><span>Costruzione e recupero</span></div><div class="fact"><strong>Pietra e legno</strong><span>Materiali del progetto</span></div></div></section>`;
const homeServices = section(`<div class="editorial-grid reveal">${frame(images.varano,"Agriturismo nel Conero · Varano, Ancona")}<div class="editorial-copy">${eyebrow("Servizi edili")}<h2>Costruire e recuperare.</h2><p class="lede">Un intervento può partire da un terreno, da un casale da rimettere in uso o da una casa che deve cambiare con chi la abita.</p>${serviceRows()}<div class="actions">${textLink(route("servizi"),"Tutti i servizi edili")}</div></div></div>`,"section tint");
const homeHistory = section(`<div class="editorial-grid reveal"><div class="editorial-copy">${eyebrow("L’impresa")}<h2>Una storia che parte da <em class="display-accent">Sirolo.</em></h2><p class="lede">Franco e Roberto Canuti hanno avviato l’attività nei primi anni Sessanta. Oggi Annalisa, Pierfranco e Riccardo portano avanti l’impresa di famiglia.</p><div class="actions">${textLink(route("chi-siamo"),"Conosci Sirio Costruzioni")}</div></div>${frame(images.archivio,"Fotografia d’archivio · Riviera del Conero")}</div>`,"section-small rule");

page("", {
  title:"Impresa edile a Sirolo | Sirio Costruzioni",
  description:"Sirio Costruzioni, impresa edile a Sirolo. Costruzione di ville, recupero di casali in pietra e ristrutturazioni nella Riviera del Conero e in provincia di Ancona.",
  body: homeHero + facts + section(sectionHead("Progetti selezionati","I lavori, da vicino.",textLink(route("lavori"),"Esplora il portfolio")) + projectCards(featured)) + homeServices + homeHistory + processSection() + callToAction()
});

page("chi-siamo", {
  title:"Impresa edile di famiglia a Sirolo", active:"chi-siamo", crumbs:[crumb("chi-siamo","Impresa")], image:images.archivio, pageType:"AboutPage",
  description:"Scopri la storia di Sirio Costruzioni, impresa a conduzione familiare a Sirolo, e il suo lavoro su ville, casali e ristrutturazioni nel Conero.",
  body: projectIntro("Sirio Costruzioni", "Un’impresa edile di famiglia a Sirolo.", "L’attività comincia nei primi anni Sessanta con Franco e Roberto Canuti. Da allora costruiamo e recuperiamo edifici a Sirolo e in provincia di Ancona.",images.archivio,"Dall’archivio fotografico aziendale")
    + section(`<div class="editorial-grid"><div class="prose reveal"><h2>Le persone dietro i lavori.</h2><p>Oggi l’impresa è guidata da Annalisa, Pierfranco e Riccardo Canuti. Il lavoro si svolge a contatto con i committenti, le maestranze e i tecnici coinvolti nelle diverse fasi.</p><p>Seguiamo abitazioni private, casali e interventi di recupero. L’esperienza nel territorio aiuta a leggere il contesto di ogni cantiere, dalla campagna del Conero alle strade dei centri storici.</p><div class="actions">${textLink(route("contatti"),"I nostri recapiti")}</div></div>${frame(images.casale2,"Prospetto di un casale in pietra · Sirolo")}</div>`,"section-small rule")
    + processSection() + callToAction()
});

const [siroloProject, numanaProject, osimoProject] = pick(["villa-piscina-sirolo", "palazzina-pietra-numana", "grotte-palazzo-osimo"]);
const additionalServices = [
  ["Manutenzioni edili", "Interventi ordinari e straordinari sulle abitazioni e sugli edifici esistenti, definiti in base alle condizioni dell’immobile.", "ristrutturazione-e-restauri", "manutenzioni-e-consolidamenti", "Manutenzioni e consolidamenti"],
  ["Consolidamenti strutturali", "Consolidamento e adeguamento sismico nell’ambito degli interventi di recupero, con le verifiche dei professionisti coinvolti.", "ristrutturazione-e-restauri", "manutenzioni-e-consolidamenti", "Interventi sulle strutture"],
  ["Tetti in legno e ampliamenti", "Realizzazione e rifacimento di coperture in legno, ampliamenti e opere esterne per ville e case di campagna.", "ville-e-casali", "coperture-e-ampliamenti", "Coperture e ampliamenti"]
];

page("servizi", {
  title:"Servizi edili a Sirolo e nel Conero", active:"servizi", crumbs:[servicesCrumb], image:images.varano, pageType:"CollectionPage",
  description:"I servizi di Sirio Costruzioni a Sirolo: ristrutturazioni, restauri, nuove ville, casali, manutenzioni, ampliamenti e consolidamenti strutturali.",
  schema:{"@type":"ItemList",name:"Servizi edili di Sirio Costruzioni",numberOfItems:services.length,itemListElement:services.map((service,index)=>({"@type":"ListItem",position:index+1,name:service.title,url:absolute(route(service.id))}))},
  body: pageIntro("Servizi edili · Provincia di Ancona","Servizi edili a Sirolo e nel Conero.","Ristrutturazioni, restauri e nuove costruzioni. Seguiamo anche manutenzioni, consolidamenti, coperture e ampliamenti in provincia di Ancona.")
    + section(`<div class="editorial-grid reveal">${frame(images.varano,"Agriturismo nel Conero · Varano, Ancona")}<div class="editorial-copy">${eyebrow("Le specializzazioni")}<h2>Dall’edificio da recuperare alla casa da costruire.</h2><p class="lede">Esplora i servizi e i progetti collegati per individuare il percorso più vicino al tuo intervento.</p>${serviceRows()}</div></div>`,"section-small rule")
    + section(`${sectionHead("Altri interventi","Manutenzioni, strutture e coperture.")}<div class="process-grid">${additionalServices.map(([title,description,id,anchor,label])=>`<article class="step reveal"><h3>${escape(title)}</h3>${paragraph(description)}${textLink(route(id)+"#"+anchor,label)}</article>`).join("")}</div>`,"section-small tint")
    + section(`<div class="prose"><h2>Un intervento nel territorio.</h2><p>La nostra sede è a Sirolo. Nel portfolio trovi <a href="${projectRoute(siroloProject)}">una villa con piscina a Sirolo</a>, <a href="${projectRoute(numanaProject)}">una palazzina in pietra a Numana</a> e <a href="${projectRoute(osimoProject)}">il recupero di grotte in un palazzo a Osimo</a>. Lavoriamo nel Conero e in provincia di Ancona.</p><p>Per il complesso residenziale di Castelfidardo puoi consultare la <a href="${route("appartamenti-in-vendita")}">pagina degli immobili</a> e richiedere la disponibilità aggiornata.</p></div>`,"section-small rule")
    + processSection() + callToAction()
});

for (const service of services) {
  page(service.id, {
    title:service.seoTitle, active:"servizi", crumbs:[servicesCrumb,crumb(service.id,service.title)], image:service.image,
    description:service.seoDescription,
    schema:{"@type":"Service",name:service.title,description:service.lead,provider:{"@id":origin + "/#impresa"},areaServed:"Sirolo e provincia di Ancona"},
    body: projectIntro(service.label,service.seoTitle,service.lead,service.image,service.caption,`<div class="actions">${btn(interest(service.interest),"Richiedi un sopralluogo")}</div>`)
      + section(`${sectionHead("Gli interventi","Cosa possiamo realizzare.")}<div class="process-grid">${service.sections.map(([name,description,anchor],i)=>`<article class="step reveal" id="${anchor}"><span>0${i+1} /</span><h3>${escape(name)}</h3>${paragraph(description)}</article>`).join("")}</div>`,"section-small tint")
      + relatedSection(pick(service.related)) + callToAction({topic:service.interest})
  });
}

const filters = [["tutti","Tutti i lavori"],["ville","Ville e casali"],["restauri","Restauri"],["ospitalita","Ospitalità"]];
page("lavori", {
  title:"Lavori edili a Sirolo, Numana e Osimo", active:"lavori", crumbs:[worksCrumb], pageType:"CollectionPage",
  description:"Esplora i lavori di Sirio Costruzioni: ville e casali a Sirolo, restauri a Numana e Osimo e progetti per l’ospitalità nel Conero.",
  schema:{"@type":"ItemList",name:"Lavori di Sirio Costruzioni",numberOfItems:projects.length,itemListElement:projects.map((project,index)=>({"@type":"ListItem",position:index+1,name:project.name,url:absolute(projectRoute(project))}))},
  body: pageIntro("Portfolio · Sirio Costruzioni","Lavori nel Conero e in provincia di Ancona.","Ville e casali a Sirolo, una palazzina a Numana, grotte a Osimo e spazi per l’ospitalità. Esplora i progetti per tipo di intervento.")
    + section(`<ul class="chips" data-filters hidden aria-label="Filtra i lavori">${filters.map(([value,label],i)=>`<li><button type="button" data-filter="${value}" aria-pressed="${i===0}">${label}</button></li>`).join("")}</ul><p class="filter-status" data-filter-status aria-live="polite">${projects.length} lavori</p>${projectCards(projects, "h2")}`,"section-small rule")
    + callToAction()
});

for (const project of projects) {
  const {id,name,city,area,type,lead,body,credit,pictures} = project;
  const service = services.find(item=>item.id===project.service);
  const meta = `<dl class="detail-meta">${area ? `<div><dt>Località</dt><dd>${escape(area)}</dd></div>`:""}<div><dt>Intervento</dt><dd>${escape(type)}</dd></div></dl>`;
  const projectName = name + (city ? " · " + city : "");
  const projectBody = section(`<div class="detail-body"><div class="prose reveal"><h2>Il progetto.</h2>${paragraph(body)}${credit ? paragraph(credit + "."):""}</div><aside class="detail-note"><h3>Servizio correlato</h3><p>${escape(service.label)}</p>${textLink(route(service.id),service.title)}</aside></div>`,"section-small tint");
  const related = projects.filter(item=>item.id!==id && item.service===project.service).slice(0,3);
  page("lavori/" + id, {
    title:name + (city ? " a " + city : ""), active:"lavori", crumbs:[worksCrumb,[projectRoute(project),name]], image:pictures[0], description:lead,
    schema:{"@type":"CreativeWork",name:projectName,description:lead,about:{"@type":"Thing",name:type},image:pictures.map(item=>absolute(imagePath(item))),publisher:{"@id":origin + "/#impresa"},...(credit ? {creditText:credit} : {}),...(area ? {contentLocation:{"@type":"Place",name:area}} : {})},
    gallery:pictures,
    body:projectIntro(type,name,lead,pictures[0],projectName,meta) + projectBody + photoGallery(pictures) + relatedSection(related,"Dal portfolio","Altri lavori.") + callToAction({topic:service.interest})
  });
}

page("appartamenti-in-vendita", {
  title:"Immobili a Castelfidardo", active:"appartamenti-in-vendita", crumbs:[crumb("appartamenti-in-vendita","Immobili")], image:images.castelfidardo,
  gallery:[images.castelfidardo,images.castelfidardo2,images.castelfidardo3],
  description:"Scopri il complesso residenziale di Sirio Costruzioni a Castelfidardo. Consulta le tavole del progetto e contattaci per informazioni sulle disponibilità.",
  body:projectIntro("Edilizia residenziale","Immobili a Castelfidardo.","Tra i progetti residenziali di Sirio Costruzioni figura il complesso a schiera di Castelfidardo. Contattaci per conoscere la disponibilità aggiornata e chiedere informazioni sulle unità.",images.castelfidardo,"Tavola di progetto · Castelfidardo",`<div class="actions">${btn(interest("Immobili a Castelfidardo"),"Chiedi la disponibilità")}</div>`)
    + section(`<div class="prose"><h2>Il complesso residenziale.</h2><p>Il progetto comprende abitazioni a schiera. Nella documentazione del complesso figurano ingressi indipendenti, garage e spazi esterni. Dotazioni e caratteristiche specifiche dipendono dall’unità.</p><p>Per informazioni su planimetrie, caratteristiche e visite puoi scriverci o chiamare la sede di Sirolo.</p></div>`,"section-small tint")
    + photoGallery([images.castelfidardo,images.castelfidardo2,images.castelfidardo3],"Tavole e prospetti del complesso.")
    + callToAction({label:"Informazioni immobiliari",title:"Ti interessa un immobile?",copy:"Chiedici quali unità sono disponibili e come organizzare una visita.",topic:"Immobili a Castelfidardo",button:"Richiedi informazioni"})
});

const options = ["Ristrutturazione o restauro","Villa, casale o nuova costruzione","Immobili a Castelfidardo","Altro intervento"];
const contactForm = `<div class="form-panel" id="richiesta"><h2>Raccontaci il tuo progetto.</h2><p class="muted">Compila i campi per preparare un’email. Potrai rileggerla e inviarla dalla tua app di posta.</p><form class="contact-form" data-contact-form hidden><div class="form-row"><label class="form-field">Nome e cognome <input name="nome" autocomplete="name" required maxlength="80"></label><label class="form-field">Email o telefono <input name="recapito" required maxlength="120"></label></div><div class="form-row"><label class="form-field">Comune dell’intervento <input name="comune" autocomplete="address-level2" required maxlength="80"></label><label class="form-field">Tipo di intervento (facoltativo) <select name="intervento"><option value="">Seleziona una voce</option>${options.map(option=>`<option>${escape(option)}</option>`).join("")}</select></label></div><label class="form-field">Descrivi il progetto <textarea name="messaggio" required maxlength="1000" rows="4"></textarea></label><p class="fine-print">I dati inseriti servono a compilare il messaggio. Leggi l’<a href="${route("privacy")}">informativa privacy</a>.</p><div class="actions"><button class="btn" type="submit">Prepara bozza email ${icon("arrow")}</button></div><p class="form-status" data-form-status aria-live="polite"></p><div data-contact-draft hidden><div class="actions"><a class="btn" data-contact-open>Apri bozza nell’app email</a></div><details><summary>Copia il testo della bozza</summary><label class="form-field">Testo da incollare nella tua app di posta<textarea data-contact-copy readonly rows="7"></textarea></label></details></div></form><noscript><p>Puoi <a href="mailto:${business.email}">scriverci direttamente per email</a>.</p></noscript></div>`;
const contactMap = section(`<div class="map-panel" data-map><div class="section-head"><div>${eyebrow("La nostra sede")}<h2>Dove siamo a Sirolo.</h2></div>${textLink(business.maps,"Apri le indicazioni","diagonal")}</div><p class="lede">${business.name} · ${business.address}</p><div class="map-canvas"><div class="map-placeholder" data-map-placeholder><strong>Sirio Costruzioni a Sirolo</strong><p>Consulta la posizione della sede su Google Maps.</p></div><iframe id="mappa-sede" data-map-frame data-src="${escape(business.mapEmbed)}" title="Mappa della sede di Sirio Costruzioni a Sirolo, Via Molini I 18" width="600" height="450" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin" hidden></iframe></div><p class="small muted" id="informazioni-mappa">Mostrando la mappa accetti il caricamento di Google Maps. Google riceverà il tuo indirizzo IP e altri dati tecnici e potrà usare cookie secondo la propria <a href="https://policies.google.com/privacy" rel="noreferrer">informativa privacy</a>. Puoi chiudere la mappa in qualsiasi momento.</p><div class="actions"><button class="btn" type="button" data-map-toggle aria-controls="mappa-sede" aria-expanded="false" aria-describedby="informazioni-mappa" hidden>Mostra mappa Google Maps</button></div><noscript><p>Per consultare la mappa usa il collegamento alle indicazioni.</p></noscript></div>`,"section-small tint");
page("contatti", {
  title:"Contatti e sopralluoghi a Sirolo", active:"contatti", crumbs:[crumb("contatti","Contatti")], pageType:"ContactPage",
  description:"Contatta Sirio Costruzioni a Sirolo per un sopralluogo o un preventivo per ristrutturazioni, ville, casali e lavori edili in provincia di Ancona.",
  body:pageIntro("Sirolo · Provincia di Ancona","Contatta Sirio Costruzioni a Sirolo.","Per una ristrutturazione, una nuova costruzione o informazioni sugli immobili, scrivici o chiamaci. Il primo confronto ci aiuta a capire come intervenire.")
    + section(`<div class="contact-grid"><div><h2>I nostri recapiti.</h2><dl class="contact-list"><div><dt>Sede</dt><dd>${business.address}</dd></div><div><dt>Telefono</dt><dd><a href="tel:${business.telephone}">${business.phoneLabel}</a></dd></div><div><dt>Email</dt><dd><a data-direct-email href="mailto:${business.email}">${business.email}</a></dd></div>${business.people.map(([person,label,tel])=>`<div><dt>${person}</dt><dd><a href="tel:${tel}">${label}</a></dd></div>`).join("")}</dl>${textLink(business.maps,"Indicazioni su Google Maps","diagonal")}</div>${contactForm}</div>`,"section-small rule")
    + contactMap
    + section(`<div class="prose"><h2>Prima di contattarci.</h2><details><summary>Quali informazioni sono utili per il primo confronto?</summary><p>Il comune, il tipo di immobile e una descrizione di cosa vorresti cambiare o costruire. Se hai già fotografie o un progetto, puoi allegarli all’email.</p></details><details><summary>In quali zone lavorate?</summary><p>Operiamo da Sirolo nella Riviera del Conero e in provincia di Ancona. Indicaci il comune per verificare insieme la fattibilità del sopralluogo.</p></details></div>`,"section-small rule")
});

page("privacy", {
  title:"Informativa privacy", crumbs:[crumb("privacy","Privacy")], noindex:true,
  description:"Informazioni sui recapiti e sui dati usati per rispondere a richieste inviate a Sirio Costruzioni.",
  body:pageIntro("Informazioni sul sito","Privacy.","Come funzionano i contatti e quali informazioni entrano in gioco quando visiti il sito o invii una richiesta.")
    + section(`<div class="prose"><h2>Contatti e richieste.</h2><p>Il referente per le richieste è ${business.name}, ${business.address}, P. IVA ${business.vat}. Puoi scrivere a <a href="mailto:${business.email}">${business.email}</a>.</p><p>Il modulo compone una bozza nella tua app di posta. I campi restano nel browser durante la compilazione. Se invii l’email, l’impresa riceve i dati che scegli di includere e li usa per gestire la richiesta e ricontattarti.</p><h2>Consultazione del sito.</h2><p>Il servizio di hosting può registrare dati tecnici necessari alla consegna e alla sicurezza delle pagine, come indirizzo IP, data e risorsa richiesta. I collegamenti a siti esterni si attivano quando li apri.</p><h2>Google Maps.</h2><p>Nella pagina Contatti è disponibile una mappa incorporata di Google Maps. Il collegamento a Google avviene quando premi «Mostra mappa Google Maps». Google può ricevere l’indirizzo IP, informazioni sul browser e altri dati tecnici e usare cookie. Puoi interrompere il caricamento della mappa con il pulsante «Chiudi la mappa».</p><p>Per i dettagli sul trattamento da parte di Google consulta la <a href="https://policies.google.com/privacy" rel="noreferrer">sua informativa privacy</a>. La tua scelta di visualizzare la mappa vale per la pagina aperta.</p><h2>Domande sui tuoi dati.</h2><p>Per informazioni sull’uso dei tuoi dati o per richiedere accesso, correzione o cancellazione quando applicabili, usa il recapito email indicato sopra.</p><p><a href="${route("cookie")}">Leggi le informazioni sui cookie</a>.</p></div>`,"section-small rule")
});

page("cookie", {
  title:"Informazioni sui cookie", crumbs:[crumb("cookie","Cookie")], noindex:true,
  description:"Informazioni su cookie, componenti del sito e servizi esterni di Sirio Costruzioni.",
  body:pageIntro("Informazioni sul sito","Cookie.","Informazioni sui componenti caricati durante la navigazione.")
    + section(`<div class="prose"><h2>Componenti del sito.</h2><p>Le pagine, le immagini e gli script di navigazione sono ospitati insieme al sito. Il codice del sito non integra strumenti di analisi. Nella pagina Contatti è presente una mappa di Google Maps che si attiva quando scegli di mostrarla.</p><p>Se il sito è consultato in un’anteprima privata, la piattaforma può usare tecnologie necessarie per l’accesso.</p><h2>Mappa di Google Maps.</h2><p>Il riquadro della mappa resta inattivo fino al clic su «Mostra mappa Google Maps». L’attivazione carica contenuti di Google, che può usare cookie e ricevere dati tecnici. Il pulsante «Chiudi la mappa» rimuove il contenuto incorporato. La scelta non viene memorizzata dal sito per le visite successive.</p><p>Consulta l’<a href="https://policies.google.com/privacy" rel="noreferrer">informativa privacy di Google</a> per conoscere il trattamento effettuato dal gestore della mappa.</p><h2>Collegamenti esterni.</h2><p>I collegamenti a Google Maps e Facebook aprono i rispettivi servizi su richiesta. Da quel momento si applicano le informazioni fornite dai rispettivi gestori.</p><p><a href="${route("privacy")}">Leggi l’informativa privacy</a>.</p></div>`,"section-small rule")
});

for (const legacy of ["gallery","catalogo"]) {
  write(legacy + "/index.html",`<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, follow"><title>Lavori | Sirio Costruzioni</title><link rel="canonical" href="${absolute(route("lavori"))}"><meta http-equiv="refresh" content="0;url=${route("lavori")}"></head><body><p>La pagina è ora <a href="${route("lavori")}">Lavori</a>.</p></body></html>`);
}
write("404.html", layout({path:"/404.html",title:"Pagina non trovata",description:"Torna alla Home o visita il portfolio di Sirio Costruzioni.",noindex:true,body:pageIntro("Sirio Costruzioni","Pagina non trovata.","Puoi tornare alla Home o esplorare i nostri lavori.")+section(`<div class="actions">${btn("/","Torna alla Home")}${textLink(route("lavori"),"Vai ai lavori")}</div>`,"section-small")}));
if (preview) {
  // Let crawlers see the noindex directive, including on hosts without custom headers.
  write("robots.txt", "User-agent: *\nAllow: /\n");
  rmSync(join(output, "sitemap.xml"), {force:true});
} else {
  write("robots.txt", "User-agent: *\nAllow: /\nSitemap: " + absolute("/sitemap.xml") + "\n");
  write("sitemap.xml",`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${pages.filter(p=>!p.noindex).map(p=>`  <url><loc>${escape(absolute(p.path))}</loc>${(p.gallery ?? [p.image ?? images.villa]).map(item=>`<image:image><image:loc>${escape(absolute(imagePath(item)))}</image:loc></image:image>`).join("")}</url>`).join("\n")}\n</urlset>\n`);
}
write("_redirects", "/gallery /lavori/ 301\n/gallery/ /lavori/ 301\n/catalogo /lavori/ 301\n/catalogo/ /lavori/ 301\n");
write("_headers", `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
${preview ? "  X-Robots-Tag: noindex\n" : ""}/assets/*
  Cache-Control: public, max-age=86400
`);
console.log(pages.length + " pagine e due percorsi precedenti generati per " + origin);

buildProposals(output);
