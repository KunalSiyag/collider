import * as THREE from 'three';

export interface EdisonBulbOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createEdisonBulb(
  container: HTMLElement,
  options: EdisonBulbOptions = {},
): () => void {
  const { color = '#ffd9a0', accentColor = '#8b5cf6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.6, -0.4, 4.6);
  camera.lookAt(0, 0.2, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.3));
  const filamentLight = new THREE.PointLight(new THREE.Color(color), 35, 12);
  filamentLight.position.set(0, 0.5, 0);
  scene.add(filamentLight);
  const accent = new THREE.PointLight(new THREE.Color(accentColor), 16);
  accent.position.set(-3.5, 1.5, -2.5);
  scene.add(accent);

  const bulb = new THREE.Group();
  scene.add(bulb);

  // Glass envelope
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xfff8ec,
    transmission: 0.85,
    roughness: 0.03,
    thickness: 0.25,
    transparent: true,
    opacity: 0.55,
  });
  const envelopeProfile: THREE.Vector2[] = [];
  for (let i = 0; i <= 20; i++) {
    const u = i / 20;
    envelopeProfile.push(new THREE.Vector2(Math.sin(u * Math.PI) * 0.78 * (0.55 + u * 0.45) + 0.02, u * 1.7));
  }
  const glass = new THREE.Mesh(new THREE.LatheGeometry(envelopeProfile.reverse(), 40), glassMat);
  bulb.add(glass);

  // Brass screw base with threads
  const brassMat = new THREE.MeshStandardMaterial({ color: '#d4af6a', metalness: 0.95, roughness: 0.22 });
  for (let i = 0; i < 5; i++) {
    const thread = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.028, 8, 32), brassMat);
    thread.rotation.x = Math.PI / 2;
    thread.position.y = -0.18 - i * 0.09;
    bulb.add(thread);
  }
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.14, 14, 10), brassMat);
  tip.position.y = -0.66;
  bulb.add(tip);

  // Stem and support wires
  const stemMat = new THREE.MeshBasicMaterial({ color: '#444' });
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.9, 8), stemMat);
  stem.position.y = -0.15;
  bulb.add(stem);
  const glassDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.04, 20), stemMat);
  glassDisc.position.y = -0.05;
  bulb.add(glassDisc);

  // Coiled filament zig-zag
  const filamentPts: THREE.Vector3[] = [];
  for (let i = 0; i <= 30; i++) {
    const u = i / 30;
    filamentPts.push(new THREE.Vector3(
      Math.sin(u * Math.PI * 6) * 0.26,
      0.25 + Math.sin(u * Math.PI) * 0.75 + (u > 0.02 && u < 0.98 ? 0 : 0),
      Math.cos(u * Math.PI * 6) * 0.06 * Math.sin(u * Math.PI),
    ));
  }
  const filamentMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#ffb347') });
  const filament = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(filamentPts), 90, 0.012, 6),
    filamentMat,
  );
  bulb.add(filament);
  // Support posts
  for (const x of [-0.26, 0.26]) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.5, 6), stemMat);
    post.position.set(x, 0.05, 0);
    bulb.add(post);
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
    bulb.rotation.y = t * 0.4 * speed;
    // Warm flicker
    const flicker =
      0.82 +
      Math.sin(t * 11.7 * speed) * 0.07 +
      Math.sin(t * 29.3 * speed) * 0.05 +
      Math.sin(t * 3.1 * speed) * 0.06;
    filamentLight.intensity = 30 * flicker;
    filamentMat.color.setHSL(0.09, 0.9, 0.35 + flicker * 0.25);
    bulb.position.y = Math.sin(t * 0.9 * speed) * 0.06 + 0.2;
    bulb.rotation.z = Math.sin(t * 0.7 * speed) * 0.05;
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
