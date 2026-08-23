import * as THREE from 'three';

export interface PillarOfDawnOptions {
  accentColor?: string;
}

export function createPillarOfDawn(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#ffd98a' } = options;
  let seed = 61161;
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
  scene.fog = new THREE.FogExp2(0x171022, 0.038);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 90);
  camera.position.set(5.5, 1.6, 12);
  camera.lookAt(-1, 3, -6);

  const columnMat = new THREE.MeshStandardMaterial({ color: 0x4c4258, roughness: 0.95, flatShading: true });

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 7; col++) {
      if ((col === 3) && row < 2) continue;
      const h = 3 + rand() * 6;
      const brokenTop = rand() > 0.45;
      const x = -9 + col * 3 + (rand() - 0.5);
      const z = -row * 5 - 4;
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.48, h, 10), columnMat);
      shaft.position.set(x, h / 2, z);
      scene.add(shaft);
      const baseGeo = new THREE.BoxGeometry(1.3, 0.4, 1.3);
      const base = new THREE.Mesh(baseGeo, columnMat);
      base.position.set(x, 0.2, z);
      scene.add(base);
      if (!brokenTop) {
        const capital = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.35, 1.15), columnMat.clone());
        capital.position.set(x, h + 0.17, z);
        scene.add(capital);
      }
    }
  }

  const floorGeo = new THREE.PlaneGeometry(60, 44);
  const floor = new THREE.Mesh(floorGeo, new THREE.MeshStandardMaterial({ color: 0x201a30, roughness: 0.55, metalness: 0.2 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.z = -8;
  scene.add(floor);

  const shaftMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(accentColor) } },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `
      uniform float uTime; uniform vec3 uColor; varying vec2 vUv;
      void main(){
        float a=(1.0-vUv.y)*smoothstep(0.0,0.18,vUv.y)*(0.7+0.3*sin(uTime*0.9+vUv.x*5.0));
        gl_FragColor=vec4(uColor,a*0.16);
      }`,
  });
  for (let i = 0; i < 5; i++) {
    const beamGeo = new THREE.PlaneGeometry(2.4, 20);
    const beam = new THREE.Mesh(beamGeo, shaftMat);
    beam.position.set((i - 2) * 5 + rand(), 10, -3 - i * 2);
    beam.rotation.z = -0.42 + (rand() - 0.5) * 0.08;
    scene.add(beam);
  }

  const dustN = 420;
  const dustGeo = new THREE.BufferGeometry();
  const dpos = new Float32Array(dustN * 3);
  for (let i = 0; i < dustN; i++) {
    dpos[i * 3] = (rand() - 0.5) * 26;
    dpos[i * 3 + 1] = rand() * 8;
    dpos[i * 3 + 2] = (rand() - 0.5) * 24 - 4;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dpos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: 0xffe0a8, size: 0.05, transparent: true, opacity: 0.55,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  scene.add(dust);

  const dawnLight = new THREE.DirectionalLight(new THREE.Color(accentColor), 1.7);
  dawnLight.position.set(-8, 10, 2);
  scene.add(dawnLight);
  scene.add(new THREE.AmbientLight(0x2e2440, 1.7));

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
    const da = dustGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < dustN; i++) {
      da.setY(i, da.getY(i) + 0.004 + Math.sin(t + i) * 0.002);
      da.setX(i, da.getX(i) + 0.002);
      if (da.getY(i) > 8) da.setY(i, 0);
      if (da.getX(i) > 13) da.setX(i, -13);
    }
    da.needsUpdate = true;
    camera.position.x = 5.5 + Math.sin(t * 0.06) * 1.6;
    camera.lookAt(-1, 3, -6);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [floorGeo, dustGeo].forEach((g) => g.dispose());
    [columnMat, floor.material as THREE.Material].forEach((mt) => mt.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
