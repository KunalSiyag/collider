import * as THREE from 'three';

export interface LighthouseBeamOptions {
  beamColor?: string;
  speed?: number;
}

export function createLighthouseBeam(
  container: HTMLElement,
  options: LighthouseBeamOptions = {},
): () => void {
  const { beamColor = '#fde68a', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#0b0b10', 12, 46);
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 80);
  camera.position.set(0, 2, 14);
  camera.lookAt(0, 1.5, -6);

  let seed = 1887;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const towerGeo = new THREE.CylinderGeometry(0.5, 0.9, 8, 12);
  const towerMat = new THREE.MeshStandardMaterial({ color: '#2a2438', roughness: 0.85 });
  const tower = new THREE.Mesh(towerGeo, towerMat);
  tower.position.set(-4, 2.5, -14);
  scene.add(tower);

  const lampGeo = new THREE.SphereGeometry(0.45, 16, 16);
  const lampMat = new THREE.MeshBasicMaterial({ color: '#ffffff' });
  const lamp = new THREE.Mesh(lampGeo, lampMat);
  lamp.position.set(-4, 6.9, -14);
  scene.add(lamp);

  const beamGeo = new THREE.ConeGeometry(3.4, 34, 24, 1, true);
  const beamMat = new THREE.MeshBasicMaterial({
    color: beamColor,
    transparent: true,
    opacity: 0.14,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const beam = new THREE.Mesh(beamGeo, beamMat);
  beam.rotation.z = Math.PI / 2;
  beam.position.set(-4 + 17, 6.9, -14);
  const pivot = new THREE.Group();
  pivot.position.set(-4, 6.9, -14);
  beam.position.set(17, 0, 0);
  pivot.add(beam);
  scene.add(pivot);

  const rainCount = 700;
  const rainGeo = new THREE.BufferGeometry();
  const rainPos = new Float32Array(rainCount * 3);
  for (let i = 0; i < rainCount; i++) {
    rainPos[i * 3] = (rand() - 0.5) * 40;
    rainPos[i * 3 + 1] = rand() * 18 - 4;
    rainPos[i * 3 + 2] = rand() * 30 - 20;
  }
  rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPos, 3));
  const rain = new THREE.Points(
    rainGeo,
    new THREE.PointsMaterial({ color: '#5b6b8c', size: 0.07, transparent: true, opacity: 0.65 }),
  );
  scene.add(rain);

  scene.add(new THREE.AmbientLight('#20263e', 2));

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
    pivot.rotation.y = Math.sin(t * speed * 0.35) * 1.25 + 0.4;
    const attr = rainGeo.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < rainCount; i++) {
      let y = attr.getY(i) - dt * 9;
      if (y < -4) y = 14;
      attr.setY(i, y);
    }
    attr.needsUpdate = true;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    towerGeo.dispose();
    towerMat.dispose();
    lampGeo.dispose();
    lampMat.dispose();
    beamGeo.dispose();
    beamMat.dispose();
    rainGeo.dispose();
    rain.material.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
