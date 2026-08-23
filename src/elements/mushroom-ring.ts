import * as THREE from 'three';

export interface MushroomRingOptions {
  capColor?: string;
  accentColor?: string;
  count?: number;
  speed?: number;
}

export function createMushroomRing(
  container: HTMLElement,
  options: MushroomRingOptions = {},
): () => void {
  const { capColor = '#f472b6', accentColor = '#a78bfa', count = 9, speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.4, 2.4, 4.6);
  camera.lookAt(0, -0.3, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const key = new THREE.DirectionalLight(0xffffff, 2.0);
  key.position.set(3, 6, 4);
  scene.add(key);
  const glowLight = new THREE.PointLight(new THREE.Color(accentColor), 35);
  glowLight.position.set(0, 0.6, 0);
  scene.add(glowLight);

  const rand = (() => {
    let s = 60606 >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  })();

  const group = new THREE.Group();
  scene.add(group);

  // Mossy ground disc
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x1c1430, roughness: 0.95 });
  const ground = new THREE.Mesh(new THREE.CircleGeometry(2.6, 48), groundMat);
  ground.rotation.x = -Math.PI / 2;
  group.add(ground);

  const stemMat = new THREE.MeshStandardMaterial({ color: '#e9e4f5', roughness: 0.6 });
  const capMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(capColor),
    roughness: 0.3,
    clearcoat: 0.7,
  });
  const gillMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.55,
  });

  interface Shroom { group: THREE.Group; phase: number; baseY: number; cap: THREE.Mesh }
  const shrooms: Shroom[] = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 + rand() * 0.25;
    const r = 1.55 + (rand() - 0.5) * 0.35;
    const scale = 0.65 + rand() * 0.75;
    const m = new THREE.Group();

    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.09 * scale, 0.13 * scale, 0.62 * scale, 12), stemMat);
    stem.position.y = 0.31 * scale;
    m.add(stem);

    // Domed cap
    const capGeo = new THREE.SphereGeometry(0.42 * scale, 22, 14, 0, Math.PI * 2, 0, Math.PI / 2.15);
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.y = 0.6 * scale;
    m.add(cap);

    // Glowing gills under the cap
    const gills = new THREE.Mesh(
      new THREE.ConeGeometry(0.4 * scale, 0.16 * scale, 20, 1, true),
      gillMat,
    );
    gills.position.y = 0.56 * scale;
    m.add(gills);

    // Spots on the cap
    for (let s = 0; s < 4; s++) {
      const spotA = rand() * Math.PI * 2;
      const spotH = 0.35 + rand() * 0.5;
      const spot = new THREE.Mesh(
        new THREE.CircleGeometry(0.05 * scale, 10),
        new THREE.MeshBasicMaterial({ color: 0xfafafa }),
      );
      spot.position.set(Math.cos(spotA) * Math.sin(spotH) * 0.42 * scale, Math.cos(spotH) * 0.42 * scale + 0.6 * scale, Math.sin(spotA) * Math.sin(spotH) * 0.42 * scale);
      spot.rotation.set(Math.sin(spotH) * Math.sin(spotA) * -Math.PI / 2, spotA, 0, 'YXZ');
      m.add(spot);
    }

    m.position.set(Math.cos(a) * r, 0, Math.sin(a) * r);
    m.scale.setScalar(scale);
    m.rotation.y = rand() * Math.PI;
    group.add(m);
    shrooms.push({ group: m, phase: rand() * Math.PI * 2, baseY: 0, cap });
  }

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

  let raf = 0;
  const clock = new THREE.Clock();
  function tick() {
    raf = requestAnimationFrame(tick);
    const t = clock.getElapsedTime();
    group.rotation.y = t * 0.25 * speed;
    for (const s of shrooms) {
      const breathe = 1 + Math.sin(t * 1.8 * speed + s.phase) * 0.05;
      s.cap.scale.set(breathe, 1, breathe);
      s.group.position.y = s.baseY + Math.abs(Math.sin(t * 1.2 * speed + s.phase)) * 0.03;
    }
    gillMat.emissiveIntensity = 0.4 + Math.abs(Math.sin(t * 1.4 * speed)) * 0.35;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((m) => m.dispose());
      }
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
