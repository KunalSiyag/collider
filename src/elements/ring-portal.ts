import * as THREE from 'three';

export interface RingPortalOptions {
  color?: string;
  particleColor?: string;
  particles?: number;
  speed?: number;
}

export function createRingPortal(
  container: HTMLElement,
  options: RingPortalOptions = {},
): () => void {
  const {
    color = '#8b5cf6',
    particleColor = '#22d3ee',
    particles = 600,
    speed = 1,
  } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0.4, 7);
  camera.lookAt(0, 0, 0);

  const ringGeometry = new THREE.TorusGeometry(1.8, 0.075, 24, 128);
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  scene.add(ring);

  const glowGeometry = new THREE.RingGeometry(1.55, 1.75, 96);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0.25,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  scene.add(new THREE.Mesh(glowGeometry, glowMaterial));

  const positions = new Float32Array(particles * 3);
  const seeds = new Float32Array(particles * 2);

  for (let i = 0; i < particles; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = -Math.random() * 12;
    seeds[i * 2] = Math.random();
    seeds[i * 2 + 1] = Math.random() * Math.PI * 2;
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMaterial = new THREE.PointsMaterial({
    color: new THREE.Color(particleColor),
    size: 0.05,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  scene.add(new THREE.Points(particleGeometry, particleMaterial));

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
    const t = clock.getElapsedTime() * speed;

    for (let i = 0; i < particles; i++) {
      const progress = ((t * 0.22 + seeds[i * 2]) % 1 + 1) % 1;
      const angle = seeds[i * 2 + 1] + progress * 6;
      const radius = (1 - progress) * 6;
      positions[i * 3] = Math.cos(angle) * radius * 1.4;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.85;
      positions[i * 3 + 2] = -progress * 4;
    }
    particleGeometry.attributes.position.needsUpdate = true;

    ring.rotation.z = t * 0.15;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    ringGeometry.dispose();
    ringMaterial.dispose();
    glowGeometry.dispose();
    glowMaterial.dispose();
    particleGeometry.dispose();
    particleMaterial.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
