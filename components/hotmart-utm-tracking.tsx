const HOTMART_UTM_TRACKING_SCRIPT = `
(function () {
  var storageKey = "cefinHotmartUtmParams";
  var utmParamNames = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term"
  ];

  function hasParams(params) {
    return Object.keys(params).length > 0;
  }

  function readUtmsFromSearch(search) {
    var searchParams = new URLSearchParams(search);
    var utms = {};

    utmParamNames.forEach(function (name) {
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

      utmParamNames.forEach(function (name) {
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

      event.preventDefault();
      event.stopPropagation();

      if (typeof event.stopImmediatePropagation === "function") {
        event.stopImmediatePropagation();
      }

      window.setTimeout(function () {
        var targetWindow = anchor.getAttribute("target");

        if (targetWindow && targetWindow !== "_self") {
          window.open(trackedHref, targetWindow, "noopener,noreferrer");
          return;
        }

        window.location.href = trackedHref;
      }, 0);
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
