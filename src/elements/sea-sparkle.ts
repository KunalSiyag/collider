import * as THREE from 'three';

export interface SeaSparkleOptions {
  count?: number;
  colors?: string[];
}

const vertexShader = /* glsl */ `
uniform float uTime;
attribute float aPhase;
attribute float aRate;
varying float vGlow;

void main() {
  vec3 pos = position;
  pos.y += sin(uTime * 0.8 + aPhase) * 0.25 + cos(uTime * 0.5 + aPhase * 2.0) * 0.15;
  vGlow = pow(0.5 + 0.5 * sin(uTime * aRate + aPhase * 5.0), 6.0);
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = (2.0 + vGlow * 9.0) * (10.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
`;

const fragmentShader = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
varying float vGlow;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float mask = smoothstep(0.5, 0.02, length(uv));
  vec3 col = mix(uColorA, uColorB, vGlow);
  gl_FragColor = vec4(col, mask * (0.15 + vGlow));
}
`;

export function createSeaSparkle(
  container: HTMLElement,
  options: SeaSparkleOptions = {},
): () => void {
  const { count = 1200 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 60);
  camera.position.set(0, 4, 14);
  camera.lookAt(0, -0.5, 0);

  let seed = 192837;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const rates = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (rand() - 0.5) * 30;
    positions[i * 3 + 1] = -0.4 + rand() * 0.5;
    positions[i * 3 + 2] = (rand() - 0.5) * 22;
    phases[i] = rand() * Math.PI * 2;
    rates[i] = 1 + rand() * 3;
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
  geometry.setAttribute('aRate', new THREE.BufferAttribute(rates, 1));

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color('#134e4a') },
      uColorB: { value: new THREE.Color('#fef9c3') },
    },
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  const waterGeo = new THREE.PlaneGeometry(40, 30);
  const waterMat = new THREE.MeshBasicMaterial({ color: '#04141d' });
  const water = new THREE.Mesh(waterGeo, waterMat);
  water.rotation.x = -Math.PI / 2;
  water.position.y = -0.55;
  scene.add(water);

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
    waterGeo.dispose();
    waterMat.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
