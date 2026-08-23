import * as THREE from 'three';

export interface MicroscopeOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createMicroscope(
  container: HTMLElement,
  options: MicroscopeOptions = {},
): () => void {
  const { color = '#241b33', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(3.0, 1.8, 4.4);
  camera.lookAt(0, 0.5, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(4, 6, 5);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const micro = new THREE.Group();
  scene.add(micro);

  const bodyMat = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(color), metalness: 0.45, roughness: 0.35, clearcoat: 0.5 });
  const chromeMat = new THREE.MeshStandardMaterial({ color: '#c9c4d8', metalness: 0.95, roughness: 0.15 });

  // Base with a curved pillar
  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.2, 0.18, 36), bodyMat);
  base.position.y = -1.05;
  micro.add(base);
  const pillarCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.55, -0.95, 0),
    new THREE.Vector3(-0.72, -0.2, 0),
    new THREE.Vector3(-0.62, 0.6, 0),
    new THREE.Vector3(-0.38, 1.05, 0),
  ]);
  const pillar = new THREE.Mesh(new THREE.TubeGeometry(pillarCurve, 24, 0.11, 14), bodyMat);
  micro.add(pillar);

  // Arm and head
  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.22, 0.26), bodyMat);
  arm.position.set(0.05, 1.12, 0);
  micro.add(arm);

  // Rotating nosepiece with three objectives
  const turret = new THREE.Group();
  turret.position.set(0.32, 0.88, 0);
  micro.add(turret);
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.1, 20), chromeMat);
  turret.add(disc);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    const obj = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.05, 0.42, 14), chromeMat);
    obj.position.set(Math.cos(a) * 0.19, -0.26, Math.sin(a) * 0.19);
    turret.add(obj);
  }
  // Active lens glow
  const lensGlowMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor), transparent: true, opacity: 0.85 });
  const lensGlow = new THREE.Mesh(new THREE.CircleGeometry(0.05, 16), lensGlowMat);
  lensGlow.rotation.x = Math.PI / 2;
  lensGlow.position.set(0.32, 0.66, 0);
  micro.add(lensGlow);

  // Stage with slide
  const stage = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.06, 0.7), bodyMat);
  stage.position.set(0.28, 0.28, 0);
  micro.add(stage);
  const slideMat = new THREE.MeshPhysicalMaterial({
    color: '#bfe8ff',
    transmission: 0.7,
    roughness: 0.05,
    transparent: true,
    opacity: 0.8,
  });
  const slide = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.02, 0.26), slideMat);
  slide.position.set(0.34, 0.33, 0);
  micro.add(slide);

  // Specimen dots on the slide
  const specimenMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#f472b6') });
  for (let i = 0; i < 5; i++) {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), specimenMat);
    dot.position.set(0.15 + i * 0.09, 0.35, (i % 2 ? 0.05 : -0.04));
    micro.add(dot);
  }

  // Illuminator mirror under the stage
  const mirror = new THREE.Mesh(new THREE.CircleGeometry(0.13, 20), new THREE.MeshStandardMaterial({ color: '#e9e4f5', metalness: 1, roughness: 0.05 }));
  mirror.rotation.x = Math.PI / 2;
  mirror.position.set(0.32, 0.05, 0);
  micro.add(mirror);

  // Focus knob
  const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.1, 20), chromeMat);
  knob.rotation.z = Math.PI / 2;
  knob.position.set(-0.5, 0.75, 0.12);
  micro.add(knob);

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
    micro.rotation.y = t * 0.45 * speed;
    turret.rotation.y = t * 0.6 * speed;
    micro.position.y = Math.sin(t * 1.0 * speed) * 0.04;
    lensGlowMat.opacity = 0.5 + Math.abs(Math.sin(t * 3.2 * speed)) * 0.4;
    knob.rotation.x = t * 0.8 * speed;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((m) => m.dispose());
      }
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
