import * as THREE from 'three';

export interface BubbleUniverseOptions {
  count?: number;
  speed?: number;
}

const vertexShader = /* glsl */ `
varying vec3 vNormal;
varying vec3 vView;
void main() {
  vNormal = normalMatrix * normal;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vView = -mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`;

const fragmentShader = /* glsl */ `
uniform float uTime;
uniform float uSeed;
varying vec3 vNormal;
varying vec3 vView;

void main() {
  float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 1.5);
  float bands = sin(fresnel * 16.0 + uTime * 1.4 + uSeed);
  vec3 iridescence = 0.5 + 0.5 * cos(bands * 4.0 + uSeed + vec3(0.0, 2.09, 4.18));
  gl_FragColor = vec4(iridescence * (0.3 + fresnel * 1.2), 0.08 + fresnel * 0.6);
}
`;

export function createBubbleUniverse(
  container: HTMLElement,
  options: BubbleUniverseOptions = {},
): () => void {
  const { count = 24, speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 60);
  camera.position.set(0, 0, 11);

  let seed = 555111;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const geometry = new THREE.SphereGeometry(1, 32, 32);
  interface Bub {
    mesh: THREE.Mesh;
    vy: number;
    phase: number;
    mat: THREE.ShaderMaterial;
  }
  const bubbles: Bub[] = [];
  for (let i = 0; i < count; i++) {
    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uSeed: { value: rand() * 10 } },
    });
    const mesh = new THREE.Mesh(geometry, mat);
    mesh.position.set((rand() - 0.5) * 15, (rand() - 0.5) * 9, (rand() - 0.5) * 7);
    mesh.scale.setScalar(0.4 + rand() * 1.6);
    scene.add(mesh);
    bubbles.push({ mesh, mat, vy: (0.3 + rand() * 0.7) * speed, phase: rand() * Math.PI * 2 });
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
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.getElapsedTime();
    for (const b of bubbles) {
      b.mesh.position.y += b.vy * dt;
      b.mesh.position.x += Math.sin(t * 0.7 + b.phase) * dt * 0.8;
      if (b.mesh.position.y > 8) b.mesh.position.y = -8;
      if (b.mesh.position.x > 12) b.mesh.position.x = -12;
      if (b.mesh.position.x < -12) b.mesh.position.x = 12;
      b.mat.uniforms.uTime.value = t;
    }
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    geometry.dispose();
    for (const b of bubbles) b.mat.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
