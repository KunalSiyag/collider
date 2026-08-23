import * as THREE from 'three';

export interface RippleRingsOptions {
  rings?: number;
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createRippleRings(
  container: HTMLElement,
  options: RippleRingsOptions = {},
): () => void {
  const {
    rings = 7,
    color = '#3f3f46',
    accentColor = '#22d3ee',
    speed = 0.6,
  } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(4.2, 4.2, 6);
  camera.lookAt(0, 0, 0);

  const disposables: Array<THREE.BufferGeometry | THREE.Material> = [];
  const group = new THREE.Group();
  scene.add(group);

  const ringMeshes: Array<{ mesh: THREE.Mesh; offset: number }> = [];

  for (let i = 0; i < rings; i++) {
    const radius = 1.2;
    const geometry = new THREE.TorusGeometry(radius, 0.015, 10, 120);
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(i === Math.floor(rings / 2) ? accentColor : color),
      transparent: true,
      opacity: 0.85,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    group.add(mesh);
    ringMeshes.push({ mesh, offset: i / rings });
    disposables.push(geometry, material);
  }

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

    for (const { mesh, offset } of ringMeshes) {
      const phase = ((t * speed + offset) % 1 + 1) % 1;
      const scale = 0.25 + phase * 4.5;
      mesh.scale.setScalar(scale);
      const material = mesh.material as THREE.MeshBasicMaterial;
      material.opacity = 0.9 * (1 - phase);
      mesh.position.y = phase * 1.6;
      mesh.rotation.z = t * 0.05 + offset * Math.PI;
    }

    group.rotation.y = t * 0.12;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    disposables.forEach((d) => d.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
