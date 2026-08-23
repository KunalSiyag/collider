import * as THREE from 'three';

export interface FloatingRunestonesOptions {
  accentColor?: string;
}

export function createFloatingRunestones(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#a78bfa' } = options;
  let seed = 6172;
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
  scene.fog = new THREE.FogExp2(0x0b0b10, 0.032);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 90);
  camera.position.set(7, 4.5, 11);
  camera.lookAt(0, 3, 0);

  const stoneMat = new THREE.MeshStandardMaterial({ color: 0x241f36, roughness: 0.9 });
  const runeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor) });

  const stones: { group: THREE.Group; phase: number; angle: number; radius: number }[] = [];
  for (let i = 0; i < 8; i++) {
    const g = new THREE.Group();
    const h = 1.8 + rand() * 2;
    const slab = new THREE.Mesh(new THREE.BoxGeometry(0.9, h, 0.5), stoneMat);
    g.add(slab);
    for (let r = 0; r < 4; r++) {
      const rune = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.22 + rand() * 0.2, 0.02), runeMat);
      rune.position.set(0.46, h / 2 - 0.35 - r * (h / 5), 0);
      rune.rotation.z = rand() * 0.3 - 0.15;
      g.add(rune);
    }
    const a = (i / 8) * Math.PI * 2;
    g.position.set(Math.cos(a) * 4.2, 2 + rand() * 1.5, Math.sin(a) * 4.2);
    scene.add(g);
    stones.push({ group: g, phase: rand() * Math.PI * 2, angle: a, radius: 4.2 });
  }

  const beam = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.16, 12, 12),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor), transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  beam.position.y = 5;
  scene.add(beam);

  const core = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.55),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor), transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending }),
  );
  core.position.y = 3.4;
  scene.add(core);

  const groundRing = new THREE.Mesh(
    new THREE.RingGeometry(4.6, 4.75, 64),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor), transparent: true, opacity: 0.4, side: THREE.DoubleSide }),
  );
  groundRing.rotation.x = -Math.PI / 2;
  groundRing.position.y = 0.04;
  scene.add(groundRing);
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(24, 40),
    new THREE.MeshStandardMaterial({ color: 0x120e1e, roughness: 1 }),
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  const light = new THREE.PointLight(new THREE.Color(accentColor), 30, 18);
  light.position.set(0, 4, 0);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x231c38, 1.5));

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
    stones.forEach((s, i) => {
      s.angle += 0.0016;
      s.group.position.x = Math.cos(s.angle) * s.radius;
      s.group.position.z = Math.sin(s.angle) * s.radius;
      s.group.position.y = 2.2 + Math.sin(t * 0.8 + s.phase) * 0.45;
      s.group.rotation.y += 0.002;
      if (i === 0) s.group.rotation.z = Math.sin(t * 0.6) * 0.05;
    });
    core.rotation.y = t * 1.2;
    core.rotation.x = t * 0.7;
    core.scale.setScalar(1 + Math.sin(t * 2.6) * 0.12);
    light.intensity = 26 + Math.abs(Math.sin(t * 2.6)) * 14;
    camera.position.x = 7 + Math.sin(t * 0.07) * 2;
    camera.lookAt(0, 3, 0);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [stoneMat, runeMat].forEach((mt) => mt.dispose());
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.geometry.dispose();
        if (o.material instanceof THREE.Material && o.material !== stoneMat && o.material !== runeMat) o.material.dispose();
      }
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
