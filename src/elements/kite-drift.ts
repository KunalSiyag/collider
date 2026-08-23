import * as THREE from 'three';

export interface KiteDriftOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createKiteDrift(
  container: HTMLElement,
  options: KiteDriftOptions = {},
): () => void {
  const { color = '#8b5cf6', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 60);
  camera.position.set(2.4, 1.4, 6.2);
  camera.lookAt(0, -0.6, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.65));
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(4, 6, 5);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const group = new THREE.Group();
  scene.add(group);

  // Diamond kite: extruded rhombus with a slight bow
  const silkMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    side: THREE.DoubleSide,
    roughness: 0.7,
  });
  const diamond = new THREE.Shape();
  diamond.moveTo(0, 1.15);
  diamond.lineTo(0.85, 0);
  diamond.lineTo(0, -1.45);
  diamond.lineTo(-0.85, 0);
  diamond.lineTo(0, 1.15);
  const sail = new THREE.Mesh(
    new THREE.ExtrudeGeometry(diamond, { depth: 0.02, bevelEnabled: false }),
    silkMat,
  );
  group.add(sail);

  // Spine and spar
  const stickMat = new THREE.MeshStandardMaterial({ color: '#d4c39a', roughness: 0.7 });
  const spine = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.62, 8), stickMat);
  group.add(spine);
  const spar = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.72, 8), stickMat);
  spar.rotation.z = Math.PI / 2;
  group.add(spar);

  // Cross-ribbon stripes
  const ribbonMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.35,
    side: THREE.DoubleSide,
  });
  for (const sy of [-1, 1]) {
    const stripe = new THREE.Mesh(new THREE.PlaneGeometry(1.35 - Math.abs(sy) * 0.25, 0.16), ribbonMat);
    stripe.position.set(0, sy * 0.42 + (sy > 0 ? 0.12 : -0.12), 0.03);
    group.add(stripe);
  }

  // Tail with bows
  const tailCurvePts: THREE.Vector3[] = [];
  for (let i = 0; i <= 10; i++) {
    tailCurvePts.push(new THREE.Vector3(Math.sin(i * 0.9) * 0.28, -1.45 - i * 0.34, 0));
  }
  const tailCurve = new THREE.CatmullRomCurve3(tailCurvePts);
  const tail = new THREE.Mesh(new THREE.TubeGeometry(tailCurve, 40, 0.022, 6), stickMat);
  group.add(tail);
  for (let i = 1; i <= 5; i++) {
    const p = tailCurve.getPoint(i / 5.5);
    const bow = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.1, 0.03), ribbonMat);
    bow.position.copy(p);
    bow.rotation.z = i * 0.8;
    group.add(bow);
  }
  void color;

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
    group.position.x = Math.sin(t * 0.55 * speed) * 0.7;
    group.position.y = -0.4 + Math.sin(t * 0.85 * speed) * 0.35;
    group.rotation.z = Math.sin(t * 0.7 * speed) * 0.28;
    group.rotation.y = Math.sin(t * 0.45 * speed) * 0.5;
    group.rotation.x = Math.sin(t * 0.9 * speed) * 0.12;
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
