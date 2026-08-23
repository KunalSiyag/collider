import * as THREE from 'three';

export interface BuriedColossusOptions {
  accentColor?: string;
}

export function createBuriedColossus(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#8b5cf6' } = options;
  let seed = 99977;
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
  scene.fog = new THREE.FogExp2(0x14101c, 0.035);
  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 120);
  camera.position.set(2, 2.5, 14);
  camera.lookAt(-1, 4, -6);

  const stoneMat = new THREE.MeshStandardMaterial({ color: 0x3a3350, roughness: 1, flatShading: true });
  const head = new THREE.Group();

  const skull = new THREE.Mesh(new THREE.SphereGeometry(4.6, 28, 20), stoneMat);
  skull.scale.set(1, 1.25, 0.85);
  head.add(skull);

  const eyeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor) });
  for (const sx of [-1.55, 1.55]) {
    const socket = new THREE.Mesh(new THREE.SphereGeometry(0.62, 16, 12), new THREE.MeshStandardMaterial({ color: 0x191426, roughness: 1 }));
    socket.position.set(sx, 1, 3.65);
    socket.scale.set(1, 0.7, 0.5);
    head.add(socket);
    const iris = new THREE.Mesh(new THREE.SphereGeometry(0.26, 12, 10), eyeMat);
    iris.position.set(sx, 1, 3.95);
    head.add(iris);
  }
  const nose = new THREE.Mesh(new THREE.BoxGeometry(0.9, 2.4, 1.4), stoneMat);
  nose.position.set(0, -0.6, 4.05);
  head.add(nose);
  for (const sy of [0, 1]) {
    const brow = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.45, 0.8), stoneMat);
    brow.position.set(sy ? 1.55 : -1.55, 2.15, 3.75);
    brow.rotation.z = sy ? -0.22 : 0.22;
    head.add(brow);
  }
  head.position.set(-2, 2.4, -8);
  head.rotation.y = 0.35;
  scene.add(head);

  const duneGeo = new THREE.PlaneGeometry(90, 60, 36, 20);
  const dpos = duneGeo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < dpos.count; i++) {
    const x = dpos.getX(i), y = dpos.getY(i);
    dpos.setZ(i, Math.sin(x * 0.07 + 1) * 1.8 + Math.cos(y * 0.11) * 1.1 + rand() * 0.3);
  }
  duneGeo.computeVertexNormals();
  const dunes = new THREE.Mesh(duneGeo, new THREE.MeshStandardMaterial({ color: 0x241c33, roughness: 1 }));
  dunes.rotation.x = -Math.PI / 2;
  dunes.position.y = -0.5;
  scene.add(dunes);

  const sandStormGeo = new THREE.BufferGeometry();
  const SN = 420;
  const sp = new Float32Array(SN * 3);
  for (let i = 0; i < SN; i++) {
    sp[i * 3] = (rand() - 0.5) * 40;
    sp[i * 3 + 1] = rand() * 7;
    sp[i * 3 + 2] = (rand() - 0.5) * 30;
  }
  sandStormGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  const storm = new THREE.Points(sandStormGeo, new THREE.PointsMaterial({ color: 0x9a86b8, size: 0.08, transparent: true, opacity: 0.45 }));
  scene.add(storm);

  const eyeLight = new THREE.PointLight(new THREE.Color(accentColor), 18, 18);
  eyeLight.position.set(-2, 3.6, -3.5);
  scene.add(eyeLight);
  scene.add(new THREE.AmbientLight(0x2a2138, 1.7));
  const duskL = new THREE.DirectionalLight(0xc4b0e8, 1.2);
  duskL.position.set(-10, 8, 6);
  scene.add(duskL);

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
  let blinkTimer = 2;
  const clock = new THREE.Clock();
  function tick() {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.getElapsedTime();
    blinkTimer -= dt;
    const closed = blinkTimer < 0.12 && blinkTimer > -0.02;
    eyeMat.color.copy(new THREE.Color(accentColor)).multiplyScalar(closed ? 0.05 : 1);
    if (blinkTimer < -0.02) blinkTimer = 2 + rand() * 3;
    const sa = sandStormGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < SN; i++) {
      sa.setX(i, sa.getX(i) + 0.06);
      sa.setY(i, sa.getY(i) + Math.sin(t * 3 + i) * 0.004);
      if (sa.getX(i) > 20) sa.setX(i, -20);
    }
    sa.needsUpdate = true;
    camera.position.x = Math.sin(t * 0.05) * 2 + 2;
    camera.lookAt(-1, 4, -6);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [skull.geometry, duneGeo, sandStormGeo].forEach((g) => g.dispose());
    [stoneMat].forEach((mt) => mt.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
