const HOTMART_UTM_TRACKING_SCRIPT = `
(function () {
  var storageKey = "cefinHotmartUtmParams";
  var attributionParamNames = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "fbclid",
    "campaign_id",
    "adset_id",
    "ad_id",
    "placement",
    "landing",
    "producto"
  ];

  function hasParams(params) {
    return Object.keys(params).length > 0;
  }

  function readUtmsFromSearch(search) {
    var searchParams = new URLSearchParams(search);
    var utms = {};

    attributionParamNames.forEach(function (name) {
      var value = searchParams.get(name);

      if (value) {
        utms[name] = value;
      }
    });

    return utms;
  }

  function saveUtms(params) {
    if (!hasParams(params)) return;

    var serializedParams = JSON.stringify(params);

    try {
      window.sessionStorage.setItem(storageKey, serializedParams);
    } catch (error) {}

    try {
      window.localStorage.setItem(storageKey, serializedParams);
    } catch (error) {}
  }

  function readStoredUtms(storage) {
    try {
      var storedValue = storage.getItem(storageKey);
      if (!storedValue) return {};

      var parsedValue = JSON.parse(storedValue);
      var utms = {};

      attributionParamNames.forEach(function (name) {
        if (typeof parsedValue[name] === "string" && parsedValue[name]) {
          utms[name] = parsedValue[name];
        }
      });

      return utms;
    } catch (error) {
      return {};
    }
  }

  function getActiveUtms() {
    var currentUtms = readUtmsFromSearch(window.location.search);

    if (hasParams(currentUtms)) {
      saveUtms(currentUtms);
      return currentUtms;
    }

    var sessionUtms = readStoredUtms(window.sessionStorage);
    if (hasParams(sessionUtms)) return sessionUtms;

    return readStoredUtms(window.localStorage);
  }

  function isHotmartUrl(url) {
    return url.hostname === "hotmart.com" || url.hostname.endsWith(".hotmart.com");
  }

  function getTrackedHotmartHref(anchor) {
    var href = anchor.getAttribute("href");
    var utms = getActiveUtms();

    if (!href || !hasParams(utms)) return null;

    try {
      var url = new URL(href, window.location.href);

      if (!isHotmartUrl(url)) return null;

      utmParamNames.forEach(function (name) {
        if (utms[name]) {
          url.searchParams.set(name, utms[name]);
        }
      });

      return url.toString();
    } catch (error) {
      return null;
    }
  }

  document.addEventListener(
    "click",
    function (event) {
      var target = event.target;

      if (!target || !target.closest) return;

      var anchor = target.closest("a[href]");
      if (!anchor) return;

      var trackedHref = getTrackedHotmartHref(anchor);
      if (!trackedHref || trackedHref === anchor.href) return;

      // Mutate the known Hotmart link and let the browser perform its normal
      // navigation immediately. Analytics must never delay checkout loading.
      anchor.setAttribute("href", trackedHref);
    },
    true
  );

  getActiveUtms();
})();
`;

export function HotmartUtmTracking() {
  return (
    <script
      id="hotmart-utm-tracking"
      dangerouslySetInnerHTML={{ __html: HOTMART_UTM_TRACKING_SCRIPT }}
    />
  );
}
