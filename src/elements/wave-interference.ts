import * as THREE from 'three';

export interface WaveInterferenceOptions {
  accentColor?: string;
  speed?: number;
}

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uSpeed;
varying float vHeight;

void main() {
  vec3 pos = position;
  float t = uTime * uSpeed;
  float d1 = length(pos.xy - vec2(-3.0, -2.0));
  float d2 = length(pos.xy - vec2(3.0, 2.0));
  float h = sin(d1 * 1.8 - t * 2.4) * exp(-d1 * 0.16)
          + sin(d2 * 1.6 - t * 2.0) * exp(-d2 * 0.16);
  pos.z += h;
  vHeight = h;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = /* glsl */ `
uniform vec3 uBase;
uniform vec3 uAccent;
uniform vec3 uAccent2;
varying float vHeight;

void main() {
  float crest = smoothstep(0.35, 1.3, vHeight);
  float trough = smoothstep(-0.35, -1.3, vHeight);
  vec3 col = uBase;
  col = mix(col, uAccent, crest);
  col = mix(col, uAccent2, trough * 0.7);
  gl_FragColor = vec4(col, 0.92);
}
`;

export function createWaveInterference(
  container: HTMLElement,
  options: WaveInterferenceOptions = {},
): () => void {
  const { speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#0b0b10', 12, 30);
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 60);
  camera.position.set(0, 5.5, 11);
  camera.lookAt(0, 0.5, 0);

  const geometry = new THREE.PlaneGeometry(22, 14, 160, 110);
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    uniforms: {
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uBase: { value: new THREE.Color('#131a33') },
      uAccent: { value: new THREE.Color('#8b5cf6') },
      uAccent2: { value: new THREE.Color('#22d3ee') },
    },
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2.15;
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
