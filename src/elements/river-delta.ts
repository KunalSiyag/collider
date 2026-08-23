import * as THREE from 'three';

export interface RiverDeltaOptions {
  accentColor?: string;
}

export function createRiverDelta(
  container: HTMLElement,
  options: RiverDeltaOptions = {},
): () => void {
  const { accentColor = '#22d3ee' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#0b0b10', 12, 40);
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 60);
  camera.position.set(0, 10, 16);
  camera.lookAt(0, -2, -6);

  let seed = 903577;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const groundGeo = new THREE.PlaneGeometry(44, 34);
  const groundMat = new THREE.MeshStandardMaterial({ color: '#171426', roughness: 1 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.z = -8;
  scene.add(ground);

  const channelMat = new THREE.MeshBasicMaterial({
    color: accentColor,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  interface Channel { points: THREE.Vector3[]; offset: number }
  const channels: Channel[] = [];
  const linesGroup = new THREE.Group();
  for (let c = 0; c < 14; c++) {
    const pts: THREE.Vector3[] = [];
    let x = (rand() - 0.5) * 6;
    let z = -20;
    while (z < 14) {
      pts.push(new THREE.Vector3(x, 0.02, z));
      x += (rand() - 0.5) * 2.6;
      z += 1 + rand() * 1.6;
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const geo = new THREE.TubeGeometry(curve, 48, 0.05 + rand() * 0.08, 6, false);
    linesGroup.add(new THREE.Mesh(geo, channelMat.clone()));
    channels.push({ points: pts, offset: rand() });
  }
  scene.add(linesGroup);

  scene.add(new THREE.AmbientLight('#332a55', 2));

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
    for (const child of linesGroup.children as THREE.Mesh[]) {
      const mat = child.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.35 + Math.abs(Math.sin(t * 0.9 + channels[linesGroup.children.indexOf(child)].offset)) * 0.45;
    }
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    groundGeo.dispose();
    groundMat.dispose();
    for (const child of linesGroup.children as THREE.Mesh[]) {
      child.geometry.dispose();
      (child.material as THREE.Material).dispose();
    }
    channelMat.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
