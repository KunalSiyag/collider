import * as THREE from 'three';

export interface ConchShellOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createConchShell(
  container: HTMLElement,
  options: ConchShellOptions = {},
): () => void {
  const { color = '#f472b6', accentColor = '#a78bfa', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.6, 1.6, 4.4);
  camera.lookAt(0, 0.3, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.3);
  key.position.set(4, 5, 4);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 28);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const shellMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    roughness: 0.25,
    clearcoat: 0.8,
    iridescence: 0.6,
    iridescenceIOR: 1.6,
    sheen: 0.8,
    sheenColor: new THREE.Color(accentColor),
  });

  // Logarithmic spiral of tube segments forming the conch whorl
  const shell = new THREE.Group();
  scene.add(shell);
  const turns = 26;
  let lastSeg: THREE.Mesh | null = null;
  for (let i = 0; i < turns; i++) {
    const t = i / (turns - 1);
    const a = t * Math.PI * 4.6;
    const r = 0.16 + Math.pow(t, 1.7) * 1.15;
    const tubeR = 0.035 + Math.pow(t, 1.9) * 0.34;
    const seg = new THREE.Mesh(new THREE.SphereGeometry(tubeR, 14, 10), shellMat);
    seg.position.set(Math.cos(a) * r, t * 0.55, Math.sin(a) * r * 0.85);
    shell.add(seg);
    lastSeg = seg;
  }
  void lastSeg;

  // Flared lip at the wide end
  const lipCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.28, 0.42, 0.55),
    new THREE.Vector3(-0.35, 0.62, 1.05),
    new THREE.Vector3(0.75, 0.55, 0.55),
    new THREE.Vector3(1.05, 0.45, -0.4),
    new THREE.Vector3(0.2, 0.38, -1.0),
    new THREE.Vector3(-0.95, 0.36, -0.5),
  ]);
  const lip = new THREE.Mesh(new THREE.TubeGeometry(lipCurve, 48, 0.07, 10), shellMat);
  shell.add(lip);

  // Ridged spines along the outer edge
  const spineMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.3,
    roughness: 0.4,
  });
  for (let i = 8; i < turns; i += 3) {
    const t = i / (turns - 1);
    const a = t * Math.PI * 4.6;
    const r = 0.16 + Math.pow(t, 1.7) * 1.15;
    for (const up of [1, -1]) {
      const spine = new THREE.Mesh(new THREE.ConeGeometry(0.03 + t * 0.04, 0.12 + t * 0.22, 6), spineMat);
      spine.position.set(Math.cos(a) * (r + 0.08), up * (0.06 + t * 0.3) + t * 0.55, Math.sin(a) * (r + 0.08) * 0.85);
      spine.rotation.z = -up * (Math.PI / 2.4) * (up > 0 ? 1 : -1) * Math.sign(1);
      spine.rotation.x = up > 0 ? 0 : Math.PI;
      shell.add(spine);
    }
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
    shell.rotation.y = t * 0.45 * speed;
    shell.rotation.z = Math.sin(t * 0.6 * speed) * 0.1;
    shell.position.y = 0.3 + Math.sin(t * 1.0 * speed) * 0.07;
    spineMat.emissiveIntensity = 0.2 + Math.abs(Math.sin(t * 1.5 * speed)) * 0.3;
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
