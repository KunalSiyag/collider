import * as THREE from 'three';

export interface DominoArcOptions {
  color?: string;
  accentColor?: string;
  count?: number;
  speed?: number;
}

export function createDominoArc(
  container: HTMLElement,
  options: DominoArcOptions = {},
): () => void {
  const { color = '#fafafa', accentColor = '#f472b6', count = 14, speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(4.6, 2.2, 5.0);
  camera.lookAt(0, -0.3, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(4, 6, 4);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 30);
  rim.position.set(-4, 1, -3);
  scene.add(rim);

  const group = new THREE.Group();
  scene.add(group);

  const tileGeo = new THREE.BoxGeometry(0.55, 1.1, 0.14);
  const dotGeo = new THREE.SphereGeometry(0.055, 10, 8);

  // Arrange tiles along a sweeping arc
  const radius = 3.2;
  const dominoes: Array<{ tile: THREE.Group; index: number }> = [];
  for (let i = 0; i < count; i++) {
    const frac = i / (count - 1) - 0.5;
    const angle = frac * Math.PI * 0.9;
    const tileMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color),
      roughness: 0.2,
      clearcoat: 0.6,
    });
    const tile = new THREE.Group();
    const slab = new THREE.Mesh(tileGeo, tileMat);
    tile.add(slab);

    // Pips: value grows then shrinks along the arc
    const value = (i % 6) + 1;
    const pipMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(i % 2 === 0 ? accentColor : '#22d3ee'),
      emissive: new THREE.Color(i % 2 === 0 ? accentColor : '#22d3ee'),
      emissiveIntensity: 0.4,
    });
    for (let d = 0; d < value; d++) {
      const pip = new THREE.Mesh(dotGeo, pipMat);
      pip.position.set(
        ((d % 2 === 0 ? -1 : 1) * Math.min(d, 1) * 0.12),
        0.42 - Math.floor((d + 1) / 2) * 0.18,
        -0.08,
      );
      tile.add(pip);
    }

    const x = Math.sin(angle) * radius;
    const z = (Math.cos(angle) - 1) * radius;
    tile.position.set(x, 0.55, z);
    tile.rotation.y = angle;
    tile.rotation.x = 0; // standing
    group.add(tile);
    dominoes.push({ tile, index: i });
  }

  // Floor shadow disc
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(4.4, 48),
    new THREE.MeshBasicMaterial({ color: '#000000', transparent: true, opacity: 0.25 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.01;
  group.add(floor);

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
  let wavePos = -1.5;
  function tick() {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    wavePos += dt * 2.2 * speed;
    if (wavePos > count + 2) wavePos = -1.5;
    for (const { tile, index } of dominoes) {
      const dist = wavePos - index;
      // Tiles tip over as the falling wave passes through them
      const target = dist > 0 ? Math.PI / 2 : 0;
      tile.rotation.x += (target - tile.rotation.x) * Math.min(dt * 10, 1);
      tile.position.y = 0.55 - Math.abs(Math.sin(tile.rotation.x)) * 0.28;
    }
    group.rotation.y = Math.sin(t * 0.25 * speed) * 0.15;
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
