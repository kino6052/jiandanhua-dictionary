(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();var le,v,qe,je,E,Fe,Be,Ke,fe,J,O,Ge,ge,he,de,Q={},X=[],ht=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,ae=Array.isArray;function F(t,e){for(var n in e)t[n]=e[n];return t}function be(t){t&&t.parentNode&&t.parentNode.removeChild(t)}function Ve(t,e,n){var i,s,r,o={};for(r in e)r=="key"?i=e[r]:r=="ref"?s=e[r]:o[r]=e[r];if(arguments.length>2&&(o.children=arguments.length>3?le.call(arguments,2):n),typeof t=="function"&&t.defaultProps!=null)for(r in t.defaultProps)o[r]===void 0&&(o[r]=t.defaultProps[r]);return Y(t,o,i,s,null)}function Y(t,e,n,i,s){var r={type:t,props:e,key:n,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:s??++qe,__i:-1,__u:0};return s==null&&v.vnode!=null&&v.vnode(r),r}function ue(t){return t.children}function R(t,e){this.props=t,this.context=e}function D(t,e){if(e==null)return t.__?D(t.__,t.__i+1):null;for(var n;e<t.__k.length;e++)if((n=t.__k[e])!=null&&n.__e!=null)return n.__e;return typeof t.type=="function"?D(t):null}function dt(t){if(t.__P&&t.__d){var e=t.__v,n=e.__e,i=[],s=[],r=F({},e);r.__v=e.__v+1,v.vnode&&v.vnode(r),me(t.__P,r,e,t.__n,t.__P.namespaceURI,32&e.__u?[n]:null,i,n??D(e),!!(32&e.__u),s),r.__v=e.__v,r.__.__k[r.__i]=r,Qe(i,r,s),e.__e=e.__=null,r.__e!=n&&ze(r)}}function ze(t){if((t=t.__)!=null&&t.__c!=null)return t.__e=t.__c.base=null,t.__k.some(function(e){if(e!=null&&e.__e!=null)return t.__e=t.__c.base=e.__e}),ze(t)}function Ee(t){(!t.__d&&(t.__d=!0)&&E.push(t)&&!ee.__r++||Fe!=v.debounceRendering)&&((Fe=v.debounceRendering)||Be)(ee)}function ee(){try{for(var t,e=1;E.length;)E.length>e&&E.sort(Ke),t=E.shift(),e=E.length,dt(t)}finally{E.length=ee.__r=0}}function Je(t,e,n,i,s,r,o,a,u,_,c){var h,l,f,g,x,p,b,d=i&&i.__k||X,C=e.length;for(u=vt(n,e,d,u,C),h=0;h<C;h++)(f=n.__k[h])!=null&&(l=f.__i!=-1&&d[f.__i]||Q,f.__i=h,p=me(t,f,l,s,r,o,a,u,_,c),g=f.__e,f.ref&&l.ref!=f.ref&&(l.ref&&$e(l.ref,null,f),c.push(f.ref,f.__c||g,f)),x==null&&g!=null&&(x=g),(b=!!(4&f.__u))||l.__k===f.__k?(u=Ye(f,u,t,b),b&&l.__e&&(l.__e=null)):typeof f.type=="function"&&p!==void 0?u=p:g&&(u=g.nextSibling),f.__u&=-7);return n.__e=x,u}function vt(t,e,n,i,s){var r,o,a,u,_,c=n.length,h=c,l=0;for(t.__k=new Array(s),r=0;r<s;r++)(o=e[r])!=null&&typeof o!="boolean"&&typeof o!="function"?(typeof o=="string"||typeof o=="number"||typeof o=="bigint"||o.constructor==String?o=t.__k[r]=Y(null,o,null,null,null):ae(o)?o=t.__k[r]=Y(ue,{children:o},null,null,null):o.constructor===void 0&&o.__b>0?o=t.__k[r]=Y(o.type,o.props,o.key,o.ref?o.ref:null,o.__v):t.__k[r]=o,u=r+l,o.__=t,o.__b=t.__b+1,a=null,(_=o.__i=yt(o,n,u,h))!=-1&&(h--,(a=n[_])&&(a.__u|=2)),a==null||a.__v==null?(_==-1&&(s>c?l--:s<c&&l++),typeof o.type!="function"&&(o.__u|=4)):_!=u&&(_==u-1?l--:_==u+1?l++:(_>u?l--:l++,o.__u|=4))):t.__k[r]=null;if(h)for(r=0;r<c;r++)(a=n[r])!=null&&(2&a.__u)==0&&(a.__e==i&&(i=D(a)),et(a,a));return i}function Ye(t,e,n,i){var s,r;if(typeof t.type=="function"){for(s=t.__k,r=0;s&&r<s.length;r++)s[r]&&(s[r].__=t,e=Ye(s[r],e,n,i));return e}t.__e!=e&&(i&&(e&&t.type&&!e.parentNode&&(e=D(t)),n.insertBefore(t.__e,e||null)),e=t.__e);do e=e&&e.nextSibling;while(e!=null&&e.nodeType==8);return e}function yt(t,e,n,i){var s,r,o,a=t.key,u=t.type,_=e[n],c=_!=null&&(2&_.__u)==0;if(_===null&&a==null||c&&a==_.key&&u==_.type)return n;if(i>(c?1:0)){for(s=n-1,r=n+1;s>=0||r<e.length;)if((_=e[o=s>=0?s--:r++])!=null&&(2&_.__u)==0&&a==_.key&&u==_.type)return o}return-1}function Ne(t,e,n){e[0]=="-"?t.setProperty(e,n??""):t[e]=n==null?"":typeof n!="number"||ht.test(e)?n:n+"px"}function V(t,e,n,i,s){var r,o;e:if(e=="style")if(typeof n=="string")t.style.cssText=n;else{if(typeof i=="string"&&(t.style.cssText=i=""),i)for(e in i)n&&e in n||Ne(t.style,e,"");if(n)for(e in n)i&&n[e]==i[e]||Ne(t.style,e,n[e])}else if(e[0]=="o"&&e[1]=="n")r=e!=(e=e.replace(Ge,"$1")),o=e.toLowerCase(),e=o in t||e=="onFocusOut"||e=="onFocusIn"?o.slice(2):e.slice(2),t.l||(t.l={}),t.l[e+r]=n,n?i?n[O]=i[O]:(n[O]=ge,t.addEventListener(e,r?de:he,r)):t.removeEventListener(e,r?de:he,r);else{if(s=="http://www.w3.org/2000/svg")e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!="width"&&e!="height"&&e!="href"&&e!="list"&&e!="form"&&e!="tabIndex"&&e!="download"&&e!="rowSpan"&&e!="colSpan"&&e!="role"&&e!="popover"&&e in t)try{t[e]=n??"";break e}catch{}typeof n=="function"||(n==null||n===!1&&e[4]!="-"?t.removeAttribute(e):t.setAttribute(e,e=="popover"&&n==1?"":n))}}function Le(t){return function(e){if(this.l){var n=this.l[e.type+t];if(e[J]==null)e[J]=ge++;else if(e[J]<n[O])return;return n(v.event?v.event(e):e)}}}function me(t,e,n,i,s,r,o,a,u,_){var c,h,l,f,g,x,p,b,d,C,I,N,W,Pe,G,ce,P=e.type;if(e.constructor!==void 0)return null;128&n.__u&&(u=!!(32&n.__u),r=[a=e.__e=n.__e]),(c=v.__b)&&c(e);e:if(typeof P=="function"){h=o.length;try{if(d=e.props,C=P.prototype&&P.prototype.render,I=(c=P.contextType)&&i[c.__c],N=c?I?I.props.value:c.__:i,n.__c?b=(l=e.__c=n.__c).__=l.__E:(C?e.__c=l=new P(d,N):(e.__c=l=new R(d,N),l.constructor=P,l.render=bt),I&&I.sub(l),l.state||(l.state={}),l.__n=i,f=l.__d=!0,l.__h=[],l._sb=[]),C&&l.__s==null&&(l.__s=l.state),C&&P.getDerivedStateFromProps!=null&&(l.__s==l.state&&(l.__s=F({},l.__s)),F(l.__s,P.getDerivedStateFromProps(d,l.__s))),g=l.props,x=l.state,l.__v=e,f)C&&P.getDerivedStateFromProps==null&&l.componentWillMount!=null&&l.componentWillMount(),C&&l.componentDidMount!=null&&l.__h.push(l.componentDidMount);else{if(C&&P.getDerivedStateFromProps==null&&d!==g&&l.componentWillReceiveProps!=null&&l.componentWillReceiveProps(d,N),e.__v==n.__v||!l.__e&&l.shouldComponentUpdate!=null&&l.shouldComponentUpdate(d,l.__s,N)===!1){e.__v!=n.__v&&(l.props=d,l.state=l.__s,l.__d=!1),e.__e=n.__e,e.__k=n.__k,e.__k.some(function(M){M&&(M.__=e)}),X.push.apply(l.__h,l._sb),l._sb=[],l.__h.length&&o.push(l);break e}l.componentWillUpdate!=null&&l.componentWillUpdate(d,l.__s,N),C&&l.componentDidUpdate!=null&&l.__h.push(function(){l.componentDidUpdate(g,x,p)})}if(l.context=N,l.props=d,l.__P=t,l.__e=!1,W=v.__r,Pe=0,C)l.state=l.__s,l.__d=!1,W&&W(e),c=l.render(l.props,l.state,l.context),X.push.apply(l.__h,l._sb),l._sb=[];else do l.__d=!1,W&&W(e),c=l.render(l.props,l.state,l.context),l.state=l.__s;while(l.__d&&++Pe<25);l.state=l.__s,l.getChildContext!=null&&(i=F(F({},i),l.getChildContext())),C&&!f&&l.getSnapshotBeforeUpdate!=null&&(p=l.getSnapshotBeforeUpdate(g,x)),G=c!=null&&c.type===ue&&c.key==null?Xe(c.props.children):c,a=Je(t,ae(G)?G:[G],e,n,i,s,r,o,a,u,_),l.base=e.__e,e.__u&=-161,l.__h.length&&o.push(l),b&&(l.__E=l.__=null)}catch(M){if(o.length=h,e.__v=null,u||r!=null){if(M.then){for(e.__u|=u?160:128;a&&a.nodeType==8&&a.nextSibling;)a=a.nextSibling;r!=null&&(r[r.indexOf(a)]=null),e.__e=a}else if(r!=null)for(ce=r.length;ce--;)be(r[ce])}else e.__e=n.__e;e.__k==null&&(e.__k=n.__k||[]),M.then||Ze(e),v.__e(M,e,n)}}else r==null&&e.__v==n.__v?(e.__k=n.__k,e.__e=n.__e):a=e.__e=gt(n.__e,e,n,i,s,r,o,u,_);return(c=v.diffed)&&c(e),128&e.__u?void 0:a}function Ze(t){t&&(t.__c&&(t.__c.__e=!0),t.__k&&t.__k.some(Ze))}function Qe(t,e,n){for(var i=0;i<n.length;i++)$e(n[i],n[++i],n[++i]);v.__c&&v.__c(e,t),t.some(function(s){try{t=s.__h,s.__h=[],t.some(function(r){r.call(s)})}catch(r){v.__e(r,s.__v)}})}function Xe(t){return typeof t!="object"||t==null||t.__b>0?t:ae(t)?t.map(Xe):t.constructor!==void 0?null:F({},t)}function gt(t,e,n,i,s,r,o,a,u){var _,c,h,l,f,g,x,p=n.props||Q,b=e.props,d=e.type;if(d=="svg"?s="http://www.w3.org/2000/svg":d=="math"?s="http://www.w3.org/1998/Math/MathML":s||(s="http://www.w3.org/1999/xhtml"),r!=null){for(_=0;_<r.length;_++)if((f=r[_])&&"setAttribute"in f==!!d&&(d?f.localName==d:f.nodeType==3)){t=f,r[_]=null;break}}if(t==null){if(d==null)return document.createTextNode(b);t=document.createElementNS(s,d,b.is&&b),a&&(v.__m&&v.__m(e,r),a=!1),r=null}if(d==null)p===b||a&&t.data==b||(t.data=b);else{if(r=d=="textarea"&&b.defaultValue!=null?null:r&&le.call(t.childNodes),!a&&r!=null)for(p={},_=0;_<t.attributes.length;_++)p[(f=t.attributes[_]).name]=f.value;for(_ in p)f=p[_],_=="dangerouslySetInnerHTML"?h=f:_=="children"||_ in b||_=="value"&&"defaultValue"in b||_=="checked"&&"defaultChecked"in b||V(t,_,null,f,s);for(_ in b)f=b[_],_=="children"?l=f:_=="dangerouslySetInnerHTML"?c=f:_=="value"?g=f:_=="checked"?x=f:a&&typeof f!="function"||p[_]===f||V(t,_,f,p[_],s);if(c)a||h&&(c.__html==h.__html||c.__html==t.innerHTML)||(t.innerHTML=c.__html),e.__k=[];else if(h&&(t.innerHTML=""),Je(e.type=="template"?t.content:t,ae(l)?l:[l],e,n,i,d=="foreignObject"?"http://www.w3.org/1999/xhtml":s,r,o,r?r[0]:n.__k&&D(n,0),a,u),r!=null)for(_=r.length;_--;)be(r[_]);a&&d!="textarea"||(_="value",d=="progress"&&g==null?t.removeAttribute("value"):g!=null&&(g!==t[_]||d=="progress"&&!g||d=="option"&&g!=p[_])&&V(t,_,g,p[_],s),_="checked",x!=null&&x!=t[_]&&V(t,_,x,p[_],s))}return t}function $e(t,e,n){try{if(typeof t=="function"){var i=typeof t.__u=="function";i&&t.__u(),i&&e==null||(t.__u=t(e))}else t.current=e}catch(s){v.__e(s,n)}}function et(t,e,n){var i,s;if(v.unmount&&v.unmount(t),(i=t.ref)&&(i.current&&i.current!=t.__e||$e(i,null,e)),(i=t.__c)!=null){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(r){v.__e(r,e)}i.base=i.__P=i.__n=null}if(i=t.__k)for(s=0;s<i.length;s++)i[s]&&et(i[s],e,n||typeof t.type!="function");n||be(t.__e),t.__c=t.__=t.__e=void 0}function bt(t,e,n){return this.constructor(t,n)}function mt(t,e,n){var i,s,r,o;e==document&&(e=document.documentElement),v.__&&v.__(t,e),s=(i=!1)?null:e.__k,r=[],o=[],me(e,t=e.__k=Ve(ue,null,[t]),s||Q,Q,e.namespaceURI,s?null:e.firstChild?le.call(e.childNodes):null,r,s?s.__e:e.firstChild,i,o),Qe(r,t,o),t.props.children=null}le=X.slice,v={__e:function(t,e,n,i){for(var s,r,o;e=e.__;)if((s=e.__c)&&!s.__)try{if((r=s.constructor)&&r.getDerivedStateFromError!=null&&(s.setState(r.getDerivedStateFromError(t)),o=s.__d),s.componentDidCatch!=null&&(s.componentDidCatch(t,i||{}),o=s.__d),o)return s.__E=s}catch(a){t=a}throw t}},qe=0,je=function(t){return t!=null&&t.constructor===void 0},R.prototype.setState=function(t,e){var n;n=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=F({},this.state),typeof t=="function"&&(t=t(F({},n),this.props)),t&&F(n,t),t!=null&&this.__v&&(e&&this._sb.push(e),Ee(this))},R.prototype.forceUpdate=function(t){this.__v&&(this.__e=!0,t&&this.__h.push(t),Ee(this))},R.prototype.render=ue,E=[],Be=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Ke=function(t,e){return t.__v.__b-e.__v.__b},ee.__r=0,fe=Math.random().toString(8),J="__d"+fe,O="__a"+fe,Ge=/(PointerCapture)$|Capture$/i,ge=0,he=Le(!1),de=Le(!0);var tt=function(t,e,n,i){var s;e[0]=0;for(var r=1;r<e.length;r++){var o=e[r++],a=e[r]?(e[0]|=o?1:2,n[e[r++]]):e[++r];o===3?i[0]=a:o===4?i[1]=Object.assign(i[1]||{},a):o===5?(i[1]=i[1]||{})[e[++r]]=a:o===6?i[1][e[++r]]+=a+"":o?(s=t.apply(a,tt(t,a,n,["",null])),i.push(s),a[0]?e[0]|=2:(e[r-2]=0,e[r]=s)):i.push(a)}return i},Ue=new Map;function $t(t){var e=Ue.get(this);return e||(e=new Map,Ue.set(this,e)),(e=tt(this,e.get(t)||(e.set(t,e=(function(n){for(var i,s,r=1,o="",a="",u=[0],_=function(l){r===1&&(l||(o=o.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?u.push(0,l,o):r===3&&(l||o)?(u.push(3,l,o),r=2):r===2&&o==="..."&&l?u.push(4,l,0):r===2&&o&&!l?u.push(5,0,!0,o):r>=5&&((o||!l&&r===5)&&(u.push(r,0,o,s),r=6),l&&(u.push(r,l,0,s),r=6)),o=""},c=0;c<n.length;c++){c&&(r===1&&_(),_(c));for(var h=0;h<n[c].length;h++)i=n[c][h],r===1?i==="<"?(_(),u=[u],r=3):o+=i:r===4?o==="--"&&i===">"?(r=1,o=""):o=i+o[0]:a?i===a?a="":o+=i:i==='"'||i==="'"?a=i:i===">"?(_(),r=1):r&&(i==="="?(r=5,s=o,o=""):i==="/"&&(r<5||n[c][h+1]===">")?(_(),r===3&&(u=u[0]),r=u,(u=u[0]).push(2,0,r),r=0):i===" "||i==="	"||i===`
`||i==="\r"?(_(),r=2):o+=i),r===3&&o==="!--"&&(r=4,u=u[0])}return _(),u})(t)),e),arguments,[])).length>1?e:e[0]}const $=$t.bind(Ve);var B,m,pe,Ae,te=0,nt=[],S=v,Me=S.__b,De=S.__r,Te=S.diffed,He=S.__c,Ie=S.unmount,We=S.__;function Se(t,e){S.__h&&S.__h(m,t,te||e),te=0;var n=m.__H||(m.__H={__:[],__h:[]});return t>=n.__.length&&n.__.push({}),n.__[t]}function St(t){return te=1,wt(rt,t)}function wt(t,e,n){var i=Se(B++,2);if(i.t=t,!i.__c&&(i.__=[rt(void 0,e),function(a){var u=i.__N?i.__N[0]:i.__[0],_=i.t(u,a);u!==_&&(i.__N=[_,i.__[1]],i.__c.setState({}))}],i.__c=m,!m.__f)){var s=function(a,u,_){if(!i.__c.__H)return!0;var c=!1,h=i.__c.props!==a;if(i.__c.__H.__.some(function(f){if(f.__N){c=!0;var g=f.__[0];f.__=f.__N,f.__N=void 0,g!==f.__[0]&&(h=!0)}}),r){var l=r.call(this,a,u,_);return c?l||h:l}return!c||h};m.__f=!0;var r=m.shouldComponentUpdate,o=m.componentWillUpdate;m.componentWillUpdate=function(a,u,_){if(this.__e){var c=r;r=void 0,s(a,u,_),r=c}o&&o.call(this,a,u,_)},m.shouldComponentUpdate=s}return i.__N||i.__}function kt(t,e){var n=Se(B++,3);!S.__s&&it(n.__H,e)&&(n.__=t,n.u=e,m.__H.__h.push(n))}function xt(t){return te=5,we(function(){return{current:t}},[])}function we(t,e){var n=Se(B++,7);return it(n.__H,e)&&(n.__=t(),n.__H=e,n.__h=t),n.__}function Ct(){for(var t;t=nt.shift();){var e=t.__H;if(t.__P&&e)try{e.__h.some(Z),e.__h.some(ve),e.__h=[]}catch(n){e.__h=[],S.__e(n,t.__v)}}}S.__b=function(t){m=null,Me&&Me(t)},S.__=function(t,e){t&&e.__k&&e.__k.__m&&(t.__m=e.__k.__m),We&&We(t,e)},S.__r=function(t){De&&De(t),B=0;var e=(m=t.__c).__H;e&&(pe===m?(e.__h=[],m.__h=[],e.__.some(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})):(e.__h.some(Z),e.__h.some(ve),e.__h=[],B=0)),pe=m},S.diffed=function(t){Te&&Te(t);var e=t.__c;e&&e.__H&&(e.__H.__h.length&&(nt.push(e)!==1&&Ae===S.requestAnimationFrame||((Ae=S.requestAnimationFrame)||Pt)(Ct)),e.__H.__.some(function(n){n.u&&(n.__H=n.u,n.u=void 0)})),pe=m=null},S.__c=function(t,e){e.some(function(n){try{n.__h.some(Z),n.__h=n.__h.filter(function(i){return!i.__||ve(i)})}catch(i){e.some(function(s){s.__h&&(s.__h=[])}),e=[],S.__e(i,n.__v)}}),He&&He(t,e)},S.unmount=function(t){Ie&&Ie(t);var e,n=t.__c;n&&n.__H&&(n.__H.__.some(function(i){try{Z(i)}catch(s){e=s}}),n.__H=void 0,e&&S.__e(e,n.__v))};var Oe=typeof requestAnimationFrame=="function";function Pt(t){var e,n=function(){clearTimeout(i),Oe&&cancelAnimationFrame(e),setTimeout(t)},i=setTimeout(n,35);Oe&&(e=requestAnimationFrame(n))}function Z(t){var e=m,n=t.__c;typeof n=="function"&&(t.__c=void 0,n()),m=e}function ve(t){var e=m;t.__c=t.__(),m=e}function it(t,e){return!t||t.length!==e.length||e.some(function(n,i){return n!==t[i]})}function rt(t,e){return typeof e=="function"?e(t):e}var Ft=Symbol.for("preact-signals");function ke(){if(U>1)U--;else{var t,e=!1;for((function(){var s=ie;for(ie=void 0;s!==void 0;){var r=s.S;if(r.v===s.v)for(var o=r.t;o!==void 0;o=o.x)o.i===s.i&&(o.i=r.i);s=s.o}})();j!==void 0;){var n=j;for(j=void 0,ne++;n!==void 0;){var i=n.u;if(n.u=void 0,n.f&=-3,!(8&n.f)&&ot(n))try{n.c()}catch(s){e||(t=s,e=!0)}n=i}}if(ne=0,U--,e)throw t}}var q,y=void 0;function _e(t){var e=y,n=q;y=void 0,q=void 0;try{return t()}finally{y=e,q=n}}var j=void 0,U=0,ne=0,Re=0,ie=void 0,re=0;function st(t){if(y!==void 0){var e=t.n;if(e===void 0||e.t!==y)return e={i:0,S:t,p:y.s,n:void 0,t:y,e:void 0,x:void 0,r:e},y.s!==void 0&&(y.s.n=e),y.s=e,t.n=e,32&y.f&&t.S(e),e;if(e.i===-1)return e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=y.s,e.n=void 0,y.s.n=e,y.s=e),e}}function k(t,e){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.l=0,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}k.prototype.brand=Ft;k.prototype.h=function(){return!0};k.prototype.S=function(t){var e=this,n=this.t;n!==t&&t.e===void 0&&(t.x=n,this.t=t,n!==void 0?n.e=t:_e(function(){var i;(i=e.W)==null||i.call(e)}))};k.prototype.U=function(t){var e=this;if(this.t!==void 0){var n=t.e,i=t.x;n!==void 0&&(n.x=i,t.e=void 0),i!==void 0&&(i.e=n,t.x=void 0),t===this.t&&(this.t=i,i===void 0&&_e(function(){var s;(s=e.Z)==null||s.call(e)}))}};k.prototype.subscribe=function(t){var e=this;return Ce(function(){var n=e.value;_e(function(){return t(n)})},{name:"sub"})};k.prototype.valueOf=function(){return this.value};k.prototype.toString=function(){return this.value+""};k.prototype.toJSON=function(){return this.value};k.prototype.peek=function(){var t=this;return _e(function(){return t.value})};Object.defineProperty(k.prototype,"value",{get:function(){var t=st(this);return t!==void 0&&(t.i=this.i),this.v},set:function(t){if(t!==this.v){if(ne>100)throw new Error("Cycle detected");(function(n){U!==0&&ne===0&&n.l!==Re&&(n.l=Re,ie={S:n,v:n.v,i:n.i,o:ie})})(this),this.v=t,this.i++,re++,U++;try{for(var e=this.t;e!==void 0;e=e.x)e.t.N()}finally{ke()}}}});function w(t,e){return new k(t,e)}function ot(t){for(var e=t.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function lt(t){for(var e=t.s;e!==void 0;e=e.n){var n=e.S.n;if(n!==void 0&&(e.r=n),e.S.n=e,e.i=-1,e.n===void 0){t.s=e;break}}}function at(t){for(var e=t.s,n=void 0;e!==void 0;){var i=e.p;e.i===-1?(e.S.U(e),i!==void 0&&(i.n=e.n),e.n!==void 0&&(e.n.p=i)):n=e,e.S.n=e.r,e.r!==void 0&&(e.r=void 0),e=i}t.s=n}function A(t,e){k.call(this,void 0,e),this.x=t,this.s=void 0,this.g=re-1,this.f=4}A.prototype=new k;A.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===re))return!0;if(this.g=re,this.f|=1,this.i>0&&!ot(this))return this.f&=-2,!0;var t=y;try{lt(this),y=this;var e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(n){this.v=n,this.f|=16,this.i++}return y=t,at(this),this.f&=-2,!0};A.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(var e=this.s;e!==void 0;e=e.n)e.S.S(e)}k.prototype.S.call(this,t)};A.prototype.U=function(t){if(this.t!==void 0&&(k.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(var e=this.s;e!==void 0;e=e.n)e.S.U(e)}};A.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var t=this.t;t!==void 0;t=t.x)t.t.N()}};Object.defineProperty(A.prototype,"value",{get:function(){if(1&this.f)throw new Error("Cycle detected");var t=st(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}});function L(t,e){return new A(t,e)}function ut(t){var e=t.m;if(t.m=void 0,typeof e=="function"){U++;var n=y;y=void 0;try{e()}catch(i){throw t.f&=-2,t.f|=8,xe(t),i}finally{y=n,ke()}}}function xe(t){for(var e=t.s;e!==void 0;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,ut(t)}function Et(t){if(y!==this)throw new Error("Out-of-order effect");at(this),y=t,this.f&=-2,8&this.f&&xe(this),ke()}function T(t,e){this.x=t,this.m=void 0,this.s=void 0,this.u=void 0,this.f=32,this.name=e==null?void 0:e.name,q&&q.push(this)}T.prototype.c=function(){var t=this.S();try{if(8&this.f||this.x===void 0)return;var e=this.x();typeof e=="function"&&(this.m=e)}finally{t()}};T.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,ut(this),lt(this),U++;var t=y;return y=this,Et.bind(this,t)};T.prototype.N=function(){2&this.f||(this.f|=2,this.u=j,j=this)};T.prototype.d=function(){this.f|=8,1&this.f||xe(this)};T.prototype.dispose=function(){this.d()};function Ce(t,e){var n=new T(t,e);try{n.c()}catch(s){throw n.d(),s}var i=n.d.bind(n);return i[Symbol.dispose]=i,i}var z;function H(t,e){v[t]=e.bind(null,v[t]||function(){})}function se(t){if(z){var e=z;z=void 0,e()}z=t&&t.S()}function _t(t){var e=this,n=t.data,i=Lt(n);i.value=n;var s=we(function(){for(var r=e.__v;r=r.__;)if(r.__c){r.__c.__$f|=4;break}return e.__$u.c=function(){var o,a=e.__$u.S(),u=s.value;a(),je(u)||((o=e.base)==null?void 0:o.nodeType)!==3?(e.__$f|=1,e.setState({})):e.base.data=u},L(function(){var o=i.value.value;return o===0?0:o===!0?"":o||""})},[]);return s.value}_t.displayName="_st";Object.defineProperties(k.prototype,{constructor:{configurable:!0,value:void 0},type:{configurable:!0,value:_t},props:{configurable:!0,get:function(){return{data:this}}},__b:{configurable:!0,value:1}});H("__b",function(t,e){if(typeof e.type=="string"){var n,i=e.props;for(var s in i)if(s!=="children"){var r=i[s];r instanceof k&&(n||(e.__np=n={}),n[s]=r,i[s]=r.peek())}}t(e)});H("__r",function(t,e){t(e),se();var n,i=e.__c;i&&(i.__$f&=-2,(n=i.__$u)===void 0&&(i.__$u=n=(function(s){var r;return Ce(function(){r=this}),r.c=function(){i.__$f|=1,i.setState({})},r})())),se(n)});H("__e",function(t,e,n,i){se(),t(e,n,i)});H("diffed",function(t,e){se();var n;if(typeof e.type=="string"&&(n=e.__e)){var i=e.__np,s=e.props;if(i){var r=n.U;if(r)for(var o in r){var a=r[o];a!==void 0&&!(o in i)&&(a.d(),r[o]=void 0)}else n.U=r={};for(var u in i){var _=r[u],c=i[u];_===void 0?(_=Nt(n,u,c,s),r[u]=_):_.o(c,s)}}}t(e)});function Nt(t,e,n,i){var s=e in t&&t.ownerSVGElement===void 0,r=w(n);return{o:function(o,a){r.value=o,i=a},d:Ce(function(){var o=r.value.value;i[e]!==o&&(i[e]=o,s?t[e]=o:o?t.setAttribute(e,o):t.removeAttribute(e))})}}H("unmount",function(t,e){if(typeof e.type=="string"){var n=e.__e;if(n){var i=n.U;if(i){n.U=void 0;for(var s in i){var r=i[s];r&&r.d()}}}}else{var o=e.__c;if(o){var a=o.__$u;a&&(o.__$u=void 0,a.d())}}t(e)});H("__h",function(t,e,n,i){(i<3||i===9)&&(e.__$f|=2),t(e,n,i)});R.prototype.shouldComponentUpdate=function(t,e){if(this.__R)return!0;var n=this.__$u,i=n&&n.s!==void 0;for(var s in e)return!0;if(this.__f||typeof this.u=="boolean"&&this.u===!0){if(!(i||2&this.__$f||4&this.__$f)||1&this.__$f)return!0}else if(!(i||4&this.__$f)||3&this.__$f)return!0;for(var r in t)if(r!=="__source"&&t[r]!==this.props[r])return!0;for(var o in this.props)if(!(o in t))return!0;return!1};function Lt(t){return we(function(){return w(t)},[])}const ct="listening-app:flagged-files";function Ut(){const t=new Map;return{getItem:e=>t.get(e)??null,setItem:(e,n)=>{t.set(e,n)}}}function At(){try{if(typeof localStorage<"u")return localStorage}catch{}return Ut()}function Mt(t){try{const e=t.getItem(ct),n=e?JSON.parse(e):[];return new Set(Array.isArray(n)?n:[])}catch{return new Set}}function Dt(t=At()){const e=w(Mt(t));function n(a){e.value=a,t.setItem(ct,JSON.stringify([...a]))}function i(a){return e.value.has(a)}function s(a){const u=new Set(e.value);u.has(a)?u.delete(a):u.add(a),n(u)}function r(a){if(!e.value.has(a))return;const u=new Set(e.value);u.delete(a),n(u)}function o(){n(new Set)}return{flaggedFiles:e,isFlagged:i,toggleFlag:s,unflag:r,clearAll:o}}const K=Dt(),Tt=[{value:"L1",label:"L1 — up to 4 syllables"},{value:"L2",label:"L2 — 5–6 syllables"},{value:"L3",label:"L3 — 7–9 syllables"},{value:"L4",label:"L4 — 10–15 syllables"}];function Ht({vm:t,contrasts:e}){const n=t.mode.value,i=t.granularity.value,s=t.difficulty.value,r=t.contrast.value,o=t.count.value,a=t.availableCount.value;return $`
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

      <fieldset class="field">
        <legend>Answer by</legend>
        <label class="radio-row">
          <input
            type="radio"
            name="granularity"
            checked=${i==="syllable"}
            onChange=${()=>t.setGranularity("syllable")}
          />
          Syllable (type each syllable)
        </label>
        <label class="radio-row">
          <input
            type="radio"
            name="granularity"
            checked=${i==="word"}
            onChange=${()=>t.setGranularity("word")}
          />
          Word (type each word, comma-separated)
        </label>
      </fieldset>

      <label class="field">
        <span>Difficulty</span>
        <select
          value=${s}
          onChange=${u=>t.setDifficulty(u.target.value)}
        >
          ${Tt.map(u=>$`<option value=${u.value}>${u.label}</option>`)}
        </select>
      </label>

      <label class="field">
        <span>Focus</span>
        <select
          value=${r}
          onChange=${u=>t.setContrast(u.target.value)}
        >
          <option value="all">All sounds</option>
          ${Object.entries(e).map(([u,_])=>$`<option value=${u}>${u} — ${_.description}</option>`)}
        </select>
      </label>

      <label class="field">
        <span>Samples per session</span>
        <input
          type="number"
          min="1"
          value=${o}
          onInput=${u=>t.setCount(Number(u.target.value))}
        />
      </label>

      <p class="hint" aria-live="polite">
        ${a} sample${a===1?"":"s"} available with this filter.
      </p>

      <button
        type="button"
        class="primary"
        disabled=${a===0}
        onClick=${()=>t.startSession()}
      >
        Start session
      </button>
    </div>
  `}function It({vm:t}){const e=xt(null),n=t.currentSample.value,i=t.playCount.value,s=t.speed.value,r=t.subPhase.value,o=t.input.value,a=t.progress.value,u=t.currentResult.value,_=t.isLastSample.value,c=t.granularity.value,h=n?K.isFlagged(n.fileName):!1;if(kt(()=>{e.current&&(e.current.playbackRate=s)},[s]),!n)return null;function l(){t.play();const p=e.current;p&&(p.currentTime=0,p.playbackRate=t.speed.value,p.play())}function f(p){p.key==="Enter"&&(p.preventDefault(),t.verify())}function g(p){p.key==="Enter"&&(p.preventDefault(),t.next())}function x(p,b){return p>=b?"syllable correct":p>0?"syllable partial":"syllable wrong"}return $`
    <div class="screen drill-screen" onKeyDown=${r==="feedback"?g:void 0}>
      <p class="progress">Sample ${a.position} of ${a.total}</p>

      <div class="file-row">
        <span class="file-name">${n.fileName}</span>
        <button
          type="button"
          class=${h?"flag-btn flag-btn-active":"flag-btn"}
          onClick=${()=>K.toggleFlag(n.fileName)}
          aria-pressed=${h}
        >
          🚩 ${h?"Flagged":"Flag as bad"}
        </button>
      </div>

      <audio ref=${e} src=${n.file} preload="auto"></audio>

      <div class="playback-controls">
        <button type="button" class="primary" onClick=${l}>
          ▶ Play${i>0?` (${i}×)`:""}
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

      ${r==="answering"?$`
            <div class="answer-area">
              <label for="pinyin-input">
                ${c==="word"?"Type the words you heard, comma-separated (any order is fine)":"Type what you heard (pinyin)"}
              </label>
              <input
                id="pinyin-input"
                type="text"
                autofocus
                autocomplete="off"
                autocapitalize="off"
                spellcheck=${!1}
                placeholder=${c==="word"?"e.g. ni3 hao3, ma5":void 0}
                value=${o}
                onInput=${p=>t.updateInput(p.target.value)}
                onKeyDown=${f}
              />
              <button type="button" class="primary" onClick=${()=>t.verify()}>Verify</button>
            </div>
          `:null}

      ${r==="feedback"&&u?$`
            <div class="feedback-area" role="status" aria-live="polite">
              <p>
                Correct: <strong>${n.transcript.replace(/-/g," ")}</strong>
              </p>
              <ul class="syllable-results">
                ${u.map((p,b)=>$`
                    <li key=${b} class=${x(p.earned,p.possible)}>
                      ${p.userSyllable??"—"} → ${p.keySyllable}
                    </li>
                  `)}
              </ul>
              <p class="plays-note">Played ${i} time${i===1?"":"s"}</p>
              <button type="button" class="primary" onClick=${()=>t.next()}>
                ${_?"Finish session":"Next"}
              </button>
            </div>
          `:null}
    </div>
  `}function Wt({vm:t}){const e=t.report.value;if(!e)return null;function n(i,s){return i>=s?"syllable correct":i>0?"syllable partial":"syllable wrong"}return $`
    <div class="screen report-screen">
      <h2 class="final-pct band-${e.band}">${e.finalPct.toFixed(1)}%</h2>
      <p class="band-message band-${e.band}" role="status">${e.message}</p>

      <p class="score-breakdown">
        Accuracy ${e.accuracyPct.toFixed(1)}%
        ${e.totalExtraPlays>0?$` − ${e.totalExtraPlays} extra play${e.totalExtraPlays===1?"":"s"}`:null}
      </p>

      <ol class="record-list">
        ${e.records.map((i,s)=>$`
            <li key=${s} class="record">
              <p class="record-transcript">
                <strong>${i.sample.transcript.replace(/-/g," ")}</strong>
                <span class="record-meta">
                  you typed "${i.answer||"(nothing)"}" · played ${i.playCount}×
                </span>
              </p>
              <ul class="syllable-results">
                ${i.syllables.map((r,o)=>$`
                    <li key=${o} class=${n(r.earned,r.possible)}>
                      ${r.userSyllable??"—"} → ${r.keySyllable}
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
  `}function Ot({onClose:t}){const e=[...K.flaggedFiles.value].sort();return $`
    <div class="modal-backdrop" onClick=${t}>
      <div class="modal" onClick=${n=>n.stopPropagation()} role="dialog" aria-label="Flagged files">
        <div class="modal-header">
          <h2>Flagged files (${e.length})</h2>
          <button type="button" class="modal-close" onClick=${t} aria-label="Close">✕</button>
        </div>

        ${e.length===0?$`<p class="hint">No files flagged yet. Flag a bad clip from the drill screen.</p>`:$`
              <ul class="flag-list">
                ${e.map(n=>$`
                    <li key=${n} class="flag-list-item">
                      <span class="file-name">${n}</span>
                      <button type="button" class="flag-btn" onClick=${()=>K.unflag(n)}>
                        Unflag
                      </button>
                    </li>
                  `)}
              </ul>
              <p class="hint">
                Delete these files from <code>public/audio/</code> and re-run
                <code>bun run build:manifest</code> to remove them for good.
              </p>
            `}
      </div>
    </div>
  `}function Rt({vm:t,contrasts:e}){const n=t.phase.value,[i,s]=St(!1),r=K.flaggedFiles.value.size;return $`
    <main class="app">
      <div class="app-header">
        <h1>Listening Trainer</h1>
        <button type="button" class="flag-btn" onClick=${()=>s(!0)}>
          🚩 Flagged files (${r})
        </button>
      </div>
      ${n==="setup"?$`<${Ht} vm=${t} contrasts=${e} />`:null}
      ${n==="drilling"?$`<${It} vm=${t} />`:null}
      ${n==="report"?$`<${Wt} vm=${t} />`:null}
      ${i?$`<${Ot} onClose=${()=>s(!1)} />`:null}
    </main>
  `}function ft(t){const e=t.slice();for(let n=e.length-1;n>0;n--){const i=Math.floor(Math.random()*(n+1));[e[n],e[i]]=[e[i],e[n]]}return e}function pt(t,e,n){return t.filter(i=>!(i.difficulty!==e||n!=="all"&&!i.contrasts.includes(n)))}function qt(t,e,n,i,s=ft){const r=pt(t,e,n);return s(r).slice(0,i)}function oe(t){const e=t.trim().toLowerCase().replace(/ü/g,"v"),n=e.match(/^([a-z]*)([1-5])?$/);if(!n)return{base:e,tone:null};const[,i,s]=n;return{base:i??"",tone:s?Number(s):null}}function ye(t){return t.trim().split(/[\s-]+/).filter(e=>e.length>0)}function jt(t,e,n){const i=ye(e);return t.map((s,r)=>{const o=i[r]??null,a=oe(s),u=o!==null?oe(o):null,_=u!==null&&u.base===a.base&&a.base.length>0;if(n==="sounds")return{keySyllable:s,userSyllable:o,soundCorrect:_,toneCorrect:null,earned:_?1:0,possible:1};if(a.tone===null)return{keySyllable:s,userSyllable:o,soundCorrect:_,toneCorrect:null,earned:_?1:0,possible:1};const c=u!==null&&u.tone===a.tone,h=(_?.5:0)+(c?.5:0);return{keySyllable:s,userSyllable:o,soundCorrect:_,toneCorrect:c,earned:h,possible:1}})}function Bt(t){return t.split(",").map(e=>e.trim()).filter(e=>e.length>0)}function Kt(t,e,n){return t.length!==e.length?!1:t.every((i,s)=>{const r=e[s],o=r.base===i.base&&i.base.length>0;return n==="sounds"||i.tone===null?o:o&&r.tone===i.tone})}function Gt(t,e,n){const i=Bt(e),s=i.map(o=>ye(o).map(oe)),r=new Array(i.length).fill(!1);return t.map(o=>{const a=ye(o).map(oe);let u=-1;for(let c=0;c<i.length;c++)if(!r[c]&&Kt(a,s[c],n)){u=c;break}const _=u!==-1;return _&&(r[u]=!0),{keySyllable:o,userSyllable:_?i[u]:null,soundCorrect:_,toneCorrect:null,earned:_?1:0,possible:1}})}function Vt(t,e,n,i,s="syllable"){const r=s==="word"?Gt(t.words,e,i):jt(t.syllables,e,i),o=r.reduce((u,_)=>u+_.earned,0),a=r.reduce((u,_)=>u+_.possible,0);return{sample:t,answer:e,playCount:n,extraPlays:Math.max(n-1,0),syllables:r,earned:o,possible:a}}function zt(t){return t>90?"green":t>=80?"yellow":"red"}const Jt={red:"Keep trying.",yellow:"Almost there.",green:"You can increase the difficulty."};function Yt(t){const e=t.reduce((a,u)=>a+u.earned,0),n=t.reduce((a,u)=>a+u.possible,0),i=t.reduce((a,u)=>a+u.extraPlays,0),s=n>0?100*e/n:0,r=Math.max(0,s-i),o=zt(r);return{records:t,totalEarned:e,totalPossible:n,totalExtraPlays:i,accuracyPct:s,finalPct:r,band:o,message:Jt[o]}}class Zt{constructor(e,n={}){this.mode=w("sounds"),this.granularity=w("syllable"),this.difficulty=w("L1"),this.contrast=w("all"),this.count=w(10),this.phase=w("setup"),this.queue=w([]),this.index=w(0),this.records=w([]),this.subPhase=w("answering"),this.input=w(""),this.playCount=w(0),this.speed=w(1),this.currentResult=w(null),this.currentSample=L(()=>this.queue.value[this.index.value]??null),this.progress=L(()=>({position:this.index.value+1,total:this.queue.value.length})),this.canVerify=L(()=>this.subPhase.value==="answering"),this.isLastSample=L(()=>this.index.value===this.queue.value.length-1),this.availableCount=L(()=>pt(this.samples,this.difficulty.value,this.contrast.value).length),this.report=L(()=>this.phase.value==="report"?Yt(this.records.value):null),this.samples=e,this.shuffle=n.shuffle??ft}setMode(e){this.phase.value==="setup"&&(this.mode.value=e)}setGranularity(e){this.phase.value==="setup"&&(this.granularity.value=e)}setDifficulty(e){this.phase.value==="setup"&&(this.difficulty.value=e)}setContrast(e){this.phase.value==="setup"&&(this.contrast.value=e)}setCount(e){this.phase.value==="setup"&&(this.count.value=e)}startSession(){if(this.phase.value!=="setup")return;const e=qt(this.samples,this.difficulty.value,this.contrast.value,this.count.value,this.shuffle);e.length!==0&&(this.queue.value=e,this.index.value=0,this.records.value=[],this.resetCurrentSampleSignals(),this.phase.value="drilling")}play(){this.phase.value==="drilling"&&(this.playCount.value+=1)}setSpeed(e){this.phase.value==="drilling"&&(this.speed.value=e)}updateInput(e){this.subPhase.value==="answering"&&(this.input.value=e)}verify(){if(this.subPhase.value!=="answering")return;const e=this.currentSample.value;if(!e)return;const n=Vt(e,this.input.value,this.playCount.value,this.mode.value,this.granularity.value);this.records.value=[...this.records.value,n],this.currentResult.value=n.syllables,this.subPhase.value="feedback"}next(){if(this.subPhase.value==="feedback"){if(this.isLastSample.value){this.phase.value="report";return}this.index.value+=1,this.resetCurrentSampleSignals()}}reset(){this.phase.value="setup",this.queue.value=[],this.index.value=0,this.records.value=[],this.resetCurrentSampleSignals()}resetCurrentSampleSignals(){this.subPhase.value="answering",this.input.value="",this.playCount.value=0,this.currentResult.value=null}}const Qt={description:"Syllables ending in a plain -n final (contrast vs ng_final).",match:{endsWith:["n"],notEndsWith:["ng"]}},Xt={description:"Syllables ending in -ng.",match:{endsWith:["ng"]}},en={description:"Syllables with a ü/v sound and no nasal final (contrast vs u_n).",match:{endsWith:["v"],notEndsWith:["vn"]}},tn={description:"Syllables ending in -vn (ün).",match:{endsWith:["vn"]}},nn={description:"q- initials (contrast vs x_initial).",match:{startsWith:["q"]}},rn={description:"x- initials (contrast vs q_initial).",match:{startsWith:["x"]}},sn={n_final:Qt,ng_final:Xt,u_no_n:en,u_n:tn,q_initial:nn,x_initial:rn};async function on(){const t=document.getElementById("app");if(!t)throw new Error("Missing #app root element");const e="./manifest.generated.json",n=await fetch(e);if(!n.ok)throw new Error(`Failed to load ${e}: ${n.status} ${n.statusText}`);const i=await n.json(),s=new Zt(i.samples);mt($`<${Rt} vm=${s} contrasts=${sn} />`,t)}on().catch(t=>{console.error(t);const e=document.getElementById("app");e&&(e.textContent=`Failed to start: ${t instanceof Error?t.message:String(t)}`)});
