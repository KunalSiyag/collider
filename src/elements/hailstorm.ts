import * as THREE from 'three';

export interface HailstormOptions {
  count?: number;
  speed?: number;
}

export function createHailstorm(
  container: HTMLElement,
  options: HailstormOptions = {},
): () => void {
  const { count = 320, speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 60);
  camera.position.set(0, 0, 14);

  let seed = 1122334;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const geoCache = [
    new THREE.IcosahedronGeometry(0.16, 0),
    new THREE.DodecahedronGeometry(0.14, 0),
  ];
  const material = new THREE.MeshStandardMaterial({
    color: '#cfe8ff',
    roughness: 0.25,
    metalness: 0.05,
    flatShading: true,
    transparent: true,
    opacity: 0.9,
  });
  const instanced = new THREE.InstancedMesh(geoCache[0], material, count);
  interface Stone {
    x: number;
    y: number;
    z: number;
    vy: number;
    spin: number;
    scale: number;
    rot: THREE.Euler;
  }
  const stones: Stone[] = [];
  for (let i = 0; i < count; i++) {
    stones.push({
      x: (rand() - 0.5) * 20,
      y: rand() * 18 - 8,
      z: (rand() - 0.5) * 10,
      vy: -(5 + rand() * 5) * speed,
      spin: (rand() - 0.5) * 6,
      scale: 0.5 + rand() * 1.1,
      rot: new THREE.Euler(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI),
    });
  }

  const flash = new THREE.PointLight('#bcd8ff', 0, 40);
  flash.position.set(-5, 6, 4);
  scene.add(new THREE.AmbientLight('#3a4460', 1.8), new THREE.DirectionalLight('#8899cc', 1.2), flash);

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
  const dummy = new THREE.Object3D();
  function tick() {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const s = stones[i];
      s.y += s.vy * dt;
      s.rot.x += s.spin * dt;
      s.rot.z += s.spin * 0.6 * dt;
      if (s.y < -9) {
        s.y = 9;
        s.x = (rand() - 0.5) * 20;
      }
      dummy.position.set(s.x, s.y, s.z);
      dummy.rotation.copy(s.rot);
      dummy.scale.setScalar(s.scale);
      dummy.updateMatrix();
      instanced.setMatrixAt(i, dummy.matrix);
    }
    instanced.instanceMatrix.needsUpdate = true;
    flash.intensity = Math.max(0, Math.sin(t * 0.7) - 0.92) * 260;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    for (const geo of geoCache) geo.dispose();
    material.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
