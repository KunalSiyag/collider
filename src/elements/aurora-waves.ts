import * as THREE from 'three';

/** Aurora Waves — flowing translucent light curtains over a dark field. */
export interface AuroraWavesOptions {
  colorA?: string;
  colorB?: string;
  curtains?: number;
  speed?: number;
}

export function createAuroraWaves(
  container: HTMLElement,
  options: AuroraWavesOptions = {},
): () => void {
  const { colorA = '#4ade80', colorB = '#8b5cf6', curtains = 7, speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 60);
  camera.position.set(0, 1.4, 10);
  camera.lookAt(0, 1.6, 0);

  const geo = new THREE.PlaneGeometry(18, 7, 64, 24);
  const disposables: Array<{ dispose(): void }> = [geo];

  const basePositions = (geo.attributes.position as THREE.BufferAttribute).array.slice();
  const curtainPhases: number[] = [];

  for (let i = 0; i < curtains; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(i % 2 === 0 ? colorA : colorB).lerp(
        new THREE.Color(colorA),
        (i % 3) * 0.25,
      ),
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set((i - curtains / 2) * 1.1, 2 + (i % 3) * 0.5, -i * 0.7);
    mesh.rotation.y = (i % 2 ? 1 : -1) * 0.16;
    scene.add(mesh);
    disposables.push(mat);
    curtainPhases.push(i * 1.7);
  }

  // Starfield backdrop.
  const starGeo = new THREE.BufferGeometry();
  const starCount = 300;
  const pos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 40;
    pos[i * 3 + 1] = Math.random() * 14 - 1;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 6;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const starMat = new THREE.PointsMaterial({ color: 0xdce8ff, size: 0.045, transparent: true, opacity: 0.8 });
  scene.add(new THREE.Points(starGeo, starMat));
  disposables.push(starGeo, starMat);

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
  const positionAttr = geo.attributes.position as THREE.BufferAttribute;

  function tick() {
    raf = requestAnimationFrame(tick);
    const t = clock.getElapsedTime() * speed;

    // Vertex-level wave: each curtain mesh shares the geometry, so bend it
    // once per frame with layered sines and let materials add the color.
    for (let i = 0; i < positionAttr.count; i++) {
      const x = basePositions[i * 3];
      const y = basePositions[i * 3 + 1];
      positionAttr.array[i * 3 + 2] =
        Math.sin(x * 0.5 + t * 1.1) * 0.7 + Math.sin(y * 0.9 + t * 0.7) * 0.45;
    }
    positionAttr.needsUpdate = true;

    // Gentle per-curtain bob using the parallel phase array.
    let curtainIndex = 0;
    scene.children.forEach((child) => {
      if (curtainIndex < curtainPhases.length) {
        child.position.y += Math.sin(t + curtainPhases[curtainIndex]) * 0.0012;
        curtainIndex += 1;
      }
    });

    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    disposables.forEach((d) => d.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
