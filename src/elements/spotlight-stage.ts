import * as THREE from 'three';

export interface SpotlightStageOptions {
  color?: string;
  gridColor?: string;
  speed?: number;
}

export function createSpotlightStage(
  container: HTMLElement,
  options: SpotlightStageOptions = {},
): () => void {
  const { color = '#fafafa', gridColor = '#3f3f46', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x09090b, 9, 22);

  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 60);
  camera.position.set(0, 4.2, 9);
  camera.lookAt(0, 1.4, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.25));

  const spot = new THREE.SpotLight(0xffffff, 260, 30, 0.42, 0.45, 1.6);
  spot.position.set(0, 9, 2);
  spot.target.position.set(0, 1.4, 0);
  scene.add(spot, spot.target);

  const orbGeometry = new THREE.IcosahedronGeometry(1.15, 5);
  const orbMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.55,
    roughness: 0.18,
  });
  const orb = new THREE.Mesh(orbGeometry, orbMaterial);
  orb.position.y = 1.6;
  scene.add(orb);

  const gridHelper = new THREE.GridHelper(24, 24, new THREE.Color(gridColor), new THREE.Color(gridColor));
  (gridHelper.material as THREE.Material).transparent = true;
  (gridHelper.material as THREE.Material).opacity = 0.6;
  scene.add(gridHelper);

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

    orb.position.y = 1.6 + Math.sin(t * 1.2) * 0.35;
    orb.rotation.y = t * 0.4;
    orb.rotation.x = Math.sin(t * 0.6) * 0.2;

    spot.position.x = Math.sin(t * 0.5) * 3;
    spot.target.position.y = orb.position.y;
    spot.target.updateMatrixWorld();

    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    orbGeometry.dispose();
    orbMaterial.dispose();
    gridHelper.geometry.dispose();
    (gridHelper.material as THREE.Material).dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
