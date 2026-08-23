import * as THREE from 'three';

export interface CosmicWebOptions {
  nodes?: number;
  accentColor?: string;
}

export function createCosmicWeb(
  container: HTMLElement,
  options: CosmicWebOptions = {},
): () => void {
  const { nodes = 90, accentColor = '#8b5cf6' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.set(0, 0, 14);

  let seed = 1337421;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const points: THREE.Vector3[] = [];
  for (let i = 0; i < nodes; i++) {
    points.push(new THREE.Vector3((rand() - 0.5) * 22, (rand() - 0.5) * 14, (rand() - 0.5) * 12));
  }

  const nodeGeo = new THREE.BufferGeometry().setFromPoints(points);
  const nodeMat = new THREE.PointsMaterial({
    color: '#e0e7ff',
    size: 0.14,
    transparent: true,
    opacity: 0.95,
  });
  const nodeCloud = new THREE.Points(nodeGeo, nodeMat);
  scene.add(nodeCloud);

  const lineMat = new THREE.LineBasicMaterial({
    color: accentColor,
    transparent: true,
    opacity: 0.28,
    blending: THREE.AdditiveBlending,
  });
  const filaments = new THREE.Group();
  for (let i = 0; i < nodes; i++) {
    let links = 0;
    for (let j = i + 1; j < nodes && links < 3; j++) {
      if (points[i].distanceTo(points[j]) < 4.2) {
        const geo = new THREE.BufferGeometry().setFromPoints([points[i], points[j]]);
        filaments.add(new THREE.Line(geo, lineMat.clone()));
        links++;
      }
    }
  }
  scene.add(filaments);

  const pulseGeo = new THREE.SphereGeometry(0.06, 8, 8);
  const pulses: { mesh: THREE.Mesh; a: number; b: number; t: number; rate: number }[] = [];
  const children = filaments.children as THREE.Line[];
  const pairs: { a: THREE.Vector3; b: THREE.Vector3 }[] = [];
  for (let i = 0; i < nodes; i++) {
    let links = 0;
    for (let j = i + 1; j < nodes && links < 3; j++) {
      if (points[i].distanceTo(points[j]) < 4.2) {
        pairs.push({ a: points[i], b: points[j] });
        links++;
      }
    }
  }
  for (let i = 0; i < Math.min(40, pairs.length); i++) {
    const mesh = new THREE.Mesh(
      pulseGeo,
      new THREE.MeshBasicMaterial({ color: '#22d3ee', transparent: true }),
    );
    scene.add(mesh);
    pulses.push({
      mesh,
      a: points.indexOf(pairs[i].a),
      b: points.indexOf(pairs[i].b),
      t: rand(),
      rate: 0.3 + rand() * 0.6,
    });
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
    const t = clock.getElapsedTime();
    scene.rotation.y = t * 0.05;
    for (const p of pulses) {
      p.t += dt * p.rate;
      if (p.t > 1) p.t -= 1;
      p.mesh.position.lerpVectors(points[p.a], points[p.b], p.t);
      (p.mesh.material as THREE.MeshBasicMaterial).opacity =
        Math.sin(p.t * Math.PI) * 0.9;
    }
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    nodeGeo.dispose();
    nodeMat.dispose();
    pulseGeo.dispose();
    for (const child of filaments.children as THREE.Line[]) {
      child.geometry.dispose();
      (child.material as THREE.Material).dispose();
    }
    lineMat.dispose();
    for (const p of pulses) (p.mesh.material as THREE.Material).dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
