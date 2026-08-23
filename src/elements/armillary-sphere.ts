import * as THREE from 'three';

export interface ArmillarySphereOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createArmillarySphere(
  container: HTMLElement,
  options: ArmillarySphereOptions = {},
): () => void {
  const { color = '#a78bfa', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(3.6, 2.6, 4.4);
  camera.lookAt(0, 0.6, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(4, 6, 3);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 35);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const group = new THREE.Group();
  scene.add(group);

  const gold = new THREE.MeshStandardMaterial({ color, metalness: 0.8, roughness: 0.3 });
  const rose = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    metalness: 0.6,
    roughness: 0.25,
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.25,
  });

  // Earth at center
  const earth = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 18), rose);
  group.add(earth);

  // Celestial rings at varied inclinations
  const ringSpecs: Array<[number, number, number, number]> = [
    [1.5, 0.41, 0, 0.05],   // equatorial
    [1.3, 1.15, 0.4, 0.04], // tropic lines
    [1.3, -1.15, -0.4, 0.04],
    [1.62, Math.PI / 2, 0.2, 0.045], // meridian
    [1.7, Math.PI / 2, Math.PI / 2, 0.05], // solstitial colure
  ];
  const spinners: THREE.Mesh[] = [];
  for (const [r, rx, ry, tube] of ringSpecs) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, tube, 10, 90), gold);
    ring.rotation.set(rx, ry, 0);
    group.add(ring);
    spinners.push(ring);
  }

  // Zodiac band with markers
  const band = new THREE.Mesh(new THREE.TorusGeometry(1.42, 0.14, 8, 90), gold);
  band.rotation.x = 0.41;
  band.scale.set(1, 1, 0.35);
  group.add(band);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const pin = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 10), rose);
    pin.position.set(Math.cos(a) * 1.42, Math.sin(a) * 1.42 * 0.41, 0);
    const holder = new THREE.Group();
    holder.rotation.x = 0;
    pin.position.applyAxisAngle(new THREE.Vector3(1, 0, 0), 0.41);
    holder.add(pin);
    group.add(pin);
  }

  // Stand: finial, stem, base
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 1.1, 12), gold);
  stem.position.y = -1.9;
  group.add(stem);
  const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.9, 0.14, 32), gold);
  foot.position.y = -2.45;
  group.add(foot);

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
    group.rotation.y = t * 0.3 * speed;
    spinners[3].rotation.z = t * 0.5 * speed;
    spinners[4].rotation.z = -t * 0.35 * speed;
    earth.rotation.y = t * 1.2 * speed;
    earth.material.emissiveIntensity = 0.2 + Math.abs(Math.sin(t * 2)) * 0.3;
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
