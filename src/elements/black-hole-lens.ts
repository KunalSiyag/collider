import * as THREE from 'three';

export interface BlackHoleLensOptions {
  diskColorA?: string;
  diskColorB?: string;
  speed?: number;
}

const diskVertexShader = /* glsl */ `
varying vec2 vPos;
void main() {
  vPos = position.xy;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const diskFragmentShader = /* glsl */ `
uniform float uTime;
uniform float uSpeed;
uniform vec3 uColorA;
uniform vec3 uColorB;
varying vec2 vPos;

void main() {
  float r = length(vPos);
  float angle = atan(vPos.y, vPos.x);
  float rn = smoothstep(1.15, 3.4, r);
  float swirl = sin(angle * 4.0 + r * 7.0 - uTime * uSpeed * 2.4) * 0.5 + 0.5;
  float fade = (1.0 - rn) * smoothstep(1.05, 1.35, r);
  vec3 col = mix(uColorA, uColorB, rn);
  col *= 0.5 + swirl * 0.9 + (1.0 - rn) * 0.8;
  gl_FragColor = vec4(col, fade * (0.35 + swirl * 0.55));
}
`;

export function createBlackHoleLens(
  container: HTMLElement,
  options: BlackHoleLensOptions = {},
): () => void {
  const { diskColorA = '#ffb86c', diskColorB = '#8b5cf6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 1.6, 8.5);
  camera.lookAt(0, 0, 0);

  const diskGeo = new THREE.RingGeometry(1.15, 3.4, 160, 1);
  const diskMat = new THREE.ShaderMaterial({
    vertexShader: diskVertexShader,
    fragmentShader: diskFragmentShader,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uColorA: { value: new THREE.Color(diskColorA) },
      uColorB: { value: new THREE.Color(diskColorB) },
    },
  });
  const disk = new THREE.Mesh(diskGeo, diskMat);
  disk.rotation.x = Math.PI / 2 - 0.35;
  scene.add(disk);

  const hole = new THREE.Mesh(
    new THREE.SphereGeometry(1.02, 48, 48),
    new THREE.MeshBasicMaterial({ color: '#000000' }),
  );
  scene.add(hole);

  const photonRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.12, 0.035, 12, 96),
    new THREE.MeshBasicMaterial({ color: '#ffd9a0', transparent: true, opacity: 0.9 }),
  );
  photonRing.rotation.x = Math.PI / 2 - 0.35;
  scene.add(photonRing);

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
    diskMat.uniforms.uTime.value = t;
    hole.rotation.y = t * speed * 0.4;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    diskGeo.dispose();
    diskMat.dispose();
    hole.geometry.dispose();
    hole.material.dispose();
    photonRing.geometry.dispose();
    photonRing.material.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
