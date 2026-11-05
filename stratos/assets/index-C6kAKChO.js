var ug=Object.defineProperty;var hg=(r,e,t)=>e in r?ug(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var Ge=(r,e,t)=>hg(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();var Gf="1.3.27";function Vp(r,e,t){return Math.max(r,Math.min(e,t))}function fg(r,e,t){return(1-t)*r+t*e}function dg(r,e,t,n){return fg(r,e,1-Math.exp(-t*n))}function pg(r,e){return(r%e+e)%e}var mg=class{constructor(){Ge(this,"isRunning",!1);Ge(this,"value",0);Ge(this,"from",0);Ge(this,"to",0);Ge(this,"currentTime",0);Ge(this,"lerp");Ge(this,"duration");Ge(this,"easing");Ge(this,"onUpdate")}advance(r){if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=r;const t=Vp(0,this.currentTime/this.duration,1);e=t>=1;const n=e?1:this.easing(t);this.value=this.from+(this.to-this.from)*n}else this.lerp?(this.value=dg(this.value,this.to,this.lerp*60,r),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),this.onUpdate?.(this.value,e)}stop(){this.isRunning=!1}fromTo(r,e,{lerp:t,duration:n,easing:i,onStart:s,onUpdate:a}){this.from=this.value=r,this.to=e,this.lerp=t,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s?.(),this.onUpdate=a}};function gg(r,e){let t;return function(...n){clearTimeout(t),t=setTimeout(()=>{t=void 0,r.apply(this,n)},e)}}var _g=class{constructor(r,e,{autoResize:t=!0,debounce:n=250}={}){Ge(this,"width",0);Ge(this,"height",0);Ge(this,"scrollHeight",0);Ge(this,"scrollWidth",0);Ge(this,"debouncedResize");Ge(this,"wrapperResizeObserver");Ge(this,"contentResizeObserver");Ge(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Ge(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Ge(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=e,t&&(this.debouncedResize=gg(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Wp=class{constructor(){Ge(this,"events",{})}emit(r,...e){const t=this.events[r]||[];for(let n=0,i=t.length;n<i;n++)t[n]?.(...e)}on(r,e){return this.events[r]?this.events[r].push(e):this.events[r]=[e],()=>{this.events[r]=this.events[r]?.filter(t=>e!==t)}}off(r,e){this.events[r]=this.events[r]?.filter(t=>e!==t)}destroy(){this.events={}}};const vg=100/6,Er={passive:!1};function Vf(r,e){return r===1?vg:r===2?e:1}var xg=class{constructor(r,e={wheelMultiplier:1,touchMultiplier:1}){Ge(this,"touchStart",{x:0,y:0});Ge(this,"lastDelta",{x:0,y:0});Ge(this,"window",{width:0,height:0});Ge(this,"emitter",new Wp);Ge(this,"onTouchStart",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});Ge(this,"onTouchMove",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r,n=-(e-this.touchStart.x)*this.options.touchMultiplier,i=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});Ge(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});Ge(this,"onWheel",r=>{let{deltaX:e,deltaY:t,deltaMode:n}=r;const i=Vf(n,this.window.width),s=Vf(n,this.window.height);e*=i,t*=s,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:r})});Ge(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=e,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Er),this.element.addEventListener("touchstart",this.onTouchStart,Er),this.element.addEventListener("touchmove",this.onTouchMove,Er),this.element.addEventListener("touchend",this.onTouchEnd,Er)}on(r,e){return this.emitter.on(r,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,Er),this.element.removeEventListener("touchstart",this.onTouchStart,Er),this.element.removeEventListener("touchmove",this.onTouchMove,Er),this.element.removeEventListener("touchend",this.onTouchEnd,Er)}};const Wf=r=>Math.min(1,1.001-2**(-10*r));var Sg=class{constructor({wrapper:r=window,content:e=document.documentElement,eventsTarget:t=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaExponent:a=1.7,duration:o,easing:l,lerp:c=.1,infinite:u=!1,orientation:d="vertical",gestureOrientation:h=d==="horizontal"?"both":"vertical",touchMultiplier:f=1,wheelMultiplier:m=1,autoResize:_=!0,prevent:p,virtualScroll:g,overscroll:x=!0,autoRaf:w=!1,anchors:S=!1,autoToggle:b=!1,allowNestedScroll:T=!1,__experimental__naiveDimensions:v=!1,naiveDimensions:M=v,stopInertiaOnNavigate:C=!1,respectReducedMotion:A=!0}={}){Ge(this,"_isScrolling",!1);Ge(this,"_isStopped",!1);Ge(this,"_isLocked",!1);Ge(this,"_preventNextNativeScrollEvent",!1);Ge(this,"_resetVelocityTimeout",null);Ge(this,"_rafId",null);Ge(this,"_isDraggingSelection",!1);Ge(this,"reducedMotionMediaQuery",window.matchMedia("(prefers-reduced-motion: reduce)"));Ge(this,"isTouching");Ge(this,"isIos");Ge(this,"time",0);Ge(this,"userData",{});Ge(this,"lastVelocity",0);Ge(this,"velocity",0);Ge(this,"direction",0);Ge(this,"options");Ge(this,"targetScroll");Ge(this,"animatedScroll");Ge(this,"animate",new mg);Ge(this,"emitter",new Wp);Ge(this,"dimensions");Ge(this,"virtualScroll");Ge(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});Ge(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});Ge(this,"onTransitionEnd",r=>{r.propertyName?.includes("overflow")&&r.target===this.rootElement&&this.checkOverflow()});Ge(this,"onClick",r=>{const e=r.composedPath().filter(n=>n instanceof HTMLAnchorElement&&n.href).map(n=>new URL(n.href)),t=new URL(window.location.href);if(this.options.anchors){const n=e.find(i=>t.host===i.host&&t.pathname===i.pathname&&i.hash);if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,s=decodeURIComponent(n.hash);this.scrollTo(s,i);return}}if(this.options.stopInertiaOnNavigate&&e.some(n=>t.host===n.host&&t.pathname!==n.pathname)){this.reset();return}});Ge(this,"onPointerDown",r=>{r.button===1&&this.reset()});Ge(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:e,deltaY:t,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");if(i&&this.isIos&&(n.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(n)),this._isDraggingSelection)){n.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=n.type==="touchstart"||n.type==="touchmove";const a=e===0&&t===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&a&&!this.isStopped&&!this.isLocked){this.reset();return}const o=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(a||o)return;let l=n.composedPath();l=l.slice(0,l.indexOf(this.rootElement));const c=this.options.prevent,u=Math.abs(e)>=Math.abs(t)?"horizontal":"vertical";if(l.find(m=>m instanceof HTMLElement&&(typeof c=="function"&&c?.(m)||m.hasAttribute?.("data-lenis-prevent")||u==="vertical"&&m.hasAttribute?.("data-lenis-prevent-vertical")||u==="horizontal"&&m.hasAttribute?.("data-lenis-prevent-horizontal")||i&&m.hasAttribute?.("data-lenis-prevent-touch")||s&&m.hasAttribute?.("data-lenis-prevent-wheel")||this.options.allowNestedScroll&&this.hasNestedScroll(m,{deltaX:e,deltaY:t}))))return;if(this.isStopped||this.isLocked){n.cancelable&&n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let d=t;this.options.gestureOrientation==="both"?d=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(d=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.cancelable&&n.preventDefault();const h=i&&this.options.syncTouch,f=i&&n.type==="touchend";f&&(d=Math.sign(d)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+d,{programmatic:!1,...h?{lerp:f?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});Ge(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});Ge(this,"raf",r=>{const e=r-(this.time||r);this.time=r,this.animate.advance(e*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=Gf,window.lenis||(window.lenis={}),window.lenis.version=Gf,d==="horizontal"&&(window.lenis.horizontal=!0),i===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!r||r===document.documentElement)&&(r=window),typeof o=="number"&&typeof l!="function"?l=Wf:typeof l=="function"&&typeof o!="number"&&(o=1),this.options={wrapper:r,content:e,eventsTarget:t,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaExponent:a,duration:o,easing:l,lerp:c,infinite:u,gestureOrientation:h,orientation:d,touchMultiplier:f,wheelMultiplier:m,autoResize:_,prevent:p,virtualScroll:g,overscroll:x,autoRaf:w,anchors:S,autoToggle:b,allowNestedScroll:T,naiveDimensions:M,stopInertiaOnNavigate:C,respectReducedMotion:A},this.dimensions=new _g(r,e,{autoResize:_}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new xg(t,{touchMultiplier:f,wheelMultiplier:m}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(r,e){return this.emitter.on(r,e)}off(r,e){return this.emitter.off(r,e)}get overflow(){const r=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[r]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}isTouchOnSelectionHandle(r){const e=window.getSelection();if(!e||e.isCollapsed||e.rangeCount===0)return!1;const t=r.targetTouches[0]??r.changedTouches[0];if(!t)return!1;const n=e.getRangeAt(0).getClientRects();if(n.length===0)return!1;const i=n[0],s=n[n.length-1],a=40,o=Math.hypot(t.clientX-i.left,t.clientY-i.top)<=a,l=Math.hypot(t.clientX-s.right,t.clientY-s.bottom)<=a;return o||l}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(r,{offset:e=0,immediate:t=!1,lock:n=!1,programmatic:i=!0,lerp:s=i?this.options.lerp:void 0,duration:a=i?this.options.duration:void 0,easing:o=i?this.options.easing:void 0,onStart:l,onComplete:c,force:u=!1,userData:d}={}){if(this.prefersReducedMotion&&(i?t=!0:(s=1,a=void 0,o=void 0)),(this.isStopped||this.isLocked)&&!u)return;let h=r,f=e;if(typeof h=="string"&&["top","left","start","#"].includes(h))h=0;else if(typeof h=="string"&&["bottom","right","end"].includes(h))h=this.limit;else{let m=null;if(typeof h=="string"?(m=h.startsWith("#")?document.getElementById(h.slice(1)):document.querySelector(h),m||(h==="#top"?h=0:console.warn("Lenis: Target not found",h))):h instanceof Element&&(m=h),m){if(this.options.wrapper!==window){const S=this.rootElement.getBoundingClientRect();f-=this.isHorizontal?S.left:S.top}const _=m.getBoundingClientRect(),p=getComputedStyle(m),g=this.isHorizontal?Number.parseFloat(p.scrollMarginLeft):Number.parseFloat(p.scrollMarginTop),x=getComputedStyle(this.rootElement),w=this.isHorizontal?Number.parseFloat(x.scrollPaddingLeft):Number.parseFloat(x.scrollPaddingTop);h=(this.isHorizontal?_.left:_.top)+this.animatedScroll-(Number.isNaN(g)?0:g)-(Number.isNaN(w)?0:w)}}if(typeof h=="number"){if(h+=f,this.options.infinite){if(i){this.targetScroll=this.animatedScroll=this.scroll;const m=h-this.animatedScroll;m>this.limit/2?h-=this.limit:m<-this.limit/2&&(h+=this.limit)}}else h=Vp(0,h,this.limit);if(h===this.targetScroll){l?.(this),c?.(this);return}if(this.userData=d??{},t){this.animatedScroll=this.targetScroll=h,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}i||(this.targetScroll=h),typeof a=="number"&&typeof o!="function"?o=Wf:typeof o=="function"&&typeof a!="number"&&(a=1),this.animate.fromTo(this.animatedScroll,h,{duration:a,easing:o,lerp:s,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",l?.(this)},onUpdate:(m,_)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=m-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=m,this.setScroll(this.scroll),i&&(this.targetScroll=m),_||this.emit(),_&&(this.reset(),this.emit(),c?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(r,{deltaX:e,deltaY:t}){const n=Date.now();r._lenis||(r._lenis={});const i=r._lenis;let s,a,o,l,c,u,d,h,f,m;if(n-(i.time??0)>2e3){i.time=Date.now();const T=window.getComputedStyle(r);if(i.computedStyle=T,s=["auto","overlay","scroll"].includes(T.overflowX),a=["auto","overlay","scroll"].includes(T.overflowY),c=["auto"].includes(T.overscrollBehaviorX),u=["auto"].includes(T.overscrollBehaviorY),i.hasOverflowX=s,i.hasOverflowY=a,!(s||a))return!1;d=r.scrollWidth,h=r.scrollHeight,f=r.clientWidth,m=r.clientHeight,o=d>f,l=h>m,i.isScrollableX=o,i.isScrollableY=l,i.scrollWidth=d,i.scrollHeight=h,i.clientWidth=f,i.clientHeight=m,i.hasOverscrollBehaviorX=c,i.hasOverscrollBehaviorY=u}else o=i.isScrollableX,l=i.isScrollableY,s=i.hasOverflowX,a=i.hasOverflowY,d=i.scrollWidth,h=i.scrollHeight,f=i.clientWidth,m=i.clientHeight,c=i.hasOverscrollBehaviorX,u=i.hasOverscrollBehaviorY;if(!(s&&o||a&&l))return!1;const _=Math.abs(e)>=Math.abs(t)?"horizontal":"vertical";let p,g,x,w,S,b;if(_==="horizontal")p=Math.round(r.scrollLeft),g=d-f,x=e,w=s,S=o,b=c;else if(_==="vertical")p=Math.round(r.scrollTop),g=h-m,x=t,w=a,S=l,b=u;else return!1;return!b&&(p>=g||p<=0)?!0:(x>0?p<g:p>0)&&w&&S}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?pg(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let r="lenis";return this.options.autoToggle&&(r+=" lenis-autoToggle"),this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(r=>{this.rootElement.classList.add(r)})}cleanUpClassName(){for(const r of Array.from(this.rootElement.classList))(r==="lenis"||r.startsWith("lenis-"))&&this.rootElement.classList.remove(r)}};function cr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Xp(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}var vi={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},_o={duration:.5,overwrite:!1,delay:0},Ih,yn,Bt,Ri=1e8,Dt=1/Ri,Mu=Math.PI*2,Mg=Mu/4,yg=0,Yp=Math.sqrt,Eg=Math.cos,bg=Math.sin,vn=function(e){return typeof e=="string"},qt=function(e){return typeof e=="function"},xr=function(e){return typeof e=="number"},Nh=function(e){return typeof e>"u"},er=function(e){return typeof e=="object"},Zn=function(e){return e!==!1},Uh=function(){return typeof window<"u"},zo=function(e){return qt(e)||vn(e)},qp=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Un=Array.isArray,Tg=/random\([^)]+\)/g,wg=/,\s*/g,Xf=/(?:-?\.?\d|\.)+/gi,$p=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,ia=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Ac=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Kp=/[+-]=-?[.\d]+/,Ag=/[^,'"\[\]\s]+/gi,Rg=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Ht,Vi,yu,Fh,xi={},Kl={},Zp,Jp=function(e){return(Kl=ma(e,xi))&&ni},Oh=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},vo=function(e,t){return!t&&console.warn(e)},Qp=function(e,t){return e&&(xi[e]=t)&&Kl&&(Kl[e]=t)||xi},xo=function(){return 0},Cg={suppressEvents:!0,isStart:!0,kill:!1},Dl={suppressEvents:!0,kill:!1},Pg={suppressEvents:!0},Bh={},kr=[],Eu={},jp,hi={},Rc={},Yf=30,Ll=[],zh="",kh=function(e){var t=e[0],n,i;if(er(t)||qt(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=Ll.length;i--&&!Ll[i].targetTest(t););n=Ll[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new Mm(e[i],n)))||e.splice(i,1);return e},cs=function(e){return e._gsap||kh(Ci(e))[0]._gsap},em=function(e,t,n){return(n=e[t])&&qt(n)?e[t]():Nh(n)&&e.getAttribute&&e.getAttribute(t)||n},Jn=function(e,t){return(e=e.split(",")).forEach(t)||e},Kt=function(e){return Math.round(e*1e5)/1e5||0},kt=function(e){return Math.round(e*1e7)/1e7||0},aa=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},Dg=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},Zl=function(){var e=kr.length,t=kr.slice(0),n,i;for(Eu={},kr.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},Hh=function(e){return!!(e._initted||e._startAt||e.add)},tm=function(e,t,n,i){kr.length&&!yn&&Zl(),e.render(t,n,!!(yn&&t<0&&Hh(e))),kr.length&&!yn&&Zl()},nm=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Ag).length<2?t:vn(e)?e.trim():e},im=function(e){return e},Si=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Lg=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},ma=function(e,t){for(var n in t)e[n]=t[n];return e},qf=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=er(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},Jl=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},eo=function(e){var t=e.parent||Ht,n=e.keyframes?Lg(Un(e.keyframes)):Si;if(Zn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},Ig=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},rm=function(e,t,n,i,s){var a=e[i],o;if(s)for(o=t[s];a&&a[s]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=a,t.parent=t._dp=e,t},Sc=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,a=t._next;s?s._next=a:e[n]===t&&(e[n]=a),a?a._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},Vr=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},us=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},Ng=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},bu=function(e,t,n,i){return e._startAt&&(yn?e._startAt.revert(Dl):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},Ug=function r(e){return!e||e._ts&&r(e.parent)},$f=function(e){return e._repeat?ga(e._tTime,e=e.duration()+e._rDelay)*e:0},ga=function(e,t){var n=Math.floor(e=kt(e/t));return e&&n===e?n-1:n},Ql=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Mc=function(e){return e._end=kt(e._start+(e._tDur/Math.abs(e._ts||e._rts||Dt)||0))},yc=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=kt(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Mc(e),n._dirty||us(n,e)),e},sm=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Ql(e.rawTime(),t),(!t._dur||No(0,t.totalDuration(),n)-t._tTime>Dt)&&t.render(n,!0)),us(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-Dt}},Yi=function(e,t,n,i){return t.parent&&Vr(t),t._start=kt((xr(n)?n:n||e!==Ht?Ei(e,n,t):e._time)+t._delay),t._end=kt(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),rm(e,t,"_first","_last",e._sort?"_start":0),Tu(t)||(e._recent=t),i||sm(e,t),e._ts<0&&yc(e,e._tTime),e},am=function(e,t){return(xi.ScrollTrigger||Oh("scrollTrigger",t))&&xi.ScrollTrigger.create(t,e)},om=function(e,t,n,i,s){if(Vh(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!yn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&jp!==di.frame)return kr.push(e),e._lazy=[s,i],1},Fg=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},Tu=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},Og=function(e,t,n,i){var s=e.ratio,a=t<0||!t&&(!e._start&&Fg(e)&&!(!e._initted&&Tu(e))||(e._ts<0||e._dp._ts<0)&&!Tu(e))?0:1,o=e._rDelay,l=0,c,u,d;if(o&&e._repeat&&(l=No(0,e._tDur,t),u=ga(l,o),e._yoyo&&u&1&&(a=1-a),u!==ga(e._tTime,o)&&(s=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==s||yn||i||e._zTime===Dt||!t&&e._zTime){if(!e._initted&&om(e,t,i,n,l))return;for(d=e._zTime,e._zTime=t||(n?Dt:0),n||(n=t&&!d),e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=l,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&bu(e,t,n,!0),e._onUpdate&&!n&&gi(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&gi(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&Vr(e,1),!n&&!yn&&(gi(e,a?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},Bg=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},_a=function(e,t,n,i){var s=e._repeat,a=kt(t)||0,o=e._tTime/e._tDur;return o&&!i&&(e._time*=a/e._dur),e._dur=a,e._tDur=s?s<0?1e10:kt(a*(s+1)+e._rDelay*s):a,o>0&&!i&&yc(e,e._tTime=e._tDur*o),e.parent&&Mc(e),n||us(e.parent,e),e},Kf=function(e){return e instanceof $n?us(e):_a(e,e._dur)},zg={_start:0,endTime:xo,totalDuration:xo},Ei=function r(e,t,n){var i=e.labels,s=e._recent||zg,a=e.duration()>=Ri?s.endTime(!1):e._dur,o,l,c;return vn(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",o=t.indexOf("="),l==="<"||l===">"?(o>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(o<0?s:n).totalDuration()/100:1)):o<0?(t in i||(i[t]=a),i[t]):(l=parseFloat(t.charAt(o-1)+t.substr(o+1)),c&&n&&(l=l/100*(Un(n)?n[0]:n).totalDuration()),o>1?r(e,t.substr(0,o-1),n)+l:a+l)):t==null?a:+t},to=function(e,t,n){var i=xr(t[1]),s=(i?2:1)+(e<2?0:1),a=t[s],o,l;if(i&&(a.duration=t[1]),a.parent=n,e){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=Zn(l.vars.inherit)&&l.parent;a.immediateRender=Zn(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[s-1]}return new rn(t[0],a,t[s+1])},$r=function(e,t){return e||e===0?t(e):t},No=function(e,t,n){return n<e?e:n>t?t:n},Ln=function(e,t){return!vn(e)||!(t=Rg.exec(e))?"":t[1]},kg=function(e,t,n){return $r(n,function(i){return No(e,t,i)})},wu=[].slice,lm=function(e,t){return e&&er(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&er(e[0]))&&!e.nodeType&&e!==Vi},Hg=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return vn(i)&&!t||lm(i,1)?(s=n).push.apply(s,Ci(i)):n.push(i)})||n},Ci=function(e,t,n){return Bt&&!t&&Bt.selector?Bt.selector(e):vn(e)&&!n&&(yu||!va())?wu.call((t||Fh).querySelectorAll(e),0):Un(e)?Hg(e,n):lm(e)?wu.call(e,0):e?[e]:[]},Au=function(e){return e=Ci(e)[0]||vo("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return Ci(t,n.querySelectorAll?n:n===e?vo("Invalid scope")||Fh.createElement("div"):e)}},cm=function(e){return e.sort(function(){return .5-Math.random()})},um=function(e){if(qt(e))return e;var t=er(e)?e:{each:e},n=hs(t.ease),i=t.from||0,s=parseFloat(t.base)||0,a={},o=i>0&&i<1,l=isNaN(i)||o,c=t.axis,u=i,d=i;return vn(i)?u=d={center:.5,edges:.5,end:1}[i]||0:!o&&l&&(u=i[0],d=i[1]),function(h,f,m){var _=(m||t).length,p=a[_],g,x,w,S,b,T,v,M,C;if(!p){if(C=t.grid==="auto"?0:(t.grid||[1,Ri])[1],!C){for(v=-Ri;v<(v=m[C++].getBoundingClientRect().left)&&C<_;);C<_&&C--}for(p=a[_]=[],g=l?Math.min(C,_)*u-.5:i%C,x=C===Ri?0:l?_*d/C-.5:i/C|0,v=0,M=Ri,T=0;T<_;T++)w=T%C-g,S=x-(T/C|0),p[T]=b=c?Math.abs(c==="y"?S:w):Yp(w*w+S*S),b>v&&(v=b),b<M&&(M=b);i==="random"&&cm(p),p.max=v-M,p.min=M,p.v=_=(parseFloat(t.amount)||parseFloat(t.each)*(C>_?_-1:c?c==="y"?_/C:C:Math.max(C,_/C))||0)*(i==="edges"?-1:1),p.b=_<0?s-_:s,p.u=Ln(t.amount||t.each)||0,n=n&&_<0?e_(n):n}return _=(p[h]-p.min)/p.max||0,kt(p.b+(n?n(_):_)*p.v)+p.u}},Ru=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=kt(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(xr(n)?0:Ln(n))}},hm=function(e,t){var n=Un(e),i,s;return!n&&er(e)&&(i=n=e.radius||Ri,e.values?(e=Ci(e.values),(s=!xr(e[0]))&&(i*=i)):e=Ru(e.increment)),$r(t,n?qt(e)?function(a){return s=e(a),Math.abs(s-a)<=i?s:a}:function(a){for(var o=parseFloat(s?a.x:a),l=parseFloat(s?a.y:0),c=Ri,u=0,d=e.length,h,f;d--;)s?(h=e[d].x-o,f=e[d].y-l,h=h*h+f*f):h=Math.abs(e[d]-o),h<c&&(c=h,u=d);return u=!i||c<=i?e[u]:a,s||u===a||xr(a)?u:u+Ln(a)}:Ru(e))},fm=function(e,t,n,i){return $r(Un(e)?!t:n===!0?!!(n=0):!i,function(){return Un(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},Gg=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,a){return a(s)},i)}},Vg=function(e,t){return function(n){return e(parseFloat(n))+(t||Ln(n))}},Wg=function(e,t,n){return pm(e,t,0,1,n)},dm=function(e,t,n){return $r(n,function(i){return e[~~t(i)]})},Xg=function r(e,t,n){var i=t-e;return Un(e)?dm(e,r(0,e.length),t):$r(n,function(s){return(i+(s-e)%i)%i+e})},Yg=function r(e,t,n){var i=t-e,s=i*2;return Un(e)?dm(e,r(0,e.length-1),t):$r(n,function(a){return a=(s+(a-e)%s)%s||0,e+(a>i?s-a:a)})},So=function(e){return e.replace(Tg,function(t){var n=t.indexOf("[")+1,i=t.substring(n||7,n?t.indexOf("]"):t.length-1).split(wg);return fm(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},pm=function(e,t,n,i,s){var a=t-e,o=i-n;return $r(s,function(l){return n+((l-e)/a*o||0)})},qg=function r(e,t,n,i){var s=isNaN(e+t)?0:function(f){return(1-f)*e+f*t};if(!s){var a=vn(e),o={},l,c,u,d,h;if(n===!0&&(i=1)&&(n=null),a)e={p:e},t={p:t};else if(Un(e)&&!Un(t)){for(u=[],d=e.length,h=d-2,c=1;c<d;c++)u.push(r(e[c-1],e[c]));d--,s=function(m){m*=d;var _=Math.min(h,~~m);return u[_](m-_)},n=t}else i||(e=ma(Un(e)?[]:{},e));if(!u){for(l in t)Gh.call(o,e,l,"get",t[l]);s=function(m){return Yh(m,o)||(a?e.p:e)}}}return $r(n,s)},Zf=function(e,t,n){var i=e.labels,s=Ri,a,o,l;for(a in i)o=i[a]-t,o<0==!!n&&o&&s>(o=Math.abs(o))&&(l=a,s=o);return l},gi=function(e,t,n){var i=e.vars,s=i[t],a=Bt,o=e._ctx,l,c,u;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&kr.length&&Zl(),o&&(Bt=o),u=l?s.apply(c,l):s.call(c),Bt=a,u},Wa=function(e){return Vr(e),e.scrollTrigger&&e.scrollTrigger.kill(!!yn),e.progress()<1&&gi(e,"onInterrupt"),e},ra,mm=[],gm=function(e){if(e)if(e=!e.name&&e.default||e,Uh()||e.headless){var t=e.name,n=qt(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:xo,render:Yh,add:Gh,kill:u_,modifier:c_,rawVars:0},a={targetTest:0,get:0,getSetter:Xh,aliases:{},register:0};if(va(),e!==i){if(hi[t])return;Si(i,Si(Jl(e,s),a)),ma(i.prototype,ma(s,Jl(e,a))),hi[i.prop=t]=i,e.targetTest&&(Ll.push(i),Bh[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}Qp(t,i),e.register&&e.register(ni,i,Qn)}else mm.push(e)},Pt=255,Xa={aqua:[0,Pt,Pt],lime:[0,Pt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Pt],navy:[0,0,128],white:[Pt,Pt,Pt],olive:[128,128,0],yellow:[Pt,Pt,0],orange:[Pt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Pt,0,0],pink:[Pt,192,203],cyan:[0,Pt,Pt],transparent:[Pt,Pt,Pt,0]},Cc=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Pt+.5|0},_m=function(e,t,n){var i=e?xr(e)?[e>>16,e>>8&Pt,e&Pt]:0:Xa.black,s,a,o,l,c,u,d,h,f,m;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Xa[e])i=Xa[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e="#"+s+s+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&Pt,i&Pt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&Pt,e&Pt]}else if(e.substr(0,3)==="hsl"){if(i=m=e.match(Xf),!t)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,a=u<=.5?u*(c+1):u+c-u*c,s=u*2-a,i.length>3&&(i[3]*=1),i[0]=Cc(l+1/3,s,a),i[1]=Cc(l,s,a),i[2]=Cc(l-1/3,s,a);else if(~e.indexOf("="))return i=e.match($p),n&&i.length<4&&(i[3]=1),i}else i=e.match(Xf)||Xa.transparent;i=i.map(Number)}return t&&!m&&(s=i[0]/Pt,a=i[1]/Pt,o=i[2]/Pt,d=Math.max(s,a,o),h=Math.min(s,a,o),u=(d+h)/2,d===h?l=c=0:(f=d-h,c=u>.5?f/(2-d-h):f/(d+h),l=d===s?(a-o)/f+(a<o?6:0):d===a?(o-s)/f+2:(s-a)/f+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},vm=function(e){var t=[],n=[],i=-1;return e.split(Hr).forEach(function(s){var a=s.match(ia)||[];t.push.apply(t,a),n.push(i+=a.length+1)}),t.c=n,t},Jf=function(e,t,n){var i="",s=(e+i).match(Hr),a=t?"hsla(":"rgba(",o=0,l,c,u,d;if(!s)return e;if(s=s.map(function(h){return(h=_m(h,t,1))&&a+(t?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),n&&(u=vm(e),l=n.c,l.join(i)!==u.c.join(i)))for(c=e.replace(Hr,"1").split(ia),d=c.length-1;o<d;o++)i+=c[o]+(~l.indexOf(o)?s.shift()||a+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(Hr),d=c.length-1;o<d;o++)i+=c[o]+s[o];return i+c[d]},Hr=(function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Xa)r+="|"+e+"\\b";return new RegExp(r+")","gi")})(),$g=/hsl[a]?\(/,xm=function(e){var t=e.join(" "),n;if(Hr.lastIndex=0,Hr.test(t))return n=$g.test(t),e[1]=Jf(e[1],n),e[0]=Jf(e[0],n,vm(e[1])),!0},Mo,di=(function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,a=s,o=[],l,c,u,d,h,f,m=function _(p){var g=r()-i,x=p===!0,w,S,b,T;if((g>e||g<0)&&(n+=g-t),i+=g,b=i-n,w=b-a,(w>0||x)&&(T=++d.frame,h=b-d.time*1e3,d.time=b=b/1e3,a+=w+(w>=s?4:s-w),S=1),x||(l=c(_)),S)for(f=0;f<o.length;f++)o[f](b,h,T,p)};return d={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(p){return h/(1e3/(p||60))},wake:function(){Zp&&(!yu&&Uh()&&(Vi=yu=window,Fh=Vi.document||{},xi.gsap=ni,(Vi.gsapVersions||(Vi.gsapVersions=[])).push(ni.version),Jp(Kl||Vi.GreenSockGlobals||!Vi.gsap&&Vi||{}),mm.forEach(gm)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=u||function(p){return setTimeout(p,a-d.time*1e3+1|0)},Mo=1,m(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),Mo=0,c=xo},lagSmoothing:function(p,g){e=p||1/0,t=Math.min(g||33,e)},fps:function(p){s=1e3/(p||240),a=d.time*1e3+s},add:function(p,g,x){var w=g?function(S,b,T,v){p(S,b,T,v),d.remove(w)}:p;return d.remove(p),o[x?"unshift":"push"](w),va(),w},remove:function(p,g){~(g=o.indexOf(p))&&o.splice(g,1)&&f>=g&&f--},_listeners:o},d})(),va=function(){return!Mo&&di.wake()},gt={},Kg=/^[\d.\-M][\d.\-,\s]/,Zg=/["']/g,Jg=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,a=n.length,o,l,c;s<a;s++)l=n[s],o=s!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),t[i]=isNaN(c)?c.replace(Zg,"").trim():+c,i=l.substr(o+1).trim();return t},Qg=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},jg=function(e){var t=(e+"").split("("),n=gt[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[Jg(t[1])]:Qg(e).split(",").map(nm)):gt._CE&&Kg.test(e)?gt._CE("",e):n},e_=function(e){return function(t){return 1-e(1-t)}},hs=function(e,t){return e&&(qt(e)?e:gt[e]||jg(e))||t},bs=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},a;return Jn(e,function(o){gt[o]=xi[o]=s,gt[a=o.toLowerCase()]=n;for(var l in s)gt[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=gt[o+"."+l]=s[l]}),s},Sm=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Pc=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),a=s/Mu*(Math.asin(1/i)||0),o=function(u){return u===1?1:i*Math.pow(2,-10*u)*bg((u-a)*s)+1},l=e==="out"?o:e==="in"?function(c){return 1-o(1-c)}:Sm(o);return s=Mu/s,l.config=function(c,u){return r(e,c,u)},l},Dc=function r(e,t){t===void 0&&(t=1.70158);var n=function(a){return a?--a*a*((t+1)*a+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:Sm(n);return i.config=function(s){return r(e,s)},i};Jn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;bs(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});gt.Linear.easeNone=gt.none=gt.Linear.easeIn;bs("Elastic",Pc("in"),Pc("out"),Pc());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(o){return o<t?r*o*o:o<n?r*Math.pow(o-1.5/e,2)+.75:o<i?r*(o-=2.25/e)*o+.9375:r*Math.pow(o-2.625/e,2)+.984375};bs("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75);bs("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});bs("Circ",function(r){return-(Yp(1-r*r)-1)});bs("Sine",function(r){return r===1?1:-Eg(r*Mg)+1});bs("Back",Dc("in"),Dc("out"),Dc());gt.SteppedEase=gt.steps=xi.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,a=1-Dt;return function(o){return((i*No(0,a,o)|0)+s)*n}}};_o.ease=gt["quad.out"];Jn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return zh+=r+","+r+"Params,"});var Mm=function(e,t){this.id=yg++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:em,this.set=t?t.getSetter:Xh},yo=(function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,_a(this,+t.duration,1,1),this.data=t.data,Bt&&(this._ctx=Bt,Bt.data.push(this)),Mo||di.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,_a(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(va(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(yc(this,n),!s._dp||s.parent||sm(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Yi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===Dt||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),tm(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+$f(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+$f(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?ga(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-Dt?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Ql(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Dt?0:this._rts,this.totalTime(No(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),Mc(this),Ng(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(va(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Dt&&(this._tTime-=Dt)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=kt(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Yi(i,this,this._start-this._delay),this}return this._start},e.endTime=function(n){return this._start+(Zn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Ql(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=Pg);var i=yn;return yn=n,Hh(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),yn=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Kf(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Kf(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(Ei(this,n),Zn(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,Zn(i)),this._dur||(this._zTime=-Dt),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Dt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Dt,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-Dt)},e.eventCallback=function(n,i,s){var a=this.vars;return arguments.length>1?(i?(a[n]=i,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},e.then=function(n){var i=this,s=i._prom;return new Promise(function(a){var o=qt(n)?n:im,l=function(){var u=i.then;i.then=null,s&&s(),qt(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=u),a(o),i.then=u};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},e.kill=function(){Wa(this)},r})();Si(yo.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Dt,_prom:0,_ps:!1,_rts:1});var $n=(function(r){Xp(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=Zn(n.sortChildren),Ht&&Yi(n.parent||Ht,cr(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&am(cr(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,a){return to(0,arguments,this),this},t.from=function(i,s,a){return to(1,arguments,this),this},t.fromTo=function(i,s,a,o){return to(2,arguments,this),this},t.set=function(i,s,a){return s.duration=0,s.parent=this,eo(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new rn(i,s,Ei(this,a),1),this},t.call=function(i,s,a){return Yi(this,rn.delayedCall(0,i,s),a)},t.staggerTo=function(i,s,a,o,l,c,u){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=u,a.parent=this,new rn(i,a,Ei(this,l)),this},t.staggerFrom=function(i,s,a,o,l,c,u){return a.runBackwards=1,eo(a).immediateRender=Zn(a.immediateRender),this.staggerTo(i,s,a,o,l,c,u)},t.staggerFromTo=function(i,s,a,o,l,c,u,d){return o.startAt=a,eo(o).immediateRender=Zn(o.immediateRender),this.staggerTo(i,s,o,l,c,u,d)},t.render=function(i,s,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:kt(i),d=this._zTime<0!=i<0&&(this._initted||!c),h,f,m,_,p,g,x,w,S,b,T,v;if(this!==Ht&&u>l&&i>=0&&(u=l),u!==this._tTime||a||d){if(o!==this._time&&c&&(u+=this._time-o,i+=this._time-o),h=u,S=this._start,w=this._ts,g=!w,d&&(c||(o=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(T=this._yoyo,p=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,s,a);if(h=kt(u%p),u===l?(_=this._repeat,h=c):(b=kt(u/p),_=~~b,_&&_===b&&(h=c,_--),h>c&&(h=c)),b=ga(this._tTime,p),!o&&this._tTime&&b!==_&&this._tTime-b*p-this._dur<=0&&(b=_),T&&_&1&&(h=c-h,v=1),_!==b&&!this._lock){var M=T&&b&1,C=M===(T&&_&1);if(_<b&&(M=!M),o=M?0:u%c?c:u,this._lock=1,this.render(o||(v?0:kt(_*p)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&gi(this,"onRepeat"),this.vars.repeatRefresh&&!v&&(this.invalidate()._lock=1,b=_),o&&o!==this._time||g!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,C&&(this._lock=2,o=M?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!v&&this.invalidate()),this._lock=0,!this._ts&&!g)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(x=Bg(this,kt(o),kt(h)),x&&(u-=h-(h=x._start))),this._tTime=u,this._time=h,this._act=!!w,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&u&&c&&!s&&!b&&(gi(this,"onStart"),this._tTime!==u))return this;if(h>=o&&i>=0)for(f=this._first;f;){if(m=f._next,(f._act||h>=f._start)&&f._ts&&x!==f){if(f.parent!==this)return this.render(i,s,a);if(f.render(f._ts>0?(h-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(h-f._start)*f._ts,s,a),h!==this._time||!this._ts&&!g){x=0,m&&(u+=this._zTime=-Dt);break}}f=m}else{f=this._last;for(var A=i<0?i:h;f;){if(m=f._prev,(f._act||A<=f._end)&&f._ts&&x!==f){if(f.parent!==this)return this.render(i,s,a);if(f.render(f._ts>0?(A-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(A-f._start)*f._ts,s,a||yn&&Hh(f)),h!==this._time||!this._ts&&!g){x=0,m&&(u+=this._zTime=A?-Dt:Dt);break}}f=m}}if(x&&!s&&(this.pause(),x.render(h>=o?0:-Dt)._zTime=h>=o?1:-1,this._ts))return this._start=S,Mc(this),this.render(i,s,a);this._onUpdate&&!s&&gi(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&o)&&(S===this._start||Math.abs(w)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&Vr(this,1),!s&&!(i<0&&!o)&&(u||o||!l)&&(gi(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var a=this;if(xr(s)||(s=Ei(this,s,i)),!(i instanceof yo)){if(Un(i))return i.forEach(function(o){return a.add(o,s)}),this;if(vn(i))return this.addLabel(i,s);if(qt(i))i=rn.delayedCall(0,i);else return this}return this!==i?Yi(this,i,s):this},t.getChildren=function(i,s,a,o){i===void 0&&(i=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-Ri);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof rn?s&&l.push(c):(a&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,a)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===i)return s[a]},t.remove=function(i){return vn(i)?this.removeLabel(i):qt(i)?this.killTweensOf(i):(i.parent===this&&Sc(this,i),i===this._recent&&(this._recent=this._last),us(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=kt(di.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=Ei(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,a){var o=rn.delayedCall(0,s||xo,a);return o.data="isPause",this._hasPause=1,Yi(this,o,Ei(this,i))},t.removePause=function(i){var s=this._first;for(i=Ei(this,i);s;)s._start===i&&s.data==="isPause"&&Vr(s),s=s._next},t.killTweensOf=function(i,s,a){for(var o=this.getTweensOf(i,a),l=o.length;l--;)Lr!==o[l]&&o[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var a=[],o=Ci(i),l=this._first,c=xr(s),u;l;)l instanceof rn?Dg(l._targets,o)&&(c?(!Lr||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&a.push(l):(u=l.getTweensOf(o,s)).length&&a.push.apply(a,u),l=l._next;return a},t.tweenTo=function(i,s){s=s||{};var a=this,o=Ei(a,i),l=s,c=l.startAt,u=l.onStart,d=l.onStartParams,h=l.immediateRender,f,m=rn.to(a,Si({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||Dt,onStart:function(){if(a.pause(),!f){var p=s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());m._dur!==p&&_a(m,p,0,1).render(m._time,!0,!0),f=1}u&&u.apply(m,d||[])}},s));return h?m.render(0):m},t.tweenFromTo=function(i,s,a){return this.tweenTo(s,Si({startAt:{time:Ei(this,i)}},a))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),Zf(this,Ei(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),Zf(this,Ei(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+Dt)},t.shiftChildren=function(i,s,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(i=kt(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(s)for(c in l)l[c]>=a&&(l[c]+=i);return us(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),us(this)},t.totalDuration=function(i){var s=0,a=this,o=a._last,l=Ri,c,u,d;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(d=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),u=o._start,u>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,Yi(a,o,u-o._delay,1)._lock=0):l=u,u<0&&o._ts&&(s-=u,(!d&&!a._dp||d&&d.smoothChildTiming)&&(a._start+=kt(u/a._ts),a._time-=u,a._tTime-=u),a.shiftChildren(-u,!1,-1/0),l=0),o._end>s&&o._ts&&(s=o._end),o=c;_a(a,a===Ht&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},e.updateRoot=function(i){if(Ht._ts&&(tm(Ht,Ql(i,Ht)),jp=di.frame),di.frame>=Yf){Yf+=vi.autoSleep||120;var s=Ht._first;if((!s||!s._ts)&&vi.autoSleep&&di._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||di.sleep()}}},e})(yo);Si($n.prototype,{_lock:0,_hasPause:0,_forcing:0});var t_=function(e,t,n,i,s,a,o){var l=new Qn(this._pt,e,t,0,1,Am,null,s),c=0,u=0,d,h,f,m,_,p,g,x;for(l.b=n,l.e=i,n+="",i+="",(g=~i.indexOf("random("))&&(i=So(i)),a&&(x=[n,i],a(x,e,t),n=x[0],i=x[1]),h=n.match(Ac)||[];d=Ac.exec(i);)m=d[0],_=i.substring(c,d.index),f?f=(f+1)%5:_.substr(-5)==="rgba("&&(f=1),m!==h[u++]&&(p=parseFloat(h[u-1])||0,l._pt={_next:l._pt,p:_||u===1?_:",",s:p,c:m.charAt(1)==="="?aa(p,m)-p:parseFloat(m)-p,m:f&&f<4?Math.round:0},c=Ac.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=o,(Kp.test(i)||g)&&(l.e=0),this._pt=l,l},Gh=function(e,t,n,i,s,a,o,l,c,u){qt(i)&&(i=i(s||0,e,a));var d=e[t],h=n!=="get"?n:qt(d)?c?e[t.indexOf("set")||!qt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():d,f=qt(d)?c?a_:Tm:Wh,m;if(vn(i)&&(~i.indexOf("random(")&&(i=So(i)),i.charAt(1)==="="&&(m=aa(h,i)+(Ln(h)||0),(m||m===0)&&(i=m))),!u||h!==i||Cu)return!isNaN(h*i)&&i!==""?(m=new Qn(this._pt,e,t,+h||0,i-(h||0),typeof d=="boolean"?l_:wm,0,f),c&&(m.fp=c),o&&m.modifier(o,this,e),this._pt=m):(!d&&!(t in e)&&Oh(t,i),t_.call(this,e,t,h,i,f,l||vi.stringFilter,c))},n_=function(e,t,n,i,s){if(qt(e)&&(e=no(e,s,t,n,i)),!er(e)||e.style&&e.nodeType||Un(e)||qp(e))return vn(e)?no(e,s,t,n,i):e;var a={},o;for(o in e)a[o]=no(e[o],s,t,n,i);return a},ym=function(e,t,n,i,s,a){var o,l,c,u;if(hi[e]&&(o=new hi[e]).init(s,o.rawVars?t[e]:n_(t[e],i,s,a,n),n,i,a)!==!1&&(n._pt=l=new Qn(n._pt,s,e,0,1,o.render,o,0,o.priority),n!==ra))for(c=n._ptLookup[n._targets.indexOf(s)],u=o._props.length;u--;)c[o._props[u]]=l;return o},Lr,Cu,Vh=function r(e,t,n){var i=e.vars,s=i.ease,a=i.startAt,o=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,h=i.keyframes,f=i.autoRevert,m=e._dur,_=e._startAt,p=e._targets,g=e.parent,x=g&&g.data==="nested"?g.vars.targets:p,w=e._overwrite==="auto"&&!Ih,S=e.timeline,b=i.easeReverse||d,T,v,M,C,A,U,I,H,D,z,X,F,Q;if(S&&(!h||!s)&&(s="none"),e._ease=hs(s,_o.ease),e._rEase=b&&(hs(b)||e._ease),e._from=!S&&!!i.runBackwards,e._from&&(e.ratio=1),!S||h&&!i.stagger){if(H=p[0]?cs(p[0]).harness:0,F=H&&i[H.prop],T=Jl(i,Bh),_&&(_._zTime<0&&_.progress(1),t<0&&u&&o&&!f?_.render(-1,!0):_.revert(u&&m?Dl:Cg),_._lazy=0),a){if(Vr(e._startAt=rn.set(p,Si({data:"isStart",overwrite:!1,parent:g,immediateRender:!0,lazy:!_&&Zn(l),startAt:null,delay:0,onUpdate:c&&function(){return gi(e,"onUpdate")},stagger:0},a))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(yn||!o&&!f)&&e._startAt.revert(Dl),o&&m&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&m&&!_){if(t&&(o=!1),M=Si({overwrite:!1,data:"isFromStart",lazy:o&&!_&&Zn(l),immediateRender:o,stagger:0,parent:g},T),F&&(M[H.prop]=F),Vr(e._startAt=rn.set(p,M)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(yn?e._startAt.revert(Dl):e._startAt.render(-1,!0)),e._zTime=t,!o)r(e._startAt,Dt,Dt);else if(!t)return}for(e._pt=e._ptCache=0,l=m&&Zn(l)||l&&!m,v=0;v<p.length;v++){if(A=p[v],I=A._gsap||kh(p)[v]._gsap,e._ptLookup[v]=z={},Eu[I.id]&&kr.length&&Zl(),X=x===p?v:x.indexOf(A),H&&(D=new H).init(A,F||T,e,X,x)!==!1&&(e._pt=C=new Qn(e._pt,A,D.name,0,1,D.render,D,0,D.priority),D._props.forEach(function(W){z[W]=C}),D.priority&&(U=1)),!H||F)for(M in T)hi[M]&&(D=ym(M,T,e,X,A,x))?D.priority&&(U=1):z[M]=C=Gh.call(e,A,M,"get",T[M],X,x,0,i.stringFilter);e._op&&e._op[v]&&e.kill(A,e._op[v]),w&&e._pt&&(Lr=e,Ht.killTweensOf(A,z,e.globalTime(t)),Q=!e.parent,Lr=0),e._pt&&l&&(Eu[I.id]=1)}U&&Rm(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!Q,h&&t<=0&&S.render(Ri,!0,!0)},i_=function(e,t,n,i,s,a,o,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,d,h,f;if(!c)for(c=e._ptCache[t]=[],h=e._ptLookup,f=e._targets.length;f--;){if(u=h[f][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return Cu=1,e.vars[t]="+=0",Vh(e,o),Cu=0,l?vo(t+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(f=c.length;f--;)d=c[f],u=d._pt||d,u.s=(i||i===0)&&!s?i:u.s+(i||0)+a*u.c,u.c=n-u.s,d.e&&(d.e=Kt(n)+Ln(d.e)),d.b&&(d.b=u.s+Ln(d.b))},r_=function(e,t){var n=e[0]?cs(e[0]).harness:0,i=n&&n.aliases,s,a,o,l;if(!i)return t;s=ma({},t);for(a in i)if(a in s)for(l=i[a].split(","),o=l.length;o--;)s[l[o]]=s[a];return s},s_=function(e,t,n,i){var s=t.ease||i||"power1.inOut",a,o;if(Un(t))o=n[e]||(n[e]=[]),t.forEach(function(l,c){return o.push({t:c/(t.length-1)*100,v:l,e:s})});else for(a in t)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(e),v:t[a],e:s})},no=function(e,t,n,i,s){return qt(e)?e.call(t,n,i,s):vn(e)&&~e.indexOf("random(")?So(e):e},Em=zh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",bm={};Jn(Em+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return bm[r]=1});var rn=(function(r){Xp(e,r);function e(n,i,s,a){var o;typeof i=="number"&&(s.duration=i,i=s,s=null),o=r.call(this,a?i:eo(i))||this;var l=o.vars,c=l.duration,u=l.delay,d=l.immediateRender,h=l.stagger,f=l.overwrite,m=l.keyframes,_=l.defaults,p=l.scrollTrigger,g=i.parent||Ht,x=(Un(n)||qp(n)?xr(n[0]):"length"in i)?[n]:Ci(n),w,S,b,T,v,M,C,A;if(o._targets=x.length?kh(x):vo("GSAP target "+n+" not found. https://gsap.com",!vi.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=f,m||h||zo(c)||zo(u)){i=o.vars;var U=i.easeReverse||i.yoyoEase;if(w=o.timeline=new $n({data:"nested",defaults:_||{},targets:g&&g.data==="nested"?g.vars.targets:x}),w.kill(),w.parent=w._dp=cr(o),w._start=0,h||zo(c)||zo(u)){if(T=x.length,C=h&&um(h),er(h))for(v in h)~Em.indexOf(v)&&(A||(A={}),A[v]=h[v]);for(S=0;S<T;S++)b=Jl(i,bm),b.stagger=0,U&&(b.easeReverse=U),A&&ma(b,A),M=x[S],b.duration=+no(c,cr(o),S,M,x),b.delay=(+no(u,cr(o),S,M,x)||0)-o._delay,!h&&T===1&&b.delay&&(o._delay=u=b.delay,o._start+=u,b.delay=0),w.to(M,b,C?C(S,M,x):0),w._ease=gt.none;w.duration()?c=u=0:o.timeline=0}else if(m){eo(Si(w.vars.defaults,{ease:"none"})),w._ease=hs(m.ease||i.ease||"none");var I=0,H,D,z;if(Un(m))m.forEach(function(X){return w.to(x,X,">")}),w.duration();else{b={};for(v in m)v==="ease"||v==="easeEach"||s_(v,m[v],b,m.easeEach);for(v in b)for(H=b[v].sort(function(X,F){return X.t-F.t}),I=0,S=0;S<H.length;S++)D=H[S],z={ease:D.e,duration:(D.t-(S?H[S-1].t:0))/100*c},z[v]=D.v,w.to(x,z,I),I+=z.duration;w.duration()<c&&w.to({},{duration:c-w.duration()})}}c||o.duration(c=w.duration())}else o.timeline=0;return f===!0&&!Ih&&(Lr=cr(o),Ht.killTweensOf(x),Lr=0),Yi(g,cr(o),s),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(d||!c&&!m&&o._start===kt(g._time)&&Zn(d)&&Ug(cr(o))&&g.data!=="nested")&&(o._tTime=-Dt,o.render(Math.max(0,-u)||0)),p&&am(cr(o),p),o}var t=e.prototype;return t.render=function(i,s,a){var o=this._time,l=this._tDur,c=this._dur,u=i<0,d=i>l-Dt&&!u?l:i<Dt?0:i,h,f,m,_,p,g,x,w;if(!c)Og(this,i,s,a);else if(d!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(h=d,w=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+i,s,a);if(h=kt(d%_),d===l?(m=this._repeat,h=c):(p=kt(d/_),m=~~p,m&&m===p?(h=c,m--):h>c&&(h=c)),g=this._yoyo&&m&1,g&&(h=c-h),p=ga(this._tTime,_),h===o&&!a&&this._initted&&m===p)return this._tTime=d,this;m!==p&&this.vars.repeatRefresh&&!g&&!this._lock&&h!==_&&this._initted&&(this._lock=a=1,this.render(kt(_*m),!0).invalidate()._lock=0)}if(!this._initted){if(om(this,u?i:h,a,s,d))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&m!==p))return this;if(c!==this._dur)return this.render(i,s,a)}if(this._rEase){var S=h<o;if(S!==this._inv){var b=S?o:c-o;this._inv=S,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=b?(S?-1:1)/b:0,this._invScale=S?-this.ratio:1-this.ratio,this._invEase=S?this._rEase:this._ease}this.ratio=x=this._invRatio+this._invScale*this._invEase((h-this._invTime)*this._invRecip)}else this.ratio=x=this._ease(h/c);if(this._from&&(this.ratio=x=1-x),this._tTime=d,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&d&&!s&&!p&&(gi(this,"onStart"),this._tTime!==d))return this;for(f=this._pt;f;)f.r(x,f.d),f=f._next;w&&w.render(i<0?i:w._dur*w._ease(h/this._dur),s,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&bu(this,i,s,a),gi(this,"onUpdate")),this._repeat&&m!==p&&this.vars.onRepeat&&!s&&this.parent&&gi(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(u&&!this._onUpdate&&bu(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&Vr(this,1),!s&&!(u&&!o)&&(d||o||g)&&(gi(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,a,o,l){Mo||di.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||Vh(this,c),u=this._ease(c/this._dur),i_(this,i,s,a,o,u,c,l)?this.resetTo(i,s,a,o,1):(yc(this,0),this.parent||rm(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Wa(this):this.scrollTrigger&&this.scrollTrigger.kill(!!yn),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,Lr&&Lr.vars.overwrite!==!0)._first||Wa(this),this.parent&&a!==this.timeline.totalDuration()&&_a(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=i?Ci(i):o,c=this._ptLookup,u=this._pt,d,h,f,m,_,p,g;if((!s||s==="all")&&Ig(o,l))return s==="all"&&(this._pt=0),Wa(this);for(d=this._op=this._op||[],s!=="all"&&(vn(s)&&(_={},Jn(s,function(x){return _[x]=1}),s=_),s=r_(o,s)),g=o.length;g--;)if(~l.indexOf(o[g])){h=c[g],s==="all"?(d[g]=s,m=h,f={}):(f=d[g]=d[g]||{},m=s);for(_ in m)p=h&&h[_],p&&((!("kill"in p.d)||p.d.kill(_)===!0)&&Sc(this,p,"_pt"),delete h[_]),f!=="all"&&(f[_]=1)}return this._initted&&!this._pt&&u&&Wa(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return to(1,arguments)},e.delayedCall=function(i,s,a,o){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},e.fromTo=function(i,s,a){return to(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,a){return Ht.killTweensOf(i,s,a)},e})(yo);Si(rn.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Jn("staggerTo,staggerFrom,staggerFromTo",function(r){rn[r]=function(){var e=new $n,t=wu.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var Wh=function(e,t,n){return e[t]=n},Tm=function(e,t,n){return e[t](n)},a_=function(e,t,n,i){return e[t](i.fp,n)},o_=function(e,t,n){return e.setAttribute(t,n)},Xh=function(e,t){return qt(e[t])?Tm:Nh(e[t])&&e.setAttribute?o_:Wh},wm=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},l_=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Am=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},Yh=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},c_=function(e,t,n,i){for(var s=this._pt,a;s;)a=s._next,s.p===i&&s.modifier(e,t,n),s=a},u_=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?Sc(this,t,"_pt"):t.dep||(n=1),t=i;return!n},h_=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},Rm=function(e){for(var t=e._pt,n,i,s,a;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:a)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:a=t,t=n}e._pt=s},Qn=(function(){function r(t,n,i,s,a,o,l,c,u){this.t=n,this.s=s,this.c=a,this.p=i,this.r=o||wm,this.d=l||this,this.set=c||Wh,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=h_,this.m=n,this.mt=s,this.tween=i},r})();Jn(zh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(r){return Bh[r]=1});xi.TweenMax=xi.TweenLite=rn;xi.TimelineLite=xi.TimelineMax=$n;Ht=new $n({sortChildren:!1,defaults:_o,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});vi.stringFilter=xm;var fs=[],Il={},f_=[],Qf=0,d_=0,Lc=function(e){return(Il[e]||f_).map(function(t){return t()})},Pu=function(){var e=Date.now(),t=[];e-Qf>2&&(Lc("matchMediaInit"),fs.forEach(function(n){var i=n.queries,s=n.conditions,a,o,l,c;for(o in i)a=Vi.matchMedia(i[o]).matches,a&&(l=1),a!==s[o]&&(s[o]=a,c=1);c&&(n.revert(),l&&t.push(n))}),Lc("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Qf=e,Lc("matchMedia"))},Cm=(function(){function r(t,n){this.selector=n&&Au(n),this.data=[],this._r=[],this.isReverted=!1,this.id=d_++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){qt(n)&&(s=i,i=n,n=qt);var a=this,o=function(){var c=Bt,u=a.selector,d;return c&&c!==a&&c.data.push(a),s&&(a.selector=Au(s)),Bt=a,d=i.apply(a,arguments),qt(d)&&a._r.push(d),Bt=c,a.selector=u,a.isReverted=!1,d};return a.last=o,n===qt?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},e.ignore=function(n){var i=Bt;Bt=null,n(this),Bt=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof rn&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?(function(){for(var o=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return o.splice(o.indexOf(u),1)}));for(o.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,d){return d.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof $n?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof rn)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i)for(var a=fs.length;a--;)fs[a].id===this.id&&fs.splice(a,1)},e.revert=function(n){this.kill(n||{})},r})(),p_=(function(){function r(t){this.contexts=[],this.scope=t,Bt&&Bt.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){er(n)||(n={matches:n});var a=new Cm(0,s||this.scope),o=a.conditions={},l,c,u;Bt&&!a.selector&&(a.selector=Bt.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(c in n)c==="all"?u=1:(l=Vi.matchMedia(n[c]),l&&(fs.indexOf(a)<0&&fs.push(a),(o[c]=l.matches)&&(u=1),l.addListener?l.addListener(Pu):l.addEventListener("change",Pu)));return u&&i(a,function(d){return a.add(null,d)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r})(),jl={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return gm(i)})},timeline:function(e){return new $n(e)},getTweensOf:function(e,t){return Ht.getTweensOf(e,t)},getProperty:function(e,t,n,i){vn(e)&&(e=Ci(e)[0]);var s=cs(e||{}).get,a=n?im:nm;return n==="native"&&(n=""),e&&(t?a((hi[t]&&hi[t].get||s)(e,t,n,i)):function(o,l,c){return a((hi[o]&&hi[o].get||s)(e,o,l,c))})},quickSetter:function(e,t,n){if(e=Ci(e),e.length>1){var i=e.map(function(u){return ni.quickSetter(u,t,n)}),s=i.length;return function(u){for(var d=s;d--;)i[d](u)}}e=e[0]||{};var a=hi[t],o=cs(e),l=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(u){var d=new a;ra._pt=0,d.init(e,n?u+n:u,ra,0,[e]),d.render(1,d),ra._pt&&Yh(1,ra)}:o.set(e,l);return a?c:function(u){return c(e,l,n?u+n:u,o,1)}},quickTo:function(e,t,n){var i,s=ni.to(e,Si((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),a=function(l,c,u){return s.resetTo(t,l,c,u)};return a.tween=s,a},isTweening:function(e){return Ht.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=hs(e.ease,_o.ease)),qf(_o,e||{})},config:function(e){return qf(vi,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,a=e.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!hi[o]&&!xi[o]&&vo(t+" effect requires "+o+" plugin.")}),Rc[t]=function(o,l,c){return n(Ci(o),Si(l||{},s),c)},a&&($n.prototype[t]=function(o,l,c){return this.add(Rc[t](o,er(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){gt[e]=hs(t)},parseEase:function(e,t){return arguments.length?hs(e,t):gt},getById:function(e){return Ht.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new $n(e),i,s;for(n.smoothChildTiming=Zn(e.smoothChildTiming),Ht.remove(n),n._dp=0,n._time=n._tTime=Ht._time,i=Ht._first;i;)s=i._next,(t||!(!i._dur&&i instanceof rn&&i.vars.onComplete===i._targets[0]))&&Yi(n,i,i._start-i._delay),i=s;return Yi(Ht,n,0),n},context:function(e,t){return e?new Cm(e,t):Bt},matchMedia:function(e){return new p_(e)},matchMediaRefresh:function(){return fs.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||Pu()},addEventListener:function(e,t){var n=Il[e]||(Il[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Il[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:Xg,wrapYoyo:Yg,distribute:um,random:fm,snap:hm,normalize:Wg,getUnit:Ln,clamp:kg,splitColor:_m,toArray:Ci,selector:Au,mapRange:pm,pipe:Gg,unitize:Vg,interpolate:qg,shuffle:cm},install:Jp,effects:Rc,ticker:di,updateRoot:$n.updateRoot,plugins:hi,globalTimeline:Ht,core:{PropTween:Qn,globals:Qp,Tween:rn,Timeline:$n,Animation:yo,getCache:cs,_removeLinkedListItem:Sc,reverting:function(){return yn},context:function(e){return e&&Bt&&(Bt.data.push(e),e._ctx=Bt),Bt},suppressOverwrites:function(e){return Ih=e}}};Jn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return jl[r]=rn[r]});di.add($n.updateRoot);ra=jl.to({},{duration:0});var m_=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},g_=function(e,t){var n=e._targets,i,s,a;for(i in t)for(s=n.length;s--;)a=e._ptLookup[s][i],a&&(a=a.d)&&(a._pt&&(a=m_(a,i)),a&&a.modifier&&a.modifier(t[i],e,n[s],i))},Ic=function(e,t){return{name:e,headless:1,rawVars:1,init:function(i,s,a){a._onInit=function(o){var l,c;if(vn(s)&&(l={},Jn(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}g_(o,s)}}}},ni=jl.registerPlugin({name:"attr",init:function(e,t,n,i,s){var a,o,l;this.tween=n;for(a in t)l=e.getAttribute(a)||"",o=this.add(e,"setAttribute",(l||0)+"",t[a],i,s,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)yn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Ic("roundProps",Ru),Ic("modifiers"),Ic("snap",hm))||jl;rn.version=$n.version=ni.version="3.15.0";Zp=1;Uh()&&va();gt.Power0;gt.Power1;gt.Power2;gt.Power3;gt.Power4;gt.Linear;gt.Quad;gt.Cubic;gt.Quart;gt.Quint;gt.Strong;gt.Elastic;gt.Back;gt.SteppedEase;gt.Bounce;gt.Sine;gt.Expo;gt.Circ;var jf,Ir,oa,qh,os,ed,$h,__=function(){return typeof window<"u"},Sr={},rs=180/Math.PI,la=Math.PI/180,Ds=Math.atan2,td=1e8,Kh=/([A-Z])/g,v_=/(left|right|width|margin|padding|x)/i,x_=/[\s,\(]\S/,qi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Du=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},S_=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},M_=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},y_=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},E_=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},Pm=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Dm=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},b_=function(e,t,n){return e.style[t]=n},T_=function(e,t,n){return e.style.setProperty(t,n)},w_=function(e,t,n){return e._gsap[t]=n},A_=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},R_=function(e,t,n,i,s){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},C_=function(e,t,n,i,s){var a=e._gsap;a[t]=n,a.renderTransform(s,a)},Gt="transform",jn=Gt+"Origin",P_=function r(e,t){var n=this,i=this.target,s=i.style,a=i._gsap;if(e in Sr&&s){if(this.tfm=this.tfm||{},e!=="transform")e=qi[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return n.tfm[o]=ur(i,o)}):this.tfm[e]=a.x?a[e]:ur(i,e),e===jn&&(this.tfm.zOrigin=a.zOrigin);else return qi.transform.split(",").forEach(function(o){return r.call(n,o,t)});if(this.props.indexOf(Gt)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(jn,t,"")),e=Gt}(s||t)&&this.props.push(e,t,s[e])},Lm=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},D_=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,a;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(Kh,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=$h(),(!s||!s.isStart)&&!n[Gt]&&(Lm(n),i.zOrigin&&n[jn]&&(n[jn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Im=function(e,t){var n={target:e,props:[],revert:D_,save:P_};return e._gsap||ni.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},Nm,Lu=function(e,t){var n=Ir.createElementNS?Ir.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Ir.createElement(e);return n&&n.style?n:Ir.createElement(e)},_i=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(Kh,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,xa(t)||t,1)||""},nd="O,Moz,ms,Ms,Webkit".split(","),xa=function(e,t,n){var i=t||os,s=i.style,a=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);a--&&!(nd[a]+e in s););return a<0?null:(a===3?"ms":a>=0?nd[a]:"")+e},Iu=function(){__()&&window.document&&(jf=window,Ir=jf.document,oa=Ir.documentElement,os=Lu("div")||{style:{}},Lu("div"),Gt=xa(Gt),jn=Gt+"Origin",os.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Nm=!!xa("perspective"),$h=ni.core.reverting,qh=1)},id=function(e){var t=e.ownerSVGElement,n=Lu("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),oa.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),oa.removeChild(n),s},rd=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Um=function(e){var t,n;try{t=e.getBBox()}catch{t=id(e),n=1}return t&&(t.width||t.height)||n||(t=id(e)),t&&!t.width&&!t.x&&!t.y?{x:+rd(e,["x","cx","x1"])||0,y:+rd(e,["y","cy","y1"])||0,width:0,height:0}:t},Fm=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Um(e))},Wr=function(e,t){if(t){var n=e.style,i;t in Sr&&t!==jn&&(t=Gt),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(Kh,"-$1").toLowerCase())):n.removeAttribute(t)}},Nr=function(e,t,n,i,s,a){var o=new Qn(e._pt,t,n,0,1,a?Dm:Pm);return e._pt=o,o.b=i,o.e=s,e._props.push(n),o},sd={deg:1,rad:1,turn:1},L_={grid:1,flex:1},Xr=function r(e,t,n,i){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=os.style,l=v_.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),d=100,h=i==="px",f=i==="%",m,_,p,g;if(i===a||!s||sd[i]||sd[a])return s;if(a!=="px"&&!h&&(s=r(e,t,n,"px")),g=e.getCTM&&Fm(e),(f||a==="%")&&(Sr[t]||~t.indexOf("adius")))return m=g?e.getBBox()[l?"width":"height"]:e[u],Kt(f?s/m*d:s/100*m);if(o[l?"width":"height"]=d+(h?a:i),_=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,g&&(_=(e.ownerSVGElement||{}).parentNode),(!_||_===Ir||!_.appendChild)&&(_=Ir.body),p=_._gsap,p&&f&&p.width&&l&&p.time===di.time&&!p.uncache)return Kt(s/p.width*d);if(f&&(t==="height"||t==="width")){var x=e.style[t];e.style[t]=d+i,m=e[u],x?e.style[t]=x:Wr(e,t)}else(f||a==="%")&&!L_[_i(_,"display")]&&(o.position=_i(e,"position")),_===e&&(o.position="static"),_.appendChild(os),m=os[u],_.removeChild(os),o.position="absolute";return l&&f&&(p=cs(_),p.time=di.time,p.width=_[u]),Kt(h?m*s/d:m&&s?d/m*s:0)},ur=function(e,t,n,i){var s;return qh||Iu(),t in qi&&t!=="transform"&&(t=qi[t],~t.indexOf(",")&&(t=t.split(",")[0])),Sr[t]&&t!=="transform"?(s=bo(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:tc(_i(e,jn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=ec[t]&&ec[t](e,t,n)||_i(e,t)||em(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Xr(e,t,s,n)+n:s},I_=function(e,t,n,i){if(!n||n==="none"){var s=xa(t,e,1),a=s&&_i(e,s,1);a&&a!==n?(t=s,n=a):t==="borderColor"&&(n=_i(e,"borderTopColor"))}var o=new Qn(this._pt,e.style,t,0,1,Am),l=0,c=0,u,d,h,f,m,_,p,g,x,w,S,b;if(o.b=n,o.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=_i(e,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=e.style[t],e.style[t]=i,i=_i(e,t)||i,_?e.style[t]=_:Wr(e,t)),u=[n,i],xm(u),n=u[0],i=u[1],h=n.match(ia)||[],b=i.match(ia)||[],b.length){for(;d=ia.exec(i);)p=d[0],x=i.substring(l,d.index),m?m=(m+1)%5:(x.substr(-5)==="rgba("||x.substr(-5)==="hsla(")&&(m=1),p!==(_=h[c++]||"")&&(f=parseFloat(_)||0,S=_.substr((f+"").length),p.charAt(1)==="="&&(p=aa(f,p)+S),g=parseFloat(p),w=p.substr((g+"").length),l=ia.lastIndex-w.length,w||(w=w||vi.units[t]||S,l===i.length&&(i+=w,o.e+=w)),S!==w&&(f=Xr(e,t,_,w)||0),o._pt={_next:o._pt,p:x||c===1?x:",",s:f,c:g-f,m:m&&m<4||t==="zIndex"?Math.round:0});o.c=l<i.length?i.substring(l,i.length):""}else o.r=t==="display"&&i==="none"?Dm:Pm;return Kp.test(i)&&(o.e=0),this._pt=o,o},ad={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},N_=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=ad[n]||n,t[1]=ad[i]||i,t.join(" ")},U_=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,a=n._gsap,o,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)o=s[c],Sr[o]&&(l=1,o=o==="transformOrigin"?jn:Gt),Wr(n,o);l&&(Wr(n,Gt),a&&(a.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",bo(n,1),a.uncache=1,Lm(i)))}},ec={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var a=e._pt=new Qn(e._pt,t,n,0,0,U_);return a.u=i,a.pr=-10,a.tween=s,e._props.push(n),1}}},Eo=[1,0,0,1,0,0],Om={},Bm=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},od=function(e){var t=_i(e,Gt);return Bm(t)?Eo:t.substr(7).match($p).map(Kt)},Zh=function(e,t){var n=e._gsap||cs(e),i=e.style,s=od(e),a,o,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Eo:s):(s===Eo&&!e.offsetParent&&e!==oa&&!n.svg&&(l=i.display,i.display="block",a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,oa.appendChild(e)),s=od(e),l?i.display=l:Wr(e,"display"),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):oa.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Nu=function(e,t,n,i,s,a){var o=e._gsap,l=s||Zh(e,!0),c=o.xOrigin||0,u=o.yOrigin||0,d=o.xOffset||0,h=o.yOffset||0,f=l[0],m=l[1],_=l[2],p=l[3],g=l[4],x=l[5],w=t.split(" "),S=parseFloat(w[0])||0,b=parseFloat(w[1])||0,T,v,M,C;n?l!==Eo&&(v=f*p-m*_)&&(M=S*(p/v)+b*(-_/v)+(_*x-p*g)/v,C=S*(-m/v)+b*(f/v)-(f*x-m*g)/v,S=M,b=C):(T=Um(e),S=T.x+(~w[0].indexOf("%")?S/100*T.width:S),b=T.y+(~(w[1]||w[0]).indexOf("%")?b/100*T.height:b)),i||i!==!1&&o.smooth?(g=S-c,x=b-u,o.xOffset=d+(g*f+x*_)-g,o.yOffset=h+(g*m+x*p)-x):o.xOffset=o.yOffset=0,o.xOrigin=S,o.yOrigin=b,o.smooth=!!i,o.origin=t,o.originIsAbsolute=!!n,e.style[jn]="0px 0px",a&&(Nr(a,o,"xOrigin",c,S),Nr(a,o,"yOrigin",u,b),Nr(a,o,"xOffset",d,o.xOffset),Nr(a,o,"yOffset",h,o.yOffset)),e.setAttribute("data-svg-origin",S+" "+b)},bo=function(e,t){var n=e._gsap||new Mm(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,a="px",o="deg",l=getComputedStyle(e),c=_i(e,jn)||"0",u,d,h,f,m,_,p,g,x,w,S,b,T,v,M,C,A,U,I,H,D,z,X,F,Q,W,P,q,le,Ee,Y,ae;return u=d=h=_=p=g=x=w=S=0,f=m=1,n.svg=!!(e.getCTM&&Fm(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Gt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Gt]!=="none"?l[Gt]:"")),i.scale=i.rotate=i.translate="none"),v=Zh(e,n.svg),n.svg&&(n.uncache?(Q=e.getBBox(),c=n.xOrigin-Q.x+"px "+(n.yOrigin-Q.y)+"px",F=""):F=!t&&e.getAttribute("data-svg-origin"),Nu(e,F||c,!!F||n.originIsAbsolute,n.smooth!==!1,v)),b=n.xOrigin||0,T=n.yOrigin||0,v!==Eo&&(U=v[0],I=v[1],H=v[2],D=v[3],u=z=v[4],d=X=v[5],v.length===6?(f=Math.sqrt(U*U+I*I),m=Math.sqrt(D*D+H*H),_=U||I?Ds(I,U)*rs:0,x=H||D?Ds(H,D)*rs+_:0,x&&(m*=Math.abs(Math.cos(x*la))),n.svg&&(u-=b-(b*U+T*H),d-=T-(b*I+T*D))):(ae=v[6],Ee=v[7],P=v[8],q=v[9],le=v[10],Y=v[11],u=v[12],d=v[13],h=v[14],M=Ds(ae,le),p=M*rs,M&&(C=Math.cos(-M),A=Math.sin(-M),F=z*C+P*A,Q=X*C+q*A,W=ae*C+le*A,P=z*-A+P*C,q=X*-A+q*C,le=ae*-A+le*C,Y=Ee*-A+Y*C,z=F,X=Q,ae=W),M=Ds(-H,le),g=M*rs,M&&(C=Math.cos(-M),A=Math.sin(-M),F=U*C-P*A,Q=I*C-q*A,W=H*C-le*A,Y=D*A+Y*C,U=F,I=Q,H=W),M=Ds(I,U),_=M*rs,M&&(C=Math.cos(M),A=Math.sin(M),F=U*C+I*A,Q=z*C+X*A,I=I*C-U*A,X=X*C-z*A,U=F,z=Q),p&&Math.abs(p)+Math.abs(_)>359.9&&(p=_=0,g=180-g),f=Kt(Math.sqrt(U*U+I*I+H*H)),m=Kt(Math.sqrt(X*X+ae*ae)),M=Ds(z,X),x=Math.abs(M)>2e-4?M*rs:0,S=Y?1/(Y<0?-Y:Y):0),n.svg&&(F=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!Bm(_i(e,Gt)),F&&e.setAttribute("transform",F))),Math.abs(x)>90&&Math.abs(x)<270&&(s?(f*=-1,x+=_<=0?180:-180,_+=_<=0?180:-180):(m*=-1,x+=x<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=d-((n.yPercent=d&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=h+a,n.scaleX=Kt(f),n.scaleY=Kt(m),n.rotation=Kt(_)+o,n.rotationX=Kt(p)+o,n.rotationY=Kt(g)+o,n.skewX=x+o,n.skewY=w+o,n.transformPerspective=S+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[jn]=tc(c)),n.xOffset=n.yOffset=0,n.force3D=vi.force3D,n.renderTransform=n.svg?O_:Nm?zm:F_,n.uncache=0,n},tc=function(e){return(e=e.split(" "))[0]+" "+e[1]},Nc=function(e,t,n){var i=Ln(t);return Kt(parseFloat(t)+parseFloat(Xr(e,"x",n+"px",i)))+i},F_=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,zm(e,t)},Qr="0deg",Ca="0px",jr=") ",zm=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,u=n.rotationY,d=n.rotationX,h=n.skewX,f=n.skewY,m=n.scaleX,_=n.scaleY,p=n.transformPerspective,g=n.force3D,x=n.target,w=n.zOrigin,S="",b=g==="auto"&&e&&e!==1||g===!0;if(w&&(d!==Qr||u!==Qr)){var T=parseFloat(u)*la,v=Math.sin(T),M=Math.cos(T),C;T=parseFloat(d)*la,C=Math.cos(T),a=Nc(x,a,v*C*-w),o=Nc(x,o,-Math.sin(T)*-w),l=Nc(x,l,M*C*-w+w)}p!==Ca&&(S+="perspective("+p+jr),(i||s)&&(S+="translate("+i+"%, "+s+"%) "),(b||a!==Ca||o!==Ca||l!==Ca)&&(S+=l!==Ca||b?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+jr),c!==Qr&&(S+="rotate("+c+jr),u!==Qr&&(S+="rotateY("+u+jr),d!==Qr&&(S+="rotateX("+d+jr),(h!==Qr||f!==Qr)&&(S+="skew("+h+", "+f+jr),(m!==1||_!==1)&&(S+="scale("+m+", "+_+jr),x.style[Gt]=S||"translate(0, 0)"},O_=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,u=n.skewY,d=n.scaleX,h=n.scaleY,f=n.target,m=n.xOrigin,_=n.yOrigin,p=n.xOffset,g=n.yOffset,x=n.forceCSS,w=parseFloat(a),S=parseFloat(o),b,T,v,M,C;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=la,c*=la,b=Math.cos(l)*d,T=Math.sin(l)*d,v=Math.sin(l-c)*-h,M=Math.cos(l-c)*h,c&&(u*=la,C=Math.tan(c-u),C=Math.sqrt(1+C*C),v*=C,M*=C,u&&(C=Math.tan(u),C=Math.sqrt(1+C*C),b*=C,T*=C)),b=Kt(b),T=Kt(T),v=Kt(v),M=Kt(M)):(b=d,M=h,T=v=0),(w&&!~(a+"").indexOf("px")||S&&!~(o+"").indexOf("px"))&&(w=Xr(f,"x",a,"px"),S=Xr(f,"y",o,"px")),(m||_||p||g)&&(w=Kt(w+m-(m*b+_*v)+p),S=Kt(S+_-(m*T+_*M)+g)),(i||s)&&(C=f.getBBox(),w=Kt(w+i/100*C.width),S=Kt(S+s/100*C.height)),C="matrix("+b+","+T+","+v+","+M+","+w+","+S+")",f.setAttribute("transform",C),x&&(f.style[Gt]=C)},B_=function(e,t,n,i,s){var a=360,o=vn(s),l=parseFloat(s)*(o&&~s.indexOf("rad")?rs:1),c=l-i,u=i+c+"deg",d,h;return o&&(d=s.split("_")[1],d==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),d==="cw"&&c<0?c=(c+a*td)%a-~~(c/a)*a:d==="ccw"&&c>0&&(c=(c-a*td)%a-~~(c/a)*a)),e._pt=h=new Qn(e._pt,t,n,i,c,S_),h.e=u,h.u="deg",e._props.push(n),h},ld=function(e,t){for(var n in t)e[n]=t[n];return e},z_=function(e,t,n){var i=ld({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,u,d,h,f,m;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[Gt]=t,o=bo(n,1),Wr(n,Gt),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Gt],a[Gt]=t,o=bo(n,1),a[Gt]=c);for(l in Sr)c=i[l],u=o[l],c!==u&&s.indexOf(l)<0&&(f=Ln(c),m=Ln(u),d=f!==m?Xr(n,l,c,m):parseFloat(c),h=parseFloat(u),e._pt=new Qn(e._pt,o,l,d,h-d,Du),e._pt.u=m||0,e._props.push(l));ld(o,i)};Jn("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",a=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(o){return e<2?r+o:"border"+o+r});ec[e>1?"border"+r:r]=function(o,l,c,u,d){var h,f;if(arguments.length<4)return h=a.map(function(m){return ur(o,m,c)}),f=h.join(" "),f.split(h[0]).length===5?h[0]:f;h=(u+"").split(" "),f={},a.forEach(function(m,_){return f[m]=h[_]=h[_]||h[(_-1)/2|0]}),o.init(l,f,d)}});var km={name:"css",register:Iu,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var a=this._props,o=e.style,l=n.vars.startAt,c,u,d,h,f,m,_,p,g,x,w,S,b,T,v,M,C;qh||Iu(),this.styles=this.styles||Im(e),M=this.styles.props,this.tween=n;for(_ in t)if(_!=="autoRound"&&(u=t[_],!(hi[_]&&ym(_,t,n,i,e,s)))){if(f=typeof u,m=ec[_],f==="function"&&(u=u.call(n,i,e,s),f=typeof u),f==="string"&&~u.indexOf("random(")&&(u=So(u)),m)m(this,e,_,u,n)&&(v=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(_)+"").trim(),u+="",Hr.lastIndex=0,Hr.test(c)||(p=Ln(c),g=Ln(u),g?p!==g&&(c=Xr(e,_,c,g)+g):p&&(u+=p)),this.add(o,"setProperty",c,u,i,s,0,0,_),a.push(_),M.push(_,0,o[_]);else if(f!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,e,s):l[_],vn(c)&&~c.indexOf("random(")&&(c=So(c)),Ln(c+"")||c==="auto"||(c+=vi.units[_]||Ln(ur(e,_))||""),(c+"").charAt(1)==="="&&(c=ur(e,_))):c=ur(e,_),h=parseFloat(c),x=f==="string"&&u.charAt(1)==="="&&u.substr(0,2),x&&(u=u.substr(2)),d=parseFloat(u),_ in qi&&(_==="autoAlpha"&&(h===1&&ur(e,"visibility")==="hidden"&&d&&(h=0),M.push("visibility",0,o.visibility),Nr(this,o,"visibility",h?"inherit":"hidden",d?"inherit":"hidden",!d)),_!=="scale"&&_!=="transform"&&(_=qi[_],~_.indexOf(",")&&(_=_.split(",")[0]))),w=_ in Sr,w){if(this.styles.save(_),C=u,f==="string"&&u.substring(0,6)==="var(--"){if(u=_i(e,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var A=e.style.perspective;e.style.perspective=u,u=_i(e,"perspective"),A?e.style.perspective=A:Wr(e,"perspective")}d=parseFloat(u)}if(S||(b=e._gsap,b.renderTransform&&!t.parseTransform||bo(e,t.parseTransform),T=t.smoothOrigin!==!1&&b.smooth,S=this._pt=new Qn(this._pt,o,Gt,0,1,b.renderTransform,b,0,-1),S.dep=1),_==="scale")this._pt=new Qn(this._pt,b,"scaleY",b.scaleY,(x?aa(b.scaleY,x+d):d)-b.scaleY||0,Du),this._pt.u=0,a.push("scaleY",_),_+="X";else if(_==="transformOrigin"){M.push(jn,0,o[jn]),u=N_(u),b.svg?Nu(e,u,0,T,0,this):(g=parseFloat(u.split(" ")[2])||0,g!==b.zOrigin&&Nr(this,b,"zOrigin",b.zOrigin,g),Nr(this,o,_,tc(c),tc(u)));continue}else if(_==="svgOrigin"){Nu(e,u,1,T,0,this);continue}else if(_ in Om){B_(this,b,_,h,x?aa(h,x+u):u);continue}else if(_==="smoothOrigin"){Nr(this,b,"smooth",b.smooth,u);continue}else if(_==="force3D"){b[_]=u;continue}else if(_==="transform"){z_(this,u,e);continue}}else _ in o||(_=xa(_)||_);if(w||(d||d===0)&&(h||h===0)&&!x_.test(u)&&_ in o)p=(c+"").substr((h+"").length),d||(d=0),g=Ln(u)||(_ in vi.units?vi.units[_]:p),p!==g&&(h=Xr(e,_,c,g)),this._pt=new Qn(this._pt,w?b:o,_,h,(x?aa(h,x+d):d)-h,!w&&(g==="px"||_==="zIndex")&&t.autoRound!==!1?E_:Du),this._pt.u=g||0,w&&C!==u?(this._pt.b=c,this._pt.e=C,this._pt.r=y_):p!==g&&g!=="%"&&(this._pt.b=c,this._pt.r=M_);else if(_ in o)I_.call(this,e,_,c,x?x+u:u);else if(_ in e)this.add(e,_,c||e[_],x?x+u:u,i,s);else if(_!=="parseTransform"){Oh(_,u);continue}w||(_ in o?M.push(_,0,o[_]):typeof e[_]=="function"?M.push(_,2,e[_]()):M.push(_,1,c||e[_])),a.push(_)}}v&&Rm(this)},render:function(e,t){if(t.tween._time||!$h())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:ur,aliases:qi,getSetter:function(e,t,n){var i=qi[t];return i&&i.indexOf(",")<0&&(t=i),t in Sr&&t!==jn&&(e._gsap.x||ur(e,"x"))?n&&ed===n?t==="scale"?A_:w_:(ed=n||{})&&(t==="scale"?R_:C_):e.style&&!Nh(e.style[t])?b_:~t.indexOf("-")?T_:Xh(e,t)},core:{_removeProperty:Wr,_getMatrix:Zh}};ni.utils.checkPrefix=xa;ni.core.getStyleSaver=Im;(function(r,e,t,n){var i=Jn(r+","+e+","+t,function(s){Sr[s]=1});Jn(e,function(s){vi.units[s]="deg",Om[s]=1}),qi[i[13]]=r+","+e,Jn(n,function(s){var a=s.split(":");qi[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Jn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){vi.units[r]="px"});ni.registerPlugin(km);var It=ni.registerPlugin(km)||ni;It.core.Tween;function k_(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function H_(r,e,t){return e&&k_(r.prototype,e),r}var Sn,Nl,pi,Ur,Fr,ca,Hm,ss,ua,Gm,fr,Ui,Vm,Wm=function(){return Sn||typeof window<"u"&&(Sn=window.gsap)&&Sn.registerPlugin&&Sn},Xm=1,sa=[],ot=[],Qi=[],io=Date.now,Uu=function(e,t){return t},G_=function(){var e=ua.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,ot),i.push.apply(i,Qi),ot=n,Qi=i,Uu=function(a,o){return t[a](o)}},Gr=function(e,t){return~Qi.indexOf(e)&&Qi[Qi.indexOf(e)+1][t]},ro=function(e){return!!~Gm.indexOf(e)},Hn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},zn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},ko="scrollLeft",Ho="scrollTop",Fu=function(){return fr&&fr.isPressed||ot.cache++},nc=function(e,t){var n=function i(s){if(s||s===0){Xm&&(pi.history.scrollRestoration="manual");var a=fr&&fr.isPressed;s=i.v=Math.round(s)||(fr&&fr.iOS?1:0),e(s),i.cacheID=ot.cache,a&&Uu("ss",s)}else(t||ot.cache!==i.cacheID||Uu("ref"))&&(i.cacheID=ot.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},Yn={s:ko,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:nc(function(r){return arguments.length?pi.scrollTo(r,cn.sc()):pi.pageXOffset||Ur[ko]||Fr[ko]||ca[ko]||0})},cn={s:Ho,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Yn,sc:nc(function(r){return arguments.length?pi.scrollTo(Yn.sc(),r):pi.pageYOffset||Ur[Ho]||Fr[Ho]||ca[Ho]||0})},qn=function(e,t){return(t&&t._ctx&&t._ctx.selector||Sn.utils.toArray)(e)[0]||(typeof e=="string"&&Sn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},V_=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},Yr=function(e,t){var n=t.s,i=t.sc;ro(e)&&(e=Ur.scrollingElement||Fr);var s=ot.indexOf(e),a=i===cn.sc?1:2;!~s&&(s=ot.push(e)-1),ot[s+a]||Hn(e,"scroll",Fu);var o=ot[s+a],l=o||(ot[s+a]=nc(Gr(e,n),!0)||(ro(e)?i:nc(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,o||(l.smooth=Sn.getProperty(e,"scrollBehavior")==="smooth"),l},Ou=function(e,t,n){var i=e,s=e,a=io(),o=a,l=t||50,c=Math.max(500,l*3),u=function(m,_){var p=io();_||p-a>l?(s=i,i=m,o=a,a=p):n?i+=m:i=s+(m-s)/(p-o)*(a-o)},d=function(){s=i=n?0:i,o=a=0},h=function(m){var _=o,p=s,g=io();return(m||m===0)&&m!==i&&u(m),a===o||g-o>c?0:(i+(n?p:-p))/((n?g:a)-_)*1e3};return{update:u,reset:d,getVelocity:h}},Pa=function(e,t){return t&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},cd=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},Ym=function(){ua=Sn.core.globals().ScrollTrigger,ua&&ua.core&&G_()},qm=function(e){return Sn=e||Wm(),!Nl&&Sn&&typeof document<"u"&&document.body&&(pi=window,Ur=document,Fr=Ur.documentElement,ca=Ur.body,Gm=[pi,Ur,Fr,ca],Sn.utils.clamp,Vm=Sn.core.context||function(){},ss="onpointerenter"in ca?"pointer":"mouse",Hm=Zt.isTouch=pi.matchMedia&&pi.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in pi||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Ui=Zt.eventTypes=("ontouchstart"in Fr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Fr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Xm=0},500),Nl=1),ua||Ym(),Nl};Yn.op=cn;ot.cache=0;var Zt=(function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){Nl||qm(Sn)||console.warn("Please gsap.registerPlugin(Observer)"),ua||Ym();var i=n.tolerance,s=n.dragMinimum,a=n.type,o=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,d=n.onStop,h=n.onStopDelay,f=n.ignore,m=n.wheelSpeed,_=n.event,p=n.onDragStart,g=n.onDragEnd,x=n.onDrag,w=n.onPress,S=n.onRelease,b=n.onRight,T=n.onLeft,v=n.onUp,M=n.onDown,C=n.onChangeX,A=n.onChangeY,U=n.onChange,I=n.onToggleX,H=n.onToggleY,D=n.onHover,z=n.onHoverEnd,X=n.onMove,F=n.ignoreCheck,Q=n.isNormalizer,W=n.onGestureStart,P=n.onGestureEnd,q=n.onWheel,le=n.onEnable,Ee=n.onDisable,Y=n.onClick,ae=n.scrollSpeed,_e=n.capture,Me=n.allowClicks,ce=n.lockAxis,pe=n.onLockAxis;this.target=o=qn(o)||Fr,this.vars=n,f&&(f=Sn.utils.toArray(f)),i=i||1e-9,s=s||0,m=m||1,ae=ae||1,a=a||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(pi.getComputedStyle(ca).lineHeight)||22);var Ye,se,Pe,Le,Ie,ut,st,K=this,it=0,Ae=0,De=n.passive||!u&&n.passive!==!1,Ne=Yr(o,Yn),$e=Yr(o,cn),wt=Ne(),B=$e(),et=~a.indexOf("touch")&&!~a.indexOf("pointer")&&Ui[0]==="pointerdown",tt=ro(o),Xe=o.ownerDocument||Ur,ge=[0,0,0],ft=[0,0,0],Fe=0,We=function(){return Fe=io()},R=function(Se,re){return(K.event=Se)&&f&&V_(Se.target,f)||re&&et&&Se.pointerType!=="touch"||F&&F(Se,re)},y=function(){K._vx.reset(),K._vy.reset(),se.pause(),d&&d(K)},G=function(){var Se=K.deltaX=cd(ge),re=K.deltaY=cd(ft),te=Math.abs(Se)>=i,ye=Math.abs(re)>=i;U&&(te||ye)&&U(K,Se,re,ge,ft),te&&(b&&K.deltaX>0&&b(K),T&&K.deltaX<0&&T(K),C&&C(K),I&&K.deltaX<0!=it<0&&I(K),it=K.deltaX,ge[0]=ge[1]=ge[2]=0),ye&&(M&&K.deltaY>0&&M(K),v&&K.deltaY<0&&v(K),A&&A(K),H&&K.deltaY<0!=Ae<0&&H(K),Ae=K.deltaY,ft[0]=ft[1]=ft[2]=0),(Le||Pe)&&(X&&X(K),Pe&&(p&&Pe===1&&p(K),x&&x(K),Pe=0),Le=!1),ut&&!(ut=!1)&&pe&&pe(K),Ie&&(q(K),Ie=!1),Ye=0},oe=function(Se,re,te){ge[te]+=Se,ft[te]+=re,K._vx.update(Se),K._vy.update(re),c?Ye||(Ye=requestAnimationFrame(G)):G()},ie=function(Se,re){ce&&!st&&(K.axis=st=Math.abs(Se)>Math.abs(re)?"x":"y",ut=!0),st!=="y"&&(ge[2]+=Se,K._vx.update(Se,!0)),st!=="x"&&(ft[2]+=re,K._vy.update(re,!0)),c?Ye||(Ye=requestAnimationFrame(G)):G()},ue=function(Se){if(!R(Se,1)){Se=Pa(Se,u);var re=Se.clientX,te=Se.clientY,ye=re-K.x,ne=te-K.y,Re=K.isDragging;K.x=re,K.y=te,(Re||(ye||ne)&&(Math.abs(K.startX-re)>=s||Math.abs(K.startY-te)>=s))&&(Pe||(Pe=Re?2:1),Re||(K.isDragging=!0),ie(ye,ne))}},me=K.onPress=function(he){R(he,1)||he&&he.button||(K.axis=st=null,se.pause(),K.isPressed=!0,he=Pa(he),it=Ae=0,K.startX=K.x=he.clientX,K.startY=K.y=he.clientY,K._vx.reset(),K._vy.reset(),Hn(Q?o:Xe,Ui[1],ue,De,!0),K.deltaX=K.deltaY=0,w&&w(K))},k=K.onRelease=function(he){if(!R(he,1)){zn(Q?o:Xe,Ui[1],ue,!0);var Se=!isNaN(K.y-K.startY),re=K.isDragging,te=re&&(Math.abs(K.x-K.startX)>3||Math.abs(K.y-K.startY)>3),ye=Pa(he);!te&&Se&&(K._vx.reset(),K._vy.reset(),u&&Me&&Sn.delayedCall(.08,function(){if(io()-Fe>300&&!he.defaultPrevented){if(he.target.click)he.target.click();else if(Xe.createEvent){var ne=Xe.createEvent("MouseEvents");ne.initMouseEvent("click",!0,!0,pi,1,ye.screenX,ye.screenY,ye.clientX,ye.clientY,!1,!1,!1,!1,0,null),he.target.dispatchEvent(ne)}}})),K.isDragging=K.isGesturing=K.isPressed=!1,d&&re&&!Q&&se.restart(!0),Pe&&G(),g&&re&&g(K),S&&S(K,te)}},j=function(Se){return Se.touches&&Se.touches.length>1&&(K.isGesturing=!0)&&W(Se,K.isDragging)},fe=function(){return(K.isGesturing=!1)||P(K)},N=function(Se){if(!R(Se)){var re=Ne(),te=$e();oe((re-wt)*ae,(te-B)*ae,1),wt=re,B=te,d&&se.restart(!0)}},ee=function(Se){if(!R(Se)){Se=Pa(Se,u),q&&(Ie=!0);var re=(Se.deltaMode===1?l:Se.deltaMode===2?pi.innerHeight:1)*m;oe(Se.deltaX*re,Se.deltaY*re,0),d&&!Q&&se.restart(!0)}},J=function(Se){if(!R(Se)){var re=Se.clientX,te=Se.clientY,ye=re-K.x,ne=te-K.y;K.x=re,K.y=te,Le=!0,d&&se.restart(!0),(ye||ne)&&ie(ye,ne)}},ve=function(Se){K.event=Se,D(K)},de=function(Se){K.event=Se,z(K)},xe=function(Se){return R(Se)||Pa(Se,u)&&Y(K)};se=K._dc=Sn.delayedCall(h||.25,y).pause(),K.deltaX=K.deltaY=0,K._vx=Ou(0,50,!0),K._vy=Ou(0,50,!0),K.scrollX=Ne,K.scrollY=$e,K.isDragging=K.isGesturing=K.isPressed=!1,Vm(this),K.enable=function(he){return K.isEnabled||(Hn(tt?Xe:o,"scroll",Fu),a.indexOf("scroll")>=0&&Hn(tt?Xe:o,"scroll",N,De,_e),a.indexOf("wheel")>=0&&Hn(o,"wheel",ee,De,_e),(a.indexOf("touch")>=0&&Hm||a.indexOf("pointer")>=0)&&(Hn(o,Ui[0],me,De,_e),Hn(Xe,Ui[2],k),Hn(Xe,Ui[3],k),Me&&Hn(o,"click",We,!0,!0),Y&&Hn(o,"click",xe),W&&Hn(Xe,"gesturestart",j),P&&Hn(Xe,"gestureend",fe),D&&Hn(o,ss+"enter",ve),z&&Hn(o,ss+"leave",de),X&&Hn(o,ss+"move",J)),K.isEnabled=!0,K.isDragging=K.isGesturing=K.isPressed=Le=Pe=!1,K._vx.reset(),K._vy.reset(),wt=Ne(),B=$e(),he&&he.type&&me(he),le&&le(K)),K},K.disable=function(){K.isEnabled&&(sa.filter(function(he){return he!==K&&ro(he.target)}).length||zn(tt?Xe:o,"scroll",Fu),K.isPressed&&(K._vx.reset(),K._vy.reset(),zn(Q?o:Xe,Ui[1],ue,!0)),zn(tt?Xe:o,"scroll",N,_e),zn(o,"wheel",ee,_e),zn(o,Ui[0],me,_e),zn(Xe,Ui[2],k),zn(Xe,Ui[3],k),zn(o,"click",We,!0),zn(o,"click",xe),zn(Xe,"gesturestart",j),zn(Xe,"gestureend",fe),zn(o,ss+"enter",ve),zn(o,ss+"leave",de),zn(o,ss+"move",J),K.isEnabled=K.isPressed=K.isDragging=!1,Ee&&Ee(K))},K.kill=K.revert=function(){K.disable();var he=sa.indexOf(K);he>=0&&sa.splice(he,1),fr===K&&(fr=0)},sa.push(K),Q&&ro(o)&&(fr=K),K.enable(_)},H_(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r})();Zt.version="3.15.0";Zt.create=function(r){return new Zt(r)};Zt.register=qm;Zt.getAll=function(){return sa.slice()};Zt.getById=function(r){return sa.filter(function(e){return e.vars.id===r})[0]};Wm()&&Sn.registerPlugin(Zt);var Ue,js,at,bt,fi,Et,Jh,ic,To,so,Ya,Go,Cn,Ec,Bu,Wn,ud,hd,ea,$m,Uc,Km,Vn,zu,Zm,Jm,Cr,ku,Qh,ha,jh,ao,Hu,Fc,Vo=1,Pn=Date.now,Oc=Pn(),Pi=0,qa=0,fd=function(e,t,n){var i=ui(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},dd=function(e,t){return t&&(!ui(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},W_=function r(){return qa&&requestAnimationFrame(r)},pd=function(){return Ec=1},md=function(){return Ec=0},Wi=function(e){return e},$a=function(e){return Math.round(e*1e5)/1e5||0},Qm=function(){return typeof window<"u"},jm=function(){return Ue||Qm()&&(Ue=window.gsap)&&Ue.registerPlugin&&Ue},_s=function(e){return!!~Jh.indexOf(e)},e0=function(e){return(e==="Height"?jh:at["inner"+e])||fi["client"+e]||Et["client"+e]},t0=function(e){return Gr(e,"getBoundingClientRect")||(_s(e)?function(){return zl.width=at.innerWidth,zl.height=jh,zl}:function(){return hr(e)})},X_=function(e,t,n){var i=n.d,s=n.d2,a=n.a;return(a=Gr(e,"getBoundingClientRect"))?function(){return a()[i]}:function(){return(t?e0(s):e["client"+s])||0}},Y_=function(e,t){return!t||~Qi.indexOf(e)?t0(e):function(){return zl}},$i=function(e,t){var n=t.s,i=t.d2,s=t.d,a=t.a;return Math.max(0,(n="scroll"+i)&&(a=Gr(e,n))?a()-t0(e)()[s]:_s(e)?(fi[n]||Et[n])-e0(i):e[n]-e["offset"+i])},Wo=function(e,t){for(var n=0;n<ea.length;n+=3)(!t||~t.indexOf(ea[n+1]))&&e(ea[n],ea[n+1],ea[n+2])},ui=function(e){return typeof e=="string"},In=function(e){return typeof e=="function"},Ka=function(e){return typeof e=="number"},as=function(e){return typeof e=="object"},Da=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},Ls=function(e,t,n){if(e.enabled){var i=e._ctx?e._ctx.add(function(){return t(e,n)}):t(e,n);i&&i.totalTime&&(e.callbackAnimation=i)}},Is=Math.abs,n0="left",i0="top",ef="right",tf="bottom",ds="width",ps="height",oo="Right",lo="Left",co="Top",uo="Bottom",tn="padding",bi="margin",Sa="Width",nf="Height",ln="px",Ti=function(e){return at.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},q_=function(e){var t=Ti(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},gd=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},hr=function(e,t){var n=t&&Ti(e)[Bu]!=="matrix(1, 0, 0, 1, 0, 0)"&&Ue.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),i},rc=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},r0=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},$_=function(e){return function(t){return Ue.utils.snap(r0(e),t)}},rf=function(e){var t=Ue.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,a){a===void 0&&(a=.001);var o;if(!s)return t(i);if(s>0){for(i-=a,o=0;o<n.length;o++)if(n[o]>=i)return n[o];return n[o-1]}else for(o=n.length,i+=a;o--;)if(n[o]<=i)return n[o];return n[0]}:function(i,s,a){a===void 0&&(a=.001);var o=t(i);return!s||Math.abs(o-i)<a||o-i<0==s<0?o:t(s<0?i-e:i+e)}},K_=function(e){return function(t,n){return rf(r0(e))(t,n.direction)}},Xo=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},_n=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},gn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Yo=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},_d={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},qo={toggleActions:"play",anticipatePin:0},sc={top:0,left:0,center:.5,bottom:1,right:1},Ul=function(e,t){if(ui(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in sc?sc[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},$o=function(e,t,n,i,s,a,o,l){var c=s.startColor,u=s.endColor,d=s.fontSize,h=s.indent,f=s.fontWeight,m=bt.createElement("div"),_=_s(n)||Gr(n,"pinType")==="fixed",p=e.indexOf("scroller")!==-1,g=_?Et:n.tagName==="IFRAME"?n.contentDocument.body:n,x=e.indexOf("start")!==-1,w=x?c:u,S="border-color:"+w+";font-size:"+d+";color:"+w+";font-weight:"+f+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return S+="position:"+((p||l)&&_?"fixed;":"absolute;"),(p||l||!_)&&(S+=(i===cn?ef:tf)+":"+(a+parseFloat(h))+"px;"),o&&(S+="box-sizing:border-box;text-align:left;width:"+o.offsetWidth+"px;"),m._isStart=x,m.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),m.style.cssText=S,m.innerText=t||t===0?e+"-"+t:e,g.children[0]?g.insertBefore(m,g.children[0]):g.appendChild(m),m._offset=m["offset"+i.op.d2],Fl(m,0,i,x),m},Fl=function(e,t,n,i){var s={display:"block"},a=n[i?"os2":"p2"],o=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+a+Sa]=1,s["border"+o+Sa]=0,s[n.p]=t+"px",Ue.set(e,s)},rt=[],Gu={},wo,vd=function(){return Pn()-Pi>34&&(wo||(wo=requestAnimationFrame(gr)))},Ns=function(){(!Vn||!Vn.isPressed||Vn.startX>Et.clientWidth)&&(ot.cache++,Vn?wo||(wo=requestAnimationFrame(gr)):gr(),Pi||xs("scrollStart"),Pi=Pn())},Bc=function(){Jm=at.innerWidth,Zm=at.innerHeight},Za=function(e){ot.cache++,(e===!0||!Cn&&!Km&&!bt.fullscreenElement&&!bt.webkitFullscreenElement&&(!zu||Jm!==at.innerWidth||Math.abs(at.innerHeight-Zm)>at.innerHeight*.25))&&ic.restart(!0)},vs={},Z_=[],s0=function r(){return gn(Ke,"scrollEnd",r)||ls(!0)},xs=function(e){return vs[e]&&vs[e].map(function(t){return t()})||Z_},ci=[],a0=function(e){for(var t=0;t<ci.length;t+=5)(!e||ci[t+4]&&ci[t+4].query===e)&&(ci[t].style.cssText=ci[t+1],ci[t].getBBox&&ci[t].setAttribute("transform",ci[t+2]||""),ci[t+3].uncache=1)},o0=function(){return ot.forEach(function(e){return In(e)&&++e.cacheID&&(e.rec=e())})},sf=function(e,t){var n;for(Wn=0;Wn<rt.length;Wn++)n=rt[Wn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));ao=!0,t&&a0(t),t||xs("revert")},l0=function(e,t){ot.cache++,(t||!Xn)&&ot.forEach(function(n){return In(n)&&n.cacheID++&&(n.rec=0)}),ui(e)&&(at.history.scrollRestoration=Qh=e)},Xn,ms=0,xd,J_=function(){if(xd!==ms){var e=xd=ms;requestAnimationFrame(function(){return e===ms&&ls(!0)})}},c0=function(){Et.appendChild(ha),jh=!Vn&&ha.offsetHeight||at.innerHeight,Et.removeChild(ha)},Sd=function(e){return To(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},ls=function(e,t){if(fi=bt.documentElement,Et=bt.body,Jh=[at,bt,fi,Et],Pi&&!e&&!ao){_n(Ke,"scrollEnd",s0);return}c0(),Xn=Ke.isRefreshing=!0,ao||o0();var n=xs("refreshInit");$m&&Ke.sort(),t||sf(),ot.forEach(function(i){In(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),rt.slice(0).forEach(function(i){return i.refresh()}),ao=!1,rt.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",a=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-a),i.refresh()}}),Hu=1,Sd(!0),rt.forEach(function(i){var s=$i(i.scroller,i._dir),a=i.vars.end==="max"||i._endClamp&&i.end>s,o=i._startClamp&&i.start>=s;(a||o)&&i.setPositions(o?s-1:i.start,a?Math.max(o?s:i.start+1,s):i.end,!0)}),Sd(!1),Hu=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),ot.forEach(function(i){In(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),l0(Qh,1),ic.pause(),ms++,Xn=2,gr(2),rt.forEach(function(i){return In(i.vars.onRefresh)&&i.vars.onRefresh(i)}),Xn=Ke.isRefreshing=!1,xs("refresh")},Vu=0,Ol=1,ho,gr=function(e){if(e===2||!Xn&&!ao){Ke.isUpdating=!0,ho&&ho.update(0);var t=rt.length,n=Pn(),i=n-Oc>=50,s=t&&rt[0].scroll();if(Ol=Vu>s?-1:1,Xn||(Vu=s),i&&(Pi&&!Ec&&n-Pi>200&&(Pi=0,xs("scrollEnd")),Ya=Oc,Oc=n),Ol<0){for(Wn=t;Wn-- >0;)rt[Wn]&&rt[Wn].update(0,i);Ol=1}else for(Wn=0;Wn<t;Wn++)rt[Wn]&&rt[Wn].update(0,i);Ke.isUpdating=!1}wo=0},Wu=[n0,i0,tf,ef,bi+uo,bi+oo,bi+co,bi+lo,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Bl=Wu.concat([ds,ps,"boxSizing","max"+Sa,"max"+nf,"position",bi,tn,tn+co,tn+oo,tn+uo,tn+lo]),Q_=function(e,t,n){fa(n);var i=e._gsap;if(i.spacerIsNative)fa(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},zc=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=Wu.length,a=t.style,o=e.style,l;s--;)l=Wu[s],a[l]=n[l];a.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(a.display="inline-block"),o[tf]=o[ef]="auto",a.flexBasis=n.flexBasis||"auto",a.overflow="visible",a.boxSizing="border-box",a[ds]=rc(e,Yn)+ln,a[ps]=rc(e,cn)+ln,a[tn]=o[bi]=o[i0]=o[n0]="0",fa(i),o[ds]=o["max"+Sa]=n[ds],o[ps]=o["max"+nf]=n[ps],o[tn]=n[tn],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},j_=/([A-Z])/g,fa=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,a;for((e.t._gsap||Ue.core.getCache(e.t)).uncache=1;i<n;i+=2)a=e[i+1],s=e[i],a?t[s]=a:t[s]&&t.removeProperty(s.replace(j_,"-$1").toLowerCase())}},Ko=function(e){for(var t=Bl.length,n=e.style,i=[],s=0;s<t;s++)i.push(Bl[s],n[Bl[s]]);return i.t=e,i},ev=function(e,t,n){for(var i=[],s=e.length,a=n?8:0,o;a<s;a+=2)o=e[a],i.push(o,o in t?t[o]:e[a+1]);return i.t=e.t,i},zl={left:0,top:0},Md=function(e,t,n,i,s,a,o,l,c,u,d,h,f,m){In(e)&&(e=e(l)),ui(e)&&e.substr(0,3)==="max"&&(e=h+(e.charAt(4)==="="?Ul("0"+e.substr(3),n):0));var _=f?f.time():0,p,g,x;if(f&&f.seek(0),isNaN(e)||(e=+e),Ka(e))f&&(e=Ue.utils.mapRange(f.scrollTrigger.start,f.scrollTrigger.end,0,h,e)),o&&Fl(o,n,i,!0);else{In(t)&&(t=t(l));var w=(e||"0").split(" "),S,b,T,v;x=qn(t,l)||Et,S=hr(x)||{},(!S||!S.left&&!S.top)&&Ti(x).display==="none"&&(v=x.style.display,x.style.display="block",S=hr(x),v?x.style.display=v:x.style.removeProperty("display")),b=Ul(w[0],S[i.d]),T=Ul(w[1]||"0",n),e=S[i.p]-c[i.p]-u+b+s-T,o&&Fl(o,T,i,n-T<20||o._isStart&&T>20),n-=n-T}if(m&&(l[m]=e||-.001,e<0&&(e=0)),a){var M=e+n,C=a._isStart;p="scroll"+i.d2,Fl(a,M,i,C&&M>20||!C&&(d?Math.max(Et[p],fi[p]):a.parentNode[p])<=M+1),d&&(c=hr(o),d&&(a.style[i.op.p]=c[i.op.p]-i.op.m-a._offset+ln))}return f&&x&&(p=hr(x),f.seek(h),g=hr(x),f._caScrollDist=p[i.p]-g[i.p],e=e/f._caScrollDist*h),f&&f.seek(_),f?e:Math.round(e)},tv=/(webkit|moz|length|cssText|inset)/i,yd=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,a,o;if(t===Et){e._stOrig=s.cssText,o=Ti(e);for(a in o)!+a&&!tv.test(a)&&o[a]&&typeof s[a]=="string"&&a!=="0"&&(s[a]=o[a]);s.top=n,s.left=i}else s.cssText=e._stOrig;Ue.core.getCache(e).uncache=1,t.appendChild(e)}},u0=function(e,t,n){var i=t,s=i;return function(a){var o=Math.round(e());return o!==i&&o!==s&&Math.abs(o-i)>3&&Math.abs(o-s)>3&&(a=o,n&&n()),s=i,i=Math.round(a),i}},Zo=function(e,t,n){var i={};i[t.p]="+="+n,Ue.set(e,i)},Ed=function(e,t){var n=Yr(e,t),i="_scroll"+t.p2,s=function a(o,l,c,u,d){var h=a.tween,f=l.onComplete,m={};c=c||n();var _=u0(n,c,function(){h.kill(),a.tween=0});return d=u&&d||0,u=u||o-c,h&&h.kill(),l[i]=o,l.inherit=!1,l.modifiers=m,m[i]=function(){return _(c+u*h.ratio+d*h.ratio*h.ratio)},l.onUpdate=function(){ot.cache++,a.tween&&gr()},l.onComplete=function(){a.tween=0,f&&f.call(h)},h=a.tween=Ue.to(e,l),h};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},_n(e,"wheel",n.wheelHandler),Ke.isTouch&&_n(e,"touchmove",n.wheelHandler),s},Ke=(function(){function r(t,n){js||r.register(Ue)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),ku(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!qa){this.update=this.refresh=this.kill=Wi;return}n=gd(ui(n)||Ka(n)||n.nodeType?{trigger:n}:n,qo);var s=n,a=s.onUpdate,o=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,d=s.scrub,h=s.trigger,f=s.pin,m=s.pinSpacing,_=s.invalidateOnRefresh,p=s.anticipatePin,g=s.onScrubComplete,x=s.onSnapComplete,w=s.once,S=s.snap,b=s.pinReparent,T=s.pinSpacer,v=s.containerAnimation,M=s.fastScrollEnd,C=s.preventOverlaps,A=n.horizontal||n.containerAnimation&&n.horizontal!==!1?Yn:cn,U=!d&&d!==0,I=qn(n.scroller||at),H=Ue.core.getCache(I),D=_s(I),z=("pinType"in n?n.pinType:Gr(I,"pinType")||D&&"fixed")==="fixed",X=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],F=U&&n.toggleActions.split(" "),Q="markers"in n?n.markers:qo.markers,W=D?0:parseFloat(Ti(I)["border"+A.p2+Sa])||0,P=this,q=n.onRefreshInit&&function(){return n.onRefreshInit(P)},le=X_(I,D,A),Ee=Y_(I,D),Y=0,ae=0,_e=0,Me=Yr(I,A),ce,pe,Ye,se,Pe,Le,Ie,ut,st,K,it,Ae,De,Ne,$e,wt,B,et,tt,Xe,ge,ft,Fe,We,R,y,G,oe,ie,ue,me,k,j,fe,N,ee,J,ve,de;if(P._startClamp=P._endClamp=!1,P._dir=A,p*=45,P.scroller=I,P.scroll=v?v.time.bind(v):Me,se=Me(),P.vars=n,i=i||n.animation,"refreshPriority"in n&&($m=1,n.refreshPriority===-9999&&(ho=P)),H.tweenScroll=H.tweenScroll||{top:Ed(I,cn),left:Ed(I,Yn)},P.tweenTo=ce=H.tweenScroll[A.p],P.scrubDuration=function(te){j=Ka(te)&&te,j?k?k.duration(te):k=Ue.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:j,paused:!0,onComplete:function(){return g&&g(P)}}):(k&&k.progress(1).kill(),k=0)},i&&(i.vars.lazy=!1,i._initted&&!P.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),P.animation=i.pause(),i.scrollTrigger=P,P.scrubDuration(d),ue=0,l||(l=i.vars.id)),S&&((!as(S)||S.push)&&(S={snapTo:S}),"scrollBehavior"in Et.style&&Ue.set(D?[Et,fi]:I,{scrollBehavior:"auto"}),ot.forEach(function(te){return In(te)&&te.target===(D?bt.scrollingElement||fi:I)&&(te.smooth=!1)}),Ye=In(S.snapTo)?S.snapTo:S.snapTo==="labels"?$_(i):S.snapTo==="labelsDirectional"?K_(i):S.directional!==!1?function(te,ye){return rf(S.snapTo)(te,Pn()-ae<500?0:ye.direction)}:Ue.utils.snap(S.snapTo),fe=S.duration||{min:.1,max:2},fe=as(fe)?so(fe.min,fe.max):so(fe,fe),N=Ue.delayedCall(S.delay||j/2||.1,function(){var te=Me(),ye=Pn()-ae<500,ne=ce.tween;if((ye||Math.abs(P.getVelocity())<10)&&!ne&&!Ec&&Y!==te){var Re=(te-Le)/Ne,ht=i&&!U?i.totalProgress():Re,Je=ye?0:(ht-me)/(Pn()-Ya)*1e3||0,Ft=Ue.utils.clamp(-Re,1-Re,Is(Je/2)*Je/.185),Jt=Re+(S.inertia===!1?0:Ft),Ot,At,St=S,sn=St.onStart,Rt=St.onInterrupt,bn=St.onComplete;if(Ot=Ye(Jt,P),Ka(Ot)||(Ot=Jt),At=Math.max(0,Math.round(Le+Ot*Ne)),te<=Ie&&te>=Le&&At!==te){if(ne&&!ne._initted&&ne.data<=Is(At-te))return;S.inertia===!1&&(Ft=Ot-Re),ce(At,{duration:fe(Is(Math.max(Is(Jt-ht),Is(Ot-ht))*.185/Je/.05||0)),ease:S.ease||"power3",data:Is(At-te),onInterrupt:function(){return N.restart(!0)&&Rt&&Ls(P,Rt)},onComplete:function(){P.update(),Y=Me(),i&&!U&&(k?k.resetTo("totalProgress",Ot,i._tTime/i._tDur):i.progress(Ot)),ue=me=i&&!U?i.totalProgress():P.progress,x&&x(P),bn&&Ls(P,bn)}},te,Ft*Ne,At-te-Ft*Ne),sn&&Ls(P,sn,ce.tween)}}else P.isActive&&Y!==te&&N.restart(!0)}).pause()),l&&(Gu[l]=P),h=P.trigger=qn(h||f!==!0&&f),de=h&&h._gsap&&h._gsap.stRevert,de&&(de=de(P)),f=f===!0?h:qn(f),ui(o)&&(o={targets:h,className:o}),f&&(m===!1||m===bi||(m=!m&&f.parentNode&&f.parentNode.style&&Ti(f.parentNode).display==="flex"?!1:tn),P.pin=f,pe=Ue.core.getCache(f),pe.spacer?$e=pe.pinState:(T&&(T=qn(T),T&&!T.nodeType&&(T=T.current||T.nativeElement),pe.spacerIsNative=!!T,T&&(pe.spacerState=Ko(T))),pe.spacer=et=T||bt.createElement("div"),et.classList.add("pin-spacer"),l&&et.classList.add("pin-spacer-"+l),pe.pinState=$e=Ko(f)),n.force3D!==!1&&Ue.set(f,{force3D:!0}),P.spacer=et=pe.spacer,ie=Ti(f),We=ie[m+A.os2],Xe=Ue.getProperty(f),ge=Ue.quickSetter(f,A.a,ln),zc(f,et,ie),B=Ko(f)),Q){Ae=as(Q)?gd(Q,_d):_d,K=$o("scroller-start",l,I,A,Ae,0),it=$o("scroller-end",l,I,A,Ae,0,K),tt=K["offset"+A.op.d2];var xe=qn(Gr(I,"content")||I);ut=this.markerStart=$o("start",l,xe,A,Ae,tt,0,v),st=this.markerEnd=$o("end",l,xe,A,Ae,tt,0,v),v&&(ve=Ue.quickSetter([ut,st],A.a,ln)),!z&&!(Qi.length&&Gr(I,"fixedMarkers")===!0)&&(q_(D?Et:I),Ue.set([K,it],{force3D:!0}),y=Ue.quickSetter(K,A.a,ln),oe=Ue.quickSetter(it,A.a,ln))}if(v){var he=v.vars.onUpdate,Se=v.vars.onUpdateParams;v.eventCallback("onUpdate",function(){P.update(0,0,1),he&&he.apply(v,Se||[])})}if(P.previous=function(){return rt[rt.indexOf(P)-1]},P.next=function(){return rt[rt.indexOf(P)+1]},P.revert=function(te,ye){if(!ye)return P.kill(!0);var ne=te!==!1||!P.enabled,Re=Cn;ne!==P.isReverted&&(ne&&(ee=Math.max(Me(),P.scroll.rec||0),_e=P.progress,J=i&&i.progress()),ut&&[ut,st,K,it].forEach(function(ht){return ht.style.display=ne?"none":"block"}),ne&&(Cn=P,P.update(ne)),f&&(!b||!P.isActive)&&(ne?Q_(f,et,$e):zc(f,et,Ti(f),R)),ne||P.update(ne),Cn=Re,P.isReverted=ne)},P.refresh=function(te,ye,ne,Re){if(!((Cn||!P.enabled)&&!ye)){if(f&&te&&Pi){_n(r,"scrollEnd",s0);return}!Xn&&q&&q(P),Cn=P,ce.tween&&!ne&&(ce.tween.kill(),ce.tween=0),k&&k.pause(),_&&i&&(i.revert({kill:!1}).invalidate(),i.getChildren?i.getChildren(!0,!0,!1).forEach(function(V){return V.vars.immediateRender&&V.render(0,!0,!0)}):i.vars.immediateRender&&i.render(0,!0,!0)),P.isReverted||P.revert(!0,!0),P._subPinOffset=!1;var ht=le(),Je=Ee(),Ft=v?v.duration():$i(I,A),Jt=Ne<=.01||!Ne,Ot=0,At=Re||0,St=as(ne)?ne.end:n.end,sn=n.endTrigger||h,Rt=as(ne)?ne.start:n.start||(n.start===0||!h?0:f?"0 0":"0 100%"),bn=P.pinnedContainer=n.pinnedContainer&&qn(n.pinnedContainer,P),si=h&&Math.max(0,rt.indexOf(P))||0,Vt=si,Qt,an,ai,Ps,on,Wt,Mi,Ra,Oo,Mr,E,O,Z;for(Q&&as(ne)&&(O=Ue.getProperty(K,A.p),Z=Ue.getProperty(it,A.p));Vt-- >0;)Wt=rt[Vt],Wt.end||Wt.refresh(0,1)||(Cn=P),Mi=Wt.pin,Mi&&(Mi===h||Mi===f||Mi===bn)&&!Wt.isReverted&&(Mr||(Mr=[]),Mr.unshift(Wt),Wt.revert(!0,!0)),Wt!==rt[Vt]&&(si--,Vt--);for(In(Rt)&&(Rt=Rt(P)),Rt=fd(Rt,"start",P),Le=Md(Rt,h,ht,A,Me(),ut,K,P,Je,W,z,Ft,v,P._startClamp&&"_startClamp")||(f?-.001:0),In(St)&&(St=St(P)),ui(St)&&!St.indexOf("+=")&&(~St.indexOf(" ")?St=(ui(Rt)?Rt.split(" ")[0]:"")+St:(Ot=Ul(St.substr(2),ht),St=ui(Rt)?Rt:(v?Ue.utils.mapRange(0,v.duration(),v.scrollTrigger.start,v.scrollTrigger.end,Le):Le)+Ot,sn=h)),St=fd(St,"end",P),Ie=Math.max(Le,Md(St||(sn?"100% 0":Ft),sn,ht,A,Me()+Ot,st,it,P,Je,W,z,Ft,v,P._endClamp&&"_endClamp"))||-.001,Ot=0,Vt=si;Vt--;)Wt=rt[Vt]||{},Mi=Wt.pin,Mi&&Wt.start-Wt._pinPush<=Le&&!v&&Wt.end>0&&(Qt=Wt.end-(P._startClamp?Math.max(0,Wt.start):Wt.start),(Mi===h&&Wt.start-Wt._pinPush<Le||Mi===bn)&&isNaN(Rt)&&(Ot+=Qt*(1-Wt.progress)),Mi===f&&(At+=Qt));if(Le+=Ot,Ie+=Ot,P._startClamp&&(P._startClamp+=Ot),P._endClamp&&!Xn&&(P._endClamp=Ie||-.001,Ie=Math.min(Ie,$i(I,A))),Ne=Ie-Le||(Le-=.01)&&.001,Jt&&(_e=Ue.utils.clamp(0,1,Ue.utils.normalize(Le,Ie,ee))),P._pinPush=At,ut&&Ot&&(Qt={},Qt[A.a]="+="+Ot,bn&&(Qt[A.p]="-="+Me()),Ue.set([ut,st],Qt)),f&&!(Hu&&P.end>=$i(I,A)))Qt=Ti(f),Ps=A===cn,ai=Me(),ft=parseFloat(Xe(A.a))+At,!Ft&&Ie>1&&(E=(D?bt.scrollingElement||fi:I).style,E={style:E,value:E["overflow"+A.a.toUpperCase()]},D&&Ti(Et)["overflow"+A.a.toUpperCase()]!=="scroll"&&(E.style["overflow"+A.a.toUpperCase()]="scroll")),zc(f,et,Qt),B=Ko(f),an=hr(f,!0),Ra=z&&Yr(I,Ps?Yn:cn)(),m?(R=[m+A.os2,Ne+At+ln],R.t=et,Vt=m===tn?rc(f,A)+Ne+At:0,Vt&&(R.push(A.d,Vt+ln),et.style.flexBasis!=="auto"&&(et.style.flexBasis=Vt+ln)),fa(R),bn&&rt.forEach(function(V){V.pin===bn&&V.vars.pinSpacing!==!1&&(V._subPinOffset=!0)}),z&&Me(ee)):(Vt=rc(f,A),Vt&&et.style.flexBasis!=="auto"&&(et.style.flexBasis=Vt+ln)),z&&(on={top:an.top+(Ps?ai-Le:Ra)+ln,left:an.left+(Ps?Ra:ai-Le)+ln,boxSizing:"border-box",position:"fixed"},on[ds]=on["max"+Sa]=Math.ceil(an.width)+ln,on[ps]=on["max"+nf]=Math.ceil(an.height)+ln,on[bi]=on[bi+co]=on[bi+oo]=on[bi+uo]=on[bi+lo]="0",on[tn]=Qt[tn],on[tn+co]=Qt[tn+co],on[tn+oo]=Qt[tn+oo],on[tn+uo]=Qt[tn+uo],on[tn+lo]=Qt[tn+lo],wt=ev($e,on,b),Xn&&Me(0)),i?(Oo=i._initted,Uc(1),i.render(i.duration(),!0,!0),Fe=Xe(A.a)-ft+Ne+At,G=Math.abs(Ne-Fe)>1,z&&G&&wt.splice(wt.length-2,2),i.render(0,!0,!0),Oo||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Uc(0)):Fe=Ne,E&&(E.value?E.style["overflow"+A.a.toUpperCase()]=E.value:E.style.removeProperty("overflow-"+A.a));else if(h&&Me()&&!v)for(an=h.parentNode;an&&an!==Et;)an._pinOffset&&(Le-=an._pinOffset,Ie-=an._pinOffset),an=an.parentNode;Mr&&Mr.forEach(function(V){return V.revert(!1,!0)}),P.start=Le,P.end=Ie,se=Pe=Xn?ee:Me(),!v&&!Xn&&(se<ee&&Me(ee),P.scroll.rec=0),P.revert(!1,!0),ae=Pn(),N&&(Y=-1,N.restart(!0)),Cn=0,i&&U&&(i._initted||J)&&i.progress()!==J&&i.progress(J||0,!0).render(i.time(),!0,!0),(Jt||_e!==P.progress||v||_||i&&!i._initted)&&(i&&!U&&(i._initted||_e||i.vars.immediateRender!==!1)&&i.totalProgress(v&&Le<-.001&&!_e?Ue.utils.normalize(Le,Ie,0):_e,!0),P.progress=Jt||(se-Le)/Ne===_e?0:_e),f&&m&&(et._pinOffset=Math.round(P.progress*Fe)),k&&k.invalidate(),isNaN(O)||(O-=Ue.getProperty(K,A.p),Z-=Ue.getProperty(it,A.p),Zo(K,A,O),Zo(ut,A,O-(Re||0)),Zo(it,A,Z),Zo(st,A,Z-(Re||0))),Jt&&!Xn&&P.update(),u&&!Xn&&!De&&(De=!0,u(P),De=!1)}},P.getVelocity=function(){return(Me()-Pe)/(Pn()-Ya)*1e3||0},P.endAnimation=function(){Da(P.callbackAnimation),i&&(k?k.progress(1):i.paused()?U||Da(i,P.direction<0,1):Da(i,i.reversed()))},P.labelToScroll=function(te){return i&&i.labels&&(Le||P.refresh()||Le)+i.labels[te]/i.duration()*Ne||0},P.getTrailing=function(te){var ye=rt.indexOf(P),ne=P.direction>0?rt.slice(0,ye).reverse():rt.slice(ye+1);return(ui(te)?ne.filter(function(Re){return Re.vars.preventOverlaps===te}):ne).filter(function(Re){return P.direction>0?Re.end<=Le:Re.start>=Ie})},P.update=function(te,ye,ne){if(!(v&&!ne&&!te)){var Re=Xn===!0?ee:P.scroll(),ht=te?0:(Re-Le)/Ne,Je=ht<0?0:ht>1?1:ht||0,Ft=P.progress,Jt,Ot,At,St,sn,Rt,bn,si;if(ye&&(Pe=se,se=v?Me():Re,S&&(me=ue,ue=i&&!U?i.totalProgress():Je)),p&&f&&!Cn&&!Vo&&Pi&&(!Je&&Le<Re+(Re-Pe)/(Pn()-Ya)*p?Je=1e-4:Je===1&&Ie>Re+(Re-Pe)/(Pn()-Ya)*p&&(Je=.9999)),Je!==Ft&&P.enabled){if(Jt=P.isActive=!!Je&&Je<1,Ot=!!Ft&&Ft<1,Rt=Jt!==Ot,sn=Rt||!!Je!=!!Ft,P.direction=Je>Ft?1:-1,P.progress=Je,sn&&!Cn&&(At=Je&&!Ft?0:Je===1?1:Ft===1?2:3,U&&(St=!Rt&&F[At+1]!=="none"&&F[At+1]||F[At],si=i&&(St==="complete"||St==="reset"||St in i))),C&&(Rt||si)&&(si||d||!i)&&(In(C)?C(P):P.getTrailing(C).forEach(function(ai){return ai.endAnimation()})),U||(k&&!Cn&&!Vo?(k._dp._time-k._start!==k._time&&k.render(k._dp._time-k._start),k.resetTo?k.resetTo("totalProgress",Je,i._tTime/i._tDur):(k.vars.totalProgress=Je,k.invalidate().restart())):i&&i.totalProgress(Je,!!(Cn&&(ae||te)))),f){if(te&&m&&(et.style[m+A.os2]=We),!z)ge($a(ft+Fe*Je));else if(sn){if(bn=!te&&Je>Ft&&Ie+1>Re&&Re+1>=$i(I,A),b)if(!te&&(Jt||bn)){var Vt=hr(f,!0),Qt=Re-Le;yd(f,Et,Vt.top+(A===cn?Qt:0)+ln,Vt.left+(A===cn?0:Qt)+ln)}else yd(f,et);fa(Jt||bn?wt:B),G&&Je<1&&Jt||ge(ft+(Je===1&&!bn?Fe:0))}}S&&!ce.tween&&!Cn&&!Vo&&N.restart(!0),o&&(Rt||w&&Je&&(Je<1||!Fc))&&To(o.targets).forEach(function(ai){return ai.classList[Jt||w?"add":"remove"](o.className)}),a&&!U&&!te&&a(P),sn&&!Cn?(U&&(si&&(St==="complete"?i.pause().totalProgress(1):St==="reset"?i.restart(!0).pause():St==="restart"?i.restart(!0):i[St]()),a&&a(P)),(Rt||!Fc)&&(c&&Rt&&Ls(P,c),X[At]&&Ls(P,X[At]),w&&(Je===1?P.kill(!1,1):X[At]=0),Rt||(At=Je===1?1:3,X[At]&&Ls(P,X[At]))),M&&!Jt&&Math.abs(P.getVelocity())>(Ka(M)?M:2500)&&(Da(P.callbackAnimation),k?k.progress(1):Da(i,St==="reverse"?1:!Je,1))):U&&a&&!Cn&&a(P)}if(oe){var an=v?Re/v.duration()*(v._caScrollDist||0):Re;y(an+(K._isFlipped?1:0)),oe(an)}ve&&ve(-Re/v.duration()*(v._caScrollDist||0))}},P.enable=function(te,ye){P.enabled||(P.enabled=!0,_n(I,"resize",Za),D||_n(I,"scroll",Ns),q&&_n(r,"refreshInit",q),te!==!1&&(P.progress=_e=0,se=Pe=Y=Me()),ye!==!1&&P.refresh())},P.getTween=function(te){return te&&ce?ce.tween:k},P.setPositions=function(te,ye,ne,Re){if(v){var ht=v.scrollTrigger,Je=v.duration(),Ft=ht.end-ht.start;te=ht.start+Ft*te/Je,ye=ht.start+Ft*ye/Je}P.refresh(!1,!1,{start:dd(te,ne&&!!P._startClamp),end:dd(ye,ne&&!!P._endClamp)},Re),P.update()},P.adjustPinSpacing=function(te){if(R&&te){var ye=R.indexOf(A.d)+1;R[ye]=parseFloat(R[ye])+te+ln,R[1]=parseFloat(R[1])+te+ln,fa(R)}},P.disable=function(te,ye){if(te!==!1&&P.revert(!0,!0),P.enabled&&(P.enabled=P.isActive=!1,ye||k&&k.pause(),ee=0,pe&&(pe.uncache=1),q&&gn(r,"refreshInit",q),N&&(N.pause(),ce.tween&&ce.tween.kill()&&(ce.tween=0)),!D)){for(var ne=rt.length;ne--;)if(rt[ne].scroller===I&&rt[ne]!==P)return;gn(I,"resize",Za),D||gn(I,"scroll",Ns)}},P.kill=function(te,ye){P.disable(te,ye),k&&!ye&&k.kill(),l&&delete Gu[l];var ne=rt.indexOf(P);ne>=0&&rt.splice(ne,1),ne===Wn&&Ol>0&&Wn--,ne=0,rt.forEach(function(Re){return Re.scroller===P.scroller&&(ne=1)}),ne||Xn||(P.scroll.rec=0),i&&(i.scrollTrigger=null,te&&i.revert({kill:!1}),ye||i.kill()),ut&&[ut,st,K,it].forEach(function(Re){return Re.parentNode&&Re.parentNode.removeChild(Re)}),ho===P&&(ho=0),f&&(pe&&(pe.uncache=1),ne=0,rt.forEach(function(Re){return Re.pin===f&&ne++}),ne||(pe.spacer=0)),n.onKill&&n.onKill(P)},rt.push(P),P.enable(!1,!1),de&&de(P),i&&i.add&&!Ne){var re=P.update;P.update=function(){P.update=re,ot.cache++,Le||Ie||P.refresh()},Ue.delayedCall(.01,P.update),Ne=.01,Le=Ie=0}else P.refresh();f&&J_()},r.register=function(n){return js||(Ue=n||jm(),Qm()&&window.document&&r.enable(),js=qa),js},r.defaults=function(n){if(n)for(var i in n)qo[i]=n[i];return qo},r.disable=function(n,i){qa=0,rt.forEach(function(a){return a[i?"kill":"disable"](n)}),gn(at,"wheel",Ns),gn(bt,"scroll",Ns),clearInterval(Go),gn(bt,"touchcancel",Wi),gn(Et,"touchstart",Wi),Xo(gn,bt,"pointerdown,touchstart,mousedown",pd),Xo(gn,bt,"pointerup,touchend,mouseup",md),ic.kill(),Wo(gn);for(var s=0;s<ot.length;s+=3)Yo(gn,ot[s],ot[s+1]),Yo(gn,ot[s],ot[s+2])},r.enable=function(){if(at=window,bt=document,fi=bt.documentElement,Et=bt.body,Ue){if(To=Ue.utils.toArray,so=Ue.utils.clamp,ku=Ue.core.context||Wi,Uc=Ue.core.suppressOverwrites||Wi,Qh=at.history.scrollRestoration||"auto",Vu=at.pageYOffset||0,Ue.core.globals("ScrollTrigger",r),Et){qa=1,ha=document.createElement("div"),ha.style.height="100vh",ha.style.position="absolute",c0(),W_(),Zt.register(Ue),r.isTouch=Zt.isTouch,Cr=Zt.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),zu=Zt.isTouch===1,_n(at,"wheel",Ns),Jh=[at,bt,fi,Et],Ue.matchMedia?(r.matchMedia=function(u){var d=Ue.matchMedia(),h;for(h in u)d.add(h,u[h]);return d},Ue.addEventListener("matchMediaInit",function(){o0(),sf()}),Ue.addEventListener("matchMediaRevert",function(){return a0()}),Ue.addEventListener("matchMedia",function(){ls(0,1),xs("matchMedia")}),Ue.matchMedia().add("(orientation: portrait)",function(){return Bc(),Bc})):console.warn("Requires GSAP 3.11.0 or later"),Bc(),_n(bt,"scroll",Ns);var n=Et.hasAttribute("style"),i=Et.style,s=i.borderTopStyle,a=Ue.core.Animation.prototype,o,l;for(a.revert||Object.defineProperty(a,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",o=hr(Et),cn.m=Math.round(o.top+cn.sc())||0,Yn.m=Math.round(o.left+Yn.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(Et.setAttribute("style",""),Et.removeAttribute("style")),Go=setInterval(vd,250),Ue.delayedCall(.5,function(){return Vo=0}),_n(bt,"touchcancel",Wi),_n(Et,"touchstart",Wi),Xo(_n,bt,"pointerdown,touchstart,mousedown",pd),Xo(_n,bt,"pointerup,touchend,mouseup",md),Bu=Ue.utils.checkPrefix("transform"),Bl.push(Bu),js=Pn(),ic=Ue.delayedCall(.2,ls).pause(),ea=[bt,"visibilitychange",function(){var u=at.innerWidth,d=at.innerHeight;bt.hidden?(ud=u,hd=d):(ud!==u||hd!==d)&&Za()},bt,"DOMContentLoaded",ls,at,"load",ls,at,"resize",Za],Wo(_n),rt.forEach(function(u){return u.enable(0,1)}),l=0;l<ot.length;l+=3)Yo(gn,ot[l],ot[l+1]),Yo(gn,ot[l],ot[l+2])}else if(bt){var c=function u(){r.enable(),bt.removeEventListener("DOMContentLoaded",u)};bt.addEventListener("DOMContentLoaded",c)}}},r.config=function(n){"limitCallbacks"in n&&(Fc=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(Go)||(Go=i)&&setInterval(vd,i),"ignoreMobileResize"in n&&(zu=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(Wo(gn)||Wo(_n,n.autoRefreshEvents||"none"),Km=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=qn(n),a=ot.indexOf(s),o=_s(s);~a&&ot.splice(a,o?6:2),i&&(o?Qi.unshift(at,i,Et,i,fi,i):Qi.unshift(s,i))},r.clearMatchMedia=function(n){rt.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var a=(ui(n)?qn(n):n).getBoundingClientRect(),o=a[s?ds:ps]*i||0;return s?a.right-o>0&&a.left+o<at.innerWidth:a.bottom-o>0&&a.top+o<at.innerHeight},r.positionInViewport=function(n,i,s){ui(n)&&(n=qn(n));var a=n.getBoundingClientRect(),o=a[s?ds:ps],l=i==null?o/2:i in sc?sc[i]*o:~i.indexOf("%")?parseFloat(i)*o/100:parseFloat(i)||0;return s?(a.left+l)/at.innerWidth:(a.top+l)/at.innerHeight},r.killAll=function(n){if(rt.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=vs.killAll||[];vs={},i.forEach(function(s){return s()})}},r})();Ke.version="3.15.0";Ke.saveStyles=function(r){return r?To(r).forEach(function(e){if(e&&e.style){var t=ci.indexOf(e);t>=0&&ci.splice(t,5),ci.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Ue.core.getCache(e),ku())}}):ci};Ke.revert=function(r,e){return sf(!r,e)};Ke.create=function(r,e){return new Ke(r,e)};Ke.refresh=function(r){return r?Za(!0):(js||Ke.register())&&ls(!0)};Ke.update=function(r){return++ot.cache&&gr(r===!0?2:0)};Ke.clearScrollMemory=l0;Ke.maxScroll=function(r,e){return $i(r,e?Yn:cn)};Ke.getScrollFunc=function(r,e){return Yr(qn(r),e?Yn:cn)};Ke.getById=function(r){return Gu[r]};Ke.getAll=function(){return rt.filter(function(r){return r.vars.id!=="ScrollSmoother"})};Ke.isScrolling=function(){return!!Pi};Ke.snapDirectional=rf;Ke.addEventListener=function(r,e){var t=vs[r]||(vs[r]=[]);~t.indexOf(e)||t.push(e)};Ke.removeEventListener=function(r,e){var t=vs[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};Ke.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,a=function(c,u){var d=[],h=[],f=Ue.delayedCall(i,function(){u(d,h),d=[],h=[]}).pause();return function(m){d.length||f.restart(!0),d.push(m.trigger),h.push(m),s<=d.length&&f.progress(1)}},o;for(o in e)n[o]=o.substr(0,2)==="on"&&In(e[o])&&o!=="onRefreshInit"?a(o,e[o]):e[o];return In(s)&&(s=s(),_n(Ke,"refresh",function(){return s=e.batchMax()})),To(r).forEach(function(l){var c={};for(o in n)c[o]=n[o];c.trigger=l,t.push(Ke.create(c))}),t};var bd=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},kc=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(Zt.isTouch?" pinch-zoom":""):"none",e===fi&&r(Et,t)},Jo={auto:1,scroll:1},nv=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,a=s._gsap||Ue.core.getCache(s),o=Pn(),l;if(!a._isScrollT||o-a._isScrollT>2e3){for(;s&&s!==Et&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(Jo[(l=Ti(s)).overflowY]||Jo[l.overflowX]));)s=s.parentNode;a._isScroll=s&&s!==n&&!_s(s)&&(Jo[(l=Ti(s)).overflowY]||Jo[l.overflowX]),a._isScrollT=o}(a._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},h0=function(e,t,n,i){return Zt.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&nv,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&_n(bt,Zt.eventTypes[0],wd,!1,!0)},onDisable:function(){return gn(bt,Zt.eventTypes[0],wd,!0)}})},iv=/(input|label|select|textarea)/i,Td,wd=function(e){var t=iv.test(e.target.tagName);(t||Td)&&(e._gsapAllow=!0,Td=t)},rv=function(e){as(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,a=t.onRelease,o,l,c=qn(e.target)||fi,u=Ue.core.globals().ScrollSmoother,d=u&&u.get(),h=Cr&&(e.content&&qn(e.content)||d&&e.content!==!1&&!d.smooth()&&d.content()),f=Yr(c,cn),m=Yr(c,Yn),_=1,p=(Zt.isTouch&&at.visualViewport?at.visualViewport.scale*at.visualViewport.width:at.outerWidth)/at.innerWidth,g=0,x=In(i)?function(){return i(o)}:function(){return i||2.8},w,S,b=h0(c,e.type,!0,s),T=function(){return S=!1},v=Wi,M=Wi,C=function(){l=$i(c,cn),M=so(Cr?1:0,l),n&&(v=so(0,$i(c,Yn))),w=ms},A=function(){h._gsap.y=$a(parseFloat(h._gsap.y)+f.offset)+"px",h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(h._gsap.y)+", 0, 1)",f.offset=f.cacheID=0},U=function(){if(S){requestAnimationFrame(T);var Q=$a(o.deltaY/2),W=M(f.v-Q);if(h&&W!==f.v+f.offset){f.offset=W-f.v;var P=$a((parseFloat(h&&h._gsap.y)||0)-f.offset);h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+P+", 0, 1)",h._gsap.y=P+"px",f.cacheID=ot.cache,gr()}return!0}f.offset&&A(),S=!0},I,H,D,z,X=function(){C(),I.isActive()&&I.vars.scrollY>l&&(f()>l?I.progress(1)&&f(l):I.resetTo("scrollY",l))};return h&&Ue.set(h,{y:"+=0"}),e.ignoreCheck=function(F){return Cr&&F.type==="touchmove"&&U()||_>1.05&&F.type!=="touchstart"||o.isGesturing||F.touches&&F.touches.length>1},e.onPress=function(){S=!1;var F=_;_=$a((at.visualViewport&&at.visualViewport.scale||1)/p),I.pause(),F!==_&&kc(c,_>1.01?!0:n?!1:"x"),H=m(),D=f(),C(),w=ms},e.onRelease=e.onGestureStart=function(F,Q){if(f.offset&&A(),!Q)z.restart(!0);else{ot.cache++;var W=x(),P,q;n&&(P=m(),q=P+W*.05*-F.velocityX/.227,W*=bd(m,P,q,$i(c,Yn)),I.vars.scrollX=v(q)),P=f(),q=P+W*.05*-F.velocityY/.227,W*=bd(f,P,q,$i(c,cn)),I.vars.scrollY=M(q),I.invalidate().duration(W).play(.01),(Cr&&I.vars.scrollY>=l||P>=l-1)&&Ue.to({},{onUpdate:X,duration:W})}a&&a(F)},e.onWheel=function(){I._ts&&I.pause(),Pn()-g>1e3&&(w=0,g=Pn())},e.onChange=function(F,Q,W,P,q){if(ms!==w&&C(),Q&&n&&m(v(P[2]===Q?H+(F.startX-F.x):m()+Q-P[1])),W){f.offset&&A();var le=q[2]===W,Ee=le?D+F.startY-F.y:f()+W-q[1],Y=M(Ee);le&&Ee!==Y&&(D+=Y-Ee),f(Y)}(W||Q)&&gr()},e.onEnable=function(){kc(c,n?!1:"x"),Ke.addEventListener("refresh",X),_n(at,"resize",X),f.smooth&&(f.target.style.scrollBehavior="auto",f.smooth=m.smooth=!1),b.enable()},e.onDisable=function(){kc(c,!0),gn(at,"resize",X),Ke.removeEventListener("refresh",X),b.kill()},e.lockAxis=e.lockAxis!==!1,o=new Zt(e),o.iOS=Cr,Cr&&!f()&&f(1),Cr&&Ue.ticker.add(Wi),z=o._dc,I=Ue.to(o,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:u0(f,f(),function(){return I.pause()})},onUpdate:gr,onComplete:z.vars.onComplete}),o};Ke.sort=function(r){if(In(r))return rt.sort(r);var e=at.pageYOffset||0;return Ke.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+at.innerHeight}),rt.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};Ke.observe=function(r){return new Zt(r)};Ke.normalizeScroll=function(r){if(typeof r>"u")return Vn;if(r===!0&&Vn)return Vn.enable();if(r===!1){Vn&&Vn.kill(),Vn=r;return}var e=r instanceof Zt?r:rv(r);return Vn&&Vn.target===e.target&&Vn.kill(),_s(e.target)&&(Vn=e),e};Ke.core={_getVelocityProp:Ou,_inputObserver:h0,_scrollers:ot,_proxies:Qi,bridge:{ss:function(){Pi||xs("scrollStart"),Pi=Pn()},ref:function(){return Cn}}};jm()&&Ue.registerPlugin(Ke);const af="187",sv=0,Ad=1,av=2,kl=1,ov=2,Ja=3,Ss=0,Fn=1,mi=2,gs=0,fo=1,Oi=2,Rd=3,Cd=4,lv=5,ta=100,cv=101,uv=102,hv=103,fv=104,dv=200,pv=201,mv=202,gv=203,f0=204,d0=205,_v=206,vv=207,xv=208,Sv=209,Mv=210,yv=211,Ev=212,bv=213,Tv=214,Xu=0,Yu=1,qu=2,Ao=3,$u=4,Ku=5,Zu=6,Ju=7,p0=0,wv=1,Av=2,_r=0,of=1,lf=2,cf=3,uf=4,hf=5,ff=6,df=7,m0=300,Ma=301,Ro=302,Hc=303,Gc=304,Co=1e3,dr=1001,Qu=1002,Mn=1003,Rv=1004,Qo=1005,Kn=1006,Vc=1007,Or=1008,wi=1009,g0=1010,_0=1011,Po=1012,pf=1013,tr=1014,Bi=1015,ei=1016,mf=1017,gf=1018,ya=1020,v0=35902,x0=35899,S0=1021,M0=1022,Ki=1023,qr=1026,Br=1027,_f=1028,vf=1029,Ms=1030,xf=1031,Sf=1033,Hl=33776,Gl=33777,Vl=33778,Wl=33779,ju=35840,eh=35841,th=35842,nh=35843,ih=36196,rh=37492,sh=37496,ah=37488,oh=37489,ac=37490,lh=37491,ch=37808,uh=37809,hh=37810,fh=37811,dh=37812,ph=37813,mh=37814,gh=37815,_h=37816,vh=37817,xh=37818,Sh=37819,Mh=37820,yh=37821,Eh=36492,bh=36494,Th=36495,wh=36283,Ah=36284,oc=36285,Rh=36286,Cv=3200,Pd=0,Pv=1,Dr="",Dn="srgb",lc="srgb-linear",cc="linear",yt="srgb",Wc=7680,Dv=519,Lv=512,Iv=513,Nv=514,y0=515,Uv=516,Fv=517,E0=518,b0=519,T0=35044,Dd="300 es",zi=2e3,uc=2001;function Ov(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Do(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Bv(){const r=Do("canvas");return r.style.display="block",r}const Ld={};function hc(...r){const e="THREE."+r.shift();console.log(e,...r)}function w0(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=r[1];t&&t.isStackTrace?r[0]+=" "+t.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function qe(...r){r=w0(r);const e="THREE."+r.shift();{const t=r[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...r)}}function vt(...r){r=w0(r);const e="THREE."+r.shift();{const t=r[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...r)}}function Xl(...r){const e=r.join(" ");e in Ld||(Ld[e]=!0,qe(...r))}function zv(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const kv={[Xu]:Xu,[qu]:Zu,[$u]:$u,[Ao]:Ku,[Yu]:Yu,[Zu]:qu,[Ju]:Ju,[Ku]:Ao};class Ts{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}}const An=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Id=1234567;const po=Math.PI/180,Lo=180/Math.PI;function Kr(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(An[r&255]+An[r>>8&255]+An[r>>16&255]+An[r>>24&255]+"-"+An[e&255]+An[e>>8&255]+"-"+An[e>>16&15|64]+An[e>>24&255]+"-"+An[t&63|128]+An[t>>8&255]+"-"+An[t>>16&255]+An[t>>24&255]+An[n&255]+An[n>>8&255]+An[n>>16&255]+An[n>>24&255]).toLowerCase()}function ct(r,e,t){return Math.max(e,Math.min(t,r))}function Mf(r,e){return(r%e+e)%e}function Hv(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Gv(r,e,t){return r!==e?(t-r)/(e-r):0}function mo(r,e,t){return(1-t)*r+t*e}function Vv(r,e,t,n){return mo(r,e,1-Math.exp(-t*n))}function Wv(r,e=1){return e-Math.abs(Mf(r,e*2)-e)}function Xv(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Yv(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function qv(r,e){return r+Math.floor(Math.random()*(e-r+1))}function $v(r,e){return r+Math.random()*(e-r)}function Kv(r){return r*(.5-Math.random())}function Zv(r){r!==void 0&&(Id=r);let e=Id+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Jv(r){return r*po}function Qv(r){return r*Lo}function jv(r){return r>0&&Number.isInteger(r)&&2**Math.round(Math.log2(r))===r}function ex(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function A0(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function tx(r,e,t,n,i){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),u=a((e+n)/2),d=s((e-n)/2),h=a((e-n)/2),f=s((n-e)/2),m=a((n-e)/2);switch(i){case"XYX":r.set(o*u,l*d,l*h,o*c);break;case"YZY":r.set(l*h,o*u,l*d,o*c);break;case"ZXZ":r.set(l*d,l*h,o*u,o*c);break;case"XZX":r.set(o*u,l*m,l*f,o*c);break;case"YXY":r.set(l*f,o*u,l*m,o*c);break;case"ZYZ":r.set(l*m,l*f,o*u,o*c);break;default:qe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function bc(r){switch(r.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function yf(r,e){if(e.constructor===Float32Array)return r;const t=bc(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(r/t,-1)}function Ef(r,e){if(e.constructor===Float32Array)return r;const t=bc(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(r*t)}const nx={DEG2RAD:po,RAD2DEG:Lo,generateUUID:Kr,clamp:ct,euclideanModulo:Mf,mapLinear:Hv,inverseLerp:Gv,lerp:mo,damp:Vv,pingpong:Wv,smoothstep:Xv,smootherstep:Yv,randInt:qv,randFloat:$v,randFloatSpread:Kv,seededRandom:Zv,degToRad:Jv,radToDeg:Qv,isPowerOfTwo:jv,ceilPowerOfTwo:ex,floorPowerOfTwo:A0,setQuaternionFromProperEuler:tx,normalize:Ef,denormalize:yf},Of=class Of{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Of.prototype.isVector2=!0;let Ve=Of;class ws{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],u=n[i+2],d=n[i+3],h=s[a+0],f=s[a+1],m=s[a+2],_=s[a+3];if(d!==_||l!==h||c!==f||u!==m){let p=l*h+c*f+u*m+d*_;p<0&&(h=-h,f=-f,m=-m,_=-_,p=-p);let g=1-o;if(p<.9995){const x=Math.acos(p),w=Math.sin(x);g=Math.sin(g*x)/w,o=Math.sin(o*x)/w,l=l*g+h*o,c=c*g+f*o,u=u*g+m*o,d=d*g+_*o}else{l=l*g+h*o,c=c*g+f*o,u=u*g+m*o,d=d*g+_*o;const x=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=x,c*=x,u*=x,d*=x}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,a){const o=n[i],l=n[i+1],c=n[i+2],u=n[i+3],d=s[a],h=s[a+1],f=s[a+2],m=s[a+3];return e[t]=o*m+u*d+l*f-c*h,e[t+1]=l*m+u*h+c*d-o*f,e[t+2]=c*m+u*f+o*h-l*d,e[t+3]=u*m-o*d-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(i/2),d=o(s/2),h=l(n/2),f=l(i/2),m=l(s/2);switch(a){case"XYZ":this._x=h*u*d+c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d-h*f*m;break;case"YXZ":this._x=h*u*d+c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d+h*f*m;break;case"ZXY":this._x=h*u*d-c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d-h*f*m;break;case"ZYX":this._x=h*u*d-c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d+h*f*m;break;case"YZX":this._x=h*u*d+c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d-h*f*m;break;case"XZY":this._x=h*u*d-c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d+h*f*m;break;default:qe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=n+o+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(a-i)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(u-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(s-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-i)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ct(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+i*c-s*l,this._y=i*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-i*o,this._w=a*u-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Bf=class Bf{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Nd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Nd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),u=2*(o*t-s*i),d=2*(s*n-a*t);return this.x=t+l*c+a*d-o*u,this.y=n+l*u+o*c-s*d,this.z=i+l*d+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this.z=ct(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this.z=ct(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Xc.copy(this).projectOnVector(e),this.sub(Xc)}reflect(e){return this.sub(Xc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Bf.prototype.isVector3=!0;let L=Bf;const Xc=new L,Nd=new ws,zf=class zf{constructor(e,t,n,i,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],d=n[7],h=n[2],f=n[5],m=n[8],_=i[0],p=i[3],g=i[6],x=i[1],w=i[4],S=i[7],b=i[2],T=i[5],v=i[8];return s[0]=a*_+o*x+l*b,s[3]=a*p+o*w+l*T,s[6]=a*g+o*S+l*v,s[1]=c*_+u*x+d*b,s[4]=c*p+u*w+d*T,s[7]=c*g+u*S+d*v,s[2]=h*_+f*x+m*b,s[5]=h*p+f*w+m*T,s[8]=h*g+f*S+m*v,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+i*s*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,h=o*l-u*s,f=c*s-a*l,m=t*d+n*h+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return e[0]=d*_,e[1]=(i*c-u*n)*_,e[2]=(o*n-i*a)*_,e[3]=h*_,e[4]=(u*t-i*l)*_,e[5]=(i*s-o*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Xl("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Yc.makeScale(e,t)),this}rotate(e){return Xl("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Yc.makeRotation(-e)),this}translate(e,t){return Xl("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Yc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};zf.prototype.isMatrix3=!0;let Ze=zf;const Yc=new Ze,Ud=new Ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Fd=new Ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ix(){const r={enabled:!0,workingColorSpace:lc,spaces:{},convert:function(i,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===yt&&(i.r=vr(i.r),i.g=vr(i.g),i.b=vr(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===yt&&(i.r=da(i.r),i.g=da(i.g),i.b=da(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Dr?cc:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[a].fromXYZ).multiply(this.spaces[s].toXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[lc]:{primaries:e,whitePoint:n,transfer:cc,toXYZ:Ud,fromXYZ:Fd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Dn},outputColorSpaceConfig:{drawingBufferColorSpace:Dn}},[Dn]:{primaries:e,whitePoint:n,transfer:yt,toXYZ:Ud,fromXYZ:Fd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Dn}}}),r}const mt=ix();function vr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function da(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Us;class rx{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Us===void 0&&(Us=Do("canvas")),Us.width=e.width,Us.height=e.height;const i=Us.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Us}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Do("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=vr(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(vr(t[n]/255)*255):t[n]=vr(t[n]);return{data:t,width:e.width,height:e.height}}else return qe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let sx=0;class bf{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:sx++}),this.uuid=Kr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(qc(i[a].image)):s.push(qc(i[a]))}else s=qc(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function qc(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?rx.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(qe("Texture: Unable to serialize Texture."),{})}let ax=0;const $c=new L;class En extends Ts{constructor(e=En.DEFAULT_IMAGE,t=En.DEFAULT_MAPPING,n=dr,i=dr,s=Kn,a=Or,o=Ki,l=wi,c=En.DEFAULT_ANISOTROPY,u=Dr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ax++}),this.uuid=Kr(),this.name="",this.source=new bf(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ve(0,0),this.repeat=new Ve(1,1),this.center=new Ve(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize($c).x}get height(){return this.source.getSize($c).y}get depth(){return this.source.getSize($c).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){qe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){qe(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==m0)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Co:e.x=e.x-Math.floor(e.x);break;case dr:e.x=e.x<0?0:1;break;case Qu:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Co:e.y=e.y-Math.floor(e.y);break;case dr:e.y=e.y<0?0:1;break;case Qu:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}En.DEFAULT_IMAGE=null;En.DEFAULT_MAPPING=m0;En.DEFAULT_ANISOTROPY=1;const kf=class kf{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],m=l[9],_=l[2],p=l[6],g=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-_)<.01&&Math.abs(m-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+_)<.1&&Math.abs(m+p)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,S=(f+1)/2,b=(g+1)/2,T=(u+h)/4,v=(d+_)/4,M=(m+p)/4;return w>S&&w>b?w<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(w),i=T/n,s=v/n):S>b?S<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(S),n=T/i,s=M/i):b<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(b),n=v/s,i=M/s),this.set(n,i,s,t),this}let x=Math.sqrt((p-m)*(p-m)+(d-_)*(d-_)+(h-u)*(h-u));return Math.abs(x)<.001&&(x=1),this.x=(p-m)/x,this.y=(d-_)/x,this.z=(h-u)/x,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this.z=ct(this.z,e.z,t.z),this.w=ct(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this.z=ct(this.z,e,t),this.w=ct(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};kf.prototype.isVector4=!0;let Yt=kf;class ox extends Ts{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Kn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Yt(0,0,e,t),this.scissorTest=!1,this.viewport=new Yt(0,0,e,t),this.textures=[];const i=n.count;for(let s=0;s<i;s++)this.textures[s]=new En({width:e,height:t,depth:n.depth}),this.textures[s].isRenderTargetTexture=!0,this.textures[s].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Kn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new bf(i)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ti extends ox{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class R0 extends En{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Mn,this.minFilter=Mn,this.wrapR=dr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class lx extends En{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Mn,this.minFilter=Mn,this.wrapR=dr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const xc=class xc{constructor(e,t,n,i,s,a,o,l,c,u,d,h,f,m,_,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,u,d,h,f,m,_,p)}set(e,t,n,i,s,a,o,l,c,u,d,h,f,m,_,p){const g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=s,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=u,g[10]=d,g[14]=h,g[3]=f,g[7]=m,g[11]=_,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xc().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,i=1/Fs.setFromMatrixColumn(e,0).length(),s=1/Fs.setFromMatrixColumn(e,1).length(),a=1/Fs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=a*u,f=a*d,m=o*u,_=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=f+m*c,t[5]=h-_*c,t[9]=-o*l,t[2]=_-h*c,t[6]=m+f*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*u,f=l*d,m=c*u,_=c*d;t[0]=h+_*o,t[4]=m*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=f*o-m,t[6]=_+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*u,f=l*d,m=c*u,_=c*d;t[0]=h-_*o,t[4]=-a*d,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*u,t[9]=_-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*u,f=a*d,m=o*u,_=o*d;t[0]=l*u,t[4]=m*c-f,t[8]=h*c+_,t[1]=l*d,t[5]=_*c+h,t[9]=f*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,f=a*c,m=o*l,_=o*c;t[0]=l*u,t[4]=_-h*d,t[8]=m*d+f,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*d+m,t[10]=h-_*d}else if(e.order==="XZY"){const h=a*l,f=a*c,m=o*l,_=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+_,t[5]=a*u,t[9]=f*d-m,t[2]=m*d-f,t[6]=o*u,t[10]=_*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(cx,e,ux)}lookAt(e,t,n){const i=this.elements;return oi.subVectors(e,t),oi.lengthSq()===0&&(oi.z=1),oi.normalize(),br.crossVectors(n,oi),br.lengthSq()===0&&(Math.abs(n.z)===1?oi.x+=1e-4:oi.z+=1e-4,oi.normalize(),br.crossVectors(n,oi)),br.normalize(),jo.crossVectors(oi,br),i[0]=br.x,i[4]=jo.x,i[8]=oi.x,i[1]=br.y,i[5]=jo.y,i[9]=oi.y,i[2]=br.z,i[6]=jo.z,i[10]=oi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],d=n[5],h=n[9],f=n[13],m=n[2],_=n[6],p=n[10],g=n[14],x=n[3],w=n[7],S=n[11],b=n[15],T=i[0],v=i[4],M=i[8],C=i[12],A=i[1],U=i[5],I=i[9],H=i[13],D=i[2],z=i[6],X=i[10],F=i[14],Q=i[3],W=i[7],P=i[11],q=i[15];return s[0]=a*T+o*A+l*D+c*Q,s[4]=a*v+o*U+l*z+c*W,s[8]=a*M+o*I+l*X+c*P,s[12]=a*C+o*H+l*F+c*q,s[1]=u*T+d*A+h*D+f*Q,s[5]=u*v+d*U+h*z+f*W,s[9]=u*M+d*I+h*X+f*P,s[13]=u*C+d*H+h*F+f*q,s[2]=m*T+_*A+p*D+g*Q,s[6]=m*v+_*U+p*z+g*W,s[10]=m*M+_*I+p*X+g*P,s[14]=m*C+_*H+p*F+g*q,s[3]=x*T+w*A+S*D+b*Q,s[7]=x*v+w*U+S*z+b*W,s[11]=x*M+w*I+S*X+b*P,s[15]=x*C+w*H+S*F+b*q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],f=e[14],m=e[3],_=e[7],p=e[11],g=e[15],x=l*f-c*h,w=o*f-c*d,S=o*h-l*d,b=a*f-c*u,T=a*h-l*u,v=a*d-o*u;return t*(_*x-p*w+g*S)-n*(m*x-p*b+g*T)+i*(m*w-_*b+g*v)-s*(m*S-_*T+p*v)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-n*(s*u-o*l)+i*(s*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],f=e[11],m=e[12],_=e[13],p=e[14],g=e[15],x=t*o-n*a,w=t*l-i*a,S=t*c-s*a,b=n*l-i*o,T=n*c-s*o,v=i*c-s*l,M=u*_-d*m,C=u*p-h*m,A=u*g-f*m,U=d*p-h*_,I=d*g-f*_,H=h*g-f*p,D=x*H-w*I+S*U+b*A-T*C+v*M;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/D;return e[0]=(o*H-l*I+c*U)*z,e[1]=(i*I-n*H-s*U)*z,e[2]=(_*v-p*T+g*b)*z,e[3]=(h*T-d*v-f*b)*z,e[4]=(l*A-a*H-c*C)*z,e[5]=(t*H-i*A+s*C)*z,e[6]=(p*S-m*v-g*w)*z,e[7]=(u*v-h*S+f*w)*z,e[8]=(a*I-o*A+c*M)*z,e[9]=(n*A-t*I-s*M)*z,e[10]=(m*T-_*S+g*x)*z,e[11]=(d*S-u*T-f*x)*z,e[12]=(o*C-a*U-l*M)*z,e[13]=(t*U-n*C+i*M)*z,e[14]=(_*w-m*b-p*x)*z,e[15]=(u*b-d*w+h*x)*z,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,u*o+n,u*l-i*a,0,c*l-i*o,u*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,d=o+o,h=s*c,f=s*u,m=s*d,_=a*u,p=a*d,g=o*d,x=l*c,w=l*u,S=l*d,b=n.x,T=n.y,v=n.z;return i[0]=(1-(_+g))*b,i[1]=(f+S)*b,i[2]=(m-w)*b,i[3]=0,i[4]=(f-S)*T,i[5]=(1-(h+g))*T,i[6]=(p+x)*T,i[7]=0,i[8]=(m+w)*v,i[9]=(p-x)*v,i[10]=(1-(h+_))*v,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];const s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=Fs.set(i[0],i[1],i[2]).length();const o=Fs.set(i[4],i[5],i[6]).length(),l=Fs.set(i[8],i[9],i[10]).length();s<0&&(a=-a),Li.copy(this);const c=1/a,u=1/o,d=1/l;return Li.elements[0]*=c,Li.elements[1]*=c,Li.elements[2]*=c,Li.elements[4]*=u,Li.elements[5]*=u,Li.elements[6]*=u,Li.elements[8]*=d,Li.elements[9]*=d,Li.elements[10]*=d,t.setFromRotationMatrix(Li),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,i,s,a,o=zi,l=!1){const c=this.elements,u=2*s/(t-e),d=2*s/(n-i),h=(t+e)/(t-e),f=(n+i)/(n-i);let m,_;if(l)m=s/(a-s),_=a*s/(a-s);else if(o===zi)m=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===uc)m=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=zi,l=!1){const c=this.elements,u=2/(t-e),d=2/(n-i),h=-(t+e)/(t-e),f=-(n+i)/(n-i);let m,_;if(l)m=1/(a-s),_=a/(a-s);else if(o===zi)m=-2/(a-s),_=-(a+s)/(a-s);else if(o===uc)m=-1/(a-s),_=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};xc.prototype.isMatrix4=!0;let Tt=xc;const Fs=new L,Li=new Tt,cx=new L(0,0,0),ux=new L(1,1,1),br=new L,jo=new L,oi=new L,Od=new Tt,Bd=new ws;class ys{constructor(e=0,t=0,n=0,i=ys.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],u=i[9],d=i[2],h=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(ct(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ct(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(ct(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ct(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ct(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ct(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:qe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Od.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Od,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Bd.setFromEuler(this),this.setFromQuaternion(Bd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ys.DEFAULT_ORDER="XYZ";class C0{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let hx=0;const zd=new L,Os=new ws,ir=new Tt,el=new L,La=new L,fx=new L,dx=new ws,kd=new L(1,0,0),Hd=new L(0,1,0),Gd=new L(0,0,1),Vd={type:"added"},px={type:"removed"},Bs={type:"childadded",child:null},Kc={type:"childremoved",child:null};class On extends Ts{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hx++}),this.uuid=Kr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=On.DEFAULT_UP.clone();const e=new L,t=new ys,n=new ws,i=new L(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Tt},normalMatrix:{value:new Ze}}),this.matrix=new Tt,this.matrixWorld=new Tt,this.matrixAutoUpdate=On.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=On.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new C0,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Os.setFromAxisAngle(e,t),this.quaternion.multiply(Os),this}rotateOnWorldAxis(e,t){return Os.setFromAxisAngle(e,t),this.quaternion.premultiply(Os),this}rotateX(e){return this.rotateOnAxis(kd,e)}rotateY(e){return this.rotateOnAxis(Hd,e)}rotateZ(e){return this.rotateOnAxis(Gd,e)}translateOnAxis(e,t){return zd.copy(e).applyQuaternion(this.quaternion),this.position.add(zd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(kd,e)}translateY(e){return this.translateOnAxis(Hd,e)}translateZ(e){return this.translateOnAxis(Gd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ir.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?el.copy(e):el.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),La.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ir.lookAt(La,el,this.up):ir.lookAt(el,La,this.up),this.quaternion.setFromRotationMatrix(ir),i&&(ir.extractRotation(i.matrixWorld),Os.setFromRotationMatrix(ir),this.quaternion.premultiply(Os.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(vt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Vd),Bs.child=e,this.dispatchEvent(Bs),Bs.child=null):vt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(px),Kc.child=e,this.dispatchEvent(Kc),Kc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ir.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ir.multiply(e.parent.matrixWorld)),e.applyMatrix4(ir),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Vd),Bs.child=e,this.dispatchEvent(Bs),Bs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(La,e,fx),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(La,dx,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,i=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*i,s[13]+=n-s[1]*t-s[5]*n-s[9]*i,s[14]+=i-s[2]*t-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}On.DEFAULT_UP=new L(0,1,0);On.DEFAULT_MATRIX_AUTO_UPDATE=!0;On.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ki extends On{constructor(){super(),this.isGroup=!0,this.type="Group"}}const mx={type:"move"};class Zc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ki,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ki,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ki,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),g=this._getHandJoint(c,_);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,m=.005;c.inputState.pinching&&h>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(mx)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ki;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const P0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Tr={h:0,s:0,l:0},tl={h:0,s:0,l:0};function Jc(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class ke{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Dn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,mt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=mt.workingColorSpace){return this.r=e,this.g=t,this.b=n,mt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=mt.workingColorSpace){if(e=Mf(e,1),t=ct(t,0,1),n=ct(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Jc(a,s,e+1/3),this.g=Jc(a,s,e),this.b=Jc(a,s,e-1/3)}return mt.colorSpaceToWorking(this,i),this}setStyle(e,t=Dn){function n(s){s!==void 0&&parseFloat(s)<1&&qe("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseFloat(s[1]))/100,Math.min(100,parseFloat(s[2]))/100,Math.min(100,parseFloat(s[3]))/100,t);break;case"hsl":case"hsla":if(s=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:qe("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);qe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Dn){const n=P0[e.toLowerCase()];return n!==void 0?this.setHex(n,t):qe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=vr(e.r),this.g=vr(e.g),this.b=vr(e.b),this}copyLinearToSRGB(e){return this.r=da(e.r),this.g=da(e.g),this.b=da(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Dn){return mt.workingToColorSpace(Rn.copy(this),e),Math.round(ct(Rn.r*255,0,255))*65536+Math.round(ct(Rn.g*255,0,255))*256+Math.round(ct(Rn.b*255,0,255))}getHexString(e=Dn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=mt.workingColorSpace){mt.workingToColorSpace(Rn.copy(this),t);const n=Rn.r,i=Rn.g,s=Rn.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=mt.workingColorSpace){return mt.workingToColorSpace(Rn.copy(this),t),e.r=Rn.r,e.g=Rn.g,e.b=Rn.b,e}getStyle(e=Dn){mt.workingToColorSpace(Rn.copy(this),e);const t=Rn.r,n=Rn.g,i=Rn.b;return e!==Dn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Tr),this.setHSL(Tr.h+e,Tr.s+t,Tr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Tr),e.getHSL(tl);const n=mo(Tr.h,tl.h,t),i=mo(Tr.s,tl.s,t),s=mo(Tr.l,tl.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Rn=new ke;ke.NAMES=P0;class gx extends On{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ys,this.environmentIntensity=1,this.environmentRotation=new ys,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Ii=new L,rr=new L,Qc=new L,sr=new L,zs=new L,ks=new L,Wd=new L,jc=new L,eu=new L,tu=new L,nu=new Yt,iu=new Yt,ru=new Yt;class Ai{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Ii.subVectors(e,t),i.cross(Ii);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Ii.subVectors(i,t),rr.subVectors(n,t),Qc.subVectors(e,t);const a=Ii.dot(Ii),o=Ii.dot(rr),l=Ii.dot(Qc),c=rr.dot(rr),u=rr.dot(Qc),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;const h=1/d,f=(c*l-o*u)*h,m=(a*u-o*l)*h;return s.set(1-f-m,m,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,sr)===null?!1:sr.x>=0&&sr.y>=0&&sr.x+sr.y<=1}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,sr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,sr.x),l.addScaledVector(a,sr.y),l.addScaledVector(o,sr.z),l)}static getInterpolatedAttribute(e,t,n,i,s,a){return nu.setScalar(0),iu.setScalar(0),ru.setScalar(0),nu.fromBufferAttribute(e,t),iu.fromBufferAttribute(e,n),ru.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(nu,s.x),a.addScaledVector(iu,s.y),a.addScaledVector(ru,s.z),a}static isFrontFacing(e,t,n,i){return Ii.subVectors(n,t),rr.subVectors(e,t),Ii.cross(rr).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ii.subVectors(this.c,this.b),rr.subVectors(this.a,this.b),Ii.cross(rr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ai.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ai.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return Ai.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Ai.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ai.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let a,o;zs.subVectors(i,n),ks.subVectors(s,n),jc.subVectors(e,n);const l=zs.dot(jc),c=ks.dot(jc);if(l<=0&&c<=0)return t.copy(n);eu.subVectors(e,i);const u=zs.dot(eu),d=ks.dot(eu);if(u>=0&&d<=u)return t.copy(i);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0&&l-u>0)return a=l/(l-u),t.copy(n).addScaledVector(zs,a);tu.subVectors(e,s);const f=zs.dot(tu),m=ks.dot(tu);if(m>=0&&f<=m)return t.copy(s);const _=f*c-l*m;if(_<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(ks,o);const p=u*m-f*d;if(p<=0&&d-u>=0&&f-m>=0)return Wd.subVectors(s,i),o=(d-u)/(d-u+(f-m)),t.copy(i).addScaledVector(Wd,o);const g=1/(p+_+h);return a=_*g,o=h*g,t.copy(n).addScaledVector(zs,a).addScaledVector(ks,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class As{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ni.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ni.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Ni.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ni):Ni.fromBufferAttribute(s,a),Ni.applyMatrix4(e.matrixWorld),this.expandByPoint(Ni);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),nl.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),nl.copy(n.boundingBox)),nl.applyMatrix4(e.matrixWorld),this.union(nl)}const i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ni),Ni.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ia),il.subVectors(this.max,Ia),Hs.subVectors(e.a,Ia),Gs.subVectors(e.b,Ia),Vs.subVectors(e.c,Ia),wr.subVectors(Gs,Hs),Ar.subVectors(Vs,Gs),es.subVectors(Hs,Vs);let t=[0,-wr.z,wr.y,0,-Ar.z,Ar.y,0,-es.z,es.y,wr.z,0,-wr.x,Ar.z,0,-Ar.x,es.z,0,-es.x,-wr.y,wr.x,0,-Ar.y,Ar.x,0,-es.y,es.x,0];return!su(t,Hs,Gs,Vs,il)||(t=[1,0,0,0,1,0,0,0,1],!su(t,Hs,Gs,Vs,il))?!1:(rl.crossVectors(wr,Ar),t=[rl.x,rl.y,rl.z],su(t,Hs,Gs,Vs,il))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ni).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ni).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ar[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ar[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ar[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ar[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ar[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ar[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ar[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ar[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ar),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ar=[new L,new L,new L,new L,new L,new L,new L,new L],Ni=new L,nl=new As,Hs=new L,Gs=new L,Vs=new L,wr=new L,Ar=new L,es=new L,Ia=new L,il=new L,rl=new L,ts=new L;function su(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){ts.fromArray(r,s);const o=i.x*Math.abs(ts.x)+i.y*Math.abs(ts.y)+i.z*Math.abs(ts.z),l=e.dot(ts),c=t.dot(ts),u=n.dot(ts);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const en=new L,sl=new Ve;let _x=0;class Nn extends Ts{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:_x++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=T0,this.updateRanges=[],this.gpuType=Bi,this.version=0,this._normalizationScale=e!==void 0?bc(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)sl.fromBufferAttribute(this,t),sl.applyMatrix3(e),this.setXY(t,sl.x,sl.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyMatrix3(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyMatrix4(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyNormalMatrix(e),this.setXYZ(t,en.x,en.y,en.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.transformDirection(e),this.setXYZ(t,en.x,en.y,en.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):yf(e,this.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):Ef(e,this.array)}}class D0 extends Nn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class L0 extends Nn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ut extends Nn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const vx=new As,Na=new L,au=new L;class Rs{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):vx.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Na.subVectors(e,this.center);const t=Na.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Na,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(au.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Na.copy(e.center).add(au)),this.expandByPoint(Na.copy(e.center).sub(au))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let xx=0;const yi=new Tt,ou=new On,Ws=new L,li=new As,Ua=new As,pn=new L;class un extends Ts{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xx++}),this.uuid=Kr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ov(e)?L0:D0)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ze().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return yi.makeRotationFromQuaternion(e),this.applyMatrix4(yi),this}rotateX(e){return yi.makeRotationX(e),this.applyMatrix4(yi),this}rotateY(e){return yi.makeRotationY(e),this.applyMatrix4(yi),this}rotateZ(e){return yi.makeRotationZ(e),this.applyMatrix4(yi),this}translate(e,t,n){return yi.makeTranslation(e,t,n),this.applyMatrix4(yi),this}scale(e,t,n){return yi.makeScale(e,t,n),this.applyMatrix4(yi),this}lookAt(e){return ou.lookAt(e),ou.updateMatrix(),this.applyMatrix4(ou.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ws).negate(),this.translate(Ws.x,Ws.y,Ws.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ut(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&qe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new As);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){vt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];li.setFromBufferAttribute(s),this.morphTargetsRelative?(pn.addVectors(this.boundingBox.min,li.min),this.boundingBox.expandByPoint(pn),pn.addVectors(this.boundingBox.max,li.max),this.boundingBox.expandByPoint(pn)):(this.boundingBox.expandByPoint(li.min),this.boundingBox.expandByPoint(li.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&vt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Rs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){vt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(li.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Ua.setFromBufferAttribute(o),this.morphTargetsRelative?(pn.addVectors(li.min,Ua.min),li.expandByPoint(pn),pn.addVectors(li.max,Ua.max),li.expandByPoint(pn)):(li.expandByPoint(Ua.min),li.expandByPoint(Ua.max))}li.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)pn.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(pn));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)pn.fromBufferAttribute(o,c),l&&(Ws.fromBufferAttribute(e,c),pn.add(Ws)),i=Math.max(i,n.distanceToSquared(pn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&vt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){vt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Nn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[],c=new Uint8Array(n.count);for(let C=0;C<n.count;C++)o[C]=new L,l[C]=new L;const u=new L,d=new L,h=new L,f=new Ve,m=new Ve,_=new Ve,p=new L,g=new L;function x(C,A,U){c[C]=c[A]=c[U]=1,u.fromBufferAttribute(n,C),d.fromBufferAttribute(n,A),h.fromBufferAttribute(n,U),f.fromBufferAttribute(s,C),m.fromBufferAttribute(s,A),_.fromBufferAttribute(s,U),d.sub(u),h.sub(u),m.sub(f),_.sub(f);const I=1/(m.x*_.y-_.x*m.y);isFinite(I)&&(p.copy(d).multiplyScalar(_.y).addScaledVector(h,-m.y).multiplyScalar(I),g.copy(h).multiplyScalar(m.x).addScaledVector(d,-_.x).multiplyScalar(I),o[C].add(p),o[A].add(p),o[U].add(p),l[C].add(g),l[A].add(g),l[U].add(g))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let C=0,A=w.length;C<A;++C){const U=w[C],I=U.start,H=U.count;for(let D=I,z=I+H;D<z;D+=3)x(e.getX(D+0),e.getX(D+1),e.getX(D+2))}const S=new L,b=new L,T=new L,v=new L;function M(C){T.fromBufferAttribute(i,C),v.copy(T);const A=o[C];S.copy(A),S.sub(T.multiplyScalar(T.dot(A))).normalize(),b.crossVectors(v,A);const I=b.dot(l[C])<0?-1:1;a.setXYZW(C,S.x,S.y,S.z,I)}for(let C=0,A=n.count;C<A;++C)c[C]&&M(C);this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Nn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);const i=new L,s=new L,a=new L,o=new L,l=new L,c=new L,u=new L,d=new L;if(e)for(let h=0,f=e.count;h<f;h+=3){const m=e.getX(h+0),_=e.getX(h+1),p=e.getX(h+2);i.fromBufferAttribute(t,m),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,p),u.subVectors(a,s),d.subVectors(i,s),u.cross(d),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(u),l.add(u),c.add(u),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)i.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),d.subVectors(i,s),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)pn.fromBufferAttribute(e,t),pn.normalize(),e.setXYZ(t,pn.x,pn.y,pn.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u);let f=0,m=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*u;for(let g=0;g<u;g++)h[m++]=c[f++]}return new Nn(h,u,d)}if(this.index===null)return qe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new un,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,d=c.length;u<d;u++){const h=c[u],f=e(h,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const f=c[d];u.push(f.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Sx{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=T0,this.updateRanges=[],this.version=0,this.uuid=Kr()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});const t=Xd(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);const n=new this.array.constructor(e.arrayBuffers[t]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});const t=Xd(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));const n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}}function Xd(r){return r.buffer._uuid===void 0&&(r.buffer._uuid=Kr()),r.byteOffset===0&&r.byteLength===r.buffer.byteLength?r.buffer._uuid:r.buffer._uuid+":"+r.byteOffset+":"+r.byteLength}const kn=new L;class fc{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i,this._normalizationScale=e!==void 0?bc(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)kn.fromBufferAttribute(this,t),kn.applyMatrix4(e),this.setXYZ(t,kn.x,kn.y,kn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)kn.fromBufferAttribute(this,t),kn.applyNormalMatrix(e),this.setXYZ(t,kn.x,kn.y,kn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)kn.fromBufferAttribute(this,t),kn.transformDirection(e),this.setXYZ(t,kn.x,kn.y,kn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){hc("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Nn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new fc(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){hc("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):yf(e,this.data.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):Ef(e,this.data.array)}}const lu=new L,Mx=new L,yx=new Ze;class Pr{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=lu.subVectors(n,t).cross(Mx.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const i=e.delta(lu),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||yx.getNormalMatrix(e),i=this.coplanarPoint(lu).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Ex=0;class Cs extends Ts{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ex++}),this.uuid=Kr(),this.name="",this.type="Material",this.blending=fo,this.side=Ss,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=f0,this.blendDst=d0,this.blendEquation=ta,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ke(0,0,0),this.blendAlpha=0,this.depthFunc=Ao,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Dv,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Wc,this.stencilZFail=Wc,this.stencilZPass=Wc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){qe(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){qe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ke().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Pr().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ve().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ve().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class I0 extends Cs{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ke(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Xs;const Fa=new L,Ys=new L,qs=new L,$s=new Ve,Oa=new Ve,N0=new Tt,al=new L,Ba=new L,ol=new L,Yd=new Ve,cu=new Ve,qd=new Ve;class bx extends On{constructor(e=new I0){if(super(),this.isSprite=!0,this.type="Sprite",Xs===void 0){Xs=new un;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Sx(t,5);Xs.setIndex([0,1,2,0,2,3]),Xs.setAttribute("position",new fc(n,3,0,!1)),Xs.setAttribute("uv",new fc(n,2,3,!1))}this.geometry=Xs,this.material=e,this.center=new Ve(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&vt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ys.setFromMatrixScale(this.matrixWorld),N0.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),qs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ys.multiplyScalar(-qs.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const a=this.center;ll(al.set(-.5,-.5,0),qs,a,Ys,i,s),ll(Ba.set(.5,-.5,0),qs,a,Ys,i,s),ll(ol.set(.5,.5,0),qs,a,Ys,i,s),Yd.set(0,0),cu.set(1,0),qd.set(1,1);let o=e.ray.intersectTriangle(al,Ba,ol,!1,Fa);if(o===null&&(ll(Ba.set(-.5,.5,0),qs,a,Ys,i,s),cu.set(0,1),o=e.ray.intersectTriangle(al,ol,Ba,!1,Fa),o===null))return;const l=e.ray.origin.distanceTo(Fa);l<e.near||l>e.far||t.push({distance:l,point:Fa.clone(),uv:Ai.getInterpolation(Fa,al,Ba,ol,Yd,cu,qd,new Ve),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){const t=super.toJSON(e);return t.object.center=this.center.toArray(),t}}function ll(r,e,t,n,i,s){$s.subVectors(r,t).addScalar(.5).multiply(n),i!==void 0?(Oa.x=s*$s.x-i*$s.y,Oa.y=i*$s.x+s*$s.y):Oa.copy($s),r.copy(e),r.x+=Oa.x,r.y+=Oa.y,r.applyMatrix4(N0)}const or=new L,uu=new L,cl=new L,ul=new L;class Tf{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,or)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=or.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(or.copy(this.origin).addScaledVector(this.direction,t),or.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){uu.copy(e).add(t).multiplyScalar(.5),cl.copy(t).sub(e).normalize(),ul.copy(this.origin).sub(uu);const s=e.distanceTo(t)*.5,a=-this.direction.dot(cl),o=ul.dot(this.direction),l=-ul.dot(cl),c=ul.lengthSq(),u=Math.abs(1-a*a);let d,h,f,m;if(u>0)if(d=a*l-o,h=a*o-l,m=s*u,d>=0)if(h>=-m)if(h<=m){const _=1/u;d*=_,h*=_,f=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h=-s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h<=-m?(d=Math.max(0,-(-a*s+o)),h=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c):h<=m?(d=0,h=Math.min(Math.max(-s,-l),s),f=h*(h+2*l)+c):(d=Math.max(0,-(a*s+o)),h=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c);else h=a>0?-s:s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(uu).addScaledVector(cl,h),f}intersectSphere(e,t){if(e.radius<0)return null;or.subVectors(e.center,this.origin);const n=or.dot(this.direction),i=or.dot(or)-n*n,s=e.radius*e.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,i=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,i=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),d>=0?(o=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,or)!==null}intersectTriangle(e,t,n,i,s){const a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,d=e.x-a.x,h=e.y-a.y,f=e.z-a.z,m=t.x-a.x,_=t.y-a.y,p=t.z-a.z,g=n.x-a.x,x=n.y-a.y,w=n.z-a.z,S=Math.abs(l),b=Math.abs(c),T=Math.abs(u);let v,M,C,A,U,I,H,D,z,X,F,Q;if(S>=b&&S>=T?(C=l,I=d,z=m,Q=g,l>=0?(v=c,M=u,A=h,U=f,H=_,D=p,X=x,F=w):(v=u,M=c,A=f,U=h,H=p,D=_,X=w,F=x)):b>=T?(C=c,I=h,z=_,Q=x,c>=0?(v=u,M=l,A=f,U=d,H=p,D=m,X=w,F=g):(v=l,M=u,A=d,U=f,H=m,D=p,X=g,F=w)):(C=u,I=f,z=p,Q=w,u>=0?(v=l,M=c,A=d,U=h,H=m,D=_,X=g,F=x):(v=c,M=l,A=h,U=d,H=_,D=m,X=x,F=g)),C===0)return null;const W=v/C,P=M/C,q=1/C,le=A-W*I,Ee=U-P*I,Y=H-W*z,ae=D-P*z,_e=X-W*Q,Me=F-P*Q,ce=_e*ae-Me*Y,pe=le*Me-Ee*_e,Ye=Y*Ee-ae*le;if(i){if(ce<0||pe<0||Ye<0)return null}else if((ce<0||pe<0||Ye<0)&&(ce>0||pe>0||Ye>0))return null;const se=ce+pe+Ye;if(se===0)return null;const Pe=q*(ce*I+pe*z+Ye*Q);return(se>0?Pe<0:Pe>0)?null:this.at(Pe/se,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class nn extends Cs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ys,this.combine=p0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const $d=new Tt,ns=new Tf,hl=new Rs,Kd=new L,fl=new L,dl=new L,pl=new L,hu=new L,ml=new L,Zd=new L,gl=new L;class lt extends On{constructor(e=new un,t=new nn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){ml.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],d=s[l];u!==0&&(hu.fromBufferAttribute(d,e),a?ml.addScaledVector(hu,u):ml.addScaledVector(hu.sub(t),u))}t.add(ml)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),hl.copy(n.boundingSphere),hl.applyMatrix4(s),ns.copy(e.ray).recast(e.near),!(hl.containsPoint(ns.origin)===!1&&(ns.intersectSphere(hl,Kd)===null||ns.origin.distanceToSquared(Kd)>(e.far-e.near)**2))&&($d.copy(s).invert(),ns.copy(e.ray).applyMatrix4($d),!(n.boundingBox!==null&&ns.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ns)))}_computeIntersections(e,t,n){let i;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=h.length;m<_;m++){const p=h[m],g=a[p.materialIndex],x=Math.max(p.start,f.start),w=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let S=x,b=w;S<b;S+=3){const T=o.getX(S),v=o.getX(S+1),M=o.getX(S+2);i=_l(this,g,e,n,c,u,d,T,v,M),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const m=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let p=m,g=_;p<g;p+=3){const x=o.getX(p),w=o.getX(p+1),S=o.getX(p+2);i=_l(this,a,e,n,c,u,d,x,w,S),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,_=h.length;m<_;m++){const p=h[m],g=a[p.materialIndex],x=Math.max(p.start,f.start),w=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let S=x,b=w;S<b;S+=3){const T=S,v=S+1,M=S+2;i=_l(this,g,e,n,c,u,d,T,v,M),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const m=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let p=m,g=_;p<g;p+=3){const x=p,w=p+1,S=p+2;i=_l(this,a,e,n,c,u,d,x,w,S),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}}function Tx(r,e,t,n,i,s,a,o){let l;if(e.side===Fn?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,e.side===Ss,o),l===null)return null;gl.copy(o),gl.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(gl);return c<t.near||c>t.far?null:{distance:c,point:gl.clone(),object:r}}function _l(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,fl),r.getVertexPosition(l,dl),r.getVertexPosition(c,pl);const u=Tx(r,e,t,n,fl,dl,pl,Zd);if(u){const d=new L;Ai.getBarycoord(Zd,fl,dl,pl,d),i&&(u.uv=Ai.getInterpolatedAttribute(i,o,l,c,d,new Ve)),s&&(u.uv1=Ai.getInterpolatedAttribute(s,o,l,c,d,new Ve)),a&&(u.normal=Ai.getInterpolatedAttribute(a,o,l,c,d,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new L,materialIndex:0};Ai.getNormal(fl,dl,pl,h.normal),u.face=h,u.barycoord=d}return u}class U0 extends En{constructor(e=null,t=1,n=1,i,s,a,o,l,c=Mn,u=Mn,d,h){super(null,a,o,l,c,u,i,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class go extends Nn{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ks=new Tt,Jd=new Tt,vl=[],Qd=new As,wx=new Tt,za=new lt,ka=new Rs;class Ax extends lt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new go(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,wx)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new As),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ks),Qd.copy(e.boundingBox).applyMatrix4(Ks),this.boundingBox.union(Qd)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Rs),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ks),ka.copy(e.boundingSphere).applyMatrix4(Ks),this.boundingSphere.union(ka)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(za.geometry=this.geometry,za.material=this.material,za.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ka.copy(this.boundingSphere),ka.applyMatrix4(n),e.ray.intersectsSphere(ka)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Ks),Jd.multiplyMatrices(n,Ks),za.matrixWorld=Jd,za.raycast(e,vl);for(let a=0,o=vl.length;a<o;a++){const l=vl[a];l.instanceId=s,l.object=this,t.push(l)}vl.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new go(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new U0(new Float32Array(i*this.count),i,this.count,_f,Bi));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;return s[l]=o,s.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const is=new Rs,Rx=new Ve(.5,.5),xl=new L;class dc{constructor(e=new Pr,t=new Pr,n=new Pr,i=new Pr,s=new Pr,a=new Pr){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=zi,n=!1){const i=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],d=s[5],h=s[6],f=s[7],m=s[8],_=s[9],p=s[10],g=s[11],x=s[12],w=s[13],S=s[14],b=s[15];if(i[0].setComponents(c-a,f-u,g-m,b-x).normalize(),i[1].setComponents(c+a,f+u,g+m,b+x).normalize(),i[2].setComponents(c+o,f+d,g+_,b+w).normalize(),i[3].setComponents(c-o,f-d,g-_,b-w).normalize(),n)i[4].setComponents(l,h,p,S).normalize(),i[5].setComponents(c-l,f-h,g-p,b-S).normalize();else if(i[4].setComponents(c-l,f-h,g-p,b-S).normalize(),t===zi)i[5].setComponents(c+l,f+h,g+p,b+S).normalize();else if(t===uc)i[5].setComponents(l,h,p,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),is.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),is.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(is)}intersectsSprite(e){is.center.set(0,0,0);const t=Rx.distanceTo(e.center);return is.radius=.7071067811865476+t,is.applyMatrix4(e.matrixWorld),this.intersectsSphere(is)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(xl.x=i.normal.x>0?e.max.x:e.min.x,xl.y=i.normal.y>0?e.max.y:e.min.y,xl.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(xl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const jd=new Tt;class wf{constructor(){this.coordinateSystem=zi,this._frustums=[],this._count=0}setFromArrayCamera(e){const t=e.cameras,n=this._frustums;for(let i=0;i<t.length;i++){const s=t[i];jd.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),n[i]===void 0&&(n[i]=new dc),n[i].setFromProjectionMatrix(jd,s.coordinateSystem,s.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;const t=this._frustums,n=e._frustums;for(let i=0;i<e._count;i++)t[i]===void 0&&(t[i]=new dc),t[i].copy(n[i]);return this._count=e._count,this}clone(){return new wf().copy(this)}}class Af extends Cs{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ke(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const pc=new L,mc=new L,ep=new Tt,Ha=new Tf,Sl=new Rs,fu=new L,tp=new L;class F0 extends On{constructor(e=new un,t=new Af){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)pc.fromBufferAttribute(t,i-1),mc.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=pc.distanceTo(mc);e.setAttribute("lineDistance",new Ut(n,1))}else qe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Sl.copy(n.boundingSphere),Sl.applyMatrix4(i),Sl.radius+=s,e.ray.intersectsSphere(Sl)===!1)return;ep.copy(i).invert(),Ha.copy(e.ray).applyMatrix4(ep);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let _=f,p=m-1;_<p;_+=c){const g=u.getX(_),x=u.getX(_+1),w=Ml(this,e,Ha,l,g,x,_);w&&t.push(w)}if(this.isLineLoop){const _=u.getX(m-1),p=u.getX(f),g=Ml(this,e,Ha,l,_,p,m-1);g&&t.push(g)}}else{const f=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let _=f,p=m-1;_<p;_+=c){const g=Ml(this,e,Ha,l,_,_+1,_);g&&t.push(g)}if(this.isLineLoop){const _=Ml(this,e,Ha,l,m-1,f,m-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ml(r,e,t,n,i,s,a){const o=r.geometry.attributes.position;if(pc.fromBufferAttribute(o,i),mc.fromBufferAttribute(o,s),t.distanceSqToSegment(pc,mc,fu,tp)>n)return;fu.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(fu);if(!(c<e.near||c>e.far))return{distance:c,point:tp.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}const np=new L,ip=new L;class Cx extends F0{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)np.fromBufferAttribute(t,i),ip.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+np.distanceTo(ip);e.setAttribute("lineDistance",new Ut(n,1))}else qe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Px extends Cs{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ke(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const rp=new Tt,Ch=new Tf,yl=new Rs,El=new L;class O0 extends On{constructor(e=new un,t=new Px){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),yl.copy(n.boundingSphere),yl.applyMatrix4(i),yl.radius+=s,e.ray.intersectsSphere(yl)===!1)return;rp.copy(i).invert(),Ch.copy(e.ray).applyMatrix4(rp);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const h=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=h,_=f;m<_;m++){const p=c.getX(m);El.fromBufferAttribute(d,p),sp(El,p,l,i,e,t,this)}}else{const h=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let m=h,_=f;m<_;m++)El.fromBufferAttribute(d,m),sp(El,m,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function sp(r,e,t,n,i,s,a){const o=Ch.distanceSqToPoint(r);if(o<t){const l=new L;Ch.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class B0 extends En{constructor(e=[],t=Ma,n,i,s,a,o,l,c,u){super(e,t,n,i,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Rf extends En{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ea extends En{constructor(e,t,n=tr,i,s,a,o=Mn,l=Mn,c,u=qr,d=1){if(u!==qr&&u!==Br)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,i,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new bf(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class z0 extends Ea{constructor(e,t=tr,n=Ma,i,s,a=Mn,o=Mn,l,c=qr){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,i,s,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class k0 extends En{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Zi extends un{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],d=[];let h=0,f=0;m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,i,a,2),m("x","z","y",1,-1,e,n,-t,i,a,3),m("x","y","z",1,-1,e,t,n,i,s,4),m("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Ut(c,3)),this.setAttribute("normal",new Ut(u,3)),this.setAttribute("uv",new Ut(d,2));function m(_,p,g,x,w,S,b,T,v,M,C){const A=S/v,U=b/M,I=S/2,H=b/2,D=T/2,z=v+1,X=M+1;let F=0,Q=0;const W=new L;for(let P=0;P<X;P++){const q=P*U-H;for(let le=0;le<z;le++){const Ee=le*A-I;W[_]=Ee*x,W[p]=q*w,W[g]=D,c.push(W.x,W.y,W.z),W[_]=0,W[p]=0,W[g]=T>0?1:-1,u.push(W.x,W.y,W.z),d.push(le/v),d.push(1-P/M),F+=1}}for(let P=0;P<M;P++)for(let q=0;q<v;q++){const le=h+q+z*P,Ee=h+q+z*(P+1),Y=h+(q+1)+z*(P+1),ae=h+(q+1)+z*P;l.push(le,Ee,ae),l.push(Ee,Y,ae),Q+=6}o.addGroup(f,Q,C),f+=Q,h+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class gc extends un{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new L,u=new Ve;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=t;d++,h+=3){const f=n+d/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[h]/e+1)/2,u.y=(a[h+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new Ut(a,3)),this.setAttribute("normal",new Ut(o,3)),this.setAttribute("uv",new Ut(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gc(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ji extends un{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const u=[],d=[],h=[],f=[];let m=0;const _=[],p=n/2;let g=0;x(),a===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(u),this.setAttribute("position",new Ut(d,3)),this.setAttribute("normal",new Ut(h,3)),this.setAttribute("uv",new Ut(f,2));function x(){const S=new L,b=new L;let T=0;const v=(t-e)/n;for(let M=0;M<=s;M++){const C=[],A=M/s,U=A*(t-e)+e;for(let I=0;I<=i;I++){const H=I/i,D=H*l+o,z=Math.sin(D),X=Math.cos(D);b.x=U*z,b.y=-A*n+p,b.z=U*X,d.push(b.x,b.y,b.z),S.set(z,v,X).normalize(),h.push(S.x,S.y,S.z),f.push(H,1-A),C.push(m++)}_.push(C)}for(let M=0;M<i;M++)for(let C=0;C<s;C++){const A=_[C][M],U=_[C+1][M],I=_[C+1][M+1],H=_[C][M+1];(e>0||C!==0)&&(u.push(A,U,H),T+=3),(t>0||C!==s-1)&&(u.push(U,I,H),T+=3)}c.addGroup(g,T,0),g+=T}function w(S){const b=m,T=new Ve,v=new L;let M=0;const C=S===!0?e:t,A=S===!0?1:-1;for(let I=1;I<=i;I++)d.push(0,p*A,0),h.push(0,A,0),f.push(.5,.5),m++;const U=m;for(let I=0;I<=i;I++){const D=I/i*l+o,z=Math.cos(D),X=Math.sin(D);v.x=C*X,v.y=p*A,v.z=C*z,d.push(v.x,v.y,v.z),h.push(0,A,0),T.x=z*.5+.5,T.y=X*.5*A+.5,f.push(T.x,T.y),m++}for(let I=0;I<i;I++){const H=b+I,D=U+I;S===!0?u.push(D,D+1,H):u.push(D+1,D,H),M+=3}c.addGroup(g,M,S===!0?1:2),g+=M}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ji(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Cf extends Ji{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Cf(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class H0{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){qe("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const s=n.length;let a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(s-1);const u=n[i],h=n[i+1]-u,f=(a-u)/h;return(i+f)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const a=this.getPoint(i),o=this.getPoint(s),l=t||(a.isVector2?new Ve:new L);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new L,i=[],s=[],a=[],o=new L,l=new Tt;for(let f=0;f<=e;f++){const m=f/e;i[f]=this.getTangentAt(m,new L)}s[0]=new L,a[0]=new L;let c=Number.MAX_VALUE;const u=Math.abs(i[0].x),d=Math.abs(i[0].y),h=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),h<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(ct(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,m))}a[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(ct(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(i[m],f*m)),a[m].crossVectors(i[m],s[m])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}}class Dx extends H0{constructor(e=0,t=0,n=1,i=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new Ve){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(a?s=0:s=i),this.aClockwise===!0&&!a&&(s===i?s=-i:s=s-i);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=l-this.aX,f=c-this.aY;l=h*u-f*d+this.aX,c=h*d+f*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}function Pf(){let r=0,e=0,t=0,n=0;function i(s,a,o,l){r=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){i(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,d){let h=(a-s)/c-(o-s)/(c+u)+(o-a)/u,f=(o-a)/u-(l-a)/(u+d)+(l-o)/d;h*=u,f*=u,i(a,o,h,f)},calc:function(s){const a=s*s,o=a*s;return r+e*s+t*a+n*o}}}const ap=new L,op=new L,du=new Pf,pu=new Pf,mu=new Pf;class lp extends H0{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new L){const n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=i[(o-1)%s]:(op.subVectors(i[0],i[1]).add(i[0]),c=op);const d=i[o%s],h=i[(o+1)%s];if(this.closed||o+2<s?u=i[(o+2)%s]:(ap.subVectors(i[s-1],i[s-2]).add(i[s-1]),u=ap),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(h),f),p=Math.pow(h.distanceToSquared(u),f);_<1e-4&&(_=1),m<1e-4&&(m=_),p<1e-4&&(p=_),du.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,m,_,p),pu.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,m,_,p),mu.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,m,_,p)}else this.curveType==="catmullrom"&&(du.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),pu.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),mu.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return n.set(du.calc(l),pu.calc(l),mu.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new L().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}class ji extends un{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,u=l+1,d=e/o,h=t/l,f=[],m=[],_=[],p=[];for(let g=0;g<u;g++){const x=g*h-a;for(let w=0;w<c;w++){const S=w*d-s;m.push(S,-x,0),_.push(0,0,1),p.push(w/o),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let x=0;x<o;x++){const w=x+c*g,S=x+c*(g+1),b=x+1+c*(g+1),T=x+1+c*g;f.push(w,S,T),f.push(S,b,T)}this.setIndex(f),this.setAttribute("position",new Ut(m,3)),this.setAttribute("normal",new Ut(_,3)),this.setAttribute("uv",new Ut(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ji(e.width,e.height,e.widthSegments,e.heightSegments)}}class pr extends un{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const u=[],d=new L,h=new L,f=[],m=[],_=[],p=[];for(let g=0;g<=n;g++){const x=[],w=g/n,S=a+w*o,b=e*Math.cos(S),T=Math.sqrt(e*e-b*b);let v=0;g===0&&a===0?v=.5/t:g===n&&l===Math.PI&&(v=-.5/t);for(let M=0;M<=t;M++){const C=M/t,A=i+C*s;d.x=-T*Math.cos(A),d.y=b,d.z=T*Math.sin(A),m.push(d.x,d.y,d.z),h.copy(d).normalize(),_.push(h.x,h.y,h.z),p.push(C+v,1-w),x.push(c++)}u.push(x)}for(let g=0;g<n;g++)for(let x=0;x<t;x++){const w=u[g][x+1],S=u[g][x],b=u[g+1][x],T=u[g+1][x+1];(g!==0||a>0)&&f.push(w,S,T),(g!==n-1||l<Math.PI)&&f.push(S,b,T)}this.setIndex(f),this.setAttribute("position",new Ut(m,3)),this.setAttribute("normal",new Ut(_,3)),this.setAttribute("uv",new Ut(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Df extends un{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s,thetaStart:a,thetaLength:o},n=Math.floor(n),i=Math.floor(i);const l=[],c=[],u=[],d=[],h=new L,f=new L,m=new L;for(let _=0;_<=n;_++){const p=a+_/n*o;for(let g=0;g<=i;g++){const x=g/i*s;f.x=(e+t*Math.cos(p))*Math.cos(x),f.y=(e+t*Math.cos(p))*Math.sin(x),f.z=t*Math.sin(p),c.push(f.x,f.y,f.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),m.subVectors(f,h).normalize(),u.push(m.x,m.y,m.z),d.push(g/i),d.push(_/n)}}for(let _=1;_<=n;_++)for(let p=1;p<=i;p++){const g=(i+1)*_+p-1,x=(i+1)*(_-1)+p-1,w=(i+1)*(_-1)+p,S=(i+1)*_+p;l.push(g,x,S),l.push(x,w,S)}this.setIndex(l),this.setAttribute("position",new Ut(c,3)),this.setAttribute("normal",new Ut(u,3)),this.setAttribute("uv",new Ut(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Df(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}}function ba(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];if(cp(i))i.isRenderTargetTexture?(qe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(cp(i[0])){const s=[];for(let a=0,o=i.length;a<o;a++)s[a]=i[a].clone();e[t][n]=s}else e[t][n]=i.slice();else e[t][n]=i}}return e}function Gn(r){const e={};for(let t=0;t<r.length;t++){const n=ba(r[t]);for(const i in n)e[i]=n[i]}return e}function cp(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function Lx(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function G0(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:mt.workingColorSpace}const Io={clone:ba,merge:Gn};var Ix=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Nx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Nt extends Cs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ix,this.fragmentShader=Nx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ba(e.uniforms),this.uniformsGroups=Lx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new ke().setHex(i.value);break;case"v2":this.uniforms[n].value=new Ve().fromArray(i.value);break;case"v3":this.uniforms[n].value=new L().fromArray(i.value);break;case"v4":this.uniforms[n].value=new Yt().fromArray(i.value);break;case"m3":this.uniforms[n].value=new Ze().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Tt().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class V0 extends Nt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ux extends Cs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Cv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Fx extends Cs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Ox extends Af{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}const gu={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(up(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!up(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function up(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class W0{constructor(e,t,n){const i=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,s===!1&&i.onStart!==void 0&&i.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,i.onProgress!==void 0&&i.onProgress(u,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){const d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){const f=c[d],m=c[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Bx=new W0;class Lf{constructor(e){this.manager=e!==void 0?e:Bx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}}Lf.DEFAULT_MATERIAL_NAME="__DEFAULT";const Zs=new WeakMap;class zx extends Lf{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=gu.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let d=Zs.get(a);d===void 0&&(d=[],Zs.set(a,d)),d.push({onLoad:t,onError:i})}return a}const o=Do("img");function l(){u(),t&&t(this);const d=Zs.get(this)||[];for(let h=0;h<d.length;h++){const f=d[h];f.onLoad&&f.onLoad(this)}Zs.delete(this),s.manager.itemEnd(e)}function c(d){u(),i&&i(d),gu.remove(`image:${e}`);const h=Zs.get(this)||[];for(let f=0;f<h.length;f++){const m=h[f];m.onError&&m.onError(d)}Zs.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),gu.add(`image:${e}`,o),s.manager.itemStart(e),o.fetchPriority=this.priority,o.src=e,o}}class kx extends Lf{constructor(e){super(e)}load(e,t,n,i){const s=new En,a=new zx(this.manager);return a.setPriority(this.priority),a.setCache(this.cache),a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}const bl=new L,Tl=new ws,Hi=new L;class X0 extends On{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Tt,this.projectionMatrix=new Tt,this.projectionMatrixInverse=new Tt,this.coordinateSystem=zi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(bl,Tl,Hi),Hi.x===1&&Hi.y===1&&Hi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(bl,Tl,Hi.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(bl,Tl,Hi),Hi.x===1&&Hi.y===1&&Hi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(bl,Tl,Hi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Rr=new L,hp=new Ve,fp=new Ve;class Fi extends X0{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Lo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(po*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Lo*2*Math.atan(Math.tan(po*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Rr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Rr.x,Rr.y).multiplyScalar(-e/Rr.z),Rr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Rr.x,Rr.y).multiplyScalar(-e/Rr.z)}getViewSize(e,t){return this.getViewBounds(e,hp,fp),t.subVectors(fp,hp)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(po*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Y0 extends X0{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Js=-90,Qs=1;class Ph extends On{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Fi(Js,Qs,e,t);i.layers=this.layers,this.add(i);const s=new Fi(Js,Qs,e,t);s.layers=this.layers,this.add(s);const a=new Fi(Js,Qs,e,t);a.layers=this.layers,this.add(a);const o=new Fi(Js,Qs,e,t);o.layers=this.layers,this.add(o);const l=new Fi(Js,Qs,e,t);l.layers=this.layers,this.add(l);const c=new Fi(Js,Qs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===zi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===uc)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=_,e.setRenderTarget(n,5,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Hx extends Fi{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}}class q0{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Gx.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Gx(){this._document.hidden===!1&&this.reset()}function dp(r,e,t,n){const i=Vx(n);switch(t){case S0:return r*e;case _f:return r*e/i.components*i.byteLength;case vf:return r*e/i.components*i.byteLength;case Ms:return r*e*2/i.components*i.byteLength;case xf:return r*e*2/i.components*i.byteLength;case M0:return r*e*3/i.components*i.byteLength;case Ki:return r*e*4/i.components*i.byteLength;case Sf:return r*e*4/i.components*i.byteLength;case Hl:case Gl:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Vl:case Wl:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case eh:case nh:return Math.max(r,16)*Math.max(e,8)/4;case ju:case th:return Math.max(r,8)*Math.max(e,8)/2;case ih:case rh:case ah:case oh:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case sh:case ac:case lh:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case ch:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case uh:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case hh:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case fh:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case dh:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case ph:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case mh:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case gh:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case _h:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case vh:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case xh:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Sh:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Mh:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case yh:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Eh:case bh:case Th:return Math.ceil(r/4)*Math.ceil(e/4)*16;case wh:case Ah:return Math.ceil(r/4)*Math.ceil(e/4)*8;case oc:case Rh:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Vx(r){switch(r){case wi:case g0:return{byteLength:1,components:1};case Po:case _0:case ei:return{byteLength:2,components:1};case mf:case gf:return{byteLength:2,components:4};case tr:case pf:case Bi:return{byteLength:4,components:1};case v0:case x0:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:af}}));typeof window<"u"&&(window.__THREE__?qe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=af);function $0(){let r=null,e=!1,t=null,n=null;function i(s,a){n=r.requestAnimationFrame(i),t(s,a)}return{start:function(){e!==!0&&t!==null&&r!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Wx(r){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,d=c.byteLength,h=r.createBuffer();r.bindBuffer(l,h),r.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=r.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const u=l.array,d=l.updateRanges;if(r.bindBuffer(c,o),d.length===0)r.bufferSubData(c,0,u);else{d.sort((f,m)=>f.start-m.start);let h=0;for(let f=1;f<d.length;f++){const m=d[h],_=d[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++h,d[h]=_)}d.length=h+1;for(let f=0,m=d.length;f<m;f++){const _=d[f];r.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(r.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}var Xx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Yx=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,qx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,$x=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Kx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Zx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Jx=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Qx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,jx=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,eS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,tS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,nS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,iS=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,rS=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,sS=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,aS=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,oS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,lS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,uS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,hS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,fS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,dS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,pS=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,mS=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,gS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,_S=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,vS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,SS="gl_FragColor = linearToOutputTexel( gl_FragColor );",MS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,yS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,ES=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,bS=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,TS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,wS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,AS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,RS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,CS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,PS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,DS=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,LS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,IS=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,NS=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,US=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,FS=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,OS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,BS=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,zS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,kS=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,HS=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,GS=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,VS=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,WS=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,XS=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,YS=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,qS=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$S=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,KS=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ZS=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,JS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,QS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,jS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,eM=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,tM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,nM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,iM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,rM=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,sM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,aM=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,oM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,cM=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,uM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,dM=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,pM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,_M=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,vM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,xM=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,SM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,MM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,yM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,EM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,bM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,TM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wM=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,AM=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,RM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,CM=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,PM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,DM=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,LM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,IM=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,NM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,UM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,FM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,OM=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,BM=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,zM=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,kM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,HM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,GM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,VM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const WM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,XM=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,YM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qM=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$M=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,KM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ZM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,JM=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,QM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,jM=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,ey=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ty=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ny=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,iy=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ry=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,sy=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ay=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,oy=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ly=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,cy=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uy=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,hy=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,fy=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dy=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,py=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,my=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gy=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_y=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vy=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,xy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Sy=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,My=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,yy=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ey=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,nt={alphahash_fragment:Xx,alphahash_pars_fragment:Yx,alphamap_fragment:qx,alphamap_pars_fragment:$x,alphatest_fragment:Kx,alphatest_pars_fragment:Zx,aomap_fragment:Jx,aomap_pars_fragment:Qx,batching_pars_vertex:jx,batching_vertex:eS,begin_vertex:tS,beginnormal_vertex:nS,bsdfs:iS,iridescence_fragment:rS,bumpmap_pars_fragment:sS,clipping_planes_fragment:aS,clipping_planes_pars_fragment:oS,clipping_planes_pars_vertex:lS,clipping_planes_vertex:cS,color_fragment:uS,color_pars_fragment:hS,color_pars_vertex:fS,color_vertex:dS,common:pS,defaultnormal_vertex:mS,displacementmap_pars_vertex:gS,displacementmap_vertex:_S,emissivemap_fragment:vS,emissivemap_pars_fragment:xS,colorspace_fragment:SS,colorspace_pars_fragment:MS,envmap_fragment:yS,envmap_common_pars_fragment:ES,envmap_pars_fragment:bS,envmap_pars_vertex:TS,envmap_physical_pars_fragment:FS,envmap_vertex:wS,fog_vertex:AS,fog_pars_vertex:RS,fog_fragment:CS,fog_pars_fragment:PS,gradientmap_pars_fragment:DS,lightmap_pars_fragment:LS,lights_lambert_fragment:IS,lights_lambert_pars_fragment:NS,lights_pars_begin:US,lights_toon_fragment:OS,lights_toon_pars_fragment:BS,lights_phong_fragment:zS,lights_phong_pars_fragment:kS,lights_physical_fragment:HS,lights_physical_pars_fragment:GS,lights_fragment_begin:VS,lights_fragment_maps:WS,lights_fragment_end:XS,lightprobes_pars_fragment:YS,logdepthbuf_fragment:qS,logdepthbuf_pars_fragment:$S,logdepthbuf_pars_vertex:KS,logdepthbuf_vertex:ZS,map_fragment:JS,map_pars_fragment:QS,map_particle_fragment:jS,map_particle_pars_fragment:eM,metalnessmap_fragment:tM,metalnessmap_pars_fragment:nM,morphinstance_vertex:iM,morphcolor_vertex:rM,morphnormal_vertex:sM,morphtarget_pars_vertex:aM,morphtarget_vertex:oM,normal_fragment_begin:lM,normal_fragment_maps:cM,normal_pars_fragment:uM,normal_pars_vertex:hM,normal_vertex:fM,normalmap_pars_fragment:dM,clearcoat_normal_fragment_begin:pM,clearcoat_normal_fragment_maps:mM,clearcoat_pars_fragment:gM,iridescence_pars_fragment:_M,opaque_fragment:vM,packing:xM,premultiplied_alpha_fragment:SM,project_vertex:MM,dithering_fragment:yM,dithering_pars_fragment:EM,roughnessmap_fragment:bM,roughnessmap_pars_fragment:TM,shadowmap_pars_fragment:wM,shadowmap_pars_vertex:AM,shadowmap_vertex:RM,shadowmask_pars_fragment:CM,skinbase_vertex:PM,skinning_pars_vertex:DM,skinning_vertex:LM,skinnormal_vertex:IM,specularmap_fragment:NM,specularmap_pars_fragment:UM,tonemapping_fragment:FM,tonemapping_pars_fragment:OM,transmission_fragment:BM,transmission_pars_fragment:zM,uv_pars_fragment:kM,uv_pars_vertex:HM,uv_vertex:GM,worldpos_vertex:VM,background_vert:WM,background_frag:XM,backgroundCube_vert:YM,backgroundCube_frag:qM,cube_vert:$M,cube_frag:KM,depth_vert:ZM,depth_frag:JM,distance_vert:QM,distance_frag:jM,equirect_vert:ey,equirect_frag:ty,linedashed_vert:ny,linedashed_frag:iy,meshbasic_vert:ry,meshbasic_frag:sy,meshlambert_vert:ay,meshlambert_frag:oy,meshmatcap_vert:ly,meshmatcap_frag:cy,meshnormal_vert:uy,meshnormal_frag:hy,meshphong_vert:fy,meshphong_frag:dy,meshphysical_vert:py,meshphysical_frag:my,meshtoon_vert:gy,meshtoon_frag:_y,points_vert:vy,points_frag:xy,shadow_vert:Sy,shadow_frag:My,sprite_vert:yy,sprite_frag:Ey},we={common:{diffuse:{value:new ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new Ve(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new ke(16777215)},opacity:{value:1},center:{value:new Ve(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},Xi={basic:{uniforms:Gn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.fog]),vertexShader:nt.meshbasic_vert,fragmentShader:nt.meshbasic_frag},lambert:{uniforms:Gn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new ke(0)},envMapIntensity:{value:1}}]),vertexShader:nt.meshlambert_vert,fragmentShader:nt.meshlambert_frag},phong:{uniforms:Gn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new ke(0)},specular:{value:new ke(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:nt.meshphong_vert,fragmentShader:nt.meshphong_frag},standard:{uniforms:Gn([we.common,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.roughnessmap,we.metalnessmap,we.fog,we.lights,{emissive:{value:new ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag},toon:{uniforms:Gn([we.common,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.gradientmap,we.fog,we.lights,{emissive:{value:new ke(0)}}]),vertexShader:nt.meshtoon_vert,fragmentShader:nt.meshtoon_frag},matcap:{uniforms:Gn([we.common,we.bumpmap,we.normalmap,we.displacementmap,we.fog,{matcap:{value:null}}]),vertexShader:nt.meshmatcap_vert,fragmentShader:nt.meshmatcap_frag},points:{uniforms:Gn([we.points,we.fog]),vertexShader:nt.points_vert,fragmentShader:nt.points_frag},dashed:{uniforms:Gn([we.common,we.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:nt.linedashed_vert,fragmentShader:nt.linedashed_frag},depth:{uniforms:Gn([we.common,we.displacementmap]),vertexShader:nt.depth_vert,fragmentShader:nt.depth_frag},normal:{uniforms:Gn([we.common,we.bumpmap,we.normalmap,we.displacementmap,{opacity:{value:1}}]),vertexShader:nt.meshnormal_vert,fragmentShader:nt.meshnormal_frag},sprite:{uniforms:Gn([we.sprite,we.fog]),vertexShader:nt.sprite_vert,fragmentShader:nt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:nt.background_vert,fragmentShader:nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:nt.backgroundCube_vert,fragmentShader:nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:nt.cube_vert,fragmentShader:nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:nt.equirect_vert,fragmentShader:nt.equirect_frag},distance:{uniforms:Gn([we.common,we.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:nt.distance_vert,fragmentShader:nt.distance_frag},shadow:{uniforms:Gn([we.lights,we.fog,{color:{value:new ke(0)},opacity:{value:1}}]),vertexShader:nt.shadow_vert,fragmentShader:nt.shadow_frag}};Xi.physical={uniforms:Gn([Xi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new Ve(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Ze},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new Ve},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new ke(0)},specularColor:{value:new ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new Ve},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag};const wl={r:0,b:0,g:0},by=new Tt,K0=new Ze;K0.set(-1,0,0,0,1,0,0,0,1);function Ty(r,e,t,n,i,s){const a=new ke(0);let o=i===!0?0:1,l,c,u=null,d=0,h=null;function f(x){let w=x.isScene===!0?x.background:null;if(w&&w.isTexture){const S=x.backgroundBlurriness>0;w=e.get(w,S)}return w}function m(x){let w=!1;const S=f(x);S===null?p(a,o):S&&S.isColor&&(p(S,1),w=!0);const b=r.xr.getEnvironmentBlendMode();b==="additive"?t.buffers.color.setClear(0,0,0,1,s):b==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(r.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function _(x,w){const S=f(w);S&&S.isCubeTexture?(c===void 0&&(c=new lt(new Zi(1,1,1),new Nt({name:"BackgroundCubeMaterial",uniforms:ba(Xi.backgroundCube.uniforms),vertexShader:Xi.backgroundCube.vertexShader,fragmentShader:Xi.backgroundCube.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,T,v){this.matrixWorld.copyPosition(v.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(by.makeRotationFromEuler(w.backgroundRotation)).transpose(),S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(K0),c.material.toneMapped=mt.getTransfer(S.colorSpace)!==yt,(u!==S||d!==S.version||h!==r.toneMapping)&&(c.material.needsUpdate=!0,u=S,d=S.version,h=r.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new lt(new ji(2,2),new Nt({name:"BackgroundMaterial",uniforms:ba(Xi.background.uniforms),vertexShader:Xi.background.vertexShader,fragmentShader:Xi.background.fragmentShader,side:Ss,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=mt.getTransfer(S.colorSpace)!==yt,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||h!==r.toneMapping)&&(l.material.needsUpdate=!0,u=S,d=S.version,h=r.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function p(x,w){x.getRGB(wl,G0(r)),t.buffers.color.setClear(wl.r,wl.g,wl.b,w,s)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,w=1){a.set(x),o=w,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,p(a,o)},render:m,addToRenderList:_,dispose:g}}function wy(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=h(null);let s=i,a=!1;function o(U,I,H,D,z){let X=!1;const F=d(U,D,H,I);s!==F&&(s=F,c(s.object)),X=f(U,D,H,z),X&&m(U,D,H,z),z!==null&&e.update(z,r.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,S(U,I,H,D),z!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return r.createVertexArray()}function c(U){return r.bindVertexArray(U)}function u(U){return r.deleteVertexArray(U)}function d(U,I,H,D){const z=D.wireframe===!0;let X=n[I.id];X===void 0&&(X={},n[I.id]=X);const F=U.isInstancedMesh===!0?U.id:0;let Q=X[F];Q===void 0&&(Q={},X[F]=Q);let W=Q[H.id];W===void 0&&(W={},Q[H.id]=W);let P=W[z];return P===void 0&&(P=h(l()),W[z]=P),P}function h(U){const I=[],H=[],D=[];for(let z=0;z<t;z++)I[z]=0,H[z]=0,D[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:H,attributeDivisors:D,object:U,attributes:{},index:null}}function f(U,I,H,D){const z=s.attributes,X=I.attributes;let F=0;const Q=H.getAttributes();for(const W in Q)if(Q[W].location>=0){const q=z[W];let le=X[W];if(le===void 0&&(W==="instanceMatrix"&&U.instanceMatrix&&(le=U.instanceMatrix),W==="instanceColor"&&U.instanceColor&&(le=U.instanceColor)),q===void 0||q.attribute!==le||le&&q.data!==le.data)return!0;F++}return s.attributesNum!==F||s.index!==D}function m(U,I,H,D){const z={},X=I.attributes;let F=0;const Q=H.getAttributes();for(const W in Q)if(Q[W].location>=0){let q=X[W];q===void 0&&(W==="instanceMatrix"&&U.instanceMatrix&&(q=U.instanceMatrix),W==="instanceColor"&&U.instanceColor&&(q=U.instanceColor));const le={};le.attribute=q,q&&q.data&&(le.data=q.data),z[W]=le,F++}s.attributes=z,s.attributesNum=F,s.index=D}function _(){const U=s.newAttributes;for(let I=0,H=U.length;I<H;I++)U[I]=0}function p(U){g(U,0)}function g(U,I){const H=s.newAttributes,D=s.enabledAttributes,z=s.attributeDivisors;H[U]=1,D[U]===0&&(r.enableVertexAttribArray(U),D[U]=1),z[U]!==I&&(r.vertexAttribDivisor(U,I),z[U]=I)}function x(){const U=s.newAttributes,I=s.enabledAttributes;for(let H=0,D=I.length;H<D;H++)I[H]!==U[H]&&(r.disableVertexAttribArray(H),I[H]=0)}function w(U,I,H,D,z,X,F){F===!0?r.vertexAttribIPointer(U,I,H,z,X):r.vertexAttribPointer(U,I,H,D,z,X)}function S(U,I,H,D){_();const z=D.attributes,X=H.getAttributes(),F=I.defaultAttributeValues;for(const Q in X){const W=X[Q];if(W.location>=0){let P=z[Q];if(P===void 0&&(Q==="instanceMatrix"&&U.instanceMatrix&&(P=U.instanceMatrix),Q==="instanceColor"&&U.instanceColor&&(P=U.instanceColor)),P!==void 0){const q=P.normalized,le=P.itemSize,Ee=e.get(P);if(Ee===void 0)continue;const Y=Ee.buffer,ae=Ee.type,_e=Ee.bytesPerElement,Me=ae===r.INT||ae===r.UNSIGNED_INT||P.gpuType===pf;if(P.isInterleavedBufferAttribute){const ce=P.data,pe=ce.isInterleavedBuffer===!0?ce.stride:ce.itemSize,Ye=P.offset;if(ce.isInstancedInterleavedBuffer||ce.isInstancedBufferAttribute){for(let se=0;se<W.locationSize;se++)g(W.location+se,ce.meshPerAttribute);U.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let se=0;se<W.locationSize;se++)p(W.location+se);r.bindBuffer(r.ARRAY_BUFFER,Y);for(let se=0;se<W.locationSize;se++)w(W.location+se,le/W.locationSize,ae,q,pe*_e,(Ye+le/W.locationSize*se)*_e,Me)}else{if(P.isInstancedBufferAttribute){for(let ce=0;ce<W.locationSize;ce++)g(W.location+ce,P.meshPerAttribute);U.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=P.meshPerAttribute*P.count)}else for(let ce=0;ce<W.locationSize;ce++)p(W.location+ce);r.bindBuffer(r.ARRAY_BUFFER,Y);for(let ce=0;ce<W.locationSize;ce++)w(W.location+ce,le/W.locationSize,ae,q,le*_e,le/W.locationSize*ce*_e,Me)}}else if(F!==void 0){const q=F[Q];if(q!==void 0)switch(q.length){case 2:r.vertexAttrib2fv(W.location,q);break;case 3:r.vertexAttrib3fv(W.location,q);break;case 4:r.vertexAttrib4fv(W.location,q);break;default:r.vertexAttrib1fv(W.location,q)}}}}x()}function b(){C();for(const U in n){const I=n[U];for(const H in I){const D=I[H];for(const z in D){const X=D[z];for(const F in X)u(X[F].object),delete X[F];delete D[z]}}delete n[U]}}function T(U){if(n[U.id]===void 0)return;const I=n[U.id];for(const H in I){const D=I[H];for(const z in D){const X=D[z];for(const F in X)u(X[F].object),delete X[F];delete D[z]}}delete n[U.id]}function v(U){for(const I in n){const H=n[I];for(const D in H){const z=H[D];if(z[U.id]===void 0)continue;const X=z[U.id];for(const F in X)u(X[F].object),delete X[F];delete z[U.id]}}}function M(U){for(const I in n){const H=n[I],D=U.isInstancedMesh===!0?U.id:0,z=H[D];if(z!==void 0){for(const X in z){const F=z[X];for(const Q in F)u(F[Q].object),delete F[Q];delete z[X]}delete H[D],Object.keys(H).length===0&&delete n[I]}}}function C(){A(),a=!0,s!==i&&(s=i,c(s.object))}function A(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:C,resetDefaultState:A,dispose:b,releaseStatesOfGeometry:T,releaseStatesOfObject:M,releaseStatesOfProgram:v,initAttributes:_,enableAttribute:p,disableUnusedAttributes:x}}function Ay(r,e,t){let n;function i(l){n=l}function s(l,c){r.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(r.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let h=0;for(let f=0;f<u;f++)h+=c[f];t.update(h,n,1)}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function Ry(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const v=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(v.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(v){return!(v!==Ki&&n.convert(v)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(v){const M=v===ei&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(v!==wi&&v!==Bi&&!M&&n.convert(v)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE))}function l(v){if(v==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";v="mediump"}return v==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(qe("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=t.logarithmicDepthBuffer===!0&&d===!1;t.reversedDepthBuffer===!0&&d===!1&&qe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&d===!0&&qe("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),m=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),p=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),g=r.getParameter(r.MAX_VERTEX_ATTRIBS),x=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),w=r.getParameter(r.MAX_VARYING_VECTORS),S=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),b=r.getParameter(r.MAX_SAMPLES),T=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:x,maxVaryings:w,maxFragmentUniforms:S,maxSamples:b,samples:T}}function Cy(r){const e=this;let t=null,n=0,i=!1,s=!1;const a=new Pr,o=new Ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||n!==0||i;return i=h,n=d.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){const m=d.clippingPlanes,_=d.clipIntersection,p=d.clipShadows,g=r.get(d);if(!i||m===null||m.length===0||s&&!p)s?u(null):c();else{const x=s?0:n,w=x*4;let S=g.clippingState||null;l.value=S,S=u(m,h,w,f);for(let b=0;b!==w;++b)S[b]=t[b];g.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,f,m){const _=d!==null?d.length:0;let p=null;if(_!==0){if(p=l.value,m!==!0||p===null){const g=f+_*4,x=h.matrixWorldInverse;o.getNormalMatrix(x),(p===null||p.length<g)&&(p=new Float32Array(g));for(let w=0,S=f;w!==_;++w,S+=4)a.copy(d[w]).applyMatrix4(x,o),a.normal.toArray(p,S),p[S+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}class If extends ti{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new B0(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Zi(5,5,5),s=new Nt({name:"CubemapFromEquirect",uniforms:ba(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Fn,blending:gs});s.uniforms.tEquirect.value=t;const a=new lt(i,s),o=t.minFilter;return t.minFilter===Or&&(t.minFilter=Kn),new Ph(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}}const pp=256,Py=3,Dy=20,Z0=256,J0=16,Ly=3,Iy=new L,Ny=new ke;class _c{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Ph(1,10,null),this._boxMesh=new lt(new Zi(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){const{size:a=256,position:o=Iy}=s,l=this._renderer;this._setSize(a);const c=this._allocateTarget(),u=this._getSourceTarget(!0);t>0&&(u.texture.mipmapsAutoUpdate=!1);const d=l.autoClear,h=l.autoClearColor,f=l.autoClearDepth,m=l.autoClearStencil,_=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,_===null&&(e.background=l.getClearColor(Ny));const p=new Ph(n,i,u);return p.position.copy(o),p.update(l,e),l.autoClear=d,l.autoClearColor=h,l.autoClearDepth=f,l.autoClearStencil=m,e.background=_,t>0&&(u.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_p(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(pp,A0(e))}_fromTexture(e,t){e.mapping===Ma||e.mapping===Ro?this._setSize(e.image.length===0?pp:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);const n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){const e=this._cubeSize,t=mp(e,!1,!1),n=Math.log2(e)-Py;for(let i=0;i<=n;i++)t.texture.mipmaps.push({width:e>>i,height:e>>i});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){const t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=mp(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){const i=this._boxMesh,s=this._cubeCamera;i.material=n,s.renderTarget=e,s.activeMipmapLevel=t;const a=e.width>>t;e.viewport.set(0,0,a,a),s.update(this._renderer,i),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===Ma||e.mapping===Ro?(this._cubemapMaterial===null&&(this._cubemapMaterial=_p()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=gp()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=Uy(),this._integrationMaterial=Fy());const t=this._cubeSize,n=e.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;const s=this._integrationMaterial.uniforms;s.envMap.value=this._sourceTarget.texture,s.sourceLod.value=Math.log2(t/J0);for(let a=0;a<=n;a++){const o=_c.lodToRoughness(a,n);if(a>n-Ly)s.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{const l=o>0?Math.log2(t)+.5*Math.log2(6/(Z0*Math.pow(o,4)))+.5:0;i.roughness.value=o,i.lodBias.value=l,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=Oy());const n=this._blurMaterial,i=n.uniforms,s=this._sourceTarget;i.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,i.envMap.value=s.texture,this._renderCube(e,0,n),i.envMap.value=e.texture,this._renderCube(s,0,n)}}function mp(r,e,t){return new If(r,{minFilter:Or,generateMipmaps:e,type:ei,colorSpace:lc,depthBuffer:t})}function Uo(r,e,t){return new Nt({name:r,uniforms:e,vertexShader:nt.cube_vert,fragmentShader:t,side:Fn,blending:gs,depthTest:!1,depthWrite:!1})}function Uy(){return Uo("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Z0}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Fy(){return Uo("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:J0}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Oy(){return Uo("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Dy}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function gp(){return Uo("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function _p(){return Uo("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function By(r){let e=new WeakMap,t=new WeakMap,n=null;function i(h,f=!1){return h==null?null:f?a(h):s(h)}function s(h){if(h&&h.isTexture){const f=h.mapping;if(f===Hc||f===Gc)if(e.has(h)){const m=e.get(h).texture;return o(m,h.mapping)}else{const m=h.image;if(m&&m.height>0){const _=new If(m.height);return _.fromEquirectangularTexture(r,h),e.set(h,_),h.addEventListener("dispose",c),o(_.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture&&h.isPMREMTexture!==!0){const f=h.mapping,m=f===Hc||f===Gc,_=f===Ma||f===Ro;if(m||_){let p=t.get(h);const g=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==g)return n===null&&(n=new _c(r)),p=m?n.fromEquirectangular(h,p):n.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),p.texture;if(p!==void 0)return p.texture;{const x=h.image;return m&&x&&x.height>0||_&&x&&l(x)?(n===null&&(n=new _c(r)),p=m?n.fromEquirectangular(h):n.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),h.addEventListener("dispose",u),p.texture):null}}}return h}function o(h,f){return f===Hc?h.mapping=Ma:f===Gc&&(h.mapping=Ro),h}function l(h){let f=0;const m=6;for(let _=0;_<m;_++)h[_]!==void 0&&f++;return f===m}function c(h){const f=h.target;f.removeEventListener("dispose",c);const m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function u(h){const f=h.target;f.removeEventListener("dispose",u);const m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:d}}function zy(r){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=r.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Xl("WebGLRenderer: "+n+" extension not supported."),i}}}function ky(r,e,t,n){const i={},s=new WeakMap,a=new FinalizationRegistry(m=>delete i[m]);function o(m){l(m.target)}function l(m){m.index!==null&&e.remove(m.index);for(const p in m.attributes)e.remove(m.attributes[p]);m.removeEventListener("dispose",o),delete i[m.id],a.unregister(m);const _=s.get(m);_&&(e.remove(_),s.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,t.memory.geometries--}function c(m,_){return i[_.id]!==void 0||(_.addEventListener("dispose",o),i[_.id]=new WeakRef(_),a.register(_,_.id,_),t.memory.geometries++),_}function u(m){const _=m.attributes;for(const p in _)e.update(_[p],r.ARRAY_BUFFER)}function d(m){const _=m.index,p=m.attributes.position;let g=0;if(p===void 0)return;const x=_!==null?_.array.length:p.array.length/3-1,w=p.count>=65535?L0:D0,S=new w(Math.ceil(x/3)*6,1),b=S.array;if(_!==null){const v=_.array;g=_.version;for(let M=0,C=0;M<x;M+=3){const A=v[M+0],U=v[M+1],I=v[M+2];b[C++]=A,b[C++]=U,b[C++]=U,b[C++]=I,b[C++]=I,b[C++]=A}}else{g=p.version;for(let v=0,M=0;v<x;v+=3){const C=v+0,A=v+1,U=v+2;b[M++]=C,b[M++]=A,b[M++]=A,b[M++]=U,b[M++]=U,b[M++]=C}}S.version=g;const T=s.get(m);T&&e.remove(T),s.set(m,S)}function h(m){const _=s.get(m);if(_){const p=m.index;p!==null&&_.version<p.version&&d(m)}else d(m);return s.get(m)}function f(){for(const m in i){const _=i[m].deref();_!==void 0&&l(_)}}return{get:c,update:u,getWireframeAttribute:h,dispose:f}}function Hy(r,e,t){let n;function i(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,h){r.drawElements(n,h,s,d*a),t.update(h,n,1)}function c(d,h,f){f!==0&&(r.drawElementsInstanced(n,h,s,d*a,f),t.update(h,n,f))}function u(d,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,s,d,0,f);let _=0;for(let p=0;p<f;p++)_+=h[p];t.update(_,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function Gy(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:vt("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Vy(r,e,t){const n=new WeakMap,i=new Yt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=n.get(o);if(h===void 0||h.count!==d){let A=function(){M.dispose(),n.delete(o),o.removeEventListener("dispose",A)};var f=A;h!==void 0&&h.texture.dispose();const m=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let S=0;m===!0&&(S=1),_===!0&&(S=2),p===!0&&(S=3);let b=o.attributes.position.count*S,T=1;b>e.maxTextureSize&&(T=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const v=new Float32Array(b*T*4*d),M=new R0(v,b,T,d);M.type=Bi,M.needsUpdate=!0;const C=S*4;for(let U=0;U<d;U++){const I=g[U],H=x[U],D=w[U],z=b*T*4*U;for(let X=0;X<I.count;X++){const F=X*C;m===!0&&(i.fromBufferAttribute(I,X),v[z+F+0]=i.x,v[z+F+1]=i.y,v[z+F+2]=i.z,v[z+F+3]=0),_===!0&&(i.fromBufferAttribute(H,X),v[z+F+4]=i.x,v[z+F+5]=i.y,v[z+F+6]=i.z,v[z+F+7]=0),p===!0&&(i.fromBufferAttribute(D,X),v[z+F+8]=i.x,v[z+F+9]=i.y,v[z+F+10]=i.z,v[z+F+11]=D.itemSize===4?i.w:1)}}h={count:d,texture:M,size:new Ve(b,T)},n.set(o,h),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let m=0;for(let p=0;p<c.length;p++)m+=c[p];const _=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(r,"morphTargetBaseInfluence",_),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",h.size)}return{update:s}}function Wy(r,e,t,n,i){let s=new WeakMap;function a(c){const u=i.render.frame,d=c.geometry,h=e.get(c,d);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,r.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==u&&(f.update(),s.set(f,u))}return h}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const Xy={[of]:"LINEAR_TONE_MAPPING",[lf]:"REINHARD_TONE_MAPPING",[cf]:"CINEON_TONE_MAPPING",[uf]:"ACES_FILMIC_TONE_MAPPING",[ff]:"AGX_TONE_MAPPING",[df]:"NEUTRAL_TONE_MAPPING",[hf]:"CUSTOM_TONE_MAPPING"};function Yy(r,e,t,n,i,s){const a=new ti(e,t,{type:r,depthBuffer:i,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null,c=null;const u=new un;u.setAttribute("position",new Ut([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new Ut([0,2,0,0,2,0],2));const d=new V0({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new lt(u,d),f=new Y0(-1,1,1,-1,0,1);let m=null,_=null,p=!1,g,x=null,w=[],S=!1;this.setSize=function(b,T){a.setSize(b,T),o!==null&&o.setSize(b,T),l!==null&&l.setSize(b,T);for(let v=0;v<w.length;v++){const M=w[v];M.setSize&&M.setSize(b,T)}},this.setEffects=function(b){w=b,S=w.length>0&&w[0].isRenderPass===!0;const T=a.width,v=a.height;w.length>0&&o===null&&(o=new ti(T,v,{type:ei,depthBuffer:!1,stencilBuffer:!1}),l=new ti(T,v,{type:ei,depthBuffer:!1,stencilBuffer:!1}));const M=i===!0&&w.some(C=>C.needsDepthTexture===!0);M!==(a.depthTexture!==null)&&(M===!0&&c===null&&(c=new Ea(T,v),s===!0&&(c.format=Br,c.type=ya)),a.dispose(),a.depthTexture=M?c:null,a.resolveDepthBuffer=M,a.storeMultisampledDepthBuffer=M);for(let C=0;C<w.length;C++){const A=w[C];A.setSize&&A.setSize(T,v),M&&A.needsDepthTexture===!0&&A.setDepthTexture&&A.setDepthTexture(c)}},this.begin=function(b,T){if(p||b.toneMapping===_r&&w.length===0)return!1;if(x=T,T!==null){const v=T.width,M=T.height;(a.width!==v||a.height!==M)&&this.setSize(v,M)}return S===!1&&b.setRenderTarget(a),g=b.toneMapping,b.toneMapping=_r,!0},this.hasRenderPass=function(){return S},this.end=function(b,T){b.toneMapping=g,p=!0;let v=a,M=o;for(let C=0;C<w.length;C++){const A=w[C];A.enabled!==!1&&(A.render(b,M,v,T),A.needsSwap!==!1&&(v=M,M=M===o?l:o))}if(m!==b.outputColorSpace||_!==b.toneMapping){m=b.outputColorSpace,_=b.toneMapping,d.defines={},mt.getTransfer(m)===yt&&(d.defines.SRGB_TRANSFER="");const C=Xy[_];C&&(d.defines[C]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=v.texture,b.setRenderTarget(x),b.render(h,f),x=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),u.dispose(),d.dispose()}}const Q0=new En,j0=new Ea(1,1),eg=new z0(1),tg=new R0,ng=new lx,ig=new B0,vp=[],xp=[],Sp=new Float32Array(16),Mp=new Float32Array(9),yp=new Float32Array(4);function wa(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=vp[i];if(s===void 0&&(s=new Float32Array(i),vp[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function hn(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function fn(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Tc(r,e){let t=xp[e];t===void 0&&(t=new Int32Array(e),xp[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function qy(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function $y(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(hn(t,e))return;r.uniform2fv(this.addr,e),fn(t,e)}}function Ky(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(hn(t,e))return;r.uniform3fv(this.addr,e),fn(t,e)}}function Zy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(hn(t,e))return;r.uniform4fv(this.addr,e),fn(t,e)}}function Jy(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(hn(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),fn(t,e)}else{if(hn(t,n))return;yp.set(n),r.uniformMatrix2fv(this.addr,!1,yp),fn(t,n)}}function Qy(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(hn(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),fn(t,e)}else{if(hn(t,n))return;Mp.set(n),r.uniformMatrix3fv(this.addr,!1,Mp),fn(t,n)}}function jy(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(hn(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),fn(t,e)}else{if(hn(t,n))return;Sp.set(n),r.uniformMatrix4fv(this.addr,!1,Sp),fn(t,n)}}function eE(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function tE(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(hn(t,e))return;r.uniform2iv(this.addr,e),fn(t,e)}}function nE(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(hn(t,e))return;r.uniform3iv(this.addr,e),fn(t,e)}}function iE(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(hn(t,e))return;r.uniform4iv(this.addr,e),fn(t,e)}}function rE(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function sE(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(hn(t,e))return;r.uniform2uiv(this.addr,e),fn(t,e)}}function aE(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(hn(t,e))return;r.uniform3uiv(this.addr,e),fn(t,e)}}function oE(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(hn(t,e))return;r.uniform4uiv(this.addr,e),fn(t,e)}}function wc(r){return r.version===0&&(r.compareFunction=b0,r.needsUpdate=!0),r}function lE(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?s=wc(j0):s=Q0,t.setTexture2D(e||s,i)}function cE(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||ng,i)}function uE(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_CUBE_SHADOW?s=wc(eg):s=ig,t.setTextureCube(e||s,i)}function hE(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||tg,i)}function fE(r){switch(r){case 5126:return qy;case 35664:return $y;case 35665:return Ky;case 35666:return Zy;case 35674:return Jy;case 35675:return Qy;case 35676:return jy;case 5124:case 35670:return eE;case 35667:case 35671:return tE;case 35668:case 35672:return nE;case 35669:case 35673:return iE;case 5125:return rE;case 36294:return sE;case 36295:return aE;case 36296:return oE;case 35678:case 36198:case 36298:case 36306:case 35682:return lE;case 35679:case 36299:case 36307:return cE;case 35680:case 36300:case 36308:case 36293:return uE;case 36289:case 36303:case 36311:case 36292:return hE}}function dE(r,e){r.uniform1fv(this.addr,e)}function pE(r,e){const t=wa(e,this.size,2);r.uniform2fv(this.addr,t)}function mE(r,e){const t=wa(e,this.size,3);r.uniform3fv(this.addr,t)}function gE(r,e){const t=wa(e,this.size,4);r.uniform4fv(this.addr,t)}function _E(r,e){const t=wa(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function vE(r,e){const t=wa(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function xE(r,e){const t=wa(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function SE(r,e){r.uniform1iv(this.addr,e)}function ME(r,e){r.uniform2iv(this.addr,e)}function yE(r,e){r.uniform3iv(this.addr,e)}function EE(r,e){r.uniform4iv(this.addr,e)}function bE(r,e){r.uniform1uiv(this.addr,e)}function TE(r,e){r.uniform2uiv(this.addr,e)}function wE(r,e){r.uniform3uiv(this.addr,e)}function AE(r,e){r.uniform4uiv(this.addr,e)}function RE(r,e,t){const n=this.cache,i=e.length,s=Tc(t,i);hn(n,s)||(r.uniform1iv(this.addr,s),fn(n,s));let a;this.type===r.SAMPLER_2D_SHADOW?a=wc(j0):a=Q0;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,s[o])}function CE(r,e,t){const n=this.cache,i=e.length,s=Tc(t,i);hn(n,s)||(r.uniform1iv(this.addr,s),fn(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||ng,s[a])}function PE(r,e,t){const n=this.cache,i=e.length,s=Tc(t,i);hn(n,s)||(r.uniform1iv(this.addr,s),fn(n,s));let a;this.type===r.SAMPLER_CUBE_SHADOW?a=wc(eg):a=ig;for(let o=0;o!==i;++o)t.setTextureCube(e[o]||a,s[o])}function DE(r,e,t){const n=this.cache,i=e.length,s=Tc(t,i);hn(n,s)||(r.uniform1iv(this.addr,s),fn(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||tg,s[a])}function LE(r){switch(r){case 5126:return dE;case 35664:return pE;case 35665:return mE;case 35666:return gE;case 35674:return _E;case 35675:return vE;case 35676:return xE;case 5124:case 35670:return SE;case 35667:case 35671:return ME;case 35668:case 35672:return yE;case 35669:case 35673:return EE;case 5125:return bE;case 36294:return TE;case 36295:return wE;case 36296:return AE;case 35678:case 36198:case 36298:case 36306:case 35682:return RE;case 35679:case 36299:case 36307:return CE;case 35680:case 36300:case 36308:case 36293:return PE;case 36289:case 36303:case 36311:case 36292:return DE}}class IE{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=fE(t.type)}}class NE{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=LE(t.type)}}class UE{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(e,t[o.id],n)}}}const _u=/(\w+)(\])?(\[|\.)?/g;function Ep(r,e){r.seq.push(e),r.map[e.id]=e}function FE(r,e,t){const n=r.name,i=n.length;for(_u.lastIndex=0;;){const s=_u.exec(n),a=_u.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Ep(t,c===void 0?new IE(o,r,e):new NE(o,r,e));break}else{let d=t.map[o];d===void 0&&(d=new UE(o),Ep(t,d)),t=d}}}class Yl{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);FE(o,l,this)}const i=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):s.push(a);i.length>0&&(this.seq=i.concat(s))}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function bp(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const OE=37297;let BE=0;function zE(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Tp=new Ze;function kE(r){mt._getMatrix(Tp,mt.workingColorSpace,r);const e=`mat3( ${Tp.elements.map(t=>t.toFixed(4))} )`;switch(mt.getTransfer(r)){case cc:return[e,"LinearTransferOETF"];case yt:return[e,"sRGBTransferOETF"];default:return qe("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function wp(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+zE(r.getShaderSource(e),o)}else return s}function HE(r,e){const t=kE(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const GE={[of]:"Linear",[lf]:"Reinhard",[cf]:"Cineon",[uf]:"ACESFilmic",[ff]:"AgX",[df]:"Neutral",[hf]:"Custom"};function VE(r,e){const t=GE[e];return t===void 0?(qe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Al=new L;function WE(){mt.getLuminanceCoefficients(Al);const r=Al.x.toFixed(4),e=Al.y.toFixed(4),t=Al.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function XE(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qa).join(`
`)}function YE(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function qE(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function Qa(r){return r!==""}function Ap(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function Rp(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const $E=/^[ \t]*#include +<([\w\d./]+)>/gm;function Dh(r){return r.replace($E,KE)}function KE(r,e){const t=nt[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return Dh(t)}const ZE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cp(r){return r.replace(ZE,JE)}function JE(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Pp(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const QE={[kl]:"SHADOWMAP_TYPE_PCF",[Ja]:"SHADOWMAP_TYPE_VSM"};function jE(r){return QE[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const eb={[Ro]:"ENVMAP_MODE_REFRACTION"};function tb(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":eb[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const nb={[p0]:"ENVMAP_BLENDING_MULTIPLY",[wv]:"ENVMAP_BLENDING_MIX",[Av]:"ENVMAP_BLENDING_ADD"};function ib(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":nb[r.combine]||"ENVMAP_BLENDING_NONE"}function rb(r,e,t,n){const i=r.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=jE(t),c=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",u=tb(t),d=ib(t),h=XE(t),f=YE(s),m=i.createProgram();let _,p,g=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(Qa).join(`
`),_.length>0&&(_+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(Qa).join(`
`),p.length>0&&(p+=`
`)):(_=[Pp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qa).join(`
`),p=[Pp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==_r?"#define TONE_MAPPING":"",t.toneMapping!==_r?nt.tonemapping_pars_fragment:"",t.toneMapping!==_r?VE("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",nt.colorspace_pars_fragment,HE("linearToOutputTexel",t.outputColorSpace),WE(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Qa).join(`
`)),a=Dh(a),a=Ap(a,t),a=Rp(a,t),o=Dh(o),o=Ap(o,t),o=Rp(o,t),a=Cp(a),o=Cp(o),t.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,_=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,p=["#define varying in",t.glslVersion===Dd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Dd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=g+_+a,w=g+p+o,S=bp(i,i.VERTEX_SHADER,x),b=bp(i,i.FRAGMENT_SHADER,w);i.attachShader(m,S),i.attachShader(m,b),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function T(A){if(r.debug.checkShaderErrors){const U=i.getProgramInfoLog(m)||"",I=i.getShaderInfoLog(S)||"",H=i.getShaderInfoLog(b)||"",D=U.trim(),z=I.trim(),X=H.trim();let F=!0,Q=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(F=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,m,S,b);else{const W=wp(i,S,"vertex"),P=wp(i,b,"fragment");vt("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+D+`
`+W+`
`+P)}else D!==""?qe("WebGLProgram: Program Info Log:",D):(z===""||X==="")&&(Q=!1);Q&&(A.diagnostics={runnable:F,programLog:D,vertexShader:{log:z,prefix:_},fragmentShader:{log:X,prefix:p}})}i.deleteShader(S),i.deleteShader(b),v=new Yl(i,m),M=qE(i,m)}let v;this.getUniforms=function(){return v===void 0&&T(this),v};let M;this.getAttributes=function(){return M===void 0&&T(this),M};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=i.getProgramParameter(m,OE)),C},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=BE++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=S,this.fragmentShader=b,this}let sb=0;class ab{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new ob(e),t.set(e,n)),n}}class ob{constructor(e){this.id=sb++,this.code=e,this.usedTimes=0}}function lb(r){return r===Ms||r===ac||r===oc}function cb(r,e,t,n,i,s){const a=new C0,o=new ab,l=new Set,c=[],u=new Map,d=n.logarithmicDepthBuffer,h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(v){return l.add(v),v===0?"uv":`uv${v}`}function m(v,M,C,A,U,I){const H=A.fog,D=U.geometry,z=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?A.environment:null,X=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,F=e.get(v.envMap||z,X),Q=h[v.type];let W=n.precision;v.precision!==null&&(W=n.getMaxPrecision(v.precision),W!==v.precision&&qe("WebGLProgram.getParameters:",v.precision,"not supported, using",W,"instead."));const P=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,q=P!==void 0?P.length:0;let le=0;D.morphAttributes.position!==void 0&&(le=1),D.morphAttributes.normal!==void 0&&(le=2),D.morphAttributes.color!==void 0&&(le=3);let Ee,Y,ae,_e;if(Q){const ne=Xi[Q];Ee=ne.vertexShader,Y=ne.fragmentShader}else{Ee=v.vertexShader,Y=v.fragmentShader;const ne=o.getVertexShaderStage(v),Re=o.getFragmentShaderStage(v);o.update(v,ne,Re),ae=ne.id,_e=Re.id}const Me=r.getRenderTarget(),ce=r.state.buffers.depth.getReversed(),pe=U.isInstancedMesh===!0,Ye=U.isBatchedMesh===!0,se=!!v.map,Pe=!!v.matcap,Le=!!F,Ie=Le&&F.isPMREMTexture===!0,ut=!!v.aoMap,st=!!v.lightMap,K=!!v.bumpMap&&v.wireframe===!1,it=!!v.normalMap,Ae=!!v.displacementMap,De=!!v.emissiveMap,Ne=!!v.metalnessMap,$e=!!v.roughnessMap,wt=v.anisotropy>0,B=v.clearcoat>0,et=v.diffuseRoughness>0,tt=v.dispersion>0,Xe=v.retroreflectivity>0,ge=v.iridescence>0,ft=v.sheen>0,Fe=v.transmission>0,We=wt&&!!v.anisotropyMap,R=B&&!!v.clearcoatMap,y=B&&!!v.clearcoatNormalMap,G=B&&!!v.clearcoatRoughnessMap,oe=et&&!!v.diffuseRoughnessMap,ie=ge&&!!v.iridescenceMap,ue=ge&&!!v.iridescenceThicknessMap,me=ft&&!!v.sheenColorMap,k=ft&&!!v.sheenRoughnessMap,j=!!v.specularMap,fe=!!v.specularColorMap,N=!!v.specularIntensityMap,ee=Fe&&!!v.transmissionMap,J=Fe&&!!v.thicknessMap,ve=!!v.gradientMap,de=!!v.alphaMap,xe=v.alphaTest>0,he=!!v.alphaHash,Se=!!v.extensions;let re=_r;v.toneMapped&&(Me===null||Me.isXRRenderTarget===!0)&&(re=r.toneMapping);const te=Ie?F.isCompressedCubeTexture?F.image[0].mipmaps:F.mipmaps:null,ye={shaderID:Q,shaderType:v.type,shaderName:v.name,vertexShader:Ee,fragmentShader:Y,defines:v.defines,customVertexShaderID:ae,customFragmentShaderID:_e,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:W,batching:Ye,batchingColor:Ye&&U._colorsTexture!==null,instancing:pe,instancingColor:pe&&U.instanceColor!==null,instancingMorph:pe&&U.morphTexture!==null,outputColorSpace:Me===null?r.outputColorSpace:Me.isXRRenderTarget===!0?Me.texture.colorSpace:mt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:se,matcap:Pe,envMap:Le,envMapMode:Le&&F.mapping,envMapPMREM:Ie,envMapMaxLod:Ie?te.length-1:null,envMapSize:Ie?te[0].width:null,aoMap:ut,lightMap:st,bumpMap:K,normalMap:it,displacementMap:Ae,emissiveMap:De,normalMapObjectSpace:it&&v.normalMapType===Pv,normalMapTangentSpace:it&&v.normalMapType===Pd,packedNormalMap:it&&v.normalMapType===Pd&&lb(v.normalMap.format),metalnessMap:Ne,roughnessMap:$e,anisotropy:wt,anisotropyMap:We,clearcoat:B,clearcoatMap:R,clearcoatNormalMap:y,clearcoatRoughnessMap:G,diffuseRoughness:et,diffuseRoughnessMap:oe,dispersion:tt,retroreflection:Xe,iridescence:ge,iridescenceMap:ie,iridescenceThicknessMap:ue,sheen:ft,sheenColorMap:me,sheenRoughnessMap:k,specularMap:j,specularColorMap:fe,specularIntensityMap:N,transmission:Fe,transmissionMap:ee,thicknessMap:J,gradientMap:ve,opaque:v.transparent===!1&&v.blending===fo&&v.alphaToCoverage===!1,alphaMap:de,alphaTest:xe,alphaHash:he,combine:v.combine,mapUv:se&&f(v.map.channel),aoMapUv:ut&&f(v.aoMap.channel),lightMapUv:st&&f(v.lightMap.channel),bumpMapUv:K&&f(v.bumpMap.channel),normalMapUv:it&&f(v.normalMap.channel),displacementMapUv:Ae&&f(v.displacementMap.channel),emissiveMapUv:De&&f(v.emissiveMap.channel),metalnessMapUv:Ne&&f(v.metalnessMap.channel),roughnessMapUv:$e&&f(v.roughnessMap.channel),anisotropyMapUv:We&&f(v.anisotropyMap.channel),clearcoatMapUv:R&&f(v.clearcoatMap.channel),clearcoatNormalMapUv:y&&f(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:G&&f(v.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:oe&&f(v.diffuseRoughnessMap.channel),iridescenceMapUv:ie&&f(v.iridescenceMap.channel),iridescenceThicknessMapUv:ue&&f(v.iridescenceThicknessMap.channel),sheenColorMapUv:me&&f(v.sheenColorMap.channel),sheenRoughnessMapUv:k&&f(v.sheenRoughnessMap.channel),specularMapUv:j&&f(v.specularMap.channel),specularColorMapUv:fe&&f(v.specularColorMap.channel),specularIntensityMapUv:N&&f(v.specularIntensityMap.channel),transmissionMapUv:ee&&f(v.transmissionMap.channel),thicknessMapUv:J&&f(v.thicknessMap.channel),alphaMapUv:de&&f(v.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(it||wt),vertexNormals:!!D.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!D.attributes.uv&&(se||de),fog:!!H,useFog:v.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||D.attributes.normal===void 0&&it===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ce,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:D.attributes.position!==void 0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:le,numSunLights:M.sun.length,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numSunLightShadows:M.sunShadowMap.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:I.filter(ne=>ne.texture!==null).length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:v.dithering,shadowMapEnabled:r.shadowMap.enabled&&C.length>0,shadowMapType:r.shadowMap.type,toneMapping:re,decodeVideoTexture:se&&v.map.isVideoTexture===!0&&mt.getTransfer(v.map.colorSpace)===yt,decodeVideoTextureEmissive:De&&v.emissiveMap.isVideoTexture===!0&&mt.getTransfer(v.emissiveMap.colorSpace)===yt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===mi,flipSided:v.side===Fn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Se&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Se&&v.extensions.multiDraw===!0||Ye)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return ye.vertexUv1s=l.has(1),ye.vertexUv2s=l.has(2),ye.vertexUv3s=l.has(3),l.clear(),ye}function _(v){const M=[];if(v.shaderID?M.push(v.shaderID):(M.push(v.customVertexShaderID),M.push(v.customFragmentShaderID)),v.defines!==void 0)for(const C in v.defines)M.push(C),M.push(v.defines[C]);return v.isRawShaderMaterial===!1&&(p(M,v),g(M,v),M.push(r.outputColorSpace)),M.push(v.customProgramCacheKey),M.join()}function p(v,M){v.push(M.precision),v.push(M.outputColorSpace),v.push(M.envMapMode),v.push(M.envMapPMREM),v.push(M.envMapMaxLod),v.push(M.envMapSize),v.push(M.mapUv),v.push(M.alphaMapUv),v.push(M.lightMapUv),v.push(M.aoMapUv),v.push(M.bumpMapUv),v.push(M.normalMapUv),v.push(M.displacementMapUv),v.push(M.emissiveMapUv),v.push(M.metalnessMapUv),v.push(M.roughnessMapUv),v.push(M.anisotropyMapUv),v.push(M.clearcoatMapUv),v.push(M.clearcoatNormalMapUv),v.push(M.clearcoatRoughnessMapUv),v.push(M.diffuseRoughnessMapUv),v.push(M.iridescenceMapUv),v.push(M.iridescenceThicknessMapUv),v.push(M.sheenColorMapUv),v.push(M.sheenRoughnessMapUv),v.push(M.specularMapUv),v.push(M.specularColorMapUv),v.push(M.specularIntensityMapUv),v.push(M.transmissionMapUv),v.push(M.thicknessMapUv),v.push(M.combine),v.push(M.fogExp2),v.push(M.sizeAttenuation),v.push(M.morphTargetsCount),v.push(M.numSunLights),v.push(M.numDirLights),v.push(M.numPointLights),v.push(M.numSpotLights),v.push(M.numSpotLightMaps),v.push(M.numHemiLights),v.push(M.numRectAreaLights),v.push(M.numSunLightShadows),v.push(M.numDirLightShadows),v.push(M.numPointLightShadows),v.push(M.numSpotLightShadows),v.push(M.numSpotLightShadowsWithMaps),v.push(M.numLightProbes),v.push(M.numLightProbeGrids),v.push(M.shadowMapType),v.push(M.toneMapping),v.push(M.numClippingPlanes),v.push(M.numClipIntersection),v.push(M.depthPacking)}function g(v,M){a.disableAll(),M.instancing&&a.enable(0),M.instancingColor&&a.enable(1),M.instancingMorph&&a.enable(2),M.matcap&&a.enable(3),M.envMap&&a.enable(4),M.normalMapObjectSpace&&a.enable(5),M.normalMapTangentSpace&&a.enable(6),M.clearcoat&&a.enable(7),M.iridescence&&a.enable(8),M.alphaTest&&a.enable(9),M.vertexColors&&a.enable(10),M.vertexAlphas&&a.enable(11),M.vertexUv1s&&a.enable(12),M.vertexUv2s&&a.enable(13),M.vertexUv3s&&a.enable(14),M.vertexTangents&&a.enable(15),M.anisotropy&&a.enable(16),M.alphaHash&&a.enable(17),M.batching&&a.enable(18),M.dispersion&&a.enable(19),M.retroreflection&&a.enable(24),M.diffuseRoughness&&a.enable(25),M.batchingColor&&a.enable(20),M.gradientMap&&a.enable(21),M.packedNormalMap&&a.enable(22),M.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),M.numLightProbeGrids>0&&a.enable(22),M.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function x(v){const M=h[v.type];let C;if(M){const A=Xi[M];C=Io.clone(A.uniforms)}else C=v.uniforms;return C}function w(v,M){let C=u.get(M);return C!==void 0?++C.usedTimes:(C=new rb(r,M,v,i),c.push(C),u.set(M,C)),C}function S(v){if(--v.usedTimes===0){const M=c.indexOf(v);c[M]=c[c.length-1],c.pop(),u.delete(v.cacheKey),v.destroy()}}function b(v){o.remove(v)}function T(){o.dispose()}return{getParameters:m,getProgramCacheKey:_,getUniforms:x,acquireProgram:w,releaseProgram:S,releaseShaderCache:b,programs:c,dispose:T}}function ub(){let r=new WeakMap;function e(a){return r.has(a)}function t(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function hb(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function Dp(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Lp(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function o(h,f,m,_,p,g){let x=r[e];return x===void 0?(x={id:h.id,object:h,geometry:f,material:m,materialVariant:a(h),groupOrder:_,renderOrder:h.renderOrder,z:p,group:g},r[e]=x):(x.id=h.id,x.object=h,x.geometry=f,x.material=m,x.materialVariant=a(h),x.groupOrder=_,x.renderOrder=h.renderOrder,x.z=p,x.group=g),e++,x}function l(h,f,m,_,p,g,x){x.reversedDepth===!0&&(p=-p);const w=o(h,f,m,_,p,g);m.transmission>0?n.push(w):m.transparent===!0?i.push(w):t.push(w)}function c(h,f,m,_,p,g){const x=o(h,f,m,_,p,g);m.transmission>0?n.unshift(x):m.transparent===!0?i.unshift(x):t.unshift(x)}function u(h,f){t.length>1&&t.sort(h||hb),n.length>1&&n.sort(f||Dp),i.length>1&&i.sort(f||Dp)}function d(){for(let h=e,f=r.length;h<f;h++){const m=r[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:l,unshift:c,finish:d,sort:u}}function fb(){let r=new WeakMap;function e(n,i){const s=r.get(n);let a;return s===void 0?(a=new Lp,r.set(n,[a])):i>=s.length?(a=new Lp,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function db(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new L,color:new ke};break;case"SpotLight":t={position:new L,direction:new L,color:new ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new ke,groundColor:new ke};break;case"RectAreaLight":t={color:new ke,position:new L,halfWidth:new L,halfHeight:new L};break}return r[e.id]=t,t}}}function pb(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let mb=0;function gb(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function _b(r){const e=new db,t=pb(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);const i=new L,s=new Tt,a=new Tt;function o(c){let u=0,d=0,h=0;for(let I=0;I<9;I++)n.probe[I].set(0,0,0);let f=0,m=0,_=0,p=0,g=0,x=0,w=0,S=0,b=0,T=0,v=0,M=0,C=0,A=0;c.sort(gb);for(let I=0,H=c.length;I<H;I++){const D=c[I],z=D.color,X=D.intensity,F=D.distance;let Q=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Ms?Q=D.shadow.map.texture:Q=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=z.r*X,d+=z.g*X,h+=z.b*X;else if(D.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(D.sh.coefficients[W],X);A++}else if(D.isSunLight){const W=e.get(D);if(W.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const P=D.shadow,q=t.get(D);q.shadowIntensity=P.intensity,q.shadowBias=P.bias,q.shadowNormalBias=P.normalBias,q.shadowRadius=P.radius,q.shadowMapSize.copy(P.mapSize).multiply(P.getFrameExtents()),n.sunShadow[m]=q,n.sunShadowMap[m]=Q;const le=P.getViewportCount();for(let Ee=0;Ee<le;Ee++)n.sunShadowMatrix[_+Ee]=P.getMatrix(Ee),n.sunShadowCascade[_+Ee]=P._cascadeData[Ee];_+=le,m++}n.sun[f]=W,f++}else if(D.isDirectionalLight){const W=e.get(D);if(W.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const P=D.shadow,q=t.get(D);q.shadowIntensity=P.intensity,q.shadowBias=P.bias,q.shadowNormalBias=P.normalBias,q.shadowRadius=P.radius,q.shadowMapSize=P.mapSize,n.directionalShadow[p]=q,n.directionalShadowMap[p]=Q,n.directionalShadowMatrix[p]=D.shadow.matrix,b++}n.directional[p]=W,p++}else if(D.isSpotLight){const W=e.get(D);W.position.setFromMatrixPosition(D.matrixWorld),W.color.copy(z).multiplyScalar(X),W.distance=F,W.coneCos=Math.cos(D.angle),W.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),W.decay=D.decay,n.spot[x]=W;const P=D.shadow;if(D.map&&(n.spotLightMap[M]=D.map,M++,P.updateMatrices(D),D.castShadow&&C++),n.spotLightMatrix[x]=P.matrix,D.castShadow){const q=t.get(D);q.shadowIntensity=P.intensity,q.shadowBias=P.bias,q.shadowNormalBias=P.normalBias,q.shadowRadius=P.radius,q.shadowMapSize=P.mapSize,n.spotShadow[x]=q,n.spotShadowMap[x]=Q,v++}x++}else if(D.isRectAreaLight){const W=e.get(D);W.color.copy(z).multiplyScalar(X),W.halfWidth.set(D.width*.5,0,0),W.halfHeight.set(0,D.height*.5,0),n.rectArea[w]=W,w++}else if(D.isPointLight){const W=e.get(D);if(W.color.copy(D.color).multiplyScalar(D.intensity),W.distance=D.distance,W.decay=D.decay,D.castShadow){const P=D.shadow,q=t.get(D);q.shadowIntensity=P.intensity,q.shadowBias=P.bias,q.shadowNormalBias=P.normalBias,q.shadowRadius=P.radius,q.shadowMapSize=P.mapSize,q.shadowCameraNear=P.camera.near,q.shadowCameraFar=P.camera.far,n.pointShadow[g]=q,n.pointShadowMap[g]=Q,n.pointShadowMatrix[g]=D.shadow.matrix,T++}n.point[g]=W,g++}else if(D.isHemisphereLight){const W=e.get(D);W.skyColor.copy(D.color).multiplyScalar(X),W.groundColor.copy(D.groundColor).multiplyScalar(X),n.hemi[S]=W,S++}}w>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=we.LTC_FLOAT_1,n.rectAreaLTC2=we.LTC_FLOAT_2):(n.rectAreaLTC1=we.LTC_HALF_1,n.rectAreaLTC2=we.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;const U=n.hash;(U.sunLength!==f||U.directionalLength!==p||U.pointLength!==g||U.spotLength!==x||U.rectAreaLength!==w||U.hemiLength!==S||U.numSunShadows!==m||U.numDirectionalShadows!==b||U.numPointShadows!==T||U.numSpotShadows!==v||U.numSpotMaps!==M||U.numLightProbes!==A)&&(n.sun.length=f,n.directional.length=p,n.spot.length=x,n.rectArea.length=w,n.point.length=g,n.hemi.length=S,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.directionalShadowMatrix.length=b,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=v,n.spotShadowMap.length=v,n.spotLightMatrix.length=v+M-C,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=A,U.sunLength=f,U.directionalLength=p,U.pointLength=g,U.spotLength=x,U.rectAreaLength=w,U.hemiLength=S,U.numSunShadows=m,U.numDirectionalShadows=b,U.numPointShadows=T,U.numSpotShadows=v,U.numSpotMaps=M,U.numLightProbes=A,n.version=mb++)}function l(c,u){let d=0,h=0,f=0,m=0,_=0,p=0;const g=u.matrixWorldInverse;for(let x=0,w=c.length;x<w;x++){const S=c[x];if(S.isSunLight){const b=n.sun[d];b.direction.setFromMatrixPosition(S.matrixWorld),b.direction.transformDirection(g),d++}else if(S.isDirectionalLight){const b=n.directional[h];b.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(g),h++}else if(S.isSpotLight){const b=n.spot[m];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(g),b.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(g),m++}else if(S.isRectAreaLight){const b=n.rectArea[_];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(g),a.identity(),s.copy(S.matrixWorld),s.premultiply(g),a.extractRotation(s),b.halfWidth.set(S.width*.5,0,0),b.halfHeight.set(0,S.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),_++}else if(S.isPointLight){const b=n.point[f];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(g),f++}else if(S.isHemisphereLight){const b=n.hemi[p];b.direction.setFromMatrixPosition(S.matrixWorld),b.direction.transformDirection(g),p++}}}return{setup:o,setupView:l,state:n}}function Ip(r){const e=new _b(r),t=[],n=[],i=[];function s(d){u.camera=d,t.length=0,n.length=0,i.length=0}function a(d){d.isLightProbeGrid?i.push(d):t.push(d)}function o(d){n.push(d)}function l(){e.setup(t),i.sort((d,h)=>d.priority-h.priority||d.id-h.id)}function c(d){e.setupView(t,d)}const u={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:u,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function vb(r){let e=new WeakMap;function t(i,s=0){const a=e.get(i);let o;return a===void 0?(o=new Ip(r),e.set(i,[o])):s>=a.length?(o=new Ip(r),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const xb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Sb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Mb=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],yb=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],Np=new Tt,Ga=new L,vu=new L;function Eb(r,e,t){let n=new dc;const i=new Ve,s=new Ve,a=new Yt,o=new Ux,l=new Fx,c={},u=t.maxTextureSize,d={[Ss]:Fn,[Fn]:Ss,[mi]:mi},h=new Nt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ve},radius:{value:4}},vertexShader:xb,fragmentShader:Sb}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const m=new un;m.setAttribute("position",new Nn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new lt(m,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=kl;let g=this.type;this.render=function(T,v,M){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;this.type===ov&&(qe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=kl);const C=r.getRenderTarget(),A=r.getActiveCubeFace(),U=r.getActiveMipmapLevel(),I=r.state;I.setBlending(gs),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const H=g!==this.type;H&&v.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(z=>z.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,z=T.length;D<z;D++){const X=T[D],F=X.shadow;if(F===void 0){qe("WebGLShadowMap:",X,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;i.copy(F.mapSize);const Q=F.getFrameExtents();i.multiply(Q),s.copy(F.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/Q.x),i.x=s.x*Q.x,F.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/Q.y),i.y=s.y*Q.y,F.mapSize.y=s.y));const W=r.state.buffers.depth.getReversed();if(F.camera._reversedDepth=W,F.map===null||H===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===Ja){if(X.isPointLight){qe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new ti(i.x,i.y,{format:Ms,type:ei,minFilter:Kn,magFilter:Kn,generateMipmaps:!1}),F.map.texture.name=X.name+".shadowMap",F.map.depthTexture=new Ea(i.x,i.y,Bi),F.map.depthTexture.name=X.name+".shadowMapDepth",F.map.depthTexture.format=qr,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Mn,F.map.depthTexture.magFilter=Mn}else X.isPointLight?(F.map=new If(i.x),F.map.depthTexture=new z0(i.x,tr)):(F.map=new ti(i.x,i.y),F.map.depthTexture=new Ea(i.x,i.y,tr)),F.map.depthTexture.name=X.name+".shadowMap",F.map.depthTexture.format=qr,this.type===kl?(F.map.depthTexture.compareFunction=W?E0:y0,F.map.depthTexture.minFilter=Kn,F.map.depthTexture.magFilter=Kn):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Mn,F.map.depthTexture.magFilter=Mn);F.camera.updateProjectionMatrix()}F.map.isWebGLCubeRenderTarget!==!0&&(F.map.width!==i.x||F.map.height!==i.y)&&F.map.setSize(i.x,i.y);const P=F.map.isWebGLCubeRenderTarget?6:F.getViewportCount();X.isPointLight!==!0&&F.updateMatrices(X,M);const q=(F.camera.layers.mask&4294967294)!==0?F.camera.layers:M.layers;for(let le=0;le<P;le++){const Ee=F.getCamera(le);if(X.isPointLight){const Y=F.camera,ae=F.matrix,_e=X.distance||Y.far;_e!==Y.far&&(Y.far=_e,Y.updateProjectionMatrix()),Ga.setFromMatrixPosition(X.matrixWorld),Y.position.copy(Ga),vu.copy(Y.position),vu.add(Mb[le]),Y.up.copy(yb[le]),Y.lookAt(vu),Y.updateMatrixWorld(),ae.makeTranslation(-Ga.x,-Ga.y,-Ga.z),Np.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),F._frustum.setFromProjectionMatrix(Np,Y.coordinateSystem,Y.reversedDepth)}if(F.map.isWebGLCubeRenderTarget)r.setRenderTarget(F.map,le),r.clear();else{le===0&&(r.setRenderTarget(F.map),r.clear());const Y=F.getViewport(le);a.set(s.x*Y.x,s.y*Y.y,s.x*Y.z,s.y*Y.w),I.viewport(a)}n=F.getFrustum(le),S(v,M,Ee,X,q,this.type)}F.isPointLightShadow!==!0&&this.type===Ja&&x(F,M),F.needsUpdate=!1}g=this.type,p.needsUpdate=!1,r.setRenderTarget(C,A,U)};function x(T,v){const M=e.update(_);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null?T.mapPass=new ti(i.x,i.y,{format:Ms,type:ei}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),h.uniforms.shadow_pass.value=T.map.depthTexture,h.uniforms.resolution.value.set(T.map.width,T.map.height),h.uniforms.radius.value=T.radius,r.setRenderTarget(T.mapPass),r.clear(),r.renderBufferDirect(v,null,M,h,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value.set(T.map.width,T.map.height),f.uniforms.radius.value=T.radius,r.setRenderTarget(T.map),r.clear(),r.renderBufferDirect(v,null,M,f,_,null)}function w(T,v,M,C){let A=null;const U=M.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(U!==void 0)A=U;else if(A=M.isPointLight===!0?l:o,r.localClippingEnabled&&v.clipShadows===!0&&Array.isArray(v.clippingPlanes)&&v.clippingPlanes.length!==0||v.displacementMap&&v.displacementScale!==0||v.alphaMap&&v.alphaTest>0||v.map&&v.alphaTest>0||v.alphaToCoverage===!0){const I=A.uuid,H=v.uuid;let D=c[I];D===void 0&&(D={},c[I]=D);let z=D[H];z===void 0&&(z=A.clone(),D[H]=z,v.addEventListener("dispose",b)),A=z}if(A.visible=v.visible,A.wireframe=v.wireframe,C===Ja?A.side=v.shadowSide!==null?v.shadowSide:v.side:A.side=v.shadowSide!==null?v.shadowSide:d[v.side],A.alphaMap=v.alphaMap,A.alphaTest=v.alphaToCoverage===!0?.5:v.alphaTest,A.map=v.map,A.clipShadows=v.clipShadows,A.clippingPlanes=v.clippingPlanes,A.clipIntersection=v.clipIntersection,A.displacementMap=v.displacementMap,A.displacementScale=v.displacementScale,A.displacementBias=v.displacementBias,A.wireframeLinewidth=v.wireframeLinewidth,A.linewidth=v.linewidth,M.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const I=r.properties.get(A);I.light=M}return A}function S(T,v,M,C,A,U){if(T.visible===!1)return;if(T.layers.test(A)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&U===Ja)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,T.matrixWorld);const D=e.update(T),z=T.material;if(Array.isArray(z)){const X=D.groups;for(let F=0,Q=X.length;F<Q;F++){const W=X[F],P=z[W.materialIndex];if(P&&P.visible){const q=w(T,P,C,U);T.onBeforeShadow(r,T,v,M,D,q,W),r.renderBufferDirect(M,null,D,q,T,W),T.onAfterShadow(r,T,v,M,D,q,W)}}}else if(z.visible){const X=w(T,z,C,U);T.onBeforeShadow(r,T,v,M,D,X,null),r.renderBufferDirect(M,null,D,X,T,null),T.onAfterShadow(r,T,v,M,D,X,null)}}const H=T.children;for(let D=0,z=H.length;D<z;D++)S(H[D],v,M,C,A,U)}function b(T){T.target.removeEventListener("dispose",b);for(const M in c){const C=c[M],A=T.target.uuid;A in C&&(C[A].dispose(),delete C[A])}}}function bb(r,e){function t(){let N=!1;const ee=new Yt;let J=null;const ve=new Yt(0,0,0,0);return{setMask:function(de){J!==de&&!N&&(r.colorMask(de,de,de,de),J=de)},setLocked:function(de){N=de},setClear:function(de,xe,he,Se,re){re===!0&&(de*=Se,xe*=Se,he*=Se),ee.set(de,xe,he,Se),ve.equals(ee)===!1&&(r.clearColor(de,xe,he,Se),ve.copy(ee))},reset:function(){N=!1,J=null,ve.set(-1,0,0,0)}}}function n(){let N=!1,ee=!1,J=null,ve=null,de=null;return{setReversed:function(xe){if(ee!==xe){const he=e.get("EXT_clip_control");xe?he.clipControlEXT(he.LOWER_LEFT_EXT,he.ZERO_TO_ONE_EXT):he.clipControlEXT(he.LOWER_LEFT_EXT,he.NEGATIVE_ONE_TO_ONE_EXT),ee=xe;const Se=de;de=null,this.setClear(Se)}},getReversed:function(){return ee},setTest:function(xe){xe?ce(r.DEPTH_TEST):pe(r.DEPTH_TEST)},setMask:function(xe){J!==xe&&!N&&(r.depthMask(xe),J=xe)},setFunc:function(xe){if(ee&&(xe=kv[xe]),ve!==xe){switch(xe){case Xu:r.depthFunc(r.NEVER);break;case Yu:r.depthFunc(r.ALWAYS);break;case qu:r.depthFunc(r.LESS);break;case Ao:r.depthFunc(r.LEQUAL);break;case $u:r.depthFunc(r.EQUAL);break;case Ku:r.depthFunc(r.GEQUAL);break;case Zu:r.depthFunc(r.GREATER);break;case Ju:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}ve=xe}},setLocked:function(xe){N=xe},setClear:function(xe){de!==xe&&(de=xe,ee&&(xe=1-xe),r.clearDepth(xe))},reset:function(){N=!1,J=null,ve=null,de=null,ee=!1}}}function i(){let N=!1,ee=null,J=null,ve=null,de=null,xe=null,he=null,Se=null,re=null;return{setTest:function(te){N||(te?ce(r.STENCIL_TEST):pe(r.STENCIL_TEST))},setMask:function(te){ee!==te&&!N&&(r.stencilMask(te),ee=te)},setFunc:function(te,ye,ne){(J!==te||ve!==ye||de!==ne)&&(r.stencilFunc(te,ye,ne),J=te,ve=ye,de=ne)},setOp:function(te,ye,ne){(xe!==te||he!==ye||Se!==ne)&&(r.stencilOp(te,ye,ne),xe=te,he=ye,Se=ne)},setLocked:function(te){N=te},setClear:function(te){re!==te&&(r.clearStencil(te),re=te)},reset:function(){N=!1,ee=null,J=null,ve=null,de=null,xe=null,he=null,Se=null,re=null}}}const s=new t,a=new n,o=new i;let l={};const c=new WeakMap;let u={},d={},h={},f=new WeakMap,m=[],_=null,p=!1,g=null,x=null,w=null,S=null,b=null,T=null,v=null,M=new ke(0,0,0),C=0,A=!1,U=null,I=null,H=null,D=null,z=null;const X=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,Q=0;const W=r.getParameter(r.VERSION);W.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(W)[1]),F=Q>=1):W.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),F=Q>=2);let P=null,q={};const le=r.getParameter(r.SCISSOR_BOX),Ee=r.getParameter(r.VIEWPORT),Y=new Yt().fromArray(le),ae=new Yt().fromArray(Ee);function _e(N,ee,J,ve){const de=new Uint8Array(4),xe=r.createTexture();r.bindTexture(N,xe),r.texParameteri(N,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(N,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let he=0;he<J;he++)N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY?r.texImage3D(ee,0,r.RGBA,1,1,ve,0,r.RGBA,r.UNSIGNED_BYTE,de):r.texImage2D(ee+he,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,de);return xe}const Me={};Me[r.TEXTURE_2D]=_e(r.TEXTURE_2D,r.TEXTURE_2D,1),Me[r.TEXTURE_CUBE_MAP]=_e(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Me[r.TEXTURE_2D_ARRAY]=_e(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Me[r.TEXTURE_3D]=_e(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ce(r.DEPTH_TEST),a.setFunc(Ao),K(!1),it(Ad),ce(r.CULL_FACE),ut(gs);function ce(N){u[N]!==!0&&(r.enable(N),u[N]=!0)}function pe(N){u[N]!==!1&&(r.disable(N),u[N]=!1)}function Ye(N,ee){return h[N]!==ee?(r.bindFramebuffer(N,ee),h[N]=ee,N===r.DRAW_FRAMEBUFFER&&(h[r.FRAMEBUFFER]=ee),N===r.FRAMEBUFFER&&(h[r.DRAW_FRAMEBUFFER]=ee),!0):!1}function se(N,ee){let J=m,ve=!1;if(N){J=f.get(ee),J===void 0&&(J=[],f.set(ee,J));const de=N.textures;if(J.length!==de.length||J[0]!==r.COLOR_ATTACHMENT0){for(let xe=0,he=de.length;xe<he;xe++)J[xe]=r.COLOR_ATTACHMENT0+xe;J.length=de.length,ve=!0}}else J[0]!==r.BACK&&(J[0]=r.BACK,ve=!0);ve&&r.drawBuffers(J)}function Pe(N){return _!==N?(r.useProgram(N),_=N,!0):!1}const Le={[ta]:r.FUNC_ADD,[cv]:r.FUNC_SUBTRACT,[uv]:r.FUNC_REVERSE_SUBTRACT};Le[hv]=r.MIN,Le[fv]=r.MAX;const Ie={[dv]:r.ZERO,[pv]:r.ONE,[mv]:r.SRC_COLOR,[f0]:r.SRC_ALPHA,[Mv]:r.SRC_ALPHA_SATURATE,[xv]:r.DST_COLOR,[_v]:r.DST_ALPHA,[gv]:r.ONE_MINUS_SRC_COLOR,[d0]:r.ONE_MINUS_SRC_ALPHA,[Sv]:r.ONE_MINUS_DST_COLOR,[vv]:r.ONE_MINUS_DST_ALPHA,[yv]:r.CONSTANT_COLOR,[Ev]:r.ONE_MINUS_CONSTANT_COLOR,[bv]:r.CONSTANT_ALPHA,[Tv]:r.ONE_MINUS_CONSTANT_ALPHA};function ut(N,ee,J,ve,de,xe,he,Se,re,te){if(N===gs){p===!0&&(pe(r.BLEND),p=!1);return}if(p===!1&&(ce(r.BLEND),p=!0),N!==lv){if(N!==g||te!==A){if((x!==ta||b!==ta)&&(r.blendEquation(r.FUNC_ADD),x=ta,b=ta),te)switch(N){case fo:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Oi:r.blendFunc(r.ONE,r.ONE);break;case Rd:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Cd:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:vt("WebGLState: Invalid blending: ",N);break}else switch(N){case fo:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Oi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Rd:vt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Cd:vt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:vt("WebGLState: Invalid blending: ",N);break}w=null,S=null,T=null,v=null,M.set(0,0,0),C=0,g=N,A=te}return}de=de||ee,xe=xe||J,he=he||ve,(ee!==x||de!==b)&&(r.blendEquationSeparate(Le[ee],Le[de]),x=ee,b=de),(J!==w||ve!==S||xe!==T||he!==v)&&(r.blendFuncSeparate(Ie[J],Ie[ve],Ie[xe],Ie[he]),w=J,S=ve,T=xe,v=he),(Se.equals(M)===!1||re!==C)&&(r.blendColor(Se.r,Se.g,Se.b,re),M.copy(Se),C=re),g=N,A=!1}function st(N,ee){N.side===mi?pe(r.CULL_FACE):ce(r.CULL_FACE);let J=N.side===Fn;ee&&(J=!J),K(J),N.blending===fo&&N.transparent===!1?ut(gs):ut(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),s.setMask(N.colorWrite);const ve=N.stencilWrite;o.setTest(ve),ve&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),De(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ce(r.SAMPLE_ALPHA_TO_COVERAGE):pe(r.SAMPLE_ALPHA_TO_COVERAGE)}function K(N){U!==N&&(N?r.frontFace(r.CW):r.frontFace(r.CCW),U=N)}function it(N){N!==sv?(ce(r.CULL_FACE),N!==I&&(N===Ad?r.cullFace(r.BACK):N===av?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):pe(r.CULL_FACE),I=N}function Ae(N){N!==H&&(F&&r.lineWidth(N),H=N)}function De(N,ee,J){N?(ce(r.POLYGON_OFFSET_FILL),(D!==ee||z!==J)&&(D=ee,z=J,a.getReversed()&&(ee=-ee,J=-J),r.polygonOffset(ee,J))):pe(r.POLYGON_OFFSET_FILL)}function Ne(N){N?ce(r.SCISSOR_TEST):pe(r.SCISSOR_TEST)}function $e(N){N===void 0&&(N=r.TEXTURE0+X-1),P!==N&&(r.activeTexture(N),P=N)}function wt(N,ee,J){J===void 0&&(P===null?J=r.TEXTURE0+X-1:J=P);let ve=q[J];ve===void 0&&(ve={type:void 0,texture:void 0},q[J]=ve),(ve.type!==N||ve.texture!==ee)&&(P!==J&&(r.activeTexture(J),P=J),r.bindTexture(N,ee||Me[N]),ve.type=N,ve.texture=ee)}function B(){const N=q[P];N!==void 0&&N.type!==void 0&&(r.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function et(){try{r.compressedTexImage2D(...arguments)}catch(N){vt("WebGLState:",N)}}function tt(){try{r.compressedTexImage3D(...arguments)}catch(N){vt("WebGLState:",N)}}function Xe(){try{r.texSubImage2D(...arguments)}catch(N){vt("WebGLState:",N)}}function ge(){try{r.texSubImage3D(...arguments)}catch(N){vt("WebGLState:",N)}}function ft(){try{r.compressedTexSubImage2D(...arguments)}catch(N){vt("WebGLState:",N)}}function Fe(){try{r.compressedTexSubImage3D(...arguments)}catch(N){vt("WebGLState:",N)}}function We(){try{r.texStorage2D(...arguments)}catch(N){vt("WebGLState:",N)}}function R(){try{r.texStorage3D(...arguments)}catch(N){vt("WebGLState:",N)}}function y(){try{r.texImage2D(...arguments)}catch(N){vt("WebGLState:",N)}}function G(){try{r.texImage3D(...arguments)}catch(N){vt("WebGLState:",N)}}function oe(N){return d[N]!==void 0?d[N]:r.getParameter(N)}function ie(N,ee){d[N]!==ee&&(r.pixelStorei(N,ee),d[N]=ee)}function ue(N){Y.equals(N)===!1&&(r.scissor(N.x,N.y,N.z,N.w),Y.copy(N))}function me(N){ae.equals(N)===!1&&(r.viewport(N.x,N.y,N.z,N.w),ae.copy(N))}function k(N,ee){let J=c.get(ee);J===void 0&&(J=new WeakMap,c.set(ee,J));let ve=J.get(N);ve===void 0&&(ve=r.getUniformBlockIndex(ee,N.name),r.uniformBlockBinding(ee,ve,ve),J.set(N,ve))}function j(N,ee,J){const de=c.get(ee).get(N);l[de]!==J&&(r.bindBufferBase(r.UNIFORM_BUFFER,de,J),l[de]=J)}function fe(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),u={},d={},P=null,q={},h={},l={},f=new WeakMap,m=[],_=null,p=!1,g=null,x=null,w=null,S=null,b=null,T=null,v=null,M=new ke(0,0,0),C=0,A=!1,U=null,I=null,H=null,D=null,z=null,Y.set(0,0,r.canvas.width,r.canvas.height),ae.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ce,disable:pe,bindFramebuffer:Ye,drawBuffers:se,useProgram:Pe,setBlending:ut,setMaterial:st,setFlipSided:K,setCullFace:it,setLineWidth:Ae,setPolygonOffset:De,setScissorTest:Ne,activeTexture:$e,bindTexture:wt,unbindTexture:B,compressedTexImage2D:et,compressedTexImage3D:tt,texImage2D:y,texImage3D:G,pixelStorei:ie,getParameter:oe,updateUBOMapping:k,uniformBlockBinding:j,texStorage2D:We,texStorage3D:R,texSubImage2D:Xe,texSubImage3D:ge,compressedTexSubImage2D:ft,compressedTexSubImage3D:Fe,scissor:ue,viewport:me,reset:fe}}function Tb(r,e,t,n,i,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ve,u=new WeakMap,d=new Set;let h;const f=new WeakMap,m=new Set,_=new FinalizationRegistry(R=>m.delete(R));let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,y){return p?new OffscreenCanvas(R,y):Do("canvas")}function x(R,y,G){let oe=1;const ie=We(R);if((ie.width>G||ie.height>G)&&(oe=G/Math.max(ie.width,ie.height)),oe<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const ue=Math.floor(oe*ie.width),me=Math.floor(oe*ie.height);h===void 0&&(h=g(ue,me));const k=y?g(ue,me):h;return k.width=ue,k.height=me,k.getContext("2d").drawImage(R,0,0,ue,me),qe("WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+ue+"x"+me+")."),k}else return"data"in R&&qe("WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),R;return R}function w(R){return R.generateMipmaps}function S(R){r.generateMipmap(R)}function b(R){return R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?r.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function T(R,y,G,oe,ie,ue=!1){if(R!==null){if(r[R]!==void 0)return r[R];qe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let me;oe&&(me=e.get("EXT_texture_norm16"),me||qe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let k=y;if(y===r.RED&&(G===r.FLOAT&&(k=r.R32F),G===r.HALF_FLOAT&&(k=r.R16F),G===r.UNSIGNED_BYTE&&(k=r.R8),G===r.UNSIGNED_SHORT&&me&&(k=me.R16_EXT),G===r.SHORT&&me&&(k=me.R16_SNORM_EXT)),y===r.RED_INTEGER&&(G===r.UNSIGNED_BYTE&&(k=r.R8UI),G===r.UNSIGNED_SHORT&&(k=r.R16UI),G===r.UNSIGNED_INT&&(k=r.R32UI),G===r.BYTE&&(k=r.R8I),G===r.SHORT&&(k=r.R16I),G===r.INT&&(k=r.R32I)),y===r.RG&&(G===r.FLOAT&&(k=r.RG32F),G===r.HALF_FLOAT&&(k=r.RG16F),G===r.UNSIGNED_BYTE&&(k=r.RG8),G===r.UNSIGNED_SHORT&&me&&(k=me.RG16_EXT),G===r.SHORT&&me&&(k=me.RG16_SNORM_EXT)),y===r.RG_INTEGER&&(G===r.UNSIGNED_BYTE&&(k=r.RG8UI),G===r.UNSIGNED_SHORT&&(k=r.RG16UI),G===r.UNSIGNED_INT&&(k=r.RG32UI),G===r.BYTE&&(k=r.RG8I),G===r.SHORT&&(k=r.RG16I),G===r.INT&&(k=r.RG32I)),y===r.RGB_INTEGER&&(G===r.UNSIGNED_BYTE&&(k=r.RGB8UI),G===r.UNSIGNED_SHORT&&(k=r.RGB16UI),G===r.UNSIGNED_INT&&(k=r.RGB32UI),G===r.BYTE&&(k=r.RGB8I),G===r.SHORT&&(k=r.RGB16I),G===r.INT&&(k=r.RGB32I)),y===r.RGBA_INTEGER&&(G===r.UNSIGNED_BYTE&&(k=r.RGBA8UI),G===r.UNSIGNED_SHORT&&(k=r.RGBA16UI),G===r.UNSIGNED_INT&&(k=r.RGBA32UI),G===r.BYTE&&(k=r.RGBA8I),G===r.SHORT&&(k=r.RGBA16I),G===r.INT&&(k=r.RGBA32I)),y===r.RGB&&(G===r.UNSIGNED_SHORT&&me&&(k=me.RGB16_EXT),G===r.SHORT&&me&&(k=me.RGB16_SNORM_EXT),G===r.UNSIGNED_INT_5_9_9_9_REV&&(k=r.RGB9_E5),G===r.UNSIGNED_INT_10F_11F_11F_REV&&(k=r.R11F_G11F_B10F)),y===r.RGBA){const j=ue?cc:mt.getTransfer(ie);G===r.FLOAT&&(k=r.RGBA32F),G===r.HALF_FLOAT&&(k=r.RGBA16F),G===r.UNSIGNED_BYTE&&(k=j===yt?r.SRGB8_ALPHA8:r.RGBA8),G===r.UNSIGNED_SHORT&&me&&(k=me.RGBA16_EXT),G===r.SHORT&&me&&(k=me.RGBA16_SNORM_EXT),G===r.UNSIGNED_SHORT_4_4_4_4&&(k=r.RGBA4),G===r.UNSIGNED_SHORT_5_5_5_1&&(k=r.RGB5_A1)}return(k===r.R16F||k===r.R32F||k===r.RG16F||k===r.RG32F||k===r.RGBA16F||k===r.RGBA32F)&&e.get("EXT_color_buffer_float"),k}function v(R,y){let G;return R?y===null||y===tr||y===ya?G=r.DEPTH24_STENCIL8:y===Bi?G=r.DEPTH32F_STENCIL8:y===Po&&(G=r.DEPTH24_STENCIL8,qe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===tr||y===ya?G=r.DEPTH_COMPONENT24:y===Bi?G=r.DEPTH_COMPONENT32F:y===Po&&(G=r.DEPTH_COMPONENT16),G}function M(R,y){return w(R)===!0||R.isFramebufferTexture&&R.minFilter!==Mn&&R.minFilter!==Kn?Math.log2(Math.max(y.width,y.height))+1:R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?y.mipmaps.length:1}function C(R){const y=new WeakRef(R);n.get(R).__ref=y,m.add(y),_.register(R,y,y)}function A(R){const y=n.get(R).__ref;y!==void 0&&(m.delete(y),_.unregister(y))}function U(R){H(R.target)}function I(R){D(R.target)}function H(R){R.removeEventListener("dispose",U),A(R),X(R),R.isVideoTexture&&u.delete(R),R.isHTMLTexture&&d.delete(R)}function D(R){R.removeEventListener("dispose",I),A(R),Q(R)}function z(){for(const R of m){const y=R.deref();y!==void 0&&(y.isRenderTarget===!0?D(y):H(y))}m.clear(),d.clear()}function X(R){const y=n.get(R);if(y.__webglInit===void 0)return;const G=R.source,oe=f.get(G);if(oe){const ie=oe[y.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&F(R),Object.keys(oe).length===0&&f.delete(G)}n.remove(R)}function F(R){const y=n.get(R);r.deleteTexture(y.__webglTexture);const G=R.source,oe=f.get(G);delete oe[y.__cacheKey],a.memory.textures--}function Q(R){const y=n.get(R);y.__depthDisposeCallback&&y.__depthDisposeCallback();const G=R.depthTexture;if(G&&G.renderTarget===R&&H(G),R.isWebGLCubeRenderTarget)for(let ie=0;ie<6;ie++){if(Array.isArray(y.__webglFramebuffer[ie]))for(let ue=0;ue<y.__webglFramebuffer[ie].length;ue++)r.deleteFramebuffer(y.__webglFramebuffer[ie][ue]);else r.deleteFramebuffer(y.__webglFramebuffer[ie]);y.__webglDepthbuffer&&r.deleteRenderbuffer(y.__webglDepthbuffer[ie])}else{if(Array.isArray(y.__webglFramebuffer))for(let ie=0;ie<y.__webglFramebuffer.length;ie++)r.deleteFramebuffer(y.__webglFramebuffer[ie]);else r.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&r.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&r.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let ie=0;ie<y.__webglColorRenderbuffer.length;ie++)y.__webglColorRenderbuffer[ie]&&r.deleteRenderbuffer(y.__webglColorRenderbuffer[ie]);y.__webglDepthRenderbuffer&&r.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const oe=R.textures;for(let ie=0,ue=oe.length;ie<ue;ie++){const me=n.get(oe[ie]);me.__webglTexture&&(r.deleteTexture(me.__webglTexture),a.memory.textures--),n.remove(oe[ie])}n.remove(R)}let W=0;function P(){W=0}function q(){return W}function le(R){W=R}function Ee(){const R=W;return R>=i.maxTextures&&qe("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+i.maxTextures),W+=1,R}function Y(R){const y=[];return y.push(R.wrapS),y.push(R.wrapT),y.push(R.wrapR||0),y.push(R.magFilter),y.push(R.minFilter),y.push(R.anisotropy),y.push(R.internalFormat),y.push(R.format),y.push(R.type),y.push(R.generateMipmaps),y.push(R.mipmapsAutoUpdate),y.push(R.premultiplyAlpha),y.push(R.flipY),y.push(R.unpackAlignment),y.push(R.colorSpace),y.join()}function ae(R,y){const G=n.get(R);if(R.isVideoTexture&&ft(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&G.__version!==R.version){const oe=R.image;if(oe===null)qe("WebGLRenderer: Texture marked for update but no image data found.");else if(oe.complete===!1)qe("WebGLRenderer: Texture marked for update but image is incomplete");else{st(G,R,y);return}}else R.isExternalTexture&&(G.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,G.__webglTexture,r.TEXTURE0+y)}function _e(R,y){const G=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){st(G,R,y);return}else R.isExternalTexture&&(G.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,G.__webglTexture,r.TEXTURE0+y)}function Me(R,y){const G=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){st(G,R,y);return}t.bindTexture(r.TEXTURE_3D,G.__webglTexture,r.TEXTURE0+y)}function ce(R,y){const G=n.get(R);if(R.version>0&&G.__version!==R.version){K(G,R,y);return}t.bindTexture(r.TEXTURE_CUBE_MAP,G.__webglTexture,r.TEXTURE0+y)}const pe={[Co]:r.REPEAT,[dr]:r.CLAMP_TO_EDGE,[Qu]:r.MIRRORED_REPEAT},Ye={[Mn]:r.NEAREST,[Rv]:r.NEAREST_MIPMAP_NEAREST,[Qo]:r.NEAREST_MIPMAP_LINEAR,[Kn]:r.LINEAR,[Vc]:r.LINEAR_MIPMAP_NEAREST,[Or]:r.LINEAR_MIPMAP_LINEAR},se={[Lv]:r.NEVER,[b0]:r.ALWAYS,[Iv]:r.LESS,[y0]:r.LEQUAL,[Nv]:r.EQUAL,[E0]:r.GEQUAL,[Uv]:r.GREATER,[Fv]:r.NOTEQUAL};function Pe(R,y){if(y.type===Bi&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===Kn||y.magFilter===Vc||y.magFilter===Qo||y.magFilter===Or||y.minFilter===Kn||y.minFilter===Vc||y.minFilter===Qo||y.minFilter===Or)&&qe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(R,r.TEXTURE_WRAP_S,pe[y.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,pe[y.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,pe[y.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,Ye[y.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,Ye[y.minFilter]),y.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,se[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Mn||y.minFilter!==Qo&&y.minFilter!==Or||y.type===Bi&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");r.texParameterf(R,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,i.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function Le(R,y){let G=!1;R.__webglInit===void 0&&(R.__webglInit=!0,y.addEventListener("dispose",U),C(y));const oe=y.source;let ie=f.get(oe);ie===void 0&&(ie={},f.set(oe,ie));const ue=Y(y);if(ue!==R.__cacheKey){ie[ue]===void 0&&(ie[ue]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,G=!0),ie[ue].usedTimes++;const me=ie[R.__cacheKey];me!==void 0&&(ie[R.__cacheKey].usedTimes--,me.usedTimes===0&&F(y)),R.__cacheKey=ue,R.__webglTexture=ie[ue].texture}return G}function Ie(R,y,G){return Math.floor(Math.floor(R/G)/y)}function ut(R,y,G,oe){const ue=R.updateRanges;if(ue.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,y.width,y.height,G,oe,y.data);else{ue.sort((N,ee)=>N.start-ee.start);let me=0;for(let N=1;N<ue.length;N++){const ee=ue[me],J=ue[N],ve=ee.start+ee.count,de=Ie(J.start,y.width,4),xe=Ie(ee.start,y.width,4);J.start<=ve+1&&de===xe&&Ie(J.start+J.count-1,y.width,4)===de?ee.count=Math.max(ee.count,J.start+J.count-ee.start):(++me,ue[me]=J)}ue.length=me+1;const k=t.getParameter(r.UNPACK_ROW_LENGTH),j=t.getParameter(r.UNPACK_SKIP_PIXELS),fe=t.getParameter(r.UNPACK_SKIP_ROWS);t.pixelStorei(r.UNPACK_ROW_LENGTH,y.width);for(let N=0,ee=ue.length;N<ee;N++){const J=ue[N],ve=Math.floor(J.start/4),de=Math.ceil(J.count/4),xe=ve%y.width,he=Math.floor(ve/y.width),Se=de,re=1;t.pixelStorei(r.UNPACK_SKIP_PIXELS,xe),t.pixelStorei(r.UNPACK_SKIP_ROWS,he),t.texSubImage2D(r.TEXTURE_2D,0,xe,he,Se,re,G,oe,y.data)}R.clearUpdateRanges(),t.pixelStorei(r.UNPACK_ROW_LENGTH,k),t.pixelStorei(r.UNPACK_SKIP_PIXELS,j),t.pixelStorei(r.UNPACK_SKIP_ROWS,fe)}}function st(R,y,G){let oe=r.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(oe=r.TEXTURE_2D_ARRAY),y.isData3DTexture&&(oe=r.TEXTURE_3D);const ie=Le(R,y),ue=y.source;t.bindTexture(oe,R.__webglTexture,r.TEXTURE0+G);const me=n.get(ue);if(ue.version!==me.__version||ie===!0){if(t.activeTexture(r.TEXTURE0+G),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){const re=mt.getPrimaries(mt.workingColorSpace),te=y.colorSpace===Dr?null:mt.getPrimaries(y.colorSpace),ye=y.colorSpace===Dr||re===te?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye)}t.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment);let j=x(y.image,!1,i.maxTextureSize);j=Fe(y,j);const fe=s.convert(y.format,y.colorSpace),N=s.convert(y.type);let ee=T(y.internalFormat,fe,N,y.normalized,y.colorSpace,y.isVideoTexture);Pe(oe,y);let J;const ve=y.mipmaps,de=y.isVideoTexture!==!0,xe=me.__version===void 0||ie===!0,he=ue.dataReady,Se=M(y,j);if(y.isDepthTexture)ee=v(y.format===Br,y.type),xe&&(de?t.texStorage2D(r.TEXTURE_2D,1,ee,j.width,j.height):t.texImage2D(r.TEXTURE_2D,0,ee,j.width,j.height,0,fe,N,null));else if(y.isDataTexture)if(ve.length>0){de&&xe&&t.texStorage2D(r.TEXTURE_2D,Se,ee,ve[0].width,ve[0].height);for(let re=0,te=ve.length;re<te;re++)J=ve[re],de?he&&t.texSubImage2D(r.TEXTURE_2D,re,0,0,J.width,J.height,fe,N,J.data):t.texImage2D(r.TEXTURE_2D,re,ee,J.width,J.height,0,fe,N,J.data);y.generateMipmaps=!1}else de?(xe&&t.texStorage2D(r.TEXTURE_2D,Se,ee,j.width,j.height),he&&ut(y,j,fe,N)):t.texImage2D(r.TEXTURE_2D,0,ee,j.width,j.height,0,fe,N,j.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){de&&xe&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Se,ee,ve[0].width,ve[0].height,j.depth);for(let re=0,te=ve.length;re<te;re++)if(J=ve[re],y.format!==Ki)if(fe!==null)if(de){if(he)if(y.layerUpdates.size>0){const ye=dp(J.width,J.height,y.format,y.type);for(const ne of y.layerUpdates){const Re=J.data.subarray(ne*ye/J.data.BYTES_PER_ELEMENT,(ne+1)*ye/J.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,re,0,0,ne,J.width,J.height,1,fe,Re)}}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,re,0,0,0,J.width,J.height,j.depth,fe,J.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,re,ee,J.width,J.height,j.depth,0,J.data,0,0);else qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else de?he&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,re,0,0,0,J.width,J.height,j.depth,fe,N,J.data):t.texImage3D(r.TEXTURE_2D_ARRAY,re,ee,J.width,J.height,j.depth,0,fe,N,J.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{de&&xe&&t.texStorage2D(r.TEXTURE_2D,Se,ee,ve[0].width,ve[0].height);for(let re=0,te=ve.length;re<te;re++)J=ve[re],y.format!==Ki?fe!==null?de?he&&t.compressedTexSubImage2D(r.TEXTURE_2D,re,0,0,J.width,J.height,fe,J.data):t.compressedTexImage2D(r.TEXTURE_2D,re,ee,J.width,J.height,0,J.data):qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):de?he&&t.texSubImage2D(r.TEXTURE_2D,re,0,0,J.width,J.height,fe,N,J.data):t.texImage2D(r.TEXTURE_2D,re,ee,J.width,J.height,0,fe,N,J.data)}else if(y.isDataArrayTexture)if(de){if(xe&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Se,ee,j.width,j.height,j.depth),he)if(y.layerUpdates.size>0){const re=dp(j.width,j.height,y.format,y.type);for(const te of y.layerUpdates){const ye=j.data.subarray(te*re/j.data.BYTES_PER_ELEMENT,(te+1)*re/j.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,te,j.width,j.height,1,fe,N,ye)}y.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,fe,N,j.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,ee,j.width,j.height,j.depth,0,fe,N,j.data);else if(y.isData3DTexture)de?(xe&&t.texStorage3D(r.TEXTURE_3D,Se,ee,j.width,j.height,j.depth),he&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,fe,N,j.data)):t.texImage3D(r.TEXTURE_3D,0,ee,j.width,j.height,j.depth,0,fe,N,j.data);else if(y.isFramebufferTexture){if(xe)if(de)t.texStorage2D(r.TEXTURE_2D,Se,ee,j.width,j.height);else{let re=j.width,te=j.height;for(let ye=0;ye<Se;ye++)t.texImage2D(r.TEXTURE_2D,ye,ee,re,te,0,fe,N,null),re>>=1,te>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in r){const re=r.canvas;if(re.hasAttribute("layoutsubtree")||re.setAttribute("layoutsubtree","true"),j.parentNode!==re){re.appendChild(j),d.add(y),re.onpaint=te=>{const ye=te.changedElements;for(const ne of d)ye.includes(ne.image)&&(ne.needsUpdate=!0)},re.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,j);else{const ye=r.RGBA,ne=r.RGBA,Re=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,ye,ne,Re,j)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(ve.length>0){if(de&&xe){const re=We(ve[0]);t.texStorage2D(r.TEXTURE_2D,Se,ee,re.width,re.height)}for(let re=0,te=ve.length;re<te;re++)J=ve[re],de?he&&t.texSubImage2D(r.TEXTURE_2D,re,0,0,fe,N,J):t.texImage2D(r.TEXTURE_2D,re,ee,fe,N,J);y.generateMipmaps=!1}else if(de){if(xe){const re=We(j);t.texStorage2D(r.TEXTURE_2D,Se,ee,re.width,re.height)}he&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,fe,N,j)}else t.texImage2D(r.TEXTURE_2D,0,ee,fe,N,j);w(y)&&y.mipmapsAutoUpdate===!0&&S(oe),me.__version=ue.version,y.onUpdate&&y.onUpdate(y)}R.__version=y.version}function K(R,y,G){if(y.image.length!==6)return;const oe=Le(R,y),ie=y.source;t.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+G);const ue=n.get(ie);if(ie.version!==ue.__version||oe===!0){t.activeTexture(r.TEXTURE0+G);const me=mt.getPrimaries(mt.workingColorSpace),k=y.colorSpace===Dr?null:mt.getPrimaries(y.colorSpace),j=y.colorSpace===Dr||me===k?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);const fe=y.isCompressedTexture||y.image[0].isCompressedTexture,N=y.image[0]&&y.image[0].isDataTexture,ee=[];for(let ne=0;ne<6;ne++)!fe&&!N?ee[ne]=x(y.image[ne],!0,i.maxCubemapSize):ee[ne]=N?y.image[ne].image:y.image[ne],ee[ne]=Fe(y,ee[ne]);const J=ee[0],ve=s.convert(y.format,y.colorSpace),de=s.convert(y.type);let xe=T(y.internalFormat,ve,de,y.normalized,y.colorSpace);const he=y.isVideoTexture!==!0,Se=ue.__version===void 0||oe===!0,re=ie.dataReady;let te=M(y,J);Pe(r.TEXTURE_CUBE_MAP,y);let ye;if(y.isDepthTexture){if(xe=v(y.format===Br,y.type),Se)if(he)t.texStorage2D(r.TEXTURE_CUBE_MAP,1,xe,J.width,J.height);else for(let ne=0;ne<6;ne++)t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,xe,J.width,J.height,0,ve,de,null)}else if(fe){he&&Se&&t.texStorage2D(r.TEXTURE_CUBE_MAP,te,xe,J.width,J.height);for(let ne=0;ne<6;ne++){ye=ee[ne].mipmaps;for(let Re=0;Re<ye.length;Re++){const ht=ye[Re];y.format!==Ki?ve!==null?he?re&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Re,0,0,ht.width,ht.height,ve,ht.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Re,xe,ht.width,ht.height,0,ht.data):qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):he?re&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Re,0,0,ht.width,ht.height,ve,de,ht.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Re,xe,ht.width,ht.height,0,ve,de,ht.data)}}}else{if(ye=y.mipmaps,he&&Se){ye.length>0&&te++;const ne=We(ee[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,te,xe,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(N){he?re&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,ee[ne].width,ee[ne].height,ve,de,ee[ne].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,xe,ee[ne].width,ee[ne].height,0,ve,de,ee[ne].data);for(let Re=0;Re<ye.length;Re++){const Je=ye[Re].image[ne].image;he?re&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Re+1,0,0,Je.width,Je.height,ve,de,Je.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Re+1,xe,Je.width,Je.height,0,ve,de,Je.data)}}else{he?re&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,ve,de,ee[ne]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,xe,ve,de,ee[ne]);for(let Re=0;Re<ye.length;Re++){const ht=ye[Re];he?re&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Re+1,0,0,ve,de,ht.image[ne]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Re+1,xe,ve,de,ht.image[ne])}}}w(y)&&y.mipmapsAutoUpdate===!0&&S(r.TEXTURE_CUBE_MAP),ue.__version=ie.version,y.onUpdate&&y.onUpdate(y)}R.__version=y.version}function it(R,y,G,oe,ie,ue){const me=s.convert(G.format,G.colorSpace),k=s.convert(G.type),j=T(G.internalFormat,me,k,G.normalized,G.colorSpace),fe=n.get(y),N=n.get(G);if(N.__renderTarget=y,!fe.__hasExternalTextures){const ee=Math.max(1,y.width>>ue),J=Math.max(1,y.height>>ue);ie===r.TEXTURE_3D||ie===r.TEXTURE_2D_ARRAY?t.texImage3D(ie,ue,j,ee,J,y.depth,0,me,k,null):t.texImage2D(ie,ue,j,ee,J,0,me,k,null)}t.bindFramebuffer(r.FRAMEBUFFER,R),ge(y)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,oe,ie,N.__webglTexture,0,Xe(y)):(ie===r.TEXTURE_2D||ie>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,oe,ie,N.__webglTexture,ue),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ae(R,y,G){if(r.bindRenderbuffer(r.RENDERBUFFER,R),y.depthBuffer){const oe=y.depthTexture,ie=oe&&oe.isDepthTexture?oe.type:null,ue=v(y.stencilBuffer,ie),me=y.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;ge(y)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Xe(y),ue,y.width,y.height):G?r.renderbufferStorageMultisample(r.RENDERBUFFER,Xe(y),ue,y.width,y.height):r.renderbufferStorage(r.RENDERBUFFER,ue,y.width,y.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,me,r.RENDERBUFFER,R)}else{const oe=y.textures;for(let ie=0;ie<oe.length;ie++){const ue=oe[ie],me=s.convert(ue.format,ue.colorSpace),k=s.convert(ue.type),j=T(ue.internalFormat,me,k,ue.normalized,ue.colorSpace);ge(y)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Xe(y),j,y.width,y.height):G?r.renderbufferStorageMultisample(r.RENDERBUFFER,Xe(y),j,y.width,y.height):r.renderbufferStorage(r.RENDERBUFFER,j,y.width,y.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function De(R,y,G){const oe=y.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(r.FRAMEBUFFER,R),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ie=n.get(y.depthTexture);ie.__renderTarget=y;const ue=oe?y.depthTexture.image[0]:y.depthTexture.image;(!ie.__webglTexture||ue.width!==y.width||ue.height!==y.height)&&(ue.width=y.width,ue.height=y.height,y.depthTexture.needsUpdate=!0),oe?ce(y.depthTexture,0):ae(y.depthTexture,0);const me=ie.__webglTexture,k=Xe(y),j=oe?r.TEXTURE_CUBE_MAP_POSITIVE_X+G:r.TEXTURE_2D,fe=y.depthTexture.format===Br?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(y.depthTexture.format===qr)ge(y)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,fe,j,me,0,k):r.framebufferTexture2D(r.FRAMEBUFFER,fe,j,me,0);else if(y.depthTexture.format===Br)ge(y)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,fe,j,me,0,k):r.framebufferTexture2D(r.FRAMEBUFFER,fe,j,me,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ne(R){const y=n.get(R),G=R.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==R.depthTexture){const oe=R.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),oe){const ie=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,oe.removeEventListener("dispose",ie)};oe.addEventListener("dispose",ie),y.__depthDisposeCallback=ie}y.__boundDepthTexture=oe}if(R.depthTexture&&!y.__autoAllocateDepthBuffer)if(G)for(let oe=0;oe<6;oe++)De(y.__webglFramebuffer[oe],R,oe);else R.texture.mipmaps.length>0?De(y.__webglFramebuffer[0],R,0):De(y.__webglFramebuffer,R,0);else if(G){y.__webglDepthbuffer=[];for(let oe=0;oe<6;oe++)if(t.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer[oe]),y.__webglDepthbuffer[oe]===void 0)y.__webglDepthbuffer[oe]=r.createRenderbuffer(),Ae(y.__webglDepthbuffer[oe],R,!1);else{const ie=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ue=y.__webglDepthbuffer[oe];r.bindRenderbuffer(r.RENDERBUFFER,ue),r.framebufferRenderbuffer(r.FRAMEBUFFER,ie,r.RENDERBUFFER,ue)}}else if(R.texture.mipmaps.length>0?t.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=r.createRenderbuffer(),Ae(y.__webglDepthbuffer,R,!1);else{const ie=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ue=y.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,ue),r.framebufferRenderbuffer(r.FRAMEBUFFER,ie,r.RENDERBUFFER,ue)}t.bindFramebuffer(r.FRAMEBUFFER,null)}function $e(R,y,G){const oe=n.get(R);y!==void 0&&it(oe.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),G!==void 0&&Ne(R)}function wt(R){const y=R.texture,G=n.get(R),oe=n.get(y);R.addEventListener("dispose",I),C(R);const ie=R.textures,ue=R.isWebGLCubeRenderTarget===!0,me=ie.length>1;if(me||(oe.__webglTexture===void 0&&(oe.__webglTexture=r.createTexture()),oe.__version=y.version,a.memory.textures++),ue){G.__webglFramebuffer=[];for(let k=0;k<6;k++)if(y.mipmaps.length>0){G.__webglFramebuffer[k]=[];for(let j=0;j<y.mipmaps.length;j++)G.__webglFramebuffer[k][j]=r.createFramebuffer()}else G.__webglFramebuffer[k]=r.createFramebuffer()}else{if(y.mipmaps.length>0){G.__webglFramebuffer=[];for(let k=0;k<y.mipmaps.length;k++)G.__webglFramebuffer[k]=r.createFramebuffer()}else G.__webglFramebuffer=r.createFramebuffer();if(me)for(let k=0,j=ie.length;k<j;k++){const fe=n.get(ie[k]);fe.__webglTexture===void 0&&(fe.__webglTexture=r.createTexture(),a.memory.textures++)}if(R.samples>0&&ge(R)===!1){G.__webglMultisampledFramebuffer=r.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let k=0;k<ie.length;k++){const j=ie[k];G.__webglColorRenderbuffer[k]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,G.__webglColorRenderbuffer[k]);const fe=s.convert(j.format,j.colorSpace),N=s.convert(j.type),ee=T(j.internalFormat,fe,N,j.normalized,j.colorSpace,R.isXRRenderTarget===!0),J=Xe(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,J,ee,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+k,r.RENDERBUFFER,G.__webglColorRenderbuffer[k])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(G.__webglDepthRenderbuffer=r.createRenderbuffer(),Ae(G.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(ue){t.bindTexture(r.TEXTURE_CUBE_MAP,oe.__webglTexture),Pe(r.TEXTURE_CUBE_MAP,y);for(let k=0;k<6;k++)if(y.mipmaps.length>0)for(let j=0;j<y.mipmaps.length;j++)it(G.__webglFramebuffer[k][j],R,y,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+k,j);else it(G.__webglFramebuffer[k],R,y,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+k,0);w(y)?S(r.TEXTURE_CUBE_MAP):y.mipmaps.length>0&&r.texParameteri(r.TEXTURE_CUBE_MAP,r.TEXTURE_MAX_LEVEL,y.mipmaps.length-1),t.unbindTexture()}else if(me){for(let k=0,j=ie.length;k<j;k++){const fe=ie[k],N=n.get(fe);let ee=r.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ee=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ee,N.__webglTexture),Pe(ee,fe),it(G.__webglFramebuffer,R,fe,r.COLOR_ATTACHMENT0+k,ee,0),w(fe)&&S(ee)}t.unbindTexture()}else{let k=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(k=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(k,oe.__webglTexture),Pe(k,y),y.mipmaps.length>0)for(let j=0;j<y.mipmaps.length;j++)it(G.__webglFramebuffer[j],R,y,r.COLOR_ATTACHMENT0,k,j);else it(G.__webglFramebuffer,R,y,r.COLOR_ATTACHMENT0,k,0);w(y)?S(k):y.mipmaps.length>0&&r.texParameteri(k,r.TEXTURE_MAX_LEVEL,y.mipmaps.length-1),t.unbindTexture()}R.depthBuffer&&Ne(R)}function B(R){const y=R.textures;for(let G=0,oe=y.length;G<oe;G++){const ie=y[G];if(w(ie)&&ie.mipmapsAutoUpdate===!0){const ue=b(R),me=n.get(ie).__webglTexture;t.bindTexture(ue,me),S(ue),t.unbindTexture()}}}const et=[];function tt(R){if(R.samples>0){if(ge(R)===!1){const y=R.textures,G=R.width,oe=R.height;let ie=r.COLOR_BUFFER_BIT;const ue=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,me=n.get(R),k=y.length>1;if(k)for(let fe=0;fe<y.length;fe++)t.bindFramebuffer(r.FRAMEBUFFER,me.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+fe,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,me.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+fe,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,me.__webglMultisampledFramebuffer),R.texture.mipmaps.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,me.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,me.__webglFramebuffer);for(let fe=0;fe<y.length;fe++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(ie|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(ie|=r.STENCIL_BUFFER_BIT)),k){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,me.__webglColorRenderbuffer[fe]);const N=n.get(y[fe]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,N,0)}r.blitFramebuffer(0,0,G,oe,0,0,G,oe,ie,r.NEAREST),l===!0&&(et.length=0,et.push(r.COLOR_ATTACHMENT0+fe),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&et.push(ue),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,et))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),k)for(let fe=0;fe<y.length;fe++){t.bindFramebuffer(r.FRAMEBUFFER,me.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+fe,r.RENDERBUFFER,me.__webglColorRenderbuffer[fe]);const N=n.get(y[fe]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,me.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+fe,r.TEXTURE_2D,N,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,me.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&l){const y=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[y])}}}function Xe(R){return Math.min(i.maxSamples,R.samples)}function ge(R){const y=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function ft(R){const y=a.render.frame;u.get(R)!==y&&(u.set(R,y),R.update())}function Fe(R,y){const G=R.colorSpace,oe=R.format,ie=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||G!==lc&&G!==Dr&&(mt.getTransfer(G)===yt?(oe!==Ki||ie!==wi)&&qe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):vt("WebGLTextures: Unsupported texture color space:",G)),y}function We(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=Ee,this.resetTextureUnits=P,this.getTextureUnits=q,this.setTextureUnits=le,this.setTexture2D=ae,this.setTexture2DArray=_e,this.setTexture3D=Me,this.setTextureCube=ce,this.rebindTextures=$e,this.setupRenderTarget=wt,this.updateRenderTargetMipmap=B,this.updateMultisampleRenderTarget=tt,this.setupDepthRenderbuffer=Ne,this.setupFrameBufferTexture=it,this.useMultisampledRTT=ge,this.dispose=z}function wb(r,e){function t(n,i=Dr){let s;const a=mt.getTransfer(i);if(n===wi)return r.UNSIGNED_BYTE;if(n===mf)return r.UNSIGNED_SHORT_4_4_4_4;if(n===gf)return r.UNSIGNED_SHORT_5_5_5_1;if(n===v0)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===x0)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===g0)return r.BYTE;if(n===_0)return r.SHORT;if(n===Po)return r.UNSIGNED_SHORT;if(n===pf)return r.INT;if(n===tr)return r.UNSIGNED_INT;if(n===Bi)return r.FLOAT;if(n===ei)return r.HALF_FLOAT;if(n===S0)return r.ALPHA;if(n===M0)return r.RGB;if(n===Ki)return r.RGBA;if(n===qr)return r.DEPTH_COMPONENT;if(n===Br)return r.DEPTH_STENCIL;if(n===_f)return r.RED;if(n===vf)return r.RED_INTEGER;if(n===Ms)return r.RG;if(n===xf)return r.RG_INTEGER;if(n===Sf)return r.RGBA_INTEGER;if(n===Hl||n===Gl||n===Vl||n===Wl)if(a===yt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Hl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Gl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Vl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Wl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Hl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Gl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Vl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Wl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ju||n===eh||n===th||n===nh)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ju)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===eh)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===th)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===nh)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ih||n===rh||n===sh||n===ah||n===oh||n===ac||n===lh)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===ih||n===rh)return a===yt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===sh)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===ah)return s.COMPRESSED_R11_EAC;if(n===oh)return s.COMPRESSED_SIGNED_R11_EAC;if(n===ac)return s.COMPRESSED_RG11_EAC;if(n===lh)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ch||n===uh||n===hh||n===fh||n===dh||n===ph||n===mh||n===gh||n===_h||n===vh||n===xh||n===Sh||n===Mh||n===yh)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===ch)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===uh)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===hh)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===fh)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===dh)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ph)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===mh)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===gh)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===_h)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===vh)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===xh)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Sh)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Mh)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===yh)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Eh||n===bh||n===Th)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Eh)return a===yt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===bh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Th)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===wh||n===Ah||n===oc||n===Rh)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===wh)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Ah)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===oc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Rh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ya?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const Ab=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Rb=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Cb{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new k0(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Nt({vertexShader:Ab,fragmentShader:Rb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new lt(new ji(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Pb extends Ts{constructor(e,t){super();const n=this;let i=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,m=null;const _=typeof XRWebGLBinding<"u",p=new Cb,g={},x=t.getContextAttributes();let w=null,S=null;const b=[],T=[],v=new Ve;let M=null,C=null;const A=new Fi;A.viewport=new Yt;const U=new Fi;U.viewport=new Yt;const I=[A,U],H=new Hx;let D=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let ae=b[Y];return ae===void 0&&(ae=new Zc,b[Y]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(Y){let ae=b[Y];return ae===void 0&&(ae=new Zc,b[Y]=ae),ae.getGripSpace()},this.getHand=function(Y){let ae=b[Y];return ae===void 0&&(ae=new Zc,b[Y]=ae),ae.getHandSpace()};function X(Y){const ae=T.indexOf(Y.inputSource);if(ae===-1)return;const _e=b[ae];_e!==void 0&&(_e.update(Y.inputSource,Y.frame,c||a),_e.dispatchEvent({type:Y.type,data:Y.inputSource}))}function F(){i.removeEventListener("select",X),i.removeEventListener("selectstart",X),i.removeEventListener("selectend",X),i.removeEventListener("squeeze",X),i.removeEventListener("squeezestart",X),i.removeEventListener("squeezeend",X),i.removeEventListener("end",F),i.removeEventListener("inputsourceschange",Q);for(let Y=0;Y<b.length;Y++){const ae=T[Y];ae!==null&&(T[Y]=null,b[Y].disconnect(ae))}D=null,z=null,p.reset();for(const Y in g)delete g[Y];if(e.setRenderTarget(w),f=null,h=null,d=null,i=null,S=null,Ee.stop(),n.isPresenting=!1,e.setPixelRatio(M),e.setSize(v.width,v.height,!1),C!==null){const Y=C.camera;Y.fov=C.fov,Y.zoom=C.zoom,Y.updateProjectionMatrix(),C=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,n.isPresenting===!0&&qe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&qe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(i,t)),d},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(w=e.getRenderTarget(),i.addEventListener("select",X),i.addEventListener("selectstart",X),i.addEventListener("selectend",X),i.addEventListener("squeeze",X),i.addEventListener("squeezestart",X),i.addEventListener("squeezeend",X),i.addEventListener("end",F),i.addEventListener("inputsourceschange",Q),x.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(v),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let _e=null,Me=null,ce=null;x.depth&&(ce=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,_e=x.stencil?Br:qr,Me=x.stencil?ya:tr);const pe={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:s};d=this.getBinding(),h=d.createProjectionLayer(pe),i.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),S=new ti(h.textureWidth,h.textureHeight,{format:Ki,type:wi,depthTexture:new Ea(h.textureWidth,h.textureHeight,Me,void 0,void 0,void 0,void 0,void 0,void 0,_e),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const _e={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,_e),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new ti(f.framebufferWidth,f.framebufferHeight,{format:Ki,type:wi,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Ee.setContext(i),Ee.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function Q(Y){for(let ae=0;ae<Y.removed.length;ae++){const _e=Y.removed[ae],Me=T.indexOf(_e);Me>=0&&(T[Me]=null,b[Me].disconnect(_e))}for(let ae=0;ae<Y.added.length;ae++){const _e=Y.added[ae];let Me=T.indexOf(_e);if(Me===-1){for(let pe=0;pe<b.length;pe++)if(pe>=T.length){T.push(_e),Me=pe;break}else if(T[pe]===null){T[pe]=_e,Me=pe;break}if(Me===-1)break}const ce=b[Me];ce&&ce.connect(_e)}}function W(Y,ae){ae===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(ae.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;let ae=Y.near,_e=Y.far;p.texture!==null&&(p.depthNear>0&&(ae=p.depthNear),p.depthFar>0&&(_e=p.depthFar)),H.near=U.near=A.near=ae,H.far=U.far=A.far=_e,(D!==H.near||z!==H.far)&&(i.updateRenderState({depthNear:H.near,depthFar:H.far}),D=H.near,z=H.far),H.layers.mask=Y.layers.mask|6,A.layers.mask=H.layers.mask&-5,U.layers.mask=H.layers.mask&-3;const Me=Y.parent,ce=H.cameras;W(H,Me);for(let pe=0;pe<ce.length;pe++)W(ce[pe],Me);H.projectionMatrix.copy(A.projectionMatrix),H.projectionMatrixInverse.copy(A.projectionMatrixInverse),C===null&&Y.isPerspectiveCamera&&(C={camera:Y,fov:Y.fov,zoom:Y.zoom}),P(Y,H,Me)};function P(Y,ae,_e){_e===null?Y.matrix.copy(ae.matrixWorld):(Y.matrix.copy(_e.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(ae.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(ae.projectionMatrix),Y.projectionMatrixInverse.copy(ae.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Lo*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(Y){l=Y,h!==null&&(h.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(H)},this.getCameraTexture=function(Y){return g[Y]};let q=null;function le(Y,ae){if(u=ae.getViewerPose(c||a),m=ae,u!==null){const _e=u.views;f!==null&&(e.setRenderTargetFramebuffer(S,f.framebuffer),e.setRenderTarget(S));let Me=!1;_e.length!==H.cameras.length&&(H.cameras.length=0,Me=!0);for(let se=0;se<_e.length;se++){const Pe=_e[se];let Le=null;if(f!==null)Le=f.getViewport(Pe);else{const ut=d.getViewSubImage(h,Pe);Le=ut.viewport,se===0&&(e.setRenderTargetTextures(S,ut.colorTexture,ut.depthStencilTexture),e.setRenderTarget(S))}let Ie=I[se];Ie===void 0&&(Ie=new Fi,Ie.layers.enable(se),Ie.viewport=new Yt,I[se]=Ie),Ie.matrix.fromArray(Pe.transform.matrix),Ie.matrix.decompose(Ie.position,Ie.quaternion,Ie.scale),Ie.projectionMatrix.fromArray(Pe.projectionMatrix),Ie.projectionMatrixInverse.copy(Ie.projectionMatrix).invert(),Ie.viewport.set(Le.x,Le.y,Le.width,Le.height),se===0&&(H.matrix.copy(Ie.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),Me===!0&&H.cameras.push(Ie)}const ce=i.enabledFeatures;if(ce&&ce.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){d=n.getBinding();const se=d.getDepthInformation(_e[0]);se&&se.isValid&&se.texture&&p.init(se,i.renderState)}if(ce&&ce.includes("camera-access")&&_){e.state.unbindTexture(),d=n.getBinding();for(let se=0;se<_e.length;se++){const Pe=_e[se].camera;if(Pe){let Le=g[Pe];Le||(Le=new k0,g[Pe]=Le);const Ie=d.getCameraImage(Pe);Le.sourceTexture=Ie}}}}for(let _e=0;_e<b.length;_e++){const Me=T[_e],ce=b[_e];Me!==null&&ce!==void 0&&ce.update(Me,ae,c||a)}q&&q(Y,ae),ae.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ae}),m=null}const Ee=new $0;Ee.setAnimationLoop(le),this.setAnimationLoop=function(Y){q=Y},this.dispose=function(){}}}const Db=new Tt,rg=new Ze;rg.set(-1,0,0,0,1,0,0,0,1);function Lb(r,e){function t(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function n(p,g){g.color.getRGB(p.fogColor.value,G0(r)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function i(p,g,x,w,S){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?s(p,g):g.isMeshLambertMaterial?(s(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(s(p,g),d(p,g)):g.isMeshPhongMaterial?(s(p,g),u(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(s(p,g),h(p,g),g.isMeshPhysicalMaterial&&f(p,g,S)):g.isMeshMatcapMaterial?(s(p,g),m(p,g)):g.isMeshDepthMaterial?s(p,g):g.isMeshDistanceMaterial?(s(p,g),_(p,g)):g.isMeshNormalMaterial?s(p,g):g.isLineBasicMaterial?(a(p,g),g.isLineDashedMaterial&&o(p,g)):g.isPointsMaterial?l(p,g,x,w):g.isSpriteMaterial?c(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function s(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,t(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===Fn&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,t(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===Fn&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,t(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,t(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);const x=e.get(g),w=x.envMap,S=x.envMapRotation;w&&(p.envMap.value=w,p.envMapRotation.value.setFromMatrix4(Db.makeRotationFromEuler(S)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(rg),p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,p.aoMapTransform))}function a(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform))}function o(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,x,w){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*x,p.scale.value=w*.5,g.map&&(p.map.value=g.map,t(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function c(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function u(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function d(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function h(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function f(p,g,x){p.ior.value=g.ior,g.diffuseRoughness>0&&(p.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(p.diffuseRoughnessMap.value=g.diffuseRoughnessMap,t(g.diffuseRoughnessMap,p.diffuseRoughnessMapTransform))),g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Fn&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.retroreflectivity>0&&(p.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,p.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function _(p,g){const x=e.get(g).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Ib(r,e,t,n){let i={},s={};function a(x,w){const S=w.program;n.uniformBlockBinding(x,S,i[x.id])}function o(x,w){let S=i[x.id];S===void 0&&(m(x),S=l(x),i[x.id]=S,x.addEventListener("dispose",p));const b=w.program;n.updateUBOMapping(x,b);const T=e.render.frame;s[x.id]!==T&&(c(x),s[x.id]=T)}function l(x){const w=r.createBuffer(),S=x.__size,b=x.usage;return r.bindBuffer(r.UNIFORM_BUFFER,w),r.bufferData(r.UNIFORM_BUFFER,S,b),r.bindBuffer(r.UNIFORM_BUFFER,null),w}function c(x){const w=i[x.id],S=x.uniforms,b=x.__cache;r.bindBuffer(r.UNIFORM_BUFFER,w);for(let T=0,v=S.length;T<v;T++){const M=S[T];if(Array.isArray(M))for(let C=0,A=M.length;C<A;C++)u(M[C],T,C,b);else u(M,T,0,b)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function u(x,w,S,b){if(h(x,w,S,b)===!0){const T=x.__offset,v=x.value;if(Array.isArray(v)){let M=0;for(let C=0;C<v.length;C++){const A=v[C],U=_(A,!0);d(A,x.__data,M),M+=U.storage/Float32Array.BYTES_PER_ELEMENT}}else d(v,x.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,T,x.__data)}}function d(x,w,S){typeof x=="number"||typeof x=="boolean"?w[S]=x:x.isMatrix3?(w[S]=x.elements[0],w[S+1]=x.elements[1],w[S+2]=x.elements[2],w[S+3]=0,w[S+4]=x.elements[3],w[S+5]=x.elements[4],w[S+6]=x.elements[5],w[S+7]=0,w[S+8]=x.elements[6],w[S+9]=x.elements[7],w[S+10]=x.elements[8],w[S+11]=0):ArrayBuffer.isView(x)?w.set(x.subarray(0,w.length-S),S):x.toArray(w,S)}function h(x,w,S,b){const T=x.value,v=w+"_"+S;if(Array.isArray(T)){b[v]===void 0&&(b[v]=[]);const M=b[v];let C=!1;for(let A=0;A<T.length;A++)f(T[A],M,A)===!0&&(C=!0);return C}return f(T,b,v)}function f(x,w,S){if(w[S]===void 0)return typeof x=="number"||typeof x=="boolean"?w[S]=x:ArrayBuffer.isView(x)?w[S]=x.slice():w[S]=x.clone(),!0;{const b=w[S];if(typeof x=="number"||typeof x=="boolean"){if(b!==x)return w[S]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(b.equals(x)===!1)return b.copy(x),!0}}return!1}function m(x){const w=x.uniforms;let S=0;const b=16;for(let v=0,M=w.length;v<M;v++){const C=Array.isArray(w[v])?w[v]:[w[v]];for(let A=0,U=C.length;A<U;A++){const I=C[A],H=Array.isArray(I.value)?I.value:[I.value],D=Array.isArray(w[v])||Array.isArray(I.value);let z=S;for(let F=0,Q=H.length;F<Q;F++){const W=H[F],P=_(W,D),q=S%b,le=q%P.boundary,Ee=q+le;S+=le,Ee!==0&&b-Ee<P.storage&&(S+=b-Ee),F===0&&(z=S),S+=P.storage}const X=I.type==="int"?Int32Array:I.type==="uint"?Uint32Array:Float32Array;I.__data=new X((S-z)/Float32Array.BYTES_PER_ELEMENT),I.__offset=z}}const T=S%b;return T>0&&(S+=b-T),x.__size=S,x.__cache={},this}function _(x,w){const S={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(S.boundary=4,S.storage=4):x.isVector2?(S.boundary=8,S.storage=8):x.isVector3||x.isColor?(S.boundary=16,S.storage=12):x.isVector4?(S.boundary=16,S.storage=16):x.isMatrix3?(S.boundary=16,S.storage=48):x.isMatrix4?(S.boundary=16,S.storage=64):x.isTexture?qe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(S.boundary=16,S.storage=x.byteLength):qe("WebGLRenderer: Unsupported uniform value type.",x),w===!0&&(S.boundary=16,S.storage=Math.ceil(S.storage/16)*16),S}function p(x){const w=x.target;w.removeEventListener("dispose",p),r.deleteBuffer(i[w.id]),delete i[w.id],delete s[w.id]}function g(){for(const x in i)r.deleteBuffer(i[x]);i={},s={}}return{bind:a,update:o,dispose:g}}const Nb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Gi=null;function Ub(){return Gi===null&&(Gi=new U0(Nb,16,16,Ms,ei),Gi.name="DFG_LUT",Gi.minFilter=Kn,Gi.magFilter=Kn,Gi.wrapS=dr,Gi.wrapT=dr,Gi.generateMipmaps=!1,Gi.needsUpdate=!0),Gi}class Fb{constructor(e={}){const{canvas:t=Bv(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:f=wi}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;const _=f,p=new Set([Sf,xf,vf]),g=new Set([wi,tr,Po,ya,mf,gf]),x=new Uint32Array(4),w=new Int32Array(4),S={textures:[],min:[],max:[],resolution:[]};let b=null,T=null;const v=[],M=[];let C=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=_r,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const A=this;let U=!1,I=null,H=null,D=null,z=null;this._outputColorSpace=Dn;let X=0,F=0,Q=null,W=-1,P=null;const q=new Yt,le=new Yt;let Ee=null;const Y=new ke(0);let ae=0,_e=t.width,Me=t.height,ce=1,pe=null,Ye=null;const se=new Yt(0,0,_e,Me),Pe=new Yt(0,0,_e,Me);let Le=!1;const Ie=new dc,ut=new wf;let st=!1,K=!1;const it=new Tt,Ae=new L,De=new Yt,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let $e=!1;function wt(){return Q===null?ce:1}let B=n;function et(E,O){return t.getContext(E,O)}let tt,Xe,ge,ft,Fe,We,R,y,G,oe,ie,ue,me,k,j,fe,N,ee,J,ve,de,xe,he;try{const E={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${af}`),t.addEventListener("webglcontextlost",te,!1),t.addEventListener("webglcontextrestored",ye,!1),t.addEventListener("webglcontextcreationerror",ne,!1),B===null){const O="webgl2";if(B=et(O,E),B===null)throw et(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Se()}catch(E){throw t.removeEventListener("webglcontextlost",te,!1),t.removeEventListener("webglcontextrestored",ye,!1),t.removeEventListener("webglcontextcreationerror",ne,!1),vt("WebGLRenderer: "+E.message),E}function Se(){tt=new zy(B),tt.init(),de=new wb(B,tt),Xe=new Ry(B,tt,e,de),ge=new bb(B,tt),Xe.reversedDepthBuffer&&h&&ge.buffers.depth.setReversed(!0),H=B.createFramebuffer(),D=B.createFramebuffer(),z=B.createFramebuffer(),ft=new Gy(B),Fe=new ub,We=new Tb(B,tt,ge,Fe,Xe,de,ft),R=new By(A),y=new Wx(B),xe=new wy(B,y),G=new ky(B,y,ft,xe),oe=new Wy(B,G,y,xe,ft),ee=new Vy(B,Xe,We),j=new Cy(Fe),ie=new cb(A,R,tt,Xe,xe,j),ue=new Lb(A,Fe),me=new fb,k=new vb(tt),N=new Ty(A,R,ge,oe,m,l),fe=new Eb(A,oe,Xe),he=new Ib(B,ft,Xe,ge),J=new Ay(B,tt,ft),ve=new Hy(B,tt,ft),ft.programs=ie.programs,A.capabilities=Xe,A.extensions=tt,A.properties=Fe,A.renderLists=me,A.shadowMap=fe,A.state=ge,A.info=ft}_!==wi&&(C=new Yy(_,t.width,t.height,o,i,s));const re=new Pb(A,B);this.xr=re,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const E=tt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=tt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return ce},this.setPixelRatio=function(E){E!==void 0&&(ce=E,this.setSize(_e,Me,!1))},this.getSize=function(E){return E.set(_e,Me)},this.setSize=function(E,O,Z=!0){if(re.isPresenting){qe("WebGLRenderer: Can't change size while VR device is presenting.");return}_e=E,Me=O,t.width=Math.floor(E*ce),t.height=Math.floor(O*ce),Z===!0&&(t.style.width=E+"px",t.style.height=O+"px"),C!==null&&C.setSize(t.width,t.height),this.setViewport(0,0,E,O)},this.getDrawingBufferSize=function(E){return E.set(_e*ce,Me*ce).floor()},this.setDrawingBufferSize=function(E,O,Z){_e=E,Me=O,ce=Z,t.width=Math.floor(E*Z),t.height=Math.floor(O*Z),this.setViewport(0,0,E,O)},this.setEffects=function(E){if(_===wi){vt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let O=0;O<E.length;O++)if(E[O].isOutputPass===!0){qe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(q)},this.getViewport=function(E){return E.copy(se)},this.setViewport=function(E,O,Z,V){E.isVector4?se.set(E.x,E.y,E.z,E.w):se.set(E,O,Z,V),ge.viewport(q.copy(se).multiplyScalar(wt()).round())},this.getScissor=function(E){return E.copy(Pe)},this.setScissor=function(E,O,Z,V){E.isVector4?Pe.set(E.x,E.y,E.z,E.w):Pe.set(E,O,Z,V),ge.scissor(le.copy(Pe).multiplyScalar(wt()).round())},this.getScissorTest=function(){return Le},this.setScissorTest=function(E){ge.setScissorTest(Le=E)},this.setOpaqueSort=function(E){pe=E},this.setTransparentSort=function(E){Ye=E},this.getClearColor=function(E){return E.copy(N.getClearColor())},this.setClearColor=function(){N.setClearColor(...arguments)},this.getClearAlpha=function(){return N.getClearAlpha()},this.setClearAlpha=function(){N.setClearAlpha(...arguments)},this.clear=function(E=!0,O=!0,Z=!0){let V=0;if(E){let $=!1;if(Q!==null){const Te=Q.texture.format;$=p.has(Te)}if($){const Te=Q.texture.type,Oe=g.has(Te),be=N.getClearColor(),Ce=N.getClearAlpha(),He=be.r,Qe=be.g,dt=be.b;Oe?(x[0]=He,x[1]=Qe,x[2]=dt,x[3]=Ce,B.clearBufferuiv(B.COLOR,0,x)):(w[0]=He,w[1]=Qe,w[2]=dt,w[3]=Ce,B.clearBufferiv(B.COLOR,0,w))}else V|=B.COLOR_BUFFER_BIT}O&&(V|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Z&&(V|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&B.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),I=E},this.dispose=function(){t.removeEventListener("webglcontextlost",te,!1),t.removeEventListener("webglcontextrestored",ye,!1),t.removeEventListener("webglcontextcreationerror",ne,!1),N.dispose(),me.dispose(),k.dispose(),We.dispose(),Fe.dispose(),R.dispose(),oe.dispose(),G.dispose(),xe.dispose(),he.dispose(),ie.dispose(),re.dispose(),re.removeEventListener("sessionstart",At),re.removeEventListener("sessionend",St),sn.stop()};function te(E){E.preventDefault(),hc("WebGLRenderer: Context Lost."),U=!0}function ye(){hc("WebGLRenderer: Context Restored."),U=!1;const E=ft.autoReset,O=fe.enabled,Z=fe.autoUpdate,V=fe.needsUpdate,$=fe.type;Se(),ft.autoReset=E,fe.enabled=O,fe.autoUpdate=Z,fe.needsUpdate=V,fe.type=$}function ne(E){vt("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Re(E){const O=E.target;O.removeEventListener("dispose",Re),ht(O)}function ht(E){Je(E),Fe.remove(E)}function Je(E){const O=Fe.get(E).programs;O!==void 0&&(O.forEach(function(Z){ie.releaseProgram(Z)}),E.isShaderMaterial&&ie.releaseShaderCache(E))}this.renderBufferDirect=function(E,O,Z,V,$,Te){O===null&&(O=Ne);const Oe=$.isMesh&&$.matrixWorld.determinantAffine()<0,be=Mi(E,O,Z,V,$);ge.setMaterial(V,Oe);let Ce=Z.index,He=1;if(V.wireframe===!0){if(Ce=G.getWireframeAttribute(Z),Ce===void 0)return;He=2}const Qe=Z.drawRange,dt=Z.attributes.position;let Be=Qe.start*He,pt=(Qe.start+Qe.count)*He;Te!==null&&(Be=Math.max(Be,Te.start*He),pt=Math.min(pt,(Te.start+Te.count)*He)),Ce!==null?(Be=Math.max(Be,0),pt=Math.min(pt,Ce.count)):dt!=null&&(Be=Math.max(Be,0),pt=Math.min(pt,dt.count));const jt=pt-Be;if(jt<0||jt===1/0)return;xe.setup($,V,be,Z,Ce);let Lt,Ct=J;if(Ce!==null&&(Lt=y.get(Ce),Ct=ve,Ct.setIndex(Lt)),$.isMesh)V.wireframe===!0?(ge.setLineWidth(V.wireframeLinewidth*wt()),Ct.setMode(B.LINES)):Ct.setMode(B.TRIANGLES);else if($.isLine){let Tn=V.linewidth;Tn===void 0&&(Tn=1),ge.setLineWidth(Tn*wt()),$.isLineSegments?Ct.setMode(B.LINES):$.isLineLoop?Ct.setMode(B.LINE_LOOP):Ct.setMode(B.LINE_STRIP)}else $.isPoints?Ct.setMode(B.POINTS):$.isSprite&&Ct.setMode(B.TRIANGLES);if($.isBatchedMesh)if(tt.get("WEBGL_multi_draw"))Ct.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const Tn=$._multiDrawStarts,ze=$._multiDrawCounts,Bn=$._multiDrawCount,xt=Ce?y.get(Ce).bytesPerElement:1,Zr=Fe.get(V).currentProgram.getUniforms();for(let wn=0;wn<Bn;wn++)Zr.setValue(B,"_gl_DrawID",wn),Ct.render(Tn[wn]/xt,ze[wn])}else if($.isInstancedMesh)Ct.renderInstances(Be,jt,$.count);else if(Z.isInstancedBufferGeometry){const Tn=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,ze=Math.min(Z.instanceCount,Tn);Ct.renderInstances(Be,jt,ze)}else Ct.render(Be,jt)};function Ft(E,O,Z,V){I!==null&&E.isNodeMaterial&&I.setObject(V,E),st===!0&&j.setState(E,Z,!1),E.transparent===!0&&E.side===mi&&E.forceSinglePass===!1?(E.side=Fn,E.needsUpdate=!0,ai(E,O,V),E.side=Ss,E.needsUpdate=!0,ai(E,O,V),E.side=mi):ai(E,O,V)}this.compile=function(E,O,Z=null){Z===null&&(Z=E),I!==null&&I.renderStart(E,O,Z),T=k.get(Z),T.init(O),M.push(T),Z.traverseVisible(function($){$.isLight&&$.layers.test(O.layers)&&(T.pushLight($),$.castShadow&&T.pushShadow($))}),E!==Z&&E.traverseVisible(function($){$.isLight&&$.layers.test(O.layers)&&(T.pushLight($),$.castShadow&&T.pushShadow($))}),T.setupLights(),I!==null&&I.updateLights(T.state.lightsArray),K=this.localClippingEnabled,st=j.init(this.clippingPlanes,K),st===!0&&j.setGlobalState(this.clippingPlanes,O),I!==null&&fe.render(T.state.shadowsArray,Z,O);const V=new Set;return E.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const Te=$.material;if(Te)if(Array.isArray(Te))for(let Oe=0;Oe<Te.length;Oe++){const be=Te[Oe];Ft(be,Z,O,$),V.add(be)}else Ft(Te,Z,O,$),V.add(Te)}),T=M.pop(),I!==null&&I.renderEnd(),V},this.compileAsync=function(E,O,Z=null){const V=this.compile(E,O,Z);return new Promise($=>{function Te(){if(V.forEach(function(Oe){const Ce=Fe.get(Oe).currentProgram;(Ce===void 0||Ce.isReady())&&V.delete(Oe)}),V.size===0){$(E);return}setTimeout(Te,10)}tt.get("KHR_parallel_shader_compile")!==null?Te():setTimeout(Te,10)})};let Jt=null;function Ot(E){Jt&&Jt(E)}function At(){sn.stop()}function St(){sn.start()}const sn=new $0;sn.setAnimationLoop(Ot),typeof self<"u"&&sn.setContext(self),this.setAnimationLoop=function(E){Jt=E,re.setAnimationLoop(E),E===null?sn.stop():sn.start()},re.addEventListener("sessionstart",At),re.addEventListener("sessionend",St),this.render=function(E,O){if(O!==void 0&&O.isCamera!==!0){vt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;I!==null&&I.renderStart(E,O);const Z=re.enabled===!0&&re.isPresenting===!0,V=C!==null&&(Q===null||Z)&&C.begin(A,Q);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),re.enabled===!0&&re.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(re.cameraAutoUpdate===!0&&re.updateCamera(O),O=re.getCamera()),E.isScene===!0&&E.onBeforeRender(A,E,O,Q),T=k.get(E,M.length),T.init(O),T.state.textureUnits=We.getTextureUnits(),M.push(T),it.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),O.isArrayCamera?ut.setFromArrayCamera(O):Ie.setFromProjectionMatrix(it,zi,O.reversedDepth),K=this.localClippingEnabled,st=j.init(this.clippingPlanes,K),b=me.get(E,v.length),b.init(),v.push(b),this.info.render.frame++,re.enabled===!0&&re.isPresenting===!0){const Oe=A.xr.getDepthSensingMesh();Oe!==null&&Rt(Oe,O,-1/0,A.sortObjects)}Rt(E,O,0,A.sortObjects),b.finish(),I!==null&&I.updateLights(T.state.lightsArray),A.sortObjects===!0&&b.sort(pe,Ye),$e=re.enabled===!1||re.isPresenting===!1||re.hasDepthSensing()===!1,$e&&N.addToRenderList(b,E),this.info.autoReset===!0&&this.info.reset(),st===!0&&j.beginShadows();const $=T.state.shadowsArray;if(fe.render($,E,O),st===!0&&j.endShadows(),(V&&C.hasRenderPass())===!1){const Oe=b.opaque,be=b.transmissive;if(T.setupLights(),O.isArrayCamera){const Ce=O.cameras;if(be.length>0)for(let He=0,Qe=Ce.length;He<Qe;He++){const dt=Ce[He];si(Oe,be,E,dt)}$e&&N.render(E);for(let He=0,Qe=Ce.length;He<Qe;He++){const dt=Ce[He];bn(b,E,dt,dt.viewport)}}else be.length>0&&si(Oe,be,E,O),$e&&N.render(E),bn(b,E,O)}Q!==null&&F===0&&(We.updateMultisampleRenderTarget(Q),We.updateRenderTargetMipmap(Q)),V&&C.end(A),E.isScene===!0&&E.onAfterRender(A,E,O),xe.resetDefaultState(),W=-1,P=null,M.pop(),M.length>0?(T=M[M.length-1],We.setTextureUnits(T.state.textureUnits),st===!0&&j.setGlobalState(A.clippingPlanes,T.state.camera)):T=null,v.pop(),v.length>0?b=v[v.length-1]:b=null,I!==null&&I.renderEnd()};function Rt(E,O,Z,V){if(E.visible===!1)return;if(E.layers.test(O.layers)){if(E.isGroup)Z=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(O);else if(E.isLight)T.pushLight(E),E.castShadow&&T.pushShadow(E);else if(E.isSprite){const Oe=O.isArrayCamera?ut:Ie;if(!E.frustumCulled||E.intersectsFrustum(Oe)){V&&De.setFromMatrixPosition(E.matrixWorld).applyMatrix4(it);const be=oe.update(E),Ce=E.material;Ce.visible&&b.push(E,be,Ce,Z,De.z,null,O)}}else if(E.isMesh||E.isLine||E.isPoints){const Oe=O.isArrayCamera?ut:Ie;if(!E.frustumCulled||E.intersectsFrustum(Oe)){const be=oe.update(E),Ce=E.material;if(V&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),De.copy(E.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),De.copy(be.boundingSphere.center)),De.applyMatrix4(E.matrixWorld).applyMatrix4(it)),Array.isArray(Ce)){const He=be.groups;for(let Qe=0,dt=He.length;Qe<dt;Qe++){const Be=He[Qe],pt=Ce[Be.materialIndex];pt&&pt.visible&&b.push(E,be,pt,Z,De.z,Be,O)}}else Ce.visible&&b.push(E,be,Ce,Z,De.z,null,O)}}}const Te=E.children;for(let Oe=0,be=Te.length;Oe<be;Oe++)Rt(Te[Oe],O,Z,V)}function bn(E,O,Z,V){const{opaque:$,transmissive:Te,transparent:Oe}=E;T.setupLightsView(Z),st===!0&&j.setGlobalState(A.clippingPlanes,Z),V&&ge.viewport(q.copy(V)),$.length>0&&Vt($,O,Z),Te.length>0&&Vt(Te,O,Z),Oe.length>0&&Vt(Oe,O,Z),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function si(E,O,Z,V){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[V.id]===void 0){const Be=tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[V.id]=new ti(1,1,{generateMipmaps:!0,type:Be?ei:wi,minFilter:Or,samples:Math.max(4,Xe.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:mt.workingColorSpace})}const Te=T.state.transmissionRenderTarget[V.id],Oe=V.viewport||q;Te.setSize(Oe.z*A.transmissionResolutionScale,Oe.w*A.transmissionResolutionScale);const be=A.getRenderTarget(),Ce=A.getActiveCubeFace(),He=A.getActiveMipmapLevel();A.setRenderTarget(Te),A.getClearColor(Y),ae=A.getClearAlpha(),ae<1&&A.setClearColor(16777215,.5),A.clear(),$e&&N.render(Z);const Qe=A.toneMapping;A.toneMapping=_r;const dt=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),T.setupLightsView(V),st===!0&&j.setGlobalState(A.clippingPlanes,V),Vt(E,Z,V),We.updateMultisampleRenderTarget(Te),We.updateRenderTargetMipmap(Te),tt.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let pt=0,jt=O.length;pt<jt;pt++){const Lt=O[pt],{object:Ct,geometry:Tn,material:ze,group:Bn}=Lt;if(ze.side===mi&&Ct.layers.test(V.layers)){const xt=ze.side;ze.side=Fn,ze.needsUpdate=!0,Qt(Ct,Z,V,Tn,ze,Bn),ze.side=xt,ze.needsUpdate=!0,Be=!0}}Be===!0&&(We.updateMultisampleRenderTarget(Te),We.updateRenderTargetMipmap(Te))}A.setRenderTarget(be,Ce,He),A.setClearColor(Y,ae),dt!==void 0&&(V.viewport=dt),A.toneMapping=Qe}function Vt(E,O,Z){const V=O.isScene===!0?O.overrideMaterial:null;for(let $=0,Te=E.length;$<Te;$++){const Oe=E[$],{object:be,geometry:Ce,group:He}=Oe;let Qe=Oe.material;Qe.allowOverride===!0&&V!==null&&(Qe=V),be.layers.test(Z.layers)&&Qt(be,O,Z,Ce,Qe,He)}}function Qt(E,O,Z,V,$,Te){I!==null&&$.isNodeMaterial&&I.setObject(E,$),E.onBeforeRender(A,O,Z,V,$,Te),E.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),$.onBeforeRender(A,O,Z,V,E,Te),$.transparent===!0&&$.side===mi&&$.forceSinglePass===!1?($.side=Fn,$.needsUpdate=!0,A.renderBufferDirect(Z,O,V,$,E,Te),$.side=Ss,$.needsUpdate=!0,A.renderBufferDirect(Z,O,V,$,E,Te),$.side=mi):A.renderBufferDirect(Z,O,V,$,E,Te),E.onAfterRender(A,O,Z,V,$,Te)}function an(E){let O=0;for(const Z of E)Z.texture!==null&&O++;return O}function ai(E,O,Z){O.isScene!==!0&&(O=Ne);const V=Fe.get(E),$=T.state.lights,Te=T.state.shadowsArray,Oe=$.state.version,be=ie.getParameters(E,$.state,Te,O,Z,T.state.lightProbeGridArray),Ce=ie.getProgramCacheKey(be);let He=V.programs;V.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?O.environment:null,V.fog=O.fog;const Qe=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;V.envMap=R.get(E.envMap||V.environment,Qe),V.envMapRotation=V.environment!==null&&E.envMap===null?O.environmentRotation:E.envMapRotation,He===void 0&&(E.addEventListener("dispose",Re),He=new Map,V.programs=He,V.programVariants=new Map);let dt=He.get(Ce);if(dt!==void 0){if(V.currentProgram===dt&&V.lightsStateVersion===Oe)return Wt(E,be),dt}else be.uniforms=ie.getUniforms(E),I!==null&&E.isNodeMaterial&&I.build(E,Z,be),E.onBeforeCompile(be,A),dt=ie.acquireProgram(be,Ce),He.set(Ce,dt),V.uniforms=be.uniforms;const Be=V.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Be.clippingPlanes=j.uniform),Wt(E,be),V.needsLights=Oo(E),V.lightsStateVersion=Oe,V.needsLights&&(Be.ambientLightColor.value=$.state.ambient,Be.lightProbe.value=$.state.probe,Be.sunLights.value=$.state.sun,Be.sunLightShadows.value=$.state.sunShadow,Be.directionalLights.value=$.state.directional,Be.directionalLightShadows.value=$.state.directionalShadow,Be.spotLights.value=$.state.spot,Be.spotLightShadows.value=$.state.spotShadow,Be.rectAreaLights.value=$.state.rectArea,Be.ltc_1.value=$.state.rectAreaLTC1,Be.ltc_2.value=$.state.rectAreaLTC2,Be.pointLights.value=$.state.point,Be.pointLightShadows.value=$.state.pointShadow,Be.hemisphereLights.value=$.state.hemi,Be.sunShadowMatrix.value=$.state.sunShadowMatrix,Be.sunShadowCascade.value=$.state.sunShadowCascade,Be.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Be.spotLightMatrix.value=$.state.spotLightMatrix,Be.spotLightMap.value=$.state.spotLightMap,Be.pointShadowMatrix.value=$.state.pointShadowMatrix),V.numLightProbeGrids=an(T.state.lightProbeGridArray),V.currentProgram=dt,V.uniformsList=null,dt}function Ps(E,O,Z,V,$){const Te=Fe.get(E),Oe=Te.currentProgram.id+","+V+","+$;let be=Te.programVariants.get(Oe);return be===void 0?(be=ai(E,O,Z),Te.programVariants.set(Oe,be)):(Te.currentProgram=be,Te.uniformsList=null,Te.outputColorSpace=V,Te.toneMapping=$),be}function on(E){if(E.uniformsList===null){const O=E.currentProgram.getUniforms();E.uniformsList=Yl.seqWithValue(O.seq,E.uniforms)}return E.uniformsList}function Wt(E,O){const Z=Fe.get(E);Z.outputColorSpace=O.outputColorSpace,Z.batching=O.batching,Z.batchingColor=O.batchingColor,Z.instancing=O.instancing,Z.instancingColor=O.instancingColor,Z.instancingMorph=O.instancingMorph,Z.skinning=O.skinning,Z.morphTargets=O.morphTargets,Z.morphNormals=O.morphNormals,Z.morphColors=O.morphColors,Z.morphTargetsCount=O.morphTargetsCount,Z.numClippingPlanes=O.numClippingPlanes,Z.numIntersection=O.numClipIntersection,Z.vertexAlphas=O.vertexAlphas,Z.vertexTangents=O.vertexTangents,Z.toneMapping=O.toneMapping}function Mi(E,O,Z,V,$){O.isScene!==!0&&(O=Ne),We.resetTextureUnits();const Te=O.fog,Oe=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?O.environment:null,be=Q===null?A.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:mt.workingColorSpace,Ce=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,He=R.get(V.envMap||Oe,Ce),Qe=V.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,dt=!!Z.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Be=!!Z.morphAttributes.position,pt=!!Z.morphAttributes.normal,jt=!!Z.morphAttributes.color;let Lt=_r;V.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Lt=A.toneMapping);const Ct=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Tn=Ct!==void 0?Ct.length:0,ze=Fe.get(V),Bn=T.state.lights;if(st===!0&&(K===!0||E!==P)){const zt=E===P&&V.id===W;j.setState(V,E,zt)}let xt=!1,Zr=!1;V.version===ze.__version?ze.needsLights&&ze.lightsStateVersion!==Bn.state.version||$.isBatchedMesh&&ze.batching===!1||!$.isBatchedMesh&&ze.batching===!0||$.isBatchedMesh&&ze.batchingColor===!0&&$._colorsTexture===null||$.isBatchedMesh&&ze.batchingColor===!1&&$._colorsTexture!==null||$.isInstancedMesh&&ze.instancing===!1||!$.isInstancedMesh&&ze.instancing===!0||$.isSkinnedMesh&&ze.skinning===!1||!$.isSkinnedMesh&&ze.skinning===!0||$.isInstancedMesh&&ze.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&ze.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&ze.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&ze.instancingMorph===!1&&$.morphTexture!==null||ze.envMap!==He||V.fog===!0&&ze.fog!==Te||ze.numClippingPlanes!==void 0&&(ze.numClippingPlanes!==j.numPlanes||ze.numIntersection!==j.numIntersection)||ze.vertexAlphas!==Qe||ze.vertexTangents!==dt||ze.morphTargets!==Be||ze.morphNormals!==pt||ze.morphColors!==jt||ze.morphTargetsCount!==Tn||ze.numLightProbeGrids!==an(T.state.lightProbeGridArray)?xt=!0:(ze.outputColorSpace!==be||ze.toneMapping!==Lt)&&(Zr=!0):(xt=!0,ze.__version=V.version);let wn=ze.currentProgram;(xt===!0||Zr===!0)&&(wn=Zr===!0?Ps(V,O,$,be,Lt):ai(V,O,$),I&&V.isNodeMaterial&&I.onUpdateProgram(V,wn,ze));let Bo=!1,yr=!1,Jr=!1;const _t=wn.getUniforms(),xn=ze.uniforms;if(ge.useProgram(wn.program)&&(Bo=!0,yr=!0,Jr=!0),V.id!==W&&(W=V.id,yr=!0),Bo||P!==E){ge.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),_t.setValue(B,"projectionMatrix",E.projectionMatrix),_t.setValue(B,"viewMatrix",E.matrixWorldInverse);const dn=_t.map.cameraPosition;dn!==void 0&&dn.setValue(B,Ae.setFromMatrixPosition(E.matrixWorld)),Xe.logarithmicDepthBuffer&&_t.setValue(B,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&_t.setValue(B,"isOrthographic",E.isOrthographicCamera===!0),P!==E&&(P=E,yr=!0,Jr=!0)}if(ze.needsLights&&(Bn.state.sunShadowMap.length>0&&_t.setValue(B,"sunShadowMap",Bn.state.sunShadowMap,We),Bn.state.directionalShadowMap.length>0&&_t.setValue(B,"directionalShadowMap",Bn.state.directionalShadowMap,We),Bn.state.spotShadowMap.length>0&&_t.setValue(B,"spotShadowMap",Bn.state.spotShadowMap,We),Bn.state.pointShadowMap.length>0&&_t.setValue(B,"pointShadowMap",Bn.state.pointShadowMap,We)),$.isSkinnedMesh){_t.setOptional(B,$,"bindMatrix"),_t.setOptional(B,$,"bindMatrixInverse");const zt=$.skeleton;zt&&(zt.boneTexture===null&&zt.computeBoneTexture(),_t.setValue(B,"boneTexture",zt.boneTexture,We))}$.isBatchedMesh&&(_t.setOptional(B,$,"batchingTexture"),_t.setValue(B,"batchingTexture",$._matricesTexture,We),_t.setOptional(B,$,"batchingIdTexture"),_t.setValue(B,"batchingIdTexture",$._indirectTexture,We),_t.setOptional(B,$,"batchingColorTexture"),$._colorsTexture!==null&&_t.setValue(B,"batchingColorTexture",$._colorsTexture,We));const Di=Z.morphAttributes;if((Di.position!==void 0||Di.normal!==void 0||Di.color!==void 0)&&ee.update($,Z,wn),(yr||ze.receiveShadow!==$.receiveShadow)&&(ze.receiveShadow=$.receiveShadow,_t.setValue(B,"receiveShadow",$.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&O.environment!==null&&(xn.envMapIntensity.value=O.environmentIntensity),xn.dfgLUT!==void 0&&(xn.dfgLUT.value=Ub()),yr){if(_t.setValue(B,"toneMappingExposure",A.toneMappingExposure),ze.needsLights&&Ra(xn,Jr),Te&&V.fog===!0&&ue.refreshFogUniforms(xn,Te),ue.refreshMaterialUniforms(xn,V,ce,Me,T.state.transmissionRenderTarget[E.id]),ze.needsLights&&ze.numLightProbeGrids>0){const zt=S;let dn=0;for(const nr of T.state.lightProbeGridArray)nr.texture!==null&&(zt.textures[dn]=nr.texture,zt.min[dn]=nr.boundingBox.min,zt.max[dn]=nr.boundingBox.max,zt.resolution[dn]=nr.resolution,dn++);for(const nr in zt)zt[nr].length=dn;xn.probesSH.value=zt.textures,xn.probesMin.value=zt.min,xn.probesMax.value=zt.max,xn.probesResolution.value=zt.resolution}Yl.upload(B,on(ze),xn,We)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Yl.upload(B,on(ze),xn,We),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&_t.setValue(B,"center",$.center),_t.setValue(B,"modelViewMatrix",$.modelViewMatrix),_t.setValue(B,"normalMatrix",$.normalMatrix),_t.setValue(B,"modelMatrix",$.matrixWorld),V.uniformsGroups!==void 0){const zt=V.uniformsGroups;for(let dn=0,nr=zt.length;dn<nr;dn++){const Hf=zt[dn];he.update(Hf,wn),he.bind(Hf,wn)}}return wn}function Ra(E,O){E.ambientLightColor.needsUpdate=O,E.lightProbe.needsUpdate=O,E.sunLights.needsUpdate=O,E.sunLightShadows.needsUpdate=O,E.directionalLights.needsUpdate=O,E.directionalLightShadows.needsUpdate=O,E.pointLights.needsUpdate=O,E.pointLightShadows.needsUpdate=O,E.spotLights.needsUpdate=O,E.spotLightShadows.needsUpdate=O,E.rectAreaLights.needsUpdate=O,E.hemisphereLights.needsUpdate=O}function Oo(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return Q},this.setRenderTargetTextures=function(E,O,Z){const V=Fe.get(E);V.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),Fe.get(E.texture).__webglTexture=O,Fe.get(E.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:Z,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,O){const Z=Fe.get(E);Z.__webglFramebuffer=O,Z.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(E,O=0,Z=0){Q=E,X=O,F=Z;let V=null,$=!1,Te=!1;if(E){const be=Fe.get(E);if(be.__useDefaultFramebuffer!==void 0){ge.bindFramebuffer(B.FRAMEBUFFER,be.__webglFramebuffer),q.copy(E.viewport),le.copy(E.scissor),Ee=E.scissorTest,ge.viewport(q),ge.scissor(le),ge.setScissorTest(Ee),W=-1;return}else if(be.__webglFramebuffer===void 0)We.setupRenderTarget(E);else if(be.__hasExternalTextures)We.rebindTextures(E,Fe.get(E.texture).__webglTexture,Fe.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Qe=E.depthTexture;if(be.__boundDepthTexture!==Qe){if(Qe!==null&&Fe.has(Qe)&&(E.width!==Qe.image.width||E.height!==Qe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");We.setupDepthRenderbuffer(E)}}const Ce=E.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(Te=!0);const He=Fe.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(He[O])?V=He[O][Z]:V=He[O],$=!0):E.samples>0&&We.useMultisampledRTT(E)===!1?V=Fe.get(E).__webglMultisampledFramebuffer:Array.isArray(He)?V=He[Z]:V=He,q.copy(E.viewport),le.copy(E.scissor),Ee=E.scissorTest}else q.copy(se).multiplyScalar(ce).floor(),le.copy(Pe).multiplyScalar(ce).floor(),Ee=Le;if(Z!==0&&(V=H),ge.bindFramebuffer(B.FRAMEBUFFER,V)&&ge.drawBuffers(E,V),ge.viewport(q),ge.scissor(le),ge.setScissorTest(Ee),$){const be=Fe.get(E.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+O,be.__webglTexture,Z)}else if(Te){const be=O;for(let Ce=0;Ce<E.textures.length;Ce++){const He=Fe.get(E.textures[Ce]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+Ce,He.__webglTexture,Z,be)}}else if(E!==null&&Z!==0){const be=Fe.get(E.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,be.__webglTexture,Z)}W=-1};function Mr(E){const O=Fe.get(E);return(O.__readFormat!==E.format||O.__readType!==E.type)&&(O.__readFormat=E.format,O.__readType=E.type,O.__formatReadable=Xe.textureFormatReadable(E.format),O.__typeReadable=Xe.textureTypeReadable(E.type)),O}this.readRenderTargetPixels=function(E,O,Z,V,$,Te,Oe,be=0){if(!(E&&E.isWebGLRenderTarget)){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=Fe.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Oe!==void 0&&(Ce=Ce[Oe],Array.isArray(Ce)&&(Ce=Ce[0])),Ce){ge.bindFramebuffer(B.FRAMEBUFFER,Ce);try{const He=E.textures[be],Qe=He.format,dt=He.type;E.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+be);const Be=Mr(He);if(Be.__formatReadable===!1){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Be.__typeReadable===!1){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=E.width-V&&Z>=0&&Z<=E.height-$&&B.readPixels(O,Z,V,$,de.convert(Qe),de.convert(dt),Te)}finally{const He=Q!==null?Fe.get(Q).__webglFramebuffer:null;ge.bindFramebuffer(B.FRAMEBUFFER,He)}}},this.readRenderTargetPixelsAsync=async function(E,O,Z,V,$,Te,Oe,be=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=Fe.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Oe!==void 0&&(Ce=Ce[Oe],Array.isArray(Ce)&&(Ce=Ce[0])),Ce)if(O>=0&&O<=E.width-V&&Z>=0&&Z<=E.height-$){ge.bindFramebuffer(B.FRAMEBUFFER,Ce);const He=E.textures[be],Qe=He.format,dt=He.type;E.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+be);const Be=Mr(He);if(Be.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Be.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const pt=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,pt),B.bufferData(B.PIXEL_PACK_BUFFER,Te.byteLength,B.STREAM_READ),B.readPixels(O,Z,V,$,de.convert(Qe),de.convert(dt),0),B.bindBuffer(B.PIXEL_PACK_BUFFER,null);const jt=Q!==null?Fe.get(Q).__webglFramebuffer:null;ge.bindFramebuffer(B.FRAMEBUFFER,jt);const Lt=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await zv(B,Lt,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,pt),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,Te),B.bindBuffer(B.PIXEL_PACK_BUFFER,null),B.deleteBuffer(pt),B.deleteSync(Lt),Te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,O=null,Z=0){const V=Math.pow(2,-Z),$=Math.floor(E.image.width*V),Te=Math.floor(E.image.height*V),Oe=O!==null?O.x:0,be=O!==null?O.y:0;We.setTexture2D(E,0),B.copyTexSubImage2D(B.TEXTURE_2D,Z,0,0,Oe,be,$,Te),ge.unbindTexture()},this.copyTextureToTexture=function(E,O,Z=null,V=null,$=0,Te=0){let Oe,be,Ce,He,Qe,dt,Be,pt,jt;const Lt=E.isCompressedTexture?E.mipmaps[Te]:E.image;if(Z!==null)Oe=Z.max.x-Z.min.x,be=Z.max.y-Z.min.y,Ce=Z.isBox3?Z.max.z-Z.min.z:1,He=Z.min.x,Qe=Z.min.y,dt=Z.isBox3?Z.min.z:0;else{const _t=Math.pow(2,-$);Oe=Math.floor(Lt.width*_t),be=Math.floor(Lt.height*_t),E.isDataArrayTexture?Ce=Lt.depth:E.isData3DTexture?Ce=Math.floor(Lt.depth*_t):Ce=1,He=0,Qe=0,dt=0}V!==null?(Be=V.x,pt=V.y,jt=V.z):(Be=0,pt=0,jt=0);const Ct=de.convert(O.format),Tn=de.convert(O.type);let ze;O.isData3DTexture?(We.setTexture3D(O,0),ze=B.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(We.setTexture2DArray(O,0),ze=B.TEXTURE_2D_ARRAY):(We.setTexture2D(O,0),ze=B.TEXTURE_2D),ge.activeTexture(B.TEXTURE0),ge.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,O.flipY),ge.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),ge.pixelStorei(B.UNPACK_ALIGNMENT,O.unpackAlignment);const Bn=ge.getParameter(B.UNPACK_ROW_LENGTH),xt=ge.getParameter(B.UNPACK_IMAGE_HEIGHT),Zr=ge.getParameter(B.UNPACK_SKIP_PIXELS),wn=ge.getParameter(B.UNPACK_SKIP_ROWS),Bo=ge.getParameter(B.UNPACK_SKIP_IMAGES);ge.pixelStorei(B.UNPACK_ROW_LENGTH,Lt.width),ge.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Lt.height),ge.pixelStorei(B.UNPACK_SKIP_PIXELS,He),ge.pixelStorei(B.UNPACK_SKIP_ROWS,Qe),ge.pixelStorei(B.UNPACK_SKIP_IMAGES,dt);const yr=E.isDataArrayTexture||E.isData3DTexture,Jr=O.isDataArrayTexture||O.isData3DTexture;if(E.isDepthTexture){const _t=Fe.get(E),xn=Fe.get(O),Di=Fe.get(_t.__renderTarget),zt=Fe.get(xn.__renderTarget);ge.bindFramebuffer(B.READ_FRAMEBUFFER,Di.__webglFramebuffer),ge.bindFramebuffer(B.DRAW_FRAMEBUFFER,zt.__webglFramebuffer);for(let dn=0;dn<Ce;dn++)yr&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Fe.get(E).__webglTexture,$,dt+dn),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Fe.get(O).__webglTexture,Te,jt+dn)),B.blitFramebuffer(He,Qe,He+Oe,Qe+be,Be,pt,Be+Oe,pt+be,B.DEPTH_BUFFER_BIT,B.NEAREST);ge.bindFramebuffer(B.READ_FRAMEBUFFER,null),ge.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if($!==0||E.isRenderTargetTexture||Fe.has(E)){const _t=Fe.get(E),xn=Fe.get(O);ge.bindFramebuffer(B.READ_FRAMEBUFFER,D),ge.bindFramebuffer(B.DRAW_FRAMEBUFFER,z);for(let Di=0;Di<Ce;Di++)yr?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,_t.__webglTexture,$,dt+Di):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,_t.__webglTexture,$),Jr?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,xn.__webglTexture,Te,jt+Di):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,xn.__webglTexture,Te),$!==0?B.blitFramebuffer(He,Qe,He+Oe,Qe+be,Be,pt,Be+Oe,pt+be,B.COLOR_BUFFER_BIT,B.NEAREST):Jr?B.copyTexSubImage3D(ze,Te,Be,pt,jt+Di,He,Qe,Oe,be):B.copyTexSubImage2D(ze,Te,Be,pt,He,Qe,Oe,be);ge.bindFramebuffer(B.READ_FRAMEBUFFER,null),ge.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else Jr?E.isDataTexture||E.isData3DTexture?B.texSubImage3D(ze,Te,Be,pt,jt,Oe,be,Ce,Ct,Tn,Lt.data):O.isCompressedArrayTexture?B.compressedTexSubImage3D(ze,Te,Be,pt,jt,Oe,be,Ce,Ct,Lt.data):B.texSubImage3D(ze,Te,Be,pt,jt,Oe,be,Ce,Ct,Tn,Lt):E.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,Te,Be,pt,Oe,be,Ct,Tn,Lt.data):E.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,Te,Be,pt,Lt.width,Lt.height,Ct,Lt.data):B.texSubImage2D(B.TEXTURE_2D,Te,Be,pt,Oe,be,Ct,Tn,Lt);ge.pixelStorei(B.UNPACK_ROW_LENGTH,Bn),ge.pixelStorei(B.UNPACK_IMAGE_HEIGHT,xt),ge.pixelStorei(B.UNPACK_SKIP_PIXELS,Zr),ge.pixelStorei(B.UNPACK_SKIP_ROWS,wn),ge.pixelStorei(B.UNPACK_SKIP_IMAGES,Bo),Te===0&&O.generateMipmaps===!0&&O.mipmapsAutoUpdate===!0&&B.generateMipmap(ze),ge.unbindTexture()},this.initRenderTarget=function(E){Fe.get(E).__webglFramebuffer===void 0&&We.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?We.setTextureCube(E,0):E.isData3DTexture?We.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?We.setTexture2DArray(E,0):We.setTexture2D(E,0),ge.unbindTexture()},this.resetState=function(){X=0,F=0,Q=null,ge.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=mt._getDrawingBufferColorSpace(e),t.unpackColorSpace=mt._getUnpackColorSpace()}}const ql={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Aa{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Ob=new Y0(-1,1,1,-1,0,1);class Bb extends un{constructor(){super(),this.setAttribute("position",new Ut([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ut([0,2,0,0,2,0],2))}}const zb=new Bb;class Nf{constructor(e){this._mesh=new lt(zb,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Ob)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class kb extends Aa{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Nt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Io.clone(e.uniforms),this.material=new Nt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Nf(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Up extends Aa{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class Hb extends Aa{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Gb{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new Ve);this._width=n.width,this._height=n.height,t=new ti(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ei}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new kb(ql),this.copyPass.material.blending=gs,this.timer=new q0}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,s=this.passes.length;i<s;i++){const a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Up!==void 0&&(a instanceof Up?n=!0:a instanceof Hb&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Ve);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Vb extends Aa{constructor(e,t,n=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new ke}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=i}}const Wb={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ke(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Ta extends Aa{constructor(e,t=1,n,i){super(),this.strength=t,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new Ve(e.x,e.y):new Ve(256,256),this.clearColor=new ke(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new ti(s,a,{type:ei,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const d=new ti(s,a,{type:ei,depthBuffer:!1});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const h=new ti(s,a,{type:ei,depthBuffer:!1});h.texture.name="UnrealBloomPass.v"+u,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),s=Math.round(s/2),a=Math.round(a/2)}const o=Wb;this.highPassUniforms=Io.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Nt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new Ve(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Io.clone(ql.uniforms),this.blendMaterial=new Nt({uniforms:this.copyUniforms,vertexShader:ql.vertexShader,fragmentShader:ql.fragmentShader,premultipliedAlpha:!0,blending:Oi,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new ke,this._oldClearAlpha=1,this._basic=new nn,this._fsQuad=new Nf(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new Ve(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=Ta.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Ta.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){const t=[],n=e/3;for(let a=0;a<e;a++)t.push(.39894*Math.exp(-.5*a*a/(n*n))/n);const i=[],s=[];for(let a=1;a<e;a+=2){const o=t[a],l=a+1<e?t[a+1]:0,c=o+l;i.push((a*o+(a+1)*l)/c),s.push(c)}return new Nt({defines:{KERNEL_PAIRS:i.length},uniforms:{colorTexture:{value:null},invSize:{value:new Ve(.5,.5)},direction:{value:new Ve(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:i},gaussianWeights:{value:s}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new Nt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}Ta.BlurDirectionX=new Ve(1,0);Ta.BlurDirectionY=new Ve(0,1);const Rl={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Xb extends Aa{constructor(){super(),this.isOutputPass=!0,this.uniforms=Io.clone(Rl.uniforms),this.material=new V0({name:Rl.name,uniforms:this.uniforms,vertexShader:Rl.vertexShader,fragmentShader:Rl.fragmentShader}),this._fsQuad=new Nf(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},mt.getTransfer(this._outputColorSpace)===yt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===of?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===lf?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===cf?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===uf?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ff?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===df?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===hf&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const $t={pos:new L(0,0,16),size:new L(4.2,7.5,3),windowY:2.4};$t.front=$t.pos.z-$t.size.z/2;const Lh={x:1.95,z0:$t.front+.05,z1:$t.pos.z+$t.size.z/2-.15,y0:1.75,y1:3.15,win:{w:1.6,h:1}},Xt=r=>{const e=Math.sin(r*127.1)*43758.5453;return e-Math.floor(e)};function Yb({horizon:r,cobalt:e,cyan:t,amber:n,bg:i}){const s=new ki,a={value:0},o=new lt(new gc(420,96),new Nt({uniforms:{uHorizon:{value:r},uAmber:{value:n},uCobalt:{value:e},uBg:{value:i}},vertexShader:`
        varying vec3 vW;
        void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,fragmentShader:`
        uniform vec3 uHorizon, uAmber, uCobalt, uBg;
        varying vec3 vW;
        float line(float x, float w){ float f = abs(fract(x) - 0.5); return smoothstep(0.5 - w, 0.5, f); }
        void main(){
          vec2 p = vW.xz;
          float d = length(p - cameraPosition.xz);
          float aa = clamp(d / 60.0, 0.0, 1.0);
          float streets = max(line(p.x / 2.6, 0.06 + aa * 0.05), line(p.y / 2.6, 0.06 + aa * 0.05));
          float avenues = max(line(p.x / 13.0, 0.012), line(p.y / 13.0, 0.012));
          // the boulevard in front of the studio
          float blvd = smoothstep(4.4, 4.0, abs(p.x)) * step(p.y, 14.0);
          float kerb = smoothstep(0.05, 0.0, abs(abs(p.x) - 4.2)) * step(p.y, 14.0);
          float dash = step(0.5, fract(p.y * 0.8)) * smoothstep(0.04, 0.0, abs(p.x));
          vec2 lp = fract(p / 1.3) - 0.5;
          float lamp = smoothstep(0.1, 0.0, length(lp)) * streets;
          vec3 col = uBg * 1.25 + uCobalt * 0.025;
          col = mix(col, uBg * 1.6 + uCobalt * 0.04, blvd);
          col += uAmber * (streets * 0.06 * (1.0 - blvd) + avenues * 0.14 + lamp * 0.7);
          col += uAmber * kerb * 0.5 + vec3(0.7) * dash * 0.12 * blvd;
          float fog = smoothstep(18.0, 300.0, d);
          col = mix(col, uHorizon * 0.55, fog);
          gl_FragColor = vec4(col, 1.0);
        }`}));o.rotation.x=-Math.PI/2,o.position.y=.002,s.add(o);const l=[],c=(q,le)=>Math.abs(q)<4.6&&le>-12.5&&le<22,u=new L(-9,0,-24),d=new L(8,0,-28);for(let q=-40;q<=40;q++)for(let le=-40;le<=34;le++){const Ee=Xt(q*31.7+le*17.3);if(Ee<.3)continue;const Y=q*2.6+(Xt(q+le*3.1)-.5)*.5,ae=le*2.6+(Xt(le+q*5.7)-.5)*.5;if(c(Y,ae)||Math.hypot(Y-u.x,ae-u.z)<6.5||Math.hypot(Y-$t.pos.x,ae-$t.pos.z)<4.4||Math.hypot(Y-d.x,ae-d.z)<3)continue;const _e=Math.hypot(Y,ae+10);if(_e>105)continue;const Me=Math.exp(-_e/26),ce=.45+Math.pow(Xt(Ee*91.3),2.3)*(1.4+Me*6.5),pe=1.15+Xt(Ee*7.1)*.95,Ye=1.15+Xt(Ee*3.3)*.95,se=Xt(Ee*13.7)*(.6+Me*.6);if(l.push([Y,0,ae,pe,ce,Ye,Ee,se]),ce>3.2&&Xt(Ee*5.9)>.35){const Pe=ce*(.25+Xt(Ee*2.3)*.35);l.push([Y,ce,ae,pe*.68,Pe,Ye*.68,Ee+.37,se])}}l.push([d.x,0,d.z,2,10,2,.77,.95]),l.push([d.x,10,d.z,1.4,1.6,1.4,.71,.95]),l.push([d.x+3.1,0,d.z+1,1.6,6.2,1.6,.31,.7]),l.push([$t.pos.x,0,$t.pos.z,$t.size.x,$t.size.y,$t.size.z,.5,.1]);const h=new Zi(1,1,1).translate(0,.5,0),f=new Float32Array(l.length),m=new Float32Array(l.length),_=new Float32Array(l.length),p=new Nt({uniforms:{uTime:a,uHorizon:{value:r},uAmber:{value:n},uCyan:{value:t},uCobalt:{value:e},uBg:{value:i}},vertexShader:`
      attribute float aSeed; attribute float aType; attribute float aBase;
      varying vec3 vP; varying vec3 vN; varying float vSeed; varying float vType; varying float vBase; varying vec3 vW;
      void main(){
        vec3 sc = vec3(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz), length(instanceMatrix[2].xyz));
        vP = position * sc;
        vN = normal;
        vSeed = aSeed; vType = aType; vBase = aBase;
        vec4 w = modelMatrix * instanceMatrix * vec4(position, 1.0);
        vW = w.xyz;
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,fragmentShader:`
      uniform float uTime; uniform vec3 uHorizon, uAmber, uCyan, uCobalt, uBg;
      varying vec3 vP; varying vec3 vN; varying float vSeed; varying float vType; varying float vBase; varying vec3 vW;
      float h21(vec2 p){ p = fract(p * vec2(233.34, 851.73)); p += dot(p, p + 23.45); return fract(p.x * p.y); }
      void main(){
        float dist = length(vW - cameraPosition);
        float sharp = 1.0 - smoothstep(16.0, 60.0, dist);
        float y = vP.y + vBase;
        vec3 wall = uBg * (1.4 + 0.5 * h21(vec2(vSeed))) + uCobalt * 0.03;
        vec3 col = wall;
        if (abs(vN.y) < 0.5) {
          float u = abs(vN.x) > 0.5 ? vP.z : vP.x;
          vec3 wc; float glow;
          if (vType > 0.85) {
            // glass curtain wall: reflective cobalt, floor lines, lit floors
            vec2 g = vec2(u * 6.0, y * 5.0);
            vec2 cell = floor(g); vec2 f = fract(g);
            float mull = max(step(0.93, f.x), step(0.9, f.y));
            float floorLit = step(0.55, h21(vec2(cell.y, vSeed * 31.0)));
            float skyRef = smoothstep(0.0, 12.0, y) * 0.18;
            col = mix(uCobalt * (0.08 + skyRef) + uCyan * 0.02, wall, mull);
            wc = mix(vec3(0.75, 0.88, 1.0), uCyan, step(0.7, h21(cell + vSeed)));
            glow = floorLit * (1.0 - mull) * (0.35 + 0.4 * h21(cell * 1.7 + vSeed));
          } else if (vType > 0.55) {
            // office: horizontal ribbon windows
            vec2 g = vec2(u * 1.3, y * 5.0);
            vec2 cell = floor(g); vec2 f = fract(g);
            float ribbon = step(0.3, f.y) * step(f.y, 0.78);
            float lit = step(0.5, h21(cell + vSeed * 57.0 + vN.xz * 13.0));
            wc = mix(vec3(0.85, 0.9, 1.0), uAmber, step(0.65, h21(cell * 2.1 + vSeed)));
            col = mix(wall, uCobalt * 0.06 + uBg, ribbon);
            glow = ribbon * lit * 0.75;
          } else {
            // housing: punched windows, warm interiors
            vec2 g = vec2(u * 4.0, y * 5.0);
            vec2 cell = floor(g); vec2 f = fract(g);
            float win = step(0.22, f.x) * step(f.x, 0.78) * step(0.24, f.y) * step(f.y, 0.76);
            float r = h21(cell + vSeed * 57.0 + vN.xz * 13.0);
            wc = r > 0.95 ? uCyan : (r > 0.87 ? vec3(0.85, 0.9, 1.0) : uAmber);
            glow = win * step(0.64, r) * (0.85 + 0.15 * sin(uTime * (1.0 + r * 3.0) + r * 40.0));
          }
          col += wc * mix(0.1, glow, sharp);
          // shopfronts and street light washing the ground floor
          col += uAmber * 0.22 * smoothstep(0.55, 0.0, y);
        } else {
          // rooftops: dark, with the occasional aircraft beacon
          col = wall * 0.8;
          float beacon = step(0.988, h21(floor(vP.xz * 3.0) + vSeed));
          col += vec3(1.0, 0.12, 0.08) * beacon * (0.6 + 0.6 * sin(uTime * 2.5 + vSeed * 20.0)) * 1.6;
        }
        col = mix(col, uHorizon * 0.55, smoothstep(25.0, 220.0, dist));
        gl_FragColor = vec4(col, 1.0);
      }`}),g=new Ax(h,p,l.length),x=new Tt,w=new ws;l.forEach(([q,le,Ee,Y,ae,_e,Me,ce],pe)=>{x.compose(new L(q,le,Ee),w,new L(Y,ae,_e)),g.setMatrixAt(pe,x),f[pe]=Me,m[pe]=ce,_[pe]=le}),h.setAttribute("aSeed",new go(f,1)),h.setAttribute("aType",new go(m,1)),h.setAttribute("aBase",new go(_,1)),g.frustumCulled=!1,s.add(g);const S=900,b=new un,T=new Float32Array(S*3),v=new Float32Array(S*4);for(let q=0;q<S;q++){const le=Xt(q*1.37);let Ee,Y;q<70?(Ee=1,Y=[-2.6,-1.4,1.4,2.6][q%4]):(Ee=le>.5?1:0,Y=(Math.floor(Xt(q*3.11)*60)-30+.5)*2.6+(Xt(q*7.7)>.5?.18:-.18));const ae=Y>0?1:-1;v.set([Ee,Y,Xt(q*9.1)*220,ae*(2.5+Xt(q*4.3)*3.5)],q*4)}b.setAttribute("position",new Nn(T,3)),b.setAttribute("aCar",new Nn(v,4));const M=new O0(b,new Nt({transparent:!0,depthWrite:!1,blending:Oi,uniforms:{uTime:a,uAmber:{value:n},uHorizon:{value:r}},vertexShader:`
        attribute vec4 aCar;
        uniform float uTime;
        varying float vHead; varying float vFade;
        void main(){
          float along = mod(aCar.z + uTime * aCar.w, 220.0) - 110.0;
          vec3 p = aCar.x > 0.5 ? vec3(aCar.y, 0.07, along) : vec3(along, 0.07, aCar.y);
          // cars on the boulevard stop at the studio
          if (aCar.x > 0.5 && abs(aCar.y) < 4.0 && along > 13.0) p.y = -10.0;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          // facing the camera: white headlights, otherwise red tail lights
          vec3 toCam = normalize(cameraPosition - p);
          vec3 fwd = aCar.x > 0.5 ? vec3(0.0, 0.0, sign(aCar.w)) : vec3(sign(aCar.w), 0.0, 0.0);
          vHead = step(0.0, dot(toCam, fwd));
          vFade = 1.0 - smoothstep(30.0, 120.0, -mv.z);
          gl_PointSize = clamp(26.0 / -mv.z, 1.0, 9.0);
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`
        uniform vec3 uAmber;
        varying float vHead; varying float vFade;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          vec3 c = mix(vec3(1.0, 0.12, 0.08), vec3(1.0, 0.92, 0.75), vHead);
          gl_FragColor = vec4(c * a * a * 1.4 * vFade, 1.0);
        }`}));M.frustumCulled=!1,s.add(M);const C=new ki;C.position.copy(u);const A=new nn({color:i.clone().multiplyScalar(2.2),side:mi}),U=new lt(new Ji(4.4,1.6,1.7,72,1,!0),A);U.position.y=1.85,C.add(U);const I=new lt(new Ji(4.41,1.61,1.7,72,1,!0),new Nt({transparent:!0,blending:Oi,depthWrite:!1,side:mi,uniforms:{uCobalt:{value:e},uCyan:{value:t}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`uniform vec3 uCobalt, uCyan; varying vec2 vUv;
        void main(){ float r = smoothstep(0.08, 0.0, abs(fract(vUv.x * 48.0) - 0.5) - 0.42);
          gl_FragColor = vec4(mix(uCobalt, uCyan, vUv.y) * r * 0.35 * vUv.y, 1.0); }`}));I.position.y=1.85,C.add(I);const H=new lt(new gc(4.4,72),new nn({color:i.clone().multiplyScalar(1.6)}));H.rotation.x=-Math.PI/2,H.position.y=2.7,C.add(H);const D=new lt(new Df(4.4,.05,8,160),new nn({color:t.clone().multiplyScalar(1.6)}));D.rotation.x=Math.PI/2,D.position.y=2.7,C.add(D);for(let q=0;q<8;q++){const le=q/8*Math.PI*2,Ee=new lt(new Ji(.09,.14,1.4,6),new nn({color:i.clone().multiplyScalar(2.8)}));Ee.position.set(Math.cos(le)*2.4,.62,Math.sin(le)*2.4),Ee.lookAt(Math.cos(le)*6,4,Math.sin(le)*6),Ee.rotateX(Math.PI/2),C.add(Ee)}s.add(C);const z=new lt(new pr(.14,12,12),new nn({color:new ke(1,.2,.15).multiplyScalar(2)}));z.position.set(d.x,11.9,d.z),s.add(z);const X=new Nt({uniforms:{uAmber:{value:n},uCyan:{value:t},uPulse:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
      uniform vec3 uAmber, uCyan; uniform float uPulse;
      varying vec2 vUv;
      void main(){
        vec2 p = vUv - 0.5;
        float frame = step(0.47, max(abs(p.x), abs(p.y)));
        vec3 inside = mix(vec3(1.0, 0.92, 0.78), uAmber, smoothstep(0.0, 0.7, length(p * vec2(1.0, 1.6))));
        inside += uCyan * 0.25 * smoothstep(0.1, 0.4, p.x) * smoothstep(0.3, -0.1, p.y);
        vec3 col = mix(inside * (1.3 + uPulse * 0.6), vec3(0.03, 0.05, 0.12), frame);
        gl_FragColor = vec4(col, 1.0);
      }`}),F=new lt(new ji(Lh.win.w,Lh.win.h),X);F.position.set(0,$t.windowY,$t.front-.01),F.rotation.y=Math.PI,s.add(F);const Q=new lt(new ji(4,3),new Nt({transparent:!0,depthWrite:!1,blending:Oi,uniforms:{uAmber:{value:n}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`uniform vec3 uAmber; varying vec2 vUv;
        void main(){ float d = length((vUv - 0.5) * vec2(1.0, 1.35)); gl_FragColor = vec4(uAmber * smoothstep(0.5, 0.05, d) * 0.3, 1.0); }`}));Q.position.set(0,$t.windowY,$t.front-.03),Q.rotation.y=Math.PI,s.add(Q);const W=qb({cobalt:e,cyan:t,amber:n,bg:i});s.add(W.group);function P(q,le=0){a.value=q,X.uniforms.uPulse.value=le,W.update(q)}return{group:s,update:P}}function qb({cobalt:r,cyan:e,amber:t,bg:n}){const i=new ki,{x:s,z0:a,z1:o,y0:l,y1:c,win:u}=Lh,d=(a+o)/2,h=o-a,f=new L(1.55,2.62,16.75),m=new L(1.7,2.42,16),_=new Nt({uniforms:{uLamp:{value:f},uScreen:{value:m},uAmber:{value:t},uCyan:{value:e},uCobalt:{value:r},uBg:{value:n},uZ0:{value:a}},vertexShader:`
      varying vec3 vW; varying vec3 vN;
      void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; vN = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * viewMatrix * w; }`,fragmentShader:`
      uniform vec3 uLamp, uScreen, uAmber, uCyan, uCobalt, uBg; uniform float uZ0;
      varying vec3 vW; varying vec3 vN;
      void main(){
        vec3 base = uBg * 1.5 + uCobalt * 0.015;
        if (vN.y > 0.5) {
          // oak floor planks
          float plank = smoothstep(0.02, 0.0, abs(fract(vW.x * 6.0) - 0.5) - 0.47);
          base = vec3(0.05, 0.035, 0.03) * (0.85 + 0.3 * fract(sin(floor(vW.x * 6.0) * 91.7) * 437.1)) - plank * 0.015;
        }
        if (vN.y < -0.5) base = uBg * 1.8;
        vec3 toL = uLamp - vW; float dl = length(toL);
        float lamp = (0.35 + 0.65 * max(dot(vN, toL / dl), 0.0)) / (1.0 + dl * dl * 3.5);
        vec3 toS = uScreen - vW; float ds = length(toS);
        float scr = (0.3 + 0.7 * max(dot(vN, toS / ds), 0.0)) / (1.0 + ds * ds * 5.0);
        float city = exp(-(vW.z - uZ0) * 1.6) * 0.5 + 0.05;
        vec3 col = base + uAmber * lamp * 1.1 + uCyan * scr * 0.3 + uCobalt * city * 0.12;
        gl_FragColor = vec4(col, 1.0);
      }`}),p=(pe,Ye,se,Pe=0,Le=0)=>{const Ie=new lt(new ji(pe,Ye),_);return Ie.position.copy(se),Ie.rotation.set(Le,Pe,0,"YXZ"),i.add(Ie),Ie},g=c-l,x=(l+c)/2;p(2*s,h,new L(0,l,d),0,-Math.PI/2),p(2*s,h,new L(0,c,d),0,Math.PI/2),p(2*s,g,new L(0,x,o),Math.PI),p(h,g,new L(-s,x,d),Math.PI/2),p(h,g,new L(s,x,d),-Math.PI/2);const w=$t.windowY-u.h/2,S=$t.windowY+u.h/2,b=s-u.w/2;p(b,g,new L(-1.375,x,a)),p(b,g,new L(u.w/2+b/2,x,a)),p(u.w,c-S,new L(0,(S+c)/2,a)),p(u.w,w-l,new L(0,(l+w)/2,a));const T=(pe,Ye,se,Pe,Le)=>{const Ie=new lt(new Zi(pe,Ye,se),new nn({color:Le}));return Ie.position.copy(Pe),i.add(Ie),Ie},v=n.clone().multiplyScalar(3.2),M=new ke(.02,.025,.04);T(u.w+.08,.04,.08,new L(0,S,a),M),T(u.w+.08,.05,.2,new L(0,w-.01,a+.06),new ke(.06,.07,.1)),T(.04,u.h,.08,new L(-1.6/2,$t.windowY,a),M),T(.04,u.h,.08,new L(u.w/2,$t.windowY,a),M);const C=2.12;T(.6,.035,1.5,new L(1.62,C,16.1),new ke(.075,.055,.045)),T(.56,C-l,.03,new L(1.62,(C+l)/2,15.38),v),T(.56,C-l,.03,new L(1.62,(C+l)/2,16.82),v);const A=$b(),U=new lt(new ji(.66,.38),new nn({map:A,color:new ke(1.15,1.15,1.15)}));U.position.copy(m),U.rotation.y=-Math.PI/2,i.add(U),T(.025,.41,.69,new L(m.x+.016,m.y,m.z),new ke(.015,.018,.03)),T(.03,.2,.05,new L(m.x+.04,C+.1,m.z),v),T(.14,.01,.2,new L(m.x+.02,C+.02,m.z),v),T(.13,.012,.4,new L(1.43,C+.024,16.05),new ke(.03,.035,.06)),T(.135,.002,.405,new L(1.43,C+.019,16.05),r.clone().multiplyScalar(.9)),T(.05,.015,.03,new L(1.44,C+.026,16.38),new ke(.04,.045,.07));const I=new lt(new Ji(.03,.028,.07,16),new nn({color:t.clone().multiplyScalar(.5)}));I.position.set(1.47,C+.05,15.62),i.add(I);const H=new nn({color:new ke(.03,.035,.05)}),D=new lt(new Ji(.05,.06,.02,16),H);D.position.set(1.72,C+.02,16.72),i.add(D);const z=new lt(new Ji(.008,.008,.5,8),H);z.position.set(1.66,C+.26,16.74),z.rotation.z=.25,i.add(z);const X=new lt(new Cf(.07,.09,20,1,!0),new nn({color:new ke(.04,.045,.06),side:mi}));X.position.copy(f).add(new L(0,.03,0)),i.add(X);const F=new lt(new pr(.03,12,12),new nn({color:new ke(1,.75,.4).multiplyScalar(2.5)}));F.position.copy(f),i.add(F);const Q=new ki,W=new ke(.025,.03,.05),P=new lt(new Zi(.32,.04,.32),new nn({color:W}));P.position.y=1.98;const q=new lt(new Zi(.04,.38,.32),new nn({color:W}));q.position.set(-.17,2.2,0);const le=new lt(new Zi(.03,.22,.03),new nn({color:v}));le.position.y=1.86,Q.add(P,q,le),Q.position.set(.95,0,16.75),Q.rotation.y=-.6,i.add(Q),T(.18,.02,1,new L(-s+.09,2.62,16.3),new ke(.07,.05,.04));const Ee=[r,t,e,new ke(.8,.82,.9),new ke(.25,.18,.9)];let Y=15.85;for(let pe=0;pe<11;pe++){const Ye=.025+Xt(pe*3.3)*.03,se=.14+Xt(pe*5.1)*.08;T(.13,se,Ye,new L(-s+.09,2.63+se/2,Y),Ee[pe%5].clone().multiplyScalar(.18+Xt(pe)*.12)),Y+=Ye+.008}const ae=new lt(new Ji(.09,.07,.18,16),new nn({color:new ke(.08,.06,.05)}));ae.position.set(-1.55,l+.09,15),i.add(ae);for(let pe=0;pe<9;pe++){const Ye=new lt(new pr(.07+Xt(pe)*.05,8,8),new nn({color:new ke(.02,.07+Xt(pe*2)*.05,.05)}));Ye.position.set(-1.55+(Xt(pe*3)-.5)*.2,l+.25+Xt(pe*7)*.3,15+(Xt(pe*5)-.5)*.2),Ye.scale.y=1.6,i.add(Ye)}const _e=new lt(new ji(.5,.7),new nn({map:Kb(),color:new ke(.75,.75,.75)}));_e.position.set(-.6,2.5,o-.01),_e.rotation.y=Math.PI,i.add(_e);let Me=0;function ce(pe){const Ye=Math.floor(pe*2)%2===0;Ye!==Me&&(Me=Ye,A.userData.draw(Ye),A.needsUpdate=!0)}return{group:i,update:ce}}function $b(){const r=document.createElement("canvas");r.width=1024,r.height=590;const e=r.getContext("2d"),t=new Rf(r);t.colorSpace=Dn,t.anisotropy=8;const n='"JetBrains Mono", ui-monospace, monospace',i=[[["#7d8bb5","// launch.js"]],[["#83F9FF","import"],["#e8ecff"," { Earth } "],["#83F9FF","from"],["#FEB122",' "./orbit"']],[],[["#83F9FF","const"],["#e8ecff"," studio = "],["#83F9FF","new"],["#8fb0ff"," Stratos"],["#e8ecff","({"]],[["#e8ecff","  city: "],["#FEB122",'"Katowice"'],["#e8ecff",","]],[["#e8ecff","  lat: "],["#c3a6ff","50.26"],["#e8ecff",", lon: "],["#c3a6ff","19.02"],["#e8ecff",","]],[["#e8ecff","  palette: ["],["#83F9FF",'"#1B54FF"'],["#e8ecff",", "],["#FEB122",'"#FEB122"'],["#e8ecff","],"]],[["#e8ecff","})"]],[],[["#7d8bb5","// out the window, past the weather"]],[["#e8ecff","studio."],["#8fb0ff","launch"],["#e8ecff","({ altitude: "],["#FEB122",'"35 786 km"'],["#e8ecff"," })"]]];return t.userData.draw=s=>{e.fillStyle="#070c1a",e.fillRect(0,0,r.width,r.height),e.fillStyle="#0d1530",e.fillRect(0,0,r.width,40),["#ff5f57","#febc2e","#28c840"].forEach((u,d)=>{e.fillStyle=u,e.beginPath(),e.arc(24+d*22,20,7,0,Math.PI*2),e.fill()}),e.fillStyle="#8a96bf",e.font=`20px ${n}`,e.fillText("stratos — launch.js",400,27),e.fillStyle="#0a1124",e.fillRect(0,40,190,r.height-40),["src","  city.js","  scene.js","  launch.js","public","  earth.jpg"].forEach((u,d)=>{e.fillStyle=d===3?"#83F9FF":"#6c78a3",e.fillText(u,18,82+d*32)}),e.font=`22px ${n}`,i.forEach((u,d)=>{let h=260;const f=86+d*36;e.fillStyle="#3a4670",e.fillText(String(d+1).padStart(2," "),210,f),u.forEach(([m,_])=>{e.fillStyle=m,e.fillText(_,h,f),h+=e.measureText(_).width}),d===i.length-1&&s&&(e.fillStyle="#83F9FF",e.fillRect(h+4,f-20,12,26))});const a=900,o=470,l=70,c=e.createRadialGradient(a-25,o-25,5,a,o,l);c.addColorStop(0,"#9fe8ff"),c.addColorStop(.4,"#1B54FF"),c.addColorStop(1,"#050a1a"),e.fillStyle=c,e.beginPath(),e.arc(a,o,l,0,Math.PI*2),e.fill(),e.strokeStyle="rgba(254,177,34,0.8)",e.lineWidth=2,e.beginPath(),e.ellipse(a,o,l*1.5,l*.4,-.35,0,Math.PI*2),e.stroke()},t.userData.draw(!0),document.fonts?.ready.then(()=>{t.userData.draw(!0),t.needsUpdate=!0}),t}function Kb(){const r=document.createElement("canvas");r.width=256,r.height=360;const e=r.getContext("2d"),t=e.createLinearGradient(0,0,256,360);t.addColorStop(0,"#0b1a4d"),t.addColorStop(1,"#1B54FF"),e.fillStyle=t,e.fillRect(0,0,256,360),e.fillStyle="#040811",e.beginPath(),e.arc(128,150,54,0,Math.PI*2),e.fill(),e.strokeStyle="#83F9FF",e.lineWidth=5,e.beginPath(),e.ellipse(128,150,100,32,-.4,0,Math.PI*2),e.stroke(),e.fillStyle="#ffffff",e.font="500 34px system-ui, sans-serif",e.textAlign="center",e.fillText("stratos",128,300);const n=new Rf(r);return n.colorSpace=Dn,n}const Mt={bg:new ke("#040811"),cobalt:new ke("#1B54FF"),cyan:new ke("#83F9FF"),amber:new ke("#FEB122"),violet:new ke("#3D2BFF"),white:new ke("#FFFFFF")},na=50,Cl=new L(0,-na,0),Fp=[5.5,8,11,14.5,18],$l=window.matchMedia("(max-width: 760px)").matches,Op=`
  float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    float a = hash(i), b = hash(i+vec2(1.,0.)), c = hash(i+vec2(0.,1.)), d = hash(i+vec2(1.,1.));
    vec2 u = f*f*(3.-2.*f);
    return mix(a,b,u.x) + (c-a)*u.y*(1.-u.x) + (d-b)*u.x*u.y;
  }
  float fbm(vec2 p){
    float v = 0.; float a = .5;
    for(int i=0;i<${$l?4:5};i++){ v += a*noise(p); p *= 2.03; a *= .5; }
    return v;
  }
`,ja=[[0,new L(.62,2.5,16.6),new L(1.75,2.42,15.55)],[.06,new L(-.15,2.5,16.8),new L(0,2.42,9)],[.12,new L(0,2.42,13.2),new L(0,2.9,0)],[.2,new L(0,6.5,2),new L(0,14,-11)],[.36,new L(0,21,-2),new L(0,30,-14)],[.5,new L(0,34,6),new L(0,6,-60)],[.62,new L(6,48,70),new L(0,-22,-20)],[.8,new L(10,2,160),new L(0,-48,0)],[1,new L(-30,-16,182),new L(-30,-50,0)]],sg=new L(-40,26,60),ag=new L(-18,0,0),Zb=[[0,ja[ja.length-1][1].clone().add(sg),ja[ja.length-1][2].clone().add(ag)],[.2,new L(-10,60,150),new L(0,-50,0)],[.38,new L(0,50,-30),new L(0,-10,20)],[.55,new L(0,22,-14),new L(0,0,8)],[.72,new L(0,4.5,-16),new L(0,2.4,14)],[.86,new L(0,2.45,7),new L(0,2.4,16)],[.93,new L(0,2.42,14.9),new L(0,2.4,18)],[1,new L(-.45,2.52,15.35),new L(1.7,2.36,16.15)]];function og(r){const e=new lp(r.map(i=>i[1]),!1,"centripetal"),t=new lp(r.map(i=>i[2]),!1,"centripetal"),n=r.length-1;return(i,s,a)=>{let o=1;for(let l=0;l<n;l++){const c=r[l][0],u=r[l+1][0];if(i<=u){const d=Math.max(0,(i-c)/(u-c));o=(l+d*d*(3-2*d))/n;break}}e.getPoint(o,s),t.getPoint(o,a)}}const Jb=og(ja),Qb=og(Zb),mn=(r,e,t)=>{const n=Math.min(1,Math.max(0,(t-r)/(e-r)));return n*n*(3-2*n)},Va=new URLSearchParams(location.search).has("reel"),xu={dt:1/30,t:0};function jb(r,{onProgress:e}={}){const t=new Fb({canvas:r,antialias:!1,powerPreference:"high-performance"}),n=Math.min(window.devicePixelRatio,$l?1.5:1.75);t.setPixelRatio(n),t.setSize(window.innerWidth,window.innerHeight),t.setClearColor(Mt.bg);const i=new gx,s=new Fi(50,window.innerWidth/window.innerHeight,.05,4e3),a=new L(1,.32,-.42).normalize(),o=new W0;o.onProgress=(Ae,De,Ne)=>e&&e(De/Ne);const l=new Promise(Ae=>{o.onLoad=Ae,o.onError=Ae}),c=new kx(o),u="./",d=(Ae,De)=>{const Ne=c.load(`${u}textures/${Ae}`);return De&&(Ne.colorSpace=Dn),Ne.anisotropy=8,Ne},h=d("earth_day_4096.jpg",!0),f=d("earth_night_4096.jpg",!0),m=d("earth_bump_roughness_clouds_4096.jpg",!1);m.wrapS=Co,h.wrapS=f.wrapS=Co;const _={uSpace:{value:0},uTime:{value:0},uSun:{value:a},uBg:{value:Mt.bg},uCobalt:{value:Mt.cobalt},uViolet:{value:Mt.violet},uCyan:{value:Mt.cyan},uAmber:{value:Mt.amber}},p=new lt(new pr(1500,48,32),new Nt({side:Fn,depthWrite:!1,uniforms:_,vertexShader:`
        varying vec3 vDir;
        void main(){
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,fragmentShader:`
        uniform float uSpace, uTime;
        uniform vec3 uSun, uBg, uCobalt, uViolet, uCyan, uAmber;
        varying vec3 vDir;
        ${Op}
        void main(){
          vec3 d = normalize(vDir);
          float h = d.y;

          // ---- twilight atmosphere (ground) ----
          vec3 zenith  = mix(uBg, uCobalt, 0.1);
          vec3 horizon = mix(uCobalt * 0.7, uCyan, 0.08);
          vec3 low     = mix(uViolet, uCobalt, 0.35) * 0.8;
          vec3 atmo = mix(horizon, zenith, smoothstep(0.0, 0.55, h));
          atmo = mix(low, atmo, smoothstep(-0.25, 0.08, h));
          float sunAmt = pow(max(dot(d, uSun), 0.0), 6.0);
          atmo += uAmber * sunAmt * 0.35 + uCyan * pow(max(dot(d, uSun), 0.0), 40.0) * 0.4;
          // drifting high-altitude haze
          float haze = fbm(d.xz / max(h + 0.35, 0.08) * 1.4 + uTime * 0.01);
          atmo += uCobalt * haze * 0.12 * smoothstep(0.0, 0.5, h);

          // ---- deep space with nebula glows ----
          vec3 space = uBg;
          float g1 = pow(max(dot(d, normalize(vec3(0.7, 0.55, -0.6))), 0.0), 7.0);
          float g2 = pow(max(dot(d, normalize(vec3(-0.8, -0.35, -0.4))), 0.0), 6.0);
          float g3 = pow(max(dot(d, normalize(vec3(-0.2, 0.4, 0.9))), 0.0), 6.0);
          float n = fbm(d.xy * 3.0 + d.z * 2.0 + uTime * 0.004);
          space += uCobalt * g1 * (0.3 + 0.25 * n);
          space += uViolet * g2 * (0.28 + 0.2 * n);
          space += uCyan * g3 * 0.06;

          vec3 col = mix(atmo, space, uSpace);
          gl_FragColor = vec4(col, 1.0);
        }`}));p.renderOrder=-10,i.add(p);const g=$l?2600:5200,x=new un,w=new Float32Array(g*3),S=new Float32Array(g*3),b=new Float32Array(g),T=new Float32Array(g),v=new L;for(let Ae=0;Ae<g;Ae++){v.randomDirection().multiplyScalar(1200),w.set([v.x,v.y,v.z],Ae*3);const De=Math.random(),Ne=De<.06?Mt.amber:De<.22?Mt.cyan:De<.32?new ke("#9fb6ff"):Mt.white;S.set([Ne.r,Ne.g,Ne.b],Ae*3),b[Ae]=Math.pow(Math.random(),4)*3.2+.7,T[Ae]=Math.random()*6.28}x.setAttribute("position",new Nn(w,3)),x.setAttribute("color",new Nn(S,3)),x.setAttribute("size",new Nn(b,1)),x.setAttribute("phase",new Nn(T,1));const M={uTime:{value:0},uAlpha:{value:.5},uDpr:{value:n}},C=new O0(x,new Nt({transparent:!0,depthWrite:!1,blending:Oi,uniforms:M,vertexShader:`
        attribute float size; attribute float phase; attribute vec3 color;
        uniform float uTime, uDpr;
        varying vec3 vColor; varying float vTw;
        void main(){
          vColor = color;
          vTw = 0.55 + 0.45 * sin(uTime * (0.6 + phase * 0.3) + phase * 10.0);
          gl_PointSize = size * uDpr * (0.8 + 0.4 * vTw);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,fragmentShader:`
        uniform float uAlpha;
        varying vec3 vColor; varying float vTw;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          a = a * a;
          gl_FragColor = vec4(vColor * a * vTw * uAlpha * 1.6, 1.0);
        }`}));C.renderOrder=-9,i.add(C);const A=new I0({map:eT(),color:16777215,transparent:!0,blending:Oi,depthWrite:!1,depthTest:!0,opacity:0}),U=new bx(A);U.scale.setScalar(200),i.add(U);const I={uTime:{value:0},uFade:{value:1},uCamPos:{value:new L}},H=Fp.map((Ae,De)=>{const Ne=new Nt({transparent:!0,depthWrite:!1,side:mi,uniforms:{...I,uY:{value:Ae},uSeed:{value:De*17.3},uLow:{value:Mt.cobalt.clone().lerp(Mt.violet,.4).multiplyScalar(.55)},uHigh:{value:new ke("#7f9dff")},uCyan:{value:Mt.cyan}},vertexShader:`
        varying vec3 vWorld;
        void main(){
          vec4 w = modelMatrix * vec4(position, 1.0);
          vWorld = w.xyz;
          gl_Position = projectionMatrix * viewMatrix * w;
        }`,fragmentShader:`
        uniform float uTime, uFade, uY, uSeed;
        uniform vec3 uCamPos, uLow, uHigh, uCyan;
        varying vec3 vWorld;
        ${Op}
        void main(){
          vec2 p = vWorld.xz * 0.045 + vec2(uSeed, uSeed * 0.7) + vec2(uTime * 0.012, uTime * 0.006);
          float n = fbm(p);
          float n2 = fbm(p * 2.7 - uTime * 0.01);
          float dens = smoothstep(0.42, 0.78, n * 0.75 + n2 * 0.35);
          // fade with horizontal distance (hide plane edges) and when the camera is inside
          float r = length(vWorld.xz - uCamPos.xz);
          float edge = 1.0 - smoothstep(60.0, 190.0, r);
          float dy = abs(uCamPos.y - uY);
          float near = smoothstep(0.15, 1.4, dy);
          vec3 col = mix(uLow, uHigh, smoothstep(0.3, 1.0, n2 + dens * 0.4));
          col = mix(col, uCyan, 0.12 * n);
          float a = dens * edge * near * uFade * 0.72;
          gl_FragColor = vec4(col, a);
        }`}),$e=new lt(new ji(420,420,1,1),Ne);return $e.rotation.x=-Math.PI/2,$e.position.y=Ae,$e.renderOrder=-5+De,i.add($e),$e}),D=$l?140:260,z=new Float32Array(D*6),X=Array.from({length:D},()=>({a:Math.random()*Math.PI*2,r:1.6+Math.random()*9,y:Math.random()*40})),F=new un;F.setAttribute("position",new Nn(z,3));const Q=new Af({color:Mt.cyan,transparent:!0,opacity:0,blending:Oi,depthWrite:!1}),W=new Cx(F,Q);W.frustumCulled=!1,i.add(W);const P=new ki;P.position.copy(Cl),i.add(P);const q=new ki;P.add(q);const le=(Ae,De)=>{const Ne=(90-Ae)*Math.PI/180,$e=(De+180)*Math.PI/180;return new L(-Math.sin(Ne)*Math.cos($e),Math.cos(Ne),Math.sin(Ne)*Math.sin($e))};P.quaternion.setFromUnitVectors(le(50.26,19.02),new L(0,1,0));const Ee={uDay:{value:h},uNight:{value:f},uBRC:{value:m},uSun:{value:a},uTime:{value:0},uCloudShift:{value:0},uCobalt:{value:Mt.cobalt},uCyan:{value:Mt.cyan},uAmber:{value:Mt.amber},uBg:{value:Mt.bg}},Y=new lt(new pr(na,128,96),new Nt({uniforms:Ee,vertexShader:`
        varying vec2 vUv; varying vec3 vN; varying vec3 vW;
        void main(){
          vUv = uv;
          vN = normalize(mat3(modelMatrix) * normal);
          vec4 w = modelMatrix * vec4(position, 1.0);
          vW = w.xyz;
          gl_Position = projectionMatrix * viewMatrix * w;
        }`,fragmentShader:`
        uniform sampler2D uDay, uNight, uBRC;
        uniform vec3 uSun, uCobalt, uCyan, uAmber, uBg;
        uniform float uCloudShift;
        varying vec2 vUv; varying vec3 vN; varying vec3 vW;

        // bump mapping from the elevation channel (screen-space derivatives)
        vec3 bumpNormal(vec3 n, float h, float scale){
          vec3 sx = dFdx(vW), sy = dFdy(vW);
          vec3 r1 = cross(sy, n), r2 = cross(n, sx);
          float det = dot(sx, r1);
          vec2 dh = vec2(dFdx(h), dFdy(h)) * scale;
          vec3 grad = sign(det) * (dh.x * r1 + dh.y * r2);
          return normalize(abs(det) * n - grad);
        }

        void main(){
          vec3 n0 = normalize(vN);
          vec3 v = normalize(cameraPosition - vW);

          vec4 brc = texture2D(uBRC, vUv);
          float height = brc.r;
          float land = smoothstep(0.25, 0.75, brc.g);
          float ocean = 1.0 - land;
          float cl = texture2D(uBRC, vUv + vec2(uCloudShift, 0.0)).b;
          float clShadow = texture2D(uBRC, vUv + vec2(uCloudShift - 0.0015, 0.001)).b;

          // relief only on land, so mountain ranges catch the light
          vec3 n = bumpNormal(n0, height, 0.8 * land);
          float ndl0 = dot(n0, uSun);
          float ndl = dot(n, uSun);
          float dayF = smoothstep(-0.16, 0.3, ndl0);
          float relief = clamp(0.55 + 0.45 * (ndl - ndl0) * 6.0, 0.35, 1.4);

          // --- surface colour ---
          vec3 day = texture2D(uDay, vUv).rgb;
          // land: natural colour, a touch more contrast and saturation, deserts pulled toward sand
          float lum = dot(day, vec3(0.2126, 0.7152, 0.0722));
          vec3 landCol = mix(vec3(lum), day, 1.18);
          landCol = pow(max(landCol, 0.0), vec3(1.08)) * 1.12;
          landCol = mix(landCol, landCol * vec3(0.92, 0.95, 1.08), smoothstep(0.25, 0.6, lum));
          // ocean: deep cobalt, lighter on shallow shelves
          float shelf = smoothstep(0.02, 0.12, lum);
          vec3 oceanCol = mix(uBg * 0.9 + uCobalt * 0.08, uCobalt * 0.28 + uCyan * 0.05, shelf);
          vec3 surf = mix(oceanCol, landCol * relief, land);

          // diffuse light + cloud shadows
          float shadow = 1.0 - clShadow * 0.45 * dayF;
          vec3 lit = surf * (0.03 + 1.0 * dayF) * shadow;

          // clouds, lit by the sun, faintly blue on the night side
          vec3 cloudCol = mix(uCobalt * 0.05, vec3(0.92, 0.95, 1.0), dayF);
          lit = mix(lit, cloudCol, cl * 0.88);

          // ocean sun glint
          vec3 hv = normalize(uSun + v);
          float spec = pow(max(dot(n0, hv), 0.0), 90.0) * ocean * (1.0 - cl) * dayF;
          lit += (uAmber * 0.45 + vec3(0.55)) * spec * 1.1;

          // city lights on the night side
          vec3 night = texture2D(uNight, vUv).rgb;
          float nl = dot(night, vec3(0.333));
          lit += uAmber * pow(nl, 1.25) * 2.4 * (1.0 - dayF) * (1.0 - cl * 0.75);

          // atmosphere: scattering haze toward the limb, rim glow, warm terminator
          float fres = pow(1.0 - max(dot(n0, v), 0.0), 2.4);
          vec3 rim = mix(uCobalt, uCyan, smoothstep(-0.2, 0.6, ndl0));
          lit = mix(lit, rim * 0.6, fres * 0.55 * smoothstep(-0.3, 0.4, ndl0));
          lit += rim * fres * (0.12 + 0.55 * smoothstep(-0.4, 0.5, ndl0));
          lit += uAmber * 0.07 * exp(-pow(ndl0 * 7.0, 2.0)) * (1.0 - fres);

          gl_FragColor = vec4(lit, 1.0);
        }`}));q.add(Y);const ae=new lt(new pr(na*1.085,96,64),new Nt({side:Fn,transparent:!0,depthWrite:!1,blending:Oi,uniforms:{uSun:{value:a},uCobalt:{value:Mt.cobalt},uCyan:{value:Mt.cyan},uViolet:{value:Mt.violet},uCenter:{value:Cl}},vertexShader:`
        varying vec3 vN; varying vec3 vW;
        void main(){
          vN = normalize(mat3(modelMatrix) * normal);
          vec4 w = modelMatrix * vec4(position, 1.0);
          vW = w.xyz;
          gl_Position = projectionMatrix * viewMatrix * w;
        }`,fragmentShader:`
        uniform vec3 uSun, uCobalt, uCyan, uViolet, uCenter;
        varying vec3 vN; varying vec3 vW;
        void main(){
          vec3 v = normalize(cameraPosition - vW);
          vec3 n = normalize(vN);
          float rim = pow(clamp(0.78 + dot(n, v), 0.0, 1.0), 5.0);
          float sunSide = smoothstep(-0.5, 0.6, dot(normalize(vW - uCenter), uSun));
          vec3 col = mix(uViolet * 0.8, mix(uCobalt, uCyan, 0.45), sunSide);
          gl_FragColor = vec4(col * rim * (0.45 + 0.8 * sunSide), 1.0);
        }`}));ae.position.copy(Cl),i.add(ae);const _e=Yb({horizon:Mt.cobalt.clone().multiplyScalar(.7).lerp(Mt.cyan,.08),cobalt:Mt.cobalt,cyan:Mt.cyan,amber:Mt.amber,bg:Mt.bg});i.add(_e.group);const Me=new ki;Me.position.copy(Cl);const ce=[];[1.32,1.55,1.9].forEach((Ae,De)=>{const $e=new Dx(0,0,na*Ae,na*Ae,0,Math.PI*2).getPoints(256).map(Xe=>new L(Xe.x,0,Xe.y)),wt=new un().setFromPoints($e),B=new Ox({color:De===1?Mt.amber:Mt.cyan,dashSize:De===1?2:1.2,gapSize:De===1?3.5:2.6,transparent:!0,opacity:0,depthWrite:!1,blending:Oi}),et=new F0(wt,B);et.computeLineDistances(),et.rotation.set(.35+De*.32,De*.9,-.25+De*.18),ce.push(B),Me.add(et);const tt=new lt(new pr(.9,12,12),new nn({color:De===1?Mt.amber:Mt.cyan,transparent:!0,opacity:0}));tt.userData={r:na*Ae,speed:.12+De*.05,off:De*2.1},et.add(tt),ce.push(tt.material)}),i.add(Me);const pe=new Gb(t);pe.setPixelRatio(n),pe.setSize(window.innerWidth,window.innerHeight),pe.addPass(new Vb(i,s));const Ye=new Ta(new Ve(window.innerWidth,window.innerHeight),.5,.6,.82);pe.addPass(Ye),pe.addPass(new Xb);const se={target:0,p:0,after:0,afterS:0,descent:0,d:0,mouse:new Ve,mouseS:new Ve,spin:0,running:!0},Pe=new L,Le=new L,Ie=new L,ut=new q0;function st(){if(!se.running)return;let Ae,De;Va?(Ae=xu.dt,De=xu.t):(ut.update(),Ae=Math.min(ut.getDelta(),.05),De=ut.getElapsed()),se.p+=(se.target-se.p)*Math.min(1,Ae*5.5),se.afterS+=(se.after-se.afterS)*Math.min(1,Ae*4),se.mouseS.lerp(se.mouse,Math.min(1,Ae*3)),se.d+=(se.descent-se.d)*Math.min(1,Ae*5.5),se.descent===0&&se.d<5e-4&&(se.d=0);const Ne=se.p,$e=se.d,wt=se.afterS,B=$e>0;B?Qb($e,Pe,Le):(Jb(Ne,Pe,Le),Pe.addScaledVector(sg,wt),Le.addScaledVector(ag,wt));const et=B?1-mn(.6,.85,$e):1,tt=(.6+(B?5*(1-mn(.3,.6,$e)):mn(.5,1,Ne)*5))*et+.15;Pe.x+=se.mouseS.x*tt,Pe.y+=se.mouseS.y*tt*.6,Pe.x+=Math.sin(De*.35)*.12*et,Pe.y+=Math.cos(De*.27)*.1*et,s.position.copy(Pe),s.lookAt(Le),B?s.rotateZ(Math.sin($e*Math.PI*2)*.05*(1-mn(.6,.8,$e))):s.rotateZ(Math.sin(Ne*Math.PI*2)*.05*(1-mn(.5,.8,Ne)));const Xe=Pe.distanceTo(Ie)/Math.max(Ae,.001);Ie.copy(Pe);const ge=mn(.2,.52,Ne)*(1-mn(.42,.66,$e));_.uSpace.value=ge,_.uTime.value=De,p.position.copy(Pe),C.position.copy(Pe),M.uTime.value=De,M.uAlpha.value=.55+ge*.6,I.uTime.value=De,I.uCamPos.value.copy(Pe);const ft=B?mn(.36,.48,$e):1-mn(.4,.5,Ne);I.uFade.value=ft,H.forEach(ue=>ue.visible=ft>.001);const Fe=!Va&&Pe.y<20&&(B?$e>.5:Ne<.42);_e.group.visible=Fe,P.visible=ae.visible=!Fe,_e.update(De,B?mn(.8,1,$e):0);const We=B?mn(.3,.45,$e)*(1-mn(.68,.78,$e)):1-mn(.4,.5,Ne),R=B?1:-1,y=Math.min(1,Xe/26)*We;if(Q.opacity=y*.55,W.visible=y>.01,W.visible){const ue=.4+y*4.5;for(let me=0;me<D;me++){const k=X[me];k.y+=R*Ae*(6+y*60),k.y<-6&&(k.y+=46),k.y>40&&(k.y-=46);const j=Pe.x+Math.cos(k.a)*k.r,fe=Pe.z+Math.sin(k.a)*k.r-4,N=Pe.y+k.y;z.set([j,N,fe,j,N+ue,fe],me*6)}F.attributes.position.needsUpdate=!0}B||(se.spin+=Ae*.035*mn(.55,.8,Ne));const G=mn(.5,1,Ne)*2.2+se.spin+wt*.8,oe=Math.ceil(G/(Math.PI*2))*Math.PI*2;q.rotation.y=B?nx.lerp(G,oe,mn(.04,.42,$e)):G,Ee.uCloudShift.value=De*.002,Ee.uTime.value=De;const ie=mn(.78,.95,Ne)*(1-wt*.5)*(1-mn(0,.22,$e));Me.rotation.y=De*.04,Me.children.forEach((ue,me)=>{ue.material.opacity=ie*(me===1?.75:.5);const k=ue.children[0],j=De*k.userData.speed+k.userData.off;k.position.set(Math.cos(j)*k.userData.r,0,Math.sin(j)*k.userData.r),k.material.opacity=ie}),U.position.copy(Pe).addScaledVector(a,900),A.opacity=.12+ge*.4,Ye.strength=.4+ge*.3,se.covered||pe.render(),se.onFrame&&se.onFrame({p:Ne,d:$e,speed:Xe,camY:Pe.y,layers:Fp,cloudFade:ft}),Va||requestAnimationFrame(st)}function K(){const Ae=window.innerWidth,De=window.innerHeight;s.aspect=Ae/De,s.fov=Ae/De<.8?66:50,s.updateProjectionMatrix(),t.setSize(Ae,De),pe.setSize(Ae,De),Ye.resolution.set(Ae,De)}window.addEventListener("resize",K),K(),window.addEventListener("pointermove",Ae=>{se.mouse.set(Ae.clientX/window.innerWidth*2-1,-(Ae.clientY/window.innerHeight*2-1))}),document.addEventListener("visibilitychange",()=>{Va||(document.hidden?se.running=!1:se.running||(se.running=!0,ut.update(),requestAnimationFrame(st)))}),Va||requestAnimationFrame(st);function it(Ae,De){se.target=se.p=Ae,se.d=se.descent=0,se.after=se.afterS=0,se.mouse.set(0,0),se.mouseS.set(0,0),xu.t=De,se.running=!0,st()}return{loaded:l,reelFrame:it,setProgress:Ae=>se.target=Ae,setAfter:Ae=>se.after=Ae,setDescent:Ae=>se.descent=Ae,setCovered:Ae=>se.covered=Ae,set onFrame(Ae){se.onFrame=Ae}}}function eT(){const e=document.createElement("canvas");e.width=e.height=256;const t=e.getContext("2d"),n=t.createRadialGradient(256/2,256/2,0,256/2,256/2,256/2);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.06,"rgba(255,236,190,0.9)"),n.addColorStop(.18,"rgba(254,177,34,0.28)"),n.addColorStop(.45,"rgba(27,84,255,0.08)"),n.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=n,t.fillRect(0,0,256,256);const i=new Rf(e);return i.colorSpace=Dn,i}It.registerPlugin(Ke);const je=(r,e=document)=>e.querySelector(r),ii=(r,e=document)=>[...e.querySelectorAll(r)],ri=window.matchMedia("(prefers-reduced-motion: reduce)").matches,tT=window.matchMedia("(pointer: fine)").matches,Uf=new URLSearchParams(location.search).has("reel");"scrollRestoration"in history&&(history.scrollRestoration="manual");window.scrollTo(0,0);let zr=null;!ri&&!Uf&&(zr=new Sg({lerp:.075,smoothWheel:!0,wheelMultiplier:.85}),zr.on("scroll",Ke.update),It.ticker.add(r=>zr.raf(r*1e3)),It.ticker.lagSmoothing(0),zr.stop());ii('a[href^="#"]').forEach(r=>{r.addEventListener("click",e=>{const t=r.getAttribute("href"),n=t==="#top"?0:je(t);n!==null&&(e.preventDefault(),zr?zr.scrollTo(n,{duration:t==="#top"?3.2:1.8}):window.scrollTo({top:n===0?0:n.offsetTop}))})});const nT=je("[data-preloader-count]"),iT=je("[data-preloader-bar]"),Bp=je("[data-preloader-status]"),lr={real:0,shown:0},Es=jb(je("#webgl"),{onProgress:r=>lr.real=r});function Fo(r,e="w"){if(r.dataset.splitDone)return ii("."+e,r);const t=[...r.childNodes];return r.setAttribute("aria-label",r.textContent.replace(/\s+/g," ").trim()),r.textContent="",t.forEach(n=>{if(n.nodeType===Node.TEXT_NODE)zp(r,n.textContent,e);else if(n.nodeName==="BR")r.appendChild(document.createElement("br"));else{const i=n.cloneNode(!1);zp(i,n.textContent,e),r.appendChild(i)}}),r.dataset.splitDone="1",ii("."+e,r)}function zp(r,e,t){e.split(/(\s+)/).forEach(n=>{if(!n)return;if(!n.trim()){r.appendChild(document.createTextNode(" "));return}const i=document.createElement("span");i.className="w-mask",i.setAttribute("aria-hidden","true");const s=document.createElement("span");s.className=t,s.textContent=n,i.appendChild(s),r.appendChild(i)})}const pa=[[0,.005],[.12,.012],[.2,2],[.27,12],[.4,50],[.52,100],[.7,400],[.86,8e3],[1,35786]];function lg(r){for(let e=0;e<pa.length-1;e++){const[t,n]=pa[e],[i,s]=pa[e+1];if(r<=i){const a=(r-t)/(i-t);return n>0&&s/n>4?n*Math.pow(s/n,a):n+(s-n)*a}}return 35786}function rT(r){for(let e=0;e<pa.length-1;e++){const[t,n]=pa[e],[i,s]=pa[e+1];if(r<=s){const a=n>0&&s/n>4?Math.log(r/n)/Math.log(s/n):(r-n)/(s-n);return t+(i-t)*Math.max(0,Math.min(1,a))}}return 1}const Su=[[0,35786],[.2,8e3],[.38,100],[.48,50],[.6,12],[.74,.6],[.88,.012],[1,.005]];function sT(r){for(let e=0;e<Su.length-1;e++){const[t,n]=Su[e],[i,s]=Su[e+1];if(r<=i){const a=(r-t)/(i-t);return n*Math.pow(s/n,a)}}return .005}function aT(r){return r<1?"Katowice":r<12?"Troposphere":r<50?"Stratosphere":r<85?"Mesosphere":r<600?"Thermosphere":r<1e4?"Exosphere":r<35e3?"Medium Earth orbit":"Geostationary orbit"}const oT=je("[data-alt]"),kp=je("[data-layer]"),lT=je("[data-gauge]"),cT=ii(".hud__marks li"),uT=je("[data-mist]"),Hp=je("[data-hud]");let Gp="";function Ff(r){const e=rT(r);oT.textContent=r<1?r.toFixed(3):r<1e3?r.toFixed(1):Math.round(r).toLocaleString("en-US").replace(/,/g," ");const t=aT(r);t!==Gp&&(Gp=t,kp.textContent=t,ri||It.fromTo(kp,{autoAlpha:0,x:-8},{autoAlpha:1,x:0,duration:.5,ease:"power3.out"})),lT.style.transform=`scaleY(${e})`,cT.forEach(n=>n.classList.toggle("is-passed",e>=parseFloat(n.style.getPropertyValue("--at"))-.005))}Es.onFrame=({camY:r,layers:e,cloudFade:t})=>{let n=0;if(t>.01)for(const i of e){const s=r-i;n=Math.max(n,Math.exp(-(s*s)/.9))}uT.style.opacity=(n*.6*t).toFixed(3)};const mr={hudUp:1,content:0,contentAurora:0,d:0},hT=je("[data-veil]"),fT=je("[data-aurora]"),dT=je("[data-room]"),Pl=(r,e,t)=>{const n=Math.min(1,Math.max(0,(t-r)/(e-r)));return n*n*(3-2*n)};function vc(){const r=mr.d,e=1-Pl(0,.1,r);hT.style.opacity=(mr.content*e).toFixed(3),fT.style.opacity=(mr.contentAurora*.85*e).toFixed(3),dT.style.opacity=(Pl(.94,1,r)*.62).toFixed(3);const t=Pl(.03,.09,r)*(1-Pl(.86,.92,r)),n=r>0?t:mr.hudUp;Hp.style.opacity=n.toFixed(3),Hp.style.transform=`translateY(${(1-n)*20}px)`}let cg=null;function pT(){const r=je("[data-hero-title]"),e=Fo(r),t=Object.fromEntries(ii("[data-scene]").map(a=>[a.dataset.scene,a])),n=It.timeline({defaults:{ease:"none"}}),i=(a,o,l=.035)=>n.fromTo(a,{autoAlpha:0,y:60,filter:"blur(10px)"},{autoAlpha:1,y:0,filter:"blur(0px)",duration:l},o),s=(a,o,l=.035)=>n.to(a,{autoAlpha:0,y:-60,filter:"blur(10px)",duration:l},o);if(n.to(t.intro,{autoAlpha:0,y:-80,scale:.96,filter:"blur(12px)",duration:.05},.03),i(t.c1,.2),s(t.c1,.255),i(t.c2,.285),s(t.c2,.36),n.fromTo(t.c3,{autoAlpha:0,scale:.85,filter:"blur(14px)"},{autoAlpha:1,scale:1,filter:"blur(0px)",duration:.05},.45),n.to(t.c3,{autoAlpha:0,scale:1.15,filter:"blur(14px)",duration:.05},.57),n.set(t.hero,{autoAlpha:1},.79),n.fromTo(je(".eyebrow",t.hero),{autoAlpha:0,y:20},{autoAlpha:1,y:0,duration:.03},.8),n.fromTo(e,{yPercent:110},{yPercent:0,duration:.05,stagger:.012},.81),n.fromTo([je(".lede--hero"),je(".hero__ctas")],{autoAlpha:0,y:30},{autoAlpha:1,y:0,duration:.04,stagger:.02},.9),n.to({},{duration:.04},.96),Uf){cg=n;return}Ke.create({trigger:"[data-flight]",start:"top top",end:"bottom bottom",scrub:ri?!0:.6,animation:n,onUpdate:a=>{Es.setProgress(a.progress),mr.d===0&&Ff(lg(a.progress))}}),Ke.create({trigger:"[data-flight]",start:"bottom 110%",end:"bottom 70%",onUpdate:a=>{mr.hudUp=1-a.progress,vc()}})}function mT(){Ke.create({trigger:"#manifesto",start:"top bottom",endTrigger:"#descent",end:"top top",onUpdate:r=>Es.setAfter(r.progress)}),Ke.create({trigger:"#manifesto",start:"top bottom",end:"top 20%",onUpdate:r=>{mr.content=r.progress,vc()}}),Ke.create({trigger:"#manifesto",start:"top 80%",end:"top top",onUpdate:r=>{mr.contentAurora=r.progress,vc()}})}function gT(){const r=Object.fromEntries(ii("[data-dscene]").map(s=>[s.dataset.dscene,s])),e=Fo(je(".display",r.d5)),t=It.timeline({defaults:{ease:"none"}}),n=(s,a,o=.035)=>t.fromTo(s,{autoAlpha:0,y:60,filter:"blur(10px)"},{autoAlpha:1,y:0,filter:"blur(0px)",duration:o},a),i=(s,a,o=.035)=>t.to(s,{autoAlpha:0,y:-60,filter:"blur(10px)",duration:o},a);n(r.d1,.04),i(r.d1,.17),n(r.d2,.24),i(r.d2,.35),t.fromTo(r.d3,{autoAlpha:0,scale:.88,filter:"blur(14px)"},{autoAlpha:1,scale:1,filter:"blur(0px)",duration:.05},.6),t.to(r.d3,{autoAlpha:0,scale:1.12,filter:"blur(14px)",duration:.04},.72),n(r.d4,.76,.03),i(r.d4,.85,.03),t.set(r.d5,{autoAlpha:1},.95),t.fromTo(je(".eyebrow",r.d5),{autoAlpha:0,y:20},{autoAlpha:1,y:0,duration:.015},.955),t.fromTo(e,{yPercent:110},{yPercent:0,duration:.025,stagger:.006},.96),t.to({},{duration:.01},.99),Ke.create({trigger:"[data-descent]",start:"top top",end:"bottom bottom",scrub:ri?!0:.6,animation:t,onUpdate:s=>{mr.d=s.progress,Es.setDescent(s.progress),s.progress>0&&Ff(sT(s.progress)),vc()}})}function _T(){const r=je("[data-scrub-words]"),e=Fo(r,"sw");if(ri){It.set(e,{opacity:1});return}It.to(e,{opacity:1,stagger:.1,ease:"none",scrollTrigger:{trigger:r,start:"top 80%",end:"bottom 35%",scrub:.8}}),It.fromTo(r,{y:80},{y:-40,ease:"none",scrollTrigger:{trigger:r,start:"top bottom",end:"bottom top",scrub:1}})}function vT(){ri||(ii("[data-split]").forEach(r=>{const e=Fo(r);It.fromTo(e,{yPercent:115},{yPercent:0,duration:1.1,ease:"power4.out",stagger:.06,scrollTrigger:{trigger:r,start:"top 85%",once:!0}})}),ii("[data-reveal]").forEach(r=>{It.fromTo(r,{y:40,autoAlpha:0,filter:"blur(8px)"},{y:0,autoAlpha:1,filter:"blur(0px)",duration:1,ease:"power4.out",delay:Array.from(r.parentElement.children).indexOf(r)%5*.06,scrollTrigger:{trigger:r,start:"top 90%",once:!0}})}))}function xT(){if(ri)return;const r=ii("[data-card]");r.forEach((e,t)=>{const n=r[t+1];n&&It.to(e,{scale:.9+t*.02,filter:"brightness(0.5)",y:-30,ease:"none",scrollTrigger:{trigger:n,start:"top 85%",end:"top 14%",scrub:!0,invalidateOnRefresh:!0}})})}function ST(){const r=je("[data-track]"),e=je("[data-mission-bar]"),t=je("[data-mission-index]"),n=ii(".mission",r),i=()=>Math.max(0,r.scrollWidth-window.innerWidth),s=It.to(r,{x:()=>-i(),ease:"none",scrollTrigger:{trigger:"[data-missions]",start:"top top",end:()=>"+="+i(),pin:".missions__pin",scrub:ri?!0:1,invalidateOnRefresh:!0,onUpdate:a=>{e.style.transform=`scaleX(${a.progress})`,t.textContent=String(Math.min(n.length,Math.floor(a.progress*n.length)+1)).padStart(2,"0")}}});ri||n.forEach(a=>{const o=je(".mission__visual",a);It.fromTo(o,{scale:.86,rotate:2},{scale:1,rotate:0,ease:"none",scrollTrigger:{trigger:a,containerAnimation:s,start:"left right",end:"center center",scrub:!0}}),It.fromTo(je(".planet",a),{xPercent:-80},{xPercent:-20,ease:"none",scrollTrigger:{trigger:a,containerAnimation:s,start:"left right",end:"right left",scrub:!0}})})}function MT(){ii("[data-count]").forEach(r=>{const e=Number(r.dataset.count),t=r.dataset.suffix||"";if(ri){r.textContent=e+t;return}const n={v:0};It.to(n,{v:e,duration:2.2,ease:"power3.out",onUpdate:()=>r.textContent=Math.round(n.v)+t,scrollTrigger:{trigger:r,start:"top 85%",once:!0}})})}function yT(){ri||It.fromTo(".launch__title",{scale:.9,transformOrigin:"left bottom"},{scale:1,ease:"none",scrollTrigger:{trigger:"[data-launch]",start:"top bottom",end:"center center",scrub:1}})}function ET(){if(!tT||ri)return;const r=je("[data-cursor]"),e=je(".cursor__dot",r),t=je(".cursor__ring",r),n=It.quickTo(e,"x",{duration:.12,ease:"power3"}),i=It.quickTo(e,"y",{duration:.12,ease:"power3"}),s=It.quickTo(t,"x",{duration:.5,ease:"power3"}),a=It.quickTo(t,"y",{duration:.5,ease:"power3"});window.addEventListener("pointermove",o=>{n(o.clientX),i(o.clientY),s(o.clientX),a(o.clientY)}),ii("a, button, .swatch").forEach(o=>{o.addEventListener("pointerenter",()=>r.classList.add("is-hover")),o.addEventListener("pointerleave",()=>r.classList.remove("is-hover"))}),ii("[data-magnetic]").forEach(o=>{const l=It.quickTo(o,"x",{duration:.6,ease:"power3"}),c=It.quickTo(o,"y",{duration:.6,ease:"power3"});o.addEventListener("pointermove",u=>{const d=o.getBoundingClientRect();l((u.clientX-(d.left+d.width/2))*.3),c((u.clientY-(d.top+d.height/2))*.4)}),o.addEventListener("pointerleave",()=>{l(0),c(0)})})}function bT(){ii(".swatch").forEach(t=>t.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(t.dataset.copy)}catch{}t.classList.add("is-copied"),setTimeout(()=>t.classList.remove("is-copied"),1400)}));const r=je("[data-clock]"),e=()=>{const t=new Date;r.textContent="UTC "+t.toISOString().slice(11,19)};e(),setInterval(e,1e3)}function TT(){const r=je("[data-preloader]"),e=ri?0:1.6,t=performance.now();let n=!1;return Es.loaded.then(()=>n=!0),setTimeout(()=>n=!0,8e3),new Promise(i=>{const s=()=>{const a=(performance.now()-t)/1e3,o=Math.min(1,a/e||1),l=n?Math.min(1,o):Math.min(lr.real,o,.96);lr.shown+=(l-lr.shown)*.12,l-lr.shown<.002&&(lr.shown=l);const c=Math.round(lr.shown*100);if(nT.textContent=String(c).padStart(3,"0"),iT.style.transform=`scaleX(${lr.shown})`,c>60&&(Bp.textContent="Systems nominal"),lr.shown>=1){Bp.textContent="Go for launch",It.timeline({onComplete:()=>{r.remove(),i()}}).to(".preloader__count, .preloader__top, .preloader__bottom",{autoAlpha:0,y:-30,duration:.6,ease:"power3.in",stagger:.05},.25).to(r,{yPercent:-100,duration:1.1,ease:"power4.inOut"},.6).add(wT,.85);return}requestAnimationFrame(s)};requestAnimationFrame(s)})}function wT(){if(ri)return;const r=je('[data-scene="intro"]'),e=je(".display",r),t=Fo(e);It.timeline({defaults:{ease:"power4.out"}}).from(".nav > *",{y:-24,autoAlpha:0,duration:1,stagger:.08}).from(je(".eyebrow",r),{y:20,autoAlpha:0,duration:.9},.1).from(t,{yPercent:115,duration:1.4,stagger:.1},.15).from([je(".lede",r),je(".scrollcue",r)],{y:24,autoAlpha:0,duration:1,stagger:.1},.55).from(".hud__readout, .hud__gauge",{autoAlpha:0,y:20,duration:1,stagger:.1},.6)}pT();mT();gT();_T();vT();xT();ST();MT();yT();ET();bT();Uf?AT():TT().then(()=>{zr&&zr.start(),Ke.refresh()});function AT(){const r="21 projekt",e=new URLSearchParams(location.search).get("reel")==="desktop";document.documentElement.classList.add("reel",e?"reel-desktop":"reel-mobile"),je("[data-preloader]")?.remove();const t=je(".nav__logo");t&&(t.lastChild.textContent=" "+r);const n=je(".nav__tag");n&&(n.textContent="Strony 3D · scroll storytelling");const i=je(".scene--hero .eyebrow");i&&(i.innerHTML='<span class="dot dot--amber"></span>21 Projekt · Strony 3D');const s=je(".lede--hero");s&&(s.textContent="21 Projekt tworzy strony, które robią wrażenie od pierwszego scrolla: 3D, ruch i storytelling dla marek, które chcą się wyróżnić.");const a=.2,o=(d,h,f)=>{const m=Math.min(1,Math.max(0,(f-d)/(h-d)));return m*m*(3-2*m)};let l=null,c=null,u=[];if(!e){const d=document.createElement("div");d.className="reel-overlay",d.innerHTML=`
      <div class="reel-hook"><span>Tak może zaczynać się</span><b>Twoja strona.</b></div>
      <div class="reel-end">
        <p class="reel-kicker">21 Projekt · strona 3D</p>
        <h2>Robię strony,<br>które zatrzymują<br><em>scroll.</em></h2>
        <p class="reel-lede">Szukam marek, które chcą high-endowej strony 3D. Takiej jak ta.</p>
        <p class="reel-cta"><span class="pill__dot"></span>Napisz do mnie w DM</p>
      </div>`,document.body.appendChild(d),l=je(".reel-hook",d),c=je(".reel-end",d),u=[...c.children]}window.__reel={ready:Es.loaded,step(d,h=9.5){const f=Math.min(1,d/h),m=.5-.5*Math.cos(Math.PI*f),_=a+(1-a)*m;if(cg.progress(Math.min(1,_)),Ff(lg(_)),Es.reelFrame(_,d),je("[data-hud]").style.opacity=(1-o(.6,.7,_)).toFixed(3),e)return;l.style.opacity=(o(.2,.8,d)*(1-o(2.4,3,d))).toFixed(3),l.style.transform=`translateY(${((1-o(.2,.9,d))*24).toFixed(1)}px)`;const p=h+.8;je(".flight__sticky").style.opacity=(1-o(p,p+.7,d)).toFixed(3),document.documentElement.style.setProperty("--reel-dim",o(p,p+.9,d).toFixed(3)),u.forEach((g,x)=>{const w=o(p+.3+x*.25,p+1+x*.25,d);g.style.opacity=w.toFixed(3),g.style.transform=`translateY(${((1-w)*30).toFixed(1)}px)`,g.style.filter=`blur(${((1-w)*8).toFixed(1)}px)`})}}}document.fonts?.ready.then(()=>Ke.refresh());window.addEventListener("load",()=>Ke.refresh());
