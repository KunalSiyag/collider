import * as THREE from 'three';

export interface NautilusShellOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createNautilusShell(
  container: HTMLElement,
  options: NautilusShellOptions = {},
): () => void {
  const { color = '#fafafa', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.4, 1.6, 4.8);
  camera.lookAt(0, 0.2, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.3);
  key.position.set(4, 5, 5);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const rand = (() => {
    let s = 271828 >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  })();
  void rand;

  const shellMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    roughness: 0.18,
    clearcoat: 0.9,
    sheen: 0.6,
    sheenColor: new THREE.Color(accentColor),
  });
  const stripeMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    roughness: 0.35,
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.18,
  });

  // Golden-spiral chambers: swept torus cross-sections
  const nautilus = new THREE.Group();
  scene.add(nautilus);
  const N = 60;
  const b = Math.log(2.6) / (Math.PI * 1.85); // growth constant
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < N; i++) {
    const th = (i / (N - 1)) * Math.PI * 3.7;
    const r = Math.exp(b * th);
    pts.push(new THREE.Vector3(Math.cos(th) * r * 0.9, 0, Math.sin(th) * r * 0.9));
  }
  const spiral = new THREE.CatmullRomCurve3(pts);

  function chamberRadius(u: number) {
    const th = u * Math.PI * 3.7;
    return Math.exp(b * th) * 0.52;
  }

  class ChamberTube extends THREE.Curve<THREE.Vector3> {
    constructor(private u: number) {
      super();
    }
    getPoint(t: number): THREE.Vector3 {
      const th = this.u * Math.PI * 3.7 + t * Math.PI * 2;
      const R = Math.exp(b * th) * 0.9;
      const rr = chamberRadius(this.u) * (0.75 + 0.25 * Math.cos(t * Math.PI));
      return new THREE.Vector3(
        Math.cos(th) * R + Math.cos(th) * rr * 0.001,
        Math.sin(t * Math.PI * 2) * rr,
        Math.sin(th) * R,
      );
    }
  }

  for (let i = 0; i < N - 1; i++) {
    const u = i / (N - 1);
    if (u < 0.12 && i % 2 === 0) continue; // thin early chambers
    const curve = new ChamberTube(u);
    const ring = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 24, 0.014 + u * 0.02, 8),
      stripeMat,
    );
    nautilus.add(ring);
  }
  // Smooth outer skin as a fat final sweep
  const skin = new THREE.Mesh(new THREE.TubeGeometry(spiral, 90, 0.05, 10), shellMat);
  nautilus.add(skin);
  for (let i = 0; i < 14; i++) {
    const u = 0.15 + (i / 13) * 0.85;
    const p = spiral.getPoint(u);
    const disc = new THREE.Mesh(
      new THREE.TorusGeometry(chamberRadius(u) * 0.92, 0.012 + u * 0.02, 8, 40),
      stripeMat,
    );
    disc.position.copy(p);
    disc.lookAt(p.clone().multiplyScalar(2));
    nautilus.add(disc);
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
    nautilus.rotation.y = t * 0.4 * speed;
    nautilus.rotation.x = Math.PI / 2 + Math.sin(t * 0.6 * speed) * 0.12;
    nautilus.position.y = Math.sin(t * 1.0 * speed) * 0.06;
    stripeMat.emissiveIntensity = 0.12 + Math.abs(Math.sin(t * 1.4 * speed)) * 0.2;
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
