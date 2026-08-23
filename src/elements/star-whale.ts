import * as THREE from 'three';

export interface StarWhaleOptions {
  color?: string;
  accentColor?: string;
}

export function createStarWhale(
  container: HTMLElement,
  options: StarWhaleOptions = {},
): () => void {
  const { color = '#a78bfa', accentColor = '#22d3ee' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b0b10, 0.02);
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
  camera.position.set(0, 0.6, 11);

  const whale = new THREE.Group();
  const skin = new THREE.MeshStandardMaterial({ color: 0x141225, roughness: 0.55, emissive: new THREE.Color(color), emissiveIntensity: 0.12 });
  const body = new THREE.Mesh(new THREE.SphereGeometry(1.5, 32, 24), skin);
  body.scale.set(2.6, 1, 1.05);
  whale.add(body);
  const tailMat = skin.clone();
  const flukeL = new THREE.Mesh(new THREE.SphereGeometry(0.9, 16, 12), tailMat);
  flukeL.scale.set(1.4, 0.12, 0.55);
  flukeL.position.set(-3.7, 0.2, 0);
  whale.add(flukeL);
  const finGeo = new THREE.SphereGeometry(0.7, 12, 10);
  const finL = new THREE.Mesh(finGeo, tailMat);
  finL.scale.set(1.1, 0.08, 0.45);
  finL.position.set(-0.6, -0.7, 1.1);
  finL.rotation.x = 0.5;
  whale.add(finL);
  const finR = finL.clone();
  finR.position.z = -1.1;
  finR.rotation.x = -0.5;
  whale.add(finR);
  const glowMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor), blending: THREE.AdditiveBlending, transparent: true, opacity: 0.9 });
  for (let i = 0; i < 6; i++) {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), glowMat);
    dot.position.set(-0.5 - i * 0.55, 0.55 + Math.sin(i) * 0.25, i % 2 ? 1 : -1);
    dot.position.multiplyScalar(0.98);
    whale.add(dot);
  }
  scene.add(whale);

  const starCount = 1400;
  const sp = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    sp[i * 3] = (Math.random() - 0.5) * 90;
    sp[i * 3 + 1] = (Math.random() - 0.5) * 50;
    sp[i * 3 + 2] = (Math.random() - 0.5) * 90;
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xcfd8ff, size: 0.12, transparent: true, opacity: 0.85 }));
  scene.add(stars);

  const nebula = new THREE.Mesh(
    new THREE.SphereGeometry(40, 24, 16),
    new THREE.MeshBasicMaterial({ color: new THREE.Color('#2a1e4d'), side: THREE.BackSide, transparent: true, opacity: 0.35, depthWrite: false }),
  );
  scene.add(nebula);

  scene.add(new THREE.AmbientLight(0x33334d, 1.5));
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 40, 30);
  scene.add(rim);
  const fill = new THREE.PointLight(new THREE.Color(color), 25, 30);
  fill.position.set(-6, 4, 4);
  scene.add(fill);

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
    const speed = 0.22;
    const x = ((t * speed + 8) % 24) - 12;
    whale.position.set(x, Math.sin(t * 0.6) * 0.8, Math.cos(t * 0.35) * 1.4);
    whale.rotation.y = Math.PI / 2 - Math.cos(t * 0.6) * 0.18;
    whale.rotation.z = Math.cos(t * 0.6) * 0.12;
    flukeL.rotation.y = Math.sin(t * 2.2) * 0.35;
    rim.position.copy(whale.position).add(new THREE.Vector3(3, 3, 3));
    stars.rotation.y = t * 0.008;
    camera.lookAt(whale.position);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh || o instanceof THREE.Points) {
        o.geometry.dispose();
        (o.material as THREE.Material).dispose();
      }
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
