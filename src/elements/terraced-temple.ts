import * as THREE from 'three';

export interface TerracedTempleOptions {
  accentColor?: string;
}

export function createTerracedTemple(
  container: HTMLElement,
  options: TerracedTempleOptions = {},
): () => void {
  const { accentColor = '#8b5cf6' } = options;
  let seed = 90210;
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
  scene.fog = new THREE.Fog(0x120e1f, 16, 60);
  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 120);
  camera.position.set(8, 4, 13);
  camera.lookAt(0, 4.5, -3);

  const stoneMat = new THREE.MeshStandardMaterial({ color: 0x241d33, roughness: 0.95, flatShading: true });
  const stepMat = new THREE.MeshStandardMaterial({ color: 0x332a4a, roughness: 0.9 });

  const ziggurat = new THREE.Group();
  const LEVELS = 6;
  for (let i = 0; i < LEVELS; i++) {
    const w = 11 - i * 1.7;
    const slab = new THREE.Mesh(new THREE.BoxGeometry(w, 1, w), stoneMat);
    slab.position.y = i * 1 + 0.5;
    ziggurat.add(slab);
    if (i < LEVELS - 1) {
      for (const sx of [-1, 1]) {
        const stairs = new THREE.Mesh(new THREE.BoxGeometry(w * 0.18, 1, 0.9), stepMat);
        stairs.position.set(sx * w * 0.32, i * 1 + 0.5, w / 2 + 0.35);
        stairs.rotation.x = -0.25;
        ziggurat.add(stairs);
      }
      const torches = 2 + Math.floor(rand() * 2);
      for (let k = 0; k < torches; k++) {
        const a = rand() * Math.PI * 2;
        const flameMat = new THREE.MeshBasicMaterial({ color: 0xffb86b });
        const flame = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), flameMat);
        flame.position.set(Math.cos(a) * (w / 2 - 0.4), i * 1 + 1.15, Math.sin(a) * (w / 2 - 0.4));
        flame.name = 'flame';
        ziggurat.add(flame);
        break;
      }
    }
  }
  const shrine = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.6, 1.6), stoneMat);
  shrine.position.y = LEVELS + 0.6;
  ziggurat.add(shrine);
  scene.add(ziggurat);

  const beamMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(accentColor) } },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `
      uniform float uTime; uniform vec3 uColor; varying vec2 vUv;
      void main(){
        float pulse=0.75+0.25*sin(uTime*2.0+vUv.y*10.0);
        float fade=(1.0-vUv.y)*smoothstep(0.0,0.1,vUv.y);
        gl_FragColor=vec4(uColor,fade*pulse*0.4);
      }`,
  });
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.55, 22, 20, 1, true), beamMat);
  beam.position.y = LEVELS + 12;
  scene.add(beam);

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(90, 70), stoneMat.clone());
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  const mistGeo = new THREE.BufferGeometry();
  const MN = 260;
  const mp = new Float32Array(MN * 3);
  for (let i = 0; i < MN; i++) {
    mp[i * 3] = (Math.random() - 0.5) * 40;
    mp[i * 3 + 1] = Math.random() * 1.6;
    mp[i * 3 + 2] = (Math.random() - 0.5) * 30 - 4;
  }
  mistGeo.setAttribute('position', new THREE.BufferAttribute(mp, 3));
  const mist = new THREE.Points(mistGeo, new THREE.PointsMaterial({ color: 0x6a5a96, size: 0.6, transparent: true, opacity: 0.12, depthWrite: false }));
  scene.add(mist);

  const shrineLight = new THREE.PointLight(new THREE.Color(accentColor), 30, 18);
  shrineLight.position.set(0, LEVELS + 2, 0);
  scene.add(shrineLight);
  scene.add(new THREE.AmbientLight(0x2c2344, 1.6));
  const moonL = new THREE.DirectionalLight(0xbcc8ff, 1);
  moonL.position.set(-10, 14, 6);
  scene.add(moonL);

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
    beamMat.uniforms.uTime.value = t;
    shrineLight.intensity = 26 + Math.abs(Math.sin(t * 1.6)) * 12;
    mist.rotation.y = t * 0.008;
    ziggurat.traverse((o) => {
      if (o instanceof THREE.Mesh && o.geometry instanceof THREE.SphereGeometry && o.material instanceof THREE.MeshBasicMaterial) {
        o.scale.setScalar(0.85 + Math.abs(Math.sin(t * 6 + o.position.x)) * 0.3);
      }
    });
    camera.position.x = Math.sin(t * 0.06) * 2.5 + 8;
    camera.lookAt(0, 5, -3);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [stoneMat, stepMat, beamMat].forEach((mt) => mt.dispose());
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh || o instanceof THREE.Points) o.geometry.dispose();
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
