import * as THREE from 'three';

export interface PulsarStarOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createPulsarStar(
  container: HTMLElement,
  options: PulsarStarOptions = {},
): () => void {
  const { color = '#fafafa', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 60);
  camera.position.set(0.8, 1.4, 5.6);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.25));
  const coreLight = new THREE.PointLight(new THREE.Color(color), 40);
  scene.add(coreLight);

  const group = new THREE.Group();
  scene.add(group);

  // Dense neutron star
  const starMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.9,
    roughness: 0.15,
    metalness: 0.3,
  });
  const star = new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 24), starMat);
  group.add(star);

  // Twin radiation beams from the magnetic poles
  function beam(side: number): THREE.Group {
    const g = new THREE.Group();
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    for (let i = 0; i < 3; i++) {
      const cone = new THREE.Mesh(new THREE.ConeGeometry(0.14 + i * 0.16, 4.2 - i * 0.5, 20, 1, true), mat);
      cone.position.y = side * (2.1 - i * 0.25);
      if (side < 0) cone.rotation.x = Math.PI;
      g.add(cone);
    }
    return g;
  }
  const beams = new THREE.Group();
  beams.rotation.z = 0.7;
  beams.add(beam(1));
  beams.add(beam(-1));
  group.add(beams);

  // Magnetic field arcs
  const fieldMat = new THREE.LineBasicMaterial({
    color: new THREE.Color(accentColor),
    transparent: true,
    opacity: 0.22,
  });
  const fieldLines: THREE.Line[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const pts: THREE.Vector3[] = [];
    for (let j = 0; j <= 24; j++) {
      const u = (j / 24) * Math.PI;
      const r = 0.55 + Math.sin(u) * 0.95;
      pts.push(new THREE.Vector3(Math.cos(a) * Math.sin(u) * r * 0.001 + Math.sin(u) * Math.cos(a) * r, Math.cos(u) * r, Math.sin(u) * Math.sin(a) * r));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const line = new THREE.Line(geo, fieldMat);
    beams.add(line);
    fieldLines.push(line);
  }
  // Equatorial debris ring
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.35, 0.02, 8, 80),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(color), transparent: true, opacity: 0.28 }),
  );
  ring.rotation.x = Math.PI / 2;
  ring.rotation.y = 0.4;
  group.add(ring);

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
  let flashPhase = 0;
  function tick() {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    beams.rotation.y += dt * 3.4 * speed;
    flashPhase += dt * 3.4 * speed;
    // Beam sweeps past the viewer twice per rotation -> pulse
    const pulse = Math.pow(Math.abs(Math.sin(flashPhase)), 12);
    starMat.emissiveIntensity = 0.7 + pulse * 1.6;
    coreLight.intensity = 25 + pulse * 45;
    ring.rotation.z += dt * 0.5 * speed;
    group.position.y = Math.sin(t * 0.7 * speed) * 0.05;
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
