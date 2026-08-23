import * as THREE from 'three';

export interface GongStrikeOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createGongStrike(
  container: HTMLElement,
  options: GongStrikeOptions = {},
): () => void {
  const { color = '#d4af6a', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.4, -0.3, 5.6);
  camera.lookAt(0, 0.2, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const key = new THREE.DirectionalLight(0xffffff, 2.5);
  key.position.set(3, 6, 7);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  // Frame
  const woodMat = new THREE.MeshStandardMaterial({ color: '#5b4632', roughness: 0.65 });
  const brassMat = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(color), metalness: 0.95, roughness: 0.22 });
  for (const side of [-1, 1]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.16, 3.4, 0.16), woodMat);
    post.position.set(side * 1.9, 0, -0.55);
    scene.add(post);
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.14, 1.3), woodMat);
    foot.position.set(side * 1.9, -1.72, -0.2);
    scene.add(foot);
  }
  const crossbar = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.18, 0.18), woodMat);
  crossbar.position.set(0, 1.62, -0.55);
  scene.add(crossbar);

  // Gong hangs from ropes
  const gongPivot = new THREE.Group();
  gongPivot.position.set(0, 1.53, -0.45);
  scene.add(gongPivot);
  const ropeMat = new THREE.LineBasicMaterial({ color: 0x8a7355 });
  for (const side of [-1, 1]) {
    const strGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(side * 0.85, 0, 0),
      new THREE.Vector3(side * 0.72, -0.35, 0),
    ]);
    gongPivot.add(new THREE.Line(strGeo, ropeMat));
  }

  // Gong disc: slightly domed with hammered rings
  const gongProfile: THREE.Vector2[] = [];
  for (let i = 12; i >= 0; i--) {
    const r = (i / 12) * 1.25;
    gongProfile.push(new THREE.Vector2(r, Math.pow(r / 1.25, 2) * 0.22));
  }
  const gong = new THREE.Mesh(new THREE.LatheGeometry(gongProfile, 56), brassMat);
  gong.rotation.x = Math.PI / 2;
  gong.position.y = -1.05;
  gongPivot.add(gong);
  // Hammered concentric grooves
  for (let i = 1; i < 6; i++) {
    const groove = new THREE.Mesh(
      new THREE.TorusGeometry(i * 0.19, 0.008, 6, 60),
      new THREE.MeshStandardMaterial({ color: '#8a6a2a', metalness: 0.9, roughness: 0.35 }),
    );
    groove.position.y = -1.05;
    gongPivot.add(groove);
  }

  // Striker mallet swinging in
  const striker = new THREE.Group();
  striker.position.set(1.7, -0.75, -0.42);
  scene.add(striker);
  const stickMat = new THREE.MeshStandardMaterial({ color: '#c47b3a', roughness: 0.6 });
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.95, 8), stickMat);
  shaft.rotation.z = Math.PI / 2 - 0.35;
  striker.add(shaft);
  const headMallet = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 12), new THREE.MeshStandardMaterial({ color: '#241b33', roughness: 0.7 }));
  headMallet.position.set(-0.44, 0.17, 0);
  striker.add(headMallet);

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
  let strikeT = 0;
  function tick() {
    raf = requestAnimationFrame(tick);
    strikeT += clock.getDelta() * speed;
    if (strikeT > 2.6) strikeT = 0;
    const t = clock.elapsedTime;
    // Mallet swings forward to hit then retreats
    const swingPhase = strikeT < 0.5 ? Math.sin((strikeT / 0.5) * Math.PI) : 0;
    striker.rotation.y = -swingPhase * 0.85;

    // Gong wobbles with decaying vibration
    const decay = Math.exp(-strikeT * 1.4);
    gongPivot.rotation.z = Math.sin(strikeT * 11) * 0.06 * decay;
    gong.scale.z = 1 + Math.abs(Math.sin(strikeT * 13)) * 0.05 * decay;
    brassMat.emissive = new THREE.Color(accentColor);
    brassMat.emissiveIntensity = decay * 0.35;
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
