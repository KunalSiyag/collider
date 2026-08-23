import * as THREE from 'three';

export interface PianoKeysOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createPianoKeys(
  container: HTMLElement,
  options: PianoKeysOptions = {},
): () => void {
  const { color = '#f5f3ff', accentColor = '#8b5cf6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.4, 2.6, 5.4);
  camera.lookAt(0, -0.4, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
  keyLight.position.set(3, 7, 6);
  scene.add(keyLight);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 1, -3);
  scene.add(rim);

  const keyboard = new THREE.Group();
  keyboard.rotation.x = 0.42;
  scene.add(keyboard);

  // Chassis
  const chassisMat = new THREE.MeshStandardMaterial({ color: '#241b33', roughness: 0.55 });
  const WHITE_KEYS = 14;
  const KEY_W = 0.44;
  const width = WHITE_KEYS * (KEY_W + 0.02);
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(width + 0.4, 0.35, 1.9), chassisMat);
  chassis.position.set(0, -0.28, -0.45);
  keyboard.add(chassis);
  // Felt strip
  const feltMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor) });
  const felt = new THREE.Mesh(new THREE.BoxGeometry(width + 0.36, 0.06, 0.06), feltMat);
  felt.position.set(0, -0.09, 0.52);
  keyboard.add(felt);

  // White keys
  interface Key { pivot: THREE.Group; white: boolean; phase: number; mat: THREE.MeshStandardMaterial }
  const keys: Key[] = [];
  for (let i = 0; i < WHITE_KEYS; i++) {
    const x = (i - (WHITE_KEYS - 1) / 2) * (KEY_W + 0.02);
    const mat = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(color), roughness: 0.18, clearcoat: 0.7 });
    const keyMesh = new THREE.Mesh(new THREE.BoxGeometry(KEY_W, 0.1, 1.55), mat);
    keyMesh.position.set(x, 0, 0);
    // Slight gap shading via darker side strips
    const pivot = new THREE.Group();
    pivot.position.set(x, 0, 0.75); // hinge at the back
    const shifted = new THREE.Mesh(new THREE.BoxGeometry(KEY_W, 0.1, 1.55), mat);
    shifted.position.z = -0.775;
    pivot.add(shifted);
    keyboard.add(pivot);
    keys.push({ pivot, white: true, phase: i * 0.53, mat });

    // Black keys pattern
    if (i !== WHITE_KEYS - 1 && ![2, 6, 9, 13].includes(i)) {
      const blackMat = new THREE.MeshPhysicalMaterial({ color: 0x10101a, roughness: 0.25, clearcoat: 0.6 });
      const blackPivot = new THREE.Group();
      blackPivot.position.set(x + (KEY_W + 0.02) / 2, 0.07, 0.48);
      const blackKey = new THREE.Mesh(new THREE.BoxGeometry(KEY_W * 0.58, 0.12, 0.95), blackMat);
      blackKey.position.z = -0.475;
      blackPivot.add(blackKey);
      keyboard.add(blackPivot);
      keys.push({ pivot: blackPivot, white: false, phase: i * 0.71 + 0.3, mat: blackMat });
    }
  }

  function resize() {
    const width2 = container.clientWidth;
    const height = container.clientHeight;
    if (!width2 || !height) return;
    renderer.setSize(width2, height, false);
    camera.aspect = width2 / height;
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
    keyboard.rotation.y = Math.sin(t * 0.35 * speed) * 0.3;
    keyboard.position.y = Math.sin(t * 0.8 * speed) * 0.05 - 0.3;
    // Keys play a rolling arpeggio
    for (const k of keys) {
      const press = Math.max(0, Math.sin(t * 3.4 * speed + k.phase));
      const angle = Math.pow(press, 10) * (k.white ? 0.05 : 0.04);
      k.pivot.rotation.x = angle;
      k.mat.emissive = k.mat.emissive || new THREE.Color();
      if (angle > 0.004) {
        k.mat.emissiveIntensity = angle * 8;
        k.mat.emissive.set(accentColor);
      } else {
        k.mat.emissiveIntensity = 0;
      }
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
