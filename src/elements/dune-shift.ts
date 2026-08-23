import * as THREE from 'three';

export interface DuneShiftOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uSpeed;
varying float vElev;
varying vec3 vPos;

void main() {
  vec3 pos = position;
  float x = pos.x;
  float y = pos.y;
  float t = uTime * uSpeed;
  float e = sin(x * 0.45 + t) * 0.4
          + cos(y * 0.3 + t * 0.7) * 0.35
          + sin((x + y) * 0.18 - t * 0.45) * 0.5
          + sin(x * 1.1 - y * 0.6 + t * 0.9) * 0.15;
  pos.z += e;
  vElev = e;
  vPos = pos;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = /* glsl */ `
uniform vec3 uSand;
uniform vec3 uCrest;
uniform vec3 uAccent;
varying float vElev;

void main() {
  float shade = smoothstep(-1.1, 1.25, vElev);
  float crest = smoothstep(0.8, 1.1, vElev);
  float shadowSide = smoothstep(0.2, -0.8, vElev);
  vec3 col = mix(uSand * 0.4, uSand, shade);
  col += shadowSide * vec3(-0.05, -0.04, -0.02);
  col = mix(col, uCrest, crest * 0.5);
  col += crest * uAccent * 0.18;
  gl_FragColor = vec4(col, 1.0);
}
`;

export function createDuneShift(container: HTMLElement, options: DuneShiftOptions = {}): () => void {
  const { color = '#c2956a', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#0b0b10', 10, 36);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 80);
  camera.position.set(0, 2.2, 10);
  camera.lookAt(0, -0.6, -8);

  const geometry = new THREE.PlaneGeometry(40, 60, 170, 220);
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uSand: { value: new THREE.Color(color).multiplyScalar(0.6) },
      uCrest: { value: new THREE.Color('#ffe0b3').multiplyScalar(0.7) },
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
