import * as THREE from 'three';

export interface QuantumFoamOptions {
  count?: number;
  accentColor?: string;
}

const vertexShader = /* glsl */ `
uniform float uTime;
attribute float aPhase;
attribute float aSpeed;
varying float vAlpha;

void main() {
  vec3 pos = position;
  pos.x += sin(uTime * aSpeed + aPhase) * 0.5;
  pos.y += cos(uTime * aSpeed * 1.3 + aPhase) * 0.5;
  pos.z += sin(uTime * aSpeed * 0.7 + aPhase * 2.0) * 0.4;
  vAlpha = 0.35 + 0.65 * pow(0.5 + 0.5 * sin(uTime * aSpeed * 2.0 + aPhase * 3.0), 2.0);
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = (30.0 / -mv.z) * (0.4 + vAlpha);
  gl_Position = projectionMatrix * mv;
}
`;

const fragmentShader = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
varying float vAlpha;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float mask = smoothstep(0.5, 0.05, length(uv));
  vec3 col = mix(uColorA, uColorB, fract(vAlpha * 3.7));
  gl_FragColor = vec4(col, mask * vAlpha);
}
`;

export function createQuantumFoam(
  container: HTMLElement,
  options: QuantumFoamOptions = {},
): () => void {
  const { count = 900, accentColor = '#22d3ee' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 50);
  camera.position.set(0, 0, 12);

  let seed = 626262626;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const speeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (rand() - 0.5) * 18;
    positions[i * 3 + 1] = (rand() - 0.5) * 11;
    positions[i * 3 + 2] = (rand() - 0.5) * 10;
    phases[i] = rand() * Math.PI * 2;
    speeds[i] = 0.4 + rand() * 1.8;
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
  geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color('#8b5cf6') },
      uColorB: { value: new THREE.Color(accentColor) },
    },
  });
  scene.add(new THREE.Points(geometry, material));

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
