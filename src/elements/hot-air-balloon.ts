import * as THREE from 'three';

export interface HotAirBalloonOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createHotAirBalloon(
  container: HTMLElement,
  options: HotAirBalloonOptions = {},
): () => void {
  const { color = '#f472b6', accentColor = '#8b5cf6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(3.4, 1.4, 4.6);
  camera.lookAt(0, 0.6, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const key = new THREE.DirectionalLight(0xffffff, 2.3);
  key.position.set(4, 6, 5);
  scene.add(key);
  const burnerLight = new THREE.PointLight('#ffb347', 14, 6);
  burnerLight.position.set(0, -0.9, 0);
  scene.add(burnerLight);

  const balloon = new THREE.Group();
  scene.add(balloon);

  // Envelope via lathe: wide crown tapering to the mouth
  const profile: THREE.Vector2[] = [
    new THREE.Vector2(0.01, 2.15),
    new THREE.Vector2(0.55, 2.05),
    new THREE.Vector2(0.95, 1.6),
    new THREE.Vector2(1.12, 1.05),
    new THREE.Vector2(0.95, 0.55),
    new THREE.Vector2(0.62, 0.28),
    new THREE.Vector2(0.42, 0.18),
  ];
  const envelopeMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(color), roughness: 0.5, side: THREE.DoubleSide });
  const envelope = new THREE.Mesh(new THREE.LatheGeometry(profile, 40), envelopeMat);
  balloon.add(envelope);

  // Gores: alternating accent stripes
  const stripeMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    roughness: 0.5,
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.15,
    side: THREE.DoubleSide,
  });
  for (let i = 0; i < 8; i += 2) {
    const a0 = (i / 8) * Math.PI * 2;
    const stripe = new THREE.Mesh(
      new THREE.SphereGeometry(1.06, 24, 20, a0, Math.PI / 8, Math.PI * 0.22, Math.PI * 0.38),
      stripeMat,
    );
    stripe.position.y = 1.08;
    stripe.scale.y = 1.35;
    balloon.add(stripe);
  }

  // Ropes and wicker basket
  const ropeMat = new THREE.MeshStandardMaterial({ color: 0x8a7355, roughness: 0.85 });
  const basketMat = new THREE.MeshStandardMaterial({ color: 0x6b4f2e, roughness: 0.9 });
  const basket = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.27, 0.36, 16), basketMat);
  basket.position.y = -1.25;
  balloon.add(basket);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.03, 8, 24), basketMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = -1.07;
  balloon.add(rim);
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 1.15, 5), ropeMat);
    rope.position.set(Math.cos(a) * 0.33, -0.65, Math.sin(a) * 0.33);
    rope.rotation.z = Math.cos(a) * 0.24;
    rope.rotation.x = -Math.sin(a) * 0.24;
    balloon.add(rope);
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
    balloon.rotation.y = t * 0.3 * speed;
    balloon.position.y = 0.35 + Math.sin(t * 0.6 * speed) * 0.22;
    balloon.rotation.z = Math.sin(t * 0.45 * speed) * 0.06;
    // Burner flicker
    burnerLight.intensity = 10 + Math.abs(Math.sin(t * 7.3 * speed)) * 8;
    stripeMat.emissiveIntensity = 0.1 + burnerLight.intensity * 0.02;
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
