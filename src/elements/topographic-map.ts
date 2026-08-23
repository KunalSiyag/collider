import * as THREE from 'three';

export interface TopographicMapOptions {
  lineColor?: string;
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
uniform vec3 uLineColor;
uniform vec3 uAccentColor;

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
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p *= 2.05;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 p = vUv * vec2(6.0, 3.5);
  float h = fbm(p + uTime * uSpeed * 0.06) * 2.2;
  float levels = h * 14.0;
  float w = fwidth(levels);
  float line = 1.0 - smoothstep(0.0, w * 1.6, abs(fract(levels + 0.5) - 0.5) - w);
  float majorIndex = floor(mod(floor(levels), 5.0));
  vec3 col = mix(uLineColor, uAccentColor, step(0.99, majorIndex));
  float pulse = 0.5 + 0.5 * sin(uTime * 1.2 + levels * 0.8);
  float alpha = line * (0.35 + pulse * 0.45);
  gl_FragColor = vec4(col, alpha);
}
`;

export function createTopographicMap(
  container: HTMLElement,
  options: TopographicMapOptions = {},
): () => void {
  const { lineColor = '#7c6faf', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
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
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uLineColor: { value: new THREE.Color(lineColor) },
      uAccentColor: { value: new THREE.Color(accentColor) },
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
