import * as THREE from 'three';

export interface HyperspaceGateOptions {
  accentColor?: string;
}

export function createHyperspaceGate(
  container: HTMLElement,
  options: HyperspaceGateOptions = {},
): () => void {
  const { accentColor = '#22d3ee' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 200);
  camera.position.set(0, 0, 10);

  const gate = new THREE.Group();
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0x1c1830, roughness: 0.4, metalness: 0.85,
    emissive: new THREE.Color(accentColor), emissiveIntensity: 0.25,
  });
  const outerRing = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.35, 20, 90), ringMat);
  gate.add(outerRing);
  const glowRingMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(accentColor), transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const glowRing = new THREE.Mesh(new THREE.TorusGeometry(3.15, 0.06, 10, 90), glowRingMat);
  gate.add(glowRing);
  const innerGlow = new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.04, 10, 80), glowRingMat.clone());
  (innerGlow.material as THREE.MeshBasicMaterial).color = new THREE.Color('#f472b6');
  gate.add(innerGlow);

  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const pod = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.9), ringMat);
    pod.position.set(Math.cos(a) * 3.6, Math.sin(a) * 3.6, 0);
    pod.rotation.z = a;
    gate.add(pod);
  }
  gate.position.set(0, 0, -6);
  scene.add(gate);

  const STREAKS = 500;
  const streakGeo = new THREE.BufferGeometry();
  const sPos = new Float32Array(STREAKS * 2 * 3);
  const sMeta: number[] = [];
  let seed = 9001;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = 0; i < STREAKS; i++) {
    sMeta.push(rand() * Math.PI * 2, rand() * 30 + 2, rand() * 12 + 3);
  }
  streakGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
  const streaks = new THREE.LineSegments(streakGeo, new THREE.LineBasicMaterial({
    color: 0xcfeaff, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  scene.add(streaks);

  const coreLight = new THREE.PointLight(new THREE.Color(accentColor), 40, 26);
  coreLight.position.set(0, 0, -4);
  scene.add(coreLight);
  scene.add(new THREE.AmbientLight(0x242c48, 1.6));

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
    const attr = streakGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < STREAKS; i++) {
      const ang = sMeta[i * 3];
      let z = ((sMeta[i * 3 + 1] + t * sMeta[i * 3 + 2]) % 34) - 32;
      const spread = Math.abs(z) * 0.55;
      const x = Math.cos(ang) * spread;
      const y = Math.sin(ang) * spread;
      const len = 1.2 + sMeta[i * 3 + 2] * 0.18;
      attr.setXYZ(i * 2, x, y, z);
      attr.setXYZ(i * 2 + 1, x, y, z + len);
    }
    attr.needsUpdate = true;
    gate.rotation.z = t * 0.12;
    outerRing.rotation.z = t * 0.05;
    const pulse = 0.65 + Math.abs(Math.sin(t * 2)) * 0.35;
    glowRingMat.opacity = pulse;
    innerGlow.rotation.z = -t * 0.2;
    camera.position.x = Math.sin(t * 0.07) * 1.2;
    camera.lookAt(0, 0, -6);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [outerRing, glowRing, innerGlow].forEach((o) => o.geometry.dispose());
    [ringMat, glowRingMat, innerGlow.material as THREE.Material, streakGeo ? streaks.material as THREE.Material : null]
      .forEach((mt) => mt && mt.dispose());
    streakGeo.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
