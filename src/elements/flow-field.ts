import * as THREE from 'three';

export interface FlowFieldOptions {
  count?: number;
  colorA?: string;
  colorB?: string;
  speed?: number;
  noiseScale?: number;
}

function curl(x: number, y: number, t: number, scale: number): [number, number] {
  const n1 = Math.sin(x * scale + t) + Math.cos(y * scale - t * 0.7);
  const n2 = Math.cos(x * scale * 1.3 - t * 0.5) + Math.sin(y * scale * 0.8 + t);
  const angle = (n1 + n2) * Math.PI;
  return [Math.cos(angle), Math.sin(angle)];
}

export function createFlowField(
  container: HTMLElement,
  options: FlowFieldOptions = {},
): () => void {
  const {
    count = 1200,
    colorA = '#8b5cf6',
    colorB = '#22d3ee',
    speed = 1,
    noiseScale = 0.35,
  } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 6.5, 9);
  camera.lookAt(0, 0, 0);

  const particles: Array<{ x: number; z: number }> = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: (Math.random() - 0.5) * 16,
      z: (Math.random() - 0.5) * 16,
    });
  }

  const positions = new Float32Array(count * 6);
  const colors = new Float32Array(count * 6);
  const cA = new THREE.Color(colorA);
  const cB = new THREE.Color(colorB);

  for (let i = 0; i < count; i++) {
    const mixed = cA.clone().lerp(cB, Math.random());
    colors[i * 6] = mixed.r;
    colors[i * 6 + 1] = mixed.g;
    colors[i * 6 + 2] = mixed.b;
    colors[i * 6 + 3] = mixed.r;
    colors[i * 6 + 4] = mixed.g;
    colors[i * 6 + 5] = mixed.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  scene.add(new THREE.LineSegments(geometry, material));

  function respawn(p: { x: number; z: number }) {
    p.x = (Math.random() - 0.5) * 16;
    p.z = (Math.random() - 0.5) * 16;
  }

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
  let elapsed = 0;

  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    elapsed += dt;

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      const [dx, dz] = curl(p.x, p.z, elapsed * 0.3, noiseScale);
      const nx = p.x + dx * dt * speed * 2.4;
      const nz = p.z + dz * dt * speed * 2.4;

      positions[i * 6] = p.x;
      positions[i * 6 + 1] = 0.02;
      positions[i * 6 + 2] = p.z;
      positions[i * 6 + 3] = nx;
      positions[i * 6 + 4] = 0.02;
      positions[i * 6 + 5] = nz;

      p.x = nx;
      p.z = nz;
      if (Math.abs(p.x) > 8 || Math.abs(p.z) > 8) respawn(p);
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
