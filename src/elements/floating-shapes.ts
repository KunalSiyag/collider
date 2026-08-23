import * as THREE from 'three';

export interface FloatingShapesOptions {
  count?: number;
  speed?: number;
  spread?: number;
  colors?: string[];
  parallax?: number;
}

interface Floater {
  mesh: THREE.Mesh;
  basePosition: THREE.Vector3;
  phase: number;
  rotationSpeed: THREE.Vector3;
  bobSpeed: number;
}

export function createFloatingShapes(
  container: HTMLElement,
  options: FloatingShapesOptions = {},
): () => void {
  const {
    count = 14,
    speed = 1,
    spread = 7,
    colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#fafafa'],
    parallax = 0.6,
  } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(4, 6, 6);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x8b5cf6, 1.4);
  rimLight.position.set(-6, -3, -4);
  scene.add(rimLight);

  const geometries: THREE.BufferGeometry[] = [
    new THREE.IcosahedronGeometry(0.55),
    new THREE.TorusGeometry(0.42, 0.17, 20, 40),
    new THREE.OctahedronGeometry(0.52),
    new THREE.BoxGeometry(0.62, 0.62, 0.62),
    new THREE.ConeGeometry(0.4, 0.85, 24),
    new THREE.TorusKnotGeometry(0.32, 0.11, 90, 16),
  ];

  const materials = colors.map(
    (color) =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        metalness: 0.35,
        roughness: 0.25,
      }),
  );

  const floaters: Floater[] = [];
  for (let i = 0; i < count; i++) {
    const geometry = geometries[i % geometries.length];
    const material = materials[Math.floor(Math.random() * materials.length)];
    const scale = 0.5 + Math.random() * 1.1;
    const mesh = new THREE.Mesh(geometry, material);
    const basePosition = new THREE.Vector3(
      (Math.random() - 0.5) * spread * 1.6,
      (Math.random() - 0.5) * spread,
      (Math.random() - 0.5) * spread,
    );
    mesh.position.copy(basePosition);
    mesh.scale.setScalar(scale);
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    scene.add(mesh);
    floaters.push({
      mesh,
      basePosition,
      phase: Math.random() * Math.PI * 2,
      rotationSpeed: new THREE.Vector3(
        (Math.random() - 0.5) * 0.6,
        (Math.random() - 0.5) * 0.6,
        (Math.random() - 0.5) * 0.3,
      ),
      bobSpeed: 0.4 + Math.random() * 0.7,
    });
  }

  const mouse = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };

  function onPointerMove(event: PointerEvent) {
    const rect = container.getBoundingClientRect();
    target.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    target.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
  }

  window.addEventListener('pointermove', onPointerMove);

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
    const t = clock.getElapsedTime() * speed;

    mouse.x += (target.x - mouse.x) * 0.05;
    mouse.y += (target.y - mouse.y) * 0.05;
    camera.position.x = mouse.x * parallax;
    camera.position.y = -mouse.y * parallax;
    camera.lookAt(0, 0, 0);

    for (const floater of floaters) {
      floater.mesh.position.y =
        floater.basePosition.y + Math.sin(t * floater.bobSpeed + floater.phase) * 0.35;
      floater.mesh.rotation.x += floater.rotationSpeed.x * 0.008;
      floater.mesh.rotation.y += floater.rotationSpeed.y * 0.008;
      floater.mesh.rotation.z += floater.rotationSpeed.z * 0.008;
    }

    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    window.removeEventListener('pointermove', onPointerMove);
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
