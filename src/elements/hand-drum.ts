import * as THREE from 'three';

export interface HandDrumOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createHandDrum(
  container: HTMLElement,
  options: HandDrumOptions = {},
): () => void {
  const { color = '#8b5cf6', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.4, 0.9, 4.4);
  camera.lookAt(0, -0.35, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(4, 6, 5);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 1, -3);
  scene.add(rim);

  const drum = new THREE.Group();
  drum.rotation.z = 0.16;
  scene.add(drum);

  // Barrel shell via lathe with a belly bulge
  const profile: THREE.Vector2[] = [
    new THREE.Vector2(0.72, -0.85),
    new THREE.Vector2(0.82, -0.5),
    new THREE.Vector2(0.92, 0),
    new THREE.Vector2(0.82, 0.5),
    new THREE.Vector2(0.72, 0.85),
  ];
  const shellMat = new THREE.MeshPhysicalMaterial({ color: '#5b4632', roughness: 0.55, clearcoat: 0.35 });
  const shell = new THREE.Mesh(new THREE.LatheGeometry(profile, 44), shellMat);
  drum.add(shell);

  // Rope zigzag lacing
  const ropeMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: 0.7,
    emissive: new THREE.Color(color),
    emissiveIntensity: 0.12,
  });
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2;
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(Math.cos(a) * 0.74, -0.86, Math.sin(a) * 0.74),
      new THREE.Vector3(Math.cos(a) * 0.98, -0.42, Math.sin(a) * 0.98),
      new THREE.Vector3(Math.cos(a + 0.22) * 1.0, 0, Math.sin(a + 0.22) * 1.0),
      new THREE.Vector3(Math.cos(a + 0.22) * 0.98, 0.44, Math.sin(a + 0.22) * 0.98),
      new THREE.Vector3(Math.cos(a + 0.22) * 0.74, 0.87, Math.sin(a + 0.22) * 0.74),
    ]);
    const lace = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.02, 6), ropeMat);
    drum.add(lace);
  }

  // Top skin
  const skinMat = new THREE.MeshStandardMaterial({ color: '#e9dcc3', roughness: 0.75 });
  const skin = new THREE.Mesh(new THREE.CircleGeometry(0.73, 40), skinMat);
  skin.rotation.x = -Math.PI / 2;
  skin.position.y = 0.855;
  drum.add(skin);
  // Rim hoop on top
  const hoopMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    metalness: 0.6,
    roughness: 0.3,
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.25,
  });
  const hoop = new THREE.Mesh(new THREE.TorusGeometry(0.74, 0.045, 10, 48), hoopMat);
  hoop.rotation.x = Math.PI / 2;
  hoop.position.y = 0.84;
  drum.add(hoop);

  // Mallets resting beside the drum
  interface Mallet { group: THREE.Group; phase: number }
  const mallets: Mallet[] = [];
  const stickMat = new THREE.MeshStandardMaterial({ color: '#c47b3a', roughness: 0.6 });
  for (let m = 0; m < 2; m++) {
    const g = new THREE.Group();
    const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.15, 8), stickMat);
    stick.rotation.z = Math.PI / 2 - 0.5;
    g.add(stick);
    const headMallet = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 12), hoopMat);
    headMallet.position.set(-0.52, 0.28, 0);
    g.add(headMallet);
    g.position.set(1.05 + m * 0.25, 0.55, 0.35 - m * 0.55);
    drum.add(g);
    mallets.push({ group: g, phase: m * 1.6 });
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
  let beatT = 0;
  function tick() {
    raf = requestAnimationFrame(tick);
    beatT += clock.getDelta() * speed;
    const t = clock.elapsedTime;
    if (beatT > 1.2) beatT = 0;
    // Skin ripple after each beat
    const hit = Math.exp(-beatT * 7);
    skin.scale.setScalar(1 + hit * 0.06);
    skin.position.y = 0.855 + hit * 0.04;
    drum.rotation.y = t * 0.45 * speed;
    drum.position.y = Math.sin(t * 1.0 * speed) * 0.04 - 0.35;
    hoopMat.emissiveIntensity = 0.2 + hit * 0.9;
    for (const ml of mallets) {
      ml.group.rotation.x = Math.sin(t * 3.2 * speed + ml.phase) * 0.25;
    }
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
