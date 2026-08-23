import * as THREE from 'three';

export interface AuroraPeaksOptions {
  accentColor?: string;
}

export function createAuroraPeaks(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#22d3ee' } = options;
  let seed = 19541;
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
  scene.fog = new THREE.Fog(0x0a0c16, 24, 90);
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 200);
  camera.position.set(0, 3, 18);

  const peakMat = new THREE.MeshStandardMaterial({ color: 0x161a2c, roughness: 1, flatShading: true });
  const snowMat = new THREE.MeshStandardMaterial({ color: 0xb9c2e8, roughness: 0.9, flatShading: true });
  for (let i = 0; i < 12; i++) {
    const h = 4 + rand() * 9;
    const r = 3.5 + rand() * 4;
    const peak = new THREE.Mesh(new THREE.ConeGeometry(r, h, 6), peakMat);
    peak.position.set((i - 6) * 5 + rand() * 2, h / 2 - 1, -14 - rand() * 22);
    scene.add(peak);
    if (h > 8) {
      const cap = new THREE.Mesh(new THREE.ConeGeometry(r * 0.32, h * 0.26, 6), snowMat);
      cap.position.set(peak.position.x, peak.position.y + h * 0.37, peak.position.z - r * 0.02);
      scene.add(cap);
    }
  }
  const plainGeo = new THREE.PlaneGeometry(140, 50, 20, 10);
  const ppos = plainGeo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < ppos.count; i++) ppos.setZ(i, Math.sin(ppos.getX(i) * 0.15) * 1.5);
  plainGeo.computeVertexNormals();
  const plain = new THREE.Mesh(plainGeo, peakMat.clone());
  plain.rotation.x = -Math.PI / 2;
  scene.add(plain);

  const auroraMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color(accentColor) },
      uColorB: { value: new THREE.Color('#8b5cf6') },
      uColorC: { value: new THREE.Color('#f472b6') },
    },
    vertexShader: `
      uniform float uTime;
      varying vec2 vUv;
      void main(){
        vUv=uv;
        vec3 p=position;
        p.z+=sin(p.y*0.35+uTime*1.4+p.x*0.12)*2.2;
        p.x+=sin(uTime*0.5+vUv.x*4.0)*1.5;
        gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);
      }`,
    fragmentShader: `
      uniform float uTime; uniform vec3 uColorA,uColorB,uColorC; varying vec2 vUv;
      void main(){
        float curtain=sin(vUv.x*22.0+uTime*1.8)+sin(vUv.x*13.0-uTime*1.1+2.0);
        float band=smoothstep(-1.4,0.6,curtain)*0.7;
        float fadeV=(1.0-vUv.y)*(0.25+vUv.y*0.9);
        vec3 col=mix(uColorA,uColorB,vUv.x);
        col=mix(col,uColorC,sin(vUv.x*7.0-uTime*0.7)*0.5+0.5);
        float a=max(band,0.12)*fadeV*0.55;
        gl_FragColor=vec4(col,a);
      }`,
  });

  const curtains: THREE.Mesh[] = [];
  for (let i = 0; i < 4; i++) {
    const geo = new THREE.PlaneGeometry(70, 34, 60, 10);
    const c = new THREE.Mesh(geo, auroraMat);
    c.position.set((i - 1.5) * 14, 17, -30 - i * 6);
    curtains.push(c);
    scene.add(c);
  }

  const starGeo = new THREE.BufferGeometry();
  const SN = 800;
  const sp = new Float32Array(SN * 3);
  for (let i = 0; i < SN; i++) {
    sp[i * 3] = (Math.random() - 0.5) * 160;
    sp[i * 3 + 1] = Math.random() * 70;
    sp[i * 3 + 2] = -40 - Math.random() * 80;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xdde6ff, size: 0.15, transparent: true, opacity: 0.8 }));
  scene.add(stars);

  scene.add(new THREE.AmbientLight(0x1e2438, 2));
  const moonL = new THREE.DirectionalLight(0xaebcff, 0.9);
  moonL.position.set(-10, 20, 10);
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
    auroraMat.uniforms.uTime.value = t;
    stars.rotation.y = Math.sin(t * 0.03) * 0.02;
    camera.position.x = Math.sin(t * 0.06) * 3;
    camera.lookAt(0, 8, -25);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [peakMat, plain.material as THREE.Material].forEach((mt) => mt.dispose());
    [plainGeo, starGeo].forEach((g) => g.dispose());
    curtains.forEach((c) => c.geometry.dispose());
    auroraMat.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
