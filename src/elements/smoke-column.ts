import * as THREE from 'three';

export interface SmokeColumnOptions {
  count?: number;
  accentColor?: string;
}

export function createSmokeColumn(
  container: HTMLElement,
  options: SmokeColumnOptions = {},
): () => void {
  const { count = 220, accentColor = '#a78bfa' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 50);
  camera.position.set(6, 2, 12);
  camera.lookAt(0, 3, 0);

  let seed = 80808;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const puffCanvas = document.createElement('canvas');
  puffCanvas.width = 64;
  puffCanvas.height = 64;
  const pctx = puffCanvas.getContext('2d')!;
  const gradient = pctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, '#ffffff88');
  gradient.addColorStop(0.5, '#ffffff33');
  gradient.addColorStop(1, '#00000000');
  pctx.fillStyle = gradient;
  pctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(puffCanvas);

  interface Puff {
    sprite: THREE.Sprite;
    y: number;
    x: number;
    z: number;
    rise: number;
    wobble: number;
    phase: number;
    scale: number;
  }
  const puffs: Puff[] = [];
  for (let i = 0; i < count; i++) {
    const material = new THREE.SpriteMaterial({
      map: texture,
      color: '#9aa0b8',
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const sprite = new THREE.Sprite(material);
    scene.add(sprite);
    puffs.push({
      sprite,
      x: (rand() - 0.5) * 0.8,
      y: rand() * 10 - 4,
      z: (rand() - 0.5) * 0.8,
      rise: 1 + rand() * 1.4,
      wobble: 0.4 + rand() * 0.8,
      phase: rand() * Math.PI * 2,
      scale: 0.8 + rand() * 1.6,
    });
  }

  const emberGeo = new THREE.BufferGeometry();
  const emberCount = 60;
  const emberPos = new Float32Array(emberCount * 3);
  for (let i = 0; i < emberCount; i++) {
    emberPos[i * 3] = (rand() - 0.5) * 1.4;
    emberPos[i * 3 + 1] = rand() * 11 - 4;
    emberPos[i * 3 + 2] = (rand() - 0.5) * 1.4;
  }
  emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPos, 3));
  const embers = new THREE.Points(
    emberGeo,
    new THREE.PointsMaterial({
      color: accentColor,
      size: 0.09,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  scene.add(embers);

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
    for (const puff of puffs) {
      puff.y += puff.rise * dt;
      if (puff.y > 7) {
        puff.y = -4;
        puff.x = (rand() - 0.5) * 0.8;
        puff.z = (rand() - 0.5) * 0.8;
      }
      const life = (puff.y + 4) / 11;
      puff.sprite.position.set(
        puff.x + Math.sin(t * puff.wobble + puff.phase) * life * 2.4,
        puff.y,
        puff.z + Math.cos(t * puff.wobble * 0.7 + puff.phase) * life * 1.4,
      );
      puff.sprite.scale.setScalar(puff.scale * (0.5 + life * 2.2));
      (puff.sprite.material as THREE.SpriteMaterial).opacity =
        Math.sin(life * Math.PI) * 0.28;
    }
    const attr = emberGeo.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < emberCount; i++) {
      let y = attr.getY(i) + dt * (2 + (i % 5));
      if (y > 7.5) y = -4;
      attr.setY(i, y);
      attr.setX(i, attr.getX(i) + Math.sin(t * 2 + i) * dt * 0.5);
    }
    attr.needsUpdate = true;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    texture.dispose();
    emberGeo.dispose();
    embers.material.dispose();
    for (const puff of puffs) puff.sprite.material.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
