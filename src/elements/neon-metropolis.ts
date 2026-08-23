import * as THREE from 'three';

export interface NeonMetropolisOptions {
  accentColor?: string;
}

export function createNeonMetropolis(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#22d3ee' } = options;
  let seed = 41141;
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
  scene.fog = new THREE.FogExp2(0x0a0a14, 0.028);
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 120);
  camera.position.set(6, 7, 18);
  camera.lookAt(0, 4, -8);

  const buildingMat = new THREE.MeshStandardMaterial({ color: 0x14121f, roughness: 0.85 });
  const winColors = [accentColor, '#f472b6', '#8b5cf6'];
  const winGeo = new THREE.PlaneGeometry(0.28, 0.16);
  const winMats = winColors.map((c) => new THREE.MeshBasicMaterial({ color: new THREE.Color(c), side: THREE.DoubleSide }));

  for (let i = 0; i < 40; i++) {
    const w = 1.2 + rand() * 2.4;
    const d = 1.2 + rand() * 2.4;
    const h = 3 + rand() * 12;
    const x = (rand() - 0.5) * 34;
    const z = -rand() * 36;
    if (Math.abs(x) < 2 && z > -10) continue;
    const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), buildingMat);
    b.position.set(x, h / 2, z);
    scene.add(b);
    const rows = Math.floor(h / 0.5);
    const cols = Math.floor(w / 0.45);
    for (let r = 0; r < rows; r++) {
      for (let cIdx = 0; cIdx < cols; cIdx++) {
        if (rand() > 0.35) continue;
        const win = new THREE.Mesh(winGeo, winMats[Math.floor(rand() * winMats.length)]);
        win.position.set(x - w / 2 + cIdx * 0.45 + 0.25, r * 0.5 + 0.4, z + d / 2 + 0.01);
        scene.add(win);
      }
    }
  }

  const streetGeo = new THREE.PlaneGeometry(60, 60);
  const streetMat = new THREE.MeshPhongMaterial({ color: 0x0c0c16, specular: 0x4466aa, shininess: 80 });
  const street = new THREE.Mesh(streetGeo, streetMat);
  street.rotation.x = -Math.PI / 2;
  scene.add(street);

  interface Car { mesh: THREE.Points; axis: number; offset: number; speed: number }
  const carGeoShared = new THREE.BufferGeometry();
  const cars: Car[] = [];
  for (let i = 0; i < 14; i++) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(3), 3));
    const mat = new THREE.PointsMaterial({
      color: i % 2 ? new THREE.Color(accentColor) : new THREE.Color('#f472b6'),
      size: 0.24, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const dot = new THREE.Points(geo, mat);
    cars.push({ mesh: dot, axis: rand() > 0.5 ? 1 : 0, offset: (rand() - 0.5) * 30, speed: 4 + rand() * 6 });
    scene.add(dot);
  }

  const hazeLight = new THREE.PointLight(new THREE.Color(accentColor), 30, 30);
  hazeLight.position.set(0, 10, -10);
  scene.add(hazeLight);
  const pinkGlow = new THREE.PointLight(0xf472b6, 18, 26);
  pinkGlow.position.set(-10, 6, 0);
  scene.add(pinkGlow);
  scene.add(new THREE.AmbientLight(0x181c30, 1.8));

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
    for (const car of cars) {
      const p = car.mesh.geometry.attributes.position as THREE.BufferAttribute;
      const v = ((t * car.speed + Math.abs(car.offset) * 7) % 70) - 35;
      if (car.axis === 0) p.setXYZ(0, v, 0.25, car.offset);
      else p.setXYZ(0, car.offset, 0.25, v);
      p.needsUpdate = true;
    }
    hazeLight.intensity = 26 + Math.sin(t * 3.1) * 6;
    camera.position.x = Math.sin(t * 0.05) * 3 + 6;
    camera.lookAt(0, 5, -10);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [buildingMat, streetGeo, streetMat, carGeoShared].forEach((g) => g.dispose ? g.dispose() : null);
    winMats.forEach((mt) => mt.dispose());
    cars.forEach((c) => { c.mesh.geometry.dispose(); (c.mesh.material as THREE.Material).dispose(); });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
