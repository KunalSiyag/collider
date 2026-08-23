import * as THREE from 'three';

export interface FacetedHeadOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createFacetedHead(
  container: HTMLElement,
  options: FacetedHeadOptions = {},
): () => void {
  const { color = '#a78bfa', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.4, 0.8, 4.6);
  camera.lookAt(0, 0.2, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.45));
  const key = new THREE.DirectionalLight(0xffffff, 2.6);
  key.position.set(3, 5, 5);
  scene.add(key);
  const rimA = new THREE.PointLight(new THREE.Color(accentColor), 40);
  rimA.position.set(-4, 1, -2);
  scene.add(rimA);
  const rimB = new THREE.PointLight(new THREE.Color('#f472b6'), 30);
  rimB.position.set(3, -2, -3);
  scene.add(rimB);

  const group = new THREE.Group();
  group.position.y = 0.2;
  scene.add(group);

  // Crystal skull: low-poly head from a deformed icosphere
  const geo = new THREE.IcosahedronGeometry(1.15, 1);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(pos, i);
    // Elongate cranium, flatten face plane, narrow jaw
    if (v.z > 0.3 && v.y < 0.35) v.z *= 0.72;             // face flatten
    if (v.y < -0.4) { v.x *= 0.78; v.y *= 0.82; }          // jaw taper
    if (v.y > 0.4) v.y *= 1.12;                            // tall dome
    v.multiplyScalar(0.96);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();

  const crystalMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    flatShading: true,
    roughness: 0.12,
    metalness: 0.1,
    transmission: 0.55,
    thickness: 1.4,
    clearcoat: 0.6,
  });
  const head = new THREE.Mesh(geo, crystalMat);
  group.add(head);

  // Glowing eye sockets
  const eyeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor) });
  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 10), eyeMat);
    eye.position.set(side * 0.38, 0.12, 0.82);
    eye.scale.set(1, 0.75, 0.6);
    group.add(eye);
  }

  // Nasal cavity wedge
  const nose = new THREE.Mesh(
    new THREE.ConeGeometry(0.11, 0.3, 4),
    new THREE.MeshBasicMaterial({ color: 0x0b0714 }),
  );
  nose.position.set(0, -0.28, 0.85);
  nose.rotation.x = Math.PI / 2;
  group.add(nose);

  // Teeth grid hint
  const toothMat = new THREE.MeshStandardMaterial({ color: 0xe9e4f5, roughness: 0.3 });
  for (let i = 0; i < 6; i++) {
    const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.12, 0.05), toothMat);
    tooth.position.set((i - 2.5) * 0.13, -0.68 + Math.abs(i - 2.5) * 0.02, 0.66);
    group.add(tooth);
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
    group.rotation.y = Math.sin(t * 0.4 * speed) * 0.7;
    group.position.y = 0.2 + Math.sin(t * 0.9 * speed) * 0.09;
    eyeMat.color.setHSL(0.52 + Math.sin(t * 0.8 * speed) * 0.12, 0.8, 0.6);
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
