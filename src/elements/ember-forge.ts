import * as THREE from 'three';

export interface EmberForgeOptions {
  accentColor?: string;
}

export function createEmberForge(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#f472b6' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0d0a12, 0.05);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 60);
  camera.position.set(3.5, 3, 8);
  camera.lookAt(0, 1.4, 0);

  const stoneMat = new THREE.MeshStandardMaterial({ color: 0x241c2c, roughness: 1 });
  const ironMat = new THREE.MeshStandardMaterial({ color: 0x33303e, roughness: 0.5, metalness: 0.85 });
  const hotMetalMat = new THREE.MeshStandardMaterial({
    color: 0xff9440, emissive: new THREE.Color(0xff7326), emissiveIntensity: 1.6, roughness: 0.4,
  });

  const anvilTop = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.55, 0.9), ironMat);
  anvilTop.position.y = 1.35;
  scene.add(anvilTop);
  const anvilHorn = new THREE.Mesh(new THREE.ConeGeometry(0.45, 1.2, 10), ironMat);
  anvilHorn.rotation.z = Math.PI / 2;
  anvilHorn.position.set(1.75, 1.35, 0);
  scene.add(anvilHorn);
  const anvilBase = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.15, 0.8), stoneMat);
  anvilBase.position.y = 0.57;
  scene.add(anvilBase);

  const workpiece = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.22, 0.34), hotMetalMat);
  workpiece.position.y = 1.74;
  scene.add(workpiece);

  const hammerGroup = new THREE.Group();
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 2.2, 8), new THREE.MeshStandardMaterial({ color: 0x4a3620, roughness: 0.9 }));
  handle.rotation.z = Math.PI / 2;
  handle.position.x = -1.1;
  hammerGroup.add(handle);
  const headM = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.42, 0.42), ironMat);
  hammerGroup.add(headM);
  hammerGroup.position.set(0, 4.4, -0.6);
  scene.add(hammerGroup);

  const SPARK_N = 500;
  const sparkGeo = new THREE.BufferGeometry();
  const spos = new Float32Array(SPARK_N * 3);
  const svel = new Float32Array(SPARK_N * 3);
  for (let i = 0; i < SPARK_N; i++) {
    spos[i * 3] = 0; spos[i * 3 + 1] = -99; spos[i * 3 + 2] = 0;
    svel[i * 3] = 0; svel[i * 3 + 1] = 0; svel[i * 3 + 2] = 0;
  }
  sparkGeo.setAttribute('position', new THREE.BufferAttribute(spos, 3));
  const sparks = new THREE.Points(sparkGeo, new THREE.PointsMaterial({
    color: 0xffb35c, size: 0.07, transparent: true, opacity: 0.95,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  scene.add(sparks);

  let seed = 777;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const forgeLight = new THREE.PointLight(0xff7326, 30, 12);
  forgeLight.position.set(0, 2.4, 0.6);
  scene.add(forgeLight);
  scene.add(new THREE.AmbientLight(0x201828, 1.5));

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
  let strikeTimer = 0.8;
  function tick() {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.getElapsedTime();
    strikeTimer -= dt;
    if (strikeTimer <= 0) {
      strikeTimer = 1.4 + rand() * 1.2;
      for (let i = 0; i < 40; i++) {
        const idx = i;
        spos[idx * 3] = workpiece.position.x + (rand() - 0.5) * 1.2;
        spos[idx * 3 + 1] = 1.8;
        spos[idx * 3 + 2] = workpiece.position.z + (rand() - 0.5) * 0.3;
        svel[idx * 3] = (rand() - 0.5) * 3;
        svel[idx * 3 + 1] = 2 + rand() * 3;
        svel[idx * 3 + 2] = (rand() - 0.5) * 3;
      }
      hotMetalMat.emissiveIntensity = 3;
    }
    hotMetalMat.emissiveIntensity += (1.4 - hotMetalMat.emissiveIntensity) * dt * 2.5;
    const attr = sparkGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < SPARK_N; i++) {
      if (spos[i * 3 + 1] < -50) continue;
      svel[i * 3 + 1] -= 9 * dt;
      spos[i * 3] += svel[i * 3] * dt;
      spos[i * 3 + 1] += svel[i * 3 + 1] * dt;
      spos[i * 3 + 2] += svel[i * 3 + 2] * dt;
      if (spos[i * 3 + 1] < 0.05) spos[i * 3 + 1] = -99;
    }
    attr.needsUpdate = true;
    const cycle = Math.max(0, strikeTimer);
    const swing = Math.sin(Math.min(cycle * 3.2, Math.PI));
    hammerGroup.position.y = 1.74 + swing * 2.4;
    hammerGroup.rotation.z = -swing * 0.5;
    forgeLight.intensity = 26 + hotMetalMat.emissiveIntensity * 8 + Math.sin(t * 7) * 3;
    camera.position.x = Math.sin(t * 0.07) * 1.4 + 3.5;
    camera.lookAt(0, 1.6, 0);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [anvilTop, anvilHorn].forEach((o) => o.geometry.dispose());
    [stoneMat, ironMat, hotMetalMat, sparkGeo].forEach((g) => g.dispose ? g.dispose() : null);
    renderer.dispose();
    renderer.domElement.remove();
  };
}
