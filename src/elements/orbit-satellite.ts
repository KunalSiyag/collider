import * as THREE from 'three';

export interface OrbitSatelliteOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createOrbitSatellite(
  container: HTMLElement,
  options: OrbitSatelliteOptions = {},
): () => void {
  const { color = '#d4c39a', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.8, 1.8, 4.6);
  camera.lookAt(0, 0.4, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.45));
  const sun = new THREE.DirectionalLight(0xffffff, 2.6);
  sun.position.set(5, 6, 4);
  scene.add(sun);
  const earthshine = new THREE.PointLight(new THREE.Color(accentColor), 22);
  earthshine.position.set(-4, -1, -2);
  scene.add(earthshine);

  const sat = new THREE.Group();
  sat.rotation.z = 0.25;
  scene.add(sat);

  const gold = new THREE.MeshStandardMaterial({ color: '#d4af6a', metalness: 0.9, roughness: 0.28 });
  const panelMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1e3a6e'),
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.18,
    metalness: 0.7,
    roughness: 0.25,
    side: THREE.DoubleSide,
  });
  const dishMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(color), metalness: 0.75, roughness: 0.3 });

  // Central bus
  const bus = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.05, 0.6), gold);
  sat.add(bus);
  // Gold foil wrap detail lines
  for (let i = -1; i <= 1; i += 2) {
    const band = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.06, 0.64), panelMat);
    band.position.y = i * 0.32;
    sat.add(band);
  }

  // Solar wings
  function solarWing(side: number) {
    const wing = new THREE.Group();
    const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.5, 8), gold);
    boom.rotation.z = Math.PI / 2;
    boom.position.x = side * 0.55;
    wing.add(boom);
    const panel = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.04, 0.62), panelMat);
    panel.position.x = side * 1.65;
    wing.add(panel);
    // Grid lines on the panel
    const gridMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor), transparent: true, opacity: 0.5 });
    for (let i = 0; i < 5; i++) {
      const line = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.05, 0.63), gridMat);
      line.position.set(side * (0.95 + i * 0.35), 0, 0);
      wing.add(line);
    }
    return wing;
  }
  const leftWing = solarWing(-1);
  const rightWing = solarWing(1);
  sat.add(leftWing, rightWing);

  // Comms dish on an arm
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.5, 8), gold);
  arm.position.y = -0.75;
  sat.add(arm);
  const dishGroup = new THREE.Group();
  dishGroup.position.y = -1.02;
  sat.add(dishGroup);
  const dish = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 14, 0, Math.PI * 2, 0, Math.PI / 3), dishMat);
  dish.rotation.x = Math.PI;
  dishGroup.add(dish);
  const feed = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.2, 8), gold);
  feed.position.y = 0.22;
  feed.rotation.x = Math.PI;
  dishGroup.add(feed);

  // Blinking beacon
  const beaconMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#f472b6') });
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), beaconMat);
  beacon.position.y = 0.62;
  sat.add(beacon);

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
    sat.rotation.y = t * 0.4 * speed;
    leftWing.rotation.x = Math.sin(t * 0.7 * speed) * 0.15 + Math.PI / 8;
    rightWing.rotation.x = Math.cos(t * 0.6 * speed) * 0.15 - Math.PI / 8;
    dishGroup.rotation.y = Math.sin(t * 0.9 * speed) * 0.5;
    beaconMat.color.setHSL(0.92, 0.8, 0.35 + (Math.sin(t * 6 * speed) > 0 ? 0.35 : 0));
    sat.position.y = 0.15 + Math.sin(t * 0.8 * speed) * 0.08;
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
