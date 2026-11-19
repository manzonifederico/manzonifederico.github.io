## Contesto

Flash Quiz è il progetto alla base della mia tesi triennale in *Interfacce e Tecnologie della Comunicazione* (Dipartimento di Psicologia e Scienze Cognitive, Università di Trento, anno accademico 2023/2024). Tutto è iniziato a fine ottobre 2022, quando Federica Gini (dottoranda all’Università di Trento e alla Fondazione Bruno Kessler) e Antonio Bucchiarone (ricercatore senior dell’unità MoDiS di FBK) mi hanno proposto di entrare in PolyGlot, un’app gamificata per imparare a programmare, come **UX/UI designer**.

- **Il mio ruolo:** unico UX/UI designer del progetto. Ho progettato e condotto la user research, definito il problema e progettato l’esperienza, le interfacce e la gamification. Ho fatto il punto con il resto del team in diversi incontri di revisione.
- **Formato:** un tirocinio di 375 ore iniziato a novembre 2022; in tutto il progetto è durato quasi un anno, fino alla tesi.
- **Metodo:** user-centered design, seguendo il double diamond.
- **Strumenti:** Figma con il Material Design 3 di Google, l’Octalysis tool e GamiDoc per la progettazione della gamification.

Dopo un primo colloquio abbiamo deciso che il mio compito sarebbe stato **riprogettare completamente l’app**. Da quella riprogettazione è nato Flash Quiz.

## Da PolyGlot a Flash Quiz

PolyGlot nasce come ambiente di programmazione gamificato, simile a un notebook, per imparare linguaggi di programmazione ad alto livello come C#. In seguito altri studenti l’avevano trasformato in un’app mobile per i corsi di informatica. La sua gamification era piuttosto semplice: i quiz a risposta multipla davano punti esperienza e punti bonus, i punti bonus servivano a comprare aiuti durante i quiz e i punteggi alimentavano una classifica, dei livelli e dei badge.

La user research che ho condotto nella prima fase del tirocinio ha cambiato il perimetro: **gli studenti volevano uno strumento che andasse oltre l’apprendimento dei linguaggi di programmazione**. Così ho iniziato a progettare una piattaforma gamificata a supporto della didattica di qualsiasi corso universitario, con due lati.

**Per gli studenti**, Flash Quiz doveva:

- motivarli e coinvolgerli nello studio individuale e in classe;
- migliorare l’apprendimento degli argomenti visti a lezione;
- favorire la cooperazione e disincentivare la competizione tra singoli;
- ridurre l’abbandono dei corsi aumentando l’engagement;
- aumentare la sicurezza in sé stessi e proteggerli da situazioni spiacevoli;
- aiutarli a capire il proprio livello tramite l’autovalutazione.

**Per i docenti** doveva essere uno strumento per monitorare l’apprendimento della classe, così da poter scegliere in modo informato come adattare la propria didattica.

Rispetto a PolyGlot, Flash Quiz doveva anche includere più elementi di gioco, alcuni più complessi, e **bilanciare con molta più attenzione motivazione intrinseca ed estrinseca**.

## Ricerca: dominio e competitor

**Stakeholder.** Ho aperto il primo diamante mappando le figure coinvolte:

- **Studenti** (utenti primari): possono allenarsi su argomenti specifici e capire come stanno andando, ma rischiano il disagio legato alla competizione e al giudizio di compagni e docenti.
- **Docenti e assistenti** (utenti primari): possono capire come stanno imparando gli studenti, dove fanno fatica e quando rimodulare la didattica, ma possono incontrare difficoltà di adozione e di utilizzo.
- **L’università** (utente terziario): decisiva per l’adozione; ottiene una didattica più efficace, ma sostiene i costi del sistema.

**Dominio.** Ho modellato il dominio dell’apprendimento universitario, concentrandomi sugli spazi di studio e sulle attività legate a lezioni, studio e ripasso.

**Benchmark.** Ho analizzato **22 soluzioni simili** (Learning Management System e software per creare lezioni, quiz ed esami); 13 avevano qualche elemento di gamification. Nessuna copriva l’idea per intero: si sovrapponevano solo su alcuni aspetti, come la creazione di quiz, gli analytics o la gestione delle classi. Le quattro più vicine erano:

| Prodotto | Punti di forza | Lacune rispetto ai nostri obiettivi |
|---|---|---|
| Kahoot | Coinvolgente, quiz facili da condividere | Analytics limitati ai singoli quiz e solo per i docenti; nessun concetto di classe |
| Outgrow | Analisi approfondite di come gli utenti interagiscono con i contenuti | Non pensato per la didattica; nessun feedback per gli utenti; costoso |
| Gimkit | Grande varietà di giochi, UI semplice, alcuni dati per gli studenti | Pensato per bambini; gamification forse troppo estrinseca; pochi feedback |
| Centrical | Gamification estesa, percorsi personalizzati, analytics basati sull’AI | Pensato per le aziende; feedback agli utenti limitati |

## Ricerca: questionari e interviste

**Perché partire dai questionari.** Per raggiungere più persone possibile, ho iniziato con due questionari online, uno per gli studenti e uno per i docenti universitari.

**Studenti: 163 risposte** da studenti italiani di diverse università, raccolte in un mese tramite contatto diretto, passaparola e forum universitari. Le 28 domande (12 a risposta multipla, 11 aperte, 5 item di tipo Likert) riguardavano abitudini di studio, strumenti, aspettative verso Flash Quiz e il rapporto con la competizione.

- Le **flashcard** sono molto usate per ripassare e memorizzare, e **il 40% dei rispondenti studia in gruppo**.
- App come Quizlet, Duolingo e Anki vengono usate solo occasionalmente; tra i motivi ci sono le “vite” che diminuiscono e il fatto di non voler creare contenuti da sé.
- Gli studenti chiedevano **un ambiente senza pressioni, spiegazioni quando sbagliano, interazione con i docenti (anche anonima) e tipologie di domande diverse**.
- **Creare contenuti divide:** il 40% vorrebbe creare e condividere contenuti, il 27% preferirebbe di no.
- Gli studenti vogliono **cooperare**, condividendo contenuti e lavorando insieme. La maggior parte trova utile un po’ di competizione, ma le opinioni sul competere per un punteggio erano contrastanti.

**Docenti: 71 risposte** da docenti universitari italiani, raccolte in circa due mesi. Le 20 domande (10 chiuse, 8 aperte, 2 item di tipo Likert) riguardavano metodi di insegnamento, strumenti usati in aula e aspettative verso Flash Quiz.

- La maggior parte preferisce insegnare con supporti audio e video, e molti sono aperti all’interazione con gli studenti durante le lezioni.
- Vorrebbero **dati dettagliati sulla preparazione e sulla comprensione degli studenti**, per argomento e nel tempo, e **feedback dagli studenti**.
- **La competizione tra studenti e la valutazione tramite Flash Quiz piacevano poco.**

**Interviste.** Per approfondire, ho proseguito con interviste semi-strutturate e un’analisi tematica.

- **Studenti (7 interviste, saturazione raggiunta).** La maggior parte aveva già provato l’apprendimento gamificato, soprattutto per le lingue. Gli esercizi diventavano presto noiosi e troppo semplici, e le funzioni social o competitive venivano spesso ignorate perché ritenute poco utili. Avevano delle riserve sulla competizione: può ferire l’autostima, per questo tendono a evitarla, preferiscono collaborare in gruppo e hanno suggerito che qualcuno supervisioni un’eventuale competizione.
- **Docenti (2 interviste, nessuna saturazione).** Tempi e disponibilità mi hanno permesso solo due interviste. Entrambi i docenti si sentono molto impegnati e a corto di tempo e apprezzano i feedback costruttivi, anche se solo uno li cerca attivamente (per esempio con quiz informali alla fine di un argomento). La gamification era poco conosciuta: entrambi ne vedevano l’utilità, ma solo uno si sentiva sicuro di poterla applicare alla sua materia, mentre l’altro temeva che potesse rendere le lezioni poco serie. Entrambi erano **favorevoli all’uso dell’AI per creare contenuti, a patto di poterne verificare il lavoro**.

## Definire il problema

Ho trasformato la ricerca in **pain point** e **personas** per entrambi i lati, con tre scenari per ogni persona (abituale, negativo e positivo) che ne descrivono azioni ed emozioni.

**Studenti: tre personas.**

- **Marco, lo studente modello:** indipendente, sempre attento a ottimizzare il tempo, vuole sapere esattamente a che punto è con lo studio.
- **Laura, la studentessa lavoratrice:** non riesce a seguire tutte le lezioni, studia con un gruppo di amici molto unito, adora le serate trivia e un po’ di competizione.
- **Camilla, la studentessa timida:** a disagio nell’interazione diretta e quando si sente giudicata; tiene alla privacy e preferisce la collaborazione alla competizione.

Alcuni pain point degli studenti: *“Ho bisogno di spiegazioni quando sbaglio”*, *“Ho paura che i miei compagni mi possano giudicare”*, *“Compararmi ai miei compagni mi fa sentire male”*, *“Non riesco a capire quando so un argomento o no”*.

**Docenti: due personas e dieci pain point.**

- **Giorgio, il docente attento:** tiene a lezioni coinvolgenti, ma spesso non capisce se il silenzio in aula significhi disinteresse o difficoltà di comprensione.
- **Martina, la docente impegnata:** un’astrofisica assorbita dalla ricerca, che ha poco tempo per preparare e condividere materiali o per parlare con gli studenti.

Alcuni pain point dei docenti: *“Non riesco a capire quali argomenti sono più ostici per gli studenti”*, *“Ho poco tempo per preparare domande da fare ai miei studenti in classe”*, *“Faccio fatica a capire quando rimodulare la mia didattica”*.

## Un cambio di programma

Quando ho presentato i risultati della fase Define, sono emersi alcuni vincoli di progetto e abbiamo dovuto **adattare il processo**: abbiamo unito le fasi Develop e Deliver, saltato i cicli di test e **siamo passati direttamente dai requisiti ai mockup ad alta fedeltà, senza wireframe**. È stato un vero compromesso: più velocità, ma nessuna validazione iniziale dei concept (ne parlo nel piano di testing e nelle riflessioni).

**Design system: Material Design 3.** Dover progettare subito i mockup significava scegliere prima un design system. Ho scelto il Material Design 3 di Google per entrambi i lati dell’app per tre motivi:

- **Praticità:** lo conoscevo già, ha una documentazione chiara, una libreria di componenti su Figma e risorse per gli sviluppatori.
- **Accessibilità:** è pensato per essere usabile da tutti, a prescindere dalle capacità o dal dispositivo.
- **Flessibilità:** si adatta a dispositivi diversi e si può personalizzare, cosa importante perché ho personalizzato a fondo molti componenti.

**Requisiti funzionali.** Prima dei mockup ho definito entità, attributi, funzioni e flussi validi per entrambi i lati: studenti, docenti, corsi, quiz, squadre e gruppi di studio.

## Il design per gli studenti

Il lato studenti funziona sia su **PC che su smartphone** e ha sei sezioni principali: corsi, quiz, analytics, gruppi, ricerca e profilo.

**Navigazione.** La navigazione parte dai **Corsi**, perché mi aspettavo che fosse la sezione più usata: porta ai quiz del corso e ai materiali del docente. Una navigation rail su PC e una navigation bar su smartphone danno accesso alle altre sezioni.

**Corsi.** Ogni corso a cui si è iscritti o che si è salvato è una card, con accanto una card più piccola dedicata agli analytics. Delle chip permettono di filtrare tra una panoramica degli analytics, le notifiche dei corsi e i corsi consigliati. Dentro un corso gli studenti trovano il docente, una descrizione e i materiali, più tre tab:

- **Quiz:** i *quiz in corso* contano per la classifica del corso e, quando scadono, passano tra i *quiz scaduti*; i *quiz liberi* non influenzano mai la competizione.
- **Squadra e classifica:** i dati e la posizione della propria squadra, oppure la possibilità di entrare in una squadra.
- **Analytics:** le proprie prestazioni nel corso, con la possibilità di aprire qualsiasi quiz e rivedere le risposte date, le soluzioni e le relative **spiegazioni**, che gli studenti avevano chiesto.

**Quiz e flashcard.** Studenti e docenti gestiscono i quiz allo stesso modo, con tre differenze:

- Quando un docente svolge un quiz, è solo una **simulazione** e non influenza nessun dato; quando lo svolge uno studente, i suoi analytics si aggiornano.
- Le **flashcard** (un termine, una domanda o un’immagine da un lato e la risposta dall’altro) sono un tipo di quiz per memorizzare, e il questionario aveva mostrato quanto gli studenti le usino già. Sono **solo per gli studenti**, perché si basano sul fatto che l’utente dichiari onestamente se ha risposto bene, cosa che non si adatta alle competizioni.
- Gli studenti aggiungono i quiz ai propri gruppi di studio; i docenti ai propri corsi.

**Creare un quiz.** Si può **importare** un quiz creato altrove, per poi approvarlo o eliminarlo, oppure **crearne** uno da zero: informazioni di base, regole come la durata, poi tutte le domande che si vogliono, anche con l’aiuto dell’AI.

**Gruppi di studio.** I gruppi permettono agli studenti di esercitarsi con amici e compagni in uno spazio separato da quello istituzionale, facendo tutti i quiz e le flashcard che vogliono. Tutti i membri hanno gli stessi poteri, e una classifica del gruppo alimenta una competizione amichevole e l’assegnazione dei booster (vedi Gamification).

**Ricerca e profilo.** Gli studenti possono cercare corsi, persone, quiz e istituti, poi aggiungere amici, salvare i quiz di altre persone o accedere ai corsi. Il profilo contiene contatti, nome utente, badge e trofei e le **impostazioni di visibilità** del profilo e dei propri quiz.

## Il design per i docenti

Per i docenti ho ripetuto gli stessi passaggi: pain point, personas e poi interfacce. Il lato docenti è pensato **solo per schermi grandi** (tablet e PC). La navigazione resta quasi invariata, ma i docenti non hanno i gruppi di studio e trovano funzioni diverse all’interno delle sezioni.

**Analytics.** I dati dettagliati sugli studenti erano la richiesta principale dei docenti nel questionario. I docenti hanno un unico posto con una panoramica di tutti i loro corsi e quiz, filtrabile per corso e per quiz: **partecipazione, gradimento, comprensione generale e per argomento, velocità nei quiz e nelle singole domande** e dati dettagliati sulle risposte (totali, corrette ed errate, medie e tempo medio di esecuzione). Gli studenti vedono lo stesso tipo di dati, tranne partecipazione e gradimento, e **solo su sé stessi, mai sugli altri studenti**.

**Gestione dei corsi.** I docenti possono filtrare tra i corsi di cui sono proprietari e quelli che co-gestiscono. A differenza degli studenti, possono creare e gestire completamente i corsi. Il flusso di creazione prevede:

1. informazioni di base (nome, descrizione, foto);
2. amministratori e relativi permessi;
3. regole di accesso e aggiunta degli studenti (link d’invito, importazione da una lista o invito via e-mail);
4. quiz, regole di gioco, materiali didattici e squadre.

La ricerca funziona come per gli studenti, con meno filtri e un solo punto d’accesso; nel profilo i docenti possono anche gestire la visibilità dei propri corsi.

## Gamification

La gamification si basa sulla teoria dell’autodeterminazione e sul framework Octalysis, e il suo obiettivo principale è bilanciare motivazione intrinseca ed estrinseca. Poggia su **tre meccaniche principali**:

- **Quiz:** insiemi di domande a tempo. Una domanda è corretta solo se si selezionano tutte le risposte giuste; se il tempo scade, conta come errata.
- **Punteggi:** quattro livelli di difficoltà (facile 5, normale 10, difficile 16, estremamente difficile 25). Le domande estremamente difficili sono facoltative e, se sbagliate, costano 15 punti. Sbagliare metà delle domande costa il 50% del punteggio massimo del quiz, sbagliarle tutte il 75%. I bonus premiano le serie (+5 ogni 5 risposte corrette di fila) e i quiz perfetti con domande estremamente difficili (+25%).
- **Classifiche:** nei **corsi competono le squadre, non i singoli**: la posizione di una squadra è la somma dei punti dei suoi membri. Anche i gruppi di studio e i singoli quiz hanno le loro classifiche.

**I booster tengono in equilibrio la competizione.**

- I **booster positivi** vanno a chi arriva ultimo in un quiz, oppure in modo casuale agli altri. Danno più tempo, più punti o un tentativo in più su una risposta nel quiz successivo.
- I **booster negativi** hanno il 15% di probabilità di colpire una parte della testa della classifica: meno tempo, più alternative sbagliate o punti dimezzati.

**Elementi di gioco, per core drive dell’Octalysis:**

- **Accomplishment:** badge, status point, barre di avanzamento (anche durante i quiz), liste di obiettivi e messaggi di festeggiamento.
- **Ownership:** una collezione di badge e avatar per utenti e squadre.
- **Empowerment e feedback:** feedback dinamici su velocità e correttezza nei quiz che non contano per la classifica, più i booster.
- **Social influence:** amicizie, quest di gruppo, una bacheca dei trofei e la possibilità di mandare apprezzamenti agli altri utenti.
- **Unpredictability:** premi casuali (i booster).
- **Scarcity:** i docenti pubblicano quiz con una cadenza regolare (appointment dynamic), i booster compaiono solo in certi contesti, ci sono conti alla rovescia, e i risultati dei quiz in classifica restano nascosti fino alla fine. Quest’ultimo elemento spinge gli studenti a finire e in parte impedisce di copiare.
- **Avoidance:** la paura di arrivare ultimi, bonus che si ottengono solo rispondendo correttamente a un certo numero di domande o a domande specifiche, e serie da mantenere svolgendo in tempo i quiz del docente.

Con l’Octalysis tool, Flash Quiz ha ottenuto un punteggio di **169**, che ho letto come un buon equilibrio tra motivazione intrinseca ed estrinseca e tra white hat e black hat. Ho documentato tutte le dinamiche di gioco in un documento di game design con **GamiDoc**, classificando gli elementi anche secondo la tassonomia di Toda e colleghi.

## Piano di testing

Nel progetto non c’è stato tempo per testare il design, così ho scritto un **piano di testing in tre fasi** per il passo successivo:

1. **Valutazione euristica con UX/UI designer.** È adatta alle risorse disponibili, dà molte informazioni in meno tempo rispetto ai test con gli utenti e porta il feedback esperto che mi era mancato lavorando come unico designer.
2. **Osservazione di utenti reali.** Dopo aver risolto i problemi emersi, le osservazioni servirebbero a calibrare la gamification, per esempio tarando i punteggi perché la competizione sia davvero bilanciata. Richiede più tempo, ma è il modo per verificare che il sistema raggiunga i suoi obiettivi.
3. **Questionari SUS e/o UEQ.** Una verifica finale e veloce dell’usabilità percepita (SUS) e della qualità pragmatica ed edonica dell’esperienza (UEQ).

## Riflessioni

**A che punto è arrivato.** Flash Quiz è diventato il design di due prodotti collegati, con la maggior parte del sistema e delle sue dinamiche già definita. Studenti e docenti condividono cinque sezioni simili (ricerca, profilo, quiz, corsi e analytics), ognuna adattata a ciò che serve a quell’utente.

**Cosa è stato difficile.** Flash Quiz era un progetto grande per un solo UX/UI designer che nel frattempo studiava. Ci sono stati diversi incontri con il team, ma l’assenza di altri designer ha reso più difficile ogni scelta, perché mi mancava il feedback di figure specializzate. Lavorare quasi del tutto da solo è stata la vera sfida.

**Limiti.**

- **Nessun test con gli utenti**, quindi non posso dire con certezza che gli obiettivi siano raggiunti.
- **La ricerca con i docenti è incompleta:** due interviste sono state utili, ma non bastano a raggiungere la saturazione.
- **Il Material Design 3 potrebbe non essere la scelta giusta a lungo termine.** I suoi vantaggi restano validi, ma un design system più orientato al gioco valorizzerebbe meglio gli elementi di gamification.

**Prossimi passi.** Mettere in pratica il piano di testing, completare la ricerca con i docenti, esplorare un design system orientato al gioco e aggiungere il suono: un sound designer potrebbe definire i feedback sonori in linea con il resto dell’esperienza.

**Cosa ho imparato.** Quanto sia prezioso un team di designer, e quanto contino i feedback e i punti di vista di altri designer. A non sottovalutare la dimensione di un progetto. Quanto possa essere difficile trovare partecipanti per la ricerca. E che anche un progetto che all’inizio sembra troppo grande si può portare a termine, se ci si lavora con costanza.

Se vuoi tutti i dettagli, li trovi nella mia [tesi](https://drive.google.com/file/d/1FEaaHt9ezt3WotnWDX57iLKIiOJUn3YF/view?usp=sharing). Sei curioso di qualcos’altro? Scrivimi su [LinkedIn](https://www.linkedin.com/in/federico-manzoni-936103217/) o [mandami una e-mail](#contact) :)
