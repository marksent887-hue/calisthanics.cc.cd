/* ══════════════════════════════════════════════════════════════════
   ALLE ÜBUNGEN — für den Skill Tree

   Erzeugt aus app.html und uebungsbank.js. Enthält zusätzlich zwei
   abgeleitete Felder, die der Baum braucht:

     ast    Bewegungsfamilie — druck, zug, beine, rumpf, skill, erholung
     stufe  geschätzte Schwierigkeit 1..4

   Beide sind aus Namen und Muskeln GESCHÄTZT, nicht von Hand gesetzt.
   Sie sind der Platzhalter, bis die echten Verweise stehen.

   vorher / nachher zeigen auf eine andere Übung, wenn deren Name in
   easier/harder wörtlich auftaucht. Das trifft heute rund ein Fünftel —
   der Rest bleibt leer und ist die eigentliche Arbeit am Baum.

   Neu erzeugen:  node katalog-bauen.mjs  (dann diese Datei von Hand)
   ══════════════════════════════════════════════════════════════════ */

window.FLOW_UEBUNGEN = {
"gew-liegestuetze": {
"id": "gew-liegestuetze",
"name": "Gewichtete Liegestütze",
"sets": 5,
"repsLabel": "5",
"restSec": 150,
"type": "reps",
"primary": [
"brust",
"trizeps",
"schultern"
],
"secondary": [
"bauch"
],
"description": "Die Grundübung des Drucktrainings, schwer gemacht: Gewichtsweste oder Rucksack drauf und fünf saubere Fünfer. Hier wird Maximalkraft gebaut.",
"ast": "druck",
"stufe": 4,
"vorher": null,
"nachher": null
},
"explosive-liegestuetze": {
"id": "explosive-liegestuetze",
"name": "Explosive Liegestütze",
"sets": 4,
"repsLabel": "3–5",
"restSec": 120,
"type": "reps",
"primary": [
"brust",
"trizeps"
],
"secondary": [
"schultern",
"bauch"
],
"description": "Maximale Absicht in jeder Wiederholung: so explosiv drücken, dass die Hände kurz den Boden verlassen. Wenige Wiederholungen, volle Qualität.",
"ast": "druck",
"stufe": 2,
"vorher": null,
"nachher": null
},
"pike-pushups": {
"id": "pike-pushups",
"name": "Pike Push-ups",
"sets": 4,
"repsLabel": "6–8",
"restSec": 120,
"type": "reps",
"primary": [
"schultern"
],
"secondary": [
"trizeps",
"brust"
],
"description": "Hüfte hoch, Körper im umgekehrten V — der Liegestütz wird zum Überkopf-Drücken für die Schultern und baut dir den Weg zum Handstand-Drücken.",
"ast": "druck",
"stufe": 2,
"vorher": null,
"nachher": null
},
"diamond-mo": {
"id": "diamond-mo",
"name": "Diamond Push-ups",
"sets": 3,
"repsLabel": "6–10",
"restSec": 90,
"type": "reps",
"primary": [
"trizeps"
],
"secondary": [
"brust",
"schultern"
],
"description": "Daumen und Zeigefinger formen unter der Brust einen Diamanten. Der enge Stand verlagert die gesamte Last auf den Trizeps.",
"ast": "druck",
"stufe": 2,
"vorher": null,
"nachher": null
},
"planche-lean-mo": {
"id": "planche-lean-mo",
"name": "Planche Lean",
"sets": 3,
"repsLabel": "10–15 s",
"restSec": 120,
"type": "time",
"primary": [
"schultern",
"bauch"
],
"secondary": [
"unterarme",
"brust"
],
"description": "Im Stütz weit nach vorne lehnen, bis die Schultern deutlich vor den Händen stehen. Der Einstieg in die Planche — Zeit unter Spannung ist die Währung.",
"ast": "skill",
"stufe": 2,
"vorher": null,
"nachher": null
},
"negative-klimmzuege": {
"id": "negative-klimmzuege",
"name": "Negative Klimmzüge",
"sets": 4,
"repsLabel": "3–5",
"restSec": 150,
"type": "reps",
"primary": [
"lat",
"oberer_ruecken",
"bizeps"
],
"secondary": [
"unterarme"
],
"description": "Oben starten und so langsam wie möglich in den Hang absenken. Die Exzentrik baut genau die Kraft, die dir für mehr Klimmzüge fehlt.",
"ast": "zug",
"stufe": 3,
"vorher": null,
"nachher": null
},
"klimmzuege": {
"id": "klimmzuege",
"name": "Klimmzüge",
"sets": 5,
"repsLabel": "2–4",
"restSec": 150,
"type": "reps",
"primary": [
"lat",
"bizeps",
"oberer_ruecken"
],
"secondary": [
"unterarme",
"bauch"
],
"description": "Der ehrlichste Krafttest im Calisthenics. Wenige, dafür perfekte Wiederholungen — aus dem toten Hang bis Kinn über die Stange.",
"ast": "zug",
"stufe": 2,
"vorher": null,
"nachher": null
},
"tophold-klimmzug": {
"id": "tophold-klimmzug",
"name": "Top-Hold Klimmzüge",
"sets": 3,
"repsLabel": "8–12 s",
"restSec": 120,
"type": "time",
"primary": [
"bizeps",
"lat"
],
"secondary": [
"unterarme",
"oberer_ruecken"
],
"description": "Oben an der Stange halten, Kinn über der Stange, Ellbogen eng. Isometrische Kraft an der schwächsten Stelle der meisten Klimmzüge.",
"ast": "zug",
"stufe": 2,
"vorher": null,
"nachher": null
},
"frontlever-tuck-di": {
"id": "frontlever-tuck-di",
"name": "Front-Lever Tuck Hold",
"sets": 4,
"repsLabel": "8–12 s",
"restSec": 120,
"type": "time",
"primary": [
"lat",
"bauch"
],
"secondary": [
"oberer_ruecken",
"unterarme"
],
"description": "Mit angezogenen Knien waagerecht unter der Stange hängen, Arme gestreckt. Der erste echte Schritt Richtung Front Lever.",
"ast": "skill",
"stufe": 3,
"vorher": null,
"nachher": null
},
"towel-hang-di": {
"id": "towel-hang-di",
"name": "Towel Hang",
"sets": 3,
"repsLabel": "20–30 s",
"restSec": 90,
"type": "time",
"primary": [
"unterarme"
],
"secondary": [
"lat",
"bizeps"
],
"description": "Zwei Handtücher über die Stange, je eine Hand greift ein Ende. Der Rundgriff brennt in den Unterarmen und baut Griffkraft, die überall trägt.",
"ast": "zug",
"stufe": 2,
"vorher": null,
"nachher": null
},
"deadhang-di": {
"id": "deadhang-di",
"name": "Dead Hang",
"sets": 2,
"repsLabel": "15–25 s",
"restSec": 60,
"type": "time",
"primary": [
"unterarme",
"lat"
],
"secondary": [
"schultern"
],
"description": "Ruhig und schwer an der Stange hängen. Baut Griffkraft, entlastet die Wirbelsäule und beruhigt das System nach den schweren Sätzen.",
"ast": "zug",
"stufe": 2,
"vorher": null,
"nachher": null
},
"split-squats": {
"id": "split-squats",
"name": "Split Squats",
"sets": 4,
"repsLabel": "8–10 / Seite",
"restSec": 90,
"type": "reps",
"primary": [
"oberschenkel",
"gesaess"
],
"secondary": [
"adduktoren",
"huefte"
],
"description": "Ausfallschritt-Position, das hintere Bein stützt nur. Das vordere Bein arbeitet allein — einseitige Beinkraft ganz ohne Geräte.",
"ast": "beine",
"stufe": 2,
"vorher": null,
"nachher": null
},
"pistol-progression": {
"id": "pistol-progression",
"name": "Kniebeugen / Pistol-Progression",
"sets": 4,
"repsLabel": "6–10",
"restSec": 90,
"type": "reps",
"primary": [
"oberschenkel",
"gesaess"
],
"secondary": [
"bauch",
"waden"
],
"description": "Tiefe beidbeinige Kniebeugen oder deine aktuelle Stufe Richtung Pistol Squat — je nachdem, wo du gerade stehst.",
"ast": "beine",
"stufe": 3,
"vorher": null,
"nachher": null
},
"glute-bridge": {
"id": "glute-bridge",
"name": "Glute Bridge",
"sets": 3,
"repsLabel": "12–15",
"restSec": 60,
"type": "reps",
"primary": [
"gesaess"
],
"secondary": [
"unterer_ruecken",
"oberschenkel"
],
"description": "Rückenlage, Füße aufgestellt, Hüfte kraftvoll nach oben drücken. Weckt das Gesäß und schützt den unteren Rücken.",
"ast": "beine",
"stufe": 2,
"vorher": null,
"nachher": null
},
"dragon-flag": {
"id": "dragon-flag",
"name": "Dragon Flag Progression",
"sets": 3,
"repsLabel": "3–5",
"restSec": 105,
"type": "reps",
"primary": [
"bauch"
],
"secondary": [
"unterer_ruecken",
"huefte"
],
"description": "Der Körper senkt sich als ein einziges Brett von der Schulter aus ab — Bruce Lees Übung. Rohe, kompromisslose Rumpfkraft.",
"ast": "skill",
"stufe": 3,
"vorher": null,
"nachher": null
},
"hollow-hold-mi": {
"id": "hollow-hold-mi",
"name": "Hollow Hold",
"sets": 3,
"repsLabel": "20–30 s",
"restSec": 60,
"type": "time",
"primary": [
"bauch"
],
"secondary": [
"huefte"
],
"description": "Die Bananen-Position: unterer Rücken fest am Boden, Beine und Schultern schweben. Das Fundament für jeden Skill, den du lernen willst.",
"ast": "rumpf",
"stufe": 2,
"vorher": null,
"nachher": null
},
"l-sit": {
"id": "l-sit",
"name": "L-Sit / Tuck L-Sit",
"sets": 3,
"repsLabel": "10–20 s",
"restSec": 60,
"type": "time",
"primary": [
"bauch",
"huefte"
],
"secondary": [
"trizeps",
"unterarme"
],
"description": "Im Stütz sitzen, Beine waagerecht nach vorn — oder angezogen als Tuck. Hüftbeuger, Bauch und Stützkraft in einer Übung.",
"ast": "skill",
"stufe": 3,
"vorher": null,
"nachher": null
},
"handstand-wand": {
"id": "handstand-wand",
"name": "Handstand an der Wand",
"sets": 5,
"repsLabel": "20–40 s",
"restSec": 90,
"type": "time",
"primary": [
"schultern"
],
"secondary": [
"trizeps",
"bauch",
"unterarme"
],
"description": "Kopfüber an der Wand Zeit sammeln. Hier lernen Schultern, Handgelenke und Kopf, die Position wirklich zu besitzen.",
"ast": "skill",
"stufe": 1,
"vorher": null,
"nachher": null
},
"planche-lean-do": {
"id": "planche-lean-do",
"name": "Planche Lean / Tuck Planche",
"sets": 4,
"repsLabel": "8–12 s",
"restSec": 120,
"type": "time",
"primary": [
"schultern",
"bauch"
],
"secondary": [
"unterarme",
"brust"
],
"description": "Weiter vorlehnen als am Montag — oder die Füße lösen und in den Tuck gehen. Der Skill-Tag gehört der Planche-Linie.",
"ast": "skill",
"stufe": 3,
"vorher": null,
"nachher": null
},
"frontlever-tuck-do": {
"id": "frontlever-tuck-do",
"name": "Front Lever Tuck",
"sets": 4,
"repsLabel": "8–12 s",
"restSec": 120,
"type": "time",
"primary": [
"lat",
"bauch"
],
"secondary": [
"oberer_ruecken",
"unterarme"
],
"description": "Die zweite Lever-Session der Woche — gleiche Position wie Dienstag, heute mit dem Ziel, die Knie einen Zentimeter weiter zu öffnen.",
"ast": "skill",
"stufe": 3,
"vorher": null,
"nachher": null
},
"muscleup-drills": {
"id": "muscleup-drills",
"name": "Muscle-up-Drills",
"sets": 3,
"repsLabel": "3",
"restSec": 120,
"type": "reps",
"primary": [
"lat",
"bizeps",
"trizeps"
],
"secondary": [
"schultern",
"bauch"
],
"description": "Explosive hohe Klimmzüge, Übergangs-Drills oder negative Muscle-ups — die Bausteine für den Moment, in dem du über die Stange kommst.",
"ast": "skill",
"stufe": 4,
"vorher": null,
"nachher": null
},
"hs-taps": {
"id": "hs-taps",
"name": "Handstand Schulter-Taps / Balance",
"sets": 3,
"repsLabel": "5–10 / Seite",
"restSec": 75,
"type": "reps",
"primary": [
"schultern",
"bauch"
],
"secondary": [
"unterarme",
"trapez"
],
"description": "Im Wand-Handstand das Gewicht auf eine Hand verlagern und die Schulter antippen. Baut die Balance für den freien Handstand.",
"ast": "skill",
"stufe": 2,
"vorher": null,
"nachher": null
},
"liegestuetze": {
"id": "liegestuetze",
"name": "Liegestütze (sauber)",
"sets": 4,
"repsLabel": "8–12",
"restSec": 90,
"type": "reps",
"primary": [
"brust",
"trizeps",
"schultern"
],
"secondary": [
"bauch"
],
"description": "Ohne Zusatzgewicht, dafür jede Wiederholung wie aus dem Lehrbuch. Hier sammelst du Volumen und Technik für den schweren Montag.",
"ast": "druck",
"stufe": 2,
"vorher": null,
"nachher": null
},
"diamond-fr": {
"id": "diamond-fr",
"name": "Diamond Push-ups",
"sets": 3,
"repsLabel": "8–12",
"restSec": 90,
"type": "reps",
"primary": [
"trizeps"
],
"secondary": [
"brust",
"schultern"
],
"description": "Die Diamant-Variante im leichteren Wiederholungsbereich — Trizeps-Volumen ohne die Montagsschwere.",
"ast": "druck",
"stufe": 2,
"vorher": null,
"nachher": null
},
"pullups-technik": {
"id": "pullups-technik",
"name": "Klimmzüge — Technik-Sätze",
"sets": 4,
"repsLabel": "2–4",
"restSec": 120,
"type": "reps",
"primary": [
"lat",
"bizeps",
"oberer_ruecken"
],
"secondary": [
"unterarme"
],
"description": "Weit weg vom Muskelversagen: kurze, perfekte Sätze. Frequenz baut Klimmzüge schneller auf als Erschöpfung.",
"ast": "zug",
"stufe": 2,
"vorher": null,
"nachher": null
},
"scapula-pullups": {
"id": "scapula-pullups",
"name": "Scapula Pull-ups",
"sets": 3,
"repsLabel": "6–8",
"restSec": 75,
"type": "reps",
"primary": [
"trapez",
"lat"
],
"secondary": [
"schultern"
],
"description": "Hängen mit gestreckten Armen, nur die Schulterblätter ziehen dich ein paar Zentimeter nach oben. Die unsichtbare Basis jedes starken Zugs.",
"ast": "zug",
"stufe": 2,
"vorher": null,
"nachher": null
},
"hollow-plank-fr": {
"id": "hollow-plank-fr",
"name": "Hollow Hold / Plank",
"sets": 3,
"repsLabel": "20–30 s",
"restSec": 60,
"type": "time",
"primary": [
"bauch"
],
"secondary": [
"schultern",
"huefte"
],
"description": "Wahlweise Hollow am Boden oder ein strammer Unterarm-Plank. Rumpfspannung zum Wochenausklang.",
"ast": "rumpf",
"stufe": 2,
"vorher": null,
"nachher": null
},
"hang-fr": {
"id": "hang-fr",
"name": "Towel Hang / Dead Hang",
"sets": 2,
"repsLabel": "20–30 s",
"restSec": 90,
"type": "time",
"primary": [
"unterarme",
"lat"
],
"secondary": [
"schultern"
],
"description": "Griffkraft-Abschluss der Woche — mit Handtuch für die Unterarme oder klassisch an der Stange zum Aushängen.",
"ast": "zug",
"stufe": 2,
"vorher": null,
"nachher": null
},
"jump-squats": {
"id": "jump-squats",
"name": "Jump Squats",
"sets": 4,
"repsLabel": "6",
"restSec": 120,
"type": "reps",
"primary": [
"oberschenkel",
"gesaess",
"waden"
],
"secondary": [
"bauch"
],
"description": "Tief absitzen und maximal explosiv abspringen. Sechs Sprünge mit voller Absicht — Schnellkraft, keine Ausdauer.",
"ast": "beine",
"stufe": 2,
"vorher": null,
"nachher": null
},
"bulgarian-split": {
"id": "bulgarian-split",
"name": "Bulgarian Split Squats",
"sets": 4,
"repsLabel": "8–10 / Seite",
"restSec": 90,
"type": "reps",
"primary": [
"oberschenkel",
"gesaess"
],
"secondary": [
"adduktoren",
"huefte"
],
"description": "Der hintere Fuß liegt erhöht — die schwerste einbeinige Kniebeuge vor dem Pistol. Kraft, Balance und Dehnung in einem.",
"ast": "beine",
"stufe": 2,
"vorher": null,
"nachher": null
},
"skater-jumps": {
"id": "skater-jumps",
"name": "Skater Jumps",
"sets": 3,
"repsLabel": "6–8 / Seite",
"restSec": 90,
"type": "reps",
"primary": [
"gesaess",
"oberschenkel",
"adduktoren"
],
"secondary": [
"waden"
],
"description": "Seitliche Sprünge von Bein zu Bein wie ein Eisschnellläufer. Trainiert seitliche Explosivität und stabile Landungen.",
"ast": "beine",
"stufe": 2,
"vorher": null,
"nachher": null
},
"sprints": {
"id": "sprints",
"name": "Sprints / Intervalle",
"sets": 6,
"repsLabel": "10–20 s",
"restSec": 120,
"type": "time",
"primary": [
"oberschenkel",
"gesaess",
"waden"
],
"secondary": [
"huefte",
"bauch"
],
"description": "Kurze, harte Läufe — nur so schnell, wie du sauber und kontrolliert bleibst. Qualität schlägt Tempo-Rekorde.",
"ast": "beine",
"stufe": 2,
"vorher": null,
"nachher": null
},
"wadenheben": {
"id": "wadenheben",
"name": "Wadenheben einbeinig",
"sets": 4,
"repsLabel": "12–20 / Seite",
"restSec": 60,
"type": "reps",
"primary": [
"waden"
],
"secondary": [],
"description": "Einbeinig auf einer Stufe: tief unter die Kante dehnen, hoch auf die Zehenspitze drücken. Volle Range für starke, belastbare Waden.",
"ast": "beine",
"stufe": 3,
"vorher": null,
"nachher": null
},
"tibialis-raises": {
"id": "tibialis-raises",
"name": "Tibialis Raises",
"sets": 3,
"repsLabel": "15–25",
"restSec": 50,
"type": "reps",
"primary": [
"waden"
],
"secondary": [],
"description": "Rücken an die Wand, Fersen bleiben stehen, Fußspitzen so hoch wie möglich anziehen. Schienbein-Schutz für Sprints und Sprünge.",
"ast": "beine",
"stufe": 2,
"vorher": null,
"nachher": null
},
"tiefe-hocke": {
"id": "tiefe-hocke",
"name": "Tiefe Hocke halten",
"sets": 1,
"repsLabel": "30–45 s",
"restSec": 90,
"type": "time",
"primary": [
"huefte",
"adduktoren"
],
"secondary": [
"waden"
],
"description": "Ganz unten in der Hocke ankommen und bleiben. Öffnet Hüfte und Sprunggelenke — die Mobilitäts-Versicherung des Beintags.",
"ast": "beine",
"stufe": 2,
"vorher": null,
"nachher": null
},
"sun-walk": {
"id": "sun-walk",
"name": "Spaziergang",
"sets": 1,
"repsLabel": "20–30 Min.",
"restSec": 90,
"type": "activity",
"primary": [
"oberschenkel"
],
"secondary": [],
"description": "Lockeres Gehen an der frischen Luft — Durchblutung ohne Belastung. Der unterschätzte Teil des Fortschritts.",
"ast": "erholung",
"stufe": 1,
"vorher": null,
"nachher": null
},
"sun-mobility": {
"id": "sun-mobility",
"name": "Leichte Ganzkörper-Mobilität",
"sets": 1,
"repsLabel": "10–15 Min.",
"restSec": 90,
"type": "activity",
"primary": [
"schultern"
],
"secondary": [],
"description": "Große, langsame Bewegungen durch alle Gelenke: Schultern, Wirbelsäule, Hüfte, Sprunggelenke.",
"ast": "erholung",
"stufe": 1,
"vorher": null,
"nachher": null
},
"sun-stretch": {
"id": "sun-stretch",
"name": "Sanftes Dehnen",
"sets": 1,
"repsLabel": "10 Min.",
"restSec": 90,
"type": "activity",
"primary": [
"huefte"
],
"secondary": [],
"description": "Lange, ruhige Dehnhaltungen ohne Ehrgeiz. Der Körper sortiert die Woche, du hältst nur die Positionen.",
"ast": "erholung",
"stufe": 1,
"vorher": null,
"nachher": null
},
"knie-liegestuetze": {
"id": "knie-liegestuetze",
"name": "Liegestütze auf den Knien",
"sets": 3,
"repsLabel": "8–12",
"restSec": 60,
"type": "reps",
"primary": [
"brust",
"trizeps"
],
"secondary": [
"schultern",
"bauch"
],
"description": "Der Einstieg ins Drucktraining. Die Knie tragen einen Teil des Gewichts, die Bewegung bleibt dieselbe — nur leichter.",
"easier": "Liegestütze an der Wand",
"harder": "Liegestütze",
"ast": "druck",
"stufe": 1,
"vorher": null,
"nachher": null
},
"erhoehte-liegestuetze": {
"id": "erhoehte-liegestuetze",
"name": "Erhöhte Liegestütze",
"sets": 3,
"repsLabel": "10–15",
"restSec": 60,
"type": "reps",
"primary": [
"brust",
"trizeps"
],
"secondary": [
"schultern",
"bauch"
],
"description": "Die Hände auf einer Bank oder Stufe. Je höher die Auflage, desto weniger Last — die sauberste Brücke zwischen Knien und Boden.",
"easier": "Liegestütze an der Wand",
"harder": "Liegestütze",
"ast": "druck",
"stufe": 1,
"vorher": null,
"nachher": null
},
"deficit-liegestuetze": {
"id": "deficit-liegestuetze",
"name": "Liegestütze mit Tiefgang",
"sets": 4,
"repsLabel": "6–10",
"restSec": 90,
"type": "reps",
"primary": [
"brust",
"trizeps"
],
"secondary": [
"schultern",
"saege"
],
"description": "Die Hände auf zwei Erhöhungen, die Brust sinkt tiefer als die Hände. Mehr Bewegungsumfang, mehr Dehnung unter Last.",
"easier": "Liegestütze",
"harder": "Tiefgang mit Zusatzgewicht",
"ast": "druck",
"stufe": 3,
"vorher": null,
"nachher": null
},
"archer-liegestuetze": {
"id": "archer-liegestuetze",
"name": "Archer Push-ups",
"sets": 4,
"repsLabel": "4–8 je Seite",
"restSec": 120,
"type": "reps",
"primary": [
"brust",
"trizeps"
],
"secondary": [
"schultern",
"bauch"
],
"description": "Ein Arm beugt, der andere streckt sich zur Seite. Die Last wandert fast vollständig auf eine Seite — die Vorstufe zum einarmigen Liegestütz.",
"easier": "Breite Liegestütze",
"harder": "Einarmige Liegestütze",
"ast": "druck",
"stufe": 3,
"vorher": "breite-liegestuetze",
"nachher": null
},
"einarm-liegestuetz": {
"id": "einarm-liegestuetz",
"name": "Einarmiger Liegestütz",
"sets": 5,
"repsLabel": "2–5 je Seite",
"restSec": 180,
"type": "reps",
"primary": [
"brust",
"trizeps"
],
"secondary": [
"bauch",
"schultern",
"saege"
],
"description": "Der Maßstab für Druckkraft im Calisthenics. Ein Arm trägt alles, der Rumpf verhindert das Verdrehen.",
"easier": "Archer Push-ups",
"harder": "Einarmig erhöht auf Zeit",
"ast": "druck",
"stufe": 4,
"vorher": "archer-liegestuetze",
"nachher": null
},
"breite-liegestuetze": {
"id": "breite-liegestuetze",
"name": "Breite Liegestütze",
"sets": 3,
"repsLabel": "10–15",
"restSec": 75,
"type": "reps",
"primary": [
"brust"
],
"secondary": [
"schultern",
"trizeps"
],
"description": "Die Hände deutlich außerhalb der Schultern. Der Trizeps tritt zurück, die Brust übernimmt.",
"easier": "Erhöhte breite Liegestütze",
"harder": "Breite Liegestütze mit Gewicht",
"ast": "druck",
"stufe": 2,
"vorher": null,
"nachher": null
},
"hindu-liegestuetze": {
"id": "hindu-liegestuetze",
"name": "Hindu Push-ups",
"sets": 3,
"repsLabel": "8–12",
"restSec": 75,
"type": "reps",
"primary": [
"schultern",
"brust"
],
"secondary": [
"trizeps",
"unterer_ruecken"
],
"description": "Eine fließende Bewegung vom Hundeblick nach unten in die Kobra. Kraft und Beweglichkeit für die Schulter in einem.",
"easier": "Hundeblick nach unten",
"harder": "Dive Bomber",
"ast": "druck",
"stufe": 2,
"vorher": null,
"nachher": null
},
"pseudo-planche-pushups": {
"id": "pseudo-planche-pushups",
"name": "Pseudo-Planche Push-ups",
"sets": 4,
"repsLabel": "5–10",
"restSec": 120,
"type": "reps",
"primary": [
"schultern",
"brust"
],
"secondary": [
"trizeps",
"bauch",
"saege"
],
"description": "Die Hände liegen auf Hüfthöhe, die Schultern schieben weit über die Hände hinaus. Die direkteste Vorbereitung auf die Planche.",
"easier": "Planche Lean",
"harder": "Tuck Planche Push-ups",
"ast": "skill",
"stufe": 2,
"vorher": "planche-lean-mo",
"nachher": null
},
"dips-barren": {
"id": "dips-barren",
"name": "Dips am Barren",
"sets": 4,
"repsLabel": "6–12",
"restSec": 120,
"type": "reps",
"primary": [
"brust",
"trizeps"
],
"secondary": [
"schultern"
],
"description": "Die schwerste Grundübung für den Druck nach unten. Zwischen zwei Holmen absenken und wieder hochdrücken.",
"easier": "Bank-Dips",
"harder": "Gewichtete Dips",
"ast": "druck",
"stufe": 2,
"vorher": "bank-dips",
"nachher": "gew-dips"
},
"bank-dips": {
"id": "bank-dips",
"name": "Bank-Dips",
"sets": 3,
"repsLabel": "10–15",
"restSec": 60,
"type": "reps",
"primary": [
"trizeps"
],
"secondary": [
"brust",
"schultern"
],
"description": "Die Hände hinter dem Körper auf einer Bank, die Füße vorne am Boden. Der Einstieg in die Dip-Bewegung.",
"easier": "Bank-Dips mit angewinkelten Beinen",
"harder": "Dips am Barren",
"ast": "druck",
"stufe": 1,
"vorher": null,
"nachher": "dips-barren"
},
"gew-dips": {
"id": "gew-dips",
"name": "Gewichtete Dips",
"sets": 5,
"repsLabel": "3–6",
"restSec": 180,
"type": "reps",
"primary": [
"brust",
"trizeps"
],
"secondary": [
"schultern"
],
"description": "Dips mit Zusatzgewicht am Gürtel. Hier wird reine Maximalkraft für den Oberkörper gebaut.",
"easier": "Dips am Barren",
"harder": "Ring-Dips mit Gewicht",
"ast": "druck",
"stufe": 4,
"vorher": "dips-barren",
"nachher": null
},
"ring-dips": {
"id": "ring-dips",
"name": "Ring-Dips",
"sets": 4,
"repsLabel": "4–8",
"restSec": 150,
"type": "reps",
"primary": [
"brust",
"trizeps"
],
"secondary": [
"schultern",
"rotatoren",
"bauch"
],
"description": "Dips an Ringen. Die Ringe wackeln, jeder stabilisierende Muskel arbeitet mit — deutlich schwerer als am festen Barren.",
"easier": "Dips am Barren",
"harder": "Ring-Dips mit Gewicht",
"ast": "druck",
"stufe": 2,
"vorher": "dips-barren",
"nachher": null
},
"handstand-pushup-wand": {
"id": "handstand-pushup-wand",
"name": "Handstand-Liegestütz an der Wand",
"sets": 4,
"repsLabel": "3–8",
"restSec": 180,
"type": "reps",
"primary": [
"schultern",
"trizeps"
],
"secondary": [
"bauch",
"trapez"
],
"description": "Kopfüber an der Wand drücken. Die stärkste Schulterübung im Calisthenics ohne Geräte.",
"easier": "Pike Push-ups erhöht",
"harder": "Freier Handstand-Liegestütz",
"ast": "skill",
"stufe": 1,
"vorher": null,
"nachher": null
},
"erhoehte-pike-pushups": {
"id": "erhoehte-pike-pushups",
"name": "Erhöhte Pike Push-ups",
"sets": 4,
"repsLabel": "6–10",
"restSec": 90,
"type": "reps",
"primary": [
"schultern"
],
"secondary": [
"trizeps",
"trapez"
],
"description": "Pike Push-ups mit den Füßen auf einer Erhöhung. Je höher, desto senkrechter — und desto näher am Handstand-Liegestütz.",
"easier": "Pike Push-ups",
"harder": "Handstand-Liegestütz an der Wand",
"ast": "druck",
"stufe": 1,
"vorher": "pike-pushups",
"nachher": "handstand-pushup-wand"
},
"trizeps-extension": {
"id": "trizeps-extension",
"name": "Trizeps-Strecken am Boden",
"sets": 3,
"repsLabel": "8–12",
"restSec": 90,
"type": "reps",
"primary": [
"trizeps"
],
"secondary": [
"schultern",
"bauch"
],
"description": "Aus dem Liegestütz die Unterarme ablegen und allein mit dem Trizeps zurückdrücken. Isoliert und hart.",
"easier": "Trizeps-Strecken an der Wand",
"harder": "Trizeps-Strecken an Ringen",
"ast": "druck",
"stufe": 2,
"vorher": null,
"nachher": null
},
"australian-pullups": {
"id": "australian-pullups",
"name": "Australian Pull-ups",
"sets": 3,
"repsLabel": "8–15",
"restSec": 75,
"type": "reps",
"primary": [
"oberer_ruecken",
"lat"
],
"secondary": [
"bizeps",
"unterarme"
],
"description": "Waagerechtes Ziehen an einer tiefen Stange, die Füße am Boden. Der beste Einstieg ins Zugtraining.",
"easier": "Australian Pull-ups schräg",
"harder": "Australian Pull-ups mit erhöhten Füßen",
"ast": "zug",
"stufe": 1,
"vorher": null,
"nachher": null
},
"breite-klimmzuege": {
"id": "breite-klimmzuege",
"name": "Breite Klimmzüge",
"sets": 4,
"repsLabel": "5–10",
"restSec": 150,
"type": "reps",
"primary": [
"lat",
"oberer_ruecken"
],
"secondary": [
"bizeps",
"unterarme"
],
"description": "Klimmzüge mit weitem Griff. Der Bizeps tritt zurück, der Latissimus übernimmt die Hauptarbeit.",
"easier": "Klimmzüge",
"harder": "Gewichtete breite Klimmzüge",
"ast": "zug",
"stufe": 2,
"vorher": "klimmzuege",
"nachher": null
},
"chinups": {
"id": "chinups",
"name": "Chin-ups (Untergriff)",
"sets": 4,
"repsLabel": "6–12",
"restSec": 120,
"type": "reps",
"primary": [
"bizeps",
"lat"
],
"secondary": [
"oberer_ruecken",
"unterarme"
],
"description": "Klimmzüge im Untergriff. Der Bizeps arbeitet deutlich stärker mit — meist schafft man mehr als im Obergriff.",
"easier": "Negative Chin-ups",
"harder": "Gewichtete Chin-ups",
"ast": "zug",
"stufe": 2,
"vorher": null,
"nachher": null
},
"gew-klimmzuege": {
"id": "gew-klimmzuege",
"name": "Gewichtete Klimmzüge",
"sets": 5,
"repsLabel": "3–5",
"restSec": 180,
"type": "reps",
"primary": [
"lat",
"oberer_ruecken"
],
"secondary": [
"bizeps",
"unterarme"
],
"description": "Klimmzüge mit Zusatzgewicht. Der direkteste Weg zu mehr Maximalkraft im Zug.",
"easier": "Klimmzüge",
"harder": "Einarmige Klimmzug-Progression",
"ast": "zug",
"stufe": 4,
"vorher": "klimmzuege",
"nachher": "einarm-klimmzug-prog"
},
"archer-klimmzuege": {
"id": "archer-klimmzuege",
"name": "Archer Pull-ups",
"sets": 4,
"repsLabel": "3–6 je Seite",
"restSec": 150,
"type": "reps",
"primary": [
"lat",
"oberer_ruecken"
],
"secondary": [
"bizeps",
"unterarme"
],
"description": "Zu einer Seite hochziehen, der andere Arm bleibt gestreckt. Die Vorstufe zum einarmigen Klimmzug.",
"easier": "Breite Klimmzüge",
"harder": "Einarmige Klimmzug-Progression",
"ast": "zug",
"stufe": 3,
"vorher": "breite-klimmzuege",
"nachher": "einarm-klimmzug-prog"
},
"einarm-klimmzug-prog": {
"id": "einarm-klimmzug-prog",
"name": "Einarmige Klimmzug-Progression",
"sets": 5,
"repsLabel": "1–3 je Seite",
"restSec": 240,
"type": "reps",
"primary": [
"lat",
"bizeps"
],
"secondary": [
"oberer_ruecken",
"unterarme",
"bauch"
],
"description": "Ein Arm an der Stange, die freie Hand greift das eigene Handgelenk oder ein Band. Die Königsdisziplin des Zugtrainings.",
"easier": "Archer Pull-ups",
"harder": "Freier einarmiger Klimmzug",
"ast": "zug",
"stufe": 4,
"vorher": "archer-klimmzuege",
"nachher": null
},
"frontlever-advanced-tuck": {
"id": "frontlever-advanced-tuck",
"name": "Front Lever — offene Hocke",
"sets": 4,
"repsLabel": "8–15 s",
"restSec": 150,
"type": "time",
"primary": [
"lat",
"bauch"
],
"secondary": [
"oberer_ruecken",
"unterer_ruecken",
"saege"
],
"description": "Die Hocke aus dem Front Lever öffnet sich, der Oberschenkel steht waagerecht. Die Zwischenstufe zum gestreckten Front Lever.",
"easier": "Front Lever in der Hocke",
"harder": "Front Lever einbeinig",
"ast": "skill",
"stufe": 4,
"vorher": null,
"nachher": "frontlever-einbeinig"
},
"frontlever-einbeinig": {
"id": "frontlever-einbeinig",
"name": "Front Lever einbeinig",
"sets": 4,
"repsLabel": "6–12 s je Seite",
"restSec": 180,
"type": "time",
"primary": [
"lat",
"bauch"
],
"secondary": [
"oberer_ruecken",
"unterer_ruecken",
"gesaess"
],
"description": "Ein Bein gestreckt, eines angehockt. Der letzte Schritt vor dem vollen Front Lever.",
"easier": "Front Lever offene Hocke",
"harder": "Front Lever gestreckt",
"ast": "skill",
"stufe": 3,
"vorher": "frontlever-advanced-tuck",
"nachher": "frontlever-voll"
},
"frontlever-voll": {
"id": "frontlever-voll",
"name": "Front Lever gestreckt",
"sets": 5,
"repsLabel": "3–10 s",
"restSec": 240,
"type": "time",
"primary": [
"lat",
"bauch"
],
"secondary": [
"oberer_ruecken",
"unterer_ruecken",
"gesaess",
"saege"
],
"description": "Waagerecht unter der Stange hängen, der Körper ein Brett. Eine der schwersten statischen Übungen überhaupt.",
"easier": "Front Lever einbeinig",
"harder": "Front Lever Pull-ups",
"ast": "skill",
"stufe": 4,
"vorher": "frontlever-einbeinig",
"nachher": null
},
"backlever-tuck": {
"id": "backlever-tuck",
"name": "Back Lever in der Hocke",
"sets": 4,
"repsLabel": "10–20 s",
"restSec": 150,
"type": "time",
"primary": [
"brust",
"schultern"
],
"secondary": [
"unterer_ruecken",
"bizeps",
"lat"
],
"description": "Mit dem Rücken zum Boden waagerecht hängen, Knie angezogen. Öffnet Brust und Schulter unter Last.",
"easier": "Skin the Cat",
"harder": "Back Lever gestreckt",
"ast": "skill",
"stufe": 3,
"vorher": "skin-the-cat",
"nachher": null
},
"skin-the-cat": {
"id": "skin-the-cat",
"name": "Skin the Cat",
"sets": 3,
"repsLabel": "5–8",
"restSec": 120,
"type": "reps",
"primary": [
"schultern",
"lat"
],
"secondary": [
"bauch",
"brust",
"rotatoren"
],
"description": "An Ringen rückwärts durch die Arme rollen und zurück. Die beste Übung für Schulterbeweglichkeit unter Last.",
"easier": "German Hang",
"harder": "Skin the Cat mit Halt",
"ast": "druck",
"stufe": 2,
"vorher": "german-hang",
"nachher": null
},
"german-hang": {
"id": "german-hang",
"name": "German Hang",
"sets": 3,
"repsLabel": "20–40 s",
"restSec": 90,
"type": "time",
"primary": [
"schultern"
],
"secondary": [
"brust",
"bizeps",
"lat"
],
"description": "Rückwärts hinter dem Körper hängen. Dehnt die Schulter in die Streckung — Vorbereitung für Back Lever und Muscle-up.",
"easier": "Passiver Hang",
"harder": "Skin the Cat",
"ast": "druck",
"stufe": 2,
"vorher": null,
"nachher": "skin-the-cat"
},
"ruderzug-ringe": {
"id": "ruderzug-ringe",
"name": "Ruderzug an Ringen",
"sets": 4,
"repsLabel": "8–12",
"restSec": 90,
"type": "reps",
"primary": [
"oberer_ruecken",
"lat"
],
"secondary": [
"bizeps",
"trapez",
"rotatoren"
],
"description": "Waagerechtes Ziehen an Ringen. Die Ringe erlauben eine natürliche Drehung — schonender für Ellbogen und Schulter als eine feste Stange.",
"easier": "Australian Pull-ups",
"harder": "Ruderzug einarmig",
"ast": "zug",
"stufe": 2,
"vorher": "australian-pullups",
"nachher": null
},
"face-pulls-band": {
"id": "face-pulls-band",
"name": "Face Pulls mit Band",
"sets": 3,
"repsLabel": "12–20",
"restSec": 60,
"type": "reps",
"primary": [
"oberer_ruecken",
"rotatoren"
],
"secondary": [
"schultern",
"trapez"
],
"description": "Ein Band auf Gesichtshöhe zum Kopf ziehen, Ellbogen hoch. Die wichtigste Ausgleichsübung gegen zu viel Drücken.",
"easier": "Schulterblatt-Zusammenziehen",
"harder": "Face Pulls einarmig",
"ast": "zug",
"stufe": 2,
"vorher": null,
"nachher": null
},
"bizeps-curls-ringe": {
"id": "bizeps-curls-ringe",
"name": "Bizeps-Curls an Ringen",
"sets": 3,
"repsLabel": "8–12",
"restSec": 90,
"type": "reps",
"primary": [
"bizeps"
],
"secondary": [
"unterarme",
"oberer_ruecken"
],
"description": "Zurückgelehnt an Ringen hängen und nur über die Ellbogen hochziehen. Isolation für den Bizeps ohne Hanteln.",
"easier": "Bizeps-Curls steil",
"harder": "Bizeps-Curls waagerecht",
"ast": "zug",
"stufe": 2,
"vorher": null,
"nachher": null
},
"hangeln": {
"id": "hangeln",
"name": "Hangeln",
"sets": 3,
"repsLabel": "20–40 s",
"restSec": 90,
"type": "time",
"primary": [
"unterarme",
"lat"
],
"secondary": [
"oberer_ruecken",
"bauch",
"schultern"
],
"description": "Von Griff zu Griff weiterhangeln. Griffkraft, Schulterstabilität und Rumpfspannung in Bewegung.",
"easier": "Aktiver Hang",
"harder": "Hangeln mit Gewicht",
"ast": "zug",
"stufe": 2,
"vorher": null,
"nachher": null
},
"handtuch-klimmzuege": {
"id": "handtuch-klimmzuege",
"name": "Handtuch-Klimmzüge",
"sets": 4,
"repsLabel": "4–8",
"restSec": 150,
"type": "reps",
"primary": [
"unterarme",
"lat"
],
"secondary": [
"bizeps",
"oberer_ruecken"
],
"description": "Zwei Handtücher über die Stange, daran hochziehen. Die Griffkraft wird zum begrenzenden Faktor.",
"easier": "Handtuch-Hang",
"harder": "Einarmiger Handtuch-Hang",
"ast": "zug",
"stufe": 2,
"vorher": null,
"nachher": null
},
"kniebeuge": {
"id": "kniebeuge",
"name": "Kniebeuge",
"sets": 3,
"repsLabel": "15–25",
"restSec": 75,
"type": "reps",
"primary": [
"oberschenkel",
"gesaess"
],
"secondary": [
"waden",
"bauch",
"adduktoren"
],
"description": "Die Grundbewegung für die Beine. Ohne Gewicht, dafür sauber und tief.",
"easier": "Kniebeuge zum Stuhl",
"harder": "Sprungkniebeuge",
"ast": "beine",
"stufe": 1,
"vorher": null,
"nachher": null
},
"sissy-squat": {
"id": "sissy-squat",
"name": "Sissy Squat",
"sets": 3,
"repsLabel": "8–15",
"restSec": 90,
"type": "reps",
"primary": [
"oberschenkel"
],
"secondary": [
"bauch",
"huefte"
],
"description": "Die Knie nach vorne schieben, der Oberkörper kippt zurück — eine Linie von den Knien zum Kopf. Trifft den vorderen Oberschenkel wie nichts sonst.",
"easier": "Sissy Squat mit Halt",
"harder": "Freier Sissy Squat",
"ast": "beine",
"stufe": 2,
"vorher": null,
"nachher": null
},
"nordic-curl": {
"id": "nordic-curl",
"name": "Nordic Hamstring Curl",
"sets": 3,
"repsLabel": "4–8",
"restSec": 150,
"type": "reps",
"primary": [
"oberschenkel"
],
"secondary": [
"gesaess",
"unterer_ruecken"
],
"description": "Die Füße fixiert, aus dem Kniestand langsam nach vorne sinken und wieder hoch. Die härteste Übung für die Beinrückseite ohne Geräte.",
"easier": "Nordic Curl mit Band",
"harder": "Nordic Curl ohne Abfangen",
"ast": "beine",
"stufe": 3,
"vorher": null,
"nachher": null
},
"einbeiniges-kreuzheben": {
"id": "einbeiniges-kreuzheben",
"name": "Einbeiniges Kreuzheben",
"sets": 3,
"repsLabel": "8–12 je Seite",
"restSec": 75,
"type": "reps",
"primary": [
"gesaess",
"oberschenkel"
],
"secondary": [
"unterer_ruecken",
"bauch"
],
"description": "Auf einem Bein stehend nach vorne kippen, das freie Bein geht nach hinten. Gesäß, Beinrückseite und Gleichgewicht in einem.",
"easier": "Kreuzheben beidbeinig",
"harder": "Einbeiniges Kreuzheben mit Gewicht",
"ast": "beine",
"stufe": 3,
"vorher": null,
"nachher": null
},
"step-ups": {
"id": "step-ups",
"name": "Step-ups",
"sets": 3,
"repsLabel": "10–15 je Seite",
"restSec": 75,
"type": "reps",
"primary": [
"oberschenkel",
"gesaess"
],
"secondary": [
"waden",
"bauch"
],
"description": "Auf eine Bank oder Stufe steigen, kontrolliert wieder herunter. Einfach, wirksam und gelenkschonend.",
"easier": "Niedrige Step-ups",
"harder": "Step-ups mit Gewicht",
"ast": "beine",
"stufe": 2,
"vorher": null,
"nachher": null
},
"wandsitzen": {
"id": "wandsitzen",
"name": "Wandsitzen",
"sets": 3,
"repsLabel": "30–60 s",
"restSec": 90,
"type": "time",
"primary": [
"oberschenkel"
],
"secondary": [
"gesaess",
"waden"
],
"description": "Mit dem Rücken an der Wand in der Hocke sitzen. Reine Haltearbeit für den vorderen Oberschenkel.",
"easier": "Wandsitzen höher",
"harder": "Einbeiniges Wandsitzen",
"ast": "beine",
"stufe": 1,
"vorher": null,
"nachher": null
},
"ausfallschritte": {
"id": "ausfallschritte",
"name": "Ausfallschritte",
"sets": 3,
"repsLabel": "10–14 je Seite",
"restSec": 75,
"type": "reps",
"primary": [
"oberschenkel",
"gesaess"
],
"secondary": [
"adduktoren",
"bauch",
"waden"
],
"description": "Ein großer Schritt nach vorne, das hintere Knie sinkt zum Boden. Beine einzeln belasten, ohne Gleichgewichtskunst.",
"easier": "Ausfallschritte im Stand",
"harder": "Springende Ausfallschritte",
"ast": "beine",
"stufe": 2,
"vorher": null,
"nachher": null
},
"shrimp-squat": {
"id": "shrimp-squat",
"name": "Shrimp Squat",
"sets": 4,
"repsLabel": "3–8 je Seite",
"restSec": 150,
"type": "reps",
"primary": [
"oberschenkel",
"gesaess"
],
"secondary": [
"bauch",
"waden"
],
"description": "Einbeinige Kniebeuge, das hintere Bein wird mit der Hand gehalten. Schwerer als der Pistol, weil das Gegengewicht fehlt.",
"easier": "Bulgarian Split Squats",
"harder": "Shrimp Squat mit Gewicht",
"ast": "beine",
"stufe": 3,
"vorher": "bulgarian-split",
"nachher": null
},
"cossack-squat": {
"id": "cossack-squat",
"name": "Cossack Squat",
"sets": 3,
"repsLabel": "6–10 je Seite",
"restSec": 90,
"type": "reps",
"primary": [
"adduktoren",
"oberschenkel"
],
"secondary": [
"gesaess",
"huefte"
],
"description": "Seitliche Kniebeuge — auf einem Bein tief, das andere gestreckt zur Seite. Kraft und Beweglichkeit für die Innenseite.",
"easier": "Seitlicher Ausfallschritt",
"harder": "Cossack Squat mit Gewicht",
"ast": "beine",
"stufe": 2,
"vorher": null,
"nachher": null
},
"waden-stufe": {
"id": "waden-stufe",
"name": "Wadenheben an der Stufe",
"sets": 4,
"repsLabel": "12–20",
"restSec": 60,
"type": "reps",
"primary": [
"waden"
],
"secondary": [],
"description": "Auf einer Stufe stehen, die Fersen sinken tief unter die Kante. Voller Bewegungsumfang für die Wade.",
"easier": "Wadenheben am Boden",
"harder": "Einbeiniges Wadenheben an der Stufe",
"ast": "beine",
"stufe": 2,
"vorher": null,
"nachher": null
},
"plank": {
"id": "plank",
"name": "Unterarmstütz",
"sets": 3,
"repsLabel": "30–60 s",
"restSec": 60,
"type": "time",
"primary": [
"bauch"
],
"secondary": [
"schultern",
"gesaess",
"unterer_ruecken"
],
"description": "Die Grundhaltung für den Rumpf. Auf Unterarmen und Zehen, der Körper eine Linie.",
"easier": "Unterarmstütz auf den Knien",
"harder": "Unterarmstütz mit Beinheben",
"ast": "rumpf",
"stufe": 2,
"vorher": null,
"nachher": null
},
"seitstuetz": {
"id": "seitstuetz",
"name": "Seitstütz",
"sets": 3,
"repsLabel": "20–45 s je Seite",
"restSec": 60,
"type": "time",
"primary": [
"bauch",
"saege"
],
"secondary": [
"schultern",
"gesaess"
],
"description": "Auf einem Unterarm seitlich stützen. Trifft die seitliche Bauchmuskulatur, die beim geraden Stütz kaum arbeitet.",
"easier": "Seitstütz auf den Knien",
"harder": "Seitstütz mit Beinheben",
"ast": "rumpf",
"stufe": 2,
"vorher": null,
"nachher": null
},
"beinheben-haengend": {
"id": "beinheben-haengend",
"name": "Hängendes Beinheben",
"sets": 4,
"repsLabel": "8–15",
"restSec": 90,
"type": "reps",
"primary": [
"bauch",
"huefte"
],
"secondary": [
"unterarme",
"lat"
],
"description": "An der Stange hängen und die gestreckten Beine anheben. Die stärkste Bauchübung im Calisthenics.",
"easier": "Hängendes Knieheben",
"harder": "Toes to Bar",
"ast": "rumpf",
"stufe": 2,
"vorher": null,
"nachher": "toes-to-bar"
},
"toes-to-bar": {
"id": "toes-to-bar",
"name": "Toes to Bar",
"sets": 4,
"repsLabel": "5–12",
"restSec": 120,
"type": "reps",
"primary": [
"bauch",
"huefte"
],
"secondary": [
"lat",
"unterarme"
],
"description": "Hängend die Zehen bis zur Stange führen. Verlangt Bauchkraft und Beweglichkeit in der Beinrückseite.",
"easier": "Hängendes Beinheben",
"harder": "Toes to Bar langsam",
"ast": "rumpf",
"stufe": 2,
"vorher": "beinheben-haengend",
"nachher": null
},
"ab-rollout": {
"id": "ab-rollout",
"name": "Ab Rollout",
"sets": 3,
"repsLabel": "6–12",
"restSec": 120,
"type": "reps",
"primary": [
"bauch"
],
"secondary": [
"lat",
"schultern",
"unterer_ruecken"
],
"description": "Mit einem Rad oder Handtüchern nach vorne ausrollen und zurückziehen. Der Rumpf arbeitet gegen die Streckung.",
"easier": "Rollout an der Wand",
"harder": "Rollout aus dem Stand",
"ast": "rumpf",
"stufe": 2,
"vorher": null,
"nachher": null
},
"russian-twist": {
"id": "russian-twist",
"name": "Russian Twist",
"sets": 3,
"repsLabel": "20–30",
"restSec": 60,
"type": "reps",
"primary": [
"bauch",
"saege"
],
"secondary": [
"huefte"
],
"description": "Zurückgelehnt sitzen und den Oberkörper von Seite zu Seite drehen. Für die Rotation, die beim geraden Training fehlt.",
"easier": "Russian Twist mit Bodenkontakt",
"harder": "Russian Twist mit Gewicht",
"ast": "rumpf",
"stufe": 2,
"vorher": null,
"nachher": null
},
"hollow-rock": {
"id": "hollow-rock",
"name": "Hollow Rock",
"sets": 3,
"repsLabel": "15–25",
"restSec": 75,
"type": "reps",
"primary": [
"bauch"
],
"secondary": [
"huefte",
"oberschenkel"
],
"description": "Aus der Hollow-Position vor und zurück schaukeln. Hält die Spannung in Bewegung — die Vorstufe zu allen Skills.",
"easier": "Hollow Hold",
"harder": "Hollow Rock gestreckt",
"ast": "rumpf",
"stufe": 2,
"vorher": "hollow-hold-mi",
"nachher": null
},
"superman-hold": {
"id": "superman-hold",
"name": "Superman Hold",
"sets": 3,
"repsLabel": "20–40 s",
"restSec": 60,
"type": "time",
"primary": [
"unterer_ruecken",
"gesaess"
],
"secondary": [
"oberer_ruecken",
"schultern"
],
"description": "Auf dem Bauch liegend Arme und Beine anheben. Das Gegenstück zum Hollow Hold — für die Rückseite.",
"easier": "Superman einarmig",
"harder": "Superman mit Bewegung",
"ast": "beine",
"stufe": 2,
"vorher": null,
"nachher": null
},
"bird-dog": {
"id": "bird-dog",
"name": "Bird Dog",
"sets": 3,
"repsLabel": "8–12 je Seite",
"restSec": 45,
"type": "reps",
"primary": [
"unterer_ruecken",
"bauch"
],
"secondary": [
"gesaess",
"schultern"
],
"description": "Im Vierfüßlerstand Arm und Gegenbein strecken. Ruhige Stabilisierungsarbeit für die Wirbelsäule.",
"easier": "Nur Arm oder nur Bein",
"harder": "Bird Dog mit Zusammenführen",
"ast": "rumpf",
"stufe": 2,
"vorher": null,
"nachher": null
},
"dead-bug": {
"id": "dead-bug",
"name": "Dead Bug",
"sets": 3,
"repsLabel": "10–16 je Seite",
"restSec": 45,
"type": "reps",
"primary": [
"bauch"
],
"secondary": [
"huefte"
],
"description": "Auf dem Rücken Arm und Gegenbein absenken, ohne dass der Rücken abhebt. Bauchtraining ohne Belastung für den Nacken.",
"easier": "Dead Bug nur Beine",
"harder": "Dead Bug gestreckt",
"ast": "rumpf",
"stufe": 2,
"vorher": null,
"nachher": null
},
"l-sit-barren": {
"id": "l-sit-barren",
"name": "L-Sit am Barren",
"sets": 4,
"repsLabel": "10–25 s",
"restSec": 120,
"type": "time",
"primary": [
"bauch",
"huefte"
],
"secondary": [
"trizeps",
"schultern",
"oberschenkel"
],
"description": "Auf zwei Holmen gestützt die gestreckten Beine waagerecht halten. Mehr Raum als am Boden, dafür mehr Haltearbeit.",
"easier": "Tuck L-Sit",
"harder": "V-Sit",
"ast": "skill",
"stufe": 2,
"vorher": null,
"nachher": null
},
"handstand-frei": {
"id": "handstand-frei",
"name": "Freier Handstand",
"sets": 5,
"repsLabel": "10–30 s",
"restSec": 120,
"type": "time",
"primary": [
"schultern",
"bauch"
],
"secondary": [
"trizeps",
"unterarme",
"trapez"
],
"description": "Ohne Wand auf den Händen stehen. Ein Gleichgewichtsskill, der über Monate wächst — nicht über Kraft allein.",
"easier": "Handstand an der Wand",
"harder": "Freier Handstand-Liegestütz",
"ast": "skill",
"stufe": 2,
"vorher": "handstand-wand",
"nachher": null
},
"crow-pose": {
"id": "crow-pose",
"name": "Krähe",
"sets": 4,
"repsLabel": "10–30 s",
"restSec": 90,
"type": "time",
"primary": [
"schultern",
"bauch"
],
"secondary": [
"trizeps",
"unterarme",
"brust"
],
"description": "Die Knie auf den Oberarmen abgelegt, die Füße frei. Der erste Balanceskill, den fast jeder in wenigen Wochen lernt.",
"easier": "Krähe mit einem Fuß am Boden",
"harder": "Krähe mit gestreckten Armen",
"ast": "skill",
"stufe": 2,
"vorher": null,
"nachher": null
},
"tuck-planche": {
"id": "tuck-planche",
"name": "Tuck Planche",
"sets": 5,
"repsLabel": "8–20 s",
"restSec": 180,
"type": "time",
"primary": [
"schultern",
"saege"
],
"secondary": [
"bauch",
"brust",
"unterarme"
],
"description": "Auf den Händen balancieren, Knie angezogen, Füße frei — ohne dass die Knie auf den Armen liegen. Die erste echte Planche-Stufe.",
"easier": "Krähe",
"harder": "Advanced Tuck Planche",
"ast": "skill",
"stufe": 3,
"vorher": "crow-pose",
"nachher": "advanced-tuck-planche"
},
"advanced-tuck-planche": {
"id": "advanced-tuck-planche",
"name": "Advanced Tuck Planche",
"sets": 5,
"repsLabel": "5–15 s",
"restSec": 180,
"type": "time",
"primary": [
"schultern",
"saege"
],
"secondary": [
"bauch",
"brust",
"unterer_ruecken"
],
"description": "Die Tuck Planche mit flachem Rücken und geöffneter Hüfte. Der Hebel wird deutlich länger.",
"easier": "Tuck Planche",
"harder": "Straddle Planche",
"ast": "skill",
"stufe": 4,
"vorher": "tuck-planche",
"nachher": null
},
"handstand-negativ": {
"id": "handstand-negativ",
"name": "Handstand-Liegestütz negativ",
"sets": 4,
"repsLabel": "3–6",
"restSec": 150,
"type": "reps",
"primary": [
"schultern",
"trizeps"
],
"secondary": [
"bauch",
"trapez"
],
"description": "Aus dem Handstand an der Wand langsam absenken, dann wieder hochsteigen. Der Weg zum vollen Handstand-Liegestütz.",
"easier": "Erhöhte Pike Push-ups",
"harder": "Handstand-Liegestütz an der Wand",
"ast": "skill",
"stufe": 3,
"vorher": "erhoehte-pike-pushups",
"nachher": "handstand-pushup-wand"
},
"muscleup-bar": {
"id": "muscleup-bar",
"name": "Muscle-up an der Stange",
"sets": 5,
"repsLabel": "1–5",
"restSec": 240,
"type": "reps",
"primary": [
"lat",
"brust",
"trizeps"
],
"secondary": [
"oberer_ruecken",
"bauch",
"unterarme"
],
"description": "Vom Hang über die Stange drücken — Klimmzug und Dip in einer Bewegung. Der bekannteste Meilenstein im Calisthenics.",
"easier": "Muscle-up-Drills",
"harder": "Langsamer Muscle-up",
"ast": "skill",
"stufe": 4,
"vorher": "muscleup-drills",
"nachher": null
},
"ring-muscleup": {
"id": "ring-muscleup",
"name": "Muscle-up an Ringen",
"sets": 5,
"repsLabel": "1–4",
"restSec": 240,
"type": "reps",
"primary": [
"lat",
"brust",
"trizeps"
],
"secondary": [
"rotatoren",
"bauch",
"unterarme"
],
"description": "Der Muscle-up an Ringen. Die Ringe drehen sich mit, dafür muss jeder stabilisierende Muskel arbeiten.",
"easier": "Muscle-up an der Stange",
"harder": "Langsamer Ring-Muscle-up",
"ast": "skill",
"stufe": 4,
"vorher": "muscleup-bar",
"nachher": null
},
"human-flag-prog": {
"id": "human-flag-prog",
"name": "Human Flag Progression",
"sets": 4,
"repsLabel": "5–15 s je Seite",
"restSec": 180,
"type": "time",
"primary": [
"saege",
"bauch"
],
"secondary": [
"schultern",
"lat",
"adduktoren"
],
"description": "Seitlich waagerecht an einer senkrechten Stange. Beginnt mit angehockten Beinen und wächst über Monate.",
"easier": "Flag in der Hocke",
"harder": "Human Flag gestreckt",
"ast": "skill",
"stufe": 2,
"vorher": null,
"nachher": null
},
"handstand-wand-hold": {
"id": "handstand-wand-hold",
"name": "Handstand am Bauch zur Wand",
"sets": 4,
"repsLabel": "20–60 s",
"restSec": 120,
"type": "time",
"primary": [
"schultern",
"bauch"
],
"secondary": [
"trapez",
"unterarme"
],
"description": "Mit dem Bauch zur Wand hochlaufen, die Hände nah an der Wand. Erzwingt die gerade Linie, die der freie Handstand braucht.",
"easier": "Handstand mit Rücken zur Wand",
"harder": "Freier Handstand",
"ast": "skill",
"stufe": 1,
"vorher": null,
"nachher": "handstand-frei"
},
"schulter-dislocates": {
"id": "schulter-dislocates",
"name": "Schulterkreisen mit Stab",
"sets": 2,
"repsLabel": "10–15",
"restSec": 45,
"type": "reps",
"primary": [
"schultern",
"rotatoren"
],
"secondary": [
"brust",
"trapez"
],
"description": "Mit einem Stab oder Band von vorne über den Kopf nach hinten kreisen. Die Standardübung für Schulterbeweglichkeit.",
"easier": "Schulterkreisen ohne Stab",
"harder": "Enge Dislocates",
"ast": "druck",
"stufe": 2,
"vorher": null,
"nachher": null
},
"hueftbeuger-dehnung": {
"id": "hueftbeuger-dehnung",
"name": "Hüftbeuger-Dehnung",
"sets": 2,
"repsLabel": "30–45 s je Seite",
"restSec": 30,
"type": "time",
"primary": [
"huefte"
],
"secondary": [
"oberschenkel",
"gesaess"
],
"description": "Im Ausfallschritt knien und die Hüfte nach vorne schieben. Gegen das Sitzen und für tiefere Kniebeugen.",
"easier": "Hüftbeuger im Stand",
"harder": "Couch Stretch",
"ast": "rumpf",
"stufe": 2,
"vorher": null,
"nachher": null
},
"brustwirbel-mobilitaet": {
"id": "brustwirbel-mobilitaet",
"name": "Brustwirbelsäulen-Mobilität",
"sets": 2,
"repsLabel": "8–12 je Seite",
"restSec": 30,
"type": "reps",
"primary": [
"oberer_ruecken"
],
"secondary": [
"schultern",
"trapez"
],
"description": "Im Vierfüßlerstand oder Seitenlage den Oberkörper aufdrehen. Löst den steifen oberen Rücken vom Sitzen.",
"easier": "Katze-Kuh",
"harder": "Drehung mit Bandzug",
"ast": "zug",
"stufe": 2,
"vorher": null,
"nachher": null
},
"handgelenk-vorbereitung": {
"id": "handgelenk-vorbereitung",
"name": "Handgelenk-Vorbereitung",
"sets": 2,
"repsLabel": "8–10 je Richtung",
"restSec": 20,
"type": "reps",
"primary": [
"unterarme"
],
"secondary": [],
"description": "Die Handgelenke in alle Richtungen belasten, bevor Handstand oder Planche drankommen. Ohne sie kommen die Beschwerden zuverlässig.",
"easier": "Handgelenkkreisen",
"harder": "Handgelenkstütz mit Gewichtsverlagerung",
"ast": "zug",
"stufe": 2,
"vorher": null,
"nachher": null
},
"nacken-entspannung": {
"id": "nacken-entspannung",
"name": "Nacken lösen",
"sets": 2,
"repsLabel": "30 s je Seite",
"restSec": 20,
"type": "time",
"primary": [
"trapez"
],
"secondary": [
"schultern"
],
"description": "Den Kopf sanft zur Seite neigen und halten. Löst, was sich nach Klimmzügen und Bildschirmarbeit festsetzt.",
"easier": "Schulterkreisen",
"harder": "Nackendehnung mit Handhilfe",
"ast": "zug",
"stufe": 2,
"vorher": null,
"nachher": null
},
"atemarbeit": {
"id": "atemarbeit",
"name": "Atemarbeit",
"sets": 1,
"repsLabel": "3–5 Min.",
"restSec": 0,
"type": "activity",
"primary": [
"bauch"
],
"secondary": [],
"description": "Ruhig in den Bauch atmen, länger aus als ein. Bringt den Körper nach dem Training aus der Anspannung heraus.",
"easier": "Ruhiges Sitzen",
"harder": "Verlängerte Ausatmung",
"ast": "erholung",
"stufe": 2,
"vorher": null,
"nachher": null
},
"lockeres-radfahren": {
"id": "lockeres-radfahren",
"name": "Lockeres Radfahren",
"sets": 1,
"repsLabel": "20–40 Min.",
"restSec": 0,
"type": "activity",
"primary": [
"oberschenkel"
],
"secondary": [
"waden",
"gesaess"
],
"description": "Ruhiges Fahren ohne Belastung. Bringt Blut in die Beine, ohne neue Ermüdung zu erzeugen.",
"easier": "Spaziergang",
"harder": "Radfahren mit Anstiegen",
"ast": "erholung",
"stufe": 1,
"vorher": "sun-walk",
"nachher": null
},
"schwimmen-locker": {
"id": "schwimmen-locker",
"name": "Lockeres Schwimmen",
"sets": 1,
"repsLabel": "20–30 Min.",
"restSec": 0,
"type": "activity",
"primary": [
"lat",
"schultern"
],
"secondary": [
"bauch",
"oberschenkel"
],
"description": "Ruhiges Schwimmen ohne Zeitdruck. Entlastet die Gelenke vollständig und lockert Schultern und Rücken.",
"easier": "Wassergehen",
"harder": "Schwimmen mit Intervallen",
"ast": "erholung",
"stufe": 1,
"vorher": null,
"nachher": null
}
};
