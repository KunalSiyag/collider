import * as THREE from 'three';

export interface BatteryCellOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createBatteryCell(
  container: HTMLElement,
  options: BatteryCellOptions = {},
): () => void {
  const { color = '#22d3ee', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.2, 0.6, 4.8);
  camera.lookAt(0, -0.2, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.3);
  key.position.set(4, 6, 5);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const battery = new THREE.Group();
  battery.rotation.z = -0.5;
  scene.add(battery);

  // Cylindrical cell
  const wrapMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.35,
    roughness: 0.35,
    emissive: new THREE.Color(color),
    emissiveIntensity: 0.12,
  });
  const cell = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 2.1, 36), wrapMat);
  cell.rotation.z = Math.PI / 2;
  cell.position.x = -0.25;
  battery.add(cell);

  // Steel casing end
  const steelMat = new THREE.MeshStandardMaterial({ color: '#c9c4d8', metalness: 0.95, roughness: 0.18 });
  const flatEnd = new THREE.Mesh(new THREE.CylinderGeometry(0.43, 0.43, 0.06, 36), steelMat);
  flatEnd.rotation.z = Math.PI / 2;
  flatEnd.position.set(0.83, 0, 0);
  battery.add(flatEnd);
  // Nub terminal
  const nub = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.12, 24), steelMat);
  nub.rotation.z = Math.PI / 2;
  nub.position.set(0.9, 0, 0);
  battery.add(nub);

  // Label band with lightning bolt
  const bandMat = new THREE.MeshBasicMaterial({ color: '#10101a' });
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.425, 0.425, 0.62, 36), bandMat);
  band.rotation.z = Math.PI / 2;
  band.position.set(-0.25, 0, 0);
  battery.add(band);
  const boltShape = new THREE.Shape();
  boltShape.moveTo(0.05, 0.16);
  boltShape.lineTo(-0.07, 0.02);
  boltShape.lineTo(0.01, 0.0);
  boltShape.lineTo(-0.05, -0.16);
  boltShape.lineTo(0.08, 0.0);
  boltShape.lineTo(0.0, 0.02);
  boltShape.lineTo(0.05, 0.16);
  const boltMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#ffd9a0'),
    side: THREE.DoubleSide,
  });
  const bolt = new THREE.Mesh(
    new THREE.ShapeGeometry(boltShape),
    boltMat,
  );
  bolt.position.set(0.38, 0, 0);
  bolt.rotation.y = Math.PI / 2;
  battery.add(bolt);

  // Energy wisps circling the cell
  interface Wisp { pivot: THREE.Group; mesh: THREE.Mesh; radius: number; rate: number; tiltZ: number }
  const wisps: Wisp[] = [];
  for (let i = 0; i < 6; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(i % 2 === 0 ? accentColor : color),
      transparent: true,
      opacity: 0.85,
    });
    const wispMesh = new THREE.Mesh(new THREE.SphereGeometry(0.04 + Math.random() * 0.03, 10, 8), mat);
    const pivot = new THREE.Group();
    pivot.rotation.x = (i / 6) * Math.PI;
    const radius = 0.62 + (i % 3) * 0.14;
    wispMesh.position.x = radius;
    pivot.add(wispMesh);
    pivot.position.x = -0.25;
    battery.add(pivot);
    wisps.push({ pivot, mesh: wispMesh, radius, rate: 1.2 + i * 0.35, tiltZ: 0 });
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
    battery.rotation.y = t * 0.5 * speed;
    battery.position.y = Math.sin(t * 1.1 * speed) * 0.08;
    for (const w of wisps) {
      w.pivot.rotation.z = t * w.rate * speed;
      w.mesh.scale.setScalar(0.8 + Math.abs(Math.sin(t * 3 * speed + w.rate)) * 0.5);
    }
    wrapMat.emissiveIntensity = 0.08 + Math.abs(Math.sin(t * 2.2 * speed)) * 0.15;
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
