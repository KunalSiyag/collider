import * as THREE from 'three';

export interface ClockworkOrreryOptions {
  brassColor?: string;
}

export function createClockworkOrrery(
  container: HTMLElement,
  options: ClockworkOrreryOptions = {},
): () => void {
  const { brassColor = '#c9a35a' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b0b10, 0.02);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(6, 5.5, 9);
  camera.lookAt(0, 0.6, 0);

  const brass = new THREE.MeshStandardMaterial({ color: new THREE.Color(brassColor), roughness: 0.3, metalness: 0.95 });
  const darkMetal = new THREE.MeshStandardMaterial({ color: 0x2a2338, roughness: 0.5, metalness: 0.8 });

  const base = new THREE.Mesh(new THREE.CylinderGeometry(4.6, 5.2, 0.5, 48), darkMetal);
  scene.add(base);
  const column = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.3, 2.2, 12), brass);
  column.position.y = 1.3;
  scene.add(column);

  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(0.75, 24, 20),
    new THREE.MeshBasicMaterial({ color: 0xffd98a }),
  );
  sun.position.y = 3;
  scene.add(sun);
  const halo = new THREE.PointLight(0xffd98a, 30, 14);
  halo.position.copy(sun.position);
  scene.add(halo);

  interface Arm { pivot: THREE.Group; planet: THREE.Mesh; speed: number }
  const arms: Arm[] = [];
  const planetColors = ['#a78bfa', '#22d3ee', '#f472b6', '#8b5cf6', '#e0d7ff'];
  for (let i = 0; i < 5; i++) {
    const r = 1.4 + i * 0.72;
    const ringTrack = new THREE.Mesh(new THREE.TorusGeometry(r, 0.03, 8, 90), brass);
    ringTrack.rotation.x = Math.PI / 2;
    ringTrack.position.y = 3;
    scene.add(ringTrack);

    const pivot = new THREE.Group();
    pivot.position.y = 3;
    scene.add(pivot);
    const armLen = r;
    const arm = new THREE.Mesh(new THREE.BoxGeometry(armLen, 0.06, 0.14), brass);
    arm.position.x = armLen / 2;
    pivot.add(arm);
    const joint = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), darkMetal);
    joint.position.x = armLen;
    pivot.add(joint);
    const col = planetColors[i % planetColors.length];
    const pmat = new THREE.MeshStandardMaterial({ color: new THREE.Color(col), emissive: new THREE.Color(col), emissiveIntensity: 0.35, roughness: 0.4 });
    const planetSize = 0.16 + i * 0.045;
    const planet = new THREE.Mesh(new THREE.SphereGeometry(planetSize, 18, 14), pmat);
    planet.position.x = armLen;
    pivot.add(planet);
    if (i === 1 || i === 3) {
      const pr = new THREE.Mesh(new THREE.TorusGeometry(planetSize * 1.7, planetSize * 0.16, 8, 40), brass);
      pr.rotation.x = 1.2;
      planet.add(pr);
    }
    arms.push({ pivot, planet, speed: 0.9 / (i + 1.4) });
  }

  const dustGeo = new THREE.BufferGeometry();
  const dn = 160;
  const dpos = new Float32Array(dn * 3);
  for (let i = 0; i < dn; i++) {
    dpos[i * 3] = (Math.random() - 0.5) * 16;
    dpos[i * 3 + 1] = Math.random() * 8;
    dpos[i * 3 + 2] = (Math.random() - 0.5) * 16;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dpos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0xc9a35a, size: 0.05, transparent: true, opacity: 0.5 }));
  scene.add(dust);

  scene.add(new THREE.AmbientLight(0x2e2740, 1.6));
  const cool = new THREE.DirectionalLight(0xbfd4ff, 0.8);
  cool.position.set(-6, 8, 4);
  scene.add(cool);

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
    for (const a of arms) a.pivot.rotation.y = t * a.speed;
    sun.scale.setScalar(1 + Math.sin(t * 3) * 0.04);
    dust.rotation.y = t * 0.03;
    camera.position.x = 6 + Math.sin(t * 0.1) * 1.2;
    camera.lookAt(0, 2.4, 0);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    dustGeo.dispose();
    [brass, darkMetal].forEach((mt) => mt.dispose());
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh || o instanceof THREE.Points) {
        if (o.geometry !== dustGeo) o.geometry.dispose();
        if (o.material instanceof THREE.Material && o.material !== brass && o.material !== darkMetal) o.material.dispose();
      }
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
