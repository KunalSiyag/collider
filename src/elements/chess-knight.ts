import * as THREE from 'three';

export interface ChessKnightOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createChessKnight(
  container: HTMLElement,
  options: ChessKnightOptions = {},
): () => void {
  const { color = '#a78bfa', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
  camera.position.set(3.2, 2.6, 4.4);
  camera.lookAt(0, 1.0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(4, 6, 3);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 30);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const group = new THREE.Group();
  group.position.y = -1.1;
  scene.add(group);

  const body = new THREE.MeshStandardMaterial({ color, metalness: 0.45, roughness: 0.3 });
  const dark = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.6,
    roughness: 0.25,
  });

  // Turned base via lathe profile
  const profile: THREE.Vector2[] = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.95, 0),
    new THREE.Vector2(0.95, 0.14),
    new THREE.Vector2(0.7, 0.24),
    new THREE.Vector2(0.62, 0.5),
    new THREE.Vector2(0.72, 0.62),
    new THREE.Vector2(0.5, 0.72),
  ];
  const base = new THREE.Mesh(new THREE.LatheGeometry(profile, 40), body);
  group.add(base);

  // Arched neck leaning forward
  const neck = new THREE.Mesh(new THREE.CapsuleGeometry(0.34, 0.9, 8, 20), body);
  neck.position.set(0.08, 1.28, 0);
  neck.rotation.z = 0.32;
  group.add(neck);

  // Head with muzzle
  const head = new THREE.Group();
  head.position.set(-0.18, 1.95, 0);
  head.rotation.z = 0.5;
  group.add(head);
  head.add(new THREE.Mesh(new THREE.SphereGeometry(0.36, 24, 18), body));
  const muzzle = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.26, 0.55, 18), body);
  muzzle.rotation.z = Math.PI / 2;
  muzzle.position.set(-0.42, -0.06, 0);
  head.add(muzzle);
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.165, 14, 12), body);
  nose.position.set(-0.68, -0.05, 0);
  head.add(nose);

  // Ears
  for (const side of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.3, 10), body);
    ear.position.set(0.12, 0.36, side * 0.17);
    ear.rotation.x = side * 0.25;
    ear.rotation.z = -0.15;
    head.add(ear);
  }

  // Mane ridge down the back of the neck
  for (let i = 0; i < 5; i++) {
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.2, 0.1), body);
    fin.position.set(0.38 - i * 0.03, 1.0 + i * 0.22, 0);
    fin.rotation.z = -0.5;
    fin.scale.z = 1 + i * 0.15;
    group.add(fin);
  }

  // Eyes
  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 10), dark);
    eye.position.set(-0.3, 2.05, side * 0.22);
    group.add(eye);
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
    group.rotation.y = t * 0.55 * speed;
    group.position.y = -1.1 + Math.sin(t * 1.2 * speed) * 0.07;
    head.rotation.z = 0.5 + Math.sin(t * 0.8 * speed) * 0.06;
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
