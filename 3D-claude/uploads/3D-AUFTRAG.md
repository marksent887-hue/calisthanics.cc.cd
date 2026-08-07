# Auftrag: Acht Rang-Objekte für FLOW

Du baust acht 3D-Objekte für eine Calisthenics-Trainings-App namens FLOW.
Sie sind das Rangabzeichen des Nutzers und stehen auf seiner Profilseite —
ein Objekt, das sich mit ihm verändert, je länger und ernsthafter er trainiert.

Die Objekte sind Moleküle: ein Kern in der Mitte, kleinere Körper auf
Umlaufbahnen darum. Stufe 1 ist ein einzelnes Staubkorn mit einem
Trabanten. Stufe 8 ist ein leuchtendes, beinahe stillstehendes Gebilde.

---

## DIE GRUNDIDEE

Der Aufstieg erzählt die Geschichte von Kohlenstoff: ein Korn Kohle wird
zu Diamant. Gleicher Stoff, nur geordneter. Das ist auch die Geschichte
von Training — man wird kein anderer Mensch, man wird geordneter.

---

## ZWEI REGELN, DIE ALLES TRAGEN

**1 · Aufstieg zeigt man durch Weglassen, nicht durch Draufpacken.**

Wenn jede Stufe mehr Teile bekommt, ist Stufe 8 nur Lärm. Die Komplexität
gipfelt bei **Stufe 6** und löst sich danach in Ordnung auf. Stufe 8 hat
WENIGER Teile als Stufe 6 — aber jedes sitzt perfekt. Wie ein Fieber,
das bricht.

**2 · Heiligkeit heißt: vom Beleuchteten zum Leuchtenden.**

Stufe 1 wird von außen hart angestrahlt und wirft einen langen Schatten.
Stufe 8 wirft keinen Schatten mehr, weil sie selbst die Lichtquelle ist.

---

## DIE ACHT STUFEN

Die Namen entstofflichen sich nach oben: unten Dinge, oben Zustände.

### 1 — STAUB
Eine matte Kugel, leicht außermittig. Ein winziger Trabant auf einer
eiernden, zu schnellen Bahn. Staubgrau. Hartes Seitenlicht, langer
Schatten. Wirkt allein und unfertig. Es MUSS falsch aussehen.

### 2 — SCHWARM
Drei bis vier Kugeln zusammengeklumpt, ohne jede Symmetrie. Zwei
Trabanten kreuzen sich in unschönen Winkeln. Immer noch matt.
Mehr Masse, aber keine Ordnung.

### 3 — BINDUNG
Der Klumpen rastet in ein Dreieck ein — die erste Symmetrie. Die Bahnen
legen sich in EINE gemeinsame Ebene, wie ein junges Sonnensystem.
Erste Transluzenz an den Rändern.

### 4 — ZWILLING
Zwei identische Kerne spiegeln sich um einen gemeinsamen Mittelpunkt,
ein Doppelstern. Ihre Trabanten tauschen die Plätze auf einer liegenden
Acht. Das erste Objekt, das entworfen wirkt statt zufällig.

### 5 — SCHALE
Viele kleine Kerne sitzen an der Innenwand einer unsichtbaren Kugel,
alle nach innen gerichtet. Die Bahnen werden zu verschachtelten Schalen.
Erstes Leuchten — schwach, im Hohlraum zwischen den Kernen.

### 6 — SPHÄRE
Bewusst die vollste Stufe. Eine rauhe, geschlossene Außenschale, und
durch ihre Spalten sieht man ein helles, streng geordnetes Gitter im
Inneren. Die Spannung aus grob außen und strahlend innen.
HÖHEPUNKT DER KOMPLEXITÄT — ab hier wird wieder weggenommen.

### 7 — KLARHEIT
Die Schale löst sich auf. Ein einziges, vollständig sichtbares Gitter,
nichts mehr verborgen. Die Bahnen sind exakte Kreise, langsam, alle in
einer Ebene. Fast keine Bewegung. Das Licht kommt von innen.

### 8 — STILLE
Beinahe Stillstand. Ein leuchtender Kern in einem perfekten
Tetraedergitter — der echten Kohlenstoffstruktur des Diamanten. Die
Bahnen so langsam, dass sie stillzustehen scheinen. Kein Schatten mehr.
Weniger Teile als Stufe 6, aber jedes makellos.

---

## DAS OBJEKT IST EIN PORTRÄT, KEIN ABZEICHEN

Die App berechnet pro Nutzer vier Werte. Jeder steuert einen Teil des
Objekts, damit zwei Menschen auf derselben Stufe verschieden aussehen:

| Wert | Bereich | Was er im Molekül wird |
|---|---|---|
| `kern` | 0–4 | Anzahl der Kerne im Zentrum (längste Trainingsserie) |
| `ringe` | 0+ | Eine zusätzliche Umlaufbahn je Ring (Tage dabei) |
| `spangen` | 0+ | Anzahl der Trabanten (verdiente Titel) |
| `felder` | 6 Werte | Sechs umlaufende Körper, jeder so groß wie seine Muskelstufe |

Baue die Objekte also **parametrisch**: eine Funktion, die diese vier
Werte plus die Stufe entgegennimmt und daraus das Modell erzeugt.

Zwei Menschen auf STILLE sehen dann verschieden aus — einer mit vier
Kernen und zwei Ringen trainiert kurz und brutal konstant, einer mit
einem Kern und fünf Ringen ist seit Jahren dabei. Man liest die
Biografie am Objekt ab.

---

## TECHNISCHE VORGABEN

**Prozedural, kein GLB.** Baue die Objekte im Code aus Three.js-Primitiven
(Kugeln, Torus, Linien). Exportiere KEINE .glb-Dateien. Begründung: Die
bisherige Fassung schleppt 694 KB Base64-Geometrie mit, obwohl es nur
Kugeln und Kreisbahnen sind — reine Mathematik. Prozedural kosten alle
acht Stufen zusammen wenige Kilobyte.

**Material — wandert über die acht Stufen:**

    Rauheit        0.9  →  0.05      staubig → poliert
    Transmission   0.0  →  0.9       undurchsichtig → Glas
    Emission       0.0  →  stark     erst ab Stufe 5 sichtbar

**Farbe:** Start bei Marken-Orange `#E8492B` (Hitze, Anstrengung),
abkühlend zu warmem Weißgold. NICHT zu Blau — Paradies ist warm.

**Bewegung:**

    Rotation       1.0  →  0.15      LANGSAMER nach oben, nicht schneller
    Atmen          ab Stufe 5: Skalierung ±2 %, ~6 s je Zyklus

Das Atmen ist wichtig. Ohne es wirkt Stufe 8 eingefroren statt ruhig.

**Licht:** Stufe 1 ein hartes Schlaglicht mit sichtbarem Schatten.
Stufe 8 nur Umgebungslicht plus Eigenleuchten, kein Schatten.

**Hintergrund transparent.** Das Objekt sitzt in einer Webseite,
nicht in einer Box. Renderer mit `alpha: true`.

**Leistung:** Läuft auf Mobiltelefonen. Pixelverhältnis auf 2 begrenzen,
keine schweren Nachbearbeitungseffekte. Ein sanftes Bloom ab Stufe 6
ist erlaubt, wenn es billig bleibt.

---

## VIER FEHLER, DIE DAS ERGEBNIS ZERSTÖREN

1. **Jede Stufe voller machen.** Dann ist Stufe 8 nur Chaos mit mehr Teilen.
2. **Blau-lila Weltraum-Ästhetik.** Sieht sofort nach NFT aus und
   zerstört jede Ruhe.
3. **Schnelle Rotation oben.** Geschwindigkeit liest sich als Nervosität,
   nicht als Kraft.
4. **Zu früh symmetrisch.** Stufe 1 und 2 MÜSSEN unfertig aussehen,
   sonst fühlen sich 7 und 8 nicht verdient an.

---

## WAS ICH ZURÜCKBEKOMMEN MÖCHTE

Eine einzelne JavaScript-Datei mit Three.js, die exportiert:

    erzeugeRangObjekt({ stufe, kern, ringe, spangen, felder })  ->  THREE.Group

Dazu eine Vorschauseite, auf der ich alle acht Stufen nebeneinander sehe
und die vier Werte mit Reglern verstellen kann.

Deutsche Namen für Funktionen und Variablen, deutsche Kommentare.
Kommentare sollen erklären, WARUM etwas so ist, nicht was der Code tut.
