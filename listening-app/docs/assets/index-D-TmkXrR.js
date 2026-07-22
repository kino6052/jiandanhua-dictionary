(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();var re,d,Oe,Re,L,ke,We,qe,ue,z,R,je,de,ce,fe,Z={},Q=[],_t=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,se=Array.isArray;function E(t,e){for(var n in e)t[n]=e[n];return t}function ve(t){t&&t.parentNode&&t.parentNode.removeChild(t)}function Be(t,e,n){var r,s,i,o={};for(i in e)i=="key"?r=e[i]:i=="ref"?s=e[i]:o[i]=e[i];if(arguments.length>2&&(o.children=arguments.length>3?re.call(arguments,2):n),typeof t=="function"&&t.defaultProps!=null)for(i in t.defaultProps)o[i]===void 0&&(o[i]=t.defaultProps[i]);return G(t,o,r,s,null)}function G(t,e,n,r,s){var i={type:t,props:e,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:s??++Oe,__i:-1,__u:0};return s==null&&d.vnode!=null&&d.vnode(i),i}function oe(t){return t.children}function W(t,e){this.props=t,this.context=e}function T(t,e){if(e==null)return t.__?T(t.__,t.__i+1):null;for(var n;e<t.__k.length;e++)if((n=t.__k[e])!=null&&n.__e!=null)return n.__e;return typeof t.type=="function"?T(t):null}function ct(t){if(t.__P&&t.__d){var e=t.__v,n=e.__e,r=[],s=[],i=E({},e);i.__v=e.__v+1,d.vnode&&d.vnode(i),ye(t.__P,i,e,t.__n,t.__P.namespaceURI,32&e.__u?[n]:null,r,n??T(e),!!(32&e.__u),s),i.__v=e.__v,i.__.__k[i.__i]=i,Je(r,i,s),e.__e=e.__=null,i.__e!=n&&Ke(i)}}function Ke(t){if((t=t.__)!=null&&t.__c!=null)return t.__e=t.__c.base=null,t.__k.some(function(e){if(e!=null&&e.__e!=null)return t.__e=t.__c.base=e.__e}),Ke(t)}function xe(t){(!t.__d&&(t.__d=!0)&&L.push(t)&&!Y.__r++||ke!=d.debounceRendering)&&((ke=d.debounceRendering)||We)(Y)}function Y(){try{for(var t,e=1;L.length;)L.length>e&&L.sort(qe),t=L.shift(),e=L.length,ct(t)}finally{L.length=Y.__r=0}}function Ve(t,e,n,r,s,i,o,a,_,u,c){var v,l,f,p,S,g,m,h=r&&r.__k||Q,C=e.length;for(_=ft(n,e,h,_,C),v=0;v<C;v++)(f=n.__k[v])!=null&&(l=f.__i!=-1&&h[f.__i]||Z,f.__i=v,g=ye(t,f,l,s,i,o,a,_,u,c),p=f.__e,f.ref&&l.ref!=f.ref&&(l.ref&&be(l.ref,null,f),c.push(f.ref,f.__c||p,f)),S==null&&p!=null&&(S=p),(m=!!(4&f.__u))||l.__k===f.__k?(_=ze(f,_,t,m),m&&l.__e&&(l.__e=null)):typeof f.type=="function"&&g!==void 0?_=g:p&&(_=p.nextSibling),f.__u&=-7);return n.__e=S,_}function ft(t,e,n,r,s){var i,o,a,_,u,c=n.length,v=c,l=0;for(t.__k=new Array(s),i=0;i<s;i++)(o=e[i])!=null&&typeof o!="boolean"&&typeof o!="function"?(typeof o=="string"||typeof o=="number"||typeof o=="bigint"||o.constructor==String?o=t.__k[i]=G(null,o,null,null,null):se(o)?o=t.__k[i]=G(oe,{children:o},null,null,null):o.constructor===void 0&&o.__b>0?o=t.__k[i]=G(o.type,o.props,o.key,o.ref?o.ref:null,o.__v):t.__k[i]=o,_=i+l,o.__=t,o.__b=t.__b+1,a=null,(u=o.__i=pt(o,n,_,v))!=-1&&(v--,(a=n[u])&&(a.__u|=2)),a==null||a.__v==null?(u==-1&&(s>c?l--:s<c&&l++),typeof o.type!="function"&&(o.__u|=4)):u!=_&&(u==_-1?l--:u==_+1?l++:(u>_?l--:l++,o.__u|=4))):t.__k[i]=null;if(v)for(i=0;i<c;i++)(a=n[i])!=null&&(2&a.__u)==0&&(a.__e==r&&(r=T(a)),Qe(a,a));return r}function ze(t,e,n,r){var s,i;if(typeof t.type=="function"){for(s=t.__k,i=0;s&&i<s.length;i++)s[i]&&(s[i].__=t,e=ze(s[i],e,n,r));return e}t.__e!=e&&(r&&(e&&t.type&&!e.parentNode&&(e=T(t)),n.insertBefore(t.__e,e||null)),e=t.__e);do e=e&&e.nextSibling;while(e!=null&&e.nodeType==8);return e}function pt(t,e,n,r){var s,i,o,a=t.key,_=t.type,u=e[n],c=u!=null&&(2&u.__u)==0;if(u===null&&a==null||c&&a==u.key&&_==u.type)return n;if(r>(c?1:0)){for(s=n-1,i=n+1;s>=0||i<e.length;)if((u=e[o=s>=0?s--:i++])!=null&&(2&u.__u)==0&&a==u.key&&_==u.type)return o}return-1}function Ce(t,e,n){e[0]=="-"?t.setProperty(e,n??""):t[e]=n==null?"":typeof n!="number"||_t.test(e)?n:n+"px"}function K(t,e,n,r,s){var i,o;e:if(e=="style")if(typeof n=="string")t.style.cssText=n;else{if(typeof r=="string"&&(t.style.cssText=r=""),r)for(e in r)n&&e in n||Ce(t.style,e,"");if(n)for(e in n)r&&n[e]==r[e]||Ce(t.style,e,n[e])}else if(e[0]=="o"&&e[1]=="n")i=e!=(e=e.replace(je,"$1")),o=e.toLowerCase(),e=o in t||e=="onFocusOut"||e=="onFocusIn"?o.slice(2):e.slice(2),t.l||(t.l={}),t.l[e+i]=n,n?r?n[R]=r[R]:(n[R]=de,t.addEventListener(e,i?fe:ce,i)):t.removeEventListener(e,i?fe:ce,i);else{if(s=="http://www.w3.org/2000/svg")e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!="width"&&e!="height"&&e!="href"&&e!="list"&&e!="form"&&e!="tabIndex"&&e!="download"&&e!="rowSpan"&&e!="colSpan"&&e!="role"&&e!="popover"&&e in t)try{t[e]=n??"";break e}catch{}typeof n=="function"||(n==null||n===!1&&e[4]!="-"?t.removeAttribute(e):t.setAttribute(e,e=="popover"&&n==1?"":n))}}function Pe(t){return function(e){if(this.l){var n=this.l[e.type+t];if(e[z]==null)e[z]=de++;else if(e[z]<n[R])return;return n(d.event?d.event(e):e)}}}function ye(t,e,n,r,s,i,o,a,_,u){var c,v,l,f,p,S,g,m,h,C,I,M,O,we,B,ae,P=e.type;if(e.constructor!==void 0)return null;128&n.__u&&(_=!!(32&n.__u),i=[a=e.__e=n.__e]),(c=d.__b)&&c(e);e:if(typeof P=="function"){v=o.length;try{if(h=e.props,C=P.prototype&&P.prototype.render,I=(c=P.contextType)&&r[c.__c],M=c?I?I.props.value:c.__:r,n.__c?m=(l=e.__c=n.__c).__=l.__E:(C?e.__c=l=new P(h,M):(e.__c=l=new W(h,M),l.constructor=P,l.render=dt),I&&I.sub(l),l.state||(l.state={}),l.__n=r,f=l.__d=!0,l.__h=[],l._sb=[]),C&&l.__s==null&&(l.__s=l.state),C&&P.getDerivedStateFromProps!=null&&(l.__s==l.state&&(l.__s=E({},l.__s)),E(l.__s,P.getDerivedStateFromProps(h,l.__s))),p=l.props,S=l.state,l.__v=e,f)C&&P.getDerivedStateFromProps==null&&l.componentWillMount!=null&&l.componentWillMount(),C&&l.componentDidMount!=null&&l.__h.push(l.componentDidMount);else{if(C&&P.getDerivedStateFromProps==null&&h!==p&&l.componentWillReceiveProps!=null&&l.componentWillReceiveProps(h,M),e.__v==n.__v||!l.__e&&l.shouldComponentUpdate!=null&&l.shouldComponentUpdate(h,l.__s,M)===!1){e.__v!=n.__v&&(l.props=h,l.state=l.__s,l.__d=!1),e.__e=n.__e,e.__k=n.__k,e.__k.some(function(D){D&&(D.__=e)}),Q.push.apply(l.__h,l._sb),l._sb=[],l.__h.length&&o.push(l);break e}l.componentWillUpdate!=null&&l.componentWillUpdate(h,l.__s,M),C&&l.componentDidUpdate!=null&&l.__h.push(function(){l.componentDidUpdate(p,S,g)})}if(l.context=M,l.props=h,l.__P=t,l.__e=!1,O=d.__r,we=0,C)l.state=l.__s,l.__d=!1,O&&O(e),c=l.render(l.props,l.state,l.context),Q.push.apply(l.__h,l._sb),l._sb=[];else do l.__d=!1,O&&O(e),c=l.render(l.props,l.state,l.context),l.state=l.__s;while(l.__d&&++we<25);l.state=l.__s,l.getChildContext!=null&&(r=E(E({},r),l.getChildContext())),C&&!f&&l.getSnapshotBeforeUpdate!=null&&(g=l.getSnapshotBeforeUpdate(p,S)),B=c!=null&&c.type===oe&&c.key==null?Ze(c.props.children):c,a=Ve(t,se(B)?B:[B],e,n,r,s,i,o,a,_,u),l.base=e.__e,e.__u&=-161,l.__h.length&&o.push(l),m&&(l.__E=l.__=null)}catch(D){if(o.length=v,e.__v=null,_||i!=null){if(D.then){for(e.__u|=_?160:128;a&&a.nodeType==8&&a.nextSibling;)a=a.nextSibling;i!=null&&(i[i.indexOf(a)]=null),e.__e=a}else if(i!=null)for(ae=i.length;ae--;)ve(i[ae])}else e.__e=n.__e;e.__k==null&&(e.__k=n.__k||[]),D.then||Ge(e),d.__e(D,e,n)}}else i==null&&e.__v==n.__v?(e.__k=n.__k,e.__e=n.__e):a=e.__e=ht(n.__e,e,n,r,s,i,o,_,u);return(c=d.diffed)&&c(e),128&e.__u?void 0:a}function Ge(t){t&&(t.__c&&(t.__c.__e=!0),t.__k&&t.__k.some(Ge))}function Je(t,e,n){for(var r=0;r<n.length;r++)be(n[r],n[++r],n[++r]);d.__c&&d.__c(e,t),t.some(function(s){try{t=s.__h,s.__h=[],t.some(function(i){i.call(s)})}catch(i){d.__e(i,s.__v)}})}function Ze(t){return typeof t!="object"||t==null||t.__b>0?t:se(t)?t.map(Ze):t.constructor!==void 0?null:E({},t)}function ht(t,e,n,r,s,i,o,a,_){var u,c,v,l,f,p,S,g=n.props||Z,m=e.props,h=e.type;if(h=="svg"?s="http://www.w3.org/2000/svg":h=="math"?s="http://www.w3.org/1998/Math/MathML":s||(s="http://www.w3.org/1999/xhtml"),i!=null){for(u=0;u<i.length;u++)if((f=i[u])&&"setAttribute"in f==!!h&&(h?f.localName==h:f.nodeType==3)){t=f,i[u]=null;break}}if(t==null){if(h==null)return document.createTextNode(m);t=document.createElementNS(s,h,m.is&&m),a&&(d.__m&&d.__m(e,i),a=!1),i=null}if(h==null)g===m||a&&t.data==m||(t.data=m);else{if(i=h=="textarea"&&m.defaultValue!=null?null:i&&re.call(t.childNodes),!a&&i!=null)for(g={},u=0;u<t.attributes.length;u++)g[(f=t.attributes[u]).name]=f.value;for(u in g)f=g[u],u=="dangerouslySetInnerHTML"?v=f:u=="children"||u in m||u=="value"&&"defaultValue"in m||u=="checked"&&"defaultChecked"in m||K(t,u,null,f,s);for(u in m)f=m[u],u=="children"?l=f:u=="dangerouslySetInnerHTML"?c=f:u=="value"?p=f:u=="checked"?S=f:a&&typeof f!="function"||g[u]===f||K(t,u,f,g[u],s);if(c)a||v&&(c.__html==v.__html||c.__html==t.innerHTML)||(t.innerHTML=c.__html),e.__k=[];else if(v&&(t.innerHTML=""),Ve(e.type=="template"?t.content:t,se(l)?l:[l],e,n,r,h=="foreignObject"?"http://www.w3.org/1999/xhtml":s,i,o,i?i[0]:n.__k&&T(n,0),a,_),i!=null)for(u=i.length;u--;)ve(i[u]);a&&h!="textarea"||(u="value",h=="progress"&&p==null?t.removeAttribute("value"):p!=null&&(p!==t[u]||h=="progress"&&!p||h=="option"&&p!=g[u])&&K(t,u,p,g[u],s),u="checked",S!=null&&S!=t[u]&&K(t,u,S,g[u],s))}return t}function be(t,e,n){try{if(typeof t=="function"){var r=typeof t.__u=="function";r&&t.__u(),r&&e==null||(t.__u=t(e))}else t.current=e}catch(s){d.__e(s,n)}}function Qe(t,e,n){var r,s;if(d.unmount&&d.unmount(t),(r=t.ref)&&(r.current&&r.current!=t.__e||be(r,null,e)),(r=t.__c)!=null){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(i){d.__e(i,e)}r.base=r.__P=r.__n=null}if(r=t.__k)for(s=0;s<r.length;s++)r[s]&&Qe(r[s],e,n||typeof t.type!="function");n||ve(t.__e),t.__c=t.__=t.__e=void 0}function dt(t,e,n){return this.constructor(t,n)}function vt(t,e,n){var r,s,i,o;e==document&&(e=document.documentElement),d.__&&d.__(t,e),s=(r=!1)?null:e.__k,i=[],o=[],ye(e,t=e.__k=Be(oe,null,[t]),s||Z,Z,e.namespaceURI,s?null:e.firstChild?re.call(e.childNodes):null,i,s?s.__e:e.firstChild,r,o),Je(i,t,o),t.props.children=null}re=Q.slice,d={__e:function(t,e,n,r){for(var s,i,o;e=e.__;)if((s=e.__c)&&!s.__)try{if((i=s.constructor)&&i.getDerivedStateFromError!=null&&(s.setState(i.getDerivedStateFromError(t)),o=s.__d),s.componentDidCatch!=null&&(s.componentDidCatch(t,r||{}),o=s.__d),o)return s.__E=s}catch(a){t=a}throw t}},Oe=0,Re=function(t){return t!=null&&t.constructor===void 0},W.prototype.setState=function(t,e){var n;n=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=E({},this.state),typeof t=="function"&&(t=t(E({},n),this.props)),t&&E(n,t),t!=null&&this.__v&&(e&&this._sb.push(e),xe(this))},W.prototype.forceUpdate=function(t){this.__v&&(this.__e=!0,t&&this.__h.push(t),xe(this))},W.prototype.render=oe,L=[],We=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,qe=function(t,e){return t.__v.__b-e.__v.__b},Y.__r=0,ue=Math.random().toString(8),z="__d"+ue,R="__a"+ue,je=/(PointerCapture)$|Capture$/i,de=0,ce=Pe(!1),fe=Pe(!0);var Ye=function(t,e,n,r){var s;e[0]=0;for(var i=1;i<e.length;i++){var o=e[i++],a=e[i]?(e[0]|=o?1:2,n[e[i++]]):e[++i];o===3?r[0]=a:o===4?r[1]=Object.assign(r[1]||{},a):o===5?(r[1]=r[1]||{})[e[++i]]=a:o===6?r[1][e[++i]]+=a+"":o?(s=t.apply(a,Ye(t,a,n,["",null])),r.push(s),a[0]?e[0]|=2:(e[i-2]=0,e[i]=s)):r.push(a)}return r},Ee=new Map;function yt(t){var e=Ee.get(this);return e||(e=new Map,Ee.set(this,e)),(e=Ye(this,e.get(t)||(e.set(t,e=(function(n){for(var r,s,i=1,o="",a="",_=[0],u=function(l){i===1&&(l||(o=o.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?_.push(0,l,o):i===3&&(l||o)?(_.push(3,l,o),i=2):i===2&&o==="..."&&l?_.push(4,l,0):i===2&&o&&!l?_.push(5,0,!0,o):i>=5&&((o||!l&&i===5)&&(_.push(i,0,o,s),i=6),l&&(_.push(i,l,0,s),i=6)),o=""},c=0;c<n.length;c++){c&&(i===1&&u(),u(c));for(var v=0;v<n[c].length;v++)r=n[c][v],i===1?r==="<"?(u(),_=[_],i=3):o+=r:i===4?o==="--"&&r===">"?(i=1,o=""):o=r+o[0]:a?r===a?a="":o+=r:r==='"'||r==="'"?a=r:r===">"?(u(),i=1):i&&(r==="="?(i=5,s=o,o=""):r==="/"&&(i<5||n[c][v+1]===">")?(u(),i===3&&(_=_[0]),i=_,(_=_[0]).push(2,0,i),i=0):r===" "||r==="	"||r===`
`||r==="\r"?(u(),i=2):o+=r),i===3&&o==="!--"&&(i=4,_=_[0])}return u(),_})(t)),e),arguments,[])).length>1?e:e[0]}const w=yt.bind(Be),bt=[{value:"L1",label:"L1 — up to 4 syllables"},{value:"L2",label:"L2 — 5–6 syllables"},{value:"L3",label:"L3 — 7–9 syllables"},{value:"L4",label:"L4 — 10–15 syllables"}];function mt({vm:t,contrasts:e}){const n=t.mode.value,r=t.difficulty.value,s=t.contrast.value,i=t.count.value,o=t.availableCount.value;return w`
    <div class="screen setup-screen">
      <h2>New session</h2>

      <fieldset class="field">
        <legend>Mode</legend>
        <label class="radio-row">
          <input
            type="radio"
            name="mode"
            checked=${n==="sounds"}
            onChange=${()=>t.setMode("sounds")}
          />
          Sounds only
        </label>
        <label class="radio-row">
          <input
            type="radio"
            name="mode"
            checked=${n==="sounds_tones"}
            onChange=${()=>t.setMode("sounds_tones")}
          />
          Sounds + tones
        </label>
      </fieldset>

      <label class="field">
        <span>Difficulty</span>
        <select
          value=${r}
          onChange=${a=>t.setDifficulty(a.target.value)}
        >
          ${bt.map(a=>w`<option value=${a.value}>${a.label}</option>`)}
        </select>
      </label>

      <label class="field">
        <span>Focus</span>
        <select
          value=${s}
          onChange=${a=>t.setContrast(a.target.value)}
        >
          <option value="all">All sounds</option>
          ${Object.entries(e).map(([a,_])=>w`<option value=${a}>${a} — ${_.description}</option>`)}
        </select>
      </label>

      <label class="field">
        <span>Samples per session</span>
        <input
          type="number"
          min="1"
          value=${i}
          onInput=${a=>t.setCount(Number(a.target.value))}
        />
      </label>

      <p class="hint" aria-live="polite">
        ${o} sample${o===1?"":"s"} available with this filter.
      </p>

      <button
        type="button"
        class="primary"
        disabled=${o===0}
        onClick=${()=>t.startSession()}
      >
        Start session
      </button>
    </div>
  `}var X,x,_e,Le,pe=0,Xe=[],b=d,Me=b.__b,Ne=b.__r,Ue=b.diffed,Ae=b.__c,De=b.unmount,Te=b.__;function et(t,e){b.__h&&b.__h(x,t,pe||e),pe=0;var n=x.__H||(x.__H={__:[],__h:[]});return t>=n.__.length&&n.__.push({}),n.__[t]}function gt(t,e){var n=et(X++,3);!b.__s&&tt(n.__H,e)&&(n.__=t,n.u=e,x.__H.__h.push(n))}function $t(t){return pe=5,me(function(){return{current:t}},[])}function me(t,e){var n=et(X++,7);return tt(n.__H,e)&&(n.__=t(),n.__H=e,n.__h=t),n.__}function St(){for(var t;t=Xe.shift();){var e=t.__H;if(t.__P&&e)try{e.__h.some(J),e.__h.some(he),e.__h=[]}catch(n){e.__h=[],b.__e(n,t.__v)}}}b.__b=function(t){x=null,Me&&Me(t)},b.__=function(t,e){t&&e.__k&&e.__k.__m&&(t.__m=e.__k.__m),Te&&Te(t,e)},b.__r=function(t){Ne&&Ne(t),X=0;var e=(x=t.__c).__H;e&&(_e===x?(e.__h=[],x.__h=[],e.__.some(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})):(e.__h.some(J),e.__h.some(he),e.__h=[],X=0)),_e=x},b.diffed=function(t){Ue&&Ue(t);var e=t.__c;e&&e.__H&&(e.__H.__h.length&&(Xe.push(e)!==1&&Le===b.requestAnimationFrame||((Le=b.requestAnimationFrame)||wt)(St)),e.__H.__.some(function(n){n.u&&(n.__H=n.u,n.u=void 0)})),_e=x=null},b.__c=function(t,e){e.some(function(n){try{n.__h.some(J),n.__h=n.__h.filter(function(r){return!r.__||he(r)})}catch(r){e.some(function(s){s.__h&&(s.__h=[])}),e=[],b.__e(r,n.__v)}}),Ae&&Ae(t,e)},b.unmount=function(t){De&&De(t);var e,n=t.__c;n&&n.__H&&(n.__H.__.some(function(r){try{J(r)}catch(s){e=s}}),n.__H=void 0,e&&b.__e(e,n.__v))};var Fe=typeof requestAnimationFrame=="function";function wt(t){var e,n=function(){clearTimeout(r),Fe&&cancelAnimationFrame(e),setTimeout(t)},r=setTimeout(n,35);Fe&&(e=requestAnimationFrame(n))}function J(t){var e=x,n=t.__c;typeof n=="function"&&(t.__c=void 0,n()),x=e}function he(t){var e=x;t.__c=t.__(),x=e}function tt(t,e){return!t||t.length!==e.length||e.some(function(n,r){return n!==t[r]})}function kt({vm:t}){const e=$t(null),n=t.currentSample.value,r=t.playCount.value,s=t.speed.value,i=t.subPhase.value,o=t.input.value,a=t.progress.value,_=t.currentResult.value,u=t.isLastSample.value;if(gt(()=>{e.current&&(e.current.playbackRate=s)},[s]),!n)return null;function c(){t.play();const p=e.current;p&&(p.currentTime=0,p.playbackRate=t.speed.value,p.play())}function v(p){p.key==="Enter"&&(p.preventDefault(),t.verify())}function l(p){p.key==="Enter"&&(p.preventDefault(),t.next())}function f(p,S){return p>=S?"syllable correct":p>0?"syllable partial":"syllable wrong"}return w`
    <div class="screen drill-screen" onKeyDown=${i==="feedback"?l:void 0}>
      <p class="progress">Sample ${a.position} of ${a.total}</p>

      <audio ref=${e} src=${n.file} preload="auto"></audio>

      <div class="playback-controls">
        <button type="button" class="primary" onClick=${c}>
          ▶ Play${r>0?` (${r}×)`:""}
        </button>
        <label class="speed-control">
          <span>Speed</span>
          <select
            value=${String(s)}
            onChange=${p=>t.setSpeed(Number(p.target.value))}
          >
            <option value="0.75">0.75×</option>
            <option value="1">1×</option>
          </select>
        </label>
      </div>

      ${i==="answering"?w`
            <div class="answer-area">
              <label for="pinyin-input">Type what you heard (pinyin)</label>
              <input
                id="pinyin-input"
                type="text"
                autofocus
                autocomplete="off"
                autocapitalize="off"
                spellcheck=${!1}
                value=${o}
                onInput=${p=>t.updateInput(p.target.value)}
                onKeyDown=${v}
              />
              <button type="button" class="primary" onClick=${()=>t.verify()}>Verify</button>
            </div>
          `:null}

      ${i==="feedback"&&_?w`
            <div class="feedback-area" role="status" aria-live="polite">
              <p>
                Correct: <strong>${n.transcript.replace(/-/g," ")}</strong>
              </p>
              <ul class="syllable-results">
                ${_.map((p,S)=>w`
                    <li key=${S} class=${f(p.earned,p.possible)}>
                      ${p.userSyllable??"—"} → ${p.keySyllable}
                    </li>
                  `)}
              </ul>
              <p class="plays-note">Played ${r} time${r===1?"":"s"}</p>
              <button type="button" class="primary" onClick=${()=>t.next()}>
                ${u?"Finish session":"Next"}
              </button>
            </div>
          `:null}
    </div>
  `}function xt({vm:t}){const e=t.report.value;if(!e)return null;function n(r,s){return r>=s?"syllable correct":r>0?"syllable partial":"syllable wrong"}return w`
    <div class="screen report-screen">
      <h2 class="final-pct band-${e.band}">${e.finalPct.toFixed(1)}%</h2>
      <p class="band-message band-${e.band}" role="status">${e.message}</p>

      <p class="score-breakdown">
        Accuracy ${e.accuracyPct.toFixed(1)}%
        ${e.totalExtraPlays>0?w` − ${e.totalExtraPlays} extra play${e.totalExtraPlays===1?"":"s"}`:null}
      </p>

      <ol class="record-list">
        ${e.records.map((r,s)=>w`
            <li key=${s} class="record">
              <p class="record-transcript">
                <strong>${r.sample.transcript.replace(/-/g," ")}</strong>
                <span class="record-meta">
                  you typed "${r.answer||"(nothing)"}" · played ${r.playCount}×
                </span>
              </p>
              <ul class="syllable-results">
                ${r.syllables.map((i,o)=>w`
                    <li key=${o} class=${n(i.earned,i.possible)}>
                      ${i.userSyllable??"—"} → ${i.keySyllable}
                    </li>
                  `)}
              </ul>
            </li>
          `)}
      </ol>

      <button type="button" class="primary" onClick=${()=>t.reset()}>
        Start a new session
      </button>
    </div>
  `}function Ct({vm:t,contrasts:e}){const n=t.phase.value;return w`
    <main class="app">
      <h1>Listening Trainer</h1>
      ${n==="setup"?w`<${mt} vm=${t} contrasts=${e} />`:null}
      ${n==="drilling"?w`<${kt} vm=${t} />`:null}
      ${n==="report"?w`<${xt} vm=${t} />`:null}
    </main>
  `}var Pt=Symbol.for("preact-signals");function ge(){if(U>1)U--;else{var t,e=!1;for((function(){var s=te;for(te=void 0;s!==void 0;){var i=s.S;if(i.v===s.v)for(var o=i.t;o!==void 0;o=o.x)o.i===s.i&&(o.i=i.i);s=s.o}})();j!==void 0;){var n=j;for(j=void 0,ee++;n!==void 0;){var r=n.u;if(n.u=void 0,n.f&=-3,!(8&n.f)&&it(n))try{n.c()}catch(s){e||(t=s,e=!0)}n=r}}if(ee=0,U--,e)throw t}}var q,y=void 0;function le(t){var e=y,n=q;y=void 0,q=void 0;try{return t()}finally{y=e,q=n}}var j=void 0,U=0,ee=0,He=0,te=void 0,ne=0;function nt(t){if(y!==void 0){var e=t.n;if(e===void 0||e.t!==y)return e={i:0,S:t,p:y.s,n:void 0,t:y,e:void 0,x:void 0,r:e},y.s!==void 0&&(y.s.n=e),y.s=e,t.n=e,32&y.f&&t.S(e),e;if(e.i===-1)return e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=y.s,e.n=void 0,y.s.n=e,y.s=e),e}}function $(t,e){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.l=0,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}$.prototype.brand=Pt;$.prototype.h=function(){return!0};$.prototype.S=function(t){var e=this,n=this.t;n!==t&&t.e===void 0&&(t.x=n,this.t=t,n!==void 0?n.e=t:le(function(){var r;(r=e.W)==null||r.call(e)}))};$.prototype.U=function(t){var e=this;if(this.t!==void 0){var n=t.e,r=t.x;n!==void 0&&(n.x=r,t.e=void 0),r!==void 0&&(r.e=n,t.x=void 0),t===this.t&&(this.t=r,r===void 0&&le(function(){var s;(s=e.Z)==null||s.call(e)}))}};$.prototype.subscribe=function(t){var e=this;return Se(function(){var n=e.value;le(function(){return t(n)})},{name:"sub"})};$.prototype.valueOf=function(){return this.value};$.prototype.toString=function(){return this.value+""};$.prototype.toJSON=function(){return this.value};$.prototype.peek=function(){var t=this;return le(function(){return t.value})};Object.defineProperty($.prototype,"value",{get:function(){var t=nt(this);return t!==void 0&&(t.i=this.i),this.v},set:function(t){if(t!==this.v){if(ee>100)throw new Error("Cycle detected");(function(n){U!==0&&ee===0&&n.l!==He&&(n.l=He,te={S:n,v:n.v,i:n.i,o:te})})(this),this.v=t,this.i++,ne++,U++;try{for(var e=this.t;e!==void 0;e=e.x)e.t.N()}finally{ge()}}}});function k(t,e){return new $(t,e)}function it(t){for(var e=t.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function rt(t){for(var e=t.s;e!==void 0;e=e.n){var n=e.S.n;if(n!==void 0&&(e.r=n),e.S.n=e,e.i=-1,e.n===void 0){t.s=e;break}}}function st(t){for(var e=t.s,n=void 0;e!==void 0;){var r=e.p;e.i===-1?(e.S.U(e),r!==void 0&&(r.n=e.n),e.n!==void 0&&(e.n.p=r)):n=e,e.S.n=e.r,e.r!==void 0&&(e.r=void 0),e=r}t.s=n}function A(t,e){$.call(this,void 0,e),this.x=t,this.s=void 0,this.g=ne-1,this.f=4}A.prototype=new $;A.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===ne))return!0;if(this.g=ne,this.f|=1,this.i>0&&!it(this))return this.f&=-2,!0;var t=y;try{rt(this),y=this;var e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(n){this.v=n,this.f|=16,this.i++}return y=t,st(this),this.f&=-2,!0};A.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(var e=this.s;e!==void 0;e=e.n)e.S.S(e)}$.prototype.S.call(this,t)};A.prototype.U=function(t){if(this.t!==void 0&&($.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(var e=this.s;e!==void 0;e=e.n)e.S.U(e)}};A.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var t=this.t;t!==void 0;t=t.x)t.t.N()}};Object.defineProperty(A.prototype,"value",{get:function(){if(1&this.f)throw new Error("Cycle detected");var t=nt(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}});function N(t,e){return new A(t,e)}function ot(t){var e=t.m;if(t.m=void 0,typeof e=="function"){U++;var n=y;y=void 0;try{e()}catch(r){throw t.f&=-2,t.f|=8,$e(t),r}finally{y=n,ge()}}}function $e(t){for(var e=t.s;e!==void 0;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,ot(t)}function Et(t){if(y!==this)throw new Error("Out-of-order effect");st(this),y=t,this.f&=-2,8&this.f&&$e(this),ge()}function F(t,e){this.x=t,this.m=void 0,this.s=void 0,this.u=void 0,this.f=32,this.name=e==null?void 0:e.name,q&&q.push(this)}F.prototype.c=function(){var t=this.S();try{if(8&this.f||this.x===void 0)return;var e=this.x();typeof e=="function"&&(this.m=e)}finally{t()}};F.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,ot(this),rt(this),U++;var t=y;return y=this,Et.bind(this,t)};F.prototype.N=function(){2&this.f||(this.f|=2,this.u=j,j=this)};F.prototype.d=function(){this.f|=8,1&this.f||$e(this)};F.prototype.dispose=function(){this.d()};function Se(t,e){var n=new F(t,e);try{n.c()}catch(s){throw n.d(),s}var r=n.d.bind(n);return r[Symbol.dispose]=r,r}var V;function H(t,e){d[t]=e.bind(null,d[t]||function(){})}function ie(t){if(V){var e=V;V=void 0,e()}V=t&&t.S()}function lt(t){var e=this,n=t.data,r=Mt(n);r.value=n;var s=me(function(){for(var i=e.__v;i=i.__;)if(i.__c){i.__c.__$f|=4;break}return e.__$u.c=function(){var o,a=e.__$u.S(),_=s.value;a(),Re(_)||((o=e.base)==null?void 0:o.nodeType)!==3?(e.__$f|=1,e.setState({})):e.base.data=_},N(function(){var o=r.value.value;return o===0?0:o===!0?"":o||""})},[]);return s.value}lt.displayName="_st";Object.defineProperties($.prototype,{constructor:{configurable:!0,value:void 0},type:{configurable:!0,value:lt},props:{configurable:!0,get:function(){return{data:this}}},__b:{configurable:!0,value:1}});H("__b",function(t,e){if(typeof e.type=="string"){var n,r=e.props;for(var s in r)if(s!=="children"){var i=r[s];i instanceof $&&(n||(e.__np=n={}),n[s]=i,r[s]=i.peek())}}t(e)});H("__r",function(t,e){t(e),ie();var n,r=e.__c;r&&(r.__$f&=-2,(n=r.__$u)===void 0&&(r.__$u=n=(function(s){var i;return Se(function(){i=this}),i.c=function(){r.__$f|=1,r.setState({})},i})())),ie(n)});H("__e",function(t,e,n,r){ie(),t(e,n,r)});H("diffed",function(t,e){ie();var n;if(typeof e.type=="string"&&(n=e.__e)){var r=e.__np,s=e.props;if(r){var i=n.U;if(i)for(var o in i){var a=i[o];a!==void 0&&!(o in r)&&(a.d(),i[o]=void 0)}else n.U=i={};for(var _ in r){var u=i[_],c=r[_];u===void 0?(u=Lt(n,_,c,s),i[_]=u):u.o(c,s)}}}t(e)});function Lt(t,e,n,r){var s=e in t&&t.ownerSVGElement===void 0,i=k(n);return{o:function(o,a){i.value=o,r=a},d:Se(function(){var o=i.value.value;r[e]!==o&&(r[e]=o,s?t[e]=o:o?t.setAttribute(e,o):t.removeAttribute(e))})}}H("unmount",function(t,e){if(typeof e.type=="string"){var n=e.__e;if(n){var r=n.U;if(r){n.U=void 0;for(var s in r){var i=r[s];i&&i.d()}}}}else{var o=e.__c;if(o){var a=o.__$u;a&&(o.__$u=void 0,a.d())}}t(e)});H("__h",function(t,e,n,r){(r<3||r===9)&&(e.__$f|=2),t(e,n,r)});W.prototype.shouldComponentUpdate=function(t,e){if(this.__R)return!0;var n=this.__$u,r=n&&n.s!==void 0;for(var s in e)return!0;if(this.__f||typeof this.u=="boolean"&&this.u===!0){if(!(r||2&this.__$f||4&this.__$f)||1&this.__$f)return!0}else if(!(r||4&this.__$f)||3&this.__$f)return!0;for(var i in t)if(i!=="__source"&&t[i]!==this.props[i])return!0;for(var o in this.props)if(!(o in t))return!0;return!1};function Mt(t){return me(function(){return k(t)},[])}function at(t){const e=t.slice();for(let n=e.length-1;n>0;n--){const r=Math.floor(Math.random()*(n+1));[e[n],e[r]]=[e[r],e[n]]}return e}function ut(t,e,n){return t.filter(r=>!(r.difficulty!==e||n!=="all"&&!r.contrasts.includes(n)))}function Nt(t,e,n,r,s=at){const i=ut(t,e,n);return s(i).slice(0,r)}function Ie(t){const e=t.trim().toLowerCase().replace(/ü/g,"v"),n=e.match(/^([a-z]*)([1-5])?$/);if(!n)return{base:e,tone:null};const[,r,s]=n;return{base:r??"",tone:s?Number(s):null}}function Ut(t){return t.trim().split(/[\s-]+/).filter(e=>e.length>0)}function At(t,e,n){const r=Ut(e);return t.map((s,i)=>{const o=r[i]??null,a=Ie(s),_=o!==null?Ie(o):null,u=_!==null&&_.base===a.base&&a.base.length>0;if(n==="sounds")return{keySyllable:s,userSyllable:o,soundCorrect:u,toneCorrect:null,earned:u?1:0,possible:1};if(a.tone===null)return{keySyllable:s,userSyllable:o,soundCorrect:u,toneCorrect:null,earned:u?1:0,possible:1};const c=_!==null&&_.tone===a.tone,v=(u?.5:0)+(c?.5:0);return{keySyllable:s,userSyllable:o,soundCorrect:u,toneCorrect:c,earned:v,possible:1}})}function Dt(t,e,n,r){const s=At(t.syllables,e,r),i=s.reduce((a,_)=>a+_.earned,0),o=s.reduce((a,_)=>a+_.possible,0);return{sample:t,answer:e,playCount:n,extraPlays:Math.max(n-1,0),syllables:s,earned:i,possible:o}}function Tt(t){return t>90?"green":t>=80?"yellow":"red"}const Ft={red:"Keep trying.",yellow:"Almost there.",green:"You can increase the difficulty."};function Ht(t){const e=t.reduce((a,_)=>a+_.earned,0),n=t.reduce((a,_)=>a+_.possible,0),r=t.reduce((a,_)=>a+_.extraPlays,0),s=n>0?100*e/n:0,i=Math.max(0,s-r),o=Tt(i);return{records:t,totalEarned:e,totalPossible:n,totalExtraPlays:r,accuracyPct:s,finalPct:i,band:o,message:Ft[o]}}class It{constructor(e,n={}){this.mode=k("sounds"),this.difficulty=k("L1"),this.contrast=k("all"),this.count=k(10),this.phase=k("setup"),this.queue=k([]),this.index=k(0),this.records=k([]),this.subPhase=k("answering"),this.input=k(""),this.playCount=k(0),this.speed=k(1),this.currentResult=k(null),this.currentSample=N(()=>this.queue.value[this.index.value]??null),this.progress=N(()=>({position:this.index.value+1,total:this.queue.value.length})),this.canVerify=N(()=>this.subPhase.value==="answering"),this.isLastSample=N(()=>this.index.value===this.queue.value.length-1),this.availableCount=N(()=>ut(this.samples,this.difficulty.value,this.contrast.value).length),this.report=N(()=>this.phase.value==="report"?Ht(this.records.value):null),this.samples=e,this.shuffle=n.shuffle??at}setMode(e){this.phase.value==="setup"&&(this.mode.value=e)}setDifficulty(e){this.phase.value==="setup"&&(this.difficulty.value=e)}setContrast(e){this.phase.value==="setup"&&(this.contrast.value=e)}setCount(e){this.phase.value==="setup"&&(this.count.value=e)}startSession(){if(this.phase.value!=="setup")return;const e=Nt(this.samples,this.difficulty.value,this.contrast.value,this.count.value,this.shuffle);e.length!==0&&(this.queue.value=e,this.index.value=0,this.records.value=[],this.resetCurrentSampleSignals(),this.phase.value="drilling")}play(){this.phase.value==="drilling"&&(this.playCount.value+=1)}setSpeed(e){this.phase.value==="drilling"&&(this.speed.value=e)}updateInput(e){this.subPhase.value==="answering"&&(this.input.value=e)}verify(){if(this.subPhase.value!=="answering")return;const e=this.currentSample.value;if(!e)return;const n=Dt(e,this.input.value,this.playCount.value,this.mode.value);this.records.value=[...this.records.value,n],this.currentResult.value=n.syllables,this.subPhase.value="feedback"}next(){if(this.subPhase.value==="feedback"){if(this.isLastSample.value){this.phase.value="report";return}this.index.value+=1,this.resetCurrentSampleSignals()}}reset(){this.phase.value="setup",this.queue.value=[],this.index.value=0,this.records.value=[],this.resetCurrentSampleSignals()}resetCurrentSampleSignals(){this.subPhase.value="answering",this.input.value="",this.playCount.value=0,this.currentResult.value=null}}const Ot={description:"Syllables ending in a plain -n final (contrast vs ng_final).",match:{endsWith:["n"],notEndsWith:["ng"]}},Rt={description:"Syllables ending in -ng.",match:{endsWith:["ng"]}},Wt={description:"Syllables with a ü/v sound and no nasal final (contrast vs u_n).",match:{endsWith:["v"],notEndsWith:["vn"]}},qt={description:"Syllables ending in -vn (ün).",match:{endsWith:["vn"]}},jt={description:"q- initials (contrast vs x_initial).",match:{startsWith:["q"]}},Bt={description:"x- initials (contrast vs q_initial).",match:{startsWith:["x"]}},Kt={n_final:Ot,ng_final:Rt,u_no_n:Wt,u_n:qt,q_initial:jt,x_initial:Bt};async function Vt(){const t=document.getElementById("app");if(!t)throw new Error("Missing #app root element");const e="./manifest.generated.json",n=await fetch(e);if(!n.ok)throw new Error(`Failed to load ${e}: ${n.status} ${n.statusText}`);const r=await n.json(),s=new It(r.samples);vt(w`<${Ct} vm=${s} contrasts=${Kt} />`,t)}Vt().catch(t=>{console.error(t);const e=document.getElementById("app");e&&(e.textContent=`Failed to start: ${t instanceof Error?t.message:String(t)}`)});
