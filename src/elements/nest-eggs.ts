import * as THREE from 'three';

export interface NestEggsOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createNestEggs(
  container: HTMLElement,
  options: NestEggsOptions = {},
): () => void {
  const { color = '#a78bfa', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.2, 2.0, 4.6);
  camera.lookAt(0, -0.4, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
  keyLight.position.set(4, 8, 5);
  scene.add(keyLight);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 22);
  rim.position.set(-4, 1, -3);
  scene.add(rim);

  const rand = (() => {
    let s = 13579 >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  })();

  // Tree branch the nest sits on
  const branchMat = new THREE.MeshStandardMaterial({ color: '#5b4632', roughness: 0.85 });
  const branch = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.22, 3.6, 12), branchMat);
  branch.rotation.z = Math.PI / 2;
  branch.rotation.y = 0.25;
  branch.position.y = -1.15;
  scene.add(branch);
  for (let i = 0; i < 3; i++) {
    const twigCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1 + i * 1, -1.15, 0),
      new THREE.Vector3(-0.9 + i * 1, -0.75, 0.3),
      new THREE.Vector3(-0.85 + i * 1, -0.55, 0.55),
    ]);
    const twig = new THREE.Mesh(new THREE.TubeGeometry(twigCurve, 10, 0.03, 6), branchMat);
    scene.add(twig);
  }

  const nestGroup = new THREE.Group();
  nestGroup.position.y = -0.72;
  scene.add(nestGroup);

  // Woven nest from torus rings of twig material
  const twigMat = new THREE.MeshStandardMaterial({ color: '#7a5c38', roughness: 0.9 });
  for (let ring = 0; ring < 7; ring++) {
    const y = ring * 0.075;
    const r = 1.05 - Math.abs(ring - 3) * 0.09;
    for (let w = 0; w < 4; w++) {
      const a = rand() * Math.PI * 2;
      const weave = new THREE.Mesh(new THREE.TorusGeometry(r * (0.97 + rand() * 0.06), 0.032, 6, 40), twigMat);
      weave.rotation.x = Math.PI / 2;
      weave.rotation.z = a;
      weave.position.y = y;
      nestGroup.add(weave);
      break;
    }
  }
  // Loose twigs sticking out
  for (let i = 0; i < 9; i++) {
    const a = rand() * Math.PI * 2;
    const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.028, 0.5 + rand() * 0.4, 6), twigMat);
    stick.position.set(Math.cos(a) * 0.95, 0.18, Math.sin(a) * 0.95);
    stick.rotation.set(rand() * 0.8 - 0.4, a, 1.2 + rand() * 0.5);
    nestGroup.add(stick);
  }

  // Speckled eggs
  const eggProfile: THREE.Vector2[] = [];
  for (let i = 0; i <= 14; i++) {
    const u = i / 14;
    eggProfile.push(new THREE.Vector2(Math.sin(u * Math.PI) * 0.26 * (0.78 + u * 0.42) + 0.001, u * 0.62));
  }
  const eggPalette = ['#e9dcc3', '#bcd8e8', '#cfd6e4', color];
  interface Egg { mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial; phase: number }
  const eggs: Egg[] = [];
  const spotsMat = new THREE.MeshBasicMaterial({ color: '#5b4632' });
  for (let i = 0; i < 3; i++) {
    const hue = eggPalette[i % eggPalette.length];
    const eggMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(hue).offsetHSL((rand() - 0.5) * 0.04, 0, 0),
      roughness: 0.35,
      clearcoat: 0.5,
    });
    const egg = new THREE.Mesh(new THREE.LatheGeometry(eggProfile.map((p) => p.clone()), 24), eggMat);
    const a = (i / 3) * Math.PI * 2 + 0.5;
    egg.position.set(Math.cos(a) * 0.32, 0.08, Math.sin(a) * 0.32);
    egg.rotation.z = (rand() - 0.5) * 0.35;
    nestGroup.add(egg);
    eggs.push({ mesh: egg, mat: eggMat, phase: i });
    // Speckles
    for (let s = 0; s < 8; s++) {
      const spotA = rand() * Math.PI * 2;
      const spotU = rand();
      const spotR = Math.sin(spotU * Math.PI) * 0.26 * (0.78 + spotU * 0.42);
      const spot = new THREE.Mesh(new THREE.CircleGeometry(0.02 + rand() * 0.015, 8), spotsMat);
      spot.position.set(Math.cos(spotA) * spotR, spotU * 0.62, Math.sin(spotA) * spotR);
      spot.lookAt(spot.position.clone().multiplyScalar(4));
      egg.add(spot);
    }
  }

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
    scene.rotation.y = t * 0.3 * speed;
    nestGroup.position.y = -0.72 + Math.sin(t * 1.1 * speed) * 0.03;
    for (const e of eggs) {
      e.mesh.position.y = 0.08 + Math.sin(t * 2.2 * speed + e.phase) * 0.008;
    }
    void accentColor;
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
