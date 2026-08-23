import * as THREE from 'three';

export interface PinwheelSpinOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createPinwheelSpin(
  container: HTMLElement,
  options: PinwheelSpinOptions = {},
): () => void {
  const { color = '#f472b6', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.8, -0.2, 4.4);
  camera.lookAt(0, 0.5, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const key = new THREE.DirectionalLight(0xffffff, 2.3);
  key.position.set(4, 6, 6);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 24);
  rim.position.set(-4, 0, -3);
  scene.add(rim);

  const root = new THREE.Group();
  scene.add(root);

  // Stick
  const stickMat = new THREE.MeshStandardMaterial({ color: '#e9e4f5', roughness: 0.55 });
  const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 3.2, 12), stickMat);
  stick.position.y = -1.35;
  root.add(stick);

  // Head assembly spins
  const head = new THREE.Group();
  head.position.y = 0.75;
  root.add(head);

  // Four folded paper sails: each a curved triangular sheet
  const sailColors = [color, accentColor, '#a78bfa', '#ffd9a0'];
  for (let i = 0; i < 4; i++) {
    const sailShape = new THREE.Shape();
    sailShape.moveTo(0, 0);
    sailShape.quadraticCurveTo(0.62, 0.18, 0.88, -0.28);
    sailShape.quadraticCurveTo(0.5, -0.34, 0, 0);
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(sailColors[i]),
      side: THREE.DoubleSide,
      roughness: 0.5,
      emissive: new THREE.Color(sailColors[i]),
      emissiveIntensity: 0.12,
    });
    const sail = new THREE.Mesh(new THREE.ShapeGeometry(sailShape), mat);
    // Fold the sail along its spine for that pinwheel curl
    sail.rotation.x = -0.55;
    sail.position.z = 0.02;
    const holder = new THREE.Group();
    holder.rotation.z = (i / 4) * Math.PI * 2;
    holder.add(sail);
    holder.rotation.x = 0.18;
    head.add(holder);
  }

  // Center pin
  const pin = new THREE.Mesh(
    new THREE.SphereGeometry(0.09, 14, 12),
    new THREE.MeshStandardMaterial({ color: '#d4af6a', metalness: 0.9, roughness: 0.25 }),
  );
  pin.position.z = 0.06;
  head.add(pin);

  // Breeze streaks drifting past
  interface Streak { mesh: THREE.Mesh; x: number; y: number; rate: number }
  const streaks: Streak[] = [];
  const streakGeo = new THREE.BoxGeometry(0.5, 0.008, 0.008);
  const streakMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor), transparent: true, opacity: 0.3 });
  for (let i = 0; i < 8; i++) {
    const s = new THREE.Mesh(streakGeo, streakMat);
    s.position.set((Math.random() - 0.5) * 6, Math.random() * 4 - 1.2, -0.6 - Math.random());
    root.add(s);
    streaks.push({ mesh: s, x: s.position.x, y: s.position.y, rate: 0.7 + Math.random() * 0.8 });
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
    // Gusts modulate spin speed
    const gust = 3 + Math.sin(t * 0.7 * speed) * 1.6 + Math.sin(t * 2.3 * speed) * 0.8;
    head.rotation.z += gust * 0.016 * speed;
    head.rotation.y = Math.sin(t * 0.8 * speed) * 0.25;
    root.rotation.x = Math.sin(t * 0.5 * speed) * 0.06;
    root.position.y = Math.sin(t * 1.0 * speed) * 0.04;
    for (const s of streaks) {
      s.mesh.position.x += s.rate * speed * 0.03;
      if (s.mesh.position.x > 3.2) s.mesh.position.x = -3.2;
      ((s.mesh.material as THREE.MeshBasicMaterial)).opacity = 0.15 + gust * 0.05;
    }
    void streaks[0].x;
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
