(this.webpackJsonpqrs=this.webpackJsonpqrs||[]).push([[0],{34:function(e,t,n){},35:function(e,t,n){},36:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var i=n(6),a=n.n(i),c=n(24),r=n.n(c),o=(n(34),n(12)),s=(n(35),n(25)),u=n.n(s),d=(n(36),n(3)),h=function(e){var t=e.onChange,n=document.createElement("canvas"),c=n.getContext("2d"),r=a.a.useRef(null),s=Object(i.useState)(null),h=Object(o.a)(s,2),l=h[0],v=h[1],b=function e(){if(n&&c&&l&&l.readyState===l.HAVE_ENOUGH_DATA){n.height=l.videoHeight,n.width=l.videoWidth,c.drawImage(l,0,0,l.videoHeight,l.videoWidth);var i=c.getImageData(0,0,l.videoHeight,l.videoWidth);try{var a=u()(i.data,i.width,i.height,{inversionAttempts:"dontInvert"});if(a)return void t(a.data)}catch(r){if(r instanceof RangeError)throw r}}requestAnimationFrame(e)};return a.a.useEffect((function(){var e;r.current&&v(r.current),l&&navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}}).then((function(t){e=t,l.srcObject=e,l.setAttribute("playsinline","true"),l.play(),requestAnimationFrame(b)}));return function(){var t;null===(t=e)||void 0===t||t.getTracks().forEach((function(e){e.stop()}))}}),[l]),Object(d.jsxs)("div",{className:"scanner",children:[Object(d.jsx)("video",{className:"scanner__video",ref:r}),Object(d.jsx)("button",{onClick:function(){return t("")},children:"Avbryt"})]})},l=function(e){var t=e.onChange,n=e.label,a=Object(i.useState)(!1),c=Object(o.a)(a,2),r=c[0],s=c[1];return Object(d.jsxs)("div",{className:"qr-scanner",children:[Object(d.jsx)("button",{onClick:function(){return s(!0)},children:n}),r?Object(d.jsx)(h,{onChange:function(e){t(e),s(!1)}}):null]})};var v=function(){var e=Object(i.useState)(""),t=Object(o.a)(e,2),n=t[0],a=t[1];return Object(d.jsxs)("div",{className:"App",children:[Object(d.jsx)("div",{children:n}),Object(d.jsx)(l,{onChange:a,label:"scan qr"})]})},b=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,48)).then((function(t){var n=t.getCLS,i=t.getFID,a=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),i(e),a(e),c(e),r(e)}))},f=n(46),j=n(27);f.a({dsn:"https://175cda1b995144fca72721c4adf324bb@o556988.ingest.sentry.io/5688577",integrations:[new j.a.BrowserTracing],tracesSampleRate:1}),r.a.render(Object(d.jsx)(a.a.StrictMode,{children:Object(d.jsx)(v,{})}),document.getElementById("root")),b()}},[[39,1,2]]]);
//# sourceMappingURL=main.9ba197cf.chunk.js.map