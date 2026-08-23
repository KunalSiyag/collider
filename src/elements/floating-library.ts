import * as THREE from 'three';

export interface FloatingLibraryOptions {
  accentColor?: string;
}

export function createFloatingLibrary(
  container: HTMLElement,
  options: FloatingLibraryOptions = {},
): () => void {
  const { accentColor = '#a78bfa' } = options;
  let seed = 424242;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0e0b18, 0.035);
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 90);
  camera.position.set(3.4, 1.8, 10);
  camera.lookAt(0, 3, 0);

  const bookGeo = new THREE.BoxGeometry(0.42, 0.6, 0.12);
  const coverColors = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa', '#5d4a8f'];
  const books: { mesh: THREE.Mesh; angle: number; radius: number; height: number; riseSpeed: number; spin: number; phase: number }[] = [];
  for (let i = 0; i < 70; i++) {
    const col = coverColors[Math.floor(rand() * coverColors.length)];
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(col), roughness: 0.7,
      emissive: new THREE.Color(col), emissiveIntensity: rand() * 0.25,
    });
    const book = new THREE.Mesh(bookGeo, mat);
    const angle = rand() * Math.PI * 2;
    const radius = 2 + rand() * 3;
    const height = rand() * 9;
    book.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius - 1);
    book.rotation.set(rand() * 0.6 - 0.3, angle + Math.PI / 2, rand() * 0.5 - 0.25);
    books.push({ mesh: book, angle, radius, height, riseSpeed: 0.15 + rand() * 0.3, spin: 0.2 + rand() * 0.8, phase: rand() * Math.PI * 2 });
    scene.add(book);
  }

  const columnMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(accentColor) } },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `
      uniform float uTime; uniform vec3 uColor; varying vec2 vUv;
      void main(){
        float glow=0.35+0.25*sin(vUv.y*14.0-uTime*2.5)+0.12*sin(vUv.x*20.0+uTime);
        float fade=smoothstep(0.0,0.15,vUv.y)*(1.0-smoothstep(0.7,1.0,vUv.y));
        gl_FragColor=vec4(uColor,glow*fade*0.5);
      }`,
  });
  const column = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.75, 10, 24, 1, true), columnMat);
  column.position.set(0, 4.5, -1);
  scene.add(column);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(16, 40),
    new THREE.MeshStandardMaterial({ color: 0x15101f, roughness: 0.4, metalness: 0.3 }),
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const runeRingGeo = new THREE.TorusGeometry(5.6, 0.03, 8, 80);
  const runeRing = new THREE.Mesh(runeRingGeo, new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor), transparent: true, opacity: 0.5 }));
  runeRing.rotation.x = Math.PI / 2;
  runeRing.position.y = 0.05;
  scene.add(runeRing);

  const coreLight = new THREE.PointLight(new THREE.Color(accentColor), 36, 16);
  coreLight.position.set(0, 4.5, -1);
  scene.add(coreLight);
  scene.add(new THREE.AmbientLight(0x28203c, 1.5));

  function resize() {
    const w = container.clientWidth, h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
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
    columnMat.uniforms.uTime.value = t;
    for (const b of books) {
      b.angle += b.spin * 0.004;
      b.height += b.riseSpeed * 0.006;
      if (b.height > 9.5) b.height = 0;
      b.mesh.position.set(
        Math.cos(b.angle) * b.radius,
        b.height + Math.sin(t * 2 + b.phase) * 0.12,
        Math.sin(b.angle) * b.radius - 1,
      );
      b.mesh.rotation.y = -b.angle + Math.PI / 2;
      b.mesh.rotation.z += 0.002 * Math.sin(t + b.phase);
    }
    runeRing.rotation.z = t * 0.15;
    coreLight.intensity = 30 + Math.sin(t * 2.4) * 10;
    camera.position.x = Math.sin(t * 0.08) * 1.5 + 3.4;
    camera.lookAt(0, 4, -1);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [bookGeo, runeRingGeo].forEach((g) => g.dispose());
    [columnMat, runeRing.material as THREE.Material].forEach((mt) => mt.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
