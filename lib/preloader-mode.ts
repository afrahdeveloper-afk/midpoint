/**
 * When the preloader is skipped:
 *  - phones and tablets: (max-width: 760px) or (pointer: coarse) — the hero renders immediately;
 *  - desktop after the first visit of the session (sessionStorage "mp-seen").
 *
 * The decision must be made before the first paint, so it runs as a tiny inline <head> script
 * that adds `np` ("no preloader") to <html>; globals.css then hides the loader and shows the
 * header and hero copy straight away. The Preloader component reads the same class.
 */
export const NO_PRELOADER_QUERY = "(max-width:760px),(pointer:coarse)";

/**
 * `np-boot` additionally marks the initial document load (removed after mount): content that
 * normally fades in on arrival (the brand page) is shown at once instead, so the hero renders
 * immediately and its image can be the LCP element. In-app navigation keeps the fades.
 */
export const NO_PRELOADER_SCRIPT = `(function(){try{var d=document.documentElement;if(/[?&]preloader\\b/.test(location.search))return;if(matchMedia(${JSON.stringify(
  NO_PRELOADER_QUERY,
)}).matches||sessionStorage.getItem("mp-seen")==="1")d.classList.add("np","np-boot")}catch(e){}})();`;
// "?preloader" in the URL forces it on any device and on repeat visits (to preview the design).
