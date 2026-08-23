import * as THREE from 'three';

export interface GalaxySpiralOptions {
  count?: number;
  radius?: number;
  arms?: number;
  spin?: number;
  randomness?: number;
  colorInside?: string;
  colorOutside?: string;
}

export function createGalaxySpiral(
  container: HTMLElement,
  options: GalaxySpiralOptions = {},
): () => void {
  const {
    count = 12000,
    radius = 5,
    arms = 3,
    spin = 1.2,
    randomness = 0.35,
    colorInside = '#fb7185',
    colorOutside = '#22d3ee',
  } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(3.4, 2.6, 4.6);
  camera.lookAt(0, 0, 0);

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const inside = new THREE.Color(colorInside);
  const outside = new THREE.Color(colorOutside);

  for (let i = 0; i < count; i++) {
    const r = Math.random() * radius;
    const branchAngle = ((i % arms) / arms) * Math.PI * 2;
    const spinAngle = r * spin;
    const rx = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
    const ry = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * randomness * r * 0.5;
    const rz = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;

    positions[i * 3] = Math.cos(branchAngle + spinAngle) * r + rx;
    positions[i * 3 + 1] = ry;
    positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * r + rz;

    const mixed = inside.clone().lerp(outside, r / radius);
    colors[i * 3] = mixed.r;
    colors[i * 3 + 1] = mixed.g;
    colors[i * 3 + 2] = mixed.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const spriteCanvas = document.createElement('canvas');
  spriteCanvas.width = 64;
  spriteCanvas.height = 64;
  const ctx = spriteCanvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.4, 'rgba(255,255,255,0.4)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const material = new THREE.PointsMaterial({
    size: 0.03,
    map: new THREE.CanvasTexture(spriteCanvas),
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

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
    points.rotation.y = clock.getElapsedTime() * 0.12;
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
