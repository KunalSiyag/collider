import * as THREE from 'three';

export interface SpiritRiverOptions {
  accentColor?: string;
}

export function createSpiritRiver(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#a78bfa' } = options;
  let seed = 51515;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0812, 0.045);
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 90);
  camera.position.set(4, 3.4, 12);
  camera.lookAt(-2, 0.6, -6);

  function riverPoint(u: number): THREE.Vector3 {
    return new THREE.Vector3(
      Math.sin(u * Math.PI * 1.4) * 4 - u * 2,
      0.25,
      -u * 26 + 10,
    );
  }
  const curve = new THREE.CatmullRomCurve3(
    Array.from({ length: 24 }, (_, i) => riverPoint(i / 23)),
  );

  const bankMat = new THREE.MeshStandardMaterial({ color: 0x14101f, roughness: 1, flatShading: true });
  for (const side of [-1, 1]) {
    for (let i = 0; i < 30; i++) {
      const u = i / 29;
      const p = curve.getPoint(u);
      const n = curve.getTangent(u);
      const bx = p.x + side * (2.2 + rand() * 2.5);
      const bz = p.z - n.z * 0;
      const mound = new THREE.Mesh(new THREE.ConeGeometry(1.4 + rand(), 1.2 + rand() * 2.4, 5), bankMat);
      mound.position.set(bx, 0.4, bz);
      scene.add(mound);
    }
  }

  const WN = 900;
  const wispGeo = new THREE.BufferGeometry();
  const wpos = new Float32Array(WN * 3);
  const wmeta = new Float32Array(WN * 2);
  for (let i = 0; i < WN; i++) {
    wmeta[i * 2] = rand();
    wmeta[i * 2 + 1] = rand() * Math.PI * 2;
    const p = curve.getPoint(wmeta[i * 2]);
    const off = (rand() - 0.5) * 2.4;
    wpos[i * 3] = p.x + off;
    wpos[i * 3 + 1] = 0.15 + rand() * 0.7;
    wpos[i * 3 + 2] = p.z + (rand() - 0.5) * 0.8;
  }
  wispGeo.setAttribute('position', new THREE.BufferAttribute(wpos, 3));
  const wisps = new THREE.Points(wispGeo, new THREE.PointsMaterial({
    color: new THREE.Color(accentColor), size: 0.14, transparent: true, opacity: 0.85,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  scene.add(wisps);

  const treeMat = new THREE.MeshStandardMaterial({ color: 0x1c1528, roughness: 1, flatShading: true });
  for (let i = 0; i < 9; i++) {
    const u = rand();
    const p = curve.getPoint(u);
    const side = rand() > 0.5 ? 1 : -1;
    const x = p.x + side * (4 + rand() * 3);
    const h = 3 + rand() * 3.5;
    const trunkGeo = new THREE.CylinderGeometry(0.08, 0.28, h, 5);
    const tr = new THREE.Mesh(trunkGeo, treeMat);
    tr.position.set(x, h / 2, p.z);
    tr.rotation.z = (rand() - 0.5) * 0.2;
    scene.add(tr);
  }

  const moon = new THREE.Mesh(
    new THREE.CircleGeometry(2.2, 40),
    new THREE.MeshBasicMaterial({ color: 0xd8dcf2, transparent: true, opacity: 0.85 }),
  );
  moon.position.set(-8, 11, -34);
  scene.add(moon);

  const riverLight = new THREE.PointLight(new THREE.Color(accentColor), 22, 18);
  riverLight.position.set(-2, 2, -4);
  scene.add(riverLight);
  scene.add(new THREE.AmbientLight(0x191430, 1.7));
  const moonL = new THREE.DirectionalLight(0xcdd4ff, 0.9);
  moonL.position.copy(moon.position);
  scene.add(moonL);

  function resize() {
    const w = container.clientWidth, h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  let raf = 0;
  const clock = new THREE.Clock();
  function tick() {
    raf = requestAnimationFrame(tick);
    const t = clock.getElapsedTime();
    const attr = wispGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < WN; i++) {
      let u = wmeta[i * 2] + 0.0012;
      if (u > 1) u -= 1;
      wmeta[i * 2] = u;
      const p = curve.getPoint(u);
      attr.setX(i, p.x + Math.sin(t * 2 + wmeta[i * 2 + 1]) * 0.35 + Math.sin(u * 20) * 0.5);
      attr.setY(i, 0.15 + Math.abs(Math.sin(t * 1.4 + wmeta[i * 2 + 1])) * 0.8);
      attr.setZ(i, p.z + Math.cos(t * 1.6 + wmeta[i * 2 + 1]) * 0.25);
    }
    attr.needsUpdate = true;
    riverLight.intensity = 18 + Math.abs(Math.sin(t * 2)) * 10;
    camera.position.x = 4 + Math.sin(t * 0.06) * 2;
    camera.lookAt(curve.getPoint(Math.min(0.45 + Math.sin(t * 0.04) * 0.1, 0.9)).setY(0.8));
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [wispGeo].forEach((g) => g.dispose());
    [bankMat, treeMat].forEach((mt) => mt.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
