import * as THREE from 'three';

/** Murmuration Hero — a starling flock wheeling through the sky (boids-lite). */
export interface MurmurationHeroOptions {
  birds?: number;
  color?: string;
  skyColor?: string;
  speed?: number;
}

export function createMurmurationHero(
  container: HTMLElement,
  options: MurmurationHeroOptions = {},
): () => void {
  const { birds = 220, color = '#1d2433', skyColor = '#e8b27d', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 0, 16);

  // Dusk gradient backdrop.
  const skyGeo = new THREE.SphereGeometry(60, 24, 16);
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    uniforms: {
      top: { value: new THREE.Color(skyColor) },
      bottom: { value: new THREE.Color('#3a2a4e') },
    },
    vertexShader: 'varying vec3 vp; void main(){ vp = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader:
      'varying vec3 vp; uniform vec3 top; uniform vec3 bottom; void main(){ float h = normalize(vp).y * .5 + .5; gl_FragColor = vec4(mix(bottom, top, pow(h, 1.4)), 1.0); }',
  });
  scene.add(new THREE.Mesh(skyGeo, skyMat));

  // Each bird: a tiny two-triangle "wing V" whose wings flap.
  const wingGeo = new THREE.BufferGeometry();
  wingGeo.setAttribute(
    'position',
    new THREE.BufferAttribute(
      new Float32Array([0, 0, 0.25, -0.5, 0, -0.2, 0.5, 0, -0.2]),
      3,
    ),
  );
  wingGeo.computeVertexNormals();
  const birdMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(color), side: THREE.DoubleSide });
  const flock: Array<{ mesh: THREE.Mesh; pos: THREE.Vector3; vel: THREE.Vector3; phase: number }> = [];
  const disposables: Array<{ dispose(): void }> = [wingGeo, birdMat, skyGeo, skyMat];

  for (let i = 0; i < birds; i++) {
    const mesh = new THREE.Mesh(wingGeo, birdMat);
    const s = 0.5 + Math.random() * 0.5;
    mesh.scale.setScalar(s);
    scene.add(mesh);
    flock.push({
      mesh,
      pos: new THREE.Vector3((Math.random() - 0.5) * 16, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8),
      vel: new THREE.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 2),
      phase: Math.random() * Math.PI * 2,
    });
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
  const center = new THREE.Vector3();
  const toCenter = new THREE.Vector3();
  const sep = new THREE.Vector3();

  function tick() {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(clock.getDelta(), 0.05) * speed;
    const t = clock.getElapsedTime() * speed;

    // Roaming attractor keeps the flock wheeling in lazy loops.
    center.set(Math.sin(t * 0.22) * 7, Math.sin(t * 0.4) * 2, Math.cos(t * 0.18) * 4);

    for (const b of flock) {
      // Cohesion toward the roaming center + gentle separation + wander.
      toCenter.copy(center).sub(b.pos).normalize().multiplyScalar(2.2);
      sep.set(Math.sin(t * 1.3 + b.phase), Math.cos(t * 0.9 + b.phase), Math.sin(t + b.phase)).multiplyScalar(0.6);
      b.vel.addScaledVector(toCenter, dt).addScaledVector(sep, dt);
      b.vel.clampLength(0, 6);

      b.pos.addScaledVector(b.vel, dt);
      b.mesh.position.copy(b.pos);
      // Face travel direction; flap wings with per-bird phase.
      b.mesh.lookAt(b.pos.x + b.vel.x, b.pos.y + b.vel.y, b.pos.z + b.vel.z);
      b.mesh.rotation.z += Math.sin(t * 9 + b.phase) * 0.5;
    }

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
