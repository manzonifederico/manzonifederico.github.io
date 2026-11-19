## Contesto

- Progetto della tesi triennale (Università di Trento, anno accademico 2023/2024) e tirocinio di 375 ore, con Federica Gini e Antonio Bucchiarone (FBK).
- **Il mio ruolo:** unico UX/UI designer. Ho progettato e condotto la user research e progettato l’esperienza, le interfacce e la gamification, con incontri di revisione con il team.
- **Compito:** riprogettare completamente PolyGlot, un’app gamificata per imparare a programmare. Dalla riprogettazione è nato Flash Quiz.
- **Metodo e strumenti:** user-centered design e double diamond; Figma con Material Design 3; Octalysis e GamiDoc.

## Da PolyGlot a Flash Quiz

- La ricerca ha mostrato che gli studenti volevano uno strumento **oltre la programmazione**: Flash Quiz è diventato una piattaforma gamificata per qualsiasi corso universitario.
- **Obiettivi per gli studenti:** motivazione e coinvolgimento, apprendimento migliore, **cooperazione invece di competizione tra singoli**, meno abbandoni, sicurezza in sé, un ambiente protetto, autovalutazione.
- **Obiettivo per i docenti:** monitorare l’apprendimento della classe, per adattare la didattica con scelte informate.
- Rispetto a PolyGlot: elementi di gioco più ricchi e un attento **equilibrio tra motivazione intrinseca ed estrinseca**.

## Ricerca: dominio e competitor

- **Stakeholder:** studenti e docenti (utenti primari), l’università (utente terziario, decide l’adozione).
- **Modello del dominio:** spazi di studio universitari e attività legate a lezioni, studio e ripasso.
- **Benchmark:** 22 soluzioni, 13 gamificate; nessuna copriva l’idea per intero. Le più vicine: Kahoot, Outgrow, Gimkit, Centrical.
- **Lacune trovate:** analytics limitati o solo per i docenti, nessun concetto di classe, pochi feedback per chi impara, prodotti pensati per bambini o aziende.

## Ricerca: questionari e interviste

- **Questionario studenti, 163 risposte:**
  - flashcard molto usate; il 40% studia in gruppo;
  - chiedono niente pressioni, spiegazioni degli errori, contatto con i docenti (anche anonimo), tipologie di domande diverse;
  - creare contenuti divide (40% sì, 27% no); cooperazione ben accetta, opinioni contrastanti sul competere per un punteggio.
- **Questionario docenti, 71 risposte:** vogliono dati dettagliati sulla comprensione (per argomento e nel tempo) e feedback dagli studenti; competizione e valutazione tramite l’app sono poco popolari.
- **Interviste studenti, 7 (saturazione raggiunta):** le app gamificate diventano noiose e troppo facili; la competizione può ferire l’autostima; preferiscono collaborare e una competizione supervisionata.
- **Interviste docenti, 2 (nessuna saturazione):** poco tempo; gamification poco conosciuta; aperti a contenuti generati dall’AI se possono verificarli.

## Definire il problema

- **Personas studenti:** Marco (studente modello), Laura (studentessa lavoratrice), Camilla (studentessa timida), ognuno con scenario abituale, negativo e positivo.
- **Personas docenti:** Giorgio (docente attento), Martina (ricercatrice molto impegnata); dieci pain point dei docenti.
- **Pain point chiave:** paura del giudizio, bisogno di spiegazioni, non sapere a che punto si è; per i docenti, non sapere quali argomenti sono ostici e avere poco tempo.

## Un cambio di programma

- Vincoli di progetto → fasi Develop e Deliver unite, **niente test e niente wireframe**, direttamente ai mockup ad alta fedeltà. Più veloce, ma senza validazione iniziale.
- **Material Design 3**, scelto per praticità (già conosciuto, ben documentato, libreria Figma, risorse per sviluppatori), accessibilità e flessibilità (molti componenti personalizzati a fondo).
- Prima i requisiti funzionali: studenti, docenti, corsi, quiz, squadre, gruppi.

## Il design per gli studenti

- **PC e smartphone**; sei sezioni: corsi, quiz, analytics, gruppi, ricerca, profilo.
- **I corsi vengono prima** nella navigazione, come sezione che mi aspettavo più usata; navigation rail su PC, navigation bar su smartphone.
- **Pagina del corso:** quiz in corso (contano per la classifica), quiz scaduti, quiz liberi (non contano mai), squadra e classifica, analytics personali con **risposte, soluzioni e spiegazioni**.
- **Flashcard** per memorizzare, **solo per gli studenti**: le risposte autodichiarate non si adattano alla competizione.
- **Creazione dei quiz:** importare (poi approvare o eliminare) o creare da zero, anche con l’aiuto dell’AI.
- **Gruppi di studio:** esercitarsi con gli amici, in uno spazio separato da quello istituzionale, con gli stessi poteri per tutti.
- **Profilo:** badge, trofei e impostazioni di visibilità per profilo e quiz.

## Il design per i docenti

- **Solo schermi grandi** (tablet e PC); niente gruppi di studio.
- **Analytics:** partecipazione, gradimento, comprensione generale e per argomento, velocità e dati dettagliati sulle risposte, filtrabili per corso e per quiz.
- **Gli studenti vedono solo i propri dati**, mai quelli degli altri.
- **Flusso di creazione del corso:** informazioni → amministratori e permessi → accesso e studenti → quiz, regole di gioco, materiali e squadre.

## Gamification

- **Meccaniche principali:** quiz a tempo; punti per difficoltà (5/10/16/25) con penalità e bonus per le serie; classifiche.
- **Nei corsi competono le squadre, non i singoli.**
- **I booster bilanciano la competizione:** quelli positivi a chi è ultimo (o casuali), quelli negativi con il 15% di probabilità per chi è in testa.
- **Elementi in tutti gli 8 core drive dell’Octalysis:** badge, barre di avanzamento, avatar, feedback dinamici, amicizie, quest di gruppo, bacheca dei trofei, conti alla rovescia, serie e altro.
- I risultati dei quiz in classifica restano nascosti fino alla fine: spingono a finire e in parte impediscono di copiare.
- **Punteggio Octalysis: 169**, un buon equilibrio tra white hat e black hat. Tutte le dinamiche documentate con GamiDoc.

## Piano di testing

- Nessun test durante il progetto, per mancanza di tempo.
- **Previsti:** (1) valutazione euristica con UX/UI designer (veloce, e porta il feedback esperto che mi mancava); (2) osservazioni con utenti reali per calibrare i punteggi; (3) SUS e/o UEQ.

## Riflessioni

- La maggior parte del sistema e delle sue dinamiche è progettata; studenti e docenti condividono cinque sezioni adattate.
- **La parte più difficile:** essere l’unico designer, con pochi feedback specialistici; ho lavorato quasi del tutto da solo.
- **Limiti:** nessun test con gli utenti, ricerca con i docenti incompleta, Material Design 3 poco adatto a un prodotto così vicino al gioco.
- **Prossimi passi:** fare i test, più interviste con i docenti, un design system orientato al gioco, sound design.
- **Lezioni:** il valore di un team di design e del confronto con altri designer, non sottovalutare la dimensione di un progetto, quanto può essere difficile reclutare partecipanti.
