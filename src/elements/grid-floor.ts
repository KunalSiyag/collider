import * as THREE from 'three';

export interface GridFloorOptions {
  color?: string;
  accentColor?: string;
  cellSize?: number;
  thickness?: number;
  speed?: number;
}

const vertexShader = /* glsl */ `
varying vec3 vWorldPosition;

void main() {
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPosition.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`;

const fragmentShader = /* glsl */ `
uniform float uTime;
uniform float uSpeed;
uniform float uCellSize;
uniform float uThickness;
uniform vec3 uColor;
uniform vec3 uAccentColor;
varying vec3 vWorldPosition;

float gridLine(vec2 coord, float thickness) {
  vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
  float line = min(grid.x, grid.y);
  return 1.0 - min(line * thickness, 1.0);
}

void main() {
  vec2 coord = (vWorldPosition.xz + vec2(0.0, uTime * uSpeed)) / uCellSize;
  float grid = gridLine(coord, uThickness);

  float majorGrid = gridLine(coord / 5.0, uThickness * 1.4);
  vec3 color = mix(uColor, uAccentColor, majorGrid);

  float distance = length(vWorldPosition.xz);
  float fade = 1.0 - smoothstep(4.0, 22.0, distance);

  float alpha = max(grid, majorGrid * 0.9) * fade;
  if (alpha < 0.01) discard;
  gl_FragColor = vec4(color * (0.6 + majorGrid * 0.8), alpha);
}
`;

export function createGridFloor(
  container: HTMLElement,
  options: GridFloorOptions = {},
): () => void {
  const {
    color = '#71717a',
    accentColor = '#8b5cf6',
    cellSize = 1,
    thickness = 1.2,
    speed = 2,
  } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.set(0, 2.2, 7);
  camera.lookAt(0, -1, -6);

  const geometry = new THREE.PlaneGeometry(60, 80);
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uCellSize: { value: cellSize },
      uThickness: { value: thickness },
      uColor: { value: new THREE.Color(color) },
      uAccentColor: { value: new THREE.Color(accentColor) },
    },
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.z = -20;
  scene.add(mesh);

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width === 0 || height === 0) return;
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
