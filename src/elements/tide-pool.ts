import * as THREE from 'three';

export interface TidePoolOptions {
  accentColor?: string;
}

export function createTidePool(container: HTMLElement, options: TidePoolOptions = {}): () => void {
  const { accentColor = '#22d3ee' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 50);
  camera.position.set(0, 7, 9);
  camera.lookAt(0, -1, 0);

  let seed = 6174;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const poolGeo = new THREE.CircleGeometry(9, 64);
  const poolMat = new THREE.MeshStandardMaterial({
    color: '#0c2b33',
    roughness: 0.08,
    metalness: 0.7,
  });
  const pool = new THREE.Mesh(poolGeo, poolMat);
  pool.rotation.x = -Math.PI / 2;
  scene.add(pool);

  interface Anemone {
    mesh: THREE.Mesh;
    mat: THREE.MeshStandardMaterial;
    phase: number;
  }
  const anemones: Anemone[] = [];
  for (let i = 0; i < 22; i++) {
    const color = ['#8b5cf6', '#f472b6', '#a78bfa'][i % 3];
    const geo = new THREE.SphereGeometry(0.18 + rand() * 0.3, 12, 12);
    const mat = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.3,
      roughness: 0.5,
    });
    const mesh = new THREE.Mesh(geo, mat);
    const angle = rand() * Math.PI * 2;
    const dist = rand() * 8;
    mesh.position.set(Math.cos(angle) * dist, -0.1, Math.sin(angle) * dist);
    scene.add(mesh);
    anemones.push({ mesh, mat, phase: rand() * Math.PI * 2 });
  }

  const ringGeo = new THREE.RingGeometry(0.98, 1, 48);
  interface Ripple {
    mesh: THREE.Mesh;
    t: number;
    origin: THREE.Vector3;
  }
  const ripples: Ripple[] = [];
  for (let i = 0; i < 10; i++) {
    const mesh = new THREE.Mesh(
      ringGeo,
      new THREE.MeshBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      }),
    );
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);
    ripples.push({ mesh, t: rand(), origin: new THREE.Vector3() });
  }

  scene.add(new THREE.AmbientLight('#334455', 1.6));
  const moonGlow = new THREE.DirectionalLight(accentColor, 1.2);
  moonGlow.position.set(-4, 8, 2);
  scene.add(moonGlow);

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  let raf = 0;
  const clock = new THREE.Clock();
  function tick() {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.getElapsedTime();
    for (const a of anemones) {
      a.mat.emissiveIntensity = 0.2 + 0.35 * (0.5 + 0.5 * Math.sin(t * 1.2 + a.phase));
      a.mesh.scale.setScalar(1 + Math.sin(t * 1.6 + a.phase) * 0.08);
    }
    for (const r of ripples) {
      r.t += dt * 0.25;
      if (r.t > 1) {
        r.t = 0;
        const angle = rand() * Math.PI * 2;
        const dist = rand() * 7;
        r.origin.set(Math.cos(angle) * dist, 0.01, Math.sin(angle) * dist);
      }
      r.mesh.position.copy(r.origin);
      r.mesh.scale.setScalar(0.2 + r.t * 4);
      (r.mesh.material as THREE.MeshBasicMaterial).opacity =
        Math.sin(r.t * Math.PI) * 0.5;
    }
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    poolGeo.dispose();
    poolMat.dispose();
    ringGeo.dispose();
    for (const a of anemones) {
      a.mesh.geometry.dispose();
      a.mat.dispose();
    }
    for (const r of ripples) (r.mesh.material as THREE.Material).dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
