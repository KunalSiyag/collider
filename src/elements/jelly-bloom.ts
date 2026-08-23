import * as THREE from 'three';

export interface JellyBloomOptions {
  accentColor?: string;
}

export function createJellyBloom(
  container: HTMLElement,
  options: JellyBloomOptions = {},
): () => void {
  const { accentColor = '#f472b6' } = options;
  let seed = 8801;
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
  scene.fog = new THREE.FogExp2(0x081020, 0.035);
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, -2, 14);

  const colors = [accentColor, '#a78bfa', '#22d3ee'];
  const jellies: { group: THREE.Group; bell: THREE.Mesh; phase: number; speed: number; baseX: number; baseZ: number }[] = [];
  for (let i = 0; i < 16; i++) {
    const g = new THREE.Group();
    const col = colors[i % colors.length];
    const size = 0.4 + rand() * 1.1;
    const bellMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(col), transparent: true, opacity: 0.32, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const bell = new THREE.Mesh(new THREE.SphereGeometry(size, 20, 12, 0, Math.PI * 2, Math.PI * 0.45, Math.PI * 0.62), bellMat);
    g.add(bell);
    const innerMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(col), transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false });
    const core = new THREE.Mesh(new THREE.CylinderGeometry(size * 0.18, size * 0.5, size * 0.5, 10), innerMat);
    core.position.y = -size * 0.25;
    g.add(core);
    const tentMat = new THREE.LineBasicMaterial({ color: new THREE.Color(col), transparent: true, opacity: 0.45 });
    const tentacles: THREE.Line[] = [];
    for (let k = 0; k < 7; k++) {
      const a = (k / 7) * Math.PI * 2;
      const pts: THREE.Vector3[] = [];
      for (let s = 0; s < 6; s++) {
        pts.push(new THREE.Vector3(
          Math.cos(a) * size * 0.6 * (1 - s / 8),
          -s * size * 0.42,
          Math.sin(a) * size * 0.6 * (1 - s / 8),
        ));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(geo, tentMat);
      tentacles.push(line);
      g.add(line);
    }
    const dist = 3 + rand() * 9;
    g.position.set((rand() - 0.5) * 2 * dist, (rand() - 0.5) * 16, -rand() * 10);
    jellies.push({ group: g, bell, phase: rand() * Math.PI * 2, speed: 0.3 + rand() * 0.5, baseX: g.position.x, baseZ: g.position.z });
    scene.add(g);
  }

  const planktonGeo = new THREE.BufferGeometry();
  const pn = 500;
  const ppos = new Float32Array(pn * 3);
  for (let i = 0; i < pn; i++) {
    ppos[i * 3] = (Math.random() - 0.5) * 30;
    ppos[i * 3 + 1] = (Math.random() - 0.5) * 24;
    ppos[i * 3 + 2] = (Math.random() - 0.5) * 30;
  }
  planktonGeo.setAttribute('position', new THREE.BufferAttribute(ppos, 3));
  const plankton = new THREE.Points(planktonGeo, new THREE.PointsMaterial({ color: 0x9fd8ff, size: 0.05, transparent: true, opacity: 0.5 }));
  scene.add(plankton);

  const shaftLight = new THREE.PointLight(new THREE.Color(accentColor), 26, 26);
  shaftLight.position.set(0, 6, 2);
  scene.add(shaftLight);
  scene.add(new THREE.AmbientLight(0x14203c, 2));

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
    for (const j of jellies) {
      const pulse = Math.sin(t * j.speed * 3 + j.phase);
      j.group.position.y += j.speed * 0.008 * (pulse > 0 ? 2.2 : 0.4);
      if (j.group.position.y > 11) j.group.position.y = -11;
      j.group.position.x = j.baseX + Math.sin(t * 0.3 + j.phase) * 0.8;
      j.bell.scale.setScalar(1 + pulse * 0.13);
      j.bell.rotation.y = t * 0.2 + j.phase;
    }
    plankton.rotation.y = t * 0.02;
    camera.position.y = -2 + Math.sin(t * 0.15) * 1.2;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    planktonGeo.dispose();
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh || o instanceof THREE.Points || o instanceof THREE.Line) {
        if (o.geometry !== planktonGeo) o.geometry.dispose();
      }
      if ('material' in o && o.material instanceof THREE.Material && !(o.material as THREE.Material).userData.shared) o.material.dispose();
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
