/* ══════════════════════════════════════════════════════════════════
   VORSCHAU-STREIFEN

   Erscheint nur, wenn app-kopf.js (genauer: der fruehe Wurzel-Filter
   ganz oben in app.html) window.__vorschau gesetzt hat. Sagt offen,
   dass hier ein erfundenes Profil zu sehen ist — sonst haelt jemand
   seine Uebungen und Zahlen fuer echt gespeichert, obwohl sie beim
   naechsten Leeren des Browsers verschwinden.

   Baut auf demselben Muster wie beta-hinweis.js: --fx2-nav-h haelt
   fest, wie viel Platz oben schon verbraucht ist. Der Beta-Streifen
   hat diese Variable bereits um seine eigene Hoehe erweitert — hier
   wird nur noch einmal draufgelegt, nicht neu gerechnet.

   Deshalb MUSS diese Datei NACH beta-hinweis.js eingebunden sein.
   ══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  if (!window.__vorschau) return;
  if (window.__vorschauHinweis) return;
  window.__vorschauHinweis = true;

  var CSS = [
    '#vorschau-band{',
      'position:fixed;left:0;right:0;z-index:204;',
      'display:flex;align-items:center;justify-content:center;gap:10px;',
      'background:var(--ember,#E8492B);',
      'border-bottom:1px solid rgba(255,255,255,.22);',
      'padding:7px 14px;',
      'font-family:var(--font-display,"Helvetica Neue",Inter,system-ui,sans-serif);',
      'line-height:1.25;text-align:center;',
      '-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);',
    '}',
    '#vorschau-band .v-marke{',
      'flex:0 0 auto;',
      'background:#fff;color:var(--ember,#E8492B);',
      'font-size:9px;font-weight:900;letter-spacing:.18em;text-transform:uppercase;',
      'padding:3px 7px;',
    '}',
    '#vorschau-band .v-text{',
      'color:#fff;font-size:11px;font-weight:600;letter-spacing:.01em;',
    '}',
    '#vorschau-band .v-knopf{',
      'flex:0 0 auto;background:#fff;color:var(--ember,#E8492B);',
      'font-family:inherit;font-size:10.5px;font-weight:800;',
      'letter-spacing:.04em;border:0;border-radius:100px;',
      'padding:5px 12px;cursor:pointer;',
    '}',
    '@media (max-width:560px){',
      '#vorschau-band{padding:6px 10px;gap:7px}',
      '#vorschau-band .v-text{font-size:10px}',
      '#vorschau-band .v-lang{display:none}',
    '}',
    '@media (min-width:561px){',
      '#vorschau-band .v-kurz{display:none}',
    '}',
  ].join('');

  var band = null;

  /* Setzt sich UNTER das, was schon da ist (Nav + evtl. Beta-Band),
     und schreibt --fx2-nav-h ein zweites Mal fort, damit der
     eigentliche Seiteninhalt nicht darunter verschwindet.          */
  function ausrichten() {
    if (!band) return;
    var wurzel = document.documentElement;
    var bisher = parseFloat(getComputedStyle(wurzel).getPropertyValue('--fx2-nav-h')) || 46;

    band.style.top = bisher + 'px';
    var bandH = band.getBoundingClientRect().height;
    wurzel.style.setProperty('--fx2-nav-h', (bisher + bandH) + 'px');
  }

  function bauen() {
    if (document.getElementById('vorschau-band')) return;

    var stil = document.createElement('style');
    stil.id = 'vorschau-band-stil';
    stil.textContent = CSS;
    document.head.appendChild(stil);

    band = document.createElement('div');
    band.id = 'vorschau-band';
    band.setAttribute('role', 'status');
    band.innerHTML =
      '<span class="v-marke">Vorschau</span>' +
      '<span class="v-text">' +
        '<span class="v-lang">Beispieldaten — nichts wird gespeichert</span>' +
        '<span class="v-kurz">Beispieldaten</span>' +
      '</span>' +
      '<button class="v-knopf" id="vorschau-anmelden">Jetzt anmelden</button>';
    document.body.appendChild(band);

    document.getElementById('vorschau-anmelden').addEventListener('click', function () {
      window.location.href = 'anmeldung.html';
    });

    ausrichten();
    /* Der Beta-Streifen misst sich selbst kurz nach dem ersten
       Versuch neu (Navigation baut sich erst per JS auf) — derselbe
       zweite Anlauf hier, sonst haengen die Hoehen einmal falsch. */
    setTimeout(ausrichten, 450);
    window.addEventListener('resize', ausrichten, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bauen);
  } else {
    bauen();
  }
})();
