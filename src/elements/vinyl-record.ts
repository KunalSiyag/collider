import * as THREE from 'three';

export interface VinylRecordOptions {
  color?: string;
  labelColor?: string;
  speed?: number;
}

export function createVinylRecord(
  container: HTMLElement,
  options: VinylRecordOptions = {},
): () => void {
  const { color = '#10101a', labelColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
  camera.position.set(0.6, 2.8, 4.4);
  camera.lookAt(0, -0.3, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(3, 6, 5);
  scene.add(key);
  const sweep = new THREE.PointLight(new THREE.Color(labelColor), 30);
  sweep.position.set(-4, 2, 2);
  scene.add(sweep);

  const turntable = new THREE.Group();
  turntable.rotation.x = 0.35;
  scene.add(turntable);

  // Platter
  const platterMat = new THREE.MeshStandardMaterial({ color: '#241b33', metalness: 0.5, roughness: 0.5 });
  const platter = new THREE.Mesh(new THREE.CylinderGeometry(2.05, 2.05, 0.12, 64), platterMat);
  turntable.add(platter);

  // Record with grooves via a custom ring texture made of torus lines
  const recordMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    roughness: 0.25,
    clearcoat: 0.9,
    metalness: 0.1,
  });
  const record = new THREE.Mesh(new THREE.CylinderGeometry(1.95, 1.95, 0.04, 72), recordMat);
  record.position.y = 0.08;
  turntable.add(record);

  const grooveMat = new THREE.MeshBasicMaterial({ color: 0x35304a, transparent: true, opacity: 0.7 });
  for (let i = 0; i < 14; i++) {
    const groove = new THREE.Mesh(new THREE.TorusGeometry(0.75 + i * 0.085, 0.004, 4, 90), grooveMat);
    groove.rotation.x = Math.PI / 2;
    groove.position.y = 0.105;
    turntable.add(groove);
  }

  // Sheen highlight arcs to fake vinyl gloss
  const sheenMat = new THREE.MeshBasicMaterial({
    color: 0x8b9bb8,
    transparent: true,
    opacity: 0.12,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  for (const [start, len] of [[0.4, 1.1], [3.2, 0.7], [5.1, 0.9]] as const) {
    const sheen = new THREE.Mesh(
      new THREE.RingGeometry(0.72, 1.93, 48, 1, start, len),
      sheenMat,
    );
    sheen.rotation.x = -Math.PI / 2;
    sheen.position.y = 0.106;
    turntable.add(sheen);
  }

  // Label + spindle
  const labelMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(labelColor),
    emissive: new THREE.Color(labelColor),
    emissiveIntensity: 0.25,
    roughness: 0.5,
  });
  const label = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.045, 40), labelMat);
  label.position.y = 0.085;
  turntable.add(label);
  const spindle = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.34, 12), platterMat);
  spindle.position.y = 0.22;
  turntable.add(spindle);

  // Tonearm
  const armBase = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.3, 20), platterMat);
  armBase.position.set(1.7, 0.15, -1.5);
  turntable.add(armBase);
  const armCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(1.7, 0.32, -1.5),
    new THREE.Vector3(1.45, 0.36, -0.4),
    new THREE.Vector3(0.85, 0.38, 0.55),
  ]);
  const tonearm = new THREE.Mesh(new THREE.TubeGeometry(armCurve, 24, 0.03, 10), platterMat);
  turntable.add(tonearm);
  const headshell = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.06, 0.1), platterMat);
  headshell.position.set(0.82, 0.38, 0.58);
  headshell.rotation.y = -0.65;
  turntable.add(headshell);

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
    // Everything on the platter spins together (children share rotation via group trick)
    [record, label, spindle].forEach((m) => (m.rotation.y = t * 3.2 * speed));
    grooveMat.opacity = 0.55 + Math.abs(Math.sin(t * 2)) * 0.2;
    turntable.rotation.y = Math.sin(t * 0.3 * speed) * 0.25;
    turntable.position.y = Math.sin(t * 0.9 * speed) * 0.04 - 0.2;
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
