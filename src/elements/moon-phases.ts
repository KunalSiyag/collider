import * as THREE from 'three';

export interface MoonPhasesOptions {
  accentColor?: string;
  speed?: number;
}

export function createMoonPhases(
  container: HTMLElement,
  options: MoonPhasesOptions = {},
): () => void {
  const { accentColor = '#8b5cf6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 3, 15);
  camera.lookAt(0, 0, 0);

  let seed = 295306;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const starCount = 500;
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    starPos[i * 3] = (rand() - 0.5) * 44;
    starPos[i * 3 + 1] = (rand() - 0.5) * 26;
    starPos[i * 3 + 2] = -rand() * 20;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: '#7777aa', size: 0.06 })));

  const moonGeo = new THREE.SphereGeometry(1, 48, 48);
  const moons: { mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial; x: number }[] = [];
  for (let i = 0; i < 6; i++) {
    const mat = new THREE.MeshStandardMaterial({
      color: '#cfd4e8',
      roughness: 0.9,
      metalness: 0,
    });
    const mesh = new THREE.Mesh(moonGeo, mat);
    const x = -12 + i * 4.8;
    mesh.position.set(x, Math.sin(i * 1.1) * 1.4, 0);
    scene.add(mesh);
    moons.push({ mesh, mat, x });
  }

  const sunLight = new THREE.DirectionalLight('#fff4d6', 2.4);
  scene.add(sunLight);
  const fillLight = new THREE.AmbientLight(accentColor, 0.25);
  scene.add(fillLight);

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
    const t = clock.getElapsedTime() * speed;
    for (let i = 0; i < moons.length; i++) {
      const phaseAngle = t * 0.25 + (i / moons.length) * Math.PI * 2;
      sunLight.position.set(Math.cos(phaseAngle) * 20, 2 + Math.sin(phaseAngle) * 6, Math.sin(phaseAngle) * 10);
      moons[i].mesh.position.y = Math.sin(t * 0.4 + i) * 0.35 + Math.sin(i * 1.1) * 1.4;
      moons[i].mat.emissive.set(accentColor);
      moons[i].mat.emissiveIntensity = 0.03 + 0.03 * Math.sin(t + i);
    }
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    starGeo.dispose();
    moonGeo.dispose();
    for (const moon of moons) moon.mat.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
