import * as THREE from 'three';

export interface TowerOfHanoiOptions {
  color?: string;
  accentColor?: string;
  discs?: number;
  speed?: number;
}

export function createTowerOfHanoi(
  container: HTMLElement,
  options: TowerOfHanoiOptions = {},
): () => void {
  const { color = '#a78bfa', accentColor = '#22d3ee', discs = 5, speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(4.4, 2.6, 4.8);
  camera.lookAt(0, 0.7, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const key = new THREE.DirectionalLight(0xffffff, 2.3);
  key.position.set(4, 6, 4);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 30);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const rand = (() => {
    let s = 1337 >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  })();

  const base = new THREE.Mesh(
    new THREE.BoxGeometry(7.2, 0.24, 1.6),
    new THREE.MeshStandardMaterial({ color: new THREE.Color(color), metalness: 0.4, roughness: 0.35 }),
  );
  base.position.y = -0.12;
  scene.add(base);

  const pegs: THREE.Vector3[] = [];
  for (let p = 0; p < 3; p++) {
    const x = (p - 1) * 2.4;
    pegs.push(new THREE.Vector3(x, 0, 0));
    const peg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.07, 2.6, 12),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(accentColor),
        metalness: 0.7,
        roughness: 0.25,
        emissive: new THREE.Color(accentColor),
        emissiveIntensity: 0.25,
      }),
    );
    peg.position.set(x, 1.3, 0);
    scene.add(peg);
  }

  const palette = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa', '#38bdf8', '#e879f9'];
  interface DiscMesh { mesh: THREE.Mesh; peg: number }
  const stack: DiscMesh[] = [];
  for (let i = discs - 1; i >= 0; i--) {
    const w = 0.45 + (i / discs) * 0.85;
    const hue = palette[i % palette.length];
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(w, w, 0.26, 36),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(hue).offsetHSL((rand() - 0.5) * 0.02, 0, 0),
        roughness: 0.3,
        metalness: 0.25,
        emissive: new THREE.Color(hue),
        emissiveIntensity: 0.12,
      }),
    );
    mesh.userData = { peg: 0 };
    mesh.position.copy(pegs[0]);
    mesh.position.y = 0.13 + stack.length * 0.27;
    scene.add(mesh);
    stack.push({ mesh, peg: 0 });
  }

  // Solve the puzzle step by step
  const moves: Array<[number, number]> = [];
  function solve(n: number, from: number, to: number, via: number) {
    if (n === 0) return;
    solve(n - 1, from, via, to);
    moves.push([from, to]);
    solve(n - 1, via, to, from);
  }
  solve(discs, 0, 2, 1);
  let moveIndex = 0;
  interface Flight { mesh: THREE.Mesh; peg: number; start: THREE.Vector3; end: THREE.Vector3; k: number }
  let flight: Flight | null = null;

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

  function stackHeight(peg: number) {
    return 0.13 + stack.filter((d) => d.peg === peg).length * 0.27;
  }

  let raf = 0;
  const clock = new THREE.Clock();
  function tick() {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;

    if (!flight && moves.length > 0) {
      const [from, to] = moves[moveIndex % moves.length];
      moveIndex++;
      const top = stack
        .filter((d) => d.peg === from)
        .sort((a, b) => b.mesh.position.y - a.mesh.position.y)[0];
      if (top) {
        top.peg = to;
        const start = top.mesh.position.clone();
        const end = pegs[to].clone();
        end.y = stackHeight(to);
        flight = { mesh: top.mesh, peg: to, start, end, k: 0 };
      }
    }
    if (flight) {
      flight.k += dt * 1.6 * speed;
      const k = Math.min(flight.k, 1);
      flight.mesh.position.lerpVectors(flight.start, flight.end, k);
      flight.mesh.position.y =
        Math.max(flight.start.y, flight.end.y) + Math.sin(k * Math.PI) * 1.2;
      flight.mesh.rotation.y += dt * 3 * speed;
      if (k >= 1) {
        flight.mesh.position.copy(flight.end);
        flight = null;
      }
    }
    scene.rotation.y = Math.sin(t * 0.25 * speed) * 0.2;
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
