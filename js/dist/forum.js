(()=>{var e={n:t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return e.d(n,{a:n}),n},d:(t,n)=>{for(var a in n)e.o(n,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:n[a]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};(()=>{"use strict";e.r(t);const n=flarum.core.compat["forum/app"];var a=e.n(n);const r=flarum.core.compat["common/extend"],i=flarum.core.compat["forum/components/CommentPost"];var o=e.n(i);a().initializers.add("datlechin/flarum-link-preview",(function(){(0,r.extend)(o().prototype,"oncreate",(function(){this.element.querySelectorAll(".Post-body a[rel]").forEach((function(e){var t=e.getAttribute("href");if(!(e.classList.contains("PostMention")&&e.classList.contains("UserMention")||t!==e.textContent)){var n=document.createElement("div");n.classList.add("LinkPreview"),e.parentNode.insertBefore(n,e),n.appendChild(e);var r=document.createElement("div");r.classList.add("LinkPreview-image"),n.appendChild(r);var i=document.createElement("img");r.appendChild(i);var o=document.createElement("div");o.classList.add("LinkPreview-main"),n.appendChild(o);var d=document.createElement("div");d.classList.add("LinkPreview-title"),o.appendChild(d);var l=document.createElement("a");l.target="_blank",d.appendChild(l);var c=document.createElement("div");c.classList.add("LinkPreview-description"),o.appendChild(c);var s=document.createElement("div");s.classList.add("LinkPreview-domain"),o.appendChild(s);var m=document.createElement("a");m.href=t,m.target="_blank";var p=t.split("/")[2].replace("www.",""),u=t.split("/")[0]+"//"+p,v=document.createElement("img");v.setAttribute("src","https://www.google.com/s2/favicons?sz=64&domain_url="+u),s.appendChild(v),m.textContent=p,s.appendChild(m),m.href=u;var f=document.createElement("i");f.classList.add("fa","fa-spinner","fa-spin"),r.appendChild(f),e.remove(),a().request({url:a().forum.attribute("apiUrl")+"/datlechin-link-preview?url="+encodeURIComponent(t),method:"GET"}).then((function(e){f.remove();var n=e.image?e.image:"https://www.google.com/s2/favicons?sz=64&domain_url="+u;i.setAttribute("src",n),l.href=e.url?e.url:t,l.textContent=e.title?e.title:p,c.textContent=e.description?e.description:"",m.textContent=e.site_name?e.site_name:p}))}}))}))}))})(),module.exports=t})();
//# sourceMappingURL=forum.js.map