(function () {
  var el = document.getElementById("visit-count");
  if (!el) return;

  function fmt(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
  }

  // Global site counter (increments on open). CORS: *.
  fetch("https://tally.yuki.sh/hits/tuneea/site.json", { cache: "no-store" })
    .then(function (r) {
      if (!r.ok) throw new Error("counter http " + r.status);
      return r.json();
    })
    .then(function (d) {
      var visits = Number(d && d.visit);
      var guests = Number(d && d.visitor);
      if (!isFinite(visits) || visits < 0) return;
      var text = "Заходов: " + fmt(visits);
      if (isFinite(guests) && guests > 0) {
        text += " · гостей: " + fmt(guests);
      }
      el.textContent = text;
      el.hidden = false;
    })
    .catch(function () {
      el.hidden = true;
    });
})();
