import * as THREE from 'three';

export interface GemClusterOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createGemCluster(
  container: HTMLElement,
  options: GemClusterOptions = {},
): () => void {
  const { color = '#8b5cf6', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.8, 2.4, 4.4);
  camera.lookAt(0, 0.1, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const key = new THREE.DirectionalLight(0xffffff, 2.5);
  key.position.set(4, 6, 4);
  scene.add(key);
  const rimA = new THREE.PointLight(new THREE.Color(accentColor), 35);
  rimA.position.set(-4, 2, -3);
  scene.add(rimA);
  const rimB = new THREE.PointLight(new THREE.Color('#22d3ee'), 25);
  rimB.position.set(3, -1, 3);
  scene.add(rimB);

  const rand = (() => {
    let s = 90210 >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  })();

  const palette = [color, accentColor, '#22d3ee', '#a78bfa'];
  const cluster = new THREE.Group();
  scene.add(cluster);

  // Faceted brilliant-cut gem from a lathe profile
  function makeGem(scale: number): THREE.BufferGeometry {
    const pts: THREE.Vector2[] = [
      new THREE.Vector2(0.0, 0.5),
      new THREE.Vector2(0.28, 0.42),
      new THREE.Vector2(0.55, 0.18),
      new THREE.Vector2(0.6, 0.0),
      new THREE.Vector2(0.4, -0.3),
      new THREE.Vector2(0.12, -0.52),
      new THREE.Vector2(0.0, -0.55),
    ].map((p) => p.multiplyScalar(scale));
    return new THREE.LatheGeometry(pts, 7);
  }

  // Base rock
  const rockMat = new THREE.MeshStandardMaterial({ color: 0x241b33, roughness: 0.9, flatShading: true });
  const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(1.15, 0), rockMat);
  rock.scale.y = 0.45;
  rock.position.y = -0.75;
  cluster.add(rock);

  const gems: Array<{ mesh: THREE.Mesh; phase: number; baseY: number }> = [];
  for (let i = 0; i < 9; i++) {
    const hue = palette[i % palette.length];
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(hue),
      flatShading: true,
      roughness: 0.06,
      metalness: 0.05,
      transmission: 0.65,
      thickness: 1.1,
      ior: 2.2,
      emissive: new THREE.Color(hue),
      emissiveIntensity: 0.18,
    });
    const s = 0.28 + rand() * 0.34;
    const gem = new THREE.Mesh(makeGem(s), mat);
    const a = (i / 9) * Math.PI * 2 + rand() * 0.5;
    const r = 0.25 + rand() * 0.75;
    gem.position.set(Math.cos(a) * r, -0.45 + rand() * 0.5, Math.sin(a) * r * 0.8);
    gem.rotation.set(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI);
    cluster.add(gem);
    gems.push({ mesh: gem, phase: rand() * Math.PI * 2, baseY: gem.position.y });
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
    cluster.rotation.y = t * 0.35 * speed;
    for (const g of gems) {
      g.mesh.position.y = g.baseY + Math.sin(t * 1.3 * speed + g.phase) * 0.05;
      g.mesh.rotation.z += 0.004 * speed;
      (g.mesh.material as THREE.MeshPhysicalMaterial).emissiveIntensity =
        0.12 + Math.abs(Math.sin(t * 1.8 * speed + g.phase)) * 0.22;
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
