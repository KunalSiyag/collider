import * as THREE from 'three';

export interface StillLakeOptions {
  accentColor?: string;
}

export function createStillLake(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#8b5cf6' } = options;
  let seed = 20260101;
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
  scene.fog = new THREE.Fog(0x0e1020, 30, 110);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200);
  camera.position.set(0, 2.2, 18);
  camera.lookAt(0, 4, -20);

  const WATER_Y = 0;

  function buildMountains(mirror: boolean): THREE.Group {
    const g = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({
      color: mirror ? 0x141327 : 0x181633,
      roughness: 1,
      flatShading: true,
      transparent: mirror,
      opacity: mirror ? 0.45 : 1,
    });
    for (let i = 0; i < 11; i++) {
      const h = 5 + rand() * 13;
      const peak = new THREE.Mesh(new THREE.ConeGeometry(3.5 + rand() * 3, h, 5), mat);
      peak.position.set((i - 5) * 5 + rand() * 2, mirror ? -h / 2 : h / 2, -26 - rand() * 22);
      scene.add(peak);
      g.add(peak);
    }
    return g;
  }
  buildMountains(false);
  buildMountains(true);

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(2.6, 32, 24),
    new THREE.MeshBasicMaterial({ color: 0xe9e6f8 }),
  );
  moon.position.set(-7, 12, -48);
  scene.add(moon);
  const moonMirror = new THREE.Mesh(
    new THREE.CircleGeometry(2.6, 32),
    new THREE.MeshBasicMaterial({ color: 0x8f89b8, transparent: true, opacity: 0.35 }),
  );
  moonMirror.rotation.x = Math.PI / 2;
  moonMirror.position.set(-7, WATER_Y + 0.02, -48);
  scene.add(moonMirror);

  const waterGeo = new THREE.PlaneGeometry(140, 70, 60, 24);
  const waterMat = new THREE.MeshStandardMaterial({ color: 0x0d1122, roughness: 0.08, metalness: 0.75, transparent: true, opacity: 0.94 });
  const water = new THREE.Mesh(waterGeo, waterMat);
  water.rotation.x = -Math.PI / 2;
  scene.add(water);
  const wpos = waterGeo.attributes.position as THREE.BufferAttribute;

  const starGeo = new THREE.BufferGeometry();
  const SN = 900;
  const sp = new Float32Array(SN * 3);
  for (let i = 0; i < SN; i++) {
    sp[i * 3] = (Math.random() - 0.5) * 160;
    sp[i * 3 + 1] = Math.random() * 55 + 3;
    sp[i * 3 + 2] = -30 - Math.random() * 80;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xdde4ff, size: 0.14, transparent: true, opacity: 0.85 }));
  scene.add(stars);

  const glintsGeo = new THREE.BufferGeometry();
  const GN = 220;
  const gposArr = new Float32Array(GN * 3);
  for (let i = 0; i < GN; i++) {
    gposArr[i * 3] = -7 + (rand() - 0.5) * 10;
    gposArr[i * 3 + 1] = WATER_Y + 0.05;
    gposArr[i * 3 + 2] = -20 - rand() * 34;
  }
  glintsGeo.setAttribute('position', new THREE.BufferAttribute(gposArr, 3));
  const glints = new THREE.Points(glintsGeo, new THREE.PointsMaterial({
    color: new THREE.Color(accentColor), size: 0.16, transparent: true, opacity: 0.9,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  scene.add(glints);

  scene.add(new THREE.AmbientLight(0x232a48, 1.8));
  const moonL = new THREE.DirectionalLight(0xdfe4ff, 1.4);
  moonL.position.copy(moon.position);
  scene.add(moonL);
  const violet = new THREE.PointLight(new THREE.Color(accentColor), 10, 26);
  violet.position.set(0, 2, -14);
  scene.add(violet);

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
      wpos.setZ(i, Math.sin(wpos.getX(i) * 0.25 + t * 0.8) * 0.05 + Math.cos(wpos.getY(i) * 0.3 + t * 0.5) * 0.04);
    }
    wpos.needsUpdate = true;
    waterGeo.computeVertexNormals();
    const ga = glintsGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < GN; i++) {
      ga.setX(i, ga.getX(i) + Math.sin(t * 1.4 + i) * 0.006);
    }
    ga.needsUpdate = true;
    camera.position.x = Math.sin(t * 0.05) * 2;
    camera.lookAt(0, 3.5, -20);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [waterGeo, starGeo, glintsGeo].forEach((g) => g.dispose());
    [waterMat].forEach((mt) => mt.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
