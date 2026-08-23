import * as THREE from 'three';

export interface PlasmaGlobeOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createPlasmaGlobe(
  container: HTMLElement,
  options: PlasmaGlobeOptions = {},
): () => void {
  const { color = '#f472b6', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.5, 0.8, 4.8);
  camera.lookAt(0, 0.2, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.25));
  const innerLight = new THREE.PointLight(new THREE.Color(accentColor), 25, 10);
  innerLight.position.set(0, 0.35, 0);
  scene.add(innerLight);
  const fill = new THREE.PointLight(new THREE.Color(color), 12);
  fill.position.set(-4, 1, -3);
  scene.add(fill);

  const globe = new THREE.Group();
  scene.add(globe);

  // Glass sphere
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xbfdcff,
    transmission: 0.9,
    roughness: 0.03,
    thickness: 0.4,
    transparent: true,
    opacity: 0.4,
    side: THREE.DoubleSide,
  });
  const glass = new THREE.Mesh(new THREE.SphereGeometry(1.45, 48, 32), glassMat);
  globe.add(glass);

  // Base with coil
  const baseMat = new THREE.MeshStandardMaterial({ color: '#241b33', metalness: 0.6, roughness: 0.35 });
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 1.05, 0.55, 36), baseMat);
  base.position.y = -1.65;
  globe.add(base);
  for (let i = 0; i < 6; i++) {
    const coil = new THREE.Mesh(
      new THREE.TorusGeometry(0.88 - i * 0.05, 0.02, 8, 40),
      new THREE.MeshStandardMaterial({ color: '#d4af6a', metalness: 0.9, roughness: 0.3 }),
    );
    coil.rotation.x = Math.PI / 2;
    coil.position.y = -1.42 + i * 0.07;
    globe.add(coil);
  }

  // Central electrode
  const electrodeMat = new THREE.MeshBasicMaterial({ color: 0x10101a });
  const electrode = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.7, 12), electrodeMat);
  electrode.position.y = -0.9;
  globe.add(electrode);

  interface Bolt { curve: THREE.CatmullRomCurve3; mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; target: THREE.Vector3 }
  const bolts: Bolt[] = [];
  const rand = (() => {
    let s = 314159 >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  })();

  function rebuildBolt(b: Bolt) {
    const start = new THREE.Vector3(0, -0.55, 0);
    const pts: THREE.Vector3[] = [start];
    const SEGMENTS = 9;
    for (let i = 1; i < SEGMENTS; i++) {
      const u = i / SEGMENTS;
      pts.push(new THREE.Vector3()
        .lerpVectors(start, b.target, u)
        .add(new THREE.Vector3((rand() - 0.5) * 0.5 * Math.sin(u * Math.PI), 0, (rand() - 0.5) * 0.5 * Math.sin(u * Math.PI))));
    }
    pts.push(b.target.clone());
    b.curve.points = pts;
    b.mesh.geometry.dispose();
    b.mesh.geometry = new THREE.TubeGeometry(b.curve, 24, 0.012 + rand() * 0.01, 5);
  }

  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2 + rand();
    const target = new THREE.Vector3(Math.cos(a) * (1.1 + rand() * 0.3), -0.3 + rand() * 1.4, Math.sin(a) * (1.1 + rand() * 0.3));
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(i % 2 === 0 ? accentColor : color),
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(), target]);
    const meshBolt = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.015, 5), mat);
    globe.add(meshBolt);
    const bolt: Bolt = { curve, mesh: meshBolt, mat, target };
    rebuildBolt(bolt);
    bolts.push(bolt);
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
    globe.rotation.y = t * 0.3 * speed;
    for (const b of bolts) {
      if (Math.random() < 0.08 * speed) {
        const a = rand() * Math.PI * 2;
        b.target.set(Math.cos(a) * (1.0 + rand() * 0.4), -0.3 + rand() * 1.5, Math.sin(a) * (1.0 + rand() * 0.4));
        rebuildBolt(b);
      }
      b.mat.opacity = 0.55 + rand() * 0.45;
    }
    innerLight.intensity = 20 + Math.sin(t * 13 * speed) * 6;
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
