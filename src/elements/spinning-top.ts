import * as THREE from 'three';

export interface SpinningTopOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createSpinningTop(
  container: HTMLElement,
  options: SpinningTopOptions = {},
): () => void {
  const { color = '#f472b6', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.2, 0.6, 4.4);
  camera.lookAt(0, -0.5, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
  keyLight.position.set(4, 7, 6);
  scene.add(keyLight);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 1, -3);
  scene.add(rim);

  // Table surface
  const tableMat = new THREE.MeshStandardMaterial({ color: '#241b33', roughness: 0.5 });
  const tableMatMesh = new THREE.Mesh(new THREE.CylinderGeometry(2.8, 2.8, 0.14, 48), tableMat);
  tableMatMesh.position.y = -1.6;
  scene.add(tableMatMesh);
  void color;

  // Top body via lathe with painted bands
  const topGroup = new THREE.Group();
  scene.add(topGroup);

  const bodyProfile: THREE.Vector2[] = [
    new THREE.Vector2(0.01, 1.35),
    new THREE.Vector2(0.09, 1.28),
    new THREE.Vector2(0.12, 1.05),
    new THREE.Vector2(0.42, 0.78),
    new THREE.Vector2(0.62, 0.45),
    new THREE.Vector2(0.58, 0.22),
    new THREE.Vector2(0.38, 0.06),
    new THREE.Vector2(0.12, -0.02),
    new THREE.Vector2(0.02, -0.08),
  ];
  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    roughness: 0.15,
    clearcoat: 0.9,
    clearcoatRoughness: 0.1,
  });
  const body = new THREE.Mesh(new THREE.LatheGeometry(bodyProfile.map((p) => p.clone()), 44), bodyMat);
  body.position.y = -0.75;
  topGroup.add(body);

  // Painted spiral stripes via thin tori at varying heights
  const stripeColors = [accentColor, '#a78bfa', '#ffd9a0'];
  for (let i = 0; i < 7; i++) {
    const y = 0.18 + i * 0.13;
    const u = (y + 0) / 0.91;
    const rApprox = 0.62 * Math.sin(Math.PI * Math.min(0.95, 0.25 + u * 0.65)) * 1.05;
    const hueIdx = i % stripeColors.length;
    const stripeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(stripeColors[hueIdx]) });
    const stripe = new THREE.Mesh(
      new THREE.TorusGeometry(rApprox * (1 - u * 0.25) + 0.01, 0.02, 8, 40),
      stripeMat,
    );
    stripe.rotation.x = Math.PI / 2;
    stripe.position.y = y;
    stripe.rotation.z = i * 0.2; // slight spiral offset illusion
    stripe.scale.y = 1;
    topGroup.add(stripe);
  }

  // Metal tip
  const tipMat = new THREE.MeshStandardMaterial({ color: '#c9c4d8', metalness: 0.98, roughness: 0.1 });
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.16, 14), tipMat);
  tip.position.y = -0.86;
  tip.rotation.x = Math.PI;
  topGroup.add(tip);

  // Knurled grip knob on top
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const ridge = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.14, 0.02), tipMat);
    ridge.position.set(Math.cos(a) * 0.105, 0.52, Math.sin(a) * 0.105);
    ridge.rotation.y = -a;
    topGroup.add(ridge);
  }

  // Spin-down wobble trail rings
  interface TrailRing { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; offset: number }
  const trails: TrailRing[] = [];
  for (let i = 0; i < 3; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(0.66, 0.008, 6, 56), mat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -0.32;
    scene.add(ringMesh);
    trails.push({ mesh: ringMesh, mat, offset: i / 3 });
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
  let spinT = 0;
  function tick() {
    raf = requestAnimationFrame(tick);
    spinT += clock.getDelta() * speed;
    if (spinT > 6) spinT = 0;
    // Fast spin decaying to wobble, then "re-launched"
    const energy = Math.exp(-spinT * 0.5); // 1 → 0
    const spinRate = 2 + energy * 20;
    topGroup.rotation.y += spinRate * 0.016;
    // Precession wobble grows as it slows
    const wobbleAmp = (1 - energy) * 0.28;
    topGroup.rotation.z = Math.sin(spinT * spinRate * 0.35) * wobbleAmp;
    topGroup.rotation.x = Math.cos(spinT * spinRate * 0.35) * wobbleAmp * 0.6;
    topGroup.position.x = Math.sin(spinT * spinRate * 0.35) * wobbleAmp * 0.5;
    topGroup.position.z = Math.cos(spinT * spinRate * 0.35) * wobbleAmp * 0.5;
    topGroup.position.y = -energy * 0.04;

    for (const tr of trails) {
      const phase = (spinT * 1.4 + tr.offset) % 1;
      tr.mesh.scale.setScalar(1 + phase * 0.5);
      tr.mat.opacity = (1 - phase) * 0.25 * (1 - energy);
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
