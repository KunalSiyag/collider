import * as THREE from 'three';

export interface PenguinChickOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createPenguinChick(
  container: HTMLElement,
  options: PenguinChickOptions = {},
): () => void {
  const { color = '#241b33', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(1.8, 0.6, 4.6);
  camera.lookAt(0, -0.4, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
  keyLight.position.set(4, 7, 6);
  scene.add(keyLight);
  // Cold blue bounce
  const iceLight = new THREE.PointLight(new THREE.Color(accentColor), 20);
  iceLight.position.set(-3, -1, -2);
  scene.add(iceLight);

  // Ice floe ground
  const iceMat = new THREE.MeshPhysicalMaterial({ color: '#cfe8ff', roughness: 0.25, clearcoat: 0.6 });
  const floe = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.1, 0.34, 9), iceMat);
  floe.position.y = -1.55;
  scene.add(floe);

  const penguin = new THREE.Group();
  penguin.rotation.y = 0.4;
  scene.add(penguin);

  const bodyMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(color).multiplyScalar(1.6), roughness: 0.7 });
  const bellyMat = new THREE.MeshStandardMaterial({
    color: '#e9e4f5',
    roughness: 0.75,
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.06,
  });

  // Egg-shaped body
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.62, 28, 22), bodyMat);
  body.scale.set(0.92, 1.18, 0.88);
  penguin.add(body);

  // White face patch + belly
  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.52, 24, 18, Math.PI * 0.35, Math.PI * 1.3, Math.PI * 0.32, Math.PI * 0.62), bellyMat);
  belly.scale.set(0.95, 1.12, 0.9);
  penguin.add(belly);

  // Head is part of the egg; add face patches
  for (const side of [-1, 1]) {
    const cheek = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 12), bellyMat);
    cheek.position.set(side * 0.26, 0.42, 0.42);
    cheek.scale.z = 0.6;
    penguin.add(cheek);
  }

  // Beak
  const beakMat = new THREE.MeshStandardMaterial({ color: '#ff8c42', roughness: 0.45 });
  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.28, 12), beakMat);
  beak.rotation.x = Math.PI / 2;
  beak.position.set(0, 0.38, 0.62);
  penguin.add(beak);

  // Eyes
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x10101a });
  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 10), eyeMat);
    eye.position.set(side * 0.2, 0.52, 0.5);
    penguin.add(eye);
    const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const glint = new THREE.Mesh(new THREE.SphereGeometry(0.018, 6, 6), glintMat);
    glint.position.set(side * 0.22, 0.56, 0.54);
    penguin.add(glint);
  }

  // Flippers
  interface Flipper { mesh: THREE.Mesh; side: number }
  const flippers: Flipper[] = [];
  for (const side of [-1, 1]) {
    const flipperShape = new THREE.Shape();
    flipperShape.moveTo(0, 0);
    flipperShape.quadraticCurveTo(0.3, -0.15, 0.42, -0.5);
    flipperShape.quadraticCurveTo(0.16, -0.42, 0, -0.18);
    flipperShape.lineTo(0, 0);
    const flipper = new THREE.Mesh(
      new THREE.ExtrudeGeometry(flipperShape, { depth: 0.07, bevelEnabled: false }),
      bodyMat,
    );
    flipper.position.set(side * 0.5, 0.28, 0);
    flipper.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2;
    flipper.rotation.x = 0.2;
    penguin.add(flipper);
    flippers.push({ mesh: flipper, side });
  }

  // Feet
  for (const side of [-1, 1]) {
    const footShape = new THREE.Shape();
    footShape.moveTo(-0.1, 0);
    footShape.lineTo(0.26, 0.02);
    footShape.lineTo(0.3, -0.1);
    footShape.lineTo(-0.08, -0.12);
    footShape.lineTo(-0.1, 0);
    const foot = new THREE.Mesh(new THREE.ExtrudeGeometry(footShape, { depth: 0.06, bevelEnabled: false }), beakMat);
    foot.position.set(side * 0.18, -0.72, 0.18);
    foot.rotation.y = side * 0.3;
    foot.rotation.x = Math.PI / 2;
    penguin.add(foot);
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
    // Waddle rock and curious head tilts (whole body rocks)
    penguin.rotation.z = Math.sin(t * 3.2 * speed) * 0.12;
    penguin.rotation.x = Math.sin(t * 3.2 * speed + Math.PI / 2) * 0.04;
    penguin.position.y = Math.abs(Math.sin(t * 3.2 * speed)) * 0.03 - 0.75;
    penguin.rotation.y = 0.4 + Math.sin(t * 0.6 * speed) * 0.4;
    for (const f of flippers) {
      f.mesh.rotation.z = f.side * Math.abs(Math.sin(t * 3.2 * speed)) * 0.35;
    }
    beakMat.color.setHSL(0.07, 0.95, 0.55 + Math.sin(t * 2.2 * speed) * 0.04);
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
