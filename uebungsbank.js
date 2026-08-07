/* ══════════════════════════════════════════════════════════════════
   DIE ÜBUNGSBANK

   Die Übungen, aus denen ein Trainingsplan gebaut werden darf.
   Bewusst als eigene Datei: so laesst sie sich pflegen, ohne die
   grosse App-Datei anzufassen — und spaeter gegen eine Fassung aus
   dem Netz tauschen, ohne dass die App neu ausgeliefert werden muss.

   Die App legt diese Bank ueber ihre eingebauten Uebungen. Was hier
   unter derselben Kennung steht, gewinnt.

   AUFBAU EINER ÜBUNG
     id          Kennung — genau diese schreibt die KI in den Plan
     name        Anzeigename
     sets        Vorgabe, wird vom Plan des Nutzers ueberschrieben
     repsLabel   Wiederholungen als Text ("8–12", "30 s")
     restSec     Pause in Sekunden
     type        'reps' | 'time' | 'activity'
     prTrack     ob Bestwerte mitgeschrieben werden
     primary     Hauptmuskeln (Kennungen aus MUSCLES)
     secondary   Mitarbeitende Muskeln
     description Was die Uebung ist und wozu sie dient
     tips        Drei Hinweise zur Ausfuehrung
     easier      { name, desc } — die Stufe darunter
     harder      { name, desc } — die Stufe darueber

   MUSKEL-KENNUNGEN
     brust · trizeps · bizeps · lat · schultern · bauch ·
     oberschenkel · gesaess · oberer_ruecken · unterer_ruecken ·
     waden · huefte · unterarme · trapez · rotatoren · saege ·
     adduktoren
   ══════════════════════════════════════════════════════════════════ */

window.FLOW_BANK = {

  /* ════════════ DRUCK — BRUST, SCHULTERN, TRIZEPS ════════════ */

  'knie-liegestuetze': {
    id: 'knie-liegestuetze', name: 'Liegestütze auf den Knien',
    sets: 3, repsLabel: '8–12', restSec: 60, type: 'reps', prTrack: false,
    primary: ['brust', 'trizeps'], secondary: ['schultern', 'bauch'],
    description: 'Der Einstieg ins Drucktraining. Die Knie tragen einen Teil des Gewichts, die Bewegung bleibt dieselbe — nur leichter.',
    tips: ['Von den Knien bis zum Kopf eine gerade Linie, die Hüfte darf nicht durchhängen.',
           'Die Hände unter den Schultern, Ellbogen nach schräg hinten statt seitlich raus.',
           'Erst wenn zwölf saubere Wiederholungen sitzen, auf die Zehen wechseln.'],
    easier: { name: 'Liegestütze an der Wand', desc: 'Im Stand gegen die Wand drücken. Je aufrechter, desto leichter.' },
    harder: { name: 'Liegestütze', desc: 'Auf den Zehen. Das volle Körpergewicht auf Händen und Füßen.' }
  },

  'erhoehte-liegestuetze': {
    id: 'erhoehte-liegestuetze', name: 'Erhöhte Liegestütze',
    sets: 3, repsLabel: '10–15', restSec: 60, type: 'reps', prTrack: false,
    primary: ['brust', 'trizeps'], secondary: ['schultern', 'bauch'],
    description: 'Die Hände auf einer Bank oder Stufe. Je höher die Auflage, desto weniger Last — die sauberste Brücke zwischen Knien und Boden.',
    tips: ['Der Körper bleibt eine Linie, auch wenn es leichter ist.',
           'Die Höhe schrittweise senken: Tisch, Stuhl, Stufe, Boden.',
           'Unten kurz die Spannung halten, nicht abfedern.'],
    easier: { name: 'Liegestütze an der Wand', desc: 'Fast senkrecht drücken, kaum Last auf den Armen.' },
    harder: { name: 'Liegestütze', desc: 'Flach am Boden, volles Gewicht.' }
  },

  'deficit-liegestuetze': {
    id: 'deficit-liegestuetze', name: 'Liegestütze mit Tiefgang',
    sets: 4, repsLabel: '6–10', restSec: 90, type: 'reps', prTrack: true,
    primary: ['brust', 'trizeps'], secondary: ['schultern', 'saege'],
    description: 'Die Hände auf zwei Erhöhungen, die Brust sinkt tiefer als die Hände. Mehr Bewegungsumfang, mehr Dehnung unter Last.',
    tips: ['Nur so tief, wie die Schultern es schmerzfrei zulassen.',
           'Unten eine Sekunde halten — dort passiert die Arbeit.',
           'Die Schulterblätter bleiben zusammengezogen, nicht nach vorne kippen.'],
    easier: { name: 'Liegestütze', desc: 'Flach am Boden, ohne zusätzlichen Tiefgang.' },
    harder: { name: 'Tiefgang mit Zusatzgewicht', desc: 'Weste oder Rucksack zum vergrößerten Bewegungsumfang.' }
  },

  'archer-liegestuetze': {
    id: 'archer-liegestuetze', name: 'Archer Push-ups',
    sets: 4, repsLabel: '4–8 je Seite', restSec: 120, type: 'reps', prTrack: true,
    primary: ['brust', 'trizeps'], secondary: ['schultern', 'bauch'],
    description: 'Ein Arm beugt, der andere streckt sich zur Seite. Die Last wandert fast vollständig auf eine Seite — die Vorstufe zum einarmigen Liegestütz.',
    tips: ['Der gestreckte Arm bleibt gestreckt, er stützt nur.',
           'Die Hüfte bleibt gerade, sie darf nicht zur arbeitenden Seite kippen.',
           'Beide Seiten gleich oft, auch wenn eine schwächer ist.'],
    easier: { name: 'Breite Liegestütze', desc: 'Beide Arme arbeiten, die Hände weit außen.' },
    harder: { name: 'Einarmige Liegestütze', desc: 'Der freie Arm hinter dem Rücken, das volle Gewicht auf einem Arm.' }
  },

  'einarm-liegestuetz': {
    id: 'einarm-liegestuetz', name: 'Einarmiger Liegestütz',
    sets: 5, repsLabel: '2–5 je Seite', restSec: 180, type: 'reps', prTrack: true,
    primary: ['brust', 'trizeps'], secondary: ['bauch', 'schultern', 'saege'],
    description: 'Der Maßstab für Druckkraft im Calisthenics. Ein Arm trägt alles, der Rumpf verhindert das Verdrehen.',
    tips: ['Die Füße weiter auseinander geben Stabilität — später enger stellen.',
           'Die freie Hand hinter dem Rücken, nicht zum Ausbalancieren nutzen.',
           'Die Schulter bleibt über der Hand, der Körper dreht sich nicht auf.'],
    easier: { name: 'Archer Push-ups', desc: 'Der zweite Arm hilft noch mit, gestreckt zur Seite.' },
    harder: { name: 'Einarmig erhöht auf Zeit', desc: 'Langsamer Ablauf über fünf Sekunden pro Wiederholung.' }
  },

  'breite-liegestuetze': {
    id: 'breite-liegestuetze', name: 'Breite Liegestütze',
    sets: 3, repsLabel: '10–15', restSec: 75, type: 'reps', prTrack: false,
    primary: ['brust'], secondary: ['schultern', 'trizeps'],
    description: 'Die Hände deutlich außerhalb der Schultern. Der Trizeps tritt zurück, die Brust übernimmt.',
    tips: ['Nicht übertrieben breit — anderthalb Schulterbreiten reichen.',
           'Die Ellbogen zeigen nach außen, das ist hier gewollt.',
           'Bei Schulterschmerzen sofort enger greifen.'],
    easier: { name: 'Erhöhte breite Liegestütze', desc: 'Hände auf einer Bank, gleiche Handstellung.' },
    harder: { name: 'Breite Liegestütze mit Gewicht', desc: 'Weste oder Rucksack dazu.' }
  },

  'hindu-liegestuetze': {
    id: 'hindu-liegestuetze', name: 'Hindu Push-ups',
    sets: 3, repsLabel: '8–12', restSec: 75, type: 'reps', prTrack: false,
    primary: ['schultern', 'brust'], secondary: ['trizeps', 'unterer_ruecken'],
    description: 'Eine fließende Bewegung vom Hundeblick nach unten in die Kobra. Kraft und Beweglichkeit für die Schulter in einem.',
    tips: ['Der Kopf taucht zwischen den Armen durch, nicht darüber hinweg.',
           'Die Bewegung ist rund und ohne Stopp, das ist der Sinn.',
           'Am Ende die Hüfte sinken lassen, die Brust öffnet sich.'],
    easier: { name: 'Hundeblick nach unten', desc: 'Nur die Position halten, ohne Durchtauchen.' },
    harder: { name: 'Dive Bomber', desc: 'Auf dem gleichen Weg auch wieder zurück.' }
  },

  'pseudo-planche-pushups': {
    id: 'pseudo-planche-pushups', name: 'Pseudo-Planche Push-ups',
    sets: 4, repsLabel: '5–10', restSec: 120, type: 'reps', prTrack: true,
    primary: ['schultern', 'brust'], secondary: ['trizeps', 'bauch', 'saege'],
    description: 'Die Hände liegen auf Hüfthöhe, die Schultern schieben weit über die Hände hinaus. Die direkteste Vorbereitung auf die Planche.',
    tips: ['Je weiter die Schultern vor den Händen, desto schwerer.',
           'Die Handgelenke gut aufwärmen, hier liegt viel Last.',
           'Der Körper bleibt bretthart — kein Durchhängen der Hüfte.'],
    easier: { name: 'Planche Lean', desc: 'Nur die Position halten, ohne zu beugen.' },
    harder: { name: 'Tuck Planche Push-ups', desc: 'Aus der angehockten Planche drücken, Füße frei.' }
  },

  'dips-barren': {
    id: 'dips-barren', name: 'Dips am Barren',
    sets: 4, repsLabel: '6–12', restSec: 120, type: 'reps', prTrack: true,
    primary: ['brust', 'trizeps'], secondary: ['schultern'],
    description: 'Die schwerste Grundübung für den Druck nach unten. Zwischen zwei Holmen absenken und wieder hochdrücken.',
    tips: ['Leicht vorgelehnt trifft es die Brust, aufrecht den Trizeps.',
           'Nur so tief, wie die Schulter schmerzfrei mitgeht — meist Oberarm waagerecht.',
           'Die Schultern bleiben unten, nicht zu den Ohren ziehen.'],
    easier: { name: 'Bank-Dips', desc: 'Die Füße am Boden, das Gesäß vor einer Bank.' },
    harder: { name: 'Gewichtete Dips', desc: 'Mit Gürtel oder Weste zusätzliches Gewicht.' }
  },

  'bank-dips': {
    id: 'bank-dips', name: 'Bank-Dips',
    sets: 3, repsLabel: '10–15', restSec: 60, type: 'reps', prTrack: false,
    primary: ['trizeps'], secondary: ['brust', 'schultern'],
    description: 'Die Hände hinter dem Körper auf einer Bank, die Füße vorne am Boden. Der Einstieg in die Dip-Bewegung.',
    tips: ['Der Rücken bleibt nah an der Bank, nicht nach vorne wegrutschen.',
           'Die Füße weiter weg machen es schwerer, näher heran leichter.',
           'Die Schultern nicht hochziehen — das reizt das Gelenk.'],
    easier: { name: 'Bank-Dips mit angewinkelten Beinen', desc: 'Die Füße nah am Körper, weniger Last.' },
    harder: { name: 'Dips am Barren', desc: 'Frei hängend, volles Körpergewicht.' }
  },

  'gew-dips': {
    id: 'gew-dips', name: 'Gewichtete Dips',
    sets: 5, repsLabel: '3–6', restSec: 180, type: 'reps', prTrack: true,
    primary: ['brust', 'trizeps'], secondary: ['schultern'],
    description: 'Dips mit Zusatzgewicht am Gürtel. Hier wird reine Maximalkraft für den Oberkörper gebaut.',
    tips: ['Erst wenn zwölf saubere Dips ohne Gewicht sitzen.',
           'Das Gewicht in kleinen Schritten steigern, die Sehnen brauchen länger als die Muskeln.',
           'Wird der letzte Satz unsauber: Gewicht runter statt Wiederholungen schenken.'],
    easier: { name: 'Dips am Barren', desc: 'Ohne Zusatzgewicht, dafür mehr Wiederholungen.' },
    harder: { name: 'Ring-Dips mit Gewicht', desc: 'An Ringen, die zusätzlich stabilisiert werden müssen.' }
  },

  'ring-dips': {
    id: 'ring-dips', name: 'Ring-Dips',
    sets: 4, repsLabel: '4–8', restSec: 150, type: 'reps', prTrack: true,
    primary: ['brust', 'trizeps'], secondary: ['schultern', 'rotatoren', 'bauch'],
    description: 'Dips an Ringen. Die Ringe wackeln, jeder stabilisierende Muskel arbeitet mit — deutlich schwerer als am festen Barren.',
    tips: ['Oben die Ringe nach außen drehen, das schließt die Bewegung ab.',
           'Die Ringe eng am Körper führen, nicht ausbrechen lassen.',
           'Erst am Barren sicher sein, dann an die Ringe.'],
    easier: { name: 'Dips am Barren', desc: 'Fester Untergrund, keine Stabilisierungsarbeit.' },
    harder: { name: 'Ring-Dips mit Gewicht', desc: 'Zusatzgewicht am Gürtel.' }
  },

  'handstand-pushup-wand': {
    id: 'handstand-pushup-wand', name: 'Handstand-Liegestütz an der Wand',
    sets: 4, repsLabel: '3–8', restSec: 180, type: 'reps', prTrack: true,
    primary: ['schultern', 'trizeps'], secondary: ['bauch', 'trapez'],
    description: 'Kopfüber an der Wand drücken. Die stärkste Schulterübung im Calisthenics ohne Geräte.',
    tips: ['Der Kopf berührt sanft den Boden, er wird nicht aufgesetzt.',
           'Die Ellbogen zeigen nach vorne, nicht seitlich weg.',
           'Ein Kissen unter dem Kopf nimmt die Angst und ändert nichts an der Arbeit.'],
    easier: { name: 'Pike Push-ups erhöht', desc: 'Die Füße auf einer Bank, Oberkörper senkrecht.' },
    harder: { name: 'Freier Handstand-Liegestütz', desc: 'Ohne Wand, mit voller Balancearbeit.' }
  },

  'erhoehte-pike-pushups': {
    id: 'erhoehte-pike-pushups', name: 'Erhöhte Pike Push-ups',
    sets: 4, repsLabel: '6–10', restSec: 90, type: 'reps', prTrack: false,
    primary: ['schultern'], secondary: ['trizeps', 'trapez'],
    description: 'Pike Push-ups mit den Füßen auf einer Erhöhung. Je höher, desto senkrechter — und desto näher am Handstand-Liegestütz.',
    tips: ['Die Hüfte bleibt hoch, der Körper ein spitzes Dach.',
           'Der Kopf senkt sich vor die Hände, nicht dazwischen.',
           'Die Höhe langsam steigern, das ist die Progression.'],
    easier: { name: 'Pike Push-ups', desc: 'Die Füße am Boden, flacherer Winkel.' },
    harder: { name: 'Handstand-Liegestütz an der Wand', desc: 'Vollständig senkrecht.' }
  },

  'trizeps-extension': {
    id: 'trizeps-extension', name: 'Trizeps-Strecken am Boden',
    sets: 3, repsLabel: '8–12', restSec: 90, type: 'reps', prTrack: false,
    primary: ['trizeps'], secondary: ['schultern', 'bauch'],
    description: 'Aus dem Liegestütz die Unterarme ablegen und allein mit dem Trizeps zurückdrücken. Isoliert und hart.',
    tips: ['Die Oberarme bleiben stehen, nur die Unterarme bewegen sich.',
           'Der Körper bleibt eine Linie, die Hüfte kippt nicht.',
           'An der Wand oder erhöht beginnen, am Boden ist es sehr schwer.'],
    easier: { name: 'Trizeps-Strecken an der Wand', desc: 'Stehend gegen die Wand, wenig Last.' },
    harder: { name: 'Trizeps-Strecken an Ringen', desc: 'Mit voller Stabilisierungsarbeit.' }
  },

  /* ════════════ ZUG — RÜCKEN, BIZEPS, GRIFF ════════════ */

  'australian-pullups': {
    id: 'australian-pullups', name: 'Australian Pull-ups',
    sets: 3, repsLabel: '8–15', restSec: 75, type: 'reps', prTrack: false,
    primary: ['oberer_ruecken', 'lat'], secondary: ['bizeps', 'unterarme'],
    description: 'Waagerechtes Ziehen an einer tiefen Stange, die Füße am Boden. Der beste Einstieg ins Zugtraining.',
    tips: ['Je waagerechter der Körper, desto schwerer.',
           'Die Brust berührt die Stange, nicht nur das Kinn.',
           'Die Schulterblätter zuerst zusammenziehen, dann die Arme beugen.'],
    easier: { name: 'Australian Pull-ups schräg', desc: 'Die Stange höher, der Körper steiler.' },
    harder: { name: 'Australian Pull-ups mit erhöhten Füßen', desc: 'Die Füße auf einer Bank, über der Waagerechten.' }
  },

  'breite-klimmzuege': {
    id: 'breite-klimmzuege', name: 'Breite Klimmzüge',
    sets: 4, repsLabel: '5–10', restSec: 150, type: 'reps', prTrack: true,
    primary: ['lat', 'oberer_ruecken'], secondary: ['bizeps', 'unterarme'],
    description: 'Klimmzüge mit weitem Griff. Der Bizeps tritt zurück, der Latissimus übernimmt die Hauptarbeit.',
    tips: ['Nicht extrem breit greifen — eineinhalb Schulterbreiten genügen.',
           'Die Brust zur Stange führen, nicht nur das Kinn drüber.',
           'Unten vollständig ausstrecken, ohne in die Schulter zu fallen.'],
    easier: { name: 'Klimmzüge', desc: 'Schulterbreiter Griff, der Bizeps hilft mehr mit.' },
    harder: { name: 'Gewichtete breite Klimmzüge', desc: 'Zusatzgewicht am Gürtel.' }
  },

  'chinups': {
    id: 'chinups', name: 'Chin-ups (Untergriff)',
    sets: 4, repsLabel: '6–12', restSec: 120, type: 'reps', prTrack: true,
    primary: ['bizeps', 'lat'], secondary: ['oberer_ruecken', 'unterarme'],
    description: 'Klimmzüge im Untergriff. Der Bizeps arbeitet deutlich stärker mit — meist schafft man mehr als im Obergriff.',
    tips: ['Die Ellbogen nach unten ziehen, nicht nach hinten.',
           'Oben kurz halten, unten vollständig strecken.',
           'Bei Ellbogenschmerzen den Griff etwas breiter nehmen.'],
    easier: { name: 'Negative Chin-ups', desc: 'Nur langsam ablassen, hochspringen.' },
    harder: { name: 'Gewichtete Chin-ups', desc: 'Mit Zusatzgewicht.' }
  },

  'gew-klimmzuege': {
    id: 'gew-klimmzuege', name: 'Gewichtete Klimmzüge',
    sets: 5, repsLabel: '3–5', restSec: 180, type: 'reps', prTrack: true,
    primary: ['lat', 'oberer_ruecken'], secondary: ['bizeps', 'unterarme'],
    description: 'Klimmzüge mit Zusatzgewicht. Der direkteste Weg zu mehr Maximalkraft im Zug.',
    tips: ['Erst wenn zwölf saubere Klimmzüge ohne Gewicht stehen.',
           'Kleine Sprünge beim Gewicht, zweieinhalb Kilo sind schon viel.',
           'Der volle Bewegungsumfang bleibt Pflicht, auch mit Gewicht.'],
    easier: { name: 'Klimmzüge', desc: 'Ohne Zusatzgewicht, dafür mehr Wiederholungen.' },
    harder: { name: 'Einarmige Klimmzug-Progression', desc: 'Ein Arm zieht, der andere hält am Handgelenk.' }
  },

  'archer-klimmzuege': {
    id: 'archer-klimmzuege', name: 'Archer Pull-ups',
    sets: 4, repsLabel: '3–6 je Seite', restSec: 150, type: 'reps', prTrack: true,
    primary: ['lat', 'oberer_ruecken'], secondary: ['bizeps', 'unterarme'],
    description: 'Zu einer Seite hochziehen, der andere Arm bleibt gestreckt. Die Vorstufe zum einarmigen Klimmzug.',
    tips: ['Der gestreckte Arm bleibt gestreckt, er zieht nicht heimlich mit.',
           'Weit greifen, sonst ist kein Platz für die Bewegung.',
           'Beide Seiten gleich oft, die schwächere zuerst.'],
    easier: { name: 'Breite Klimmzüge', desc: 'Beide Arme ziehen gleichmäßig.' },
    harder: { name: 'Einarmige Klimmzug-Progression', desc: 'Nur noch ein Arm an der Stange.' }
  },

  'einarm-klimmzug-prog': {
    id: 'einarm-klimmzug-prog', name: 'Einarmige Klimmzug-Progression',
    sets: 5, repsLabel: '1–3 je Seite', restSec: 240, type: 'reps', prTrack: true,
    primary: ['lat', 'bizeps'], secondary: ['oberer_ruecken', 'unterarme', 'bauch'],
    description: 'Ein Arm an der Stange, die freie Hand greift das eigene Handgelenk oder ein Band. Die Königsdisziplin des Zugtrainings.',
    tips: ['Je tiefer die helfende Hand greift, desto schwerer.',
           'Der Körper dreht sich weg — der Rumpf hält dagegen.',
           'Sehr lange Pausen, das ist reine Kraftarbeit.'],
    easier: { name: 'Archer Pull-ups', desc: 'Beide Hände an der Stange, eine gestreckt.' },
    harder: { name: 'Freier einarmiger Klimmzug', desc: 'Ohne jede Hilfe, ein Arm allein.' }
  },

  'frontlever-advanced-tuck': {
    id: 'frontlever-advanced-tuck', name: 'Front Lever — offene Hocke',
    sets: 4, repsLabel: '8–15 s', restSec: 150, type: 'time', prTrack: true,
    primary: ['lat', 'bauch'], secondary: ['oberer_ruecken', 'unterer_ruecken', 'saege'],
    description: 'Die Hocke aus dem Front Lever öffnet sich, der Oberschenkel steht waagerecht. Die Zwischenstufe zum gestreckten Front Lever.',
    tips: ['Der Rücken bleibt rund, nicht ins Hohlkreuz fallen.',
           'Die Arme bleiben gestreckt, die Schultern gedrückt.',
           'Lieber kurz und sauber als lang und durchgehangen.'],
    easier: { name: 'Front Lever in der Hocke', desc: 'Die Knie eng am Körper.' },
    harder: { name: 'Front Lever einbeinig', desc: 'Ein Bein gestreckt, eines angehockt.' }
  },

  'frontlever-einbeinig': {
    id: 'frontlever-einbeinig', name: 'Front Lever einbeinig',
    sets: 4, repsLabel: '6–12 s je Seite', restSec: 180, type: 'time', prTrack: true,
    primary: ['lat', 'bauch'], secondary: ['oberer_ruecken', 'unterer_ruecken', 'gesaess'],
    description: 'Ein Bein gestreckt, eines angehockt. Der letzte Schritt vor dem vollen Front Lever.',
    tips: ['Das gestreckte Bein bleibt waagerecht, es hängt nicht durch.',
           'Beide Seiten gleich lang halten.',
           'Der Körper bleibt gerade — keine Drehung um die Längsachse.'],
    easier: { name: 'Front Lever offene Hocke', desc: 'Beide Beine angewinkelt.' },
    harder: { name: 'Front Lever gestreckt', desc: 'Beide Beine gestreckt, waagerecht.' }
  },

  'frontlever-voll': {
    id: 'frontlever-voll', name: 'Front Lever gestreckt',
    sets: 5, repsLabel: '3–10 s', restSec: 240, type: 'time', prTrack: true,
    primary: ['lat', 'bauch'], secondary: ['oberer_ruecken', 'unterer_ruecken', 'gesaess', 'saege'],
    description: 'Waagerecht unter der Stange hängen, der Körper ein Brett. Eine der schwersten statischen Übungen überhaupt.',
    tips: ['Die Schultern nach unten drücken, das hält die Waagerechte.',
           'Gesäß und Beine fest anspannen, sonst kippt die Hüfte.',
           'Jede Sekunde zählt — auch drei saubere sind ein Ergebnis.'],
    easier: { name: 'Front Lever einbeinig', desc: 'Ein Bein bleibt angehockt.' },
    harder: { name: 'Front Lever Pull-ups', desc: 'Aus der Waagerechten ziehen.' }
  },

  'backlever-tuck': {
    id: 'backlever-tuck', name: 'Back Lever in der Hocke',
    sets: 4, repsLabel: '10–20 s', restSec: 150, type: 'time', prTrack: true,
    primary: ['brust', 'schultern'], secondary: ['unterer_ruecken', 'bizeps', 'lat'],
    description: 'Mit dem Rücken zum Boden waagerecht hängen, Knie angezogen. Öffnet Brust und Schulter unter Last.',
    tips: ['Sehr langsam hineingehen, die Schulter braucht Zeit.',
           'Die Arme bleiben gestreckt — angewinkelt wird es gefährlich.',
           'Bei Ziehen in der Bizepssehne sofort abbrechen.'],
    easier: { name: 'Skin the Cat', desc: 'Nur die Durchrolle, ohne Halten.' },
    harder: { name: 'Back Lever gestreckt', desc: 'Beide Beine gestreckt.' }
  },

  'skin-the-cat': {
    id: 'skin-the-cat', name: 'Skin the Cat',
    sets: 3, repsLabel: '5–8', restSec: 120, type: 'reps', prTrack: false,
    primary: ['schultern', 'lat'], secondary: ['bauch', 'brust', 'rotatoren'],
    description: 'An Ringen rückwärts durch die Arme rollen und zurück. Die beste Übung für Schulterbeweglichkeit unter Last.',
    tips: ['Langsam und kontrolliert, nie schwungvoll.',
           'Die Arme bleiben gestreckt.',
           'Nur so weit, wie die Schulter ohne Schmerz mitgeht.'],
    easier: { name: 'German Hang', desc: 'Nur die Endposition halten, ohne Rollen.' },
    harder: { name: 'Skin the Cat mit Halt', desc: 'Unten fünf Sekunden halten.' }
  },

  'german-hang': {
    id: 'german-hang', name: 'German Hang',
    sets: 3, repsLabel: '20–40 s', restSec: 90, type: 'time', prTrack: false,
    primary: ['schultern'], secondary: ['brust', 'bizeps', 'lat'],
    description: 'Rückwärts hinter dem Körper hängen. Dehnt die Schulter in die Streckung — Vorbereitung für Back Lever und Muscle-up.',
    tips: ['Ganz langsam hineinsinken, nie fallen lassen.',
           'Die Schultern bleiben aktiv, nicht komplett passiv hängen.',
           'Zwanzig Sekunden reichen völlig, mehr bringt hier nichts.'],
    easier: { name: 'Passiver Hang', desc: 'Normal vorne hängen, ohne Rückwärtsdrehung.' },
    harder: { name: 'Skin the Cat', desc: 'Aktiv hinein- und herausrollen.' }
  },

  'ruderzug-ringe': {
    id: 'ruderzug-ringe', name: 'Ruderzug an Ringen',
    sets: 4, repsLabel: '8–12', restSec: 90, type: 'reps', prTrack: false,
    primary: ['oberer_ruecken', 'lat'], secondary: ['bizeps', 'trapez', 'rotatoren'],
    description: 'Waagerechtes Ziehen an Ringen. Die Ringe erlauben eine natürliche Drehung — schonender für Ellbogen und Schulter als eine feste Stange.',
    tips: ['Oben die Ringe zum Körper drehen, die Schulterblätter zusammen.',
           'Der Körper bleibt eine Linie, die Hüfte hängt nicht durch.',
           'Die Füße weiter nach vorne machen es schwerer.'],
    easier: { name: 'Australian Pull-ups', desc: 'An fester Stange, steiler Winkel.' },
    harder: { name: 'Ruderzug einarmig', desc: 'Ein Ring, ein Arm.' }
  },

  'face-pulls-band': {
    id: 'face-pulls-band', name: 'Face Pulls mit Band',
    sets: 3, repsLabel: '12–20', restSec: 60, type: 'reps', prTrack: false,
    primary: ['oberer_ruecken', 'rotatoren'], secondary: ['schultern', 'trapez'],
    description: 'Ein Band auf Gesichtshöhe zum Kopf ziehen, Ellbogen hoch. Die wichtigste Ausgleichsübung gegen zu viel Drücken.',
    tips: ['Die Ellbogen bleiben oben, auf Schulterhöhe.',
           'Am Ende die Hände nach außen drehen, Daumen nach hinten.',
           'Leichtes Band, hohe Wiederholungen — hier geht es nicht um Kraft.'],
    easier: { name: 'Schulterblatt-Zusammenziehen', desc: 'Ohne Band, nur die Schulterblätter bewegen.' },
    harder: { name: 'Face Pulls einarmig', desc: 'Eine Seite nach der anderen.' }
  },

  'bizeps-curls-ringe': {
    id: 'bizeps-curls-ringe', name: 'Bizeps-Curls an Ringen',
    sets: 3, repsLabel: '8–12', restSec: 90, type: 'reps', prTrack: false,
    primary: ['bizeps'], secondary: ['unterarme', 'oberer_ruecken'],
    description: 'Zurückgelehnt an Ringen hängen und nur über die Ellbogen hochziehen. Isolation für den Bizeps ohne Hanteln.',
    tips: ['Die Oberarme bleiben stehen, nur die Unterarme bewegen sich.',
           'Der Körper bleibt gerade, kein Schwung aus der Hüfte.',
           'Je waagerechter, desto schwerer.'],
    easier: { name: 'Bizeps-Curls steil', desc: 'Fast aufrecht stehen, wenig Last.' },
    harder: { name: 'Bizeps-Curls waagerecht', desc: 'Der Körper parallel zum Boden.' }
  },

  'hangeln': {
    id: 'hangeln', name: 'Hangeln',
    sets: 3, repsLabel: '20–40 s', restSec: 90, type: 'time', prTrack: false,
    primary: ['unterarme', 'lat'], secondary: ['oberer_ruecken', 'bauch', 'schultern'],
    description: 'Von Griff zu Griff weiterhangeln. Griffkraft, Schulterstabilität und Rumpfspannung in Bewegung.',
    tips: ['Der Schwung hilft — aber er darf nicht die Arbeit machen.',
           'Die Schultern bleiben aktiv, nicht in die Gelenke fallen.',
           'Bei nachlassendem Griff aufhören, nicht abrutschen riskieren.'],
    easier: { name: 'Aktiver Hang', desc: 'An Ort und Stelle hängen, Schultern aktiv.' },
    harder: { name: 'Hangeln mit Gewicht', desc: 'Weste oder Rucksack dazu.' }
  },

  'handtuch-klimmzuege': {
    id: 'handtuch-klimmzuege', name: 'Handtuch-Klimmzüge',
    sets: 4, repsLabel: '4–8', restSec: 150, type: 'reps', prTrack: true,
    primary: ['unterarme', 'lat'], secondary: ['bizeps', 'oberer_ruecken'],
    description: 'Zwei Handtücher über die Stange, daran hochziehen. Die Griffkraft wird zum begrenzenden Faktor.',
    tips: ['Die Handtücher fest umschließen, nicht nur festhalten.',
           'Weniger Wiederholungen als am Griff — das ist normal.',
           'Bei aufgehender Haut abbrechen, Blasen kosten Wochen.'],
    easier: { name: 'Handtuch-Hang', desc: 'Nur hängen, ohne zu ziehen.' },
    harder: { name: 'Einarmiger Handtuch-Hang', desc: 'Eine Hand am Handtuch, hängen.' }
  },

  /* ════════════ BEINE UND GESÄSS ════════════ */

  'kniebeuge': {
    id: 'kniebeuge', name: 'Kniebeuge',
    sets: 3, repsLabel: '15–25', restSec: 75, type: 'reps', prTrack: false,
    primary: ['oberschenkel', 'gesaess'], secondary: ['waden', 'bauch', 'adduktoren'],
    description: 'Die Grundbewegung für die Beine. Ohne Gewicht, dafür sauber und tief.',
    tips: ['Die Knie folgen der Fußspitze, sie fallen nicht nach innen.',
           'Die Fersen bleiben am Boden.',
           'So tief wie möglich, ohne dass der untere Rücken rund wird.'],
    easier: { name: 'Kniebeuge zum Stuhl', desc: 'Bis zur Sitzfläche, kurz aufsetzen.' },
    harder: { name: 'Sprungkniebeuge', desc: 'Aus der Tiefe explosiv abspringen.' }
  },

  'sissy-squat': {
    id: 'sissy-squat', name: 'Sissy Squat',
    sets: 3, repsLabel: '8–15', restSec: 90, type: 'reps', prTrack: false,
    primary: ['oberschenkel'], secondary: ['bauch', 'huefte'],
    description: 'Die Knie nach vorne schieben, der Oberkörper kippt zurück — eine Linie von den Knien zum Kopf. Trifft den vorderen Oberschenkel wie nichts sonst.',
    tips: ['Anfangs an einer Stange festhalten.',
           'Die Hüfte bleibt gestreckt, sie knickt nicht ein.',
           'Bei Knieproblemen den Bewegungsumfang klein halten.'],
    easier: { name: 'Sissy Squat mit Halt', desc: 'Eine Hand hält sich fest und entlastet.' },
    harder: { name: 'Freier Sissy Squat', desc: 'Ohne Festhalten, Arme vor der Brust.' }
  },

  'nordic-curl': {
    id: 'nordic-curl', name: 'Nordic Hamstring Curl',
    sets: 3, repsLabel: '4–8', restSec: 150, type: 'reps', prTrack: true,
    primary: ['oberschenkel'], secondary: ['gesaess', 'unterer_ruecken'],
    description: 'Die Füße fixiert, aus dem Kniestand langsam nach vorne sinken und wieder hoch. Die härteste Übung für die Beinrückseite ohne Geräte.',
    tips: ['Der Körper bleibt von den Knien bis zum Kopf eine Linie.',
           'So langsam wie möglich ablassen, das ist die eigentliche Arbeit.',
           'Mit den Händen abfangen ist erlaubt und am Anfang normal.'],
    easier: { name: 'Nordic Curl mit Band', desc: 'Ein Band nimmt einen Teil des Gewichts.' },
    harder: { name: 'Nordic Curl ohne Abfangen', desc: 'Ganz herunter und ohne Hände zurück.' }
  },

  'einbeiniges-kreuzheben': {
    id: 'einbeiniges-kreuzheben', name: 'Einbeiniges Kreuzheben',
    sets: 3, repsLabel: '8–12 je Seite', restSec: 75, type: 'reps', prTrack: false,
    primary: ['gesaess', 'oberschenkel'], secondary: ['unterer_ruecken', 'bauch'],
    description: 'Auf einem Bein stehend nach vorne kippen, das freie Bein geht nach hinten. Gesäß, Beinrückseite und Gleichgewicht in einem.',
    tips: ['Der Rücken bleibt gerade, die Bewegung kommt aus der Hüfte.',
           'Das Standbein bleibt leicht gebeugt.',
           'Ein fester Blickpunkt am Boden hilft dem Gleichgewicht.'],
    easier: { name: 'Kreuzheben beidbeinig', desc: 'Beide Füße am Boden.' },
    harder: { name: 'Einbeiniges Kreuzheben mit Gewicht', desc: 'Mit Rucksack oder Gewicht in der Hand.' }
  },

  'step-ups': {
    id: 'step-ups', name: 'Step-ups',
    sets: 3, repsLabel: '10–15 je Seite', restSec: 75, type: 'reps', prTrack: false,
    primary: ['oberschenkel', 'gesaess'], secondary: ['waden', 'bauch'],
    description: 'Auf eine Bank oder Stufe steigen, kontrolliert wieder herunter. Einfach, wirksam und gelenkschonend.',
    tips: ['Die Kraft kommt aus dem oberen Bein, nicht aus dem Abdruck unten.',
           'Kontrolliert absteigen, nicht fallen lassen.',
           'Je höher die Stufe, desto mehr Gesäß.'],
    easier: { name: 'Niedrige Step-ups', desc: 'Eine niedrige Stufe, weniger Bewegungsumfang.' },
    harder: { name: 'Step-ups mit Gewicht', desc: 'Rucksack oder Gewichte in den Händen.' }
  },

  'wandsitzen': {
    id: 'wandsitzen', name: 'Wandsitzen',
    sets: 3, repsLabel: '30–60 s', restSec: 90, type: 'time', prTrack: true,
    primary: ['oberschenkel'], secondary: ['gesaess', 'waden'],
    description: 'Mit dem Rücken an der Wand in der Hocke sitzen. Reine Haltearbeit für den vorderen Oberschenkel.',
    tips: ['Die Oberschenkel waagerecht, die Knie im rechten Winkel.',
           'Das Gewicht auf den Fersen, nicht auf den Zehen.',
           'Ruhig weiteratmen — der Reflex ist, die Luft anzuhalten.'],
    easier: { name: 'Wandsitzen höher', desc: 'Weniger tief, stumpferer Kniewinkel.' },
    harder: { name: 'Einbeiniges Wandsitzen', desc: 'Ein Bein gestreckt vor dem Körper.' }
  },

  'ausfallschritte': {
    id: 'ausfallschritte', name: 'Ausfallschritte',
    sets: 3, repsLabel: '10–14 je Seite', restSec: 75, type: 'reps', prTrack: false,
    primary: ['oberschenkel', 'gesaess'], secondary: ['adduktoren', 'bauch', 'waden'],
    description: 'Ein großer Schritt nach vorne, das hintere Knie sinkt zum Boden. Beine einzeln belasten, ohne Gleichgewichtskunst.',
    tips: ['Der Oberkörper bleibt aufrecht.',
           'Das vordere Knie bleibt über dem Fuß, es schiebt nicht weit darüber.',
           'Das hintere Knie berührt sanft, es knallt nicht auf.'],
    easier: { name: 'Ausfallschritte im Stand', desc: 'Die Füße bleiben stehen, nur auf und ab.' },
    harder: { name: 'Springende Ausfallschritte', desc: 'Im Sprung die Beine wechseln.' }
  },

  'shrimp-squat': {
    id: 'shrimp-squat', name: 'Shrimp Squat',
    sets: 4, repsLabel: '3–8 je Seite', restSec: 150, type: 'reps', prTrack: true,
    primary: ['oberschenkel', 'gesaess'], secondary: ['bauch', 'waden'],
    description: 'Einbeinige Kniebeuge, das hintere Bein wird mit der Hand gehalten. Schwerer als der Pistol, weil das Gegengewicht fehlt.',
    tips: ['Das hintere Knie berührt kurz den Boden.',
           'Der Oberkörper bleibt so aufrecht wie möglich.',
           'Mit Erhöhung unter dem hinteren Knie beginnen.'],
    easier: { name: 'Bulgarian Split Squats', desc: 'Das hintere Bein liegt auf einer Bank.' },
    harder: { name: 'Shrimp Squat mit Gewicht', desc: 'Mit Rucksack.' }
  },

  'cossack-squat': {
    id: 'cossack-squat', name: 'Cossack Squat',
    sets: 3, repsLabel: '6–10 je Seite', restSec: 90, type: 'reps', prTrack: false,
    primary: ['adduktoren', 'oberschenkel'], secondary: ['gesaess', 'huefte'],
    description: 'Seitliche Kniebeuge — auf einem Bein tief, das andere gestreckt zur Seite. Kraft und Beweglichkeit für die Innenseite.',
    tips: ['Die Ferse des gebeugten Beins bleibt am Boden.',
           'Das gestreckte Bein bleibt gestreckt, die Zehen zeigen nach oben.',
           'Anfangs an einer Stange festhalten.'],
    easier: { name: 'Seitlicher Ausfallschritt', desc: 'Weniger tief, beide Fersen am Boden.' },
    harder: { name: 'Cossack Squat mit Gewicht', desc: 'Ein Gewicht vor der Brust.' }
  },

  'waden-stufe': {
    id: 'waden-stufe', name: 'Wadenheben an der Stufe',
    sets: 4, repsLabel: '12–20', restSec: 60, type: 'reps', prTrack: false,
    primary: ['waden'], secondary: [],
    description: 'Auf einer Stufe stehen, die Fersen sinken tief unter die Kante. Voller Bewegungsumfang für die Wade.',
    tips: ['Unten zwei Sekunden in die Dehnung sinken.',
           'Oben ganz auf die Zehenspitzen, kurz halten.',
           'Langsam, ohne zu federn.'],
    easier: { name: 'Wadenheben am Boden', desc: 'Ohne Stufe, kleinerer Umfang.' },
    harder: { name: 'Einbeiniges Wadenheben an der Stufe', desc: 'Ein Bein trägt alles.' }
  },

  /* ════════════ RUMPF ════════════ */

  'plank': {
    id: 'plank', name: 'Unterarmstütz',
    sets: 3, repsLabel: '30–60 s', restSec: 60, type: 'time', prTrack: true,
    primary: ['bauch'], secondary: ['schultern', 'gesaess', 'unterer_ruecken'],
    description: 'Die Grundhaltung für den Rumpf. Auf Unterarmen und Zehen, der Körper eine Linie.',
    tips: ['Das Gesäß aktiv anspannen, das nimmt Druck vom unteren Rücken.',
           'Die Schultern über den Ellbogen.',
           'Lieber dreißig gute Sekunden als zwei durchgehangene Minuten.'],
    easier: { name: 'Unterarmstütz auf den Knien', desc: 'Die Knie am Boden, kürzerer Hebel.' },
    harder: { name: 'Unterarmstütz mit Beinheben', desc: 'Abwechselnd ein Bein anheben.' }
  },

  'seitstuetz': {
    id: 'seitstuetz', name: 'Seitstütz',
    sets: 3, repsLabel: '20–45 s je Seite', restSec: 60, type: 'time', prTrack: false,
    primary: ['bauch', 'saege'], secondary: ['schultern', 'gesaess'],
    description: 'Auf einem Unterarm seitlich stützen. Trifft die seitliche Bauchmuskulatur, die beim geraden Stütz kaum arbeitet.',
    tips: ['Die Hüfte hoch, sie sinkt nicht ab.',
           'Der Körper bleibt in einer Ebene, nicht nach vorne kippen.',
           'Der obere Arm zeigt zur Decke oder liegt an der Hüfte.'],
    easier: { name: 'Seitstütz auf den Knien', desc: 'Die Knie angewinkelt am Boden.' },
    harder: { name: 'Seitstütz mit Beinheben', desc: 'Das obere Bein anheben und halten.' }
  },

  'beinheben-haengend': {
    id: 'beinheben-haengend', name: 'Hängendes Beinheben',
    sets: 4, repsLabel: '8–15', restSec: 90, type: 'reps', prTrack: true,
    primary: ['bauch', 'huefte'], secondary: ['unterarme', 'lat'],
    description: 'An der Stange hängen und die gestreckten Beine anheben. Die stärkste Bauchübung im Calisthenics.',
    tips: ['Kein Schwung — wenn der Körper pendelt, war es zu schwer.',
           'Das Becken am Ende leicht einrollen, sonst arbeitet nur der Hüftbeuger.',
           'Langsam ablassen, das ist die halbe Übung.'],
    easier: { name: 'Hängendes Knieheben', desc: 'Die Knie angewinkelt statt gestreckt.' },
    harder: { name: 'Toes to Bar', desc: 'Die Zehen berühren die Stange.' }
  },

  'toes-to-bar': {
    id: 'toes-to-bar', name: 'Toes to Bar',
    sets: 4, repsLabel: '5–12', restSec: 120, type: 'reps', prTrack: true,
    primary: ['bauch', 'huefte'], secondary: ['lat', 'unterarme'],
    description: 'Hängend die Zehen bis zur Stange führen. Verlangt Bauchkraft und Beweglichkeit in der Beinrückseite.',
    tips: ['Die Schultern bleiben aktiv, nicht passiv hängen.',
           'Die Beine so gestreckt wie möglich.',
           'Kontrolliert zurück, nicht fallen lassen.'],
    easier: { name: 'Hängendes Beinheben', desc: 'Bis zur Waagerechten statt zur Stange.' },
    harder: { name: 'Toes to Bar langsam', desc: 'Fünf Sekunden hoch, fünf Sekunden runter.' }
  },

  'ab-rollout': {
    id: 'ab-rollout', name: 'Ab Rollout',
    sets: 3, repsLabel: '6–12', restSec: 120, type: 'reps', prTrack: true,
    primary: ['bauch'], secondary: ['lat', 'schultern', 'unterer_ruecken'],
    description: 'Mit einem Rad oder Handtüchern nach vorne ausrollen und zurückziehen. Der Rumpf arbeitet gegen die Streckung.',
    tips: ['Der untere Rücken darf nicht ins Hohlkreuz fallen — das ist die Grenze.',
           'Vom Knien beginnen, erst später aus dem Stand.',
           'Nur so weit rollen, wie die Spannung hält.'],
    easier: { name: 'Rollout an der Wand', desc: 'Im Stand gegen die Wand rollen.' },
    harder: { name: 'Rollout aus dem Stand', desc: 'Von den Füßen statt von den Knien.' }
  },

  'russian-twist': {
    id: 'russian-twist', name: 'Russian Twist',
    sets: 3, repsLabel: '20–30', restSec: 60, type: 'reps', prTrack: false,
    primary: ['bauch', 'saege'], secondary: ['huefte'],
    description: 'Zurückgelehnt sitzen und den Oberkörper von Seite zu Seite drehen. Für die Rotation, die beim geraden Training fehlt.',
    tips: ['Der Rücken bleibt gerade, nicht rund werden.',
           'Die Drehung kommt aus dem Rumpf, nicht aus den Armen.',
           'Die Füße anheben macht es deutlich schwerer.'],
    easier: { name: 'Russian Twist mit Bodenkontakt', desc: 'Die Füße bleiben am Boden.' },
    harder: { name: 'Russian Twist mit Gewicht', desc: 'Ein Gewicht in den Händen.' }
  },

  'hollow-rock': {
    id: 'hollow-rock', name: 'Hollow Rock',
    sets: 3, repsLabel: '15–25', restSec: 75, type: 'reps', prTrack: false,
    primary: ['bauch'], secondary: ['huefte', 'oberschenkel'],
    description: 'Aus der Hollow-Position vor und zurück schaukeln. Hält die Spannung in Bewegung — die Vorstufe zu allen Skills.',
    tips: ['Die Hollow-Form bleibt die ganze Zeit erhalten.',
           'Die Bewegung kommt aus dem Rumpf, nicht aus dem Schwung der Arme.',
           'Der untere Rücken bleibt am Boden.'],
    easier: { name: 'Hollow Hold', desc: 'Nur halten, ohne Schaukeln.' },
    harder: { name: 'Hollow Rock gestreckt', desc: 'Arme und Beine ganz lang.' }
  },

  'superman-hold': {
    id: 'superman-hold', name: 'Superman Hold',
    sets: 3, repsLabel: '20–40 s', restSec: 60, type: 'time', prTrack: false,
    primary: ['unterer_ruecken', 'gesaess'], secondary: ['oberer_ruecken', 'schultern'],
    description: 'Auf dem Bauch liegend Arme und Beine anheben. Das Gegenstück zum Hollow Hold — für die Rückseite.',
    tips: ['Der Blick bleibt zum Boden, der Nacken lang.',
           'Nicht maximal überstrecken, mittlere Höhe reicht.',
           'Gesäß und Beinrückseite aktiv mitarbeiten lassen.'],
    easier: { name: 'Superman einarmig', desc: 'Abwechselnd nur ein Arm und das Gegenbein.' },
    harder: { name: 'Superman mit Bewegung', desc: 'In der Höhe Arme und Beine schwimmen lassen.' }
  },

  'bird-dog': {
    id: 'bird-dog', name: 'Bird Dog',
    sets: 3, repsLabel: '8–12 je Seite', restSec: 45, type: 'reps', prTrack: false,
    primary: ['unterer_ruecken', 'bauch'], secondary: ['gesaess', 'schultern'],
    description: 'Im Vierfüßlerstand Arm und Gegenbein strecken. Ruhige Stabilisierungsarbeit für die Wirbelsäule.',
    tips: ['Die Hüfte bleibt waagerecht, sie kippt nicht zur Seite.',
           'Am Ende kurz halten statt schnell zu wechseln.',
           'Ein Glas Wasser auf dem unteren Rücken dürfte nicht umkippen.'],
    easier: { name: 'Nur Arm oder nur Bein', desc: 'Eines nach dem anderen statt über Kreuz.' },
    harder: { name: 'Bird Dog mit Zusammenführen', desc: 'Ellbogen und Knie unter dem Bauch treffen.' }
  },

  'dead-bug': {
    id: 'dead-bug', name: 'Dead Bug',
    sets: 3, repsLabel: '10–16 je Seite', restSec: 45, type: 'reps', prTrack: false,
    primary: ['bauch'], secondary: ['huefte'],
    description: 'Auf dem Rücken Arm und Gegenbein absenken, ohne dass der Rücken abhebt. Bauchtraining ohne Belastung für den Nacken.',
    tips: ['Der untere Rücken presst die ganze Zeit in den Boden.',
           'Nur so weit absenken, wie der Kontakt hält.',
           'Ausatmen beim Absenken.'],
    easier: { name: 'Dead Bug nur Beine', desc: 'Die Arme bleiben oben.' },
    harder: { name: 'Dead Bug gestreckt', desc: 'Arme und Beine ganz lang.' }
  },

  'l-sit-barren': {
    id: 'l-sit-barren', name: 'L-Sit am Barren',
    sets: 4, repsLabel: '10–25 s', restSec: 120, type: 'time', prTrack: true,
    primary: ['bauch', 'huefte'], secondary: ['trizeps', 'schultern', 'oberschenkel'],
    description: 'Auf zwei Holmen gestützt die gestreckten Beine waagerecht halten. Mehr Raum als am Boden, dafür mehr Haltearbeit.',
    tips: ['Die Schultern nach unten drücken, nicht zu den Ohren.',
           'Die Beine ganz gestreckt, die Zehen angezogen.',
           'Erst in der Hocke, dann ein Bein, dann beide.'],
    easier: { name: 'Tuck L-Sit', desc: 'Die Knie angezogen.' },
    harder: { name: 'V-Sit', desc: 'Die Beine über die Waagerechte hinaus.' }
  },

  /* ════════════ SKILLS UND STATISCHES ════════════ */

  'handstand-frei': {
    id: 'handstand-frei', name: 'Freier Handstand',
    sets: 5, repsLabel: '10–30 s', restSec: 120, type: 'time', prTrack: true,
    primary: ['schultern', 'bauch'], secondary: ['trizeps', 'unterarme', 'trapez'],
    description: 'Ohne Wand auf den Händen stehen. Ein Gleichgewichtsskill, der über Monate wächst — nicht über Kraft allein.',
    tips: ['Die Korrektur kommt aus den Fingern, nicht aus der Hüfte.',
           'Der Körper bleibt lang, Rippen geschlossen.',
           'Den Ausstieg üben, bevor man den Einstieg übt.'],
    easier: { name: 'Handstand an der Wand', desc: 'Die Fersen an der Wand.' },
    harder: { name: 'Freier Handstand-Liegestütz', desc: 'Im freien Handstand drücken.' }
  },

  'crow-pose': {
    id: 'crow-pose', name: 'Krähe',
    sets: 4, repsLabel: '10–30 s', restSec: 90, type: 'time', prTrack: false,
    primary: ['schultern', 'bauch'], secondary: ['trizeps', 'unterarme', 'brust'],
    description: 'Die Knie auf den Oberarmen abgelegt, die Füße frei. Der erste Balanceskill, den fast jeder in wenigen Wochen lernt.',
    tips: ['Der Blick geht nach vorne, nicht auf die Hände.',
           'Die Ellbogen leicht gebeugt und eng.',
           'Ein Kissen vor die Hände legen, das nimmt die Angst.'],
    easier: { name: 'Krähe mit einem Fuß am Boden', desc: 'Ein Fuß bleibt zur Sicherheit unten.' },
    harder: { name: 'Krähe mit gestreckten Armen', desc: 'Die Arme durchdrücken.' }
  },

  'tuck-planche': {
    id: 'tuck-planche', name: 'Tuck Planche',
    sets: 5, repsLabel: '8–20 s', restSec: 180, type: 'time', prTrack: true,
    primary: ['schultern', 'saege'], secondary: ['bauch', 'brust', 'unterarme'],
    description: 'Auf den Händen balancieren, Knie angezogen, Füße frei — ohne dass die Knie auf den Armen liegen. Die erste echte Planche-Stufe.',
    tips: ['Die Schultern weit vor die Hände schieben.',
           'Der obere Rücken bleibt rund, das ist hier richtig.',
           'Die Handgelenke gründlich aufwärmen.'],
    easier: { name: 'Krähe', desc: 'Die Knie liegen auf den Oberarmen.' },
    harder: { name: 'Advanced Tuck Planche', desc: 'Der Rücken flach, die Hüfte geöffnet.' }
  },

  'advanced-tuck-planche': {
    id: 'advanced-tuck-planche', name: 'Advanced Tuck Planche',
    sets: 5, repsLabel: '5–15 s', restSec: 180, type: 'time', prTrack: true,
    primary: ['schultern', 'saege'], secondary: ['bauch', 'brust', 'unterer_ruecken'],
    description: 'Die Tuck Planche mit flachem Rücken und geöffneter Hüfte. Der Hebel wird deutlich länger.',
    tips: ['Der Rücken flach, die Knie bleiben angewinkelt.',
           'Die Hüfte auf Schulterhöhe, nicht höher.',
           'Wenige Sekunden reichen — Qualität vor Dauer.'],
    easier: { name: 'Tuck Planche', desc: 'Der Rücken rund, die Knie eng am Körper.' },
    harder: { name: 'Straddle Planche', desc: 'Die Beine gestreckt und gegrätscht.' }
  },

  'handstand-negativ': {
    id: 'handstand-negativ', name: 'Handstand-Liegestütz negativ',
    sets: 4, repsLabel: '3–6', restSec: 150, type: 'reps', prTrack: true,
    primary: ['schultern', 'trizeps'], secondary: ['bauch', 'trapez'],
    description: 'Aus dem Handstand an der Wand langsam absenken, dann wieder hochsteigen. Der Weg zum vollen Handstand-Liegestütz.',
    tips: ['Fünf Sekunden nach unten, das ist die Vorgabe.',
           'Die Ellbogen nach vorne, nicht seitlich.',
           'Zum Hochkommen die Füße an der Wand mithelfen lassen.'],
    easier: { name: 'Erhöhte Pike Push-ups', desc: 'Nicht ganz senkrecht.' },
    harder: { name: 'Handstand-Liegestütz an der Wand', desc: 'Hoch und runter aus eigener Kraft.' }
  },

  'muscleup-bar': {
    id: 'muscleup-bar', name: 'Muscle-up an der Stange',
    sets: 5, repsLabel: '1–5', restSec: 240, type: 'reps', prTrack: true,
    primary: ['lat', 'brust', 'trizeps'], secondary: ['oberer_ruecken', 'bauch', 'unterarme'],
    description: 'Vom Hang über die Stange drücken — Klimmzug und Dip in einer Bewegung. Der bekannteste Meilenstein im Calisthenics.',
    tips: ['Der Übergang ist der Knackpunkt: früh die Ellbogen nach vorne drehen.',
           'Ein falscher Griff kostet den Muscle-up — die Daumen über die Stange.',
           'Erst wenn zehn Klimmzüge und zehn Dips sicher sind.'],
    easier: { name: 'Muscle-up-Drills', desc: 'Explosive Klimmzüge und Übergangsübungen.' },
    harder: { name: 'Langsamer Muscle-up', desc: 'Ohne Schwung, rein aus Kraft.' }
  },

  'ring-muscleup': {
    id: 'ring-muscleup', name: 'Muscle-up an Ringen',
    sets: 5, repsLabel: '1–4', restSec: 240, type: 'reps', prTrack: true,
    primary: ['lat', 'brust', 'trizeps'], secondary: ['rotatoren', 'bauch', 'unterarme'],
    description: 'Der Muscle-up an Ringen. Die Ringe drehen sich mit, dafür muss jeder stabilisierende Muskel arbeiten.',
    tips: ['Die Ringe eng am Körper führen.',
           'Im Übergang die Handgelenke nach außen drehen.',
           'Falsche Griffe hier besonders wichtig.'],
    easier: { name: 'Muscle-up an der Stange', desc: 'Fester Untergrund, weniger Stabilisierung.' },
    harder: { name: 'Langsamer Ring-Muscle-up', desc: 'Ohne Schwung.' }
  },

  'human-flag-prog': {
    id: 'human-flag-prog', name: 'Human Flag Progression',
    sets: 4, repsLabel: '5–15 s je Seite', restSec: 180, type: 'time', prTrack: true,
    primary: ['saege', 'bauch'], secondary: ['schultern', 'lat', 'adduktoren'],
    description: 'Seitlich waagerecht an einer senkrechten Stange. Beginnt mit angehockten Beinen und wächst über Monate.',
    tips: ['Der untere Arm drückt, der obere zieht — beides gleichzeitig.',
           'Mit angehockten Beinen beginnen, dann eines strecken.',
           'Beide Seiten üben, auch wenn eine viel schwächer ist.'],
    easier: { name: 'Flag in der Hocke', desc: 'Beide Knie angezogen.' },
    harder: { name: 'Human Flag gestreckt', desc: 'Beide Beine gestreckt, waagerecht.' }
  },

  'handstand-wand-hold': {
    id: 'handstand-wand-hold', name: 'Handstand am Bauch zur Wand',
    sets: 4, repsLabel: '20–60 s', restSec: 120, type: 'time', prTrack: true,
    primary: ['schultern', 'bauch'], secondary: ['trapez', 'unterarme'],
    description: 'Mit dem Bauch zur Wand hochlaufen, die Hände nah an der Wand. Erzwingt die gerade Linie, die der freie Handstand braucht.',
    tips: ['Die Hände so nah wie möglich an die Wand.',
           'Die Rippen schließen, kein Hohlkreuz.',
           'Diese Haltung fühlt sich schwerer an als der Handstand mit dem Rücken zur Wand — das ist richtig so.'],
    easier: { name: 'Handstand mit Rücken zur Wand', desc: 'Die Fersen lehnen an, mehr Hohlkreuz erlaubt.' },
    harder: { name: 'Freier Handstand', desc: 'Ohne Wand.' }
  },

  /* ════════════ BEWEGLICHKEIT UND ERHOLUNG ════════════ */

  'schulter-dislocates': {
    id: 'schulter-dislocates', name: 'Schulterkreisen mit Stab',
    sets: 2, repsLabel: '10–15', restSec: 45, type: 'reps', prTrack: false,
    primary: ['schultern', 'rotatoren'], secondary: ['brust', 'trapez'],
    description: 'Mit einem Stab oder Band von vorne über den Kopf nach hinten kreisen. Die Standardübung für Schulterbeweglichkeit.',
    tips: ['Weit greifen und den Griff nur langsam verengen.',
           'Die Arme bleiben gestreckt.',
           'Ohne Schmerz — bei Ziehen breiter greifen.'],
    easier: { name: 'Schulterkreisen ohne Stab', desc: 'Nur mit den Armen, kleiner Radius.' },
    harder: { name: 'Enge Dislocates', desc: 'Der Griff deutlich schmaler.' }
  },

  'hueftbeuger-dehnung': {
    id: 'hueftbeuger-dehnung', name: 'Hüftbeuger-Dehnung',
    sets: 2, repsLabel: '30–45 s je Seite', restSec: 30, type: 'time', prTrack: false,
    primary: ['huefte'], secondary: ['oberschenkel', 'gesaess'],
    description: 'Im Ausfallschritt knien und die Hüfte nach vorne schieben. Gegen das Sitzen und für tiefere Kniebeugen.',
    tips: ['Das Becken aufrichten, sonst dehnt nur der untere Rücken.',
           'Das Gesäß der hinteren Seite anspannen — das verstärkt die Dehnung.',
           'Ruhig atmen, nicht wippen.'],
    easier: { name: 'Hüftbeuger im Stand', desc: 'Stehend, ein Fuß auf einer Erhöhung hinten.' },
    harder: { name: 'Couch Stretch', desc: 'Der hintere Fuß an der Wand hochgestellt.' }
  },

  'brustwirbel-mobilitaet': {
    id: 'brustwirbel-mobilitaet', name: 'Brustwirbelsäulen-Mobilität',
    sets: 2, repsLabel: '8–12 je Seite', restSec: 30, type: 'reps', prTrack: false,
    primary: ['oberer_ruecken'], secondary: ['schultern', 'trapez'],
    description: 'Im Vierfüßlerstand oder Seitenlage den Oberkörper aufdrehen. Löst den steifen oberen Rücken vom Sitzen.',
    tips: ['Die Drehung kommt aus dem Brustkorb, nicht aus der Hüfte.',
           'Dem Arm mit dem Blick folgen.',
           'Am Ende zwei Sekunden halten.'],
    easier: { name: 'Katze-Kuh', desc: 'Nur vor und zurück, ohne Drehung.' },
    harder: { name: 'Drehung mit Bandzug', desc: 'Ein Band verstärkt die Endposition.' }
  },

  'handgelenk-vorbereitung': {
    id: 'handgelenk-vorbereitung', name: 'Handgelenk-Vorbereitung',
    sets: 2, repsLabel: '8–10 je Richtung', restSec: 20, type: 'reps', prTrack: false,
    primary: ['unterarme'], secondary: [],
    description: 'Die Handgelenke in alle Richtungen belasten, bevor Handstand oder Planche drankommen. Ohne sie kommen die Beschwerden zuverlässig.',
    tips: ['Langsam und mit wenig Druck beginnen.',
           'Handflächen, Handrücken und Seiten gleichermaßen.',
           'Nie schmerzhaft — hier wird vorbereitet, nicht trainiert.'],
    easier: { name: 'Handgelenkkreisen', desc: 'Ohne Bodenkontakt, nur kreisen.' },
    harder: { name: 'Handgelenkstütz mit Gewichtsverlagerung', desc: 'Das Körpergewicht über die Hände wandern lassen.' }
  },

  'nacken-entspannung': {
    id: 'nacken-entspannung', name: 'Nacken lösen',
    sets: 2, repsLabel: '30 s je Seite', restSec: 20, type: 'time', prTrack: false,
    primary: ['trapez'], secondary: ['schultern'],
    description: 'Den Kopf sanft zur Seite neigen und halten. Löst, was sich nach Klimmzügen und Bildschirmarbeit festsetzt.',
    tips: ['Nur das Gewicht des Kopfes wirken lassen, nicht ziehen.',
           'Die Gegenschulter bleibt unten.',
           'Ruhig weiteratmen.'],
    easier: { name: 'Schulterkreisen', desc: 'Nur die Schultern rollen.' },
    harder: { name: 'Nackendehnung mit Handhilfe', desc: 'Die Hand legt sanft nach.' }
  },

  'atemarbeit': {
    id: 'atemarbeit', name: 'Atemarbeit',
    sets: 1, repsLabel: '3–5 Min.', restSec: 0, type: 'activity', prTrack: false,
    primary: ['bauch'], secondary: [],
    description: 'Ruhig in den Bauch atmen, länger aus als ein. Bringt den Körper nach dem Training aus der Anspannung heraus.',
    tips: ['Vier Sekunden ein, sechs bis acht Sekunden aus.',
           'Die Hand auf dem Bauch soll sich heben, nicht die Brust.',
           'Nach dem Training oder abends, nicht davor.'],
    easier: { name: 'Ruhiges Sitzen', desc: 'Einfach still sitzen und normal atmen.' },
    harder: { name: 'Verlängerte Ausatmung', desc: 'Die Ausatmung auf zehn Sekunden dehnen.' }
  },

  'lockeres-radfahren': {
    id: 'lockeres-radfahren', name: 'Lockeres Radfahren',
    sets: 1, repsLabel: '20–40 Min.', restSec: 0, type: 'activity', prTrack: false,
    primary: ['oberschenkel'], secondary: ['waden', 'gesaess'],
    description: 'Ruhiges Fahren ohne Belastung. Bringt Blut in die Beine, ohne neue Ermüdung zu erzeugen.',
    tips: ['So locker, dass ein Gespräch möglich bleibt.',
           'Hohe Trittfrequenz, kleiner Gang.',
           'Am Tag nach schwerem Beintraining besonders wirksam.'],
    easier: { name: 'Spaziergang', desc: 'Zu Fuß statt auf dem Rad.' },
    harder: { name: 'Radfahren mit Anstiegen', desc: 'Einzelne Steigungen einbauen.' }
  },

  'schwimmen-locker': {
    id: 'schwimmen-locker', name: 'Lockeres Schwimmen',
    sets: 1, repsLabel: '20–30 Min.', restSec: 0, type: 'activity', prTrack: false,
    primary: ['lat', 'schultern'], secondary: ['bauch', 'oberschenkel'],
    description: 'Ruhiges Schwimmen ohne Zeitdruck. Entlastet die Gelenke vollständig und lockert Schultern und Rücken.',
    tips: ['Ruhige Bahnen, kein Wettkampftempo.',
           'Rücken- und Kraulschwimmen abwechseln.',
           'Bei Schulterproblemen auf Rückenschwimmen beschränken.'],
    easier: { name: 'Wassergehen', desc: 'Im Wasser gehen statt schwimmen.' },
    harder: { name: 'Schwimmen mit Intervallen', desc: 'Einzelne schnelle Bahnen einbauen.' }
  }
};

/* ══════════════════════════════════════════════════════════════════
   ONLINE-FASSUNG

   Die Bank kann aus dem Netz nachgeladen werden — dann kommen neue
   Übungen bei allen an, ohne dass die App neu ausgeliefert wird.

   So läuft es ab, damit nichts hängt:
     1. Beim Start gilt die zuletzt geholte Fassung aus dem Speicher.
        Sie liegt sofort vor, es wird auf nichts gewartet.
     2. Im Hintergrund wird die Online-Fassung geholt und abgelegt.
     3. Beim nächsten Start ist sie aktiv.

   Noch abgeschaltet: QUELLE ist leer. Sobald eine Adresse eingetragen
   ist, greift der Ablauf von allein. Erwartet wird dieselbe Struktur
   wie in dieser Datei — ein Objekt aus Kennung und Übung.
   ══════════════════════════════════════════════════════════════════ */
window.FLOW_BANK_QUELLE = '';   // z. B. 'https://…/uebungsbank.json'

(function () {
  var SCHLUESSEL = 'flow_bank_online';

  /* Abgelegte Fassung sofort auflegen — ohne sie waere die Neuerung
     erst nach dem uebernaechsten Start da.                          */
  try {
    var roh = localStorage.getItem(SCHLUESSEL);
    if (roh) {
      var b = JSON.parse(roh);
      if (b && b.uebungen && typeof b.uebungen === 'object') {
        Object.keys(b.uebungen).forEach(function (id) {
          window.FLOW_BANK[id] = b.uebungen[id];
        });
      }
    }
  } catch (e) { /* beschaedigt oder gesperrt — die eingebaute Bank genuegt */ }

  if (!window.FLOW_BANK_QUELLE) return;

  /* Im Hintergrund nachsehen. Faellt das aus, merkt es niemand. */
  setTimeout(function () {
    fetch(window.FLOW_BANK_QUELLE, { cache: 'no-cache' })
      .then(function (a) { return a.ok ? a.json() : null; })
      .then(function (neu) {
        if (!neu || typeof neu !== 'object') return;
        var uebungen = neu.uebungen || neu;
        /* Grob pruefen, bevor etwas abgelegt wird: eine Bank ohne
           Namen oder Muskeln wuerde die App still beschaedigen.    */
        var gueltig = 0;
        Object.keys(uebungen).forEach(function (id) {
          var u = uebungen[id];
          if (u && u.name && Array.isArray(u.primary) && u.primary.length) gueltig++;
        });
        if (!gueltig) return;
        try {
          localStorage.setItem(SCHLUESSEL, JSON.stringify({
            geholt: new Date().toISOString(),
            anzahl: gueltig,
            uebungen: uebungen
          }));
        } catch (e) {}
      })
      .catch(function () {});
  }, 3000);
})();
