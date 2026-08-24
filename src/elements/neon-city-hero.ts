import * as THREE from 'three';

/** Neon City Hero — a night skyline of glowing window grids flying past. */
export interface NeonCityHeroOptions {
  buildings?: number;
  windowColor?: string;
  accentColor?: string;
  speed?: number;
}

export function createNeonCityHero(
  container: HTMLElement,
  options: NeonCityHeroOptions = {},
): () => void {
  const { buildings = 60, windowColor = '#22d3ee', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0b0b14, 8, 34);
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 80);
  camera.position.set(0, 3.2, 10);

  const disposables: Array<{ dispose(): void }> = [];
  const city = new THREE.Group();
  scene.add(city);

  const boxGeo = new THREE.BoxGeometry(1, 1, 1);
  disposables.push(boxGeo);
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x111122, roughness: 0.9 });
  const litMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(windowColor) });
  const accentMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor) });
  disposables.push(darkMat, litMat, accentMat);

  const windowGeo = new THREE.PlaneGeometry(0.16, 0.24);
  disposables.push(windowGeo);

  for (let i = 0; i < buildings; i++) {
    const h = 1.5 + Math.random() * 6;
    const w = 0.8 + Math.random() * 1.4;
    const tower = new THREE.Group();

    const body = new THREE.Mesh(boxGeo, darkMat);
    body.scale.set(w, h, w);
    body.position.y = h / 2;
    tower.add(body);

    // Window grid on the two camera-facing faces.
    const rows = Math.floor(h / 0.55);
    const cols = Math.max(2, Math.floor(w / 0.4));
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (Math.random() > 0.42) continue;
        const win = new THREE.Mesh(windowGeo, Math.random() > 0.9 ? accentMat : litMat);
        const x = -w / 2 + (c + 0.5) * (w / cols);
        const y = 0.4 + r * 0.55;
        const front = win.clone();
        front.position.set(x, y, w / 2 + 0.01);
        const side = win.clone();
        side.position.set(w / 2 + 0.01, y, (c / cols - 0.5) * w);
        side.rotation.y = Math.PI / 2;
        tower.add(front, side);
      }
    }

    tower.position.set((Math.random() - 0.5) * 26, 0, -Math.random() * 46);
    city.add(tower);
  }

  scene.add(new THREE.AmbientLight(0x334, 1.2));
  const glow = new THREE.PointLight(new THREE.Color(accentColor), 40, 30);
  glow.position.set(0, 6, 2);
  scene.add(glow);
  disposables.push(glow);

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
    const dt = clock.getDelta() * speed;
    const t = clock.getElapsedTime();

    city.children.forEach((tower) => {
      tower.position.z += dt * 4;
      if (tower.position.z > 12) tower.position.z -= 58;
    });

    camera.position.x = Math.sin(t * 0.25) * 1.4;
    camera.lookAt(0, 3, -6);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    disposables.forEach((d) => d.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
