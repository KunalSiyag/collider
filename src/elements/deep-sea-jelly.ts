import * as THREE from 'three';

export interface DeepSeaJellyOptions {
  count?: number;
  accentColor?: string;
}

function makeJelly(color: THREE.Color, rand: () => number) {
  const group = new THREE.Group();
  const bellGeo = new THREE.SphereGeometry(0.5, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.6);
  const bellMat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.35,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const bell = new THREE.Mesh(bellGeo, bellMat);
  group.add(bell);

  const tentacleMat = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
  });
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const points: THREE.Vector3[] = [];
    let x = Math.cos(angle) * 0.3;
    let z = Math.sin(angle) * 0.3;
    for (let j = 0; j < 10; j++) {
      points.push(new THREE.Vector3(x, -j * 0.16, z));
      x += (rand() - 0.5) * 0.08;
      z += (rand() - 0.5) * 0.08;
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    group.add(new THREE.Line(geo, tentacleMat.clone()));
  }
  return { group, bell, bellMat, tentacles: group.children.slice(1) as THREE.Line[] };
}

export function createDeepSeaJelly(
  container: HTMLElement,
  options: DeepSeaJellyOptions = {},
): () => void {
  const { count = 9 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#030a12', 8, 26);
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 50);
  camera.position.set(0, 0, 11);

  let seed = 999000;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Jelly {
    parts: ReturnType<typeof makeJelly>;
    speed: number;
    phase: number;
  }
  const jellies: Jelly[] = [];
  const colors = [new THREE.Color('#a78bfa'), new THREE.Color('#22d3ee'), new THREE.Color('#f472b6')];
  for (let i = 0; i < count; i++) {
    const parts = makeJelly(colors[i % colors.length], rand);
    parts.group.position.set((rand() - 0.5) * 16, (rand() - 0.5) * 9, (rand() - 0.5) * 6);
    parts.group.scale.setScalar(0.6 + rand() * 1.1);
    scene.add(parts.group);
    jellies.push({ parts, speed: 0.3 + rand() * 0.5, phase: rand() * Math.PI * 2 });
  }

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
    for (const jelly of jellies) {
      const pulse = 1 + Math.sin(t * jelly.speed * 2 + jelly.phase) * 0.09;
      jelly.parts.bell.scale.set(pulse, 2 - pulse, pulse);
      jelly.parts.group.position.y += Math.sin(t * jelly.speed + jelly.phase) * 0.004;
      if (jelly.parts.group.position.y > 6) jelly.parts.group.position.y = -6;
      jelly.parts.group.rotation.z = Math.sin(t * 0.3 + jelly.phase) * 0.15;
    }
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    for (const jelly of jellies) {
      jelly.parts.bell.geometry.dispose();
      jelly.parts.bellMat.dispose();
      for (const line of jelly.parts.tentacles) {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      }
    }
    renderer.dispose();
    renderer.domElement.remove();
  };
}
