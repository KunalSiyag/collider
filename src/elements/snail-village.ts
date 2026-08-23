import * as THREE from 'three';

export interface SnailVillageOptions {
  accentColor?: string;
}

export function createSnailVillage(
  container: HTMLElement,
  options: SnailVillageOptions = {},
): () => void {
  const { accentColor = '#8b5cf6' } = options;
  let seed = 5512;
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
  scene.fog = new THREE.Fog(0x14101f, 16, 50);
  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 120);
  camera.position.set(-4, 4.2, 12);
  camera.lookAt(1, 2.2, 0);

  const snail = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x3d3554, roughness: 0.7 });
  const body = new THREE.Mesh(new THREE.SphereGeometry(1.15, 24, 18), bodyMat);
  body.scale.set(2.1, 0.75, 1);
  body.position.y = 0.75;
  snail.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.55, 18, 14), bodyMat);
  head.position.set(2.25, 1.05, 0);
  snail.add(head);
  for (const s of [-1, 1]) {
    const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.9, 6), bodyMat);
    stalk.position.set(2.45, 1.85, s * 0.22);
    stalk.rotation.z = -0.35;
    snail.add(stalk);
    const eye = new THREE.Mesh(
      new THREE.SphereGeometry(0.11, 10, 8),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor) }),
    );
    eye.position.set(2.62, 2.28, s * 0.24);
    eye.name = 'eye';
    snail.add(eye);
  }

  const shell = new THREE.Group();
  const shellMat = new THREE.MeshStandardMaterial({ color: 0x6b5230, roughness: 0.55, metalness: 0.1 });
  for (let i = 0; i < 4; i++) {
    const r = 2 - i * 0.42;
    if (r <= 0.1) break;
    const coil = new THREE.Mesh(new THREE.TorusGeometry(r, 0.34 + i * 0.05, 14, 40), shellMat);
    coil.rotation.x = Math.PI / 2;
    coil.position.y = 0.12 * i;
    shell.add(coil);
  }
  shell.position.set(-0.9, 2.05, 0);
  shell.rotation.z = 0.12;
  snail.add(shell);

  const wallMat = new THREE.MeshStandardMaterial({ color: 0xd8cbb2, roughness: 0.9 });
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, roughness: 0.6, emissive: new THREE.Color(accentColor), emissiveIntensity: 0.25 });
  const winMat = new THREE.MeshBasicMaterial({ color: 0xffd98a });
  for (let i = 0; i < 5; i++) {
    const a = rand() * Math.PI * 2;
    const rr = 1.1 + rand() * 0.5;
    const hx = -0.9 + Math.cos(a) * rr;
    const hz = Math.sin(a) * rr;
    const hy = 2.05 + 0.12 * Math.floor(rand() * 4) + Math.sqrt(rr) * 0.32;
    const house = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.44, 0.5), wallMat);
    house.add(base);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.38, 4), roofMat);
    roof.position.y = 0.41;
    roof.rotation.y = Math.PI / 4;
    house.add(roof);
    const win = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.16, 0.02), winMat);
    win.position.set(0, 0.02, 0.26);
    house.add(win);
    house.position.set(hx, hy + 0.22, hz);
    house.lookAt(-0.9, hy + 0.22, 0);
    snail.add(house);
  }
  scene.add(snail);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(80, 60, 30, 20),
    new THREE.MeshStandardMaterial({ color: 0x1c1730, roughness: 1 }),
  );
  ground.rotation.x = -Math.PI / 2;
  const gpos = ground.geometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < gpos.count; i++) gpos.setZ(i, Math.sin(gpos.getX(i) * 0.3) * 0.3 + Math.cos(gpos.getY(i) * 0.25) * 0.25);
  gpos.needsUpdate = true;
  scene.add(ground);

  scene.add(new THREE.AmbientLight(0x39304f, 1.7));
  const moonLight = new THREE.DirectionalLight(0xcfd8ff, 1.3);
  moonLight.position.set(-6, 9, 4);
  scene.add(moonLight);
  const lampGlow = new THREE.PointLight(0xffd98a, 10, 8);
  lampGlow.position.set(-0.4, 3, 1.4);
  scene.add(lampGlow);

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
    snail.position.z = ((t * 0.35) % 26) - 13;
    snail.rotation.z = Math.sin(t * 1.6) * 0.02;
    body.scale.y = 0.75 + Math.sin(t * 1.6) * 0.03;
    shell.rotation.y += 0.0008;
    camera.lookAt(snail.position.x + 0.6, 2.4, snail.position.z);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [body, head].forEach((o) => o.geometry.dispose());
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh && o.geometry !== body.geometry && o.geometry !== head.geometry) o.geometry.dispose();
      if ('material' in o && o.material instanceof THREE.Material) o.material.dispose();
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
