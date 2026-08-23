import * as THREE from 'three';

export interface IceCreamConeOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createIceCreamCone(
  container: HTMLElement,
  options: IceCreamConeOptions = {},
): () => void {
  const { color = '#f472b6', accentColor = '#8b5cf6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(1.4, 0.4, 4.6);
  camera.lookAt(0, -0.1, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
  keyLight.position.set(4, 7, 6);
  scene.add(keyLight);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 24);
  rim.position.set(-4, 1, -3);
  scene.add(rim);

  // Pastel backdrop disc
  const backMat = new THREE.MeshBasicMaterial({ color: '#17121f', transparent: true, opacity: 0.3 });
  const backDisc = new THREE.Mesh(new THREE.CircleGeometry(3.4, 48), backMat);
  backDisc.position.z = -1.5;
  scene.add(backDisc);

  const coneGroup = new THREE.Group();
  coneGroup.rotation.z = 0.08;
  scene.add(coneGroup);

  // Waffle cone with crisscross lattice
  const coneMat = new THREE.MeshStandardMaterial({ color: '#c98a4b', roughness: 0.7 });
  const coneGeo = new THREE.ConeGeometry(0.52, 1.7, 28, 1, true);
  const cone = new THREE.Mesh(coneGeo, coneMat);
  cone.rotation.x = Math.PI;
  cone.position.y = -0.85;
  coneGroup.add(cone);
  // Lattice ridges
  const ridgeMat = new THREE.MeshBasicMaterial({ color: '#9a6531', transparent: true, opacity: 0.55 });
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const ridgeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(Math.cos(a) * 0.51, 0.02, Math.sin(a) * 0.51),
      new THREE.Vector3(Math.cos(a + 0.35) * 0.36, -0.45, Math.sin(a + 0.35) * 0.36),
      new THREE.Vector3(Math.cos(a + 0.7) * 0.16, -0.92, Math.sin(a + 0.7) * 0.16),
      new THREE.Vector3(0, -1.32, 0),
    ]);
    const ridgeA = new THREE.Mesh(new THREE.TubeGeometry(ridgeCurve, 20, 0.014, 5), ridgeMat);
    coneGroup.add(ridgeA);
    const ridgeBCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(Math.cos(a) * 0.51, 0.02, Math.sin(a) * 0.51),
      new THREE.Vector3(Math.cos(a - 0.35) * 0.36, -0.45, Math.sin(a - 0.35) * 0.36),
      new THREE.Vector3(Math.cos(a - 0.7) * 0.16, -0.92, Math.sin(a - 0.7) * 0.16),
      new THREE.Vector3(0, -1.32, 0),
    ]);
    const ridgeB = new THREE.Mesh(new THREE.TubeGeometry(ridgeBCurve, 20, 0.014, 5), ridgeMat);
    coneGroup.add(ridgeB);
  }
  // Rim torus at the top of the cone
  const rimTorus = new THREE.Mesh(new THREE.TorusGeometry(0.53, 0.045, 10, 40), coneMat);
  rimTorus.rotation.x = Math.PI / 2;
  rimTorus.position.y = 0.03;
  coneGroup.add(rimTorus);

  // Three scoops stacked with slight offsets
  const scoopPalette = [color, '#a78bfa', accentColor];
  interface Scoop { mesh: THREE.Group; baseY: number; phase: number }
  const scoops: Scoop[] = [];
  for (let i = 0; i < 3; i++) {
    const g = new THREE.Group();
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(scoopPalette[i]),
      roughness: 0.32,
      clearcoat: 0.55,
      clearcoatRoughness: 0.35,
    });
    const radius = 0.44 - i * 0.05;
    const scoopBody = new THREE.Mesh(new THREE.SphereGeometry(radius, 26, 20), mat);
    g.add(scoopBody);
    // Wavy drips around the bottom edge of each scoop
    for (let d = 0; d < 7; d++) {
      const a = (d / 7) * Math.PI * 2 + i;
      const dripLen = 0.1 + ((d + i) % 3) * 0.05;
      const dripCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(Math.cos(a) * radius * 0.95, -radius * 0.72, Math.sin(a) * radius * 0.95),
        new THREE.Vector3(Math.cos(a) * radius * 0.99, -radius * 0.72 - dripLen * 0.5, Math.sin(a) * radius * 0.99),
        new THREE.Vector3(Math.cos(a) * radius * 0.97, -radius * 0.72 - dripLen, Math.sin(a) * radius * 0.97),
      ]);
      const drip = new THREE.Mesh(new THREE.TubeGeometry(dripCurve, 10, 0.028, 6), mat);
      g.add(drip);
    }
    g.position.y = 0.34 + i * 0.56;
    if (i > 0) {
      g.position.x = (i % 2 === 0 ? 1 : -1) * 0.07;
    }
    coneGroup.add(g);
    scoops.push({ mesh: g, baseY: g.position.y, phase: i * 1.4 });
  }

  // Cherry on top
  const cherryMat = new THREE.MeshPhysicalMaterial({
    color: '#d6304b',
    roughness: 0.15,
    clearcoat: 0.9,
    emissive: '#d6304b',
    emissiveIntensity: 0.15,
  });
  const cherry = new THREE.Mesh(new THREE.SphereGeometry(0.11, 18, 14), cherryMat);
  cherry.position.set(0.02, 1.62, 0);
  coneGroup.add(cherry);
  const stemCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.02, 1.68, 0),
    new THREE.Vector3(0.06, 1.82, 0),
    new THREE.Vector3(0.14, 1.9, 0),
  ]);
  const stem = new THREE.Mesh(new THREE.TubeGeometry(stemCurve, 10, 0.012, 6), new THREE.MeshStandardMaterial({ color: '#3f7d43', roughness: 0.6 }));
  coneGroup.add(stem);

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
    coneGroup.rotation.y = t * 0.45 * speed;
    coneGroup.rotation.z = 0.08 + Math.sin(t * 1.2 * speed) * 0.06;
    coneGroup.position.y = Math.sin(t * 1.1 * speed) * 0.05;
    // Scoops wobble on the cone like a hand-held treat
    for (const s of scoops) {
      s.mesh.rotation.x = Math.sin(t * 2.4 * speed + s.phase) * 0.05;
      s.mesh.position.y = s.baseY + Math.sin(t * 2.4 * speed + s.phase) * 0.008;
    }
    cherry.scale.setScalar(1 + Math.abs(Math.sin(t * 3 * speed)) * 0.04);
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
