import * as THREE from 'three';

export interface TrophyCupOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createTrophyCup(
  container: HTMLElement,
  options: TrophyCupOptions = {},
): () => void {
  const { color = '#d4af6a', accentColor = '#8b5cf6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.4, 1.4, 4.6);
  camera.lookAt(0, 0.1, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
  keyLight.position.set(4, 7, 5);
  scene.add(keyLight);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const trophy = new THREE.Group();
  trophy.position.y = -1.2;
  scene.add(trophy);

  const goldMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    metalness: 0.95,
    roughness: 0.12,
    clearcoat: 0.7,
    envMapIntensity: 1.5,
  });
  const darkMat = new THREE.MeshStandardMaterial({ color: '#241b33', roughness: 0.5 });
  const glowGemMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.9,
    roughness: 0.2,
  });

  // Wooden base with nameplate
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.95, 0.28, 36), darkMat);
  base.position.y = 0.14;
  trophy.add(base);
  const plate = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.16, 0.03), goldMat);
  plate.position.set(0, 0.14, 0.92);
  trophy.add(plate);

  // Stem
  const stemProfile: THREE.Vector2[] = [
    new THREE.Vector2(0.34, 0.28),
    new THREE.Vector2(0.22, 0.42),
    new THREE.Vector2(0.13, 0.62),
    new THREE.Vector2(0.18, 0.86),
    new THREE.Vector2(0.32, 1.02),
  ];
  const stem = new THREE.Mesh(new THREE.LatheGeometry(stemProfile, 32), goldMat);
  trophy.add(stem);

  // Cup bowl via lathe
  const bowlProfile: THREE.Vector2[] = [
    new THREE.Vector2(0.34, 1.0),
    new THREE.Vector2(0.55, 1.08),
    new THREE.Vector2(0.78, 1.3),
    new THREE.Vector2(0.94, 1.62),
    new THREE.Vector2(1.02, 1.98),
    new THREE.Vector2(1.04, 2.25),
    new THREE.Vector2(0.98, 2.28),
    new THREE.Vector2(0.96, 2.22),
  ];
  const bowl = new THREE.Mesh(new THREE.LatheGeometry(bowlProfile, 44), goldMat);
  trophy.add(bowl);

  // Curved handles
  for (const side of [-1, 1]) {
    const handleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.92, 2.1, 0),
      new THREE.Vector3(side * 1.45, 1.98, 0),
      new THREE.Vector3(side * 1.58, 1.58, 0),
      new THREE.Vector3(side * 1.05, 1.35, 0),
    ]);
    const handle = new THREE.Mesh(
      new THREE.TubeGeometry(handleCurve, 24, 0.07, 10),
      goldMat,
    );
    trophy.add(handle);
    // Handle mounts
    for (const y of [2.06, 1.38]) {
      const mount = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 10), goldMat);
      mount.position.set(side * (y > 1.7 ? 0.97 : 1.02), y, 0);
      trophy.add(mount);
    }
  }

  // Sparkling gem in the bowl center
  const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.14, 0), glowGemMat);
  gem.position.set(0, 1.9, 0);
  trophy.add(gem);

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
    trophy.rotation.y = t * 0.55 * speed;
    trophy.position.y = -1.2 + Math.sin(t * 1.1 * speed) * 0.05;
    gem.rotation.y += 0.03 * speed;
    gem.rotation.x += 0.015 * speed;
    glowGemMat.emissiveIntensity = 0.6 + Math.abs(Math.sin(t * 2.4 * speed)) * 0.7;
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
