import * as THREE from 'three';

export interface BinaryStarOptions {
  colorA?: string;
  colorB?: string;
  speed?: number;
}

interface Star {
  color: string;
  radius: number;
  size: number;
}

function makeStarMesh(star: Star): THREE.Mesh {
  const geometry = new THREE.SphereGeometry(star.size, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: star.color });
  const mesh = new THREE.Mesh(geometry, material);
  const haloGeo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: makeGlowTexture(star.color),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  haloGeo.scale.setScalar(star.size * 9);
  mesh.add(haloGeo);
  return mesh;
}

function makeGlowTexture(color: string): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.35, `${color}66`);
  gradient.addColorStop(1, '#00000000');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export function createBinaryStar(
  container: HTMLElement,
  options: BinaryStarOptions = {},
): () => void {
  const { colorA = '#8b5cf6', colorB = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(3, 2.4, 8);
  camera.lookAt(0, 0, 0);

  let seed = 90210;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const starGeo = new THREE.BufferGeometry();
  const starCount = 700;
  const positions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    positions[i * 3] = (rand() - 0.5) * 60;
    positions[i * 3 + 1] = (rand() - 0.5) * 40;
    positions[i * 3 + 2] = (rand() - 0.5) * 60;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  scene.add(
    new THREE.Points(starGeo, new THREE.PointsMaterial({ color: '#8888aa', size: 0.06 })),
  );

  const pivotA = new THREE.Group();
  const pivotB = new THREE.Group();
  const starA = makeStarMesh({ color: colorA, radius: 2.6, size: 0.55 });
  starA.position.x = -2.6;
  pivotA.add(starA);
  const starB = makeStarMesh({ color: colorB, radius: 2.6, size: 0.38 });
  starB.position.x = 3.4;
  pivotB.add(starB);
  scene.add(pivotA, pivotB);

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
    const angle = t * speed * 0.5;
    pivotA.rotation.y = angle;
    pivotB.rotation.y = angle;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    starGeo.dispose();
    for (const star of [starA, starB]) {
      star.geometry.dispose();
      (star.material as THREE.Material).dispose();
      const halo = star.children[0] as THREE.Sprite;
      halo.material.map?.dispose();
      halo.material.dispose();
    }
    renderer.dispose();
    renderer.domElement.remove();
  };
}
