var g=Object.defineProperty;var m=(i,e,o)=>e in i?g(i,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):i[e]=o;var c=(i,e,o)=>m(i,typeof e!="symbol"?e+"":e,o);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}})();const b="public",a=document.createElement("template");a.innerHTML=`
  <style>
    svg {
      display: block;
    }
  </style>
  <div class="icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
    </svg>
  </div>
`;class l extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(a.content.cloneNode(!0))}async connectedCallback(){await this.render()}async attributeChangedCallback(){await this.render()}async render(){const e=this.getAttribute("icon");if(e)try{const o=await this.loadSvg(e);this.isValidSvg(o)?this.shadowRoot.querySelector(".icon").innerHTML=o:console.error("Invalid SVG content for icon:",e)}catch(o){console.error("Error rendering icon:",o)}}isValidSvg(e){if(e){const t=new DOMParser().parseFromString(e,"image/svg+xml").documentElement;return t&&t.tagName.toLowerCase()==="svg"}return!1}async loadSvg(e){const o=new URL(document.location.href),r=`${o.protocol}//${o.host}/${b}/${e}.svg`;try{const t=await fetch(r);return t.ok?await t.text():(console.error(`Error fetching SVG: ${t.status}`),null)}catch(t){return console.error("Fetch error:",t),null}}}c(l,"observedAttributes",["icon"]);window.customElements.define("app-icon",l);const d=document.createElement("template");d.innerHTML=`
  <style>
    .icon-container {
      position: relative;
      padding: 4px 16px;
      width: max-content;
      border-radius: 100px;
      transition: 0.5s;
    }
    
    .icon-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #DFE3E7;
      opacity: 0;
      border-radius: inherit;
      transition: opacity 0.5s;
    }
    
    .icon-container:hover::before {
      opacity: 0.05;
    }
    
    .icon-container:hover > .icon {
      transform-origin: 50% 50%;
      transform: scale(1.05);
      fill: #DFE3E7;
    }
    
    .button:hover > .button-text {
      color: #DFE3E7;
    }
    
    .icon {
      position: relative;
      font-size: 24px;
      font-weight: lighter;
      letter-spacing: 1px;
      height: max-content;
      width: max-content;
      transition: 0.5s;
    }
    
    .button {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: max-content;
    }
    
    .button:hover {
      cursor: pointer;
    }
    
    .button-text {
      font-size: 11px;
      margin-top: 4px;
      transition: 0.5s;
    }

  </style>
  <style id="dynamic-styles"></style>

  <div class="button">
    <div class="icon-container">
        <div class="icon">
            <app-icon icon=""></app-icon>
        </div>
    </div>
    <span class="button-text"></span>
  </div>
`;class u extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(d.content.cloneNode(!0))}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}render(){const e=this.shadowRoot.querySelector(".button-text"),o=this.shadowRoot.querySelector("app-icon"),r=this.getAttribute("icon"),t=this.getAttribute("text");o.setAttribute("icon",r),e.textContent=t;const n=this.getAttribute("isSelected")==="true",s=this.getAttribute("hoverColor"),h=this.getAttribute("contentColorVariant"),p=n?this.getAttribute("contentColor"):h,f=n?this.getAttribute("containerColor"):"";this.updateStyles(p,f,s)}updateStyles(e,o,r){const t=this.shadowRoot.querySelector("#dynamic-styles");t.textContent=`
          .button-text {
            color: ${e};
          }
          .icon {
            fill: ${e};
          }
          .icon-container {
            background-color: ${o};
          }
          .icon-container::before {
            background-color: ${r};
          }
          .icon-container:hover::before {
            opacity: 0.05;
          }
          .icon-container:hover > .icon {
            fill: ${r};
          }
          .button:hover > .button-text {
            color: ${r};
          }
        `}}c(u,"observedAttributes",["contentColor","containerColor","isSelected"]);window.customElements.define("sidebar-button",u);
