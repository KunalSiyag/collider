import * as THREE from 'three';

export interface MetronomeArmOptions {
  color?: string;
  accentColor?: string;
  bpm?: number;
  speed?: number;
}

export function createMetronomeArm(
  container: HTMLElement,
  options: MetronomeArmOptions = {},
): () => void {
  const { color = '#a78bfa', accentColor = '#f472b6', bpm = 120, speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.4, 1.6, 4.6);
  camera.lookAt(0, 0.5, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.3);
  key.position.set(4, 6, 5);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const met = new THREE.Group();
  met.rotation.y = -0.35;
  scene.add(met);

  // Pyramid body via extruded trapezoid silhouette
  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(0.45, 0);
  bodyShape.lineTo(1.05, 0);
  bodyShape.lineTo(0.42, 2.2);
  bodyShape.lineTo(-0.42, 2.2);
  bodyShape.lineTo(-1.05, 0);
  bodyShape.lineTo(-0.45, 0);
  const bodyMat = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(color), roughness: 0.4, clearcoat: 0.4 });
  const body = new THREE.Mesh(new THREE.ExtrudeGeometry(bodyShape, { depth: 0.85, bevelEnabled: false }), bodyMat);
  body.position.z = -0.425;
  body.position.y = -1.15;
  met.add(body);

  // Face plate
  const faceMat = new THREE.MeshStandardMaterial({
    color: '#10101a',
    roughness: 0.5,
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.06,
  });
  const face = new THREE.Mesh(new THREE.BoxGeometry(0.62, 2.0, 0.04), faceMat);
  face.position.set(0, 0.02, 0.43);
  met.add(face);
  for (let i = 0; i < 9; i++) {
    const tick = new THREE.Mesh(new THREE.BoxGeometry(0.14 + (i % 2) * 0.08, 0.02, 0.02), faceMat);
    tick.position.set(0, -0.8 + i * 0.22, 0.455);
    met.add(tick);
  }

  // Pendulum rod with sliding weight
  const pivot = new THREE.Group();
  pivot.position.set(0, -0.95, 0.47);
  met.add(pivot);
  const rodMat = new THREE.MeshStandardMaterial({ color: '#c9c4d8', metalness: 0.9, roughness: 0.2 });
  const rod = new THREE.Mesh(new THREE.BoxGeometry(0.05, 2.3, 0.03), rodMat);
  rod.position.y = 1.15;
  pivot.add(rod);
  const weight = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, 0.18, 0.09),
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(accentColor),
      metalness: 0.7,
      roughness: 0.25,
      emissive: new THREE.Color(accentColor),
      emissiveIntensity: 0.3,
    }),
  );
  weight.position.y = 0.75;
  pivot.add(weight);
  const bob = new THREE.Mesh(new THREE.SphereGeometry(0.09, 14, 12), rodMat);
  bob.position.y = 2.34;
  pivot.add(bob);

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
    const omega = (bpm / 60) * Math.PI * speed;
    // Driven pendulum swing with tick emphasis
    pivot.rotation.z = Math.sin(t * omega) * 0.42;
    weight.position.y = 0.75 + Math.sin(t * 0.4 * speed) * 0.25; // scale slides slowly
    weight.material.emissiveIntensity =
      Math.pow(Math.abs(Math.cos(t * omega)), 8) * 0.9 + 0.1;
    met.position.y = Math.sin(t * 0.9 * speed) * 0.03;
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
