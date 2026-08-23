import * as THREE from 'three';

export interface CrystalCaveOptions {
  count?: number;
  colors?: string[];
}

export function createCrystalCave(
  container: HTMLElement,
  options: CrystalCaveOptions = {},
): () => void {
  const { count = 46, colors = ['#8b5cf6', '#22d3ee', '#f472b6'] } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#0b0b10', 6, 30);
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 60);
  camera.position.set(0, 0.6, 13);

  let seed = 998877;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const crystals: { mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial; phase: number }[] = [];
  const geoCache = [
    new THREE.ConeGeometry(0.35, 2.6, 6),
    new THREE.ConeGeometry(0.22, 3.6, 5),
    new THREE.OctahedronGeometry(0.6),
  ];
  for (let i = 0; i < count; i++) {
    const color = colors[i % colors.length];
    const mat = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.25,
      roughness: 0.15,
      metalness: 0.1,
      flatShading: true,
      transparent: true,
      opacity: 0.85,
    });
    const mesh = new THREE.Mesh(geoCache[i % geoCache.length], mat);
    mesh.position.set((rand() - 0.5) * 20, (rand() - 0.5) * 8, (rand() - 0.5) * 12);
    mesh.rotation.set(rand() * 0.8 - 0.4, rand() * Math.PI, rand() * 0.8 - 0.4);
    mesh.scale.setScalar(0.5 + rand());
    scene.add(mesh);
    crystals.push({ mesh, mat, phase: rand() * Math.PI * 2 });
  }
  scene.add(new THREE.AmbientLight('#332a55', 2));
  const lightA = new THREE.PointLight('#8b5cf6', 60, 24);
  lightA.position.set(-6, 3, 5);
  const lightB = new THREE.PointLight('#22d3ee', 60, 24);
  lightB.position.set(6, -2, 5);
  scene.add(lightA, lightB);

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
    const t = clock.getElapsedTime();
    for (const c of crystals) {
      c.mat.emissiveIntensity = 0.18 + 0.28 * (0.5 + 0.5 * Math.sin(t * 1.4 + c.phase));
    }
    lightA.intensity = 50 + Math.sin(t * 0.9) * 25;
    lightB.intensity = 50 + Math.cos(t * 0.7) * 25;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    for (const geo of geoCache) geo.dispose();
    for (const c of crystals) c.mat.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
