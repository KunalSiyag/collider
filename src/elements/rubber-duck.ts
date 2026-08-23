import * as THREE from 'three';

export interface RubberDuckOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createRubberDuck(
  container: HTMLElement,
  options: RubberDuckOptions = {},
): () => void {
  const { color = '#ffd23f', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.0, 0.8, 4.4);
  camera.lookAt(0, -0.35, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
  keyLight.position.set(4, 6, 6);
  scene.add(keyLight);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 22);
  rim.position.set(-4, 1, -3);
  scene.add(rim);

  // Bathtub water
  const waterMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(accentColor).multiplyScalar(0.5),
    transparent: true,
    opacity: 0.55,
    roughness: 0.08,
    clearcoat: 0.9,
  });
  const water = new THREE.Mesh(new THREE.CircleGeometry(2.6, 48), waterMat);
  water.rotation.x = -Math.PI / 2;
  water.position.y = -0.62;
  scene.add(water);
  // Tub rim hint
  const tubRim = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.07, 10, 64), new THREE.MeshStandardMaterial({ color: '#e9e4f5', roughness: 0.3 }));
  tubRim.rotation.x = Math.PI / 2;
  tubRim.position.y = -0.6;
  scene.add(tubRim);

  const duckGroup = new THREE.Group();
  duckGroup.position.y = -0.25;
  scene.add(duckGroup);

  const rubberMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    roughness: 0.32,
    clearcoat: 0.85,
    clearcoatRoughness: 0.25,
  });

  // Body: squashed sphere
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.52, 28, 20), rubberMat);
  body.scale.set(1.15, 0.82, 0.92);
  body.position.y = 0;
  duckGroup.add(body);

  // Head sphere overlapping forward-up
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.34, 26, 18), rubberMat);
  head.position.set(0.38, 0.42, 0);
  duckGroup.add(head);

  // Beak: two stacked flattened cones
  const beakMat = new THREE.MeshStandardMaterial({ color: '#ff8c42', roughness: 0.45 });
  const upperBeak = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.34, 16), beakMat);
  upperBeak.rotation.z = -Math.PI / 2;
  upperBeak.scale.y = 1;
  upperBeak.scale.x = 0.55;
  upperBeak.position.set(0.74, 0.36, 0);
  duckGroup.add(upperBeak);

  // Eyes
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x10101a });
  for (const side of [-1, 1]) {
    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const eyeWhite = new THREE.Mesh(new THREE.SphereGeometry(0.062, 12, 10), eyeWhiteMat);
    eyeWhite.position.set(0.56, 0.56, side * 0.17);
    duckGroup.add(eyeWhite);
    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.032, 10, 8), eyeMat);
    pupil.position.set(0.61, 0.56, side * 0.19);
    duckGroup.add(pupil);
  }

  // Tail bump tilted up at the back
  const tail = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 12), rubberMat);
  tail.scale.set(1.3, 0.7, 0.8);
  tail.position.set(-0.58, 0.18, 0);
  tail.rotation.z = 0.65;
  duckGroup.add(tail);

  // Wings pressed against the sides
  for (const side of [-1, 1]) {
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.quadraticCurveTo(0.34, -0.05, 0.46, -0.24);
    wingShape.quadraticCurveTo(0.18, -0.3, 0, -0.14);
    wingShape.lineTo(0, 0);
    const wing = new THREE.Mesh(new THREE.ExtrudeGeometry(wingShape, { depth: 0.04, bevelEnabled: false }), rubberMat);
    wing.rotation.set(side * 0.25, side > 0 ? -Math.PI / 2 : Math.PI / 2, 0);
    wing.position.set(-0.02, 0.12, side * 0.44);
    duckGroup.add(wing);
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
    // Bobbing on the water and slowly circling the tub
    const a = t * 0.35 * speed;
    duckGroup.position.x = Math.cos(a) * 0.75;
    duckGroup.position.z = Math.sin(a) * 0.75;
    duckGroup.rotation.y = -a + Math.PI / 2;
    duckGroup.position.y = -0.25 + Math.sin(t * 2.1 * speed) * 0.05;
    duckGroup.rotation.z = Math.sin(t * 2.1 * speed) * 0.09;
    duckGroup.rotation.x = Math.sin(t * 1.7 * speed + 1) * 0.06;
    // Ripple rings
    water.scale.setScalar(1 + Math.sin(t * 1.8 * speed) * 0.01);
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
