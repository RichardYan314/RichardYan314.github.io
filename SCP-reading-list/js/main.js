// Sniff MSIE version
// http://james.padolsey.com/javascript/detect-ie-in-js-using-conditional-comments/
var ie = ( function() {
  var undef,
  v = 3,
  div = document.createElement('div'),
  all = div.getElementsByTagName('i');
  while (
   div.innerHTML='<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',all[0]
  );
  return v > 4 ? v : undef;
}() );

function onLoad() {
  if( ie && ie < 9 ) {
    D3notok();
  } else {
    // Load D3.js, and once loaded do our stuff
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://d3js.org/d3.v3.min.js";
    script.addEventListener('load', D3ok, false);
    // script.onload = D3ok;
    head.appendChild(script);
 }
 $("#goBackButton > a").attr("href", document.referrer || "/" )
}