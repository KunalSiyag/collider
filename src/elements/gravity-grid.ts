import * as THREE from 'three';

export interface GravityGridOptions {
  accentColor?: string;
}

const vertexShader = /* glsl */ `
uniform float uTime;
uniform vec2 uWell;
varying vec2 vUv;
varying float vDip;

void main() {
  vUv = uv;
  vec3 pos = position;
  float d = length(pos.xy - uWell);
  float dip = -3.2 * exp(-d * d * 0.08);
  pos.z += dip + sin(uTime + pos.x * 0.5) * 0.04;
  vDip = dip;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = /* glsl */ `
uniform vec3 uColor;
uniform vec3 uAccentColor;
varying vec2 vUv;
varying float vDip;

float gridLine(vec2 coord, float thickness) {
  vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
  float line = min(grid.x, grid.y);
  return 1.0 - min(line * thickness, 1.0);
}

void main() {
  float grid = gridLine(vUv * 24.0, 1.1);
  float stress = smoothstep(-2.6, 0.0, vDip);
  vec3 col = mix(uColor, uAccentColor, stress * (0.5 + grid * 0.5));
  float alpha = max(grid, stress * 0.35);
  if (alpha < 0.02) discard;
  gl_FragColor = vec4(col, alpha * 0.9);
}
`;

export function createGravityGrid(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#8b5cf6' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 60);
  camera.position.set(5, 5, 11);
  camera.lookAt(0, -1, 0);

  const geometry = new THREE.PlaneGeometry(20, 20, 120, 120);
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      uWell: { value: new THREE.Vector2(0, 0) },
      uColor: { value: new THREE.Color('#4c4a72') },
      uAccentColor: { value: new THREE.Color(accentColor) },
    },
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2.4;
  scene.add(mesh);

  const orbGeo = new THREE.SphereGeometry(0.45, 32, 32);
  const orbMat = new THREE.MeshBasicMaterial({ color: '#e9d5ff' });
  const orb = new THREE.Mesh(orbGeo, orbMat);
  scene.add(orb);

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
    material.uniforms.uTime.value = t;
    const well = material.uniforms.uWell.value as THREE.Vector2;
    well.set(Math.cos(t * 0.4) * 4, Math.sin(t * 0.55) * 3.4);
    orb.position.set(well.x, 0.8 + Math.sin(t * 2.1) * 0.12, -well.y * 0.82 + 1);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    geometry.dispose();
    material.dispose();
    orbGeo.dispose();
    orbMat.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
