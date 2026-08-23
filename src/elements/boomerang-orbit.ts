import * as THREE from 'three';

export interface BoomerangOrbitOptions {
  color?: string;
  accentColor?: string;
  count?: number;
  speed?: number;
}

export function createBoomerangOrbit(
  container: HTMLElement,
  options: BoomerangOrbitOptions = {},
): () => void {
  const { color = '#d4af6a', accentColor = '#f472b6', count = 3, speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(3.2, 2.0, 4.8);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(4, 6, 5);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 1, -3);
  scene.add(rim);

  const rand = (() => {
    let s = 7777 >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  })();

  // Classic V-shaped boomerang from an extruded airfoil shape
  function makeBoomerang(): THREE.Mesh {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.quadraticCurveTo(0.55, 0.1, 0.95, 0.55);   // leading edge arm 1
    shape.lineTo(0.82, 0.72);
    shape.quadraticCurveTo(0.42, 0.34, 0.06, 0.24);  // trailing edge
    shape.lineTo(0, 0.28);
    shape.quadraticCurveTo(-0.42, 0.34, -0.82, 0.72); // arm 2
    shape.lineTo(-0.95, 0.55);
    shape.quadraticCurveTo(-0.55, 0.1, 0, 0);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.07,
      bevelEnabled: true,
      bevelSize: 0.02,
      bevelThickness: 0.02,
      bevelSegments: 1,
    });
    geo.center();
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(rand() > 0.5 ? color : accentColor),
      roughness: 0.45,
      clearcoat: 0.5,
      emissive: new THREE.Color(accentColor),
      emissiveIntensity: 0.08,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.scale.setScalar(1.25);
    return mesh;
  }

  interface Flyer { mesh: THREE.Mesh; phase: number; radius: number; rate: number; tilt: number }
  const flyers: Flyer[] = [];
  for (let i = 0; i < count; i++) {
    const mesh = makeBoomerang();
    scene.add(mesh);
    flyers.push({
      mesh,
      phase: (i / count) * Math.PI * 2,
      radius: 1.5 + i * 0.35,
      rate: 1.1 + rand() * 0.5,
      tilt: (rand() - 0.5) * 0.5,
    });
  }

  // Faint orbit guide rings
  for (let i = 0; i < count; i++) {
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.07 });
    const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(1.5 + i * 0.35, 0.006, 6, 80), ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    scene.add(ringMesh);
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
        Math.cos(a) * f.radius,
        Math.sin(a * 2) * 0.35 + Math.sin(t * 0.9 + f.phase) * 0.15,
        Math.sin(a) * f.radius * 0.75,
      );
      // Boomerangs spin fast around their own axis while circling
      f.mesh.rotation.y = -a + Math.PI / 2;
      f.mesh.rotation.z += 0.22 * speed;
      f.mesh.rotation.x = Math.sin(a * 2) * 0.3 + f.tilt;
    }
    void flyers[0].tilt;
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
