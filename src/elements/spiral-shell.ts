import * as THREE from 'three';

export interface SpiralShellOptions {
  accentColor?: string;
  speed?: number;
}

export function createSpiralShell(
  container: HTMLElement,
  options: SpiralShellOptions = {},
): () => void {
  const { accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 60);
  camera.position.set(0, 4, 14);
  camera.lookAt(0, 0, 0);

  let seed = 137035;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const group = new THREE.Group();
  const tubeMat = new THREE.MeshStandardMaterial({
    color: '#2a2440',
    roughness: 0.5,
    metalness: 0.3,
    emissive: accentColor,
    emissiveIntensity: 0.12,
  });
  const turns = 6;
  const segmentsPerTurn = 60;
  for (let i = 0; i < turns * segmentsPerTurn; i++) {
    const t = (i / (turns * segmentsPerTurn)) * Math.PI * 2 * turns;
    const growth = i / (turns * segmentsPerTurn);
    const radius = 0.35 + growth * 3.2;
    const x = Math.cos(t) * radius;
    const z = Math.sin(t) * radius;
    const y = growth * 2.6 - 1.3 + Math.sin(growth * Math.PI) * 0.8;
    const tubeRadius = 0.06 + growth * 0.22;
    const geometry = new THREE.TorusGeometry(tubeRadius, 0.03, 6, 18);
    const mesh = new THREE.Mesh(geometry, tubeMat);
    mesh.position.set(x, y, z);
    mesh.rotation.x = t;
    group.add(mesh);
  }
  scene.add(group);
  void rand;

  scene.add(new THREE.AmbientLight('#443c66', 1.6));
  const lightA = new THREE.PointLight(accentColor, 90, 26);
  lightA.position.set(6, 5, 6);
  const lightB = new THREE.PointLight('#22d3ee', 70, 26);
  lightB.position.set(-7, -3, 4);
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
    const t = clock.getElapsedTime() * speed;
    group.rotation.y = t * 0.25;
    group.rotation.x = Math.sin(t * 0.2) * 0.15;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    for (const child of group.children as THREE.Mesh[]) child.geometry.dispose();
    tubeMat.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
