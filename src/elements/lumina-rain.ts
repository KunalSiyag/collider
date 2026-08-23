import * as THREE from 'three';

export interface LuminaRainOptions {
  accentColor?: string;
}

export function createLuminaRain(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#22d3ee' } = options;
  let seed = 4242;
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
  scene.fog = new THREE.FogExp2(0x0a0c14, 0.04);
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 80);
  camera.position.set(0, 3.5, 13);
  camera.lookAt(0, 2, -2);

  const floorGeo = new THREE.PlaneGeometry(50, 40);
  const floorMat = new THREE.MeshPhongMaterial({ color: 0x0c101c, specular: 0x66aadd, shininess: 120 });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  interface Drop { line: THREE.Mesh; x: number; z: number; speed: number; len: number }
  const drops: Drop[] = [];
  const dropMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(accentColor), transparent: true, opacity: 0.75,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const dropMatB = dropMat.clone();
  dropMatB.color = new THREE.Color('#f472b6');
  for (let i = 0; i < 60; i++) {
    const len = 0.8 + rand() * 1.6;
    const geo = new THREE.PlaneGeometry(0.05, len);
    const mesh = new THREE.Mesh(geo, i % 3 === 0 ? dropMatB : dropMat);
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);
    drops.push({ line: mesh, x: (rand() - 0.5) * 26, z: (rand() - 0.5) * 20 - 2, speed: 6 + rand() * 7, len });
    mesh.position.set(drops[i].x, rand() * 10 + 4, drops[i].z);
  }

  interface Splash { ring: THREE.Mesh; life: number }
  const splashRingGeo = new THREE.RingGeometry(0.12, 0.17, 24);
  const splashMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(accentColor), transparent: true, opacity: 0,
    blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
  });
  const splashes: Splash[] = [];
  for (let i = 0; i < 20; i++) {
    const mat = splashMat.clone();
    const ring = new THREE.Mesh(splashRingGeo, mat);
    ring.rotation.x = -Math.PI / 2;
    ring.visible = false;
    scene.add(ring);
    splashes.push({ ring, life: 0 });
  }
  let splashCursor = 0;

  scene.add(new THREE.AmbientLight(0x141c30, 1.6));
  const glowLight = new THREE.PointLight(new THREE.Color(accentColor), 16, 26);
  glowLight.position.set(0, 6, 0);
  scene.add(glowLight);

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
  let last = performance.now();
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    for (const d of drops) {
      d.line.position.y -= d.speed * dt;
      if (d.line.position.y < d.len / 2) {
        d.line.position.y = 10 + rand() * 3;
        d.x = (rand() - 0.5) * 26;
        d.z = (rand() - 0.5) * 20 - 2;
        d.line.position.x = d.x;
        d.line.position.z = d.z;
        const s = splashes[splashCursor % splashes.length];
        s.ring.position.set(d.x, 0.02, d.z);
        s.ring.visible = true;
        s.life = 1;
        splashCursor++;
      }
    }
    for (const s of splashes) {
      if (s.life <= 0) continue;
      s.life -= dt * 2.2;
      if (s.life <= 0) { s.ring.visible = false; continue; }
      s.ring.scale.setScalar(1 + (1 - s.life) * 5);
      (s.ring.material as THREE.MeshBasicMaterial).opacity = s.life * 0.7;
    }
    camera.position.x = Math.sin(performance.now() * 0.00006) * 2;
    camera.lookAt(0, 2, -2);
    renderer.render(scene, camera);
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [floorGeo, splashRingGeo].forEach((g) => g.dispose());
    [dropMat, dropMatB, floorMat, splashMat].forEach((mt) => mt.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
