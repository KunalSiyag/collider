import * as THREE from 'three';

export interface WitchCauldronOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createWitchCauldron(
  container: HTMLElement,
  options: WitchCauldronOptions = {},
): () => void {
  const { color = '#22d3ee', accentColor = '#8b5cf6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.4, 1.2, 4.6);
  camera.lookAt(0, -0.1, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  const brewLight = new THREE.PointLight(new THREE.Color(accentColor), 30);
  brewLight.position.set(0, -0.05, 0);
  scene.add(brewLight);
  const rim = new THREE.PointLight(new THREE.Color(color), 20);
  rim.position.set(-4, 1, -3);
  scene.add(rim);

  // Stone floor with glowing cracks
  const groundMat = new THREE.MeshStandardMaterial({ color: '#17121f', roughness: 0.95 });
  const ground = new THREE.Mesh(new THREE.CircleGeometry(3.6, 44), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.55;
  scene.add(ground);

  const cauldronGroup = new THREE.Group();
  scene.add(cauldronGroup);

  const ironMat = new THREE.MeshPhysicalMaterial({ color: '#241b33', metalness: 0.6, roughness: 0.45 });
  const rimMat = new THREE.MeshStandardMaterial({ color: '#10101a', metalness: 0.7, roughness: 0.35 });

  // Pot body via lathe
  const potProfile: THREE.Vector2[] = [
    new THREE.Vector2(0.5, -0.95),
    new THREE.Vector2(0.82, -0.72),
    new THREE.Vector2(1.02, -0.25),
    new THREE.Vector2(1.06, 0.15),
    new THREE.Vector2(0.98, 0.52),
    new THREE.Vector2(1.04, 0.62),
    new THREE.Vector2(1.0, 0.68),
    new THREE.Vector2(0.96, 0.64),
  ];
  const pot = new THREE.Mesh(new THREE.LatheGeometry(potProfile.map((p) => p.clone()), 44), ironMat);
  cauldronGroup.add(pot);
  const lipRing = new THREE.Mesh(new THREE.TorusGeometry(1.01, 0.05, 12, 56), rimMat);
  lipRing.rotation.x = Math.PI / 2;
  lipRing.position.y = 0.65;
  cauldronGroup.add(lipRing);

  // Three legs
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + Math.PI / 6;
    const legCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(Math.cos(a) * 0.75, -0.85, Math.sin(a) * 0.75),
      new THREE.Vector3(Math.cos(a) * 0.85, -1.25, Math.sin(a) * 0.85),
      new THREE.Vector3(Math.cos(a) * 0.9, -1.58, Math.sin(a) * 0.9),
    ]);
    const leg = new THREE.Mesh(new THREE.TubeGeometry(legCurve, 14, 0.06, 8), ironMat);
    cauldronGroup.add(leg);
  }

  // Bubbling green brew surface
  const brewMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#7CFC00').lerp(new THREE.Color(accentColor), 0.4),
    transparent: true,
    opacity: 0.9,
  });
  const brew = new THREE.Mesh(new THREE.CircleGeometry(0.97, 40), brewMat);
  brew.rotation.x = -Math.PI / 2;
  brew.position.y = 0.42;
  cauldronGroup.add(brew);

  // Bubbles rising and popping
  interface Bubble { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; phase: number }
  const bubbles: Bubble[] = [];
  for (let i = 0; i < 10; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#aaffcc'),
      transparent: true,
      opacity: 0.85,
    });
    const bubbleMesh = new THREE.Mesh(new THREE.SphereGeometry(0.07 + (i % 3) * 0.03, 10, 8), mat);
    cauldronGroup.add(bubbleMesh);
    bubbles.push({ mesh: bubbleMesh, mat, phase: i * 0.37 });
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
    cauldronGroup.rotation.y = t * 0.4 * speed;
    // Brew surface wobbles
    brew.scale.setScalar(1 + Math.sin(t * 3.2 * speed) * 0.02);
    brewMat.opacity = 0.8 + Math.sin(t * 4.4 * speed) * 0.1;
    for (const b of bubbles) {
      const phase = (t * 0.9 * speed + b.phase) % 1;
      const a = b.phase * 9.7;
      const r = Math.abs(Math.sin(b.phase * 5)) * 0.7;
      b.mesh.position.set(Math.cos(a) * r, 0.42 + phase * 0.85, Math.sin(a) * r);
      b.mesh.scale.setScalar((0.4 + phase * 1.1));
      b.mat.opacity = 0.85 * (1 - phase);
    }
    brewLight.intensity = 24 + Math.abs(Math.sin(t * 3.6 * speed)) * 14;
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
