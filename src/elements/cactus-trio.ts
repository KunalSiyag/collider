import * as THREE from 'three';

export interface CactusTrioOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createCactusTrio(
  container: HTMLElement,
  options: CactusTrioOptions = {},
): () => void {
  const { color = '#22d3ee', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.6, 1.8, 4.4);
  camera.lookAt(0, -0.3, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const key = new THREE.DirectionalLight(0xffffff, 2.3);
  key.position.set(4, 6, 4);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const group = new THREE.Group();
  group.position.y = -0.9;
  scene.add(group);

  const rand = (() => {
    let s = 33333 >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  })();

  const cactusMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(color).multiplyScalar(0.55), roughness: 0.65 });
  const potPalette = ['#8b5cf6', '#a78bfa', '#f472b6'];

  // Terracotta-style pot via lathe
  function makePot(radius: number): THREE.Mesh {
    const profile = [
      new THREE.Vector2(radius * 0.62, 0),
      new THREE.Vector2(radius * 0.68, 0.04),
      new THREE.Vector2(radius * 0.82, 0.42),
      new THREE.Vector2(radius * 0.86, 0.46),
      new THREE.Vector2(radius * 0.9, 0.52),
      new THREE.Vector2(radius * 0.84, 0.54),
    ];
    return new THREE.Mesh(
      new THREE.LatheGeometry(profile, 32),
      new THREE.MeshStandardMaterial({ color: new THREE.Color(potPalette[Math.floor(rand() * 3)]), roughness: 0.5 }),
    );
  }

  // Spine dots on a pad or trunk
  function addSpines(parent: THREE.Group, height: number, radius: number) {
    const spineMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(accentColor), emissive: new THREE.Color(accentColor), emissiveIntensity: 0.5 });
    for (let i = 0; i < Math.floor(height * 14); i++) {
      const a = (i * 137.5 * Math.PI) / 180;
      const y = (rand() - 0.5) * height;
      const spine = new THREE.Mesh(new THREE.SphereGeometry(0.018, 6, 6), spineMat);
      spine.position.set(Math.cos(a) * radius * 1.01, y, Math.sin(a) * radius * 1.01);
      parent.add(spine);
    }
  }

  // Saguaro with two arms
  const saguaro = new THREE.Group();
  saguaro.position.set(-0.95, 0.54, 0);
  const trunk = new THREE.Mesh(new THREE.CapsuleGeometry(0.24, 1.15, 8, 20), cactusMat);
  trunk.position.y = 0.85;
  saguaro.add(trunk);
  for (const side of [-1, 1]) {
    const elbow = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.34, 6, 14), cactusMat);
    elbow.rotation.z = side * Math.PI / 2;
    elbow.position.set(side * 0.38, 0.95 + side * 0.12, 0);
    saguaro.add(elbow);
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.5, 6, 14), cactusMat);
    arm.position.set(side * 0.56, 1.35 + side * 0.05, 0);
    saguaro.add(arm);
  }
  addSpines(saguaro, 2.0, 0.25);
  const potA = makePot(0.75);
  potA.position.set(-0.95, 0.27, 0);
  group.add(potA);

  // Barrel cactus
  const barrel = new THREE.Group();
  barrel.position.set(0.55, 0.72, 0.35);
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.36, 24, 18), cactusMat);
  ball.scale.y = 0.85;
  barrel.add(ball);
  for (let ridgeI = 0; ridgeI < 10; ridgeI++) {
    const a = (ridgeI / 10) * Math.PI * 2;
    const ridgeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.31, 0),
      new THREE.Vector3(Math.cos(a) * 0.28, 0, Math.sin(a) * 0.28),
      new THREE.Vector3(0, -0.31, 0),
    ]);
    const ridge = new THREE.Mesh(new THREE.TubeGeometry(ridgeCurve, 16, 0.02, 6), accentRidgeMat());
    barrel.add(ridge);
  }
  function accentRidgeMat() {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(accentColor),
      emissive: new THREE.Color(accentColor),
      emissiveIntensity: 0.45,
      roughness: 0.4,
    });
  }
  group.add(barrel);
  const potB = makePot(0.62);
  potB.position.set(0.55, 0.44, 0.35);
  group.add(potB);

  // Prickly pear pads
  const pear = new THREE.Group();
  pear.position.set(1.35, 0.56, -0.3);
  for (let i = 0; i < 4; i++) {
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.22 - i * 0.02, 0.22 - i * 0.02, 0.07, 20), cactusMat);
    pad.scale.y = 1.25;
    pad.position.y = 0.18 + i * 0.3;
    pad.rotation.z = (i % 2 === 0 ? 1 : -1) * (0.15 + i * 0.1);
    pad.rotation.x = Math.PI / 2;
    pear.add(pad);
  }
  addSpines(pear, 1.2, 0.2);
  group.add(pear);
  const potC = makePot(0.58);
  potC.position.set(1.35, 0.26, -0.3);
  group.add(potC);

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
    group.rotation.y = t * 0.4 * speed;
    group.position.y = -0.9 + Math.sin(t * 1.0 * speed) * 0.05;
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
