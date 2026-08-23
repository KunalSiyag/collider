import * as THREE from 'three';

export interface SatelliteDishOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createSatelliteDish(
  container: HTMLElement,
  options: SatelliteDishOptions = {},
): () => void {
  const { color = '#c9c4d8', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 60);
  camera.position.set(3.6, 1.8, 5.0);
  camera.lookAt(0, 0.5, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(4, 7, 5);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 1, -3);
  scene.add(rim);

  const station = new THREE.Group();
  scene.add(station);

  // Concrete pad and mount
  const padMat = new THREE.MeshStandardMaterial({ color: '#241b33', roughness: 0.9 });
  const pad = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.3, 0.22, 36), padMat);
  pad.position.y = -1.15;
  station.add(pad);
  const yokeMat = new THREE.MeshStandardMaterial({ color: '#5b4632', metalness: 0.4, roughness: 0.55 });
  for (const side of [-1, 1]) {
    const cheek = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.9, 0.5), yokeMat);
    cheek.position.set(side * 0.42, -0.62, 0);
    cheek.rotation.x = -0.35;
    station.add(cheek);
  }

  // Dish assembly tilts on the yoke
  const dishPivot = new THREE.Group();
  dishPivot.position.y = -0.25;
  station.add(dishPivot);

  // Parabolic dish via lathe of a parabola
  const profilePts: THREE.Vector2[] = [];
  for (let i = 0; i <= 16; i++) {
    const r = (i / 16) * 1.75;
    profilePts.push(new THREE.Vector2(r, r * r * 0.16));
  }
  const dishMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.75,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const dish = new THREE.Mesh(new THREE.LatheGeometry(profilePts.reverse(), 48), dishMat);
  dish.rotation.x = Math.PI / 2;
  dishPivot.add(dish);

  // Ribs on the back
  const ribMat = new THREE.MeshStandardMaterial({ color: '#8a93a8', metalness: 0.6, roughness: 0.45 });
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const curvePts = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(Math.cos(a) * 0.9, Math.sin(a) * 0.9, 0.09),
      new THREE.Vector3(Math.cos(a) * 1.72, Math.sin(a) * 1.72, 0.47),
    ];
    const rib = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(curvePts), 16, 0.03, 8), ribMat);
    dish.add(rib);
  }

  // Feed horn on struts + signal pulse
  const feedMat = new THREE.MeshStandardMaterial({ color: '#10101a', roughness: 0.6 });
  const feed = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.3, 14, 1, true), feedMat);
  feed.position.z = 0.95;
  dish.add(feed);
  for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]] as const) {
    const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.0, 6), ribMat);
    strut.position.set(sx * 0.55, sy * 0.55, 0.48);
    strut.lookAt(new THREE.Vector3(0, 0, 0.95).add(dish.position));
    strut.rotateX(Math.PI / 2);
    dish.add(strut);
  }

  interface Pulse { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; offset: number }
  const pulses: Pulse[] = [];
  const pulseDir = new THREE.Vector3(0, 0.72, 1).normalize();
  for (let i = 0; i < 5; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.01, 6, 40), mat);
    dish.add(ringMesh);
    pulses.push({ mesh: ringMesh, mat, offset: i / 5 });
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
    // Slow sky-tracking sweep
    dishPivot.rotation.y = Math.sin(t * 0.32 * speed) * 0.85;
    dishPivot.rotation.x = 0.62 + Math.sin(t * 0.45 * speed + 1.2) * 0.12;
    station.position.y = Math.sin(t * 0.8 * speed) * 0.03;
    for (const p of pulses) {
      const phase = (t * 0.9 * speed + p.offset) % 1;
      p.mesh.scale.setScalar(0.5 + phase * 3.2);
      p.mesh.position.copy(pulseDir.clone().multiplyScalar(phase * 3.2));
      p.mat.opacity = (1 - phase) * 0.5;
    }
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
