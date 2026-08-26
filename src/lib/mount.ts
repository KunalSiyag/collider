/**
 * Collider mount runtime
 * ======================
 * This script is included once per site page. It finds every placeholder
 * element marked with `data-collider="<slug>"` and lazily loads + runs the
 * matching factory for it.
 *
 * LIFECYCLE
 * ---------
 *   1. On load we *observe* (not run) every `[data-collider]` node with an
 *      IntersectionObserver.
 *   2. When a node scrolls within 300px of the viewport, its factory module is
 *      dynamically imported (`loaders` map below) and invoked:
 *          const dispose = factory(container, options)
 *   3. When the node leaves the viewport, `dispose()` is called so animations,
 *      rAF loops and WebGL contexts are torn down. Nothing renders offscreen.
 *   4. Scrolling back re-mounts it fresh.
 *
 * HOW TO ADD A NEW ELEMENT
 * ------------------------
 *   1. Create `src/<group>/<slug>.ts` exporting e.g.
 *      `export function createMyThing(container, options) { ...; return () => {...} }`
 *   2. Register it in the `loaders` map below:
 *          'my-thing': async () => (await import('../groups/my-thing')).createMyThing,
 *   3. Add metadata to `src/lib/registry.ts`.
 *
 * PERFORMANCE NOTES
 * -----------------
 *   - Because each entry uses `await import(...)`, Vite code-splits every
 *     element into its own chunk; a page only downloads JS for elements that
 *     actually become visible.
 *   - Mounting is driven purely by the IntersectionObserver's initial callback,
 *     which fires for all observed nodes immediately after `observe()` is
 *     called. We therefore do NOT eagerly call `mount()` in init() — doing so
 *     used to download and start every animation on the page at load time and
 *     then instantly unmount the ones below the fold (double work).
 */
type Disposer = () => void;
type Factory = (container: HTMLElement, options?: Record<string, unknown>) => Disposer;

/* slug -> lazy module loader. Every dynamic import here becomes a separate
 * chunk in the build. Keep keys in sync with registry.ts slugs. */
const loaders: Record<string, () => Promise<Factory>> = {
  // Overlay, table and tooltip factories.
  'overlay-modal': async () =>
    (await import('../overlays/overlay-modal')).createModal as unknown as Factory,
  'overlay-command-palette': async () =>
    (await import('../overlays/overlay-command-palette')).createCommandPalette as unknown as Factory,
  'overlay-popover': async () =>
    (await import('../overlays/overlay-popover')).createPopover as unknown as Factory,
  'overlay-drawer': async () =>
    (await import('../overlays/overlay-drawer')).createDrawer as unknown as Factory,
  'overlay-snackbar': async () =>
    (await import('../overlays/overlay-snackbar')).createSnackbar as unknown as Factory,
  'overlay-confirm-dialog': async () =>
    (await import('../overlays/overlay-confirm-dialog')).createConfirmDialog as unknown as Factory,
  'overlay-lightbox': async () =>
    (await import('../overlays/overlay-lightbox')).createLightbox as unknown as Factory,
  'overlay-context-menu': async () =>
    (await import('../overlays/overlay-context-menu')).createContextContextMenu as unknown as Factory,
  'table-sortable': async () =>
    (await import('../tables/table-sortable')).createSortableTable as unknown as Factory,
  'table-selectable': async () =>
    (await import('../tables/table-selectable')).createSelectableTable as unknown as Factory,
  'table-expandable': async () =>
    (await import('../tables/table-expandable')).createExpandableTable as unknown as Factory,
  'table-skeleton': async () =>
    (await import('../tables/table-skeleton')).createSkeletonTable as unknown as Factory,
  'table-sparkline-rows': async () =>
    (await import('../tables/table-sparkline-rows')).createSparklineRows as unknown as Factory,
  'table-inline-edit': async () =>
    (await import('../tables/table-inline-edit')).createInlineEditTable as unknown as Factory,
  'tooltip-follow': async () =>
    (await import('../tooltips/tooltip-follow')).createFollowTooltip as unknown as Factory,
  'tooltip-hotkey': async () =>
    (await import('../tooltips/tooltip-hotkey')).createHotkeyTooltip as unknown as Factory,
  'tooltip-rich': async () =>
    (await import('../tooltips/tooltip-rich')).createRichTooltip as unknown as Factory,
  'tooltip-anchor': async () =>
    (await import('../tooltips/tooltip-anchor')).createAnchorTooltip as unknown as Factory,
  'tooltip-copy': async () =>
    (await import('../tooltips/tooltip-copy')).createCopyTooltip as unknown as Factory,
  'tooltip-avatar-stack': async () =>
    (await import('../tooltips/tooltip-avatar-stack')).createAvatarTooltip as unknown as Factory,
  // Cards and pricing factories.
  'card-profile': async () =>
    (await import('../cards/card-profile')).createProfileCard as unknown as Factory,
  'card-product': async () =>
    (await import('../cards/card-product')).createProductCard as unknown as Factory,
  'card-stat': async () =>
    (await import('../cards/card-stat')).createStatCard as unknown as Factory,
  'card-testimonial': async () =>
    (await import('../cards/card-testimonial')).createTestimonialCard as unknown as Factory,
  'card-article': async () =>
    (await import('../cards/card-article')).createArticleCard as unknown as Factory,
  'card-team': async () =>
    (await import('../cards/card-team')).createTeamCard as unknown as Factory,
  'card-notification': async () =>
    (await import('../cards/card-notification')).createNotificationCard as unknown as Factory,
  'card-login': async () =>
    (await import('../cards/card-login')).createLoginCard as unknown as Factory,
  'pricing-tiers': async () =>
    (await import('../pricing/pricing-tiers')).createPricingTiers as unknown as Factory,
  'pricing-billing-toggle': async () =>
    (await import('../pricing/pricing-billing-toggle')).createBillingToggle as unknown as Factory,
  'pricing-feature-table': async () =>
    (await import('../pricing/pricing-feature-table')).createFeatureTable as unknown as Factory,
  'pricing-hero': async () =>
    (await import('../pricing/pricing-hero')).createPricingHero as unknown as Factory,
  'pricing-addon-picker': async () =>
    (await import('../pricing/pricing-addon-picker')).createAddonPicker as unknown as Factory,
  'pricing-coupon': async () =>
    (await import('../pricing/pricing-coupon')).createCouponInput as unknown as Factory,
  'pricing-invoice': async () =>
    (await import('../pricing/pricing-invoice')).createInvoiceCard as unknown as Factory,
  'pricing-currency': async () =>
    (await import('../pricing/pricing-currency')).createCurrencySwitcher as unknown as Factory,
  // Forms and nav factories.
  'form-floating-label': async () =>
    (await import('../forms/form-floating-label')).createFloatingLabelInput as unknown as Factory,
  'form-search-expand': async () =>
    (await import('../forms/form-search-expand')).createSearchExpand as unknown as Factory,
  'form-otp-input': async () =>
    (await import('../forms/form-otp-input')).createOtpInput as unknown as Factory,
  'form-toggle-row': async () =>
    (await import('../forms/form-toggle-row')).createToggleRow as unknown as Factory,
  'form-range-slider': async () =>
    (await import('../forms/form-range-slider')).createRangeSlider as unknown as Factory,
  'form-checkbox-draw': async () =>
    (await import('../forms/form-checkbox-draw')).createCheckboxDraw as unknown as Factory,
  'form-radio-cards': async () =>
    (await import('../forms/form-radio-cards')).createRadioCards as unknown as Factory,
  'form-input-counter': async () =>
    (await import('../forms/form-input-counter')).createInputCounter as unknown as Factory,
  'nav-pill-nav': async () =>
    (await import('../navs/nav-pill-nav')).createPillNav as unknown as Factory,
  'nav-underline-tabs': async () =>
    (await import('../navs/nav-underline-tabs')).createUnderlineTabs as unknown as Factory,
  'nav-stepper': async () =>
    (await import('../navs/nav-stepper')).createStepper as unknown as Factory,
  'nav-dock-magnify': async () =>
    (await import('../navs/nav-dock-magnify')).createDockMagnify as unknown as Factory,
  'nav-breadcrumb': async () =>
    (await import('../navs/nav-breadcrumb')).createBreadcrumb as unknown as Factory,
  'nav-rail': async () =>
    (await import('../navs/nav-rail')).createRailNav as unknown as Factory,
  'nav-dots-pager': async () =>
    (await import('../navs/nav-dots-pager')).createDotsPager as unknown as Factory,
  'nav-burger-morph': async () =>
    (await import('../navs/nav-burger-morph')).createBurgerMorph as unknown as Factory,
  // Quality-wave additions.
  'loader-honeycomb': async () =>
    (await import('../loaders/loader-honeycomb')).createLoaderHoneycomb as unknown as Factory,
  'loader-sunrise': async () =>
    (await import('../loaders/loader-sunrise')).createLoaderSunrise as unknown as Factory,
  'loader-shuffle': async () =>
    (await import('../loaders/loader-shuffle')).createLoaderShuffle as unknown as Factory,
  'button-progress-fill': async () =>
    (await import('../buttons/button-progress-fill')).createProgressFillButton as unknown as Factory,
  'button-flip-confirm': async () =>
    (await import('../buttons/button-flip-confirm')).createFlipConfirmButton as unknown as Factory,
  'effect-aurora-text': async () =>
    (await import('../effects/effect-aurora-text')).createAuroraText as unknown as Factory,
  'effect-magnetic-card': async () =>
    (await import('../effects/effect-magnetic-card')).createMagneticCard as unknown as Factory,
  'motion-elastic-tooltip': async () =>
    (await import('../motions/motion-elastic-tooltip')).createElasticTooltip as unknown as Factory,
  'motion-bounce-badge': async () =>
    (await import('../motions/motion-bounce-badge')).createBounceBadge as unknown as Factory,
  'd25-coin-stack': async () =>
    (await import('../d25/d25-coin-stack')).createCoinStack as unknown as Factory,
  'd25-stair-shadow': async () =>
    (await import('../d25/d25-stair-shadow')).createStairShadow as unknown as Factory,
  'rain-ripples': async () =>
    (await import('../elements/rain-ripples')).createRainRipples as unknown as Factory,
  'aurora-waves': async () =>
    (await import('../elements/aurora-waves')).createAuroraWaves as unknown as Factory,
  'paper-crane-3d': async () =>
    (await import('../elements/paper-crane-3d')).createPaperCrane3D as unknown as Factory,
  'hourglass-3d': async () =>
    (await import('../elements/hourglass-3d')).createHourglass3D as unknown as Factory,
  'neon-city-hero': async () =>
    (await import('../elements/neon-city-hero')).createNeonCityHero as unknown as Factory,
  'murmuration-hero': async () =>
    (await import('../elements/murmuration-hero')).createMurmurationHero as unknown as Factory,
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
  "loader-atom-orbits": async () =>
    (await import('../loaders/loader-atom-orbits')).createLoaderAtomOrbits as unknown as Factory,
  "loader-aurora-shift": async () =>
    (await import('../loaders/loader-aurora-shift')).createLoaderAuroraShift as unknown as Factory,
  "loader-balloon-bob": async () =>
    (await import('../loaders/loader-balloon-bob')).createLoaderBalloonBob as unknown as Factory,
  "loader-battery-fill": async () =>
    (await import('../loaders/loader-battery-fill')).createLoaderBatteryFill as unknown as Factory,
  "loader-binary-scroll": async () =>
    (await import('../loaders/loader-binary-scroll')).createLoaderBinaryScroll as unknown as Factory,
  "loader-black-hole": async () =>
    (await import('../loaders/loader-black-hole')).createLoaderBlackHole as unknown as Factory,
  "loader-bokeh-blur": async () =>
    (await import('../loaders/loader-bokeh-blur')).createLoaderBokehBlur as unknown as Factory,
  "loader-bracket-orbit": async () =>
    (await import('../loaders/loader-bracket-orbit')).createLoaderBracketOrbit as unknown as Factory,
  "loader-bubble-rise": async () =>
    (await import('../loaders/loader-bubble-rise')).createLoaderBubbleRise as unknown as Factory,
  "loader-bulb-flicker": async () =>
    (await import('../loaders/loader-bulb-flicker')).createLoaderBulbFlicker as unknown as Factory,
  "loader-butterfly-flap": async () =>
    (await import('../loaders/loader-butterfly-flap')).createLoaderButterflyFlap as unknown as Factory,
  "loader-card-flip3d": async () =>
    (await import('../loaders/loader-card-flip3d')).createLoaderCardFlip3d as unknown as Factory,
  "loader-cassette-reels": async () =>
    (await import('../loaders/loader-cassette-reels')).createLoaderCassetteReels as unknown as Factory,
  "loader-checkmark-draw": async () =>
    (await import('../loaders/loader-checkmark-draw')).createLoaderCheckmarkDraw as unknown as Factory,
  "loader-circle-trace": async () =>
    (await import('../loaders/loader-circle-trace')).createLoaderCircleTrace as unknown as Factory,
  "loader-clock-hands": async () =>
    (await import('../loaders/loader-clock-hands')).createLoaderClockHands as unknown as Factory,
  "loader-cocktail-stir": async () =>
    (await import('../loaders/loader-cocktail-stir')).createLoaderCocktailStir as unknown as Factory,
  "loader-code-blocks": async () =>
    (await import('../loaders/loader-code-blocks')).createLoaderCodeBlocks as unknown as Factory,
  "loader-coffee-steam": async () =>
    (await import('../loaders/loader-coffee-steam')).createLoaderCoffeeSteam as unknown as Factory,
  "loader-comet-tail": async () =>
    (await import('../loaders/loader-comet-tail')).createLoaderCometTail as unknown as Factory,
  "loader-compass-needle": async () =>
    (await import('../loaders/loader-compass-needle')).createLoaderCompassNeedle as unknown as Factory,
  "loader-count-up": async () =>
    (await import('../loaders/loader-count-up')).createLoaderCountUp as unknown as Factory,
  "loader-dice-tumble": async () =>
    (await import('../loaders/loader-dice-tumble')).createLoaderDiceTumble as unknown as Factory,
  "loader-dna-helix": async () =>
    (await import('../loaders/loader-dna-helix')).createLoaderDnaHelix as unknown as Factory,
  "loader-domino-fall": async () =>
    (await import('../loaders/loader-domino-fall')).createLoaderDominoFall as unknown as Factory,
  "loader-dot-grid-wave": async () =>
    (await import('../loaders/loader-dot-grid-wave')).createLoaderDotGridWave as unknown as Factory,
  "loader-droplet-drip": async () =>
    (await import('../loaders/loader-droplet-drip')).createLoaderDropletDrip as unknown as Factory,
  "loader-ember-rise": async () =>
    (await import('../loaders/loader-ember-rise')).createLoaderEmberRise as unknown as Factory,
  "loader-equalizer": async () =>
    (await import('../loaders/loader-equalizer')).createLoaderEqualizer as unknown as Factory,
  "loader-fan-blades": async () =>
    (await import('../loaders/loader-fan-blades')).createLoaderFanBlades as unknown as Factory,
  "loader-fidget-spinner": async () =>
    (await import('../loaders/loader-fidget-spinner')).createLoaderFidgetSpinner as unknown as Factory,
  "loader-firefly-drift": async () =>
    (await import('../loaders/loader-firefly-drift')).createLoaderFireflyDrift as unknown as Factory,
  "loader-fish-school": async () =>
    (await import('../loaders/loader-fish-school')).createLoaderFishSchool as unknown as Factory,
  "loader-gear-turn": async () =>
    (await import('../loaders/loader-gear-turn')).createLoaderGearTurn as unknown as Factory,
  "loader-glitch-text": async () =>
    (await import('../loaders/loader-glitch-text')).createLoaderGlitchText as unknown as Factory,
  "loader-globe-meridians": async () =>
    (await import('../loaders/loader-globe-meridians')).createLoaderGlobeMeridians as unknown as Factory,
  "loader-hammer-pulse": async () =>
    (await import('../loaders/loader-hammer-pulse')).createLoaderHammerPulse as unknown as Factory,
  "loader-heart-pulse": async () =>
    (await import('../loaders/loader-heart-pulse')).createLoaderHeartPulse as unknown as Factory,
  "loader-heartbeat-line": async () =>
    (await import('../loaders/loader-heartbeat-line')).createLoaderHeartbeatLine as unknown as Factory,
  "loader-hexagon-cluster": async () =>
    (await import('../loaders/loader-hexagon-cluster')).createLoaderHexagonCluster as unknown as Factory,
  "loader-infinity-trace": async () =>
    (await import('../loaders/loader-infinity-trace')).createLoaderInfinityTrace as unknown as Factory,
  "loader-jellyfish-bob": async () =>
    (await import('../loaders/loader-jellyfish-bob')).createLoaderJellyfishBob as unknown as Factory,
  "loader-kaleidoscope": async () =>
    (await import('../loaders/loader-kaleidoscope')).createLoaderKaleidoscope as unknown as Factory,
  "loader-ladder-climb": async () =>
    (await import('../loaders/loader-ladder-climb')).createLoaderLadderClimb as unknown as Factory,
  "loader-letter-bounce": async () =>
    (await import('../loaders/loader-letter-bounce')).createLoaderLetterBounce as unknown as Factory,
  "loader-lightning-bolt": async () =>
    (await import('../loaders/loader-lightning-bolt')).createLoaderLightningBolt as unknown as Factory,
  "loader-lissajous-dot": async () =>
    (await import('../loaders/loader-lissajous-dot')).createLoaderLissajousDot as unknown as Factory,
  "loader-magnifier-scan": async () =>
    (await import('../loaders/loader-magnifier-scan')).createLoaderMagnifierScan as unknown as Factory,
  "loader-map-pin-bounce": async () =>
    (await import('../loaders/loader-map-pin-bounce')).createLoaderMapPinBounce as unknown as Factory,
  "loader-matrix-rain": async () =>
    (await import('../loaders/loader-matrix-rain')).createLoaderMatrixRain as unknown as Factory,
  "loader-meteor-shower": async () =>
    (await import('../loaders/loader-meteor-shower')).createLoaderMeteorShower as unknown as Factory,
  "loader-mixer-faders": async () =>
    (await import('../loaders/loader-mixer-faders')).createLoaderMixerFaders as unknown as Factory,
  "loader-moon-phases": async () =>
    (await import('../loaders/loader-moon-phases')).createLoaderMoonPhases as unknown as Factory,
  "loader-neon-flicker": async () =>
    (await import('../loaders/loader-neon-flicker')).createLoaderNeonFlicker as unknown as Factory,
  "loader-newton-cradle": async () =>
    (await import('../loaders/loader-newton-cradle')).createLoaderNewtonCradle as unknown as Factory,
  "loader-orbit-moons": async () =>
    (await import('../loaders/loader-orbit-moons')).createLoaderOrbitMoons as unknown as Factory,
  "loader-oscilloscope": async () =>
    (await import('../loaders/loader-oscilloscope')).createLoaderOscilloscope as unknown as Factory,
  "loader-pacman-chomp": async () =>
    (await import('../loaders/loader-pacman-chomp')).createLoaderPacmanChomp as unknown as Factory,
  "loader-paper-plane": async () =>
    (await import('../loaders/loader-paper-plane')).createLoaderPaperPlane as unknown as Factory,
  "loader-pendulum-swing": async () =>
    (await import('../loaders/loader-pendulum-swing')).createLoaderPendulumSwing as unknown as Factory,
  "loader-percent-ring": async () =>
    (await import('../loaders/loader-percent-ring')).createLoaderPercentRing as unknown as Factory,
  "loader-pinwheel": async () =>
    (await import('../loaders/loader-pinwheel')).createLoaderPinwheel as unknown as Factory,
  "loader-pizza-spin": async () =>
    (await import('../loaders/loader-pizza-spin')).createLoaderPizzaSpin as unknown as Factory,
  "loader-prism-split": async () =>
    (await import('../loaders/loader-prism-split')).createLoaderPrismSplit as unknown as Factory,
  "loader-propeller": async () =>
    (await import('../loaders/loader-propeller')).createLoaderPropeller as unknown as Factory,
  "loader-radar-sweep": async () =>
    (await import('../loaders/loader-radar-sweep')).createLoaderRadarSweep as unknown as Factory,
  "loader-radio-tuner": async () =>
    (await import('../loaders/loader-radio-tuner')).createLoaderRadioTuner as unknown as Factory,
  "loader-rain-cloud": async () =>
    (await import('../loaders/loader-rain-cloud')).createLoaderRainCloud as unknown as Factory,
  "loader-ripple-pond": async () =>
    (await import('../loaders/loader-ripple-pond')).createLoaderRipplePond as unknown as Factory,
  "loader-rocket-launch": async () =>
    (await import('../loaders/loader-rocket-launch')).createLoaderRocketLaunch as unknown as Factory,
  "loader-rubik-cube": async () =>
    (await import('../loaders/loader-rubik-cube')).createLoaderRubikCube as unknown as Factory,
  "loader-satellite-dish": async () =>
    (await import('../loaders/loader-satellite-dish')).createLoaderSatelliteDish as unknown as Factory,
  "loader-saturn-ring": async () =>
    (await import('../loaders/loader-saturn-ring')).createLoaderSaturnRing as unknown as Factory,
  "loader-seismo-bars": async () =>
    (await import('../loaders/loader-seismo-bars')).createLoaderSeismoBars as unknown as Factory,
  "loader-shine-bar": async () =>
    (await import('../loaders/loader-shine-bar')).createLoaderShineBar as unknown as Factory,
  "loader-shooting-star": async () =>
    (await import('../loaders/loader-shooting-star')).createLoaderShootingStar as unknown as Factory,
  "loader-signature-loop": async () =>
    (await import('../loaders/loader-signature-loop')).createLoaderSignatureLoop as unknown as Factory,
  "loader-spiral-swirl": async () =>
    (await import('../loaders/loader-spiral-swirl')).createLoaderSpiralSwirl as unknown as Factory,
  "loader-square-draw": async () =>
    (await import('../loaders/loader-square-draw')).createLoaderSquareDraw as unknown as Factory,
  "loader-square-fold": async () =>
    (await import('../loaders/loader-square-fold')).createLoaderSquareFold as unknown as Factory,
  "loader-stack-cubes": async () =>
    (await import('../loaders/loader-stack-cubes')).createLoaderStackCubes as unknown as Factory,
  "loader-stairs-bounce": async () =>
    (await import('../loaders/loader-stairs-bounce')).createLoaderStairsBounce as unknown as Factory,
  "loader-step-segments": async () =>
    (await import('../loaders/loader-step-segments')).createLoaderStepSegments as unknown as Factory,
  "loader-sun-rays": async () =>
    (await import('../loaders/loader-sun-rays')).createLoaderSunRays as unknown as Factory,
  "loader-target-lock": async () =>
    (await import('../loaders/loader-target-lock')).createLoaderTargetLock as unknown as Factory,
  "loader-terminal-cursor": async () =>
    (await import('../loaders/loader-terminal-cursor')).createLoaderTerminalCursor as unknown as Factory,
  "loader-thermo-fill": async () =>
    (await import('../loaders/loader-thermo-fill')).createLoaderThermoFill as unknown as Factory,
  "loader-toast-pop": async () =>
    (await import('../loaders/loader-toast-pop')).createLoaderToastPop as unknown as Factory,
  "loader-triangle-spin": async () =>
    (await import('../loaders/loader-triangle-spin')).createLoaderTriangleSpin as unknown as Factory,
  "loader-twinkle-field": async () =>
    (await import('../loaders/loader-twinkle-field')).createLoaderTwinkleField as unknown as Factory,
  "loader-typing-cursor": async () =>
    (await import('../loaders/loader-typing-cursor')).createLoaderTypingCursor as unknown as Factory,
  "loader-ufo-beam": async () =>
    (await import('../loaders/loader-ufo-beam')).createLoaderUfoBeam as unknown as Factory,
  "loader-vinyl-spin": async () =>
    (await import('../loaders/loader-vinyl-spin')).createLoaderVinylSpin as unknown as Factory,
  "loader-vu-meter": async () =>
    (await import('../loaders/loader-vu-meter')).createLoaderVuMeter as unknown as Factory,
  "loader-waterfall-dots": async () =>
    (await import('../loaders/loader-waterfall-dots')).createLoaderWaterfallDots as unknown as Factory,
  "loader-wave-lines": async () =>
    (await import('../loaders/loader-wave-lines')).createLoaderWaveLines as unknown as Factory,
  "loader-wifi-arcs": async () =>
    (await import('../loaders/loader-wifi-arcs')).createLoaderWifiArcs as unknown as Factory,
  "loader-windmill": async () =>
    (await import('../loaders/loader-windmill')).createLoaderWindmill as unknown as Factory,
  "loader-yin-yang": async () =>
    (await import('../loaders/loader-yin-yang')).createLoaderYinYang as unknown as Factory,
  "loader-zigzag-runner": async () =>
    (await import('../loaders/loader-zigzag-runner')).createLoaderZigzagRunner as unknown as Factory,
  "button-accordion-expand": async () =>
    (await import('../buttons/button-accordion-expand')).createAccordionExpandButton as unknown as Factory,
  "button-airplane-mode": async () =>
    (await import('../buttons/button-airplane-mode')).createAirplaneModeButton as unknown as Factory,
  "button-api-call": async () =>
    (await import('../buttons/button-api-call')).createApiCallButton as unknown as Factory,
  "button-arcade-start": async () =>
    (await import('../buttons/button-arcade-start')).createArcadeStartButton as unknown as Factory,
  "button-arrow-nudge": async () =>
    (await import('../buttons/button-arrow-nudge')).createArrowNudgeButton as unknown as Factory,
  "button-balloon-pop": async () =>
    (await import('../buttons/button-balloon-pop')).createBalloonPopButton as unknown as Factory,
  "button-battery-charge": async () =>
    (await import('../buttons/button-battery-charge')).createBatteryChargeButton as unknown as Factory,
  "button-bell-badge": async () =>
    (await import('../buttons/button-bell-badge')).createBellBadgeButton as unknown as Factory,
  "button-bluetooth-pair": async () =>
    (await import('../buttons/button-bluetooth-pair')).createBluetoothPairButton as unknown as Factory,
  "button-bookmark-save": async () =>
    (await import('../buttons/button-bookmark-save')).createBookmarkSaveButton as unknown as Factory,
  "button-brutalist-shift": async () =>
    (await import('../buttons/button-brutalist-shift')).createBrutalistShiftButton as unknown as Factory,
  "button-bubble-wrap": async () =>
    (await import('../buttons/button-bubble-wrap')).createBubbleWrapButton as unknown as Factory,
  "button-camera-flash": async () =>
    (await import('../buttons/button-camera-flash')).createCameraFlashButton as unknown as Factory,
  "button-carousel-next": async () =>
    (await import('../buttons/button-carousel-next')).createCarouselNextButton as unknown as Factory,
  "button-cart-add": async () =>
    (await import('../buttons/button-cart-add')).createCartAddButton as unknown as Factory,
  "button-chat-bubble": async () =>
    (await import('../buttons/button-chat-bubble')).createChatBubbleButton as unknown as Factory,
  "button-ci-pipeline": async () =>
    (await import('../buttons/button-ci-pipeline')).createCiPipelineButton as unknown as Factory,
  "button-clap-count": async () =>
    (await import('../buttons/button-clap-count')).createClapCountButton as unknown as Factory,
  "button-code-execute": async () =>
    (await import('../buttons/button-code-execute')).createCodeExecuteButton as unknown as Factory,
  "button-coin-flip": async () =>
    (await import('../buttons/button-coin-flip')).createCoinFlipButton as unknown as Factory,
  "button-color-cycle": async () =>
    (await import('../buttons/button-color-cycle')).createColorCycleButton as unknown as Factory,
  "button-compass-navigate": async () =>
    (await import('../buttons/button-compass-navigate')).createCompassNavigateButton as unknown as Factory,
  "button-confetti-pop": async () =>
    (await import('../buttons/button-confetti-pop')).createConfettiPopButton as unknown as Factory,
  "button-console-log": async () =>
    (await import('../buttons/button-console-log')).createConsoleLogButton as unknown as Factory,
  "button-corners-accent": async () =>
    (await import('../buttons/button-corners-accent')).createCornersAccentButton as unknown as Factory,
  "button-counter-tap": async () =>
    (await import('../buttons/button-counter-tap')).createCounterTapButton as unknown as Factory,
  "button-crystal-glow": async () =>
    (await import('../buttons/button-crystal-glow')).createCrystalGlowButton as unknown as Factory,
  "button-dark-mode-switch": async () =>
    (await import('../buttons/button-dark-mode-switch')).createDarkModeSwitchButton as unknown as Factory,
  "button-dial-rotate": async () =>
    (await import('../buttons/button-dial-rotate')).createDialRotateButton as unknown as Factory,
  "button-dice-roll": async () =>
    (await import('../buttons/button-dice-roll')).createDiceRollButton as unknown as Factory,
  "button-door-open": async () =>
    (await import('../buttons/button-door-open')).createDoorOpenButton as unknown as Factory,
  "button-double-layer-text": async () =>
    (await import('../buttons/button-double-layer-text')).createDoubleLayerTextButton as unknown as Factory,
  "button-download-progress": async () =>
    (await import('../buttons/button-download-progress')).createDownloadProgressButton as unknown as Factory,
  "button-drum-pad": async () =>
    (await import('../buttons/button-drum-pad')).createDrumPadButton as unknown as Factory,
  "button-eject-disc": async () =>
    (await import('../buttons/button-eject-disc')).createEjectDiscButton as unknown as Factory,
  "button-emoji-picker-pill": async () =>
    (await import('../buttons/button-emoji-picker-pill')).createEmojiPickerPill as unknown as Factory,
  "button-fan-speed": async () =>
    (await import('../buttons/button-fan-speed')).createFanSpeedButton as unknown as Factory,
  "button-firework-burst": async () =>
    (await import('../buttons/button-firework-burst')).createFireworkBurstButton as unknown as Factory,
  "button-flip-card": async () =>
    (await import('../buttons/button-flip-card')).createFlipCardButton as unknown as Factory,
  "button-fold-unfold": async () =>
    (await import('../buttons/button-fold-unfold')).createFoldUnfoldButton as unknown as Factory,
  "button-follow-slide": async () =>
    (await import('../buttons/button-follow-slide')).createFollowSlideButton as unknown as Factory,
  "button-fortune-cookie": async () =>
    (await import('../buttons/button-fortune-cookie')).createFortuneCookieButton as unknown as Factory,
  "button-gamepad-dpad": async () =>
    (await import('../buttons/button-gamepad-dpad')).createGamepadDpadButton as unknown as Factory,
  "button-git-commit": async () =>
    (await import('../buttons/button-git-commit')).createGitCommitButton as unknown as Factory,
  "button-glitch-text": async () =>
    (await import('../buttons/button-glitch-text')).createGlitchTextButton as unknown as Factory,
  "button-gradient-border-rotate": async () =>
    (await import('../buttons/button-gradient-border-rotate')).createGradientBorderRotateButton as unknown as Factory,
  "button-gradient-mixer": async () =>
    (await import('../buttons/button-gradient-mixer')).createGradientMixerButton as unknown as Factory,
  "button-heart-burst": async () =>
    (await import('../buttons/button-heart-burst')).createHeartBurstButton as unknown as Factory,
  "button-hold-to-confirm": async () =>
    (await import('../buttons/button-hold-to-confirm')).createHoldToConfirmButton as unknown as Factory,
  "button-hologram-scan": async () =>
    (await import('../buttons/button-hologram-scan')).createHologramScanButton as unknown as Factory,
  "button-hue-picker": async () =>
    (await import('../buttons/button-hue-picker')).createHuePickerButton as unknown as Factory,
  "button-icon-morph": async () =>
    (await import('../buttons/button-icon-morph')).createIconMorphButton as unknown as Factory,
  "button-jelly-press": async () =>
    (await import('../buttons/button-jelly-press')).createJellyPressButton as unknown as Factory,
  "button-joystick-move": async () =>
    (await import('../buttons/button-joystick-move')).createJoystickMoveButton as unknown as Factory,
  "button-keyboard-key": async () =>
    (await import('../buttons/button-keyboard-key')).createKeyboardKeyButton as unknown as Factory,
  "button-lang-toggle": async () =>
    (await import('../buttons/button-lang-toggle')).createLangToggleButton as unknown as Factory,
  "button-lava-lamp": async () =>
    (await import('../buttons/button-lava-lamp')).createLavaLampButton as unknown as Factory,
  "button-lever-pull": async () =>
    (await import('../buttons/button-lever-pull')).createLeverPullButton as unknown as Factory,
  "button-lightbulb-toggle": async () =>
    (await import('../buttons/button-lightbulb-toggle')).createLightbulbToggleButton as unknown as Factory,
  "button-liquid-fill": async () =>
    (await import('../buttons/button-liquid-fill')).createLiquidFillButton as unknown as Factory,
  "button-magic-orb": async () =>
    (await import('../buttons/button-magic-orb')).createMagicOrbButton as unknown as Factory,
  "button-magnet-hover": async () =>
    (await import('../buttons/button-magnet-hover')).createMagnetHoverButton as unknown as Factory,
  "button-mail-send": async () =>
    (await import('../buttons/button-mail-send')).createMailSendButton as unknown as Factory,
  "button-map-zoom": async () =>
    (await import('../buttons/button-map-zoom')).createMapZoomButton as unknown as Factory,
  "button-mic-record": async () =>
    (await import('../buttons/button-mic-record')).createMicRecordButton as unknown as Factory,
  "button-neumorphic-dent": async () =>
    (await import('../buttons/button-neumorphic-dent')).createNeumorphicDentButton as unknown as Factory,
  "button-password-reveal": async () =>
    (await import('../buttons/button-password-reveal')).createPasswordRevealButton as unknown as Factory,
  "button-piano-key": async () =>
    (await import('../buttons/button-piano-key')).createPianoKeyButton as unknown as Factory,
  "button-pin-drop": async () =>
    (await import('../buttons/button-pin-drop')).createPinDropButton as unknown as Factory,
  "button-plasma-ball": async () =>
    (await import('../buttons/button-plasma-ball')).createPlasmaBallButton as unknown as Factory,
  "button-play-pause-morph": async () =>
    (await import('../buttons/button-play-pause-morph')).createPlayPauseMorphButton as unknown as Factory,
  "button-power-toggle": async () =>
    (await import('../buttons/button-power-toggle')).createPowerToggleButton as unknown as Factory,
  "button-pulse-ring": async () =>
    (await import('../buttons/button-pulse-ring')).createPulseRingButton as unknown as Factory,
  "button-reaction-bar": async () =>
    (await import('../buttons/button-reaction-bar')).createReactionBarButton as unknown as Factory,
  "button-repeat-loop": async () =>
    (await import('../buttons/button-repeat-loop')).createRepeatLoopButton as unknown as Factory,
  "button-ripple-click": async () =>
    (await import('../buttons/button-ripple-click')).createRippleClickButton as unknown as Factory,
  "button-rocket-launch": async () =>
    (await import('../buttons/button-rocket-launch')).createRocketLaunchButton as unknown as Factory,
  "button-segmented-control": async () =>
    (await import('../buttons/button-segmented-control')).createSegmentedControl as unknown as Factory,
  "button-server-status": async () =>
    (await import('../buttons/button-server-status')).createServerStatusButton as unknown as Factory,
  "button-shadow-stack": async () =>
    (await import('../buttons/button-shadow-stack')).createShadowStackButton as unknown as Factory,
  "button-shine-sweep": async () =>
    (await import('../buttons/button-shine-sweep')).createShineSweepButton as unknown as Factory,
  "button-shuffle-playlist": async () =>
    (await import('../buttons/button-shuffle-playlist')).createShufflePlaylistButton as unknown as Factory,
  "button-skew-slide": async () =>
    (await import('../buttons/button-skew-slide')).createSkewSlideButton as unknown as Factory,
  "button-skip-track": async () =>
    (await import('../buttons/button-skip-track')).createSkipTrackButton as unknown as Factory,
  "button-slot-machine": async () =>
    (await import('../buttons/button-slot-machine')).createSlotMachineButton as unknown as Factory,
  "button-speed-dial": async () =>
    (await import('../buttons/button-speed-dial')).createSpeedDialButton as unknown as Factory,
  "button-star-rating": async () =>
    (await import('../buttons/button-star-rating')).createStarRatingButton as unknown as Factory,
  "button-tab-switcher": async () =>
    (await import('../buttons/button-tab-switcher')).createTabSwitcherButton as unknown as Factory,
  "button-tag-add": async () =>
    (await import('../buttons/button-tag-add')).createTagAddButton as unknown as Factory,
  "button-terminal-type": async () =>
    (await import('../buttons/button-terminal-type')).createTerminalTypeButton as unknown as Factory,
  "button-text-scramble": async () =>
    (await import('../buttons/button-text-scramble')).createTextScrambleButton as unknown as Factory,
  "button-theme-chips": async () =>
    (await import('../buttons/button-theme-chips')).createThemeChipsButton as unknown as Factory,
  "button-upload-pulse": async () =>
    (await import('../buttons/button-upload-pulse')).createUploadPulseButton as unknown as Factory,
  "button-vinyl-spin": async () =>
    (await import('../buttons/button-vinyl-spin')).createVinylSpinButton as unknown as Factory,
  "button-volume-slider": async () =>
    (await import('../buttons/button-volume-slider')).createVolumeSliderButton as unknown as Factory,
  "button-vote-arrows": async () =>
    (await import('../buttons/button-vote-arrows')).createVoteArrowsButton as unknown as Factory,
  "button-webhook-send": async () =>
    (await import('../buttons/button-webhook-send')).createWebhookSendButton as unknown as Factory,
  "button-whack-a-mole": async () =>
    (await import('../buttons/button-whack-a-mole')).createWhackAMoleButton as unknown as Factory,
  "button-wifi-connect": async () =>
    (await import('../buttons/button-wifi-connect')).createWifiConnectButton as unknown as Factory,
  "button-window-minimize": async () =>
    (await import('../buttons/button-window-minimize')).createWindowMinimizeButton as unknown as Factory,
  "effect-accordion-glow": async () =>
    (await import('../effects/effect-accordion-glow')).createAccordionGlow as unknown as Factory,
  "effect-avatar-stack-fan": async () =>
    (await import('../effects/effect-avatar-stack-fan')).createAvatarStackFan as unknown as Factory,
  "effect-binary-clock": async () =>
    (await import('../effects/effect-binary-clock')).createBinaryClock as unknown as Factory,
  "effect-black-hole-vortex": async () =>
    (await import('../effects/effect-black-hole-vortex')).createBlackHoleVortex as unknown as Factory,
  "effect-blob-cursor-follow": async () =>
    (await import('../effects/effect-blob-cursor-follow')).createBlobCursorFollow as unknown as Factory,
  "effect-bubble-rise": async () =>
    (await import('../effects/effect-bubble-rise')).createBubbleRise as unknown as Factory,
  "effect-button-3d-press": async () =>
    (await import('../effects/effect-button-3d-press')).createButton3dPress as unknown as Factory,
  "effect-campfire-embers": async () =>
    (await import('../effects/effect-campfire-embers')).createCampfireEmbers as unknown as Factory,
  "effect-candle-flame": async () =>
    (await import('../effects/effect-candle-flame')).createCandleFlame as unknown as Factory,
  "effect-checkbox-draw-check": async () =>
    (await import('../effects/effect-checkbox-draw-check')).createCheckboxDrawCheck as unknown as Factory,
  "effect-circle-wipe-reveal": async () =>
    (await import('../effects/effect-circle-wipe-reveal')).createCircleWipeReveal as unknown as Factory,
  "effect-compass-needle": async () =>
    (await import('../effects/effect-compass-needle')).createCompassNeedle as unknown as Factory,
  "effect-confetti-burst-panel": async () =>
    (await import('../effects/effect-confetti-burst-panel')).createConfettiBurstPanel as unknown as Factory,
  "effect-countdown-flip": async () =>
    (await import('../effects/effect-countdown-flip')).createCountdownFlip as unknown as Factory,
  "effect-counter-roll-up": async () =>
    (await import('../effects/effect-counter-roll-up')).createCounterRollUp as unknown as Factory,
  "effect-cursor-trail-sparkles": async () =>
    (await import('../effects/effect-cursor-trail-sparkles')).createCursorTrailSparkles as unknown as Factory,
  "effect-curtain-lights": async () =>
    (await import('../effects/effect-curtain-lights')).createCurtainLights as unknown as Factory,
  "effect-diagonal-wipe-reveal": async () =>
    (await import('../effects/effect-diagonal-wipe-reveal')).createDiagonalWipeReveal as unknown as Factory,
  "effect-dna-helix": async () =>
    (await import('../effects/effect-dna-helix')).createDnaHelix as unknown as Factory,
  "effect-dot-bounce-grid": async () =>
    (await import('../effects/effect-dot-bounce-grid')).createDotBounceGrid as unknown as Factory,
  "effect-dot-matrix-board": async () =>
    (await import('../effects/effect-dot-matrix-board')).createDotMatrixBoard as unknown as Factory,
  "effect-dropdown-fade-scale": async () =>
    (await import('../effects/effect-dropdown-fade-scale')).createDropdownFadeScale as unknown as Factory,
  "effect-eclipse-corona": async () =>
    (await import('../effects/effect-eclipse-corona')).createEclipseCorona as unknown as Factory,
  "effect-energy-shield-hit": async () =>
    (await import('../effects/effect-energy-shield-hit')).createEnergyShieldHit as unknown as Factory,
  "effect-equalizer-bars": async () =>
    (await import('../effects/effect-equalizer-bars')).createEqualizerBars as unknown as Factory,
  "effect-expanding-search-bar": async () =>
    (await import('../effects/effect-expanding-search-bar')).createExpandingSearchBar as unknown as Factory,
  "effect-eye-follow-cursor": async () =>
    (await import('../effects/effect-eye-follow-cursor')).createEyeFollowCursor as unknown as Factory,
  "effect-fab-speed-dial": async () =>
    (await import('../effects/effect-fab-speed-dial')).createFabSpeedDial as unknown as Factory,
  "effect-film-grain-flicker": async () =>
    (await import('../effects/effect-film-grain-flicker')).createFilmGrainFlicker as unknown as Factory,
  "effect-fire-text": async () =>
    (await import('../effects/effect-fire-text')).createFireText as unknown as Factory,
  "effect-folder-open-hover": async () =>
    (await import('../effects/effect-folder-open-hover')).createFolderOpenHover as unknown as Factory,
  "effect-galaxy-swirl-panel": async () =>
    (await import('../effects/effect-galaxy-swirl-panel')).createGalaxySwirlPanel as unknown as Factory,
  "effect-gradient-ring-loader": async () =>
    (await import('../effects/effect-gradient-ring-loader')).createGradientRingLoader as unknown as Factory,
  "effect-gravity-drop-in": async () =>
    (await import('../effects/effect-gravity-drop-in')).createGravityDropIn as unknown as Factory,
  "effect-gyroscope-rings": async () =>
    (await import('../effects/effect-gyroscope-rings')).createGyroscopeRings as unknown as Factory,
  "effect-heart-beat-pulse": async () =>
    (await import('../effects/effect-heart-beat-pulse')).createHeartBeatPulse as unknown as Factory,
  "effect-holo-scan-portrait": async () =>
    (await import('../effects/effect-holo-scan-portrait')).createHoloScanPortrait as unknown as Factory,
  "effect-hourglass-sand": async () =>
    (await import('../effects/effect-hourglass-sand')).createHourglassSand as unknown as Factory,
  "effect-ice-frost-card": async () =>
    (await import('../effects/effect-ice-frost-card')).createIceFrostCard as unknown as Factory,
  "effect-image-compare-slider": async () =>
    (await import('../effects/effect-image-compare-slider')).createImageCompareSlider as unknown as Factory,
  "effect-ink-bleed-reveal": async () =>
    (await import('../effects/effect-ink-bleed-reveal')).createInkBleedReveal as unknown as Factory,
  "effect-iris-transition": async () =>
    (await import('../effects/effect-iris-transition')).createIrisTransition as unknown as Factory,
  "effect-jelly-wobble": async () =>
    (await import('../effects/effect-jelly-wobble')).createJellyWobble as unknown as Factory,
  "effect-kaleidoscope-panel": async () =>
    (await import('../effects/effect-kaleidoscope-panel')).createKaleidoscopePanel as unknown as Factory,
  "effect-kinetic-marquee-ticker": async () =>
    (await import('../effects/effect-kinetic-marquee-ticker')).createKineticMarqueeTicker as unknown as Factory,
  "effect-lava-lamp-panel": async () =>
    (await import('../effects/effect-lava-lamp-panel')).createLavaLampPanel as unknown as Factory,
  "effect-lightbox-zoom": async () =>
    (await import('../effects/effect-lightbox-zoom')).createLightboxZoom as unknown as Factory,
  "effect-lightning-storm": async () =>
    (await import('../effects/effect-lightning-storm')).createLightningStorm as unknown as Factory,
  "effect-loading-bar-striped": async () =>
    (await import('../effects/effect-loading-bar-striped')).createLoadingBarStriped as unknown as Factory,
  "effect-lunar-phases": async () =>
    (await import('../effects/effect-lunar-phases')).createLunarPhases as unknown as Factory,
  "effect-map-pin-drop": async () =>
    (await import('../effects/effect-map-pin-drop')).createMapPinDrop as unknown as Factory,
  "effect-matrix-code-mini": async () =>
    (await import('../effects/effect-matrix-code-mini')).createMatrixCodeMini as unknown as Factory,
  "effect-modal-glass-pop": async () =>
    (await import('../effects/effect-modal-glass-pop')).createModalGlassPop as unknown as Factory,
  "effect-mosaic-tile-reveal": async () =>
    (await import('../effects/effect-mosaic-tile-reveal')).createMosaicTileReveal as unknown as Factory,
  "effect-neon-switch-toggle": async () =>
    (await import('../effects/effect-neon-switch-toggle')).createNeonSwitchToggle as unknown as Factory,
  "effect-night-city-windows": async () =>
    (await import('../effects/effect-night-city-windows')).createNightCityWindows as unknown as Factory,
  "effect-orbit-spinner": async () =>
    (await import('../effects/effect-orbit-spinner')).createOrbitSpinner as unknown as Factory,
  "effect-page-curtain-load": async () =>
    (await import('../effects/effect-page-curtain-load')).createPageCurtainLoad as unknown as Factory,
  "effect-parallax-layers": async () =>
    (await import('../effects/effect-parallax-layers')).createParallaxLayers as unknown as Factory,
  "effect-pendulum-swing": async () =>
    (await import('../effects/effect-pendulum-swing')).createPendulumSwing as unknown as Factory,
  "effect-piano-keys-hover": async () =>
    (await import('../effects/effect-piano-keys-hover')).createPianoKeysHover as unknown as Factory,
  "effect-pinwheel-spin": async () =>
    (await import('../effects/effect-pinwheel-spin')).createPinwheelSpin as unknown as Factory,
  "effect-pixelate-transition": async () =>
    (await import('../effects/effect-pixelate-transition')).createPixelateTransition as unknown as Factory,
  "effect-plasma-panel": async () =>
    (await import('../effects/effect-plasma-panel')).createPlasmaPanel as unknown as Factory,
  "effect-polaroid-scatter-gallery": async () =>
    (await import('../effects/effect-polaroid-scatter-gallery')).createPolaroidScatterGallery as unknown as Factory,
  "effect-pricing-popular-glow": async () =>
    (await import('../effects/effect-pricing-popular-glow')).createPricingPopularGlow as unknown as Factory,
  "effect-progress-ring-timer": async () =>
    (await import('../effects/effect-progress-ring-timer')).createProgressRingTimer as unknown as Factory,
  "effect-radar-sweep": async () =>
    (await import('../effects/effect-radar-sweep')).createRadarSweep as unknown as Factory,
  "effect-radial-menu-expand": async () =>
    (await import('../effects/effect-radial-menu-expand')).createRadialMenuExpand as unknown as Factory,
  "effect-rain-window-panel": async () =>
    (await import('../effects/effect-rain-window-panel')).createRainWindowPanel as unknown as Factory,
  "effect-rating-stars-hover": async () =>
    (await import('../effects/effect-rating-stars-hover')).createRatingStarsHover as unknown as Factory,
  "effect-receipt-zigzag": async () =>
    (await import('../effects/effect-receipt-zigzag')).createReceiptZigzag as unknown as Factory,
  "effect-rubber-band-hover": async () =>
    (await import('../effects/effect-rubber-band-hover')).createRubberBandHover as unknown as Factory,
  "effect-scratch-card": async () =>
    (await import('../effects/effect-scratch-card')).createScratchCard as unknown as Factory,
  "effect-scroll-progress-topbar": async () =>
    (await import('../effects/effect-scroll-progress-topbar')).createScrollProgressTopbar as unknown as Factory,
  "effect-smoke-wisps": async () =>
    (await import('../effects/effect-smoke-wisps')).createSmokeWisps as unknown as Factory,
  "effect-snow-globe-panel": async () =>
    (await import('../effects/effect-snow-globe-panel')).createSnowGlobePanel as unknown as Factory,
  "effect-sonar-ping": async () =>
    (await import('../effects/effect-sonar-ping')).createSonarPing as unknown as Factory,
  "effect-split-text-lines": async () =>
    (await import('../effects/effect-split-text-lines')).createSplitTextLines as unknown as Factory,
  "effect-springy-icon-bounce": async () =>
    (await import('../effects/effect-springy-icon-bounce')).createSpringyIconBounce as unknown as Factory,
  "effect-starfield-panel": async () =>
    (await import('../effects/effect-starfield-panel')).createStarfieldPanel as unknown as Factory,
  "effect-steam-mug": async () =>
    (await import('../effects/effect-steam-mug')).createSteamMug as unknown as Factory,
  "effect-step-progress-tracker": async () =>
    (await import('../effects/effect-step-progress-tracker')).createStepProgressTracker as unknown as Factory,
  "effect-sticky-note-peel": async () =>
    (await import('../effects/effect-sticky-note-peel')).createStickyNotePeel as unknown as Factory,
  "effect-sun-cloud-weather": async () =>
    (await import('../effects/effect-sun-cloud-weather')).createSunCloudWeather as unknown as Factory,
  "effect-tabs-indicator-slide": async () =>
    (await import('../effects/effect-tabs-indicator-slide')).createTabsIndicatorSlide as unknown as Factory,
  "effect-tag-chip-pop": async () =>
    (await import('../effects/effect-tag-chip-pop')).createTagChipPop as unknown as Factory,
  "effect-terminal-typewriter": async () =>
    (await import('../effects/effect-terminal-typewriter')).createTerminalTypewriter as unknown as Factory,
  "effect-text-scramble-decode": async () =>
    (await import('../effects/effect-text-scramble-decode')).createTextScrambleDecode as unknown as Factory,
  "effect-ticket-notch-card": async () =>
    (await import('../effects/effect-ticket-notch-card')).createTicketNotchCard as unknown as Factory,
  "effect-tilt-glare-card": async () =>
    (await import('../effects/effect-tilt-glare-card')).createTiltGlareCard as unknown as Factory,
  "effect-toast-slide-stack": async () =>
    (await import('../effects/effect-toast-slide-stack')).createToastSlideStack as unknown as Factory,
  "effect-tooltip-bubble-pop": async () =>
    (await import('../effects/effect-tooltip-bubble-pop')).createTooltipBubblePop as unknown as Factory,
  "effect-typographic-wave": async () =>
    (await import('../effects/effect-typographic-wave')).createTypographicWave as unknown as Factory,
  "effect-volume-knob-rotate": async () =>
    (await import('../effects/effect-volume-knob-rotate')).createVolumeKnobRotate as unknown as Factory,
  "effect-wave-flag": async () =>
    (await import('../effects/effect-wave-flag')).createWaveFlag as unknown as Factory,
  "effect-waveform-line": async () =>
    (await import('../effects/effect-waveform-line')).createWaveformLine as unknown as Factory,
  "effect-wind-turbine-spin": async () =>
    (await import('../effects/effect-wind-turbine-spin')).createWindTurbineSpin as unknown as Factory,
  "effect-xmas-light-string": async () =>
    (await import('../effects/effect-xmas-light-string')).createXmasLightString as unknown as Factory,
  "effect-zoom-blur-enter": async () =>
    (await import('../effects/effect-zoom-blur-enter')).createZoomBlurEnter as unknown as Factory,
  "motion-abacus-beads": async () =>
    (await import('../motions/motion-abacus-beads')).createAbacusBeads as unknown as Factory,
  "motion-accordion-pulse": async () =>
    (await import('../motions/motion-accordion-pulse')).createAccordionPulse as unknown as Factory,
  "motion-audio-bars": async () =>
    (await import('../motions/motion-audio-bars')).createAudioBars as unknown as Factory,
  "motion-balance-scale": async () =>
    (await import('../motions/motion-balance-scale')).createBalanceScale as unknown as Factory,
  "motion-balloon-rise": async () =>
    (await import('../motions/motion-balloon-rise')).createBalloonRise as unknown as Factory,
  "motion-bar-race": async () =>
    (await import('../motions/motion-bar-race')).createBarRace as unknown as Factory,
  "motion-battery-charge": async () =>
    (await import('../motions/motion-battery-charge')).createBatteryCharge as unknown as Factory,
  "motion-bounce-cascade": async () =>
    (await import('../motions/motion-bounce-cascade')).createBounceCascade as unknown as Factory,
  "motion-bubble-rise": async () =>
    (await import('../motions/motion-bubble-rise')).createBubbleRise as unknown as Factory,
  "motion-card-shuffle": async () =>
    (await import('../motions/motion-card-shuffle')).createCardShuffle as unknown as Factory,
  "motion-carousel-loop": async () =>
    (await import('../motions/motion-carousel-loop')).createCarouselLoop as unknown as Factory,
  "motion-cart-bounce": async () =>
    (await import('../motions/motion-cart-bounce')).createCartBounce as unknown as Factory,
  "motion-chat-typewriter": async () =>
    (await import('../motions/motion-chat-typewriter')).createChatTypewriter as unknown as Factory,
  "motion-checkbox-draw": async () =>
    (await import('../motions/motion-checkbox-draw')).createCheckboxDraw as unknown as Factory,
  "motion-claw-machine": async () =>
    (await import('../motions/motion-claw-machine')).createClawMachine as unknown as Factory,
  "motion-cloud-drift": async () =>
    (await import('../motions/motion-cloud-drift')).createCloudDrift as unknown as Factory,
  "motion-coffee-steam": async () =>
    (await import('../motions/motion-coffee-steam')).createCoffeeSteam as unknown as Factory,
  "motion-compass-needle": async () =>
    (await import('../motions/motion-compass-needle')).createCompassNeedle as unknown as Factory,
  "motion-conveyor-belt": async () =>
    (await import('../motions/motion-conveyor-belt')).createConveyorBelt as unknown as Factory,
  "motion-countdown-ring": async () =>
    (await import('../motions/motion-countdown-ring')).createCountdownRing as unknown as Factory,
  "motion-crane-hook": async () =>
    (await import('../motions/motion-crane-hook')).createCraneHook as unknown as Factory,
  "motion-curtain-rise": async () =>
    (await import('../motions/motion-curtain-rise')).createCurtainRise as unknown as Factory,
  "motion-day-night": async () =>
    (await import('../motions/motion-day-night')).createDayNight as unknown as Factory,
  "motion-dice-roll": async () =>
    (await import('../motions/motion-dice-roll')).createDiceRoll as unknown as Factory,
  "motion-dna-helix": async () =>
    (await import('../motions/motion-dna-helix')).createDnaHelix as unknown as Factory,
  "motion-domino-fall": async () =>
    (await import('../motions/motion-domino-fall')).createDominoFall as unknown as Factory,
  "motion-dot-loader": async () =>
    (await import('../motions/motion-dot-loader')).createDotLoader as unknown as Factory,
  "motion-download-tray": async () =>
    (await import('../motions/motion-download-tray')).createDownloadTray as unknown as Factory,
  "motion-dribble-ball": async () =>
    (await import('../motions/motion-dribble-ball')).createDribbleBall as unknown as Factory,
  "motion-dropdown-menu": async () =>
    (await import('../motions/motion-dropdown-menu')).createDropdownMenu as unknown as Factory,
  "motion-elevator-floors": async () =>
    (await import('../motions/motion-elevator-floors')).createElevatorFloors as unknown as Factory,
  "motion-escalator-steps": async () =>
    (await import('../motions/motion-escalator-steps')).createEscalatorSteps as unknown as Factory,
  "motion-ferris-wheel": async () =>
    (await import('../motions/motion-ferris-wheel')).createFerrisWheel as unknown as Factory,
  "motion-firefly-drift": async () =>
    (await import('../motions/motion-firefly-drift')).createFireflyDrift as unknown as Factory,
  "motion-fish-school": async () =>
    (await import('../motions/motion-fish-school')).createFishSchool as unknown as Factory,
  "motion-flight-path": async () =>
    (await import('../motions/motion-flight-path')).createFlightPath as unknown as Factory,
  "motion-flip-clock": async () =>
    (await import('../motions/motion-flip-clock')).createFlipClock as unknown as Factory,
  "motion-gear-train": async () =>
    (await import('../motions/motion-gear-train')).createGearTrain as unknown as Factory,
  "motion-gravity-drop": async () =>
    (await import('../motions/motion-gravity-drop')).createGravityDrop as unknown as Factory,
  "motion-heartbeat-line": async () =>
    (await import('../motions/motion-heartbeat-line')).createHeartbeatLine as unknown as Factory,
  "motion-hourglass-flip": async () =>
    (await import('../motions/motion-hourglass-flip')).createHourglassFlip as unknown as Factory,
  "motion-hydraulic-press": async () =>
    (await import('../motions/motion-hydraulic-press')).createHydraulicPress as unknown as Factory,
  "motion-kaleidoscope": async () =>
    (await import('../motions/motion-kaleidoscope')).createKaleidoscope as unknown as Factory,
  "motion-lava-lamp": async () =>
    (await import('../motions/motion-lava-lamp')).createLavaLamp as unknown as Factory,
  "motion-led-matrix": async () =>
    (await import('../motions/motion-led-matrix')).createLedMatrix as unknown as Factory,
  "motion-lighthouse-beam": async () =>
    (await import('../motions/motion-lighthouse-beam')).createLighthouseBeam as unknown as Factory,
  "motion-lightning-storm": async () =>
    (await import('../motions/motion-lightning-storm')).createLightningStorm as unknown as Factory,
  "motion-like-heart": async () =>
    (await import('../motions/motion-like-heart')).createLikeHeart as unknown as Factory,
  "motion-lottery-drum": async () =>
    (await import('../motions/motion-lottery-drum')).createLotteryDrum as unknown as Factory,
  "motion-marble-run": async () =>
    (await import('../motions/motion-marble-run')).createMarbleRun as unknown as Factory,
  "motion-metronome": async () =>
    (await import('../motions/motion-metronome')).createMetronome as unknown as Factory,
  "motion-modal-pop": async () =>
    (await import('../motions/motion-modal-pop')).createModalPop as unknown as Factory,
  "motion-moon-phases": async () =>
    (await import('../motions/motion-moon-phases')).createMoonPhases as unknown as Factory,
  "motion-neon-sign": async () =>
    (await import('../motions/motion-neon-sign')).createNeonSign as unknown as Factory,
  "motion-orbit-loader": async () =>
    (await import('../motions/motion-orbit-loader')).createOrbitLoader as unknown as Factory,
  "motion-pacman-chomp": async () =>
    (await import('../motions/motion-pacman-chomp')).createPacmanChomp as unknown as Factory,
  "motion-page-flip": async () =>
    (await import('../motions/motion-page-flip')).createPageFlip as unknown as Factory,
  "motion-parachute-drop": async () =>
    (await import('../motions/motion-parachute-drop')).createParachuteDrop as unknown as Factory,
  "motion-piston-engine": async () =>
    (await import('../motions/motion-piston-engine')).createPistonEngine as unknown as Factory,
  "motion-pong-rally": async () =>
    (await import('../motions/motion-pong-rally')).createPongRally as unknown as Factory,
  "motion-prize-wheel": async () =>
    (await import('../motions/motion-prize-wheel')).createPrizeWheel as unknown as Factory,
  "motion-progress-steps": async () =>
    (await import('../motions/motion-progress-steps')).createProgressSteps as unknown as Factory,
  "motion-pulley-lift": async () =>
    (await import('../motions/motion-pulley-lift')).createPulleyLift as unknown as Factory,
  "motion-radar-sweep": async () =>
    (await import('../motions/motion-radar-sweep')).createRadarSweep as unknown as Factory,
  "motion-rating-stars": async () =>
    (await import('../motions/motion-rating-stars')).createRatingStars as unknown as Factory,
  "motion-robot-arm": async () =>
    (await import('../motions/motion-robot-arm')).createRobotArm as unknown as Factory,
  "motion-robot-vacuum": async () =>
    (await import('../motions/motion-robot-vacuum')).createRobotVacuum as unknown as Factory,
  "motion-rocket-launch": async () =>
    (await import('../motions/motion-rocket-launch')).createRocketLaunch as unknown as Factory,
  "motion-sailboat-wave": async () =>
    (await import('../motions/motion-sailboat-wave')).createSailboatWave as unknown as Factory,
  "motion-search-scan": async () =>
    (await import('../motions/motion-search-scan')).createSearchScan as unknown as Factory,
  "motion-seismograph": async () =>
    (await import('../motions/motion-seismograph')).createSeismograph as unknown as Factory,
  "motion-slot-reels": async () =>
    (await import('../motions/motion-slot-reels')).createSlotReels as unknown as Factory,
  "motion-snow-globe": async () =>
    (await import('../motions/motion-snow-globe')).createSnowGlobe as unknown as Factory,
  "motion-solar-orbit": async () =>
    (await import('../motions/motion-solar-orbit')).createSolarOrbit as unknown as Factory,
  "motion-sonar-pulse": async () =>
    (await import('../motions/motion-sonar-pulse')).createSonarPulse as unknown as Factory,
  "motion-space-invaders": async () =>
    (await import('../motions/motion-space-invaders')).createSpaceInvaders as unknown as Factory,
  "motion-spinner-segments": async () =>
    (await import('../motions/motion-spinner-segments')).createSpinnerSegments as unknown as Factory,
  "motion-spotlight-sweep": async () =>
    (await import('../motions/motion-spotlight-sweep')).createSpotlightSweep as unknown as Factory,
  "motion-square-shuffle": async () =>
    (await import('../motions/motion-square-shuffle')).createSquareShuffle as unknown as Factory,
  "motion-stack-tumble": async () =>
    (await import('../motions/motion-stack-tumble')).createStackTumble as unknown as Factory,
  "motion-stadium-wave": async () =>
    (await import('../motions/motion-stadium-wave')).createStadiumWave as unknown as Factory,
  "motion-star-twinkle": async () =>
    (await import('../motions/motion-star-twinkle')).createStarTwinkle as unknown as Factory,
  "motion-stock-ticker": async () =>
    (await import('../motions/motion-stock-ticker')).createStockTicker as unknown as Factory,
  "motion-subway-line": async () =>
    (await import('../motions/motion-subway-line')).createSubwayLine as unknown as Factory,
  "motion-sync-cycle": async () =>
    (await import('../motions/motion-sync-cycle')).createSyncCycle as unknown as Factory,
  "motion-tab-indicator": async () =>
    (await import('../motions/motion-tab-indicator')).createTabIndicator as unknown as Factory,
  "motion-tetris-fall": async () =>
    (await import('../motions/motion-tetris-fall')).createTetrisFall as unknown as Factory,
  "motion-text-ticker": async () =>
    (await import('../motions/motion-text-ticker')).createTextTicker as unknown as Factory,
  "motion-thermostat-dial": async () =>
    (await import('../motions/motion-thermostat-dial')).createThermostatDial as unknown as Factory,
  "motion-toast-queue": async () =>
    (await import('../motions/motion-toast-queue')).createToastQueue as unknown as Factory,
  "motion-toggle-switch": async () =>
    (await import('../motions/motion-toggle-switch')).createToggleSwitch as unknown as Factory,
  "motion-traffic-light": async () =>
    (await import('../motions/motion-traffic-light')).createTrafficLight as unknown as Factory,
  "motion-ufo-hover": async () =>
    (await import('../motions/motion-ufo-hover')).createUfoHover as unknown as Factory,
  "motion-venetian-blind": async () =>
    (await import('../motions/motion-venetian-blind')).createVenetianBlind as unknown as Factory,
  "motion-vinyl-record": async () =>
    (await import('../motions/motion-vinyl-record')).createVinylRecord as unknown as Factory,
  "motion-volume-knob": async () =>
    (await import('../motions/motion-volume-knob')).createVolumeKnob as unknown as Factory,
  "motion-wave-loader": async () =>
    (await import('../motions/motion-wave-loader')).createWaveLoader as unknown as Factory,
  "motion-weather-cycle": async () =>
    (await import('../motions/motion-weather-cycle')).createWeatherCycle as unknown as Factory,
  "motion-wifi-signal": async () =>
    (await import('../motions/motion-wifi-signal')).createWifiSignal as unknown as Factory,
  "motion-windmill-spin": async () =>
    (await import('../motions/motion-windmill-spin')).createWindmillSpin as unknown as Factory,
  "d25-abacus-frame": async () =>
    (await import('../d25/d25-abacus-frame')).createAbacusFrame3D as unknown as Factory,
  "d25-arcade-cabinet": async () =>
    (await import('../d25/d25-arcade-cabinet')).createArcadeCabinet as unknown as Factory,
  "d25-astrolabe-dial": async () =>
    (await import('../d25/d25-astrolabe-dial')).createAstrolabeDial as unknown as Factory,
  "d25-basketball-hoop-shot": async () =>
    (await import('../d25/d25-basketball-hoop-shot')).createBasketballHoopShot as unknown as Factory,
  "d25-bowling-lane": async () =>
    (await import('../d25/d25-bowling-lane')).createBowlingLanePins as unknown as Factory,
  "d25-bridge-lift": async () =>
    (await import('../d25/d25-bridge-lift')).createBridgeLift as unknown as Factory,
  "d25-cable-car-gondola": async () =>
    (await import('../d25/d25-cable-car-gondola')).createCableCarGondola as unknown as Factory,
  "d25-camera-shutter-blades": async () =>
    (await import('../d25/d25-camera-shutter-blades')).createCameraShutterBlades as unknown as Factory,
  "d25-campfire-depth": async () =>
    (await import('../d25/d25-campfire-depth')).createCampfireDepth as unknown as Factory,
  "d25-card-shuffle-fan": async () =>
    (await import('../d25/d25-card-shuffle-fan')).createCardShuffleFan as unknown as Factory,
  "d25-carousel-horses": async () =>
    (await import('../d25/d25-carousel-horses')).createCarouselHorses as unknown as Factory,
  "d25-catapult-launch": async () =>
    (await import('../d25/d25-catapult-launch')).createCatapultLaunch as unknown as Factory,
  "d25-ceiling-fan-spin": async () =>
    (await import('../d25/d25-ceiling-fan-spin')).createCeilingFanSpin as unknown as Factory,
  "d25-chessboard-tilt": async () =>
    (await import('../d25/d25-chessboard-tilt')).createChessboardTilt as unknown as Factory,
  "d25-coin-flipper": async () =>
    (await import('../d25/d25-coin-flipper')).createCoinFlipper as unknown as Factory,
  "d25-compass-needle-float": async () =>
    (await import('../d25/d25-compass-needle-float')).createCompassNeedleFloat as unknown as Factory,
  "d25-coral-reef-layers": async () =>
    (await import('../d25/d25-coral-reef-layers')).createCoralReefLayers as unknown as Factory,
  "d25-crane-claw": async () =>
    (await import('../d25/d25-crane-claw')).createCraneClaw as unknown as Factory,
  "d25-cube-carousel": async () =>
    (await import('../d25/d25-cube-carousel')).createCubeCarousel as unknown as Factory,
  "d25-dam-spillway-gates": async () =>
    (await import('../d25/d25-dam-spillway-gates')).createDamSpillwayGates as unknown as Factory,
  "d25-dice-tower": async () =>
    (await import('../d25/d25-dice-tower')).createDiceTower as unknown as Factory,
  "d25-diorama-room": async () =>
    (await import('../d25/d25-diorama-room')).createDioramaRoom as unknown as Factory,
  "d25-domino-run": async () =>
    (await import('../d25/d25-domino-run')).createDominoRun as unknown as Factory,
  "d25-door-gallery": async () =>
    (await import('../d25/d25-door-gallery')).createDoorGallery as unknown as Factory,
  "d25-dragon-wing-flap": async () =>
    (await import('../d25/d25-dragon-wing-flap')).createDragonWingFlap as unknown as Factory,
  "d25-drawbridge": async () =>
    (await import('../d25/d25-drawbridge')).createDrawbridge as unknown as Factory,
  "d25-earthquake-shake-table": async () =>
    (await import('../d25/d25-earthquake-shake-table')).createEarthquakeShakeTable as unknown as Factory,
  "d25-elevator-shaft": async () =>
    (await import('../d25/d25-elevator-shaft')).createElevatorShaftView as unknown as Factory,
  "d25-equalizer-bars-3d": async () =>
    (await import('../d25/d25-equalizer-bars-3d')).createEqualizerBars3D as unknown as Factory,
  "d25-escalator-steps": async () =>
    (await import('../d25/d25-escalator-steps')).createEscalatorSteps as unknown as Factory,
  "d25-ferris-wheel": async () =>
    (await import('../d25/d25-ferris-wheel')).createFerrisWheelCabins as unknown as Factory,
  "d25-film-clapperboard": async () =>
    (await import('../d25/d25-film-clapperboard')).createFilmClapperboard as unknown as Factory,
  "d25-film-reel-projector": async () =>
    (await import('../d25/d25-film-reel-projector')).createFilmReelProjector as unknown as Factory,
  "d25-floating-islands": async () =>
    (await import('../d25/d25-floating-islands')).createFloatingIslandsParallax as unknown as Factory,
  "d25-frame-wall": async () =>
    (await import('../d25/d25-frame-wall')).createMuseumFrameWall as unknown as Factory,
  "d25-garage-door-rollup": async () =>
    (await import('../d25/d25-garage-door-rollup')).createGarageDoorRollup as unknown as Factory,
  "d25-gramophone-horn": async () =>
    (await import('../d25/d25-gramophone-horn')).createGramophoneHorn as unknown as Factory,
  "d25-greeting-card": async () =>
    (await import('../d25/d25-greeting-card')).createGreetingCard as unknown as Factory,
  "d25-gumball-machine": async () =>
    (await import('../d25/d25-gumball-machine')).createGumballMachine as unknown as Factory,
  "d25-gyroscope-rings": async () =>
    (await import('../d25/d25-gyroscope-rings')).createGyroscopeRings as unknown as Factory,
  "d25-hand-fan-spread": async () =>
    (await import('../d25/d25-hand-fan-spread')).createHandFanSpread as unknown as Factory,
  "d25-harbor-crane-container": async () =>
    (await import('../d25/d25-harbor-crane-container')).createHarborCraneContainer as unknown as Factory,
  "d25-hot-air-balloon-rise": async () =>
    (await import('../d25/d25-hot-air-balloon-rise')).createHotAirBalloonRise as unknown as Factory,
  "d25-hourglass-flow": async () =>
    (await import('../d25/d25-hourglass-flow')).createHourglassFlow as unknown as Factory,
  "d25-iceberg-cross-section": async () =>
    (await import('../d25/d25-iceberg-cross-section')).createIcebergCrossSection as unknown as Factory,
  "d25-jellyfish-drift": async () =>
    (await import('../d25/d25-jellyfish-drift')).createJellyfishDrift as unknown as Factory,
  "d25-joystick-control": async () =>
    (await import('../d25/d25-joystick-control')).createJoystickControl as unknown as Factory,
  "d25-jukebox-selection": async () =>
    (await import('../d25/d25-jukebox-selection')).createJukeboxSelection as unknown as Factory,
  "d25-kaleidoscope-cone": async () =>
    (await import('../d25/d25-kaleidoscope-cone')).createKaleidoscopeCone as unknown as Factory,
  "d25-kite-in-wind": async () =>
    (await import('../d25/d25-kite-in-wind')).createKiteInWind as unknown as Factory,
  "d25-lantern-glow-swing": async () =>
    (await import('../d25/d25-lantern-glow-swing')).createLanternGlowSwing as unknown as Factory,
  "d25-lighthouse-beam": async () =>
    (await import('../d25/d25-lighthouse-beam')).createLighthouseBeam as unknown as Factory,
  "d25-mailbox-flag": async () =>
    (await import('../d25/d25-mailbox-flag')).createMailboxFlag as unknown as Factory,
  "d25-mechanical-keyboard": async () =>
    (await import('../d25/d25-mechanical-keyboard')).createMechanicalKeyboard as unknown as Factory,
  "d25-metronome-arm": async () =>
    (await import('../d25/d25-metronome-arm')).createMetronomeArm as unknown as Factory,
  "d25-moon-orbit-ring": async () =>
    (await import('../d25/d25-moon-orbit-ring')).createPlanetMoonOrbitRing as unknown as Factory,
  "d25-page-fold": async () =>
    (await import('../d25/d25-page-fold')).createBookPageFold as unknown as Factory,
  "d25-paper-cut-landscape": async () =>
    (await import('../d25/d25-paper-cut-landscape')).createPaperCutLandscape as unknown as Factory,
  "d25-periscope": async () =>
    (await import('../d25/d25-periscope')).createPeriscope as unknown as Factory,
  "d25-photo-pile-lift": async () =>
    (await import('../d25/d25-photo-pile-lift')).createPhotoPileLift as unknown as Factory,
  "d25-piano-hammer-lift": async () =>
    (await import('../d25/d25-piano-hammer-lift')).createPianoHammerLift as unknown as Factory,
  "d25-pin-art-toy": async () =>
    (await import('../d25/d25-pin-art-toy')).createPinArtToy as unknown as Factory,
  "d25-pinball-flippers": async () =>
    (await import('../d25/d25-pinball-flippers')).createPinballFlippers as unknown as Factory,
  "d25-pinwheel-spin": async () =>
    (await import('../d25/d25-pinwheel-spin')).createPinwheelSpin as unknown as Factory,
  "d25-pocket-watch-open": async () =>
    (await import('../d25/d25-pocket-watch-open')).createPocketWatchOpen as unknown as Factory,
  "d25-portcullis-gate": async () =>
    (await import('../d25/d25-portcullis-gate')).createPortcullisGate as unknown as Factory,
  "d25-prism-beam-split": async () =>
    (await import('../d25/d25-prism-beam-split')).createPrismBeamSplit as unknown as Factory,
  "d25-radar-sweep-dome": async () =>
    (await import('../d25/d25-radar-sweep-dome')).createRadarSweepDome as unknown as Factory,
  "d25-railway-crossing-gate": async () =>
    (await import('../d25/d25-railway-crossing-gate')).createRailwayCrossingGate as unknown as Factory,
  "d25-revolving-door": async () =>
    (await import('../d25/d25-revolving-door')).createRevolvingDoor as unknown as Factory,
  "d25-rotary-phone-dial": async () =>
    (await import('../d25/d25-rotary-phone-dial')).createRotaryPhoneDial as unknown as Factory,
  "d25-rubiks-layer-twist": async () =>
    (await import('../d25/d25-rubiks-layer-twist')).createRubiksLayerTwist as unknown as Factory,
  "d25-satellite-dish-tracker": async () =>
    (await import('../d25/d25-satellite-dish-tracker')).createSatelliteDishTracker as unknown as Factory,
  "d25-seesaw-balance": async () =>
    (await import('../d25/d25-seesaw-balance')).createSeesawBalance as unknown as Factory,
  "d25-shadow-theater": async () =>
    (await import('../d25/d25-shadow-theater')).createShadowTheater as unknown as Factory,
  "d25-skate-halfpipe-rider": async () =>
    (await import('../d25/d25-skate-halfpipe-rider')).createSkateHalfpipeRider as unknown as Factory,
  "d25-slide-puzzle": async () =>
    (await import('../d25/d25-slide-puzzle')).createDepthSlidePuzzle as unknown as Factory,
  "d25-slot-machine-reels": async () =>
    (await import('../d25/d25-slot-machine-reels')).createSlotMachineReels as unknown as Factory,
  "d25-soccer-goal-net": async () =>
    (await import('../d25/d25-soccer-goal-net')).createSoccerGoalNet as unknown as Factory,
  "d25-solar-panel-array-tilt": async () =>
    (await import('../d25/d25-solar-panel-array-tilt')).createSolarPanelArrayTilt as unknown as Factory,
  "d25-speaker-cone-thump": async () =>
    (await import('../d25/d25-speaker-cone-thump')).createSpeakerConeThump as unknown as Factory,
  "d25-spiral-staircase": async () =>
    (await import('../d25/d25-spiral-staircase')).createSpiralStaircase as unknown as Factory,
  "d25-stack-tower": async () =>
    (await import('../d25/d25-stack-tower')).createStackGameTower as unknown as Factory,
  "d25-submarine-dive": async () =>
    (await import('../d25/d25-submarine-dive')).createSubmarineDive as unknown as Factory,
  "d25-subway-turnstile": async () =>
    (await import('../d25/d25-subway-turnstile')).createSubwayTurnstile as unknown as Factory,
  "d25-swing-set-pendulum": async () =>
    (await import('../d25/d25-swing-set-pendulum')).createSwingSetPendulum as unknown as Factory,
  "d25-teacup-ride": async () =>
    (await import('../d25/d25-teacup-ride')).createTeacupRide as unknown as Factory,
  "d25-telescope-mount": async () =>
    (await import('../d25/d25-telescope-mount')).createTelescopeMount as unknown as Factory,
  "d25-traffic-light-box": async () =>
    (await import('../d25/d25-traffic-light-box')).createTrafficLightBox as unknown as Factory,
  "d25-treasure-chest-open": async () =>
    (await import('../d25/d25-treasure-chest-open')).createTreasureChestOpen as unknown as Factory,
  "d25-tunnel-rings": async () =>
    (await import('../d25/d25-tunnel-rings')).createTunnelRings as unknown as Factory,
  "d25-typewriter-keys": async () =>
    (await import('../d25/d25-typewriter-keys')).createTypewriterKeys as unknown as Factory,
  "d25-vending-machine": async () =>
    (await import('../d25/d25-vending-machine')).createVendingMachine as unknown as Factory,
  "d25-venetian-blinds-tilt": async () =>
    (await import('../d25/d25-venetian-blinds-tilt')).createVenetianBlindsTilt as unknown as Factory,
  "d25-volcano-cross-section": async () =>
    (await import('../d25/d25-volcano-cross-section')).createVolcanoCrossSection as unknown as Factory,
  "d25-watermill-wheel": async () =>
    (await import('../d25/d25-watermill-wheel')).createWatermillWheel as unknown as Factory,
  "d25-wind-chime-tubes": async () =>
    (await import('../d25/d25-wind-chime-tubes')).createWindChimeTubes as unknown as Factory,
  "d25-windmill-blades": async () =>
    (await import('../d25/d25-windmill-blades')).createWindmillBlades as unknown as Factory,
  "d25-wishing-well-pulley": async () =>
    (await import('../d25/d25-wishing-well-pulley')).createWishingWellPulley as unknown as Factory,
  "d25-zoetrope": async () =>
    (await import('../d25/d25-zoetrope')).createZoetrope as unknown as Factory,
  "acid-bloom": async () =>
    (await import('../elements/acid-bloom')).createAcidBloom as unknown as Factory,
  "asteroid-drift": async () =>
    (await import('../elements/asteroid-drift')).createAsteroidDrift as unknown as Factory,
  "aurora-ribbon": async () =>
    (await import('../elements/aurora-ribbon')).createAuroraRibbon as unknown as Factory,
  "bacteria-culture": async () =>
    (await import('../elements/bacteria-culture')).createBacteriaCulture as unknown as Factory,
  "bamboo-shadow": async () =>
    (await import('../elements/bamboo-shadow')).createBambooShadow as unknown as Factory,
  "binary-star": async () =>
    (await import('../elements/binary-star')).createBinaryStar as unknown as Factory,
  "bird-murmuration": async () =>
    (await import('../elements/bird-murmuration')).createBirdMurmuration as unknown as Factory,
  "black-hole-lens": async () =>
    (await import('../elements/black-hole-lens')).createBlackHoleLens as unknown as Factory,
  "blizzard-whiteout": async () =>
    (await import('../elements/blizzard-whiteout')).createBlizzardWhiteout as unknown as Factory,
  "breathing-gradient": async () =>
    (await import('../elements/breathing-gradient')).createBreathingGradient as unknown as Factory,
  "bubble-universe": async () =>
    (await import('../elements/bubble-universe')).createBubbleUniverse as unknown as Factory,
  "butterfly-meadow": async () =>
    (await import('../elements/butterfly-meadow')).createButterflyMeadow as unknown as Factory,
  "candle-glow": async () =>
    (await import('../elements/candle-glow')).createCandleGlow as unknown as Factory,
  "canyon-wind": async () =>
    (await import('../elements/canyon-wind')).createCanyonWind as unknown as Factory,
  "cellular-automata": async () =>
    (await import('../elements/cellular-automata')).createCellularAutomata as unknown as Factory,
  "circuit-board": async () =>
    (await import('../elements/circuit-board')).createCircuitBoard as unknown as Factory,
  "city-lights": async () =>
    (await import('../elements/city-lights')).createCityLights as unknown as Factory,
  "clockwork-gears": async () =>
    (await import('../elements/clockwork-gears')).createClockworkGears as unknown as Factory,
  "coffee-swirl": async () =>
    (await import('../elements/coffee-swirl')).createCoffeeSwirl as unknown as Factory,
  "comet-tail": async () =>
    (await import('../elements/comet-tail')).createCometTail as unknown as Factory,
  "confetti-drift": async () =>
    (await import('../elements/confetti-drift')).createConfettiDrift as unknown as Factory,
  "coral-glow": async () =>
    (await import('../elements/coral-glow')).createCoralGlow as unknown as Factory,
  "cosmic-web": async () =>
    (await import('../elements/cosmic-web')).createCosmicWeb as unknown as Factory,
  "crystal-cave": async () =>
    (await import('../elements/crystal-cave')).createCrystalCave as unknown as Factory,
  "crystal-prism": async () =>
    (await import('../elements/crystal-prism')).createCrystalPrism as unknown as Factory,
  "data-stream": async () =>
    (await import('../elements/data-stream')).createDataStream as unknown as Factory,
  "deep-sea-jelly": async () =>
    (await import('../elements/deep-sea-jelly')).createDeepSeaJelly as unknown as Factory,
  "desert-mirage": async () =>
    (await import('../elements/desert-mirage')).createDesertMirage as unknown as Factory,
  "digital-noise": async () =>
    (await import('../elements/digital-noise')).createDigitalNoise as unknown as Factory,
  "dune-shift": async () =>
    (await import('../elements/dune-shift')).createDuneShift as unknown as Factory,
  "dust-motes": async () =>
    (await import('../elements/dust-motes')).createDustMotes as unknown as Factory,
  "echo-ripple": async () =>
    (await import('../elements/echo-ripple')).createEchoRipple as unknown as Factory,
  "eclipse-ring": async () =>
    (await import('../elements/eclipse-ring')).createEclipseRing as unknown as Factory,
  "ember-storm": async () =>
    (await import('../elements/ember-storm')).createEmberStorm as unknown as Factory,
  "equalizer-bars": async () =>
    (await import('../elements/equalizer-bars')).createEqualizerBars as unknown as Factory,
  "fern-fractal": async () =>
    (await import('../elements/fern-fractal')).createFernFractal as unknown as Factory,
  "fiber-optic": async () =>
    (await import('../elements/fiber-optic')).createFiberOptic as unknown as Factory,
  "film-grain": async () =>
    (await import('../elements/film-grain')).createFilmGrain as unknown as Factory,
  "firefly-swarm": async () =>
    (await import('../elements/firefly-swarm')).createFireflySwarm as unknown as Factory,
  "fireworks-night": async () =>
    (await import('../elements/fireworks-night')).createFireworksNight as unknown as Factory,
  "fish-school": async () =>
    (await import('../elements/fish-school')).createFishSchool as unknown as Factory,
  "frost-window": async () =>
    (await import('../elements/frost-window')).createFrostWindow as unknown as Factory,
  "glitch-art": async () =>
    (await import('../elements/glitch-art')).createGlitchArt as unknown as Factory,
  "glitter-wave": async () =>
    (await import('../elements/glitter-wave')).createGlitterWave as unknown as Factory,
  "gradient-orb": async () =>
    (await import('../elements/gradient-orb')).createGradientOrb as unknown as Factory,
  "gravity-grid": async () =>
    (await import('../elements/gravity-grid')).createGravityGrid as unknown as Factory,
  "hailstorm": async () =>
    (await import('../elements/hailstorm')).createHailstorm as unknown as Factory,
  "halo-ring": async () =>
    (await import('../elements/halo-ring')).createHaloRing as unknown as Factory,
  "heat-shimmer": async () =>
    (await import('../elements/heat-shimmer')).createHeatShimmer as unknown as Factory,
  "hologram-scan": async () =>
    (await import('../elements/hologram-scan')).createHologramScan as unknown as Factory,
  "honeycomb": async () =>
    (await import('../elements/honeycomb')).createHoneycomb as unknown as Factory,
  "ice-flow": async () =>
    (await import('../elements/ice-flow')).createIceFlow as unknown as Factory,
  "kaleidoscope": async () =>
    (await import('../elements/kaleidoscope')).createKaleidoscope as unknown as Factory,
  "kelp-forest": async () =>
    (await import('../elements/kelp-forest')).createKelpForest as unknown as Factory,
  "lantern-festival": async () =>
    (await import('../elements/lantern-festival')).createLanternFestival as unknown as Factory,
  "laser-grid": async () =>
    (await import('../elements/laser-grid')).createLaserGrid as unknown as Factory,
  "lava-flow": async () =>
    (await import('../elements/lava-flow')).createLavaFlow as unknown as Factory,
  "lava-lamp": async () =>
    (await import('../elements/lava-lamp')).createLavaLamp as unknown as Factory,
  "light-leak": async () =>
    (await import('../elements/light-leak')).createLightLeak as unknown as Factory,
  "lighthouse-beam": async () =>
    (await import('../elements/lighthouse-beam')).createLighthouseBeam as unknown as Factory,
  "lightning-field": async () =>
    (await import('../elements/lightning-field')).createLightningField as unknown as Factory,
  "liquid-gradient": async () =>
    (await import('../elements/liquid-gradient')).createLiquidGradient as unknown as Factory,
  "lotus-pond": async () =>
    (await import('../elements/lotus-pond')).createLotusPond as unknown as Factory,
  "magnet-shavings": async () =>
    (await import('../elements/magnet-shavings')).createMagnetShavings as unknown as Factory,
  "mercury-droplet": async () =>
    (await import('../elements/mercury-droplet')).createMercuryDroplet as unknown as Factory,
  "meteor-shower": async () =>
    (await import('../elements/meteor-shower')).createMeteorShower as unknown as Factory,
  "mirror-hall": async () =>
    (await import('../elements/mirror-hall')).createMirrorHall as unknown as Factory,
  "monsoon-clouds": async () =>
    (await import('../elements/monsoon-clouds')).createMonsoonClouds as unknown as Factory,
  "moon-phases": async () =>
    (await import('../elements/moon-phases')).createMoonPhases as unknown as Factory,
  "moth-flight": async () =>
    (await import('../elements/moth-flight')).createMothFlight as unknown as Factory,
  "mountain-mist": async () =>
    (await import('../elements/mountain-mist')).createMountainMist as unknown as Factory,
  "nebula-pillars": async () =>
    (await import('../elements/nebula-pillars')).createNebulaPillars as unknown as Factory,
  "neon-sign": async () =>
    (await import('../elements/neon-sign')).createNeonSign as unknown as Factory,
  "ocean-foam": async () =>
    (await import('../elements/ocean-foam')).createOceanFoam as unknown as Factory,
  "ocean-swell": async () =>
    (await import('../elements/ocean-swell')).createOceanSwell as unknown as Factory,
  "op-art": async () =>
    (await import('../elements/op-art')).createOpArt as unknown as Factory,
  "orbit-garden": async () =>
    (await import('../elements/orbit-garden')).createOrbitGarden as unknown as Factory,
  "paint-drip": async () =>
    (await import('../elements/paint-drip')).createPaintDrip as unknown as Factory,
  "pendulum-wave": async () =>
    (await import('../elements/pendulum-wave')).createPendulumWave as unknown as Factory,
  "quantum-foam": async () =>
    (await import('../elements/quantum-foam')).createQuantumFoam as unknown as Factory,
  "radar-sweep": async () =>
    (await import('../elements/radar-sweep')).createRadarSweep as unknown as Factory,
  "rain-veil": async () =>
    (await import('../elements/rain-veil')).createRainVeil as unknown as Factory,
  "river-delta": async () =>
    (await import('../elements/river-delta')).createRiverDelta as unknown as Factory,
  "sand-ripple": async () =>
    (await import('../elements/sand-ripple')).createSandRipple as unknown as Factory,
  "sea-sparkle": async () =>
    (await import('../elements/sea-sparkle')).createSeaSparkle as unknown as Factory,
  "silk-ribbon": async () =>
    (await import('../elements/silk-ribbon')).createSilkRibbon as unknown as Factory,
  "smoke-column": async () =>
    (await import('../elements/smoke-column')).createSmokeColumn as unknown as Factory,
  "snow-globe": async () =>
    (await import('../elements/snow-globe')).createSnowGlobe as unknown as Factory,
  "solar-wind": async () =>
    (await import('../elements/solar-wind')).createSolarWind as unknown as Factory,
  "spider-silk": async () =>
    (await import('../elements/spider-silk')).createSpiderSilk as unknown as Factory,
  "spiral-shell": async () =>
    (await import('../elements/spiral-shell')).createSpiralShell as unknown as Factory,
  "stained-glass": async () =>
    (await import('../elements/stained-glass')).createStainedGlass as unknown as Factory,
  "star-nursery": async () =>
    (await import('../elements/star-nursery')).createStarNursery as unknown as Factory,
  "storm-front": async () =>
    (await import('../elements/storm-front')).createStormFront as unknown as Factory,
  "tide-pool": async () =>
    (await import('../elements/tide-pool')).createTidePool as unknown as Factory,
  "topographic-map": async () =>
    (await import('../elements/topographic-map')).createTopographicMap as unknown as Factory,
  "tornado-vortex": async () =>
    (await import('../elements/tornado-vortex')).createTornadoVortex as unknown as Factory,
  "tree-canopy": async () =>
    (await import('../elements/tree-canopy')).createTreeCanopy as unknown as Factory,
  "wave-interference": async () =>
    (await import('../elements/wave-interference')).createWaveInterference as unknown as Factory,
  "zen-garden": async () =>
    (await import('../elements/zen-garden')).createZenGarden as unknown as Factory,
  "abacus-frame": async () =>
    (await import('../elements/abacus-frame')).createAbacusFrame as unknown as Factory,
  "arcade-cabinet": async () =>
    (await import('../elements/arcade-cabinet')).createArcadeCabinet as unknown as Factory,
  "armillary-sphere": async () =>
    (await import('../elements/armillary-sphere')).createArmillarySphere as unknown as Factory,
  "atom-model": async () =>
    (await import('../elements/atom-model')).createAtomModel as unknown as Factory,
  "balloon-cluster": async () =>
    (await import('../elements/balloon-cluster')).createBalloonCluster as unknown as Factory,
  "battery-cell": async () =>
    (await import('../elements/battery-cell')).createBatteryCell as unknown as Factory,
  "beehive-skep": async () =>
    (await import('../elements/beehive-skep')).createBeehiveSkep as unknown as Factory,
  "birdcage": async () =>
    (await import('../elements/birdcage')).createBirdcage as unknown as Factory,
  "black-hole-disk": async () =>
    (await import('../elements/black-hole-disk')).createBlackHoleDisk as unknown as Factory,
  "boombox": async () =>
    (await import('../elements/boombox')).createBoombox as unknown as Factory,
  "boomerang-orbit": async () =>
    (await import('../elements/boomerang-orbit')).createBoomerangOrbit as unknown as Factory,
  "bowling-pin": async () =>
    (await import('../elements/bowling-pin')).createBowlingPin as unknown as Factory,
  "cactus-trio": async () =>
    (await import('../elements/cactus-trio')).createCactusTrio as unknown as Factory,
  "camera-vintage": async () =>
    (await import('../elements/camera-vintage')).createCameraVintage as unknown as Factory,
  "cannon-ball": async () =>
    (await import('../elements/cannon-ball')).createCannonBall as unknown as Factory,
  "cassette-tape": async () =>
    (await import('../elements/cassette-tape')).createCassetteTape as unknown as Factory,
  "castle-turret": async () =>
    (await import('../elements/castle-turret')).createCastleTurret as unknown as Factory,
  "catapult": async () =>
    (await import('../elements/catapult')).createCatapult as unknown as Factory,
  "chess-knight": async () =>
    (await import('../elements/chess-knight')).createChessKnight as unknown as Factory,
  "clay-vessel": async () =>
    (await import('../elements/clay-vessel')).createClayVessel as unknown as Factory,
  "compass-needle": async () =>
    (await import('../elements/compass-needle')).createCompassNeedle as unknown as Factory,
  "conch-shell": async () =>
    (await import('../elements/conch-shell')).createConchShell as unknown as Factory,
  "coral-branch": async () =>
    (await import('../elements/coral-branch')).createCoralBranch as unknown as Factory,
  "crystal-ball": async () =>
    (await import('../elements/crystal-ball')).createCrystalBall as unknown as Factory,
  "crystal-wand": async () =>
    (await import('../elements/crystal-wand')).createCrystalWand as unknown as Factory,
  "cube-stack": async () =>
    (await import('../elements/cube-stack')).createCubeStack as unknown as Factory,
  "d20-dice": async () =>
    (await import('../elements/d20-dice')).createD20Dice as unknown as Factory,
  "dartboard": async () =>
    (await import('../elements/dartboard')).createDartboard as unknown as Factory,
  "disco-ball": async () =>
    (await import('../elements/disco-ball')).createDiscoBall as unknown as Factory,
  "dna-twist": async () =>
    (await import('../elements/dna-twist')).createDnaTwist as unknown as Factory,
  "domino-arc": async () =>
    (await import('../elements/domino-arc')).createDominoArc as unknown as Factory,
  "edison-bulb": async () =>
    (await import('../elements/edison-bulb')).createEdisonBulb as unknown as Factory,
  "faceted-head": async () =>
    (await import('../elements/faceted-head')).createFacetedHead as unknown as Factory,
  "film-reel": async () =>
    (await import('../elements/film-reel')).createFilmReel as unknown as Factory,
  "gem-cluster": async () =>
    (await import('../elements/gem-cluster')).createGemCluster as unknown as Factory,
  "geode-slice": async () =>
    (await import('../elements/geode-slice')).createGeodeSlice as unknown as Factory,
  "goldfish-bowl": async () =>
    (await import('../elements/goldfish-bowl')).createGoldfishBowl as unknown as Factory,
  "gong-strike": async () =>
    (await import('../elements/gong-strike')).createGongStrike as unknown as Factory,
  "gramophone": async () =>
    (await import('../elements/gramophone')).createGramophone as unknown as Factory,
  "gyroscope": async () =>
    (await import('../elements/gyroscope')).createGyroscope as unknown as Factory,
  "hand-drum": async () =>
    (await import('../elements/hand-drum')).createHandDrum as unknown as Factory,
  "harp-strings": async () =>
    (await import('../elements/harp-strings')).createHarpStrings as unknown as Factory,
  "headphones": async () =>
    (await import('../elements/headphones')).createHeadphones as unknown as Factory,
  "horseshoe-magnet": async () =>
    (await import('../elements/horseshoe-magnet')).createHorseshoeMagnet as unknown as Factory,
  "hot-air-balloon": async () =>
    (await import('../elements/hot-air-balloon')).createHotAirBalloon as unknown as Factory,
  "ice-cream-cone": async () =>
    (await import('../elements/ice-cream-cone')).createIceCreamCone as unknown as Factory,
  "joystick-arcade": async () =>
    (await import('../elements/joystick-arcade')).createJoystickArcade as unknown as Factory,
  "kite-drift": async () =>
    (await import('../elements/kite-drift')).createKiteDrift as unknown as Factory,
  "knight-helmet": async () =>
    (await import('../elements/knight-helmet')).createKnightHelmet as unknown as Factory,
  "maracas": async () =>
    (await import('../elements/maracas')).createMaracas as unknown as Factory,
  "metronome-arm": async () =>
    (await import('../elements/metronome-arm')).createMetronomeArm as unknown as Factory,
  "microphone": async () =>
    (await import('../elements/microphone')).createMicrophone as unknown as Factory,
  "microscope": async () =>
    (await import('../elements/microscope')).createMicroscope as unknown as Factory,
  "moai-statue": async () =>
    (await import('../elements/moai-statue')).createMoaiStatue as unknown as Factory,
  "mushroom-ring": async () =>
    (await import('../elements/mushroom-ring')).createMushroomRing as unknown as Factory,
  "music-box": async () =>
    (await import('../elements/music-box')).createMusicBox as unknown as Factory,
  "nautilus-shell": async () =>
    (await import('../elements/nautilus-shell')).createNautilusShell as unknown as Factory,
  "nest-eggs": async () =>
    (await import('../elements/nest-eggs')).createNestEggs as unknown as Factory,
  "newtons-cradle": async () =>
    (await import('../elements/newtons-cradle')).createNewtonsCradle as unknown as Factory,
  "orbit-satellite": async () =>
    (await import('../elements/orbit-satellite')).createOrbitSatellite as unknown as Factory,
  "paper-lantern": async () =>
    (await import('../elements/paper-lantern')).createPaperLantern as unknown as Factory,
  "paper-plane-swarm": async () =>
    (await import('../elements/paper-plane-swarm')).createPaperPlaneSwarm as unknown as Factory,
  "penguin-chick": async () =>
    (await import('../elements/penguin-chick')).createPenguinChick as unknown as Factory,
  "piano-keys": async () =>
    (await import('../elements/piano-keys')).createPianoKeys as unknown as Factory,
  "pinball-bumper": async () =>
    (await import('../elements/pinball-bumper')).createPinballBumper as unknown as Factory,
  "pinwheel-spin": async () =>
    (await import('../elements/pinwheel-spin')).createPinwheelSpin as unknown as Factory,
  "plasma-globe": async () =>
    (await import('../elements/plasma-globe')).createPlasmaGlobe as unknown as Factory,
  "pocket-watch": async () =>
    (await import('../elements/pocket-watch')).createPocketWatch as unknown as Factory,
  "poker-chips": async () =>
    (await import('../elements/poker-chips')).createPokerChips as unknown as Factory,
  "potion-flask": async () =>
    (await import('../elements/potion-flask')).createPotionFlask as unknown as Factory,
  "pulsar-star": async () =>
    (await import('../elements/pulsar-star')).createPulsarStar as unknown as Factory,
  "retro-rocket": async () =>
    (await import('../elements/retro-rocket')).createRetroRocket as unknown as Factory,
  "royal-crown": async () =>
    (await import('../elements/royal-crown')).createRoyalCrown as unknown as Factory,
  "rubber-duck": async () =>
    (await import('../elements/rubber-duck')).createRubberDuck as unknown as Factory,
  "satellite-dish": async () =>
    (await import('../elements/satellite-dish')).createSatelliteDish as unknown as Factory,
  "slinky-stairs": async () =>
    (await import('../elements/slinky-stairs')).createSlinkyStairs as unknown as Factory,
  "slot-machine": async () =>
    (await import('../elements/slot-machine')).createSlotMachine as unknown as Factory,
  "solar-panel-array": async () =>
    (await import('../elements/solar-panel-array')).createSolarPanelArray as unknown as Factory,
  "space-station-core": async () =>
    (await import('../elements/space-station-core')).createSpaceStationCore as unknown as Factory,
  "speaker-cone": async () =>
    (await import('../elements/speaker-cone')).createSpeakerCone as unknown as Factory,
  "spinning-top": async () =>
    (await import('../elements/spinning-top')).createSpinningTop as unknown as Factory,
  "sunflower-head": async () =>
    (await import('../elements/sunflower-head')).createSunflowerHead as unknown as Factory,
  "swinging-bell": async () =>
    (await import('../elements/swinging-bell')).createSwingingBell as unknown as Factory,
  "sword-in-stone": async () =>
    (await import('../elements/sword-in-stone')).createSwordInStone as unknown as Factory,
  "teapot": async () =>
    (await import('../elements/teapot')).createTeapot as unknown as Factory,
  "telescope": async () =>
    (await import('../elements/telescope')).createTelescope as unknown as Factory,
  "tesla-coil": async () =>
    (await import('../elements/tesla-coil')).createTeslaCoil as unknown as Factory,
  "top-hat": async () =>
    (await import('../elements/top-hat')).createTopHat as unknown as Factory,
  "tower-of-hanoi": async () =>
    (await import('../elements/tower-of-hanoi')).createTowerOfHanoi as unknown as Factory,
  "treasure-chest": async () =>
    (await import('../elements/treasure-chest')).createTreasureChest as unknown as Factory,
  "trophy-cup": async () =>
    (await import('../elements/trophy-cup')).createTrophyCup as unknown as Factory,
  "tuning-fork": async () =>
    (await import('../elements/tuning-fork')).createTuningFork as unknown as Factory,
  "ufo-saucer": async () =>
    (await import('../elements/ufo-saucer')).createUfoSaucer as unknown as Factory,
  "umbrella-spin": async () =>
    (await import('../elements/umbrella-spin')).createUmbrellaSpin as unknown as Factory,
  "vinyl-record": async () =>
    (await import('../elements/vinyl-record')).createVinylRecord as unknown as Factory,
  "wind-chime": async () =>
    (await import('../elements/wind-chime')).createWindChime as unknown as Factory,
  "wind-turbine": async () =>
    (await import('../elements/wind-turbine')).createWindTurbine as unknown as Factory,
  "wire-bonsai": async () =>
    (await import('../elements/wire-bonsai')).createWireBonsai as unknown as Factory,
  "witch-cauldron": async () =>
    (await import('../elements/witch-cauldron')).createWitchCauldron as unknown as Factory,
  "yoyo-trick": async () =>
    (await import('../elements/yoyo-trick')).createYoYoTrick as unknown as Factory,
  "abyssal-trench": async () =>
    (await import('../elements/abyssal-trench')).createAbyssalTrench as unknown as Factory,
  "airship-armada": async () =>
    (await import('../elements/airship-armada')).createAirshipArmada as unknown as Factory,
  "alchemy-circle": async () =>
    (await import('../elements/alchemy-circle')).createAlchemyCircle as unknown as Factory,
  "amethyst-cavern": async () =>
    (await import('../elements/amethyst-cavern')).createAmethystCavern as unknown as Factory,
  "astronaut-drift": async () =>
    (await import('../elements/astronaut-drift')).createAstronautDrift as unknown as Factory,
  "aurora-peaks": async () =>
    (await import('../elements/aurora-peaks')).createAuroraPeaks as unknown as Factory,
  "book-portal": async () =>
    (await import('../elements/book-portal')).createBookPortal as unknown as Factory,
  "buried-colossus": async () =>
    (await import('../elements/buried-colossus')).createBuriedColossus as unknown as Factory,
  "campfire-comet": async () =>
    (await import('../elements/campfire-comet')).createCampfireComet as unknown as Factory,
  "circus-tent": async () =>
    (await import('../elements/circus-tent')).createCircusTent as unknown as Factory,
  "cliffside-temple": async () =>
    (await import('../elements/cliffside-temple')).createCliffsideTemple as unknown as Factory,
  "clockwork-orrery": async () =>
    (await import('../elements/clockwork-orrery')).createClockworkOrrery as unknown as Factory,
  "cloud-haven": async () =>
    (await import('../elements/cloud-haven')).createCloudHaven as unknown as Factory,
  "cosmic-curtain": async () =>
    (await import('../elements/cosmic-curtain')).createCosmicCurtain as unknown as Factory,
  "cosmic-lotus": async () =>
    (await import('../elements/cosmic-lotus')).createCosmicLotus as unknown as Factory,
  "crane-wish": async () =>
    (await import('../elements/crane-wish')).createCraneWish as unknown as Factory,
  "crystal-deer": async () =>
    (await import('../elements/crystal-deer')).createCrystalDeer as unknown as Factory,
  "deep-diver": async () =>
    (await import('../elements/deep-diver')).createDeepDiver as unknown as Factory,
  "desert-camp": async () =>
    (await import('../elements/desert-camp')).createDesertCamp as unknown as Factory,
  "desert-night": async () =>
    (await import('../elements/desert-night')).createDesertNight as unknown as Factory,
  "desert-pyramid": async () =>
    (await import('../elements/desert-pyramid')).createDesertPyramid as unknown as Factory,
  "door-in-the-sky": async () =>
    (await import('../elements/door-in-the-sky')).createDoorInTheSky as unknown as Factory,
  "dragon-hoard": async () =>
    (await import('../elements/dragon-hoard')).createDragonHoard as unknown as Factory,
  "dragon-parade": async () =>
    (await import('../elements/dragon-parade')).createDragonParade as unknown as Factory,
  "dragonfly-dusk": async () =>
    (await import('../elements/dragonfly-dusk')).createDragonflyDusk as unknown as Factory,
  "dreamcatcher": async () =>
    (await import('../elements/dreamcatcher')).createDreamcatcher as unknown as Factory,
  "dusk-balloon": async () =>
    (await import('../elements/dusk-balloon')).createDuskBalloon as unknown as Factory,
  "ember-forge": async () =>
    (await import('../elements/ember-forge')).createEmberForge as unknown as Factory,
  "fairy-ring": async () =>
    (await import('../elements/fairy-ring')).createFairyRing as unknown as Factory,
  "floating-city": async () =>
    (await import('../elements/floating-city')).createFloatingCity as unknown as Factory,
  "floating-library": async () =>
    (await import('../elements/floating-library')).createFloatingLibrary as unknown as Factory,
  "floating-runestones": async () =>
    (await import('../elements/floating-runestones')).createFloatingRunestones as unknown as Factory,
  "frost-heart": async () =>
    (await import('../elements/frost-heart')).createFrostHeart as unknown as Factory,
  "galaxy-jar": async () =>
    (await import('../elements/galaxy-jar')).createGalaxyJar as unknown as Factory,
  "genie-smoke": async () =>
    (await import('../elements/genie-smoke')).createGenieSmoke as unknown as Factory,
  "ghost-ship": async () =>
    (await import('../elements/ghost-ship')).createGhostShip as unknown as Factory,
  "glass-dunes": async () =>
    (await import('../elements/glass-dunes')).createGlassDunes as unknown as Factory,
  "gondola-night": async () =>
    (await import('../elements/gondola-night')).createGondolaNight as unknown as Factory,
  "gravity-well": async () =>
    (await import('../elements/gravity-well')).createGravityWell as unknown as Factory,
  "hanging-gardens": async () =>
    (await import('../elements/hanging-gardens')).createHangingGardens as unknown as Factory,
  "harbor-moon": async () =>
    (await import('../elements/harbor-moon')).createHarborMoon as unknown as Factory,
  "henge-dawn": async () =>
    (await import('../elements/henge-dawn')).createHengeDawn as unknown as Factory,
  "hourglass-time": async () =>
    (await import('../elements/hourglass-time')).createHourglassTime as unknown as Factory,
  "hyperspace-gate": async () =>
    (await import('../elements/hyperspace-gate')).createHyperspaceGate as unknown as Factory,
  "iceberg-drift": async () =>
    (await import('../elements/iceberg-drift')).createIcebergDrift as unknown as Factory,
  "icebreaker-dawn": async () =>
    (await import('../elements/icebreaker-dawn')).createIcebreakerDawn as unknown as Factory,
  "ink-mountains": async () =>
    (await import('../elements/ink-mountains')).createInkMountains as unknown as Factory,
  "jelly-bloom": async () =>
    (await import('../elements/jelly-bloom')).createJellyBloom as unknown as Factory,
  "jungle-temple": async () =>
    (await import('../elements/jungle-temple')).createJungleTemple as unknown as Factory,
  "kitsune-foxfire": async () =>
    (await import('../elements/kitsune-foxfire')).createKitsuneFoxfire as unknown as Factory,
  "long-neck-sunset": async () =>
    (await import('../elements/long-neck-sunset')).createLongNeckSunset as unknown as Factory,
  "lumina-rain": async () =>
    (await import('../elements/lumina-rain')).createLuminaRain as unknown as Factory,
  "magic-carpet": async () =>
    (await import('../elements/magic-carpet')).createMagicCarpet as unknown as Factory,
  "manta-glide": async () =>
    (await import('../elements/manta-glide')).createMantaGlide as unknown as Factory,
  "marigold-night": async () =>
    (await import('../elements/marigold-night')).createMarigoldNight as unknown as Factory,
  "mermaid-rock": async () =>
    (await import('../elements/mermaid-rock')).createMermaidRock as unknown as Factory,
  "midnight-carousel": async () =>
    (await import('../elements/midnight-carousel')).createMidnightCarousel as unknown as Factory,
  "moon-gate": async () =>
    (await import('../elements/moon-gate')).createMoonGate as unknown as Factory,
  "moonlit-oasis": async () =>
    (await import('../elements/moonlit-oasis')).createMoonlitOasis as unknown as Factory,
  "moonlit-sea": async () =>
    (await import('../elements/moonlit-sea')).createMoonlitSea as unknown as Factory,
  "mushroom-grove": async () =>
    (await import('../elements/mushroom-grove')).createMushroomGrove as unknown as Factory,
  "neon-metropolis": async () =>
    (await import('../elements/neon-metropolis')).createNeonMetropolis as unknown as Factory,
  "night-ferris": async () =>
    (await import('../elements/night-ferris')).createNightFerris as unknown as Factory,
  "octopus-lair": async () =>
    (await import('../elements/octopus-lair')).createOctopusLair as unknown as Factory,
  "orbital-station": async () =>
    (await import('../elements/orbital-station')).createOrbitalStation as unknown as Factory,
  "origami-flock": async () =>
    (await import('../elements/origami-flock')).createOrigamiFlock as unknown as Factory,
  "owl-watch": async () =>
    (await import('../elements/owl-watch')).createOwlWatch as unknown as Factory,
  "phoenix-ascent": async () =>
    (await import('../elements/phoenix-ascent')).createPhoenixAscent as unknown as Factory,
  "pillar-of-dawn": async () =>
    (await import('../elements/pillar-of-dawn')).createPillarOfDawn as unknown as Factory,
  "pipe-cathedral": async () =>
    (await import('../elements/pipe-cathedral')).createPipeCathedral as unknown as Factory,
  "planet-rise": async () =>
    (await import('../elements/planet-rise')).createPlanetRise as unknown as Factory,
  "portal-stairs": async () =>
    (await import('../elements/portal-stairs')).createPortalStairs as unknown as Factory,
  "redwood-rays": async () =>
    (await import('../elements/redwood-rays')).createRedwoodRays as unknown as Factory,
  "rocket-dawn": async () =>
    (await import('../elements/rocket-dawn')).createRocketDawn as unknown as Factory,
  "rooftop-cat": async () =>
    (await import('../elements/rooftop-cat')).createRooftopCat as unknown as Factory,
  "rune-circle": async () =>
    (await import('../elements/rune-circle')).createRuneCircle as unknown as Factory,
  "serpent-of-stars": async () =>
    (await import('../elements/serpent-of-stars')).createSerpentOfStars as unknown as Factory,
  "shrine-steps": async () =>
    (await import('../elements/shrine-steps')).createShrineSteps as unknown as Factory,
  "sky-elevator": async () =>
    (await import('../elements/sky-elevator')).createSkyElevator as unknown as Factory,
  "sky-isles": async () =>
    (await import('../elements/sky-isles')).createSkyIsles as unknown as Factory,
  "sky-train": async () =>
    (await import('../elements/sky-train')).createSkyTrain as unknown as Factory,
  "sleeping-giant": async () =>
    (await import('../elements/sleeping-giant')).createSleepingGiant as unknown as Factory,
  "snail-village": async () =>
    (await import('../elements/snail-village')).createSnailVillage as unknown as Factory,
  "spirit-river": async () =>
    (await import('../elements/spirit-river')).createSpiritRiver as unknown as Factory,
  "star-whale": async () =>
    (await import('../elements/star-whale')).createStarWhale as unknown as Factory,
  "starfall-cliff": async () =>
    (await import('../elements/starfall-cliff')).createStarfallCliff as unknown as Factory,
  "stargazer-dome": async () =>
    (await import('../elements/stargazer-dome')).createStargazerDome as unknown as Factory,
  "still-lake": async () =>
    (await import('../elements/still-lake')).createStillLake as unknown as Factory,
  "stormbreak-rainbow": async () =>
    (await import('../elements/stormbreak-rainbow')).createStormbreakRainbow as unknown as Factory,
  "terraced-temple": async () =>
    (await import('../elements/terraced-temple')).createTerracedTemple as unknown as Factory,
  "totem-awakening": async () =>
    (await import('../elements/totem-awakening')).createTotemAwakening as unknown as Factory,
  "treasure-map": async () =>
    (await import('../elements/treasure-map')).createTreasureMap as unknown as Factory,
  "underwater-ruins": async () =>
    (await import('../elements/underwater-ruins')).createUnderwaterRuins as unknown as Factory,
  "vine-arch": async () =>
    (await import('../elements/vine-arch')).createVineArch as unknown as Factory,
  "winding-wall": async () =>
    (await import('../elements/winding-wall')).createWindingWall as unknown as Factory,
  "windmill-dusk": async () =>
    (await import('../elements/windmill-dusk')).createWindmillDusk as unknown as Factory,
  "windward-cliffs": async () =>
    (await import('../elements/windward-cliffs')).createWindwardCliffs as unknown as Factory,
  "world-tree": async () =>
    (await import('../elements/world-tree')).createWorldTree as unknown as Factory,
  "world-turtle": async () =>
    (await import('../elements/world-turtle')).createWorldTurtle as unknown as Factory,
  "zodiac-wheel": async () =>
    (await import('../elements/zodiac-wheel')).createZodiacWheel as unknown as Factory,
};

const pending = new WeakSet<Element>();

/**
 * Loads the factory for a container's slug and starts it.
 * Guards against double-mounts (`pending` set) and against the node being
 * removed from the DOM while its module chunk was still downloading.
 */
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

/**
 * Runs the disposer stored on a container and clears bookkeeping state so the
 * element can be cleanly re-mounted later.
 */
function unmount(container: HTMLElement) {
  const holder = container as HTMLElement & { __colliderDispose?: Disposer };
  if (holder.__colliderDispose) {
    holder.__colliderDispose();
    holder.__colliderDispose = undefined;
  }
  delete container.dataset.colliderMounted;
}

/**
 * Single IntersectionObserver shared by every element on the page.
 *   - Entering viewport (+300px margin, so we preload just before the user
 *     sees it)  -> mount.
 *   - Leaving viewport -> unmount (frees rAF loops / WebGL contexts).
 * Tweak rootMargin to trade eager loading against bandwidth/CPU.
 */
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

/**
 * Entry point. We only OBSERVE here — no eager mount() calls. The observer
 * fires its callback once for every observed node right away, so visible
 * elements mount immediately while below-fold elements wait until they are
 * actually approached. This keeps initial page load free of unnecessary
 * chunk downloads and animation startup for offscreen content.
 */
function init() {
  document.querySelectorAll<HTMLElement>('[data-collider]').forEach((el) => {
    if (!el.dataset.colliderMounted && !pending.has(el)) visibility.observe(el);
  });
}

init();
