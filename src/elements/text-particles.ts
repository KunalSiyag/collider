import * as THREE from 'three';

export interface TextParticlesOptions {
  text?: string;
  color?: string;
  density?: number;
  size?: number;
  waveAmplitude?: number;
  waveSpeed?: number;
}

export function createTextParticles(
  container: HTMLElement,
  options: TextParticlesOptions = {},
): () => void {
  const {
    text = 'COLLIDER',
    color = '#a78bfa',
    density = 4,
    size = 0.035,
    waveAmplitude = 0.12,
    waveSpeed = 1.4,
  } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 10;

  const sampleCanvas = document.createElement('canvas');
  const ctx = sampleCanvas.getContext('2d', { willReadFrequently: true })!;
  sampleCanvas.width = 1024;
  sampleCanvas.height = 256;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, sampleCanvas.width, sampleCanvas.height);
  ctx.font = '900 180px Inter, Arial, sans-serif';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, sampleCanvas.width / 2, sampleCanvas.height / 2);

  const imageData = ctx.getImageData(0, 0, sampleCanvas.width, sampleCanvas.height).data;
  const sampled: Array<[number, number]> = [];
  for (let y = 0; y < sampleCanvas.height; y += density) {
    for (let x = 0; x < sampleCanvas.width; x += density) {
      if (imageData[(y * sampleCanvas.width + x) * 4] > 128) {
        sampled.push([x, y]);
      }
    }
  }

  const count = sampled.length;
  const positions = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const worldScale = 12 / sampleCanvas.width;

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (sampled[i][0] - sampleCanvas.width / 2) * worldScale;
    positions[i * 3 + 1] = -(sampled[i][1] - sampleCanvas.height / 2) * worldScale;
    positions[i * 3 + 2] = 0;
    phases[i] = Math.random() * Math.PI * 2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const spriteCanvas = document.createElement('canvas');
  spriteCanvas.width = 64;
  spriteCanvas.height = 64;
  const spriteCtx = spriteCanvas.getContext('2d')!;
  const gradient = spriteCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.4, 'rgba(255,255,255,0.4)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  spriteCtx.fillStyle = gradient;
  spriteCtx.fillRect(0, 0, 64, 64);

  const material = new THREE.PointsMaterial({
    size,
    map: new THREE.CanvasTexture(spriteCanvas),
    color: new THREE.Color(color),
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
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

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 2] =
        Math.sin(t * waveSpeed + phases[i]) * waveAmplitude +
        Math.cos(t * waveSpeed * 0.7 + positions[i * 3] * 0.5) * waveAmplitude * 0.5;
    }
    geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    geometry.dispose();
    material.map?.dispose();
    material.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
