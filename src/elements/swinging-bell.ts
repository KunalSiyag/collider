import * as THREE from 'three';

export interface SwingingBellOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createSwingingBell(
  container: HTMLElement,
  options: SwingingBellOptions = {},
): () => void {
  const { color = '#d4af6a', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.2, 0.8, 4.6);
  camera.lookAt(0, 0.4, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(4, 6, 5);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 1, -3);
  scene.add(rim);

  const brassMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    metalness: 0.95,
    roughness: 0.18,
    clearcoat: 0.6,
  });

  // Mount beam
  const beam = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.16, 0.5), brassMat);
  beam.position.y = 2.15;
  scene.add(beam);
  for (const side of [-1, 1]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.3, 0.5), brassMat);
    post.position.set(side * 1.53, 1.08, 0);
    scene.add(post);
  }

  // Bell swings from a yoke
  const yoke = new THREE.Group();
  yoke.position.y = 2.05;
  scene.add(yoke);

  // Bell profile via lathe: shoulder, waist, flare, lip
  const profile: THREE.Vector2[] = [
    new THREE.Vector2(0.01, 0),
    new THREE.Vector2(0.22, -0.06),
    new THREE.Vector2(0.34, -0.28),
    new THREE.Vector2(0.42, -0.62),
    new THREE.Vector2(0.52, -1.02),
    new THREE.Vector2(0.66, -1.38),
    new THREE.Vector2(0.72, -1.48),
    new THREE.Vector2(0.7, -1.54),
    new THREE.Vector2(0.62, -1.56),
  ];
  const bell = new THREE.Mesh(new THREE.LatheGeometry(profile, 44), brassMat);
  bell.position.y = 1.85;
  yoke.add(bell);

  // Crown loop
  const crown = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.035, 10, 24), brassMat);
  crown.position.y = 1.9;
  yoke.add(crown);

  // Hanger strap
  const strap = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.24, 8), brassMat);
  strap.position.y = 1.98;
  yoke.add(strap);

  // Clapper
  const clapperRod = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.9, 8), brassMat);
  clapperRod.position.y = 1.35;
  yoke.add(clapperRod);
  const clapperBall = new THREE.Mesh(new THREE.SphereGeometry(0.09, 14, 12), brassMat);
  clapperBall.position.y = 0.92;
  yoke.add(clapperBall);

  // Sound ripples
  interface Ripple { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; offset: number }
  const ripples: Ripple[] = [];
  for (let i = 0; i < 3; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const rippleMesh = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.012, 6, 64), mat);
    rippleMesh.rotation.x = Math.PI / 2;
    rippleMesh.position.y = 0.35;
    yoke.add(rippleMesh);
    ripples.push({ mesh: rippleMesh, mat, offset: i / 3 });
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
    const swing = Math.sin(t * 2.1 * speed) * 0.45 * (0.75 + Math.sin(t * 0.23 * speed) * 0.25);
    yoke.rotation.z = swing;
    clapperBall.position.x = -Math.sin(swing) * 1.1;
    clapperRod.rotation.z = swing * 0.25;
    for (const r of ripples) {
      const phase = (t * 1.05 + r.offset) % 1;
      r.mesh.scale.setScalar(0.6 + phase * 1.5);
      r.mat.opacity = (1 - phase) * 0.3 * Math.pow(Math.abs(Math.sin(t * 2.1 * speed)), 4);
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
