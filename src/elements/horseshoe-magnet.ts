import * as THREE from 'three';

export interface HorseshoeMagnetOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createHorseshoeMagnet(
  container: HTMLElement,
  options: HorseshoeMagnetOptions = {},
): () => void {
  const { color = '#e63946', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.4, 0.8, 5.0);
  camera.lookAt(0, 0.2, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(4, 6, 5);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 24);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const magnet = new THREE.Group();
  scene.add(magnet);

  // U-shape from a swept tube along a horseshoe path
  const pathPts: THREE.Vector3[] = [];
  for (let i = 0; i <= 20; i++) {
    const a = (i / 20) * Math.PI; // half torus arc
    pathPts.push(new THREE.Vector3(Math.cos(a) * 1.1, Math.sin(a) * 1.1 + 0.35, 0));
  }
  const curve = new THREE.CatmullRomCurve3(pathPts);
  const redMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    roughness: 0.3,
    clearcoat: 0.7,
  });
  const body = new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.26, 18), redMat);
  magnet.add(body);

  // Steel pole tips
  const steel = new THREE.MeshStandardMaterial({
    color: '#c9c4d8',
    metalness: 0.95,
    roughness: 0.15,
  });
  for (const side of [-1, 1]) {
    const tip = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.34, 0.52), steel);
    tip.position.set(side * 1.1, -0.42, 0);
    magnet.add(tip);
  }

  // Field arcs between the poles
  const fieldMats: THREE.LineBasicMaterial[] = [];
  for (let i = 0; i < 4; i++) {
    const w = 0.45 + i * 0.32;
    const pts: THREE.Vector3[] = [];
    for (let j = 0; j <= 28; j++) {
      const u = j / 28;
      const x = THREE.MathUtils.lerp(-1.1, 1.1, u);
      pts.push(new THREE.Vector3(x, Math.sin(u * Math.PI) * w - 0.55, 0));
    }
    const mat = new THREE.LineBasicMaterial({
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0.25,
    });
    fieldMats.push(mat);
    magnet.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
  }

  // Floating iron filings cluster near the gap
  const rand = (() => {
    let s = 99991 >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  })();
  const filingGeo = new THREE.BoxGeometry(0.05, 0.05, 0.02);
  interface Filing { mesh: THREE.Mesh; baseY: number; phase: number }
  const filings: Filing[] = [];
  const filingMat = new THREE.MeshStandardMaterial({ color: '#8a93a8', metalness: 0.9, roughness: 0.3 });
  for (let i = 0; i < 22; i++) {
    const f = new THREE.Mesh(filingGeo, filingMat);
    f.position.set((rand() - 0.5) * 2.1, -0.75 - rand() * 0.9, (rand() - 0.5) * 0.5);
    f.rotation.z = Math.PI / 2;
    filings.push({ mesh: f, baseY: f.position.y, phase: rand() * Math.PI * 2 });
    magnet.add(f);
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
    magnet.rotation.y = Math.sin(t * 0.5 * speed) * 0.55;
    magnet.position.y = Math.sin(t * 1.0 * speed) * 0.07;
    for (const f of filings) {
      const lift = Math.max(0, Math.sin(t * 1.6 * speed + f.phase)) * 0.5;
      f.mesh.position.y = f.baseY + lift;
      f.mesh.rotation.y += 0.03 * speed;
    }
    fieldMats.forEach((m, i) => {
      m.opacity = 0.12 + Math.abs(Math.sin(t * 1.8 * speed + i * 0.7)) * 0.25;
    });
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
        obj.geometry.dispose();
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((m) => m.dispose());
      }
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
