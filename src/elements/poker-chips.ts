import * as THREE from 'three';

export interface PokerChipsOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createPokerChips(
  container: HTMLElement,
  options: PokerChipsOptions = {},
): () => void {
  const { color = '#f472b6', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.4, 2.0, 4.6);
  camera.lookAt(0, -0.5, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
  keyLight.position.set(4, 7, 6);
  scene.add(keyLight);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const rand = (() => {
    let s = 24680 >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  })();

  // Felt table
  const feltMat = new THREE.MeshStandardMaterial({ color: '#17121f', roughness: 0.95 });
  const table = new THREE.Mesh(new THREE.CircleGeometry(2.9, 48), feltMat);
  table.rotation.x = -Math.PI / 2;
  table.position.y = -1.15;
  scene.add(table);

  const chipPalette = [color, accentColor, '#8b5cf6', '#a78bfa'];
  interface Chip { mesh: THREE.Mesh; baseY: number; phase: number }
  const chips: Chip[] = [];

  function chipGeometry(): THREE.BufferGeometry {
    const shape = new THREE.Shape();
    const N = 8;
    for (let i = 0; i < N * 2; i++) {
      const a = (i / (N * 2)) * Math.PI * 2;
      const r = i % 2 === 0 ? 0.42 : 0.42;
      if (i % 4 < 2) {
        shape.absarc(0, 0, r, a, a + (Math.PI / (N)), false);
      }
    }
    // Simpler: plain disc; edge stripes added as thin boxes
    return new THREE.CylinderGeometry(0.42, 0.42, 0.09, 36);
  }

  function addChip(x: number, z: number, stackIndex: number, hueIndex: number) {
    const hue = chipPalette[hueIndex % chipPalette.length];
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(hue),
      roughness: 0.35,
      clearcoat: 0.5,
    });
    const mesh = new THREE.Mesh(chipGeometry(), mat);
    mesh.position.set(x, -1.05 + stackIndex * 0.095, z);
    mesh.rotation.y = rand() * Math.PI;
    scene.add(mesh);
    chips.push({ mesh, baseY: mesh.position.y, phase: rand() * Math.PI * 2 });

    // Edge stripe dashes
    const stripeMat = new THREE.MeshBasicMaterial({ color: 0xf5f3ff });
    for (let d = 0; d < 6; d++) {
      const a = (d / 6) * Math.PI * 2 + mesh.rotation.y;
      const dash = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.07, 0.02), stripeMat);
      dash.position.set(Math.cos(a) * 0.41, 0, Math.sin(a) * 0.41);
      mesh.add(dash);
    }
  }

  // Three stacks of varying height
  const stacks: Array<[number, number, number]> = [
    [-0.95, 0.25, 7],
    [0.75, -0.35, 5],
    [0.15, 0.85, 4],
  ];
  stacks.forEach(([x, z, count], si) => {
    for (let i = 0; i < count; i++) {
      addChip(x + (rand() - 0.5) * 0.04, z + (rand() - 0.5) * 0.04, i, si + i);
    }
  });

  // A few loose chips
  addChip(-0.3, -0.65, 0, 1);
  addChip(1.35, 0.5, 0, 2);
  addChip(-1.5, -0.5, 0, 3);

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
    // Top chips of each stack hover slightly, like the next deal
    for (const c of chips) {
      c.mesh.rotation.y += 0.003 * speed;
      c.mesh.position.y = c.baseY + Math.sin(t * 1.4 * speed + c.phase) * 0.012;
    }
    table.rotation.z = t * 0.08 * speed;
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
