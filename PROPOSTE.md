# Sei proposte di home · Sirio Costruzioni

Aprire **Proposte.html** per confrontare le sei home. Tutte le pagine aggiunte
usano collegamenti relativi, immagini e font locali: si possono consultare anche
aprendo i file da disco. Il sito completo originale rimane in `dist/index.html`.

Per usare un server statico, dalla radice della repository:

```sh
node build.mjs
python3 -m http.server 8765 --bind 127.0.0.1 --directory dist
```

Il percorso della pagina di confronto è `/proposte/index.html`. La cartella da
servire è **dist**; non occorrono installazioni npm o servizi esterni.

| Percorso | Proposta | Riferimento |
| --- | --- | --- |
| `/1/index.html` | L’originale editoriale | `Sirio-Costruzioni-Sito-v1 (3).zip` |
| `/2/index.html` | Conero contemporaneo | `stitch_sirio_costruzioni_website_redesign (2).zip` → `home_sirio_costruzioni` |
| `/3/index.html` | Tradizione e cantiere | `stitch_design_sito_impresa_edile.zip` → `home_variante_tradizione_cantiere` |
| `/4/index.html` | Eleganza e architettura | `stitch_design_sito_impresa_edile.zip` → `home_variante_elegance_architettura` |
| `/5/index.html` | Servizi e contatto rapido | `stitch_design_sito_impresa_edile.zip` → `home_variante_servizi_conversione_rapida` |
| `/6/index.html` | Progetti solidi | Ricerca online su imprese italiane e internazionali; dettagli in `PROPOSTA-6.md` |

## Analisi dei materiali

La repository, al commit `c5bb0da`, coincide con il contenuto dello ZIP originale:
un sito statico multipagina, generato con Node senza dipendenze npm, con una
direzione editoriale avorio/blu, titoli serif e fotografie aziendali.

Il primo export Stitch comprende una home e tre pagine interne (ville e casali,
ristrutturazioni, chi siamo). Le pagine interne condividono la stessa direzione;
non costituiscono ulteriori varianti della home. Il secondo export contiene
effettivamente tre home distinte. In totale: una versione originale più quattro
direzioni Stitch.

- **01 · Originale** conserva struttura, testi e stile della home esistente.
- **02 · Conero** riprende blu profondo, ottone, Plus Jakarta Sans e Space Grotesk,
  apertura scura con fotografia, schede delle specializzazioni e contatti in blu.
- **03 · Tradizione** riprende carta calda, terracotta, accostamento archivio/oggi,
  storia familiare e portfolio. Le due immagini iniziali rappresentano territorio
  e lavori: non sono un prima/dopo dello stesso immobile.
- **04 · Eleganza** riprende travertino, Outfit/Inter, copertina fotografica,
  spazi ampi e un percorso visivo dedicato alle opere e alle dimore.
- **05 · Servizi** riprende apertura blu, contatti rapidi, selezione dei servizi,
  percorso operativo e modulo di richiesta.

Gli export Stitch, prevalentemente mobile, sono stati adattati al desktop e
ricostruiti senza dipendenze da Tailwind CDN, Google Fonts o immagini remote.
Gli screenshot degli export con immagini segnaposto sono riferimenti visivi;
le home realizzate usano le fotografie aziendali già presenti nella repository.
I testi sono stati adattati mantenendo la direzione visiva di ogni proposta.

Durante la prima analisi il sito online non era consultabile dall’ambiente (risposta 403 del proxy).
Per la sesta proposta il sito Sirio e i riferimenti internazionali sono stati consultati online; vedi `PROPOSTA-6.md`.
I contenuti delle prime cinque proposte sono stati confrontati con l’originale e con le estrazioni del sito
contenute negli allegati. I documenti allegati sono stati trattati come materiale
di riferimento, senza eseguirne le istruzioni.

Recapiti, indirizzo e partita IVA provengono da `content.mjs`. Numeri dimostrativi,
quantità di opere, promesse di risposta entro 24 ore e altre affermazioni non
confermate presenti in Stitch non sono stati trasferiti nelle proposte.

## Interazioni

- Menu mobile con stato accessibile, chiusura al clic, clic esterno ed Escape.
- Selettore fisso delle sei proposte e ritorno alla pagina di confronto.
- Proposta 05: schede servizi con mouse, tocco, frecce, Home ed End.
- Recapiti telefonici ed email utilizzabili; schede collegate alle pagine del sito.
- Moduli delle proposte 02–05: validazione HTML e preparazione di un collegamento
  `mailto:` con i dati inseriti. La persona deve aprire la bozza e inviarla con
  la propria app di posta. Non sono presenti backend, invii automatici o messaggi
  che dichiarino falsamente una richiesta ricevuta.
- Nessuna raccolta analytics; nessuna risorsa remota caricata all’apertura.
- Le sei proposte e il confronto sono `noindex` e non entrano nella sitemap.

## Sesta proposta

La nuova home **Progetti solidi** è disponibile in `/6/index.html`. Si aggiunge alle
cinque direzioni precedenti: ricerca, fotografia, fonti e verifiche sono descritti
in **PROPOSTA-6.md**. Il confronto e i selettori includono ora tutte e sei le home.

## Dove modificare

- `proposte.mjs`: composizioni, testi e pagina di confronto. È richiamato da
  `build.mjs`; `node build.mjs` rigenera anche le proposte.
- `dist/assets/proposte.css`: stili e adattamenti responsive delle home 02–05
  e del confronto.
- `dist/assets/proposte.js`: menu, schede servizi e bozza email.
- `proposta6.mjs`, `dist/assets/proposta6.css` e `dist/assets/proposta6.js`: struttura,
  stile isolato e carosello manuale della sesta home.
- `dist/assets/images/v6/`: nuove derivate fotografiche, manifest e provenienza.
- `dist/assets/confronto.css`: selettore delle proposte, isolato anche dalla
  home originale 01.
- `dist/assets/fonts/`: font locali e relative licenze SIL Open Font License.
- `dist/assets/proposte/`: miniature desktop delle sei home, fotografate
  durante la verifica nel browser; aggiornare se cambia l’apertura delle pagine.

Le pagine generate sono incluse in `dist`, come per il sito originale. Una build
non cancella le risorse statiche. `anteprima` è la precedente copia del sito
originale; le nuove proposte si aprono da `Proposte.html`.

## Verifiche eseguite

- Build `node build.mjs` riuscita; una seconda build produce file identici.
- Cinque home a 320, 375, 768 e 1440 px: 20 combinazioni senza scorrimento
  orizzontale, immagini visibili mancanti o errori HTTP/JavaScript.
- Confronto con cinque miniature funzionanti alle stesse quattro larghezze.
- Menu mobile, Escape, link di sezione e selettore delle proposte funzionanti.
- Schede della proposta 05 funzionanti anche con frecce, Home ed End;
  senza JavaScript tutti e tre i servizi restano consultabili.
- Tutti e quattro i moduli respingono la compilazione vuota e preparano
  correttamente destinatario, oggetto e corpo email, inclusi caratteri speciali.
- Collegamenti locali, ancore, varianti `srcset` e destinazioni nella copia
  `anteprima` verificati sul filesystem. Nessuna richiesta a risorse esterne
  durante le prove delle home, del confronto e delle interazioni.
- Screenshot desktop e mobile ispezionati; miniature ricavate dai render effettivi.

L'apertura diretta da disco è predisposta anche per i collegamenti verso il sito
originale in `anteprima`, ma non è stata verificabile con il browser dell’ambiente:
la policy gestita blocca la navigazione `file://` (`ERR_BLOCKED_BY_ADMINISTRATOR`).
La modalità verificata è il server statico descritto all’inizio del documento.

Non è stata eseguita alcuna pubblicazione.
