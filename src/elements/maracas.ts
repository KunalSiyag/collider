import * as THREE from 'three';

export interface MaracasOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createMaracas(
  container: HTMLElement,
  options: MaracasOptions = {},
): () => void {
  const { color = '#f472b6', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.5, -0.2, 4.8);
  camera.lookAt(0, 0.2, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(4, 6, 6);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const rand = (() => {
    let s = 50505 >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  })();

  interface Shaker { group: THREE.Group; phase: number; head: THREE.Group; beads: THREE.Mesh[] }
  const shakers: Shaker[] = [];

  function buildMaraca(hue: string): Shaker {
    const g = new THREE.Group();
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(hue),
      roughness: 0.35,
      clearcoat: 0.65,
    });

    // Oval rattle head via lathe
    const profile: THREE.Vector2[] = [];
    for (let i = 0; i <= 12; i++) {
      const u = i / 12;
      profile.push(new THREE.Vector2(
        Math.sin(u * Math.PI) * 0.42 * (1 + u * 0.25) + 0.001,
        u * 0.95,
      ));
    }
    const headGroup = new THREE.Group();
    const head = new THREE.Mesh(new THREE.LatheGeometry(profile, 32), bodyMat);
    headGroup.add(head);
    // Painted stripe band
    for (const y of [0.42, 0.58]) {
      const stripeR = Math.sin(((y / 0.95) * Math.PI)) * 0.42 * (1 + (y / 0.95) * 0.25) + 0.002;
      const stripe = new THREE.Mesh(
        new THREE.TorusGeometry(stripeR, 0.018, 8, 40),
        new THREE.MeshBasicMaterial({ color: 0xe9e4f5 }),
      );
      stripe.rotation.x = Math.PI / 2;
      stripe.position.y = y;
      headGroup.add(stripe);
    }
    g.add(headGroup);

    // Handle
    const handleMat = new THREE.MeshStandardMaterial({ color: '#c47b3a', roughness: 0.6 });
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.085, 1.15, 14), handleMat);
    handle.position.y = -0.52;
    g.add(handle);
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.03, 8, 24), handleMat);
    collar.rotation.x = Math.PI / 2;
    collar.position.y = 0.06;
    g.add(collar);

    // Loose beads inside (peeking via subtle bulge animation)
    const beads: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const bead = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 8, 8),
        new THREE.MeshStandardMaterial({ color: new THREE.Color(accentColor), roughness: 0.4 }),
      );
      g.add(bead);
      beads.push(bead);
    }
    return { group: g, phase: rand() * Math.PI * 2, head: headGroup, beads };
  }

  const a = buildMaraca(color);
  a.group.position.set(-0.75, 0.15, 0);
  a.group.rotation.z = 0.22;
  scene.add(a.group);
  shakers.push(a);

  const b = buildMaraca(accentColor);
  b.group.position.set(0.85, -0.1, 0.15);
  b.group.rotation.z = -0.3;
  scene.add(b.group);
  shakers.push(b);

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
    for (let si = 0; si < shakers.length; si++) {
      const s = shakers[si];
      // Rhythmic shake around the wrist pivot
      const shakeA = Math.sin(t * 7.5 * speed + s.phase) * 0.5;
      s.group.rotation.z = (si === 0 ? 0.22 : -0.3) + shakeA;
      s.group.rotation.x = Math.sin(t * 5 * speed + s.phase) * 0.18;
      s.group.position.y = (si === 0 ? 0.15 : -0.1) + Math.abs(shakeA) * 0.12;

      // Beads jostle inside the head volume
      for (let bi = 0; bi < s.beads.length; bi++) {
        const bead = s.beads[bi];
        bead.position.set(
          Math.sin(t * 9 * speed + bi * 2.1 + s.phase) * 0.16,
          -0.1 + Math.sin(t * 7 * speed + bi * 1.7) * 0.28,
          Math.cos(t * 8 * speed + bi * 2.6 + s.phase) * 0.16,
        );
      }
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
