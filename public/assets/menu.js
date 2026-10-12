(function () {
  "use strict";

  var ICONS = {
    burger:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11c0-4 3.6-7 9-7s9 3 9 7"/><path d="M3 11h18"/><circle cx="8" cy="7.6" r="0.55"/><circle cx="12" cy="6.6" r="0.55"/><circle cx="16" cy="7.6" r="0.55"/><path d="M3.5 14.2c1.3.9 2.4-.9 3.7 0s2.4.9 3.7 0 2.4-.9 3.7 0 2.4.9 3.7 0 2.2-.9 3.2 0"/><path d="M4 17.2h16"/><path d="M4 17.2c0 2.2 3.2 3.8 8 3.8s8-1.6 8-3.8"/></svg>',
    sandwich:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 8h12.5L10 20z"/><path d="M6.2 10.4 12.8 16.6"/><path d="M5.6 12.4h7.6"/><path d="M6.4 15h6.2"/><path d="M13.6 11.4c1.8-.4 2.8.6 2.1 1.8"/><path d="M12.4 14.2c1.7-.1 2.4 1 1.5 2"/></svg>',
    coffee:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 11h11v.4c0 3.4-2.1 5.8-5.5 5.8S5 14.8 5 11.4z"/><path d="M16 12.2c2.2.4 3.2 1.6 2.8 3-.4 1.5-2 2.1-3.2 1.6"/><path d="M7.4 8.4c.6-1 .6-1.8 0-2.8"/><path d="M10.6 8.4c.6-1 .6-1.8 0-2.8"/><path d="M13.8 8.4c.6-1 .6-1.8 0-2.8"/><path d="M4 19.2h16"/></svg>',
    toast:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="4.5" width="12" height="10" rx="1.6"/><rect x="4" y="8.5" width="12" height="10" rx="1.6"/><path d="M6.4 12h7.2"/><path d="M6.4 15h7.2"/></svg>',
    wing:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="14.2" cy="8.2" rx="5.4" ry="3.3" transform="rotate(-38 14.2 8.2)"/><path d="M10.6 11.4 7.2 16.6"/><circle cx="6.2" cy="17.8" r="1.55"/><circle cx="8.7" cy="18.8" r="1.25"/></svg>',
    dessert:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 9.6 18.8 18.6H5.2z"/><path d="M7.6 14.4h8.8"/><circle cx="14.6" cy="6.6" r="1.5"/><path d="M13.8 7.8c-.5.6-1.1.9-1.8 1.1"/></svg>'
  };

  var state = {
    data: null,
    path: []
  };

  function iconMarkup(name) {
    return ICONS[name] || ICONS.burger;
  }

  function tr(key, fallback) {
    if (!window.LapsI18n) return fallback;
    return LapsI18n.t(key, fallback);
  }

  function formatPrice(price, currency) {
    if (price === undefined || price === null || price === "") return "";
    var value = Number(price).toFixed(2).replace(/\.00$/, "");
    return value + " " + (currency || "₺");
  }

  function parseHash() {
    var hash = window.location.hash.replace(/^#/, "");
    if (!hash) return [];
    return hash.split("/").filter(Boolean);
  }

  function setHash(ids) {
    var next = ids.length ? "#" + ids.join("/") : "";
    if ((window.location.hash || "") === next) {
      state.path = ids;
      render();
      return;
    }
    if (!ids.length) {
      history.pushState(null, "", window.location.pathname + window.location.search);
      state.path = [];
      render();
      return;
    }
    window.location.hash = ids.join("/");
  }

  function findNode(ids) {
    var nodes = (state.data && state.data.menu) || [];
    var current = { children: nodes, name: "Menü" };
    var trail = [current];

    for (var i = 0; i < ids.length; i += 1) {
      var match = (current.children || []).find(function (child) {
        return child.id === ids[i];
      });
      if (!match) break;
      current = match;
      trail.push(current);
    }

    return { node: current, trail: trail };
  }

  function createItemEl(item, currency) {
    var itemEl = document.createElement("div");
    itemEl.className = "item";

    var infoEl = document.createElement("div");
    infoEl.className = "item-info";

    var nameEl = document.createElement("h3");
    nameEl.textContent = tr("item." + item.name, item.name);
    infoEl.appendChild(nameEl);

    if (item.description) {
      var descEl = document.createElement("p");
      descEl.textContent = tr("desc." + item.name, item.description);
      infoEl.appendChild(descEl);
    }

    if (item.note) {
      var noteEl = document.createElement("p");
      noteEl.className = "note";
      noteEl.textContent = tr("note." + item.name, item.note);
      infoEl.appendChild(noteEl);
    }

    itemEl.appendChild(infoEl);

    var priceText = formatPrice(item.price, currency);
    if (priceText) {
      var priceEl = document.createElement("span");
      priceEl.className = "price";
      priceEl.textContent = priceText;
      itemEl.appendChild(priceEl);
    }

    return itemEl;
  }

  function cardMeta(node) {
    if (node.children && node.children.length) {
      return node.children.length + " kategori";
    }
    if (node.products && node.products.length) {
      return window.LapsI18n
        ? LapsI18n.count(node.products.length)
        : node.products.length + " ürün";
    }
    return "";
  }

  function createCardEl(node, ids) {
    var card = document.createElement("button");
    card.type = "button";
    card.className = "menu-card";

    var thumb = document.createElement("span");
    thumb.className = "menu-card-thumb";
    thumb.innerHTML = iconMarkup(node.icon);
    card.appendChild(thumb);

    var copy = document.createElement("span");
    copy.className = "menu-card-copy";

    var label = document.createElement("span");
    label.className = "menu-card-label";
    label.textContent = tr("cat." + node.id, node.name);
    copy.appendChild(label);

    var metaText = cardMeta(node);
    if (metaText) {
      var meta = document.createElement("span");
      meta.className = "menu-card-meta";
      meta.textContent = metaText;
      copy.appendChild(meta);
    }

    card.appendChild(copy);
    card.addEventListener("click", function () {
      setHash(ids.concat(node.id));
    });
    return card;
  }

  function renderCards(nodes, ids) {
    var grid = document.createElement("div");
    grid.className = "menu-card-grid";
    (nodes || []).forEach(function (node) {
      grid.appendChild(createCardEl(node, ids));
    });
    return grid;
  }

  function renderProducts(node, currency) {
    var list = document.createElement("div");
    list.className = "item-list";
    (node.products || []).forEach(function (item) {
      list.appendChild(createItemEl(item, currency));
    });
    return list;
  }

  function renderNav(trail) {
    var navEl = document.getElementById("step-nav");
    navEl.innerHTML = "";

    if (trail.length <= 1) {
      navEl.hidden = true;
      return;
    }

    navEl.hidden = false;

    var inner = document.createElement("div");
    inner.className = "step-nav-inner";

    var back = document.createElement("button");
    back.type = "button";
    back.className = "step-back";
    var backLabel = tr("menu.back", "Geri");
    back.setAttribute("aria-label", backLabel);
    back.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7"/></svg><span></span>';
    back.querySelector("span").textContent = backLabel;
    navEl.setAttribute("aria-label", tr("menu.nav", "Menü gezintisi"));
    back.addEventListener("click", function () {
      setHash(state.path.slice(0, -1));
    });
    inner.appendChild(back);

    var title = document.createElement("h2");
    title.className = "step-title";
    var current = trail[trail.length - 1];
    title.textContent = current.id
      ? tr("cat." + current.id, current.name)
      : current.name || "";
    inner.appendChild(title);

    navEl.appendChild(inner);
  }

  function syncedPath(trail) {
    return trail
      .slice(1)
      .map(function (node) {
        return node.id;
      })
      .filter(Boolean);
  }

  function render(scroll) {
    var currency = (state.data.business && state.data.business.currency) || "₺";
    var resolved = findNode(state.path);
    var node = resolved.node;
    var contentEl = document.getElementById("menu-content");
    var validPath = syncedPath(resolved.trail);

    if (validPath.join("/") !== state.path.join("/")) {
      state.path = validPath;
      history.replaceState(
        null,
        "",
        window.location.pathname +
          window.location.search +
          (validPath.length ? "#" + validPath.join("/") : "")
      );
    }

    renderNav(resolved.trail);
    contentEl.innerHTML = "";

    if (node.children && node.children.length) {
      contentEl.appendChild(renderCards(node.children, state.path));
    } else if (node.products && node.products.length) {
      contentEl.appendChild(renderProducts(node, currency));
    } else {
      var empty = document.createElement("p");
      empty.className = "empty";
      empty.textContent = tr("menu.empty", "Bu bölümde henüz ürün yok.");
      contentEl.appendChild(empty);
    }

    if (scroll !== false) window.scrollTo(0, 0);
  }

  function applyPathFromLocation() {
    if (!state.data) return;
    var next = parseHash();
    if (next.join("/") === state.path.join("/")) return;
    state.path = next;
    render();
  }

  window.addEventListener("hashchange", applyPathFromLocation);
  window.addEventListener("popstate", applyPathFromLocation);

  fetch("/menu.json", { cache: "no-cache" })
    .then(function (response) {
      if (!response.ok) throw new Error("menu.json alınamadı: " + response.status);
      return response.json();
    })
    .then(function (data) {
      state.data = data;
      state.path = parseHash();
      render();
    })
    .catch(function (err) {
      console.error(err);
      var failed = document.createElement("p");
      failed.className = "error";
      failed.textContent = tr(
        "menu.error",
        "Menü yüklenemedi. Lütfen daha sonra tekrar deneyin."
      );
      var slot = document.getElementById("menu-content");
      slot.innerHTML = "";
      slot.appendChild(failed);
    });

  if (window.LapsI18n) {
    LapsI18n.onChange(function () {
      if (state.data) render(false);
    });
  }
})();
