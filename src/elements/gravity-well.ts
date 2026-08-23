import * as THREE from 'three';

export interface GravityWellOptions {
  accentColor?: string;
}

export function createGravityWell(
  container: HTMLElement,
  options: GravityWellOptions = {},
): () => void {
  const { accentColor = '#22d3ee' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0b0b10, 14, 50);
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 120);
  camera.position.set(0, 7, 15);
  camera.lookAt(0, -2, 0);

  const GRID = 40;
  const SIZE = 34;
  const gridGeo = new THREE.PlaneGeometry(SIZE, SIZE, GRID, GRID);
  const gridMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(accentColor), wireframe: true, transparent: true, opacity: 0.35,
  });
  const grid = new THREE.Mesh(gridGeo, gridMat);
  grid.rotation.x = -Math.PI / 2;
  scene.add(grid);

  interface Orb { mesh: THREE.Mesh; angle: number; radius: number; speed: number; fall: number; size: number }
  const orbs: Orb[] = [];
  const orbGeo = new THREE.SphereGeometry(1, 16, 12);
  let seed = 5150;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = 0; i < 24; i++) {
    const size = 0.1 + rand() * 0.3;
    const mat = new THREE.MeshStandardMaterial({
      color: i % 3 === 0 ? 0xf472b6 : 0xa78bfa,
      emissive: new THREE.Color(i % 3 === 0 ? '#f472b6' : '#a78bfa'),
      emissiveIntensity: 0.5,
      roughness: 0.4,
    });
    const mesh = new THREE.Mesh(orbGeo, mat);
    mesh.scale.setScalar(size);
    scene.add(mesh);
    orbs.push({
      mesh,
      angle: rand() * Math.PI * 2,
      radius: 4 + rand() * 12,
      speed: 0.25 + rand() * 0.5,
      fall: rand() * 8,
      size,
    });
  }

  const singularity = new THREE.Mesh(
    new THREE.SphereGeometry(0.85, 28, 20),
    new THREE.MeshBasicMaterial({ color: 0x05050a }),
  );
  singularity.position.y = -3;
  scene.add(singularity);

  const haloGeo = new THREE.TorusGeometry(1.35, 0.05, 10, 60);
  const halos: THREE.Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const halo = new THREE.Mesh(haloGeo, new THREE.MeshBasicMaterial({
      color: new THREE.Color(i === 1 ? accentColor : '#8b5cf6'),
      transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    halo.position.y = -3;
    halo.rotation.x = Math.PI / 2 + i * 0.5;
    halos.push(halo);
    scene.add(halo);
  }

  const wellLight = new THREE.PointLight(new THREE.Color(accentColor), 26, 16);
  wellLight.position.set(0, -2.4, 0);
  scene.add(wellLight);
  scene.add(new THREE.AmbientLight(0x20283c, 1.4));

  function resize() {
    const w = container.clientWidth, h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
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
    const posAttr = gridGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const d = Math.max(Math.hypot(x, y), 0.001);
      const dip = -9 / (1 + d * d * 0.09);
      const ripple = Math.sin(d * 1.4 - t * 3) * 0.12 * Math.exp(-d * 0.12);
      posAttr.setZ(i, dip + ripple);
    }
    posAttr.needsUpdate = true;
    gridGeo.computeVertexNormals();

    for (const o of orbs) {
      o.angle += o.speed * 0.01;
      o.radius -= 0.008;
      if (o.radius < 1.1) {
        o.radius = 13 + rand() * 4;
        o.angle = rand() * Math.PI * 2;
      }
      o.mesh.position.set(Math.cos(o.angle) * o.radius, o.fall + Math.sin(t + o.angle) * 0.4, Math.sin(o.angle) * o.radius);
    }
    halos.forEach((h, i) => {
      h.rotation.z += 0.01 + i * 0.004;
      h.scale.setScalar(1 + Math.sin(t * 2 + i) * 0.12);
    });
    camera.position.x = Math.sin(t * 0.08) * 3;
    camera.lookAt(0, -2.5, 0);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [gridGeo, orbGeo, haloGeo].forEach((g) => g.dispose());
    [gridMat].forEach((mt) => mt.dispose());
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh && o.material instanceof THREE.Material && o.material !== gridMat) o.material.dispose();
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
