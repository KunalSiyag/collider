import * as THREE from 'three';

export interface CameraVintageOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createCameraVintage(
  container: HTMLElement,
  options: CameraVintageOptions = {},
): () => void {
  const { color = '#241b33', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.6, 1.6, 4.4);
  camera.lookAt(0, -0.1, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(4, 6, 5);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const cam = new THREE.Group();
  cam.position.y = -0.1;
  scene.add(cam);

  // Body
  const bodyMat = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(color), roughness: 0.45, clearcoat: 0.5 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.25, 0.85), bodyMat);
  cam.add(body);
  // Leatherette band
  const bandMat = new THREE.MeshStandardMaterial({ color: '#17121f', roughness: 0.8 });
  const band = new THREE.Mesh(new THREE.BoxGeometry(2.22, 0.5, 0.87), bandMat);
  band.position.y = 0.15;
  cam.add(band);
  // Top plate
  const plateMat = new THREE.MeshStandardMaterial({ color: '#c9c4d8', metalness: 0.9, roughness: 0.2 });
  const topPlate = new THREE.Mesh(new THREE.BoxGeometry(2.24, 0.16, 0.87), plateMat);
  topPlate.position.y = 0.7;
  cam.add(topPlate);

  // Viewfinder prism bump
  const finder = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.28, 0.42), bodyMat);
  finder.position.set(-0.62, 0.92, 0);
  cam.add(finder);

  // Shutter button
  const shutterBase = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.06, 18), plateMat);
  shutterBase.position.set(0.72, 0.82, 0);
  cam.add(shutterBase);
  const shutterMat = new THREE.MeshStandardMaterial({ color: '#e63946', roughness: 0.35 });
  const shutterBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.05, 18), shutterMat);
  shutterBtn.position.set(0.72, 0.88, 0);
  cam.add(shutterBtn);

  // Lens barrel with focus rings
  const barrelMat = new THREE.MeshStandardMaterial({ color: '#10101a', metalness: 0.4, roughness: 0.45 });
  for (let i = 0; i < 3; i++) {
    const ring = new THREE.Mesh(
      new THREE.CylinderGeometry(0.46 - i * 0.03, 0.48 - i * 0.03, 0.24, 32),
      barrelMat,
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.z = 0.52 + i * 0.23;
    cam.add(ring);
    // Knurling notches
    for (let k = 0; k < 12; k++) {
      const a = (k / 12) * Math.PI * 2;
      const notch = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.2), plateMat);
      notch.position.set(Math.cos(a) * (0.47 - i * 0.03), Math.sin(a) * (0.47 - i * 0.03), 0.52 + i * 0.23);
      notch.rotation.z = a;
      cam.add(notch);
    }
  }

  // Front element glass with glint
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: '#7fb7ff',
    transmission: 0.75,
    roughness: 0.02,
    thickness: 0.4,
    transparent: true,
    opacity: 0.9,
  });
  const frontGlass = new THREE.Mesh(new THREE.SphereGeometry(0.36, 26, 18, 0, Math.PI * 2, 0, Math.PI / 2.6), glassMat);
  frontGlass.rotation.x = Math.PI / 2;
  frontGlass.position.z = 1.19;
  cam.add(frontGlass);

  // Flash cube
  const flashMat = new THREE.MeshBasicMaterial({
    color: '#fff8ec',
    transparent: true,
    opacity: 0.85,
  });
  const flash = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), flashMat);
  flash.position.set(-1.0, 0.98, 0.2);
  cam.add(flash);

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
    cam.rotation.y = t * 0.5 * speed;
    cam.position.y = -0.1 + Math.sin(t * 1.1 * speed) * 0.05;
    // Periodic flash pop
    const pop = Math.max(0, Math.sin(t * 2.2 * speed)) > 0.985 ? 1 : Math.max(0, 1 - ((t * 2.2 * speed) % 1) * 6);
    flashMat.opacity = 0.25 + pop * 0.75;
    void accentColor;
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
