(this.webpackJsonpqrs=this.webpackJsonpqrs||[]).push([[0],{52:function(e,t,n){},53:function(e,t,n){},54:function(e,t,n){},56:function(e,t,n){},57:function(e,t,n){"use strict";n.r(t);var a=n(6),i=n.n(a),c=n(38),r=n.n(c),o=(n(52),n(11)),s=(n(53),n(39)),d=n.n(s),u=(n(54),n(1)),l=function(e){var t=e.label,n=e.maxWidth,i=void 0===n?1920:n,c=e.maxHeight,r=void 0===c?1080:c,s=e.onChange,d=Object(a.useState)(""),l=Object(o.a)(d,2),h=l[0],g=l[1];return Object(u.jsxs)("div",{className:"input-image",children:[h&&Object(u.jsx)("img",{alt:"Uploaded image",className:"input-image--image",src:h}),Object(u.jsx)("button",{onClick:function(){var e=document.createElement("input");e.type="file",e.accept="image/*",e.onchange=function(e){var t=new FileReader;if(t.onload=function(){var e,n=(null===(e=t.result)||void 0===e?void 0:e.toString())||"",a=document.createElement("canvas"),c=a.getContext("2d");if(c){var o=new Image;o.onload=function(){var e=i,t=r,n=i/o.width,d=r/o.height;n>d?t=o.height*n:e=o.width*d,a.width=e,a.height=t,c.drawImage(o,0,0,e,t);var u=a.toDataURL();g(u),s(u)},o.src=n}},e&&e.target){var n=e.target;n.files&&t.readAsDataURL(n.files[0])}},e.click()},children:t})]})},h=(n(56),function(e){var t,n=e.onChange,c=document.createElement("canvas"),r=c.getContext("2d"),s=i.a.useRef(null),h=Object(a.useState)(null),g=Object(o.a)(h,2),b=g[0],f=g[1],j=Object(a.useState)(""),v=Object(o.a)(j,2),m=v[0],O=v[1],p=Object(a.useState)(!0),x=Object(o.a)(p,2),C=x[0],w=x[1],S=function(e,t,a){if(r){c.height=a,c.width=t,r.drawImage(e,0,0,t,a);var i=r.getImageData(0,0,t,a);try{var o=d()(i.data,i.width,i.height,{inversionAttempts:"dontInvert"});if(o)return O(o.data),setTimeout((function(){n(o.data)}),1e3),!0}catch(s){if(s instanceof RangeError)throw s}}return!1},y=function e(){m||(b&&b.readyState===b.HAVE_ENOUGH_DATA&&S(b,b.videoHeight,b.videoWidth),t=setTimeout(e,200))};i.a.useEffect((function(){var e;s.current&&f(s.current),b&&navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}}).then((function(n){var a=(e=n).getVideoTracks(),i=Object(o.a)(a,1)[0],c=i&&i.getCapabilities&&i.getCapabilities();c&&c.zoom&&i&&i.applyConstraints({advanced:[{zoom:c.zoom.min}]}),b.srcObject=e,b.setAttribute("playsinline","true"),b.play(),t=setTimeout(y,1e3)})).then((function(){w(!1)}));return function(){var n;null===(n=e)||void 0===n||n.getTracks().forEach((function(e){e.stop()})),clearTimeout(t)}}),[b]);return Object(u.jsxs)("div",{className:"scanner",children:[C&&Object(u.jsx)(l,{label:"Last opp bilde av QR code",onChange:function(e){var t=new Image;t.onload=function(){S(t,t.width,t.height)||alert("could not find QR code im uploaded image. Please try again")},t.src=e},maxWidth:640,maxHeight:480}),Object(u.jsx)("video",{className:"scanner__video",ref:s}),Object(u.jsx)("div",{className:"scanner__code",children:m}),Object(u.jsx)("button",{onClick:function(){return n("")},children:"Avbryt"})]})}),g=function(e){var t=e.onChange,n=e.label,i=Object(a.useState)(!1),c=Object(o.a)(i,2),r=c[0],s=c[1];return Object(u.jsxs)("div",{className:"qr-scanner",children:[Object(u.jsx)("button",{onClick:function(){return s(!0)},children:n}),r?Object(u.jsx)(h,{onChange:function(e){t(e),s(!1)}}):null]})};var b=function(){var e=Object(a.useState)(""),t=Object(o.a)(e,2),n=t[0],i=t[1];return Object(u.jsxs)("div",{className:"App",children:[Object(u.jsx)("a",{href:n,children:n}),Object(u.jsx)(g,{onChange:i,label:"scan qr"})]})},f=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,65)).then((function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),a(e),i(e),c(e),r(e)}))},j=n(64),v=n(45);j.a({dsn:"https://175cda1b995144fca72721c4adf324bb@o556988.ingest.sentry.io/5688577",integrations:[new v.a.BrowserTracing],tracesSampleRate:1}),r.a.render(Object(u.jsx)(i.a.StrictMode,{children:Object(u.jsx)(b,{})}),document.getElementById("root")),f()}},[[57,1,2]]]);
//# sourceMappingURL=main.7181b470.chunk.js.map