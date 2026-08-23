import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export interface LiquidKnotOptions {
  color?: string;
  metalness?: number;
  roughness?: number;
  distortion?: number;
  speed?: number;
}

export function createLiquidKnot(
  container: HTMLElement,
  options: LiquidKnotOptions = {},
): () => void {
  const {
    color = '#e4e4e7',
    metalness = 1,
    roughness = 0.12,
    distortion = 0.08,
    speed = 0.8,
  } = options;

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

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 5);

  const geometry = new THREE.TorusKnotGeometry(1.15, 0.38, 220, 36);
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness,
    roughness,
    envMapIntensity: 1.2,
  });

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = { value: 0 };
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
        uniform float uTime;`,
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        transformed += normal * sin(position.x * 4.0 + uTime) * cos(position.y * 3.0 - uTime * 1.3) * ${distortion.toFixed(3)};`,
      );
    (material as unknown as { userData: { shader?: THREE.WebGLProgramParametersWithUniforms } }).userData.shader =
      shader;
  };

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

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
    const shader = (
      material as unknown as { userData: { shader?: { uniforms: Record<string, { value: number }> } } }
    ).userData.shader;
    if (shader) shader.uniforms.uTime.value = t;
    mesh.rotation.y = t * 0.35;
    mesh.rotation.x = Math.sin(t * 0.25) * 0.25;
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
