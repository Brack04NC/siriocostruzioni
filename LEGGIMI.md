
# Sirio Costruzioni · nuovo sito

Sito statico multipagina in HTML, CSS e JavaScript. Le pagine, le immagini e gli script sono utilizzabili senza dipendenze di rete. Le azioni telefoniche, l’email e i collegamenti a servizi esterni richiedono le rispettive app o connessioni.

## Anteprima locale

Dopo aver estratto tutto lo ZIP, aprire **Apri-Sito.html** con un doppio clic. La copia in **anteprima** usa gli stessi stili, foto e interazioni, con collegamenti adatti all’apertura da disco.

Per provare la versione destinata al dominio, dalla cartella estratta eseguire:

```powershell
python -m http.server 8765 --bind 127.0.0.1 --directory dist
```

Aprire [http://127.0.0.1:8765/](http://127.0.0.1:8765/). La cartella **dist** contiene il sito completo e pronto per un hosting statico. Il server Python supporta le directory delle pagine, ma le regole _redirects e _headers sono interpretate dall’hosting.

## Modifiche

- **content.mjs** contiene riferimenti aziendali, schede dei lavori, servizi, descrizioni e sorgenti delle immagini.
- **layout.mjs** contiene la struttura comune e la generazione dei metadati.
- **build.mjs** genera le pagine HTML, il sitemap e le regole di migrazione.
- **dist/assets** contiene CSS, JavaScript, logo e immagini WebP.
- **image-manifest.json** indica le varianti disponibili e le dimensioni delle immagini.

Dopo aver cambiato testi, metadati o struttura, rigenerare con **node build.mjs**. Il comando usa il dominio aziendale per canonical, dati strutturati e sitemap. Per un’anteprima separata usare **node build.mjs --preview=https://esempio.test**: i metadati useranno quell’indirizzo e le pagine saranno marcate noindex. I file compilati sono inclusi nello ZIP, quindi per visionare o pubblicare l’export non serve Node.

Titoli e descrizioni dei servizi sono in **content.mjs**. Le pagine collegano i servizi ai lavori pertinenti, mentre la sitemap comprende le immagini dei progetti. I dati strutturati collegano l’impresa, il sito e la pagina corrente. CSS e JavaScript hanno un identificatore calcolato dal contenuto per aggiornare la cache quando cambiano.

## Passaggio al dominio aziendale

- Conservare i percorsi dei due servizi, degli immobili e dei contatti. L’hosting deve risolvere gli indirizzi sia con sia senza barra finale, reindirizzando alla versione canonica con barra.
- **/gallery** e **/catalogo** reindirizzano a **/lavori/**. Le regole per hosting compatibili sono in **dist/_redirects**. Su hosting diversi impostare gli equivalenti 301. Ci sono anche pagine di reindirizzamento HTML per anteprime statiche.
- Le foto e il marchio provengono dal sito aziendale e dalle sue gallerie. Prima della pubblicazione sul dominio aziendale confermare i diritti di riutilizzo, i crediti dei progettisti, i nomi e le descrizioni degli interventi. Le foto delle tavole di Castelfidardo sono presentate come materiale di progetto. La sezione permette di chiedere disponibilità senza indicare unità attive.
- Verificare REA e capitale con una visura prima di completare il footer. Aggiornare privacy e cookie con i dati del fornitore di hosting, i trattamenti effettivi e i tempi di conservazione concordati. La mappa Google Maps nei Contatti usa l’indirizzo fornito in content.mjs e si carica al clic su «Mostra mappa Google Maps». Il pulsante «Chiudi la mappa» rimuove il contenuto incorporato. Informativa privacy e pagina cookie descrivono questo comportamento. Il sito non include analitiche o caratteri web remoti.
- Il modulo apre una bozza con il client di posta del visitatore e non effettua invii automatici. Sono disponibili anche telefono e indirizzo email diretti. Per ricevere dal browser senza client di posta, il modulo va collegato a un servizio di invio concordato con l’impresa.
- Controllare le proprietà dei domini, incluso impresaedileancona.com, verificare i redirect effettivi e inviare il nuovo sitemap in Search Console dopo il passaggio.
