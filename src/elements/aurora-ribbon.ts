import * as THREE from 'three';

export interface AuroraRibbonOptions {
  colors?: string[];
  speed?: number;
}

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uSpeed;
uniform float uOffset;
varying vec2 vUv;

void main() {
  vec3 pos = position;
  float t = uTime * uSpeed;
  pos.z += sin(pos.x * 0.5 + t + uOffset) * 1.4;
  pos.z += cos(pos.x * 0.23 - t * 0.6 + uOffset * 2.0) * 1.1;
  pos.y += sin(pos.x * 0.35 + t * 0.8 + uOffset) * 0.6;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uTime;
varying vec2 vUv;

void main() {
  float edge = smoothstep(0.0, 0.35, vUv.y) * smoothstep(1.0, 0.55, vUv.y);
  float streaks = 0.65 + 0.35 * sin(vUv.x * 40.0 + uTime * 2.0);
  vec3 col = mix(uColorA, uColorB, vUv.x + 0.25 * sin(uTime * 0.4 + vUv.x * 3.0));
  gl_FragColor = vec4(col, edge * (0.12 + streaks * 0.28));
}
`;

export function createAuroraRibbon(
  container: HTMLElement,
  options: AuroraRibbonOptions = {},
): () => void {
  const { colors = ['#22d3ee', '#a78bfa'], speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  let seed = 77123;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const materials: THREE.ShaderMaterial[] = [];
  const group = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const geometry = new THREE.PlaneGeometry(26, 5 + rand() * 3, 140, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: speed * (0.6 + rand() * 0.8) },
        uOffset: { value: rand() * Math.PI * 2 },
        uColorA: { value: new THREE.Color(colors[i % colors.length]) },
        uColorB: { value: new THREE.Color(colors[(i + 1) % colors.length]) },
      },
    });
    materials.push(material);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set((rand() - 0.5) * 8, (rand() - 0.5) * 5 - 1, (rand() - 0.5) * 6);
    mesh.rotation.z = (rand() - 0.5) * 0.5;
    group.add(mesh);
  }
  scene.add(group);

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
    group.rotation.y = Math.sin(t * 0.08) * 0.25;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    for (const mesh of group.children as THREE.Mesh[]) mesh.geometry.dispose();
    for (const m of materials) m.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
