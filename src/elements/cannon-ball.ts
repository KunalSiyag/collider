import * as THREE from 'three';

export interface CannonBallOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createCannonBall(
  container: HTMLElement,
  options: { color?: string; accentColor?: string; speed?: number } = {},
): () => void {
  const { color = '#241b33', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 60);
  camera.position.set(3.6, 1.4, 5.0);
  camera.lookAt(-0.2, -0.7, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
  keyLight.position.set(4, 7, 6);
  scene.add(keyLight);
  const muzzleFlash = new THREE.PointLight('#ffb347', 0);
  muzzleFlash.position.set(-2.1, -0.35, 0);
  scene.add(muzzleFlash);

  // Ground
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(4.6, 44),
    new THREE.MeshStandardMaterial({ color: '#22301f', roughness: 1 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.55;
  scene.add(ground);

  const cannonGroup = new THREE.Group();
  cannonGroup.rotation.y = 0.35;
  scene.add(cannonGroup);

  const ironMat = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(color), metalness: 0.75, roughness: 0.32 });
  const brassMat = new THREE.MeshStandardMaterial({ color: '#d4af6a', metalness: 0.95, roughness: 0.2 });

  // Carriage
  for (const side of [-1, 1]) {
    const cheekShape = new THREE.Shape();
    cheekShape.moveTo(-1.05, -0.85);
    cheekShape.lineTo(0.95, -0.85);
    cheekShape.lineTo(0.8, -0.15);
    cheekShape.lineTo(0.25, 0.28);
    cheekShape.lineTo(-0.75, 0.12);
    cheekShape.lineTo(-1.05, -0.85);
    const cheek = new THREE.Mesh(new THREE.ExtrudeGeometry(cheekShape, { depth: 0.09, bevelEnabled: false }), new THREE.MeshStandardMaterial({ color: '#5b4632', roughness: 0.65 }));
    cheek.position.z = side * 0.34;
    cannonGroup.add(cheek);

    // Spoked wheel
    const wheel = new THREE.Group();
    wheel.position.set(-0.15, -0.72, side * 0.52);
    cannonGroup.add(wheel);
    const tire = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.05, 10, 30), new THREE.MeshStandardMaterial({ color: '#5b4632', roughness: 0.7 }));
    wheel.add(tire);
    for (let s = 0; s < 6; s++) {
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.78, 0.045), new THREE.MeshStandardMaterial({ color: '#c47b3a', roughness: 0.65 }));
      spoke.rotation.z = (s / 6) * Math.PI;
      wheel.add(spoke);
    }
    const hubCap = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 10), brassMat);
    wheel.add(hubCap);
  }

  // Barrel on trunnions
  const barrelPivot = new THREE.Group();
  barrelPivot.position.set(-0.1, 0.02, 0);
  barrelPivot.rotation.z = 0.18;
  cannonGroup.add(barrelPivot);
  const tubeProfile: THREE.Vector2[] = [
    new THREE.Vector2(0.16, -1.35),
    new THREE.Vector2(0.19, -0.9),
    new THREE.Vector2(0.23, 0),
    new THREE.Vector2(0.26, 0.9),
    new THREE.Vector2(0.29, 1.3),
    new THREE.Vector2(0.27, 1.36),
  ];
  const barrel = new THREE.Mesh(new THREE.LatheGeometry(tubeProfile.map((p) => p.clone()), 30), ironMat);
  barrel.rotation.x = Math.PI / 2;
  barrel.rotation.y = Math.PI / 2;
  barrel.position.set(0, 0.42, 0);
  barrel.rotation.set(Math.PI / 2, 0, Math.PI / 2);
  barrelPivot.add(barrel);
  // Muzzle ring
  const muzzleRing = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.04, 10, 30), brassMat);
  muzzleRing.rotation.y = Math.PI / 2;
  muzzleRing.position.set(0, 0.42, -1.33);
  barrelPivot.add(muzzleRing);
  void muzzleRing;
  void tubeProfile;

  // Cannonball stack pyramid
  const ballMat = new THREE.MeshStandardMaterial({ color: '#17121f', metalness: 0.85, roughness: 0.25 });
  const balls: THREE.Mesh[] = [];
  const rows = 3;
  for (let r = 0; r < rows; r++) {
    for (let i = 0; i <= rows - 1 - r; i++) {
      const ball = new THREE.Mesh(new THREE.SphereGeometry(0.17, 18, 14), ballMat);
      ball.position.set(1.45 + (i + r * 0.5) * 0.36 - 0.36, -1.16 + r * 0.31, 0.62);
      scene.add(ball);
      balls.push(ball);
    }
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
  let fireT = 0;
  function tick() {
    raf = requestAnimationFrame(tick);
    fireT += clock.getDelta() * speed;
    if (fireT > 2.8) fireT = 0;
    const t = clock.elapsedTime;
    cannonGroup.rotation.y = 0.35 + Math.sin(t * 0.3 * speed) * 0.3;
    // Recoil kick after the shot
    const recoil = fireT > 2.0 ? Math.exp(-(fireT - 2.0) * 5) : 0;
    barrelPivot.position.x = -0.1 - recoil * 0.3;
    barrelPivot.rotation.z = 0.18 + recoil * 0.08;
    muzzleFlash.intensity = fireT > 2.0 && fireT < 2.15 ? 60 * (1 - (fireT - 2.0) / 0.15) : 0;
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
