(function () {
  var LIST = "api/reviews.json";
  var BOX = "reviews-list";
  var FORM = "review-form";
  var STATUS = "review-status";
  var NAME_MAX = 40;
  var CITY_MAX = 40;
  var TEXT_MIN = 15;
  var TEXT_MAX = 500;

  function t(key, fallback) {
    var i18n = window.TuneI18n;
    if (i18n && i18n.t) {
      var val = i18n.t(key, fallback);
      if (val && val !== key) return val;
    }
    return fallback || key;
  }

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function clean(s) {
    return String(s || "").replace(/\s+/g, " ").trim();
  }

  function card(item) {
    var el = document.createElement("article");
    el.className = "review-card";
    el.innerHTML =
      '<div class="review-who">' +
      "<strong>" +
      esc(item.name) +
      "</strong>" +
      '<span class="review-city">' +
      esc(item.city) +
      "</span>" +
      "</div>" +
      '<p class="review-text">' +
      esc(item.text) +
      "</p>";
    return el;
  }

  function render(items) {
    var host = document.getElementById(BOX);
    if (!host) return;
    host.innerHTML = "";
    if (!items.length) {
      var empty = document.createElement("p");
      empty.className = "review-empty";
      empty.setAttribute("data-i18n", "rev.empty");
      empty.textContent = t("rev.empty", "Пока нет отзывов — напишите первый.");
      host.appendChild(empty);
      return;
    }
    items.forEach(function (item) {
      host.appendChild(card(item));
    });
  }

  function setStatus(key, fallback, ok) {
    var el = document.getElementById(STATUS);
    if (!el) return;
    el.setAttribute("data-key", key);
    el.textContent = t(key, fallback);
    el.className = "review-status" + (ok ? " is-ok" : " is-err");
  }

  function validate(name, city, text) {
    if (!name || !city || !text) return "rev.need_all";
    if (name.length > NAME_MAX || city.length > CITY_MAX) return "rev.too_long";
    if (text.length < TEXT_MIN) return "rev.too_short";
    if (text.length > TEXT_MAX) return "rev.too_long";
    return "";
  }

  var published = [];
  var pending = [];

  function loadPending() {
    try {
      var raw = JSON.parse(localStorage.getItem("tuneea_reviews_pending") || "[]");
      pending = Array.isArray(raw) ? raw : [];
    } catch (e) {
      pending = [];
    }
  }

  function savePending() {
    try {
      localStorage.setItem("tuneea_reviews_pending", JSON.stringify(pending.slice(0, 20)));
    } catch (e) {}
  }

  function shown() {
    var keys = {};
    var out = [];
    pending.concat(published).forEach(function (item) {
      var key = (item.name || "") + "\n" + (item.text || "");
      if (keys[key]) return;
      keys[key] = true;
      out.push(item);
    });
    return out;
  }

  function load() {
    loadPending();
    return fetch(LIST + "?t=" + Date.now(), { cache: "no-store" })
      .then(function (r) {
        if (!r.ok) throw new Error("http");
        return r.json();
      })
      .then(function (data) {
        published = Array.isArray(data) ? data : [];
        pending = pending.filter(function (item) {
          return !published.some(function (p) {
            return p.name === item.name && p.text === item.text;
          });
        });
        savePending();
        render(shown());
      })
      .catch(function () {
        render(shown());
      });
  }

  function inbox() {
    var cfg = window.TuneReviewInbox || {};
    return { repo: cfg.repo || "tuneea/reviews", token: cfg.token || "" };
  }

  function publishSite(name, city, text) {
    var cfg = inbox();
    if (!cfg.token) return Promise.reject(new Error("no-token"));
    return fetch("https://api.github.com/repos/" + cfg.repo + "/issues", {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: "Bearer " + cfg.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "[review] " + name + " · " + city,
        body: text,
      }),
    }).then(function (r) {
      if (r.status === 201 || r.ok) return r;
      throw new Error("issue " + r.status);
    });
  }

  function finishLocal(form, item) {
    pending.unshift(item);
    savePending();
    render(shown());
    form.reset();
  }

  function submit(ev) {
    ev.preventDefault();
    var form = ev.target;
    var hp = clean(form.elements.company && form.elements.company.value);
    if (hp) return;
    var name = clean(form.elements.name.value);
    var city = clean(form.elements.city.value);
    var text = clean(form.elements.text.value);
    var err = validate(name, city, text);
    if (err) {
      setStatus(err, "Заполните имя, город и отзыв.", false);
      return;
    }
    var item = { name: name, city: city, text: text, at: new Date().toISOString().slice(0, 10) };
    setStatus("rev.sending", "Отправка…", true);
    publishSite(name, city, text)
      .then(function () {
        finishLocal(form, item);
        setStatus("rev.ok_site", "Спасибо! Отзыв уходит на сайт и скоро появится у всех.", true);
      })
      .catch(function () {
        setStatus("rev.fail", "Не отправилось. Попробуйте ещё раз.", false);
      });
  }

  function mount() {
    if (!document.getElementById(BOX)) return;
    load();
    var form = document.getElementById(FORM);
    if (form) form.addEventListener("submit", submit);
    window.addEventListener("tuneea:lang", function () {
      render(shown());
      var st = document.getElementById(STATUS);
      if (st && st.getAttribute("data-key")) {
        st.textContent = t(st.getAttribute("data-key"), st.textContent);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
