import * as THREE from 'three';

export interface CubeStackOptions {
  size?: number;
  gap?: number;
  speed?: number;
}

export function createCubeStack(
  container: HTMLElement,
  options: CubeStackOptions = {},
): () => void {
  const { size = 0.52, gap = 0.06, speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
  camera.position.set(3.6, 3.0, 4.4);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.65));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(5, 7, 4);
  scene.add(key);
  const rim = new THREE.PointLight('#22d3ee', 30);
  rim.position.set(-4, -2, -4);
  scene.add(rim);

  const rand = (() => {
    let s = 987654 >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  })();

  const palette = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa'];
  const pitch = size + gap;
  const root = new THREE.Group();
  scene.add(root);

  const midLayer = new THREE.Group(); // animatable middle slice
  root.add(midLayer);

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const geo = new THREE.BoxGeometry(size, size, size);
        const mat = palette.map(
          (c) =>
            new THREE.MeshStandardMaterial({
              color: new THREE.Color(c),
              roughness: 0.35,
              metalness: 0.15,
            }),
        );
        mat.forEach((m) => (m.color.offsetHSL((rand() - 0.5) * 0.03, 0, (rand() - 0.5) * 0.06)));
        const cube = new THREE.Mesh(geo, mat);
        cube.position.set(x * pitch, y * pitch, z * pitch);
        if (y === 0) midLayer.add(cube);
        else root.add(cube);
      }
    }
  }

  // Inner glow core revealed by gaps
  const coreGeo = new THREE.SphereGeometry(pitch * 1.05, 24, 16);
  const coreMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#22d3ee'),
    transparent: true,
    opacity: 0.12,
  });
  root.add(new THREE.Mesh(coreGeo, coreMat));

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
    root.rotation.y = t * 0.35 * speed;
    root.rotation.x = Math.sin(t * 0.4 * speed) * 0.28;
    // Middle slice twists back and forth like a scramble move
    midLayer.rotation.y = Math.sin(t * 0.9 * speed) * 0.35;
    root.position.y = Math.sin(t * 1.1 * speed) * 0.07;
    coreMat.opacity = 0.08 + Math.abs(Math.sin(t * 2)) * 0.08;
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
