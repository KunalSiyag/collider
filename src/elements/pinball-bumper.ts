import * as THREE from 'three';

export interface PinballBumperOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createPinballBumper(
  container: HTMLElement,
  options: PinballBumperOptions = {},
): () => void {
  const { color = '#f472b6', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 50);
  camera.position.set(0.4, 4.6, 4.6);
  camera.lookAt(0, -0.8, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(3, 8, 5);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  // Playfield
  const tableMat = new THREE.MeshStandardMaterial({ color: '#17121f', roughness: 0.65 });
  const playfield = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.18, 6.4), tableMat);
  playfield.rotation.x = -Math.PI / 12;
  playfield.position.y = -1.35;
  scene.add(playfield);

  const rand = (() => {
    let s = 12345 >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  })();

  // Bumpers
  interface Bumper {
    group: THREE.Group;
    capMat: THREE.MeshStandardMaterial;
    ringMat: THREE.MeshBasicMaterial;
    flashT: number;
    pos: THREE.Vector3;
  }
  const bumpers: Bumper[] = [];
  const spots: Array<[number, number]> = [[-1.15, -1.9], [1.15, -1.9], [0, -3.1], [-1.5, -3.4], [1.5, -3.4]];
  for (const [x, z] of spots) {
    const g = new THREE.Group();
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(rand() > 0.5 ? color : accentColor),
      roughness: 0.3,
      clearcoat: 0.7,
    });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.48, 0.34, 28), bodyMat);
    body.position.y = 0.26;
    g.add(body);
    const capMat = new THREE.MeshStandardMaterial({
      color: '#e9e4f5',
      emissive: new THREE.Color(rand() > 0.5 ? color : accentColor),
      emissiveIntensity: 0.25,
      roughness: 0.3,
    });
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.36, 24, 14, 0, Math.PI * 2, 0, Math.PI / 2), capMat);
    cap.position.y = 0.43;
    g.add(cap);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.02, 6, 40), ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.05;
    g.add(ringMesh);

    g.position.set(x, -1.22 + Math.abs(z) * 0, z * 1.0);
    g.position.y = -1.22 + Math.abs(z) * Math.sin(Math.PI / 12) * 0.5;
    scene.add(g);
    bumpers.push({ group: g, capMat, ringMat, flashT: 99, pos: g.position.clone() });
  }

  // Silver ball bouncing between bumpers
  const ballMat = new THREE.MeshStandardMaterial({ color: '#cfd6e4', metalness: 1, roughness: 0.08 });
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.17, 20, 16), ballMat);
  scene.add(ball);

  let target: Bumper | null = null;
  let travelK = 1;
  let fromPos = new THREE.Vector3();
  function pickNext(current: THREE.Vector3): Bumper {
    const options = bumpers.filter((b) => b.group.position.distanceTo(current) > 0.8);
    return options[Math.floor(rand() * options.length)];
  }
  fromPos.copy(bumpers[0].group.position).add(new THREE.Vector3(0, 0.62, 0));

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

    if (!target || travelK >= 1) {
      if (target) target.flashT = 0; // impact!
      target = pickNext(ball.position);
      fromPos.copy(ball.position);
      travelK = 0;
    }
    travelK += dt * 2.6 * speed;
    const k = Math.min(travelK, 1);
    const dest = target.group.position.clone().add(new THREE.Vector3(0, 0.62, 0));
    ball.position.lerpVectors(fromPos, dest, k);
    ball.position.y += Math.sin(k * Math.PI) * 0.55; // hop arc

    for (const b of bumpers) {
      b.flashT += dt;
      const flash = Math.exp(-b.flashT * 9);
      b.capMat.emissiveIntensity = 0.2 + flash * 2.2;
      b.ringMat.opacity = flash * 0.9;
      b.group.children[0].scale.setScalar(1 + flash * 0.12);
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
