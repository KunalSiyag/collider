import * as THREE from 'three';

export interface InkMountainsOptions {
  accentColor?: string;
}

export function createInkMountains(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#f472b6' } = options;
  let seed = 22222;
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
  scene.fog = new THREE.Fog(0x0d0c16, 10, 60);
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 120);
  camera.position.set(0, 3.4, 13);
  camera.lookAt(0, 3.8, -20);

  for (let layerIdx = 0; layerIdx < 5; layerIdx++) {
    const depth = -6 - layerIdx * 9;
    const shade = new THREE.Color().lerpColors(new THREE.Color('#1a1830'), new THREE.Color('#39335c'), layerIdx / 4);
    const mat = new THREE.MeshBasicMaterial({ color: shade, fog: true });
    const ridgeGeo = new THREE.BufferGeometry();
    const SEG = 60;
    const verts = new Float32Array((SEG + 1) * 2 * 3);
    let h = 2 + rand() * 3;
    const peakHeights: number[] = [];
    for (let i = 0; i <= SEG; i++) {
      h += (rand() - 0.48) * 1.6;
      h = Math.max(1.2, Math.min(h, 8));
      peakHeights.push(h);
      verts[i * 6] = -30 + (i / SEG) * 60;
      verts[i * 6 + 1] = 0;
      verts[i * 6 + 2] = depth;
      verts[i * 6 + 3] = verts[i * 6];
      verts[i * 6 + 4] = h;
      verts[i * 6 + 5] = depth;
    }
    const indices: number[] = [];
    for (let i = 0; i < SEG; i++) {
      const a = i * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
    ridgeGeo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
    ridgeGeo.setIndex(indices);
    scene.add(new THREE.Mesh(ridgeGeo, mat));
  }

  const sun = new THREE.Mesh(
    new THREE.CircleGeometry(2.1, 48),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor), transparent: true, opacity: 0.85 }),
  );
  sun.position.set(3.5, 6.5, -46);
  scene.add(sun);
  const sunHalo = new THREE.Mesh(
    new THREE.CircleGeometry(4.2, 48),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor), transparent: true, opacity: 0.12,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }),
  );
  sunHalo.position.copy(sun.position).setZ(sun.position.z + 0.5);
  scene.add(sunHalo);

  const mistN = 240;
  const mistGeo = new THREE.BufferGeometry();
  const mpos = new Float32Array(mistN * 3);
  for (let i = 0; i < mistN; i++) {
    mpos[i * 3] = (rand() - 0.5) * 50;
    mpos[i * 3 + 1] = rand() * 4;
    mpos[i * 3 + 2] = -rand() * 40;
  }
  mistGeo.setAttribute('position', new THREE.BufferAttribute(mpos, 3));
  const mist = new THREE.Points(mistGeo, new THREE.PointsMaterial({
    color: 0x8a84b0, size: 1.6, transparent: true, opacity: 0.06, depthWrite: false,
  }));
  scene.add(mist);

  const birdsN = 18;
  const birdGeo = new THREE.BufferGeometry();
  const bpos = new Float32Array(birdsN * 3);
  for (let i = 0; i < birdsN; i++) {
    bpos[i * 3] = (rand() - 0.5) * 20;
    bpos[i * 3 + 1] = 6 + rand() * 3;
    bpos[i * 3 + 2] = -14 - rand() * 10;
  }
  birdGeo.setAttribute('position', new THREE.BufferAttribute(bpos, 3));
  const birds = new THREE.Points(birdGeo, new THREE.PointsMaterial({ color: 0x14121e, size: 0.22 }));
  scene.add(birds);

  scene.add(new THREE.AmbientLight(0xffffff, 0.001));

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
    const ma = mistGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < mistN; i++) {
      ma.setX(i, ma.getX(i) + 0.008);
      if (ma.getX(i) > 25) ma.setX(i, -25);
    }
    ma.needsUpdate = true;
    const ba = birdGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < birdsN; i++) {
      ba.setX(i, ba.getX(i) + 0.006 + (i % 3) * 0.002);
      ba.setY(i, ba.getY(i) + Math.sin(t * 1.2 + i) * 0.004);
      if (ba.getX(i) > 12) ba.setX(i, -12);
    }
    ba.needsUpdate = true;
    sun.material.opacity = 0.7 + Math.abs(Math.sin(t * 0.5)) * 0.15;
    camera.position.y = 3.4 + Math.sin(t * 0.08) * 0.3;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [mistGeo, birdGeo].forEach((g) => g.dispose());
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh || o instanceof THREE.Points) {
        if (o.geometry !== mistGeo && o.geometry !== birdGeo) o.geometry.dispose();
        if ('material' in o && o.material instanceof THREE.Material) o.material.dispose();
      }
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
