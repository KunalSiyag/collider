import * as THREE from 'three';

export interface EmberStormOptions {
  count?: number;
  accentColor?: string;
}

export function createEmberStorm(container: HTMLElement, options: EmberStormOptions = {}): () => void {
  const { count = 500 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 50);
  camera.position.set(0, 0, 12);

  let seed = 66613;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  interface Ember {
    x: number;
    y: number;
    z: number;
    rise: number;
    swayPhase: number;
    life: number;
    maxLife: number;
  }
  const embers: Ember[] = [];
  for (let i = 0; i < count; i++) {
    embers.push({
      x: (rand() - 0.5) * 22,
      y: rand() * 12 - 6,
      z: (rand() - 0.5) * 8,
      rise: 0.8 + rand() * 2.2,
      swayPhase: rand() * Math.PI * 2,
      life: rand(),
      maxLife: 3 + rand() * 4,
    });
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const vertexShader = /* glsl */ `
uniform float uTime;
attribute float aLife;
attribute float aHue;
varying float vHeat;

void main() {
  vHeat = aHue;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = (2.0 + aLife * 5.0) * (9.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
`;
  const fragmentShader = /* glsl */ `
varying float vHeat;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float mask = smoothstep(0.5, 0.05, length(uv));
  vec3 cool = vec3(0.55, 0.36, 0.96);
  vec3 hot = mix(vec3(1.0, 0.45, 0.15), vec3(1.0, 0.85, 0.4), vHeat);
  gl_FragColor = vec4(mix(cool, hot, vHeat), mask);
}
`;

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 } },
  });

  const lifeArray = new Float32Array(count);
  const hueArray = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    hueArray[i] = rand();
  }
  geometry.setAttribute('aLife', new THREE.BufferAttribute(lifeArray, 1));
  geometry.setAttribute('aHue', new THREE.BufferAttribute(hueArray, 1));

  scene.add(new THREE.Points(geometry, material));

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
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.getElapsedTime();
    material.uniforms.uTime.value = t;
    const attr = geometry.getAttribute('position') as THREE.BufferAttribute;
    const lifeAttr = geometry.getAttribute('aLife') as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const ember = embers[i];
      ember.life += dt;
      if (ember.life > ember.maxLife) {
        ember.life = 0;
        ember.x = (rand() - 0.5) * 22;
        ember.y = -6;
        ember.z = (rand() - 0.5) * 8;
        ember.maxLife = 3 + rand() * 4;
      }
      ember.y += ember.rise * dt;
      attr.setXYZ(
        i,
        ember.x + Math.sin(t * 1.4 + ember.swayPhase) * ember.y * 0.06,
        ember.y,
        ember.z,
      );
      lifeAttr.setX(i, Math.sin((ember.life / ember.maxLife) * Math.PI));
    }
    attr.needsUpdate = true;
    lifeAttr.needsUpdate = true;
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
