import * as THREE from 'three';

export interface WireframeGlobeOptions {
  color?: string;
  accentColor?: string;
  dots?: number;
  arcs?: number;
  speed?: number;
}

function fibonacciSphere(count: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push(
      new THREE.Vector3(Math.cos(theta) * radiusAtY, y, Math.sin(theta) * radiusAtY),
    );
  }
  return points;
}

export function createWireframeGlobe(
  container: HTMLElement,
  options: WireframeGlobeOptions = {},
): () => void {
  const {
    color = '#a78bfa',
    accentColor = '#22d3ee',
    dots = 900,
    arcs = 14,
    speed = 0.25,
  } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0.6, 4.4);
  camera.lookAt(0, 0, 0);

  const group = new THREE.Group();
  scene.add(group);

  const spherePoints = fibonacciSphere(dots);
  const dotGeometry = new THREE.BufferGeometry().setFromPoints(spherePoints);
  const dotMaterial = new THREE.PointsMaterial({
    color: new THREE.Color(color),
    size: 0.022,
    transparent: true,
    opacity: 0.75,
    depthWrite: false,
  });
  group.add(new THREE.Points(dotGeometry, dotMaterial));

  const arcMaterials: THREE.LineDashedMaterial[] = [];
  for (let i = 0; i < arcs; i++) {
    const start = spherePoints[Math.floor(Math.random() * spherePoints.length)];
    let end = spherePoints[Math.floor(Math.random() * spherePoints.length)];
    if (start === end) end = spherePoints[(spherePoints.indexOf(end) + 7) % spherePoints.length];

    const mid = start
      .clone()
      .add(end)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(1 + start.distanceTo(end) * 0.35);

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(48));

    const material = new THREE.LineDashedMaterial({
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0.85,
      dashSize: 0.12,
      gapSize: 0.1,
      depthWrite: false,
    });
    const line = new THREE.Line(geometry, material);
    line.computeLineDistances();
    group.add(line);
    arcMaterials.push(material);
  }

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width === 0 || height === 0) return;
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
    group.rotation.y = t * speed;

    for (let i = 0; i < arcMaterials.length; i++) {
      arcMaterials[i].scale =
        0.5 +
        ((t * 2 + i * 0.37) % 1) * 2.5;
    }

    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    dotGeometry.dispose();
    dotMaterial.dispose();
    group.traverse((object) => {
      if (object instanceof THREE.Line) {
        object.geometry.dispose();
        (object.material as THREE.Material).dispose();
      }
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
