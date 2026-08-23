import * as THREE from 'three';

export interface IcebergDriftOptions {
  accentColor?: string;
}

export function createIcebergDrift(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#22d3ee' } = options;
  let seed = 31416;
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
  scene.fog = new THREE.Fog(0x0c1220, 18, 70);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 150);
  camera.position.set(3, 3.2, 15);
  camera.lookAt(-2, 1, -6);

  interface Berg { group: THREE.Group; baseY: number; phase: number }
  const bergs: Berg[] = [];
  const iceMat = new THREE.MeshStandardMaterial({ color: 0xcfe4f5, roughness: 0.35, metalness: 0.05, flatShading: true });
  const glowMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(accentColor), transparent: true, opacity: 0.14, blending: THREE.AdditiveBlending, depthWrite: false,
  });

  for (let i = 0; i < 9; i++) {
    const g = new THREE.Group();
    const r = 1 + rand() * 2.2;
    const above = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), iceMat);
    above.scale.set(r * 0.8, r * 0.55, r);
    g.add(above);
    const below = new THREE.Mesh(new THREE.IcosahedronGeometry(r * 0.9, 1), iceMat.clone());
    below.material.transparent = true;
    below.material.opacity = 0.5;
    below.scale.set(r, r * 1.7, r * 0.95);
    below.position.y = -r * 1.9;
    g.add(below);
    const aura = new THREE.Mesh(new THREE.IcosahedronGeometry(r * 1.12, 1), glowMat);
    aura.position.y = -r * 0.8;
    aura.scale.set(1, 2, 1);
    g.add(aura);
    g.position.set((i - 4) * 4.4 + rand() * 2, rand() * 0.4, -rand() * 24 - Math.abs(i - 4));
    bergs.push({ group: g, baseY: g.position.y, phase: rand() * Math.PI * 2 });
    scene.add(g);
  }

  const waterGeo = new THREE.PlaneGeometry(120, 80, 40, 20);
  const waterMat = new THREE.MeshPhongMaterial({ color: 0x0b1524, specular: 0x88bbdd, shininess: 100, transparent: true, opacity: 0.92 });
  const water = new THREE.Mesh(waterGeo, waterMat);
  water.rotation.x = -Math.PI / 2;
  scene.add(water);
  const wpos = waterGeo.attributes.position as THREE.BufferAttribute;

  const snowGeo = new THREE.BufferGeometry();
  const SN = 500;
  const spos = new Float32Array(SN * 3);
  for (let i = 0; i < SN; i++) {
    spos[i * 3] = (rand() - 0.5) * 40;
    spos[i * 3 + 1] = rand() * 18;
    spos[i * 3 + 2] = (rand() - 0.5) * 30;
  }
  snowGeo.setAttribute('position', new THREE.BufferAttribute(spos, 3));
  const snow = new THREE.Points(snowGeo, new THREE.PointsMaterial({ color: 0xe8f2ff, size: 0.07, transparent: true, opacity: 0.8 }));
  scene.add(snow);

  scene.add(new THREE.AmbientLight(0x27354e, 1.9));
  const moonL = new THREE.DirectionalLight(0xbfe3ff, 1.3);
  moonL.position.set(-8, 12, 4);
  scene.add(moonL);
  const auroraTint = new THREE.PointLight(new THREE.Color(accentColor), 16, 40);
  auroraTint.position.set(0, 10, -10);
  scene.add(auroraTint);

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
    for (let i = 0; i < wpos.count; i++) {
      const x = wpos.getX(i), y = wpos.getY(i);
      wpos.setZ(i, Math.sin(x * 0.3 + t * 0.9) * 0.14 + Math.cos(y * 0.35 + t * 0.6) * 0.1);
    }
    wpos.needsUpdate = true;
    waterGeo.computeVertexNormals();
    for (const b of bergs) {
      b.group.position.y = b.baseY + Math.sin(t * 0.5 + b.phase) * 0.14;
      b.group.rotation.z = Math.sin(t * 0.35 + b.phase) * 0.02;
      b.group.position.x += 0.004;
      if (b.group.position.x > 14) b.group.position.x = -16;
    }
    const sa = snowGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < SN; i++) {
      let y = sa.getY(i) - 0.02 - (i % 4) * 0.003;
      if (y < 0) y = 18;
      sa.setY(i, y);
      sa.setX(i, sa.getX(i) + Math.sin(t + i) * 0.002);
    }
    sa.needsUpdate = true;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [waterGeo, snowGeo].forEach((g) => g.dispose());
    [iceMat, waterMat].forEach((mt) => mt.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
