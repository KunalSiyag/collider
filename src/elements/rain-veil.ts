import * as THREE from 'three';

export interface RainVeilOptions {
  count?: number;
  speed?: number;
  accentColor?: string;
}

export function createRainVeil(
  container: HTMLElement,
  options: RainVeilOptions = {},
): () => void {
  const { count = 900, speed = 1, accentColor = '#8b5cf6' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#0b0b10', 6, 30);
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 50);
  camera.position.set(0, 1, 10);

  let seed = 101010;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (rand() - 0.5) * 22;
    positions[i * 3 + 1] = rand() * 14 - 6;
    positions[i * 3 + 2] = (rand() - 0.5) * 12;
    velocities[i] = (9 + rand() * 6) * speed;
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: accentColor,
    size: 0.09,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const rain = new THREE.Points(geometry, material);
  rain.rotation.z = 0.08;
  scene.add(rain);

  const glowGeo = new THREE.PlaneGeometry(26, 12);
  const glowMat = new THREE.MeshBasicMaterial({
    color: accentColor,
    transparent: true,
    opacity: 0.04,
    depthWrite: false,
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  glow.position.z = -6;
  scene.add(glow);

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
      let y = attr.getY(i) - velocities[i] * dt;
      if (y < -7) y = 7;
      attr.setY(i, y);
    }
    attr.needsUpdate = true;
    glowMat.opacity = 0.03 + Math.abs(Math.sin(t * 0.4)) * 0.03;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    geometry.dispose();
    material.dispose();
    glowGeo.dispose();
    glowMat.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
