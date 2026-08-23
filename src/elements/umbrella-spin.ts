import * as THREE from 'three';

export interface UmbrellaSpinOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createUmbrellaSpin(
  container: HTMLElement,
  options: UmbrellaSpinOptions = {},
): () => void {
  const { color = '#f472b6', accentColor = '#a78bfa', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.6, 2.0, 4.4);
  camera.lookAt(0, 0.3, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(4, 6, 4);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 24);
  rim.position.set(-4, 0, -3);
  scene.add(rim);

  const umbrella = new THREE.Group();
  umbrella.rotation.z = 0.18;
  scene.add(umbrella);

  // Canopy: scalloped dome from a lathe profile
  const profile: THREE.Vector2[] = [];
  for (let i = 0; i <= 14; i++) {
    const a = (i / 14) * Math.PI / 2;
    profile.push(new THREE.Vector2(Math.sin(a) * 1.7, Math.cos(a) * 0.75));
  }
  const canopyGeo = new THREE.LatheGeometry(profile.reverse(), 48);
  const canopyMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    side: THREE.DoubleSide,
    roughness: 0.4,
    clearcoat: 0.5,
  });
  const canopy = new THREE.Mesh(canopyGeo, canopyMat);
  canopy.position.y = 1.1;
  umbrella.add(canopy);

  // Rib accents over the canopy
  const ribMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.4,
    metalness: 0.5,
    roughness: 0.35,
  });
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.85, 0),
      new THREE.Vector3(Math.sin(a) * 0.9, 1.55, Math.cos(a) * 0.9),
      new THREE.Vector3(Math.sin(a) * 1.68, 1.12, Math.cos(a) * 1.68),
    ]);
    const rib = new THREE.Mesh(new THREE.TubeGeometry(curve, 16, 0.018, 6), ribMat);
    umbrella.add(rib);
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), ribMat);
    tip.position.set(Math.sin(a) * 1.68, 1.12, Math.cos(a) * 1.68);
    umbrella.add(tip);
  }

  // Pole, runner and curved handle
  const poleMat = new THREE.MeshStandardMaterial({ color: '#2a2438', metalness: 0.6, roughness: 0.35 });
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 3.4, 10), poleMat);
  pole.position.y = 0.2;
  umbrella.add(pole);
  const finial = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.2, 10), ribMat);
  finial.position.y = 1.95;
  umbrella.add(finial);
  const handleCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -1.5, 0),
    new THREE.Vector3(0, -1.78, 0),
    new THREE.Vector3(0.16, -1.86, 0),
    new THREE.Vector3(0.24, -1.74, 0),
  ]);
  const handle = new THREE.Mesh(new THREE.TubeGeometry(handleCurve, 20, 0.05, 10), poleMat);
  umbrella.add(handle);

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
    canopy.rotation.y = t * 1.1 * speed;
    umbrella.rotation.z = 0.18 + Math.sin(t * 0.7 * speed) * 0.1;
    umbrella.rotation.x = Math.sin(t * 0.5 * speed) * 0.12;
    umbrella.position.y = Math.sin(t * 1.0 * speed) * 0.08;
    ribMat.emissiveIntensity = 0.3 + Math.abs(Math.sin(t * 2.2 * speed)) * 0.3;
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
