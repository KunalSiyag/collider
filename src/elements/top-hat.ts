import * as THREE from 'three';

export interface TopHatOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createTopHat(
  container: HTMLElement,
  options: TopHatOptions = {},
): () => void {
  const { color = '#1a1425', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.4, 2.0, 4.4);
  camera.lookAt(0, -0.2, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const key = new THREE.DirectionalLight(0xffffff, 2.3);
  key.position.set(4, 6, 4);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const hat = new THREE.Group();
  hat.position.y = -1.0;
  scene.add(hat);

  const feltMat = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(color), roughness: 0.55, clearcoat: 0.35 });
  const bandMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.35,
    roughness: 0.4,
  });

  // Brim
  const brim = new THREE.Mesh(new THREE.CylinderGeometry(1.45, 1.45, 0.06, 56), feltMat);
  brim.scale.y = 1;
  brim.geometry.scale(1, 1, 1);
  brim.position.y = 0;
  // gentle upturn at edges via torus lip
  const lip = new THREE.Mesh(new THREE.TorusGeometry(1.38, 0.05, 10, 60), feltMat);
  lip.rotation.x = Math.PI / 2;
  lip.position.y = 0.03;
  hat.add(brim, lip);

  // Crown
  const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 0.98, 1.7, 48), feltMat);
  crown.position.y = 0.88;
  hat.add(crown);
  const top = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 0.92, 0.05, 48), feltMat);
  top.position.y = 1.74;
  hat.add(top);

  // Silk band + side buckle
  const band = new THREE.Mesh(new THREE.CylinderGeometry(1.01, 1.03, 0.34, 48), bandMat);
  band.position.y = 0.24;
  hat.add(band);
  const buckleMat = new THREE.MeshStandardMaterial({ color: '#d4af6a', metalness: 0.9, roughness: 0.25 });
  const buckle = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.28, 0.04), buckleMat);
  buckle.position.set(0.99, 0.24, 0.12);
  buckle.rotation.y = Math.PI / 2 + 0.18;
  hat.add(buckle);

  // A pair of rabbit ears peeking out of the crown
  const earMat = new THREE.MeshStandardMaterial({ color: '#e9e4f5', roughness: 0.6 });
  const innerEarMat = new THREE.MeshStandardMaterial({ color: new THREE.Color('#f472b6'), roughness: 0.6 });
  for (const [side, tilt] of [[-1, 0.55], [1, 0.8]] as const) {
    const ear = new THREE.Group();
    ear.position.set(side * 0.32, 1.72, 0);
    const outer = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.62, 6, 14), earMat);
    outer.position.y = 0.42;
    ear.add(outer);
    const inner = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 0.42, 6, 12), innerEarMat);
    inner.position.set(0, 0.42, 0.09);
    ear.add(inner);
    ear.rotation.z = -side * tilt;
    ear.userData.baseZ = ear.rotation.z;
    hat.add(ear);
    void tilt;
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
    hat.rotation.y = t * 0.5 * speed;
    hat.position.y = -1.0 + Math.sin(t * 1.1 * speed) * 0.07;
    hat.children.forEach((child, i) => {
      if (i >= 7 && i <= 8) child.rotation.z = child.userData.baseZ + Math.sin(t * 2.2 * speed + i) * 0.08;
    });
    bandMat.emissiveIntensity = 0.25 + Math.abs(Math.sin(t * 1.6 * speed)) * 0.3;
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
