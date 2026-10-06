(function () {
  var measurementId = "G-13VJYX1E77";
  var adsId = "";
  var cookieName = "laps_consent";
  var maxAge = 60 * 60 * 24 * 180;

  function readConsent() {
    var match = document.cookie.match(
      new RegExp("(?:^|; )" + cookieName + "=(granted|denied)")
    );
    return match ? match[1] : "";
  }

  function writeConsent(value) {
    var secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie =
      cookieName +
      "=" +
      value +
      "; Path=/; Max-Age=" +
      maxAge +
      "; SameSite=Lax" +
      secure;
  }

  function clearConsent() {
    document.cookie =
      cookieName + "=; Path=/; Max-Age=0; SameSite=Lax";
  }

  function gtag() {
    window.dataLayer.push(arguments);
  }

  function loadTags() {
    if (readConsent() !== "granted") return;
    if (!measurementId && !adsId) return;
    if (window.lapsTagsLoaded) return;
    window.lapsTagsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = gtag;
    gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    gtag("consent", "update", {
      analytics_storage: measurementId ? "granted" : "denied",
      ad_storage: adsId ? "granted" : "denied",
      ad_user_data: adsId ? "granted" : "denied",
      ad_personalization: adsId ? "granted" : "denied",
    });
    var id = measurementId || adsId;
    var script = document.createElement("script");
    script.async = true;
    script.src =
      "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(script);
    gtag("js", new Date());
    if (measurementId) gtag("config", measurementId);
    if (adsId) gtag("config", adsId);
  }

  function setBanner(open) {
    var banner = document.getElementById("consent");
    if (!banner) return;
    banner.hidden = !open;
    document.body.classList.toggle("consent-open", open);
  }

  function choose(value) {
    writeConsent(value);
    setBanner(false);
    if (value === "granted") loadTags();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var consent = readConsent();
    if (consent === "granted") loadTags();
    else if (!consent) setBanner(true);

    var accept = document.getElementById("consent-accept");
    var reject = document.getElementById("consent-reject");
    var reset = document.getElementById("consent-reset");
    if (accept) accept.addEventListener("click", function () { choose("granted"); });
    if (reject) reject.addEventListener("click", function () { choose("denied"); });
    if (reset) {
      reset.addEventListener("click", function () {
        clearConsent();
        setBanner(true);
      });
    }
  });
})();
