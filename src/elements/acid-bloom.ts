import * as THREE from 'three';

export interface AcidBloomOptions {
  speed?: number;
}

const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fragmentShader = /* glsl */ `
uniform float uTime;
uniform float uSpeed;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p *= 2.04;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = vUv - 0.5;
  float t = uTime * uSpeed * 0.15;
  float r1 = fbm(uv * 3.0 + t);
  float r2 = fbm(uv * 3.0 - t * 0.7 + r1);
  float bloom = smoothstep(0.45, 0.9, r1 * r2 * 3.4 - length(uv) * 1.6);
  float veins = pow(1.0 - abs(sin(r2 * 12.0 + t * 2.0)), 8.0);
  vec3 col = mix(vec3(0.02, 0.03, 0.05), vec3(0.55, 0.95, 0.35), bloom * 0.8);
  col += veins * vec3(0.54, 0.36, 0.96) * bloom;
  col += bloom * vec3(0.13, 0.83, 0.93) * veins * 0.6;
  gl_FragColor = vec4(col, clamp(bloom * 0.85 + veins * bloom * 0.5, 0.0, 0.95));
}
`;

export function createAcidBloom(container: HTMLElement, options: AcidBloomOptions = {}): () => void {
  const { speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    uniforms: { uTime: { value: 0 }, uSpeed: { value: speed } },
  });
  scene.add(new THREE.Mesh(geometry, material));

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
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
