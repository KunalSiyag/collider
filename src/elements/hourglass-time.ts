import * as THREE from 'three';

export interface HourglassTimeOptions {
  accentColor?: string;
}

export function createHourglassTime(
  container: HTMLElement,
  options: HourglassTimeOptions = {},
): () => void {
  const { accentColor = '#f472b6' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b0b10, 0.028);
  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 80);
  camera.position.set(5, 4.5, 9);
  camera.lookAt(0, 3.4, 0);

  const frameMat = new THREE.MeshStandardMaterial({ color: 0x2c2438, roughness: 0.5, metalness: 0.7 });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x8ea0c8, roughness: 0.08, metalness: 0.1,
    transparent: true, opacity: 0.14, side: THREE.DoubleSide, depthWrite: false,
  });

  const topCone = new THREE.Mesh(new THREE.ConeGeometry(1.7, 2.6, 32, 1, true), glassMat);
  topCone.rotation.x = Math.PI;
  topCone.position.y = 4.9;
  scene.add(topCone);
  const botCone = new THREE.Mesh(new THREE.ConeGeometry(1.7, 2.6, 32, 1, true), glassMat.clone());
  botCone.position.y = 2;
  scene.add(botCone);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.35, 12), frameMat);
  neck.position.y = 3.45;
  scene.add(neck);
  for (const y of [6.25, 0.65]) {
    const plate = new THREE.Mesh(new THREE.CylinderGeometry(2.15, 2.3, 0.28, 32), frameMat);
    plate.position.y = y;
    scene.add(plate);
  }
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 5.4, 10), frameMat);
    pillar.position.set(Math.cos(a) * 1.95, 3.45, Math.sin(a) * 1.95);
    scene.add(pillar);
  }

  const sandMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor), emissive: new THREE.Color(accentColor), emissiveIntensity: 0.55, roughness: 0.6,
  });
  const topPile = new THREE.Mesh(new THREE.ConeGeometry(1.45, 1.7, 24), sandMat);
  topPile.rotation.x = Math.PI;
  topPile.position.y = 4.75;
  scene.add(topPile);
  const bottomPile = new THREE.Mesh(new THREE.ConeGeometry(1.5, 0.001, 24), sandMat);
  bottomPile.position.y = 1.35;
  scene.add(bottomPile);

  const streamGeo = new THREE.BufferGeometry();
  const SN = 260;
  const sp = new Float32Array(SN * 3);
  for (let i = 0; i < SN; i++) {
    sp[i * 3] = (Math.random() - 0.5) * 0.06;
    sp[i * 3 + 1] = 0.9 + Math.random() * 2.4;
    sp[i * 3 + 2] = (Math.random() - 0.5) * 0.06;
  }
  streamGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  const stream = new THREE.Points(streamGeo, new THREE.PointsMaterial({
    color: new THREE.Color(accentColor), size: 0.05, transparent: true, opacity: 0.95, depthWrite: false,
  }));
  scene.add(stream);

  const orbitDustGeo = new THREE.BufferGeometry();
  const DN = 200;
  const dp = new Float32Array(DN * 3);
  for (let i = 0; i < DN; i++) {
    const a = Math.random() * Math.PI * 2;
    const rr = 3 + Math.random() * 4;
    dp[i * 3] = Math.cos(a) * rr;
    dp[i * 3 + 1] = Math.random() * 8;
    dp[i * 3 + 2] = Math.sin(a) * rr;
  }
  orbitDustGeo.setAttribute('position', new THREE.BufferAttribute(dp, 3));
  const dust = new THREE.Points(orbitDustGeo, new THREE.PointsMaterial({ color: 0xc4b5fd, size: 0.05, transparent: true, opacity: 0.45 }));
  scene.add(dust);

  const glowLight = new THREE.PointLight(new THREE.Color(accentColor), 22, 10);
  glowLight.position.set(0, 3.4, 0.8);
  scene.add(glowLight);
  scene.add(new THREE.AmbientLight(0x2a2138, 1.7));
  const cool = new THREE.DirectionalLight(0xbfd4ff, 0.7);
  cool.position.set(-5, 8, 4);
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
    const cycle = (t % 20) / 20;
    topPile.scale.setY(Math.max(0.02, 1 - cycle));
    bottomPile.scale.setY(Math.max(0.001, cycle));
    const bh = 1.7 * cycle;
    bottomPile.scale.y = Math.max(0.01, cycle);
    bottomPile.position.y = 1.33 + bh / 2;
    const attr = streamGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < SN; i++) {
      let y = attr.getY(i) - 0.045 - (i % 5) * 0.006;
      if (y < 1.35) y = 3.3;
      attr.setY(i, y);
      attr.setX(i, Math.sin(t * 8 + i) * 0.03);
    }
    attr.needsUpdate = true;
    dust.rotation.y = t * 0.05;
    glowLight.intensity = 18 + Math.abs(Math.sin(t * 1.8)) * 10;
    camera.position.x = 5 + Math.sin(t * 0.07) * 1.6;
    camera.lookAt(0, 3.4, 0);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [topCone, botCone].forEach((o) => o.geometry.dispose());
    [streamGeo, orbitDustGeo].forEach((g) => g.dispose());
    [frameMat, glassMat, sandMat].forEach((mt) => mt.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
