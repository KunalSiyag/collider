import * as THREE from 'three';

export interface ConstellationNetworkOptions {
  count?: number;
  bounds?: number;
  linkDistance?: number;
  speed?: number;
  nodeColor?: string;
  linkColor?: string;
}

interface Node {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
}

export function createConstellationNetwork(
  container: HTMLElement,
  options: ConstellationNetworkOptions = {},
): () => void {
  const {
    count = 90,
    bounds = 6,
    linkDistance = 2.2,
    speed = 1,
    nodeColor = '#e4e4e7',
    linkColor = '#8b5cf6',
  } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x09090b, 8, 16);

  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 50);
  camera.position.z = 9;

  const nodes: Node[] = [];
  for (let i = 0; i < count; i++) {
    const position = new THREE.Vector3(
      (Math.random() - 0.5) * bounds * 2,
      (Math.random() - 0.5) * bounds * 1.2,
      (Math.random() - 0.5) * bounds * 1.5,
    );
    const velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 0.3,
      (Math.random() - 0.5) * 0.3,
      (Math.random() - 0.5) * 0.3,
    ).multiplyScalar(speed);
    nodes.push({ position, velocity });
  }

  const nodeGeometry = new THREE.BufferGeometry();
  const nodePositions = new Float32Array(count * 3);
  nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
  const nodeMaterial = new THREE.PointsMaterial({
    color: new THREE.Color(nodeColor),
    size: 0.07,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
  });
  scene.add(new THREE.Points(nodeGeometry, nodeMaterial));

  const maxLinks = (count * (count - 1)) / 2 > 4000 ? 4000 : (count * (count - 1)) / 2;
  const linkGeometry = new THREE.BufferGeometry();
  const linkPositions = new Float32Array(maxLinks * 6);
  linkGeometry.setAttribute('position', new THREE.BufferAttribute(linkPositions, 3));
  const linkMaterial = new THREE.LineBasicMaterial({
    color: new THREE.Color(linkColor),
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
  });
  scene.add(new THREE.LineSegments(linkGeometry, linkMaterial));

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width === 0 || height === 0) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  let raf = 0;
  let last = performance.now();

  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    for (const node of nodes) {
      node.position.addScaledVector(node.velocity, dt);
      if (Math.abs(node.position.x) > bounds) node.velocity.x *= -1;
      if (Math.abs(node.position.y) > bounds * 0.6) node.velocity.y *= -1;
      if (Math.abs(node.position.z) > bounds * 0.75) node.velocity.z *= -1;
    }

    for (let i = 0; i < count; i++) {
      nodePositions[i * 3] = nodes[i].position.x;
      nodePositions[i * 3 + 1] = nodes[i].position.y;
      nodePositions[i * 3 + 2] = nodes[i].position.z;
    }
    nodeGeometry.attributes.position.needsUpdate = true;

    let segment = 0;
    const limitSq = linkDistance * linkDistance;
    outer: for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const distanceSq = nodes[i].position.distanceToSquared(nodes[j].position);
        if (distanceSq < limitSq && segment < maxLinks) {
          const offset = segment * 6;
          linkPositions[offset] = nodes[i].position.x;
          linkPositions[offset + 1] = nodes[i].position.y;
          linkPositions[offset + 2] = nodes[i].position.z;
          linkPositions[offset + 3] = nodes[j].position.x;
          linkPositions[offset + 4] = nodes[j].position.y;
          linkPositions[offset + 5] = nodes[j].position.z;
          segment++;
          if (segment >= maxLinks) break outer;
        }
      }
    }

    for (let k = segment * 6; k < linkPositions.length; k++) linkPositions[k] = 0;
    linkGeometry.setDrawRange(0, segment * 2);
    linkGeometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    nodeGeometry.dispose();
    nodeMaterial.dispose();
    linkGeometry.dispose();
    linkMaterial.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
