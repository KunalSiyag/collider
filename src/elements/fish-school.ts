import * as THREE from 'three';

export interface FishSchoolOptions {
  count?: number;
  accentColor?: string;
}

export function createFishSchool(container: HTMLElement, options: { count?: number; accentColor?: string } = {}): () => void {
  const { count = 220, accentColor = '#22d3ee' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#030a12', 8, 30);
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 50);
  camera.position.set(0, 0, 14);

  let seed = 65537;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const geometry = new THREE.ConeGeometry(0.09, 0.34, 5);
  const material = new THREE.MeshStandardMaterial({
    color: '#9fd3e8',
    emissive: accentColor,
    emissiveIntensity: 0.25,
    roughness: 0.4,
    metalness: 0.4,
  });
  const instanced = new THREE.InstancedMesh(geometry, material, count);

  interface Boid {
    pos: THREE.Vector3;
    vel: THREE.Vector3;
  }
  const boids: Boid[] = [];
  for (let i = 0; i < count; i++) {
    boids.push({
      pos: new THREE.Vector3((rand() - 0.5) * 14, (rand() - 0.5) * 8, (rand() - 0.5) * 6),
      vel: new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize().multiplyScalar(1.5),
    });
  }

  scene.add(instanced);
  scene.add(new THREE.AmbientLight('#28425c', 2.4));
  const light = new THREE.DirectionalLight('#bfe8ff', 1.2);
  light.position.set(-4, 6, 4);
  scene.add(light);

  const dummy = new THREE.Object3D();
  const cohesion = new THREE.Vector3();
  const separation = new THREE.Vector3();
  const alignment = new THREE.Vector3();

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
    const dt = Math.min(clock.getDelta(), 0.05);
    for (let i = 0; i < count; i++) {
      const boid = boids[i];
      cohesion.set(0, 0, 0);
      separation.set(0, 0, 0);
      alignment.set(0, 0, 0);
      let neighbors = 0;
      for (let j = 0; j < count; j += 3) {
        if (j === i) continue;
        const other = boids[j];
        const dist = boid.pos.distanceTo(other.pos);
        if (dist < 2.4) {
          cohesion.add(other.pos);
          alignment.add(other.vel);
          if (dist < 0.9) separation.add(boid.pos.clone().sub(other.pos).divideScalar(dist));
          neighbors++;
        }
      }
      if (neighbors > 0) {
        cohesion.divideScalar(neighbors).sub(boid.pos).multiplyScalar(0.35);
        alignment.divideScalar(neighbors).sub(boid.vel).multiplyScalar(0.8);
        boid.vel.addScaledVector(cohesion, dt);
        boid.vel.addScaledVector(alignment, dt);
        boid.vel.addScaledVector(separation, dt * 4);
      }
      if (boid.pos.length() > 10) boid.vel.addScaledVector(boid.pos.clone().negate().normalize(), dt * 4);
      const speed = boid.vel.length();
      if (speed > 3.2) boid.vel.multiplyScalar(3.2 / speed);
      if (speed < 1.1) boid.vel.multiplyScalar(1.1 / speed);
      boid.pos.addScaledVector(boid.vel, dt);
      dummy.position.copy(boid.pos);
      dummy.lookAt(boid.pos.clone().add(boid.vel));
      dummy.rotateX(Math.PI / 2);
      dummy.updateMatrix();
      instanced.setMatrixAt(i, dummy.matrix);
    }
    instanced.instanceMatrix.needsUpdate = true;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
