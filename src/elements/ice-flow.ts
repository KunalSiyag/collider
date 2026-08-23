import * as THREE from 'three';

export interface IceFlowOptions {
  count?: number;
  accentColor?: string;
}

export function createIceFlow(
  container: HTMLElement,
  options: IceFlowOptions = {},
): () => void {
  const { count = 60, accentColor = '#22d3ee' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#0b0b10', 10, 40);
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 60);
  camera.position.set(0, 5.5, 13);
  camera.lookAt(0, -1, 0);

  let seed = 5150;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const waterGeo = new THREE.PlaneGeometry(50, 40);
  const waterMat = new THREE.MeshStandardMaterial({
    color: '#0e2733',
    roughness: 0.2,
    metalness: 0.6,
  });
  const water = new THREE.Mesh(waterGeo, waterMat);
  water.rotation.x = -Math.PI / 2;
  scene.add(water);

  const floes: { mesh: THREE.Mesh; drift: number; bobPhase: number }[] = [];
  for (let i = 0; i < count; i++) {
    const sizeX = 0.8 + rand() * 2.6;
    const geometry = new THREE.BoxGeometry(sizeX, 0.22 + rand() * 0.25, sizeX * (0.6 + rand() * 0.7));
    const material = new THREE.MeshStandardMaterial({
      color: '#bcd9ea',
      roughness: 0.35,
      metalness: 0.1,
      transparent: true,
      opacity: 0.92,
      flatShading: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set((rand() - 0.5) * 26, -0.05 + rand() * 0.08, (rand() - 0.5) * 24);
    mesh.rotation.y = rand() * Math.PI;
    scene.add(mesh);
    floes.push({ mesh, drift: 0.15 + rand() * 0.4, bobPhase: rand() * Math.PI * 2 });
  }

  scene.add(new THREE.AmbientLight('#445566', 2));
  const moon = new THREE.DirectionalLight(accentColor, 1.6);
  moon.position.set(-8, 10, 4);
  scene.add(moon);

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
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.getElapsedTime();
    for (const floe of floes) {
      floe.mesh.position.x += floe.drift * dt;
      if (floe.mesh.position.x > 14) floe.mesh.position.x = -14;
      floe.mesh.position.y = Math.sin(t * 0.9 + floe.bobPhase) * 0.06;
      floe.mesh.rotation.z = Math.sin(t * 0.7 + floe.bobPhase) * 0.03;
    }
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    waterGeo.dispose();
    waterMat.dispose();
    for (const floe of floes) {
      floe.mesh.geometry.dispose();
      (floe.mesh.material as THREE.Material).dispose();
    }
    renderer.dispose();
    renderer.domElement.remove();
  };
}
