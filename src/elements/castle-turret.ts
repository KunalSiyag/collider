import * as THREE from 'three';

export interface CastleTurretOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createCastleTurret(
  container: HTMLElement,
  options: CastleTurretOptions = {},
): () => void {
  const { color = '#8a93a8', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 60);
  camera.position.set(3.4, 1.6, 5.2);
  camera.lookAt(0, -0.3, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
  keyLight.position.set(4, 7, 6);
  scene.add(keyLight);
  // Warm window light
  const windowLight = new THREE.PointLight('#ffb347', 14);
  windowLight.position.set(0, -0.3, 1.1);
  scene.add(windowLight);

  const turretGroup = new THREE.Group();
  scene.add(turretGroup);

  const stoneMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(color).multiplyScalar(0.55), roughness: 0.9 });
  const stoneDarkMat = new THREE.MeshStandardMaterial({ color: '#17121f', roughness: 0.95 });

  // Rocky base mound
  const mound = new THREE.Mesh(new THREE.DodecahedronGeometry(1.7, 0), stoneMat);
  mound.scale.y = 0.35;
  mound.position.y = -1.85;
  scene.add(mound);

  // Cylindrical tower with slight taper via lathe
  const towerProfile: THREE.Vector2[] = [
    new THREE.Vector2(1.05, -1.75),
    new THREE.Vector2(1.08, -1.2),
    new THREE.Vector2(0.98, -0.2),
    new THREE.Vector2(0.92, 0.9),
    new THREE.Vector2(0.96, 1.15),
    new THREE.Vector2(1.02, 1.22),
    new THREE.Vector2(0.92, 1.26),
  ];
  const tower = new THREE.Mesh(new THREE.LatheGeometry(towerProfile.map((p) => p.clone()), 36), stoneMat);
  scene.add(tower);
  void turretGroup;

  // Stone course lines
  for (let i = 0; i < 9; i++) {
    const y = -1.55 + i * 0.32;
    const r = y < 1.0 ? 0.98 + Math.sin(i) * 0.04 : 1.0;
    if (y > 1.15) continue;
    const course = new THREE.Mesh(new THREE.TorusGeometry(r * 1.001, 0.012, 6, 56), stoneDarkMat);
    course.rotation.x = Math.PI / 2;
    course.position.y = y;
    scene.add(course);
  }

  // Arrow slits
  for (const [a, y] of [[0.4, -0.4], [2.4, 0.15], [4.4, -0.7], [5.5, 0.3]] as Array<[number, number]>) {
    const slit = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.42, 0.08), stoneDarkMat);
    slit.position.set(Math.sin(a) * 0.97, y, Math.cos(a) * 0.97);
    slit.rotation.y = a;
    slit.rotation.z = a < 3 ? 0 : Math.PI / 4; // cross-shaped upper notch
    scene.add(slit);
  }

  // Battlements (crenellations)
  const MERLONS = 10;
  for (let i = 0; i < MERLONS; i++) {
    const a = (i / MERLONS) * Math.PI * 2;
    const merlon = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.34, 0.24), stoneMat);
    merlon.position.set(Math.sin(a) * 0.94, 1.4, Math.cos(a) * 0.94);
    merlon.rotation.y = a;
    scene.add(merlon);
  }

  // Conical roof peeking behind the parapet
  const roofMat = new THREE.MeshStandardMaterial({ color: '#5b1030', roughness: 0.55 });
  const roof = new THREE.Mesh(new THREE.ConeGeometry(1.0, 1.5, 24), roofMat);
  roof.position.y = 2.45;
  scene.add(roof);
  // Flag pole + pennant
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.9, 6), stoneDarkMat);
  pole.position.y = 3.62;
  scene.add(pole);
  const flagShape = new THREE.Shape();
  flagShape.moveTo(0, 0);
  flagShape.lineTo(0.62, 0.12);
  flagShape.quadraticCurveTo(0.3, 0.18, 0, 0.34);
  flagShape.lineTo(0, 0);
  const flagMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(accentColor),
    side: THREE.DoubleSide,
  });
  const flag = new THREE.Mesh(new THREE.ShapeGeometry(flagShape), flagMat);
  flag.position.set(0, 3.72, 0.02);
  scene.add(flag);

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
    // Slow orbit view of the tower
    scene.rotation.y = t * 0.25 * speed;
    scene.position.y = Math.sin(t * 0.7 * speed) * 0.04;
    // Waving flag
    flag.rotation.y = Math.sin(t * 3.4 * speed) * 0.25;
    flag.scale.x = 1 + Math.sin(t * 5.2 * speed) * 0.06;
    windowLight.intensity = 11 + Math.abs(Math.sin(t * 1.8 * speed)) * 6;
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
