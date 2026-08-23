import * as THREE from 'three';

export interface BalloonClusterOptions {
  count?: number;
  speed?: number;
}

export function createBalloonCluster(
  container: HTMLElement,
  options: BalloonClusterOptions = {},
): () => void {
  const { count = 9, speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
  camera.position.set(0.6, 1.0, 5.4);
  camera.lookAt(0, 0.6, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.65));
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(4, 6, 4);
  scene.add(key);
  const back = new THREE.PointLight('#22d3ee', 24);
  back.position.set(-4, 2, -4);
  scene.add(back);

  const rand = (() => {
    let s = 20240 >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  })();

  const palette = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa'];
  const root = new THREE.Group();
  scene.add(root);

  const balloons: Array<{
    mesh: THREE.Group;
    knot: THREE.Mesh;
    string: THREE.Line;
    baseY: number;
    phase: number;
  }> = [];
  const stringMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 });

  for (let i = 0; i < count; i++) {
    const hue = palette[i % palette.length];
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(hue),
      roughness: 0.25,
      clearcoat: 0.9,
      clearcoatRoughness: 0.25,
      transmission: 0.12,
    });
    const balloon = new THREE.Group();

    // Teardrop body from a stretched sphere
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 20), mat);
    body.scale.set(1, 1.22, 1);
    balloon.add(body);
    // Knot
    const knot = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.14, 8), mat);
    knot.position.y = -0.56;
    knot.rotation.x = Math.PI;
    balloon.add(knot);

    // String
    const pts = [
      new THREE.Vector3(0, -0.62, 0),
      new THREE.Vector3(rand() * 0.16 - 0.08, -1.1, rand() * 0.1 - 0.05),
      new THREE.Vector3(rand() * 0.3 - 0.15, -1.6, 0),
    ];
    const stringGeo = new THREE.BufferGeometry().setFromPoints(pts);
    const string = new THREE.Line(stringGeo, stringMat);
    balloon.add(string);

    const angle = (i / count) * Math.PI * 2;
    balloon.position.set(Math.cos(angle) * (0.5 + rand() * 0.5), 0.6 + rand() * 1.4, Math.sin(angle) * 0.4);
    root.add(balloon);
    balloons.push({ mesh: balloon, knot, string, baseY: balloon.position.y, phase: rand() * Math.PI * 2 });
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
    root.rotation.y = t * 0.25 * speed;
    for (const b of balloons) {
      b.mesh.position.y = b.baseY + Math.sin(t * 0.9 * speed + b.phase) * 0.22;
      b.mesh.rotation.z = Math.sin(t * 1.1 * speed + b.phase) * 0.12;
      b.mesh.rotation.x = Math.cos(t * 0.8 * speed + b.phase) * 0.08;
      const stretch = 1 + Math.sin(t * 2.4 * speed + b.phase) * 0.03;
      b.mesh.scale.set(1 / stretch, stretch, 1 / stretch);
    }
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
        obj.geometry.dispose();
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((m) => m.dispose());
      }
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
