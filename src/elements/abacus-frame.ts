import * as THREE from 'three';

export interface AbacusFrameOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createAbacusFrame(
  container: HTMLElement,
  options: AbacusFrameOptions = {},
): () => void {
  const { color = '#a78bfa', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
  camera.position.set(0.6, 1.4, 5.2);
  camera.lookAt(0, 0.3, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.65));
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(4, 6, 5);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const group = new THREE.Group();
  group.rotation.x = 0.12;
  scene.add(group);

  const woodMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.35,
    roughness: 0.45,
  });

  // Frame
  const W = 3.4;
  const H = 2.4;
  for (const sx of [-1, 1]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.16, H + 0.16, 0.16), woodMat);
    post.position.set(sx * (W / 2), 0, 0);
    group.add(post);
  }
  for (const sy of [-1, 1]) {
    const beam = new THREE.Mesh(new THREE.BoxGeometry(W + 0.16, 0.16, 0.16), woodMat);
    beam.position.set(0, (sy * (H)) / 2, 0);
    group.add(beam);
  }

  const beadPalette = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa'];
  interface Bead { mesh: THREE.Mesh; row: number; home: number }
  const beads: Bead[] = [];
  const ROWS = 5;
  const COLS = 7;
  const spacingX = W / COLS;
  const spacingY = H / (ROWS + 1);

  for (let r = 0; r < ROWS; r++) {
    const y = H / 2 - (r + 1) * spacingY;
    const wire = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, W - 0.05, 8),
      woodMat,
    );
    wire.rotation.z = Math.PI / 2;
    wire.position.y = y;
    group.add(wire);

    for (let c = 0; c < COLS; c++) {
      const hue = beadPalette[(r + c) % beadPalette.length];
      const bead = new THREE.Mesh(
        new THREE.SphereGeometry(0.17, 20, 14),
        new THREE.MeshStandardMaterial({
          color: new THREE.Color(hue),
          roughness: 0.25,
          metalness: 0.3,
          emissive: new THREE.Color(hue),
          emissiveIntensity: 0.08,
        }),
      );
      bead.scale.x = 0.75;
      bead.position.set((c - (COLS - 1) / 2) * spacingX, y, 0);
      group.add(bead);
      beads.push({ mesh: bead, row: r, home: bead.position.x });
    }
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
    group.rotation.y = Math.sin(t * 0.3 * speed) * 0.28;
    // Beads slide back and forth along their wires in a counting rhythm
    for (let i = 0; i < beads.length; i++) {
      const b = beads[i];
      const wave = Math.sin(t * 1.6 * speed + b.row * 0.9 + b.mesh.position.x * 0.001);
      b.mesh.position.x = b.home + wave * spacingX * 0.32;
      b.mesh.position.z = Math.sin(t * 3.2 * speed + i) * 0.01;
      (b.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.06 + Math.abs(wave) * 0.25;
    }
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
