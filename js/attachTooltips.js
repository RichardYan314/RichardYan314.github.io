window.addEventListener("load", function (ev) {
    let pattern = /^(fnref)(.+)$/;
    let base = {html: e1 => '#tooltip' + pattern.exec(e1.id)[2].replace(/\./g, "\\.")}
    let extra = {"theme_name":"hint","placement":"top-start","arrow":true,"animation":"fade","distance":15,"arrowTransform":"scale(2)","theme":"hint"}
    
    tippy('a[id^="fnref"]',
          Object.assign({},base, extra))
});