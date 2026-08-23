import * as THREE from 'three';

export interface FrostHeartOptions {
  accentColor?: string;
}

export function createFrostHeart(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#22d3ee' } = options;
  let seed = 3141;
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
  scene.fog = new THREE.FogExp2(0x0a0e18, 0.045);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 80);
  camera.position.set(0, 2, 10);
  camera.lookAt(0, 1.5, 0);

  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x9fdcf5, roughness: 0.08, metalness: 0.25,
    emissive: new THREE.Color(accentColor), emissiveIntensity: 0.9,
    flatShading: true, transparent: true, opacity: 0.92,
  });
  const coreGeo = new THREE.IcosahedronGeometry(1.5, 1);
  const core = new THREE.Mesh(coreGeo, coreMat);
  core.position.y = 1.8;
  scene.add(core);

  const shardGeoA = new THREE.TetrahedronGeometry(0.4);
  const shardGeoB = new THREE.OctahedronGeometry(0.26);
  interface Shard { mesh: THREE.Mesh; radius: number; angle: number; speed: number; yOff: number; tilt: number }
  const shards: Shard[] = [];
  for (let i = 0; i < 16; i++) {
    const geo = rand() > 0.5 ? shardGeoA : shardGeoB;
    const mat = new THREE.MeshStandardMaterial({
      color: 0xbfe9fa, roughness: 0.12, metalness: 0.35,
      emissive: new THREE.Color(i % 3 ? accentColor : '#a78bfa'), emissiveIntensity: 0.55,
      flatShading: true,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = 1.8;
    scene.add(mesh);
    shards.push({
      mesh,
      radius: 2.6 + rand() * 2,
      angle: rand() * Math.PI * 2,
      speed: 0.25 + rand() * 0.5,
      yOff: (rand() - 0.5) * 2.6,
      tilt: (rand() - 0.5) * 0.8,
    });
  }

  const mistN = 350;
  const mistGeo = new THREE.BufferGeometry();
  const mpos = new Float32Array(mistN * 3);
  for (let i = 0; i < mistN; i++) {
    mpos[i * 3] = (rand() - 0.5) * 18;
    mpos[i * 3 + 1] = rand() * 7;
    mpos[i * 3 + 2] = (rand() - 0.5) * 16;
  }
  mistGeo.setAttribute('position', new THREE.BufferAttribute(mpos, 3));
  const mist = new THREE.Points(mistGeo, new THREE.PointsMaterial({
    color: 0xbfe9fa, size: 0.09, transparent: true, opacity: 0.35,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  scene.add(mist);

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(22, 40),
    new THREE.MeshStandardMaterial({ color: 0x101627, roughness: 0.3, metalness: 0.4 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.4;
  scene.add(ground);

  for (let i = 0; i < 8; i++) {
    const spike = new THREE.Mesh(
      new THREE.ConeGeometry(0.22 + rand() * 0.3, 1.2 + rand() * 2, 5),
      coreMat.clone(),
    );
    const a = rand() * Math.PI * 2;
    const rr = 3 + rand() * 5;
    spike.position.set(Math.cos(a) * rr, -0.4, Math.sin(a) * rr);
    spike.rotation.z = (rand() - 0.5) * 0.4;
    scene.add(spike);
  }

  const heartLight = new THREE.PointLight(new THREE.Color(accentColor), 30, 14);
  heartLight.position.set(0, 1.8, 0.5);
  scene.add(heartLight);
  scene.add(new THREE.AmbientLight(0x18243c, 1.7));

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
    const beat = 0.94 + Math.pow(Math.abs(Math.sin(t * 1.9)), 3) * 0.16;
    core.scale.setScalar(beat);
    core.rotation.y = t * 0.3;
    core.rotation.x = t * 0.12;
    heartLight.intensity = 24 + Math.pow(Math.abs(Math.sin(t * 1.9)), 3) * 22;
    for (const s of shards) {
      s.angle += s.speed * 0.008;
      s.mesh.position.set(Math.cos(s.angle) * s.radius, 1.8 + s.yOff, Math.sin(s.angle) * s.radius);
      s.mesh.rotation.x = t + s.tilt;
      s.mesh.rotation.z = -s.angle;
    }
    const ma = mistGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < mistN; i++) {
      ma.setY(i, ma.getY(i) + 0.006);
      if (ma.getY(i) > 7) ma.setY(i, 0);
    }
    ma.needsUpdate = true;
    camera.position.x = Math.sin(t * 0.07) * 2.4;
    camera.lookAt(0, 1.6, 0);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [coreGeo, shardGeoA, shardGeoB, mistGeo].forEach((g) => g.dispose());
    [coreMat].forEach((mt) => mt.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
