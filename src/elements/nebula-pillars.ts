import * as THREE from 'three';

export interface NebulaPillarsOptions {
  count?: number;
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
uniform vec3 uColorA;
uniform vec3 uColorB;

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
    p *= 2.02;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  float t = uTime * 0.05;
  float pillarMask = smoothstep(0.25, 0.75, fbm(vec2(vUv.x * 8.0, vUv.y * 1.5 - t)));
  float density = smoothstep(0.4, 0.85, fbm(vUv * 4.0 + vec2(0.0, -t)) + pillarMask * 0.35);
  vec3 col = mix(uColorA, uColorB, fbm(vUv * 2.6 - t));
  float sparkle = pow(fbm(vUv * 30.0 + t * 3.0), 12.0) * 3.0;
  col += sparkle;
  gl_FragColor = vec4(col, density * 0.85);
}
`;

export function createNebulaPillars(
  container: HTMLElement,
  options: { count?: number } = {},
): () => void {
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 40);
  camera.position.set(0, 0, 8);

  const geometry = new THREE.PlaneGeometry(16, 10);
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color('#3b1d63') },
      uColorB: { value: new THREE.Color('#22d3ee') },
    },
  });
  scene.add(new THREE.Mesh(geometry, material));

  let seed = 700700;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(400 * 3);
  for (let i = 0; i < 400; i++) {
    starPos[i * 3] = (rand() - 0.5) * 16;
    starPos[i * 3 + 1] = (rand() - 0.5) * 10;
    starPos[i * 3 + 2] = rand() * 3;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: '#ffffff', size: 0.04 })));

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
    starGeo.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
