import * as THREE from 'three';

/** Hourglass 3D — falling grain particles between two glass cones. */
export interface Hourglass3DOptions {
  frameColor?: string;
  grainColor?: string;
  grains?: number;
  speed?: number;
}

export function createHourglass3D(
  container: HTMLElement,
  options: Hourglass3DOptions = {},
): () => void {
  const { frameColor = '#a16207', grainColor = '#fcd34d', grains = 500, speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
  camera.position.set(0, 0.4, 5.6);
  camera.lookAt(0, 0, 0);

  const disposables: Array<{ dispose(): void }> = [];

  // Wooden frame: top/bottom discs + pillars.
  const frameMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(frameColor), roughness: 0.6 });
  disposables.push(frameMat);
  const capGeo = new THREE.CylinderGeometry(1.15, 1.3, 0.18, 32);
  disposables.push(capGeo);
  const top = new THREE.Mesh(capGeo, frameMat);
  top.position.y = 1.55;
  const bottom = new THREE.Mesh(capGeo, frameMat);
  bottom.position.y = -1.55;
  scene.add(top, bottom);
  for (let i = 0; i < 3; i++) {
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 3.1, 12), frameMat);
    const a = (i / 3) * Math.PI * 2;
    pillar.position.set(Math.cos(a) * 1.05, 0, Math.sin(a) * 1.05);
    scene.add(pillar);
    disposables.push(pillar.geometry);
  }

  // Glass bulbs: two cones tip-to-tip with a translucent material.
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0xbfe3f2,
    transparent: true,
    opacity: 0.18,
    roughness: 0.1,
    side: THREE.DoubleSide,
  });
  disposables.push(glassMat);
  const bulbGeo = new THREE.ConeGeometry(0.95, 1.4, 32, 1, true);
  disposables.push(bulbGeo);
  const upper = new THREE.Mesh(bulbGeo, glassMat);
  upper.rotation.x = Math.PI;
  upper.position.y = 0.72;
  const lower = new THREE.Mesh(bulbGeo, glassMat);
  lower.position.y = -0.72;
  scene.add(upper, lower);

  // Grains: points streaming from the upper bulb through the neck.
  const grainGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(grains * 3);
  const seeds = new Float32Array(grains);
  for (let i = 0; i < grains; i++) {
    seeds[i] = Math.random();
    positions[i * 3] = (Math.random() - 0.5) * 0.7;
    positions[i * 3 + 1] = Math.random() * 2.4 - 1.2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.7;
  }
  grainGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const grainMat = new THREE.PointsMaterial({
    color: new THREE.Color(grainColor),
    size: 0.035,
    transparent: true,
    opacity: 0.95,
  });
  scene.add(new THREE.Points(grainGeo, grainMat));
  disposables.push(grainGeo, grainMat);

  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const key = new THREE.DirectionalLight(0xffffff, 1.1);
  key.position.set(2, 4, 3);
  scene.add(key);
  disposables.push(key);

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
  const attr = grainGeo.attributes.position as THREE.BufferAttribute;

  function tick() {
    raf = requestAnimationFrame(tick);
    const dt = clock.getDelta() * speed;
    const t = clock.getElapsedTime() * speed;

    for (let i = 0; i < grains; i++) {
      const s = seeds[i];
      // Upper grains drift toward the neck; lower grains pile outward.
      if (s > 0.25) {
        attr.array[i * 3] = THREE.MathUtils.lerp(attr.array[i * 3], 0, dt * 0.4);
        attr.array[i * 3 + 1] = Math.max(-0.05, attr.array[i * 3 + 1] - dt * (0.25 + s * 0.3));
      } else {
        const fall = (t * 0.5 + s) % 1;
        attr.array[i * 3] = Math.sin(s * 40) * 0.06 * fall;
        attr.array[i * 3 + 1] = -0.05 - fall * 1.1;
        attr.array[i * 3 + 2] = Math.cos(s * 40) * 0.06 * fall;
      }
    }
    attr.needsUpdate = true;

    scene.rotation.y = Math.sin(t * 0.3) * 0.35;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    disposables.forEach((d) => d.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
