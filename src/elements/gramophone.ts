import * as THREE from 'three';

export interface GramophoneOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createGramophone(
  container: HTMLElement,
  options: GramophoneOptions = {},
): () => void {
  const { color = '#8b5cf6', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(2.6, 1.6, 4.6);
  camera.lookAt(0, 0.4, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.3);
  key.position.set(4, 6, 5);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const gram = new THREE.Group();
  scene.add(gram);

  // Wooden case
  const woodMat = new THREE.MeshPhysicalMaterial({ color: '#5b4632', roughness: 0.55, clearcoat: 0.4 });
  const caseBox = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.85, 1.7), woodMat);
  caseBox.position.y = -1.15;
  gram.add(caseBox);

  // Spinning record platter on top
  const platter = new THREE.Group();
  platter.position.y = -0.68;
  gram.add(platter);
  const disc = new THREE.Mesh(
    new THREE.CylinderGeometry(0.62, 0.62, 0.05, 40),
    new THREE.MeshStandardMaterial({ color: '#10101a', roughness: 0.3 }),
  );
  platter.add(disc);
  const label = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 0.06, 24),
    new THREE.MeshStandardMaterial({ color: new THREE.Color(accentColor), emissive: new THREE.Color(accentColor), emissiveIntensity: 0.3 }),
  );
  label.position.y = 0.01;
  platter.add(label);

  // Crank handle
  const crankArm = new THREE.Group();
  crankArm.position.set(0.9, -1.15, 0);
  gram.add(crankArm);
  const armBar = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.05, 0.05), new THREE.MeshStandardMaterial({ color: '#d4af6a', metalness: 0.9, roughness: 0.25 }));
  crankArm.add(armBar);
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), armBar.material);
  knob.position.x = 0.16;
  crankArm.add(knob);

  // Tone arm
  const brassMat = new THREE.MeshStandardMaterial({ color: '#d4af6a', metalness: 0.92, roughness: 0.22 });
  const toneCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.75, -0.62, 0),
    new THREE.Vector3(-0.35, -0.52, 0.28),
    new THREE.Vector3(0.12, -0.56, 0.42),
  ]);
  const tonearm = new THREE.Mesh(new THREE.TubeGeometry(toneCurve, 24, 0.032, 10), brassMat);
  gram.add(tonearm);
  const needleHead = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 10), brassMat);
  needleHead.position.set(0.16, -0.57, 0.44);
  gram.add(needleHead);

  // Horn: flared lathe bell
  const hornProfile: THREE.Vector2[] = [
    new THREE.Vector2(0.06, 0),
    new THREE.Vector2(0.09, 0.28),
    new THREE.Vector2(0.13, 0.6),
    new THREE.Vector2(0.22, 0.95),
    new THREE.Vector2(0.38, 1.25),
    new THREE.Vector2(0.58, 1.48),
    new THREE.Vector2(0.72, 1.56),
    new THREE.Vector2(0.74, 1.64),
    new THREE.Vector2(0.66, 1.66),
  ];
  const hornMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    metalness: 0.85,
    roughness: 0.25,
    clearcoat: 0.5,
    side: THREE.DoubleSide,
  });
  const horn = new THREE.Mesh(new THREE.LatheGeometry(hornProfile, 44), hornMat);
  horn.rotation.z = Math.PI / 2.6;
  horn.position.set(0.35, -0.45, 0.35);
  gram.add(horn);

  // Music notes floating from the bell
  interface Note { mesh: THREE.Group; phase: number }
  const notes: Note[] = [];
  for (let i = 0; i < 6; i++) {
    const noteShape = new THREE.Shape();
    noteShape.absellipse(0, 0, 0.08, 0.055, 0, Math.PI * 2);
    const stem = new THREE.Path();
    stem.moveTo(0.075, 0);
    stem.lineTo(0.075, 0.22);
    noteShape.holes = [];
    const noteGeo = new THREE.ExtrudeGeometry(noteShape, { depth: 0.02, bevelEnabled: false });
    const noteMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(i % 2 ? accentColor : '#e9e4f5'),
      transparent: true,
      opacity: 0.85,
    });
    const noteMesh = new THREE.Mesh(noteGeo, noteMat);
    // Stem as a thin box
    const stemBox = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.22, 0.014), noteMat);
    stemBox.position.set(0.075, 0.11, 0.01);
    const holder = new THREE.Group();
    holder.add(noteMesh);
    holder.add(stemBox);
    gram.add(holder);
    notes.push({ mesh: holder, phase: i * 0.8 });
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
    gram.rotation.y = t * 0.4 * speed;
    platter.rotation.y += 0.09 * speed;
    crankArm.rotation.x += 0.06 * speed;
    gram.position.y = Math.sin(t * 1.0 * speed) * 0.04;
    for (const n of notes) {
      const phase = (t * 0.5 * speed + n.phase) % 1;
      n.mesh.position.set(
        1.1 + Math.sin(phase * Math.PI) * 0.4 + phase,
        1.1 + phase * 1.3,
        0.9 + Math.cos(phase * 4 + n.phase) * 0.2,
      );
      n.mesh.scale.setScalar(0.6 + phase * 0.7);
      ((n.mesh.children[0] as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity =
        0.85 * (1 - phase);
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
