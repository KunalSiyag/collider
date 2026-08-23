import * as THREE from 'three';

export interface PortalStairsOptions {
  accentColor?: string;
}

export function createPortalStairs(
  container: HTMLElement,
  options: PortalStairsOptions = {},
): () => void {
  const { accentColor = '#8b5cf6' } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b0b10, 0.03);
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 120);
  camera.position.set(9, 6, 12);
  camera.lookAt(0, 5, 0);

  const stepGeo = new THREE.BoxGeometry(2.4, 0.3, 1.1);
  const steps: THREE.Mesh[] = [];
  for (let i = 0; i < 34; i++) {
    const a = i * 0.42;
    const r = 5.5 - i * 0.13;
    const mat = new THREE.MeshStandardMaterial({
      color: i % 2 ? 0x241d3a : 0x1a1530,
      emissive: new THREE.Color(accentColor),
      emissiveIntensity: i > 26 ? 0.9 : 0.25 + (i / 34) * 0.3,
      roughness: 0.7,
    });
    const step = new THREE.Mesh(stepGeo, mat);
    step.position.set(Math.cos(a) * r, 0.35 + i * 0.42, Math.sin(a) * r - 2);
    step.rotation.y = -a;
    steps.push(step);
    scene.add(step);
  }

  const topStep = steps[steps.length - 1];
  const portalY = topStep.position.y + 2.6;
  const portalPos = new THREE.Vector3(topStep.position.x, portalY, topStep.position.z);

  const ringMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(accentColor),
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
  const portalRing = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.14, 14, 80), ringMat);
  portalRing.position.copy(portalPos);
  portalRing.rotation.y = Math.atan2(portalPos.x, portalPos.z) + Math.PI / 2;
  scene.add(portalRing);

  const swirlMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uColorA: { value: new THREE.Color(accentColor) }, uColorB: { value: new THREE.Color('#22d3ee') } },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `
      uniform float uTime; uniform vec3 uColorA; uniform vec3 uColorB; varying vec2 vUv;
      void main(){
        vec2 c=vUv-0.5; float d=length(c)*2.0; float a=atan(c.y,c.x);
        float sw=sin(a*3.0+uTime*2.0-d*9.0)*0.5+0.5;
        vec3 col=mix(uColorB,uColorA,d);
        float alpha=(1.0-smoothstep(0.15,1.0,d))*0.55+sw*0.25*(1.0-d);
        gl_FragColor=vec4(col,alpha);
      }`,
  });
  const swirl = new THREE.Mesh(new THREE.CircleGeometry(1.96, 48), swirlMat);
  swirl.position.copy(portalPos);
  swirl.rotation.copy(portalRing.rotation);
  scene.add(swirl);

  const moteGeo = new THREE.BufferGeometry();
  const n = 260;
  const mpos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    mpos[i * 3] = (Math.random() - 0.5) * 14;
    mpos[i * 3 + 1] = Math.random() * 16;
    mpos[i * 3 + 2] = (Math.random() - 0.5) * 14;
  }
  moteGeo.setAttribute('position', new THREE.BufferAttribute(mpos, 3));
  const motes = new THREE.Points(moteGeo, new THREE.PointsMaterial({
    color: 0xc4b5fd, size: 0.08, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  scene.add(motes);

  scene.add(new THREE.AmbientLight(0x30284c, 1.8));
  const beamLight = new THREE.PointLight(new THREE.Color(accentColor), 40, 20);
  beamLight.position.copy(portalPos);
  scene.add(beamLight);

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
    swirlMat.uniforms.uTime.value = t;
    portalRing.rotation.z = t * 0.4;
    swirl.rotation.z = t * 0.2;
    const p = moteGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < n; i++) {
      p.setY(i, p.getY(i) + 0.012);
      if (p.getY(i) > 17) p.setY(i, 0);
    }
    p.needsUpdate = true;
    camera.position.x = Math.sin(t * 0.12) * 2.5 + 9;
    camera.lookAt(portalPos.x * 0.5, 5.5, 0);
    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    moteGeo.dispose(); stepGeo.dispose();
    [ringMat, swirlMat].forEach((mt) => mt.dispose());
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh && o.material instanceof THREE.Material && o.material !== ringMat && o.material !== swirlMat) o.material.dispose();
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
