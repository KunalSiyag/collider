import * as THREE from 'three';

export interface DiscoBallOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createDiscoBall(
  container: HTMLElement,
  options: DiscoBallOptions = {},
): () => void {
  const { color = '#e9e4f5', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.5, -0.3, 4.8);
  camera.lookAt(0, 0.4, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.35));
  // Party lights that sweep the ball
  const lightA = new THREE.PointLight(new THREE.Color(accentColor), 40);
  lightA.position.set(4, 2, 2);
  scene.add(lightA);
  const lightB = new THREE.PointLight(new THREE.Color('#22d3ee'), 36);
  lightB.position.set(-4, 1, 3);
  scene.add(lightB);

  const root = new THREE.Group();
  root.position.y = 0.6;
  scene.add(root);

  // Hanging cord
  const cord = new THREE.Mesh(
    new THREE.CylinderGeometry(0.012, 0.012, 2.4, 6),
    new THREE.MeshStandardMaterial({ color: '#554466', roughness: 0.7 }),
  );
  cord.position.y = 2.6;
  scene.add(cord);

  // Motor housing
  const motor = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.22, 0.22, 20),
    new THREE.MeshStandardMaterial({ color: '#241b33', roughness: 0.5 }),
  );
  motor.position.y = 1.45;
  root.add(motor);

  // Mirror ball core
  const coreMat = new THREE.MeshStandardMaterial({ color: '#17121f', roughness: 0.3 });
  const core = new THREE.Mesh(new THREE.SphereGeometry(1.02, 32, 24), coreMat);
  root.add(core);
  void core;

  // Mirror tiles as instanced flat squares on the sphere
  const ROWS = 12;
  const tileGeo = new THREE.PlaneGeometry(1, 1);
  const tiles: Array<{ mesh: THREE.Mesh; normal: THREE.Vector3 }> = [];
  let total = 0;
  for (let r = 0; r < ROWS; r++) {
    const phi = ((r + 0.5) / ROWS) * Math.PI;
    const circumference = Math.sin(phi) * Math.PI * 2;
    const cols = Math.max(4, Math.round(circumference / (Math.PI / ROWS) * ROWS * 0.55));
    total += cols;
  }
  const tileMesh = new THREE.InstancedMesh(tileGeo, new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    metalness: 1,
    roughness: 0.05,
    envMapIntensity: 2,
  }), total);
  const dummy = new THREE.Object3D();
  let idx = 0;
  const R = 1.03;
  for (let r = 0; r < ROWS; r++) {
    const phi = ((r + 0.5) / ROWS) * Math.PI;
    const cols = Math.max(4, Math.round(Math.sin(phi) * ROWS * 2 * (Math.PI * R) / (Math.PI * R)));
    for (let c = 0; c < cols; c++) {
      const theta = ((c + (r % 2) * 0.5) / cols) * Math.PI * 2;
      const n = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta),
      );
      dummy.position.copy(n.clone().multiplyScalar(R));
      dummy.lookAt(n.clone().multiplyScalar(2));
      dummy.scale.setScalar(0.16 * Math.PI * R * 2 / (cols * 0.28));
      dummy.updateMatrix();
      tileMesh.setMatrixAt(idx++, dummy.matrix);
      tiles.push({ mesh: tileMesh, normal: n });
    }
  }
  root.add(tileMesh);
  void tiles;

  // Light dots cast on a surrounding "floor" ring
  interface Spot { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; phase: number }
  const spots: Spot[] = [];
  const spotGeo = new THREE.CircleGeometry(0.09, 12);
  for (let i = 0; i < 26; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: i % 3 === 0 ? new THREE.Color(accentColor) : i % 3 === 1 ? new THREE.Color('#22d3ee') : new THREE.Color(color),
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const spotMesh = new THREE.Mesh(spotGeo, mat);
    const a = (i / 26) * Math.PI * 2;
    spotMesh.position.set(Math.cos(a) * 2.6, -1.7, Math.sin(a) * 2.6);
    spotMesh.rotation.x = -Math.PI / 2;
    scene.add(spotMesh);
    spots.push({ mesh: spotMesh, mat, phase: i });
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
    root.rotation.y = t * 0.9 * speed;
    root.rotation.z = Math.sin(t * 0.8 * speed) * 0.08;
    // Sweeping party lights
    lightA.position.set(Math.cos(t * 1.4 * speed) * 5, 2, Math.sin(t * 1.4 * speed) * 5);
    lightB.position.set(Math.cos(-t * 1.1 * speed + 2) * 5, 1, Math.sin(-t * 1.1 * speed + 2) * 5);
    // Dappled floor spots twinkle
    for (const s of spots) {
      s.mat.opacity = Math.max(0, Math.sin(t * 6 * speed + s.phase * 2.7)) * 0.75;
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
