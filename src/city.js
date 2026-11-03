import * as THREE from "three";

/*
 * Night-time Katowice at street scale, built around the world origin
 * (the point where Katowice sits on top of the globe).
 *  - ground plane with a sodium-lit street grid fading into the horizon
 *  - instanced blocks with procedural lit windows
 *  - a saucer arena on legs (a nod to the Spodek) and a tall tower
 *  - the studio building straight ahead, with one big glowing window
 */

export const STUDIO = {
  pos: new THREE.Vector3(0, 0, -15),
  size: new THREE.Vector3(4.2, 7.5, 3),
  windowY: 2.4,
};
STUDIO.front = STUDIO.pos.z + STUDIO.size.z / 2; // z of the facade

const hash = (x) => {
  const s = Math.sin(x * 127.1) * 43758.5453;
  return s - Math.floor(s);
};

export function createCity({ horizon, cobalt, cyan, amber, bg }) {
  const group = new THREE.Group();

  /* ---------------- ground ---------------- */
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(420, 96),
    new THREE.ShaderMaterial({
      uniforms: { uHorizon: { value: horizon }, uAmber: { value: amber }, uCobalt: { value: cobalt }, uBg: { value: bg }, uTime: { value: 0 } },
      vertexShader: /* glsl */ `
        varying vec3 vW;
        void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uHorizon, uAmber, uCobalt, uBg; uniform float uTime;
        varying vec3 vW;
        float line(float x, float w){ float f = abs(fract(x) - 0.5); return smoothstep(0.5 - w, 0.5, f); }
        void main(){
          vec2 p = vW.xz;
          float d = length(p - cameraPosition.xz);
          // streets every 2.6 units, a few wide avenues
          float streets = max(line(p.x / 2.6, 0.05), line(p.y / 2.6, 0.05));
          float avenues = max(line(p.x / 13.0, 0.012), line(p.y / 13.0, 0.012));
          // street lamps
          vec2 lp = fract(p / 1.3) - 0.5;
          float lamp = smoothstep(0.1, 0.0, length(lp)) * max(line(p.x / 2.6, 0.04), line(p.y / 2.6, 0.04));
          vec3 col = uBg * 1.3 + uCobalt * 0.03;
          col += uAmber * (streets * 0.07 + avenues * 0.18 + lamp * 0.8);
          // fade into the twilight horizon
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
  const blocks = [];
  // keep a clear runway for the camera along x≈0, from the start point to the studio
  const blocked = (x, z) => Math.abs(x) < 4.6 && z > -12.5 && z < 24;
  const spodek = new THREE.Vector3(-8.5, 0, -24);
  const tower = new THREE.Vector3(7.5, 0, -27);
  for (let gx = -40; gx <= 40; gx++) {
    for (let gz = -40; gz <= 30; gz++) {
      const seed = hash(gx * 31.7 + gz * 17.3);
      if (seed < 0.32) continue;
      const x = gx * 2.6 + (hash(gx + gz * 3.1) - 0.5) * 0.6;
      const z = gz * 2.6 + (hash(gz + gx * 5.7) - 0.5) * 0.6;
      if (blocked(x, z)) continue;
      if (Math.hypot(x - spodek.x, z - spodek.z) < 6) continue;
      if (Math.hypot(x - STUDIO.pos.x, z - STUDIO.pos.z) < 4.5) continue;
      const r = Math.hypot(x, z + 10);
      if (r > 105) continue;
      const downtown = Math.exp(-r / 30);
      const h = 0.5 + Math.pow(hash(seed * 91.3), 2.2) * (1.6 + downtown * 5.5);
      const w = 1.2 + hash(seed * 7.1) * 0.9;
      const d = 1.2 + hash(seed * 3.3) * 0.9;
      blocks.push([x, z, w, h, d, seed]);
    }
  }
  // landmarks + studio
  blocks.push([tower.x, tower.z, 2.0, 11, 2.0, 0.77]);
  blocks.push([tower.x + 3.2, tower.z + 1, 1.6, 6.5, 1.6, 0.31]);
  blocks.push([STUDIO.pos.x, STUDIO.pos.z, STUDIO.size.x, STUDIO.size.y, STUDIO.size.z, 0.5]);

  const geo = new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);
  const seeds = new Float32Array(blocks.length);
  const mat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uHorizon: { value: horizon }, uAmber: { value: amber }, uCyan: { value: cyan }, uCobalt: { value: cobalt }, uBg: { value: bg } },
    vertexShader: /* glsl */ `
      attribute float aSeed;
      varying vec3 vP; varying vec3 vN; varying float vSeed; varying vec3 vW;
      void main(){
        vec3 sc = vec3(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz), length(instanceMatrix[2].xyz));
        vP = position * sc;
        vN = normal;
        vSeed = aSeed;
        vec4 w = modelMatrix * instanceMatrix * vec4(position, 1.0);
        vW = w.xyz;
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,
    fragmentShader: /* glsl */ `
      uniform float uTime; uniform vec3 uHorizon, uAmber, uCyan, uCobalt, uBg;
      varying vec3 vP; varying vec3 vN; varying float vSeed; varying vec3 vW;
      float h21(vec2 p){ p = fract(p * vec2(233.34, 851.73)); p += dot(p, p + 23.45); return fract(p.x * p.y); }
      void main(){
        vec3 col = uBg * 1.6 + uCobalt * 0.05;
        if (abs(vN.y) < 0.5) {
          float u = abs(vN.x) > 0.5 ? vP.z : vP.x;
          vec2 g = vec2(u * 4.0, vP.y * 5.0);
          vec2 cell = floor(g); vec2 f = fract(g);
          float win = step(0.2, f.x) * step(f.x, 0.8) * step(0.22, f.y) * step(f.y, 0.78);
          float r = h21(cell + vSeed * 57.0 + vN.xz * 13.0);
          float lit = step(0.66, r);
          float flick = 0.85 + 0.15 * sin(uTime * (1.0 + r * 3.0) + r * 40.0);
          vec3 wc = r > 0.95 ? uCyan : (r > 0.86 ? vec3(0.85, 0.9, 1.0) : uAmber);
          // far away the window grid would shimmer, so it blends into an average glow
          float dist = length(vW - cameraPosition);
          float sharp = 1.0 - smoothstep(18.0, 60.0, dist);
          col += wc * mix(0.11, win * lit * flick * 0.8, sharp);
          col += uCobalt * 0.025 * (1.0 - win);
          // ground-floor glow
          col += uAmber * 0.18 * smoothstep(0.6, 0.0, vP.y);
        } else {
          // rooftop beacons on taller blocks
          col += vec3(1.0, 0.15, 0.1) * step(0.985, h21(floor(vP.xz * 3.0) + vSeed)) * 1.5;
        }
        float d = length(vW - cameraPosition);
        col = mix(col, uHorizon * 0.55, smoothstep(25.0, 220.0, d));
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
  const inst = new THREE.InstancedMesh(geo, mat, blocks.length);
  const m4 = new THREE.Matrix4();
  blocks.forEach(([x, z, w, h, d, s], i) => {
    m4.compose(new THREE.Vector3(x, 0, z), new THREE.Quaternion(), new THREE.Vector3(w, h, d));
    inst.setMatrixAt(i, m4);
    seeds[i] = s;
  });
  geo.setAttribute("aSeed", new THREE.InstancedBufferAttribute(seeds, 1));
  inst.frustumCulled = false;
  group.add(inst);

  /* ---------------- saucer arena (Spodek nod) ---------------- */
  const saucer = new THREE.Group();
  saucer.position.copy(spodek);
  const bowl = new THREE.Mesh(
    new THREE.CylinderGeometry(4.2, 1.5, 1.7, 64, 1, true),
    new THREE.MeshBasicMaterial({ color: bg.clone().multiplyScalar(2.2), side: THREE.DoubleSide })
  );
  bowl.position.y = 1.75;
  saucer.add(bowl);
  const lid = new THREE.Mesh(new THREE.CircleGeometry(4.2, 64), new THREE.MeshBasicMaterial({ color: bg.clone().multiplyScalar(1.6) }));
  lid.rotation.x = -Math.PI / 2;
  lid.position.y = 2.6;
  saucer.add(lid);
  const rimMat = new THREE.MeshBasicMaterial({ color: cyan.clone().multiplyScalar(1.6) });
  const rim = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.05, 8, 128), rimMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 2.6;
  saucer.add(rim);
  const rim2 = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.035, 8, 128), new THREE.MeshBasicMaterial({ color: cobalt.clone().multiplyScalar(2) }));
  rim2.rotation.x = Math.PI / 2;
  rim2.position.y = 1.9;
  saucer.add(rim2);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.16, 1.5, 6), new THREE.MeshBasicMaterial({ color: bg.clone().multiplyScalar(2.6) }));
    // legs lean outward, like the real arena's
    leg.position.set(Math.cos(a) * 2.6, 0.6, Math.sin(a) * 2.6);
    leg.rotation.z = Math.cos(a) * 0.5;
    leg.rotation.x = -Math.sin(a) * 0.5;
    saucer.add(leg);
  }
  group.add(saucer);

  // tower spire light
  const spire = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0.2, 0.15).multiplyScalar(2) }));
  spire.position.set(tower.x, 11.3, tower.z);
  group.add(spire);

  /* ---------------- studio window ---------------- */
  const winMat = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: { uAmber: { value: amber }, uCyan: { value: cyan }, uTime: { value: 0 }, uPulse: { value: 0 } },
    vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uAmber, uCyan; uniform float uTime, uPulse;
      varying vec2 vUv;
      void main(){
        vec2 p = vUv - 0.5;
        // mullions
        float frame = step(0.47, max(abs(p.x), abs(p.y))) + step(abs(p.x), 0.008) * 0.9;
        vec3 inside = mix(vec3(1.0, 0.92, 0.78), uAmber, smoothstep(0.0, 0.7, length(p * vec2(1.0, 1.6))));
        inside += uCyan * 0.15 * smoothstep(0.3, -0.5, p.y);
        vec3 col = mix(inside * (1.6 + uPulse * 0.6), vec3(0.03, 0.05, 0.12), clamp(frame, 0.0, 1.0));
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
  const studioWindow = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.0), winMat);
  studioWindow.position.set(0, STUDIO.windowY, STUDIO.front + 0.01);
  group.add(studioWindow);
  // soft halo around the window
  const halo = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 3),
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uAmber: { value: amber } },
      vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: /* glsl */ `uniform vec3 uAmber; varying vec2 vUv;
        void main(){ float d = length((vUv - 0.5) * vec2(1.0, 1.35)); gl_FragColor = vec4(uAmber * smoothstep(0.5, 0.05, d) * 0.35, 1.0); }`,
    })
  );
  halo.position.set(0, STUDIO.windowY, STUDIO.front + 0.03);
  group.add(halo);

  function update(t, pulse = 0) {
    mat.uniforms.uTime.value = t;
    ground.material.uniforms.uTime.value = t;
    winMat.uniforms.uTime.value = t;
    winMat.uniforms.uPulse.value = pulse;
    rim.material.color.setRGB(0.4 + 0.25 * Math.sin(t * 1.4), 1.4, 1.6);
  }

  return { group, update };
}
