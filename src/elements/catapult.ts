import * as THREE from 'three';

export interface CatapultOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createCatapult(
  container: HTMLElement,
  options: CatapultOptions = {},
): () => void {
  const { color = '#5b4632', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 60);
  camera.position.set(4.2, 1.8, 5.2);
  camera.lookAt(0, -0.6, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
  keyLight.position.set(4, 7, 5);
  scene.add(keyLight);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 24);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  // Grass ground
  const groundMat = new THREE.MeshStandardMaterial({ color: '#22301f', roughness: 1 });
  const ground = new THREE.Mesh(new THREE.CircleGeometry(4.4, 44), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.7;
  scene.add(ground);

  const catapult = new THREE.Group();
  scene.add(catapult);

  const woodMat = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(color), roughness: 0.65 });
  const ropeMat = new THREE.MeshStandardMaterial({ color: '#8a7355', roughness: 0.85 });

  // Base frame
  for (const side of [-1, 1]) {
    const railA = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.14, 0.16), woodMat);
    railA.position.set(0.15, -1.55, side * 0.42);
    catapult.add(railA);
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.1, 20), woodMat);
    wheel.rotation.x = Math.PI / 2;
    wheel.position.set(side > 0 ? 1.25 : -1.05, -1.36, side * 0.42);
    catapult.add(wheel);
    const spokeMat = woodMat;
    for (let s = 0; s < 4; s++) {
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.62, 0.04), spokeMat);
      spoke.rotation.z = (s / 4) * Math.PI * 2;
      spoke.position.copy(wheel.position);
      spoke.rotation.y = 0;
      catapult.add(spoke);
      void spoke;
    }
  }
  const crossBeam = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.14, 1.0), woodMat);
  crossBeam.position.set(0.15, -1.55, 0);
  catapult.add(crossBeam);

  // A-frame uprights with axle
  const armPivot = new THREE.Group();
  armPivot.position.set(0.15, -0.75, 0);
  catapult.add(armPivot);
  for (const [dx] of [[-0.28], [0.28]] as const) {
    const legF = new THREE.Mesh(new THREE.BoxGeometry(0.13, 1.15, 0.13), woodMat);
    legF.position.set(dx, 0.32, 0.3);
    legF.rotation.z = -dx * 1.4;
    armPivot.add(legF);
    const legB = new THREE.Mesh(new THREE.BoxGeometry(0.13, 1.15, 0.13), woodMat);
    legB.position.set(dx, 0.32, -0.3);
    legB.rotation.z = -dx * 1.4;
    armPivot.add(legB);
  }

  // Throwing arm
  const arm = new THREE.Group();
  armPivot.add(arm);
  const beam = new THREE.Mesh(new THREE.BoxGeometry(0.16, 2.5, 0.12), woodMat);
  beam.position.y = 0.75;
  arm.add(beam);
  const spoonShape = new THREE.Shape();
  spoonShape.absarc(0, 0, 0.26, 0, Math.PI * 1.25, false);
  spoonShape.lineTo(0, 0);
  const spoon = new THREE.Mesh(
    new THREE.ExtrudeGeometry(spoonShape, { depth: 0.1, bevelEnabled: false }),
    ropeMat,
  );
  spoon.position.set(0, 2.02, -0.06);
  arm.add(spoon);
  // Counterweight box on the short end
  const weightBox = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), new THREE.MeshStandardMaterial({ color: '#3a3350', metalness: 0.5, roughness: 0.45 }));
  weightBox.position.y = -0.52;
  arm.add(weightBox);

  // Payload boulder
  const boulderMat = new THREE.MeshStandardMaterial({ color: '#6a7080', roughness: 0.95, flatShading: true });
  const boulder = new THREE.Mesh(new THREE.DodecahedronGeometry(0.19, 0), boulderMat);
  boulder.position.set(0, 2.18, 0);
  arm.add(boulder);

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
  let cycleT = 0;
  function tick() {
    raf = requestAnimationFrame(tick);
    cycleT += clock.getDelta() * speed;
    if (cycleT > 3.2) cycleT = 0;
    const t = clock.elapsedTime;
    // Wind up slowly, snap forward, settle back
    let angle: number;
    if (cycleT < 2.0) {
      angle = THREE.MathUtils.lerp(0.95, -0.85, Math.min(cycleT / 2.0, 1) ** 2); // slow wind-down
    } else if (cycleT < 2.25) {
      angle = THREE.MathUtils.lerp(-0.85, 0.95, ((cycleT - 2.0) / 0.25) ** 3); // fire!
    } else {
      angle = 0.95 + Math.sin((cycleT - 2.25) * 18) * 0.08 * Math.exp(-(cycleT - 2.25) * 3);
    }
    arm.rotation.z = angle;
    catapult.rotation.y = Math.sin(t * 0.25 * speed) * 0.2;
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
