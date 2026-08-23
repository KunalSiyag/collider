import * as THREE from 'three';

export interface KelpForestOptions {
  count?: number;
  accentColor?: string;
}

export function createKelpForest(
  container: HTMLElement,
  options: KelpForestOptions = {},
): () => void {
  const { count = 26, accentColor = '#22d3ee' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#04121c', 4, 30);
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 50);
  camera.position.set(0, 0, 12);

  let seed = 20260823;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Kelp {
    mesh: THREE.Mesh;
    segments: THREE.Mesh[];
    phase: number;
    height: number;
  }
  const kelps: Kelp[] = [];
  const segGeometry = new THREE.SphereGeometry(0.16, 8, 8);
  for (let i = 0; i < count; i++) {
    const x = (rand() - 0.5) * 18;
    const z = (rand() - 0.5) * 10 - 2;
    const height = Math.floor(6 + rand() * 10);
    const segments: THREE.Mesh[] = [];
    const hueShift = rand() * 40;
    for (let j = 0; j < height; j++) {
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL((0.42 + hueShift / 360) % 1, 0.55, 0.28 + j / height * 0.15),
        roughness: 0.7,
      });
      const mesh = new THREE.Mesh(segGeometry, material);
      mesh.scale.set(1, 1.5, 1).multiplyScalar(1 - j / height * 0.45);
      scene.add(mesh);
      segments.push(mesh);
    }
    kelps.push({ mesh: segments[0], segments, phase: rand() * Math.PI * 2, height });
  }

  const bubblesGeo = new THREE.BufferGeometry();
  const bubbleCount = 160;
  const bubblePos = new Float32Array(bubbleCount * 3);
  for (let i = 0; i < bubbleCount; i++) {
    bubblePos[i * 3] = (rand() - 0.5) * 18;
    bubblePos[i * 3 + 1] = rand() * 14 - 7;
    bubblePos[i * 3 + 2] = (rand() - 0.5) * 8;
  }
  bubblesGeo.setAttribute('position', new THREE.BufferAttribute(bubblePos, 3));
  const bubbles = new THREE.Points(
    bubblesGeo,
    new THREE.PointsMaterial({ color: accentColor, size: 0.08, transparent: true, opacity: 0.6 }),
  );
  scene.add(bubbles);
  scene.add(new THREE.AmbientLight('#123a4a', 2.4));
  const shaftLight = new THREE.DirectionalLight('#9fd8e8', 1.4);
  shaftLight.position.set(4, 10, 2);
  scene.add(shaftLight);

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
    for (const kelp of kelps) {
      for (let j = 0; j < kelp.height; j++) {
        const sway = Math.sin(t * 0.9 + kelp.phase + j * 0.35) * 0.09 * j;
        kelp.segments[j].position.set(
          kelp.segments[0].position.x + sway,
          -7 + j * 1.05,
          kelp.segments[0].position.z + sway * 0.4,
        );
      }
    }
    const attr = bubblesGeo.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < bubbleCount; i++) {
      let y = attr.getY(i) + dt * 1.2;
      if (y > 8) y = -8;
      attr.setY(i, y);
    }
    attr.needsUpdate = true;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    segGeometry.dispose();
    bubblesGeo.dispose();
    bubbles.material.dispose();
    for (const kelp of kelps) for (const s of kelp.segments) (s.material as THREE.Material).dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
