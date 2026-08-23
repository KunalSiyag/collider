import * as THREE from 'three';

export interface CloudHavenOptions {
  accentColor?: string;
}

function cloudTexture(): THREE.Texture {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d')!;
  const grad = ctx.createRadialGradient(64, 64, 8, 64, 64, 64);
  grad.addColorStop(0, 'rgba(255,255,255,0.85)');
  grad.addColorStop(0.55, 'rgba(230,220,255,0.35)');
  grad.addColorStop(1, 'rgba(200,190,255,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

export function createCloudHaven(
  container: HTMLElement,
  options: { accentColor?: string } = {},
): () => void {
  const { accentColor = '#f472b6' } = options;
  let seed = 24680;
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
  scene.fog = new THREE.FogExp2(0x14101f, 0.02);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 150);
  camera.position.set(0, 2, 18);

  const tex = cloudTexture();

  const puffs: { mesh: THREE.Sprite; baseY: number; phase: number }[] = [];
  for (let i = 0; i < 46; i++) {
    const mat = new THREE.SpriteMaterial({
      map: tex, transparent: true, opacity: 0.16 + rand() * 0.22, depthWrite: false,
      color: new THREE.Color().lerpColors(new THREE.Color('#3c3255'), new THREE.Color(accentColor), rand()),
    });
    const s = new THREE.Sprite(mat);
    const scale = 4 + rand() * 9;
    s.scale.set(scale, scale * 0.55, 1);
    s.position.set((rand() - 0.5) * 44, -3 + rand() * 12, -rand() * 30 - Math.abs((rand() - 0.5) * 10));
    puffs.push({ mesh: s, baseY: s.position.y, phase: rand() * Math.PI * 2 });
    scene.add(s);
  }

  const raysMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(accentColor) } },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `
      uniform float uTime; uniform vec3 uColor; varying vec2 vUv;
      void main(){
        float a=(1.0-vUv.y)*smoothstep(0.0,0.25,vUv.y)*(0.65+0.35*sin(uTime*0.8+vUv.x*6.0));
        gl_FragColor=vec4(uColor,a*0.14);
      }`,
  });
  for (let i = 0; i < 5; i++) {
    const rayGeo = new THREE.PlaneGeometry(3.5, 26);
    const ray = new THREE.Mesh(rayGeo, raysMat);
    ray.position.set((i - 2) * 7 + rand() * 3, 16, -14 - rand() * 6);
    ray.rotation.z = 0.32 + (i % 2) * -0.1;
    scene.add(ray);
  }

  const sunGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: tex, color: new THREE.Color(accentColor), transparent: true, opacity: 0.85,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  sunGlow.scale.set(14, 14, 1);
  sunGlow.position.set(-4, 17, -34);
  scene.add(sunGlow);

  scene.add(new THREE.AmbientLight(0x39304e, 1.8));

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
    raysMat.uniforms.uTime.value = t;
    for (const p of puffs) {
      p.mesh.position.y = p.baseY + Math.sin(t * 0.4 + p.phase) * 0.7;
      p.mesh.position.x += 0.006;
      if (p.mesh.position.x > 26) p.mesh.position.x = -26;
    }
    camera.position.x = Math.sin(t * 0.05) * 2.5;
    camera.position.y = 2 + Math.cos(t * 0.09) * 1.2;
    camera.lookAt(0, 6, -16);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    tex.dispose();
    raysMat.dispose();
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh || o instanceof THREE.Sprite) {
        if ('geometry' in o && o.geometry) o.geometry.dispose();
        if ('material' in o && o.material instanceof THREE.Material && o.material !== raysMat) o.material.dispose();
      }
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
