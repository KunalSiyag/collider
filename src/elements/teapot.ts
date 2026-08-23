import * as THREE from 'three';

export interface TeapotOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createTeapot(
  container: HTMLElement,
  options: TeapotOptions = {},
): () => void {
  const { color = '#f472b6', accentColor = '#8b5cf6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
  camera.position.set(3.0, 2.2, 3.8);
  camera.lookAt(0, 0.5, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(4, 5, 3);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 30);
  rim.position.set(-3, 2, -3);
  scene.add(rim);

  const group = new THREE.Group();
  scene.add(group);

  const ceramic = new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.18,
    metalness: 0.05,
    clearcoat: 0.8,
    clearcoatRoughness: 0.2,
  });
  const trim = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    metalness: 0.7,
    roughness: 0.25,
  });

  // Body: squashed sphere
  const pot = new THREE.Mesh(new THREE.SphereGeometry(0.85, 40, 28), ceramic);
  pot.scale.set(1.15, 0.85, 1.0);
  pot.position.y = 0.75;
  group.add(pot);

  // Foot
  const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.58, 0.16, 32), ceramic);
  foot.position.y = 0.08;
  group.add(foot);

  // Lid with knob
  const lid = new THREE.Mesh(new THREE.SphereGeometry(0.5, 28, 16, 0, Math.PI * 2, 0, Math.PI / 2.4), ceramic);
  lid.scale.set(1.05, 0.7, 0.92);
  lid.position.y = 1.5;
  group.add(lid);
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 12), trim);
  knob.position.y = 1.82;
  group.add(knob);

  // Spout from a curved tube
  const spoutCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.85, 0.75, 0),
    new THREE.Vector3(1.35, 1.05, 0),
    new THREE.Vector3(1.55, 1.5, 0),
  ]);
  const spout = new THREE.Mesh(new THREE.TubeGeometry(spoutCurve, 20, 0.13, 12), ceramic);
  spout.position.y = 0.1;
  group.add(spout);

  // Handle: half torus
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.08, 12, 40, Math.PI), ceramic);
  handle.position.set(-0.98, 1.0, 0);
  handle.rotation.z = -Math.PI / 2;
  group.add(handle);

  // Steam wisps above spout
  const steamMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.35,
  });
  const puffs: THREE.Mesh[] = [];
  for (let i = 0; i < 4; i++) {
    const puff = new THREE.Mesh(new THREE.SphereGeometry(0.07 + i * 0.02, 10, 10), steamMat);
    puff.position.set(1.55, 1.7, 0);
    group.add(puff);
    puffs.push(puff);
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
    group.rotation.y = Math.sin(t * 0.5 * speed) * 0.7;
    for (let i = 0; i < puffs.length; i++) {
      const phase = (t * 0.7 * speed + i * 0.25) % 1;
      puffs[i].position.y = 1.7 + phase * 1.1;
      puffs[i].position.x = 1.55 + Math.sin(phase * 6 + i) * 0.12;
      puffs[i].scale.setScalar(0.5 + phase);
      (puffs[i].material as THREE.MeshBasicMaterial).opacity = 0.4 * (1 - phase);
    }
    group.position.y = Math.sin(t * 1.1 * speed) * 0.05;
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
