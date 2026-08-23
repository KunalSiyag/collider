import * as THREE from 'three';

export interface StormFrontOptions {
  speed?: number;
  accentColor?: string;
}

const cloudVertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const cloudFragmentShader = /* glsl */ `
uniform float uTime;
uniform float uSpeed;
uniform vec3 uCloud;
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
  vec2 uv = vUv * vec2(4.0, 2.0);
  float t = uTime * uSpeed * 0.08;
  float n = fbm(uv * 2.0 + vec2(t, -t));
  float density = smoothstep(0.35, 0.8, n + vUv.y * 0.3);
  float flash = max(0.0, sin(uTime * uSpeed * 0.9) - 0.94) * 16.0;
  vec3 col = mix(uAccent, uCloud, density);
  col += flash * vec3(0.9, 0.9, 1.0);
  gl_FragColor = vec4(col, density * (0.55 + flash * 0.2));
}
`;

export function createStormFront(
  container: HTMLElement,
  options: StormFrontOptions = {},
): () => void {
  const { speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 60);
  camera.position.set(0, 0, 10);

  const layers: THREE.Mesh[] = [];
  const materials: THREE.ShaderMaterial[] = [];
  const geometry = new THREE.PlaneGeometry(30, 14);
  for (let i = 0; i < 3; i++) {
    const material = new THREE.ShaderMaterial({
      vertexShader: cloudVertexShader,
      fragmentShader: cloudFragmentShader,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: i * 7 },
        uSpeed: { value: speed * (0.6 + i * 0.4) },
        uCloud: { value: new THREE.Color('#3a3f58').multiplyScalar(1 - i * 0.18) },
        uAccent: { value: new THREE.Color(['#8b5cf6', '#a78bfa', '#6d28d9'][i]) },
      },
    });
    materials.push(material);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set((i - 1) * 2, (i - 1) * 1.4, -i * 3);
    scene.add(mesh);
    layers.push(mesh);
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
    for (const m of materials) m.uniforms.uTime.value = t;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    geometry.dispose();
    for (const m of materials) m.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
