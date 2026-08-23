import * as THREE from 'three';

export interface SerpentOfStarsOptions {
  accentColor?: string;
}

export function createSerpentOfStars(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#a78bfa' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b0b14, 0.026);
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 120);
  camera.position.set(0, 4, 16);
  camera.lookAt(0, 1.5, -4);

  const SEGMENTS = 70;
  const serpentMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(accentColor), transparent: true, opacity: 0.85,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const headMat = new THREE.MeshBasicMaterial({ color: 0xe9deff });

  const segGeoCache = Array.from({ length: 5 }, (_, i) => new THREE.SphereGeometry(1 - i * 0.12, 14, 10));
  const segments: { mesh: THREE.Mesh; u: number }[] = [];
  for (let i = 0; i < SEGMENTS; i++) {
    const geoIdx = Math.min(4, Math.floor(i / (SEGMENTS / 5)));
    const mesh = new THREE.Mesh(segGeoCache[geoIdx], i === 0 ? headMat : serpentMat);
    const s = 0.42 * (1 + Math.sin((i / SEGMENTS) * Math.PI) * 0.8);
    mesh.scale.setScalar(s);
    scene.add(mesh);
    segments.push({ mesh, u: i / SEGMENTS });
  }

  function serpentPos(u: number, t: number): THREE.Vector3 {
    return new THREE.Vector3(
      Math.sin(u * Math.PI * 3 + t * 0.6) * 6,
      1.6 + Math.sin(u * Math.PI * 5 + t * 1.1) * 1.8,
      -Math.abs(u - 0.5) * 24 + 4,
    );
  }

  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
  for (const sx of [-0.18, 0.18]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), eyeMat);
    eye.position.set(sx, 0.12, 0.32);
    segments[0].mesh.add(eye);
  }

  const trailN = 500;
  const trailGeo = new THREE.BufferGeometry();
  const tpos = new Float32Array(trailN * 3);
  for (let i = 0; i < trailN; i++) tpos[i * 3 + 1] = Math.random() * 20 - 4;
  trailGeo.setAttribute('position', new THREE.BufferAttribute(tpos, 3));
  const trail = new THREE.Points(trailGeo, new THREE.PointsMaterial({
    color: 0xcabbf5, size: 0.08, transparent: true, opacity: 0.55,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  scene.add(trail);

  const starGeo = new THREE.BufferGeometry();
  const SN = 600;
  const sp = new Float32Array(SN * 3);
  for (let i = 0; i < SN; i++) {
    sp[i * 3] = (Math.random() - 0.5) * 80;
    sp[i * 3 + 1] = (Math.random() - 0.5) * 40;
    sp[i * 3 + 2] = (Math.random() - 0.5) * 60;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xdde4ff, size: 0.13, transparent: true, opacity: 0.7 }));
  scene.add(stars);

  scene.add(new THREE.AmbientLight(0xffffff, 0.001));

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
    const t = clock.getElapsedTime() * 0.35;
    let prev = segments[0].mesh.position.clone();
    for (let i = 0; i < SEGMENTS; i++) {
      const p = serpentPos(segments[i].u, t);
      if (i > 0) p.lerp(prev, 0.35);
      segments[i].mesh.position.copy(p);
      prev = p.clone();
      if (i === 0) {
        const ahead = serpentPos(-0.03, t);
        segments[0].mesh.lookAt(ahead);
      }
    }
    const ta = trailGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < trailN; i++) {
      ta.setX(i, ta.getX(i) + 0.01);
      if (ta.getX(i) > 30) ta.setX(i, -30);
      ta.setY(i, ta.getY(i) + Math.sin(t * 3 + i) * 0.004);
    }
    ta.needsUpdate = true;
    stars.rotation.y = t * 0.02;
    camera.position.x = Math.sin(clock.getElapsedTime() * 0.06) * 2;
    camera.lookAt(0, 1.5, -4);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [trailGeo, starGeo].forEach((g) => g.dispose());
    [serpentMat, headMat, eyeMat].forEach((mt) => mt.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
