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
      "menu.back": "Back",
      "menu.nav": "Menu navigation",
      "menu.loading": "Loading the menu...",
      "menu.error": "The menu could not be loaded. Please try again later.",
      "menu.empty": "Nothing in this section yet.",
      "legal.binding": "The Turkish text is the binding version.",
      "privacy.h1": "Privacy notice",
      "cookies.h1": "Cookies",
      "terms.h1": "Terms of use",
      "cat.burgerler": "Burgers",
      "cat.sandvicler": "Sandwiches",
      "cat.gurme-tost": "Gourmet toast",
      "cat.wings": "Wings",
      "cat.tatlilar": "Desserts",
      "cat.kahveler": "Coffee",
      "item.Laps Burger": "Laps Burger",
      "desc.Laps Burger":
        "Two rib burgers, caramelized onion, pickle, lettuce and cheddar sauce.",
      "item.Teksas Burger": "Texas Burger",
      "desc.Teksas Burger":
        "Smoked meat, beef patty, tomato, pickle, jalapeno, lettuce.",
      "item.Klasik Burger": "Classic Burger",
      "desc.Klasik Burger": "Patty, red onion, pickle, tomato.",
      "item.Chessburger": "Chessburger",
      "desc.Chessburger": "Patty, pickle, tomato, caramelized onion.",
      "item.Tavuk Burger": "Chicken Burger",
      "desc.Tavuk Burger":
        "Breaded chicken thigh, Laps sauce, lettuce, pickle.",
      "note.Tavuk Burger": "Contains coconut",
      "item.Öğrenci Burger": "Student Burger",
      "desc.Öğrenci Burger": "Patty, tomato, lettuce, sauce, crispy potatoes.",
      "item.İkili tavuklu bun": "Chicken duo bun",
      "desc.İkili tavuklu bun": "Laps honey mustard, lettuce, pickle, Laps sauce.",
      "item.İkili acılı taco bun": "Spicy taco duo bun",
      "desc.İkili acılı taco bun":
        "100% lean mince, jalapeno, Mexican beans, Laps hot sauce, ranch, crispy, pepper potatoes.",
      "item.İkili fesleğenli sweetchilly bun": "Basil sweetchilly duo bun",
      "desc.İkili fesleğenli sweetchilly bun": "Basil bun, lettuce, Laps sauce.",
      "item.Sosisli": "With sausage",
      "item.Görali": "Görali",
      "item.Patsos": "Patsos",
      "item.Sucuk füme et chedar kaşar domates":
        "Sucuk, smoked meat, cheddar, kashar, tomato",
      "item.3 peynirli pestolu": "Three-cheese pesto",
      "item.Karışık tost (kaşar domates sucuk)":
        "Mixed toast (kashar, tomato, sucuk)",
      "item.Kaşarlı tost": "Kashar toast",
      "item.Buffalo (acı)": "Buffalo (hot)",
      "item.Ballı hardal": "Honey mustard",
      "item.Garlic parmesan kekik": "Garlic parmesan thyme",
      "item.Sweetchilly": "Sweetchilly",
      "item.İsli barbekü": "Smoked barbecue",
      "item.Magnolia": "Magnolia",
      "item.Cake": "Cake",
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
        "LAPS! is operated by Yusuf Çelik at Pazaryeri Mahallesi, Süleyman Demirel Bulvarı No: 196 A, Fethiye / Muğla. Last updated: 6 October 2026.",
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
      "menu.back": "Назад",
      "menu.nav": "Навигация по меню",
      "menu.loading": "Меню загружается...",
      "menu.error": "Меню не загрузилось. Попробуйте позже.",
      "menu.empty": "В этом разделе пока ничего нет.",
      "legal.binding": "Обязательная версия текста — турецкая.",
      "privacy.h1": "Уведомление о данных",
      "cookies.h1": "Файлы cookie",
      "terms.h1": "Условия использования",
      "cat.burgerler": "Бургеры",
      "cat.sandvicler": "Сэндвичи",
      "cat.gurme-tost": "Гурме тост",
      "cat.wings": "Крылышки",
      "cat.tatlilar": "Десерты",
      "cat.kahveler": "Кофе",
      "item.Laps Burger": "Laps Burger",
      "desc.Laps Burger":
        "Два бургера из рёбер, карамелизированный лук, корнишон, салат и соус чеддер.",
      "item.Teksas Burger": "Техасский бургер",
      "desc.Teksas Burger":
        "Копчёное мясо, котлета, помидор, корнишон, халапеньо, салат.",
      "item.Klasik Burger": "Классический бургер",
      "desc.Klasik Burger": "Котлета, красный лук, корнишон, помидор.",
      "item.Chessburger": "Chessburger",
      "desc.Chessburger": "Котлета, корнишон, помидор, карамелизированный лук.",
      "item.Tavuk Burger": "Бургер с курицей",
      "desc.Tavuk Burger": "Куриное бедро в панировке, соус Laps, салат, корнишон.",
      "note.Tavuk Burger": "Содержит кокос",
      "item.Öğrenci Burger": "Студенческий бургер",
      "desc.Öğrenci Burger": "Котлета, помидор, салат, соус, хрустящий картофель.",
      "item.İkili tavuklu bun": "Двойной бун с курицей",
      "desc.İkili tavuklu bun":
        "Медовая горчица Laps, салат, корнишон, соус Laps.",
      "item.İkili acılı taco bun": "Острый тако-бун",
      "desc.İkili acılı taco bun":
        "100% постный фарш, халапеньо, мексиканская фасоль, острый соус Laps, ранч, хрустящая картошка, картофель с перцем.",
      "item.İkili fesleğenli sweetchilly bun": "Базиликовый sweetchilly бун",
      "desc.İkili fesleğenli sweetchilly bun": "Булочка с базиликом, салат, соус Laps.",
      "item.Sosisli": "С сосиской",
      "item.Görali": "Görali",
      "item.Patsos": "Patsos",
      "item.Sucuk füme et chedar kaşar domates":
        "Суджук, копчёное мясо, чеддер, кашар, помидор",
      "item.3 peynirli pestolu": "Песто с тремя сырами",
      "item.Karışık tost (kaşar domates sucuk)":
        "Смешанный тост (кашар, помидор, суджук)",
      "item.Kaşarlı tost": "Тост с кашаром",
      "item.Buffalo (acı)": "Буффало (острый)",
      "item.Ballı hardal": "Медовая горчица",
      "item.Garlic parmesan kekik": "Чеснок, пармезан, тимьян",
      "item.Sweetchilly": "Sweetchilly",
      "item.İsli barbekü": "Копчёное барбекю",
      "item.Magnolia": "Magnolia",
      "item.Cake": "Cake",
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
        "LAPS! ведёт Юсуф Челик по адресу Pazaryeri Mahallesi, Süleyman Demirel Bulvarı No: 196 A, Fethiye / Muğla. Обновлено: 6 октября 2026.",
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
