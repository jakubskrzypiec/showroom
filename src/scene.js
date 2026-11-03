import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

/* ------------------------------------------------------------------ */
/*  Palette (from the brand board)                                     */
/* ------------------------------------------------------------------ */
const C = {
  bg: new THREE.Color("#040811"),
  cobalt: new THREE.Color("#1B54FF"),
  cyan: new THREE.Color("#83F9FF"),
  amber: new THREE.Color("#FEB122"),
  violet: new THREE.Color("#3D2BFF"),
  white: new THREE.Color("#FFFFFF"),
};

const EARTH_R = 50;
const EARTH_CENTER = new THREE.Vector3(0, -EARTH_R, 0);
const CLOUD_LAYERS = [3, 5.5, 8.5, 12, 16];

const isMobile = window.matchMedia("(max-width: 760px)").matches;

/* shared GLSL noise ------------------------------------------------- */
const NOISE = /* glsl */ `
  float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    float a = hash(i), b = hash(i+vec2(1.,0.)), c = hash(i+vec2(0.,1.)), d = hash(i+vec2(1.,1.));
    vec2 u = f*f*(3.-2.*f);
    return mix(a,b,u.x) + (c-a)*u.y*(1.-u.x) + (d-b)*u.x*u.y;
  }
  float fbm(vec2 p){
    float v = 0.; float a = .5;
    for(int i=0;i<${isMobile ? 4 : 5};i++){ v += a*noise(p); p *= 2.03; a *= .5; }
    return v;
  }
`;

/* ------------------------------------------------------------------ */
/*  Camera path: keyframes over the flight progress p (0..1)           */
/* ------------------------------------------------------------------ */
const KEYS = [
  // p,    position,                       look target
  [0.0, new THREE.Vector3(0, 0.4, 0), new THREE.Vector3(0, 7, -12)],
  [0.18, new THREE.Vector3(0, 7, -1), new THREE.Vector3(0, 16, -13)],
  [0.36, new THREE.Vector3(0, 21, -2), new THREE.Vector3(0, 30, -14)],
  [0.5, new THREE.Vector3(0, 34, 6), new THREE.Vector3(0, 6, -60)],
  [0.62, new THREE.Vector3(6, 48, 70), new THREE.Vector3(0, -22, -20)],
  [0.8, new THREE.Vector3(10, 2, 160), new THREE.Vector3(0, -48, 0)],
  [1.0, new THREE.Vector3(-30, -16, 182), new THREE.Vector3(-30, -50, 0)],
];
const posCurve = new THREE.CatmullRomCurve3(KEYS.map((k) => k[1]), false, "centripetal");
const tgtCurve = new THREE.CatmullRomCurve3(KEYS.map((k) => k[2]), false, "centripetal");

function pToCurveT(p) {
  // piecewise-linear remap so each keyframe lands on its p value
  const n = KEYS.length - 1;
  for (let i = 0; i < n; i++) {
    const a = KEYS[i][0];
    const b = KEYS[i + 1][0];
    if (p <= b) {
      const local = (p - a) / (b - a);
      const s = local * local * (3 - 2 * local); // ease within segment
      return (i + s) / n;
    }
  }
  return 1;
}

const smooth = (e0, e1, x) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

/* ------------------------------------------------------------------ */
export function createScene(canvas, { onProgress } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance" });
  const DPR = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 1.75);
  renderer.setPixelRatio(DPR);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(C.bg);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.05, 4000);

  const sunDir = new THREE.Vector3(1.0, 0.32, -0.42).normalize();

  /* ---------------- loading ---------------- */
  const manager = new THREE.LoadingManager();
  manager.onProgress = (_url, loaded, total) => onProgress && onProgress(loaded / total);
  const loaded = new Promise((res) => {
    manager.onLoad = res;
    manager.onError = res;
  });
  const loader = new THREE.TextureLoader(manager);
  const base = import.meta.env.BASE_URL;
  const tex = (name, srgb) => {
    const t = loader.load(`${base}textures/${name}`);
    if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  };
  const dayMap = tex("earth_atmos_2048.jpg", true);
  const nightMap = tex("earth_lights_2048.png", true);
  const specMap = tex("earth_specular_2048.jpg", false);
  const cloudMap = tex("earth_clouds_1024.jpg", false);
  cloudMap.wrapS = THREE.RepeatWrapping;

  /* ---------------- sky dome ---------------- */
  const skyUniforms = {
    uSpace: { value: 0 },
    uTime: { value: 0 },
    uSun: { value: sunDir },
    uBg: { value: C.bg },
    uCobalt: { value: C.cobalt },
    uViolet: { value: C.violet },
    uCyan: { value: C.cyan },
    uAmber: { value: C.amber },
  };
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(1500, 48, 32),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: skyUniforms,
      vertexShader: /* glsl */ `
        varying vec3 vDir;
        void main(){
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        uniform float uSpace, uTime;
        uniform vec3 uSun, uBg, uCobalt, uViolet, uCyan, uAmber;
        varying vec3 vDir;
        ${NOISE}
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
        }`,
    })
  );
  sky.renderOrder = -10;
  scene.add(sky);

  /* ---------------- stars ---------------- */
  const STAR_COUNT = isMobile ? 2600 : 5200;
  const starGeo = new THREE.BufferGeometry();
  const sp = new Float32Array(STAR_COUNT * 3);
  const sc = new Float32Array(STAR_COUNT * 3);
  const ss = new Float32Array(STAR_COUNT);
  const sph = new Float32Array(STAR_COUNT);
  const tmp = new THREE.Vector3();
  for (let i = 0; i < STAR_COUNT; i++) {
    tmp.randomDirection().multiplyScalar(1200);
    sp.set([tmp.x, tmp.y, tmp.z], i * 3);
    const r = Math.random();
    const col = r < 0.06 ? C.amber : r < 0.22 ? C.cyan : r < 0.32 ? new THREE.Color("#9fb6ff") : C.white;
    sc.set([col.r, col.g, col.b], i * 3);
    ss[i] = Math.pow(Math.random(), 4) * 3.2 + 0.7;
    sph[i] = Math.random() * 6.28;
  }
  starGeo.setAttribute("position", new THREE.BufferAttribute(sp, 3));
  starGeo.setAttribute("color", new THREE.BufferAttribute(sc, 3));
  starGeo.setAttribute("size", new THREE.BufferAttribute(ss, 1));
  starGeo.setAttribute("phase", new THREE.BufferAttribute(sph, 1));
  const starUniforms = { uTime: { value: 0 }, uAlpha: { value: 0.5 }, uDpr: { value: DPR } };
  const stars = new THREE.Points(
    starGeo,
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: starUniforms,
      vertexShader: /* glsl */ `
        attribute float size; attribute float phase; attribute vec3 color;
        uniform float uTime, uDpr;
        varying vec3 vColor; varying float vTw;
        void main(){
          vColor = color;
          vTw = 0.55 + 0.45 * sin(uTime * (0.6 + phase * 0.3) + phase * 10.0);
          gl_PointSize = size * uDpr * (0.8 + 0.4 * vTw);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        uniform float uAlpha;
        varying vec3 vColor; varying float vTw;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          a = a * a;
          gl_FragColor = vec4(vColor * a * vTw * uAlpha * 1.6, 1.0);
        }`,
    })
  );
  stars.renderOrder = -9;
  scene.add(stars);

  /* ---------------- sun glare ---------------- */
  const glareMat = new THREE.SpriteMaterial({
    map: makeGlareTexture(),
    color: 0xffffff,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: true,
    opacity: 0,
  });
  const glare = new THREE.Sprite(glareMat);
  glare.scale.setScalar(200);
  scene.add(glare);

  /* ---------------- cloud layers ---------------- */
  const cloudUniformsShared = { uTime: { value: 0 }, uFade: { value: 1 }, uCamPos: { value: new THREE.Vector3() } };
  const clouds = CLOUD_LAYERS.map((y, i) => {
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        ...cloudUniformsShared,
        uY: { value: y },
        uSeed: { value: i * 17.3 },
        uLow: { value: C.cobalt.clone().lerp(C.violet, 0.4).multiplyScalar(0.55) },
        uHigh: { value: new THREE.Color("#7f9dff") },
        uCyan: { value: C.cyan },
      },
      vertexShader: /* glsl */ `
        varying vec3 vWorld;
        void main(){
          vec4 w = modelMatrix * vec4(position, 1.0);
          vWorld = w.xyz;
          gl_Position = projectionMatrix * viewMatrix * w;
        }`,
      fragmentShader: /* glsl */ `
        uniform float uTime, uFade, uY, uSeed;
        uniform vec3 uCamPos, uLow, uHigh, uCyan;
        varying vec3 vWorld;
        ${NOISE}
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
        }`,
    });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(420, 420, 1, 1), mat);
    m.rotation.x = -Math.PI / 2;
    m.position.y = y;
    m.renderOrder = -5 + i;
    scene.add(m);
    return m;
  });

  /* ---------------- speed streaks ---------------- */
  const STREAKS = isMobile ? 140 : 260;
  const streakPos = new Float32Array(STREAKS * 6);
  const streakSeeds = Array.from({ length: STREAKS }, () => ({
    a: Math.random() * Math.PI * 2,
    r: 1.6 + Math.random() * 9,
    y: Math.random() * 40,
  }));
  const streakGeo = new THREE.BufferGeometry();
  streakGeo.setAttribute("position", new THREE.BufferAttribute(streakPos, 3));
  const streakMat = new THREE.LineBasicMaterial({
    color: C.cyan,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const streaks = new THREE.LineSegments(streakGeo, streakMat);
  streaks.frustumCulled = false;
  scene.add(streaks);

  /* ---------------- earth ---------------- */
  const earthPivot = new THREE.Group(); // orientation so Poland faces up at breakout
  earthPivot.position.copy(EARTH_CENTER);
  scene.add(earthPivot);
  const earthSpin = new THREE.Group(); // spins around the planet's own axis
  earthPivot.add(earthSpin);

  // lat/lon -> local position (matches SphereGeometry UV layout)
  const latLon = (lat, lon) => {
    const phi = ((90 - lat) * Math.PI) / 180;
    const theta = ((lon + 180) * Math.PI) / 180;
    return new THREE.Vector3(-Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta));
  };
  earthPivot.quaternion.setFromUnitVectors(latLon(52.2, 19.4), new THREE.Vector3(0, 1, 0));

  const earthUniforms = {
    uDay: { value: dayMap },
    uNight: { value: nightMap },
    uSpec: { value: specMap },
    uClouds: { value: cloudMap },
    uSun: { value: sunDir },
    uTime: { value: 0 },
    uCloudShift: { value: 0 },
    uCobalt: { value: C.cobalt },
    uCyan: { value: C.cyan },
    uAmber: { value: C.amber },
    uBg: { value: C.bg },
  };
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(EARTH_R, 128, 96),
    new THREE.ShaderMaterial({
      uniforms: earthUniforms,
      vertexShader: /* glsl */ `
        varying vec2 vUv; varying vec3 vN; varying vec3 vW;
        void main(){
          vUv = uv;
          vN = normalize(mat3(modelMatrix) * normal);
          vec4 w = modelMatrix * vec4(position, 1.0);
          vW = w.xyz;
          gl_Position = projectionMatrix * viewMatrix * w;
        }`,
      fragmentShader: /* glsl */ `
        uniform sampler2D uDay, uNight, uSpec, uClouds;
        uniform vec3 uSun, uCobalt, uCyan, uAmber, uBg;
        uniform float uCloudShift;
        varying vec2 vUv; varying vec3 vN; varying vec3 vW;
        void main(){
          vec3 n = normalize(vN);
          vec3 v = normalize(cameraPosition - vW);
          float ndl = dot(n, uSun);
          float dayF = smoothstep(-0.18, 0.35, ndl);

          vec3 day = texture2D(uDay, vUv).rgb;
          float lum = dot(day, vec3(0.299, 0.587, 0.114));
          float ocean = texture2D(uSpec, vUv).r;
          // colour-grade toward the cobalt palette
          // colour-grade toward the cobalt palette (cool shadows, cyan highlights)
          vec3 tint = mix(vec3(0.55, 0.72, 1.3), vec3(0.85, 1.05, 1.15), smoothstep(0.1, 0.5, lum));
          vec3 surf = day * tint;
          surf = mix(surf, uCobalt * 0.16 + uBg * 0.6, ocean * 0.6);

          // clouds
          float cl = texture2D(uClouds, vUv + vec2(uCloudShift, 0.0)).r;
          vec3 lit = surf * (0.04 + 0.95 * dayF);
          lit = mix(lit, vec3(0.78, 0.86, 1.0) * (0.03 + 0.78 * dayF), cl * 0.8);

          // ocean sun glint
          vec3 h = normalize(uSun + v);
          float spec = pow(max(dot(n, h), 0.0), 60.0) * ocean * (1.0 - cl) * dayF;
          lit += (uAmber * 0.5 + vec3(0.5)) * spec * 0.9;

          // city lights on the night side
          vec3 night = texture2D(uNight, vUv).rgb;
          float nl = dot(night, vec3(0.333));
          lit += uAmber * pow(nl, 1.4) * 2.6 * (1.0 - dayF) * (1.0 - cl * 0.7);

          // inner atmospheric rim
          float fres = pow(1.0 - max(dot(n, v), 0.0), 2.6);
          vec3 rim = mix(uCobalt, uCyan, smoothstep(-0.2, 0.6, ndl));
          lit += rim * fres * (0.2 + 0.7 * smoothstep(-0.4, 0.5, ndl));
          // terminator glow
          lit += uAmber * 0.35 * exp(-pow(ndl * 7.0, 2.0)) * (1.0 - fres) * 0.6;

          gl_FragColor = vec4(lit, 1.0);
        }`,
    })
  );
  earthSpin.add(earth);

  // outer atmosphere halo
  const atmo = new THREE.Mesh(
    new THREE.SphereGeometry(EARTH_R * 1.085, 96, 64),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uSun: { value: sunDir }, uCobalt: { value: C.cobalt }, uCyan: { value: C.cyan }, uViolet: { value: C.violet }, uCenter: { value: EARTH_CENTER } },
      vertexShader: /* glsl */ `
        varying vec3 vN; varying vec3 vW;
        void main(){
          vN = normalize(mat3(modelMatrix) * normal);
          vec4 w = modelMatrix * vec4(position, 1.0);
          vW = w.xyz;
          gl_Position = projectionMatrix * viewMatrix * w;
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uSun, uCobalt, uCyan, uViolet, uCenter;
        varying vec3 vN; varying vec3 vW;
        void main(){
          vec3 v = normalize(cameraPosition - vW);
          vec3 n = normalize(vN);
          float rim = pow(clamp(0.78 + dot(n, v), 0.0, 1.0), 5.0);
          float sunSide = smoothstep(-0.5, 0.6, dot(normalize(vW - uCenter), uSun));
          vec3 col = mix(uViolet * 0.8, mix(uCobalt, uCyan, 0.45), sunSide);
          gl_FragColor = vec4(col * rim * (0.45 + 0.8 * sunSide), 1.0);
        }`,
    })
  );
  atmo.position.copy(EARTH_CENTER);
  scene.add(atmo);

  // orbit rings (appear around the globe at the end of the flight)
  const rings = new THREE.Group();
  rings.position.copy(EARTH_CENTER);
  const ringMats = [];
  [1.32, 1.55, 1.9].forEach((k, i) => {
    const curve = new THREE.EllipseCurve(0, 0, EARTH_R * k, EARTH_R * k, 0, Math.PI * 2);
    const pts = curve.getPoints(256).map((p) => new THREE.Vector3(p.x, 0, p.y));
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    const m = new THREE.LineDashedMaterial({
      color: i === 1 ? C.amber : C.cyan,
      dashSize: i === 1 ? 2 : 1.2,
      gapSize: i === 1 ? 3.5 : 2.6,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const line = new THREE.Line(g, m);
    line.computeLineDistances();
    line.rotation.set(0.35 + i * 0.32, i * 0.9, -0.25 + i * 0.18);
    ringMats.push(m);
    rings.add(line);

    // satellite riding each ring
    const sat = new THREE.Mesh(
      new THREE.SphereGeometry(0.9, 12, 12),
      new THREE.MeshBasicMaterial({ color: i === 1 ? C.amber : C.cyan, transparent: true, opacity: 0 })
    );
    sat.userData = { r: EARTH_R * k, speed: 0.12 + i * 0.05, off: i * 2.1 };
    line.add(sat);
    ringMats.push(sat.material);
  });
  scene.add(rings);

  /* ---------------- post-processing ---------------- */
  const composer = new EffectComposer(renderer);
  composer.setPixelRatio(DPR);
  composer.setSize(window.innerWidth, window.innerHeight);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.5, 0.6, 0.82);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  /* ---------------- state ---------------- */
  const state = {
    target: 0, // flight progress from scroll
    p: 0, // smoothed flight progress
    after: 0, // progress through post-flight content
    afterS: 0,
    mouse: new THREE.Vector2(),
    mouseS: new THREE.Vector2(),
    spin: 0,
    running: true,
  };

  const camPos = new THREE.Vector3();
  const camTgt = new THREE.Vector3();
  const prevCam = new THREE.Vector3();
  const clock = new THREE.Timer();

  function frame() {
    if (!state.running) return;
    clock.update();
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.getElapsed();

    state.p += (state.target - state.p) * Math.min(1, dt * 5.5);
    state.afterS += (state.after - state.afterS) * Math.min(1, dt * 4);
    state.mouseS.lerp(state.mouse, Math.min(1, dt * 3));
    const p = state.p;

    // camera along the path
    const ct = pToCurveT(p);
    posCurve.getPoint(ct, camPos);
    tgtCurve.getPoint(ct, camTgt);

    // post-flight drift: slowly orbit wider so content reads over the planet
    const a = state.afterS;
    camPos.x += -a * 40;
    camPos.y += a * 26;
    camPos.z += a * 60;
    camTgt.x += -a * 18;

    // subtle pointer parallax (stronger in space)
    const par = 0.6 + smooth(0.5, 1, p) * 5;
    camPos.x += state.mouseS.x * par;
    camPos.y += state.mouseS.y * par * 0.6;
    // a little handheld drift
    camPos.x += Math.sin(t * 0.35) * 0.12;
    camPos.y += Math.cos(t * 0.27) * 0.1;

    camera.position.copy(camPos);
    camera.lookAt(camTgt);
    // gentle roll during the climb
    camera.rotateZ(Math.sin(p * Math.PI * 2) * 0.05 * (1 - smooth(0.5, 0.8, p)));

    const speed = camPos.distanceTo(prevCam) / Math.max(dt, 0.001);
    prevCam.copy(camPos);

    // atmosphere -> space
    const space = smooth(0.2, 0.52, p);
    skyUniforms.uSpace.value = space;
    skyUniforms.uTime.value = t;
    sky.position.copy(camPos);
    stars.position.copy(camPos);
    starUniforms.uTime.value = t;
    starUniforms.uAlpha.value = 0.55 + space * 0.6;

    // clouds
    cloudUniformsShared.uTime.value = t;
    cloudUniformsShared.uCamPos.value.copy(camPos);
    cloudUniformsShared.uFade.value = 1 - smooth(0.4, 0.5, p);
    clouds.forEach((c) => (c.visible = p < 0.52));

    // streaks: tied to climb speed during the ascent
    const climb = 1 - smooth(0.4, 0.5, p);
    const sAmt = Math.min(1, speed / 26) * climb;
    streakMat.opacity = sAmt * 0.55;
    streaks.visible = sAmt > 0.01;
    if (streaks.visible) {
      const len = 0.4 + sAmt * 4.5;
      for (let i = 0; i < STREAKS; i++) {
        const s = streakSeeds[i];
        s.y -= dt * (6 + sAmt * 60);
        if (s.y < -6) s.y += 46;
        const x = camPos.x + Math.cos(s.a) * s.r;
        const z = camPos.z + Math.sin(s.a) * s.r - 4;
        const y = camPos.y + s.y;
        streakPos.set([x, y, z, x, y + len, z], i * 6);
      }
      streakGeo.attributes.position.needsUpdate = true;
    }

    // earth spin: scroll-driven after breakout + slow idle rotation once in orbit
    state.spin += dt * 0.035 * smooth(0.55, 0.8, p);
    earthSpin.rotation.y = smooth(0.5, 1, p) * 2.2 + state.spin + a * 0.8;
    earthUniforms.uCloudShift.value = t * 0.002;
    earthUniforms.uTime.value = t;

    // rings + satellites
    const ringA = smooth(0.78, 0.95, p) * (1 - a * 0.5);
    rings.rotation.y = t * 0.04;
    rings.children.forEach((line, i) => {
      line.material.opacity = ringA * (i === 1 ? 0.75 : 0.5);
      const sat = line.children[0];
      const ang = t * sat.userData.speed + sat.userData.off;
      sat.position.set(Math.cos(ang) * sat.userData.r, 0, Math.sin(ang) * sat.userData.r);
      sat.material.opacity = ringA;
    });

    // sun glare
    glare.position.copy(camPos).addScaledVector(sunDir, 900);
    glareMat.opacity = 0.12 + space * 0.4;

    bloom.strength = 0.4 + space * 0.3;

    composer.render();
    if (state.onFrame) state.onFrame({ p, speed, camY: camPos.y, layers: CLOUD_LAYERS });
    requestAnimationFrame(frame);
  }

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    // keep the globe framed on portrait screens
    camera.fov = w / h < 0.8 ? 66 : 50;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    composer.setSize(w, h);
    bloom.resolution.set(w, h);
  }
  window.addEventListener("resize", resize);
  resize();

  window.addEventListener("pointermove", (e) => {
    state.mouse.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      state.running = false;
    } else if (!state.running) {
      state.running = true;
      clock.update();
      requestAnimationFrame(frame);
    }
  });

  // render the very first frame so the canvas isn't blank behind the preloader
  requestAnimationFrame(frame);

  return {
    loaded,
    setProgress: (v) => (state.target = v),
    setAfter: (v) => (state.after = v),
    set onFrame(fn) {
      state.onFrame = fn;
    },
  };
}

function makeGlareTexture() {
  const s = 256;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const g = c.getContext("2d");
  const grd = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.06, "rgba(255,236,190,0.9)");
  grd.addColorStop(0.18, "rgba(254,177,34,0.28)");
  grd.addColorStop(0.45, "rgba(27,84,255,0.08)");
  grd.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, s, s);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
