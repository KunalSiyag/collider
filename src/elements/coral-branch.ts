import * as THREE from 'three';

export interface CoralBranchOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createCoralBranch(
  container: HTMLElement,
  options: CoralBranchOptions = {},
): () => void {
  const { color = '#f472b6', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.4, 1.4, 4.6);
  camera.lookAt(0, 0.5, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const key = new THREE.DirectionalLight(0xffffff, 2.1);
  key.position.set(3, 6, 5);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 30);
  rim.position.set(-3, 2, -3);
  scene.add(rim);

  const rand = (() => {
    let s = 8128 >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  })();

  const reef = new THREE.Group();
  scene.add(reef);

  const rockMat = new THREE.MeshStandardMaterial({ color: 0x241b33, roughness: 0.95 });
  const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.9, 0), rockMat);
  base.scale.y = 0.4;
  base.position.y = -0.75;
  reef.add(base);

  const coralMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: 0.55,
    emissive: new THREE.Color(color),
    emissiveIntensity: 0.15,
  });
  const polypMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.7,
  });

  interface Tip { mesh: THREE.Mesh; phase: number }
  const polyps: Tip[] = [];

  function branch(from: THREE.Vector3, dir: THREE.Vector3, len: number, radius: number, depth: number) {
    const segs = 4;
    const pts: THREE.Vector3[] = [from.clone()];
    let p = from.clone();
    let d = dir.clone();
    for (let i = 0; i < segs; i++) {
      d.x += (rand() - 0.5) * 0.5;
      d.z += (rand() - 0.5) * 0.5;
      d.y += 0.18;
      d.normalize();
      p = p.clone().add(d.clone().multiplyScalar(len / segs));
      pts.push(p.clone());
    }
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 16, radius, 7),
      coralMat,
    );
    reef.add(tube);

    if (depth >= 3 || len < 0.22) {
      const tip = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.7, 10, 8), polypMat);
      tip.position.copy(p);
      reef.add(tip);
      polyps.push({ mesh: tip, phase: rand() * Math.PI * 2 });
      return;
    }
    const kids = depth === 0 ? 3 : 2;
    for (let i = 0; i < kids; i++) {
      const spread = dir.clone()
        .add(new THREE.Vector3((rand() - 0.5) * 1.3, 0.35 + rand() * 0.4, (rand() - 0.5) * 1.3))
        .normalize();
      branch(p, spread, len * 0.68, radius * 0.65, depth + 1);
    }
  }

  branch(new THREE.Vector3(0, -0.55, 0), new THREE.Vector3(0, 1, 0), 1.05, 0.09, 0);

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
    reef.rotation.y = t * 0.35 * speed;
    reef.position.y = Math.sin(t * 0.9 * speed) * 0.05;
    for (const p of polyps) {
      const pulse = 1 + Math.sin(t * 2.2 * speed + p.phase) * 0.28;
      p.mesh.scale.setScalar(pulse);
      (p.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.45 + Math.abs(Math.sin(t * 1.6 * speed + p.phase)) * 0.5;
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
