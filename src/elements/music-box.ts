import * as THREE from 'three';

export interface MusicBoxOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createMusicBox(
  container: HTMLElement,
  options: MusicBoxOptions = {},
): () => void {
  const { color = '#d4af6a', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.4, 2.0, 4.6);
  camera.lookAt(0, 0.1, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(4, 7, 5);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 28);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const boxGroup = new THREE.Group();
  scene.add(boxGroup);

  // Ornate case
  const caseMat = new THREE.MeshPhysicalMaterial({ color: '#5b4632', roughness: 0.45, clearcoat: 0.5 });
  const goldMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(color), metalness: 0.95, roughness: 0.2 });
  const caseBody = new THREE.Mesh(new THREE.BoxGeometry(2.3, 1.05, 1.7), caseMat);
  caseBody.position.y = -0.55;
  boxGroup.add(caseBody);
  for (const [x, z] of [[-1.15, -0.85], [1.15, -0.85], [-1.15, 0.85], [1.15, 0.85]] as const) {
    const foot = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 10), goldMat);
    foot.position.set(x, -1.12, z);
    boxGroup.add(foot);
  }
  // Gold inlay lines
  for (const y of [-0.25, -0.85]) {
    const inlay = new THREE.Mesh(new THREE.BoxGeometry(2.34, 0.03, 1.74), goldMat);
    inlay.position.y = y;
    boxGroup.add(inlay);
  }

  // Open lid propped up
  const lidPivot = new THREE.Group();
  lidPivot.position.set(-1.15, -0.03, 0);
  boxGroup.add(lidPivot);
  const lid = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.08, 1.7), caseMat);
  lid.position.x = 1.15;
  lidPivot.add(lid);
  lidPivot.rotation.z = -1.9;

  // Rotating pinned cylinder
  const mechanism = new THREE.Group();
  mechanism.position.y = -0.02;
  boxGroup.add(mechanism);
  const cylinderMat = new THREE.MeshStandardMaterial({ color: '#8a93a8', metalness: 0.9, roughness: 0.25 });
  const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 1.35, 20), cylinderMat);
  cylinder.rotation.z = Math.PI / 2;
  mechanism.add(cylinder);
  interface Pin { mesh: THREE.Mesh; phase: number }
  const pins: Pin[] = [];
  for (let i = 0; i < 14; i++) {
    const pinMesh = new THREE.Mesh(new THREE.SphereGeometry(0.028, 8, 8), goldMat);
    const a = i * 2.399; // golden angle
    pinMesh.position.set(
      Math.cos(i * 1.1) * 0.68,
      Math.sin(a) * 0.17,
      Math.cos(a) * 0.17,
    );
    mechanism.add(pinMesh);
    pins.push({ mesh: pinMesh, phase: i * 0.44 });
  }

  // Steel comb tines
  interface Tine { mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial; phase: number }
  const tines: Tine[] = [];
  for (let i = 0; i < 10; i++) {
    const len = 0.42 + (i % 5) * 0.07;
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      metalness: 0.95,
      roughness: 0.18,
      emissive: new THREE.Color(accentColor),
      emissiveIntensity: 0,
    });
    const tineMesh = new THREE.Mesh(new THREE.BoxGeometry(0.035, len, 0.05), mat);
    tineMesh.rotation.x = Math.PI / 2;
    tineMesh.position.set(0.75, 0.06, -0.36 + i * 0.08);
    boxGroup.add(tineMesh);
    tines.push({ mesh: tineMesh, mat, phase: i * 0.31 });
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
    boxGroup.rotation.y = t * 0.45 * speed;
    boxGroup.position.y = Math.sin(t * 1.0 * speed) * 0.04;
    mechanism.rotation.x = t * 1.6 * speed;
    // Tines plink as pins pass
    for (const tn of tines) {
      const plink = Math.pow(Math.max(0, Math.sin(t * 5.2 * speed + tn.phase)), 12);
      tn.mat.emissiveIntensity = plink * 1.4;
      tn.mesh.position.y = 0.06 - plink * 0.02;
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
