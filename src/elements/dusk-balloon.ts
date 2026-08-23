import * as THREE from 'three';

export interface DuskBalloonOptions {
  accentColor?: string;
}

export function createDuskBalloon(
  container: HTMLElement,
  options: DuskBalloonOptions = {},
): () => void {
  const { accentColor = '#f472b6' } = options;
  let seed = 4213;
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
  scene.fog = new THREE.Fog(0x1a1230, 18, 70);
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
  camera.position.set(0, 1, 16);

  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(90, 24, 16),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: { uTop: { value: new THREE.Color('#0b0b10') }, uMid: { value: new THREE.Color('#4a2560') }, uBot: { value: new THREE.Color('#c2447a') } },
      vertexShader: `varying float vY; void main(){ vY=normalize(position).y; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
      fragmentShader: `uniform vec3 uTop; uniform vec3 uMid; uniform vec3 uBot; varying float vY;
        void main(){ float h=vY*0.5+0.5;
          vec3 col=h<0.5? mix(uBot,uMid,h*2.0) : mix(uMid,uTop,(h-0.5)*2.0);
          gl_FragColor=vec4(col,1.0);} `,
    }),
  );
  scene.add(sky);

  const sun = new THREE.Mesh(
    new THREE.CircleGeometry(4.5, 48),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor), transparent: true, opacity: 0.9, fog: false }),
  );
  sun.position.set(-10, -2, -60);
  scene.add(sun);

  const envelopeColors = ['#8b5cf6', '#f472b6', '#22d3ee', '#a78bfa'];
  const balloons: THREE.Group[] = [];
  for (let i = 0; i < 7; i++) {
    const g = new THREE.Group();
    const scale = 0.7 + rand() * 0.9;
    const col = envelopeColors[i % envelopeColors.length];
    const envMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(col), roughness: 0.65, emissive: new THREE.Color(col), emissiveIntensity: 0.28 });
    const env = new THREE.Mesh(new THREE.SphereGeometry(1.6, 20, 16), envMat);
    env.scale.set(1, 1.25, 1);
    g.add(env);
    const basket = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.45, 0.55),
      new THREE.MeshStandardMaterial({ color: 0x4a3620, roughness: 0.9 }),
    );
    basket.position.y = -2.6;
    g.add(basket);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x1b1428, transparent: true, opacity: 0.8 });
    for (const sx of [-0.3, 0.3]) {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(sx, -2.38, sx),
        new THREE.Vector3(0, -1.85, 0),
      ]);
      g.add(new THREE.Line(geo, lineMat));
    }
    const lamp = new THREE.PointLight(0xffb86b, 6, 8);
    lamp.position.y = -2.4;
    g.add(lamp);
    const dist = 6 + rand() * 14;
    g.position.set((rand() - 0.5) * 24, -3 + rand() * 10, -rand() * 26);
    g.scale.setScalar(scale);
    g.userData = { baseX: g.position.x, baseY: g.position.y, phase: rand() * Math.PI * 2, speed: 0.15 + rand() * 0.2 };
    balloons.push(g);
    scene.add(g);
  }

  scene.add(new THREE.DirectionalLight(0xff9d76, 1.8));
  scene.add(new THREE.AmbientLight(0x40284e, 1.6));

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
    balloons.forEach((g) => {
      g.position.y = g.userData.baseY + Math.sin(t * 0.4 + g.userData.phase) * 0.7;
      g.position.x = g.userData.baseX + Math.sin(t * g.userData.speed + g.userData.phase) * 2;
      g.rotation.z = Math.cos(t * 0.4 + g.userData.phase) * 0.04;
    });
    camera.position.x = Math.sin(t * 0.06) * 2;
    camera.lookAt(0, 1, -8);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [sky, sun].forEach((o) => o.geometry.dispose());
    scene.traverse((o) => {
      if (o instanceof THREE.Line || o instanceof THREE.Mesh || o instanceof THREE.Points) {
        if (o.geometry !== sky.geometry && o.geometry !== sun.geometry) o.geometry.dispose();
      }
    });
    scene.traverse((o) => {
      if ('material' in o && o.material instanceof THREE.Material) o.material.dispose();
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
