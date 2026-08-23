import * as THREE from 'three';

export interface RoyalCrownOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createRoyalCrown(
  container: HTMLElement,
  options: RoyalCrownOptions = {},
): () => void {
  const { color = '#d4af6a', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.2, 1.6, 4.4);
  camera.lookAt(0, -0.2, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.7);
  keyLight.position.set(4, 7, 5);
  scene.add(keyLight);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 28);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const crown = new THREE.Group();
  crown.position.y = -0.9;
  scene.add(crown);

  const goldMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    metalness: 0.95,
    roughness: 0.12,
    clearcoat: 0.8,
    envMapIntensity: 1.6,
  });
  const velvetMat = new THREE.MeshStandardMaterial({ color: '#5b1030', roughness: 0.85 });
  const gemPalette = ['#f472b6', '#22d3ee', '#8b5cf6', '#22c55e', '#ffd9a0'];

  // Velvet cap base
  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.72, 32, 18, 0, Math.PI * 2, 0, Math.PI / 2), velvetMat);
  cap.position.y = 0.42;
  crown.add(cap);

  // Gold band
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.74, 0.78, 0.3, 44), goldMat);
  band.position.y = 0.15;
  crown.add(band);

  // Jewels around the band
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const gemMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(gemPalette[i % gemPalette.length]),
      emissive: new THREE.Color(gemPalette[i % gemPalette.length]),
      emissiveIntensity: 0.55,
      roughness: 0.08,
      clearcoat: 1,
    });
    const jewel = new THREE.Mesh(new THREE.OctahedronGeometry(0.11, 0), gemMat);
    jewel.position.set(Math.cos(a) * 0.77, 0.15, Math.sin(a) * 0.77);
    jewel.rotation.z = Math.PI / 2;
    crown.add(jewel);
  }

  // Points with orb tips
  interface Point { mesh: THREE.Group; phase: number }
  const points: Point[] = [];
  for (let i = 0; i < 8; i++) {
    if (i % 2 === 0) continue; // alternating spikes
    const a = (i / 8) * Math.PI * 2;
    const g = new THREE.Group();
    g.position.set(Math.cos(a) * 0.72, 0.28, Math.sin(a) * 0.72);
    const spikeShape = new THREE.Shape();
    spikeShape.moveTo(-0.09, 0);
    spikeShape.quadraticCurveTo(-0.05, 0.32, 0, 0.62);
    spikeShape.quadraticCurveTo(0.05, 0.32, 0.09, 0);
    spikeShape.lineTo(-0.09, 0);
    const spikeMat = goldMat.clone();
    const spike = new THREE.Mesh(new THREE.ExtrudeGeometry(spikeShape, { depth: 0.05, bevelEnabled: false }), spikeMat);
    spike.position.z = -0.025;
    g.add(spike);
    // Tilt outward
    g.rotation.y = -a;
    g.rotation.z = 0.16;
    const orbMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(gemPalette[i % gemPalette.length]),
      emissive: new THREE.Color(gemPalette[i % gemPalette.length]),
      emissiveIntensity: 0.7,
      roughness: 0.05,
    });
    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.075, 14, 12), orbMat);
    orb.position.y = 0.66;
    g.add(orb);
    crown.add(g);
    points.push({ mesh: g, phase: i });
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
    crown.rotation.y = t * 0.6 * speed;
    crown.position.y = -0.9 + Math.sin(t * 1.1 * speed) * 0.06;
    for (const p of points) {
      p.mesh.children[0].rotation.x = Math.sin(t * 2.2 * speed + p.phase) * 0.06;
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
