import * as THREE from 'three';

export interface NewtonsCradleOptions {
  color?: string;
  accentColor?: string;
  balls?: number;
  speed?: number;
}

export function createNewtonsCradle(
  container: HTMLElement,
  options: NewtonsCradleOptions = {},
): () => void {
  const { color = '#c9c4d8', accentColor = '#22d3ee', balls = 5, speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.4, 0.8, 5.6);
  camera.lookAt(0, -0.2, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.5);
  key.position.set(3, 7, 6);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 1, -3);
  scene.add(rim);

  const chromeMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.98,
    roughness: 0.06,
    envMapIntensity: 1,
  });
  const frameMat = new THREE.MeshStandardMaterial({ color: '#241b33', metalness: 0.5, roughness: 0.45 });
  const stringMat = new THREE.LineBasicMaterial({ color: 0x8a93a8 });

  // Frame: two side rails and top bar
  const W = (balls - 1) * 0.62 + 0.9;
  const topBar = new THREE.Mesh(new THREE.BoxGeometry(W + 0.6, 0.12, 0.12), frameMat);
  topBar.position.y = 2.05;
  scene.add(topBar);
  for (const side of [-1, 1]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 2.4), frameMat);
    rail.position.set(side * (W / 2 + 0.3), 2.05, 0.55);
    scene.add(rail);
    const legGeo = new THREE.CylinderGeometry(0.05, 0.07, 2.1, 10);
    for (const zSide of [-1, 1]) {
      const leg = new THREE.Mesh(legGeo, frameMat);
      leg.position.set(side * (W / 2 + 0.3), 1.0, zSide * 1.1);
      scene.add(leg);
    }
  }

  const R = 0.28;
  interface Ball { pivot: THREE.Group; index: number }
  const ballPivots: Ball[] = [];
  for (let i = 0; i < balls; i++) {
    const x = (i - (balls - 1) / 2) * 0.62;
    const pivot = new THREE.Group();
    pivot.position.set(x, 2.02, 0);
    scene.add(pivot);

    for (const [zs, xs] of [[-0.35, 0], [0.35, 0]] as const) {
      const strGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(xs, 0, zs),
        new THREE.Vector3(0, -1.68, 0),
      ]);
      pivot.add(new THREE.Line(strGeo, stringMat));
    }
    const ball = new THREE.Mesh(new THREE.SphereGeometry(R, 26, 20), chromeMat);
    ball.position.y = -1.72;
    pivot.add(ball);
    ballPivots.push({ pivot, index: i });
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
    // Idealized pendulum transfer: left ball swings out while right stays
    const omega = 2.4 * speed;
    const swingA = Math.sin(t * omega) * 0.62 * Math.exp(-Math.abs(Math.sin(t * omega)) * 0.15);
    const first = ballPivots[0];
    const last = ballPivots[ballPivots.length - 1];
    if (Math.sin(t * omega) >= 0) {
      first.pivot.rotation.z = swingA;
      last.pivot.rotation.z = 0;
    } else {
      last.pivot.rotation.z = swingA;
      first.pivot.rotation.z = 0;
    }
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
        obj.geometry.dispose();
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((m) => m.dispose());
      }
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
