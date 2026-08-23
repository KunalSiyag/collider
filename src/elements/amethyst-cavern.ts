import * as THREE from 'three';

export interface AmethystCavernOptions {
  accentColor?: string;
}

export function createAmethystCavern(
  container: HTMLElement,
  options: AmethystCavernOptions = {},
): () => void {
  const { accentColor = '#a78bfa' } = options;
  let seed = 60613;
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
  scene.fog = new THREE.FogExp2(0x120b20, 0.04);
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 80);
  camera.position.set(0, 1.6, 11);

  const crystalGeoA = new THREE.ConeGeometry(0.5, 3.4, 6);
  const crystalGeoB = new THREE.ConeGeometry(0.34, 2.2, 5);
  const shardGeo = new THREE.OctahedronGeometry(0.28);
  const crystalMats = ['#7c3aed', '#8b5cf6', '#a78bfa'].map((c) =>
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(c),
      emissive: new THREE.Color(c),
      emissiveIntensity: 0.45,
      roughness: 0.15,
      metalness: 0.2,
      flatShading: true,
    }),
  );

  const crystals: { mesh: THREE.Mesh; spin: number }[] = [];
  for (let i = 0; i < 22; i++) {
    const big = rand() > 0.4;
    const mesh = new THREE.Mesh(big ? crystalGeoA : crystalGeoB, crystalMats[Math.floor(rand() * crystalMats.length)]);
    const x = (rand() - 0.5) * 16;
    const z = -rand() * 14;
    const s = 0.6 + rand() * 1.5;
    mesh.position.set(x, 0, z);
    mesh.scale.set(s, s * (big ? 1 : 0.9), s);
    mesh.rotation.z = (rand() - 0.5) * 0.5;
    mesh.rotation.x = (rand() - 0.5) * 0.3;
    crystals.push({ mesh, spin: (rand() - 0.5) * 0.002 });
    scene.add(mesh);
  }

  const floorGeo = new THREE.PlaneGeometry(50, 40, 24, 18);
  const fpos = floorGeo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < fpos.count; i++) fpos.setZ(i, (Math.sin(fpos.getX(i)) + Math.cos(fpos.getY(i))) * 0.35 * rand());
  floorGeo.computeVertexNormals();
  const floor = new THREE.Mesh(floorGeo, new THREE.MeshStandardMaterial({ color: 0x1a1226, roughness: 1, flatShading: true }));
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const shards: THREE.Mesh[] = [];
  for (let i = 0; i < 40; i++) {
    const sh = new THREE.Mesh(shardGeo, crystalMats[i % crystalMats.length]);
    sh.position.set((rand() - 0.5) * 14, 1 + rand() * 5, -rand() * 12);
    shards.push(sh);
    scene.add(sh);
  }

  const glowGeo = new THREE.BufferGeometry();
  const gn = 240;
  const gp = new Float32Array(gn * 3);
  for (let i = 0; i < gn; i++) {
    gp[i * 3] = (Math.random() - 0.5) * 18;
    gp[i * 3 + 1] = Math.random() * 7;
    gp[i * 3 + 2] = -Math.random() * 16;
  }
  glowGeo.setAttribute('position', new THREE.BufferAttribute(gp, 3));
  const motes = new THREE.Points(glowGeo, new THREE.PointsMaterial({
    color: new THREE.Color(accentColor), size: 0.07, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  scene.add(motes);

  scene.add(new THREE.AmbientLight(0x241a38, 1.6));
  const violet = new THREE.PointLight(new THREE.Color(accentColor), 46, 22);
  violet.position.set(0, 4, -3);
  scene.add(violet);
  const cyan = new THREE.PointLight(0x22d3ee, 18, 18);
  cyan.position.set(-6, 2, 2);
  scene.add(cyan);
  const magenta = new THREE.PointLight(0xf472b6, 14, 18);
  magenta.position.set(6, 2.5, -6);
  scene.add(magenta);

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
    crystals.forEach((c, i) => {
      c.mesh.rotation.y += c.spin;
      c.mesh.position.y = Math.sin(t * 0.5 + i) * 0.06;
    });
    shards.forEach((s, i) => {
      s.rotation.x = t * 0.4 + i;
      s.rotation.y = t * 0.3 + i;
    });
    violet.intensity = 40 + Math.sin(t * 1.8) * 12;
    const gpAttr = glowGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < gn; i++) {
      gpAttr.setY(i, (gpAttr.getY(i) + 0.006) % 7);
    }
    gpAttr.needsUpdate = true;
    camera.position.x = Math.sin(t * 0.08) * 1.8;
    camera.lookAt(0, 1.8, -5);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [crystalGeoA, crystalGeoB, shardGeo, floorGeo, glowGeo].forEach((g) => g.dispose());
    crystalMats.forEach((mt) => mt.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
