import * as THREE from 'three';

export interface ParticleFieldOptions {
  count?: number;
  colorA?: string;
  colorB?: string;
  size?: number;
  speed?: number;
  parallax?: number;
}

function createSpriteTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.35, 'rgba(255,255,255,0.55)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

export function createParticleField(
  container: HTMLElement,
  options: ParticleFieldOptions = {},
): () => void {
  const {
    count = 2500,
    colorA = '#8b5cf6',
    colorB = '#22d3ee',
    size = 0.06,
    speed = 0.35,
    parallax = 1.2,
  } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.z = 8;

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const drift = new Float32Array(count);
  const colorStart = new THREE.Color(colorA);
  const colorEnd = new THREE.Color(colorB);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 26;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
    const mixed = colorStart.clone().lerp(colorEnd, Math.random());
    colors[i * 3] = mixed.r;
    colors[i * 3 + 1] = mixed.g;
    colors[i * 3 + 2] = mixed.b;
    drift[i] = Math.random() * Math.PI * 2;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size,
    map: createSpriteTexture(),
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    opacity: 0.85,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  const mouse = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };

  function onPointerMove(event: PointerEvent) {
    const rect = container.getBoundingClientRect();
    target.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    target.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
  }

  window.addEventListener('pointermove', onPointerMove);

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
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;

    mouse.x += (target.x - mouse.x) * 0.04;
    mouse.y += (target.y - mouse.y) * 0.04;

    camera.position.x = mouse.x * parallax;
    camera.position.y = -mouse.y * parallax;
    camera.lookAt(0, 0, 0);

    const pos = geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      pos.array[i * 3 + 1] += Math.sin(t * speed + drift[i]) * 0.0015 + dt * 0.08;
      if (pos.array[i * 3 + 1] > 8) pos.array[i * 3 + 1] = -8;
    }
    pos.needsUpdate = true;

    points.rotation.y += dt * 0.02;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    window.removeEventListener('pointermove', onPointerMove);
    geometry.dispose();
    material.map?.dispose();
    material.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
