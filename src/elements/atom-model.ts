import * as THREE from 'three';

export interface AtomModelOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createAtomModel(
  container: HTMLElement,
  options: AtomModelOptions = {},
): () => void {
  const { color = '#fafafa', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(3.4, 1.6, 4.6);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.45));
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(4, 6, 5);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 28);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const atom = new THREE.Group();
  scene.add(atom);

  // Nucleus cluster of protons/neutrons
  const protonMat = new THREE.MeshStandardMaterial({
    color: '#f472b6',
    emissive: '#f472b6',
    emissiveIntensity: 0.35,
    roughness: 0.3,
  });
  const neutronMat = new THREE.MeshStandardMaterial({
    color: '#8a93a8',
    roughness: 0.35,
    metalness: 0.5,
  });
  const rand = (() => {
    let s = 7919 >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  })();
  for (let i = 0; i < 10; i++) {
    const n = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 12), i % 2 ? protonMat : neutronMat);
    n.position.set((rand() - 0.5) * 0.42, (rand() - 0.5) * 0.42, (rand() - 0.5) * 0.42);
    atom.add(n);
  }

  // Electron shells at tilted angles
  interface Shell { ring: THREE.Mesh; pivot: THREE.Group; electron: THREE.Mesh; rate: number; radius: number }
  const shells: Shell[] = [];
  const shellColors = ['#22d3ee', '#8b5cf6', '#f472b6'];
  for (let i = 0; i < 3; i++) {
    const radius = 1.25 + i * 0.55;
    const tiltX = (i / 3) * Math.PI + 0.35;
    const tiltZ = i * 1.05;

    const holder = new THREE.Group();
    holder.rotation.set(tiltX, 0, tiltZ);
    atom.add(holder);

    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(shellColors[i]),
      transparent: true,
      opacity: 0.3,
    });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.012, 6, 96), ringMat);
    holder.add(ring);

    const pivot = new THREE.Group();
    holder.add(pivot);

    const electronMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(shellColors[i]),
      emissive: new THREE.Color(shellColors[i]),
      emissiveIntensity: 1.2,
      roughness: 0.2,
    });
    const electron = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 12), electronMat);
    electron.position.x = radius;
    pivot.add(electron);

    // Faint trail
    const trailGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(radius - 0.55, 0, 0),
      new THREE.Vector3(radius, 0, 0),
    ]);
    const trailMat = new THREE.LineBasicMaterial({ color: shellColors[i], transparent: true, opacity: 0.7 });
    const trail = new THREE.Line(trailGeo, trailMat);
    trail.rotation.y = -Math.PI / 2 + 0.001;
    pivot.add(trail);

    shells.push({ ring, pivot, electron, rate: 2.4 - i * 0.55, radius });
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
    atom.rotation.y = t * 0.25 * speed;
    atom.position.y = Math.sin(t * 0.9 * speed) * 0.06;
    for (const s of shells) {
      s.pivot.rotation.z = t * s.rate * speed;
      const pulse = 1 + Math.sin(t * 4 * speed + s.rate) * 0.15;
      s.electron.scale.setScalar(pulse);
    }
    protonMat.emissiveIntensity = 0.25 + Math.abs(Math.sin(t * 2.2 * speed)) * 0.3;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
        obj.geometry.dispose();
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((m) => m.dispose());
      }
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
