import * as THREE from 'three';

export interface EclipseRingOptions {
  coronaColor?: string;
  speed?: number;
}

export function createEclipseRing(
  container: HTMLElement,
  options: EclipseRingOptions = {},
): () => void {
  const { coronaColor = '#a78bfa', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0, 10);

  let seed = 299792;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const starCount = 900;
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    starPos[i * 3] = (rand() - 0.5) * 40;
    starPos[i * 3 + 1] = (rand() - 0.5) * 26;
    starPos[i * 3 + 2] = -rand() * 24;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: '#9999bb', size: 0.05 })));

  const coronaCanvas = document.createElement('canvas');
  coronaCanvas.width = 256;
  coronaCanvas.height = 256;
  const cctx = coronaCanvas.getContext('2d')!;
  const gradient = cctx.createRadialGradient(128, 128, 44, 128, 128, 128);
  gradient.addColorStop(0, `${coronaColor}cc`);
  gradient.addColorStop(0.4, `${coronaColor}33`);
  gradient.addColorStop(1, '#00000000');
  cctx.fillStyle = gradient;
  cctx.fillRect(0, 0, 256, 256);
  const coronaTexture = new THREE.CanvasTexture(coronaCanvas);
  const corona = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: coronaTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  corona.scale.setScalar(7.5);
  scene.add(corona);

  const moon = new THREE.Mesh(
    new THREE.CircleGeometry(1.9, 64),
    new THREE.MeshBasicMaterial({ color: '#000000' }),
  );
  moon.position.z = 0.5;
  scene.add(moon);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.95, 0.05, 12, 120),
    new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.9 }),
  );
  scene.add(ring);

  const streamers: { sprite: THREE.Sprite; angle: number; len: number; phase: number }[] = [];
  for (let i = 0; i < 14; i++) {
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: coronaTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    sprite.scale.setScalar(0.6);
    scene.add(sprite);
    streamers.push({ sprite, angle: rand() * Math.PI * 2, len: 2.4 + rand() * 1.6, phase: rand() * Math.PI * 2 });
  }

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
    const t = clock.getElapsedTime() * speed;
    corona.scale.setScalar(7.2 + Math.sin(t * 0.8) * 0.4);
    (corona.material as THREE.SpriteMaterial).opacity = 0.75 + Math.sin(t * 1.3) * 0.15;
    for (const s of streamers) {
      s.angle += 0.0012;
      const flicker = 0.5 + 0.5 * Math.sin(t * 2 + s.phase);
      s.sprite.position.set(Math.cos(s.angle) * s.len * 1.4, Math.sin(s.angle) * s.len, 0.2);
      s.sprite.scale.setScalar(0.4 + flicker * 0.7);
      (s.sprite.material as THREE.SpriteMaterial).opacity = flicker * 0.55;
    }
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    starGeo.dispose();
    coronaTexture.dispose();
    moon.geometry.dispose();
    moon.material.dispose();
    ring.geometry.dispose();
    ring.material.dispose();
    for (const s of streamers) s.sprite.material.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
