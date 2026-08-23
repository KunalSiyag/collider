import * as THREE from 'three';

export interface TorusTunnelOptions {
  rings?: number;
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createTorusTunnel(
  container: HTMLElement,
  options: TorusTunnelOptions = {},
): () => void {
  const {
    rings = 24,
    color = '#8b5cf6',
    accentColor = '#22d3ee',
    speed = 1,
  } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x09090b, 4, 26);

  const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 60);

  const geometry = new THREE.TorusGeometry(3, 0.05, 8, 64);
  const materials: THREE.MeshBasicMaterial[] = [];
  const ringMeshes: Array<{ mesh: THREE.Mesh; offset: number }> = [];

  for (let i = 0; i < rings; i++) {
    const isAccent = i % 6 === 0;
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(isAccent ? accentColor : color),
      transparent: true,
      opacity: isAccent ? 1 : 0.7,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    ringMeshes.push({ mesh, offset: i / rings });
    materials.push(material);
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
      const phase = ((t * speed * 0.25 + offset) % 1 + 1) % 1;
      mesh.position.z = phase * 22 - 20;
      mesh.rotation.z = t * 0.15 + offset * Math.PI * 2;
      mesh.scale.setScalar(1 + phase * 0.4);
    }

    camera.rotation.z = Math.sin(t * 0.2) * 0.08;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    geometry.dispose();
    materials.forEach((m) => m.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
