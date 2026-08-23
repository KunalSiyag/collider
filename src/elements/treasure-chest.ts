import * as THREE from 'three';

export interface TreasureChestOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createTreasureChest(
  container: HTMLElement,
  options: TreasureChestOptions = {},
): () => void {
  const { color = '#5b4632', accentColor = '#d4af6a', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.4, 1.8, 4.6);
  camera.lookAt(0, -0.3, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
  keyLight.position.set(4, 7, 5);
  scene.add(keyLight);
  // Golden glow from the loot
  const lootGlow = new THREE.PointLight(new THREE.Color(accentColor), 26);
  lootGlow.position.set(0, -0.1, 0);
  scene.add(lootGlow);

  const chestGroup = new THREE.Group();
  scene.add(chestGroup);

  const woodMat = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(color), roughness: 0.6, clearcoat: 0.35 });
  const goldMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(accentColor), metalness: 0.95, roughness: 0.18 });
  const darkMat = new THREE.MeshStandardMaterial({ color: '#17121f', roughness: 0.7 });

  // Chest base
  const W = 2.2;
  const H = 1.05;
  const D = 1.35;
  const base = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), woodMat);
  base.position.y = -0.85;
  chestGroup.add(base);
  // Iron corner bands
  for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]] as const) {
    const bandV = new THREE.Mesh(new THREE.BoxGeometry(0.09, H + 0.03, 0.06), darkMat);
    bandV.position.set(sx * (W / 2 - 0.12), -0.85, sz * (D / 2 + 0.005));
    if (sz < 0) chestGroup.add(bandV);
    else chestGroup.add(bandV);
  }
  for (const y of [-0.42, -1.28]) {
    const bandH = new THREE.Mesh(new THREE.BoxGeometry(W + 0.03, 0.09, D + 0.03), darkMat);
    bandH.position.y = y;
    chestGroup.add(bandH);
  }

  // Opened lid (arched via half cylinder)
  const lidPivot = new THREE.Group();
  lidPivot.position.set(-W / 2, -0.32, 0);
  chestGroup.add(lidPivot);
  const lidArch = new THREE.Mesh(new THREE.CylinderGeometry(D / 2, D / 2, W, 28, 1, false, 0, Math.PI), woodMat);
  lidArch.rotation.z = Math.PI / 2;
  lidArch.rotation.y = Math.PI / 2;
  lidArch.scale.x = 1;
  lidArch.scale.z = 1;
  lidArch.position.x = W / 2;
  lidPivot.add(lidArch);
  lidPivot.rotation.z = 1.9;

  // Gold coins heaped inside
  interface Coin { mesh: THREE.Mesh; baseY: number; phase: number }
  const coins: Coin[] = [];
  const coinMat = goldMat.clone();
  for (let i = 0; i < 34; i++) {
    const coin = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.03, 18), coinMat);
    coin.rotation.set((Math.random() - 0.5) * 0.9, Math.random() * Math.PI, (Math.random() - 0.5) * 0.9);
    const x = (Math.random() - 0.5) * 1.75;
    const z = (Math.random() - 0.5) * 0.95;
    const y = -0.32 + Math.random() * 0.22;
    coin.position.set(x, y, z);
    chestGroup.add(coin);
    coins.push({ mesh: coin, baseY: y, phase: Math.random() * Math.PI * 2 });
  }
  // A few gems poking out of the pile
  const gemMat = new THREE.MeshPhysicalMaterial({
    color: '#f472b6',
    emissive: '#f472b6',
    emissiveIntensity: 0.7,
    roughness: 0.08,
    flatShading: true,
  });
  for (let i = 0; i < 4; i++) {
    const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.1, 0), gemMat);
    gem.position.set((Math.random() - 0.5) * 1.5, -0.15, (Math.random() - 0.5) * 0.8);
    chestGroup.add(gem);
  }
  // Lock hasp
  const hasp = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.03, 10, 24), goldMat);
  hasp.position.set(0, -0.36, D / 2 + 0.02);
  chestGroup.add(hasp);
  const keyholePlate = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.22, 0.04), goldMat);
  keyholePlate.position.set(0, -0.55, D / 2 + 0.02);
  chestGroup.add(keyholePlate);

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
    chestGroup.rotation.y = t * 0.45 * speed;
    chestGroup.position.y = Math.sin(t * 1.0 * speed) * 0.04;
    // Coins shimmer and hop gently
    for (const c of coins) {
      c.mesh.position.y = c.baseY + Math.abs(Math.sin(t * 2.6 * speed + c.phase)) * 0.02;
      c.mesh.rotation.y += 0.01 * speed;
    }
    lootGlow.intensity = 20 + Math.abs(Math.sin(t * 2.2 * speed)) * 14;
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
