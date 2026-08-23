import * as THREE from 'three';

export interface WindChimeOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createWindChime(
  container: HTMLElement,
  options: WindChimeOptions = {},
): () => void {
  const { color = '#c9c4d8', accentColor = '#8b5cf6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.6, -0.4, 5.0);
  camera.lookAt(0, 0.2, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.3);
  key.position.set(4, 6, 6);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 0, -3);
  scene.add(rim);

  const root = new THREE.Group();
  scene.add(root);

  // Top wooden disc
  const woodMat = new THREE.MeshStandardMaterial({ color: '#5b4632', roughness: 0.75 });
  const topDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.09, 36), woodMat);
  root.add(topDisc);

  const stringMat = new THREE.LineBasicMaterial({ color: 0xbfae90 });
  const chimeMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.95,
    roughness: 0.15,
  });
  const clapperMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.35,
    metalness: 0.6,
    roughness: 0.3,
  });

  interface Tube {
    pivot: THREE.Group;
    tube: THREE.Mesh;
    length: number;
    angle: number;
    phase: number;
  }
  const tubes: Tube[] = [];
  const COUNT = 6;
  for (let i = 0; i < COUNT; i++) {
    const a = (i / COUNT) * Math.PI * 2;
    const r = 0.58;
    const length = 1.15 + (i % 3) * 0.28;

    const pivot = new THREE.Group();
    pivot.position.set(Math.cos(a) * r, -0.05, Math.sin(a) * r);
    root.add(pivot);

    // String
    const strGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, -0.45, 0),
    ]);
    pivot.add(new THREE.Line(strGeo, stringMat));

    const tubePivot = new THREE.Group();
    tubePivot.position.y = -0.45;
    pivot.add(tubePivot);
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, length, 18), chimeMat);
    tube.position.y = -length / 2;
    tubePivot.add(tube);

    tubes.push({ pivot, tube, length, angle: a, phase: i * 1.7 });
  }

  // Central clapper ball and sail
  const clapperString = new THREE.Group();
  clapperString.position.y = -0.05;
  root.add(clapperString);
  const cStr = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.9, 6), woodMat);
  cStr.position.y = -0.45;
  clapperString.add(cStr);
  const clapper = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 12), clapperMat);
  clapper.position.y = -0.95;
  clapperString.add(clapper);
  const sailShape = new THREE.Shape();
  sailShape.moveTo(-0.14, 0);
  sailShape.lineTo(0.14, 0);
  sailShape.lineTo(0.05, -0.42);
  sailShape.lineTo(-0.05, -0.42);
  sailShape.lineTo(-0.14, 0);
  const sail = new THREE.Mesh(
    new THREE.ExtrudeGeometry(sailShape, { depth: 0.02, bevelEnabled: false }),
    clapperMat,
  );
  sail.position.y = -1.08;
  clapperString.add(sail);

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
    root.rotation.y = t * 0.25 * speed;
    root.rotation.z = Math.sin(t * 0.6 * speed) * 0.04;
    // Breeze gusts drive the sail; tubes swing with lag
    for (const tb of tubes) {
      tb.pivot.rotation.z = Math.sin(t * 1.3 * speed + tb.phase) * 0.06;
      tb.tube.rotation.x = Math.sin(t * 1.1 * speed + tb.phase + 0.6) * 0.07;
      tb.tube.rotation.z = Math.cos(t * 0.9 * speed + tb.phase) * 0.05;
    }
    clapperString.rotation.x = Math.sin(t * 1.5 * speed) * 0.14;
    clapperString.rotation.z = Math.cos(t * 1.1 * speed) * 0.1;
    clapperMat.emissiveIntensity =
      0.25 + Math.pow(Math.abs(Math.sin(t * 2.2 * speed)), 10) * 0.8;
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
