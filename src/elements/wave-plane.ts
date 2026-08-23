import * as THREE from 'three';

export interface WavePlaneOptions {
  colorA?: string;
  colorB?: string;
  amplitude?: number;
  speed?: number;
  density?: number;
}

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uAmplitude;
uniform float uSpeed;
varying float vElevation;
varying float vDepth;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  float wave1 = sin(modelPosition.x * 0.6 + uTime * uSpeed) * 0.6;
  float wave2 = sin(modelPosition.z * 0.45 + uTime * uSpeed * 0.8) * 0.4;
  float wave3 = sin((modelPosition.x + modelPosition.z) * 0.3 + uTime * uSpeed * 1.3) * 0.25;
  modelPosition.y += (wave1 + wave2 + wave3) * uAmplitude;
  vElevation = modelPosition.y;
  vec4 mvPosition = viewMatrix * modelPosition;
  vDepth = -mvPosition.z;
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
varying float vElevation;
varying float vDepth;

void main() {
  float t = smoothstep(-1.2, 1.2, vElevation);
  vec3 color = mix(uColorA, uColorB, t);
  float fade = 1.0 - smoothstep(14.0, 26.0, vDepth);
  gl_FragColor = vec4(color, fade);
}
`;

export function createWavePlane(
  container: HTMLElement,
  options: WavePlaneOptions = {},
): () => void {
  const {
    colorA = '#312e81',
    colorB = '#22d3ee',
    amplitude = 1,
    speed = 1,
    density = 120,
  } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x09090b, 10, 26);

  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 3.4, 9);
  camera.lookAt(0, -0.5, 0);

  const geometry = new THREE.PlaneGeometry(30, 24, density, Math.round(density * 0.8));
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    wireframe: true,
    transparent: true,
    uniforms: {
      uTime: { value: 0 },
      uAmplitude: { value: amplitude },
      uSpeed: { value: speed },
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
    },
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = 0;
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
    material.uniforms.uTime.value = clock.getElapsedTime();
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
