import * as THREE from 'three';

export interface PlanetRiseOptions {
  accentColor?: string;
}

export function createPlanetRise(
  container: HTMLElement,
  options: PlanetRiseOptions = {},
): () => void {
  const { accentColor = '#a78bfa' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0b0b10, 30, 120);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 400);
  camera.position.set(0, 1.4, 16);
  camera.lookAt(0, 6, -20);

  const planet = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x5d4a8f, roughness: 0.9, flatShading: true,
    emissive: new THREE.Color(accentColor), emissiveIntensity: 0.08,
  });
  const sphereGeo = new THREE.SphereGeometry(22, 48, 32);
  const posAttr = sphereGeo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < posAttr.count; i++) {
    const n = 1 + (Math.sin(posAttr.getX(i) * 0.5) * Math.cos(posAttr.getZ(i) * 0.7) + Math.sin(posAttr.getY(i) * 0.9)) * 0.02;
    posAttr.setXYZ(i, posAttr.getX(i) * n, posAttr.getY(i) * n, posAttr.getZ(i) * n);
  }
  sphereGeo.computeVertexNormals();
  const body = new THREE.Mesh(sphereGeo, bodyMat);
  planet.add(body);

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(23.2, 40, 28),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor), transparent: true, opacity: 0.12,
      side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false,
    }),
  );
  planet.add(atmosphere);

  const ringGeo = new THREE.RingGeometry(29, 38, 90);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0xd8cfe8, transparent: true, opacity: 0.35, side: THREE.DoubleSide,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2.25;
  ring.rotation.y = 0.3;
  planet.add(ring);
  planet.position.set(-6, 10, -55);
  planet.rotation.z = -0.15;
  scene.add(planet);

  const starGeo = new THREE.BufferGeometry();
  const sn = 1100;
  const sp = new Float32Array(sn * 3);
  for (let i = 0; i < sn; i++) {
    sp[i * 3] = (Math.random() - 0.5) * 220;
    sp[i * 3 + 1] = Math.random() * 90;
    sp[i * 3 + 2] = -Math.random() * 180;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xdde4ff, size: 0.18, transparent: true, opacity: 0.85 }));
  scene.add(stars);

  const ridgeMat = new THREE.MeshStandardMaterial({ color: 0x14101e, roughness: 1, flatShading: true });
  for (let i = 0; i < 14; i++) {
    const peak = new THREE.Mesh(new THREE.ConeGeometry(3 + (i % 3), 4 + ((i * 7) % 9), 5), ridgeMat);
    peak.position.set((i - 7) * 3.6 + (i % 2), 1.2 + ((i * 5) % 4) * 0.4, 2 + (i % 4) * 2);
    peak.rotation.y = i;
    scene.add(peak);
  }
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 60), ridgeMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = 0;
  scene.add(ground);

  scene.add(new THREE.AmbientLight(0x241f36, 1.8));
  const sunGlow = new THREE.DirectionalLight(0xcfc0ff, 1.6);
  sunGlow.position.set(-30, 12, -20);
  scene.add(sunGlow);

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
  let risen = 0;
  function tick() {
    raf = requestAnimationFrame(tick);
    const t = clock.getElapsedTime();
    risen += 0.0006;
    planet.position.y = 10 + Math.min(risen, 1) * 4;
    planet.rotation.y = t * 0.03;
    ring.rotation.z = t * 0.01;
    stars.rotation.y = t * 0.004;
    camera.position.x = Math.sin(t * 0.05) * 2.5;
    camera.lookAt(-4, 8, -40);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [sphereGeo, atmosphere.geometry, ringGeo, starGeo].forEach((g) => g.dispose());
    [bodyMat, atmosphere.material as THREE.Material, ringMat].forEach((mt) => mt.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
