import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export interface MonolithOptions {
  color?: string;
  rimColor?: string;
  speed?: number;
}

export function createMonolith(
  container: HTMLElement,
  options: MonolithOptions = {},
): () => void {
  const { color = '#18181b', rimColor = '#8b5cf6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const environmentTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const scene = new THREE.Scene();
  scene.environment = environmentTexture;

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(3.2, 1.4, 6);
  camera.lookAt(0, 0.4, 0);

  const geometry = new THREE.BoxGeometry(1.4, 4, 0.5);
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.9,
    roughness: 0.28,
    envMapIntensity: 1.4,
  });

  const monolith = new THREE.Mesh(geometry, material);
  scene.add(monolith);

  const rimLight = new THREE.DirectionalLight(new THREE.Color(rimColor), 6);
  rimLight.position.set(-4, 2, -3);
  scene.add(rimLight);

  const fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
  fillLight.position.set(3, -2, 4);
  scene.add(fillLight);

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
    monolith.rotation.y = t * 0.4;
    monolith.position.y = Math.sin(t * 0.7) * 0.15;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    geometry.dispose();
    material.dispose();
    environmentTexture.dispose();
    pmrem.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
