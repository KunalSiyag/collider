import * as THREE from 'three';

export interface SpaceStationCoreOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createSpaceStationCore(
  container: HTMLElement,
  options: SpaceStationCoreOptions = {},
): () => void {
  const { color = '#c9c4d8', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 60);
  camera.position.set(4.2, 2.2, 5.0);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.45));
  const sun = new THREE.DirectionalLight(0xffffff, 2.6);
  sun.position.set(6, 5, 4);
  scene.add(sun);
  const fill = new THREE.PointLight(new THREE.Color(accentColor), 26);
  fill.position.set(-5, -2, -3);
  scene.add(fill);

  const station = new THREE.Group();
  scene.add(station);

  const hullMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(color), metalness: 0.7, roughness: 0.35 });
  const windowMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor) });
  const panelMat = new THREE.MeshStandardMaterial({
    color: '#1e3a6e',
    metalness: 0.7,
    roughness: 0.25,
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.12,
    side: THREE.DoubleSide,
  });

  // Rotating habitation ring
  const ring = new THREE.Group();
  station.add(ring);
  const torus = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.28, 16, 72), hullMat);
  ring.add(torus);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const win = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 0.02), windowMat);
    win.position.set(Math.cos(a) * 2.18, Math.sin(a) * 2.18, 0.24);
    ring.add(win);
    const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.62, 8), hullMat);
    spoke.rotation.z = a + Math.PI / 2;
    spoke.position.set(Math.cos(a + Math.PI / 2) * -0.81, Math.sin(a + Math.PI / 2) * 0.81, 0);
    ring.add(spoke);
  }

  // Central spine with docking hub
  const spine = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 3.4, 20), hullMat);
  station.add(spine);
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.5, 20), hullMat);
  station.add(hub);
  const dockingPort = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.07, 10, 28), panelMat);
  dockingPort.rotation.x = Math.PI / 2;
  dockingPort.position.y = 1.75;
  station.add(dockingPort);

  // Sensor dome
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshPhysicalMaterial({
      color: '#22d3ee',
      transmission: 0.65,
      roughness: 0.05,
      transparent: true,
      opacity: 0.85,
    }),
  );
  dome.position.y = -0.28;
  station.add(dome);

  // Solar arrays on the spine
  for (const [side, tilt] of [[-1, 0.35], [1, -0.35]] as const) {
    const array = new THREE.Group();
    const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8), hullMat);
    boom.rotation.z = Math.PI / 2;
    boom.position.x = side * 0.75;
    array.add(boom);
    for (let p = 0; p < 2; p++) {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.03, 0.7), panelMat);
      panel.position.set(side * (1.72 + p * 1.25), 0, 0);
      array.add(panel);
    }
    array.rotation.z = tilt;
    array.position.y = 0.9;
    station.add(array);
  }

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
    ring.rotation.z = t * 0.8 * speed;
    station.rotation.y = t * 0.22 * speed;
    station.rotation.x = Math.sin(t * 0.3 * speed) * 0.12;
    station.position.y = Math.sin(t * 0.6 * speed) * 0.08;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((m) => m.dispose());
      }
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
