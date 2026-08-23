import * as THREE from 'three';

export interface MeteorShowerOptions {
  count?: number;
  colors?: string[];
}

export function createMeteorShower(
  container: HTMLElement,
  options: MeteorShowerOptions = {},
): () => void {
  const { count = 26, colors = ['#a78bfa', '#22d3ee', '#fbbf24'] } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.set(0, 2, 16);

  let seed = 314159;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Meteor {
    head: THREE.Mesh;
    trail: THREE.Line;
    vel: THREE.Vector3;
    life: number;
    maxLife: number;
    active: boolean;
  }
  const meteors: Meteor[] = [];
  const headGeo = new THREE.SphereGeometry(0.09, 8, 8);
  for (let i = 0; i < count; i++) {
    const color = colors[i % colors.length];
    const head = new THREE.Mesh(headGeo, new THREE.MeshBasicMaterial({ color }));
    head.visible = false;
    scene.add(head);

    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(40 * 3), 3));
    const trail = new THREE.Line(
      trailGeo,
      new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      }),
    );
    trail.visible = false;
    scene.add(trail);
    meteors.push({
      head,
      trail,
      vel: new THREE.Vector3(),
      life: rand() * 6,
      maxLife: 1.4 + rand() * 1.4,
      active: false,
    });
  }

  function launch(meteor: Meteor) {
    meteor.head.position.set((rand() - 0.5) * 30, 10 + rand() * 6, (rand() - 0.5) * 12 - 4);
    meteor.vel.set(-(4 + rand() * 5), -(5 + rand() * 4), 0).multiplyScalar(0.55 + rand() * 0.5);
    meteor.life = 0;
    meteor.active = true;
    meteor.head.visible = true;
    meteor.trail.visible = true;
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
    const dt = Math.min(clock.getDelta(), 0.05);
    for (const meteor of meteors) {
      if (!meteor.active) {
        meteor.life += dt;
        if (meteor.life > 0.4) launch(meteor);
        continue;
      }
      meteor.life += dt;
      meteor.head.position.addScaledVector(meteor.vel, dt);
      const attr = meteor.trail.geometry.getAttribute('position') as THREE.BufferAttribute;
      for (let j = 39; j > 0; j--) {
        attr.setXYZ(j, attr.getX(j - 1), attr.getY(j - 1), attr.getZ(j - 1));
      }
      attr.setXYZ(0, meteor.head.position.x, meteor.head.position.y, meteor.head.position.z);
      attr.needsUpdate = true;
      if (meteor.life > meteor.maxLife || meteor.head.position.y < -9) {
        meteor.active = false;
        meteor.head.visible = false;
        meteor.trail.visible = false;
        meteor.life = 0;
      }
    }
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    headGeo.dispose();
    for (const meteor of meteors) {
      (meteor.head.material as THREE.Material).dispose();
      meteor.trail.geometry.dispose();
      (meteor.trail.material as THREE.Material).dispose();
    }
    renderer.dispose();
    renderer.domElement.remove();
  };
}
