import * as THREE from 'three';

export interface MoonGateOptions {
  accentColor?: string;
}

export function createMoonGate(
  container: HTMLElement,
  options: MoonGateOptions = {},
): () => void {
  const { accentColor = '#f472b6' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0e1020, 0.028);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 150);
  camera.position.set(0, 1.6, 13);
  camera.lookAt(0, 3, -4);

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(5.2, 40, 30),
    new THREE.MeshBasicMaterial({ color: 0xe8e4f5 }),
  );
  moon.position.set(-3, 8.5, -34);
  scene.add(moon);

  const woodMat = new THREE.MeshStandardMaterial({ color: 0xb04a4a, roughness: 0.75 });
  const gate = new THREE.Group();

  for (const sx of [-1.9, 1.9]) {
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.19, 5, 10), woodMat);
    pillar.position.set(sx, 2.5, 0);
    gate.add(pillar);
  }
  const topBeam = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.28, 0.42), woodMat);
  topBeam.position.y = 5.35;
  topBeam.rotation.z = -0.05;
  gate.add(topBeam);
  const midBeam = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.32, 0.36), woodMat);
  midBeam.position.y = 4.35;
  gate.add(midBeam);
  const lanternMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor) });
  for (const sx of [-1.9, 1.9]) {
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 10), lanternMat);
    lamp.position.set(sx, 3.9, 0.25);
    gate.add(lamp);
  }
  scene.add(gate);

  const waterY = 0;
  function makeMirror(source: THREE.Object3D): THREE.Object3D {
    const copy = source.clone(true);
    copy.scale.y = -1;
    return copy;
  }
  const mirrorRoot = new THREE.Group();
  mirrorRoot.add(makeMirror(gate));
  mirrorRoot.add(makeMirror(moon));
  mirrorRoot.traverse((o) => {
    if ('material' in o && o.material instanceof THREE.MeshStandardMaterial) {
      o.material = o.material.clone();
      o.material.transparent = true;
      o.material.opacity = 0.28;
    } else if ('material' in o && o.material instanceof THREE.MeshBasicMaterial) {
      o.material = o.material.clone();
      o.material.transparent = true;
      o.material.opacity = 0.22;
    }
  });
  scene.add(mirrorRoot);

  const waterGeo = new THREE.PlaneGeometry(90, 60, 50, 30);
  const waterMat = new THREE.MeshStandardMaterial({ color: 0x0d1226, roughness: 0.15, metalness: 0.65, transparent: true, opacity: 0.82 });
  const water = new THREE.Mesh(waterGeo, waterMat);
  water.rotation.x = -Math.PI / 2;
  water.position.y = waterY;
  scene.add(water);
  const wpos = waterGeo.attributes.position as THREE.BufferAttribute;

  const starGeo = new THREE.BufferGeometry();
  const sn = 700;
  const spos = new Float32Array(sn * 3);
  for (let i = 0; i < sn; i++) {
    spos[i * 3] = (Math.random() - 0.5) * 110;
    spos[i * 3 + 1] = Math.random() * 60 + 4;
    spos[i * 3 + 2] = -Math.random() * 90 - 10;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(spos, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xcdd6ff, size: 0.12, transparent: true, opacity: 0.85 }));
  scene.add(stars);

  scene.add(new THREE.AmbientLight(0x232a4a, 1.8));
  const moonLight = new THREE.DirectionalLight(0xdfe4ff, 1.6);
  moonLight.position.copy(moon.position);
  scene.add(moonLight);
  const warm = new THREE.PointLight(new THREE.Color(accentColor), 8, 10);
  warm.position.set(0, 4, 1);
  scene.add(warm);

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
      const x = wpos.getX(i), y = wpos.getY(i);
      const d = Math.hypot(x, y + 4);
      wpos.setZ(i, Math.sin(d * 0.9 - t * 1.6) * 0.06 + Math.sin(x * 0.4 + t) * 0.04);
    }
    wpos.needsUpdate = true;
    water.geometry.computeVertexNormals();
    lanternMat.color.copy(new THREE.Color(accentColor)).multiplyScalar(0.7 + Math.abs(Math.sin(t * 2.4)) * 0.4);
    camera.position.x = Math.sin(t * 0.06) * 1.6;
    camera.lookAt(0, 3, -4);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    waterGeo.dispose(); starGeo.dispose();
    [woodMat, lanternMat, waterMat].forEach((mt) => mt.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
