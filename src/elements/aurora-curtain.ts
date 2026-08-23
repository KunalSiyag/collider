import * as THREE from 'three';

export interface AuroraCurtainOptions {
  colorA?: string;
  colorB?: string;
  speed?: number;
}

const vertexShader = /* glsl */ `
uniform float uTime;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec3 p = position;
  float sway = sin(p.y * 2.2 + uTime * 0.7) * 0.35 + sin(p.y * 5.0 - uTime) * 0.14;
  p.x += sway * (p.y + 1.6);
  p.z += cos(p.y * 3.0 + uTime * 0.5) * 0.22;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

const fragmentShader = /* glsl */ `
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
varying vec2 vUv;

float band(float x, float t) {
  return sin(x * 9.0 + t * 1.4) * 0.5 + 0.5;
}

void main() {
  float verticalFade = pow(vUv.y, 1.7);
  float shimmer = band(vUv.x, uTime) * 0.35 + band(vUv.x * 1.7, uTime * 1.3) * 0.2;
  vec3 color = mix(uColorA, uColorB, shimmer);
  float alpha = verticalFade * (0.32 + shimmer * 0.55);
  gl_FragColor = vec4(color, alpha);
}
`;

export function createAuroraCurtain(
  container: HTMLElement,
  options: AuroraCurtainOptions = {},
): () => void {
  const { colorA = '#22c55e', colorB = '#8b5cf6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
  camera.position.set(0, 0, 6.4);

  const geometry = new THREE.PlaneGeometry(11, 7, 90, 60);
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
    },
  });

  const curtain = new THREE.Mesh(geometry, material);
  curtain.position.y = -0.4;
  scene.add(curtain);
  const stars = (() => {
    const g = new THREE.BufferGeometry();
    const n = 260;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = -Math.random() * 8;
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: 0.03, transparent: true, opacity: 0.7 }));
  })();
  scene.add(stars);

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
    material.uniforms.uTime.value = clock.getElapsedTime() * speed;
    stars.rotation.z += 0.0004;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    geometry.dispose();
    material.dispose();
    stars.geometry.dispose();
    (stars.material as THREE.Material).dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
