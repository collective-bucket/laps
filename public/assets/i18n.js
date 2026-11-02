(function () {
  "use strict";

  var cookieName = "laps_lang";
  var maxAge = 60 * 60 * 24 * 180;
  var sourceTitle = document.title;
  var listeners = [];

  var copy = {
    en: {
      "lang.label": "Language",
      "nav.menu": "Menu",
      "nav.privacy": "Privacy",
      "nav.cookies": "Cookies",
      "nav.terms": "Terms",
      "nav.contact": "Contact",
      "footer.credit": "Site by",
      "consent.text": "We may use cookies to measure visits.",
      "consent.reject": "Reject",
      "consent.accept": "Accept",
      "consent.reset": "Change preference",
      "home.cta": "See the menu",
      "home.photo": "The LAPS! shopfront in Fethiye",
      "title.home": "LAPS! — Fethiye",
      "title.menu": "Menu — LAPS!",
      "title.privacy": "Privacy notice — LAPS!",
      "title.cookies": "Cookies — LAPS!",
      "title.terms": "Terms of use — LAPS!",
      "title.contact": "Contact — LAPS!",
      "contact.h1": "Contact",
      "order.label": "Order online",
      "menu.back": "Back",
      "menu.nav": "Menu navigation",
      "menu.loading": "Loading the menu...",
      "menu.error": "The menu could not be loaded. Please try again later.",
      "menu.empty": "Nothing in this section yet.",
      "legal.binding": "The Turkish text is the binding version.",
      "privacy.h1": "Privacy notice",
      "cookies.h1": "Cookies",
      "terms.h1": "Terms of use",
      "cat.menuler": "Laps combos",
      "cat.buns": "Buns",
      "cat.burgerler": "Burgers",
      "cat.wings": "Chicken wings",
      "cat.yan-urunler": "Sides",
      "cat.tatlilar": "Desserts",
      "cat.icecekler": "Drinks",
      "cat.kahveler": "Coffee",
      "item.Hot Dog Sosisli": "Hot Dog",
      "desc.Hot Dog Sosisli":
        "Sausage, pickle, crispy potatoes, caramelized onion, honey mustard, cheddar sauce; with fries, onion rings and a can of cola.",
      "item.Taco Bun": "Taco Bun",
      "desc.Taco Bun":
        "2 taco buns, beef mince, Mexican beans, pickled jalapeno, mixed peppers, crispy potatoes, special spicy bun, Laps sauce.",
      "item.2'li Çıtır Tavuklu Bun": "Crispy Chicken Bun (2 pcs)",
      "desc.2'li Çıtır Tavuklu Bun":
        "In a bun: special breaded chicken, lettuce, honey mustard, basil, sweet chili sauce, Laps sauce.",
      "item.Smoked Grill Burger": "Smoked Grill Burger",
      "desc.Smoked Grill Burger":
        "A 100 g burger patty on a brioche bun with red onion, tomato, pickle and hot jalapeno. Served with fresh lettuce, special sauce and crispy fries.",
      "item.Laps Burger": "Laps Burger",
      "desc.Laps Burger":
        "Double rib patty, smoked meat, caramelized onion, cheddar sauce, iceberg lettuce, pickle, Laps sauce. With fries.",
      "item.Kızılcık Burger": "Cranberry Burger",
      "desc.Kızılcık Burger":
        "Tender rib meat with Laps cheese cream, cranberry sauce and sweet chili sauce. Served with truffle mayonnaise and fresh toppings.",
      "item.Çıtır Tavuk Burger": "Crispy Chicken Burger",
      "desc.Çıtır Tavuk Burger":
        "Breaded crispy chicken, lettuce, tomato, pickle, cheddar cheese sauce, special sauces. With fries.",
      "note.Çıtır Tavuk Burger": "Allergen: contains coconut",
      "item.Smash Burger": "Smash Burger",
      "desc.Smash Burger":
        "Rib patty (120 g), smoked meat, Laps creamy sauce, cheddar cheese, pickle, caramelized onion, honey mustard.",
      "item.Sloppy Joe": "Sloppy Joe",
      "desc.Sloppy Joe":
        "In a steamed bun: beef mince, Sicilian tomato sauce, jalapeno, pickle, caramelized onion, cheddar cheese.",
      "item.Buffalo Wings (6 Adet)": "Buffalo Wings (6 pcs)",
      "desc.Buffalo Wings (6 Adet)":
        "Chicken wings in hot buffalo sauce. With fries and celery sticks.",
      "item.Garlic Parmesan Wings (6 Adet)": "Garlic Parmesan Wings (6 pcs)",
      "desc.Garlic Parmesan Wings (6 Adet)":
        "Chicken wings in garlic parmesan sauce. With fries.",
      "item.Smoked BBQ Wings (6 Adet)": "Smoked BBQ Wings (6 pcs)",
      "desc.Smoked BBQ Wings (6 Adet)":
        "Chicken wings in smoky barbecue sauce. With fries.",
      "item.Sweet Chili Wings (6 Adet)": "Sweet Chili Wings (6 pcs)",
      "desc.Sweet Chili Wings (6 Adet)":
        "Chicken wings in sweet chili sauce. With fries.",
      "item.Patates Kızartması": "French fries",
      "desc.Patates Kızartması": "Finger cut",
      "item.Soğan Halkası (4 Adet)": "Onion rings (4 pcs)",
      "desc.Soğan Halkası (4 Adet)": "Served as 4 pieces.",
      "item.Mini Klasik Ekler (2 Adet)": "Mini classic éclair (2 pcs)",
      "desc.Mini Klasik Ekler (2 Adet)": "Served as 2 pieces.",
      "item.Coca-Cola (33 cl)": "Coca-Cola (33 cl)",
      "desc.Coca-Cola (33 cl)": "Can",
      "item.Coca-Cola Zero Sugar (33 cl)": "Coca-Cola Zero Sugar (33 cl)",
      "desc.Coca-Cola Zero Sugar (33 cl)": "Can",
      "item.Ayran (20 cl)": "Ayran (20 cl)",
      "desc.Ayran (20 cl)": "Small",
      "item.Su (50 cl)": "Water (50 cl)",
      "desc.Su (50 cl)": "Plastic bottle",
      "item.Americano": "Americano",
      "item.Latte": "Latte",
      "item.Filtre kahve": "Filter coffee",
      "item.Ice latte": "Ice latte",
      "item.Ice americano": "Ice americano",
      "item.Caramel latte": "Caramel latte",
      "privacy.lead":
        "Notice for visitors of lapsfethiye.com under Article 10 of the Turkish Personal Data Protection Law No. 6698. Last updated: 6 October 2026.",
      "privacy.controller": "Data controller",
      "privacy.activity":
        "The workplace started operating on 1 October 2026. The main activity is a fast-food outlet with seating (a buffet).",
      "privacy.data": "Data and purposes",
      "privacy.data1":
        "When you open the site, the host keeps a connection log for security and operation: IP address, browser details, the page requested and the time. The legal basis is legitimate interest.",
      "privacy.data2":
        "The Google tag loads on every page; cookies start off. If you accept, Google Analytics and, once an ads account is connected, Google Ads measure the visit. That measurement may process a cookie identifier, the page viewed and an approximate location. The legal basis is explicit consent. Rejecting does not write these cookies. There is no account, form or payment.",
      "privacy.transfer": "Transfers",
      "privacy.transfer1":
        "Logs are processed on Firebase Hosting. Accepted measurement goes to Google Analytics and Google Ads. Both are provided by Google and may be processed abroad. Data is not sold.",
      "privacy.rights": "Your rights",
      "privacy.rightsLead": "Under Article 11 of the Law:",
      "privacy.r1": "to learn whether data is processed,",
      "privacy.r2": "to request information if it is,",
      "privacy.r3": "to learn whether it is used for its purpose,",
      "privacy.r4": "to request correction if it is incomplete or wrong,",
      "privacy.r5": "to request deletion or destruction,",
      "privacy.r6": "to request that recipients be notified,",
      "privacy.r7": "to object to automated analysis,",
      "privacy.r8": "to claim compensation for damage.",
      "privacy.contact":
        "You can apply using the phone number above. A reply is given within thirty days.",
      "cookies.lead":
        "LAPS! is operated at Pazaryeri Mahallesi, Süleyman Demirel Bulvarı No: 196 A, Fethiye / Muğla. Last updated: 6 October 2026.",
      "cookies.pref": "Preference cookies",
      "cookies.pref1":
        "laps_consent stores your choice for six months. It holds only accept or reject. It does not measure anything. Without it, the banner asks again on every visit. laps_lang stores the language you choose for six months. It does not measure anything either.",
      "cookies.accept": "If you accept",
      "cookies.accept1":
        "Google Analytics cookies (_ga) count the visit. If an ads account is connected, Google Ads cookies measure the click. The purpose is to see that the site is used and whether an ad works. Duration is Google’s own; the analytics cookie lasts about two years. Data is transferred to Google and may be processed abroad.",
      "cookies.tag":
        "The Google tag stays on the page so setup can be verified. Rejecting does not write analytics or ad cookies. Identifiable measurement starts after you accept.",
      "cookies.ask": "Questions:",
      "terms.updated": "Last updated: 6 October 2026.",
      "terms.biz": "The business",
      "terms.activity":
        "The workplace opened on 1 October 2026. The activity is fast-food sales with seating; a buffet is within that scope.",
      "terms.site": "The site",
      "terms.site1":
        "lapsfethiye.com is for information. The LAPS! mark belongs to the business. The mark, text and images may not be used without permission. Until the menu and hours are published, information on the site is an announcement.",
      "terms.liability": "Liability",
      "terms.liability1":
        "The site is provided as it is. The business is not liable for indirect damage from an interruption or missing information. Orders and payments are not taken on this site.",
      "terms.law": "Governing law",
      "terms.law1":
        "Turkish law applies to disputes. The competent authorities are those in Fethiye and Muğla."
    },
    ru: {
      "lang.label": "Язык",
      "nav.menu": "Меню",
      "nav.privacy": "Данные",
      "nav.cookies": "Файлы cookie",
      "nav.terms": "Условия",
      "nav.contact": "Контакты",
      "footer.credit": "Дизайн сайта",
      "consent.text": "Мы можем использовать файлы cookie, чтобы считать визиты.",
      "consent.reject": "Отклонить",
      "consent.accept": "Принять",
      "consent.reset": "Изменить выбор",
      "home.cta": "Смотреть меню",
      "home.photo": "Фасад буфета LAPS! в Фетхие",
      "title.home": "LAPS! — Фетхие",
      "title.menu": "Меню — LAPS!",
      "title.privacy": "Уведомление о данных — LAPS!",
      "title.cookies": "Файлы cookie — LAPS!",
      "title.terms": "Условия использования — LAPS!",
      "title.contact": "Контакты — LAPS!",
      "contact.h1": "Контакты",
      "order.label": "Заказать онлайн",
      "menu.back": "Назад",
      "menu.nav": "Навигация по меню",
      "menu.loading": "Меню загружается...",
      "menu.error": "Меню не загрузилось. Попробуйте позже.",
      "menu.empty": "В этом разделе пока ничего нет.",
      "legal.binding": "Обязательная версия текста — турецкая.",
      "privacy.h1": "Уведомление о данных",
      "cookies.h1": "Файлы cookie",
      "terms.h1": "Условия использования",
      "cat.menuler": "Комбо Laps",
      "cat.buns": "Буны",
      "cat.burgerler": "Бургеры",
      "cat.wings": "Куриные крылышки",
      "cat.yan-urunler": "Гарниры",
      "cat.tatlilar": "Десерты",
      "cat.icecekler": "Напитки",
      "cat.kahveler": "Кофе",
      "item.Hot Dog Sosisli": "Хот-дог",
      "desc.Hot Dog Sosisli":
        "Сосиска, корнишон, хрустящий картофель, карамелизированный лук, медовая горчица, соус чеддер; с картофелем фри, луковыми кольцами и банкой колы.",
      "item.Taco Bun": "Тако-бун",
      "desc.Taco Bun":
        "2 тако-буна, говяжий фарш, мексиканская фасоль, маринованный халапеньо, разноцветный перец, хрустящий картофель, особая острая булочка, соус Laps.",
      "item.2'li Çıtır Tavuklu Bun": "Бун с хрустящей курицей (2 шт.)",
      "desc.2'li Çıtır Tavuklu Bun":
        "В булочке: курица в особой панировке, салат, медовая горчица, базилик, соус sweet chili, соус Laps.",
      "item.Smoked Grill Burger": "Smoked Grill Burger",
      "desc.Smoked Grill Burger":
        "Котлета 100 г на бриоши с красным луком, помидором, корнишоном и острым халапеньо. Подаётся со свежим салатом, особым соусом и хрустящим картофелем.",
      "item.Laps Burger": "Laps Burger",
      "desc.Laps Burger":
        "Двойная котлета из рёбер, копчёное мясо, карамелизированный лук, соус чеддер, салат айсберг, корнишон, соус Laps. С картофелем фри.",
      "item.Kızılcık Burger": "Бургер с клюквой",
      "desc.Kızılcık Burger":
        "Нежное мясо рёбер с сырным кремом Laps, клюквенным соусом и соусом sweet chili. Подаётся с трюфельным майонезом и свежими овощами.",
      "item.Çıtır Tavuk Burger": "Бургер с хрустящей курицей",
      "desc.Çıtır Tavuk Burger":
        "Хрустящая курица в панировке, салат, помидор, корнишон, сырный соус чеддер, особые соусы. С картофелем фри.",
      "note.Çıtır Tavuk Burger": "Аллерген: содержит кокос",
      "item.Smash Burger": "Smash Burger",
      "desc.Smash Burger":
        "Котлета из рёбер (120 г), копчёное мясо, сливочный соус Laps, сыр чеддер, корнишон, карамелизированный лук, медовая горчица.",
      "item.Sloppy Joe": "Sloppy Joe",
      "desc.Sloppy Joe":
        "В булочке на пару: говяжий фарш, сицилийский томатный соус, халапеньо, корнишон, карамелизированный лук, сыр чеддер.",
      "item.Buffalo Wings (6 Adet)": "Крылышки Buffalo (6 шт.)",
      "desc.Buffalo Wings (6 Adet)":
        "Куриные крылышки в остром соусе буффало. С картофелем фри и стеблями сельдерея.",
      "item.Garlic Parmesan Wings (6 Adet)": "Крылышки чеснок-пармезан (6 шт.)",
      "desc.Garlic Parmesan Wings (6 Adet)":
        "Куриные крылышки в чесночно-пармезановом соусе. С картофелем фри.",
      "item.Smoked BBQ Wings (6 Adet)": "Крылышки Smoked BBQ (6 шт.)",
      "desc.Smoked BBQ Wings (6 Adet)":
        "Куриные крылышки в копчёном соусе барбекю. С картофелем фри.",
      "item.Sweet Chili Wings (6 Adet)": "Крылышки Sweet Chili (6 шт.)",
      "desc.Sweet Chili Wings (6 Adet)":
        "Куриные крылышки в соусе sweet chili. С картофелем фри.",
      "item.Patates Kızartması": "Картофель фри",
      "desc.Patates Kızartması": "Брусочками",
      "item.Soğan Halkası (4 Adet)": "Луковые кольца (4 шт.)",
      "desc.Soğan Halkası (4 Adet)": "Подаются по 4 штуки.",
      "item.Mini Klasik Ekler (2 Adet)": "Мини-эклер классический (2 шт.)",
      "desc.Mini Klasik Ekler (2 Adet)": "Подаётся по 2 штуки.",
      "item.Coca-Cola (33 cl)": "Coca-Cola (33 cl)",
      "desc.Coca-Cola (33 cl)": "Банка",
      "item.Coca-Cola Zero Sugar (33 cl)": "Coca-Cola Zero Sugar (33 cl)",
      "desc.Coca-Cola Zero Sugar (33 cl)": "Банка",
      "item.Ayran (20 cl)": "Айран (20 cl)",
      "desc.Ayran (20 cl)": "Маленький",
      "item.Su (50 cl)": "Вода (50 cl)",
      "desc.Su (50 cl)": "Пластиковая бутылка",
      "item.Americano": "Американо",
      "item.Latte": "Латте",
      "item.Filtre kahve": "Фильтр-кофе",
      "item.Ice latte": "Айс латте",
      "item.Ice americano": "Айс американо",
      "item.Caramel latte": "Карамельный латте",
      "privacy.lead":
        "Уведомление для посетителей lapsfethiye.com по статье 10 турецкого закона № 6698 о защите персональных данных. Обновлено: 6 октября 2026.",
      "privacy.controller": "Оператор данных",
      "privacy.activity":
        "Точка открылась 1 октября 2026 года. Основная деятельность — фастфуд с посадкой (буфет).",
      "privacy.data": "Какие данные и зачем",
      "privacy.data1":
        "Когда вы открываете сайт, хостинг ведёт журнал соединения для безопасности и работы: IP-адрес, данные браузера, запрошенная страница и время. Основание — законный интерес.",
      "privacy.data2":
        "Тег Google загружается на каждой странице; файлы cookie сначала выключены. Если вы принимаете, Google Analytics и, после подключения рекламного аккаунта, Google Ads измеряют визит. При этом могут обрабатываться идентификатор cookie, просмотренная страница и приблизительное местоположение. Основание — явное согласие. Отказ эти файлы не записывает. Аккаунта, формы и оплаты нет.",
      "privacy.transfer": "Передача",
      "privacy.transfer1":
        "Журналы обрабатываются в Firebase Hosting. Принятое измерение уходит в Google Analytics и Google Ads. Оба сервиса предоставляет Google, обработка возможна за рубежом. Данные не продаются.",
      "privacy.rights": "Ваши права",
      "privacy.rightsLead": "По статье 11 закона:",
      "privacy.r1": "узнать, обрабатываются ли данные,",
      "privacy.r2": "запросить сведения, если обрабатываются,",
      "privacy.r3": "узнать, используются ли они по назначению,",
      "privacy.r4": "потребовать исправления, если они неполные или неверные,",
      "privacy.r5": "потребовать удаления или уничтожения,",
      "privacy.r6": "потребовать уведомить получателей,",
      "privacy.r7": "возразить против автоматического анализа,",
      "privacy.r8": "потребовать возмещения ущерба.",
      "privacy.contact":
        "Заявление можно подать по телефону выше. Ответ даётся не позднее тридцати дней.",
      "cookies.lead":
        "LAPS! работает по адресу Pazaryeri Mahallesi, Süleyman Demirel Bulvarı No: 196 A, Fethiye / Muğla. Обновлено: 6 октября 2026.",
      "cookies.pref": "Файлы предпочтений",
      "cookies.pref1":
        "laps_consent хранит ваш выбор шесть месяцев. В нём только принятие или отказ. Он ничего не измеряет. Без него баннер спрашивает при каждом визите. laps_lang шесть месяцев хранит выбранный язык. Он тоже ничего не измеряет.",
      "cookies.accept": "Если вы принимаете",
      "cookies.accept1":
        "Файлы Google Analytics (_ga) считают визит. Если подключён рекламный аккаунт, файлы Google Ads измеряют переход. Цель — видеть, что сайтом пользуются и срабатывает ли реклама. Срок задаёт Google; аналитический файл живёт около двух лет. Данные передаются Google и могут обрабатываться за рубежом.",
      "cookies.tag":
        "Тег Google остаётся на странице, чтобы установку можно было проверить. Отказ не записывает аналитические и рекламные файлы. Измерение с идентификатором начинается после принятия.",
      "cookies.ask": "Вопросы:",
      "terms.updated": "Обновлено: 6 октября 2026.",
      "terms.biz": "Заведение",
      "terms.activity":
        "Точка открылась 1 октября 2026 года. Деятельность — продажа фастфуда с посадкой; буфет входит в этот объём.",
      "terms.site": "Сайт",
      "terms.site1":
        "lapsfethiye.com служит для информации. Знак LAPS! принадлежит заведению. Знак, тексты и изображения нельзя использовать без разрешения. Пока меню и часы не опубликованы, сведения на сайте носят характер объявления.",
      "terms.liability": "Ответственность",
      "terms.liability1":
        "Сайт предоставляется как есть. Заведение не отвечает за косвенный ущерб из-за перерыва или неполных сведений. Заказы и оплата на этом сайте не принимаются.",
      "terms.law": "Применимое право",
      "terms.law1":
        "К спорам применяется турецкое право. Компетентны органы Фетхие и Муглы."
    }
  };

  function readLang() {
    var match = document.cookie.match(
      new RegExp("(?:^|; )" + cookieName + "=(tr|en|ru)")
    );
    return match ? match[1] : "tr";
  }

  function writeLang(lang) {
    var secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie =
      cookieName +
      "=" +
      lang +
      "; Path=/; Max-Age=" +
      maxAge +
      "; SameSite=Lax" +
      secure;
  }

  function lookup(key) {
    var lang = readLang();
    if (lang === "tr") return null;
    var table = copy[lang];
    if (!table || table[key] == null) return null;
    return table[key];
  }

  function apply() {
    var lang = readLang();
    document.documentElement.lang = lang;

    var titleKey = document.body.getAttribute("data-i18n-title");
    document.title =
      (titleKey && lookup(titleKey)) || sourceTitle;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      if (!el.hasAttribute("data-i18n-src")) {
        el.setAttribute("data-i18n-src", el.textContent);
      }
      var value = lookup(el.getAttribute("data-i18n"));
      el.textContent =
        value == null ? el.getAttribute("data-i18n-src") : value;
      if (el.classList.contains("binding")) el.hidden = value == null;
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      if (!el.hasAttribute("data-i18n-alt-src")) {
        el.setAttribute("data-i18n-alt-src", el.getAttribute("alt") || "");
      }
      var value = lookup(el.getAttribute("data-i18n-alt"));
      el.setAttribute(
        "alt",
        value == null ? el.getAttribute("data-i18n-alt-src") : value
      );
    });

    var bar = document.querySelector(".lang");
    if (bar) {
      var label = lookup("lang.label");
      bar.setAttribute("aria-label", label || "Dil");
      bar.querySelectorAll("[data-lang]").forEach(function (button) {
        if (button.getAttribute("data-lang") === lang) {
          button.setAttribute("aria-current", "true");
        } else {
          button.removeAttribute("aria-current");
        }
      });
    }

    listeners.forEach(function (fn) {
      fn(lang);
    });
  }

  document.addEventListener("click", function (event) {
    var button = event.target.closest(".lang [data-lang]");
    if (!button) return;
    var lang = button.getAttribute("data-lang");
    if (lang !== "tr" && lang !== "en" && lang !== "ru") return;
    if (lang === readLang()) return;
    writeLang(lang);
    apply();
  });

  window.LapsI18n = {
    lang: readLang,
    t: function (key, fallback) {
      var value = lookup(key);
      return value == null ? fallback : value;
    },
    count: function (n) {
      var lang = readLang();
      if (lang === "en") return n + (n === 1 ? " item" : " items");
      if (lang === "ru") {
        var n10 = n % 10;
        var n100 = n % 100;
        var word = "блюд";
        if (n10 === 1 && n100 !== 11) word = "блюдо";
        else if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) word = "блюда";
        return n + " " + word;
      }
      return n + " ürün";
    },
    onChange: function (fn) {
      listeners.push(fn);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
})();
