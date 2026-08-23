import * as THREE from 'three';

export interface HarpStringsOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createHarpStrings(
  container: HTMLElement,
  options: HarpStringsOptions = {},
): () => void {
  const { color = '#d4af6a', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.4, -0.6, 5.8);
  camera.lookAt(0, -0.5, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(3, 7, 7);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 28);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const harp = new THREE.Group();
  harp.rotation.y = 0.35;
  scene.add(harp);

  // Triangular frame: pillar, neck, soundboard
  const frameMat = new THREE.MeshPhysicalMaterial({ color: '#5b4632', roughness: 0.45, clearcoat: 0.5 });
  const goldMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(color), metalness: 0.95, roughness: 0.2 });

  // Pillar (front vertical)
  const pillarCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.55, -2.15, 0),
    new THREE.Vector3(-1.72, -0.9, 0),
    new THREE.Vector3(-1.62, 0.5, 0),
    new THREE.Vector3(-1.38, 1.45, 0),
  ]);
  const pillar = new THREE.Mesh(new THREE.TubeGeometry(pillarCurve, 24, 0.12, 12), frameMat);
  harp.add(pillar);
  // Ornamental crown
  const crown = new THREE.Mesh(new THREE.SphereGeometry(0.19, 16, 12), goldMat);
  crown.position.set(-1.38, 1.52, 0);
  harp.add(crown);

  // Neck (curved top)
  const neckCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.38, 1.45, 0),
    new THREE.Vector3(-0.5, 1.32, 0),
    new THREE.Vector3(0.45, 1.05, 0),
    new THREE.Vector3(1.25, 0.62, 0),
  ]);
  const neck = new THREE.Mesh(new THREE.TubeGeometry(neckCurve, 24, 0.09, 10), frameMat);
  harp.add(neck);

  // Soundboard (slanted base)
  const soundboardShape = new THREE.Shape();
  soundboardShape.moveTo(-0.25, 0);
  soundboardShape.lineTo(0.25, 0);
  soundboardShape.lineTo(1.62, 0.14);
  soundboardShape.lineTo(1.42, -0.34);
  soundboardShape.lineTo(-0.25, -0.22);
  soundboardShape.lineTo(-0.25, 0);
  const soundboard = new THREE.Mesh(
    new THREE.ExtrudeGeometry(soundboardShape, { depth: 0.24, bevelEnabled: false }),
    frameMat,
  );
  soundboard.rotation.set(Math.PI / 2, 0, 0);
  soundboard.rotation.x = Math.PI / 2;
  soundboard.position.set(0, -2.15, -0.12);
  harp.add(soundboard);
  void soundboard;

  // Strings fanned between neck and soundboard
  interface String { mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial; phase: number }
  const strings: String[] = [];
  const COUNT = 11;
  for (let i = 0; i < COUNT; i++) {
    const u = i / (COUNT - 1);
    const topPt = neckCurve.getPoint(u * 0.92 + 0.04).add(new THREE.Vector3(0, -0.08, 0));
    const botX = THREE.MathUtils.lerp(-1.15, 1.28, u);
    const bottom = new THREE.Vector3(botX, -1.95, 0);
    const mid = topPt.clone().lerp(bottom, 0.5);

    const mat = new THREE.MeshStandardMaterial({
      color: '#e9e4f5',
      metalness: 0.85,
      roughness: 0.15,
      emissive: new THREE.Color(accentColor),
      emissiveIntensity: 0,
    });
    // Vibrating string rendered as a curve with a pluck bulge
    const pts = [topPt, mid.clone().lerp(bottom, 0.25), mid.clone().lerp(bottom, 0.5), mid.clone().lerp(bottom, 0.75), bottom];
    const stringMesh = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 20, 0.014, 6), mat);
    harp.add(stringMesh);
    strings.push({ mesh: stringMesh, mat, phase: u * 5 });
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
  let pluckT = 0;
  function tick() {
    raf = requestAnimationFrame(tick);
    pluckT += clock.getDelta() * speed;
    if (pluckT > 3) pluckT = 0;
    const t = clock.elapsedTime;
    harp.rotation.y = 0.35 + Math.sin(t * 0.3 * speed) * 0.25;
    harp.position.y = -0.3 + Math.sin(t * 0.9 * speed) * 0.05;

    // Glissando ripple across strings
    for (let i = 0; i < strings.length; i++) {
      const s = strings[i];
      const localPhase = Math.max(0, pluckT - i * 0.18);
      const amp = Math.exp(-localPhase * 2.2) * (localPhase > 0 ? 1 : 0);
      const geo = s.mesh.geometry as THREE.TubeGeometry;
      geo.dispose();
      const u = i / (strings.length - 1);
      const topPt = neckCurve.getPoint(u * 0.92 + 0.04).add(new THREE.Vector3(0, -0.08, 0));
      const botX = THREE.MathUtils.lerp(-1.15, 1.28, u);
      const bottom = new THREE.Vector3(botX, -1.95, 0);
      const pts: THREE.Vector3[] = [];
      for (let k = 0; k <= 6; k++) {
        const v = k / 6;
        const p = topPt.clone().lerp(bottom, v);
        p.z = Math.sin(v * Math.PI) * amp * 0.09 * Math.sin(localPhase * 26);
        pts.push(p);
      }
      s.mesh.geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 20, 0.014, 6);
      s.mat.emissiveIntensity = amp * 0.8;
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
