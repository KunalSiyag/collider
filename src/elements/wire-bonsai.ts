import * as THREE from 'three';

export interface WireBonsaiOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createWireBonsai(
  container: HTMLElement,
  options: WireBonsaiOptions = {},
): () => void {
  const { color = '#d4c39a', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(3.0, 1.8, 4.2);
  camera.lookAt(0, 0.7, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(4, 6, 4);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 30);
  rim.position.set(-3, 3, -3);
  scene.add(rim);

  const tree = new THREE.Group();
  scene.add(tree);

  const rand = (() => {
    let s = 1717 >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  })();

  const wireMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(color), metalness: 0.9, roughness: 0.35 });
  const leafMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.4,
    roughness: 0.4,
  });

  // Shallow tray with gravel
  const tray = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.15, 0.16, 40), wireMat);
  tray.position.y = -0.95;
  tree.add(tray);
  const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.34, 0), wireMat);
  rock.position.set(0.4, -0.82, 0.2);
  rock.scale.y = 0.6;
  tree.add(rock);

  interface Branch { points: THREE.Vector3[]; depth: number }
  const branches: Branch[] = [];

  function grow(from: THREE.Vector3, dir: THREE.Vector3, len: number, depth: number) {
    const pts: THREE.Vector3[] = [];
    let p = from.clone();
    let d = dir.clone();
    for (let i = 0; i < 5; i++) {
      pts.push(p.clone());
      d.x += (rand() - 0.5) * 0.35;
      d.z += (rand() - 0.5) * 0.35;
      d.y -= 0.06; // gravity droop
      d.normalize();
      p = p.clone().add(d.multiplyScalar(len / 5));
    }
    pts.push(p.clone());
    branches.push({ points: pts, depth });
    if (depth < 3) {
      const n = depth === 0 ? 3 : 2;
      for (let b = 0; b < n; b++) {
        const spread = new THREE.Vector3((rand() - 0.5) * 1.2, 0.55, (rand() - 0.5) * 1.2).normalize();
        grow(pts[pts.length - 1], spread, len * 0.62, depth + 1);
      }
    } else {
      const leafCloud = new THREE.Group();
      for (let l = 0; l < 4; l++) {
        const leaf = new THREE.Mesh(
          new THREE.IcosahedronGeometry(0.09 + rand() * 0.07, 0),
          leafMat,
        );
        leaf.position.copy(p).add(new THREE.Vector3((rand() - 0.5) * 0.4, rand() * 0.2, (rand() - 0.5) * 0.4));
        leafCloud.add(leaf);
      }
      tree.add(leafCloud);
    }
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 20, Math.max(0.012, 0.05 - depth * 0.013), 6),
      wireMat,
    );
    tree.add(tube);
  }

  grow(new THREE.Vector3(0, -0.88, 0), new THREE.Vector3(0.05, 1, 0), 1.15, 0);

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
    tree.rotation.y = t * 0.35 * speed;
    tree.position.y = Math.sin(t * 1.1 * speed) * 0.04;
    leafMat.emissiveIntensity = 0.3 + Math.abs(Math.sin(t * 1.5 * speed)) * 0.25;
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
