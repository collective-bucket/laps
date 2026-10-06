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

  function applyConsent(value) {
    window.dataLayer = window.dataLayer || [];
    gtag("consent", "update", {
      analytics_storage:
        value === "granted" && measurementId ? "granted" : "denied",
      ad_storage: value === "granted" && adsId ? "granted" : "denied",
      ad_user_data: value === "granted" && adsId ? "granted" : "denied",
      ad_personalization: value === "granted" && adsId ? "granted" : "denied",
    });
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
    applyConsent(value);
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!readConsent()) setBanner(true);

    var accept = document.getElementById("consent-accept");
    var reject = document.getElementById("consent-reject");
    var reset = document.getElementById("consent-reset");
    if (accept) accept.addEventListener("click", function () { choose("granted"); });
    if (reject) reject.addEventListener("click", function () { choose("denied"); });
    if (reset) {
      reset.addEventListener("click", function () {
        clearConsent();
        applyConsent("denied");
        setBanner(true);
      });
    }
  });
})();
