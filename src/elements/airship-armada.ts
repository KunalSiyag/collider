import * as THREE from 'three';

export interface AirshipArmadaOptions {
  accentColor?: string;
}

export function createAirshipArmada(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#a78bfa' } = options;
  let seed = 62626;
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
  scene.fog = new THREE.Fog(0x171226, 16, 70);
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 150);
  camera.position.set(4, 2, 14);

  const skyDome = new THREE.Mesh(
    new THREE.SphereGeometry(90, 24, 16),
    new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false,
      uniforms: { uTop: { value: new THREE.Color('#0b0b10') }, uMid: { value: new THREE.Color('#3c2455') }, uBot: { value: new THREE.Color('#8a3f6e') } },
      vertexShader: `varying float vY; void main(){ vY=normalize(position).y; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
      fragmentShader: `uniform vec3 uTop,uMid,uBot; varying float vY;
        void main(){ float h=vY*0.5+0.5; vec3 c=h<0.5?mix(uBot,uMid,h*2.0):mix(uMid,uTop,(h-0.5)*2.0); gl_FragColor=vec4(c,1.0);} `,
    }),
  );
  scene.add(skyDome);

  const envelopeMat = new THREE.MeshStandardMaterial({ color: 0x453a66, roughness: 0.6, emissive: new THREE.Color(accentColor), emissiveIntensity: 0.1 });
  const gondolaMat = new THREE.MeshStandardMaterial({ color: 0x241c38, roughness: 0.8 });
  const finMat = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, roughness: 0.6, flatShading: true, side: THREE.DoubleSide });
  const lampMat = new THREE.MeshBasicMaterial({ color: 0xffd98a });

  const ships: { group: THREE.Group; props: THREE.Mesh[]; speed: number; baseY: number; phase: number }[] = [];
  for (let i = 0; i < 7; i++) {
    const g = new THREE.Group();
    const s = 0.55 + rand() * 1.1;
    const env = new THREE.Mesh(new THREE.SphereGeometry(1.6, 18, 12), envelopeMat);
    env.scale.set(2.3, 1, 1);
    g.add(env);
    const props: THREE.Mesh[] = [];
    for (const fz of [-1.1, 1.1]) {
      const prop = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1, 0.18), gondolaMat);
      prop.position.set(-3, -0.2, fz);
      g.add(prop);
      props.push(prop);
    }
    const gon = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.5, 0.5), gondolaMat);
    gon.position.y = -1.85;
    g.add(gon);
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), lampMat);
    lamp.position.set(0.75, -1.55, 0);
    g.add(lamp);
    const tail = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.2, 4), finMat);
    tail.rotation.z = Math.PI / 2;
    tail.position.x = -3.4;
    g.add(tail);
    g.scale.setScalar(s);
    g.position.set((rand() - 0.5) * 22, -2 + rand() * 9, -rand() * 28);
    g.rotation.y = Math.PI / 2;
    ships.push({ group: g, props, speed: 0.25 + rand() * 0.35, baseY: g.position.y, phase: rand() * Math.PI * 2 });
    scene.add(g);
  }

  scene.add(new THREE.AmbientLight(0x3c2f56, 1.7));
  const duskL = new THREE.DirectionalLight(0xffa07a, 1.5);
  duskL.position.set(-10, 3, -6);
  scene.add(duskL);

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
    for (const s of ships) {
      s.group.position.z += s.speed * 0.01;
      if (s.group.position.z > 10) {
        s.group.position.z = -30;
        s.group.position.x = (rand() - 0.5) * 22;
      }
      s.group.position.y = s.baseY + Math.sin(t * 0.5 + s.phase) * 0.5;
      s.props.forEach((p) => { p.rotation.x += 0.3; });
    }
    camera.position.y = 2 + Math.sin(t * 0.15) * 0.8;
    camera.lookAt(0, 1.5, -8);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [envelopeMat, gondolaMat, finMat, lampMat].forEach((mt) => mt.dispose());
    skyDome.geometry.dispose();
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh && o.geometry !== skyDome.geometry) o.geometry.dispose();
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
