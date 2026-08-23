import * as THREE from 'three';

export interface OrbitGardenOptions {
  count?: number;
  colors?: string[];
}

export function createOrbitGarden(
  container: HTMLElement,
  options: OrbitGardenOptions = {},
): () => void {
  const { count = 9, colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa'] } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 60);
  camera.position.set(4, 5, 12);
  camera.lookAt(0, 0, 0);

  let seed = 40404;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const coreGeo = new THREE.SphereGeometry(0.55, 32, 32);
  const coreMat = new THREE.MeshBasicMaterial({ color: '#fff7ed' });
  scene.add(new THREE.Mesh(coreGeo, coreMat));

  interface Planet {
    pivot: THREE.Group;
    mesh: THREE.Mesh;
    ring: THREE.Mesh;
    rate: number;
    spin: number;
    tiltPhase: number;
  }
  const planets: Planet[] = [];
  for (let i = 0; i < count; i++) {
    const orbitRadius = 1.6 + i * 0.85;
    const color = colors[i % colors.length];
    const ringGeo = new THREE.RingGeometry(orbitRadius - 0.02, orbitRadius + 0.02, 96);
    const ringMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2 - 0.18;
    scene.add(ring);

    const pivot = new THREE.Group();
    const size = 0.14 + rand() * 0.3;
    const geo = new THREE.SphereGeometry(size, 24, 24);
    const mat = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.35,
      roughness: 0.4,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.x = orbitRadius;
    pivot.add(mesh);
    scene.add(pivot);
    planets.push({
      pivot,
      mesh,
      ring,
      rate: (0.5 + rand() * 0.8) * (i % 2 === 0 ? 1 : -1),
      spin: 1 + rand() * 2,
      tiltPhase: rand() * Math.PI * 2,
    });
  }

  scene.add(new THREE.AmbientLight('#443c66', 1.4));
  const sunLight = new THREE.PointLight('#ffffff', 80, 30);
  scene.add(sunLight);

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
    const t = clock.getElapsedTime();
    for (const planet of planets) {
      planet.pivot.rotation.y = t * planet.rate * 0.4;
      planet.pivot.rotation.x = Math.sin(t * 0.3 + planet.tiltPhase) * 0.15;
      planet.mesh.rotation.z += 0.01 * planet.spin;
      planet.ring.rotation.z = t * 0.05;
    }
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    coreGeo.dispose();
    coreMat.dispose();
    for (const planet of planets) {
      planet.mesh.geometry.dispose();
      (planet.mesh.material as THREE.Material).dispose();
      planet.ring.geometry.dispose();
      (planet.ring.material as THREE.Material).dispose();
    }
    renderer.dispose();
    renderer.domElement.remove();
  };
}
