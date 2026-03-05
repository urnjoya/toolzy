// Google tag (gtag.js)
// load google tag script dynamically
function loadScript(src, async = true) {
    const s = document.createElement("script");
    s.src = src;
    s.async = async;
    document.head.appendChild(s);
}
loadScript("https://www.googletagmanager.com/gtag/js?id=G-44K47CQEKZ")

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'G-44K47CQEKZ');
