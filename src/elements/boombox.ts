import * as THREE from 'three';

export interface BoomboxOptions {  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createBoombox(
  container: HTMLElement,
  options: BoomboxOptions = {},
): () => void {
  const { color = '#241b33', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.4, 0.9, 5.6);
  camera.lookAt(0, -0.2, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.3);
  key.position.set(4, 6, 6);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 1, -3);
  scene.add(rim);

  const box = new THREE.Group();
  scene.add(box);

  // Chassis
  const chassisMat = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(color), roughness: 0.5, clearcoat: 0.35 });
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.1, 1.15), chassisMat);
  box.add(chassis);
  const trimMat = new THREE.MeshStandardMaterial({ color: '#c9c4d8', metalness: 0.85, roughness: 0.25 });
  for (const y of [0.75, -0.75]) {
    const edge = new THREE.Mesh(new THREE.BoxGeometry(4.24, 0.08, 1.19), trimMat);
    edge.position.y = y;
    box.add(edge);
  }

  // Twin woofers
  interface Woofer { cone: THREE.Mesh; cap: THREE.Mesh }
  const woofers: Woofer[] = [];
  for (const side of [-1, 1]) {
    const grille = new THREE.Mesh(
      new THREE.CircleGeometry(0.72, 32),
      new THREE.MeshStandardMaterial({ color: '#10101a', roughness: 0.7 }),
    );
    grille.position.set(side * 1.42, -0.12, 0.59);
    box.add(grille);
    const cone = new THREE.Mesh(
      new THREE.CylinderGeometry(0.62, 0.2, 0.16, 28),
      new THREE.MeshStandardMaterial({ color: '#2e2839', roughness: 0.6 }),
    );
    cone.rotation.x = Math.PI / 2;
    cone.position.set(side * 1.42, -0.12, 0.56);
    box.add(cone);
    const cap = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 16, 12),
      new THREE.MeshStandardMaterial({ color: new THREE.Color(accentColor), emissive: new THREE.Color(accentColor), emissiveIntensity: 0.3 }),
    );
    cap.position.set(side * 1.42, -0.12, 0.68);
    box.add(cap);
    woofers.push({ cone, cap });
  }

  // Cassette deck window
  const deck = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.72, 0.05), new THREE.MeshBasicMaterial({ color: '#17121f' }));
  deck.position.set(0, 0.38, 0.59);
  box.add(deck);
  // Twin spools inside the deck
  const spoolMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor) });
  interface Spool { mesh: THREE.Group; dir: number }
  const spools: Spool[] = [];
  for (const [x, dir] of [[-0.28, 1], [0.28, -1]] as const) {
    const g = new THREE.Group();
    g.position.set(x, 0.38, 0.62);
    for (let i = 0; i < 3; i++) {
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.03, 0.02), spoolMat);
      spoke.rotation.z = (i / 3) * Math.PI;
      g.add(spoke);
    }
    box.add(g);
    spools.push({ mesh: g, dir });
  }

  // Equalizer bars above the deck
  interface EqBar { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; phase: number }
  const eqBars: EqBar[] = [];
  for (let i = 0; i < 8; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: i % 2 ? new THREE.Color(accentColor) : new THREE.Color('#22d3ee'),
      transparent: true,
      opacity: 0.9,
    });
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.06, 0.04), mat);
    bar.position.set(-0.45 + i * 0.13, -0.78, 0.59);
    box.add(bar);
    eqBars.push({ mesh: bar, mat, phase: i * 0.7 });
  }

  // Handle
  const handleCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.3, 1.07, 0),
    new THREE.Vector3(-0.7, 1.65, 0),
    new THREE.Vector3(0.7, 1.65, 0),
    new THREE.Vector3(1.3, 1.07, 0),
  ]);
  const handleBar = new THREE.Mesh(new THREE.TubeGeometry(handleCurve, 32, 0.055, 10), trimMat);
  box.add(handleBar);

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
    box.rotation.y = Math.sin(t * 0.4 * speed) * 0.5;
    box.position.y = Math.sin(t * 1.0 * speed) * 0.05 - 0.2;
    const beat = Math.pow(Math.abs(Math.sin(t * 3 * speed)), 3);
    for (const w of woofers) {
      w.cone.position.z = 0.56 + beat * 0.1;
      w.cap.position.z = 0.68 + beat * 0.14;
      (w.cap.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.2 + beat * 0.9;
    }
    for (const s of spools) s.mesh.rotation.z += s.dir * 0.08 * speed;
    for (const b of eqBars) {
      const level = 0.1 + Math.abs(Math.sin(t * 5 * speed + b.phase)) * 0.5 * (0.4 + beat);
      b.mesh.scale.y = level * 4;
      b.mesh.position.y = -0.78 + level * 0.12;
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
