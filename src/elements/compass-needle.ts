import * as THREE from 'three';

export interface CompassNeedleOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createCompassNeedle(
  container: HTMLElement,
  options: CompassNeedleOptions = {},
): () => void {
  const { color = '#fafafa', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
  camera.position.set(0.8, 3.4, 3.6);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(3, 6, 4);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 25);
  rim.position.set(-3, 2, -3);
  scene.add(rim);

  const brass = new THREE.MeshStandardMaterial({ color: '#d4c39a', metalness: 0.85, roughness: 0.3 });

  // Housing
  const caseRing = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.12, 14, 64), brass);
  caseRing.rotation.x = Math.PI / 2;
  scene.add(caseRing);
  const face = new THREE.Mesh(
    new THREE.CylinderGeometry(1.48, 1.48, 0.08, 64),
    new THREE.MeshStandardMaterial({ color: new THREE.Color(color), roughness: 0.35 }),
  );
  face.position.y = -0.06;
  scene.add(face);

  // Tick marks around the dial
  const tickMat = new THREE.MeshStandardMaterial({ color: '#8b5cf6', emissive: '#8b5cf6', emissiveIntensity: 0.5 });
  for (let i = 0; i < 32; i++) {
    const a = (i / 32) * Math.PI * 2;
    const major = i % 8 === 0;
    const tick = new THREE.Mesh(
      new THREE.BoxGeometry(major ? 0.05 : 0.025, 0.02, major ? 0.26 : 0.13),
      tickMat,
    );
    tick.position.set(Math.sin(a) * 1.3, 0, Math.cos(a) * 1.3);
    tick.rotation.y = a;
    scene.add(tick);
  }

  // Glass dome
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(1.46, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2.6),
    new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.12,
      roughness: 0.02,
      transmission: 0.6,
    }),
  );
  scene.add(dome);

  // Needle: two cone halves, red/accent north
  const needle = new THREE.Group();
  scene.add(needle);
  const northMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#f472b6'),
    emissive: new THREE.Color('#f472b6'),
    emissiveIntensity: 0.6,
    metalness: 0.5,
    roughness: 0.25,
  });
  const southMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(color), metalness: 0.6, roughness: 0.3 });
  const north = new THREE.Mesh(new THREE.ConeGeometry(0.11, 1.15, 4), northMat);
  north.rotation.x = Math.PI / 2;
  north.position.z = 0.62;
  needle.add(north);
  const south = new THREE.Mesh(new THREE.ConeGeometry(0.11, 1.15, 4), southMat);
  south.rotation.x = -Math.PI / 2;
  south.position.z = -0.62;
  needle.add(south);
  const hub = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 12), brass);
  hub.position.y = 0.04;
  needle.add(hub);
  needle.position.y = 0.1;

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
    // Wandering north with a wobble, like a hand-held compass
    needle.rotation.y = Math.sin(t * 0.5 * speed) * 1.4 + Math.sin(t * 2.3 * speed) * 0.12;
    needle.position.y = 0.1 + Math.abs(Math.sin(t * 3 * speed)) * 0.02;
    northMat.emissiveIntensity = 0.45 + Math.abs(Math.sin(t * 1.8 * speed)) * 0.4;
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
