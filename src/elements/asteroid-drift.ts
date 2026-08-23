import * as THREE from 'three';

export interface AsteroidDriftOptions {
  count?: number;
  color?: string;
  accentColor?: string;
  speed?: number;
}

export function createAsteroidDrift(
  container: HTMLElement,
  options: AsteroidDriftOptions = {},
): () => void {
  const { count = 260, color = '#71717a', accentColor = '#8b5cf6', speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#0b0b10', 14, 40);
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.set(0, 4, 12);
  camera.lookAt(0, 0, -4);

  scene.add(new THREE.AmbientLight('#40406a', 1.4));
  const key = new THREE.DirectionalLight('#a78bfa', 2.2);
  key.position.set(-6, 8, 4);
  scene.add(key);

  let seed = 20240817;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const geometry = new THREE.DodecahedronGeometry(0.5, 0);
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.9,
    metalness: 0.15,
    flatShading: true,
  });
  const belt = new THREE.InstancedMesh(geometry, material, count);
  const dummy = new THREE.Object3D();
  type Rock = { r: number; a: number; y: number; s: number; spin: number; tilt: number };
  const rocks: Rock[] = [];
  for (let i = 0; i < count; i++) {
    const r = 6 + rand() * 14;
    rocks.push({
      r,
      a: rand() * Math.PI * 2,
      y: (rand() - 0.5) * 3.2,
      s: 0.25 + rand() * 0.9,
      spin: (rand() - 0.5) * 1.4,
      tilt: rand() * Math.PI,
    });
  }

  const glowMat = new THREE.MeshBasicMaterial({ color: accentColor, transparent: true, opacity: 0.5 });
  const glow = new THREE.Mesh(new THREE.SphereGeometry(0.9, 16, 16), glowMat);
  glow.position.set(-14, 5, -22);
  scene.add(glow);

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
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const rock = rocks[i];
      rock.a += dt * speed * (0.05 + 0.6 / rock.r);
      dummy.position.set(Math.cos(rock.a) * rock.r, rock.y, Math.sin(rock.a) * rock.r - 4);
      dummy.rotation.set(t * rock.spin + rock.tilt, t * rock.spin * 0.7, rock.tilt);
      dummy.scale.setScalar(rock.s);
      dummy.updateMatrix();
      belt.setMatrixAt(i, dummy.matrix);
    }
    belt.instanceMatrix.needsUpdate = true;
    glowMat.opacity = 0.35 + Math.sin(t * 1.3) * 0.15;
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    geometry.dispose();
    material.dispose();
    glow.geometry.dispose();
    glowMat.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
