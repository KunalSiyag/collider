import * as THREE from 'three';

export interface MicrophoneOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createMicrophone(
  container: HTMLElement,
  options: MicrophoneOptions = {},
): () => void {
  const { color = '#c9c4d8', accentColor = '#8b5cf6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(1.6, 0.4, 4.6);
  camera.lookAt(0, 0.5, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(4, 6, 6);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 28);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const mic = new THREE.Group();
  scene.add(mic);

  const chromeMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(color), metalness: 0.95, roughness: 0.12 });
  const darkMat = new THREE.MeshStandardMaterial({ color: '#241b33', roughness: 0.6 });

  // Round weighted base
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.95, 0.16, 40), darkMat);
  base.position.y = -1.35;
  mic.add(base);
  const baseRing = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.03, 10, 48), chromeMat);
  baseRing.rotation.x = Math.PI / 2;
  baseRing.position.y = -1.27;
  mic.add(baseRing);

  // Angled stand with joint
  const lowerArm = new THREE.Group();
  lowerArm.rotation.z = -0.32;
  mic.add(lowerArm);
  const standTube = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.075, 2.0, 14), darkMat);
  standTube.position.y = 1.0;
  lowerArm.add(standTube);
  const joint = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 12), chromeMat);
  joint.position.set(0.62, 1.9, 0);
  mic.add(joint);

  // Upper segment holding the capsule
  const upper = new THREE.Group();
  upper.position.copy(joint.position);
  upper.rotation.z = 0.45;
  mic.add(upper);
  const gooseneck = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.15, 12), darkMat);
  gooseneck.position.y = 0.57;
  upper.add(gooseneck);

  // Capsule head
  const headPivot = new THREE.Group();
  headPivot.position.y = 1.18;
  upper.add(headPivot);
  const basketMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.9,
    roughness: 0.2,
    wireframe: false,
  });
  const headCore = new THREE.Mesh(new THREE.SphereGeometry(0.34, 24, 18), darkMat);
  headPivot.add(headCore);
  // Grill mesh rings
  for (let i = 0; i < 7; i++) {
    const phi = (i / 6) * Math.PI;
    const r = Math.sin(phi) * 0.34 + 0.001;
    const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(r, 0.008, 6, 36), basketMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -Math.cos(phi) * 0.34;
    headPivot.add(ringMesh);
  }
  for (let i = 0; i < 10; i++) {
    const meridian = new THREE.Mesh(new THREE.TorusGeometry(0.342, 0.007, 6, 40), basketMat);
    meridian.rotation.y = (i / 10) * Math.PI;
    headPivot.add(meridian);
  }
  // Brand ring glow
  const glowRingMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.8,
  });
  const glowRing = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.02, 8, 44), glowRingMat);
  glowRing.rotation.x = Math.PI / 2;
  glowRing.position.y = 0.05;
  headPivot.add(glowRing);

  // Sound waves rippling toward the mic
  interface Wave { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; offset: number }
  const waves: Wave[] = [];
  for (let i = 0; i < 3; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const arc = new THREE.Mesh(new THREE.TorusGeometry(1, 0.012, 6, 48, Math.PI), mat);
    arc.position.set(0, 0.1, 0);
    arc.rotation.x = Math.PI / 2;
    waves.push({ mesh: arc, mat, offset: i / 3 });
    headPivot.add(arc);
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
    mic.rotation.y = t * 0.5 * speed;
    headPivot.rotation.z = Math.sin(t * 1.4 * speed) * 0.08;
    mic.position.y = Math.sin(t * 1.0 * speed) * 0.03;
    glowRingMat.emissiveIntensity =
      0.4 + Math.pow(Math.abs(Math.sin(t * 3.4 * speed)), 6) * 1.2;
    for (const w of waves) {
      const phase = (t * 0.9 * speed + w.offset) % 1;
      w.mesh.scale.setScalar(0.25 + phase * 0.85);
      w.mat.opacity = (1 - phase) * 0.45 * glowRingMat.emissiveIntensity * 0.5;
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
