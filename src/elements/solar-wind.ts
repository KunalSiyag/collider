import * as THREE from 'three';

export interface SolarWindOptions {
  count?: number;
  accentColor?: string;
}

export function createSolarWind(container: HTMLElement, options: SolarWindOptions = {}): () => void {
  const { count = 800, accentColor = '#22d3ee' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 80);
  camera.position.set(0, 0, 14);

  let seed = 1958;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const sunCanvas = document.createElement('canvas');
  sunCanvas.width = 128;
  sunCanvas.height = 128;
  const sctx = sunCanvas.getContext('2d')!;
  const gradient = sctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, '#fff3c4');
  gradient.addColorStop(0.3, '#fbbf24aa');
  gradient.addColorStop(1, '#00000000');
  sctx.fillStyle = gradient;
  sctx.fillRect(0, 0, 128, 128);
  const sunTexture = new THREE.CanvasTexture(sunCanvas);
  const sun = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: sunTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  sun.position.x = -16;
  sun.scale.setScalar(12);
  scene.add(sun);

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = -14 + rand() * 34;
    positions[i * 3 + 1] = (rand() - 0.5) * 16;
    positions[i * 3 + 2] = (rand() - 0.5) * 10;
    speeds[i] = 3.5 + rand() * 6;
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const tailGeo = new THREE.BufferGeometry();
  const tails = count;
  const tailPositions = new Float32Array(tails * 3);
  tailPositions.forEach((_, i) => (tailPositions[i] = positions[i]));
  tailGeo.setAttribute('position', new THREE.BufferAttribute(tailPositions, 3));
  void tails;

  const material = new THREE.PointsMaterial({
    color: accentColor,
    size: 0.07,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  scene.add(new THREE.Points(geometry, material));

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
    const t = clock.getElapsedTime();
    const attr = geometry.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      let x = attr.getX(i) + speeds[i] * dt;
      let y = attr.getY(i) + Math.sin(x * 0.4 + t) * dt * 0.5;
      if (x > 20) {
        x = -15;
        y = (rand() - 0.5) * 16;
      }
      attr.setX(i, x);
      attr.setY(i, y);
    }
    attr.needsUpdate = true;
    sun.scale.setScalar(11.5 + Math.sin(t * 1.1) * 0.7);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    geometry.dispose();
    material.dispose();
    sunTexture.dispose();
    sun.material.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
