import * as THREE from 'three';

export interface FernFractalOptions {
  accentColor?: string;
  speed?: number;
}

export function createFernFractal(
  container: HTMLElement,
  options: { accentColor?: string; speed?: number } = {},
): () => void {
  const { accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#0b0b10', 8, 30);
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 60);
  camera.position.set(6, 5, 12);
  camera.lookAt(0, 2, 0);

  let seed = 250250;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const group = new THREE.Group();
  const lineMat = new THREE.LineBasicMaterial({
    color: accentColor,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
  });
  const tipMat = new THREE.MeshBasicMaterial({ color: '#a7f3d0' });
  const tips: { mesh: THREE.Mesh; phase: number }[] = [];

  interface Branch {
    start: THREE.Vector3;
    dir: THREE.Vector3;
    length: number;
    depth: number;
  }

  function buildBranch(branch: Branch) {
    const end = branch.start
      .clone()
      .addScaledVector(branch.dir, branch.length);
    const geo = new THREE.BufferGeometry().setFromPoints([branch.start, end]);
    group.add(new THREE.Line(geo, lineMat.clone()));

    if (branch.depth >= 4 || branch.length < 0.35) {
      const tip = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), tipMat);
      tip.position.copy(end);
      group.add(tip);
      tips.push({ mesh: tip, phase: rand() * Math.PI * 2 });
      return;
    }
    const kids = branch.depth === 0 ? 5 : 2 + Math.floor(rand() * 2);
    for (let i = 0; i < kids; i++) {
      const newDir = branch.dir
        .clone()
        .applyAxisAngle(
          new THREE.Vector3(0, 1, 0),
          (rand() - 0.5) * 1.6,
        )
        .applyAxisAngle(
          new THREE.Vector3(1, 0, 0),
          (i / kids - 0.5) * 1.1,
        );
      buildBranch({
        start: end,
        dir: newDir.normalize(),
        length: branch.length * (0.55 + rand() * 0.15),
        depth: branch.depth + 1,
      });
    }
  }

  buildBranch({ start: new THREE.Vector3(-3, 0, 0), dir: new THREE.Vector3(0.3, 1, 0).normalize(), length: 3.4, depth: 0 });
  scene.add(group);

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
    const t = clock.getElapsedTime() * speed;
    group.rotation.y = t * 0.15;
    for (const tip of tips) {
      tip.mesh.scale.setScalar(1 + Math.sin(t * 2.2 + tip.phase) * 0.6);
    }
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    lineMat.dispose();
    tipMat.dispose();
    for (const child of group.children as (THREE.Line | THREE.Mesh)[]) {
      child.geometry.dispose();
      (child.material as THREE.Material).dispose();
    }
    renderer.dispose();
    renderer.domElement.remove();
  };
}
