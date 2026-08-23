import * as THREE from 'three';

export interface PaperPlaneSwarmOptions {
  count?: number;
  radius?: number;
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createPaperPlaneSwarm(
  container: HTMLElement,
  options: PaperPlaneSwarmOptions = {},
): () => void {
  const { count = 12, radius = 2.4, color = '#fafafa', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 50);
  camera.position.set(3.6, 2.6, 5.0);
  camera.lookAt(0, 0.2, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(4, 6, 3);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 28);
  rim.position.set(-4, 1, -3);
  scene.add(rim);

  const rand = (() => {
    let s = 555 >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  })();

  // Folded plane silhouette from an extruded triangle outline
  function buildPlane(): THREE.Group {
    const g = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(rand() > 0.75 ? accentColor : color),
      side: THREE.DoubleSide,
      roughness: 0.6,
      flatShading: true,
    });
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0.45);
    wingShape.lineTo(-0.32, -0.35);
    wingShape.lineTo(0, -0.18);
    wingShape.lineTo(0.32, -0.35);
    wingShape.lineTo(0, 0.45);
    const geo = new THREE.ExtrudeGeometry(wingShape, { depth: 0.03, bevelEnabled: false });
    geo.center();
    const body = new THREE.Mesh(geo, mat);
    g.add(body);
    return g;
  }

  interface Flyer { mesh: THREE.Group; orbit: number; tilt: number; phase: number; rate: number }
  const flyers: Flyer[] = [];
  for (let i = 0; i < count; i++) {
    const mesh = buildPlane();
    scene.add(mesh);
    flyers.push({
      mesh,
      orbit: radius * (0.55 + rand() * 0.8),
      tilt: (rand() - 0.5) * 0.6,
      phase: rand() * Math.PI * 2,
      rate: 0.5 + rand() * 0.9,
    });
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
    for (const f of flyers) {
      const a = t * f.rate * speed + f.phase;
      f.mesh.position.set(
        Math.cos(a) * f.orbit,
        Math.sin(a * 2.0) * f.orbit * 0.22 + 0.2,
        Math.sin(a) * f.orbit * 0.6,
      );
      // Nose along the flight direction, banking into the turn
      f.mesh.rotation.set(Math.sin(a * 2) * 0.25, -a + Math.PI / 2, Math.cos(a) * 0.45 + f.tilt);
      f.mesh.rotateY(Math.PI / 2);
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
