import * as THREE from 'three';

export interface SkyElevatorOptions {
  accentColor?: string;
}

export function createSkyElevator(
  container: HTMLElement,
  options: SkyElevatorOptions = {},
): () => void {
  const { accentColor = '#8b5cf6' } = options;
  let seed = 11235;
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
  scene.fog = new THREE.Fog(0x131022, 18, 70);
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
  camera.position.set(10, 5, 14);
  camera.lookAt(0, 12, -4);

  const ribbonMat = new THREE.MeshStandardMaterial({
    color: 0x2a2344, roughness: 0.5, metalness: 0.6,
    emissive: new THREE.Color(accentColor), emissiveIntensity: 0.15,
  });
  const tether = new THREE.Mesh(new THREE.BoxGeometry(0.7, 90, 0.25), ribbonMat);
  tether.position.set(0, 45, -4);
  scene.add(tether);

  const climber = new THREE.Group();
  const podMat = new THREE.MeshStandardMaterial({
    color: 0x3a3156, roughness: 0.4, metalness: 0.5,
    emissive: new THREE.Color(accentColor), emissiveIntensity: 0.3,
  });
  const pod = new THREE.Mesh(new THREE.CapsuleGeometry(0.9, 1.6, 6, 14), podMat);
  climber.add(pod);
  const winMat = new THREE.MeshBasicMaterial({ color: 0xffd98a });
  for (let i = 0; i < 4; i++) {
    const win = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.28, 0.02), winMat);
    win.position.set(0, -0.5 + i * 0.42, 0.92);
    climber.add(win);
  }
  scene.add(climber);

  const padRings: THREE.Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor), transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const ring = new THREE.Mesh(new THREE.RingGeometry(3 + i * 1.6, 3.2 + i * 1.6, 60), ringMat2);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.05;
    padRings.push(ring);
    scene.add(ring);
  }
  const pad = new THREE.Mesh(new THREE.CylinderGeometry(3, 3.6, 1, 32), ribbonMat.clone());
  pad.position.y = 0.5;
  scene.add(pad);

  const clouds: { mesh: THREE.Mesh; speed: number }[] = [];
  for (let i = 0; i < 10; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: 0x39304f,       transparent: true, opacity: 0.16 + rand() * 0.14, depthWrite: false, side: THREE.DoubleSide,
    });
    const w = 8 + rand() * 14;
    const h = 2 + rand() * 3;
    const cloud = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    cloud.position.set((rand() - 0.5) * 40, 4 + rand() * 26, -8 - rand() * 20);
    clouds.push({ mesh: cloud, speed: 0.3 + rand() * 0.7 });
    scene.add(cloud);
  }

  const groundGeo = new THREE.PlaneGeometry(120, 80, 24, 16);
  const gpos = groundGeo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < gpos.count; i++) gpos.setZ(i, Math.sin(gpos.getX(i) * 0.2) * 1.4 + Math.cos(gpos.getY(i) * 0.3) * 1.2);
  groundGeo.computeVertexNormals();
  const ground = new THREE.Mesh(groundGeo, new THREE.MeshStandardMaterial({ color: 0x191430, roughness: 1, flatShading: true }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.z = -10;
  scene.add(ground);

  scene.add(new THREE.AmbientLight(0x2c2444, 1.8));
  const dusk = new THREE.DirectionalLight(0xd8a5ff, 1.5);
  dusk.position.set(-8, 12, 6);
  scene.add(dusk);
  const beacon = new THREE.PointLight(new THREE.Color(accentColor), 30, 30);
  beacon.position.set(0, 20, -4);
  scene.add(beacon);

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
    const cycle = (Math.sin(t * 0.25) + 1) / 2;
    climber.position.set(0, 1.5 + cycle * 34, -4 + 0.75);
    climber.rotation.y = Math.sin(t * 0.4) * 0.08;
    padRings.forEach((r, i) => {
      const s = ((t * 0.4 + i / 3) % 1);
      r.scale.setScalar(0.4 + s * 1.4);
      (r.material as THREE.MeshBasicMaterial).opacity = (1 - s) * 0.5;
    });
    for (const c of clouds) {
      c.mesh.position.x += c.speed * 0.01;
      if (c.mesh.position.x > 24) c.mesh.position.x = -24;
      c.mesh.lookAt(camera.position);
    }
    camera.position.y = 4 + Math.sin(t * 0.1) * 1.5;
    camera.position.x = 10 + Math.sin(t * 0.06) * 2;
    camera.lookAt(0, 6 + cycle * 12, -4);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [ribbonMat, podMat, winMat, ground.material as THREE.Material].forEach((mt) => mt.dispose());
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh || o instanceof THREE.Points) o.geometry.dispose();
      if ('material' in o && o.material instanceof THREE.Material && o.material !== ribbonMat && o.material !== podMat && o.material !== winMat) o.material.dispose();
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
