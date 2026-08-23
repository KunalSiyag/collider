type Disposer = () => void;
type Factory = (container: HTMLElement, options?: Record<string, unknown>) => Disposer;

const loaders: Record<string, () => Promise<Factory>> = {
  'particle-field': async () =>
    (await import('../elements/particle-field')).createParticleField as unknown as Factory,
  'wave-plane': async () =>
    (await import('../elements/wave-plane')).createWavePlane as unknown as Factory,
  'grid-floor': async () =>
    (await import('../elements/grid-floor')).createGridFloor as unknown as Factory,
  'distorted-sphere': async () =>
    (await import('../elements/distorted-sphere')).createDistortedSphere as unknown as Factory,
  'wireframe-globe': async () =>
    (await import('../elements/wireframe-globe')).createWireframeGlobe as unknown as Factory,
  'liquid-knot': async () =>
    (await import('../elements/liquid-knot')).createLiquidKnot as unknown as Factory,
  'floating-shapes': async () =>
    (await import('../elements/floating-shapes')).createFloatingShapes as unknown as Factory,
  'orbit-loader': async () =>
    (await import('../elements/orbit-loader')).createOrbitLoader as unknown as Factory,
  'galaxy-spiral': async () =>
    (await import('../elements/galaxy-spiral')).createGalaxySpiral as unknown as Factory,
  'star-hyperspace': async () =>
    (await import('../elements/star-hyperspace')).createStarHyperspace as unknown as Factory,
  'constellation-network': async () =>
    (await import('../elements/constellation-network')).createConstellationNetwork as unknown as Factory,
  'text-particles': async () =>
    (await import('../elements/text-particles')).createTextParticles as unknown as Factory,
  'ripple-rings': async () =>
    (await import('../elements/ripple-rings')).createRippleRings as unknown as Factory,
  'flow-field': async () =>
    (await import('../elements/flow-field')).createFlowField as unknown as Factory,
  'shard-crystal': async () =>
    (await import('../elements/shard-crystal')).createShardCrystal as unknown as Factory,
  'torus-tunnel': async () =>
    (await import('../elements/torus-tunnel')).createTorusTunnel as unknown as Factory,
  'dot-terrain': async () =>
    (await import('../elements/dot-terrain')).createDotTerrain as unknown as Factory,
  'helix-strand': async () =>
    (await import('../elements/helix-strand')).createHelixStrand as unknown as Factory,
  'fog-drift': async () =>
    (await import('../elements/fog-drift')).createFogDrift as unknown as Factory,
  'pulse-ring': async () =>
    (await import('../elements/pulse-ring')).createPulseRing as unknown as Factory,
  'wire-cube': async () =>
    (await import('../elements/wire-cube')).createWireCube as unknown as Factory,
  monolith: async () =>
    (await import('../elements/monolith')).createMonolith as unknown as Factory,
  'spotlight-stage': async () =>
    (await import('../elements/spotlight-stage')).createSpotlightStage as unknown as Factory,
  'ring-portal': async () =>
    (await import('../elements/ring-portal')).createRingPortal as unknown as Factory,
  'motion-text-reveal': async () =>
    (await import('../motions/motion-text-reveal')).createTextReveal as unknown as Factory,
  'motion-words-slide': async () =>
    (await import('../motions/motion-words-slide')).createWordsSlide as unknown as Factory,
  'motion-scroll-reveal': async () =>
    (await import('../motions/motion-scroll-reveal')).createScrollReveal as unknown as Factory,
  'motion-parallax-layers': async () =>
    (await import('../motions/motion-parallax-layers')).createParallaxLayers as unknown as Factory,
  'motion-magnetic-button': async () =>
    (await import('../motions/motion-magnetic-button')).createMagneticButton as unknown as Factory,
  'motion-counter-roll': async () =>
    (await import('../motions/motion-counter-roll')).createCounterRoll as unknown as Factory,
  'motion-marquee-loop': async () =>
    (await import('../motions/motion-marquee-loop')).createMarqueeLoop as unknown as Factory,
  'motion-letter-scramble': async () =>
    (await import('../motions/motion-letter-scramble')).createLetterScramble as unknown as Factory,
  'motion-elastic-drag': async () =>
    (await import('../motions/motion-elastic-drag')).createElasticDrag as unknown as Factory,
  'effect-glass-card': async () =>
    (await import('../effects/effect-glass-card')).createGlassCard as unknown as Factory,
  'effect-neon-text': async () =>
    (await import('../effects/effect-neon-text')).createNeonText as unknown as Factory,
  'effect-gradient-border-spin': async () =>
    (await import('../effects/effect-gradient-border-spin')).createGradientBorderSpin as unknown as Factory,
  'effect-shimmer-skeleton': async () =>
    (await import('../effects/effect-shimmer-skeleton')).createShimmerSkeleton as unknown as Factory,
  'effect-spotlight-card': async () =>
    (await import('../effects/effect-spotlight-card')).createSpotlightCard as unknown as Factory,
  'effect-glitch-text': async () =>
    (await import('../effects/effect-glitch-text')).createGlitchText as unknown as Factory,
  'effect-flip-card': async () =>
    (await import('../effects/effect-flip-card')).createFlipCard as unknown as Factory,
  'effect-aurora-border': async () =>
    (await import('../effects/effect-aurora-border')).createAuroraBorder as unknown as Factory,
  'effect-blob-morph': async () =>
    (await import('../effects/effect-blob-morph')).createBlobMorph as unknown as Factory,
  'effect-gradient-text-flow': async () =>
    (await import('../effects/effect-gradient-text-flow')).createGradientTextFlow as unknown as Factory,
  'effect-typing-dots': async () =>
    (await import('../effects/effect-typing-dots')).createTypingDots as unknown as Factory,
  'button-glow': async () =>
    (await import('../buttons/button-glow')).createGlowButton as unknown as Factory,
  'button-neon-outline': async () =>
    (await import('../buttons/button-neon-outline')).createNeonOutlineButton as unknown as Factory,
  'button-glass': async () =>
    (await import('../buttons/button-glass')).createGlassButton as unknown as Factory,
  'button-loading': async () =>
    (await import('../buttons/button-loading')).createLoadingButton as unknown as Factory,
  'button-icon-slide': async () =>
    (await import('../buttons/button-icon-slide')).createIconSlideButton as unknown as Factory,
  'button-social-circle': async () =>
    (await import('../buttons/button-social-circle')).createSocialCircleButtons as unknown as Factory,
  'button-border-trace': async () =>
    (await import('../buttons/button-border-trace')).createBorderTraceButton as unknown as Factory,
  'button-elastic-press': async () =>
    (await import('../buttons/button-elastic-press')).createElasticPressButton as unknown as Factory,
  'motion-typewriter': async () =>
    (await import('../motions/motion-typewriter')).createTypewriter as unknown as Factory,
  'motion-wave-text': async () =>
    (await import('../motions/motion-wave-text')).createWaveText as unknown as Factory,
  'motion-click-burst': async () =>
    (await import('../motions/motion-click-burst')).createClickBurst as unknown as Factory,
  'motion-hover-reveal': async () =>
    (await import('../motions/motion-hover-reveal')).createHoverReveal as unknown as Factory,
  'motion-progress-scrub': async () =>
    (await import('../motions/motion-progress-scrub')).createProgressScrub as unknown as Factory,
  'motion-stagger-grid': async () =>
    (await import('../motions/motion-stagger-grid')).createStaggerGrid as unknown as Factory,
  'motion-cursor-blob': async () =>
    (await import('../motions/motion-cursor-blob')).createCursorBlob as unknown as Factory,
  'motion-elastic-nav': async () =>
    (await import('../motions/motion-elastic-nav')).createElasticNav as unknown as Factory,
  'motion-shine-button': async () =>
    (await import('../motions/motion-shine-button')).createShineSweepButton as unknown as Factory,
  'motion-scrub-text': async () =>
    (await import('../motions/motion-scrub-text')).createScrubText as unknown as Factory,
  'motion-split-flap': async () =>
    (await import('../motions/motion-split-flap')).createSplitFlap as unknown as Factory,
  'motion-pendulum': async () =>
    (await import('../motions/motion-pendulum')).createPendulumSwing as unknown as Factory,
  'd25-tilt-card': async () =>
    (await import('../d25/d25-tilt-card')).createTiltCard as unknown as Factory,
  'd25-layered-scene': async () =>
    (await import('../d25/d25-layered-scene')).createLayeredScene as unknown as Factory,
  'd25-depth-fan': async () =>
    (await import('../d25/d25-depth-fan')).createDepthFan as unknown as Factory,
  'd25-room-window': async () =>
    (await import('../d25/d25-room-window')).createRoomWindow as unknown as Factory,
  'd25-hologram-panel': async () =>
    (await import('../d25/d25-hologram-panel')).createHologramPanel as unknown as Factory,
  'd25-moving-shadow': async () =>
    (await import('../d25/d25-moving-shadow')).createMovingShadow as unknown as Factory,
  'd25-popup-book': async () =>
    (await import('../d25/d25-popup-book')).createPopupBook as unknown as Factory,
  'd25-city-blocks': async () =>
    (await import('../d25/d25-city-blocks')).createCityBlocks as unknown as Factory,
  'd25-floating-light': async () =>
    (await import('../d25/d25-floating-light')).createFloatingLight as unknown as Factory,
  'd25-extruded-badge': async () =>
    (await import('../d25/d25-extruded-badge')).createExtrudedBadge as unknown as Factory,
  'loader-dots': async () =>
    (await import('../loaders/loader-dots')).createLoaderDots as unknown as Factory,
  'loader-ring': async () =>
    (await import('../loaders/loader-ring')).createLoaderRing as unknown as Factory,
  'loader-bars': async () =>
    (await import('../loaders/loader-bars')).createLoaderBars as unknown as Factory,
  'loader-orbit-css': async () =>
    (await import('../loaders/loader-orbit-css')).createLoaderOrbit as unknown as Factory,
  'loader-liquid': async () =>
    (await import('../loaders/loader-liquid')).createLoaderLiquid as unknown as Factory,
  'loader-flip': async () =>
    (await import('../loaders/loader-flip')).createLoaderFlip as unknown as Factory,
  'matrix-rain': async () =>
    (await import('../elements/matrix-rain')).createMatrixRain as unknown as Factory,
  'bubble-stream': async () =>
    (await import('../elements/bubble-stream')).createBubbleStream as unknown as Factory,
  'aurora-curtain': async () =>
    (await import('../elements/aurora-curtain')).createAuroraCurtain as unknown as Factory,
  plasma: async () =>
    (await import('../elements/plasma')).createPlasma as unknown as Factory,
  'color-waves': async () =>
    (await import('../elements/color-waves')).createColorWaves as unknown as Factory,
  'bokeh-lights': async () =>
    (await import('../elements/bokeh-lights')).createBokehLights as unknown as Factory,
  'button-toggle-switch': async () =>
    (await import('../buttons/button-toggle-switch')).createToggleSwitch as unknown as Factory,
  'button-copy-feedback': async () =>
    (await import('../buttons/button-copy-feedback')).createCopyFeedbackButton as unknown as Factory,
  'button-slide-text': async () =>
    (await import('../buttons/button-slide-text')).createSlideTextButton as unknown as Factory,
  'effect-chromatic-hover': async () =>
    (await import('../effects/effect-chromatic-hover')).createChromaticHover as unknown as Factory,
  'effect-vignette-panel': async () =>
    (await import('../effects/effect-vignette-panel')).createVignettePanel as unknown as Factory,
  'effect-input-glow': async () =>
    (await import('../effects/effect-input-glow')).createInputGlow as unknown as Factory,
};

const pending = new WeakSet<Element>();

async function mount(container: HTMLElement) {
  const slug = container.dataset.collider;
  if (!slug || !(slug in loaders)) return;
  try {
    pending.add(container);
    container.dataset.colliderMounted = 'pending';
    const factory = await loaders[slug]();
    if (!container.isConnected) {
      pending.delete(container);
      return;
    }

    let options: Record<string, unknown> = {};
    if (container.dataset.options) {
      try {
        options = JSON.parse(container.dataset.options) as Record<string, unknown>;
      } catch {
        options = {};
      }
    }

    container.dataset.colliderMounted = 'true';
    pending.delete(container);
    const dispose = factory(container, options);
    (container as HTMLElement & { __colliderDispose?: Disposer }).__colliderDispose = dispose;
  } catch (error) {
    const debug = (window as unknown as { __colliderDebug?: unknown[] }).__colliderDebug;
    if (Array.isArray(debug)) debug.push(`ERR ${slug}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function unmount(container: HTMLElement) {
  const holder = container as HTMLElement & { __colliderDispose?: Disposer };
  if (holder.__colliderDispose) {
    holder.__colliderDispose();
    holder.__colliderDispose = undefined;
  }
  delete container.dataset.colliderMounted;
}

const visibility = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      const el = entry.target as HTMLElement;
      if (entry.isIntersecting) {
        if (!el.dataset.colliderMounted && !pending.has(el)) void mount(el);
      } else if (el.dataset.colliderMounted === 'true') {
        unmount(el);
      }
    }
  },
  { rootMargin: '300px 0px' },
);

function init() {
  const els = [...document.querySelectorAll<HTMLElement>('[data-collider]')];
  els.forEach((el) => {
    if (!el.dataset.colliderMounted && !pending.has(el)) void mount(el);
    visibility.observe(el);
  });
}

init();
