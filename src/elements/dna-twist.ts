import * as THREE from 'three';

export interface DnaTwistOptions {
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createDnaTwist(
  container: HTMLElement,
  options: DnaTwistOptions = {},
): () => void {
  const { color = '#22d3ee', accentColor = '#f472b6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 60);
  camera.position.set(2.6, 0.6, 5.2);
  camera.lookAt(0, -0.4, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.3);
  key.position.set(4, 6, 6);
  scene.add(key);
  const rim = new THREE.PointLight(new THREE.Color(accentColor), 26);
  rim.position.set(-4, -1, -3);
  scene.add(rim);

  const helix = new THREE.Group();
  scene.add(helix);

  // Two sugar-phosphate backbones
  function backbonePath(phase: number): THREE.CatmullRomCurve3 {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 80; i++) {
      const u = i / 80;
      pts.push(new THREE.Vector3(
        Math.cos(u * Math.PI * 7 + phase) * 0.85,
        (u - 0.5) * 6.2,
        Math.sin(u * Math.PI * 7 + phase) * 0.85,
      ));
    }
    return new THREE.CatmullRomCurve3(pts);
  }
  const strandA = new THREE.Mesh(
    new THREE.TubeGeometry(backbonePath(0), 140, 0.055, 10),
    new THREE.MeshStandardMaterial({ color: new THREE.Color(color), metalness: 0.6, roughness: 0.25, emissive: new THREE.Color(color), emissiveIntensity: 0.25 }),
  );
  const strandB = new THREE.Mesh(
    new THREE.TubeGeometry(backbonePath(Math.PI), 140, 0.055, 10),
    new THREE.MeshStandardMaterial({ color: new THREE.Color(accentColor), metalness: 0.6, roughness: 0.25, emissive: new THREE.Color(accentColor), emissiveIntensity: 0.25 }),
  );
  helix.add(strandA, strandB);

  // Base-pair rungs
  const baseColors = ['#8b5cf6', '#a78bfa', '#ffd9a0', '#e9e4f5'];
  interface Rung { mesh: THREE.Group; u: number; phase: number }
  const rungs: Rung[] = [];
  const RUNGS = 22;
  for (let i = 0; i < RUNGS; i++) {
    const u = (i + 0.5) / RUNGS;
    const angle = u * Math.PI * 7;
    const y = (u - 0.5) * 6.2;
    const g = new THREE.Group();
    g.position.y = y;

    for (const side of [-1, 1]) {
      const halfLen = Math.abs(Math.cos(angle)) * 0.85;
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.085, 12, 10),
        new THREE.MeshStandardMaterial({
          color: new THREE.Color(baseColors[(i + (side > 0 ? 0 : 2)) % 4]),
          emissive: new THREE.Color(baseColors[(i + (side > 0 ? 0 : 2)) % 4]),
          emissiveIntensity: 0.3,
          roughness: 0.35,
        }),
      );
      node.position.x = side * halfLen;
      node.position.z = Math.sin(angle) * side * 0;
      node.position.set(side * Math.cos(angle) * 0.85, 0, side * Math.sin(angle) * 0.85);
      g.add(node);
    }
    const rungBar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.028, 0.028, Math.abs(Math.cos(angle)) * 1.7, 8),
      new THREE.MeshStandardMaterial({ color: '#c9c4d8', metalness: 0.7, roughness: 0.35, transparent: true, opacity: 0.85 }),
    );
    rungBar.rotation.z = Math.PI / 2;
    g.rotation.y = -angle;
    g.add(rungBar);
    helix.add(g);
    rungs.push({ mesh: g, u, phase: angle });
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
    helix.rotation.y = t * 0.55 * speed;
    helix.rotation.z = Math.sin(t * 0.4 * speed) * 0.15;
    helix.position.y = Math.sin(t * 0.8 * speed) * 0.07 - 0.2;
    for (let i = 0; i < rungs.length; i++) {
      const r = rungs[i];
      const glow = 0.2 + Math.abs(Math.sin(t * 1.6 * speed - r.u * 6)) * 0.5;
      ((r.mesh.children[0] as THREE.Mesh).material as THREE.MeshStandardMaterial).emissiveIntensity = glow;
      ((r.mesh.children[1] as THREE.Mesh).material as THREE.MeshStandardMaterial).emissiveIntensity = glow;
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
