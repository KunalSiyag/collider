import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export interface ShardCrystalOptions {
  count?: number;
  color?: string;
  accentColor?: string;
  speed?: number;
}

interface Shard {
  mesh: THREE.Mesh;
  spin: number;
  phase: number;
  baseY: number;
}

export function createShardCrystal(
  container: HTMLElement,
  options: ShardCrystalOptions = {},
): () => void {
  const {
    count = 9,
    color = '#c4b5fd',
    accentColor = '#22d3ee',
    speed = 1,
  } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x09090b, 8, 18);

  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 2.4, 8);
  camera.lookAt(0, 0.6, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.45));

  const keyLight = new THREE.DirectionalLight(0xffffff, 2);
  keyLight.position.set(5, 8, 5);
  scene.add(keyLight);

  const accentLight = new THREE.DirectionalLight(0x22d3ee, 1.6);
  accentLight.position.set(-6, 3, -5);
  scene.add(accentLight);

  function makeCrystalGeometry(height: number, radius: number): THREE.BufferGeometry {
    const body = new THREE.CylinderGeometry(radius * 0.72, radius, height, 6, 1);
    const tip = new THREE.ConeGeometry(radius * 0.72, height * 0.7, 6);
    tip.translate(0, height / 2 + height * 0.35, 0);
    const merged = mergeGeometries([body, tip])!;
    body.dispose();
    tip.dispose();
    return merged;
  }

  const shards: Shard[] = [];
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];

  for (let i = 0; i < count; i++) {
    const height = 1 + Math.random() * 1.8;
    const radius = 0.18 + Math.random() * 0.25;
    const geometry = makeCrystalGeometry(height, radius);
    const isAccent = i % 3 === 0;
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(isAccent ? accentColor : color),
      flatShading: true,
      metalness: 0.15,
      roughness: 0.35,
      transparent: true,
      opacity: isAccent ? 0.9 : 0.75,
    });
    const mesh = new THREE.Mesh(geometry, material);
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    const distance = 1.6 + Math.random() * 2.4;
    const baseY = height / 2 - 0.8 + Math.random() * 0.6;
    mesh.position.set(Math.cos(angle) * distance, baseY, Math.sin(angle) * distance);
    mesh.rotation.y = Math.random() * Math.PI;
    mesh.rotation.z = (Math.random() - 0.5) * 0.35;
    scene.add(mesh);
    shards.push({ mesh, spin: (Math.random() - 0.5) * speed, phase: Math.random() * Math.PI * 2, baseY });
    geometries.push(geometry);
    materials.push(material);
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

    for (const shard of shards) {
      shard.mesh.rotation.y += shard.spin * 0.01;
      shard.mesh.position.y = shard.baseY + Math.sin(t * 0.8 + shard.phase) * 0.12;
    }
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
