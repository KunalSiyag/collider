import * as THREE from 'three';

export interface MushroomGroveOptions {
  accentColor?: string;
}

export function createMushroomGrove(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#8b5cf6' } = options;
  let seed = 30303;
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
  scene.fog = new THREE.FogExp2(0x0a0814, 0.05);
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 80);
  camera.position.set(3.5, 1.6, 9);
  camera.lookAt(0, 1.6, -3);

  const stemMat = new THREE.MeshStandardMaterial({ color: 0xd8cfbc, roughness: 0.85 });
  const capColors = ['#8b5cf6', '#f472b6', '#22d3ee'];
  const sporeGeo = new THREE.BufferGeometry();
  const SPN = 350;
  const spos = new Float32Array(SPN * 3);
  for (let i = 0; i < SPN; i++) {
    spos[i * 3] = (rand() - 0.5) * 20;
    spos[i * 3 + 1] = rand() * 6;
    spos[i * 3 + 2] = (rand() - 0.5) * 16;
  }
  sporeGeo.setAttribute('position', new THREE.BufferAttribute(spos, 3));
  const spores = new THREE.Points(sporeGeo, new THREE.PointsMaterial({
    color: 0xd9c9ff, size: 0.05, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  scene.add(spores);

  for (let i = 0; i < 14; i++) {
    const big = i < 5;
    const scale = big ? 2 + rand() * 1.4 : 0.4 + rand() * 0.8;
    const x = (rand() - 0.5) * 15;
    const z = -rand() * 13;
    const g = new THREE.Group();
    const hgt = scale * 1.6;
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(scale * 0.18, scale * 0.28, hgt, 10), stemMat);
    stem.position.y = hgt / 2;
    g.add(stem);
    const col = capColors[i % capColors.length];
    const capMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(col), roughness: 0.6, flatShading: true,
      emissive: new THREE.Color(col), emissiveIntensity: 0.35,
    });
    const cap = new THREE.Mesh(new THREE.SphereGeometry(scale * 0.75, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), capMat);
    cap.scale.y = 0.62;
    cap.position.y = hgt;
    g.add(cap);
    if (big && i === 0) {
      const underLight = new THREE.PointLight(new THREE.Color(col), 12, 7);
      underLight.position.y = hgt * 0.85;
      g.add(underLight);
    }
    g.position.set(x, 0, z);
    g.rotation.z = (rand() - 0.5) * 0.12;
    scene.add(g);
  }

  const groundGeo = new THREE.PlaneGeometry(50, 40, 20, 14);
  const gpos = groundGeo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < gpos.count; i++) gpos.setZ(i, (Math.sin(gpos.getX(i)) + Math.cos(gpos.getY(i))) * 0.25 * rand());
  groundGeo.computeVertexNormals();
  const ground = new THREE.Mesh(groundGeo, new THREE.MeshStandardMaterial({ color: 0x151024, roughness: 1, flatShading: true }));
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  const moonBeamMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(accentColor) } },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `
      uniform float uTime; uniform vec3 uColor; varying vec2 vUv;
      void main(){ float a=smoothstep(0.0,0.4,vUv.y)*(1.0-vUv.y)*(0.7+0.3*sin(uTime*1.5));
        gl_FragColor=vec4(uColor,a*0.16);}`,
  });
  const beam = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 16), moonBeamMat);
  beam.position.set(-1.5, 8, -6);
  beam.rotation.z = 0.25;
  scene.add(beam);

  scene.add(new THREE.AmbientLight(0x201a33, 1.6));
  const coolMoon = new THREE.DirectionalLight(0xaebcff, 1);
  coolMoon.position.set(-6, 10, 2);
  scene.add(coolMoon);

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
    moonBeamMat.uniforms.uTime.value = t;
    const attr = sporeGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < SPN; i++) {
      attr.setX(i, attr.getX(i) + Math.sin(t + i) * 0.002);
      let y = attr.getY(i) + 0.005 + (i % 3) * 0.001;
      if (y > 6.5) y = 0;
      attr.setY(i, y);
    }
    attr.needsUpdate = true;
    camera.position.x = Math.sin(t * 0.07) * 1.4 + 3.5;
    camera.lookAt(0, 1.6, -3);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    [stemMat, groundGeo, sporeGeo].forEach((g) => g.dispose ? g.dispose() : null);
    [moonBeamMat, spores.material as THREE.Material, ground.material as THREE.Material].forEach((mt) => mt.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
