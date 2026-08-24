import * as THREE from 'three';

/** Paper Crane 3D — an origami crane folding itself flat-shaded and orbiting. */
export interface PaperCrane3DOptions {
  color?: string;
  speed?: number;
}

export function createPaperCrane3D(
  container: HTMLElement,
  options: PaperCrane3DOptions = {},
): () => void {
  const { color = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
  camera.position.set(0, 1.6, 5.4);
  camera.lookAt(0, 0.2, 0);

  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    flatShading: true,
    side: THREE.DoubleSide,
    roughness: 0.7,
  });
  const disposables: Array<{ dispose(): void }> = [material];

  const crane = new THREE.Group();

  /** One triangular "fold": a custom triangle in the XZ->Y plane. */
  const fold = (pts: number[][]) => {
    const g = new THREE.BufferGeometry();
    const v = new Float32Array(pts.flat());
    g.setAttribute('position', new THREE.BufferAttribute(v, 3));
    g.computeVertexNormals();
    disposables.push(g);
    return new THREE.Mesh(g, material);
  };

  // Body (diamond folded up the middle).
  crane.add(fold([[0, 0.55, 0], [0, -0.1, 0.9], [0, 0.1, -0.55]]));
  crane.add(fold([[0.001, 0.55, 0], [0.001, -0.1, 0.9], [0.001, 0.1, -0.55]]));
  // Wings swept out and up.
  const wingL = fold([[0, 0.45, 0], [1.7, 0.75, 0.35], [0, -0.05, 0.55]]);
  const wingR = fold([[0, 0.45, 0], [-1.7, 0.75, 0.35], [0, -0.05, 0.55]]);
  crane.add(wingL, wingR);
  // Head/neck and tail spikes.
  crane.add(fold([[0, 0.5, -0.5], [0.16, 0.95, -1.15], [-0.16, 0.95, -1.15]]));
  crane.add(fold([[0, 0.35, 0.85], [0.14, 0.8, 1.35], [-0.14, 0.8, 1.35]]));

  crane.traverse((o) => {
    if (o instanceof THREE.Mesh) o.castShadow = false;
  });
  scene.add(crane);

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const key = new THREE.DirectionalLight(0xffffff, 1.4);
  key.position.set(3, 5, 4);
  scene.add(key);
  disposables.push(key);

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
    const t = clock.getElapsedTime() * speed;

    crane.rotation.y = t * 0.5;
    crane.position.y = Math.sin(t * 1.4) * 0.18;
    // Slow wing flap around the body axis.
    wingL.rotation.z = Math.sin(t * 2.2) * 0.22;
    wingR.rotation.z = -Math.sin(t * 2.2) * 0.22;

    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    disposables.forEach((d) => d.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
