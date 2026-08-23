import * as THREE from 'three';

export interface PocketWatchOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createPocketWatch(
  container: HTMLElement,
  options: PocketWatchOptions = {},
): () => void {
  const { color = '#fafafa', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
  camera.position.set(0.9, 1.1, 4.0);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.3);
  key.position.set(3, 5, 4);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 25);
  rim.position.set(-3, 1, -3);
  scene.add(rim);

  const gold = new THREE.MeshStandardMaterial({ color: '#d4af6a', metalness: 0.9, roughness: 0.22 });

  const watch = new THREE.Group();
  scene.add(watch);

  // Case and crown
  const caseRing = new THREE.Mesh(new THREE.TorusGeometry(1.42, 0.13, 16, 64), gold);
  watch.add(caseRing);
  const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 0.22, 16), gold);
  crown.position.y = 1.62;
  watch.add(crown);
  const bow = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.05, 10, 32), gold);
  bow.position.y = 1.92;
  watch.add(bow);

  // Dial
  const dial = new THREE.Mesh(
    new THREE.CylinderGeometry(1.34, 1.34, 0.07, 64),
    new THREE.MeshStandardMaterial({ color: new THREE.Color(color), roughness: 0.3 }),
  );
  dial.rotation.x = Math.PI / 2;
  dial.position.z = -0.03;
  watch.add(dial);

  // Hour markers
  const markerMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#8b5cf6'),
    emissive: new THREE.Color('#8b5cf6'),
    emissiveIntensity: 0.45,
  });
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const marker = new THREE.Mesh(
      new THREE.BoxGeometry(i % 3 === 0 ? 0.09 : 0.05, i % 3 === 0 ? 0.26 : 0.15, 0.03),
      markerMat,
    );
    marker.position.set(Math.sin(a) * 1.1, Math.cos(a) * 1.1, 0.03);
    marker.rotation.z = -a;
    watch.add(marker);
  }

  // Hands pivot around z
  const hourHand = new THREE.Group();
  const minuteHand = new THREE.Group();
  const secondHand = new THREE.Group();
  const handMat = new THREE.MeshStandardMaterial({ color: '#2a2438', metalness: 0.5, roughness: 0.35 });
  const accentHandMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.7,
  });
  const hourBar = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.72, 0.03), handMat);
  hourBar.position.y = 0.36;
  hourHand.add(hourBar);
  const minuteBar = new THREE.Mesh(new THREE.BoxGeometry(0.075, 1.05, 0.03), handMat);
  minuteBar.position.y = 0.52;
  minuteHand.add(minuteBar);
  const secondBar = new THREE.Mesh(new THREE.BoxGeometry(0.03, 1.2, 0.02), accentHandMat);
  secondBar.position.y = 0.6;
  secondHand.add(secondBar);
  for (const h of [hourHand, minuteHand, secondHand]) {
    h.position.z = 0.04;
    watch.add(h);
  }
  const pin = new THREE.Mesh(new THREE.SphereGeometry(0.08, 14, 12), gold);
  pin.position.z = 0.06;
  watch.add(pin);

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
    watch.rotation.y = Math.sin(t * 0.4 * speed) * 0.45;
    watch.rotation.z = Math.sin(t * 0.7 * speed) * 0.08;
    watch.position.y = Math.sin(t * 0.9 * speed) * 0.06;
    minuteHand.rotation.z = -t * 0.7 * speed;
    hourHand.rotation.z = -t * 0.06 * speed;
    secondHand.rotation.z = -(t * 4.4 * speed) + Math.sin(t * 9 * speed) * 0.02;
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
