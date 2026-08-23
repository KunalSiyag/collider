import * as THREE from 'three';

export interface MountainMistOptions {
  accentColor?: string;
  speed?: number;
}

const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = /* glsl */ `
uniform float uTime;
uniform float uSpeed;
uniform vec3 uPeak;
uniform vec3 uMist;
uniform vec3 uAccent;

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

float ridge(vec2 uvIn, float seed) {
  return 0.28 * (noise(vec2(uvIn.x * 6.0 + seed, seed)) - 0.5)
       + 0.14 * noise(vec2(uvIn.x * 14.0 + seed * 3.0, seed));
}

void main() {
  vec3 col = mix(uMist * 0.7, uAccent * 0.35, smoothstep(0.9, 0.15, vUv.y)) * 0.5;
  for (int layer = 0; layer < 4; layer++) {
    float fi = float(layer);
    float scroll = uTime * uSpeed * (0.01 + fi * 0.008);
    float baseY = 0.18 + fi * 0.17;
    float h = baseY + ridge(vUv + vec2(scroll, 0.0), fi * 13.7);
    float mask = smoothstep(h + 0.004, h - 0.004, vUv.y);
    vec3 mountainCol = mix(uPeak, uMist, fi / 4.0);
    col = mix(col, mountainCol, mask);
    col += smoothstep(0.012, 0.0, abs(vUv.y - h)) * uAccent * (0.4 - fi * 0.07);
  }
  float mistBand = sin(vUv.y * 9.0 - uTime * uSpeed * 0.25) * 0.5 + 0.5;
  col += pow(mistBand, 3.0) * uMist * 0.08 * smoothstep(0.1, 0.5, vUv.y);
  gl_FragColor = vec4(col, 1.0);
}
`;

export function createMountainMist(
  container: HTMLElement,
  options: { accentColor?: string; speed?: number } = {},
): () => void {
  const { accentColor = '#a78bfa', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uPeak: { value: new THREE.Color('#181430') },
      uMist: { value: new THREE.Color('#8f86c9') },
      uAccent: { value: new THREE.Color(accentColor) },
    },
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
