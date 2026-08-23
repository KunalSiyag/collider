import * as THREE from 'three';

export interface SunflowerHeadOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createSunflowerHead(
  container: HTMLElement,
  options: SunflowerHeadOptions = {},
): () => void {
  const { color = '#ffd23f', accentColor = '#8b5cf6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(1.4, -0.6, 5.0);
  camera.lookAt(0, -0.2, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  // Warm sun
  const sunLight = new THREE.DirectionalLight('#fff2d9', 2.6);
  scene.add(sunLight);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 22);
  rim.position.set(-4, 1, -3);
  scene.add(rim);

  // Sky marker sun that the flower tracks
  const sunBall = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 20, 16),
    new THREE.MeshBasicMaterial({ color: '#fff2c9' }),
  );
  scene.add(sunBall);

  const plantGroup = new THREE.Group();
  scene.add(plantGroup);

  const stemMat = new THREE.MeshStandardMaterial({ color: '#3f7d43', roughness: 0.7 });
  const stemCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.15, -2.1, 0),
    new THREE.Vector3(-0.05, -1.2, 0.05),
    new THREE.Vector3(0.08, -0.35, 0),
  ]);
  const stem = new THREE.Mesh(new THREE.TubeGeometry(stemCurve, 24, 0.06, 10), stemMat);
  plantGroup.add(stem);

  // Leaves
  for (const [side, y] of [[-1, -1.45], [1, -0.85]] as const) {
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, 0);
    leafShape.quadraticCurveTo(side * 0.55, 0.12, side * 0.95, -0.05);
    leafShape.quadraticCurveTo(side * 0.5, -0.22, 0, 0);
    const leaf = new THREE.Mesh(new THREE.ShapeGeometry(leafShape), stemMat);
    leaf.position.set(side * 0.04, y, 0.02);
    leaf.rotation.x = -0.25;
    leaf.material.side = THREE.DoubleSide;
    plantGroup.add(leaf);
  }

  // Flower head at the stem tip, pivots to track the sun
  const headPivot = new THREE.Group();
  headPivot.position.set(0.08, -0.32, 0);
  plantGroup.add(headPivot);

  // Petals arranged in two rings (golden-angle offsets)
  const petalMatFront = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: 0.55,
    emissive: new THREE.Color(color),
    emissiveIntensity: 0.18,
    side: THREE.DoubleSide,
  });
  const PETALS = 22;
  interface Petal { mesh: THREE.Mesh; baseZ: number }
  const petals: Petal[] = [];
  for (let i = 0; i < PETALS * 2; i++) {
    const ring = i < PETALS ? 0 : 1;
    const a = ((i % PETALS) / PETALS) * Math.PI * 2 + ring * (Math.PI / PETALS) + ring * 0.12;
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.quadraticCurveTo(0.14, 0.28, 0, 0.62 + ring * 0.08);
    petalShape.quadraticCurveTo(-0.14, 0.28, 0, 0);
    const petalGeo = new THREE.ExtrudeGeometry(petalShape, { depth: 0.03, bevelEnabled: false });
    const petalMesh = new THREE.Mesh(petalGeo, petalMatFront);
    const holder = new THREE.Group();
    holder.rotation.z = a;
    petalMesh.position.y = 0.34 + ring * 0.03;
    holder.add(petalMesh);
    holder.rotation.x = ring === 0 ? 0 : 0.16;
    headPivot.add(holder);
    petals.push({ mesh: petalMesh, baseZ: 0.03 });
  }

  // Seed disk with fibonacci dots
  const diskMat = new THREE.MeshStandardMaterial({ color: '#5b4632', roughness: 0.9 });
  const disk = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.09, 36), diskMat);
  disk.rotation.x = Math.PI / 2;
  disk.position.y = 0.3;
  headPivot.add(disk);
  const seedMat = new THREE.MeshStandardMaterial({
    color: '#3a2b52',
    roughness: 0.7,
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.12,
  });
  const seeds: THREE.Mesh[] = [];
  for (let i = 1; i <= 60; i++) {
    const r = Math.sqrt(i / 60) * 0.38;
    const a = i * 2.39996; // golden angle
    const seed = new THREE.Mesh(new THREE.SphereGeometry(0.026, 6, 6), seedMat);
    seed.position.set(Math.cos(a) * r, 0.36, Math.sin(a) * r);
    seed.scale.z = 0.5;
    headPivot.add(seed);
    seeds.push(seed);
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
    // Sun arcs overhead; the head follows it
    const sunA = t * 0.3 * speed;
    const sunPos = new THREE.Vector3(Math.cos(sunA) * 6, Math.sin(sunA * 0.6) * 3 + 2, 1);
    sunLight.position.copy(sunPos);
    sunBall.position.copy(sunPos).multiplyScalar(0.4);

    const toSun = sunPos.clone().normalize();
    const yaw = Math.atan2(toSun.x, toSun.z) * 0.5;
    const pitch = Math.atan2(toSun.y, Math.sqrt(toSun.x ** 2 + toSun.z ** 2));
    headPivot.rotation.y += (yaw - headPivot.rotation.y) * 0.03;
    headPivot.rotation.x += ((pitch - 0.9) - headPivot.rotation.x) * 0.03;

    plantGroup.rotation.z = Math.sin(t * 0.7 * speed) * 0.05;
    plantGroup.rotation.x = Math.sin(t * 0.5 * speed) * 0.04;

    // Gentle petal flutter
    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      p.mesh.rotation.z = Math.sin(t * 2.2 * speed + i * 0.4) * 0.05;
    }
    seedMat.emissiveIntensity = 0.08 + Math.abs(Math.sin(t * 1.4 * speed)) * 0.15;
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
