import * as THREE from 'three';

export interface MantaGlideOptions {
  accentColor?: string;
}

export function createMantaGlide(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#22d3ee' } = options;
  let seed = 5150;
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
  scene.fog = new THREE.FogExp2(0x06101e, 0.05);
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 80);
  camera.position.set(0, 1, 13);

  interface Manta { group: THREE.Group; wingL: THREE.Mesh; wingR: THREE.Mesh; phase: number; speed: number; baseY: number }
  const mantas: Manta[] = [];
  for (let i = 0; i < 7; i++) {
    const g = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({
      color: 0x14263c, roughness: 0.6, flatShading: true, side: THREE.DoubleSide,
      emissive: new THREE.Color(accentColor), emissiveIntensity: i === 0 ? 0.25 : 0.08,
    });
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.5, 14, 10), mat);
    body.scale.set(1.4, 0.28, 1);
    g.add(body);
    const tailGeo = new THREE.CylinderGeometry(0.02, 0.04, 2, 5);
    const tail = new THREE.Mesh(tailGeo, mat);
    tail.rotation.x = Math.PI / 2;
    tail.position.z = 2;
    g.add(tail);
    const wingShape = new THREE.BufferGeometry();
    wingShape.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0, 0, -0.3, 3, 0, 0.35, 0, 0, 0.9]), 3));
    wingShape.computeVertexNormals();
    const wingL = new THREE.Mesh(wingShape.clone(), mat);
    g.add(wingL);
    const wingR = new THREE.Mesh(wingShape.clone(), mat);
    wingR.scale.x = -1;
    g.add(wingR);
    const s = 0.45 + rand() * 0.8;
    g.scale.setScalar(s);
    g.rotation.y = Math.PI;
    scene.add(g);
    mantas.push({ group: g, wingL, wingR, phase: rand() * Math.PI * 2, speed: 0.25 + rand() * 0.3, baseY: (rand() - 0.5) * 8 });
  }

  const shaftMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(accentColor) } },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `
      uniform float uTime; uniform vec3 uColor; varying vec2 vUv;
      void main(){ float a=(1.0-vUv.y)*smoothstep(0.0,0.3,vUv.y)*(0.75+0.25*sin(uTime*1.3+vUv.x*9.0));
        gl_FragColor=vec4(uColor,a*0.18);}`,
  });
  for (let i = 0; i < 6; i++) {
    const shaftGeo = new THREE.PlaneGeometry(2.6, 24);
    const shaft = new THREE.Mesh(shaftGeo, shaftMat);
    shaft.position.set((i - 2.5) * 4 + rand() * 2, 8, -6 - rand() * 10);
    shaft.rotation.z = 0.12 + (rand() - 0.5) * 0.1;
    scene.add(shaft);
  }

  const planktonN = 500;
  const planktonGeo = new THREE.BufferGeometry();
  const ppos = new Float32Array(planktonN * 3);
  for (let i = 0; i < planktonN; i++) {
    ppos[i * 3] = (rand() - 0.5) * 30;
    ppos[i * 3 + 1] = (rand() - 0.5) * 20;
    ppos[i * 3 + 2] = (rand() - 0.5) * 26;
  }
  planktonGeo.setAttribute('position', new THREE.BufferAttribute(ppos, 3));
  const plankton = new THREE.Points(planktonGeo, new THREE.PointsMaterial({
    color: 0x9fe8ff, size: 0.06, transparent: true, opacity: 0.5,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  scene.add(plankton);

  scene.add(new THREE.AmbientLight(0x10203a, 2));

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
    shaftMat.uniforms.uTime.value = t;
    for (const m of mantas) {
      const a = t * m.speed + m.phase;
      m.group.position.set(Math.cos(a) * 7, m.baseY + Math.sin(a * 1.7) * 1.2, -Math.abs(Math.sin(a)) * 8 + 2);
      m.group.rotation.y = Math.PI - a + Math.PI / 2;
      m.group.rotation.z = Math.cos(a * 1.7) * 0.3;
      const flap = Math.sin(t * 2.4 + m.phase) * 0.5;
      m.wingL.rotation.z = flap;
      m.wingR.rotation.z = flap;
      m.wingR.rotation.y = flap * 0.3;
    }
    plankton.rotation.y = t * 0.015;
    camera.position.y = Math.sin(t * 0.16) * 1;
    camera.lookAt(0, 0, -2);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [planktonGeo].forEach((g) => g.dispose());
    [shaftMat, plankton.material as THREE.Material].forEach((mt) => mt.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
