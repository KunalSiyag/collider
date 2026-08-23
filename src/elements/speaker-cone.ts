import * as THREE from 'three';

export interface SpeakerConeOptions {
  color?: string;
  accentColor?: number;
  speed?: number;
}

export function createSpeakerCone(
  container: HTMLElement,
  options: SpeakerConeOptions = {},
): () => void {
  const { color = '#241b33', accentColor = 0x22d3ee, speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.4, 0.4, 5.0);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(3, 5, 6);
  scene.add(key);
  const rim = new THREE.PointLight(accentColor, 26);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const cabinet = new THREE.Group();
  scene.add(cabinet);

  // Cabinet box
  const boxMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(color), roughness: 0.7 });
  const boxGeo = new THREE.BoxGeometry(3.4, 3.4, 1.4);
  const cabinetBox = new THREE.Mesh(boxGeo, boxMat);
  cabinetBox.position.z = -0.7;
  cabinet.add(cabinetBox);

  // Woofer assembly
  const surroundMat = new THREE.MeshStandardMaterial({ color: '#10101a', roughness: 0.8 });
  const coneMat = new THREE.MeshStandardMaterial({
    color: '#3a3350',
    roughness: 0.55,
    metalness: 0.25,
    side: THREE.DoubleSide,
  });
  const dustCapMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#a78bfa'),
    metalness: 0.6,
    roughness: 0.3,
    emissive: new THREE.Color('#a78bfa'),
    emissiveIntensity: 0.15,
  });

  // Outer basket ring
  const basket = new THREE.Mesh(new THREE.TorusGeometry(1.18, 0.09, 14, 48), surroundMat);
  cabinet.add(basket);
  // Suspended cone that pumps in and out
  const cone = new THREE.Group();
  cabinet.add(cone);
  const coneBodyProfile: THREE.Vector2[] = [
    new THREE.Vector2(1.12, 0),
    new THREE.Vector2(1.02, -0.06),
    new THREE.Vector2(0.42, -0.34),
    new THREE.Vector2(0.2, -0.38),
  ];
  const coneBody = new THREE.Mesh(new THREE.LatheGeometry(coneBodyProfile, 40), coneMat);
  cone.add(coneBody);
  const dustCap = new THREE.Mesh(new THREE.SphereGeometry(0.21, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), dustCapMat);
  dustCap.rotation.x = Math.PI;
  dustCap.position.y = -0.36;
  cone.add(dustCap);

  // Tweeter
  const tweeterRing = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.05, 10, 32), surroundMat);
  tweeterRing.position.set(0, 0, 0);
  cabinet.add(tweeterRing);
  void tweeterRing;

  // Sound wave rings pulsing outward
  interface Wave { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; offset: number }
  const waves: Wave[] = [];
  for (let i = 0; i < 4; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const waveMesh = new THREE.Mesh(new THREE.TorusGeometry(1, 0.008, 6, 64), mat);
    cabinet.add(waveMesh);
    waves.push({ mesh: waveMesh, mat, offset: i / 4 });
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
    cabinet.rotation.y = Math.sin(t * 0.35 * speed) * 0.45;
    cabinet.rotation.x = Math.sin(t * 0.28 * speed) * 0.08;
    // Bass pump
    const beat =
      Math.pow(Math.abs(Math.sin(t * 2.6 * speed)), 6) * 0.16 +
      Math.sin(t * 18 * speed) * 0.015;
    cone.position.z = beat;
    dustCapMat.emissiveIntensity = 0.1 + beat * 3;
    // Expanding pressure waves
    for (const w of waves) {
      const phase = ((t * 0.9 * speed + w.offset) % 1);
      w.mesh.scale.setScalar(1 + phase * 1.6);
      w.mesh.position.z = phase * 2.2;
      w.mat.opacity = (1 - phase) * (beat * 4 + 0.12);
    }
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
