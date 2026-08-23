import * as THREE from 'three';

export interface AbyssalTrenchOptions {
  accentColor?: string;
}

export function createAbyssalTrench(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#22d3ee' } = options;
  let seed = 66600;
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
  scene.fog = new THREE.FogExp2(0x02060c, 0.07);
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 70);
  camera.position.set(0, 1.5, 10);

  const wallMat = new THREE.MeshStandardMaterial({ color: 0x0a121c, roughness: 1, flatShading: true });
  for (const side of [-1, 1]) {
    for (let i = 0; i < 8; i++) {
      const wallGeo = new THREE.BoxGeometry(2 + rand() * 3, 16 + rand() * 8, 5 + rand() * 4);
      const wall = new THREE.Mesh(wallGeo, wallMat);
      wall.position.set(side * (6 + rand() * 3), rand() * 2, -i * 7 - rand() * 3);
      wall.rotation.z = side * (rand() - 0.5) * 0.14;
      scene.add(wall);
    }
  }

  interface Lure { group: THREE.Group; bulb: THREE.Mesh; phase: number; speed: number; baseY: number }
  const anglers: Lure[] = [];
  const fishMat = new THREE.MeshStandardMaterial({ color: 0x0c141e, roughness: 0.9 });
  for (let i = 0; i < 4; i++) {
    const g = new THREE.Group();
    const bodyGeo = new THREE.SphereGeometry(0.45, 12, 8);
    const body = new THREE.Mesh(bodyGeo, fishMat);
    body.scale.set(1.3, 0.8, 0.6);
    g.add(body);
    const tailGeo = new THREE.ConeGeometry(0.28, 0.6, 6);
    const tail = new THREE.Mesh(tailGeo, fishMat);
    tail.rotation.z = Math.PI / 2;
    tail.position.x = 0.75;
    g.add(tail);
    const stalkGeo = new THREE.CylinderGeometry(0.015, 0.03, 0.8, 5);
    const stalk = new THREE.Mesh(stalkGeo, fishMat);
    stalk.position.set(-0.35, 0.5, 0);
    stalk.rotation.z = 0.6;
    g.add(stalk);
    const bulbMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(i % 2 ? accentColor : '#a78bfa') });
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), bulbMat);
    bulb.position.set(-0.62, 0.88, 0);
    g.add(bulb);
    const lureLight = new THREE.PointLight(new THREE.Color(i % 2 ? accentColor : '#a78bfa'), 6, 4);
    lureLight.position.copy(bulb.position);
    g.add(lureLight);
    const dir = rand() > 0.5 ? 1 : -1;
    g.scale.setScalar(dir);
    g.position.set(dir > 0 ? -8 : 8, (rand() - 0.5) * 6, -rand() * 18);
    scene.add(g);
    anglers.push({ group: g, bulb, phase: rand() * Math.PI * 2, speed: 0.25 + rand() * 0.3, baseY: g.position.y });
  }

  const snowN = 400;
  const marineSnowGeo = new THREE.BufferGeometry();
  const mpos = new Float32Array(snowN * 3);
  for (let i = 0; i < snowN; i++) {
    mpos[i * 3] = (rand() - 0.5) * 22;
    mpos[i * 3 + 1] = rand() * 14 - 6;
    mpos[i * 3 + 2] = (rand() - 0.5) * 26;
  }
  marineSnowGeo.setAttribute('position', new THREE.BufferAttribute(mpos, 3));
  const marineSnow = new THREE.Points(marineSnowGeo, new THREE.PointsMaterial({
    color: 0x8fb8cc, size: 0.05, transparent: true, opacity: 0.45, depthWrite: false,
  }));
  scene.add(marineSnow);

  const faintBeam = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(accentColor) } },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `
      uniform float uTime; uniform vec3 uColor; varying vec2 vUv;
      void main(){ float a=(1.0-vUv.y)*smoothstep(0.0,0.4,vUv.y)*(0.6+0.4*sin(uTime*0.5));
        gl_FragColor=vec4(uColor,a*0.08);}`,
  });
  const beamGeo = new THREE.PlaneGeometry(6, 30);
  const beam = new THREE.Mesh(beamGeo, faintBeam);
  beam.position.set(2, 12, -6);
  beam.rotation.z = 0.15;
  scene.add(beam);

  scene.add(new THREE.AmbientLight(0x06101c, 1.2));

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
    faintBeam.uniforms.uTime.value = t;
    for (const a of anglers) {
      a.group.position.x += (a.group.scale.x > 0 ? 0.02 : -0.02);
      if (Math.abs(a.group.position.x) > 10) a.group.position.x *= -1.05;
      a.group.position.y = a.baseY + Math.sin(t * 0.6 + a.phase) * 1;
      a.group.rotation.z = Math.sin(t * 1.2 + a.phase) * 0.08;
      a.bulb.material instanceof THREE.MeshBasicMaterial && (a.bulb.material.opacity = 0.7 + Math.abs(Math.sin(t * 3 + a.phase)) * 0.3);
    }
    const ma = marineSnowGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < snowN; i++) {
      ma.setY(i, ma.getY(i) - 0.006 - (i % 3) * 0.001);
      ma.setX(i, ma.getX(i) + Math.sin(t + i) * 0.001);
      if (ma.getY(i) < -7) ma.setY(i, 8);
    }
    ma.needsUpdate = true;
    camera.position.x = Math.sin(t * 0.04) * 1.2;
    camera.lookAt(0, 0.5, -10);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [marineSnowGeo].forEach((g) => g.dispose());
    [wallMat, fishMat].forEach((mt) => mt.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
