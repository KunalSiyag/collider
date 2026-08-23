import * as THREE from 'three';

export interface RuneCircleOptions {
  accentColor?: string;
}

export function createRuneCircle(
  container: HTMLElement,
  options: RuneCircleOptions = {},
): () => void {
  const { accentColor = '#8b5cf6' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b0b10, 0.03);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 80);
  camera.position.set(4.5, 4.5, 9);
  camera.lookAt(0, 1, 0);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(20, 48),
    new THREE.MeshStandardMaterial({ color: 0x120e1c, roughness: 1 }),
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const glowMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(accentColor), transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const dimMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#22d3ee'), transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false,
  });

  const ringA = new THREE.Group();
  const ringB = new THREE.Group();
  const discGeo = new THREE.RingGeometry(3.1, 3.35, 64);
  const ringAFlat = new THREE.Mesh(discGeo, glowMat);
  ringAFlat.rotation.x = -Math.PI / 2;
  ringAFlat.position.y = 0.06;
  ringA.add(ringAFlat);
  const innerDiscGeo = new THREE.RingGeometry(2.2, 2.32, 64);
  const ringBFlat = new THREE.Mesh(innerDiscGeo, dimMat);
  ringBFlat.rotation.x = -Math.PI / 2;
  ringBFlat.position.y = 0.06;
  ringB.add(ringBFlat);

  const runeGeoA = new THREE.BoxGeometry(0.08, 0.02, 0.55);
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const rune = new THREE.Mesh(i % 2 ? runeGeoA : new THREE.BoxGeometry(0.5, 0.02, 0.08), glowMat);
    rune.position.set(Math.cos(a) * 2.75, 0.07, Math.sin(a) * 2.75);
    rune.rotation.y = -a + Math.PI / 2;
    ringA.add(rune);
  }
  const runeGeoB = new THREE.BoxGeometry(0.06, 0.02, 0.34);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const rune = new THREE.Mesh(runeGeoB, dimMat);
    rune.position.set(Math.cos(a) * 1.95, 0.07, Math.sin(a) * 1.95);
    rune.rotation.y = -a;
    ringB.add(rune);
  }
  scene.add(ringA, ringB);

  const beam = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.9, 9, 24, 1, true),
    new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(accentColor) } },
      vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
      fragmentShader: `
        uniform float uTime; uniform vec3 uColor; varying vec2 vUv;
        void main(){
          float bands=0.6+0.4*sin(vUv.x*30.0+uTime*4.0)*sin(vUv.y*8.0-uTime*2.0);
          float fade=smoothstep(0.0,0.25,vUv.y)*(1.0-smoothstep(0.55,1.0,vUv.y));
          gl_FragColor=vec4(uColor,fade*bands*0.28);
        }`,
    }),
  );
  beam.position.set(0, 4.5, 0);
  scene.add(beam);

  const sparkGeo = new THREE.BufferGeometry();
  const sn = 300;
  const sp = new Float32Array(sn * 3);
  for (let i = 0; i < sn; i++) {
    const a = Math.random() * Math.PI * 2;
    const rr = Math.random() * 3;
    sp[i * 3] = Math.cos(a) * rr;
    sp[i * 3 + 1] = Math.random() * 8;
    sp[i * 3 + 2] = Math.sin(a) * rr;
  }
  sparkGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  const sparks = new THREE.Points(sparkGeo, new THREE.PointsMaterial({
    color: 0xc4b5fd, size: 0.06, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  scene.add(sparks);

  const pulseLight = new THREE.PointLight(new THREE.Color(accentColor), 40, 14);
  pulseLight.position.set(0, 1.5, 0);
  scene.add(pulseLight);
  scene.add(new THREE.AmbientLight(0x201a33, 1.5));

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
    ringA.rotation.y = t * 0.35;
    ringB.rotation.y = -t * 0.55;
    beam.rotation.y = t * 0.5;
    (beam.material as THREE.ShaderMaterial).uniforms.uTime.value = t;
    const attr = sparkGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < sn; i++) {
      let y = attr.getY(i) + 0.02;
      if (y > 8.5) y = 0.05;
      attr.setY(i, y);
      attr.setX(i, attr.getX(i) * 0.9995);
    }
    attr.needsUpdate = true;
    pulseLight.intensity = 30 + Math.abs(Math.sin(t * 2.2)) * 26;
    camera.position.x = 4.5 + Math.sin(t * 0.09) * 1.4;
    camera.lookAt(0, 1, 0);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [discGeo, innerDiscGeo, runeGeoA, runeGeoB, sparkGeo].forEach((g) => g.dispose());
    [glowMat, dimMat].forEach((mt) => mt.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
