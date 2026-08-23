import * as THREE from 'three';

export interface CoralGlowOptions {
  count?: number;
  accentColor?: string;
}

export function createCoralGlow(container: HTMLElement, options: CoralGlowOptions = {}): () => void {
  const { count = 30, accentColor = '#f472b6' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#0b0b10', 8, 28);
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 50);
  camera.position.set(0, 1.5, 12);
  camera.lookAt(0, 0.5, 0);

  let seed = 322507;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const polyps: { mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial; phase: number; baseY: number }[] = [];
  for (let i = 0; i < count; i++) {
    const color = [accentColor, '#8b5cf6', '#22d3ee'][i % 3];
    const geo = new THREE.SphereGeometry(0.16 + rand() * 0.24, 14, 14);
    const mat = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.4,
      roughness: 0.35,
    });
    const mesh = new THREE.Mesh(geo, mat);
    const x = (rand() - 0.5) * 18;
    const z = (rand() - 0.5) * 10 - 1;
    mesh.position.set(x, -3.4, z);
    scene.add(mesh);
    polyps.push({ mesh, mat, phase: rand() * Math.PI * 2, baseY: -3.4 });
  }

  const stemsGroup = new THREE.Group();
  const stemMat = new THREE.MeshStandardMaterial({ color: '#3d2c52', roughness: 0.9 });
  for (const polyp of polyps) {
    const height = 1 + rand() * 3;
    const geo = new THREE.CylinderGeometry(0.05, 0.09, height, 6);
    const stem = new THREE.Mesh(geo, stemMat);
    stem.position.set(polyp.mesh.position.x, polyp.baseY - height / 2, polyp.mesh.position.z);
    stemsGroup.add(stem);
    polyp.baseY = -3.4 + height;
  }
  scene.add(stemsGroup);

  const fishGeo = new THREE.BufferGeometry();
  const fishCount = 90;
  const fishPos = new Float32Array(fishCount * 3);
  const fishVel: number[] = [];
  for (let i = 0; i < fishCount; i++) {
    fishPos[i * 3] = (rand() - 0.5) * 20;
    fishPos[i * 3 + 1] = rand() * 7 - 2.5;
    fishPos[i * 3 + 2] = (rand() - 0.5) * 10;
    fishVel.push(rand() > 0.5 ? 1 : -1);
  }
  fishGeo.setAttribute('position', new THREE.BufferAttribute(fishPos, 3));
  const school = new THREE.Points(
    fishGeo,
    new THREE.PointsMaterial({ color: '#ffd166', size: 0.07, opacity: 0.85, transparent: true }),
  );
  scene.add(school);

  scene.add(new THREE.AmbientLight('#253a55', 2));
  const glowLight = new THREE.PointLight(accentColor, 40, 20);
  glowLight.position.set(0, 2, 4);
  scene.add(glowLight);

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
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.getElapsedTime();
    for (const p of polyps) {
      p.mat.emissiveIntensity = 0.25 + 0.4 * (0.5 + 0.5 * Math.sin(t * 1.3 + p.phase));
      p.mesh.position.y = p.baseY + Math.sin(t * 1.1 + p.phase) * 0.08;
    }
    const attr = fishGeo.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < fishCount; i++) {
      let x = attr.getX(i) + fishVel[i] * dt * 1.6;
      if (x > 10) x = -10;
      if (x < -10) x = 10;
      attr.setX(i, x);
      attr.setY(i, attr.getY(i) + Math.sin(t * 2 + i) * dt * 0.4);
    }
    attr.needsUpdate = true;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    fishGeo.dispose();
    school.material.dispose();
    stemMat.dispose();
    for (const stem of stemsGroup.children as THREE.Mesh[]) stem.geometry.dispose();
    for (const p of polyps) {
      p.mesh.geometry.dispose();
      p.mat.dispose();
    }
    renderer.dispose();
    renderer.domElement.remove();
  };
}
