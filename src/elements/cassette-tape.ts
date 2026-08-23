import * as THREE from 'three';

export interface CassetteTapeOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createCassetteTape(
  container: HTMLElement,
  options: CassetteTapeOptions = {},
): () => void {
  const { color = '#a78bfa', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
  camera.position.set(0.5, 0.7, 4.8);
  camera.lookAt(0, -0.1, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const key = new THREE.DirectionalLight(0xffffff, 2.3);
  key.position.set(4, 6, 5);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 24);
  rim.position.set(-4, 1, -3);
  scene.add(rim);

  const cassette = new THREE.Group();
  cassette.rotation.x = 0.25;
  scene.add(cassette);

  const shellMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    roughness: 0.35,
    clearcoat: 0.6,
  });
  const darkMat = new THREE.MeshStandardMaterial({ color: '#10101a', roughness: 0.6 });
  const metalMat = new THREE.MeshStandardMaterial({ color: '#c9c4d8', metalness: 0.9, roughness: 0.2 });

  // Shell
  const W = 4;
  const H = 2.52;
  const shell = new THREE.Mesh(new THREE.BoxGeometry(W, H, 0.28), shellMat);
  cassette.add(shell);
  // Label plate
  const labelPlate = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.15, 0.02), new THREE.MeshStandardMaterial({ color: '#f5f3ff', roughness: 0.5 }));
  labelPlate.position.set(-0.1, 0.55, 0.15);
  cassette.add(labelPlate);
  // Stripe on the label
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.18, 0.02), new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor) }));
  stripe.position.set(-0.1, 0.32, 0.165);
  cassette.add(stripe);

  // Window
  const windowFrame = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.95, 0.03), darkMat);
  windowFrame.position.set(0, -0.45, 0.145);
  cassette.add(windowFrame);
  const windowGlass = new THREE.Mesh(
    new THREE.PlaneGeometry(2.34, 0.8),
    new THREE.MeshPhysicalMaterial({ color: 0x88aaff, transmission: 0.75, roughness: 0.05, transparent: true, opacity: 0.35 }),
  );
  windowGlass.position.set(0, -0.45, 0.165);
  cassette.add(windowGlass);

  // Twin reels with visible tape windings
  interface Reel { hub: THREE.Group; winding: THREE.Mesh; dir: number }
  const reels: Reel[] = [];
  for (const [side, dir] of [[-1, 1], [1, -1]] as const) {
    const hub = new THREE.Group();
    hub.position.set(side * 1.15, -0.45, 0);
    cassette.add(hub);
    const teeth = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.22, 6), darkMat);
    teeth.rotation.x = Math.PI / 2;
    hub.add(teeth);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.09, 0.23), darkMat);
      tooth.position.set(Math.cos(a) * 0.17, Math.sin(a) * 0.17, 0);
      hub.add(tooth);
    }
    const winding = new THREE.Mesh(
      new THREE.CylinderGeometry(0.62, 0.62, 0.16, 40),
      new THREE.MeshStandardMaterial({ color: '#2e2839', roughness: 0.85 }),
    );
    winding.rotation.x = Math.PI / 2;
    hub.add(winding);
    reels.push({ hub, winding, dir });
  }

  // Bottom trapezoid detail + screw dots
  const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.29, 3, 1, false, 0, Math.PI), shellMat);
  foot.rotation.set(Math.PI / 2, 0, 0);
  foot.scale.z = 1.6;
  foot.position.set(0, -1.12, -0.005);
  foot.visible = false; // decorative cutaway omitted
  cassette.add(foot);
  void foot;

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
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    cassette.rotation.y = Math.sin(t * 0.4 * speed) * 0.5;
    cassette.position.y = Math.sin(t * 1.0 * speed) * 0.06;
    for (const r of reels) {
      r.hub.rotation.z += r.dir * dt * 2.2 * speed;
      // Tape slowly transfers between reels
      const wobble = 1 + Math.sin(t * 0.8 * speed) * 0.08 * r.dir;
      r.winding.scale.set(wobble, wobble, 1);
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
