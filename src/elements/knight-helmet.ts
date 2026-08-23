import * as THREE from 'three';

export interface KnightHelmetOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createKnightHelmet(
  container: HTMLElement,
  options: KnightHelmetOptions = {},
): () => void {
  const { color = '#8a93a8', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.4, 0.4, 4.6);
  camera.lookAt(0, -0.1, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
  keyLight.position.set(3, 6, 7);
  scene.add(keyLight);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 30);
  rim.position.set(-4, 2, -2);
  scene.add(rim);

  const helmetGroup = new THREE.Group();
  helmetGroup.position.y = -0.1;
  scene.add(helmetGroup);

  const steelMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    metalness: 0.95,
    roughness: 0.22,
    clearcoat: 0.6,
  });
  const darkMat = new THREE.MeshStandardMaterial({ color: '#10101a', roughness: 0.6 });
  const plumeMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.35,
    roughness: 0.65,
  });

  // Skull dome
  const dome = new THREE.Mesh(new THREE.SphereGeometry(0.78, 36, 24, 0, Math.PI * 2, 0, Math.PI / 1.9), steelMat);
  helmetGroup.add(dome);

  // Lower face plate tapering to the visor
  const faceShape = new THREE.Shape();
  faceShape.moveTo(-0.72, 0);
  faceShape.lineTo(0.72, 0);
  faceShape.lineTo(0.55, -0.85);
  faceShape.quadraticCurveTo(0, -1.05, -0.55, -0.85);
  faceShape.lineTo(-0.72, 0);
  const facePlate = new THREE.Mesh(
    new THREE.ExtrudeGeometry(faceShape, { depth: 1.15, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05, bevelSegments: 2 }),
    steelMat,
  );
  facePlate.position.set(0, 0.02, -0.57);
  helmetGroup.add(facePlate);

  // Visor slit (dark recessed band)
  const visorBand = new THREE.Mesh(new THREE.BoxGeometry(1.06, 0.09, 1.2), darkMat);
  visorBand.position.set(0, -0.28, 0);
  helmetGroup.add(visorBand);
  // Breathing slits
  for (let i = 0; i < 6; i++) {
    const slit = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.16, 1.22), darkMat);
    slit.position.set(-0.25 + (i % 3) * 0.25, -0.52 + Math.floor(i / 3) * 0.14, 0);
    helmetGroup.add(slit);
  }
  // Glowing eyes behind the visor
  const eyeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor) });
  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.075, 12, 10), eyeMat);
    eye.scale.set(1.4, 0.6, 0.6);
    eye.position.set(side * 0.26, -0.28, 0.56);
    helmetGroup.add(eye);
  }

  // Crest ridge on top
  const crestRidge = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.18, 1.3), steelMat);
  crestRidge.position.y = 0.72;
  helmetGroup.add(crestRidge);

  // Plume feathers along the ridge
  for (let i = 0; i < 7; i++) {
    const featherShape = new THREE.Shape();
    featherShape.moveTo(0, 0);
    featherShape.quadraticCurveTo(0.16, 0.12, 0.2, 0.34);
    featherShape.quadraticCurveTo(0.04, 0.28, 0, 0);
    const feather = new THREE.Mesh(new THREE.ShapeGeometry(featherShape), plumeMat);
    feather.position.set(0, 0.76, 0.55 - i * 0.18);
    feather.rotation.x = -0.4;
    feather.rotation.z = -Math.PI / 2;
    helmetGroup.add(feather);
  }

  // Riveted bands around the dome
  for (const y of [0.12, 0.42]) {
    const r = Math.sqrt(Math.max(0, 0.78 * 0.78 - y * y)) + 0.005;
    const bandRing = new THREE.Mesh(new THREE.TorusGeometry(r, 0.02, 8, 48), steelMat);
    bandRing.rotation.x = Math.PI / 2;
    bandRing.position.y = y;
    helmetGroup.add(bandRing);
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
    helmetGroup.rotation.y = Math.sin(t * 0.45 * speed) * 0.75;
    helmetGroup.rotation.z = Math.sin(t * 0.8 * speed) * 0.04;
    helmetGroup.position.y = -0.1 + Math.sin(t * 1.1 * speed) * 0.05;
    // Eyes flicker like embers
    eyeMat.color.setHSL(0.93, 0.85, 0.45 + Math.sin(t * 5.2 * speed) * 0.12);
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
