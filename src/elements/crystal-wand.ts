import * as THREE from 'three';

export interface CrystalWandOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createCrystalWand(
  container: HTMLElement,
  options: CrystalWandOptions = {},
): () => void {
  const { color = '#a78bfa', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(1.6, -0.4, 4.6);
  camera.lookAt(0, 0.3, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.45));
  const tipLight = new THREE.PointLight(new THREE.Color(accentColor), 26);
  tipLight.position.set(-0.9, 1.5, 0);
  scene.add(tipLight);
  const rim = new THREE.PointLight(new THREE.Color(color), 22);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  // Wand held diagonally
  const wandGroup = new THREE.Group();
  wandGroup.rotation.z = 0.7;
  scene.add(wandGroup);

  // Shaft
  const shaftMat = new THREE.MeshPhysicalMaterial({ color: '#241b33', roughness: 0.35, clearcoat: 0.7 });
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.075, 2.6, 16), shaftMat);
  wandGroup.add(shaft);

  // Gold ferrules and grip rings
  const goldMat = new THREE.MeshStandardMaterial({ color: '#d4af6a', metalness: 0.95, roughness: 0.18 });
  for (const y of [-0.55, -0.35, 0.95]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(y > 0 ? 0.06 : 0.085, 0.02, 8, 24), goldMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = y;
    wandGroup.add(ring);
  }
  // Leather grip
  const gripMat = new THREE.MeshStandardMaterial({ color: '#5b1030', roughness: 0.8 });
  const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.09, 0.62, 16), gripMat);
  grip.position.y = -0.85;
  wandGroup.add(grip);
  const pommel = new THREE.Mesh(new THREE.OctahedronGeometry(0.12, 0), goldMat);
  pommel.position.y = -1.34;
  wandGroup.add(pommel);

  // Faceted crystal at the tip
  const crystalMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    flatShading: true,
    roughness: 0.05,
    transmission: 0.65,
    thickness: 1.0,
    ior: 2.0,
    clearcoat: 1,
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.25,
  });
  interface Shard { mesh: THREE.Mesh; baseY: number; phase: number }
  const shards: Shard[] = [];
  const mainCrystalProfile: THREE.Vector2[] = [
    new THREE.Vector2(0.01, 0.72),
    new THREE.Vector2(0.13, 0.42),
    new THREE.Vector2(0.17, 0.05),
    new THREE.Vector2(0.12, -0.18),
    new THREE.Vector2(0.01, -0.26),
  ];
  const mainCrystal = new THREE.Mesh(new THREE.LatheGeometry(mainCrystalProfile, 6), crystalMat);
  mainCrystal.rotation.y = Math.PI / 6;
  mainCrystal.position.y = 1.48;
  wandGroup.add(mainCrystal);
  shards.push({ mesh: mainCrystal, baseY: 1.48, phase: 0 });

  // Smaller satellite crystals
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + 0.5;
    const shard = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.09 + (i % 2) * 0.03, 0),
      crystalMat,
    );
    shard.position.set(Math.cos(a) * 0.14, 1.32 + (i % 2) * 0.06, Math.sin(a) * 0.14);
    shard.rotation.set(a % 1, a, 0.4);
    wandGroup.add(shard);
    shards.push({ mesh: shard, baseY: shard.position.y, phase: i });
  }

  // Orbiting magic motes around the tip
  interface Mote { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; r: number; a: number; rate: number }
  const motes: Mote[] = [];
  for (let i = 0; i < 12; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: i % 2 ? new THREE.Color(accentColor) : new THREE.Color('#e9e4f5'),
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const moteMesh = new THREE.Mesh(new THREE.SphereGeometry(0.025 + (i % 3) * 0.01, 8, 8), mat);
    wandGroup.add(moteMesh);
    motes.push({ mesh: moteMesh, mat, r: 0.28 + (i % 4) * 0.1, a: (i / 12) * Math.PI * 2, rate: 1.1 + (i % 3) * 0.5 });
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
    wandGroup.rotation.y = t * 0.5 * speed;
    wandGroup.rotation.z = 0.7 + Math.sin(t * 0.8 * speed) * 0.06;
    wandGroup.position.y = Math.sin(t * 1.1 * speed) * 0.06;
    const pulse = Math.abs(Math.sin(t * 2.4 * speed));
    crystalMat.emissiveIntensity = 0.15 + pulse * 0.5;
    tipLight.intensity = 18 + pulse * 20;
    tipLight.position.set(Math.cos(t * 0.5 * speed) * -0.9, 1.5 + Math.sin(t * 1.1 * speed) * 0.06, Math.sin(t * 0.5 * speed) * 0.4);
    for (const m of motes) {
      m.a += m.rate * 0.015 * speed;
      const tilt = Math.sin(t * 1.2 * speed) * 0.25;
      m.mesh.position.set(
        Math.cos(m.a) * m.r,
        1.45 + Math.sin(m.a * 2) * tilt + (m.r - 0.3) * 0.3,
        Math.sin(m.a) * m.r,
      );
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
