import * as THREE from 'three';

export interface HeadphonesOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createHeadphones(
  container: HTMLElement,
  options: HeadphonesOptions = {},
): () => void {
  const { color = '#241b33', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.5, -0.4, 4.8);
  camera.lookAt(0, 0.3, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(4, 6, 6);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 0, -3);
  scene.add(rim);

  const phones = new THREE.Group();
  scene.add(phones);

  const shellMat = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(color), roughness: 0.35, clearcoat: 0.55 });
  const cushionMat = new THREE.MeshStandardMaterial({ color: '#17121f', roughness: 0.85 });
  const glowMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.7,
    roughness: 0.3,
  });

  // Headband arc
  const bandProfile: THREE.Vector2[] = [];
  for (let i = 0; i <= 12; i++) {
    const a = Math.PI * (i / 12);
    bandProfile.push(new THREE.Vector2(Math.cos(a) * 1.25, Math.sin(a) * 1.05));
  }
  const bandShape = new THREE.Shape(bandProfile);
  const innerArc: THREE.Vector2[] = [];
  for (let i = 12; i >= 0; i--) {
    const a = Math.PI * (i / 12);
    innerArc.push(new THREE.Vector2(Math.cos(a) * 1.08, Math.sin(a) * 0.88));
  }
  const bandPath = new THREE.Path(innerArc);
  bandShape.holes.push(bandPath);
  const headband = new THREE.Mesh(
    new THREE.ExtrudeGeometry(bandShape, { depth: 0.16, bevelEnabled: false }),
    shellMat,
  );
  headband.position.z = -0.08;
  phones.add(headband);

  // Cushion strip along the top of the band
  const cushionCurvePts: THREE.Vector3[] = [];
  for (let i = 0; i <= 12; i++) {
    const a = Math.PI * (0.15 + (i / 12) * 0.7);
    cushionCurvePts.push(new THREE.Vector3(Math.cos(a) * 1.16, Math.sin(a) * 0.96, 0));
  }
  const cushionStrip = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(cushionCurvePts), 32, 0.07, 10),
    cushionMat,
  );
  phones.add(cushionStrip);

  // Ear cups with yokes
  interface Cup { group: THREE.Group; side: number; ringMat: THREE.MeshStandardMaterial }
  const cups: Cup[] = [];
  for (const side of [-1, 1]) {
    const cupGroup = new THREE.Group();
    cupGroup.position.set(side * 1.18, -0.18, 0);
    phones.add(cupGroup);

    // Yoke fork
    const yokeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.02, 0),
      new THREE.Vector3(side * 0.12, 0.72, 0),
      new THREE.Vector3(side * 0.06, 0.42, 0),
    ]);
    const yoke = new THREE.Mesh(new THREE.TubeGeometry(yokeCurve, 20, 0.05, 10), shellMat);
    cupGroup.add(yoke);

    // Outer shell
    const shell = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.56, 0.3, 32), shellMat);
    shell.rotation.z = Math.PI / 2;
    shell.rotation.y = side * 0.12;
    cupGroup.add(shell);

    // Glowing accent ring on the outer face
    const ringMat = glowMat.clone();
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.03, 10, 40), ringMat);
    ring.rotation.y = Math.PI / 2;
    ring.position.x = side * 0.17;
    cupGroup.add(ring);

    // Ear cushion
    const cushion = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.12, 14, 36), cushionMat);
    cushion.rotation.y = Math.PI / 2;
    cushion.position.x = side * -0.16;
    cupGroup.add(cushion);

    cups.push({ group: cupGroup, side, ringMat });
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
    phones.rotation.y = t * 0.5 * speed;
    phones.rotation.x = Math.sin(t * 0.6 * speed) * 0.12;
    phones.position.y = 0.3 + Math.sin(t * 1.0 * speed) * 0.07;
    // Rings pulse to a beat
    for (const c of cups) {
      c.ringMat.emissiveIntensity =
        0.4 + Math.pow(Math.abs(Math.sin(t * 2.6 * speed)), 4) * 1.1;
      c.group.scale.setScalar(1 + Math.pow(Math.abs(Math.sin(t * 2.6 * speed)), 8) * 0.04);
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
