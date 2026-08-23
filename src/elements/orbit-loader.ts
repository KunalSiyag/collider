import * as THREE from 'three';

export interface OrbitLoaderOptions {
  color?: string;
  accentColor?: string;
  size?: number;
  speed?: number;
}

export function createOrbitLoader(
  container: HTMLElement,
  options: OrbitLoaderOptions = {},
): () => void {
  const {
    color = '#fafafa',
    accentColor = '#8b5cf6',
    size = 1,
    speed = 1,
  } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
  camera.position.set(0, 2.2, 5.4);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const pointLight = new THREE.PointLight(0xffffff, 12);
  pointLight.position.set(3, 3, 3);
  scene.add(pointLight);

  const coreGeometry = new THREE.SphereGeometry(0.42 * size, 32, 32);
  const coreMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.7,
    roughness: 0.3,
  });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  scene.add(core);

  const ringGroup = new THREE.Group();
  scene.add(ringGroup);

  const disposables: Array<THREE.BufferGeometry | THREE.Material> = [coreGeometry, coreMaterial];
  const orbiters: Array<{ pivot: THREE.Group; mesh: THREE.Mesh; tilt: THREE.Group }> = [];

  for (let i = 0; i < 3; i++) {
    const radius = (0.85 + i * 0.38) * size;
    const ringGeometry = new THREE.TorusGeometry(radius, 0.02 * size, 12, 96);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(i === 1 ? accentColor : color),
      transparent: true,
      opacity: 0.35,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    disposables.push(ringGeometry, ringMaterial);

    const tilt = new THREE.Group();
    tilt.rotation.set(
      Math.PI / 2.6 + i * 0.5,
      i * 0.7,
      i * 0.35,
    );
    tilt.add(ring);
    ringGroup.add(tilt);

    const satelliteGeometry = new THREE.SphereGeometry(0.075 * size, 16, 16);
    const satelliteMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor),
    });
    const satellite = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
    satellite.position.x = radius;
    disposables.push(satelliteGeometry, satelliteMaterial);

    const pivot = new THREE.Group();
    pivot.rotation.z = Math.random() * Math.PI * 2;
    pivot.add(satellite);
    tilt.add(pivot);

    orbiters.push({ pivot, mesh: satellite, tilt });
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

    core.scale.setScalar(1 + Math.sin(t * 3 * speed) * 0.08);
    coreMaterial.emissiveIntensity = 0.55 + Math.sin(t * 3 * speed) * 0.25;

    for (let i = 0; i < orbiters.length; i++) {
      const orbiter = orbiters[i];
      orbiter.pivot.rotation.y = t * speed * (1.4 - i * 0.25) + i;
      orbiter.tilt.rotation.y += 0.002 * speed;
    }

    ringGroup.rotation.y = t * 0.15 * speed;
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
