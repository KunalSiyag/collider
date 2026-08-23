import * as THREE from 'three';

export interface OceanSwellOptions {
  accentColor?: string;
  speed?: number;
}

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uSpeed;
varying float vHeight;

void main() {
  vec3 pos = position;
  float h = sin(pos.x * 0.35 + uTime * uSpeed) * 0.5
          + cos(pos.y * 0.28 + uTime * uSpeed * 0.8) * 0.4
          + sin((pos.x + pos.y) * 0.16 - uTime * uSpeed * 0.55) * 0.35;
  pos.z += h;
  vHeight = h;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = /* glsl */ `
uniform vec3 uDeep;
uniform vec3 uCrest;
varying float vHeight;

void main() {
  float shade = smoothstep(-1.1, 1.2, vHeight);
  vec3 col = mix(uDeep, uCrest, shade);
  float crest = smoothstep(0.85, 1.2, vHeight);
  col += crest * 0.6;
  gl_FragColor = vec4(col, 1.0);
}
`;

export function createOceanSwell(
  container: HTMLElement,
  options: OceanSwellOptions = {},
): () => void {
  const { accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#0b0b10', 14, 44);
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 80);
  camera.position.set(0, 3.4, 12);
  camera.lookAt(0, -0.5, -8);

  const geometry = new THREE.PlaneGeometry(50, 40, 130, 100);
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uDeep: { value: new THREE.Color('#062033') },
      uCrest: { value: new THREE.Color(accentColor) },
    },
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.z = -8;
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
