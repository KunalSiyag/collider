import * as THREE from 'three';

export interface SwordInStoneOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createSwordInStone(
  container: HTMLElement,
  options: SwordInStoneOptions = {},
): () => void {
  const { color = '#c9c4d8', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 60);
  camera.position.set(2.8, 1.6, 4.8);
  camera.lookAt(0, -0.4, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
  keyLight.position.set(4, 7, 6);
  scene.add(keyLight);
  // Mystical glow from the blade
  const magicLight = new THREE.PointLight(new THREE.Color(accentColor), 24);
  magicLight.position.set(0, 1.4, 0);
  scene.add(magicLight);

  const monument = new THREE.Group();
  scene.add(monument);

  // Anvil stone
  const stoneMat = new THREE.MeshStandardMaterial({ color: '#5a5566', roughness: 0.95, flatShading: true });
  const baseRock = new THREE.Mesh(new THREE.BoxGeometry(2.1, 1.15, 1.7), stoneMat);
  baseRock.position.y = -1.35;
  monument.add(baseRock);
  const topSlab = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.28, 1.9), stoneMat);
  topSlab.position.y = -0.65;
  monument.add(topSlab);
  // Mossy patches
  const mossMat = new THREE.MeshStandardMaterial({ color: '#3f5e46', roughness: 1, flatShading: true });
  for (let i = 0; i < 7; i++) {
    const patch = new THREE.Mesh(new THREE.SphereGeometry(0.12 + (i % 3) * 0.05, 8, 6), mossMat);
    patch.scale.y = 0.3;
    patch.position.set((i % 3 - 1) * 0.7, -0.5 + (i % 2) * 0.05, ((i % 2) ? 0.7 : -0.75));
    monument.add(patch);
  }

  // Sword embedded in the stone
  const sword = new THREE.Group();
  sword.rotation.z = 0.06;
  sword.position.y = -0.45;
  monument.add(sword);

  const steelMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    metalness: 1,
    roughness: 0.08,
    clearcoat: 0.6,
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.05,
  });

  // Blade with taper
  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(-0.09, 0);
  bladeShape.lineTo(0.09, 0);
  bladeShape.lineTo(0.075, 1.35);
  bladeShape.lineTo(0, 1.62);
  bladeShape.lineTo(-0.075, 1.35);
  bladeShape.lineTo(-0.09, 0);
  const blade = new THREE.Mesh(
    new THREE.ExtrudeGeometry(bladeShape, { depth: 0.03, bevelEnabled: false }),
    steelMat,
  );
  sword.add(blade);
  // Fuller groove line
  const fuller = new THREE.Mesh(new THREE.BoxGeometry(0.02, 1.25, 0.035), new THREE.MeshStandardMaterial({ color: '#6a7080', metalness: 0.9, roughness: 0.25 }));
  fuller.position.set(0, 0.68, 0);
  sword.add(fuller);

  // Crossguard
  const goldMat = new THREE.MeshPhysicalMaterial({ color: '#d4af6a', metalness: 0.95, roughness: 0.18 });
  const guardCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.52, 0.02, 0),
    new THREE.Vector3(0, -0.04, 0),
    new THREE.Vector3(0.52, 0.02, 0),
  ]);
  const guard = new THREE.Mesh(new THREE.TubeGeometry(guardCurve, 16, 0.045, 10), goldMat);
  guard.position.y = -0.06;
  sword.add(guard);
  // Grip and pommel
  const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.44, 12), new THREE.MeshStandardMaterial({ color: '#5b1030', roughness: 0.7 }));
  grip.position.y = -0.32;
  sword.add(grip);
  const pommel = new THREE.Mesh(new THREE.OctahedronGeometry(0.11, 0), goldMat);
  pommel.position.y = -0.58;
  sword.add(pommel);

  // Shimmer motes around the blade
  interface Mote { mesh: THREE.Mesh; phase: number; r: number }
  const motes: Mote[] = [];
  const moteMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(accentColor),
    transparent: true,
    opacity: 0.85,
  });
  for (let i = 0; i < 12; i++) {
    const m = new THREE.Mesh(new THREE.OctahedronGeometry(0.025 + (i % 3) * 0.012, 0), moteMat.clone());
    monument.add(m);
    motes.push({ mesh: m, phase: i * 0.7, r: 0.35 + (i % 4) * 0.14 });
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
    monument.rotation.y = t * 0.4 * speed;
    steelMat.emissiveIntensity = 0.04 + Math.abs(Math.sin(t * 1.6 * speed)) * 0.18;
    magicLight.intensity = 18 + Math.abs(Math.sin(t * 1.6 * speed)) * 14;
    for (const m of motes) {
      const a = t * 0.8 * speed + m.phase;
      m.mesh.position.set(Math.cos(a) * m.r, 0.35 + Math.sin(a * 1.7) * 0.75, Math.sin(a) * m.r);
      m.mesh.rotation.y += 0.06;
      ((m.mesh.material as THREE.MeshBasicMaterial)).opacity = 0.3 + Math.abs(Math.sin(a * 2)) * 0.6;
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
