(function () {
  var el = document.getElementById("visit-count");
  if (!el) return;

  var cached = null;

  function fmt(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
  }

  function label() {
    var t = window.TuneI18n && window.TuneI18n.t;
    if (!t) return { hits: "Visits", guests: "guests" };
    return { hits: t("visits.hits"), guests: t("visits.guests") };
  }

  function render() {
    if (!cached) return;
    var L = label();
    var text = L.hits + ": " + fmt(cached.visits);
    if (isFinite(cached.guests) && cached.guests > 0) {
      text += " · " + L.guests + ": " + fmt(cached.guests);
    }
    el.textContent = text;
    el.hidden = false;
  }

  fetch("https://tally.yuki.sh/hits/tuneea/site.json", { cache: "no-store" })
    .then(function (r) {
      if (!r.ok) throw new Error("counter http " + r.status);
      return r.json();
    })
    .then(function (d) {
      var visits = Number(d && d.visit);
      var guests = Number(d && d.visitor);
      if (!isFinite(visits) || visits < 0) return;
      cached = { visits: visits, guests: guests };
      render();
    })
    .catch(function () {
      el.hidden = true;
    });

  window.addEventListener("tuneea:lang", render);
})();
