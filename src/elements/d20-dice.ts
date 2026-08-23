import * as THREE from 'three';

export interface D20DiceOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createD20Dice(
  container: HTMLElement,
  options: D20DiceOptions = {},
): () => void {
  const { color = '#a78bfa', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.4, 1.8, 4.0);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const key = new THREE.DirectionalLight(0xffffff, 2.6);
  key.position.set(4, 6, 4);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 30);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const group = new THREE.Group();
  scene.add(group);

  // Icosahedron body with flat crystal shading
  const dieMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    flatShading: true,
    roughness: 0.15,
    transmission: 0.45,
    thickness: 1.2,
    clearcoat: 0.7,
    emissive: new THREE.Color(color),
    emissiveIntensity: 0.08,
  });
  const die = new THREE.Mesh(new THREE.IcosahedronGeometry(1.05, 0), dieMat);
  group.add(die);

  // Edge wireframe overlay
  const edgeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor), transparent: true, opacity: 0.55 });
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(die.geometry), edgeMat);
  group.add(edges);

  // Number tokens hovering at face centers
  const rand = (() => {
    let s = 20 >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  })();
  void rand;

  const faceDotMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#ffd9a0') });
  const faceNormals: THREE.Vector3[] = [];
  const pos = die.geometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i += 3) {
    const a = new THREE.Vector3().fromBufferAttribute(pos, i);
    const b = new THREE.Vector3().fromBufferAttribute(pos, i + 1);
    const c = new THREE.Vector3().fromBufferAttribute(pos, i + 2);
    const n = new THREE.Vector3().add(a).add(b).add(c).normalize();
    if (!faceNormals.some((v) => v.distanceTo(n) < 0.01)) faceNormals.push(n);
  }
  faceNormals.forEach((n) => {
    const dot = new THREE.Mesh(new THREE.CircleGeometry(0.09, 12), faceDotMat);
    dot.position.copy(n.clone().multiplyScalar(1.07));
    dot.lookAt(n.clone().multiplyScalar(3));
    group.add(dot);
  });

  // Orbiting sparkles
  interface Spark { pivot: THREE.Group; phase: number }
  const sparks: Spark[] = [];
  for (let i = 0; i < 8; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: i % 2 ? new THREE.Color(accentColor) : new THREE.Color(color),
      transparent: true,
      opacity: 0.9,
    });
    const spark = new THREE.Mesh(new THREE.OctahedronGeometry(0.035, 0), mat);
    const pivot = new THREE.Group();
    pivot.rotation.set(rand() * Math.PI, rand() * Math.PI * 2, rand() * Math.PI);
    spark.position.y = 1.55 + rand() * 0.3;
    pivot.add(spark);
    scene.add(pivot);
    sparks.push({ pivot, phase: rand() * Math.PI * 2 });
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
    // Tumbling roll
    die.rotation.x += 0.008 * speed;
    die.rotation.y += 0.011 * speed;
    edges.rotation.copy(die.rotation);
    group.position.y = Math.sin(t * 1.1 * speed) * 0.08;
    edgeMat.opacity = 0.35 + Math.abs(Math.sin(t * 2.0 * speed)) * 0.35;
    for (const s of sparks) {
      s.pivot.rotation.z += 0.01 * speed;
      s.pivot.children[0].position.y =
        1.55 + Math.sin(t * 2 + s.phase) * 0.18;
    }
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
        obj.geometry.dispose();
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((m) => m.dispose());
      }
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
