import * as THREE from 'three';

export interface MonsoonCloudsOptions {
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
uniform vec3 uCloud;
uniform vec3 uDark;
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
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p *= 2.03;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = vUv * vec2(5.0, 2.4);
  float t = uTime * 0.05;
  float n1 = fbm(uv + vec2(t, -t * 0.4));
  float n2 = fbm(uv * 2.2 - vec2(t * 1.6, t));
  float clouds = smoothstep(0.32, 0.78, n1 * 0.7 + n2 * 0.4);
  float flashPos = smoothstep(0.02, 0.0, abs(n2 - fract(uTime * 0.07)));
  float flash = max(0.0, sin(uTime * 0.8) - 0.96) * 20.0 + flashPos * max(0.0, sin(uTime * 3.7) - 0.9) * 10.0;
  vec3 col = mix(uDark, uCloud, clouds);
  col += flash * mix(uCloud, uAccent, 0.4) * clouds;
  gl_FragColor = vec4(col, clamp(clouds * (0.75 + flash * 0.1), 0.0, 1.0) * 0.92);
}
`;

export function createMonsoonClouds(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#a78bfa' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 40);
  camera.position.set(0, 0, 8);

  const layers: { mesh: THREE.Mesh; mat: THREE.ShaderMaterial }[] = [];
  const geometry = new THREE.PlaneGeometry(26, 13);
  for (let i = 0; i < 3; i++) {
    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: i * 11 },
        uCloud: { value: new THREE.Color('#565f80').multiplyScalar(1 - i * 0.22) },
        uDark: { value: new THREE.Color('#12141f') },
        uAccent: { value: new THREE.Color(accentColor) },
      },
    });
    const mesh = new THREE.Mesh(geometry, mat);
    mesh.position.set((i - 1) * 3, 1.2 - i * 0.8, -i * 2.4);
    scene.add(mesh);
    layers.push({ mesh, mat });
  }

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
    const t = clock.getElapsedTime();
    for (const layer of layers) layer.mat.uniforms.uTime.value = t + layers.indexOf(layer) * 11;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    geometry.dispose();
    for (const layer of layers) layer.mat.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
