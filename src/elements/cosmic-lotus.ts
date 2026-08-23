import * as THREE from 'three';

export interface CosmicLotusOptions {
  accentColor?: string;
}

export function createCosmicLotus(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#f472b6' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b0b12, 0.028);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 7.5, 12);
  camera.lookAt(0, 1.5, 0);

  const petalGeo = new THREE.SphereGeometry(1, 16, 10, 0, Math.PI);
  const layers: { group: THREE.Group; petals: THREE.Mesh[]; open: number; speed: number; phase: number }[] = [];
  const layerColors = ['#f472b6', '#a78bfa', '#22d3ee'];

  for (let l = 0; l < 3; l++) {
    const group = new THREE.Group();
    const col = layerColors[l];
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(col), roughness: 0.35,
      emissive: new THREE.Color(col), emissiveIntensity: 0.3,
      side: THREE.DoubleSide, transparent: true, opacity: 0.88,
    });
    const count = 6 + l * 2;
    const petals: THREE.Mesh[] = [];
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const petal = new THREE.Mesh(petalGeo, mat);
      const s = 2.4 - l * 0.55;
      petal.scale.set(s * 0.55, s * 0.9, s * 0.24);
      petal.position.set(Math.cos(a) * (1 + l * 0.5), 0.4 - l * 0.25, Math.sin(a) * (1 + l * 0.5));
      petal.rotation.y = -a;
      petal.rotation.x = 1.15;
      petal.rotation.z = Math.PI / 2;
      petals.push(petal);
      group.add(petal);
    }
    scene.add(group);
    layers.push({ group, petals, open: 0, speed: 0.5 - l * 0.08, phase: l });
  }

  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.85, 28, 20),
    new THREE.MeshBasicMaterial({ color: 0xffe8c2, transparent: true, opacity: 0.95 }),
  );
  core.position.y = 0.5;
  scene.add(core);

  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(1.35, 28, 20),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor), transparent: true, opacity: 0.18,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }),
  );
  halo.position.y = 0.5;
  scene.add(halo);

  const stardustN = 400;
  const dustGeo = new THREE.BufferGeometry();
  const dpos = new Float32Array(stardustN * 3);
  for (let i = 0; i < stardustN; i++) {
    const a = Math.random() * Math.PI * 2;
    const rr = 3 + Math.random() * 8;
    dpos[i * 3] = Math.cos(a) * rr;
    dpos[i * 3 + 1] = Math.random() * 8 - 2;
    dpos[i * 3 + 2] = Math.sin(a) * rr;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dpos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: 0xd8ccff, size: 0.07, transparent: true, opacity: 0.6,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  scene.add(dust);

  const coreLight = new THREE.PointLight(0xffd98a, 34, 18);
  coreLight.position.y = 1.4;
  scene.add(coreLight);
  scene.add(new THREE.AmbientLight(0x241c38, 1.6));

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
    for (const layer of layers) {
      layer.group.rotation.y = t * layer.speed * 0.14 + layer.phase;
      for (const p of layer.petals) {
        p.rotation.x = 1.15 + Math.sin(t * layer.speed + layer.phase) * 0.22;
        p.position.y = (0.4 - layer.phase * 0.25) + Math.sin(t * layer.speed + layer.phase) * 0.15;
      }
    }
    const pulse = 1 + Math.abs(Math.sin(t * 1.6)) * 0.14;
    core.scale.setScalar(pulse);
    halo.scale.setScalar(pulse * (1.05 + Math.sin(t * 1.6) * 0.06));
    coreLight.intensity = 30 + Math.abs(Math.sin(t * 1.6)) * 14;
    dust.rotation.y = -t * 0.04;
    camera.position.y = 7.5 + Math.sin(t * 0.2) * 0.8;
    camera.lookAt(0, 1, 0);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [petalGeo, dustGeo].forEach((g) => g.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
