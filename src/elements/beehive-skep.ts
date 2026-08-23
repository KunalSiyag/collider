import * as THREE from 'three';

export interface BeehiveSkepOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createBeehiveSkep(
  container: HTMLElement,
  options: BeehiveSkepOptions = {},
): () => void {
  const { color = '#d4af6a', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.4, 0.8, 4.6);
  camera.lookAt(0, -0.3, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
  keyLight.position.set(4, 7, 6);
  scene.add(keyLight);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 22);
  rim.position.set(-4, 0, -3);
  scene.add(rim);

  // Grass meadow
  const meadowMat = new THREE.MeshStandardMaterial({ color: '#2c3a26', roughness: 1 });
  const meadow = new THREE.Mesh(new THREE.CircleGeometry(3.6, 44), meadowMat);
  meadow.rotation.x = -Math.PI / 2;
  meadow.position.y = -1.7;
  scene.add(meadow);

  const skepGroup = new THREE.Group();
  skepGroup.position.y = -0.55;
  scene.add(skepGroup);

  // Stacked straw torus rings forming the skep dome
  const strawMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(color).multiplyScalar(0.75), roughness: 0.95 });
  const RINGS = 7;
  for (let i = 0; i < RINGS; i++) {
    const u = i / (RINGS - 1);
    const a = Math.PI * (0.12 + u * 0.78);
    const r = Math.sin(a) * 1.15;
    const y = -Math.cos(a) * 1.05 + 1.0;
    // Each ring is a fat torus of wound straw
    const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(Math.max(r, 0.06), 0.14, 10, 44), strawMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = y;
    skepGroup.add(ringMesh);
    // Straw fiber wraps on each ring
    for (let w = 0; w < 10; w++) {
      const wa = (w / 10) * Math.PI * 2;
      const fiber = new THREE.Mesh(new THREE.TorusGeometry(Math.max(r, 0.06) * 1.001, 0.02, 4, 24), strawMat);
      fiber.rotation.x = Math.PI / 2 + 0.25 * Math.sin(wa * 3);
      fiber.position.y = y + Math.sin(wa) * 0.02;
      skepGroup.add(fiber);
      break;
    }
  }

  // Dark entrance hole
  const entrance = new THREE.Mesh(
    new THREE.CircleGeometry(0.13, 20),
    new THREE.MeshBasicMaterial({ color: 0x10101a }),
  );
  entrance.position.set(0, -0.28, 1.09);
  entrance.lookAt(entrance.position.clone().multiplyScalar(3));
  skepGroup.add(entrance);

  // Bees buzzing around
  interface Bee {
    group: THREE.Group;
    wingA: THREE.Mesh;
    wingB: THREE.Mesh;
    orbitR: number;
    phase: number;
    rate: number;
    bob: number;
  }
  const bees: Bee[] = [];
  const beeBodyMat = new THREE.MeshStandardMaterial({
    color: '#ffcf40',
    emissive: '#ffcf40',
    emissiveIntensity: 0.35,
    roughness: 0.4,
  });
  const stripeMat = new THREE.MeshStandardMaterial({ color: '#17121f', roughness: 0.5 });
  const wingMat = new THREE.MeshBasicMaterial({
    color: '#e9f4ff',
    transparent: true,
    opacity: 0.45,
    side: THREE.DoubleSide,
  });
  for (let i = 0; i < 9; i++) {
    const g = new THREE.Group();
    const bodyBee = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 8), beeBodyMat);
    bodyBee.scale.set(1.5, 1, 1);
    g.add(bodyBee);
    for (const sx of [-0.04, 0.04]) {
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.07, 0.085), stripeMat);
      stripe.position.x = sx;
      g.add(stripe);
    }
    const wingShapeGeo = new THREE.CircleGeometry(0.05, 8);
    const wingA = new THREE.Mesh(wingShapeGeo, wingMat);
    wingA.scale.set(1.4, 0.7, 1);
    wingA.position.y = 0.05;
    g.add(wingA);
    const wingB = new THREE.Mesh(wingShapeGeo, wingMat);
    wingB.scale.set(1.4, 0.7, 1);
    wingB.position.y = 0.05;
    g.add(wingB);
    scene.add(g);
    bees.push({
      group: g,
      wingA,
      wingB,
      orbitR: 1.5 + rand01(i) * 0.8,
      phase: i * 1.3,
      rate: 0.8 + rand01(i + 9) * 0.7,
      bob: 0.2 + rand01(i + 20) * 1.2,
    });
  }
  function rand01(seed: number) {
    let s = (seed * 2654435761) >>> 0;
    s = (s * 1664525 + 1013904223) >>> 0;
    return (s >>> 8) / 16777216;
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
    skepGroup.rotation.y = t * 0.3 * speed;
    for (const b of bees) {
      const a = t * b.rate * speed + b.phase;
      b.group.position.set(
        Math.cos(a) * b.orbitR,
        -0.4 + Math.sin(a * 2.3) * 0.5 + b.bob * 0.4,
        Math.sin(a * 1.2) * b.orbitR * 0.7,
      );
      b.group.rotation.y = -a;
      const flutter = Math.sin(t * 60 * speed + b.phase) * 0.7;
      b.wingA.rotation.z = flutter;
      b.wingB.rotation.z = -flutter;
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
