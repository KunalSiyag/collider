import * as THREE from 'three';

export interface StarNurseryOptions {
  count?: number;
}

export function createStarNursery(
  container: HTMLElement,
  options: StarNurseryOptions = {},
): () => void {
  const { count = 1500 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.set(0, 2, 16);

  let seed = 465800;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const gasCanvas = document.createElement('canvas');
  gasCanvas.width = 64;
  gasCanvas.height = 64;
  const gctx = gasCanvas.getContext('2d')!;
  const gGrad = gctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gGrad.addColorStop(0, '#ffffff55');
  gGrad.addColorStop(1, '#00000000');
  gctx.fillStyle = gGrad;
  gctx.fillRect(0, 0, 64, 64);
  const gasTexture = new THREE.CanvasTexture(gasCanvas);

  const clouds = new THREE.Group();
  for (let i = 0; i < 26; i++) {
    const material = new THREE.SpriteMaterial({
      map: gasTexture,
      color: ['#8b5cf6', '#f472b6', '#22d3ee'][i % 3],
      transparent: true,
      opacity: 0.1 + rand() * 0.14,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sprite = new THREE.Sprite(material);
    sprite.position.set((rand() - 0.5) * 24, (rand() - 0.5) * 12, -rand() * 10);
    sprite.scale.setScalar(5 + rand() * 9);
    clouds.add(sprite);
  }
  scene.add(clouds);

  const protoGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (rand() - 0.5) * 26;
    positions[i * 3 + 1] = (rand() - 0.5) * 13;
    positions[i * 3 + 2] = (rand() - 0.5) * 12;
    phases[i] = rand() * Math.PI * 2;
  }
  protoGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  protoGeo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));

  const vertexShader = /* glsl */ `
uniform float uTime;
attribute float aPhase;
varying float vTwinkle;
void main() {
  vTwinkle = 0.4 + 0.6 * pow(0.5 + 0.5 * sin(uTime * 2.0 + aPhase), 3.0);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = vTwinkle * (40.0 / -mv.z) + 1.0;
  gl_Position = projectionMatrix * mv;
}
`;
  const fragmentShader = /* glsl */ `
varying float vTwinkle;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float mask = smoothstep(0.5, 0.05, length(uv));
  gl_FragColor = vec4(vec3(1.0), mask * vTwinkle);
}
`;
  const protoMat = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 } },
  });
  scene.add(new THREE.Points(protoGeo, protoMat));

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
    protoMat.uniforms.uTime.value = t;
    clouds.rotation.y = t * 0.02;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    gasTexture.dispose();
    protoGeo.dispose();
    protoMat.dispose();
    for (const child of clouds.children as THREE.Sprite[]) child.material.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
