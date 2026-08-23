import * as THREE from 'three';

export interface FireflySwarmOptions {
  count?: number;
  color?: string;
  bounds?: number;
}

export function createFireflySwarm(
  container: HTMLElement,
  options: FireflySwarmOptions = {},
): () => void {
  const { count = 140, color = '#a3e635', bounds = 9 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 60);
  camera.position.set(0, 0, 14);

  let seed = 777333;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Fly {
    pos: THREE.Vector3;
    target: THREE.Vector3;
    vel: THREE.Vector3;
    phase: number;
    blinkRate: number;
  }
  const flies: Fly[] = [];
  for (let i = 0; i < count; i++) {
    flies.push({
      pos: new THREE.Vector3((rand() - 0.5) * bounds * 2, (rand() - 0.5) * bounds, (rand() - 0.5) * 6),
      target: new THREE.Vector3(),
      vel: new THREE.Vector3(),
      phase: rand() * Math.PI * 2,
      blinkRate: 0.6 + rand() * 1.8,
    });
    pickTarget(flies[i]);
  }

  function pickTarget(fly: Fly) {
    fly.target.set((rand() - 0.5) * bounds * 2, (rand() - 0.5) * bounds, (rand() - 0.5) * 6);
  }

  const dot = document.createElement('canvas');
  dot.width = 64;
  dot.height = 64;
  const dctx = dot.getContext('2d')!;
  const g = dctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, '#ffffff');
  g.addColorStop(0.25, color);
  g.addColorStop(1, '#00000000');
  dctx.fillStyle = g;
  dctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(dot);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  const material = new THREE.PointsMaterial({
    map: texture,
    size: 0.65,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

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
      const fly = flies[i];
      const steer = fly.target.clone().sub(fly.pos);
      if (steer.length() < 0.5) pickTarget(fly);
      steer.normalize().multiplyScalar(dt * 1.6);
      fly.vel.lerp(steer, 0.08);
      fly.pos.addScaledVector(fly.vel, 60 * dt * 0.05);
      fly.pos.y += Math.sin(t * 1.3 + fly.phase) * dt * 0.4;
      attr.setXYZ(i, fly.pos.x, fly.pos.y, fly.pos.z);
    }
    attr.needsUpdate = true;
    material.opacity = 0.55 + Math.sin(t * 2.4) * 0.25;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    geometry.dispose();
    material.dispose();
    texture.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
