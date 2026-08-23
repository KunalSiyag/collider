import * as THREE from 'three';

export interface MirrorHallOptions {
  count?: number;
  accentColor?: string;
}

export function createMirrorHall(
  container: HTMLElement,
  options: MirrorHallOptions = {},
): () => void {
  const { count = 16, accentColor = '#22d3ee' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#0b0b10', 4, 34);
  const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 60);
  camera.position.set(0, 0, 6);

  let seed = 616161;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const frameGeo = new THREE.BoxGeometry(3.4, 5.4, 0.12);
  const panels: { mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial; phase: number }[] = [];
  for (let i = 0; i < count * 2; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const row = Math.floor(i / 2);
    const mat = new THREE.MeshStandardMaterial({
      color: '#151225',
      roughness: 0.05,
      metalness: 0.95,
      emissive: accentColor,
      emissiveIntensity: 0,
    });
    const mesh = new THREE.Mesh(frameGeo, mat);
    mesh.position.set(side * 3, (row - count / 2) * -0.0 + (rand() - 0.5) * 0.2, -row * 3.4);
    mesh.rotation.y = side * 0.35;
    scene.add(mesh);
    panels.push({ mesh, mat, phase: rand() * Math.PI * 2 });
  }

  const orbGeo = new THREE.IcosahedronGeometry(0.35, 1);
  const orbMat = new THREE.MeshStandardMaterial({
    color: '#e9d5ff',
    emissive: '#8b5cf6',
    emissiveIntensity: 1.2,
    roughness: 0.2,
  });
  const orb = new THREE.Mesh(orbGeo, orbMat);
  scene.add(orb);
  const light = new THREE.PointLight('#a78bfa', 30, 20);
  scene.add(light);

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
    orb.position.set(Math.sin(t * 0.7) * 1.6, Math.sin(t * 1.1) * 0.8, Math.cos(t * 0.5) * 2 - 4);
    light.position.copy(orb.position);
    for (const panel of panels) {
      const d = panel.mesh.position.distanceTo(orb.position);
      panel.mat.emissiveIntensity = Math.max(0, 0.9 - d * 0.18) + Math.sin(t * 2 + panel.phase) * 0.05;
    }
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    frameGeo.dispose();
    orbGeo.dispose();
    orbMat.dispose();
    for (const panel of panels) panel.mat.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
