/* ══════════════════════════════════════════════════════════════════
   KONTO-SICHERUNG

   Bis hierher lebte der gesamte Fortschritt nur im Browser: Verlauf,
   Bestwerte, Serie, Glut, Rang. Ein neues Gerät, ein geleerter
   Browser — und alles war weg. Nur der Trainingsplan lag in
   Firestore, weil ihn die Anmeldeseite dort ablegt.

   Diese Datei hängt den Rest ans Konto.

   WIE ES ARBEITET
     Lesen läuft weiter über den Browserspeicher — sofort und ohne
     Warten. Firestore wird nur beim Start abgeglichen und danach im
     Hintergrund beschrieben. Die App merkt nichts davon und läuft
     unverändert weiter, auch wenn niemand angemeldet ist.

     Beim Start wird verglichen, welcher Stand jünger ist. Liegt in
     der Cloud ein neuerer, wird er übernommen und die Seite einmal
     neu geladen — nur so sieht die bereits laufende App die Daten.

   ANGEHÄNGT WIRD an window.storage.set — den Haken, den die App für
   externe Speicher ohnehin schon vorsieht. Lesen wird bewusst NICHT
   überschrieben: sonst wartete jeder Zugriff auf das Netz.
   ══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  if (window.__kontoSync) return;

  var CONFIG = {
    apiKey: "AIzaSyDRaVXN4Vh7OeG5Q8ICNcKm5sGKhry5qos",
    authDomain: "calisthanics-flow.firebaseapp.com",
    projectId: "calisthanics-flow",
    storageBucket: "calisthanics-flow.firebasestorage.app",
    messagingSenderId: "453464377754",
    appId: "1:453464377754:web:231dff88e882af1c3d9223"
  };

  /* Was ans Konto gehört. Die Schlüssel tragen in der App das
     Präfix `flow_`. Reine Anzeigeeinstellungen bleiben lokal —
     wer auf dem Handy den Ton ausschaltet, will ihn am Rechner
     nicht auch stumm haben.                                      */
  var SCHLUESSEL = [
    'history-state',    // Trainingsverlauf — die Grundlage von allem
    'pr-log',           // Bestwerte
    'pr-state',
    'streak-state',     // Serie
    'plan-start',       // Beginn des Plans
    'session-state',    // laufende Einheit
    'recovery-state',
    'opendays',
    'rotor-order',      // eigene Reihenfolge der Übungen
    'nega', 'nonum', 'wear'
  ];
  /* Ohne `flow_`-Präfix, weil das Rangsystem einen eigenen Namen
     benutzt.                                                      */
  var ROH_SCHLUESSEL = ['flow_rang-state', 'flow_training_plan', 'flow_eigene_uebungen'];

  var STAND_MARKE = 'flow_sync_stand';   // wann zuletzt abgeglichen
  var db = null, nutzer = null, bereit = false;
  var offen = false, uhr = null;

  /* ── Firebase nachladen ───────────────────────────────────── */

  function skript(src) {
    return new Promise(function (ja, nein) {
      var s = document.createElement('script');
      s.src = src; s.onload = ja; s.onerror = nein;
      document.head.appendChild(s);
    });
  }

  function firebaseLaden() {
    if (window.firebase && window.firebase.firestore) return Promise.resolve(true);
    var b = 'https://www.gstatic.com/firebasejs/10.12.2/';
    return skript(b + 'firebase-app-compat.js')
      .then(function () { return skript(b + 'firebase-auth-compat.js'); })
      .then(function () { return skript(b + 'firebase-firestore-compat.js'); })
      .then(function () { return true; })
      .catch(function () { return false; });
  }

  /* ── Den lokalen Stand einsammeln ─────────────────────────── */

  function lokalLesen() {
    var d = {};
    SCHLUESSEL.forEach(function (k) {
      try { var v = localStorage.getItem('flow_' + k); if (v != null) d[k] = v; } catch (e) {}
    });
    ROH_SCHLUESSEL.forEach(function (k) {
      try { var v = localStorage.getItem(k); if (v != null) d['@' + k] = v; } catch (e) {}
    });
    return d;
  }

  function lokalSchreiben(d) {
    if (!d) return 0;
    var n = 0;
    Object.keys(d).forEach(function (k) {
      if (k === '_stand') return;
      try {
        if (k.charAt(0) === '@') localStorage.setItem(k.slice(1), d[k]);
        else localStorage.setItem('flow_' + k, d[k]);
        n++;
      } catch (e) {}
    });
    return n;
  }

  /* Wie viel Substanz steckt im Stand? Verhindert, dass ein leerer
     Erstaufruf einen vollen Verlauf in der Cloud überschreibt.    */
  function gewicht(d) {
    if (!d) return -1;
    var g = 0;
    Object.keys(d).forEach(function (k) {
      if (k === '_stand') return;
      var v = d[k];
      if (typeof v === 'string' && v.length > 2 && v !== '{}' && v !== '[]') g += v.length;
    });
    return g;
  }

  /* ── Hochladen, gedrosselt ────────────────────────────────── */

  function hochladen() {
    if (!bereit || !db || !nutzer) return;
    var d = lokalLesen();
    d._stand = Date.now();
    db.collection('users').doc(nutzer.uid)
      .set({ appDaten: d, appStand: d._stand }, { merge: true })
      .then(function () {
        try { localStorage.setItem(STAND_MARKE, String(d._stand)); } catch (e) {}
      })
      .catch(function (e) { console.warn('Konto-Sicherung fehlgeschlagen:', e.code || e); });
  }

  function anstossen() {
    if (!bereit) return;
    offen = true;
    clearTimeout(uhr);
    /* Gesammelt statt bei jedem Satz: ein Training loest sonst
       hunderte Schreibvorgaenge aus.                              */
    uhr = setTimeout(function () { offen = false; hochladen(); }, 4000);
  }

  /* Beim Verlassen der Seite noch offene Aenderungen wegschreiben. */
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden' && offen) { clearTimeout(uhr); offen = false; hochladen(); }
  });
  window.addEventListener('pagehide', function () { if (offen) hochladen(); });

  /* ── Der Haken, den die App schon vorsieht ────────────────── */

  var vorhanden = window.storage;
  window.storage = {
    set: function (key, value) {
      /* Die App schreibt selbst in den Browserspeicher — hier wird
         nur vermerkt, dass sich etwas geaendert hat.              */
      if (SCHLUESSEL.indexOf(key) >= 0) anstossen();
      if (vorhanden && typeof vorhanden.set === 'function') {
        try { return vorhanden.set(key, value, false); } catch (e) {}
      }
      return Promise.resolve();
    }
    /* get bleibt bewusst weg: die App soll aus dem Browserspeicher
       lesen, ohne auf das Netz zu warten.                         */
  };

  /* Das Rangsystem schreibt an der Schnittstelle vorbei direkt in
     den Speicher. Damit auch das ankommt, wird setItem umhuellt. */
  (function () {
    var echt = localStorage.setItem.bind(localStorage);
    localStorage.setItem = function (k, v) {
      var r = echt(k, v);
      if (ROH_SCHLUESSEL.indexOf(k) >= 0) anstossen();
      return r;
    };
  })();

  /* ── Start: abgleichen ────────────────────────────────────── */

  function abgleichen(daten) {
    var fern = daten && daten.appDaten;
    var fernStand = (daten && daten.appStand) || 0;
    var lokalStand = 0;
    try { lokalStand = parseInt(localStorage.getItem(STAND_MARKE), 10) || 0; } catch (e) {}

    var hier = lokalLesen();

    if (!fern) { hochladen(); return; }                 // erste Sicherung

    /* Der fernere Stand gewinnt nur, wenn er juenger UND nicht
       duenner ist. Sonst loescht ein leeres Zweitgeraet die
       Geschichte des Hauptgeraets.                                */
    var fernJuenger = fernStand > lokalStand;
    var fernHatMehr = gewicht(fern) >= gewicht(hier);

    if (fernJuenger && fernHatMehr) {
      var n = lokalSchreiben(fern);
      try { localStorage.setItem(STAND_MARKE, String(fernStand)); } catch (e) {}
      if (n) {
        /* Die App hat ihren Zustand beim Start schon gelesen —
           ohne Neuladen bliebe der alte auf dem Schirm.           */
        console.info('Konto-Stand übernommen (' + n + ' Einträge) — Seite wird neu geladen.');
        location.reload();
      }
      return;
    }

    if (gewicht(hier) > gewicht(fern) || lokalStand > fernStand) hochladen();
  }

  firebaseLaden().then(function (ok) {
    if (!ok || !window.firebase) return;
    try {
      if (!firebase.apps.length) firebase.initializeApp(CONFIG);
      db = firebase.firestore();
      firebase.auth().onAuthStateChanged(function (u) {
        nutzer = u || null;
        if (!nutzer) { bereit = false; return; }
        bereit = true;
        db.collection('users').doc(nutzer.uid).get()
          .then(function (doc) { abgleichen(doc.exists ? doc.data() : null); })
          .catch(function (e) { console.warn('Konto-Stand nicht lesbar:', e.code || e); });
      });
    } catch (e) { console.warn('Konto-Sicherung nicht möglich:', e); }
  });

  window.__kontoSync = {
    jetztSichern: hochladen,
    stand: function () {
      return { angemeldet: !!nutzer, bereit: bereit,
               schluessel: SCHLUESSEL.length + ROH_SCHLUESSEL.length,
               lokal: lokalLesen() };
    }
  };
})();
