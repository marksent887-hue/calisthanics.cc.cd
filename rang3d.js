/* ══════════════════════════════════════════════════════════════════
   DIE ESSE — der Rang als echtes 3D-Objekt

   Ersetzt das Standbild im Wappenfeld durch das gerechnete Modell.
   Drehen mit Finger oder Maus, sonst dreht es langsam von selbst.
   Beim Aufstieg geht das alte Objekt in das neue ueber.

   Die Objekte kommen jetzt PROZEDURAL aus rangobjekt.js — nicht mehr
   als Daten-URI-GLB aus rang-modelle.js. Kein GLTFLoader mehr noetig,
   keine 710 KB Base64 mehr im Netz. Ein Rang entsteht aus fuenf
   Zahlen (stufe, kern, ringe, spangen, felder), nicht aus einer
   Datei — deshalb gibt es auch kein "Laden" mehr im eigentlichen
   Sinn, nur noch "Erzeugen".

   Faellt lautlos auf das Standbild (SVG) zurueck, wenn WebGL oder
   rangobjekt.js fehlen.
   ══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  if (window.__rang3d) return;

  var THREE = window.FLOW3D && window.FLOW3D.THREE;
  var OrbitControls = window.FLOW3D && window.FLOW3D.OrbitControls;
  var RANGOBJEKT = window.RANGOBJEKT;
  if (!THREE || !RANGOBJEKT) return;

  var BELICHTUNG = 1.02;
  var AUTODREHUNG = 0.28;      // Umdrehungen je Minute

  /* ── Einpassen: jedes Objekt exakt auf einen Fuellgrad des Rahmens
     skalieren und zentrieren, unabhaengig von seiner tatsaechlichen
     Geometrie. Ohne das ragt eine hohe Stufe aus dem Feld, waehrend
     eine flache winzig bleibt.                                     */
  function einpassen(gruppe, kamera, fuellung) {
    var punkte = [];
    gruppe.updateMatrixWorld(true);
    gruppe.traverse(function (o) {
      var g = o.geometry;
      if (!g || !g.attributes || !g.attributes.position) return;
      var a = g.attributes.position, v = new THREE.Vector3();
      for (var i = 0; i < a.count; i++) {
        v.fromBufferAttribute(a, i).applyMatrix4(o.matrixWorld);
        punkte.push(v.x, v.y, v.z);
      }
    });
    if (!punkte.length) return;

    var v2 = new THREE.Vector3();
    function messen() {
      kamera.updateMatrixWorld(true);
      var vp = new THREE.Matrix4().multiplyMatrices(kamera.projectionMatrix, kamera.matrixWorldInverse);
      var x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
      for (var i = 0; i < punkte.length; i += 3) {
        v2.set(punkte[i], punkte[i + 1], punkte[i + 2])
          .applyMatrix4(gruppe.matrixWorld).applyMatrix4(vp);
        if (v2.x < x0) x0 = v2.x; if (v2.x > x1) x1 = v2.x;
        if (v2.y < y0) y0 = v2.y; if (v2.y > y1) y1 = v2.y;
      }
      return { b: x1 - x0, h: y1 - y0, mx: (x0 + x1) / 2, my: (y0 + y1) / 2 };
    }

    var rechts = new THREE.Vector3(), hoch = new THREE.Vector3();
    kamera.matrixWorld.extractBasis(rechts, hoch, new THREE.Vector3());
    var halb = Math.tan(THREE.MathUtils.degToRad(kamera.fov) / 2) * kamera.position.length();

    for (var n = 0; n < 5; n++) {
      gruppe.updateMatrixWorld(true);
      var r = messen();
      gruppe.scale.multiplyScalar((fuellung * 2) / Math.max(r.b, r.h));
      gruppe.updateMatrixWorld(true);
      var r2 = messen();
      gruppe.position.addScaledVector(rechts, -r2.mx * halb * kamera.aspect);
      gruppe.position.addScaledVector(hoch, -r2.my * halb);
    }
  }

  /* ── Der Betrachter ───────────────────────────────────────────── */

  function Betrachter(behaelter) {
    var self = this;
    this.behaelter = behaelter;
    this.laeuft = false;
    this.sichtbar = false;
    this.modelle = {};
    this.aktiv = null;
    this.uebergang = null;
    this.lichtStufe = 0;
    this.licht = [];

    /* Absolut im Feld, nicht `height:100%`: das Wappenfeld bekommt
       seine Hoehe nur ueber aspect-ratio, hat also keine aufloesbare
       Hoehe. Ein height:100% darin faellt auf 0 zusammen — der
       Betrachter rechnet dann korrekt, malt aber ins Nichts.        */
    var leinwand = document.createElement('canvas');
    leinwand.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;' +
                             'display:block;touch-action:none;cursor:grab';
    this.leinwand = leinwand;

    try {
      this.renderer = new THREE.WebGLRenderer({
        canvas: leinwand, antialias: true, alpha: false,
        powerPreference: 'low-power',
      });
    } catch (e) { this.fehler = true; return; }

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    /* Opakes Schwarz, nicht transparent: das Glas braucht etwas zum
       Brechen, sonst saeuft es ab. Der Grund der Seite ist ohnehin
       reines Schwarz, also faellt kein Kasten auf.                  */
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = BELICHTUNG;
    this.renderer.transmissionResolutionScale = 0.5;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.szene = new THREE.Scene();
    this.szene.environment = RANGOBJEKT.erzeugeUmgebung(this.renderer);
    this.kamera = new THREE.PerspectiveCamera(18, 1, 0.05, 200);
    this.kamera.position.set(0, 0, 12);
    this.kamera.lookAt(0, 0, 0);

    this.halter = new THREE.Group();
    this.szene.add(this.halter);

    /* Nur drehen. Zoomen und Verschieben wuerden das Symbol aus dem
       Rahmen tragen und den Bildausschnitt zerstoeren.              */
    if (OrbitControls) {
      this.steuerung = new OrbitControls(this.kamera, leinwand);
      this.steuerung.enableZoom = false;
      this.steuerung.enablePan = false;
      this.steuerung.enableDamping = true;
      this.steuerung.dampingFactor = 0.075;
      /* Bewusst traege: das Feld ist nur rund 150 px breit, bei
         voller Geschwindigkeit schleudert ein kurzer Wisch das
         Modell um 180 Grad.                                        */
      this.steuerung.rotateSpeed = 0.55;
      this.steuerung.minPolarAngle = Math.PI * 0.16;
      this.steuerung.maxPolarAngle = Math.PI * 0.84;
      this.steuerung.addEventListener('start', function () {
        self.angefasst = true;
        clearTimeout(self.ruheUhr);
        leinwand.style.cursor = 'grabbing';
      });
      this.steuerung.addEventListener('end', function () {
        leinwand.style.cursor = 'grab';
        /* Nach einer Ruhepause dreht es wieder von selbst weiter —
           sonst steht das Symbol nach der ersten Beruehrung fuer
           immer still.                                             */
        clearTimeout(self.ruheUhr);
        self.ruheUhr = setTimeout(function () { self.angefasst = false; }, 3500);
      });
    }

    behaelter.appendChild(leinwand);
    this.beobachten();
    this.uhr = new THREE.Clock();
  }

  /* Rechnet nur, wenn das Feld auch zu sehen ist. Sonst laeuft auf
     dem Handy im Hintergrund dauernd der Renderer.                  */
  Betrachter.prototype.beobachten = function () {
    var self = this;
    if (!window.IntersectionObserver) { this.sichtbar = true; return; }
    new IntersectionObserver(function (e) {
      self.sichtbar = e[0].isIntersecting;
      if (self.sichtbar) self.starten();
    }, { threshold: 0.05 }).observe(this.behaelter);
  };

  Betrachter.prototype.groesse = function () {
    var b = this.behaelter.clientWidth || 200;
    var h = this.behaelter.clientHeight || b;
    if (this.breite === b && this.hoehe === h) return;
    this.breite = b; this.hoehe = h;
    this.renderer.setSize(b, h, false);
    this.kamera.aspect = b / h;
    this.kamera.updateProjectionMatrix();
  };

  /* beleuchteSzene() FUEGT Lichter hinzu, sie ersetzt keine. Bei
     jedem Stufenwechsel muessten sonst immer mehr Lichter in der
     Szene stehen. Deshalb: vorher/nachher-Vergleich der Kinder, und
     nur der Zuwachs gilt als "Licht dieser Stufe" und fliegt beim
     naechsten Wechsel wieder raus.                                  */
  Betrachter.prototype.beleuchten = function (stufe) {
    if (this.lichtStufe === stufe) return;
    var self = this;
    this.licht.forEach(function (o) { self.szene.remove(o); });
    var vorher = this.szene.children.slice();
    RANGOBJEKT.beleuchteSzene(this.szene, stufe);
    this.licht = this.szene.children.filter(function (o) { return vorher.indexOf(o) < 0; });
    this.lichtStufe = stufe;
  };

  /* Erzeugt (oder holt aus dem Zwischenspeicher) das Objekt fuer
     genau diese Werte. Zwei Nutzer auf derselben Stufe koennen
     verschiedene kern/ringe/spangen/felder haben — deshalb ist der
     Schluessel die volle Kombination, nicht nur die Stufe.          */
  Betrachter.prototype.erzeugen = function (w) {
    var schluessel = w.stufe + '|' + w.kern + '|' + w.ringe + '|' + w.spangen + '|' + (w.felder || []).join(',');
    if (this.modelle[schluessel]) return this.modelle[schluessel];

    this.beleuchten(w.stufe);

    var g = RANGOBJEKT.erzeugeRangObjekt({
      stufe: w.stufe, kern: w.kern, ringe: w.ringe,
      spangen: w.spangen, felder: w.felder
    });

    var aussen = new THREE.Group();
    this.halter.add(aussen);
    aussen.add(g);
    this.kamera.updateProjectionMatrix();
    einpassen(g, this.kamera, 0.88);
    this.halter.remove(aussen);

    this.modelle[schluessel] = { gruppe: aussen, schluessel: schluessel };
    return this.modelle[schluessel];
  };

  /* Rang zeigen. Mit `morph` geht das alte Objekt ins neue ueber,
     statt hart getauscht zu werden.                                 */
  Betrachter.prototype.zeigen = function (w, morph) {
    var eintrag = this.erzeugen(w);
    if (this.aktivSchluessel === eintrag.schluessel && !morph) return;
    var vorher = this.aktiv;
    this.aktivSchluessel = eintrag.schluessel;
    var neu = eintrag.gruppe;

    if (morph && vorher && vorher !== neu) {
      this.halter.add(neu);
      this.uebergang = { alt: vorher, neu: neu, t: 0, dauer: 1.25 };
      neu.scale.setScalar(0.001);
    } else {
      this.halter.clear();
      this.halter.add(neu);
      neu.scale.setScalar(1);
      this.sichtbarSetzen(neu, 1);
    }
    this.aktiv = neu;
    this.starten();
  };

  /* Ersetzt das alte veredeln()/userData.ur der GLTF-Fassung: hier
     merkt sich jedes Material beim ERSTEN Kontakt seine eigene
     Ausgangs-Deckkraft, egal welches Material es ist. Keine
     Kenntnis von "Kante" oder Kristallglas mehr noetig.             */
  Betrachter.prototype.sichtbarSetzen = function (knoten, wert) {
    knoten.traverse(function (o) {
      if (!o.material) return;
      var liste = Array.isArray(o.material) ? o.material : [o.material];
      liste.forEach(function (m) {
        if (m.userData.opakBasis == null) {
          m.userData.opakBasis = m.opacity == null ? 1 : m.opacity;
        }
        var basis = m.userData.opakBasis;
        if (wert >= 1) {
          m.opacity = basis;
          m.transparent = basis < 1;
        } else {
          m.transparent = true;
          m.opacity = basis * wert;
        }
      });
    });
  };

  Betrachter.prototype.starten = function () {
    if (this.laeuft || this.fehler) return;
    this.laeuft = true;
    var self = this;
    (function schleife() {
      if (!self.laeuft) return;
      requestAnimationFrame(schleife);
      if (!self.sichtbar) return;
      self.bild();
    })();
  };

  Betrachter.prototype.bild = function () {
    this.groesse();
    var dt = Math.min(0.05, this.uhr.getDelta());

    /* Uebergang zwischen zwei Raengen */
    var u = this.uebergang;
    if (u) {
      u.t += dt / u.dauer;
      var t = Math.min(1, u.t);
      var w = t * t * (3 - 2 * t);
      u.alt.scale.setScalar(1 - 0.85 * w);
      u.alt.rotation.y += dt * 3.4;
      this.sichtbarSetzen(u.alt, 1 - w);
      u.neu.scale.setScalar(0.15 + 0.85 * w);
      this.sichtbarSetzen(u.neu, w);
      if (t >= 1) {
        this.halter.remove(u.alt);
        u.neu.scale.setScalar(1);
        this.sichtbarSetzen(u.neu, 1);
        this.uebergang = null;
      }
    }

    if (!this.angefasst && this.aktiv && !u) {
      this.aktiv.rotation.y += dt * AUTODREHUNG * Math.PI * 2 / 60 * 10;
    }
    if (this.steuerung) this.steuerung.update();
    this.renderer.render(this.szene, this.kamera);
  };

  /* ── Anbindung an die Seite ───────────────────────────────────
     Die vollen Werte (stufe, kern, ringe, spangen, felder) stehen
     als JSON in data-wappen auf dem Feld — app.html traegt sie beim
     Zeichnen des Standbilds dort ein (siehe wappenIn()). Kein
     Eingriff in ihren sonstigen Code.                              */

  var betrachter = null;

  function wappenAusFeld(feld) {
    var roh = feld.getAttribute('data-wappen');
    if (!roh) return null;
    try { return JSON.parse(roh); } catch (e) { return null; }
  }

  var vorfuehrungBis = 0;

  function anbinden() {
    var feld = document.getElementById('esse-wappen');
    if (!feld) return;
    var w = wappenAusFeld(feld);
    if (!w) return;
    /* Waehrend einer Vorfuehrung nicht mit der App abgleichen — sonst
       zieht sie den Rang sofort wieder auf den echten Stand zurueck. */
    if (Date.now() < vorfuehrungBis) return;

    if (!betrachter) {
      betrachter = new Betrachter(feld);
      if (betrachter.fehler) { betrachter = null; return; }   // Standbild bleibt
      window.__rang3d.betrachter = betrachter;
    }

    /* Die App baut das Wappenfeld bei jeder Aenderung neu auf
       (innerHTML = '') und wirft die Leinwand dabei hinaus. Statt in
       ihren Code zu greifen, haengen wir sie einfach wieder ein.    */
    feld.style.position = 'relative';
    if (!feld.contains(betrachter.leinwand)) feld.appendChild(betrachter.leinwand);
    var svg = feld.querySelector('svg');
    if (svg) svg.style.display = 'none';

    var wechsel = betrachter.aktivSchluessel != null;
    betrachter.zeigen(w, wechsel);
  }

  /* Die App baut das Wappen nach, wenn sich der Rang aendert.
     Statt in ihren Code zu greifen, beobachten wir das Feld.        */
  function starten() {
    anbinden();
    var feld = document.getElementById('esse-wappen');
    if (!feld || !window.MutationObserver) return;
    new MutationObserver(function () { anbinden(); })
      .observe(feld, { childList: true, subtree: true, attributes: true,
                       attributeFilter: ['data-wappen'] });
  }

  /* Vorgabewerte fuer eine Stufe, wenn keine echten Nutzerdaten
     vorliegen (Galerie-Band, Kammer: dort zeigt sich, wie ein Rang
     AUSSEHEN KANN, nicht der Stand eines bestimmten Nutzers).       */
  function vorschauWerte(stufe) {
    var grenze = RANGOBJEKT.stufenGrenzen(stufe);
    return {
      stufe: stufe,
      kern: Math.min(2, 4),
      ringe: Math.round((grenze.ringe || 0) * 0.5),
      spangen: Math.round((grenze.spangen || 0) * 0.5),
      felder: [0, 1, 2, 3, 4, 5].map(function () {
        return Math.round((grenze.feld || 0) * 0.5);
      })
    };
  }

  window.__rang3d = {
    starten: starten,
    anbinden: anbinden,
    betrachter: null,

    /* Fuer die Kammer: dieselbe Umgebung wie im Wappenfeld, damit
       die Objekte dort nicht anders aussehen.                      */
    umgebung: function (renderer) { return RANGOBJEKT.erzeugeUmgebung(renderer); },

    /* Fuer die Kammer: ein fertig eingepasstes Modell zu einer Stufe.
       Braucht keinen sichtbaren Betrachter — legt notfalls selbst
       einen unsichtbaren an, nur um erzeugen() nutzen zu koennen.   */
    modellHolen: function (stufe) {
      if (!betrachter) return Promise.reject(new Error('kein Betrachter'));
      return Promise.resolve(betrachter.erzeugen(vorschauWerte(stufe)).gruppe);
    },
    /* Zum Vorfuehren des Aufstiegs: __rang3d.morphZu(3)
       Haelt den Abgleich mit der App 8 Sekunden lang zurueck.       */
    morphZu: function (stufe) {
      vorfuehrungBis = Date.now() + 8000;
      if (betrachter) betrachter.zeigen(vorschauWerte(stufe), true);
    },
    /* Alle acht der Reihe nach vorfuehren. */
    vorfuehren: function () {
      if (!betrachter) return;
      vorfuehrungBis = Date.now() + 8 * 1800 + 4000;
      for (var i = 1; i <= 8; i++) {
        (function (stufe, verzoegerung) {
          setTimeout(function () { betrachter.zeigen(vorschauWerte(stufe), stufe > 1); }, verzoegerung);
        })(i, (i - 1) * 1800);
      }
    },
  };

  starten();
})();
