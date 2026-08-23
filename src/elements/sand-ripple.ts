import * as THREE from 'three';

export interface SandRippleOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uSpeed;
varying vec2 vUv;
varying float vRidge;

float wave(vec2 p, float t) {
  return sin(p.x * 3.0 + sin(p.y * 2.0 + t) * 1.4 + t * 0.8) * 0.5 + 0.5;
}

void main() {
  vec3 pos = position;
  float t = uTime * uSpeed;
  float w = wave(uv * vec2(14.0, 9.0), t);
  pos.z += w * 0.35;
  vRidge = w;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = /* glsl */ `
uniform vec3 uSand;
uniform vec3 uAccent;
varying vec2 vUv;
varying float vRidge;

void main() {
  float ridge = smoothstep(0.55, 0.95, vRidge);
  float shadow = smoothstep(0.5, 0.05, vRidge);
  vec3 col = uSand * (0.55 + vRidge * 0.6) - shadow * 0.12;
  col += ridge * uAccent * 0.22;
  gl_FragColor = vec4(col, 1.0);
}
`;

export function createSandRipple(
  container: HTMLElement,
  options: SandRippleOptions = {},
): () => void {
  const { color = '#b08a5e', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#0b0b10', 10, 34);
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 60);
  camera.position.set(0, 2.6, 8);
  camera.lookAt(0, 0.4, -4);

  const geometry = new THREE.PlaneGeometry(26, 18, 180, 120);
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uSand: { value: new THREE.Color(color).multiplyScalar(0.55) },
      uAccent: { value: new THREE.Color(accentColor) },
    },
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  scene.add(mesh);

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
