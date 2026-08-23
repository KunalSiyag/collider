export const examples: Record<string, string> = {
  'particle-field': `import { createParticleField } from './particle-field';

const destroy = createParticleField(document.querySelector('#hero'), {
  count: 2500,
  colorA: '#8b5cf6',
  colorB: '#22d3ee',
});

destroy();`,
  'wave-plane': `import { createWavePlane } from './wave-plane';

const destroy = createWavePlane(document.querySelector('#hero'), {
  amplitude: 1,
  speed: 1,
});

destroy();`,
  'grid-floor': `import { createGridFloor } from './grid-floor';

const destroy = createGridFloor(document.querySelector('#hero'), {
  accentColor: '#8b5cf6',
  speed: 2,
});

destroy();`,
  'distorted-sphere': `import { createDistortedSphere } from './distorted-sphere';

const destroy = createDistortedSphere(document.querySelector('#hero'), {
  amplitude: 0.35,
  frequency: 1.6,
});

destroy();`,
  'wireframe-globe': `import { createWireframeGlobe } from './wireframe-globe';

const destroy = createWireframeGlobe(document.querySelector('#hero'), {
  dots: 900,
  arcs: 14,
});

destroy();`,
  'liquid-knot': `import { createLiquidKnot } from './liquid-knot';

const destroy = createLiquidKnot(document.querySelector('#hero'), {
  distortion: 0.08,
  roughness: 0.12,
});

destroy();`,
  'floating-shapes': `import { createFloatingShapes } from './floating-shapes';

const destroy = createFloatingShapes(document.querySelector('#hero'), {
  count: 14,
  spread: 7,
});

destroy();`,
  'orbit-loader': `import { createOrbitLoader } from './orbit-loader';

const destroy = createOrbitLoader(document.querySelector('#loader'), {
  size: 1,
  speed: 1,
});

destroy();`,
  'galaxy-spiral': `import { createGalaxySpiral } from './galaxy-spiral';

const destroy = createGalaxySpiral(document.querySelector('#hero'), {
  arms: 3,
  spin: 1.2,
});

destroy();`,
  'star-hyperspace': `import { createStarHyperspace } from './star-hyperspace';

const destroy = createStarHyperspace(document.querySelector('#hero'), {
  count: 900,
  speed: 1,
});

destroy();`,
  'constellation-network': `import { createConstellationNetwork } from './constellation-network';

const destroy = createConstellationNetwork(document.querySelector('#hero'), {
  count: 90,
  linkDistance: 2.2,
});

destroy();`,
  'text-particles': `import { createTextParticles } from './text-particles';

const destroy = createTextParticles(document.querySelector('#hero'), {
  text: 'COLLIDER',
  density: 4,
});

destroy();`,
  'ripple-rings': `import { createRippleRings } from './ripple-rings';

const destroy = createRippleRings(document.querySelector('#hero'), {
  rings: 7,
  speed: 0.6,
});

destroy();`,
  'flow-field': `import { createFlowField } from './flow-field';

const destroy = createFlowField(document.querySelector('#hero'), {
  count: 1200,
  noiseScale: 0.35,
});

destroy();`,
  'shard-crystal': `import { createShardCrystal } from './shard-crystal';

const destroy = createShardCrystal(document.querySelector('#hero'), {
  count: 9,
});

destroy();`,
  'torus-tunnel': `import { createTorusTunnel } from './torus-tunnel';

const destroy = createTorusTunnel(document.querySelector('#hero'), {
  rings: 24,
  speed: 1,
});

destroy();`,
  'dot-terrain': `import { createDotTerrain } from './dot-terrain';

const destroy = createDotTerrain(document.querySelector('#hero'), {
  grid: 60,
  amplitude: 0.8,
});

destroy();`,
  'helix-strand': `import { createHelixStrand } from './helix-strand';

const destroy = createHelixStrand(document.querySelector('#hero'), {
  turns: 4,
});

destroy();`,
  'fog-drift': `import { createFogDrift } from './fog-drift';

const destroy = createFogDrift(document.querySelector('#hero'), {
  scale: 3,
  speed: 1,
});

destroy();`,
  'pulse-ring': `import { createPulseRing } from './pulse-ring';

const destroy = createPulseRing(document.querySelector('#loader'), {
  ringCount: 3,
  speed: 1,
});

destroy();`,
  'wire-cube': `import { createWireCube } from './wire-cube';

const destroy = createWireCube(document.querySelector('#loader'), {
  size: 1,
  speed: 1,
});

destroy();`,
  monolith: `import { createMonolith } from './monolith';

const destroy = createMonolith(document.querySelector('#hero'), {
  speed: 1,
});

destroy();`,
  'spotlight-stage': `import { createSpotlightStage } from './spotlight-stage';

const destroy = createSpotlightStage(document.querySelector('#hero'), {
  speed: 1,
});

destroy();`,
  'ring-portal': `import { createRingPortal } from './ring-portal';

const destroy = createRingPortal(document.querySelector('#hero'), {
  particles: 600,
  speed: 1,
});

destroy();`,
  'motion-text-reveal': `import { createTextReveal } from './motion-text-reveal';

const destroy = createTextReveal(document.querySelector('#headline'), {
  text: 'Motion is meaning',
  stagger: 0.035,
});`,
  'motion-words-slide': `import { createWordsSlide } from './motion-words-slide';

createWordsSlide(document.querySelector('#headline'), {
  text: 'Copy. Paste. Ship faster.',
});`,
  'motion-scroll-reveal': `import { createScrollReveal } from './motion-scroll-reveal';

createScrollReveal(document.querySelector('#feed'), { stagger: 0.12 });`,
  'motion-parallax-layers': `import { createParallaxLayers } from './motion-parallax-layers';

createParallaxLayers(document.querySelector('#hero'), { depthStep: 14 });`,
  'motion-magnetic-button': `import { createMagneticButton } from './motion-magnetic-button';

createMagneticButton(document.querySelector('#cta'), { strength: 0.45 });`,
  'motion-counter-roll': `import { createCounterRoll } from './motion-counter-roll';

createCounterRoll(document.querySelector('#stat'), { to: 4200, suffix: '+' });`,
  'motion-marquee-loop': `import { createMarqueeLoop } from './motion-marquee-loop';

createMarqueeLoop(document.querySelector('#ticker'), { speed: 60 });`,
  'motion-letter-scramble': `import { createLetterScramble } from './motion-letter-scramble';

createLetterScramble(document.querySelector('#logo'), { text: 'HOVER TO DECODE' });`,
  'motion-elastic-drag': `import { createElasticDrag } from './motion-elastic-drag';

createElasticDrag(document.querySelector('#playground'), { title: 'Drag me' });`,
};
