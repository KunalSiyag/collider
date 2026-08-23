import * as THREE from 'three';

export interface PotionFlaskOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createPotionFlask(
  container: HTMLElement,
  options: PotionFlaskOptions = {},
): () => void {
  const { color = '#8b5cf6', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.4, 0.3, 5.2);
  camera.lookAt(0, -0.1, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.3);
  keyLight.position.set(3, 6, 7);
  scene.add(keyLight);
  // Potion glow
  const potionGlowA = new THREE.PointLight(new THREE.Color(color), 16);
  potionGlowA.position.set(-0.9, -0.5, 0.6);
  scene.add(potionGlowA);
  const potionGlowB = new THREE.PointLight(new THREE.Color(accentColor), 14);
  potionGlowB.position.set(0.9, -0.75, 0.4);
  scene.add(potionGlowB);

  // Shelf
  const shelfMat = new THREE.MeshStandardMaterial({ color: '#3a2b52', roughness: 0.6 });
  const shelf = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.12, 1.1), shelfMat);
  shelf.position.y = -1.35;
  scene.add(shelf);
  for (const [x, z] of [[-1.6, -0.4], [1.6, -0.4], [-1.6, 0.4], [1.6, 0.4]] as const) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.35, 10), shelfMat);
    leg.position.set(x, -1.55, z * 0 + 0);
    leg.position.set(x, -1.55, 0);
    scene.add(leg);
    void z;
  }

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xdfeaff,
    transmission: 0.88,
    roughness: 0.03,
    thickness: 0.3,
    transparent: true,
    opacity: 0.55,
    clearcoat: 1,
  });
  const corkMat = new THREE.MeshStandardMaterial({ color: '#b08a56', roughness: 0.85 });

  interface Flask { group: THREE.Group; glow: THREE.PointLight; phase: number; hue: string }
  const flasks: Flask[] = [];

  function roundFlask(hue: string, scale: number): Flask {
    const g = new THREE.Group();
    // Spherical body with a narrow neck (lathe)
    const profile: THREE.Vector2[] = [
      new THREE.Vector2(0.01, 0),
      new THREE.Vector2(0.34, 0.04),
      new THREE.Vector2(0.46, 0.28),
      new THREE.Vector2(0.44, 0.62),
      new THREE.Vector2(0.26, 0.88),
      new THREE.Vector2(0.11, 1.02),
      new THREE.Vector2(0.1, 1.24),
      new THREE.Vector2(0.13, 1.3),
      new THREE.Vector2(0.09, 1.33),
    ];
    const bodyMesh = new THREE.Mesh(new THREE.LatheGeometry(profile, 32), glassMat);
    g.add(bodyMesh);
    // Liquid inside
    const liquidMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(hue),
      transparent: true,
      opacity: 0.85,
    });
    const liquidProfile: THREE.Vector2[] = [];
    for (let i = 0; i <= 10; i++) {
      const u = i / 10;
      liquidProfile.push(new THREE.Vector2(Math.sin(u * Math.PI) * 0.42 * (0.9), u * 0.72));
    }
    const liquid = new THREE.Mesh(new THREE.LatheGeometry(liquidProfile.reverse(), 28), liquidMat);
    liquid.position.y = 0.06;
    g.add(liquid);
    // Cork
    const cork = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.115, 0.16, 16), corkMat);
    cork.position.y = 1.4;
    g.add(cork);
    const glow = new THREE.PointLight(new THREE.Color(hue), 10);
    glow.position.y = 0.45;
    g.add(glow);
    return { group: g, glow, phase: Math.random() * Math.PI * 2, hue };
  }

  function vialFlask(hue: string): Flask {
    const g = new THREE.Group();
    const cone = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.3, 0.95, 20, 1, true), glassMat);
    cone.position.y = 0.48;
    g.add(cone);
    const bottomDisc = new THREE.Mesh(new THREE.CircleGeometry(0.09, 18), glassMat);
    bottomDisc.rotation.x = -Math.PI / 2;
    bottomDisc.position.y = 0.01;
    g.add(bottomDisc);
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.09, 0.3, 14), glassMat);
    neck.position.y = 1.08;
    g.add(neck);
    const liquidMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(hue), transparent: true, opacity: 0.85 });
    const liquid = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.27, 0.6, 20), liquidMat);
    liquid.position.y = 0.31;
    g.add(liquid);
    const cork = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.1, 0.13, 14), corkMat);
    cork.position.y = 1.29;
    g.add(cork);
    const glow = new THREE.PointLight(new THREE.Color(hue), 8);
    glow.position.y = 0.4;
    g.add(glow);
    return { group: g, glow, phase: Math.random() * Math.PI * 2, hue };
  }

  const f1 = roundFlask(color, 1);
  f1.group.position.set(-0.95, -1.29, 0);
  scene.add(f1.group);
  flasks.push(f1);

  const f2 = vialFlask(accentColor);
  f2.group.position.set(0.15, -1.29, 0.15);
  scene.add(f2.group);
  flasks.push(f2);

  const f3 = roundFlask('#22d3ee', 0.8);
  f3.group.scale.setScalar(0.78);
  f3.group.position.set(1.05, -1.29, -0.05);
  scene.add(f3.group);
  flasks.push(f3);

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
    for (let i = 0; i < flasks.length; i++) {
      const f = flasks[i];
      f.glow.intensity = 7 + Math.abs(Math.sin(t * 2.2 * speed + f.phase)) * 9;
      f.group.rotation.z = Math.sin(t * 0.9 * speed + f.phase) * 0.02;
    }
    scene.rotation.y = Math.sin(t * 0.3 * speed) * 0.3;
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
