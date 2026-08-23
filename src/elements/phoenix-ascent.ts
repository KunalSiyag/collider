import * as THREE from 'three';

export interface PhoenixAscentOptions {
  accentColor?: string;
}

export function createPhoenixAscent(
  container: HTMLElement,
  options: PhoenixAscentOptions = {},
): () => void {
  const { accentColor = '#f472b6' } = options;
  let seed = 7331;
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
  scene.fog = new THREE.FogExp2(0x0b0b10, 0.02);
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 150);
  camera.position.set(0, -3, 16);
  camera.lookAt(0, 4, 0);

  const WING_N = 700;
  const wingGeo = new THREE.BufferGeometry();
  const wpos = new Float32Array(WING_N * 3);
  const wmeta: number[] = [];
  for (let i = 0; i < WING_N; i++) {
    const side = i % 2 === 0 ? 1 : -1;
    const u = rand();
    wmeta.push(side, u, rand());
    wpos[i * 3] = 0;
    wpos[i * 3 + 1] = 0;
    wpos[i * 3 + 2] = 0;
  }
  wingGeo.setAttribute('position', new THREE.BufferAttribute(wpos, 3));
  const wingMat = new THREE.PointsMaterial({
    color: new THREE.Color(accentColor), size: 0.14, transparent: true, opacity: 0.9,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const wings = new THREE.Points(wingGeo, wingMat);

  const bird = new THREE.Group();
  bird.add(wings);
  const bodyCore = new THREE.Mesh(
    new THREE.ConeGeometry(0.35, 2.4, 8),
    new THREE.MeshBasicMaterial({ color: 0xffd98a, transparent: true, opacity: 0.85 }),
  );
  bodyCore.rotation.x = Math.PI / 2;
  bird.add(bodyCore);
  scene.add(bird);

  const emberGeo = new THREE.BufferGeometry();
  const EN = 400;
  const epos = new Float32Array(EN * 3);
  for (let i = 0; i < EN; i++) {
    epos[i * 3] = (rand() - 0.5) * 16;
    epos[i * 3 + 1] = rand() * 24 - 10;
    epos[i * 3 + 2] = (rand() - 0.5) * 12;
  }
  emberGeo.setAttribute('position', new THREE.BufferAttribute(epos, 3));
  const embers = new THREE.Points(emberGeo, new THREE.PointsMaterial({
    color: 0xffa05c, size: 0.09, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  scene.add(embers);

  const fireLight = new THREE.PointLight(new THREE.Color(accentColor), 50, 30);
  scene.add(fireLight);
  scene.add(new THREE.AmbientLight(0x301d28, 1.4));

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
    const flap = Math.sin(t * 3.2);
    bird.position.y = ((t * 1.1) % 22) - 8;
    bird.position.x = Math.sin(t * 0.5) * 2.5;
    bird.rotation.z = Math.cos(t * 0.5) * 0.25;
    bird.rotation.y = Math.sin(t * 0.5) * 0.15;
    fireLight.position.copy(bird.position);
    fireLight.intensity = 42 + flap * 14;
    const attr = wingGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < WING_N; i++) {
      const side = wmeta[i * 3];
      const u = wmeta[i * 3 + 1];
      const jitter = wmeta[i * 3 + 2];
      const span = 1.2 + u * 4.4;
      const wave = Math.sin(t * 3.2 - u * 2.2) * (0.4 + u * 1.1);
      attr.setX(i, side * span * Math.abs(flap) * 0.4 + side * span * 0.75);
      attr.setY(i, wave + jitter * 0.3 - u * 0.4);
      attr.setZ(i, -u * 2.6 + Math.sin(t * 2 + u * 5) * 0.2 + jitter * 0.4);
    }
    attr.needsUpdate = true;
    const ea = emberGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < EN; i++) {
      let y = ea.getY(i) + 0.03 + (i % 4) * 0.004;
      if (y > 13) y = -10;
      ea.setY(i, y);
    }
    ea.needsUpdate = true;
    camera.position.y = Math.max(-3, bird.position.y - 5);
    camera.lookAt(bird.position.x, bird.position.y, 0);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [wingGeo, emberGeo].forEach((g) => g.dispose());
    [wingMat, embers.material as THREE.Material].forEach((mt) => mt.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
