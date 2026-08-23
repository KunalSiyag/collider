import * as THREE from 'three';

export interface RetroRocketOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createRetroRocket(
  container: HTMLElement,
  options: RetroRocketOptions = {},
): () => void {
  const { color = '#fafafa', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.8, 1.2, 4.6);
  camera.lookAt(0, 0.4, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(4, 6, 4);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 28);
  rim.position.set(-4, 1, -3);
  scene.add(rim);

  const rocket = new THREE.Group();
  rocket.rotation.z = 0.12;
  scene.add(rocket);

  const hullMat = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(color), roughness: 0.2, clearcoat: 0.8 });
  const trimMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    metalness: 0.6,
    roughness: 0.3,
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.25,
  });

  // Fuselage
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.48, 2.0, 32), hullMat);
  body.position.y = 0.3;
  rocket.add(body);

  // Nose cone
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.95, 32), trimMat);
  nose.position.y = 1.77;
  rocket.add(nose);

  // Porthole
  const portholeRing = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.045, 10, 24), trimMat);
  portholeRing.position.set(0, 0.75, 0.43);
  portholeRing.lookAt(portholeRing.position.clone().multiplyScalar(2).setY(0.75 * 2));
  rocket.add(portholeRing);
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: '#22d3ee',
    transmission: 0.7,
    roughness: 0.05,
    thickness: 0.3,
    transparent: true,
    opacity: 0.9,
  });
  const glass = new THREE.Mesh(new THREE.CircleGeometry(0.16, 24), glassMat);
  glass.position.set(0, 0.75, 0.445);
  glass.lookAt(glass.position.clone().multiplyScalar(2).setY(0.75 * 2));
  rocket.add(glass);

  // Fins
  const finShape = new THREE.Shape();
  finShape.moveTo(0, 0);
  finShape.lineTo(0.62, -0.32);
  finShape.lineTo(0.66, -0.78);
  finShape.lineTo(0, -0.62);
  finShape.lineTo(0, 0);
  const finGeo = new THREE.ExtrudeGeometry(finShape, { depth: 0.07, bevelEnabled: false });
  for (let i = 0; i < 3; i++) {
    const fin = new THREE.Mesh(finGeo, trimMat);
    const a = (i / 3) * Math.PI * 2;
    fin.position.set(Math.cos(a) * 0.42, -0.68, Math.sin(a) * 0.42);
    fin.rotation.y = -a;
    rocket.add(fin);
  }

  // Exhaust nozzle
  const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.42, 0.28, 24), hullMat);
  nozzle.position.y = -0.82;
  rocket.add(nozzle);

  // Flickering flame
  const flameMat = new THREE.MeshBasicMaterial({
    color: '#ffab4a',
    transparent: true,
    opacity: 0.85,
  });
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.3, 1.3, 16), flameMat);
  flame.position.y = -1.6;
  flame.rotation.x = Math.PI;
  rocket.add(flame);
  const innerFlame = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.7, 12), new THREE.MeshBasicMaterial({ color: '#fff3c4' }));
  innerFlame.position.y = -1.32;
  innerFlame.rotation.x = Math.PI;
  rocket.add(innerFlame);

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
    rocket.position.y = Math.sin(t * 1.1 * speed) * 0.16;
    rocket.rotation.y = t * 0.5 * speed;
    const flicker = 0.85 + Math.sin(t * 21 * speed) * 0.1 + Math.sin(t * 13.7 * speed) * 0.05;
    flame.scale.set(flicker, flicker * 1.15, flicker);
    innerFlame.scale.copy(flame.scale);
    flameMat.opacity = 0.6 + flicker * 0.25;
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
