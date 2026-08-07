/* =============================================================
   FLOW — Schwellenklang
   =============================================================

   Tiefe, lange Klaenge fuer die Momente, in denen man eine
   Schwelle ueberschreitet: die Seite betreten, sich anmelden,
   ins Training eintreten.

   Warum nicht das vorhandene tone() aus app.html: das erzeugt
   einen einzelnen Oszillator zwischen 392 und 1760 Hz, ohne
   Koerper und ohne Raum. Fuer ein Klicken ist das richtig. Ein
   Schwellenmoment braucht Grundton, Obertoene und Nachhall —
   sonst klingt er duenn statt gross.

   Aufbau eines Klangs:
     Anschlag    gefiltertes Rauschen, 120 ms
     Grundton    36 Hz, steigt leicht  — das Fundament
     Koerper     72 Hz (Oktave)        — macht ihn hoerbar
     Quinte      108 Hz, leiser        — gibt Farbe
     Schimmer    216 / 324 Hz, sehr leise, kurz
     Raum        Faltungshall, prozedural erzeugt

   Ohne den Hall klingt es nach Testton, mit ihm nach Ort.

   AUTOPLAY: Browser verbieten Ton ohne Nutzergeste. Alle Aufrufe
   muessen deshalb aus einem Klick oder Tipp kommen. Der Klang beim
   Seitenwechsel ist unbedenklich — der wird immer von einem Klick
   ausgeloest. Ein Klang beim blossen Laden waere gar nicht erst
   erlaubt und wird hier auch nicht versucht.

   Benutzung:
     <script src="schwellenklang.js"></script>
     FLOWKlang.schwelle();   // eintreten
     FLOWKlang.siegel();     // bestaetigt, angemeldet
     FLOWKlang.aus();        // stumm

   Pruefen:
     __klang.stand()
     __klang.vorfuehren()
   ============================================================= */

(function () {
  'use strict';

  if (window.FLOWKlang) return;

  const SPEICHER = 'flow_klang';       // 'an' | 'aus'
  const HALL_SEK = 2.6;                // Laenge des Nachhalls
  const HALL_ABFALL = 2.4;             // >1 = schneller leise

  let ctx = null;
  let hall = null;
  let summe = null;                    // gemeinsamer Ausgang

  function erlaubt() {
    try {
      if (localStorage.getItem(SPEICHER) === 'aus') return false;
    } catch (e) { /* privater Modus */ }
    /* Die App fuehrt einen eigenen Schalter. Wenn er da ist, gilt er —
       zwei Stummschalter, die sich widersprechen, sind schlimmer als
       keiner.                                                        */
    if (window.FLOW && window.FLOW.state && window.FLOW.state.sound === false) return false;
    return true;
  }

  function kontext() {
    if (!ctx) {
      try {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) { return null; }
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  /* Faltungshall ohne Datei: exponentiell abfallendes Rauschen als
     Impulsantwort. Zwei Kanaele mit eigenem Zufall, sonst klingt der
     Raum in der Mitte zusammengeklebt statt breit.                  */
  function hallBauen(c) {
    const laenge = Math.floor(c.sampleRate * HALL_SEK);
    const puffer = c.createBuffer(2, laenge, c.sampleRate);
    for (let kanal = 0; kanal < 2; kanal++) {
      const daten = puffer.getChannelData(kanal);
      for (let i = 0; i < laenge; i++) {
        const t = i / laenge;
        daten[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, HALL_ABFALL);
      }
    }
    const c1 = c.createConvolver();
    c1.buffer = puffer;
    return c1;
  }

  function aufbauen() {
    const c = kontext();
    if (!c) return null;
    if (summe) return c;

    summe = c.createGain();
    summe.gain.value = 0.9;

    hall = hallBauen(c);

    /* Trocken und nass getrennt: der Grundton soll direkt kommen,
       der Raum darf ihm hinterherlaufen.                          */
    const nass = c.createGain();
    nass.gain.value = 0.55;

    summe.connect(c.destination);
    summe.connect(hall);
    hall.connect(nass);
    nass.connect(c.destination);

    return c;
  }

  /* ---------- Bausteine ---------- */

  function stimme(c, opt) {
    const t0 = c.currentTime + (opt.ab || 0);
    const o = c.createOscillator();
    const g = c.createGain();

    o.type = opt.form || 'sine';
    o.frequency.setValueAtTime(opt.von, t0);
    if (opt.nach && opt.nach !== opt.von) {
      o.frequency.exponentialRampToValueAtTime(Math.max(1, opt.nach), t0 + opt.dauer);
    }

    /* Sehr kurzer Anstieg, langer Abfall — das ist die Huellkurve
       eines angeschlagenen Koerpers, nicht die eines Piepsers.    */
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(opt.laut, t0 + (opt.anstieg || 0.014));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + opt.dauer);

    o.connect(g);
    g.connect(summe);
    o.start(t0);
    o.stop(t0 + opt.dauer + 0.06);
  }

  /* Der Anschlag: kurzes Rauschen durch ein Tiefpassfilter. Gibt dem
     Klang eine Kante, damit er anfaengt statt aufzutauchen.        */
  function anschlag(c, laut, dauer) {
    const n = Math.floor(c.sampleRate * dauer);
    const puffer = c.createBuffer(1, n, c.sampleRate);
    const d = puffer.getChannelData(0);
    for (let i = 0; i < n; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3);
    }
    const q = c.createBufferSource();
    q.buffer = puffer;

    const f = c.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.setValueAtTime(900, c.currentTime);
    f.frequency.exponentialRampToValueAtTime(120, c.currentTime + dauer);

    const g = c.createGain();
    g.gain.value = laut;

    q.connect(f); f.connect(g); g.connect(summe);
    q.start(c.currentTime);
  }

  /* ---------- Die Klaenge ---------- */

  /* Eintreten. Tief, breit, ruhig — soll sich anfuehlen, als ginge
     ein schweres Tor auf, nicht als bestaetige etwas.             */
  function schwelle() {
    if (!erlaubt()) return;
    const c = aufbauen();
    if (!c) return;

    anschlag(c, 0.22, 0.13);

    /* Gewichtung zugunsten der Mitten.

       Vorher trug der 34-Hz-Grundton fast alles (0.42), die Obertoene
       fast nichts (0.016). Auf Kopfhoerern klang das gross — auf
       Laptop-Lautsprechern hoerte man praktisch nichts, weil die
       selten unter 150 Hz abstrahlen. Der Klang war da, gemessen bei
       -6 dBFS, nur konnte ihn kein eingebauter Lautsprecher zeigen.

       Jetzt tragen 102 und 204 Hz mit. Das Fundament bleibt tief,
       aber es gibt etwas, das auch ein kleiner Lautsprecher bewegen
       kann.                                                        */
    stimme(c, { von: 34,  nach: 44,  dauer: 3.8, laut: 0.34, form: 'sine' });
    stimme(c, { von: 68,  nach: 88,  dauer: 3.2, laut: 0.30, form: 'sine',     ab: 0.02 });
    stimme(c, { von: 102, nach: 132, dauer: 2.6, laut: 0.24, form: 'triangle', ab: 0.05 });
    stimme(c, { von: 204, nach: 264, dauer: 1.8, laut: 0.13, form: 'sine',     ab: 0.09 });
    stimme(c, { von: 306, nach: 396, dauer: 1.2, laut: 0.065, form: 'sine',    ab: 0.13 });
  }

  /* Bestaetigt. Kuerzer als die Schwelle und mit einem Aufstieg am
     Ende — etwas ist eingerastet.                                 */
  function siegel() {
    if (!erlaubt()) return;
    const c = aufbauen();
    if (!c) return;

    anschlag(c, 0.18, 0.09);

    /* Gleiche Umgewichtung wie bei schwelle() — siehe dort. */
    stimme(c, { von: 44,  nach: 58,  dauer: 2.4, laut: 0.30, form: 'sine' });
    stimme(c, { von: 88,  nach: 116, dauer: 2.0, laut: 0.28, form: 'sine',     ab: 0.02 });
    stimme(c, { von: 132, nach: 176, dauer: 1.6, laut: 0.20, form: 'triangle', ab: 0.06 });
    /* Der Aufstieg zum Schluss — die einzige Stelle, die nach oben
       geht. Ohne sie klingt es nach Abschied statt nach Ankunft.  */
    stimme(c, { von: 264, nach: 352, dauer: 0.9, laut: 0.042, form: 'sine',     ab: 0.24 });
  }

  /* Ein Grad tiefer als siegel: fuer Momente, die zaehlen, aber
     nicht gefeiert werden muessen.                               */
  function tief() {
    if (!erlaubt()) return;
    const c = aufbauen();
    if (!c) return;
    stimme(c, { von: 30, nach: 38, dauer: 2.8, laut: 0.34, form: 'sine' });
    stimme(c, { von: 60, nach: 76, dauer: 2.2, laut: 0.14, form: 'sine', ab: 0.03 });
  }

  function an()  { try { localStorage.setItem(SPEICHER, 'an');  } catch (e) {} }
  function aus() { try { localStorage.setItem(SPEICHER, 'aus'); } catch (e) {} }

  window.FLOWKlang = {
    schwelle: schwelle,
    siegel: siegel,
    tief: tief,
    an: an,
    aus: aus,
    /* Fuer den Fall, dass ein Aufrufer den Kontext frueh wecken will,
       solange die Nutzergeste noch frisch ist.                      */
    wecken: function () { if (erlaubt()) aufbauen(); }
  };

  window.__klang = {
    stand: function () {
      return {
        erlaubt: erlaubt(),
        kontext: ctx ? ctx.state : 'noch nicht gebaut',
        abtastrate: ctx ? ctx.sampleRate : null,
        hallSekunden: HALL_SEK,
        schalter: (function () {
          try { return localStorage.getItem(SPEICHER) || 'an (Vorgabe)'; }
          catch (e) { return 'nicht lesbar'; }
        })()
      };
    },
    vorfuehren: function () {
      schwelle();
      setTimeout(siegel, 4200);
      return 'Schwelle jetzt, Siegel nach 4,2 s. Muss aus einem Klick kommen, sonst blockt der Browser.';
    }
  };
})();
