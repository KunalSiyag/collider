import * as THREE from 'three';

export interface DesertMirageOptions {
  accentColor?: string;
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
uniform vec3 uSand;
uniform vec3 uSky;
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

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p *= 2.1;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  float horizon = vUv.y;
  float shimmer = fbm(vec2(vUv.x * 20.0, horizon * 60.0 + uTime * 0.6));
  float duneLine = 0.32 + fbm(vec2(vUv.x * 5.0, 1.7)) * 0.14;
  vec3 col;
  if (horizon < duneLine) {
    col = mix(uSand * 1.15, uSand * 0.55, smoothstep(0.0, duneLine, horizon));
    col += smoothstep(duneLine, duneLine - 0.06, horizon) * 0.08;
    float wobble = (shimmer - 0.5) * 0.02 * smoothstep(duneLine - 0.12, duneLine, horizon);
    col += wobble;
  } else {
    float skyT = smoothstep(duneLine, 1.0, horizon);
    col = mix(uSky * 0.4, uSky, skyT);
    float heat = smoothstep(duneLine, duneLine + 0.25, horizon) * pow(shimmer, 3.0) * 0.35;
    col += uAccent * heat;
  }
  float sun = exp(-length((vUv - vec2(0.72, 0.62)) * vec2(2.2, 1.0)) * 9.0);
  col += sun * vec3(1.0, 0.85, 0.6) * 0.8;
  gl_FragColor = vec4(col, 1.0);
}
`;

export function createDesertMirage(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#f472b6' } = options;

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
      uSand: { value: new THREE.Color('#c99a63') },
      uSky: { value: new THREE.Color('#f7b267') },
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
