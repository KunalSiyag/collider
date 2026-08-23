import * as THREE from 'three';

export interface TeslaCoilOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createTeslaCoil(
  container: HTMLElement,
  options: TeslaCoilOptions = {},
): () => void {
  const { color = '#a78bfa', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 60);
  camera.position.set(0.8, 0.9, 5.4);
  camera.lookAt(0, 0.6, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.3));
  const arcLight = new THREE.PointLight(new THREE.Color(accentColor), 30, 12);
  arcLight.position.set(0, 2.6, 0);
  scene.add(arcLight);
  const baseGlow = new THREE.PointLight(new THREE.Color(color), 16);
  baseGlow.position.set(-3, 1, -2);
  scene.add(baseGlow);

  const coil = new THREE.Group();
  scene.add(coil);

  // Base plinth
  const plinthMat = new THREE.MeshStandardMaterial({ color: '#241b33', roughness: 0.7 });
  const plinth = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.25, 0.35, 36), plinthMat);
  plinth.position.y = -1.55;
  coil.add(plinth);

  // Primary winding: wide copper ribbon spiral (stack of tori)
  const copperMat = new THREE.MeshStandardMaterial({ color: '#c47b3a', metalness: 0.95, roughness: 0.28 });
  for (let i = 0; i < 5; i++) {
    const turn = new THREE.Mesh(new THREE.TorusGeometry(0.85 - i * 0.06, 0.035, 10, 48), copperMat);
    turn.rotation.x = Math.PI / 2;
    turn.position.y = -1.32 + i * 0.075;
    coil.add(turn);
  }

  // Secondary coil: dense fine windings on a column
  const columnMat = new THREE.MeshStandardMaterial({ color: '#10101a', roughness: 0.65 });
  const column = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 2.4, 24), columnMat);
  column.position.y = 0.05;
  coil.add(column);
  const wireMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.85,
    roughness: 0.3,
    emissive: new THREE.Color(color),
    emissiveIntensity: 0.15,
  });
  for (let i = 0; i < 34; i++) {
    const w = new THREE.Mesh(new THREE.TorusGeometry(0.265, 0.008, 6, 36), wireMat);
    w.rotation.x = Math.PI / 2;
    w.position.y = -1.13 + i * 0.07;
    coil.add(w);
  }

  // Toroid top load
  const toroidMat = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(color), metalness: 0.9, roughness: 0.18, clearcoat: 0.6 });
  const toroid = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.14, 14, 56), toroidMat);
  toroid.rotation.x = Math.PI / 2;
  toroid.position.y = 1.42;
  coil.add(toroid);
  const breakout = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 10), toroidMat);
  breakout.position.y = 1.52;
  coil.add(breakout);

  // Arc bolts
  interface Bolt { curve: THREE.CatmullRomCurve3; mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; target: THREE.Vector3 }
  const bolts: Bolt[] = [];
  const rand = (() => {
    let s = 661 >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  })();
  for (let i = 0; i < 4; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: i % 2 ? new THREE.Color(accentColor) : new THREE.Color('#e9e4f5'),
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3()]);
    const boltMesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 20, 0.014, 5), mat);
    coil.add(boltMesh);
    bolts.push({ curve, mesh: boltMesh, mat, target: new THREE.Vector3() });
  }

  function rebuildBolt(b: Bolt) {
    const start = new THREE.Vector3((rand() - 0.5) * 0.5, 1.55, (rand() - 0.5) * 0.5);
    const a = rand() * Math.PI * 2;
    b.target.set(Math.cos(a) * (1.4 + rand()), rand() * 1.6 + 0.2, Math.sin(a) * (1.4 + rand()));
    const pts: THREE.Vector3[] = [start];
    const SEGMENTS = 8;
    for (let i = 1; i < SEGMENTS; i++) {
      const u = i / SEGMENTS;
      pts.push(start.clone().lerp(b.target, u).add(new THREE.Vector3((rand() - 0.5) * 0.4, (rand() - 0.5) * 0.25, (rand() - 0.5) * 0.4)));
    }
    pts.push(b.target.clone());
    b.curve.points = pts;
    b.mesh.geometry.dispose();
    b.mesh.geometry = new THREE.TubeGeometry(b.curve, 24, 0.01 + rand() * 0.012, 5);
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
    coil.rotation.y = t * 0.4 * speed;
    // Discharge in bursts
    const burst = Math.sin(t * 1.8 * speed) > 0.55;
    for (const b of bolts) {
      b.mat.opacity += ((burst ? 0.9 : 0) - b.mat.opacity) * 0.4;
      if (burst && Math.random() < 0.3 * speed) rebuildBolt(b);
    }
    arcLight.intensity = burst ? 34 + Math.sin(t * 40) * 12 : 6;
    wireMat.emissiveIntensity = burst ? 0.5 : 0.12;
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
