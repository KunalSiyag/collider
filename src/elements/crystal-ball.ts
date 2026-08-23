import * as THREE from 'three';

export interface CrystalBallOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createCrystalBall(
  container: HTMLElement,
  options: CrystalBallOptions = {},
): () => void {
  const { color = '#a78bfa', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.4, 0.5, 4.6);
  camera.lookAt(0, 0.15, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  const innerLight = new THREE.PointLight(new THREE.Color(accentColor), 22);
  innerLight.position.set(0, 0.55, 0);
  scene.add(innerLight);
  const rim = new THREE.PointLight(new THREE.Color(color), 24);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const ballGroup = new THREE.Group();
  scene.add(ballGroup);

  // Ornate base
  const baseMat = new THREE.MeshPhysicalMaterial({ color: '#3a2b52', roughness: 0.4, clearcoat: 0.6 });
  const goldMat = new THREE.MeshStandardMaterial({ color: '#d4af6a', metalness: 0.95, roughness: 0.2 });
  const baseProfile: THREE.Vector2[] = [
    new THREE.Vector2(0.62, 0),
    new THREE.Vector2(0.68, 0.08),
    new THREE.Vector2(0.56, 0.22),
    new THREE.Vector2(0.44, 0.34),
    new THREE.Vector2(0.46, 0.42),
    new THREE.Vector2(0.4, 0.46),
  ];
  const baseMesh = new THREE.Mesh(new THREE.LatheGeometry(baseProfile, 40), baseMat);
  baseMesh.position.y = -0.95;
  ballGroup.add(baseMesh);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const clawCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(Math.cos(a) * 0.62, -0.93, Math.sin(a) * 0.62),
      new THREE.Vector3(Math.cos(a) * 0.48, -0.72, Math.sin(a) * 0.48),
      new THREE.Vector3(Math.cos(a) * 0.4, -0.5, Math.sin(a) * 0.4),
    ]);
    const claw = new THREE.Mesh(new THREE.TubeGeometry(clawCurve, 14, 0.032, 8), goldMat);
    ballGroup.add(claw);
    const clawTip = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), goldMat);
    clawTip.position.set(Math.cos(a) * 0.4, -0.49, Math.sin(a) * 0.4);
    ballGroup.add(clawTip);
  }

  // Glass sphere
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xdfe9ff,
    transmission: 0.92,
    roughness: 0.02,
    thickness: 1.1,
    ior: 1.5,
    transparent: true,
    opacity: 0.92,
    clearcoat: 1,
    clearcoatRoughness: 0,
  });
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.95, 48, 32), glassMat);
  sphere.position.y = 0.35;
  ballGroup.add(sphere);
  void color;

  // Swirling mist inside (shader-free: layered translucent spheres)
  interface Mist { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; rate: number; axis: THREE.Vector3 }
  const mists: Mist[] = [];
  for (let i = 0; i < 4; i++) {
    const hueShift = i % 2 ? accentColor : '#f472b6';
    const mistMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(hueShift),
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const mistMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.55 + i * 0.09, 20, 16),
      mistMat,
    );
    mistMesh.scale.set(1, 0.45 + i * 0.08, 1);
    mistMesh.position.y = 0.35 + (i % 2) * 0.12;
    ballGroup.add(mistMesh);
    mists.push({
      mesh: mistMesh,
      mat: mistMat,
      rate: (i % 2 ? 1 : -1) * (0.5 + i * 0.25),
      axis: new THREE.Vector3(Math.random() - 0.5, 1, Math.random() - 0.5).normalize(),
    });
  }

  // Fortune sparkles orbiting inside
  interface Spark { mesh: THREE.Mesh; a: number; r: number; y: number; rate: number }
  const sparks: Spark[] = [];
  for (let i = 0; i < 14; i++) {
    const sparkMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(i % 3 === 0 ? accentColor : '#e9e4f5'),
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const spark = new THREE.Mesh(new THREE.OctahedronGeometry(0.02 + (i % 3) * 0.008, 0), sparkMat);
    ballGroup.add(spark);
    sparks.push({ mesh: spark, a: (i / 14) * Math.PI * 2, r: 0.3 + (i % 5) * 0.11, y: 0.15 + (i % 4) * 0.16, rate: 0.7 + (i % 3) * 0.4 });
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
    ballGroup.rotation.y = Math.sin(t * 0.35 * speed) * 0.3;
    ballGroup.position.y = Math.sin(t * 1.0 * speed) * 0.04;
    for (const m of mists) {
      m.mesh.rotateOnAxis(m.axis, m.rate * 0.01 * speed);
      m.mat.opacity = 0.08 + Math.abs(Math.sin(t * 1.3 * speed + m.rate)) * 0.1;
    }
    for (const s of sparks) {
      s.a += s.rate * 0.012 * speed;
      s.mesh.position.set(Math.cos(s.a) * s.r, s.y + Math.sin(s.a * 2.3) * 0.12, Math.sin(s.a) * s.r);
      s.mesh.rotation.y += 0.08;
    }
    innerLight.intensity = 18 + Math.abs(Math.sin(t * 2.1 * speed)) * 12;
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
