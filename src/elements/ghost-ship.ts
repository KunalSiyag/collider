import * as THREE from 'three';

export interface GhostShipOptions {
  accentColor?: string;
}

export function createGhostShip(
  container: HTMLElement,
  options: GhostShipOptions = {},
): () => void {
  const { accentColor = '#a78bfa' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x10121e, 12, 46);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 120);
  camera.position.set(7, 2.6, 11);
  camera.lookAt(0, 2, 0);

  const moon = new THREE.Mesh(
    new THREE.CircleGeometry(3.6, 48),
    new THREE.MeshBasicMaterial({ color: 0xd8dcf2, fog: false }),
  );
  moon.position.set(-8, 9, -38);
  scene.add(moon);

  const shipMat = new THREE.MeshStandardMaterial({ color: 0x181b28, roughness: 0.85 });
  const sailMat = new THREE.MeshStandardMaterial({
    color: 0xb9c0dd, roughness: 0.9, transparent: true, opacity: 0.42, emissive: new THREE.Color(accentColor), emissiveIntensity: 0.18, side: THREE.DoubleSide,
  });

  const ship = new THREE.Group();
  const hull = new THREE.Mesh(new THREE.CapsuleGeometry(1.1, 5.4, 8, 16), shipMat);
  hull.rotation.z = Math.PI / 2;
  hull.scale.set(1, 0.72, 1);
  hull.position.y = 0.9;
  ship.add(hull);
  const keel = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.5, 1.4), shipMat);
  keel.position.y = 0.45;
  ship.add(keel);
  const bowSpike = new THREE.Mesh(new THREE.ConeGeometry(0.55, 2.2, 4), shipMat);
  bowSpike.rotation.z = -Math.PI / 2;
  bowSpike.position.set(4.2, 1.1, 0);
  ship.add(bowSpike);

  const lanternMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor) });
  const masts: THREE.Group[] = [];
  [[-1.6, 3.4], [0.6, 4.4], [2.6, 2.8]].forEach(([mx, mh]) => {
    const mastG = new THREE.Group();
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.13, mh, 8), shipMat);
    mast.position.set(mx, 0.9 + mh / 2, 0);
    mastG.add(mast);
    const yard = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 3, 6), shipMat);
    yard.rotation.z = Math.PI / 2;
    yard.position.set(mx, 0.9 + mh * 0.72, 0);
    mastG.add(yard);
    const sail = new THREE.Mesh(new THREE.PlaneGeometry(2.6, mh * 0.55), sailMat);
    sail.position.set(mx, 0.9 + mh * 0.44, 0);
    mastG.add(sail);
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), lanternMat);
    lamp.position.set(mx, 0.9 + mh + 0.15, 0);
    mastG.add(lamp);
    masts.push(mastG);
    ship.add(mastG);
  });
  scene.add(ship);

  const water = new THREE.Mesh(
    new THREE.PlaneGeometry(90, 60, 40, 24),
    new THREE.MeshStandardMaterial({ color: 0x11141f, roughness: 0.35, metalness: 0.4 }),
  );
  water.rotation.x = -Math.PI / 2;
  scene.add(water);
  const wpos = water.geometry.attributes.position as THREE.BufferAttribute;

  const mistGeo = new THREE.BufferGeometry();
  const mn = 300;
  const mposArr = new Float32Array(mn * 3);
  for (let i = 0; i < mn; i++) {
    mposArr[i * 3] = (Math.random() - 0.5) * 40;
    mposArr[i * 3 + 1] = Math.random() * 2.4;
    mposArr[i * 3 + 2] = (Math.random() - 0.5) * 24;
  }
  mistGeo.setAttribute('position', new THREE.BufferAttribute(mposArr, 3));
  const mist = new THREE.Points(mistGeo, new THREE.PointsMaterial({ color: 0x8d94c4, size: 0.5, transparent: true, opacity: 0.14, depthWrite: false }));
  scene.add(mist);

  scene.add(new THREE.AmbientLight(0x2c3050, 1.6));
  const moonLight = new THREE.DirectionalLight(0xcdd3f5, 1.4);
  moonLight.position.set(-8, 10, -6);
  scene.add(moonLight);
  const ghostGlow = new THREE.PointLight(new THREE.Color(accentColor), 14, 14);
  ghostGlow.position.set(0, 3, 2);
  scene.add(ghostGlow);

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
    ship.position.y = Math.sin(t * 0.7) * 0.28;
    ship.rotation.z = Math.sin(t * 0.55) * 0.07;
    ship.rotation.x = Math.sin(t * 0.4 + 1) * 0.03;
    masts.forEach((m, i) => { m.rotation.x = Math.sin(t * 1.2 + i) * 0.02; });
    for (let i = 0; i < wpos.count; i++) {
      const x = wpos.getX(i), y = wpos.getY(i);
      wpos.setZ(i, Math.sin(x * 0.35 + t * 1.1) * 0.22 + Math.cos(y * 0.4 + t * 0.8) * 0.18);
    }
    wpos.needsUpdate = true;
    water.geometry.computeVertexNormals();
    mist.rotation.y = t * 0.01;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [moon, hull].forEach((o) => o.geometry.dispose());
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh || o instanceof THREE.Points || o instanceof THREE.Line) {
        if (o.geometry !== moon.geometry && o.geometry !== hull.geometry) o.geometry.dispose();
      }
      if ('material' in o && o.material instanceof THREE.Material) o.material.dispose();
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
