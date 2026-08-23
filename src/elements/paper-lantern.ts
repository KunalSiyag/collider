import * as THREE from 'three';

export interface PaperLanternOptions {
  color?: string;
  accentColor?: string;
  count?: number;
  speed?: number;
}

export function createPaperLantern(
  container: HTMLElement,
  options: PaperLanternOptions = {},
): () => void {
  const { color = '#f472b6', accentColor = '#8b5cf6', count = 5, speed = 1 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
  camera.position.set(1.2, 0.4, 5.4);
  camera.lookAt(0, -0.3, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.35));
  const cool = new THREE.PointLight(new THREE.Color(accentColor), 18);
  cool.position.set(-4, 2, -2);
  scene.add(cool);

  const rand = (() => {
    let s = 84848 >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  })();

  // Hanging cord
  const cordMat = new THREE.MeshStandardMaterial({ color: 0x554466, roughness: 0.7 });
  const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 5.6, 6), cordMat);
  cord.position.y = 2.8;
  scene.add(cord);

  interface Lantern {
    group: THREE.Group;
    bulb: THREE.PointLight;
    glowMat: THREE.MeshBasicMaterial;
    baseY: number;
    phase: number;
    swayR: number;
  }
  const lanterns: Lantern[] = [];
  for (let i = 0; i < count; i++) {
    const hue = i % 2 === 0 ? color : accentColor;
    const g = new THREE.Group();

    // Ribbed paper body via lathe with soft bulge
    const R = 0.34 + rand() * 0.12;
    const H = 0.62 + rand() * 0.3;
    const profile: THREE.Vector2[] = [];
    for (let j = 0; j <= 10; j++) {
      const u = j / 10;
      profile.push(new THREE.Vector2(R * (0.35 + Math.sin(u * Math.PI) * 0.75), (u - 0.5) * H));
    }
    const paperMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(hue),
      transparent: true,
      opacity: 0.85,
    });
    const body = new THREE.Mesh(new THREE.LatheGeometry(profile, 24), paperMat);
    g.add(body);

    // Ribs
    const ribMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.25 });
    for (let r = 0; r < 6; r++) {
      const y = (r / 5 - 0.5) * H * 0.92;
      const rr = R * (0.35 + Math.sin(((y / H) + 0.5) * Math.PI) * 0.75);
      const rib = new THREE.Mesh(new THREE.TorusGeometry(rr, 0.006, 6, 28), ribMat);
      rib.rotation.x = Math.PI / 2;
      rib.position.y = y;
      g.add(rib);
    }

    // Caps and tassel
    const capMat = new THREE.MeshStandardMaterial({ color: 0x241b33, roughness: 0.5 });
    const capTop = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.32, R * 0.38, 0.06, 16), capMat);
    capTop.position.y = H / 2 + 0.03;
    g.add(capTop);
    const capBot = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.38, R * 0.3, 0.06, 16), capMat);
    capBot.position.y = -H / 2 - 0.03;
    g.add(capBot);
    const tasselCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -H / 2 - 0.06, 0),
      new THREE.Vector3(0.03, -H / 2 - 0.2, 0),
      new THREE.Vector3(0, -H / 2 - 0.32, 0),
    ]);
    const tassel = new THREE.Mesh(new THREE.TubeGeometry(tasselCurve, 12, 0.015, 6), capMat);
    g.add(tassel);

    const bulb = new THREE.PointLight(new THREE.Color(hue), 6, 4);
    bulb.position.y = 0;
    g.add(bulb);

    const x = (i - (count - 1) / 2) * 1.05 + (rand() - 0.5) * 0.2;
    const y = -0.2 - rand() * 1.4;
    g.position.set(x, y, (rand() - 0.5) * 0.6);
    scene.add(g);
    lanterns.push({ group: g, bulb, glowMat: paperMat, baseY: y, phase: rand() * Math.PI * 2, swayR: 0.08 + rand() * 0.1 });
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
    for (const l of lanterns) {
      l.group.rotation.y = t * 0.4 * speed + l.phase;
      l.group.rotation.z = Math.sin(t * 0.9 * speed + l.phase) * l.swayR;
      l.group.position.x += Math.sin(t * 0.9 * speed + l.phase) * 0.0015;
      l.bulb.intensity = 5 + Math.sin(t * 2.2 * speed + l.phase) * 1.6;
      (l.glowMat.color as THREE.Color).offsetHSL(0, 0, Math.sin(t * 2.2 * speed + l.phase) * 0.02);
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
