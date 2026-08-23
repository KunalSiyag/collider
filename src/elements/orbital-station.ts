import * as THREE from 'three';

export interface OrbitalStationOptions {
  accentColor?: string;
}

export function createOrbitalStation(
  container: HTMLElement,
  options: OrbitalStationOptions = {},
): () => void {
  const { accentColor = '#22d3ee' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200);
  camera.position.set(7, 3.5, 13);

  const station = new THREE.Group();

  const hullMat = new THREE.MeshStandardMaterial({ color: 0x9aa3b5, roughness: 0.4, metalness: 0.7 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x232a38, roughness: 0.6, metalness: 0.5 });
  const glowMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor) });

  const ring = new THREE.Mesh(new THREE.TorusGeometry(4.4, 0.5, 18, 90), hullMat);
  station.add(ring);
  const windowBand = new THREE.Mesh(new THREE.TorusGeometry(4.4, 0.52, 6, 120), glowMat);
  windowBand.scale.setScalar(1.001);
  (windowBand.material as THREE.MeshBasicMaterial).transparent = true;
  (windowBand.material as THREE.MeshBasicMaterial).opacity = 0.9;
  station.add(windowBand);

  for (let i = 0; i < 4; i++) {
    const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 8.4, 10), darkMat);
    spoke.rotation.z = Math.PI / 2;
    spoke.rotation.y = (i / 4) * Math.PI * 2;
    station.add(spoke);
  }

  const core = new THREE.Mesh(new THREE.CapsuleGeometry(0.9, 3.4, 8, 18), hullMat);
  core.rotation.x = Math.PI / 2;
  station.add(core);
  const beaconMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor) });
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), beaconMat);
  beacon.position.y = 2.6;
  station.add(beacon);

  const dish = new THREE.Mesh(new THREE.SphereGeometry(0.9, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2.4), darkMat);
  dish.position.set(-1.6, -1.4, 0);
  dish.rotation.z = 0.8;
  station.add(dish);
  scene.add(station);

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(6, 40, 30),
    new THREE.MeshStandardMaterial({ color: 0x4a4460, roughness: 1, flatShading: true }),
  );
  moon.position.set(-26, -8, -34);
  scene.add(moon);

  const starGeo = new THREE.BufferGeometry();
  const n = 900;
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 140;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 90;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 140;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xdde4ff, size: 0.14, transparent: true, opacity: 0.9 }));
  scene.add(stars);

  scene.add(new THREE.AmbientLight(0x30364a, 1.4));
  const sun = new THREE.DirectionalLight(0xfff2df, 2.2);
  sun.position.set(14, 8, 10);
  scene.add(sun);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 20, 30);
  rim.position.set(-8, -4, 6);
  scene.add(rim);

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
    ring.rotation.x = t * 0.25;
    windowBand.rotation.x = ring.rotation.x;
    station.rotation.y = t * 0.08;
    beaconMat.color.copy(new THREE.Color(accentColor)).multiplyScalar(0.6 + Math.abs(Math.sin(t * 4)) * 0.6);
    camera.position.x = Math.sin(t * 0.09) * 2.4;
    camera.position.y = 3.5 + Math.cos(t * 0.07) * 0.8;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    starGeo.dispose();
    [hullMat, darkMat, glowMat, beaconMat].forEach((mt) => mt.dispose());
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh || o instanceof THREE.Points) {
        if (o.geometry !== starGeo) o.geometry.dispose();
      }
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
