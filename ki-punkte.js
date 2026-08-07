/* =============================================================
   FLOW — Das Punktezeichen der KI
   =============================================================

   15 Punkte, gleich gross, die dauernd wandern. Alle vier Sekunden
   ordnen sie sich zum FLOW-Zeichen, dazwischen zu abstrakten
   Mustern. Sitzt als Profilbild neben jeder Antwort der KI.

   DREI ENTSCHEIDUNGEN

   1. EIN Taktgeber fuer ALLE Zeichen. Neben jeder Antwort steht
      eines; bei sieben Runden waeren das sieben eigene
      Animationsschleifen. Stattdessen rechnet eine Schleife die
      Lagen einmal aus und zeichnet sie in jede angemeldete
      Leinwand. Nebeneffekt: alle Zeichen laufen synchron, was
      ruhiger aussiehr als ein Feld aus Einzelgaengern.

   2. Die 15 Lagen stammen vom echten Logo — per k-means aus den
      265 abgetasteten Punkten auf 15 Schwerpunkte eingedampft.
      Erkennbar ist das Zeichen bei 15 Punkten nicht mehr, aber
      die Anordnung ist geerbt und nicht erfunden.

   3. Die Punkte RUHEN NIE. Jeder bricht zu einem eigenen
      Zeitpunkt auf; waehrend die einen ankommen, starten die
      anderen erst. Alle gleichzeitig loszuschicken war der erste
      Versuch — das liest sich als bam, Stopp, bam.
   ============================================================= */

(function () {
  'use strict';

  /* Das FLOW-Zeichen, auf 15 Schwerpunkte reduziert. */
  var LOGO = [0.012,-0.671,0.367,-0.436,0.006,-0.35,0.515,-0.269,0.318,-0.172,0.112,-0.069,-0.397,-0.205,-0.144,-0.069,-0.361,0.1,-0.685,0.219,0.671,0.208,0.35,0.092,-0.009,0.173,0.007,0.397,0.011,0.67];

  var ANZAHL   = LOGO.length / 2;
  var PHASE_MS = 2000;    /* Muster, Logo, Muster, Logo -> Logo alle 4 s */
  var REISE    = 0.62;    /* Anteil der Phase, den EIN Punkt unterwegs ist */
  var VERSATZ  = 0.36;    /* bis hierhin streuen die Aufbruchszeitpunkte  */

  /* ---------- Die Muster ----------
     Absichtlich verschieden dicht: ein Ring nutzt den Rand, die
     Spirale die Mitte. So wirkt jeder Wechsel wie eine Bewegung
     und nicht wie ein Austausch.                                  */
  var MUSTER = [
    function ring(i, n, z) {
      var w = i / n * Math.PI * 2;
      return [Math.cos(w) * 0.74, Math.sin(w) * 0.74];
    },
    function spirale(i, n, z) {
      var w = i * 2.39996, r = Math.sqrt((i + 0.5) / n) * 0.82;
      return [Math.cos(w + z * 0.3) * r, Math.sin(w + z * 0.3) * r];
    },
    function doppelring(i, n, z) {
      var aussen = i % 2 === 0, w = i / n * Math.PI * 4, r = aussen ? 0.80 : 0.34;
      return [Math.cos(w + (aussen ? z : -z)) * r, Math.sin(w + (aussen ? z : -z)) * r];
    },
    function welle(i, n, z) {
      var x = (i / (n - 1)) * 1.6 - 0.8;
      return [x, Math.sin(x * 3.4 + z) * 0.42];
    },
    function saeule(i, n, z) {
      var t = i / (n - 1), w = t * Math.PI * 4 + z;
      return [Math.cos(w) * 0.34, t * 1.6 - 0.8];
    }
  ];

  /* ---------- Der gemeinsame Zustand ---------- */
  var punkte = [];
  for (var i = 0; i < ANZAHL; i++) {
    punkte.push({
      ax: LOGO[i * 2], ay: LOGO[i * 2 + 1],
      x:  LOGO[i * 2], y:  LOGO[i * 2 + 1],
      zx: LOGO[i * 2], zy: LOGO[i * 2 + 1],
      versatz: Math.random() * VERSATZ,
      /* Zwei Wanderphasen mit verschiedenen Frequenzen. Eine allein
         ergibt einen sauberen Kreis — und ein sauberer Kreis sieht
         wieder nach Mechanik aus.                                */
      ph:  Math.random() * Math.PI * 2,
      ph2: Math.random() * Math.PI * 2,
      rd:  0.030 + Math.random() * 0.030,
      rd2: 0.014 + Math.random() * 0.018
    });
  }

  var istLogo = true, aktuell = 0, letztes = -1, phasenStart = 0;

  function naechstePhase(jetzt) {
    phasenStart = jetzt;
    istLogo = !istLogo;
    if (!istLogo) {
      var n;
      do { n = Math.floor(Math.random() * MUSTER.length); }
      while (n === letztes && MUSTER.length > 1);
      aktuell = n; letztes = n;
    }
    var z = jetzt * 0.0004;
    for (var i = 0; i < ANZAHL; i++) {
      var p = punkte[i];
      /* Neuer Start ist die Lage, die der Punkt GERADE hat — nicht
         sein altes Ziel. Wer beim Wechsel noch unterwegs war, macht
         von dort weiter, statt zu springen.                      */
      p.ax = p.x; p.ay = p.y;
      var l = istLogo ? [LOGO[i * 2], LOGO[i * 2 + 1]]
                      : MUSTER[aktuell](i, ANZAHL, z);
      p.zx = l[0]; p.zy = l[1];
    }
  }

  /* ---------- Die angemeldeten Zeichen ---------- */
  var zeichen = [];   /* { leinwand, ctx, breite, hoehe, mass } */
  var sanft = window.matchMedia &&
              window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function messen(z) {
    var r = z.leinwand.getBoundingClientRect();
    var dp = Math.min(window.devicePixelRatio || 1, 2);
    z.breite = Math.max(1, Math.round(r.width));
    z.hoehe  = Math.max(1, Math.round(r.height));
    z.leinwand.width  = z.breite * dp;
    z.leinwand.height = z.hoehe * dp;
    z.ctx.setTransform(dp, 0, 0, dp, 0, 0);
    z.mass = Math.min(z.breite, z.hoehe) * 0.40;
    /* MUSS hier stehen: eine Zuweisung an leinwand.width setzt den
       ganzen 2D-Kontext zurueck, auch fillStyle — zurueck auf
       Schwarz. Einmal beim Start zu faerben genuegt also nicht. */
    faerben(z);
  }

  /* Die Farbe kommt aus dem CSS (color). So folgt das Zeichen dem
     Thema, ohne dass hier eine zweite Wahrheit entsteht.        */
  function faerben(z) {
    var c = getComputedStyle(z.leinwand).getPropertyValue('color');
    z.ctx.fillStyle = (c && c.trim()) || '#1A73E8';
  }

  var laeuft = true, angefordert = 0;

  function bild(jetzt) {
    angefordert = 0;
    if (!laeuft || !zeichen.length) return;

    if (!phasenStart) phasenStart = jetzt;
    if (jetzt - phasenStart > PHASE_MS) naechstePhase(jetzt);

    var t = jetzt * 0.001;
    var lauf = (jetzt - phasenStart) / PHASE_MS;
    /* Das ganze Feld dreht und atmet leicht — dadurch steht auch
       ein fertiges Muster nie still.                            */
    var dreh = Math.sin(t * 0.13) * 0.10;
    var atem = 1 + Math.sin(t * 0.31) * 0.03;
    var co = Math.cos(dreh), si = Math.sin(dreh);

    for (var k = 0; k < zeichen.length; k++) {
      var z = zeichen[k];
      if (!z.breite) continue;
      z.ctx.clearRect(0, 0, z.breite, z.hoehe);
      var mx = z.breite / 2, my = z.hoehe / 2;
      /* Alle Punkte gleich gross — bewusst. Verschiedene Groessen
         lesen sich als Tiefe; hier soll es ein Zeichen sein, keine
         Wolke.                                                   */
      var gr = Math.max(1.05, z.mass * 0.115);

      for (var i = 0; i < ANZAHL; i++) {
        var p = punkte[i];

        /* Eigenes Zeitfenster je Punkt. Smoothstep: sanft los,
           sanft an — aber ohne Wartezeit dazwischen.            */
        var lp = (lauf - p.versatz) / REISE;
        lp = lp < 0 ? 0 : (lp > 1 ? 1 : lp);
        var e = sanft ? 1 : lp * lp * (3 - 2 * lp);

        p.x = p.ax + (p.zx - p.ax) * e;
        p.y = p.ay + (p.zy - p.ay) * e;

        var wx = p.x, wy = p.y;
        if (!sanft) {
          wx += Math.cos(t * 0.62 + p.ph)  * p.rd
              + Math.sin(t * 0.24 + p.ph2) * p.rd2;
          wy += Math.sin(t * 0.71 + p.ph)  * p.rd
              + Math.cos(t * 0.19 + p.ph2) * p.rd2;
        }

        var rx = (wx * co - wy * si) * atem;
        var ry = (wx * si + wy * co) * atem;

        z.ctx.beginPath();
        z.ctx.arc(mx + rx * z.mass, my + ry * z.mass, gr, 0, 6.2832);
        z.ctx.fill();
      }
    }

    if (!sanft) anfordern();
  }

  function anfordern() {
    if (!angefordert && laeuft) angefordert = requestAnimationFrame(bild);
  }

  /* ---------- Anmelden ---------- */
  function anhaengen(leinwand) {
    if (!leinwand || leinwand.__dabei) return;
    leinwand.__dabei = true;
    var z = { leinwand: leinwand, ctx: leinwand.getContext('2d'),
              breite: 0, hoehe: 0, mass: 0 };
    zeichen.push(z);
    messen(z);
    /* Ein ResizeObserver statt eines einmaligen Messens: Das Zeichen
       wird eingeschaltet, waehrend die Blase noch aufklappt. Wer in
       diesem Moment einmal misst, bekommt 0 x 0.                 */
    if (window.ResizeObserver) {
      new ResizeObserver(function () { messen(z); anfordern(); }).observe(leinwand);
    }
    anfordern();
  }

  /* Nicht rechnen, wenn niemand hinsieht. */
  document.addEventListener('visibilitychange', function () {
    laeuft = !document.hidden;
    if (laeuft) { phasenStart = 0; anfordern(); }
  });
  window.addEventListener('resize', function () {
    for (var i = 0; i < zeichen.length; i++) messen(zeichen[i]);
    anfordern();
  }, { passive: true });

  window.FLOWPunkte = { anhaengen: anhaengen };
})();
