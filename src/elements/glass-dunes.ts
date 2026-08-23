import * as THREE from 'three';

export interface GlassDunesOptions {
  accentColor?: string;
}

export function createGlassDunes(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#f472b6' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x1a1024, 18, 80);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 160);
  camera.position.set(0, 5, 20);
  camera.lookAt(0, 0, -10);

  const duneGeo = new THREE.PlaneGeometry(90, 60, 70, 40);
  const dpos = duneGeo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < dpos.count; i++) {
    const x = dpos.getX(i), y = dpos.getY(i);
    dpos.setZ(i, Math.sin(x * 0.09) * 3.4 + Math.sin(y * 0.14 + x * 0.05) * 2.2 + Math.cos(x * 0.31 + y * 0.22) * 0.7);
  }
  duneGeo.computeVertexNormals();
  const duneMat = new THREE.MeshPhongMaterial({
    color: 0x3d2b52,
    specular: 0xd8b8ff,
    shininess: 90,
    flatShading: false,
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.05,
  });
  const dunes = new THREE.Mesh(duneGeo, duneMat);
  dunes.rotation.x = -Math.PI / 2;
  dunes.position.y = -2;
  scene.add(dunes);

  const ridgeGeo = new THREE.PlaneGeometry(90, 60);
  const rpos = ridgeGeo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < rpos.count; i++) {
    const x = rpos.getX(i), y = rpos.getY(i);
    rpos.setZ(i, Math.max(0, Math.sin(x * 0.09) * 3.4 + Math.sin(y * 0.14 + x * 0.05) * 2.2) + Math.abs(Math.cos(x * 0.31 + y * 0.22)) * 0.7 + 0.02);
  }
  ridgeGeo.computeVertexNormals();
  const ridgeMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(accentColor), transparent: true, opacity: 0.16,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const ridge = new THREE.Mesh(ridgeGeo, ridgeMat);
  ridge.rotation.x = -Math.PI / 2;
  ridge.position.y = -1.98;
  scene.add(ridge);

  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(2.6, 32, 24),
    new THREE.MeshBasicMaterial({ color: 0xffc9de }),
  );
  sun.position.set(-16, 4.5, -46);
  scene.add(sun);

  const starGeo = new THREE.BufferGeometry();
  const SN = 600;
  const sp = new Float32Array(SN * 3);
  for (let i = 0; i < SN; i++) {
    sp[i * 3] = (Math.random() - 0.5) * 150;
    sp[i * 3 + 1] = Math.random() * 55 + 6;
    sp[i * 3 + 2] = -40 - Math.random() * 70;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xe4dcff, size: 0.15, transparent: true, opacity: 0.8 }));
  scene.add(stars);

  const sunLight = new THREE.DirectionalLight(0xff9ecf, 1.8);
  sunLight.position.copy(sun.position);
  scene.add(sunLight);
  const fillLight = new THREE.PointLight(new THREE.Color(accentColor), 24, 40);
  fillLight.position.set(10, 8, 4);
  scene.add(fillLight);
  scene.add(new THREE.AmbientLight(0x2c1e3e, 1.6));

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
    stars.rotation.y = t * 0.004;
    sun.position.x = -16 + Math.sin(t * 0.08) * 6;
    sun.position.y = 4.5 + Math.cos(t * 0.08) * 1.5;
    sunLight.position.copy(sun.position);
    camera.position.x = Math.sin(t * 0.06) * 3;
    camera.lookAt(0, -0.5, -12);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [duneGeo, ridgeGeo, starGeo].forEach((g) => g.dispose());
    [duneMat, ridgeMat].forEach((mt) => mt.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
