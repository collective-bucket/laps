(function () {
  "use strict";

  var ICONS = {
    food: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h2v8H4V4zm3 0h1.5v5.5A2.5 2.5 0 0 1 6 12v8H4v-8a2.5 2.5 0 0 1-1.5-2.5V4H4zm8.5 0c2.5 0 4.5 2 4.5 6.5V20h-2v-9.5c0-2.3-1-4.5-2.5-4.5S13 8.2 13 10.5V20h-2V10.5C11 6 13 4 15.5 4z"/></svg>',
    coffee: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h11v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8zm11 2h2a2 2 0 0 1 0 4h-2v-4zM7 4h8v2H7V4z"/></svg>',
    special: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 9.5 9H3l5.3 3.8L6.2 19 12 14.8 17.8 19l-2.1-6.2L21 9h-6.5L12 3z"/></svg>',
    wrap: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6h12a3 3 0 0 1 0 6H9a1 1 0 0 0 0 2h9v2H9a3 3 0 0 1 0-6h9a1 1 0 0 0 0-2H6V6z"/></svg>',
    burger: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8a6 6 0 0 1 12 0H6zm-1 2h14v3H5v-3zm0 5h14v3a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-3z"/></svg>',
    sandwich: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16v3H4V7zm0 5h16v2H4v-2zm0 4h16v3H4v-3z"/></svg>'
  };

  var state = {
    data: null,
    path: []
  };

  function iconMarkup(name) {
    return ICONS[name] || ICONS.food;
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
    nameEl.textContent = item.name;
    infoEl.appendChild(nameEl);

    if (item.description) {
      var descEl = document.createElement("p");
      descEl.textContent = item.description;
      infoEl.appendChild(descEl);
    }

    if (item.note) {
      var noteEl = document.createElement("p");
      noteEl.className = "note";
      noteEl.textContent = item.note;
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
      return node.products.length + " ürün";
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
    label.textContent = node.name;
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
    back.setAttribute("aria-label", "Geri");
    back.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7"/></svg><span>Geri</span>';
    back.addEventListener("click", function () {
      setHash(state.path.slice(0, -1));
    });
    inner.appendChild(back);

    var title = document.createElement("h2");
    title.className = "step-title";
    title.textContent = trail[trail.length - 1].name || "";
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

  function render() {
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
      contentEl.innerHTML = '<p class="empty">Bu bölümde henüz ürün yok.</p>';
    }

    window.scrollTo(0, 0);
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
      document.getElementById("menu-content").innerHTML =
        '<p class="error">Menü yüklenemedi. Lütfen daha sonra tekrar deneyin.</p>';
    });
})();
