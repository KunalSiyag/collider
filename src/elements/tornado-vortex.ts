import * as THREE from 'three';

export interface TornadoVortexOptions {
  count?: number;
  accentColor?: string;
}

export function createTornadoVortex(
  container: HTMLElement,
  options: TornadoVortexOptions = {},
): () => void {
  const { count = 1600, accentColor = '#8b5cf6' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 80);
  camera.position.set(9, 4, 12);
  camera.lookAt(0, 3, 0);

  let seed = 54321;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  interface Debris {
    angle: number;
    y: number;
    speed: number;
    wobble: number;
  }
  const debris: Debris[] = [];
  for (let i = 0; i < count; i++) {
    debris.push({
      angle: rand() * Math.PI * 2,
      y: rand() * 14 - 6,
      speed: 1.2 + rand() * 2.4,
      wobble: rand() * Math.PI * 2,
    });
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: accentColor,
    size: 0.09,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const vortex = new THREE.Points(geometry, material);
  scene.add(vortex);

  const groundGeo = new THREE.CircleGeometry(16, 48);
  const groundMat = new THREE.MeshStandardMaterial({ color: '#15121f', roughness: 1 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -6.2;
  scene.add(ground);
  scene.add(new THREE.AmbientLight('#443c66', 1.4));

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
      const d = debris[i];
      const life = (d.y + 6) / 14;
      const radius = 0.4 + life * 4.5 + Math.sin(t + d.wobble) * 0.15;
      d.angle += dt * d.speed * (2.2 - life);
      attr.setXYZ(
        i,
        Math.cos(d.angle) * radius,
        d.y,
        Math.sin(d.angle) * radius,
      );
    }
    attr.needsUpdate = true;
    scene.rotation.y = t * 0.05;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    geometry.dispose();
    material.dispose();
    groundGeo.dispose();
    groundMat.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
