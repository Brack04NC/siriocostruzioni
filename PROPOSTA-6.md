# 06 · Progetti solidi

La nuova home è in **`dist/6/index.html`**, al percorso `/6/index.html` sul server
statico. Il confronto in `dist/proposte/index.html` include ora sei proposte.
Per avviare dalla radice della repository:

```sh
node build.mjs
python3 -m http.server 8765 --bind 127.0.0.1 --directory dist
```

## Riferimenti online

Ricerca eseguita l’11 novembre 2026 sulle pagine ufficiali, tutte raggiunte con
risposta HTTP 200. La sesta proposta usa una composizione originale e fotografie
Sirio; i siti consultati sono riferimenti per la comunicazione e la gerarchia.

| Azienda | Pagina ufficiale | Spunti osservati |
| --- | --- | --- |
| Pizzarotti · Italia | https://www.pizzarotti.it/ | Racconto del costruire e rigenerare, gerarchia tipografica marcata, presentazione di competenze e portfolio; palette blu/turchese e font Teko/Barlow rilevati nei CSS. |
| Webuild · Italia/internazionale | https://www.webuildgroup.com/ | Apertura fotografica ampia, sezioni cantieri e aree di business, piccoli metadati tecnici e CTA leggibili. |
| Turner Construction · Stati Uniti/internazionale | https://www.turnerconstruction.com/ | Messaggio sintetico “Making a Difference”, percorsi per progetti/persone/futuro e competenze organizzate per attività. |
| Mace · Regno Unito/internazionale | https://www.macegroup.com/ | Titoli essenziali, progetti in evidenza e struttura modulare rilevati nell’HTML/CSS; il sito presenta anche la scelta tra Consult e Construct. |
| Skanska · Svezia/internazionale | https://www.skanska.com/ | Gerarchia istituzionale chiara e orientamento geografico; la pagina globale è anche un punto di scelta del paese. |

La ricerca comprende HTML, CSS e render delle pagine. Alcuni render di terze parti
erano parziali, con modali o loader: gli spunti da HTML/CSS sono distinti dalle
osservazioni fotografiche. Non sono stati copiati codice, marchi o immagini delle
altre imprese, né attribuiti a Sirio i loro progetti, dimensioni o risultati.

## La direzione per Sirio

- Fondo chiaro, carbone e un accento verde lime: una palette distinta dalle altre
  cinque proposte, con il logo aziendale originale.
- Tipografia Inter locale, titoli ampi, indici e separatori per una lettura asciutta.
- Apertura “Progetti solidi. Spazi da vivere.” e selezione manuale di tre lavori
  reali. Il carosello non avanza automaticamente e si usa anche da tastiera.
- Competenze presentate in tre righe: ristrutturare, costruire, abitare.
- Portfolio con composizione asimmetrica, metodo in accordion nativo, territorio
  e contatto diretto con la famiglia Canuti.
- Modulo che prepara una bozza email: il visitatore deve aprirla e inviarla dalla
  propria app di posta. Non c’è un backend di invio.

La scala del racconto resta quella di un’impresa di famiglia nel Conero.
I collegamenti ai singoli lavori e servizi portano alle pagine complete già
presenti nel sito. Le cinque home precedenti conservano i loro contenuti e stili;
il solo selettore comune aggiunge la voce 06.

## Fotografie e resa

L’audit ha trovato ville a 1280×960 px, agriturismo a 1500×996 px e diversi
casali/restauri a circa 500 px. Dal CDN aziendale sono state recuperate versioni
servite a **1920 px** di villa, casale, prospetto del casale e agriturismo.
Le richieste senza parametro di dimensione restituivano miniature da 500 px.

La nuova home usa copie separate in `dist/assets/images/v6/`, esportate in WebP
a 640, 1280 e 1920 px, con `srcset`, dimensioni dichiarate e caricamento differito
delle immagini fuori dall’apertura. I file e i percorsi delle foto delle cinque
home precedenti sono conservati.

La resa migliora soprattutto per i casali precedentemente ingranditi da 500 px.
Le fonti restano morbide: non si dichiara un recupero di dettaglio fotografico
inesistente. Il trattamento consiste in selezione della fonte, ridimensionamento
e compressione per il web; geometrie, facciate e materiali non sono stati ritoccati.
URL delle fonti, dimensioni e hash sono in `dist/assets/images/v6/sources.json`.

## Manutenzione

- `proposta6.mjs`: struttura e contenuti della nuova home.
- `dist/assets/proposta6.css`: stile isolato della sesta direzione.
- `dist/assets/proposta6.js`: selezione manuale dei progetti, frecce, Home ed End.
- `proposte.mjs`: registro delle sei proposte e pagina di confronto.
- `dist/assets/proposte/anteprima-6.webp`: miniatura ricavata dal render nel browser.

`node build.mjs` rigenera tutte le pagine senza richiedere dipendenze npm: le
immagini e i font già preparati fanno parte dei file statici. La nuova pagina
è `noindex`, come le altre proposte, e non entra nella sitemap del sito.

Non è stata eseguita alcuna pubblicazione.

## Verifiche finali

- Build e sintassi JavaScript verificate; risorse interamente locali.
- Home 06 e confronto a 320, 375, 768 e 1440 px senza scorrimento orizzontale,
  immagini mancanti o errori HTTP/JavaScript.
- Menu mobile, chiusura con Escape e link di sezione funzionanti.
- Carosello manuale verificato con clic, frecce, Home ed End; accordion nativo
  utilizzabile e stato dei pulsanti aggiornato.
- Modulo: campi obbligatori e codifica della bozza email verificati anche con
  caratteri speciali. Nessun invio automatico.
- Le home 01–05 mantengono la composizione originale; i sei collegamenti del
  selettore sono verificati anche a 320 px.
- Screenshot desktop e mobile ispezionati; miniatura 06 generata dal render.
