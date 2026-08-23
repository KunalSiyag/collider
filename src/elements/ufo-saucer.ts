import * as THREE from 'three';

export interface UfoSaucerOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createUfoSaucer(
  container: HTMLElement,
  options: UfoSaucerOptions = {},
): () => void {
  const { color = '#a7b0c8', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(3.0, 1.6, 4.6);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.45));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(4, 6, 5);
  scene.add(key);
  const underGlow = new THREE.PointLight(new THREE.Color(accentColor), 30, 8);
  underGlow.position.set(0, -0.6, 0);
  scene.add(underGlow);

  const saucer = new THREE.Group();
  scene.add(saucer);

  // Hull: two shallow domes joined at a wide rim
  const hullMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.85,
    roughness: 0.22,
  });
  const top = new THREE.Mesh(
    new THREE.SphereGeometry(0.85, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2.6),
    hullMat,
  );
  top.scale.y = 0.75;
  saucer.add(top);
  const bottom = new THREE.Mesh(
    new THREE.SphereGeometry(0.95, 40, 20, Math.PI, Math.PI * 2, 0, Math.PI / 3),
    hullMat,
  );
  bottom.scale.y = 0.55;
  bottom.rotation.x = Math.PI;
  bottom.position.y = 0.02;
  saucer.add(bottom);
  const rim = new THREE.Mesh(new THREE.CylinderGeometry(1.42, 1.28, 0.16, 48), hullMat);
  rim.position.y = 0.02;
  saucer.add(rim);

  // Cockpit dome
  const domeMat = new THREE.MeshPhysicalMaterial({
    color: '#22d3ee',
    transmission: 0.7,
    roughness: 0.05,
    transparent: true,
    opacity: 0.9,
    thickness: 0.4,
  });
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(0.42, 28, 16, 0, Math.PI * 2, 0, Math.PI / 2),
    domeMat,
  );
  dome.position.y = 0.52;
  saucer.add(dome);
  // Silhouette pilot
  const pilotMat = new THREE.MeshBasicMaterial({ color: 0x0b0714 });
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 10), pilotMat);
  head.position.set(0, 0.56, 0);
  const eyesMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#f472b6') });
  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), eyesMat);
    eye.position.set(side * 0.05, 0.58, 0.11);
    saucer.add(eye);
  }
  saucer.add(head);

  // Ring of running lights
  interface Light { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; phase: number }
  const lights: Light[] = [];
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor) });
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), mat);
    bulb.position.set(Math.cos(a) * 1.34, -0.02, Math.sin(a) * 1.34);
    saucer.add(bulb);
    lights.push({ mesh: bulb, mat, phase: i });
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
    rim.rotation.y = t * 1.4 * speed;
    saucer.rotation.z = Math.sin(t * 0.9 * speed) * 0.08;
    saucer.position.y = Math.sin(t * 1.3 * speed) * 0.18;
    saucer.rotation.x = Math.cos(t * 0.7 * speed) * 0.06;
    for (const l of lights) {
      const on = (Math.floor(t * 6 * speed) + l.phase) % 10 < 3;
      l.mat.color.set(on ? '#f472b6' : '#3b3550');
      l.mesh.scale.setScalar(on ? 1.25 : 0.9);
    }
    underGlow.intensity = 22 + Math.sin(t * 5 * speed) * 8;
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
