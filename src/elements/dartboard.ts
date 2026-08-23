import * as THREE from 'three';

export interface DartboardOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createDartboard(
  container: HTMLElement,
  options: DartboardOptions = {},
): () => void {
  const { color = '#e9e4f5', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(0.5, -0.3, 4.8);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.3);
  keyLight.position.set(3, 5, 6);
  scene.add(keyLight);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 2, -2);
  scene.add(rim);

  const boardGroup = new THREE.Group();
  scene.add(boardGroup);

  // Cabinet backboard
  const backMat = new THREE.MeshStandardMaterial({ color: '#241b33', roughness: 0.7 });
  const backboard = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.6, 0.18), backMat);
  backboard.position.z = -0.12;
  boardGroup.add(backboard);
  for (const [x, y] of [[-1.1, 1.1], [1.1, 1.1], [-1.1, -1.1], [1.1, -1.1]] as const) {
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 10), new THREE.MeshStandardMaterial({ color: '#d4af6a', metalness: 0.9, roughness: 0.25 }));
    knob.position.set(x, y, 0.02);
    boardGroup.add(knob);
  }

  // Segmented rings
  const segColors = ['#17121f', '#e9dcc3', '#8b5cf6', '#22d3ee'];
  const radii = [
    [0.16, 0.42], // bull ring to outer bull... built as ring segments below
  ];
  const SEGMENTS = 20;
  const ringDefs: Array<[number, number, number]> = [
    [0.14, 0.38, 0], // doubles outer? simplified bands: (innerR, outerR, colorIdx)
    [0.40, 0.64, 1],
    [0.66, 0.92, 0],
    [0.94, 1.18, 1],
  ];
  for (const [r0, r1, ci] of ringDefs) {
    for (let s = 0; s < SEGMENTS; s++) {
      const a0 = (s / SEGMENTS) * Math.PI * 2 + Math.PI / SEGMENTS;
      const a1 = ((s + 1) / SEGMENTS) * Math.PI * 2 + Math.PI / SEGMENTS;
      const shape = new THREE.Shape();
      shape.absarc(0, 0, r1, a0, a1, false);
      shape.absarc(0, 0, r0, a1, a0, true);
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(s % 2 === 0 ? segColors[ci] : segColors[ci === 0 || ci === 2 ? ci + 1 : ci - 1]),
        roughness: 0.7,
      });
      const segMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 0.05, bevelEnabled: false }), mat);
      segMesh.position.z = 0.03;
      boardGroup.add(segMesh);
    }
  }
  // Double and triple rings in accent colors
  for (const [rMid] of [[0.51], [1.06]]) {
    for (let s = 0; s < SEGMENTS; s++) {
      const a0 = (s / SEGMENTS) * Math.PI * 2 + Math.PI / SEGMENTS;
      const a1 = ((s + 1) / SEGMENTS) * Math.PI * 2 + Math.PI / SEGMENTS;
      const shape = new THREE.Shape();
      shape.absarc(0, 0, rMid + 0.06, a0, a1, false);
      shape.absarc(0, 0, rMid - 0.06, a1, a0, true);
      const mat = new THREE.MeshBasicMaterial({
        color: s % 2 === 0 ? new THREE.Color(accentColor) : new THREE.Color('#22d3ee'),
      });
      const segMesh = new THREE.Mesh(new THREE.ShapeGeometry(shape), mat);
      segMesh.position.z = 0.085;
      boardGroup.add(segMesh);
    }
  }
  // Bullseyes
  const outerBullMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor) });
  const outerBull = new THREE.Mesh(new THREE.CircleGeometry(0.15, 28), outerBullMat);
  outerBull.position.z = 0.085;
  boardGroup.add(outerBull);
  const innerBull = new THREE.Mesh(new THREE.CircleGeometry(0.07, 22), new THREE.MeshBasicMaterial({ color: '#ffd9a0' }));
  innerBull.position.z = 0.09;
  boardGroup.add(innerBull);
  void radii; void color;

  // Darts sticking out with quivering
  interface Dart { group: THREE.Group; phase: number }
  const darts: Dart[] = [];
  const rand = (() => {
    let s = 9090 >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  })();
  const shaftMat = new THREE.MeshStandardMaterial({ color: '#c9c4d8', metalness: 0.9, roughness: 0.2 });
  for (let i = 0; i < 3; i++) {
    const g = new THREE.Group();
    const a = rand() * Math.PI * 2;
    const r = 0.25 + rand() * 0.85;
    g.position.set(Math.cos(a) * r, Math.sin(a) * r, 0.09);
    g.rotation.x = -Math.PI / 2 - 0.35;
    g.rotation.z = a;
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.015, 0.09, 6), shaftMat);
    tip.rotation.x = Math.PI / 2;
    tip.position.z = 0.045;
    g.add(tip);
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.017, 0.017, 0.34, 8), shaftMat);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.z = 0.26;
    g.add(barrel);
    const flightShape = new THREE.Shape();
    flightShape.moveTo(0, 0);
    flightShape.lineTo(0.11, 0.13);
    flightShape.lineTo(-0.02, 0.19);
    flightShape.lineTo(-0.11, 0.06);
    flightShape.lineTo(0, 0);
    const flightMat = new THREE.MeshBasicMaterial({
      color: i % 2 ? new THREE.Color(accentColor) : new THREE.Color('#22d3ee'),
      side: THREE.DoubleSide,
    });
    const flight = new THREE.Mesh(new THREE.ShapeGeometry(flightShape), flightMat);
    flight.position.set(0, -0.09, 0.44);
    g.add(flight);
    boardGroup.add(g);
    darts.push({ group: g, phase: rand() * 10 });
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
    boardGroup.rotation.y = Math.sin(t * 0.3 * speed) * 0.3;
    for (const d of darts) {
      d.group.rotation.y = Math.sin(t * 14 * speed + d.phase) * 0.02 * Math.exp(-((t * 0.4 + d.phase) % 3));
    }
    outerBullMat.color.setHSL(0.95, 0.7, 0.55 + Math.sin(t * 2.4 * speed) * 0.1);
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
