import * as THREE from 'three';

export interface TotemAwakeningOptions {
  accentColor?: string;
}

export function createTotemAwakening(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#f472b6' } = options;
  let seed = 70707;
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
  scene.fog = new THREE.FogExp2(0x0d0a16, 0.04);
  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 80);
  camera.position.set(5, 3.4, 10);
  camera.lookAt(0, 3.2, 0);

  const stoneMat = new THREE.MeshStandardMaterial({ color: 0x352b45, roughness: 1, flatShading: true });
  const eyeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor) });

  interface Tier { mesh: THREE.Group; baseY: number; phase: number }
  const tiers: Tier[] = [];
  let y = 0.9;
  for (let i = 0; i < 6; i++) {
    const g = new THREE.Group();
    const w = 1.9 - i * 0.18;
    const h = 1.05 - i * 0.06;
    const slab = new THREE.Mesh(new THREE.BoxGeometry(w, h, w * 0.85), stoneMat);
    g.add(slab);
    if (i % 2 === 0) {
      for (const sx of [-w * 0.22, w * 0.22]) {
        const eyeGeo = new THREE.BoxGeometry(w * 0.14, h * 0.16, 0.03);
        const eye = new THREE.Mesh(eyeGeo, eyeMat);
        eye.position.set(sx, h * 0.18, w * 0.43);
        g.add(eye);
      }
    }
    const bandGeo = new THREE.BoxGeometry(w * 1.02, h * 0.12, w * 0.87);
    const band = new THREE.Mesh(bandGeo, stoneMat.clone());
    band.position.y = -h * 0.36;
    g.add(band);
    y += h * 0.62;
    g.position.y = y;
    tiers.push({ mesh: g, baseY: y, phase: rand() * Math.PI * 2 });
    y += h * 0.62;
    scene.add(g);
  }

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(20, 40),
    new THREE.MeshStandardMaterial({ color: 0x141021, roughness: 1 }),
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  const ringMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(accentColor), transparent: true, opacity: 0.4,
    blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
  });
  const ringGeoA = new THREE.RingGeometry(3.4, 3.55, 60);
  const ringA = new THREE.Mesh(ringGeoA, ringMat);
  ringA.rotation.x = -Math.PI / 2;
  ringA.position.y = 0.03;
  scene.add(ringA);

  const mistN = 260;
  const mistGeo = new THREE.BufferGeometry();
  const mpos = new Float32Array(mistN * 3);
  for (let i = 0; i < mistN; i++) {
    mpos[i * 3] = (rand() - 0.5) * 24;
    mpos[i * 3 + 1] = rand() * 2;
    mpos[i * 3 + 2] = (rand() - 0.5) * 18;
  }
  mistGeo.setAttribute('position', new THREE.BufferAttribute(mpos, 3));
  const mist = new THREE.Points(mistGeo, new THREE.PointsMaterial({
    color: 0x9a8ac8, size: 0.5, transparent: true, opacity: 0.12, depthWrite: false,
  }));
  scene.add(mist);

  const totemLight = new THREE.PointLight(new THREE.Color(accentColor), 26, 16);
  totemLight.position.set(0, 4, 2);
  scene.add(totemLight);
  scene.add(new THREE.AmbientLight(0x231c34, 1.7));
  const moonL = new THREE.DirectionalLight(0xbcc4ff, 1);
  moonL.position.set(-6, 10, 5);
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
    tiers.forEach((tier, i) => {
      tier.mesh.position.y = tier.baseY + 0.25 + Math.sin(t * 0.7 + tier.phase) * 0.14 + i * 0.001;
      tier.mesh.rotation.y = Math.sin(t * 0.25 + i * 0.5) * 0.08;
    });
    eyeMat.color.copy(new THREE.Color(accentColor)).multiplyScalar(tiers[0].mesh.position.y > tiers[0].baseY ? 1 : 0.4);
    ringA.rotation.z = t * 0.3;
    totemLight.intensity = 22 + Math.abs(Math.sin(t * 1.4)) * 12;
    mist.rotation.y = t * 0.01;
    camera.position.x = Math.sin(t * 0.06) * 2 + 5;
    camera.lookAt(0, 3.4, 0);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [ringGeoA, mistGeo].forEach((g) => g.dispose());
    [stoneMat, ringMat].forEach((mt) => mt.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
