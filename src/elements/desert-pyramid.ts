import * as THREE from 'three';

export interface DesertPyramidOptions {
  accentColor?: string;
}

export function createDesertPyramid(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#f472b6' } = options;
  let seed = 73556;
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
  scene.fog = new THREE.Fog(0x140f1e, 20, 70);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 150);
  camera.position.set(9, 4, 15);
  camera.lookAt(0, 3, -4);

  const pyramid = new THREE.Mesh(
    new THREE.ConeGeometry(7.5, 8.5, 4),
    new THREE.MeshStandardMaterial({ color: 0x2c2340, roughness: 0.95, flatShading: true }),
  );
  pyramid.rotation.y = Math.PI / 4;
  pyramid.position.set(0, 4.25, -5);
  scene.add(pyramid);

  const capstone = new THREE.Mesh(
    new THREE.ConeGeometry(1, 1.2, 4),
    new THREE.MeshStandardMaterial({
      color: 0xffd98a, emissive: new THREE.Color(accentColor), emissiveIntensity: 1.4,
      roughness: 0.3, metalness: 0.7,
    }),
  );
  capstone.rotation.y = Math.PI / 4;
  capstone.position.set(0, 9, -5);
  scene.add(capstone);

  const scanPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(11, 11),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor), transparent: true, opacity: 0.14,
      side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false,
    }),
  );
  scene.add(scanPlane);

  const duneGeo = new THREE.PlaneGeometry(120, 80, 30, 18);
  const dpos = duneGeo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < dpos.count; i++) {
    dpos.setZ(i, Math.sin(dpos.getX(i) * 0.08) * 2 + Math.cos(dpos.getY(i) * 0.12) * 1.2 + rand() * 0.2);
  }
  duneGeo.computeVertexNormals();
  const dunes = new THREE.Mesh(duneGeo, new THREE.MeshStandardMaterial({ color: 0x241a30, roughness: 1, flatShading: true }));
  dunes.rotation.x = -Math.PI / 2;
  dunes.position.y = -0.4;
  scene.add(dunes);

  const starGeo = new THREE.BufferGeometry();
  const SN = 700;
  const sp = new Float32Array(SN * 3);
  for (let i = 0; i < SN; i++) {
    sp[i * 3] = (Math.random() - 0.5) * 160;
    sp[i * 3 + 1] = Math.random() * 60 + 5;
    sp[i * 3 + 2] = -Math.random() * 100;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xe0d8ff, size: 0.16, transparent: true, opacity: 0.85 }));
  scene.add(stars);

  const sandDustGeo = new THREE.BufferGeometry();
  const DN = 260;
  const dp = new Float32Array(DN * 3);
  for (let i = 0; i < DN; i++) {
    dp[i * 3] = (rand() - 0.5) * 40;
    dp[i * 3 + 1] = rand() * 4;
    dp[i * 3 + 2] = (rand() - 0.5) * 30;
  }
  sandDustGeo.setAttribute('position', new THREE.BufferAttribute(dp, 3));
  const dust = new THREE.Points(sandDustGeo, new THREE.PointsMaterial({ color: 0x8a76a8, size: 0.09, transparent: true, opacity: 0.4 }));
  scene.add(dust);

  const capLight = new THREE.PointLight(new THREE.Color(accentColor), 34, 22);
  capLight.position.set(0, 9.5, -5);
  scene.add(capLight);
  scene.add(new THREE.AmbientLight(0x2a2140, 1.6));
  const moonL = new THREE.DirectionalLight(0xcfd4ff, 1.1);
  moonL.position.set(-12, 16, -4);
  scene.add(moonL);

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
    scanPlane.position.set(0, 4.5 + Math.sin(t * 0.7) * 3.6, -5);
    scanPlane.lookAt(camera.position);
    capLight.intensity = 28 + Math.abs(Math.sin(t * 2.2)) * 14;
    capstone.rotation.y = Math.PI / 4 + t * 0.3;
    const dattr = sandDustGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < DN; i++) {
      dattr.setX(i, dattr.getX(i) + 0.03);
      if (dattr.getX(i) > 20) dattr.setX(i, -20);
      dattr.setY(i, Math.max(0, dattr.getY(i) + Math.sin(t * 2 + i) * 0.004));
    }
    dattr.needsUpdate = true;
    camera.position.x = 9 + Math.sin(t * 0.05) * 2;
    camera.lookAt(0, 3.5, -4);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [starGeo, sandDustGeo].forEach((g) => g.dispose());
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh || o instanceof THREE.Points) {
        if (o.geometry !== starGeo && o.geometry !== sandDustGeo) o.geometry.dispose();
        if ('material' in o && o.material instanceof THREE.Material) o.material.dispose();
      }
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
