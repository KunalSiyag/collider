import * as THREE from 'three';

export interface SlotMachineOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createSlotMachine(
  container: HTMLElement,
  options: SlotMachineOptions = {},
): () => void {
  const { color = '#e63946', accentColor = '#ffd9a0', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.5, 0.4, 5.2);
  camera.lookAt(0, -0.1, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.3);
  keyLight.position.set(4, 7, 6);
  scene.add(keyLight);
  const marqueeGlow = new THREE.PointLight(new THREE.Color(accentColor), 22);
  marqueeGlow.position.set(0, 1.3, 0.8);
  scene.add(marqueeGlow);

  const slotGroup = new THREE.Group();
  scene.add(slotGroup);

  const cabinetMat = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(color), roughness: 0.35, clearcoat: 0.65 });
  const trimMat = new THREE.MeshStandardMaterial({ color: '#d4af6a', metalness: 0.95, roughness: 0.18 });

  // Body
  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(-0.95, -1.45);
  bodyShape.lineTo(-0.85, -1.35);
  bodyShape.lineTo(-0.85, -0.15);
  bodyShape.lineTo(-0.75, 0);
  bodyShape.lineTo(0.75, 0);
  bodyShape.lineTo(0.85, -0.15);
  bodyShape.lineTo(0.85, -1.35);
  bodyShape.lineTo(0.95, -1.45);
  bodyShape.lineTo(0.95, -1.6);
  bodyShape.lineTo(-0.95, -1.6);
  bodyShape.lineTo(-0.95, -1.45);
  const body = new THREE.Mesh(new THREE.ExtrudeGeometry(bodyShape, { depth: 1.25, bevelEnabled: false }), cabinetMat);
  body.rotation.y = Math.PI / 2;
  body.position.z = 0.62;
  slotGroup.add(body);

  // Top light box
  const topBox = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.5, 0.9), cabinetMat);
  topBox.position.y = 0.32;
  slotGroup.add(topBox);
  const bulbMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor) });
  interface Bulb { mesh: THREE.Mesh; phase: number }
  const bulbs: Bulb[] = [];
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const bulbMesh = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), bulbMat.clone());
    bulbMesh.position.set(Math.cos(a) * 0.82, 0.32 + Math.sin(Math.abs(Math.cos(a))) * 0, Math.sin(Math.cos(a)) * 0 + 0.47 * Math.sign(1));
    bulbMesh.position.set(Math.cos(a) * 0.82, 0.32, Math.sin(a) > 0 ? 0.47 : 0.47);
    bulbMesh.position.set(Math.cos(a) * 0.82, 0.32, 0.47);
    slotGroup.add(bulbMesh);
    bulbs.push({ mesh: bulbMesh, phase: i });
  }

  // Reel window with three spinning reels
  const windowFrameMat = new THREE.MeshStandardMaterial({ color: '#10101a', roughness: 0.4 });
  const reelWindowFrame = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.92, 0.06), windowFrameMat);
  reelWindowFrame.position.set(0, -0.52, 0.63);
  slotGroup.add(reelWindowFrame);
  const symbolPalette = ['#e9e4f5', '#22d3ee', '#f472b6', '#ffd9a0', '#a78bfa'];
  interface Reel { drum: THREE.Group; symbols: THREE.Mesh[]; rate: number }
  const reels: Reel[] = [];
  for (let r = 0; r < 3; r++) {
    const drum = new THREE.Group();
    drum.position.set((r - 1) * 0.5, -0.52, 0.66);
    slotGroup.add(drum);
    const symbols: THREE.Mesh[] = [];
    for (let s = 0; s < 6; s++) {
      const symMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(symbolPalette[(s + r) % 5]) });
      const sym = new THREE.Mesh(new THREE.CircleGeometry(0.11, 16), symMat);
      const a = (s / 6) * Math.PI * 2;
      sym.position.set(0, Math.sin(a) * 0.21, Math.cos(a) * 0.21);
      sym.lookAt(sym.position.clone().multiplyScalar(3).add(new THREE.Vector3(0, -0.52, 0.66)));
      drum.add(sym);
      symbols.push(sym);
    }
    reels.push({ drum, symbols, rate: 6 - r * 1.4 });
  }

  // Lever arm on the side
  const leverBase = new THREE.Group();
  leverBase.position.set(1.05, -0.7, 0.2);
  slotGroup.add(leverBase);
  const leverShaft = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 10), trimMat);
  leverBase.add(leverShaft);
  const leverArm = new THREE.Group();
  leverBase.add(leverArm);
  const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.032, 0.75, 10), trimMat);
  rod.position.y = 0.37;
  leverArm.add(rod);
  const knobMat = new THREE.MeshStandardMaterial({
    color: '#e63946',
    emissive: '#e63946',
    emissiveIntensity: 0.3,
    roughness: 0.3,
  });
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 12), knobMat);
  knob.position.y = 0.78;
  leverArm.add(knob);

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
    slotGroup.rotation.y = Math.sin(t * 0.4 * speed) * 0.45;
    slotGroup.position.y = Math.sin(t * 1.0 * speed) * 0.04;
    // Reels spin fast then slow to a stop in sequence
    for (let i = 0; i < reels.length; i++) {
      const cycle = (t * 0.5 * speed) % 3;
      const stopping = cycle > 2 - i * 0.4;
      if (!stopping) reels[i].drum.rotation.x += reels[i].rate * 0.14 * speed;
    }
    // Lever pull cycle
    const pullPhase = Math.max(0, Math.sin(t * 1.6 * speed));
    leverArm.rotation.z = pullPhase * 0.85;
    // Marquee chaser lights
    for (const b of bulbs) {
      const on = (Math.floor(t * 8 * speed) + b.phase) % 5 === 0;
      (b.mesh.material as THREE.MeshBasicMaterial).color.set(on ? '#fff3c4' : '#5b4632');
      b.mesh.scale.setScalar(on ? 1.5 : 1);
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
