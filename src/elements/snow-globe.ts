import * as THREE from 'three';

export interface SnowGlobeOptions {
  count?: number;
}

export function createSnowGlobe(container: HTMLElement, options: SnowGlobeOptions = {}): () => void {
  const { count = 700 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#0b0b10', 10, 30);
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 50);
  camera.position.set(3, 2.5, 9);
  camera.lookAt(0, -1, 0);

  let seed = 122520;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const groundGeo = new THREE.CircleGeometry(6.4, 48);
  const groundMat = new THREE.MeshStandardMaterial({ color: '#dfe8f2', roughness: 0.95 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -2;
  scene.add(ground);

  const houseGeo = [
    new THREE.BoxGeometry(1.6, 1.4, 1.4),
    new THREE.ConeGeometry(1.4, 1.1, 4),
  ];
  const houseMat = new THREE.MeshStandardMaterial({ color: '#3c3550', roughness: 0.85 });
  const roofMat = new THREE.MeshStandardMaterial({ color: '#8b5cf6', roughness: 0.7 });
  const house = new THREE.Group();
  const body = new THREE.Mesh(houseGeo[0], houseMat);
  const roof = new THREE.Mesh(houseGeo[1], roofMat);
  roof.position.y = 1.25;
  roof.rotation.y = Math.PI / 4;
  house.add(body, roof);
  house.position.set(-0.5, -1.3, 0);
  scene.add(house);

  for (let i = 0; i < 5; i++) {
    const treeHeight = 1 + rand() * 1.4;
    const treeGeo = new THREE.ConeGeometry(0.45 + rand() * 0.25, treeHeight, 7);
    const tree = new THREE.Mesh(treeGeo, new THREE.MeshStandardMaterial({ color: '#1f4038', roughness: 0.9 }));
    const angle = rand() * Math.PI * 2;
    const dist = 1.6 + rand() * 3.6;
    tree.position.set(Math.cos(angle) * dist, -2 + treeHeight / 2, Math.sin(angle) * dist);
    scene.add(tree);
  }

  const snowGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (rand() - 0.5) * 12;
    positions[i * 3 + 1] = rand() * 12 - 2;
    positions[i * 3 + 2] = (rand() - 0.5) * 12;
    speeds[i] = 0.6 + rand() * 1.4;
  }
  snowGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const snow = new THREE.Points(
    snowGeo,
    new THREE.PointsMaterial({ color: '#ffffff', size: 0.08, transparent: true, opacity: 0.9 }),
  );
  scene.add(snow);

  scene.add(new THREE.AmbientLight('#8899cc', 1.6));
  const moonLight = new THREE.DirectionalLight('#e0e7ff', 1.8);
  moonLight.position.set(-6, 10, 4);
  scene.add(moonLight);

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
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.getElapsedTime();
    const attr = snowGeo.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      let y = attr.getY(i) - speeds[i] * dt;
      let x = attr.getX(i) + Math.sin(t * 0.8 + i) * dt * 0.4;
      if (y < -2) {
        y = 10;
        x = (rand() - 0.5) * 12;
      }
      attr.setY(i, y);
      attr.setX(i, x);
    }
    attr.needsUpdate = true;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    groundGeo.dispose();
    groundMat.dispose();
    for (const geo of houseGeo) geo.dispose();
    houseMat.dispose();
    roofMat.dispose();
    snowGeo.dispose();
    snow.material.dispose();
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh && obj !== body && obj !== roof && obj !== ground) {
        obj.geometry.dispose();
        obj.material.dispose?.();
      }
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
