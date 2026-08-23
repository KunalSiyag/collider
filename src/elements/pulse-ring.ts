import * as THREE from 'three';

export interface PulseRingOptions {
  color?: string;
  size?: number;
  speed?: number;
  ringCount?: number;
}

export function createPulseRing(
  container: HTMLElement,
  options: PulseRingOptions = {},
): () => void {
  const { color = '#22d3ee', size = 1, speed = 1, ringCount = 3 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
  camera.position.set(0, 0, 6 * size);

  const geometry = new THREE.RingGeometry(0.42 * size, 0.5 * size, 64);
  const materials: THREE.MeshBasicMaterial[] = [];
  const rings: Array<{ mesh: THREE.Mesh; offset: number }> = [];

  for (let i = 0; i < ringCount; i++) {
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    rings.push({ mesh, offset: i / ringCount });
    materials.push(material);
  }

  const coreGeometry = new THREE.CircleGeometry(0.16 * size, 48);
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
  });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  scene.add(core);

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width === 0 || height === 0) return;
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

    for (const { mesh, offset } of rings) {
      const phase = ((t * speed + offset) % 1 + 1) % 1;
      mesh.scale.setScalar(1 + phase * 3.2);
      (mesh.material as THREE.MeshBasicMaterial).opacity = 0.9 * (1 - phase);
    }

    core.scale.setScalar(1 + Math.sin(t * speed * Math.PI * 2) * 0.15);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    geometry.dispose();
    coreGeometry.dispose();
    materials.forEach((m) => m.dispose());
    coreMaterial.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
