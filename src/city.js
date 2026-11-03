import * as THREE from "three";

/*
 * Night-time Katowice at street scale, built around the world origin
 * (the point where Katowice sits on top of the globe).
 *  - ground with a sodium-lit street grid fading into the horizon
 *  - instanced blocks in three facade types, towers with setbacks
 *  - traffic: head and tail lights running along the streets
 *  - a saucer arena on legs (a nod to the Spodek) and a tall tower
 *  - the studio: a room with a desk and a computer, behind one window
 *    that looks down the boulevard. The flight starts and ends here.
 */

export const STUDIO = {
  pos: new THREE.Vector3(0, 0, 16),
  size: new THREE.Vector3(4.2, 7.5, 3),
  windowY: 2.4,
};
// the facade with the window faces the boulevard (-z)
STUDIO.front = STUDIO.pos.z - STUDIO.size.z / 2;

const ROOM = {
  x: 1.95, // half width
  z0: STUDIO.front + 0.05,
  z1: STUDIO.pos.z + STUDIO.size.z / 2 - 0.15,
  y0: 1.75,
  y1: 3.15,
  win: { w: 1.6, h: 1.0 },
};

const hash = (x) => {
  const s = Math.sin(x * 127.1) * 43758.5453;
  return s - Math.floor(s);
};

export function createCity({ horizon, cobalt, cyan, amber, bg }) {
  const group = new THREE.Group();
  const timeUniform = { value: 0 };

  /* ---------------- ground ---------------- */
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(420, 96),
    new THREE.ShaderMaterial({
      uniforms: { uHorizon: { value: horizon }, uAmber: { value: amber }, uCobalt: { value: cobalt }, uBg: { value: bg } },
      vertexShader: /* glsl */ `
        varying vec3 vW;
        void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
      fragmentShader: /* glsl */ `
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
        }`,
    })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = 0.002;
  group.add(ground);

  /* ---------------- buildings ---------------- */
  const blocks = []; // [x, y0, z, w, h, d, seed, type]
  const blocked = (x, z) => Math.abs(x) < 4.6 && z > -12.5 && z < 22;
  const spodek = new THREE.Vector3(-9, 0, -24);
  const tower = new THREE.Vector3(8, 0, -28);
  for (let gx = -40; gx <= 40; gx++) {
    for (let gz = -40; gz <= 34; gz++) {
      const seed = hash(gx * 31.7 + gz * 17.3);
      if (seed < 0.3) continue;
      const x = gx * 2.6 + (hash(gx + gz * 3.1) - 0.5) * 0.5;
      const z = gz * 2.6 + (hash(gz + gx * 5.7) - 0.5) * 0.5;
      if (blocked(x, z)) continue;
      if (Math.hypot(x - spodek.x, z - spodek.z) < 6.5) continue;
      if (Math.hypot(x - STUDIO.pos.x, z - STUDIO.pos.z) < 4.4) continue;
      if (Math.hypot(x - tower.x, z - tower.z) < 3) continue;
      const r = Math.hypot(x, z + 10);
      if (r > 105) continue;
      const downtown = Math.exp(-r / 26);
      const h = 0.45 + Math.pow(hash(seed * 91.3), 2.3) * (1.4 + downtown * 6.5);
      const w = 1.15 + hash(seed * 7.1) * 0.95;
      const d = 1.15 + hash(seed * 3.3) * 0.95;
      const type = hash(seed * 13.7) * (0.6 + downtown * 0.6);
      blocks.push([x, 0, z, w, h, d, seed, type]);
      // taller blocks get a setback crown
      if (h > 3.2 && hash(seed * 5.9) > 0.35) {
        const h2 = h * (0.25 + hash(seed * 2.3) * 0.35);
        blocks.push([x, h, z, w * 0.68, h2, d * 0.68, seed + 0.37, type]);
      }
    }
  }
  // landmarks: a glass high-rise with a crown, its smaller sibling, and the studio
  blocks.push([tower.x, 0, tower.z, 2.0, 10, 2.0, 0.77, 0.95]);
  blocks.push([tower.x, 10, tower.z, 1.4, 1.6, 1.4, 0.71, 0.95]);
  blocks.push([tower.x + 3.1, 0, tower.z + 1, 1.6, 6.2, 1.6, 0.31, 0.7]);
  blocks.push([STUDIO.pos.x, 0, STUDIO.pos.z, STUDIO.size.x, STUDIO.size.y, STUDIO.size.z, 0.5, 0.1]);

  const geo = new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);
  const aSeed = new Float32Array(blocks.length);
  const aType = new Float32Array(blocks.length);
  const aBase = new Float32Array(blocks.length);
  const mat = new THREE.ShaderMaterial({
    uniforms: { uTime: timeUniform, uHorizon: { value: horizon }, uAmber: { value: amber }, uCyan: { value: cyan }, uCobalt: { value: cobalt }, uBg: { value: bg } },
    vertexShader: /* glsl */ `
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
      }`,
    fragmentShader: /* glsl */ `
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
      }`,
  });
  const inst = new THREE.InstancedMesh(geo, mat, blocks.length);
  const m4 = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  blocks.forEach(([x, y0, z, w, h, d, s, type], i) => {
    m4.compose(new THREE.Vector3(x, y0, z), q, new THREE.Vector3(w, h, d));
    inst.setMatrixAt(i, m4);
    aSeed[i] = s;
    aType[i] = type;
    aBase[i] = y0;
  });
  geo.setAttribute("aSeed", new THREE.InstancedBufferAttribute(aSeed, 1));
  geo.setAttribute("aType", new THREE.InstancedBufferAttribute(aType, 1));
  geo.setAttribute("aBase", new THREE.InstancedBufferAttribute(aBase, 1));
  inst.frustumCulled = false;
  group.add(inst);

  /* ---------------- traffic ---------------- */
  const CARS = 900;
  const carGeo = new THREE.BufferGeometry();
  const cPos = new Float32Array(CARS * 3);
  const cData = new Float32Array(CARS * 4); // axis, lane coordinate, offset, speed (signed)
  for (let i = 0; i < CARS; i++) {
    const r = hash(i * 1.37);
    let axis, lane;
    if (i < 70) {
      // the boulevard: two lanes each way along z
      axis = 1;
      lane = [-2.6, -1.4, 1.4, 2.6][i % 4];
    } else {
      axis = r > 0.5 ? 1 : 0;
      lane = (Math.floor(hash(i * 3.11) * 60) - 30 + 0.5) * 2.6 + (hash(i * 7.7) > 0.5 ? 0.18 : -0.18);
    }
    const dir = lane > 0 ? 1 : -1;
    cData.set([axis, lane, hash(i * 9.1) * 220, dir * (2.5 + hash(i * 4.3) * 3.5)], i * 4);
  }
  carGeo.setAttribute("position", new THREE.BufferAttribute(cPos, 3));
  carGeo.setAttribute("aCar", new THREE.BufferAttribute(cData, 4));
  const cars = new THREE.Points(
    carGeo,
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: timeUniform, uAmber: { value: amber }, uHorizon: { value: horizon } },
      vertexShader: /* glsl */ `
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
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uAmber;
        varying float vHead; varying float vFade;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          vec3 c = mix(vec3(1.0, 0.12, 0.08), vec3(1.0, 0.92, 0.75), vHead);
          gl_FragColor = vec4(c * a * a * 1.4 * vFade, 1.0);
        }`,
    })
  );
  cars.frustumCulled = false;
  group.add(cars);

  /* ---------------- saucer arena (Spodek nod) ---------------- */
  const saucer = new THREE.Group();
  saucer.position.copy(spodek);
  const darkMat = new THREE.MeshBasicMaterial({ color: bg.clone().multiplyScalar(2.2), side: THREE.DoubleSide });
  const bowl = new THREE.Mesh(new THREE.CylinderGeometry(4.4, 1.6, 1.7, 72, 1, true), darkMat);
  bowl.position.y = 1.85;
  saucer.add(bowl);
  // facade ribs
  const ribs = new THREE.Mesh(
    new THREE.CylinderGeometry(4.41, 1.61, 1.7, 72, 1, true),
    new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: { uCobalt: { value: cobalt }, uCyan: { value: cyan } },
      vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: /* glsl */ `uniform vec3 uCobalt, uCyan; varying vec2 vUv;
        void main(){ float r = smoothstep(0.08, 0.0, abs(fract(vUv.x * 48.0) - 0.5) - 0.42);
          gl_FragColor = vec4(mix(uCobalt, uCyan, vUv.y) * r * 0.35 * vUv.y, 1.0); }`,
    })
  );
  ribs.position.y = 1.85;
  saucer.add(ribs);
  const lid = new THREE.Mesh(new THREE.CircleGeometry(4.4, 72), new THREE.MeshBasicMaterial({ color: bg.clone().multiplyScalar(1.6) }));
  lid.rotation.x = -Math.PI / 2;
  lid.position.y = 2.7;
  saucer.add(lid);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(4.4, 0.05, 8, 160), new THREE.MeshBasicMaterial({ color: cyan.clone().multiplyScalar(1.6) }));
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 2.7;
  saucer.add(rim);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.14, 1.4, 6), new THREE.MeshBasicMaterial({ color: bg.clone().multiplyScalar(2.8) }));
    leg.position.set(Math.cos(a) * 2.4, 0.62, Math.sin(a) * 2.4);
    leg.lookAt(Math.cos(a) * 6, 4, Math.sin(a) * 6);
    leg.rotateX(Math.PI / 2);
    saucer.add(leg);
  }
  group.add(saucer);

  // tower spire beacon
  const spire = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0.2, 0.15).multiplyScalar(2) }));
  spire.position.set(tower.x, 11.9, tower.z);
  group.add(spire);

  /* ---------------- studio window (outside) ---------------- */
  const winMat = new THREE.ShaderMaterial({
    uniforms: { uAmber: { value: amber }, uCyan: { value: cyan }, uPulse: { value: 0 } },
    vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uAmber, uCyan; uniform float uPulse;
      varying vec2 vUv;
      void main(){
        vec2 p = vUv - 0.5;
        float frame = step(0.47, max(abs(p.x), abs(p.y)));
        vec3 inside = mix(vec3(1.0, 0.92, 0.78), uAmber, smoothstep(0.0, 0.7, length(p * vec2(1.0, 1.6))));
        inside += uCyan * 0.25 * smoothstep(0.1, 0.4, p.x) * smoothstep(0.3, -0.1, p.y);
        vec3 col = mix(inside * (1.3 + uPulse * 0.6), vec3(0.03, 0.05, 0.12), frame);
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
  const studioWindow = new THREE.Mesh(new THREE.PlaneGeometry(ROOM.win.w, ROOM.win.h), winMat);
  studioWindow.position.set(0, STUDIO.windowY, STUDIO.front - 0.01);
  studioWindow.rotation.y = Math.PI; // faces the boulevard; invisible from inside the room
  group.add(studioWindow);
  const halo = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 3),
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uAmber: { value: amber } },
      vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: /* glsl */ `uniform vec3 uAmber; varying vec2 vUv;
        void main(){ float d = length((vUv - 0.5) * vec2(1.0, 1.35)); gl_FragColor = vec4(uAmber * smoothstep(0.5, 0.05, d) * 0.3, 1.0); }`,
    })
  );
  halo.position.set(0, STUDIO.windowY, STUDIO.front - 0.03);
  halo.rotation.y = Math.PI;
  group.add(halo);

  /* ---------------- the room ---------------- */
  const room = createRoom({ cobalt, cyan, amber, bg });
  group.add(room.group);

  function update(t, pulse = 0) {
    timeUniform.value = t;
    winMat.uniforms.uPulse.value = pulse;
    room.update(t);
  }

  return { group, update };
}

/* ================================================================== */
/*  The studio room                                                    */
/* ================================================================== */
function createRoom({ cobalt, cyan, amber, bg }) {
  const g = new THREE.Group();
  const { x: X, z0, z1, y0, y1, win } = ROOM;
  const midZ = (z0 + z1) / 2;
  const depth = z1 - z0;
  const lampPos = new THREE.Vector3(1.55, 2.62, 16.75);
  const screenPos = new THREE.Vector3(1.7, 2.42, 16.0);

  // one material for every surface: dark walls lit by the desk lamp, the monitor and the city outside
  const surf = new THREE.ShaderMaterial({
    uniforms: {
      uLamp: { value: lampPos },
      uScreen: { value: screenPos },
      uAmber: { value: amber },
      uCyan: { value: cyan },
      uCobalt: { value: cobalt },
      uBg: { value: bg },
      uZ0: { value: z0 },
    },
    vertexShader: /* glsl */ `
      varying vec3 vW; varying vec3 vN;
      void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; vN = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * viewMatrix * w; }`,
    fragmentShader: /* glsl */ `
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
      }`,
  });
  const plane = (w, h, pos, rotY = 0, rotX = 0) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), surf);
    m.position.copy(pos);
    m.rotation.set(rotX, rotY, 0, "YXZ");
    g.add(m);
    return m;
  };
  const H = y1 - y0;
  const midY = (y0 + y1) / 2;
  plane(2 * X, depth, new THREE.Vector3(0, y0, midZ), 0, -Math.PI / 2); // floor
  plane(2 * X, depth, new THREE.Vector3(0, y1, midZ), 0, Math.PI / 2); // ceiling
  plane(2 * X, H, new THREE.Vector3(0, midY, z1), Math.PI); // back wall
  plane(depth, H, new THREE.Vector3(-X, midY, midZ), Math.PI / 2); // left wall
  plane(depth, H, new THREE.Vector3(X, midY, midZ), -Math.PI / 2); // right wall
  // front wall around the window opening (faces into the room, +z)
  const wy0 = STUDIO.windowY - win.h / 2;
  const wy1 = STUDIO.windowY + win.h / 2;
  const sideW = X - win.w / 2;
  plane(sideW, H, new THREE.Vector3(-(win.w / 2 + sideW / 2), midY, z0));
  plane(sideW, H, new THREE.Vector3(win.w / 2 + sideW / 2, midY, z0));
  plane(win.w, y1 - wy1, new THREE.Vector3(0, (wy1 + y1) / 2, z0));
  plane(win.w, wy0 - y0, new THREE.Vector3(0, (y0 + wy0) / 2, z0));

  const box = (w, h, d, pos, color) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshBasicMaterial({ color }));
    m.position.copy(pos);
    g.add(m);
    return m;
  };
  const dark = bg.clone().multiplyScalar(3.2);
  const frameCol = new THREE.Color(0.02, 0.025, 0.04);

  // window frame + sill (no centre bar: the camera flies straight through)
  box(win.w + 0.08, 0.04, 0.08, new THREE.Vector3(0, wy1, z0), frameCol);
  box(win.w + 0.08, 0.05, 0.2, new THREE.Vector3(0, wy0 - 0.01, z0 + 0.06), new THREE.Color(0.06, 0.07, 0.1));
  box(0.04, win.h, 0.08, new THREE.Vector3(-win.w / 2, STUDIO.windowY, z0), frameCol);
  box(0.04, win.h, 0.08, new THREE.Vector3(win.w / 2, STUDIO.windowY, z0), frameCol);

  // desk against the right wall
  const deskTop = 2.12;
  box(0.6, 0.035, 1.5, new THREE.Vector3(1.62, deskTop, 16.1), new THREE.Color(0.075, 0.055, 0.045));
  box(0.56, deskTop - y0, 0.03, new THREE.Vector3(1.62, (deskTop + y0) / 2, 15.38), dark);
  box(0.56, deskTop - y0, 0.03, new THREE.Vector3(1.62, (deskTop + y0) / 2, 16.82), dark);
  // monitor
  const screenTex = makeScreenTexture();
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.66, 0.38), new THREE.MeshBasicMaterial({ map: screenTex, color: new THREE.Color(1.15, 1.15, 1.15) }));
  screen.position.copy(screenPos);
  screen.rotation.y = -Math.PI / 2;
  g.add(screen);
  box(0.025, 0.41, 0.69, new THREE.Vector3(screenPos.x + 0.016, screenPos.y, screenPos.z), new THREE.Color(0.015, 0.018, 0.03));
  box(0.03, 0.2, 0.05, new THREE.Vector3(screenPos.x + 0.04, deskTop + 0.1, screenPos.z), dark);
  box(0.14, 0.01, 0.2, new THREE.Vector3(screenPos.x + 0.02, deskTop + 0.02, screenPos.z), dark);
  // keyboard with a cobalt underglow, mouse, mug
  box(0.13, 0.012, 0.4, new THREE.Vector3(1.43, deskTop + 0.024, 16.05), new THREE.Color(0.03, 0.035, 0.06));
  box(0.135, 0.002, 0.405, new THREE.Vector3(1.43, deskTop + 0.019, 16.05), cobalt.clone().multiplyScalar(0.9));
  box(0.05, 0.015, 0.03, new THREE.Vector3(1.44, deskTop + 0.026, 16.38), new THREE.Color(0.04, 0.045, 0.07));
  const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.028, 0.07, 16), new THREE.MeshBasicMaterial({ color: amber.clone().multiplyScalar(0.5) }));
  mug.position.set(1.47, deskTop + 0.05, 15.62);
  g.add(mug);
  // desk lamp
  const lampMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.03, 0.035, 0.05) });
  const lb = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.02, 16), lampMat);
  lb.position.set(1.72, deskTop + 0.02, 16.72);
  g.add(lb);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.5, 8), lampMat);
  pole.position.set(1.66, deskTop + 0.26, 16.74);
  pole.rotation.z = 0.25;
  g.add(pole);
  const shade = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.09, 20, 1, true), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.04, 0.045, 0.06), side: THREE.DoubleSide }));
  shade.position.copy(lampPos).add(new THREE.Vector3(0, 0.03, 0));
  g.add(shade);
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.03, 12, 12), new THREE.MeshBasicMaterial({ color: new THREE.Color(1.0, 0.75, 0.4).multiplyScalar(2.5) }));
  bulb.position.copy(lampPos);
  g.add(bulb);
  // chair
  const chair = new THREE.Group();
  const chairCol = new THREE.Color(0.025, 0.03, 0.05);
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.04, 0.32), new THREE.MeshBasicMaterial({ color: chairCol }));
  seat.position.y = 1.98;
  const back = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.38, 0.32), new THREE.MeshBasicMaterial({ color: chairCol }));
  back.position.set(-0.17, 2.2, 0);
  const post = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.22, 0.03), new THREE.MeshBasicMaterial({ color: dark }));
  post.position.y = 1.86;
  chair.add(seat, back, post);
  chair.position.set(0.95, 0, 16.75);
  chair.rotation.y = -0.6;
  g.add(chair);
  // shelf with books on the left wall
  box(0.18, 0.02, 1.0, new THREE.Vector3(-X + 0.09, 2.62, 16.3), new THREE.Color(0.07, 0.05, 0.04));
  const bookCols = [cobalt, amber, cyan, new THREE.Color(0.8, 0.82, 0.9), new THREE.Color(0.25, 0.18, 0.9)];
  let bz = 15.85;
  for (let i = 0; i < 11; i++) {
    const w = 0.025 + hash(i * 3.3) * 0.03;
    const h = 0.14 + hash(i * 5.1) * 0.08;
    box(0.13, h, w, new THREE.Vector3(-X + 0.09, 2.63 + h / 2, bz), bookCols[i % 5].clone().multiplyScalar(0.18 + hash(i) * 0.12));
    bz += w + 0.008;
  }
  // a plant by the window
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.07, 0.18, 16), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.08, 0.06, 0.05) }));
  pot.position.set(-1.55, y0 + 0.09, 15.0);
  g.add(pot);
  for (let i = 0; i < 9; i++) {
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.07 + hash(i) * 0.05, 8, 8), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.02, 0.07 + hash(i * 2) * 0.05, 0.05) }));
    leaf.position.set(-1.55 + (hash(i * 3) - 0.5) * 0.2, y0 + 0.25 + hash(i * 7) * 0.3, 15.0 + (hash(i * 5) - 0.5) * 0.2);
    leaf.scale.y = 1.6;
    g.add(leaf);
  }
  // poster on the back wall: the Stratos orbit mark
  const poster = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.7), new THREE.MeshBasicMaterial({ map: makePosterTexture(), color: new THREE.Color(0.75, 0.75, 0.75) }));
  poster.position.set(-0.6, 2.5, z1 - 0.01);
  poster.rotation.y = Math.PI;
  g.add(poster);

  let last = 0;
  function update(t) {
    // blink the editor cursor
    const on = Math.floor(t * 2) % 2 === 0;
    if (on !== last) {
      last = on;
      screenTex.userData.draw(on);
      screenTex.needsUpdate = true;
    }
  }
  return { group: g, update };
}

/* the monitor shows a code editor building... this site */
function makeScreenTexture() {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 590;
  const x = c.getContext("2d");
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  const mono = '"JetBrains Mono", ui-monospace, monospace';
  const lines = [
    [["#7d8bb5", "// launch.js"]],
    [["#83F9FF", "import"], ["#e8ecff", " { Earth } "], ["#83F9FF", "from"], ["#FEB122", ' "./orbit"']],
    [],
    [["#83F9FF", "const"], ["#e8ecff", " studio = "], ["#83F9FF", "new"], ["#8fb0ff", " Stratos"], ["#e8ecff", "({"]],
    [["#e8ecff", "  city: "], ["#FEB122", '"Katowice"'], ["#e8ecff", ","]],
    [["#e8ecff", "  lat: "], ["#c3a6ff", "50.26"], ["#e8ecff", ", lon: "], ["#c3a6ff", "19.02"], ["#e8ecff", ","]],
    [["#e8ecff", "  palette: ["], ["#83F9FF", '"#1B54FF"'], ["#e8ecff", ", "], ["#FEB122", '"#FEB122"'], ["#e8ecff", "],"]],
    [["#e8ecff", "})"]],
    [],
    [["#7d8bb5", "// out the window, past the weather"]],
    [["#e8ecff", "studio."], ["#8fb0ff", "launch"], ["#e8ecff", "({ altitude: "], ["#FEB122", '"35 786 km"'], ["#e8ecff", " })"]],
  ];
  tex.userData.draw = (cursor) => {
    x.fillStyle = "#070c1a";
    x.fillRect(0, 0, c.width, c.height);
    // title bar
    x.fillStyle = "#0d1530";
    x.fillRect(0, 0, c.width, 40);
    ["#ff5f57", "#febc2e", "#28c840"].forEach((col, i) => {
      x.fillStyle = col;
      x.beginPath();
      x.arc(24 + i * 22, 20, 7, 0, Math.PI * 2);
      x.fill();
    });
    x.fillStyle = "#8a96bf";
    x.font = `20px ${mono}`;
    x.fillText("stratos — launch.js", 400, 27);
    // sidebar
    x.fillStyle = "#0a1124";
    x.fillRect(0, 40, 190, c.height - 40);
    ["src", "  city.js", "  scene.js", "  launch.js", "public", "  earth.jpg"].forEach((f, i) => {
      x.fillStyle = i === 3 ? "#83F9FF" : "#6c78a3";
      x.fillText(f, 18, 82 + i * 32);
    });
    // code
    x.font = `22px ${mono}`;
    lines.forEach((parts, i) => {
      let cx = 260;
      const cy = 86 + i * 36;
      x.fillStyle = "#3a4670";
      x.fillText(String(i + 1).padStart(2, " "), 210, cy);
      parts.forEach(([col, txt]) => {
        x.fillStyle = col;
        x.fillText(txt, cx, cy);
        cx += x.measureText(txt).width;
      });
      if (i === lines.length - 1 && cursor) {
        x.fillStyle = "#83F9FF";
        x.fillRect(cx + 4, cy - 20, 12, 26);
      }
    });
    // a little globe preview in the corner
    const gx = 900, gy = 470, r = 70;
    const grd = x.createRadialGradient(gx - 25, gy - 25, 5, gx, gy, r);
    grd.addColorStop(0, "#9fe8ff");
    grd.addColorStop(0.4, "#1B54FF");
    grd.addColorStop(1, "#050a1a");
    x.fillStyle = grd;
    x.beginPath();
    x.arc(gx, gy, r, 0, Math.PI * 2);
    x.fill();
    x.strokeStyle = "rgba(254,177,34,0.8)";
    x.lineWidth = 2;
    x.beginPath();
    x.ellipse(gx, gy, r * 1.5, r * 0.4, -0.35, 0, Math.PI * 2);
    x.stroke();
  };
  tex.userData.draw(true);
  // repaint once the web font is ready
  document.fonts?.ready.then(() => {
    tex.userData.draw(true);
    tex.needsUpdate = true;
  });
  return tex;
}

function makePosterTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 360;
  const x = c.getContext("2d");
  const grd = x.createLinearGradient(0, 0, 256, 360);
  grd.addColorStop(0, "#0b1a4d");
  grd.addColorStop(1, "#1B54FF");
  x.fillStyle = grd;
  x.fillRect(0, 0, 256, 360);
  x.fillStyle = "#040811";
  x.beginPath();
  x.arc(128, 150, 54, 0, Math.PI * 2);
  x.fill();
  x.strokeStyle = "#83F9FF";
  x.lineWidth = 5;
  x.beginPath();
  x.ellipse(128, 150, 100, 32, -0.4, 0, Math.PI * 2);
  x.stroke();
  x.fillStyle = "#ffffff";
  x.font = "500 34px system-ui, sans-serif";
  x.textAlign = "center";
  x.fillText("stratos", 128, 300);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
