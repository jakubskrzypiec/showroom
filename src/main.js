import "./style.css";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createScene } from "./scene.js";

gsap.registerPlugin(ScrollTrigger);

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.scrollTo(0, 0);

/* ------------------------------------------------------------------ */
/* Smooth scroll                                                       */
/* ------------------------------------------------------------------ */
let lenis = null;
if (!reduceMotion) {
  lenis = new Lenis({ lerp: 0.075, smoothWheel: true, wheelMultiplier: 0.85 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
}

$$('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    const target = id === "#top" ? 0 : $(id);
    if (target === null) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { duration: id === "#top" ? 3.2 : 1.8 });
    else window.scrollTo({ top: target === 0 ? 0 : target.offsetTop });
  });
});

/* ------------------------------------------------------------------ */
/* WebGL scene                                                         */
/* ------------------------------------------------------------------ */
const countEl = $("[data-preloader-count]");
const barEl = $("[data-preloader-bar]");
const statusEl = $("[data-preloader-status]");
const loadState = { real: 0, shown: 0 };

const scene = createScene($("#webgl"), {
  onProgress: (v) => (loadState.real = v),
});

/* ------------------------------------------------------------------ */
/* Text splitting                                                      */
/* ------------------------------------------------------------------ */
function splitWords(el, wordClass = "w") {
  if (el.dataset.splitDone) return $$("." + wordClass, el);
  const nodes = [...el.childNodes];
  el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
  el.textContent = "";
  nodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      appendWords(el, node.textContent, wordClass);
    } else if (node.nodeName === "BR") {
      el.appendChild(document.createElement("br"));
    } else {
      // keep inline wrappers like <em>
      const wrap = node.cloneNode(false);
      appendWords(wrap, node.textContent, wordClass);
      el.appendChild(wrap);
    }
  });
  el.dataset.splitDone = "1";
  return $$("." + wordClass, el);
}
function appendWords(parent, text, wordClass) {
  text.split(/(\s+)/).forEach((part) => {
    if (!part) return;
    if (!part.trim()) {
      parent.appendChild(document.createTextNode(" "));
      return;
    }
    const mask = document.createElement("span");
    mask.className = "w-mask";
    mask.setAttribute("aria-hidden", "true");
    const w = document.createElement("span");
    w.className = wordClass;
    w.textContent = part;
    mask.appendChild(w);
    parent.appendChild(mask);
  });
}

/* ------------------------------------------------------------------ */
/* Flight: scroll-scrubbed ascent                                      */
/* ------------------------------------------------------------------ */
const ALT_KEYS = [
  [0, 0],
  [0.18, 7],
  [0.25, 12],
  [0.4, 50],
  [0.52, 100],
  [0.7, 400],
  [0.86, 8000],
  [1, 35786],
];
function altitudeAt(p) {
  for (let i = 0; i < ALT_KEYS.length - 1; i++) {
    const [p0, a0] = ALT_KEYS[i];
    const [p1, a1] = ALT_KEYS[i + 1];
    if (p <= p1) {
      const t = (p - p0) / (p1 - p0);
      if (a0 > 0 && a1 / a0 > 4) return a0 * Math.pow(a1 / a0, t); // log ramp for big jumps
      return a0 + (a1 - a0) * t;
    }
  }
  return 35786;
}
function layerName(km) {
  if (km < 12) return "Troposphere";
  if (km < 50) return "Stratosphere";
  if (km < 85) return "Mesosphere";
  if (km < 600) return "Thermosphere";
  if (km < 10000) return "Exosphere";
  if (km < 35000) return "Medium Earth orbit";
  return "Geostationary orbit";
}

const altEl = $("[data-alt]");
const layerEl = $("[data-layer]");
const gaugeEl = $("[data-gauge]");
const marks = $$(".hud__marks li");
const mistEl = $("[data-mist]");
const hud = $("[data-hud]");
let lastLayer = "";

function updateHud(p) {
  const km = altitudeAt(p);
  altEl.textContent = km < 1000 ? km.toFixed(1) : Math.round(km).toLocaleString("en-US").replace(/,/g, " ");
  const name = layerName(km);
  if (name !== lastLayer) {
    lastLayer = name;
    layerEl.textContent = name;
    if (!reduceMotion) gsap.fromTo(layerEl, { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, duration: 0.5, ease: "power3.out" });
  }
  gaugeEl.style.transform = `scaleY(${p})`;
  marks.forEach((m) => m.classList.toggle("is-passed", p >= parseFloat(m.style.getPropertyValue("--at")) - 0.005));
}

// mist "punch-through" when the camera crosses a cloud layer
scene.onFrame = ({ p, camY, layers }) => {
  let m = 0;
  if (p < 0.48) {
    for (const y of layers) {
      const dy = camY - y;
      m = Math.max(m, Math.exp(-(dy * dy) / 0.9));
    }
  }
  mistEl.style.opacity = (m * 0.6).toFixed(3);
};

function initFlight() {
  const heroTitle = $("[data-hero-title]");
  const heroWords = splitWords(heroTitle);
  const scenes = Object.fromEntries($$("[data-scene]").map((el) => [el.dataset.scene, el]));

  const tl = gsap.timeline({ defaults: { ease: "none" } });
  const fadeIn = (el, at, dur = 0.035) =>
    tl.fromTo(el, { autoAlpha: 0, y: 60, filter: "blur(10px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: dur }, at);
  const fadeOut = (el, at, dur = 0.035) => tl.to(el, { autoAlpha: 0, y: -60, filter: "blur(10px)", duration: dur }, at);

  // intro leaves as we start climbing
  tl.to(scenes.intro, { autoAlpha: 0, y: -80, scale: 0.96, filter: "blur(12px)", duration: 0.06 }, 0.02);
  fadeIn(scenes.c1, 0.11);
  fadeOut(scenes.c1, 0.22);
  fadeIn(scenes.c2, 0.27);
  fadeOut(scenes.c2, 0.36);
  tl.fromTo(scenes.c3, { autoAlpha: 0, scale: 0.85, filter: "blur(14px)" }, { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.05 }, 0.45);
  tl.to(scenes.c3, { autoAlpha: 0, scale: 1.15, filter: "blur(14px)", duration: 0.05 }, 0.57);

  // hero
  tl.set(scenes.hero, { autoAlpha: 1 }, 0.79);
  tl.fromTo($(".eyebrow", scenes.hero), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.03 }, 0.8);
  tl.fromTo(heroWords, { yPercent: 110 }, { yPercent: 0, duration: 0.05, stagger: 0.012 }, 0.81);
  tl.fromTo([$(".lede--hero"), $(".hero__ctas")], { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.04, stagger: 0.02 }, 0.9);
  tl.to({}, { duration: 0.04 }, 0.96); // hold at the end

  ScrollTrigger.create({
    trigger: "[data-flight]",
    start: "top top",
    end: "bottom bottom",
    scrub: reduceMotion ? true : 0.6,
    animation: tl,
    onUpdate: (self) => {
      scene.setProgress(self.progress);
      updateHud(self.progress);
    },
  });

  // HUD bows out after orbit
  gsap.to(hud, {
    autoAlpha: 0,
    y: 20,
    ease: "none",
    scrollTrigger: { trigger: "[data-flight]", start: "bottom 110%", end: "bottom 70%", scrub: true },
  });
}

/* ------------------------------------------------------------------ */
/* Post-flight atmosphere: veil, aurora, camera drift                  */
/* ------------------------------------------------------------------ */
function initAfterFlight() {
  ScrollTrigger.create({
    trigger: "#manifesto",
    start: "top bottom",
    endTrigger: "#launch",
    end: "bottom bottom",
    onUpdate: (self) => scene.setAfter(self.progress),
  });
  gsap.fromTo(
    "[data-veil]",
    { autoAlpha: 0 },
    { autoAlpha: 1, ease: "none", scrollTrigger: { trigger: "#manifesto", start: "top bottom", end: "top 20%", scrub: true } }
  );
  gsap.fromTo(
    "[data-aurora]",
    { autoAlpha: 0 },
    { autoAlpha: 0.85, ease: "none", scrollTrigger: { trigger: "#manifesto", start: "top 80%", end: "top top", scrub: true } }
  );
}

/* ------------------------------------------------------------------ */
/* Manifesto: words light up as you read                               */
/* ------------------------------------------------------------------ */
function initManifesto() {
  const el = $("[data-scrub-words]");
  const words = splitWords(el, "sw");
  if (reduceMotion) {
    gsap.set(words, { opacity: 1 });
    return;
  }
  gsap.to(words, {
    opacity: 1,
    stagger: 0.1,
    ease: "none",
    scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 35%", scrub: 0.8 },
  });
  gsap.fromTo(el, { y: 80 }, { y: -40, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 } });
}

/* ------------------------------------------------------------------ */
/* Reveals                                                             */
/* ------------------------------------------------------------------ */
function initReveals() {
  if (reduceMotion) return;
  $$("[data-split]").forEach((el) => {
    const words = splitWords(el);
    gsap.fromTo(
      words,
      { yPercent: 115 },
      { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.06, scrollTrigger: { trigger: el, start: "top 85%", once: true } }
    );
  });
  $$("[data-reveal]").forEach((el) => {
    gsap.fromTo(
      el,
      { y: 40, autoAlpha: 0, filter: "blur(8px)" },
      {
        y: 0,
        autoAlpha: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power4.out",
        delay: (Array.from(el.parentElement.children).indexOf(el) % 5) * 0.06,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      }
    );
  });
}

/* ------------------------------------------------------------------ */
/* Sticky card stack                                                   */
/* ------------------------------------------------------------------ */
function initStack() {
  if (reduceMotion) return;
  const cards = $$("[data-card]");
  cards.forEach((card, i) => {
    const next = cards[i + 1];
    if (!next) return;
    gsap.to(card, {
      scale: 0.9 + i * 0.02,
      filter: "brightness(0.5)",
      y: -30,
      ease: "none",
      scrollTrigger: { trigger: next, start: "top 85%", end: "top 14%", scrub: true, invalidateOnRefresh: true },
    });
  });
}

/* ------------------------------------------------------------------ */
/* Missions: pinned horizontal travel                                  */
/* ------------------------------------------------------------------ */
function initMissions() {
  const track = $("[data-track]");
  const bar = $("[data-mission-bar]");
  const idx = $("[data-mission-index]");
  const items = $$(".mission", track);
  const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

  const tween = gsap.to(track, {
    x: () => -distance(),
    ease: "none",
    scrollTrigger: {
      trigger: "[data-missions]",
      start: "top top",
      end: () => "+=" + distance(),
      pin: ".missions__pin",
      scrub: reduceMotion ? true : 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        bar.style.transform = `scaleX(${self.progress})`;
        idx.textContent = String(Math.min(items.length, Math.floor(self.progress * items.length) + 1)).padStart(2, "0");
      },
    },
  });

  if (reduceMotion) return;
  items.forEach((item) => {
    const vis = $(".mission__visual", item);
    gsap.fromTo(
      vis,
      { scale: 0.86, rotate: 2 },
      {
        scale: 1,
        rotate: 0,
        ease: "none",
        scrollTrigger: { trigger: item, containerAnimation: tween, start: "left right", end: "center center", scrub: true },
      }
    );
    gsap.fromTo(
      $(".planet", item),
      { xPercent: -80 },
      { xPercent: -20, ease: "none", scrollTrigger: { trigger: item, containerAnimation: tween, start: "left right", end: "right left", scrub: true } }
    );
  });
}

/* ------------------------------------------------------------------ */
/* Counters                                                            */
/* ------------------------------------------------------------------ */
function initCounters() {
  $$("[data-count]").forEach((el) => {
    const end = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    if (reduceMotion) {
      el.textContent = end + suffix;
      return;
    }
    const o = { v: 0 };
    gsap.to(o, {
      v: end,
      duration: 2.2,
      ease: "power3.out",
      onUpdate: () => (el.textContent = Math.round(o.v) + suffix),
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
  });
}

/* ------------------------------------------------------------------ */
/* Launch title parallax                                               */
/* ------------------------------------------------------------------ */
function initLaunch() {
  if (reduceMotion) return;
  gsap.fromTo(
    ".launch__title",
    { scale: 0.9, transformOrigin: "left bottom" },
    { scale: 1, ease: "none", scrollTrigger: { trigger: "[data-launch]", start: "top bottom", end: "center center", scrub: 1 } }
  );
}

/* ------------------------------------------------------------------ */
/* Cursor + magnetic buttons                                           */
/* ------------------------------------------------------------------ */
function initCursor() {
  if (!finePointer || reduceMotion) return;
  const cursor = $("[data-cursor]");
  const dot = $(".cursor__dot", cursor);
  const ring = $(".cursor__ring", cursor);
  const dx = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
  const dy = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
  const rx = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
  const ry = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });
  window.addEventListener("pointermove", (e) => {
    dx(e.clientX);
    dy(e.clientY);
    rx(e.clientX);
    ry(e.clientY);
  });
  $$("a, button, .swatch").forEach((el) => {
    el.addEventListener("pointerenter", () => cursor.classList.add("is-hover"));
    el.addEventListener("pointerleave", () => cursor.classList.remove("is-hover"));
  });

  $$("[data-magnetic]").forEach((el) => {
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
    });
    el.addEventListener("pointerleave", () => {
      xTo(0);
      yTo(0);
    });
  });
}

/* ------------------------------------------------------------------ */
/* Small details                                                       */
/* ------------------------------------------------------------------ */
function initDetails() {
  $$(".swatch").forEach((s) =>
    s.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(s.dataset.copy);
      } catch {
        /* clipboard unavailable — still show feedback */
      }
      s.classList.add("is-copied");
      setTimeout(() => s.classList.remove("is-copied"), 1400);
    })
  );
  const clock = $("[data-clock]");
  const tick = () => {
    const d = new Date();
    clock.textContent = "UTC " + d.toISOString().slice(11, 19);
  };
  tick();
  setInterval(tick, 1000);
}

/* ------------------------------------------------------------------ */
/* Preloader → boot                                                    */
/* ------------------------------------------------------------------ */
function runPreloader() {
  const loader = $("[data-preloader]");
  const minTime = reduceMotion ? 0 : 1.6;
  const start = performance.now();
  let done = false;
  scene.loaded.then(() => (done = true));
  // safety: never block longer than 8s
  setTimeout(() => (done = true), 8000);

  return new Promise((resolve) => {
    const step = () => {
      const elapsed = (performance.now() - start) / 1000;
      const timeCap = Math.min(1, elapsed / minTime || 1);
      const target = done ? Math.min(1, timeCap) : Math.min(loadState.real, timeCap, 0.96);
      loadState.shown += (target - loadState.shown) * 0.12;
      if (target - loadState.shown < 0.002) loadState.shown = target;
      const pct = Math.round(loadState.shown * 100);
      countEl.textContent = String(pct).padStart(3, "0");
      barEl.style.transform = `scaleX(${loadState.shown})`;
      if (pct > 60) statusEl.textContent = "Systems nominal";
      if (loadState.shown >= 1) {
        statusEl.textContent = "Go for launch";
        const tl = gsap.timeline({
          onComplete: () => {
            loader.remove();
            resolve();
          },
        });
        tl.to(".preloader__count, .preloader__top, .preloader__bottom", { autoAlpha: 0, y: -30, duration: 0.6, ease: "power3.in", stagger: 0.05 }, 0.25).to(
          loader,
          { yPercent: -100, duration: 1.1, ease: "power4.inOut" },
          0.6
        ).add(introAnimation, 0.85);
        return;
      }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

function introAnimation() {
  if (reduceMotion) return;
  const intro = $('[data-scene="intro"]');
  const title = $(".display", intro);
  const words = splitWords(title);
  gsap
    .timeline({ defaults: { ease: "power4.out" } })
    .from(".nav > *", { y: -24, autoAlpha: 0, duration: 1, stagger: 0.08 })
    .from($(".eyebrow", intro), { y: 20, autoAlpha: 0, duration: 0.9 }, 0.1)
    .from(words, { yPercent: 115, duration: 1.4, stagger: 0.1 }, 0.15)
    .from([$(".lede", intro), $(".scrollcue", intro)], { y: 24, autoAlpha: 0, duration: 1, stagger: 0.1 }, 0.55)
    .from(".hud__readout, .hud__gauge", { autoAlpha: 0, y: 20, duration: 1, stagger: 0.1 }, 0.6);
}

initFlight();
initAfterFlight();
initManifesto();
initReveals();
initStack();
initMissions();
initCounters();
initLaunch();
initCursor();
initDetails();

runPreloader().then(() => {
  if (lenis) lenis.start();
  ScrollTrigger.refresh();
});

document.fonts?.ready.then(() => ScrollTrigger.refresh());
window.addEventListener("load", () => ScrollTrigger.refresh());
