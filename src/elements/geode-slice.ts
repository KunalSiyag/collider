import * as THREE from 'three';

export interface GeodeSliceOptions {
  outerColor?: string;
  innerColor?: string;
  speed?: number;
}

export function createGeodeSlice(
  container: HTMLElement,
  options: GeodeSliceOptions = {},
): () => void {
  const { outerColor = '#8b5cf6', innerColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.5, 0.6, 4.6);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.3);
  key.position.set(3, 5, 5);
  scene.add(key);
  const glowLight = new THREE.PointLight(new THREE.Color(innerColor), 30);
  glowLight.position.set(0, 0, 0.8);
  scene.add(glowLight);

  const slice = new THREE.Group();
  scene.add(slice);

  const rand = (() => {
    let s = 40404 >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  })();

  // Rough outer ring built from a jagged ring extrusion
  const outerPts: THREE.Vector2[] = [];
  const innerPts: THREE.Vector2[] = [];
  const N = 26;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    const rO = 1.55 + (rand() - 0.5) * 0.22;
    const rI = 1.02 + (rand() - 0.5) * 0.12;
    outerPts.push(new THREE.Vector2(Math.cos(a) * rO, Math.sin(a) * rO));
    innerPts.push(new THREE.Vector2(Math.cos(a) * rI, Math.sin(a) * rI));
  }
  const shape = new THREE.Shape(outerPts);
  shape.holes.push(new THREE.Path(innerPts.slice().reverse()));
  const rockMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(outerColor).multiplyScalar(0.45),
    roughness: 0.95,
    metalness: 0.05,
    flatShading: true,
  });
  const rim = new THREE.Mesh(
    new THREE.ExtrudeGeometry(shape, { depth: 0.5, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05, bevelSegments: 1 }),
    rockMat,
  );
  rim.position.z = -0.25;
  slice.add(rim);

  // Sparkling crystal lining pointing inward
  const crystalMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(innerColor),
    flatShading: true,
    roughness: 0.08,
    transmission: 0.5,
    thickness: 0.8,
    emissive: new THREE.Color(innerColor),
    emissiveIntensity: 0.25,
  });
  const crystals: THREE.Mesh[] = [];
  for (let i = 0; i < 46; i++) {
    const a = (i / 46) * Math.PI * 2 + (rand() - 0.5) * 0.1;
    const len = 0.18 + rand() * 0.4;
    const spike = new THREE.Mesh(new THREE.ConeGeometry(0.07 + rand() * 0.05, len, 5), crystalMat);
    const rI = 1.0;
    spike.position.set(Math.cos(a) * rI, Math.sin(a) * rI, (rand() - 0.5) * 0.32);
    spike.rotation.z = a + Math.PI / 2;
    spike.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0);
    spike.rotation.x = Math.sin(a) * 0.9;
    spike.rotation.y = -Math.cos(a) * 0.9;
    crystals.push(spike);
    slice.add(spike);
  }

  // Hollow center shimmer disc
  const coreMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(innerColor),
    transparent: true,
    opacity: 0.16,
    side: THREE.DoubleSide,
  });
  const core = new THREE.Mesh(new THREE.CircleGeometry(1.0, 48), coreMat);
  core.position.z = 0.01;
  slice.add(core);

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
    slice.rotation.y = Math.sin(t * 0.4 * speed) * 0.45;
    slice.rotation.z = t * 0.1 * speed;
    slice.position.y = Math.sin(t * 0.9 * speed) * 0.06;
    coreMat.opacity = 0.1 + Math.abs(Math.sin(t * 1.6 * speed)) * 0.14;
    crystalMat.emissiveIntensity = 0.18 + Math.abs(Math.sin(t * 1.2 * speed)) * 0.25;
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
