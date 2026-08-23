import * as THREE from 'three';

export interface PlasmaOptions {
  colorA?: string;
  colorB?: string;
  speed?: number;
}

const fragmentShader = /* glsl */ `
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
varying vec2 vUv;

void main() {
  vec2 p = vUv * 6.0;
  float v = sin(p.x + uTime) + sin(p.y + uTime * 1.3)
          + sin(p.x + p.y + uTime * 0.7) * 0.8
          + sin(length(p - vec2(3.0, 3.0)) - uTime * 1.6);
  float t = v * 0.25 + 0.5;
  vec3 color = mix(uColorA, uColorB, t);
  color += pow(t, 3.0) * 0.22;
  gl_FragColor = vec4(color, 1.0);
}
`;

export function createPlasma(
  container: HTMLElement,
  options: PlasmaOptions = {},
): () => void {
  const { colorA = '#4c1d95', colorB = '#f97316', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  const material = new THREE.ShaderMaterial({
    fragmentShader,
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    uniforms: {
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
    },
  });
  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

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
    material.uniforms.uTime.value = clock.getElapsedTime() * speed;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    material.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
