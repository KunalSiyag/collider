import * as THREE from 'three';

export interface WindwardCliffsOptions {
  accentColor?: string;
}

export function createWindwardCliffs(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#a78bfa' } = options;
  let seed = 90909;
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
  scene.fog = new THREE.Fog(0x141126, 16, 60);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(2, 3, 12);
  camera.lookAt(-2, 1.5, -8);

  const rockMat = new THREE.MeshStandardMaterial({ color: 0x2b2440, roughness: 1, flatShading: true });
  for (let i = 0; i < 9; i++) {
    const w = 3 + rand() * 4;
    const h = 2 + rand() * 5;
    const d = 3 + rand() * 4;
    const blockGeo = new THREE.BoxGeometry(w, h, d);
    const block = new THREE.Mesh(blockGeo, rockMat);
    block.position.set((i - 4) * 3.4 + rand(), h / 2 - 1.5 + rand() * 0.6, -rand() * 18);
    block.rotation.y = rand() * 0.3;
    scene.add(block);
  }

  const BLADE_N = 700;
  const bladeGeo = new THREE.ConeGeometry(0.03, 0.55, 4);
  const bladeMat = new THREE.MeshStandardMaterial({ color: 0x3f6e52, roughness: 1, flatShading: true });
  const grassField = new THREE.InstancedMesh(bladeGeo, bladeMat, BLADE_N);
  const blades: { x: number; y: number; z: number; phase: number }[] = [];
  const dummy = new THREE.Object3D();
  for (let i = 0; i < BLADE_N; i++) {
    const x = (rand() - 0.5) * 30;
    const z = -rand() * 22;
    const y = 0.15;
    blades.push({ x, y, z, phase: rand() * Math.PI * 2 });
    dummy.position.set(x, y, z);
    dummy.rotation.set((rand() - 0.5) * 0.2, rand() * Math.PI, 0);
    dummy.scale.setScalar(0.7 + rand() * 1.1);
    dummy.updateMatrix();
    grassField.setMatrixAt(i, dummy.matrix);
  }
  scene.add(grassField);

  const petalN = 200;
  const petalGeo = new THREE.BufferGeometry();
  const ppos = new Float32Array(petalN * 3);
  const pmeta = new Float32Array(petalN * 2);
  for (let i = 0; i < petalN; i++) {
    pmeta[i * 2] = rand() * Math.PI * 2;
    pmeta[i * 2 + 1] = 0.4 + rand() * 0.8;
    ppos[i * 3] = (rand() - 0.5) * 28;
    ppos[i * 3 + 1] = rand() * 6;
    ppos[i * 3 + 2] = (rand() - 0.5) * 20;
  }
  petalGeo.setAttribute('position', new THREE.BufferAttribute(ppos, 3));
  const petals = new THREE.Points(petalGeo, new THREE.PointsMaterial({
    color: new THREE.Color(accentColor), size: 0.08, transparent: true, opacity: 0.75,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  scene.add(petals);

  scene.add(new THREE.AmbientLight(0x39304e, 1.9));
  const windLight = new THREE.DirectionalLight(0xcfc2ff, 1.4);
  windLight.position.set(-8, 10, 4);
  scene.add(windLight);

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
    for (let i = 0; i < BLADE_N; i++) {
      const b = blades[i];
      const gust = Math.sin(t * 2.2 + b.x * 0.4 + b.z * 0.25) * 0.35;
      dummy.position.set(b.x, b.y, b.z);
      dummy.rotation.set(gust, gust * 0.5, 0);
      dummy.updateMatrix();
      grassField.setMatrixAt(i, dummy.matrix);
    }
    grassField.instanceMatrix.needsUpdate = true;
    const pa = petalGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < petalN; i++) {
      pa.setX(i, pa.getX(i) + 0.02 * pmeta[i * 2 + 1]);
      pa.setY(i, pa.getY(i) + Math.sin(t * 1.8 + pmeta[i * 2]) * 0.01 - 0.004);
      if (pa.getX(i) > 15) { pa.setX(i, -15); pa.setY(i, Math.random() * 6); }
      if (pa.getY(i) < 0) pa.setY(i, 6);
    }
    pa.needsUpdate = true;
    camera.position.x = Math.sin(t * 0.05) * 1.8 + 2;
    camera.lookAt(-2, 1.2, -8);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [bladeGeo, petalGeo].forEach((g) => g.dispose());
    [rockMat, bladeMat].forEach((mt) => mt.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
