import * as THREE from 'three';

export interface FloatingCityOptions {
  accentColor?: string;
}

export function createFloatingCity(
  container: HTMLElement,
  options: FloatingCityOptions = {},
): () => void {
  const { accentColor = '#8b5cf6' } = options;
  let seed = 20260823;
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
  scene.fog = new THREE.Fog(0x0b0b10, 18, 70);
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
  camera.position.set(0, 4, 22);

  const rockMat = new THREE.MeshStandardMaterial({ color: 0x241d33, roughness: 0.9, flatShading: true });
  const towerMat = new THREE.MeshStandardMaterial({ color: 0x171226, roughness: 0.6 });
  const winMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor) });
  const islands: THREE.Group[] = [];

  const rockGeo = new THREE.IcosahedronGeometry(1, 1);
  const towerGeo = new THREE.BoxGeometry(1, 1, 1);
  const winGeo = new THREE.BoxGeometry(0.08, 0.12, 0.02);

  for (let i = 0; i < 6; i++) {
    const g = new THREE.Group();
    const r = 2 + rand() * 2.4;
    const top = new THREE.Mesh(rockGeo, rockMat);
    top.scale.set(r, r * 0.35, r);
    g.add(top);
    const under = new THREE.Mesh(new THREE.ConeGeometry(r * 0.92, r * 2.2, 6), rockMat);
    under.rotation.x = Math.PI;
    under.position.y = -r * 1.2;
    g.add(under);
    const n = 3 + Math.floor(rand() * 4);
    for (let b = 0; b < n; b++) {
      const h = 1.2 + rand() * 4.5;
      const tw = 0.5 + rand() * 0.8;
      const tower = new THREE.Mesh(towerGeo, towerMat);
      tower.scale.set(tw, h, tw);
      tower.position.set((rand() - 0.5) * r, h / 2 + r * 0.3, (rand() - 0.5) * r);
      g.add(tower);
      const wn = 4 + Math.floor(rand() * 6);
      for (let w = 0; w < wn; w++) {
        const win = new THREE.Mesh(winGeo, winMat);
        win.position.set(
          tower.position.x + (rand() - 0.5) * tw,
          tower.position.y - h / 2 + 0.3 + rand() * (h - 0.5),
          tower.position.z + tw / 2 + 0.01,
        );
        g.add(win);
      }
    }
    const a = (i / 6) * Math.PI * 2;
    const dist = 6 + rand() * 9;
    g.position.set(Math.cos(a) * dist, (rand() - 0.5) * 6, Math.sin(a) * dist - 4);
    g.userData = { phase: rand() * Math.PI * 2, baseY: g.position.y };
    islands.push(g);
    scene.add(g);
  }

  const clouds = new THREE.Mesh(
    new THREE.PlaneGeometry(160, 160),
    new THREE.MeshBasicMaterial({ color: 0x1b1530, transparent: true, opacity: 0.85, depthWrite: false }),
  );
  clouds.rotation.x = -Math.PI / 2;
  clouds.position.y = -14;
  scene.add(clouds);

  scene.add(new THREE.AmbientLight(0x2a2440, 2));
  const key = new THREE.DirectionalLight(0xbfb3e6, 1.4);
  key.position.set(-6, 10, 4);
  scene.add(key);
  const glowLight = new THREE.PointLight(new THREE.Color(accentColor), 30, 40);
  glowLight.position.set(0, 2, 6);
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
  const clock = new THREE.Clock();
  function tick() {
    raf = requestAnimationFrame(tick);
    const t = clock.getElapsedTime();
    islands.forEach((g, i) => {
      g.position.y = g.userData.baseY + Math.sin(t * 0.5 + g.userData.phase) * 0.6;
      g.rotation.y = Math.sin(t * 0.08 + i) * 0.15;
    });
    clouds.position.z = ((t * 0.6) % 20) - 10;
    camera.position.x = Math.sin(t * 0.07) * 3;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    rockGeo.dispose(); towerGeo.dispose(); winGeo.dispose();
    [rockMat, towerMat, winMat].forEach((mt) => mt.dispose());
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh && o.geometry !== rockGeo && o.geometry !== towerGeo && o.geometry !== winGeo) o.geometry.dispose();
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
