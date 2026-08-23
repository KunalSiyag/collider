import * as THREE from 'three';

export interface ArcadeCabinetOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createArcadeCabinet(
  container: HTMLElement,
  options: ArcadeCabinetOptions = {},
): () => void {
  const { color = '#241b33', accentColor = '#8b5cf6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.6, 1.2, 5.0);
  camera.lookAt(0, -0.1, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.45));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(4, 7, 6);
  scene.add(keyLight);
  // Screen glow
  const screenGlow = new THREE.PointLight(new THREE.Color(accentColor), 20);
  screenGlow.position.set(0, 0.4, 0.9);
  scene.add(screenGlow);

  const cab = new THREE.Group();
  scene.add(cab);

  const bodyMat = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(color), roughness: 0.55, clearcoat: 0.35 });
  const trimMat = new THREE.MeshStandardMaterial({ color: '#10101a', roughness: 0.6 });

  // Main cabinet body (angled profile)
  const profileShape = new THREE.Shape();
  profileShape.moveTo(-0.85, -1.75);
  profileShape.lineTo(-0.85, 0.15);   // lower front
  profileShape.lineTo(0.55, 0.42);    // control deck slope
  profileShape.lineTo(0.55, 0.62);
  profileShape.lineTo(0.72, 0.72);    // screen bezel out
  profileShape.lineTo(0.72, 1.55);
  profileShape.lineTo(0.95, 1.75);    // marquee top
  profileShape.lineTo(-0.95, 1.75);
  profileShape.lineTo(-0.95, -1.75);
  profileShape.lineTo(-0.85, -1.75);
  const bodyGeo = new THREE.ExtrudeGeometry(profileShape, { depth: 1.7, bevelEnabled: false });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.rotation.y = Math.PI / 2;
  body.position.z = 0.85;
  cab.add(body);

  // Screen with animated shader-ish flicker via emissive plane
  const screenCanvasMat = new THREE.MeshBasicMaterial({ color: '#17121f' });
  const screenBezel = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.06, 0.05), trimMat);
  void screenCanvasMat;
  const screenFrame = new THREE.Mesh(new THREE.BoxGeometry(1.44, 1.02, 0.08), trimMat);
  screenFrame.position.set(0, 0.52, 0.74);
  screenFrame.rotation.x = -0.18;
  cab.add(screenFrame);
  const screenMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(accentColor),
    transparent: true,
    opacity: 0.92,
  });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.28, 0.88), screenMat);
  screen.position.set(0, 0.52, 0.785);
  screen.rotation.x = -0.18;
  cab.add(screen);
  // Scanlines
  for (let i = 0; i < 10; i++) {
    const scanline = new THREE.Mesh(
      new THREE.PlaneGeometry(1.26, 0.03),
      new THREE.MeshBasicMaterial({ color: '#17121f', transparent: true, opacity: 0.35 }),
    );
    scanline.position.set(0, -0.4 + i * 0.09, 0.002);
    screen.add(scanline);
  }

  // Control panel
  const deckPlate = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.07, 0.62), new THREE.MeshStandardMaterial({ color: '#c47b3a', roughness: 0.5 }));
  deckPlate.position.set(0, 0.28, 0.62);
  deckPlate.rotation.x = 0.55;
  cab.add(deckPlate);
  const joyBallMat = new THREE.MeshStandardMaterial({
    color: '#e63946',
    emissive: '#e63946',
    emissiveIntensity: 0.35,
    roughness: 0.25,
  });
  const stickShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.24, 10), trimMat);
  stickShaft.position.set(-0.38, 0.36, 0.56);
  cab.add(stickShaft);
  const joyBall = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 12), joyBallMat);
  joyBall.position.set(-0.38, 0.5, 0.56);
  cab.add(joyBall);
  for (let i = 0; i < 3; i++) {
    const btn = new THREE.Mesh(
      new THREE.CylinderGeometry(0.055, 0.055, 0.04, 18),
      new THREE.MeshStandardMaterial({
        color: ['#ffd9a0', '#22d3ee', '#f472b6'][i],
        emissive: ['#ffd9a0', '#22d3ee', '#f472b6'][i],
        emissiveIntensity: 0.4,
      }),
    );
    btn.position.set(0.12 + i * 0.17, 0.33 + i * 0.008, 0.66 - i * 0.035);
    btn.rotation.x = 0.55;
    cab.add(btn);
  }

  // Glowing marquee
  const marqueeMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#f472b6'),
    transparent: true,
    opacity: 0.9,
  });
  const marquee = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.34), marqueeMat);
  marquee.position.set(0, 1.58, 0.79);
  marquee.rotation.x = -0.12;
  cab.add(marquee);

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
    cab.rotation.y = Math.sin(t * 0.35 * speed) * 0.45;
    // Screen plays a shifting hue "game"
    screenMat.color.setHSL((t * 0.12 * speed) % 1, 0.75, 0.5 + Math.sin(t * 7 * speed) * 0.06);
    screenGlow.color.copy(screenMat.color);
    // Marquee pulse
    marqueeMat.opacity = 0.65 + Math.abs(Math.sin(t * 2.2 * speed)) * 0.3;
    marqueeMat.color.setHSL((t * 0.05 * speed) % 1, 0.7, 0.6);
    stickShaft.rotation.z = Math.sin(t * 4.4 * speed) * 0.25;
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
