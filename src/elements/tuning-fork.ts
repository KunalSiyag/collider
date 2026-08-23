import * as THREE from 'three';

export interface TuningForkOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createTuningFork(
  container: HTMLElement,
  options: TuningForkOptions = {},
): () => void {
  const { color = '#c9c4d8', accentColor = '#8b5cf6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.4, 0.2, 5.0);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(3, 6, 6);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 1, -3);
  scene.add(rim);

  const fork = new THREE.Group();
  fork.rotation.z = -0.15;
  scene.add(fork);

  const steelMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.95,
    roughness: 0.12,
  });

  // Handle
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 1.3, 20), steelMat);
  handle.position.y = -0.95;
  fork.add(handle);
  const cushionMat = new THREE.MeshStandardMaterial({ color: '#241b33', roughness: 0.7 });
  const cushion = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.34, 20), cushionMat);
  cushion.position.y = -1.35;
  fork.add(cushion);

  // Yoke
  const yoke = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 12), steelMat);
  yoke.scale.set(2.4, 1, 1);
  yoke.position.y = -0.26;
  fork.add(yoke);

  interface Prong { group: THREE.Group; side: number }
  const prongs: Prong[] = [];
  for (const side of [-1, 1]) {
    const g = new THREE.Group();
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.07, 2.3, 16), steelMat);
    shaft.position.set(side * 0.31, 0.92, 0);
    g.add(shaft);
    const ballTip = new THREE.Mesh(new THREE.SphereGeometry(0.085, 14, 12), steelMat);
    ballTip.position.set(side * 0.31, 2.08, 0);
    g.add(ballTip);
    fork.add(g);
    prongs.push({ group: g, side });
  }

  // Resonance rings emanating when vibrating
  interface Ring { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; offset: number }
  const rings: Ring[] = [];
  for (let i = 0; i < 3; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(1, 0.01, 6, 64), mat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 1.9;
    fork.add(ringMesh);
    rings.push({ mesh: ringMesh, mat, offset: i / 3 });
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
  let strikeT = 0;
  function tick() {
    raf = requestAnimationFrame(tick);
    const t = clock.getElapsedTime();
    strikeT += clock.getDelta() * speed;
    if (strikeT > 4) strikeT = 0; // re-strike periodically
    // Decay envelope after each strike
    const decay = Math.exp(-strikeT * 0.55);
    for (const p of prongs) {
      p.group.rotation.z = p.side * Math.sin(strikeT * 26) * 0.06 * decay;
    }
    fork.rotation.y = Math.sin(t * 0.4 * speed) * 0.45;
    fork.position.y = Math.sin(t * 1.0 * speed) * 0.05;
    for (const r of rings) {
      const phase = (t * 0.8 + r.offset) % 1;
      r.mesh.scale.setScalar(0.35 + phase * 0.95);
      r.mat.opacity = (1 - phase) * 0.35 * decay;
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
