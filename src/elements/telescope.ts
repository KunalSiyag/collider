import * as THREE from 'three';

export interface TelescopeOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createTelescope(
  container: HTMLElement,
  options: TelescopeOptions = {},
): () => void {
  const { color = '#241b33', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(3.6, 2.2, 4.4);
  camera.lookAt(0, 0.8, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const key = new THREE.DirectionalLight(0xffffff, 2.3);
  key.position.set(4, 6, 5);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 1, -3);
  scene.add(rim);

  const scope = new THREE.Group();
  scene.add(scope);

  // Tripod
  const brassMat = new THREE.MeshStandardMaterial({ color: '#d4af6a', metalness: 0.9, roughness: 0.28 });
  const legGeo = new THREE.CylinderGeometry(0.045, 0.06, 2.3, 10);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + Math.PI / 6;
    const leg = new THREE.Mesh(legGeo, brassMat);
    leg.position.set(Math.cos(a) * 0.62, -0.85, Math.sin(a) * 0.62);
    leg.rotation.z = Math.cos(a) * 0.42;
    leg.rotation.x = -Math.sin(a) * 0.42;
    scope.add(leg);
  }
  const mount = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 12), brassMat);
  scope.add(mount);

  // Tube assembly aimed at the sky
  const tubePivot = new THREE.Group();
  tubePivot.rotation.z = 0.85;   // elevation
  tubePivot.rotation.y = -0.5;   // azimuth base handled by scope rotation
  scope.add(tubePivot);

  const tubeMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    metalness: 0.4,
    roughness: 0.35,
    clearcoat: 0.5,
  });
  const mainTube = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.27, 2.4, 24), tubeMat);
  mainTube.rotation.z = Math.PI / 2;
  mainTube.position.x = 0.9;
  tubePivot.add(mainTube);

  // Draw extension (smaller slide-out segment)
  const drawTube = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.19, 1.1, 20), brassMat);
  drawTube.rotation.z = Math.PI / 2;
  drawTube.position.x = 2.55;
  tubePivot.add(drawTube);

  // Objective lens with glow
  const lensMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor), transparent: true, opacity: 0.75 });
  const lens = new THREE.Mesh(new THREE.CircleGeometry(0.17, 28), lensMat);
  lens.rotation.y = Math.PI / 2;
  lens.position.x = 3.11;
  tubePivot.add(lens);
  const lensRing = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.03, 10, 28), brassMat);
  lensRing.rotation.y = Math.PI / 2;
  lensRing.position.x = 3.09;
  tubePivot.add(lensRing);

  // Eyepiece
  const eyepiece = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.3, 14), brassMat);
  eyepiece.rotation.z = Math.PI / 2;
  eyepiece.position.x = -0.35;
  tubePivot.add(eyepiece);

  // Star it is looking at
  const starMat = new THREE.MeshBasicMaterial({ color: '#ffd9a0' });
  const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.14, 0), starMat);
  star.position.set(-2.6, 3.1, -2.2);
  scene.add(star);

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
    // Slow scanning sweep of the night sky
    scope.rotation.y = -0.5 + Math.sin(t * 0.35 * speed) * 0.55;
    tubePivot.rotation.z = 0.85 + Math.sin(t * 0.5 * speed + 1) * 0.12;
    scope.position.y = Math.sin(t * 0.8 * speed) * 0.03;
    lensMat.opacity = 0.55 + Math.abs(Math.sin(t * 2.4 * speed)) * 0.35;
    const twinkle = 0.7 + Math.abs(Math.sin(t * 5 * speed)) * 0.5;
    star.scale.setScalar(twinkle);
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
