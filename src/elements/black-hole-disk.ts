import * as THREE from 'three';

export interface BlackHoleDiskOptions {
  accentColor?: string;
  speed?: number;
}

export function createBlackHoleDisk(
  container: HTMLElement,
  options: BlackHoleDiskOptions = {},
): () => void {
  const { accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 60);
  camera.position.set(2.6, 1.9, 4.4);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.15));
  const rimLight = new THREE.PointLight(new THREE.Color(accentColor), 40);
  rimLight.position.set(-5, 3, -2);
  scene.add(rimLight);

  const group = new THREE.Group();
  scene.add(group);

  // Event horizon: pure black sphere
  const holeMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const hole = new THREE.Mesh(new THREE.SphereGeometry(0.55, 32, 24), holeMat);
  group.add(hole);

  // Photon ring
  const photonMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#ffb347'),
    transparent: true,
    opacity: 0.9,
  });
  const photonRing = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.03, 10, 80), photonMat);
  group.add(photonRing);

  // Accretion disk built from orbiting hot particles as instanced quads
  const COUNT = 900;
  const diskGeo = new THREE.PlaneGeometry(0.05, 0.02);
  const diskMat = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.InstancedMesh(diskGeo, diskMat, COUNT);
  const dummy = new THREE.Object3D();
  const particles: Array<{ r: number; a: number; y: number; rate: number; hue: number }> = [];
  for (let i = 0; i < COUNT; i++) {
    const r = 0.8 + Math.pow(Math.random(), 1.6) * 1.7;
    particles.push({
      r,
      a: Math.random() * Math.PI * 2,
      y: (Math.random() - 0.5) * 0.05 * r,
      rate: 2.6 / Math.sqrt(r),
      hue: Math.random(),
    });
  }
  group.add(mesh);

  // Tilt the disk plane for a cinematic angle
  const diskTilt = new THREE.Group();
  diskTilt.rotation.x = 0.42;
  diskTilt.add(mesh);
  group.add(diskTilt);

  // Gravitational lensing hint ring
  const lensMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(accentColor),
    transparent: true,
    opacity: 0.12,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const lensHalo = new THREE.Mesh(new THREE.CircleGeometry(1.35, 48), lensMat);
  group.add(lensHalo);

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  const colorInner = new THREE.Color('#ffd9a0');
  const colorOuter = new THREE.Color(accentColor);
  let raf = 0;
  const clock = new THREE.Clock();
  function tick() {
    raf = requestAnimationFrame(tick);
    const t = clock.getElapsedTime();
    for (let i = 0; i < COUNT; i++) {
      const p = particles[i];
      p.a += p.rate * 0.016 * speed;
      dummy.position.set(Math.cos(p.a) * p.r, p.y, Math.sin(p.a) * p.r);
      dummy.rotation.set(0, -p.a, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      const heat = 1 - (p.r - 0.8) / 1.7;
      mesh.setColorAt(i, colorInner.clone().lerp(colorOuter, 1 - heat));
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    group.rotation.y = t * 0.15 * speed;
    lensMat.opacity = 0.08 + Math.abs(Math.sin(t * 1.2 * speed)) * 0.08;
    photonMat.opacity = 0.75 + Math.sin(t * 3 * speed) * 0.15;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    diskGeo.dispose();
    diskMat.dispose();
    hole.geometry.dispose();
    holeMat.dispose();
    photonRing.geometry.dispose();
    photonMat.dispose();
    lensHalo.geometry.dispose();
    lensMat.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
