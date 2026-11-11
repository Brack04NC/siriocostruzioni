
export const business = {
  name: "Sirio Costruzioni S.r.l.",
  telephone: "+390719330685",
  phoneLabel: "071 933 0685",
  email: "siriocostruzionisirolo@gmail.com",
  address: "Via Molini I 18, 60020 Sirolo (AN)",
  vat: "00715570420",
  maps: "https://maps.app.goo.gl/L7Wq1Mqxpb8fcV6XA",
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d180.59948108660032!2d13.6087326!3d43.515704!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13327ec9ac5d02af%3A0x1442d7fc537a3fd0!2sSirio%20Costruzioni%20S.R.L.!5e1!3m2!1sit!2sit!4v1794318860202!5m2!1sit!2sit",
  facebook: "https://www.facebook.com/siriocostruzionisrl/",
  people: [
    ["Annalisa Canuti", "335 737 4143", "+393357374143"],
    ["Pierfranco Canuti", "335 737 4142", "+393357374142"],
    ["Riccardo Canuti", "335 613 1803", "+393356131803"]
  ]
};

const cdn = "https://d3e7ilti5q92ri.cloudfront.net/";
const photo = (file, original, alt, preferredWidth) => ({ file, url: cdn + original + (preferredWidth ? "?width=" + preferredWidth : ""), original: cdn + original, alt });

export const images = {
  villa: photo("villa-piscina", "Villa_con_piscina_a_Sirolo_progetto_Arch_Alessandro_Riboldi_2_45a79aac1d.png", "Villa a Sirolo affacciata sulla piscina", 1600),
  villa2: photo("villa-giardino", "Villa_con_piscina_a_Sirolo_progetto_Arch_Alessandro_Riboldi_16274ab2d1.png", "La villa di Sirolo vista dagli spazi esterni", 1600),
  casale: photo("casale-pietra", "Casale_in_pietra_del_Conero_Sirolo_Progetto_arch_Danilo_e_Nicola_Guerri_3_f08a38cbe2.png", "Esterno del casale in pietra del Conero a Sirolo"),
  casale2: photo("casale-prospetto", "Casale_in_pietra_del_Conero_Sirolo_Progetto_arch_Danilo_e_Nicola_Guerri_2_f626d29b9e.png", "Un altro prospetto del casale in pietra a Sirolo"),
  casale3: photo("casale-dettaglio", "Casale_in_pietra_del_Conero_Sirolo_Progetto_arch_Danilo_e_Nicola_Guerri_82ea112d69.png", "Vista sulla piscina e sulla campagna dal casale in pietra"),
  locanda: photo("locanda-rocco", "Ristrutturazione_Locanda_Rocco_Sirolo_2_82dc623ff7.png", "La Locanda Rocco sopra l’arco nel centro storico di Sirolo"),
  locanda2: photo("locanda-rocco-dettaglio", "Ristrutturazione_Locanda_Rocco_Sirolo_60cab1a1cf.png", "Una seconda vista della Locanda Rocco a Sirolo"),
  grotte: photo("grotte-osimo", "Restauro_e_realizzazione_SPA_Grotte_di_palazzo_storico_Progetto_studio_Guzzini_Engineering_Osimo_AN_2_9889b67f09.png", "Interno recuperato nelle grotte di un palazzo di Osimo, sotto una volta in pietra"),
  grotte2: photo("grotte-osimo-spa", "Restauro_e_realizzazione_SPA_Grotte_di_palazzo_storico_Progetto_studio_Guzzini_Engineering_Osimo_AN_3c6c3b6c53.png", "Area SPA con rivestimenti in legno nelle grotte di Osimo"),
  fabula: photo("rustico-la-fabula", "Restauro_rustico_B_and_B_La_Fabula_Sirolo_3bc8665bb5.png", "Il rustico del B&B La Fabula a Sirolo"),
  numana: photo("palazzina-numana", "Ristrutturazione_Palazzina_in_pietra_del_Conero_Centro_Storico_Numana_AN_c5a56518f9.png", "Facciata in pietra con persiane nel centro storico di Numana"),
  varano: photo("agriturismo-varano", "Realizzazione_agriturismo_rustico_nel_Conero_Varano_AN_2_945a1f48ab.png", "L’agriturismo nel Conero, tra il verde di Varano", 1808),
  varano2: photo("agriturismo-varano-dettaglio", "Realizzazione_agriturismo_rustico_nel_Conero_Varano_AN_2e66b7f926.png", "Una seconda vista dell’agriturismo di Varano"),
  fornace: photo("vecchia-fornace", "Restauro_completo_vecchia_fornace_Arch_Filiberto_Andreoli2_2_759a90e68d.png", "Veduta della vecchia fornace oggetto di restauro"),
  fornace2: photo("vecchia-fornace-dettaglio", "Restauro_completo_vecchia_fornace_Arch_Filiberto_Andreoli_5dfffad76c.png", "Una seconda vista della vecchia fornace"),
  fornace3: photo("vecchia-fornace-interno", "Restauro_completo_vecchia_fornace_Arch_Filiberto_Andreoli2_1_8cc4f806a6.png", "Una fotografia del recupero della vecchia fornace"),
  archivio: photo("archivio-conero", "1_b7aae4380b.jpg", "Fotografia d’archivio del paesaggio del Conero e delle sue costruzioni"),
  castelfidardo: photo("castelfidardo-tavola", "1_5bd3864bae.jpg", "Tavola illustrativa del complesso residenziale in via Dante Alighieri a Castelfidardo"),
  castelfidardo2: photo("castelfidardo-prospetti", "3_37618fdf28.jpg", "Tavola con render e prospetti residenziali a Castelfidardo"),
  castelfidardo3: photo("castelfidardo-materiale", "2_f19f3b7751.jpg", "Materiale illustrativo di edilizia residenziale a Castelfidardo")
};

export const services = [
  {
    id: "ristrutturazione-e-restauri", title: "Ristrutturazioni e restauri", label: "Recupero dell’esistente",
    seoTitle: "Ristrutturazioni e restauri a Sirolo",
    seoDescription: "Ristrutturazioni di case, casali ed edifici in pietra a Sirolo e in provincia di Ancona. Scopri i lavori di Sirio Costruzioni e richiedi un sopralluogo.",
    lead: "Recuperiamo case, rustici ed edifici storici a Sirolo e nella provincia di Ancona. Ogni intervento parte dalla lettura dell’edificio e di ciò che vale la pena conservare.",
    caption: "Palazzina in pietra · Centro storico di Numana", image: images.numana,
    sections: [
      ["Ristrutturazioni su misura", "Dalla riorganizzazione degli spazi al recupero di interi immobili, definiamo le lavorazioni a partire dalle condizioni dell’edificio, dalle esigenze di chi lo userà e dal progetto concordato.", "ristrutturazioni"],
      ["Restauri e murature in pietra", "Casali, rustici e palazzine del Conero richiedono attenzione ai materiali e ai dettagli esistenti. Affrontiamo il recupero di facciate, murature e finiture nel contesto di ciascun intervento.", "restauri-in-pietra"],
      ["Manutenzioni e consolidamenti", "Ci occupiamo di manutenzioni ordinarie e straordinarie, consolidamenti e adeguamenti sismici. Gli interventi si definiscono dopo il sopralluogo e le verifiche dei professionisti coinvolti.", "manutenzioni-e-consolidamenti"]
    ],
    related: ["locanda-rocco-sirolo", "palazzina-pietra-numana", "grotte-palazzo-osimo"],
    interest: "Ristrutturazione o restauro"
  },
  {
    id: "ville-e-casali", title: "Ville e casali", label: "Nuove costruzioni e case di campagna",
    seoTitle: "Costruzione di ville e casali nel Conero",
    seoDescription: "Ville su misura, casali in pietra e tetti in legno a Sirolo e nel Conero. Guarda i progetti di Sirio Costruzioni e chiedi un sopralluogo.",
    lead: "Realizziamo ville e abitazioni su misura e recuperiamo casali e rustici nel Conero. Pietra, legno e spazi esterni trovano una misura diversa in ogni progetto.",
    caption: "Villa con piscina · Sirolo", image: images.villa,
    sections: [
      ["Ville e nuove abitazioni", "Costruiamo nuove residenze e villette in dialogo con il progetto architettonico e con le caratteristiche del lotto. La definizione delle finiture, della distribuzione e degli spazi esterni accompagna il percorso del cantiere.", "nuove-costruzioni"],
      ["Casali e rustici in pietra", "Lavoriamo su case di campagna, rustici e casali, sia per il recupero sia per nuove costruzioni. Murature in pietra, coperture in legno e dettagli delle aperture concorrono al carattere dell’abitazione.", "casali-in-pietra"],
      ["Tetti in legno, ampliamenti e spazi esterni", "Realizziamo e rifacciamo tetti in legno. Seguiamo ampliamenti, sopraelevazioni e opere per terrazze, patii e piscine quando previsti dal progetto e dalle verifiche tecniche sull’immobile.", "coperture-e-ampliamenti"]
    ],
    related: ["villa-piscina-sirolo", "casale-pietra-sirolo", "agriturismo-varano"],
    interest: "Villa, casale o nuova costruzione"
  }
];

export const projects = [
  {
    id: "villa-piscina-sirolo", name: "Villa con piscina", city: "Sirolo", area: "Sirolo (AN)", type: "Villa residenziale", categories: "ville",
    lead: "Una villa con piscina a Sirolo, con aperture sul giardino e spazi esterni che accompagnano la casa.",
    body: "La villa residenziale si sviluppa intorno al rapporto fra abitazione, giardino e piscina. Le aperture collegano gli ambienti della casa agli spazi all’aperto, mentre il bordo della vasca scandisce l’area esterna. Il progetto fa parte dei lavori di Sirio Costruzioni a Sirolo.",
    credit: "Progetto di Alessandro Riboldi", pictures: [images.villa, images.villa2], service: "ville-e-casali"
  },
  {
    id: "casale-pietra-sirolo", name: "Casale in pietra del Conero", city: "Sirolo", area: "Sirolo (AN)", type: "Casale in pietra", categories: "ville",
    lead: "Un casale in pietra a Sirolo, tra prospetti rustici, piscina e spazi aperti sulla campagna del Conero.",
    body: "La pietra caratterizza i prospetti e il disegno delle aperture di questo casale a Sirolo. La copertura, le persiane e gli affacci sulla campagna ne definiscono il carattere. Gli spazi esterni comprendono la piscina e le aree che accompagnano il volume della casa.",
    credit: "Progetto di Danilo e Nicola Guerri", pictures: [images.casale, images.casale2, images.casale3], service: "ville-e-casali"
  },
  {
    id: "locanda-rocco-sirolo", name: "Locanda Rocco", city: "Sirolo", area: "Centro storico di Sirolo (AN)", type: "Ristrutturazione e ospitalità", categories: "restauri ospitalita",
    lead: "La ristrutturazione di una locanda che si affaccia sul centro storico di Sirolo, sopra la porta d’ingresso al borgo.",
    body: "La Locanda Rocco si trova nel centro storico di Sirolo, sopra il passaggio d’ingresso al borgo. Il lavoro di ristrutturazione riguarda un edificio per l’ospitalità inserito in un contesto di murature in pietra e affacci sulla strada. Il prospetto sopra l’arco rende immediatamente riconoscibile la locanda.",
    pictures: [images.locanda, images.locanda2], service: "ristrutturazione-e-restauri"
  },
  {
    id: "grotte-palazzo-osimo", name: "Grotte e SPA in un palazzo storico", city: "Osimo", area: "Osimo (AN)", type: "Restauro e interni", categories: "restauri",
    lead: "Restauro di grotte in un palazzo storico a Osimo, con ambienti voltati in pietra e un’area SPA.",
    body: "Gli ambienti voltati e la pietra a vista restano al centro del progetto. Le immagini documentano il rapporto fra le superfici storiche e i nuovi inserti in legno.",
    credit: "Progetto di Guzzini Engineering", pictures: [images.grotte, images.grotte2], service: "ristrutturazione-e-restauri"
  },
  {
    id: "palazzina-pietra-numana", name: "Palazzina in pietra del Conero", city: "Numana", area: "Centro storico di Numana (AN)", type: "Ristrutturazione", categories: "restauri",
    lead: "Una palazzina in pietra nel centro storico di Numana, tra facciate compatte, persiane e aperture scandite.",
    body: "La ristrutturazione della palazzina si inserisce nel tessuto del centro storico di Numana. La tessitura della pietra, le finestre e le persiane definiscono la facciata. È un esempio del nostro lavoro su edifici in pietra nei borghi della Riviera del Conero.",
    pictures: [images.numana], service: "ristrutturazione-e-restauri"
  },
  {
    id: "rustico-la-fabula-sirolo", name: "Rustico La Fabula", city: "Sirolo", area: "Monte Colombo, Sirolo (AN)", type: "Restauro e ospitalità", categories: "restauri ospitalita",
    lead: "Il recupero di un rustico oggi dedicato all’ospitalità, sul Monte Colombo nel Parco del Conero.",
    body: "La struttura sorge sulle alture tra Sirolo e Numana. La fotografia mostra il carattere rurale dell’edificio nel suo contesto, tra gli spazi esterni e il paesaggio del parco.",
    pictures: [images.fabula], service: "ristrutturazione-e-restauri"
  },
  {
    id: "agriturismo-varano", name: "Agriturismo nel Conero", city: "Varano", area: "Varano, Ancona (AN)", type: "Rustico e ospitalità", categories: "ville ospitalita",
    lead: "Un rustico destinato all’ospitalità nella campagna di Varano, sul versante anconetano del Conero.",
    body: "L’edificio si legge insieme agli spazi aperti che lo circondano. Le immagini dell’intervento mostrano il rapporto tra il fabbricato rurale e il paesaggio agricolo.",
    pictures: [images.varano, images.varano2], service: "ville-e-casali"
  },
  {
    id: "restauro-vecchia-fornace", name: "Restauro della vecchia fornace", city: "", area: "", type: "Restauro di edificio storico", categories: "restauri",
    lead: "Il restauro di una vecchia fornace, con il recupero delle murature e della struttura della ciminiera.",
    body: "Il lavoro riguarda il recupero di una struttura nata per un uso produttivo. La ciminiera e le murature conservano il carattere dell’edificio. La galleria raccoglie viste del cantiere e delle superfici in pietra, mostrando alcune fasi dell’intervento di restauro.",
    credit: "Progetto di Filiberto Andreoli", pictures: [images.fornace, images.fornace2, images.fornace3], service: "ristrutturazione-e-restauri"
  }
];
