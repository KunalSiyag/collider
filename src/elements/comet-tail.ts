import * as THREE from 'three';

export interface CometTailOptions {
  count?: number;
  colors?: string[];
  speed?: number;
}

interface Comet {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  life: number;
  maxLife: number;
}

export function createCometTail(
  container: HTMLElement,
  options: CometTailOptions = {},
): () => void {
  const { count = 7, colors = ['#22d3ee', '#a78bfa', '#f472b6'], speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 0, 14);

  let seed = 8675309;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const comets: Comet[] = [];
  const trails: THREE.Line[] = [];
  const trailPoints = 60;
  for (let i = 0; i < count; i++) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(trailPoints * 3), 3),
    );
    const color = colors[i % colors.length];
    const material = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const line = new THREE.Line(geometry, material);
    scene.add(line);
    trails.push(line);
    comets.push(spawn());
  }

  function spawn(): Comet {
    return {
      pos: new THREE.Vector3(-18 - rand() * 8, (rand() - 0.5) * 14, (rand() - 0.5) * 8),
      vel: new THREE.Vector3(7 + rand() * 6, -(1 + rand() * 2), (rand() - 0.5)).multiplyScalar(speed),
      life: 0,
      maxLife: 3 + rand() * 3,
    };
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
    const dt = Math.min(clock.getDelta(), 0.05);
    for (let i = 0; i < count; i++) {
      const comet = comets[i];
      comet.pos.addScaledVector(comet.vel, dt);
      comet.life += dt;
      if (comet.life > comet.maxLife || comet.pos.x > 20) {
        comets[i] = spawn();
        continue;
      }
      const attr = trails[i].geometry.getAttribute('position') as THREE.BufferAttribute;
      for (let j = trailPoints - 1; j > 0; j--) {
        attr.setXYZ(j, attr.getX(j - 1), attr.getY(j - 1), attr.getZ(j - 1));
      }
      attr.setXYZ(0, comet.pos.x, comet.pos.y, comet.pos.z);
      attr.needsUpdate = true;
    }
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    for (const line of trails) {
      line.geometry.dispose();
      (line.material as THREE.Material).dispose();
    }
    renderer.dispose();
    renderer.domElement.remove();
  };
}
