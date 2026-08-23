import * as THREE from 'three';

export interface JoystickArcadeOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createJoystickArcade(
  container: HTMLElement,
  options: JoystickArcadeOptions = {},
): () => void {
  const { color = '#241b33', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.0, 2.4, 4.6);
  camera.lookAt(0, -0.3, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.3);
  keyLight.position.set(4, 7, 5);
  scene.add(keyLight);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const panelGroup = new THREE.Group();
  panelGroup.rotation.x = -0.35;
  scene.add(panelGroup);

  // Control panel deck
  const deckMat = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(color), roughness: 0.5, clearcoat: 0.45 });
  const deck = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.28, 2.4), deckMat);
  panelGroup.add(deck);

  // Joystick assembly
  const stickBase = new THREE.Group();
  stickBase.position.set(-1.05, 0.14, 0);
  panelGroup.add(stickBase);
  const dustRingMat = new THREE.MeshStandardMaterial({ color: '#10101a', roughness: 0.6 });
  const dustRing = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.38, 0.08, 28), dustRingMat);
  stickBase.add(dustRing);

  const stickPivot = new THREE.Group();
  stickPivot.position.y = 0.06;
  stickBase.add(stickPivot);
  const shaftMat = new THREE.MeshStandardMaterial({ color: '#c9c4d8', metalness: 0.9, roughness: 0.2 });
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 0.85, 12), shaftMat);
  shaft.position.y = 0.42;
  stickPivot.add(shaft);
  const ballTop = new THREE.Mesh(
    new THREE.SphereGeometry(0.16, 20, 16),
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(accentColor),
      emissive: new THREE.Color(accentColor),
      emissiveIntensity: 0.25,
      roughness: 0.25,
    }),
  );
  ballTop.position.y = 0.88;
  stickPivot.add(ballTop);

  // Buttons in an arc
  interface Button { cap: THREE.Mesh; mat: THREE.MeshStandardMaterial; phase: number }
  const buttons: Button[] = [];
  const btnPalette = [accentColor, '#22d3ee', '#a78bfa', '#ffd9a0', '#e63946', '#e9e4f5'];
  for (let i = 0; i < 6; i++) {
    const a = Math.PI * (0.15 + (i / 5) * 0.7);
    const x = 0.55 + Math.cos(a + Math.PI) * 1.05;
    const z = -Math.sin(a) * 0.55;
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(btnPalette[i % btnPalette.length]),
      emissive: new THREE.Color(btnPalette[i % btnPalette.length]),
      emissiveIntensity: 0.3,
      roughness: 0.3,
    });
    const well = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.21, 0.07, 24), dustRingMat);
    well.position.set(x, 0.13, z);
    panelGroup.add(well);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.15, 20, 14, 0, Math.PI * 2, 0, Math.PI / 2), mat);
    cap.position.set(x, 0.15, z);
    panelGroup.add(cap);
    buttons.push({ cap, mat, phase: i * 0.9 });
  }

  // Coin door hint on the front edge
  const coinDoor = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.18, 0.03), new THREE.MeshStandardMaterial({ color: '#d4af6a', metalness: 0.9, roughness: 0.25 }));
  coinDoor.position.set(0, -0.02, -1.22);
  coinDoor.rotation.x = 0.35;
  panelGroup.add(coinDoor);

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
    panelGroup.rotation.y = Math.sin(t * 0.35 * speed) * 0.4;
    panelGroup.position.y = Math.sin(t * 0.9 * speed) * 0.04 - 0.4;
    // Stick waggles between directions
    const wagX = Math.sin(t * 2.1 * speed) * 0.32;
    const wagZ = Math.sin(t * 1.5 * speed + 1.2) * 0.32;
    stickPivot.rotation.z = wagX;
    stickPivot.rotation.x = wagZ;
    ballTop.material.emissiveIntensity =
      0.2 + Math.pow(Math.abs(Math.sin(t * 4.2 * speed)), 6) * 1.1;
    // Buttons mash rhythmically
    for (const b of buttons) {
      const press = Math.pow(Math.max(0, Math.sin(t * 5.5 * speed + b.phase)), 10);
      b.cap.position.y = 0.15 - press * 0.06;
      b.mat.emissiveIntensity = 0.25 + press * 1.3;
    }
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
