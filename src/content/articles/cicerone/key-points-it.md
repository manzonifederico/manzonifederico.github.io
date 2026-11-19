## Panoramica del progetto

- **Cosa:** Cicerone, un sistema di navigazione indoor inclusivo e multimodale per edifici pubblici sconosciuti, a partire dai campus universitari.
- **Contesto:** corso di *Design for Social Inclusion*, laurea magistrale in Human-Computer Interaction, Università di Trento. 7 settimane, primavera 2025.
- **Team:** Federico Manzoni (io), Michele Cazzaro, Filippo D’Agnano, Ira Laihanen, Nataliya Zhigalina.
- **Il mio ruolo:** ho guidato il lavoro del gruppo; revisione della letteratura sulla navigazione indoor, personas e user journey (insieme al team), prototipo della mappa in Mappedin, gran parte della UI ad alta fedeltà (con Michele per la navigazione in AR e i totem). Mi sono anche fatto carico di una parte importante del lavoro complessivo.
- **Risultato:** valutato **30 e lode (31/30)**.

## Il problema

- L’esclusione sociale nasce spesso da *mismatch* tra le persone e ambienti progettati male.
- Arrivare a destinazione in un posto sconosciuto è uno degli esempi più chiari.
- Le persone con **disabilità visive e motorie** vivono il mismatch più forte.

## Dalla città all’edificio

- **Prima idea:** percorsi accessibili in città. Le app outdoor (AXS Map, Wheelmap.org, AccessNow) erano datate, con pochi dati o troppo dipendenti dal crowdsourcing.
- **Svolta:** i compagni di team internazionali continuavano a perdersi nell’edificio del nostro dipartimento, e la letteratura confermava quanto sia difficile orientarsi al chiuso per le persone con disabilità visive.
- **Nuovo obiettivo:** “Permettere alle persone di orientarsi in edifici sconosciuti con percorsi accessibili basati sulle loro reali esigenze.”

## Ricerca sulla navigazione indoor

- Ho rifatto gran parte della revisione della letteratura: un tema di nicchia, con poche soluzioni concrete (MapsPeople, Pointr).
- Sfide principali: dipendenza dagli altri, spazi complessi, scarsa adozione, rumore e ostacoli, costi alti e personalizzazione caso per caso.
- Messaggi chiave: universal design, priorità a persone cieche, ipovedenti e con disabilità motorie, navigazione **multimodale**.

## Definire Cicerone

- Inclusive design che elimina i mismatch e spinge anche a modificare gli spazi (codici colore, segnaletica, totem).
- Per tutti, con un focus sulle disabilità visive e motorie permanenti; utile anche per disabilità temporanee, visitatori e chi prova ansia nei luoghi nuovi.
- Si estende dalle università a ospedali, biblioteche, stazioni e centri commerciali.

## Personas e user journey

- **Jane**, studentessa di psicologia non vedente: guida audio e aptica, spesso in ritardo, ostacoli temporanei.
- **Mario**, dottorando che usa la sedia a rotelle: percorsi senza scale, ascensori, spazi sociali e aree fumatori.
- **Steven**, tecnico appena arrivato nel campus: guida a mani libere mentre trasporta attrezzature.
- Ogni persona ha una user journey completa, dall’ingresso nell’edificio al ricalcolo del percorso e al feedback.

## Il perimetro del prodotto

- **Minimum Viable Product:** mappa 3D, pianificazione del percorso e QR code di partenza dentro app esistenti. Il mio prototipo in Mappedin di un edificio ha richiesto circa un giorno.
- **“Maximum” Viable Product:** navigazione audio, aptica e visiva (2D/3D, AR), percorsi adattivi con ricalcolo in tempo reale, app, web, schermi e totem, segnalazioni in crowdsourcing con ricompense, personalizzazione rapida, posizionamento con AI e Wi-Fi.
- I livelli di adozione permettono a ogni istituzione di scegliere ciò che può permettersi.

## Studio di fattibilità (TELOS)

- **Tecnologica:** fattibile con strumenti esistenti (posizionamento Wi-Fi/QR, OpenCV, TensorFlow, API per l’AR). La geolocalizzazione con AI è la parte difficile, quindi abbiamo scelto un rilascio modulare.
- **Economica:** prima stima di circa 180.000 €, costruita ruolo per ruolo (13 figure); gratis per gli utenti, a pagare sono le istituzioni.
- **Legale:** GDPR (nessun dato biometrico), NIS2, limiti di sicurezza pubblica sui dati dei luoghi, condizioni sulla responsabilità.
- **Operativa:** circa 1.000 nuove persone all’anno secondo le nostre stime (nuovi studenti e visitatori occasionali), più le persone cieche che ne beneficiano a lungo termine.
- **Tempistiche:** circa 10–12 mesi di sviluppo; MVP operativo in circa un mese, versione completa in 2–3 mesi.
- **Culturale e di settore:** più autonomia e senso di appartenenza; un mercato in crescita stimata del 30–40% all’anno; nessuna soluzione concorrente ancora presente all’Università di Trento.

## Design sprint

- **Una settimana**, mockup ad alta fedeltà per app, totem, web app e QR code.
- **Scelta:** con poco tempo e da unico del team forte in Figma, ho basato le UI in gran parte sul design di Google Maps.
- Funzioni chiave: navigazione dall’orario delle lezioni, opzioni di percorso con tempi e scale, informazioni sugli orari di punta, riconoscimento degli ostacoli in AR, una modalità per persone ipovedenti, segnalazione di ostacoli e luoghi sociali.

### App mobile

- Navigazione dall’orario delle lezioni.
- Anteprima e personalizzazione del percorso (aggiunta di tappe, cambio rapido del tipo di percorso).
- Navigazione con avvisi sugli ostacoli, ricalcolo del percorso e richiesta di aiuto.
- Navigazione in AR con riconoscimento degli ostacoli e ricalcolo del percorso.
- Impostazioni del profilo.
- Aggiunta di luoghi sociali e segnalazione di problemi.

<div class="gallery gallery--phones">

![Navigazione AR di Cicerone: vista dalla fotocamera che avvisa di un ostacolo segnalato da un altro utente, sopra la mappa indoor](../../../assets/projects/cicerone-ar-obstacle.png)
![Navigazione passo passo di Cicerone sulla mappa indoor, con un percorso verso la caffetteria e un avviso di ostacolo](../../../assets/projects/cicerone-navigation.png)
![Schermata di Cicerone per aggiungere una tappa, con filtri rapidi e le aule più visitate, ognuna con il tempo di percorrenza in più](../../../assets/projects/cicerone-add-stop.png)

</div>

### Totem

- Visualizzazione e filtro della mappa.
- Navigazione verso gli eventi del giorno.
- Anteprima del percorso.
- Indicazioni passo passo.

<div class="gallery">

![Totem di Cicerone: mappa dell’edificio con filtri e lezioni del giorno, ognuna con un pulsante Naviga](../../../assets/articles/cicerone/kiosk-navigation.png)
![Totem di Cicerone: anteprima del percorso verso un’aula con tempo di percorrenza, zero scale e un ascensore](../../../assets/articles/cicerone/kiosk-map.png)

</div>

### Web app

- Navigazione dall’orario delle lezioni e da altre funzioni della web app per gli studenti di UniTrento.

<div class="gallery gallery--wide">

![Scheda Cicerone Navigator aggiunta alla home della web app per gli studenti di UniTrento](../../../assets/articles/cicerone/webapp-1.png)
![Calendario di occupazione delle aule di UniTrento, da cui ogni lezione può avviare una navigazione con Cicerone](../../../assets/articles/cicerone/webapp-2.png)
![Pop-up con i dettagli di un evento nella web app, con un pulsante Naviga accanto all’aula](../../../assets/articles/cicerone/webapp-3.png)

</div>

## Piano finanziario

- Prima fase sostenuta dall’Università di Trento; ONG (ad esempio Unione Italiana Ciechi, European Disability Forum) e altre sedi per crescere.
- Modello di business: installare e mantenere Cicerone per le istituzioni; app gratuita per gli utenti.
- Budget rivisto: circa 95.600 € + 20% di margine, presentato come **120.000 €** (contro i 180.000 € iniziali).
- Se i fondi non bastano: prima si rinuncia alla geolocalizzazione con AI, poi a parte del personale e alla cura della UI; l’università potrebbe fornire i partecipanti ai test.

## Risultati

- Presentazione finale l’8 maggio 2025: circa 120.000 € e 12–15 mesi dal finanziamento all’implementazione.
- Accolto molto bene e valutato **30 e lode (31/30)**.

## Riflessioni e prossimi passi

- Le parti difficili: poco tempo, contributi disomogenei nel team, documentazione non rifinita.
- Con più tempo avrei svolto i test di usabilità che avevamo proposto e rifinito la UI.
- Cosa mi porto a casa: inclusive design, lavoro di squadra sotto pressione e pensiero a livello di sistema.
