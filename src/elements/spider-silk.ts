import * as THREE from 'three';

export interface SpiderSilkOptions {
  count?: number;
  accentColor?: string;
}

export function createSpiderSilk(container: HTMLElement, options: SpiderSilkOptions = {}): () => void {
  const { count = 7, accentColor = '#a78bfa' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 60);
  camera.position.set(0, 0, 12);

  let seed = 8888;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Web {
    group: THREE.Group;
    phase: number;
    center: THREE.Vector2;
    rings: number;
    spokes: number;
  }
  const webs: Web[] = [];
  for (let w = 0; w < count; w++) {
    const group = new THREE.Group();
    const spokes = 8 + Math.floor(rand() * 5);
    const rings = 6 + Math.floor(rand() * 4);
    const radius = 2.2 + rand() * 1.8;
    const lineMat = new THREE.LineBasicMaterial({
      color: '#c4b5fd',
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    for (let s = 0; s < spokes; s++) {
      const angle = (s / spokes) * Math.PI * 2;
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0),
      ]);
      group.add(new THREE.Line(geo, lineMat.clone()));
    }
    for (let r = 1; r <= rings; r++) {
      const points: THREE.Vector3[] = [];
      const rr = (r / rings) * radius;
      for (let s = 0; s <= spokes; s++) {
        const angle = (s / spokes) * Math.PI * 2;
        const sag = r === rings ? 0 : 0.05 + rand() * 0.08;
        points.push(
          new THREE.Vector3(Math.cos(angle) * rr, Math.sin(angle) * rr - sag, sag * 2),
        );
      }
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      group.add(new THREE.Line(geo, lineMat.clone()));
    }
    group.position.set((rand() - 0.5) * 16, (rand() - 0.5) * 9, (rand() - 0.5) * 6);
    scene.add(group);
    webs.push({
      group,
      phase: rand() * Math.PI * 2,
      center: new THREE.Vector2(group.position.x, group.position.y),
      rings,
      spokes,
    });
  }

  const dewGeo = new THREE.BufferGeometry();
  const dewCount = 120;
  const dewPos = new Float32Array(dewCount * 3);
  for (let i = 0; i < dewCount; i++) {
    dewPos[i * 3] = (rand() - 0.5) * 18;
    dewPos[i * 3 + 1] = (rand() - 0.5) * 10;
    dewPos[i * 3 + 2] = (rand() - 0.5) * 7;
  }
  dewGeo.setAttribute('position', new THREE.BufferAttribute(dewPos, 3));
  const dew = new THREE.Points(
    dewGeo,
    new THREE.PointsMaterial({
      color: accentColor,
      size: 0.07,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    }),
  );
  scene.add(dew);

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
    for (const web of webs) {
      web.group.rotation.z = Math.sin(t * 0.25 + web.phase) * 0.12;
      web.group.position.x = web.center.x + Math.sin(t * 0.4 + web.phase) * 0.35;
      web.group.position.y = web.center.y + Math.cos(t * 0.3 + web.phase) * 0.25;
    }
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    dewGeo.dispose();
    dew.material.dispose();
    for (const web of webs) {
      for (const child of web.group.children as THREE.Line[]) {
        child.geometry.dispose();
        (child.material as THREE.Material).dispose();
      }
    }
    renderer.dispose();
    renderer.domElement.remove();
  };
}
