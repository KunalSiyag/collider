import * as THREE from 'three';

export interface HelixStrandOptions {
  turns?: number;
  pointsPerStrand?: number;
  colorA?: string;
  colorB?: string;
  speed?: number;
}

export function createHelixStrand(
  container: HTMLElement,
  options: HelixStrandOptions = {},
): () => void {
  const {
    turns = 4,
    pointsPerStrand = 220,
    colorA = '#8b5cf6',
    colorB = '#22d3ee',
    speed = 1,
  } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x09090b, 6, 16);

  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0, 11);

  const group = new THREE.Group();
  group.rotation.z = 0.5;
  scene.add(group);

  function buildStrand(phaseOffset: number, color: string): THREE.Points {
    const positions = new Float32Array(pointsPerStrand * 3);
    for (let i = 0; i < pointsPerStrand; i++) {
      const s = i / pointsPerStrand;
      const angle = s * Math.PI * 2 * turns + phaseOffset;
      positions[i * 3] = Math.cos(angle) * 1.6;
      positions[i * 3 + 1] = (s - 0.5) * 9;
      positions[i * 3 + 2] = Math.sin(angle) * 1.6;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 0.075,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });
    return new THREE.Points(geometry, material);
  }

  const strandA = buildStrand(0, colorA);
  const strandB = buildStrand(Math.PI, colorB);
  group.add(strandA, strandB);

  const rungs: THREE.Mesh[] = [];
  const rungGeometry = new THREE.CylinderGeometry(0.015, 0.015, 3.2, 6);
  const rungMaterial = new THREE.MeshBasicMaterial({
    color: 0x71717a,
    transparent: true,
    opacity: 0.35,
  });

  for (let i = 0; i < 14; i++) {
    const rung = new THREE.Mesh(rungGeometry, rungMaterial);
    group.add(rung);
    rungs.push(rung);
  }

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width === 0 || height === 0) return;
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

    strandA.geometry.attributes.position.needsUpdate = false;
    group.rotation.y = t * 0.5;

    for (let i = 0; i < rungs.length; i++) {
      const s = (i + 0.5) / rungs.length;
      const angle = s * Math.PI * 2 * turns + t * 0.5;
      const y = (s - 0.5) * 9;
      rungs[i].position.set(Math.cos(angle) * 0.8, y, Math.sin(angle) * 0.8);
      rungs[i].rotation.z = -angle;
      rungs[i].scale.x = Math.abs(Math.sin(angle));
    }

    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    strandA.geometry.dispose();
    strandB.geometry.dispose();
    rungGeometry.dispose();
    rungMaterial.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
