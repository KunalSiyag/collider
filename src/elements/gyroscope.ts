import * as THREE from 'three';

export interface GyroscopeOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createGyroscope(
  container: HTMLElement,
  options: GyroscopeOptions = {},
): () => void {
  const { color = '#fafafa', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
  camera.position.set(3.4, 2.2, 4.2);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(4, 5, 3);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 35);
  rim.position.set(-3, -2, -3);
  scene.add(rim);

  const group = new THREE.Group();
  scene.add(group);

  const brass = new THREE.MeshStandardMaterial({
    color,
    metalness: 0.85,
    roughness: 0.25,
  });
  const glow = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.9,
    metalness: 0.4,
    roughness: 0.2,
  });

  // Spinning core
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 24), glow);
  group.add(core);

  // Axle through the core
  const axle = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.6, 12), brass);
  group.add(axle);
  for (const end of [-1, 1]) {
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), brass);
    cap.position.y = end * 1.3;
    group.add(cap);
  }

  // Three gimbal rings on different axes
  const radii = [0.75, 1.0, 1.25];
  const rings: THREE.Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radii[i], 0.045, 12, 80), brass);
    ring.rotation.x = i === 0 ? Math.PI / 2 : 0;
    ring.rotation.y = i === 2 ? Math.PI / 2 : 0;
    group.add(ring);
    rings.push(ring);
  }

  // Outer frame arc
  const frame = new THREE.Mesh(
    new THREE.TorusGeometry(1.55, 0.05, 10, 60, Math.PI),
    brass,
  );
  frame.rotation.z = Math.PI;
  frame.position.y = 1.55;
  group.add(frame);
  const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.7, 0.18, 32), brass);
  pedestal.position.y = -1.62;
  scene.add(pedestal);
  group.position.y = 0.1;

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
    group.rotation.x += 0.004 * speed;
    group.rotation.z = Math.sin(t * 0.6 * speed) * 0.25;
    axle.rotation.y = t * 6 * speed;
    core.material.emissiveIntensity = 0.7 + Math.sin(t * 4 * speed) * 0.35;
    rings[0].rotation.z = t * 1.4 * speed;
    rings[1].rotation.x = t * 1.0 * speed;
    rings[2].rotation.y = -t * 0.8 * speed;
    group.position.y = 0.1 + Math.sin(t * 1.1 * speed) * 0.08;
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
