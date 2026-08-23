import * as THREE from 'three';

export interface MoaiStatueOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createMoaiStatue(
  container: HTMLElement,
  options: MoaiStatueOptions = {},
): () => void {
  const { color = '#8a93a8', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 60);
  camera.position.set(2.6, 0.4, 5.0);
  camera.lookAt(0, -0.5, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
  keyLight.position.set(4, 6, 6);
  keyLight.castShadow = false;
  scene.add(keyLight);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 24);
  rim.position.set(-4, 1, -3);
  scene.add(rim);

  // Grass ground
  const groundMat = new THREE.MeshStandardMaterial({ color: '#2c3a26', roughness: 1 });
  const ground = new THREE.Mesh(new THREE.CircleGeometry(4.2, 44), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.85;
  scene.add(ground);

  const moaiGroup = new THREE.Group();
  scene.add(moaiGroup);

  // Head carved from a box with heavy bevel-ish shaping
  const stoneMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(color).multiplyScalar(0.62), roughness: 0.92 });

  const headShape = new THREE.Shape();
  headShape.moveTo(-0.72, 0);
  headShape.lineTo(0.72, 0);
  headShape.lineTo(0.66, 1.15);
  headShape.lineTo(0.42, 1.95);
  headShape.lineTo(-0.42, 1.95);
  headShape.lineTo(-0.66, 1.15);
  headShape.lineTo(-0.72, 0);
  const headGeo = new THREE.ExtrudeGeometry(headShape, { depth: 1.05, bevelEnabled: true, bevelSize: 0.12, bevelThickness: 0.14, bevelSegments: 3 });
  const head = new THREE.Mesh(headGeo, stoneMat);
  head.position.set(0, -1.8, -0.52);
  moaiGroup.add(head);

  // Brow ridge
  const brow = new THREE.Mesh(new THREE.BoxGeometry(1.28, 0.16, 0.34), stoneMat);
  brow.position.set(0, 0.52, 0.56);
  brow.rotation.z = 0;
  moaiGroup.add(brow);

  // Deep-set eyes
  for (const side of [-1, 1]) {
    const eyeSocket = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.16, 0.16), stoneDark());
    eyeSocket.position.set(side * 0.32, 0.36, 0.6);
    moaiGroup.add(eyeSocket);
    const eyeball = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 10), stoneMat);
    eyeball.scale.z = 0.6;
    eyeball.position.set(side * 0.32, 0.35, 0.64);
    moaiGroup.add(eyeball);
  }
  function stoneDark() {
    return new THREE.MeshStandardMaterial({ color: '#17121f', roughness: 0.9 });
  }

  // Elongated nose
  const noseBridge = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.7, 0.2), stoneMat);
  noseBridge.position.set(0, 0.02, 0.62);
  moaiGroup.add(noseBridge);
  const noseTip = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.16, 0.22), stoneMat);
  noseTip.position.set(0, -0.34, 0.63);
  moaiGroup.add(noseTip);

  // Thin pressed lips
  const lips = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.08, 0.16), stoneDark());
  lips.position.set(0, -0.68, 0.58);
  moaiGroup.add(lips);

  // Long ears
  for (const side of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.85, 0.2), stoneMat);
    ear.position.set(side * 0.74, -0.05, 0.3);
    ear.rotation.z = side * 0.06;
    moaiGroup.add(ear);
  }

  // Pukao topknot hat
  const pukaoMat = new THREE.MeshStandardMaterial({ color: '#a5502e', roughness: 0.85 });
  const pukao = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.42, 0.5, 24), pukaoMat);
  pukao.position.y = 2.1;
  pukao.rotation.z = 0.12;
  moaiGroup.add(pukao);

  // Buried shoulders hint
  const shoulders = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.5, 1.1), stoneMat);
  shoulders.position.y = -1.95;
  moaiGroup.add(shoulders);

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
    moaiGroup.rotation.y = Math.sin(t * 0.35 * speed) * 0.55;
    moaiGroup.position.y = Math.sin(t * 0.8 * speed) * 0.04 + 0.25;
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
