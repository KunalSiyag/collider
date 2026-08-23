import * as THREE from 'three';

export interface BowlingPinOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createBowlingPin(
  container: HTMLElement,
  options: BowlingPinOptions = {},
): () => void {
  const { color = '#f5f3ff', accentColor = '#e63946', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.2, 1.2, 4.6);
  camera.lookAt(0, -0.6, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
  keyLight.position.set(4, 7, 6);
  scene.add(keyLight);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 24);
  rim.position.set(-4, 1, -3);
  scene.add(rim);

  // Glossy lane
  const laneMat = new THREE.MeshPhysicalMaterial({ color: '#8a6a4a', roughness: 0.12, clearcoat: 0.9 });
  const lane = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.12, 6), laneMat);
  lane.position.y = -1.55;
  scene.add(lane);
  // Lane arrows
  const arrowMat = new THREE.MeshBasicMaterial({ color: '#3a2b52' });
  for (let i = 0; i < 5; i++) {
    const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.22, 3), arrowMat);
    arrow.rotation.x = -Math.PI / 2;
    arrow.rotation.z = Math.PI;
    arrow.position.set((i - 2) * 0.45, -1.47, 0.9 - Math.abs(i - 2) * 0.35);
    scene.add(arrow);
  }

  // Pin via lathe profile
  const pinProfile: THREE.Vector2[] = [
    new THREE.Vector2(0.01, 0),
    new THREE.Vector2(0.26, 0.02),
    new THREE.Vector2(0.28, 0.12),
    new THREE.Vector2(0.24, 0.32),
    new THREE.Vector2(0.19, 0.52),
    new THREE.Vector2(0.21, 0.68),
    new THREE.Vector2(0.29, 0.82),
    new THREE.Vector2(0.31, 0.95),
    new THREE.Vector2(0.27, 1.08),
    new THREE.Vector2(0.15, 1.16),
    new THREE.Vector2(0.05, 1.18),
  ];
  const pinMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    roughness: 0.12,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
  });

  interface Pin { mesh: THREE.Group; basePos: THREE.Vector3; phase: number; fallen: boolean }
  const pins: Pin[] = [];
  function addPin(x: number, z: number) {
    const g = new THREE.Group();
    const pinMesh = new THREE.Mesh(new THREE.LatheGeometry(pinProfile.map((p) => p.clone()), 30), pinMat);
    g.add(pinMesh);
    // Twin neck stripes
    const stripeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor) });
    for (const y of [0.62, 0.7]) {
      const stripeR = 0.205 + (y - 0.52) * 0.25;
      const stripe = new THREE.Mesh(new THREE.TorusGeometry(stripeR + 0.005, 0.014, 8, 32), stripeMat);
      stripe.rotation.x = Math.PI / 2;
      stripe.position.y = y;
      g.add(stripe);
    }
    g.position.set(x, -1.49, z);
    scene.add(g);
    pins.push({ mesh: g, basePos: g.position.clone(), phase: x * 3 + z * 5, fallen: false });
  }
  // Rack formation
  const rackRows = [
    [0],
    [-0.34, 0.34],
    [-0.68, 0, 0.68],
    [-1.02, -0.34, 0.34, 1.02],
  ];
  rackRows.forEach((row, ri) => {
    row.forEach((x) => addPin(x, -1.2 - ri * 0.55));
  });

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
  let strikeT = 0;
  function tick() {
    raf = requestAnimationFrame(tick);
    strikeT += clock.getDelta() * speed;
    if (strikeT > 4.5) {
      strikeT = 0;
      for (const p of pins) {
        p.fallen = false;
        p.mesh.position.copy(p.basePos);
        p.mesh.rotation.set(0, 0, 0);
      }
    }
    const t = clock.elapsedTime;
    // A strike wave sweeps the rack
    if (strikeT > 0.8 && strikeT < 1.6) {
      for (const p of pins) {
        if (!p.fallen && strikeT > 0.8 + Math.abs(p.phase) * 0.06) {
          p.fallen = true;
        }
      }
    }
    for (const p of pins) {
      if (p.fallen) {
        const k = Math.min(1, (strikeT - 0.8) * 3);
        const dir = Math.sign(p.mesh.position.x || 1);
        p.mesh.rotation.z = dir * k * (Math.PI / 2 + 0.15);
        p.mesh.position.y = p.basePos.y - Math.sin(k * Math.PI / 2) * 0.18;
        p.mesh.position.x = p.basePos.x + dir * k * 0.35;
      } else {
        p.mesh.rotation.y += 0.002 * speed;
      }
    }
    void t;
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
