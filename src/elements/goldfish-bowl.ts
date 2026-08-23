import * as THREE from 'three';

export interface GoldfishBowlOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createGoldfishBowl(
  container: HTMLElement,
  options: GoldfishBowlOptions = {},
): () => void {
  const { color = '#ff8c42', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.4, 0.2, 5.0);
  camera.lookAt(0, -0.15, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(4, 6, 7);
  scene.add(keyLight);
  // Underwater caustic tint
  const waterGlow = new THREE.PointLight(new THREE.Color(accentColor), 16);
  waterGlow.position.set(0, -0.1, 0);
  scene.add(waterGlow);

  const bowlGroup = new THREE.Group();
  scene.add(bowlGroup);

  // Wooden table
  const tableMat = new THREE.MeshStandardMaterial({ color: '#5b4632', roughness: 0.6 });
  const tableTop = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.45, 0.14, 36), tableMat);
  tableTop.position.y = -1.42;
  bowlGroup.add(tableTop);
  const tableLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 1.1, 20), tableMat);
  tableLeg.position.y = -2.02;
  bowlGroup.add(tableLeg);

  // Glass fishbowl (open sphere)
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xcfe8ff,
    transmission: 0.9,
    roughness: 0.03,
    thickness: 0.4,
    transparent: true,
    opacity: 0.45,
    side: THREE.DoubleSide,
    clearcoat: 1,
  });
  const bowlProfile: THREE.Vector2[] = [];
  for (let i = 0; i <= 22; i++) {
    const u = i / 22;
    // Spherical body with a flat top opening
    const a = Math.PI * (0.08 + u * 0.86);
    bowlProfile.push(new THREE.Vector2(Math.sin(a) * 1.05 + 0.001, -Math.cos(a) * 1.05));
  }
  const bowlGlass = new THREE.Mesh(new THREE.LatheGeometry(bowlProfile.reverse(), 44), glassMat);
  bowlGlass.position.y = 0;
  bowlGroup.add(bowlGlass);

  // Water surface disc
  const waterMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(accentColor).multiplyScalar(0.6),
    transparent: true,
    opacity: 0.35,
  });
  const water = new THREE.Mesh(new THREE.CircleGeometry(0.72, 40), waterMat);
  water.rotation.x = -Math.PI / 2;
  water.position.y = 0.55;
  bowlGroup.add(water);
  void color;

  // Gravel bed
  const gravelMat = new THREE.MeshStandardMaterial({ color: '#c9a86a', roughness: 0.95 });
  const gravel = new THREE.Mesh(new THREE.SphereGeometry(0.92, 32, 12, 0, Math.PI * 2, Math.PI / 2.2, Math.PI / 2), gravelMat);
  gravel.position.y = -0.62;
  bowlGroup.add(gravel);
  for (let i = 0; i < 14; i++) {
    const pebbleMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(0.08 + (i % 5) * 0.03, 0.4, 0.5),
      roughness: 0.9,
    });
    const pebble = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), pebbleMat);
    const a = (i / 14) * Math.PI * 2;
    const r = 0.25 + (i % 3) * 0.22;
    pebble.position.set(Math.cos(a) * r, -0.78, Math.sin(a) * r);
    bowlGroup.add(pebble);
  }

  // Little goldfish
  const fishGroup = new THREE.Group();
  fishGroup.position.y = -0.05;
  bowlGroup.add(fishGroup);
  const fishBodyMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#ff8c42'),
    emissive: new THREE.Color('#ff8c42'),
    emissiveIntensity: 0.25,
    roughness: 0.3,
    clearcoat: 0.7,
  });
  const fishBody = new THREE.Mesh(new THREE.SphereGeometry(0.17, 18, 14), fishBodyMat);
  fishBody.scale.set(1.35, 0.85, 0.75);
  fishGroup.add(fishBody);
  const tailFinShape = new THREE.Shape();
  tailFinShape.moveTo(0, 0);
  tailFinShape.lineTo(-0.26, 0.16);
  tailFinShape.quadraticCurveTo(-0.14, 0, -0.26, -0.16);
  tailFinShape.lineTo(0, 0);
  const finMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#ffb37e'),
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide,
  });
  const tailFin = new THREE.Mesh(new THREE.ShapeGeometry(tailFinShape), finMat);
  tailFin.rotation.y = Math.PI / 2;
  tailFin.position.x = -0.24;
  fishGroup.add(tailFin);
  const dorsalFin = new THREE.Mesh(new THREE.ShapeGeometry(tailFinShape), finMat);
  dorsalFin.scale.set(0.6, 0.7, 1);
  dorsalFin.rotation.z = Math.PI / 2;
  dorsalFin.position.y = 0.13;
  fishGroup.add(dorsalFin);
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x10101a });
  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.028, 10, 8), eyeMat);
    eye.position.set(0.19, 0.04, side * 0.09);
    fishGroup.add(eye);
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
    bowlGroup.rotation.y = t * 0.3 * speed;
    // Fish swims lazy circles inside the bowl
    const a = t * 0.8 * speed;
    fishGroup.position.x = Math.cos(a) * 0.38;
    fishGroup.position.z = Math.sin(a) * 0.38;
    fishGroup.position.y = -0.05 + Math.sin(a * 2.2) * 0.12;
    fishGroup.rotation.y = -a + Math.PI / 2;
    fishGroup.rotation.z = Math.cos(a) * 0.15;
    tailFin.rotation.y = Math.PI / 2 + Math.sin(t * 9 * speed) * 0.45; // tail wag
    water.scale.setScalar(1 + Math.sin(t * 2.4 * speed) * 0.01);
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
