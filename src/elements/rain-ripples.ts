import * as THREE from 'three';

/** Rain Ripples — raindrops falling onto water, each blooming an expanding ring. */
export interface RainRipplesOptions {
  drops?: number;
  rippleColor?: string;
  rainColor?: string;
  speed?: number;
}

export function createRainRipples(
  container: HTMLElement,
  options: RainRipplesOptions = {},
): () => void {
  const { drops = 60, rippleColor = '#7dd3fc', rainColor = '#bae6fd', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 60);
  camera.position.set(0, 5.2, 9);
  camera.lookAt(0, 0, 0);

  const rippleGeo = new THREE.RingGeometry(0.9, 1, 48);
  rippleGeo.rotateX(-Math.PI / 2);
  const ripples: Array<{ mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; phase: number }> = [];
  const mats: THREE.Material[] = [rippleGeo];

  for (let i = 0; i < drops; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(rippleColor),
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(rippleGeo, mat);
    mesh.position.set((Math.random() - 0.5) * 16, 0, (Math.random() - 0.5) * 10);
    mesh.scale.setScalar(0.01);
    scene.add(mesh);
    ripples.push({ mesh, mat, phase: Math.random() });
    mats.push(mat);
  }

  // Falling streaks: thin boxes recycling top-to-bottom.
  const dropGeo = new THREE.BoxGeometry(0.02, 0.5, 0.02);
  const dropMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(rainColor), transparent: true, opacity: 0.55 });
  const drops3d: Array<{ mesh: THREE.Mesh; v: number }> = [];
  for (let i = 0; i < drops; i++) {
    const mesh = new THREE.Mesh(dropGeo, dropMat);
    mesh.position.set((Math.random() - 0.5) * 16, Math.random() * 10, (Math.random() - 0.5) * 10);
    scene.add(mesh);
    drops3d.push({ mesh, v: 7 + Math.random() * 5 });
  }
  mats.push(dropGeo, dropMat);

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
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.getElapsedTime() * speed;

    for (const d of drops3d) {
      d.mesh.position.y -= d.v * dt * speed;
      if (d.mesh.position.y <= 0) {
        d.mesh.position.y = 9 + Math.random() * 2;
        d.mesh.position.x = (Math.random() - 0.5) * 16;
        d.mesh.position.z = (Math.random() - 0.5) * 10;
      }
    }

    for (const r of ripples) {
      const phase = (t * 0.5 + r.phase) % 1;
      r.mesh.scale.setScalar(0.1 + phase * 2.4);
      r.mat.opacity = 0.55 * (1 - phase);
    }

    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    mats.forEach((m) => m.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
