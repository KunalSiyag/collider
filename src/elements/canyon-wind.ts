import * as THREE from 'three';

export interface CanyonWindOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createCanyonWind(
  container: HTMLElement,
  options: CanyonWindOptions = {},
): () => void {
  const { color = '#3f3a56', accentColor = '#8b5cf6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#0b0b10', 8, 42);
  const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 100);
  camera.position.set(0, 1.2, 0);

  let seed = 424242;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const walls = new THREE.Group();
  const wallMaterial = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.95,
    flatShading: true,
  });
  for (let z = -60; z < 8; z += 2.2) {
    for (const side of [-1, 1]) {
      const h = 3 + rand() * 9;
      const w = 1.4 + rand() * 1.6;
      const geometry = new THREE.BoxGeometry(w, h, 2.2);
      const wall = new THREE.Mesh(geometry, wallMaterial.clone());
      wall.position.set(side * (4.5 + rand() * 2.5), h / 2 - 1.5, z);
      wall.rotation.z = (rand() - 0.5) * 0.15;
      walls.add(wall);
    }
  }
  scene.add(walls);
  scene.add(new THREE.AmbientLight('#554d7a', 1.6));
  const glowLight = new THREE.PointLight(accentColor, 40, 30);
  scene.add(glowLight);

  const dustCount = 500;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (rand() - 0.5) * 14;
    dustPos[i * 3 + 1] = rand() * 6 - 1;
    dustPos[i * 3 + 2] = -rand() * 60;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({
      color: accentColor,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  scene.add(dust);

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
    camera.position.z -= dt * speed * 4;
    if (camera.position.z < -52) camera.position.z = 0;
    camera.position.x = Math.sin(t * 0.4) * 1.1;
    glowLight.position.set(camera.position.x, 1.5, camera.position.z - 6);
    const pos = dustGeo.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < dustCount; i++) {
      let z = pos.getZ(i) + dt * speed * 7;
      if (z > 4) z = -60;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    for (const child of walls.children as THREE.Mesh[]) {
      child.geometry.dispose();
      (child.material as THREE.Material).dispose();
    }
    dustGeo.dispose();
    dust.material.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
