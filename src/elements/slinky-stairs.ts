import * as THREE from 'three';

export interface SlinkyStairsOptions {
  color?: string;
  accentColor?: string;
  coils?: number;
  speed?: number;
}

export function createSlinkyStairs(
  container: HTMLElement,
  options: SlinkyStairsOptions = {},
): () => void {
  const { color = '#22d3ee', accentColor = '#8b5cf6', coils = 16, speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 60);
  camera.position.set(5.4, 3.0, 5.6);
  camera.lookAt(-0.4, -0.6, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(5, 7, 4);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 28);
  rim.position.set(-5, 2, -4);
  scene.add(rim);

  // Staircase of steps
  const STEPS = 9;
  const stepMat = new THREE.MeshStandardMaterial({ color: '#241b33', roughness: 0.75 });
  const stairsGroup = new THREE.Group();
  scene.add(stairsGroup);
  for (let i = 0; i < STEPS; i++) {
    const step = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.14, 0.62), stepMat);
    step.position.set(-i * 1.05, -i * 0.52 - 0.07, 0);
    stairsGroup.add(step);
  }

  // Slinky: a helix tube that stretches down the stairs
  function helixPoints(stretch: number): THREE.Vector3[] {
    const pts: THREE.Vector3[] = [];
    const totalDrop = (STEPS - 1) * 0.52;
    const run = (STEPS - 1) * 1.05;
    for (let i = 0; i <= coils * 10; i++) {
      const u = i / (coils * 10);
      // Follow the stair profile with slight sag between steps
      const x = -u * run;
      const stepIndex = Math.min(Math.floor(u * STEPS), STEPS - 1);
      const localU = u * STEPS - stepIndex;
      const yStep = -stepIndex * 0.52 - localU * 0.52;
      const sag = Math.sin(localU * Math.PI) * 0.05;
      pts.push(new THREE.Vector3(
        x,
        yStep - sag - 0.18,
        Math.sin(u * coils * Math.PI * 2) * 0.24,
      ));
    }
    return pts;
  }

  const slinkyMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    metalness: 0.85,
    roughness: 0.2,
    clearcoat: 0.5,
  });

  let currentGeo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(helixPoints(0)), coils * 12, 0.032, 8);
  const slinky = new THREE.Mesh(currentGeo, slinkyMat);
  scene.add(slinky);

  // End caps
  const capGeo = new THREE.SphereGeometry(0.05, 10, 8);
  const capA = new THREE.Mesh(capGeo, slinkyMat);
  const capB = new THREE.Mesh(capGeo, slinkyMat);

  function updateCaps(pts: THREE.Vector3[]) {
    capA.position.copy(pts[0]);
    capB.position.copy(pts[pts.length - 1]);
    if (!capA.parent) scene.add(capA);
    if (!capB.parent) scene.add(capB);
  }
  updateCaps(helixPoints(0));

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
    // Slinky rhythmically flips over itself: subtle breathing of the coil
    const breathe = Math.sin(t * 2.4 * speed) * 0.06;
    const pts = helixPoints(breathe);
    currentGeo.dispose();
    currentGeo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), coils * 12, 0.032, 8);
    slinky.geometry = currentGeo;
    updateCaps(pts);
    stairsGroup.rotation.y = Math.sin(t * 0.3 * speed) * 0.35;
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
