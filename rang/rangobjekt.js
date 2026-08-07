/* =============================================================
   FLOW — Die acht Rang-Objekte, prozedural
   =============================================================

   Aus dem ES-Modul von Claude Design in ein klassisches Skript
   umgebaut. Zwei Gruende:

   1. Das Original zieht Three.js ueber unpkg.com. Auf der echten
      Seite heisst das: fremder Ausfall = kein Wappen, und offline
      geht gar nichts. Dein flow3d.js buendelt dasselbe Three.js
      bereits lokal.

   2. Der Nachlader in app.html arbeitet mit <script src>, nicht
      mit Modulen — nur so laeuft die Seite auch per Doppelklick
      ueber file://.

   Inhaltlich ist NICHTS geaendert: dieselbe Geometrie, dieselben
   Materialien, dieselben Zahlen. Nur die Verpackung.

   Ersetzt rang-modelle.js (710 KB Base64-GLB). Die Objekte
   entstehen jetzt aus Mathematik statt aus Daten.
   ============================================================= */

(function () {
  'use strict';

  var THREE = window.FLOW3D && window.FLOW3D.THREE;
  if (!THREE) {
    console.error('rangobjekt: flow3d.js muss vorher geladen sein.');
    return;
  }

const STUFEN = [
  { nr: 1, name: 'STAUB',    satz: 'Allein und unfertig.' },
  { nr: 2, name: 'SCHWARM',  satz: 'Masse ohne Ordnung.' },
  { nr: 3, name: 'BINDUNG',  satz: 'Die erste Symmetrie.' },
  { nr: 4, name: 'ZWILLING', satz: 'Entworfen statt zufällig.' },
  { nr: 5, name: 'SCHALE',   satz: 'Das erste Leuchten.' },
  { nr: 6, name: 'SPHÄRE',   satz: 'Höhepunkt der Komplexität.' },
  { nr: 7, name: 'KLARHEIT', satz: 'Nichts mehr verborgen.' },
  { nr: 8, name: 'STILLE',   satz: 'Beinahe Stillstand.' },
];

const FELDNAMEN = ['Zug', 'Druck', 'Rumpf', 'Beine', 'Stütz', 'Balance'];

/* Warum diese Palette: Stufe 1 ist Asche mit Orange darunter — die Glut ist
 * schon da, nur nicht entzündet, deshalb liest sie sich staubgrau. Das
 * Marken-Orange sitzt bei Stufe 4, dort wo die Anstrengung am größten ist.
 * Nach oben kühlt es zu Weißgold ab und niemals zu Blau: Paradies ist warm. */
const PALETTE = ['#6f6660', '#8a6b57', '#c85a35', '#e8492b',
                 '#f0673a', '#f79150', '#f9bb74', '#ffe3b4'];

/* Wer auf STAUB steht, kann keine fünf Titel haben — die Biografie ist
 * dort schlicht noch nicht passiert. Deshalb deckeln die unteren Stufen
 * die Nutzerwerte: sonst sähe Stufe 1 aus wie Stufe 5 in grau. Ab Stufe 5
 * gibt es keine Deckel mehr, denn dort trägt das Objekt jede Biografie. */
const GRENZEN = [
  { ringe: 1, spangen: 1, feld: 1 }, { ringe: 2, spangen: 3, feld: 2 },
  { ringe: 3, spangen: 4, feld: 3 }, { ringe: 4, spangen: 5, feld: 4 },
  { ringe: 6, spangen: 8, feld: 5 }, { ringe: 6, spangen: 8, feld: 5 },
  { ringe: 6, spangen: 8, feld: 5 }, { ringe: 6, spangen: 8, feld: 5 },
];

const R = 0.5;                        // Bezugsradius des ganzen Objekts, in Metern
const HOCH = new THREE.Vector3(0, 1, 0);

const klemme = (v, a, b) => Math.max(a, Math.min(b, Math.round(v)));

/* Gleiche Werte müssen dasselbe Objekt ergeben — ein Rangabzeichen, das
 * bei jedem Laden anders aussieht, ist kein Porträt. */
function zufallsfolge(saat) {
  let s = saat >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Der ganze Aufstieg in Zahlen. Rauheit fällt, Transmission und Emission
 * steigen, die Drehung wird LANGSAMER — Tempo liest sich als Nervosität. */
function stufenWerte(stufe) {
  const t = (stufe - 1) / 7;
  return {
    t,
    farbe: new THREE.Color(PALETTE[stufe - 1]),
    rauheit: 0.9 + t * (0.05 - 0.9),
    transmission: stufe <= 3 ? 0 : Math.pow((stufe - 3) / 5, 1.2) * 0.78,
    emission: stufe < 5 ? 0 : (stufe - 4) / 4,   // 0.25 … 1.0, erst ab Stufe 5
    drehung: 1.0 + t * (0.15 - 1.0),
    atmet: stufe >= 5,
  };
}

function kernMaterial(w, name = 'kern') {
  const m = new THREE.MeshPhysicalMaterial({
    color: w.farbe,
    roughness: w.rauheit,
    metalness: 0.04,
    transmission: w.transmission,
    thickness: R * 0.6,
    ior: 1.55,
    /* Kurze Dämpfungsstrecke, warme Dämpfungsfarbe: dickes Glas soll golden
     * werden, nicht grau. Sonst kippt die Spitze ins Silbrige. */
    attenuationColor: new THREE.Color('#ff9c4e'),
    attenuationDistance: 0.28,
    clearcoat: w.t * 0.6,
    clearcoatRoughness: 0.25,
  });
  /* Die Emission zieht ins Weißgold, während der Körper noch orange ist —
   * so leuchtet das Objekt heißer als es aussieht, wie eine Kohle. */
  m.emissive = w.farbe.clone().lerp(new THREE.Color('#fff0cf'), 0.55);
  m.emissiveIntensity = w.emission * w.emission * 2.4;
  m.name = name;
  return m;
}

function bahnMaterial(w) {
  const m = new THREE.MeshBasicMaterial({
    color: w.farbe.clone().lerp(new THREE.Color('#fff2da'), 0.35),
    transparent: true,
    opacity: 0.16 + w.t * 0.4,
    depthWrite: false,
  });
  m.name = 'bahn';
  return m;
}

/* Die Felder sind Körper, keine Steine: matter und immer undurchsichtig,
 * damit sie sich vom Kern absetzen statt in ihm zu verschwinden. */
function feldMaterial(w) {
  const m = new THREE.MeshStandardMaterial({
    color: w.farbe.clone().lerp(new THREE.Color('#ffe7c4'), 0.2),
    roughness: Math.min(0.95, w.rauheit + 0.18),
    metalness: 0.05,
  });
  m.emissive = m.color.clone();
  m.emissiveIntensity = w.emission * 0.5;
  m.name = 'feld';
  return m;
}

/* Billiger Ersatz für Bloom: eine additive Scheibe. Kostet einen Draw-Call
 * statt eines Nachbearbeitungspfads und läuft damit auch auf Telefonen. */
let haloTextur = null;
function haloBild() {
  if (haloTextur) return haloTextur;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const v = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  v.addColorStop(0.0, 'rgba(255,255,255,1)');
  v.addColorStop(0.18, 'rgba(255,226,176,0.72)');
  v.addColorStop(0.45, 'rgba(255,163,90,0.20)');
  v.addColorStop(1.0, 'rgba(255,140,60,0)');
  g.fillStyle = v;
  g.fillRect(0, 0, 128, 128);
  haloTextur = new THREE.CanvasTexture(c);
  haloTextur.colorSpace = THREE.SRGBColorSpace;
  return haloTextur;
}

function halo(groesse, staerke) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({
    map: haloBild(), blending: THREE.AdditiveBlending,
    transparent: true, depthWrite: false, opacity: staerke,
    color: new THREE.Color('#ffd9a0'),
  }));
  s.material.name = 'schein';
  s.name = 'schein';
  s.scale.setScalar(groesse);
  return s;
}

/* Eine Bahn ist immer ein Träger-Group: sie kippt, sie eiert (ungleiche
 * Skalierung), und alles darin — Ring wie Trabant — erbt beides umsonst. */
function bahnTraeger(radius, neigung, kippung, exzentrisch, w, sichtbar = true) {
  const t = new THREE.Group();
  t.name = 'bahn';
  t.rotation.set(neigung, 0, kippung);
  t.scale.set(1 + exzentrisch, 1, 1 - exzentrisch * 0.65);
  if (sichtbar) {
    const g = new THREE.TorusGeometry(radius, Math.max(0.0016, radius * 0.006), 4, 128);
    const ring = new THREE.Mesh(g, bahnMaterial(w));
    ring.name = 'bahnring';
    ring.rotation.x = Math.PI / 2;
    t.add(ring);
  }
  return t;
}

function kugel(radius, mat, segmente = 32) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(radius, segmente, Math.max(8, segmente / 2)), mat);
  m.name = 'kern';
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

/* Die echte Kohlenstoffstruktur: jeder Knoten bindet tetraedrisch an vier
 * Nachbarn, und die nächste Schale ist um 180° gedreht. Das ist der Grund,
 * warum Stufe 8 ruhig wirkt — der Winkel stimmt, nicht die Menge. */
function diamantGitter(tiefe, bindung) {
  const A = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]]
    .map((v) => new THREE.Vector3(...v).normalize());
  const knoten = [new THREE.Vector3()];
  const bindungen = [];
  (function wachse(p, eingang, ebene, richtungen) {
    if (ebene > tiefe) return;
    for (const d of richtungen) {
      if (eingang && d.dot(eingang) < -0.9) continue;   // nie zurück
      const q = p.clone().addScaledVector(d, bindung);
      knoten.push(q);
      bindungen.push([p, q]);
      wachse(q, d, ebene + 1, richtungen.map((r) => r.clone().negate()));
    }
  })(knoten[0], null, 1, A);
  return { knoten, bindungen };
}

function gitterKoerper(tiefe, bindung, knotenRadius, w, glut) {
  const g = new THREE.Group();
  g.name = 'gitter';
  const { knoten, bindungen } = diamantGitter(tiefe, bindung);
  const matKnoten = kernMaterial(w, 'gitterknoten');
  const matStrebe = new THREE.MeshStandardMaterial({
    color: w.farbe.clone().lerp(new THREE.Color('#fff0d2'), 0.5),
    roughness: 0.3, metalness: 0.1,
    emissive: new THREE.Color('#ffdca6'),
    emissiveIntensity: w.emission * 1.4,
  });
  matStrebe.name = 'strebe';
  const strebeGeo = new THREE.CylinderGeometry(bindung * 0.055, bindung * 0.055, 1, 8);

  knoten.forEach((p, i) => {
    const k = kugel(i === 0 ? knotenRadius * 1.45 : knotenRadius, matKnoten, 24);
    k.name = i === 0 ? 'kern' : 'gitterknoten';
    k.position.copy(p);
    g.add(k);
  });
  for (const [a, b] of bindungen) {
    const s = new THREE.Mesh(strebeGeo, matStrebe);
    s.name = 'strebe';
    s.position.copy(a).lerp(b, 0.5);
    s.scale.y = a.distanceTo(b);
    s.quaternion.setFromUnitVectors(HOCH, b.clone().sub(a).normalize());
    g.add(s);
  }
  if (glut > 0) g.add(halo(bindung * 2.6, glut));
  return { gruppe: g, teile: knoten.length + bindungen.length };
}

/* Die Außenschale von Stufe 6: aus einem Ikosaeder werden Platten, jede zur
 * Mitte hin geschrumpft und unterschiedlich tief gesetzt. Die Spalten dazwischen
 * sind der ganze Punkt — nur durch sie sieht man das geordnete Innere. */
function schalenGeometrie(radius, spalt, rauheit, rnd) {
  const basis = new THREE.IcosahedronGeometry(radius, 1);
  const p = basis.attributes.position;
  const ecken = [];
  for (let i = 0; i < p.count; i += 3) {
    const a = new THREE.Vector3().fromBufferAttribute(p, i);
    const b = new THREE.Vector3().fromBufferAttribute(p, i + 1);
    const c = new THREE.Vector3().fromBufferAttribute(p, i + 2);
    const mitte = a.clone().add(b).add(c).multiplyScalar(1 / 3);
    const tiefe = 1 + (rnd() - 0.5) * rauheit;
    for (const v of [a, b, c]) {
      v.lerp(mitte, spalt).multiplyScalar(tiefe);
      ecken.push(v.x, v.y, v.z);
    }
  }
  basis.dispose();
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(ecken, 3));
  g.computeVertexNormals();
  return { geometrie: g, platten: p.count / 3 };
}

// ── Die acht Kernkörper ──────────────────────────────────────────────────
// Jede Funktion liefert { gruppe, teile, radius } — teile zählt, was das Auge
// als Stück liest (bei Stufe 6 also Platten, nicht Draw-Calls). Diese Zahl ist
// die Probe auf Regel 1: sie muss bei 6 gipfeln und bei 8 kleiner sein.

function kernkoerper(stufe, kern, w, rnd) {
  const skala = 0.78 + kern * 0.09;      // 0–4 Kerne = Masse, überall spürbar
  const g = new THREE.Group();
  g.name = 'kernkoerper';
  const mat = kernMaterial(w);

  if (stufe === 1) {
    /* Außermittig, weil nichts hier ausbalanciert ist. Es MUSS falsch aussehen. */
    const k = kugel(0.15 * skala, mat);
    k.position.set(0.045, -0.02, 0.015);
    g.add(k);
    return { gruppe: g, teile: 1, radius: 0.15 * skala };
  }

  if (stufe === 2) {
    /* Klumpen ohne Symmetrie: Positionen aus der Zufallsfolge, keine Achse,
     * keine Wiederholung. Mehr Masse, aber nichts hält sie zusammen. */
    const anzahl = 3 + (kern >= 3 ? 1 : 0);
    let max = 0;
    for (let i = 0; i < anzahl; i++) {
      const r = (0.075 + rnd() * 0.055) * skala;
      const k = kugel(r, mat, 28);
      const d = new THREE.Vector3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5)
        .normalize().multiplyScalar(0.07 + rnd() * 0.05);
      k.position.copy(d);
      g.add(k);
      max = Math.max(max, d.length() + r);
    }
    return { gruppe: g, teile: anzahl, radius: max };
  }

  if (stufe === 3) {
    /* Das Dreieck ist die erste Entscheidung des Objekts gegen den Zufall. */
    const r = 0.1 * skala;
    const abstand = 0.158;
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2;
      const k = kugel(r, mat, 28);
      k.position.set(Math.cos(a) * abstand, 0, Math.sin(a) * abstand);
      g.add(k);
    }
    let teile = 3;
    if (kern >= 3) { g.add(kugel(r * 0.7, mat, 24)); teile++; }
    return { gruppe: g, teile, radius: abstand + r };
  }

  if (stufe === 4) {
    /* Doppelstern: zwei identische Kerne, punktgespiegelt. Identisch heißt
     * identisch — dieselbe Geometrieinstanz, kein zweiter Zufall. */
    const r = 0.128 * skala;
    const d = 0.158;
    for (const s of [1, -1]) {
      const k = kugel(r, mat, 32);
      k.position.set(d * s, 0.018 * s, 0);
      g.add(k);
    }
    return { gruppe: g, teile: 2, radius: d + r };
  }

  if (stufe === 5) {
    /* Alle Kerne sitzen an der Innenwand einer unsichtbaren Kugel und zeigen
     * nach innen — Kegel, weil eine Spitze eine Richtung hat und eine Kugel
     * nicht. Das Leuchten liegt im Hohlraum, nicht auf den Körpern. */
    const anzahl = 30 + kern * 4;
    const schale = 0.25;
    const hoehe = 0.058 * skala;
    const mat5 = kernMaterial(w, 'schalenkern');
    /* Breit und flach statt spitz: die Kerne sollen wie Schuppen auf einer Wand
     * sitzen, nicht wie Stacheln von ihr abstehen. */
    const geo = new THREE.ConeGeometry(0.046 * skala, hoehe, 10);
    for (let i = 0; i < anzahl; i++) {
      const y = 1 - (i / (anzahl - 1)) * 2;
      const rad = Math.sqrt(Math.max(0, 1 - y * y));
      const phi = i * 2.399963;                     // goldener Winkel
      const p = new THREE.Vector3(Math.cos(phi) * rad, y, Math.sin(phi) * rad)
        .multiplyScalar(schale);
      const m = new THREE.Mesh(geo, mat5);
      m.name = 'schalenkern';
      m.castShadow = true;
      /* Der Kegel sitzt mit dem Boden auf der Schale, die Spitze zeigt in den
       * Hohlraum — deshalb um die halbe Höhe nach innen versetzt. */
      const nachInnen = p.clone().negate().normalize();
      m.position.copy(p).addScaledVector(nachInnen, hoehe * 0.5);
      m.quaternion.setFromUnitVectors(HOCH, nachInnen);
      g.add(m);
    }
    /* Das erste Leuchten hat keinen Körper — es liegt IM Hohlraum, zwischen
     * den Kernen. Eine additive Scheibe, nichts Festes, sonst wäre es ein Ding. */
    g.add(halo(schale * 1.45, 0.5));
    return { gruppe: g, teile: anzahl + 1, radius: schale + 0.03 };
  }

  if (stufe === 6) {
    /* Die vollste Stufe: rauhe geschlossene Außenschale, darin ein strenges,
     * helles Gitter. Die ganze Spannung liegt im Kontrast grob/strahlend —
     * und ab hier wird wieder weggenommen. */
    const schale = 0.27;
    const { geometrie, platten } = schalenGeometrie(schale, 0.23, 0.14, rnd);
    const matSchale = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#3d2718'),
      roughness: 0.94, metalness: 0.0, side: THREE.DoubleSide, flatShading: true,
    });
    matSchale.name = 'schale';
    const s = new THREE.Mesh(geometrie, matSchale);
    s.name = 'schale';
    s.castShadow = true;
    g.add(s);
    const gitter = gitterKoerper(1, 0.135, 0.046 * skala, w, 0.9);
    g.add(gitter.gruppe);
    return { gruppe: g, teile: platten + gitter.teile, radius: schale * 1.08 };
  }

  if (stufe === 7) {
    /* Die Schale ist weg. Ein einziges Gitter, zwei Schalen tief, vollständig
     * sichtbar — nichts mehr verborgen, deshalb auch nichts mehr zu erklären. */
    const gitter = gitterKoerper(2, 0.163, 0.032 * skala, w, 0.45);
    g.add(gitter.gruppe);
    return { gruppe: g, teile: gitter.teile, radius: 0.163 * 2.05 };
  }

  /* Stufe 8 — weniger Teile als Stufe 6, aber jedes makellos. Ein leuchtender
   * Kern, vier Bindungen, vier Knoten. Das Fieber ist gebrochen. */
  const gitter = gitterKoerper(1, 0.215 * (0.9 + kern * 0.04), 0.062 * skala, w, 0.85);
  g.add(gitter.gruppe);
  return { gruppe: g, teile: gitter.teile, radius: 0.235 };
}

/* Die Bahnregel je Stufe. Unten wilde, sich kreuzende Winkel; ab Stufe 3
 * legt sich alles in EINE Ebene; oben exakte Kreise. Die Ordnung der Bahnen
 * erzählt den Aufstieg genauso wie der Kern. */
function bahnLage(stufe, i, rnd) {
  if (stufe === 1) return { neigung: 0.95, kippung: 0.42, exzentrisch: 0.22, tempo: 2.6 };
  if (stufe === 2) return { neigung: [1.15, -0.62, 0.3, 1.5][i % 4] + (rnd() - 0.5) * 0.3,
                            kippung: [0.4, 1.05, -0.7, 0.2][i % 4],
                            exzentrisch: 0.12, tempo: 1 + i * 0.4 };
  if (stufe === 5 || stufe === 6) return { neigung: (i % 4) * 0.5 - 0.45, kippung: (i % 3) * 0.34,
                                           exzentrisch: 0.03, tempo: 0.8 + i * 0.13 };
  return { neigung: 0, kippung: 0, exzentrisch: 0, tempo: 0.8 + i * 0.1 };
}

// ── Der Generator ────────────────────────────────────────────────────────

function erzeugeRangObjekt(einstellung = {}) {
  const stufe = klemme(einstellung.stufe ?? 1, 1, 8);
  const grenze = GRENZEN[stufe - 1];
  const kern = klemme(einstellung.kern ?? 1, 0, 4);
  const ringe = klemme(einstellung.ringe ?? 0, 0, grenze.ringe);
  const spangen = klemme(einstellung.spangen ?? 0, 0, grenze.spangen);
  const felder = Array.from({ length: 6 }, (_, i) =>
    klemme((einstellung.felder ?? [])[i] ?? 0, 0, grenze.feld));

  const w = stufenWerte(stufe);
  const rnd = zufallsfolge(stufe * 7919 + kern * 131 + ringe * 17 + spangen * 3 + 1);

  const objekt = new THREE.Group();
  objekt.name = `rang-${stufe}-${STUFEN[stufe - 1].name.toLowerCase()}`;
  /* Feste Haltung außen, Drehung innen. Ohne diese Neigung fallen alle
   * geordneten Stufen zur Kante zusammen — eine Ebene, frontal gesehen,
   * ist ein Strich. Das Objekt kippt uns die Ordnung entgegen. */
  objekt.rotation.x = 0.34;
  const dreher = new THREE.Group();
  dreher.name = 'dreher';
  objekt.add(dreher);
  const animationen = [];

  const körper = kernkoerper(stufe, kern, w, rnd);
  dreher.add(körper.gruppe);

  /* Basisbahnen je Stufe plus eine je verdientem Ring. Oben bleiben auch viele
   * Ringe ruhig, weil sie konzentrisch in derselben Ebene liegen — Ordnung
   * verträgt Menge, Unordnung nicht. */
  const basisBahnen = [1, 2, 2, 2, 3, 2, 1, 1][stufe - 1];
  const anzahlBahnen = basisBahnen + ringe;
  const innen = körper.radius + 0.07;
  const bahnen = [];
  for (let i = 0; i < anzahlBahnen; i++) {
    const f = anzahlBahnen === 1 ? 0 : i / (anzahlBahnen - 1);
    const radius = innen + f * (R * 0.93 - innen);
    const lage = bahnLage(stufe, i, rnd);
    const t = bahnTraeger(radius, lage.neigung, lage.kippung, lage.exzentrisch, w);
    const richtung = stufe <= 2 ? (i % 2 ? -1 : 1) : 1;   // unten kreuzt es sich häßlich
    const tempo = lage.tempo * w.drehung * 0.42 * richtung;
    const phase = rnd() * Math.PI * 2;
    animationen.push((z) => { t.rotation.y = phase + z * tempo; });
    dreher.add(t);
    bahnen.push({ traeger: t, radius });
  }

  /* Trabanten (verdiente Titel) verteilen sich über die vorhandenen Bahnen,
   * beginnend außen — ein Titel soll sichtbar sein, nicht im Kern verschwinden. */
  const trabantGeo = new THREE.SphereGeometry(0.026, 20, 12);
  const trabantMat = kernMaterial(w, 'trabant');
  for (let i = 0; i < spangen; i++) {
    const b = bahnen[(bahnen.length - 1 - (i % bahnen.length))];
    const m = new THREE.Mesh(trabantGeo, trabantMat);
    m.name = 'trabant';
    m.castShadow = true;
    const versatz = (i / spangen) * Math.PI * 2;
    m.position.set(Math.cos(versatz) * b.radius, 0, Math.sin(versatz) * b.radius);
    b.traeger.add(m);
  }

  /* Sechs Felder, immer sechs — der Körper hat nun einmal sechs Kapitel.
   * Größe = Muskelstufe. Stufe 0 bleibt ein Korn, damit der Sechserrhythmus
   * lesbar bleibt und man sieht, was noch fehlt. */
  const feldBahnRadius = R * 0.72;
  const feldLage = bahnLage(stufe, anzahlBahnen, rnd);
  const feldTraeger = bahnTraeger(feldBahnRadius, feldLage.neigung * 0.5, feldLage.kippung * 0.5,
                                  feldLage.exzentrisch, w, stufe >= 3);
  feldTraeger.name = 'feldbahn';
  const feldMat = feldMaterial(w);
  felder.forEach((stufe6, i) => {
    const r = 0.008 + stufe6 * 0.0096;
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 12), feldMat);
    m.name = `feld-${FELDNAMEN[i].toLowerCase()}`;
    m.castShadow = true;
    const a = (i / 6) * Math.PI * 2;
    m.position.set(Math.cos(a) * feldBahnRadius, 0, Math.sin(a) * feldBahnRadius);
    feldTraeger.add(m);
  });
  const feldTempo = -w.drehung * 0.26;               // gegenläufig, damit man sie liest
  const feldPhase = rnd() * Math.PI * 2;
  animationen.push((z) => { feldTraeger.rotation.y = feldPhase + z * feldTempo; });
  dreher.add(feldTraeger);

  /* Stufe 4 bekommt die liegende Acht: die zwei Trabanten tauschen dort
   * tatsächlich die Plätze, statt nur nebeneinander zu kreisen. */
  if (stufe === 4) {
    const a = R * 0.62;
    const acht = (u) => {
      const s = Math.sin(u), c = Math.cos(u), n = 1 + s * s;
      return new THREE.Vector3(a * c / n, 0, a * s * c / n * 1.9);
    };
    const punkte = Array.from({ length: 96 }, (_, i) => acht((i / 96) * Math.PI * 2));
    const spur = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(punkte, true), 128, 0.0026, 4, true),
      bahnMaterial(w));
    spur.name = 'achterbahn';
    dreher.add(spur);
    const paar = [0, Math.PI].map((p) => {
      const m = new THREE.Mesh(trabantGeo, trabantMat);
      m.name = 'tauschtrabant';
      m.castShadow = true;
      dreher.add(m);
      return { m, p };
    });
    animationen.push((z) => {
      for (const t of paar) t.m.position.copy(acht(t.p + z * w.drehung * 0.5));
    });
  }

  objekt.userData.bericht = {
    stufe, kern, ringe, spangen, felder,
    kernteile: körper.teile, bahnen: anzahlBahnen + 1, trabanten: spangen + (stufe === 4 ? 2 : 0),
  };

  const grunddrehung = w.drehung * 0.16;
  objekt.userData.animiere = (zeit) => {
    dreher.rotation.y = zeit * grunddrehung;
    for (const a of animationen) a(zeit);
    /* Ohne Atmen wirkt Stufe 8 eingefroren statt ruhig — Stillstand ist
     * kein Tod, sondern ein sehr langsamer Puls. */
    const s = w.atmet ? 1 + 0.02 * Math.sin((zeit / 6) * Math.PI * 2) : 1;
    objekt.scale.setScalar(s);
  };
  objekt.userData.animiere(0);
  return objekt;
}

// ── Licht und Umgebung ───────────────────────────────────────────────────

/* Heiligkeit heißt: vom Beleuchteten zum Leuchtenden. Stufe 1 wird von außen
 * hart angestrahlt und wirft einen langen Schatten; Stufe 8 hat kein Schlaglicht
 * und keinen Schatten mehr, weil sie selbst die Quelle ist. */
function beleuchteSzene(szene, stufe) {
  const w = stufenWerte(stufe);
  const t = w.t;

  /* Auch das Licht kühlt nicht ab, sondern wird wärmer: unten ein neutrales,
   * hartes Weiß auf totem Staub, oben goldene Luft. */
  const himmel = new THREE.Color(0xeceae6).lerp(new THREE.Color(0xfff0dc), t);
  const umgebung = new THREE.HemisphereLight(himmel, 0x241a14, 0.28 + t * 1.5);
  szene.add(umgebung);

  const schlaglicht = new THREE.DirectionalLight(
    new THREE.Color(0xf4f2ee).lerp(new THREE.Color(0xfff1de), t), 3.4 * (1 - t) + 0.12);
  schlaglicht.position.set(-1.75, 2.3 + t * 0.7, 1.55);
  schlaglicht.castShadow = stufe <= 4;
  schlaglicht.shadow.mapSize.set(1024, 1024);
  const c = schlaglicht.shadow.camera;
  c.left = -3.6; c.right = 3.6; c.top = 3.6; c.bottom = -3.6; c.near = 0.5; c.far = 9;
  c.updateProjectionMatrix();   // sonst behält die Kamera ihre Vorgabemaße
  schlaglicht.shadow.bias = -0.002;
  szene.add(schlaglicht);

  const gegenlicht = new THREE.DirectionalLight(0xffc98d, 0.35 + t * 0.5);
  gegenlicht.position.set(1.8, -0.6, -1.4);
  szene.add(gegenlicht);

  if (w.emission > 0) {
    const innen = new THREE.PointLight(0xffcf96, w.emission * w.emission * 3.2, 3, 1.6);
    innen.name = 'eigenlicht';
    szene.add(innen);
  }

  const schattenStaerke = stufe >= 7 ? 0 : 0.52 * Math.pow(1 - t, 1.4);
  if (schattenStaerke > 0.01) {
    const boden = new THREE.Mesh(
      new THREE.PlaneGeometry(4, 4),   // ganz im Schattenkegel, sonst reißt der Rand
      new THREE.ShadowMaterial({ opacity: schattenStaerke, color: 0x1a0e08 }));
    boden.name = 'schattenfaenger';
    boden.rotation.x = -Math.PI / 2;
    boden.position.y = -0.52;
    boden.receiveShadow = true;
    szene.add(boden);
  }
  return { schlaglicht, umgebung };
}

/* Transmission braucht etwas zum Spiegeln, sonst sieht Glas aus wie Milch.
 * Ein 64×32-Farbverlauf reicht dafür völlig — er kostet nichts und bleibt warm. */
function erzeugeUmgebung(renderer) {
  const c = document.createElement('canvas');
  c.width = 64; c.height = 32;
  const g = c.getContext('2d');
  const v = g.createLinearGradient(0, 0, 0, 32);
  v.addColorStop(0, '#fff3e2');
  v.addColorStop(0.45, '#e8a86e');
  v.addColorStop(1, '#2b1a12');
  g.fillStyle = v; g.fillRect(0, 0, 64, 32);
  g.fillStyle = 'rgba(255,255,255,0.95)';
  g.beginPath(); g.ellipse(14, 8, 7, 5, 0, 0, Math.PI * 2); g.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const ziel = pmrem.fromEquirectangular(tex).texture;
  pmrem.dispose(); tex.dispose();
  return ziel;
}

function stufenFarbe(stufe) { return PALETTE[klemme(stufe, 1, 8) - 1]; }
function stufenGrenzen(stufe) { return GRENZEN[klemme(stufe, 1, 8) - 1]; }

  window.RANGOBJEKT = {
    erzeugeRangObjekt: erzeugeRangObjekt,
    beleuchteSzene:    beleuchteSzene,
    erzeugeUmgebung:   erzeugeUmgebung,
    stufenFarbe:       stufenFarbe,
    stufenGrenzen:     stufenGrenzen,
    STUFEN:            STUFEN,
    FELDNAMEN:         FELDNAMEN
  };
})();
