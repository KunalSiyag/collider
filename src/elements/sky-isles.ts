import * as THREE from 'three';

export interface SkyIslesOptions {
  accentColor?: string;
}

export function createSkyIsles(
  container: HTMLElement,
  options: SkyIslesOptions = {},
): () => void {
  const { accentColor = '#22d3ee' } = options;
  let seed = 31415;
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
  scene.fog = new THREE.Fog(0x141126, 20, 75);
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 160);
  camera.position.set(2, 2.4, 17);
  camera.lookAt(0, 1, -6);

  interface Isle { group: THREE.Group; baseY: number; phase: number; fallFrom: THREE.Vector3 }
  const isles: Isle[] = [];
  const rockMat = new THREE.MeshStandardMaterial({ color: 0x35304a, roughness: 0.9, flatShading: true });
  const grassTop = new THREE.MeshStandardMaterial({ color: 0x2e5a44, roughness: 0.95, flatShading: true });

  const fallGeo = new THREE.BufferGeometry();
  const FALL_N = 900;
  const fpos = new Float32Array(FALL_N * 3);
  const fmeta: number[] = [];
  for (let i = 0; i < FALL_N; i++) {
    fpos[i * 3] = (rand() - 0.5) * 20;
    fpos[i * 3 + 1] = rand() * -30;
    fpos[i * 3 + 2] = -4 - rand() * 16;
    fmeta.push(rand() * Math.PI * 2);
  }
  fallGeo.setAttribute('position', new THREE.BufferAttribute(fpos, 3));
  const waterfall = new THREE.Points(fallGeo, new THREE.PointsMaterial({
    color: new THREE.Color(accentColor), size: 0.12, transparent: true, opacity: 0.65, blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  scene.add(waterfall);

  for (let i = 0; i < 7; i++) {
    const g = new THREE.Group();
    const r = 1.4 + rand() * 2.2;
    const body = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), rockMat);
    body.scale.set(r, r * 0.55, r);
    g.add(body);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.96, r * 0.8, 0.22, 10), grassTop);
    cap.position.y = r * 0.28;
    g.add(cap);
    if (rand() > 0.4) {
      const tree = new THREE.Mesh(new THREE.ConeGeometry(0.4, 1.1, 6), grassTop);
      tree.position.set((rand() - 0.5) * r, r * 0.28 + 0.6, (rand() - 0.5) * r);
      g.add(tree);
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.5, 5), rockMat);
      trunk.position.copy(tree.position).setY(tree.position.y - 0.7);
      g.add(trunk);
    }
    const x = (i - 3) * 4.6 + (rand() - 0.5) * 2;
    const y = 1 + rand() * 5;
    const z = -3 - rand() * 12;
    g.position.set(x, y, z);
    isles.push({ group: g, baseY: y, phase: rand() * Math.PI * 2, fallFrom: new THREE.Vector3(x, y + r * 0.3, z) });
    scene.add(g);
  }

  const cloudGeo = new THREE.PlaneGeometry(120, 60);
  const cloudLayer = new THREE.Mesh(cloudGeo, new THREE.MeshBasicMaterial({ color: 0x1d1832, transparent: true, opacity: 0.85, depthWrite: false }));
  cloudLayer.rotation.x = -Math.PI / 2;
  cloudLayer.position.y = -18;
  scene.add(cloudLayer);

  scene.add(new THREE.AmbientLight(0x3a3454, 1.8));
  const keyLight = new THREE.DirectionalLight(0xd8ccff, 1.5);
  keyLight.position.set(-8, 12, 6);
  scene.add(keyLight);
  const rimGlow = new THREE.PointLight(new THREE.Color(accentColor), 24, 40);
  rimGlow.position.set(0, -8, 0);
  scene.add(rimGlow);

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
    isles.forEach((isle, i) => {
      isle.group.position.y = isle.baseY + Math.sin(t * 0.4 + isle.phase) * 0.5;
      isle.group.rotation.y += 0.0006 + i * 0.0001;
    });
    const attr = fallGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < FALL_N; i++) {
      const src = isles[i % isles.length].fallFrom;
      let y = attr.getY(i) - 0.09;
      let x = attr.getX(i);
      if (y < src.y - 26 || y > src.y + 1) {
        y = src.y;
        const a = fmeta[i];
        const rr = 1 + ((i / FALL_N) % 2);
        x = src.x + Math.cos(a) * rr * 1.4;
        attr.setX(i, x);
        attr.setZ(i, src.z + Math.sin(a) * rr * 1.2);
      } else {
        attr.setX(i, x + Math.sin(t * 3 + fmeta[i]) * 0.004);
      }
      attr.setY(i, y);
    }
    attr.needsUpdate = true;
    camera.position.x = Math.sin(t * 0.07) * 2.4;
    camera.lookAt(0, 1, -6);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [rockMat, grassTop].forEach((mt) => mt.dispose());
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh || o instanceof THREE.Points) o.geometry.dispose();
      if ('material' in o && o.material instanceof THREE.Material && o.material !== rockMat && o.material !== grassTop) o.material.dispose();
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
