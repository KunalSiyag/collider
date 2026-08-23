import * as THREE from 'three';

export interface HarborMoonOptions {
  accentColor?: string;
}

export function createHarborMoon(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#ffd98a' } = options;
  let seed = 8081;
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
  scene.fog = new THREE.Fog(0x10121e, 16, 60);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 120);
  camera.position.set(0, 2.4, 14);
  camera.lookAt(0, 3.5, -10);

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(4.2, 40, 30),
    new THREE.MeshBasicMaterial({ color: 0xf2ecd8 }),
  );
  moon.position.set(-6, 9, -34);
  scene.add(moon);

  const waterGeo = new THREE.PlaneGeometry(100, 60, 46, 22);
  const waterMat = new THREE.MeshPhongMaterial({ color: 0x0c1220, specular: 0xffd98a, shininess: 140, transparent: true, opacity: 0.95 });
  const water = new THREE.Mesh(waterGeo, waterMat);
  water.rotation.x = -Math.PI / 2;
  water.material.shininess = 120;
  scene.add(water);
  const wpos = waterGeo.attributes.position as THREE.BufferAttribute;

  const hullMat = new THREE.MeshStandardMaterial({ color: 0x241c28, roughness: 0.85 });
  const lampMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor) });
  const boats: { group: THREE.Group; baseY: number; phase: number }[] = [];
  for (let i = 0; i < 6; i++) {
    const g = new THREE.Group();
    const s = 0.5 + rand() * 0.9;
    const hull = new THREE.Mesh(new THREE.CapsuleGeometry(0.35, 1.8, 6, 12), hullMat);
    hull.rotation.z = Math.PI / 2;
    g.add(hull);
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 1.4, 6), hullMat);
    mast.position.y = 0.9;
    g.add(mast);
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), lampMat.clone());
    lamp.position.y = 1.65;
    g.add(lamp);
    g.scale.setScalar(s);
    g.position.set((rand() - 0.5) * 18, 0.25, -rand() * 20 - 2);
    boats.push({ group: g, baseY: g.position.y, phase: rand() * Math.PI * 2 });
    scene.add(g);
  }

  const glintN = 260;
  const glintGeo = new THREE.BufferGeometry();
  const gpos = new Float32Array(glintN * 3);
  for (let i = 0; i < glintN; i++) {
    gpos[i * 3] = -6 + (rand() - 0.5) * 12;
    gpos[i * 3 + 1] = 0.06;
    gpos[i * 3 + 2] = -4 - rand() * 26;
  }
  glintGeo.setAttribute('position', new THREE.BufferAttribute(gpos, 3));
  const glints = new THREE.Points(glintGeo, new THREE.PointsMaterial({
    color: 0xf2ecd8, size: 0.13, transparent: true, opacity: 0.8,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  scene.add(glints);

  const starGeo = new THREE.BufferGeometry();
  const SN = 400;
  const sp = new Float32Array(SN * 3);
  for (let i = 0; i < SN; i++) {
    sp[i * 3] = (Math.random() - 0.5) * 110;
    sp[i * 3 + 1] = Math.random() * 45 + 6;
    sp[i * 3 + 2] = -30 - Math.random() * 60;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xdde4ff, size: 0.13, transparent: true, opacity: 0.75 }));
  scene.add(stars);

  const moonL = new THREE.DirectionalLight(0xf5eeda, 1.6);
  moonL.position.copy(moon.position);
  scene.add(moonL);
  scene.add(new THREE.AmbientLight(0x1e2438, 1.9));
  const warmL = new THREE.PointLight(new THREE.Color(accentColor), 12, 16);
  warmL.position.set(0, 2, -6);
  scene.add(warmL);

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
      wpos.setZ(i, Math.sin(wpos.getX(i) * 0.4 + t * 1.1) * 0.09 + Math.cos(wpos.getY(i) * 0.45 + t * 0.7) * 0.07);
    }
    wpos.needsUpdate = true;
    waterGeo.computeVertexNormals();
    for (const b of boats) {
      b.group.position.y = b.baseY + Math.sin(t * 0.9 + b.phase) * 0.09;
      b.group.rotation.z = Math.sin(t * 0.7 + b.phase) * 0.06;
    }
    const ga = glintGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < glintN; i++) {
      ga.setX(i, ga.getX(i) + Math.sin(t * 1.8 + i * 0.7) * 0.01);
      ga.setY(i, 0.06 + Math.abs(Math.sin(t * 2.2 + i)) * 0.06);
    }
    ga.needsUpdate = true;
    stars.rotation.y = t * 0.003;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [waterGeo, glintGeo, starGeo].forEach((g) => g.dispose());
    [hullMat, waterMat].forEach((mt) => mt.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
