import * as THREE from 'three';

export interface DotTerrainOptions {
  grid?: number;
  color?: string;
  accentColor?: string;
  speed?: number;
  amplitude?: number;
}

export function createDotTerrain(
  container: HTMLElement,
  options: DotTerrainOptions = {},
): () => void {
  const {
    grid = 60,
    color = '#52525b',
    accentColor = '#22d3ee',
    speed = 1,
    amplitude = 0.8,
  } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(7, 7.5, 9);
  camera.lookAt(0, 0, 0);

  const count = grid * grid;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const baseColor = new THREE.Color(color);
  const peakColor = new THREE.Color(accentColor);

  let i = 0;
  const spacing = 14 / (grid - 1);
  for (let x = 0; x < grid; x++) {
    for (let z = 0; z < grid; z++) {
      positions[i * 3] = x * spacing - 7;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = z * spacing - 7;
      colors[i * 3] = baseColor.r;
      colors[i * 3 + 1] = baseColor.g;
      colors[i * 3 + 2] = baseColor.b;
      i++;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.07,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
  });

  scene.add(new THREE.Points(geometry, material));

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

    for (let v = 0; v < count; v++) {
      const x = positions[v * 3];
      const z = positions[v * 3 + 2];
      const wave =
        Math.sin(x * 0.6 + t * speed) * 0.5 +
        Math.cos(z * 0.5 - t * speed * 0.8) * 0.35 +
        Math.sin((x + z) * 0.35 + t * speed * 1.2) * 0.15;
      positions[v * 3 + 1] = wave * amplitude;

      const intensity = Math.max(0, wave);
      colors[v * 3] = baseColor.r + (peakColor.r - baseColor.r) * intensity;
      colors[v * 3 + 1] = baseColor.g + (peakColor.g - baseColor.g) * intensity;
      colors[v * 3 + 2] = baseColor.b + (peakColor.b - baseColor.b) * intensity;
    }
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
