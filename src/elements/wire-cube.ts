import * as THREE from 'three';

export interface WireCubeOptions {
  color?: string;
  accentColor?: string;
  size?: number;
  speed?: number;
}

export function createWireCube(
  container: HTMLElement,
  options: WireCubeOptions = {},
): () => void {
  const { color = '#fafafa', accentColor = '#8b5cf6', size = 1, speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
  camera.position.set(2.4 * size, 2 * size, 3.4 * size);
  camera.lookAt(0, 0, 0);

  function makeCube(radius: number, lineColor: string): THREE.LineSegments {
    const geometry = new THREE.BoxGeometry(radius, radius, radius);
    const edges = new THREE.EdgesGeometry(geometry);
    geometry.dispose();
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color(lineColor),
      transparent: true,
      opacity: 0.95,
    });
    return new THREE.LineSegments(edges, material);
  }

  const outer = makeCube(1.6 * size, color);
  const inner = makeCube(0.9 * size, accentColor);
  scene.add(outer, inner);

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
  const clock = new THREE.Clock();

  function tick() {
    raf = requestAnimationFrame(tick);
    const t = clock.getElapsedTime();

    outer.rotation.x = t * 0.5 * speed;
    outer.rotation.y = t * 0.7 * speed;

    inner.rotation.x = -t * 0.9 * speed;
    inner.rotation.z = t * 0.6 * speed;

    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    outer.geometry.dispose();
    inner.geometry.dispose();
    (outer.material as THREE.Material).dispose();
    (inner.material as THREE.Material).dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
