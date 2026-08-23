import * as THREE from 'three';

export interface StarfallCliffOptions {
  accentColor?: string;
}

export function createStarfallCliff(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#a78bfa' } = options;
  let seed = 80808;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b0b12, 0.03);
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 120);
  camera.position.set(8, 5, 13);
  camera.lookAt(0, 2, -2);

  const cliffMat = new THREE.MeshStandardMaterial({ color: 0x191426, roughness: 1, flatShading: true });
  const plateau = new THREE.Mesh(new THREE.BoxGeometry(14, 6, 10), cliffMat);
  plateau.position.set(-3, 3, -4);
  scene.add(plateau);
  for (let i = 0; i < 6; i++) {
    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.7 + rand()), cliffMat);
    rock.position.set(-8 + rand() * 9, 6.4 + rand() * 0.5, -8 + rand() * 8);
    rock.rotation.set(rand() * 3, rand() * 3, rand() * 3);
    scene.add(rock);
  }

  const pool = new THREE.Mesh(
    new THREE.CircleGeometry(4.4, 40),
    new THREE.MeshStandardMaterial({ color: 0x141126, roughness: 0.1, metalness: 0.6 }),
  );
  pool.rotation.x = -Math.PI / 2;
  pool.position.set(-1.5, 0.06, 2.5);
  scene.add(pool);

  const FN = 800;
  const fallGeo = new THREE.BufferGeometry();
  const fpos = new Float32Array(FN * 3);
  const fmeta: number[] = [];
  for (let i = 0; i < FN; i++) {
    fmeta.push(rand() * Math.PI * 2, rand(), 0.04 + rand() * 0.05);
    fpos[i * 3] = -1.5;
    fpos[i * 3 + 1] = rand();
    fpos[i * 3 + 2] = -1.5 + rand() * 2;
  }
  fallGeo.setAttribute('position', new THREE.BufferAttribute(fpos, 3));
  const falls = new THREE.Points(fallGeo, new THREE.PointsMaterial({
    color: new THREE.Color(accentColor), size: 0.11, transparent: true, opacity: 0.85,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  scene.add(falls);

  const glowGeo = new THREE.CircleGeometry(2.6, 40);
  const glowPool = new THREE.Mesh(glowGeo, new THREE.MeshBasicMaterial({
    color: new THREE.Color(accentColor), transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  glowPool.rotation.x = -Math.PI / 2;
  glowPool.position.set(-1.5, 0.1, 2.5);
  scene.add(glowPool);

  const starGeo = new THREE.BufferGeometry();
  const SN = 500;
  const sp = new Float32Array(SN * 3);
  for (let i = 0; i < SN; i++) {
    sp[i * 3] = (Math.random() - 0.5) * 90;
    sp[i * 3 + 1] = Math.random() * 40 + 8;
    sp[i * 3 + 2] = -20 - Math.random() * 50;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  const skyStars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xdde4ff, size: 0.13, transparent: true, opacity: 0.8 }));
  scene.add(skyStars);

  const poolLight = new THREE.PointLight(new THREE.Color(accentColor), 26, 16);
  poolLight.position.set(-1.5, 1.5, 2.5);
  scene.add(poolLight);
  scene.add(new THREE.AmbientLight(0x201c34, 1.7));
  const moonL = new THREE.DirectionalLight(0xcfd8ff, 0.9);
  moonL.position.set(-6, 12, 4);
  scene.add(moonL);

  function resize() {
    const w = container.clientWidth, h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
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
    const attr = fallGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < FN; i++) {
      let y = attr.getY(i) - fmeta[i * 3 + 2];
      if (y <= 6.05 && attr.getY(i) > 6.05) {
        y = 6.02;
      } else if (y < 0.1) {
        const a = fmeta[i * 3];
        y = 6.4 + rand() * 0.3;
        attr.setX(i, 1.2 + Math.cos(a) * rand());
        attr.setZ(i, 0 + Math.sin(a) * rand() + 1);
      }
      attr.setY(i, y);
      if (y < 6) {
        attr.setX(i, 1.35 + Math.sin(t * 2 + fmeta[i]) * 0.15);
        attr.setZ(i, Math.sin(y * 0.25 + t) * 0.4 + 0.6);
      }
    }
    attr.needsUpdate = true;
    glowPool.material.opacity = 0.18 + Math.abs(Math.sin(t * 2.4)) * 0.1;
    poolLight.intensity = 22 + Math.abs(Math.sin(t * 2.4)) * 10;
    camera.position.x = 8 + Math.sin(t * 0.07) * 1.6;
    camera.lookAt(-0.5, 3, 0);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [fallGeo, starGeo, glowGeo].forEach((g) => g.dispose());
    [cliffMat, pool.material as THREE.Material].forEach((mt) => mt.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
