import * as THREE from 'three';

export interface BirdcageOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createBirdcage(
  container: HTMLElement,
  options: BirdcageOptions = {},
): () => void {
  const { color = '#d4af6a', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.2, 1.6, 4.4);
  camera.lookAt(0, 0.3, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.3);
  key.position.set(4, 6, 4);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const cageMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(color), metalness: 0.85, roughness: 0.28 });

  const cage = new THREE.Group();
  scene.add(cage);

  // Base tray and top ring
  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.12, 0.14, 40), cageMat);
  base.position.y = -1.1;
  cage.add(base);
  const topRing = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.06, 10, 48), cageMat);
  topRing.rotation.x = Math.PI / 2;
  topRing.position.y = 1.15;
  cage.add(topRing);
  const finial = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 12), cageMat);
  finial.position.y = 1.32;
  cage.add(finial);
  const hookCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1.38, 0),
    new THREE.Vector3(0, 1.66, 0),
    new THREE.Vector3(0.18, 1.78, 0),
    new THREE.Vector3(0.16, 1.6, 0),
  ]);
  const hook = new THREE.Mesh(new THREE.TubeGeometry(hookCurve, 24, 0.03, 8), cageMat);
  cage.add(hook);

  // Vertical bars bulging outward
  const BARS = 18;
  for (let i = 0; i < BARS; i++) {
    const a = (i / BARS) * Math.PI * 2;
    const curvePts: THREE.Vector3[] = [];
    for (let j = 0; j <= 8; j++) {
      const y = -1.03 + (j / 8) * 2.18;
      const k = Math.sin((j / 8) * Math.PI);
      curvePts.push(new THREE.Vector3(Math.cos(a) * (0.35 + k * 0.72), y, Math.sin(a) * (0.35 + k * 0.72)));
    }
    const bar = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(curvePts), 24, 0.022, 6),
      cageMat,
    );
    cage.add(bar);
  }

  // Perch swing
  const perch = new THREE.Group();
  perch.position.y = 0.15;
  cage.add(perch);
  const dowel = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.0, 8), cageMat);
  dowel.rotation.z = Math.PI / 2;
  perch.add(dowel);
  for (const side of [-1, 1]) {
    const string = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.9, 6), cageMat);
    string.position.set(side * 0.5, -0.45, 0);
    perch.add(string);
  }

  // Tiny glowing bird
  const birdBody = new THREE.Group();
  birdBody.position.y = 0.32;
  perch.add(birdBody);
  const birdMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.7,
    roughness: 0.4,
  });
  birdBody.add(new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 12), birdMat));
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 10), birdMat);
  head.position.set(0.12, 0.09, 0);
  birdBody.add(head);
  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.08, 6), cageMat);
  beak.position.set(0.21, 0.09, 0);
  beak.rotation.z = -Math.PI / 2;
  birdBody.add(beak);

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
    cage.rotation.y = t * 0.35 * speed;
    perch.rotation.z = Math.sin(t * 1.5 * speed) * 0.08;
    birdBody.rotation.y = t * 1.2 * speed;
    birdBody.position.y = 0.32 + Math.abs(Math.sin(t * 2.4 * speed)) * 0.04;
    birdMat.emissiveIntensity = 0.5 + Math.abs(Math.sin(t * 3.0 * speed)) * 0.4;
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
