import * as THREE from 'three';

export interface OrigamiFlockOptions {
  accentColor?: string;
}

export function createOrigamiFlock(
  container: HTMLElement,
  options: OrigamiFlockOptions = {},
): () => void {
  const { accentColor = '#a78bfa' } = options;
  let seed = 991;
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
  scene.fog = new THREE.Fog(0x14101f, 16, 60);
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 150);
  camera.position.set(0, 1.5, 15);

  const paperMat = new THREE.MeshStandardMaterial({
    color: 0xf3effc,
    roughness: 0.85,
    side: THREE.DoubleSide,
    flatShading: true,
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.06,
  });
  const edgeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor), transparent: true, opacity: 0.5 });

  const birds: { group: THREE.Group; wingL: THREE.Mesh; wingR: THREE.Mesh; phase: number; radius: number; speed: number; yOff: number }[] = [];
  const bodyGeo = new THREE.ConeGeometry(0.12, 1.1, 4);
  const wingGeo = new THREE.BufferGeometry();
  wingGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0, 0, 0, 1.1, 0, -0.25, 0.9, 0, 0.45]), 3));
  wingGeo.computeVertexNormals();

  for (let i = 0; i < 22; i++) {
    const g = new THREE.Group();
    const body = new THREE.Mesh(bodyGeo, paperMat);
    body.rotation.x = Math.PI / 2;
    g.add(body);
    const keelGeo = new THREE.BufferGeometry();
    keelGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0, 0.28, 0, 0, -0.18, 0.35, 0, -0.05, -0.4]), 3));
    keelGeo.computeVertexNormals();
    g.add(new THREE.Mesh(keelGeo, paperMat));
    const wingL = new THREE.Mesh(wingGeo.clone(), paperMat);
    const wingR = new THREE.Mesh(wingGeo.clone(), paperMat);
    g.add(wingL);
    g.add(wingR);
    const trail = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.5, 0, 0), new THREE.Vector3(-1.4, 0, 0)]),
      edgeMat,
    );
    g.add(trail);
    g.scale.setScalar(0.7 + rand() * 0.7);
    scene.add(g);
    birds.push({ group: g, wingL, wingR, phase: rand() * Math.PI * 2, radius: 4 + rand() * 8, speed: 0.25 + rand() * 0.35, yOff: (rand() - 0.5) * 7 });
  }

  scene.add(new THREE.AmbientLight(0x8a80b0, 1.8));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(5, 8, 6);
  scene.add(key);
  const glow = new THREE.PointLight(new THREE.Color(accentColor), 24, 40);
  glow.position.set(0, -2, 4);
  scene.add(glow);

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
    for (const b of birds) {
      const a = t * b.speed + b.phase;
      b.group.position.set(Math.cos(a) * b.radius, b.yOff + Math.sin(a * 2.3) * 0.8, Math.sin(a) * b.radius * 0.7);
      b.group.rotation.y = -a - Math.PI / 2;
      b.group.rotation.z = Math.cos(a * 2.3) * 0.25;
      const flap = Math.sin(t * 7 + b.phase) * 0.75;
      b.wingL.rotation.x = flap;
      b.wingR.rotation.x = flap;
      b.wingR.scale.z = -1;
      b.wingR.rotation.x = flap;
    }
    camera.position.y = 1.5 + Math.sin(t * 0.2) * 0.6;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    bodyGeo.dispose(); wingGeo.dispose(); edgeMat.dispose();
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh || o instanceof THREE.Line) o.geometry.dispose();
      if ('material' in o && o.material instanceof THREE.Material && o.material !== edgeMat) o.material.dispose();
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
