import * as THREE from 'three';

export interface StarHyperspaceOptions {
  count?: number;
  speed?: number;
  color?: string;
  streakLength?: number;
}

export function createStarHyperspace(
  container: HTMLElement,
  options: StarHyperspaceOptions = {},
): () => void {
  const { count = 900, speed = 1, color = '#ffffff', streakLength = 2.4 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(70, 1, 0.05, 100);
  camera.position.z = 0;

  const positions = new Float32Array(count * 6);
  const stars = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    stars[i * 3] = (Math.random() - 0.5) * 24;
    stars[i * 3 + 1] = (Math.random() - 0.5) * 24;
    stars[i * 3 + 2] = -Math.random() * 60;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.LineBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  scene.add(new THREE.LineSegments(geometry, material));

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width === 0 || height === 0) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  let raf = 0;
  let last = performance.now();

  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const velocity = 10 * speed;

    for (let i = 0; i < count; i++) {
      let z = stars[i * 3 + 2] + velocity * dt;
      if (z > 1) {
        stars[i * 3] = (Math.random() - 0.5) * 24;
        stars[i * 3 + 1] = (Math.random() - 0.5) * 24;
        z = -60;
      }
      stars[i * 3 + 2] = z;

      positions[i * 6] = stars[i * 3];
      positions[i * 6 + 1] = stars[i * 3 + 1];
      positions[i * 6 + 2] = z;
      positions[i * 6 + 3] = stars[i * 3];
      positions[i * 6 + 4] = stars[i * 3 + 1];
      positions[i * 6 + 5] = z - streakLength;
    }
    geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
