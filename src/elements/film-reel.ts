import * as THREE from 'three';

export interface FilmReelOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createFilmReel(
  container: HTMLElement,
  options: FilmReelOptions = {},
): () => void {
  const { color = '#241b33', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.5, 0.5, 4.6);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(3, 6, 6);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 1, -3);
  scene.add(rim);

  const reelGroup = new THREE.Group();
  reelGroup.rotation.x = -0.35;
  scene.add(reelGroup);

  const metalMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.75,
    roughness: 0.35,
  });
  const filmMat = new THREE.MeshStandardMaterial({
    color: '#2e2839',
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const hubMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    metalness: 0.6,
    roughness: 0.25,
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.2,
  });

  // Two flanges with cut-out holes
  for (const side of [-1, 1]) {
    const flange = new THREE.Mesh(new THREE.CylinderGeometry(1.45, 1.45, 0.06, 48), metalMat);
    flange.rotation.x = Math.PI / 2;
    flange.position.z = side * 0.16;
    reelGroup.add(flange);

    // Decorative round cutouts (dark circles)
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const hole = new THREE.Mesh(
        new THREE.CircleGeometry(0.28, 20),
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
      );
      hole.position.set(Math.cos(a) * 0.85, Math.sin(a) * 0.85, side * 0.195);
      reelGroup.add(hole);
    }
  }

  // Film winding between flanges
  const winding = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 0.26, 48), filmMat);
  winding.rotation.x = Math.PI / 2;
  reelGroup.add(winding);
  // Spiral seam on the winding
  for (let i = 0; i < 7; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.55 + i * 0.075, 0.006, 4, 60), new THREE.MeshBasicMaterial({ color: 0x17121f }));
    ring.position.z = 0;
    reelGroup.add(ring);
  }

  // Hub and spokes
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.34, 20), hubMat);
  hub.rotation.x = Math.PI / 2;
  reelGroup.add(hub);
  for (let i = 0; i < 3; i++) {
    const spoke = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.08, 0.06), metalMat);
    spoke.rotation.z = (i / 3) * Math.PI;
    reelGroup.add(spoke);
  }

  // Leader strip trailing off
  const stripShape = new THREE.Shape();
  stripShape.moveTo(0, 0);
  stripShape.lineTo(-2.4, -0.15);
  stripShape.lineTo(-2.4, -0.42);
  stripShape.lineTo(0, -0.3);
  stripShape.lineTo(0, 0);
  const strip = new THREE.Mesh(
    new THREE.ExtrudeGeometry(stripShape, { depth: 0.02, bevelEnabled: false }),
    filmMat,
  );
  strip.position.z = -0.01;
  reelGroup.add(strip);
  // Perforations along the strip
  for (let i = 0; i < 10; i++) {
    const perf = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.055, 0.03), new THREE.MeshBasicMaterial({ color: 0x000000 }));
    perf.position.set(-0.25 - i * 0.23, -0.13 - i * 0.011, 0);
    reelGroup.add(perf);
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
    // Projector-style start/stop stutter rotation
    const running = Math.sin(t * 1.4 * speed) > -0.55 ? 1 : 0;
    reelGroup.rotation.z += running * 0.11 * speed;
    reelGroup.rotation.y = Math.sin(t * 0.4 * speed) * 0.3;
    reelGroup.position.y = Math.sin(t * 1.0 * speed) * 0.06;
    hubMat.emissiveIntensity = 0.12 + Math.abs(Math.sin(t * 2.8 * speed)) * 0.25;
    void accentColor;
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
