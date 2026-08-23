import * as THREE from 'three';

export interface WindTurbineOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createWindTurbine(
  container: HTMLElement,
  options: WindTurbineOptions = {},
): () => void {
  const { color = '#e9e4f5', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 60);
  camera.position.set(3.4, 0.6, 5.6);
  camera.lookAt(0.2, 0.8, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(4, 7, 6);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 24);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const turbine = new THREE.Group();
  turbine.rotation.y = -0.3;
  scene.add(turbine);

  // Tapered tower via lathe
  const shellMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(color), roughness: 0.35, metalness: 0.15 });
  const towerProfile = [
    new THREE.Vector2(0.34, -1.7),
    new THREE.Vector2(0.36, -1.0),
    new THREE.Vector2(0.28, 0.4),
    new THREE.Vector2(0.22, 1.9),
    new THREE.Vector2(0.26, 2.05),
    new THREE.Vector2(0.22, 2.08),
  ];
  const tower = new THREE.Mesh(new THREE.LatheGeometry(towerProfile.map((p) => p.clone()), 32), shellMat);
  turbine.add(tower);

  // Nacelle
  const nacelleMat = new THREE.MeshStandardMaterial({ color: '#c9c4d8', metalness: 0.5, roughness: 0.4 });
  const nacelle = new THREE.Mesh(new THREE.CapsuleGeometry(0.19, 0.42, 8, 18), nacelleMat);
  nacelle.rotation.z = Math.PI / 2;
  nacelle.position.set(0.12, 2.12, 0);
  turbine.add(nacelle);

  // Blinking aviation light
  const beaconMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#f472b6') });
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), beaconMat);
  beacon.position.set(0.12, 2.38, 0);
  turbine.add(beacon);

  // Rotor hub with three tapered blades
  const rotor = new THREE.Group();
  rotor.position.set(0.42, 2.12, 0);
  turbine.add(rotor);
  const hub = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12), nacelleMat);
  rotor.add(hub);

  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(0, -0.09);
  bladeShape.quadraticCurveTo(1.3, -0.13, 2.15, 0);
  bladeShape.quadraticCurveTo(1.3, 0.11, 0, 0.07);
  bladeShape.lineTo(0, -0.09);
  const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, { depth: 0.045, bevelEnabled: false });
  bladeGeo.translate(0.12, 0, -0.02);
  for (let i = 0; i < 3; i++) {
    const holder = new THREE.Group();
    holder.rotation.z = (i / 3) * Math.PI * 2;
    const blade = new THREE.Mesh(bladeGeo, shellMat);
    holder.add(blade);
    rotor.add(holder);
  }

  // Ground haze disc
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(4.5, 40),
    new THREE.MeshBasicMaterial({ color: '#000000', transparent: true, opacity: 0.22 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.72;
  scene.add(ground);

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
  let blinkTimer = 0;
  function tick() {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    // Gusty rotation speed
    const gust = 1.6 + Math.sin(t * 0.5 * speed) * 0.7 + Math.sin(t * 1.9 * speed) * 0.35;
    rotor.rotation.z += gust * dt;
    turbine.rotation.y = -0.3 + Math.sin(t * 0.25 * speed) * 0.35;
    blinkTimer += dt;
    beaconMat.color.set(blinkTimer % 1.6 < 0.18 ? '#ff6b9d' : '#3b3550');
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
