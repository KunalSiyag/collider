import * as THREE from 'three';

export interface DragonHoardOptions {
  goldColor?: string;
}

export function createDragonHoard(
  container: HTMLElement,
  options: DragonHoardOptions = {},
): () => void {
  const { goldColor = '#f5c04a' } = options;
  let seed = 77;
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
  scene.fog = new THREE.Fog(0x0b0b10, 10, 40);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 5.5, 13);
  camera.lookAt(0, 0.8, 0);

  const goldMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(goldColor), roughness: 0.25, metalness: 0.9 });
  const coinGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.05, 14);
  const COUNT = 700;
  const hoard = new THREE.InstancedMesh(coinGeo, goldMat, COUNT);
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  for (let i = 0; i < COUNT; i++) {
    const a = rand() * Math.PI * 2;
    const rr = Math.sqrt(rand()) * 5.2;
    const y = Math.max(0, 2.2 - rr * 0.38) + rand() * 0.1;
    e.set(rand() * 0.6 - 0.3, rand() * Math.PI, rand() * 0.6 - 0.3);
    q.setFromEuler(e);
    m.compose(new THREE.Vector3(Math.cos(a) * rr, y, Math.sin(a) * rr), q, new THREE.Vector3(1, 1, 1));
    hoard.setMatrixAt(i, m);
  }
  scene.add(hoard);

  const gemColors = ['#8b5cf6', '#22d3ee', '#f472b6'];
  const gemGeo = new THREE.OctahedronGeometry(0.32);
  for (let i = 0; i < 9; i++) {
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(gemColors[i % 3]),
      emissive: new THREE.Color(gemColors[i % 3]),
      emissiveIntensity: 0.8,
      roughness: 0.1,
    });
    const gem = new THREE.Mesh(gemGeo, mat);
    const a = rand() * Math.PI * 2;
    const rr = rand() * 4;
    gem.position.set(Math.cos(a) * rr, Math.max(0.3, 2 - rr * 0.35) + 0.25, Math.sin(a) * rr);
    gem.userData.spin = 0.4 + rand() * 0.8;
    scene.add(gem);
  }

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(30, 40),
    new THREE.MeshStandardMaterial({ color: 0x120e1c, roughness: 1 }),
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const sparkGeo = new THREE.BufferGeometry();
  const sc = 220;
  const spos = new Float32Array(sc * 3);
  const sphase: number[] = [];
  for (let i = 0; i < sc; i++) {
    sphase.push(rand() * Math.PI * 2);
    const a = rand() * Math.PI * 2;
    const rr = Math.sqrt(rand()) * 6;
    spos[i * 3] = Math.cos(a) * rr;
    spos[i * 3 + 1] = rand() * 4;
    spos[i * 3 + 2] = Math.sin(a) * rr;
  }
  sparkGeo.setAttribute('position', new THREE.BufferAttribute(spos, 3));
  const sparks = new THREE.Points(sparkGeo, new THREE.PointsMaterial({
    color: new THREE.Color(goldColor), size: 0.07, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  scene.add(sparks);

  scene.add(new THREE.AmbientLight(0x2a2038, 1.6));
  const warm = new THREE.PointLight(new THREE.Color(goldColor), 60, 22);
  warm.position.set(0, 6, 2);
  scene.add(warm);
  const cool = new THREE.PointLight(0x22d3ee, 10, 25);
  cool.position.set(-8, 3, -6);
  scene.add(cool);

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
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh && o.geometry === gemGeo) {
        o.rotation.y += 0.02 * (o.userData.spin ?? 1);
        o.position.y += Math.sin(t * 2 + o.position.x) * 0.002;
      }
    });
    const p = sparkGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < sc; i++) {
      p.setY(i, (p.getY(i) + 0.008 + (i % 5) * 0.001) % 4.5);
    }
    p.needsUpdate = true;
    warm.intensity = 55 + Math.sin(t * 5.2) * 10;
    camera.position.x = Math.sin(t * 0.1) * 2;
    camera.lookAt(0, 0.8, 0);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    coinGeo.dispose(); gemGeo.dispose(); sparkGeo.dispose();
    goldMat.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
