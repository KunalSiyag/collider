import * as THREE from 'three';

export interface YoYoTrickOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createYoYoTrick(
  container: HTMLElement,
  options: YoYoTrickOptions = {},
): () => void {
  const { color = '#f472b6', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.4, 0.6, 5.2);
  camera.lookAt(0, 0.3, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(4, 6, 6);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 1, -3);
  scene.add(rim);

  // Anchor point at top (the "hand")
  const hand = new THREE.Group();
  hand.position.y = 2.0;
  scene.add(hand);
  const ringMat = new THREE.MeshStandardMaterial({
    color: '#e9e4f5',
    roughness: 0.6,
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.15,
  });
  const loop = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.03, 10, 32), ringMat);
  hand.add(loop);

  // String
  const stringMat = new THREE.LineBasicMaterial({ color: 0xf5f3ff });
  const stringGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, -1, 0),
  ]);
  const stringLine = new THREE.Line(stringGeo, stringMat);
  hand.add(stringLine);

  // Yo-yo body: two rims with an axle
  const yoyo = new THREE.Group();
  yoyo.position.y = -1;
  scene.add(yoyo);

  const shellMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    roughness: 0.25,
    clearcoat: 0.85,
    clearcoatRoughness: 0.2,
  });
  const capMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    metalness: 0.55,
    roughness: 0.3,
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.12,
  });

  for (const side of [-1, 1]) {
    const half = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.16, 44), shellMat);
    half.rotation.x = Math.PI / 2;
    half.position.z = side * 0.08;
    yoyo.add(half);
    const capRing = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.05, 12, 40), capMat);
    capRing.position.z = side * 0.17;
    yoyo.add(capRing);
  }
  const axle = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.34, 16), capMat);
  axle.rotation.x = Math.PI / 2;
  yoyo.add(axle);

  // Motion trail ghost rings
  interface Ghost { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; lag: number }
  const ghosts: Ghost[] = [];
  for (let i = 1; i <= 3; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const g = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.01, 6, 48), mat);
    scene.add(g);
    ghosts.push({ mesh: g, mat, lag: i * 0.06 });
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
    const t = clock.getElapsedTime() * speed;
    // Sleeper yo-yo: drops, idles spinning, climbs back up
    const dropPhase = (Math.sin(t * 0.9) + 1) / 2; // 0..1
    const ease = dropPhase * dropPhase * (3 - 2 * dropPhase); // smoothstep
    const length = 0.35 + ease * 1.9;
    yoyo.position.y = 2.0 - length;

    // Spin rate peaks while sleeping at the bottom
    const spinRate = (1 - ease) * 14 + 3;
    yoyo.rotation.z -= spinRate * 0.016;

    // Update string geometry to the current length
    const posAttr = stringLine.geometry.attributes.position as THREE.BufferAttribute;
    posAttr.setY(1, -length);
    posAttr.needsUpdate = true;

    for (const g of ghosts) {
      const pastT = t - g.lag * 2.2;
      const p = ((Math.sin(pastT * 0.9) + 1) / 2) ** 2 * (3 - 2 * (((Math.sin(pastT * 0.9) + 1) / 2)));
      const pl = 0.35 + p * 1.9;
      g.mesh.position.set(0, 2.0 - pl, 0);
      g.mat.opacity = 0.18 * (1 - g.lag * 3);
      g.mesh.rotation.z = yoyo.rotation.z;
    }
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
