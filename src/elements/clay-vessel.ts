import * as THREE from 'three';

export interface ClayVesselOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createClayVessel(
  container: HTMLElement,
  options: ClayVesselOptions = {},
): () => void {
  const { color = '#8b5cf6', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
  camera.position.set(2.8, 2.0, 4.2);
  camera.lookAt(0, 0.9, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(4, 6, 3);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 30);
  rim.position.set(-3, 2, -3);
  scene.add(rim);

  const group = new THREE.Group();
  scene.add(group);

  // Amphora silhouette via lathe
  const profile: THREE.Vector2[] = [
    new THREE.Vector2(0.01, 0),
    new THREE.Vector2(0.42, 0.02),
    new THREE.Vector2(0.62, 0.25),
    new THREE.Vector2(0.85, 0.85),
    new THREE.Vector2(0.78, 1.45),
    new THREE.Vector2(0.52, 1.85),
    new THREE.Vector2(0.42, 2.05),
    new THREE.Vector2(0.5, 2.18),
    new THREE.Vector2(0.46, 2.26),
    new THREE.Vector2(0.36, 2.24),
  ];
  const clayMat = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.55,
    metalness: 0.15,
    side: THREE.DoubleSide,
  });
  const vessel = new THREE.Mesh(new THREE.LatheGeometry(profile, 48), clayMat);
  group.add(vessel);

  // Twin curved handles
  for (const side of [-1, 1]) {
    const handleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.44, 2.02, 0),
      new THREE.Vector3(side * 0.85, 2.15, 0),
      new THREE.Vector3(side * 0.92, 1.75, 0),
      new THREE.Vector3(side * 0.72, 1.5, 0),
    ]);
    const handle = new THREE.Mesh(
      new THREE.TubeGeometry(handleCurve, 20, 0.06, 10),
      clayMat,
    );
    group.add(handle);
  }

  // Painted decorative bands
  const bandMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.35,
    roughness: 0.4,
  });
  const bands: THREE.Mesh[] = [];
  for (const [y, r] of [[0.45, 0.79], [1.0, 0.83], [1.6, 0.62], [2.12, 0.49]] as const) {
    const band = new THREE.Mesh(new THREE.TorusGeometry(r, 0.02, 8, 60), bandMat);
    band.rotation.x = Math.PI / 2;
    band.position.y = y;
    group.add(band);
    bands.push(band);
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
    group.rotation.y = t * 0.5 * speed;
    group.position.y = Math.sin(t * 1.0 * speed) * 0.07;
    bands.forEach((b, i) => {
      (b.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.25 + Math.abs(Math.sin(t * 1.5 + i)) * 0.3;
    });
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
