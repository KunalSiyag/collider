import * as THREE from 'three';

export interface TreeCanopyOptions {
  count?: number;
  accentColor?: string;
}

export function createTreeCanopy(
  container: HTMLElement,
  options: TreeCanopyOptions = {},
): () => void {
  const { count = 34, accentColor = '#a78bfa' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#0b0f0c', 8, 30);
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 50);
  camera.position.set(0, -3, 10);
  camera.lookAt(0, 6, -4);

  let seed = 448822;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Leaf {
    mesh: THREE.Mesh;
    mat: THREE.MeshStandardMaterial;
    base: THREE.Vector3;
    phase: number;
  }
  const leaves: Leaf[] = [];
  const leafGeo = new THREE.SphereGeometry(1, 10, 8);
  for (let i = 0; i < count; i++) {
    const shade = 0.16 + rand() * 0.18;
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(0.33 + rand() * 0.08, 0.5, shade),
      roughness: 0.9,
      flatShading: true,
    });
    const mesh = new THREE.Mesh(leafGeo, mat);
    const scale = 1.6 + rand() * 3.2;
    mesh.scale.set(scale * (0.8 + rand() * 0.5), scale * 0.5, scale * (0.8 + rand() * 0.5));
    const base = new THREE.Vector3((rand() - 0.5) * 20, 5 + rand() * 5, (rand() - 0.5) * 14);
    mesh.position.copy(base);
    scene.add(mesh);
    leaves.push({ mesh, mat, base, phase: rand() * Math.PI * 2 });
  }

  const shafts: { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial }[] = [];
  for (let i = 0; i < 7; i++) {
    const geo = new THREE.PlaneGeometry(0.5 + rand() * 0.9, 12);
    const mat = new THREE.MeshBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.05,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const shaft = new THREE.Mesh(geo, mat);
    shaft.position.set((rand() - 0.5) * 14, 1, -2 - rand() * 6);
    shaft.rotation.z = (rand() - 0.5) * 0.35;
    scene.add(shaft);
    shafts.push({ mesh: shaft, mat });
  }
  scene.add(new THREE.AmbientLight('#2a4030', 2));

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
    for (const leaf of leaves) {
      leaf.mesh.position.x = leaf.base.x + Math.sin(t * 0.7 + leaf.phase) * 0.35;
      leaf.mesh.position.y = leaf.base.y + Math.cos(t * 0.55 + leaf.phase * 2) * 0.25;
      leaf.mesh.rotation.y += 0.001;
    }
    shafts.forEach((shaft, i) => {
      shaft.mat.opacity = 0.03 + Math.abs(Math.sin(t * 0.4 + i)) * 0.06;
    });
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    leafGeo.dispose();
    for (const leaf of leaves) leaf.mat.dispose();
    for (const shaft of shafts) {
      shaft.mesh.geometry.dispose();
      shaft.mat.dispose();
    }
    renderer.dispose();
    renderer.domElement.remove();
  };
}
