import * as THREE from 'three';

export interface WorldTreeOptions {
  accentColor?: string;
}

export function createWorldTree(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#22d3ee' } = options;
  let seed = 101010;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0914, 0.03);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(5, 5, 14);
  camera.lookAt(0, 5, -2);

  const barkMat = new THREE.MeshStandardMaterial({ color: 0x2c2338, roughness: 1, flatShading: true });
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 1.3, 9, 8), barkMat);
  trunk.position.set(0, 4.5, -4);
  scene.add(trunk);

  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const branch = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.24, 4.5, 6), barkMat);
    branch.position.set(Math.cos(a) * 2, 7.4 + rand() * 1.6, -4 + Math.sin(a) * 2);
    branch.rotation.z = Math.cos(a) * 1.15;
    branch.rotation.x = -Math.sin(a) * 1.15;
    scene.add(branch);
  }

  const LEAF_N = 1400;
  const leafGeo = new THREE.BufferGeometry();
  const lpos = new Float32Array(LEAF_N * 3);
  const lmeta = new Float32Array(LEAF_N);
  for (let i = 0; i < LEAF_N; i++) {
    let x = 0, y = 8.6 + rand() * 2.4, z = -4;
    for (let s = 0; s < 3; s++) {
      x += (rand() - 0.5) * 3.4;
      y += (rand() - 0.5) * 1.6;
      z += (rand() - 0.5) * 3.4;
    }
    lpos[i * 3] = x;
    lpos[i * 3 + 1] = y;
    lpos[i * 3 + 2] = z;
    lmeta[i] = rand() * Math.PI * 2;
  }
  leafGeo.setAttribute('position', new THREE.BufferAttribute(lpos, 3));
  const leafMat = new THREE.PointsMaterial({
    color: new THREE.Color(accentColor), size: 0.16, transparent: true, opacity: 0.75,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const leaves = new THREE.Points(leafGeo, leafMat);
  scene.add(leaves);

  const fireflyN = 160;
  const ffGeo = new THREE.BufferGeometry();
  const fpos = new Float32Array(fireflyN * 3);
  for (let i = 0; i < fireflyN; i++) {
    fpos[i * 3] = (rand() - 0.5) * 18;
    fpos[i * 3 + 1] = rand() * 8 + 0.5;
    fpos[i * 3 + 2] = (rand() - 0.5) * 14;
  }
  ffGeo.setAttribute('position', new THREE.BufferAttribute(fpos, 3));
  const fireflies = new THREE.Points(ffGeo, new THREE.PointsMaterial({
    color: 0xffe9a3, size: 0.09, transparent: true, opacity: 0.85,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  scene.add(fireflies);

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(26, 40),
    new THREE.MeshStandardMaterial({ color: 0x120f1f, roughness: 1 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.02;
  scene.add(ground);

  for (let i = 0; i < 6; i++) {
    const root = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.4, 3, 5), barkMat);
    const a = rand() * Math.PI * 2;
    root.position.set(Math.cos(a) * 2, 0.6, -4 + Math.sin(a) * 2);
    root.rotation.z = Math.cos(a) * 1.35;
    root.rotation.x = -Math.sin(a) * 1.35;
    scene.add(root);
  }

  const heartLight = new THREE.PointLight(new THREE.Color(accentColor), 30, 20);
  heartLight.position.set(0, 9, -4);
  scene.add(heartLight);
  scene.add(new THREE.AmbientLight(0x1d1830, 1.7));
  const moonL = new THREE.DirectionalLight(0xbcc8ff, 0.9);
  moonL.position.set(-8, 12, 6);
  scene.add(moonL);

  function resize() {
    const w = container.clientWidth, h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
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
    heartLight.intensity = 26 + Math.abs(Math.sin(t * 1.1)) * 14;
    const la = leafGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < LEAF_N; i++) {
      la.setX(i, la.getX(i) + Math.sin(t * 0.9 + lmeta[i]) * 0.004);
      la.setY(i, la.getY(i) + Math.cos(t * 1.3 + lmeta[i]) * 0.003);
    }
    la.needsUpdate = true;
    const fa = ffGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < fireflyN; i++) {
      fa.setY(i, fa.getY(i) + Math.sin(t * 1.7 + i * 1.31) * 0.006);
      fa.setX(i, fa.getX(i) + Math.cos(t * 0.8 + i) * 0.005);
    }
    fa.needsUpdate = true;
    camera.position.x = Math.sin(t * 0.06) * 3 + 5;
    camera.lookAt(0, 6, -4);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [leafGeo, ffGeo].forEach((g) => g.dispose());
    [barkMat].forEach((mt) => mt.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
