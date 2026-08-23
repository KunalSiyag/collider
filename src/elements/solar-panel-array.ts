import * as THREE from 'three';

export interface SolarPanelArrayOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createSolarPanelArray(
  container: HTMLElement,
  options: SolarPanelArrayOptions = {},
): () => void {
  const { color = '#1e3a6e', accentColor = '#22d3ee', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 60);
  camera.position.set(4.2, 2.8, 5.4);
  camera.lookAt(0, -0.5, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  // Traveling sun
  const sun = new THREE.DirectionalLight(0xfff2d9, 2.8);
  scene.add(sun);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 22);
  rim.position.set(-4, 1, -4);
  scene.add(rim);

  const array = new THREE.Group();
  scene.add(array);

  const frameMat = new THREE.MeshStandardMaterial({ color: '#8a93a8', metalness: 0.7, roughness: 0.35 });
  const cellMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    metalness: 0.55,
    roughness: 0.12,
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.08,
  });
  const gridMat = new THREE.MeshBasicMaterial({ color: '#0c1024', transparent: true, opacity: 0.85 });

  interface Panel { group: THREE.Group; index: number }
  const panels: Panel[] = [];
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) {
      const g = new THREE.Group();

      // Stand
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.5, 10), frameMat);
      post.position.y = -0.25;
      g.add(post);

      // Tilting panel face
      const tilt = new THREE.Group();
      tilt.position.y = 0.05;
      g.add(tilt);
      const panelGeo = new THREE.BoxGeometry(1.35, 0.05, 0.95);
      const panel = new THREE.Mesh(panelGeo, cellMat);
      tilt.add(panel);
      // Grid lines on top
      for (let gx = -2; gx <= 2; gx++) {
        const line = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.01, 0.92), gridMat);
        line.position.set(gx * 0.26, 0.031, 0);
        tilt.add(line);
      }
      for (let gz = -1; gz <= 1; gz++) {
        const line = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.01, 0.02), gridMat);
        line.position.set(0, 0.031, gz * 0.3);
        tilt.add(line);
      }

      g.position.set((col - 1.5) * 1.75, (row - 0.5) * -1.1 + 0.15, (row - 0.5) * 1.5);
      array.add(g);
      panels.push({ group: g, index: row * 4 + col });
    }
  }

  // Visible sun marker that the panels follow
  const sunBall = new THREE.Mesh(
    new THREE.SphereGeometry(0.28, 20, 16),
    new THREE.MeshBasicMaterial({ color: '#ffd9a0' }),
  );
  scene.add(sunBall);

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
    // Sun arcs across the sky
    const a = t * 0.35 * speed;
    const sunPos = new THREE.Vector3(Math.cos(a) * 7, Math.sin(a * 0.7) * 4 + 1.5, -3);
    sun.position.copy(sunPos);
    sunBall.position.copy(sunPos).multiplyScalar(0.45);

    array.rotation.y = Math.sin(t * 0.18 * speed) * 0.25;

    // Panels track the sun
    for (const p of panels) {
      const local = p.group.getWorldPosition(new THREE.Vector3());
      const dir = sunPos.clone().sub(local).normalize();
      const targetTiltX = Math.atan2(dir.y, Math.sqrt(dir.x * dir.x + dir.z * dir.z)) * -1;
      const targetRotY = Math.atan2(dir.x, dir.z);
      p.group.children[1].rotation.x += (targetTiltX - p.group.children[1].rotation.x) * 0.04;
      p.group.rotation.y += (targetRotY - p.group.rotation.y) * 0.03;
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
