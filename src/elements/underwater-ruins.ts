import * as THREE from 'three';

export interface UnderwaterRuinsOptions {
  accentColor?: string;
}

export function createUnderwaterRuins(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#22d3ee' } = options;
  let seed = 31337;
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
  scene.fog = new THREE.FogExp2(0x071420, 0.055);
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 90);
  camera.position.set(4, 2.4, 12);
  camera.lookAt(-1, 2.5, -6);

  const stoneMat = new THREE.MeshStandardMaterial({ color: 0x1e3040, roughness: 1 });

  for (let i = 0; i < 10; i++) {
    const h = 3 + rand() * 6;
    const x = -8 + i * 1.9 + (rand() - 0.5);
    const z = -rand() * 14;
    const colGeo = new THREE.CylinderGeometry(0.35, 0.45, h, 8);
    const column = new THREE.Mesh(colGeo, stoneMat);
    column.position.set(x, h / 2, z);
    column.rotation.z = (rand() - 0.5) * 0.22;
    scene.add(column);
    if (rand() > 0.5) {
      const capGeo = new THREE.BoxGeometry(1.1, 0.3, 1.1);
      const cap = new THREE.Mesh(capGeo, stoneMat);
      cap.position.set(x, h, z);
      cap.rotation.copy(column.rotation);
      scene.add(cap);
    }
  }

  const archGeo = new THREE.TorusGeometry(2.4, 0.34, 10, 30, Math.PI);
  const arch = new THREE.Mesh(archGeo, stoneMat);
  arch.position.set(1.5, 3.6, -7);
  scene.add(arch);

  const seabedGeo = new THREE.PlaneGeometry(60, 44, 24, 16);
  const sbpos = seabedGeo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < sbpos.count; i++) sbpos.setZ(i, Math.sin(sbpos.getX(i)) * 0.5 + Math.cos(sbpos.getY(i)) * 0.4 + rand() * 0.2);
  seabedGeo.computeVertexNormals();
  const seabed = new THREE.Mesh(seabedGeo, stoneMat.clone());
  seabed.rotation.x = -Math.PI / 2;
  scene.add(seabed);

  const shaftMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(accentColor) } },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `
      uniform float uTime; uniform vec3 uColor; varying vec2 vUv;
      void main(){ float sway=sin(vUv.x*7.0+uTime*0.9)*0.5+0.5;
        float a=(1.0-vUv.y)*smoothstep(0.0,0.25,vUv.y)*(0.55+sway*0.45);
        gl_FragColor=vec4(uColor,a*0.17);}`,
  });
  for (let i = 0; i < 5; i++) {
    const shaftGeo = new THREE.PlaneGeometry(2.8, 26);
    const shaft = new THREE.Mesh(shaftGeo, shaftMat);
    shaft.position.set((i - 2) * 4.5 + rand() * 2, 11, -3 - i * 2.4);
    shaft.rotation.z = -0.28 + (rand() - 0.5) * 0.08;
    scene.add(shaft);
  }

  const bubbleN = 300;
  const bubbleGeo = new THREE.BufferGeometry();
  const bpos = new Float32Array(bubbleN * 3);
  for (let i = 0; i < bubbleN; i++) {
    bpos[i * 3] = (rand() - 0.5) * 26;
    bpos[i * 3 + 1] = rand() * 16;
    bpos[i * 3 + 2] = (rand() - 0.5) * 20 - 2;
  }
  bubbleGeo.setAttribute('position', new THREE.BufferAttribute(bpos, 3));
  const bubbles = new THREE.Points(bubbleGeo, new THREE.PointsMaterial({
    color: 0xbfeaff, size: 0.09, transparent: true, opacity: 0.55,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  scene.add(bubbles);

  const glowLight = new THREE.PointLight(new THREE.Color(accentColor), 18, 20);
  glowLight.position.set(0, 6, 0);
  scene.add(glowLight);
  scene.add(new THREE.AmbientLight(0x10283c, 2));

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
    const ba = bubbleGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < bubbleN; i++) {
      ba.setY(i, ba.getY(i) + 0.008 + (i % 4) * 0.002);
      ba.setX(i, ba.getX(i) + Math.sin(t * 1.4 + i) * 0.004);
      if (ba.getY(i) > 16) ba.setY(i, 0);
    }
    ba.needsUpdate = true;
    camera.position.x = Math.sin(t * 0.05) * 1.8 + 4;
    camera.lookAt(-1, 2.6, -6);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [archGeo, seabedGeo, bubbleGeo].forEach((g) => g.dispose());
    [stoneMat, seabed.material as THREE.Material].forEach((mt) => mt.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
