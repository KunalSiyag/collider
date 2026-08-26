import particleField from '../elements/particle-field.ts?raw';
import wavePlane from '../elements/wave-plane.ts?raw';
import gridFloor from '../elements/grid-floor.ts?raw';
import distortedSphere from '../elements/distorted-sphere.ts?raw';
import wireframeGlobe from '../elements/wireframe-globe.ts?raw';
import liquidKnot from '../elements/liquid-knot.ts?raw';
import floatingShapes from '../elements/floating-shapes.ts?raw';
import orbitLoader from '../elements/orbit-loader.ts?raw';
import galaxySpiral from '../elements/galaxy-spiral.ts?raw';
import starHyperspace from '../elements/star-hyperspace.ts?raw';
import constellationNetwork from '../elements/constellation-network.ts?raw';
import textParticles from '../elements/text-particles.ts?raw';
import rippleRings from '../elements/ripple-rings.ts?raw';
import flowField from '../elements/flow-field.ts?raw';
import shardCrystal from '../elements/shard-crystal.ts?raw';
import torusTunnel from '../elements/torus-tunnel.ts?raw';
import dotTerrain from '../elements/dot-terrain.ts?raw';
import helixStrand from '../elements/helix-strand.ts?raw';
import fogDrift from '../elements/fog-drift.ts?raw';
import pulseRing from '../elements/pulse-ring.ts?raw';
import wireCube from '../elements/wire-cube.ts?raw';
import monolith from '../elements/monolith.ts?raw';
import spotlightStage from '../elements/spotlight-stage.ts?raw';
import ringPortal from '../elements/ring-portal.ts?raw';

import { createAuroraMesh } from '../vector/aurora-mesh';
import { createContourLines } from '../vector/contour-lines';
import { createDotMatrix } from '../vector/dot-matrix';
import { createRadialRays } from '../vector/radial-rays';
import { createStarField } from '../vector/star-field';
import { createWaveDivider } from '../vector/wave-divider';
import { createHexPattern } from '../vector/hex-pattern';
import { createTopoWaves } from '../vector/topo-waves';
import { createBlobShape } from '../vector/blob-shape';
import { createCircuitBoard } from '../vector/circuit-board';
import { createChevronPattern } from '../vector/chevron-pattern';
import { createPlusGrid } from '../vector/plus-grid';
import { createRetroSun } from '../vector/retro-sun';
import { createCornerFrame } from '../vector/corner-frame';
import { createScanLines } from '../vector/scan-lines';
import { createZigzagDivider } from '../vector/zigzag-divider';
import { createSpiralDots } from '../vector/spiral-dots';
import { createTargetLock } from '../vector/target-lock';
import { createArrowFlow } from '../vector/arrow-flow';
import { createBurstStar } from '../vector/burst-star';
import { createWaveLines } from '../vector/wave-lines';
import { createPerspectiveGrid } from '../vector/perspective-grid';
import { createConcentricDots } from '../vector/concentric-dots';
import { createDiagonalStripes } from '../vector/diagonal-stripes';

// Scenes: full-bleed illustrated landscapes (hero backgrounds).
import { createAlpineMeadow } from '../scenes/alpine-meadow';
import { createMistyPines } from '../scenes/misty-pines';
import { createAuroraLake } from '../scenes/aurora-lake';
import { createBeachDay } from '../scenes/beach-day';
import { createCountrysideNight } from '../scenes/countryside-night';
import { createDesertDunes } from '../scenes/desert-dunes';
import { createPixelPlatformer } from '../scenes/pixel-platformer';
import { createBlockWorld } from '../scenes/block-world';
import { createSakuraHill } from '../scenes/sakura-hill';
import { createArcticNight } from '../scenes/arctic-night';

// Scenic vector art.
import { createBalloonFestival } from '../vector/balloon-festival';
import { createCableCarLine } from '../vector/cable-car-line';
import { createCampNight } from '../vector/camp-night';
import { createKiteBeach } from '../vector/kite-beach';
import { createPaperBoats } from '../vector/paper-boats';
import { createSailboatRegatta } from '../vector/sailboat-regatta';
import { createWindFarm } from '../vector/wind-farm';

// Quality-wave additions.
import { createCoralReef } from '../scenes/coral-reef';import { createVineyardHill } from '../scenes/vineyard-hill';
import { createStormPlains } from '../scenes/storm-plains';
import { createBambooPath } from '../scenes/bamboo-path';
import { createHarborDusk } from '../scenes/harbor-dusk';
import { createCanyonMesa } from '../scenes/canyon-mesa';
import { createWindmillValley } from '../vector/windmill-valley';
import { createKoiPond } from '../vector/koi-pond';
import { createStormLighthouse } from '../vector/storm-lighthouse';
import { createWaveStack } from '../vector/shape-wave-stack';
import { createDiamondLattice } from '../vector/shape-diamond-lattice';
import { createOrbitDots } from '../vector/shape-orbit-dots';
import { createCanvasWeave } from '../textures/texture-canvas-weave';
import { createIsoFerryDock } from '../isometric/iso-ferry-dock';
import { createIsoAtticRoom } from '../isometric/iso-attic-room';
import { createFrostling } from '../monsters/monster-frostling';
import { createGustling } from '../monsters/monster-gustling';
import { createEmberwing } from '../elementals/elemental-emberwing';
import { createMossheart } from '../elementals/elemental-mossheart';

// Charts, icons and dividers (pure SVG generators).
import { createAnimatedBars } from '../charts/chart-animated-bars';
import { createLineDraw } from '../charts/chart-line-draw';
import { createDonutChart } from '../charts/chart-donut';
import { createRadialGauge } from '../charts/chart-radial-gauge';
import { createSparkline } from '../charts/chart-sparkline';
import { createAreaFlow } from '../charts/chart-area-flow';
import { createHeatmapGrid } from '../charts/chart-heatmap-grid';
import { createRadarChart } from '../charts/chart-radar';
import { createStackedBars } from '../charts/chart-stacked-bars';
import { createProgressRings } from '../charts/chart-progress-rings';
import { createWifiPulse } from '../icons/icon-wifi-pulse';
import { createBatteryCharge } from '../icons/icon-battery-charge';
import { createBluetoothPing } from '../icons/icon-bluetooth-ping';
import { createVolumeWave } from '../icons/icon-volume-wave';
import { createSyncRotate } from '../icons/icon-sync-rotate';
import { createLocationPulse } from '../icons/icon-location-pulse';
import { createHeartBeat } from '../icons/icon-heart-beat';
import { createCloudSync } from '../icons/icon-cloud-sync';
import { createGradientFade } from '../dividers/divider-gradient-fade';
import { createTornPaper } from '../dividers/divider-torn-paper';
import { createCircuitDivider } from '../dividers/divider-circuit';
import { createDotsFade } from '../dividers/divider-dots-fade';
import { createSlashCut } from '../dividers/divider-slash-cut';
import { createPulseLine } from '../dividers/divider-pulse-line';
import { createRibbonSwoosh } from '../dividers/divider-ribbon-swoosh';
import { createSkylineDivider } from '../dividers/divider-skyline';

// Badges and timelines (pure SVG generators).
import { createStatusBadge } from '../badges/badge-status';
import { createVerifiedBadge } from '../badges/badge-verified';
import { createLiveIndicator } from '../badges/badge-live';
import { createLevelMedal } from '../badges/badge-level-medal';
import { createPriceTag } from '../badges/badge-price-tag';
import { createBetaPill } from '../badges/badge-beta-pill';
import { createCountBadge } from '../badges/badge-count';
import { createAchievementRosette } from '../badges/badge-achievement-rosette';
import { createVerticalTimeline } from '../timelines/timeline-vertical';
import { createAlternatingTimeline } from '../timelines/timeline-alternating';
import { createHorizontalMilestones } from '../timelines/timeline-horizontal';
import { createCommitLog } from '../timelines/timeline-commit-log';
import { createJourneyCurve } from '../timelines/timeline-journey';
import { createGanttBars } from '../timelines/timeline-gantt';
import { createDayAgenda } from '../timelines/timeline-agenda';
import { createEraBands } from '../timelines/timeline-era-bands';

// Empty states (pure SVG generators).
import { createEmptyInbox } from '../empties/empty-inbox';
import { createEmptySearch } from '../empties/empty-search';
import { createEmptyCart } from '../empties/empty-cart';
import { createError404 } from '../empties/empty-404';
import { createEmptyFolder } from '../empties/empty-folder';
import { createOfflineState } from '../empties/empty-offline';
import { createEmptyNotifications } from '../empties/empty-notifications';
import { createErrorCrash } from '../empties/empty-crash';

import { createIsoCubes } from '../isometric/iso-cube';
import { createIsoTower } from '../isometric/iso-tower';
import { createIsoServer } from '../isometric/iso-server';
import { createIsoTrees } from '../isometric/iso-trees';
import { createIsoBoxes } from '../isometric/iso-boxes';

import { createAvatarInitials } from '../avatars/avatar-initials';
import { createAvatarPixel } from '../avatars/avatar-pixel';
import { createAvatarBlob } from '../avatars/avatar-blob';
import { createAvatarShapes } from '../avatars/avatar-shapes';
import { createAvatarStatus } from '../avatars/avatar-status';

import { createMonsterEmber } from '../monsters/monster-ember';
import { createMonsterTide } from '../monsters/monster-tide';
import { createMonsterSprout } from '../monsters/monster-sprout';
import { createMonsterZap } from '../monsters/monster-zap';
import { createMonsterWisp } from '../monsters/monster-wisp';
import { createCaptureCore } from '../monsters/capture-core';

import { createAvatarRobot } from '../avatars/avatar-robot';
import { createAvatarCat } from '../avatars/avatar-cat';
import { createAvatarAnimal } from '../avatars/avatar-animal';
import { createAvatarOrbit } from '../avatars/avatar-orbit';
import { createAvatarRing } from '../avatars/avatar-ring';

import { createTextureStatic } from '../textures/texture-static';
import { createTexturePaper } from '../textures/texture-paper';
import { createTextureMarble } from '../textures/texture-marble';
import { createTextureHalftone } from '../textures/texture-halftone';
import { createTexturePlaid } from '../textures/texture-plaid';
import { createTextureCarbon } from '../textures/texture-carbon';
import { createTextureBlueprint } from '../textures/texture-blueprint';
import { createTextureWatercolor } from '../textures/texture-watercolor';
import { createTextureGrain } from '../textures/texture-grain';
import { createTextureSand } from '../textures/texture-sand';
import { createTextureKnit } from '../textures/texture-knit';
import { createTextureFog } from '../textures/texture-fog';
import { createTextureBrick } from '../textures/texture-brick';
import { createTextureDenim } from '../textures/texture-denim';
import { createTextureCork } from '../textures/texture-cork';
import { createTextureTerrazzo } from '../textures/texture-terrazzo';

import { createElementalFlame } from '../elementals/elemental-flame';
import { createElementalTide } from '../elementals/elemental-tide';
import { createElementalTerra } from '../elementals/elemental-terra';
import { createElementalGale } from '../elementals/elemental-gale';
import { createElementalVolt } from '../elementals/elemental-volt';
import { createElementalFrost } from '../elementals/elemental-frost';
import { createElementalMagma } from '../elementals/elemental-magma';
import { createElementalLumen } from '../elementals/elemental-lumen';
import { createElementalUmbra } from '../elementals/elemental-umbra';
import { createElementalBlizzard } from '../elementals/elemental-blizzard';
import { createElementalQuake } from '../elementals/elemental-quake';
import { createElementalThorn } from '../elementals/elemental-thorn';
import { createElementalEcho } from '../elementals/elemental-echo';

import motionTextReveal from '../motions/motion-text-reveal.ts?raw';
import motionWordsSlide from '../motions/motion-words-slide.ts?raw';
import motionScrollReveal from '../motions/motion-scroll-reveal.ts?raw';
import motionParallaxLayers from '../motions/motion-parallax-layers.ts?raw';
import motionMagneticButton from '../motions/motion-magnetic-button.ts?raw';
import motionCounterRoll from '../motions/motion-counter-roll.ts?raw';
import motionMarqueeLoop from '../motions/motion-marquee-loop.ts?raw';
import motionLetterScramble from '../motions/motion-letter-scramble.ts?raw';
import motionElasticDrag from '../motions/motion-elastic-drag.ts?raw';

import effectGlassCard from '../effects/effect-glass-card.ts?raw';
import effectNeonText from '../effects/effect-neon-text.ts?raw';
import effectGradientBorderSpin from '../effects/effect-gradient-border-spin.ts?raw';
import effectShimmerSkeleton from '../effects/effect-shimmer-skeleton.ts?raw';
import effectSpotlightCard from '../effects/effect-spotlight-card.ts?raw';
import effectGlitchText from '../effects/effect-glitch-text.ts?raw';
import effectFlipCard from '../effects/effect-flip-card.ts?raw';
import effectAuroraBorder from '../effects/effect-aurora-border.ts?raw';
import effectBlobMorph from '../effects/effect-blob-morph.ts?raw';
import effectGradientTextFlow from '../effects/effect-gradient-text-flow.ts?raw';
import effectTypingDots from '../effects/effect-typing-dots.ts?raw';

import buttonGlow from '../buttons/button-glow.ts?raw';
import buttonNeonOutline from '../buttons/button-neon-outline.ts?raw';
import buttonGlass from '../buttons/button-glass.ts?raw';
import buttonLoading from '../buttons/button-loading.ts?raw';
import buttonIconSlide from '../buttons/button-icon-slide.ts?raw';
import buttonSocialCircle from '../buttons/button-social-circle.ts?raw';
import buttonBorderTrace from '../buttons/button-border-trace.ts?raw';
import buttonElasticPress from '../buttons/button-elastic-press.ts?raw';

import { createAvatarGhost } from '../avatars/avatar-ghost';
import { createAvatarSlime } from '../avatars/avatar-slime';
import { createAvatarWizard } from '../avatars/avatar-wizard';
import { createAvatarKnight } from '../avatars/avatar-knight';
import { createAvatarOwl } from '../avatars/avatar-owl';
import { createAvatarPenguin } from '../avatars/avatar-penguin';
import { createAvatarBunny } from '../avatars/avatar-bunny';
import { createAvatarTiger } from '../avatars/avatar-tiger';
import { createAvatarAlien } from '../avatars/avatar-alien';
import { createAvatarMushroom } from '../avatars/avatar-mushroom';

import { createMonsterGolem } from '../monsters/monster-golem';
import { createMonsterToxic } from '../monsters/monster-toxic';
import { createMonsterCrystal } from '../monsters/monster-crystal';
import { createMonsterFluff } from '../monsters/monster-fluff';
import { createMonsterBubble } from '../monsters/monster-bubble';
import { createMonsterShroom } from '../monsters/monster-shroom';
import { createMonsterFangling } from '../monsters/monster-fangling';
import { createMonsterCactling } from '../monsters/monster-cactling';
import { createMonsterDrakeling } from '../monsters/monster-drakeling';
import { createMonsterStarning } from '../monsters/monster-starning';
import { createMonsterWormling } from '../monsters/monster-wormling';
import { createMonsterMothling } from '../monsters/monster-mothling';
import { createMonsterSluggo } from '../monsters/monster-sluggo';
import { createMonsterBeetle } from '../monsters/monster-beetle';
import { createMonsterJelly } from '../monsters/monster-jelly';
import { createMonsterKoiling } from '../monsters/monster-koiling';

import { createIsoDesk } from '../isometric/iso-desk';
import { createIsoGift } from '../isometric/iso-gift';
import { createIsoHouse } from '../isometric/iso-house';

import { createShapeStairs } from '../vector/shape-stairs';
import { createShapeDunes } from '../vector/shape-dunes';
import { createShapePillGrid } from '../vector/shape-pill-grid';

import buttonToggleSwitch from '../buttons/button-toggle-switch.ts?raw';
import buttonCopyFeedback from '../buttons/button-copy-feedback.ts?raw';
import buttonSlideText from '../buttons/button-slide-text.ts?raw';

import effectChromaticHover from '../effects/effect-chromatic-hover.ts?raw';
import effectVignettePanel from '../effects/effect-vignette-panel.ts?raw';
import effectInputGlow from '../effects/effect-input-glow.ts?raw';

import { createShapeRings } from '../vector/shape-rings';
import { createShapeArcs } from '../vector/shape-arcs';
import { createShapeTriangles } from '../vector/shape-triangles';
import { createShapeRibbon } from '../vector/shape-ribbon';
import { createShapeWaves } from '../vector/shape-waves';
import { createShapeConfetti } from '../vector/shape-confetti';

import { createAntTrail as s_ant_trail } from '../vector/ant-trail';
import { createAudioPulse as s_audio_pulse } from '../vector/audio-pulse';
import { createBambooGrove as s_bamboo_grove } from '../vector/bamboo-grove';
import { createBarberPole as s_barber_pole } from '../vector/barber-pole';
import { createBasketWeave as s_basket_weave } from '../vector/basket-weave';
import { createBathymetryMap as s_bathymetry_map } from '../vector/bathymetry-map';
import { createBirdFlock as s_bird_flock } from '../vector/bird-flock';
import { createBrickFade as s_brick_fade } from '../vector/brick-fade';
import { createButterflyWing as s_butterfly_wing } from '../vector/butterfly-wing';
import { createCafeWall as s_cafe_wall } from '../vector/cafe-wall';
import { createCanyonStrata as s_canyon_strata } from '../vector/canyon-strata';
import { createCaveColumns as s_cave_columns } from '../vector/cave-columns';
import { createCheckerWarp as s_checker_warp } from '../vector/checker-warp';
import { createCherryBranch as s_cherry_branch } from '../vector/cherry-branch';
import { createCloudLayers as s_cloud_layers } from '../vector/cloud-layers';
import { createCometTail as s_comet_tail_motif } from '../vector/comet-tail-motif';
import { createCompassRose as s_compass_rose } from '../vector/compass-rose';
import { createCoralBranch as s_coral_branch_motif } from '../vector/coral-branch-motif';
import { createCrystalCluster as s_crystal_cluster } from '../vector/crystal-cluster';
import { createDandelionSeeds as s_dandelion_seeds } from '../vector/dandelion-seeds';
import { createEmberRise as s_ember_rise } from '../vector/ember-rise';
import { createFernFronds as s_fern_fronds } from '../vector/fern-fronds';
import { createFireflyGlow as s_firefly_glow } from '../vector/firefly-glow';
import { createFishSchool as s_fish_school_motif } from '../vector/fish-school-motif';
import { createFoldedPlanes as s_folded_planes } from '../vector/folded-planes';
import { createFractalTree as s_fractal_tree } from '../vector/fractal-tree';
import { createFrostWindow as s_frost_window_motif } from '../vector/frost-window-motif';
import { createGlacierCracks as s_glacier_cracks } from '../vector/glacier-cracks';
import { createGlassShards as s_glass_shards } from '../vector/glass-shards';
import { createGoldenSpiral as s_golden_spiral } from '../vector/golden-spiral';
import { createGreatWave as s_great_wave } from '../vector/great-wave';
import { createHalftoneWave as s_halftone_wave } from '../vector/halftone-wave';
import { createHarborSkyline as s_harbor_skyline } from '../vector/harbor-skyline';
import { createHeartbeatLine as s_heartbeat_line } from '../vector/heartbeat-line';
import { createHermannGrid as s_hermann_grid } from '../vector/hermann-grid';
import { createHerringbone as s_herringbone } from '../vector/herringbone';
import { createHoundstooth as s_houndstooth } from '../vector/houndstooth';
import { createIkatStripe as s_ikat_stripe } from '../vector/ikat-stripe';
import { createIvyCorner as s_ivy_corner } from '../vector/ivy-corner';
import { createJellyfishDrift as s_jellyfish_drift } from '../vector/jellyfish-drift';
import { createKelpForest as s_kelp_forest_motif } from '../vector/kelp-forest-motif';
import { createLanternFestival as s_lantern_festival_motif } from '../vector/lantern-festival-motif';
import { createLeafVeins as s_leaf_veins } from '../vector/leaf-veins';
import { createLighthouseBeams as s_lighthouse_beams } from '../vector/lighthouse-beams';
import { createLightningWeb as s_lightning_web } from '../vector/lightning-web';
import { createLotusPads as s_lotus_pads } from '../vector/lotus-pads';
import { createLunarCraters as s_lunar_craters } from '../vector/lunar-craters';
import { createMagneticField as s_magnetic_field } from '../vector/magnetic-field';
import { createMandalaLines as s_mandala_lines } from '../vector/mandala-lines';
import { createMeteorShower as s_meteor_shower_motif } from '../vector/meteor-shower-motif';
import { createMoireRings as s_moire_rings } from '../vector/moire-rings';
import { createMoonPhases as s_moon_phases_motif } from '../vector/moon-phases-motif';
import { createMosaicTiles as s_mosaic_tiles } from '../vector/mosaic-tiles';
import { createMossPatch as s_moss_patch } from '../vector/moss-patch';
import { createMudCloth as s_mud_cloth } from '../vector/mud-cloth';
import { createMushroomRing as s_mushroom_ring_motif } from '../vector/mushroom-ring-motif';
import { createNebulaCloud as s_nebula_cloud } from '../vector/nebula-cloud';
import { createOceanSwells as s_ocean_swells } from '../vector/ocean-swells';
import { createOpTunnel as s_op_tunnel } from '../vector/op-tunnel';
import { createPeacockEye as s_peacock_eye } from '../vector/peacock-eye';
import { createPendulumArcs as s_pendulum_arcs } from '../vector/pendulum-arcs';
import { createPetalBloom as s_petal_bloom } from '../vector/petal-bloom';
import { createPhyllotaxis as s_phyllotaxis } from '../vector/phyllotaxis';
import { createPineconeSpiral as s_pinecone_spiral } from '../vector/pinecone-spiral';
import { createPlaidWeave as s_plaid_weave } from '../vector/plaid-weave';
import { createPlanetRings as s_planet_rings } from '../vector/planet-rings';
import { createPlumeSwirl as s_plume_swirl } from '../vector/plume-swirl';
import { createPulsarBeams as s_pulsar_beams } from '../vector/pulsar-beams';
import { createQuiltedDiamonds as s_quilted_diamonds } from '../vector/quilted-diamonds';
import { createRainVeil as s_rain_veil_motif } from '../vector/rain-veil-motif';
import { createRiverDelta as s_river_delta_motif } from '../vector/river-delta-motif';
import { createRootNetwork as s_root_network } from '../vector/root-network';
import { createRoseWindow as s_rose_window } from '../vector/rose-window';
import { createRuneStones as s_rune_stones } from '../vector/rune-stones';
import { createSashikoStitch as s_sashiko_stitch } from '../vector/sashiko-stitch';
import { createScatterDust as s_scatter_dust } from '../vector/scatter-dust';
import { createSeismographTrace as s_seismograph_trace } from '../vector/seismograph-trace';
import { createSerpentTrail as s_serpent_trail } from '../vector/serpent-trail';
import { createSmokeCurl as s_smoke_curl } from '../vector/smoke-curl';
import { createSnakeScales as s_snake_scales } from '../vector/snake-scales';
import { createSnowfallDrift as s_snowfall_drift } from '../vector/snowfall-drift';
import { createSolarFlare as s_solar_flare } from '../vector/solar-flare';
import { createStarChart as s_star_chart } from '../vector/star-chart';
import { createStepPyramid as s_step_pyramid } from '../vector/step-pyramid';
import { createStreamerCurl as s_streamer_curl } from '../vector/streamer-curl';
import { createSucculentRosette as s_succulent_rosette } from '../vector/succulent-rosette';
import { createSunburstMosaic as s_sunburst_mosaic } from '../vector/sunburst-mosaic';
import { createTerracedFields as s_terraced_fields } from '../vector/terraced-fields';
import { createTornadoSpin as s_tornado_spin } from '../vector/tornado-spin';
import { createTotemColumn as s_totem_column } from '../vector/totem-column';
import { createTruchetArcs as s_truchet_arcs } from '../vector/truchet-arcs';
import { createTwistSpiral as s_twist_spiral } from '../vector/twist-spiral';
import { createVineLattice as s_vine_lattice } from '../vector/vine-lattice';
import { createVortexLines as s_vortex_lines } from '../vector/vortex-lines';
import { createWheatField as s_wheat_field } from '../vector/wheat-field';
import { createWhirlpoolLines as s_whirlpool_lines } from '../vector/whirlpool-lines';
import { createWireframeGlobe as s_wireframe_globe } from '../vector/wireframe-globe';
import { createWormholeStripes as s_wormhole_stripes } from '../vector/wormhole-stripes';
import { createZelligeTile as s_zellige_tile } from '../vector/zellige-tile';
import { createZenGarden as s_zen_garden_motif } from '../vector/zen-garden-motif';
import { createShapeAntennaHill as s_shape_antenna_hill } from '../vector/shape-antenna-hill';
import { createShapeArchRepeat as s_shape_arch_repeat } from '../vector/shape-arch-repeat';
import { createShapeArrowMosaic as s_shape_arrow_mosaic } from '../vector/shape-arrow-mosaic';
import { createShapeAtomOrbits as s_shape_atom_orbits } from '../vector/shape-atom-orbits';
import { createShapeBalloonBunch as s_shape_balloon_bunch } from '../vector/shape-balloon-bunch';
import { createShapeBarcodeFade as s_shape_barcode_fade } from '../vector/shape-barcode-fade';
import { createShapeBeaconBeams as s_shape_beacon_beams } from '../vector/shape-beacon-beams';
import { createShapeBlindShift as s_shape_blind_shift } from '../vector/shape-blind-shift';
import { createShapeBlobLayers as s_shape_blob_layers } from '../vector/shape-blob-layers';
import { createShapeBokehCircles as s_shape_bokeh_circles } from '../vector/shape-bokeh-circles';
import { createShapeBookSpines as s_shape_book_spines } from '../vector/shape-book-spines';
import { createShapeBubblesRise as s_shape_bubbles_rise } from '../vector/shape-bubbles-rise';
import { createShapeCelticKnot as s_shape_celtic_knot } from '../vector/shape-celtic-knot';
import { createShapeCheckerDither as s_shape_checker_dither } from '../vector/shape-checker-dither';
import { createShapeCircleChain as s_shape_circle_chain } from '../vector/shape-circle-chain';
import { createShapeCitySkyline as s_shape_city_skyline } from '../vector/shape-city-skyline';
import { createShapeClockAbstract as s_shape_clock_abstract } from '../vector/shape-clock-abstract';
import { createShapeConstellationLinks as s_shape_constellation_links } from '../vector/shape-constellation-links';
import { createShapeCornerFanArcs as s_shape_corner_fan_arcs } from '../vector/shape-corner-fan-arcs';
import { createShapeCornerRipple as s_shape_corner_ripple } from '../vector/shape-corner-ripple';
import { createShapeCrescentDuo as s_shape_crescent_duo } from '../vector/shape-crescent-duo';
import { createShapeCrosshatchPatch as s_shape_crosshatch_patch } from '../vector/shape-crosshatch-patch';
import { createShapeDiagonalBands as s_shape_diagonal_bands } from '../vector/shape-diagonal-bands';
import { createShapeDiamondShards as s_shape_diamond_shards } from '../vector/shape-diamond-shards';
import { createShapeDnaHelix as s_shape_dna_helix } from '../vector/shape-dna-helix';
import { createShapeDominoRow as s_shape_domino_row } from '../vector/shape-domino-row';
import { createShapeDripMelt as s_shape_drip_melt } from '../vector/shape-drip-melt';
import { createShapeEclipseGlow as s_shape_eclipse_glow } from '../vector/shape-eclipse-glow';
import { createShapeEnsoBrush as s_shape_enso_brush } from '../vector/shape-enso-brush';
import { createShapeFeatherBarb as s_shape_feather_barb } from '../vector/shape-feather-barb';
import { createShapeFilmStrip as s_shape_film_strip } from '../vector/shape-film-strip';
import { createShapeFiveRings as s_shape_five_rings } from '../vector/shape-five-rings';
import { createShapeFlowRibbons as s_shape_flow_ribbons } from '../vector/shape-flow-ribbons';
import { createShapeFoldFan as s_shape_fold_fan } from '../vector/shape-fold-fan';
import { createShapeGearRing as s_shape_gear_ring } from '../vector/shape-gear-ring';
import { createShapeGemFacet as s_shape_gem_facet } from '../vector/shape-gem-facet';
import { createShapeGlitchRgb as s_shape_glitch_rgb } from '../vector/shape-glitch-rgb';
import { createShapeGothicArches as s_shape_gothic_arches } from '../vector/shape-gothic-arches';
import { createShapeGridQuarters as s_shape_grid_quarters } from '../vector/shape-grid-quarters';
import { createShapeHalfmoonRow as s_shape_halfmoon_row } from '../vector/shape-halfmoon-row';
import { createShapeHalftoneGradient as s_shape_halftone_gradient } from '../vector/shape-halftone-gradient';
import { createShapeHexCluster as s_shape_hex_cluster } from '../vector/shape-hex-cluster';
import { createShapeHourglassFlow as s_shape_hourglass_flow } from '../vector/shape-hourglass-flow';
import { createShapeIceCreamCone as s_shape_icecream_cone } from '../vector/shape-icecream-cone';
import { createShapeInfinityTrack as s_shape_infinity_track } from '../vector/shape-infinity-track';
import { createShapeInkblotSymmetry as s_shape_inkblot_symmetry } from '../vector/shape-inkblot-symmetry';
import { createShapeIsoCubes as s_shape_iso_cubes } from '../vector/shape-iso-cubes';
import { createShapeJellyArc as s_shape_jelly_arc } from '../vector/shape-jelly-arc';
import { createShapeJigsawStrip as s_shape_jigsaw_strip } from '../vector/shape-jigsaw-strip';
import { createShapeJuggleParabola as s_shape_juggle_parabola } from '../vector/shape-juggle-parabola';
import { createShapeKaleidoWedge as s_shape_kaleido_wedge } from '../vector/shape-kaleido-wedge';
import { createShapeKeyholeRow as s_shape_keyhole_row } from '../vector/shape-keyhole-row';
import { createShapeKiteFly as s_shape_kite_fly } from '../vector/shape-kite-fly';
import { createShapeLadderTilt as s_shape_ladder_tilt } from '../vector/shape-ladder-tilt';
import { createShapeLensStreak as s_shape_lens_streak } from '../vector/shape-lens-streak';
import { createShapeLightningSplit as s_shape_lightning_split } from '../vector/shape-lightning-split';
import { createShapeLissajousCurve as s_shape_lissajous_curve } from '../vector/shape-lissajous-curve';
import { createShapeMarqueeBulbs as s_shape_marquee_border } from '../vector/shape-marquee-border';
import { createShapeMazeRound as s_shape_maze_round } from '../vector/shape-maze-round';
import { createShapeMetaballMerge as s_shape_metaball_merge } from '../vector/shape-metaball-merge';
import { createShapeMoebiusBand as s_shape_moebius_band } from '../vector/shape-moebius-band';
import { createShapeMountainLayers as s_shape_mountain_layers } from '../vector/shape-mountain-layers';
import { createShapeNeonFrame as s_shape_neon_frame } from '../vector/shape-neon-frame';
import { createShapeNestedSquares as s_shape_nested_squares } from '../vector/shape-nested-squares';
import { createShapeNotchSquare as s_shape_notch_square } from '../vector/shape-notch-square';
import { createShapeOnionOutline as s_shape_onion_outline } from '../vector/shape-onion-outline';
import { createShapeOpEye as s_shape_op_eye } from '../vector/shape-op-eye';
import { createShapeOpWarp as s_shape_op_warp } from '../vector/shape-op-warp';
import { createShapeOrbitSystem as s_shape_orbit_system } from '../vector/shape-orbit-system';
import { createShapePickStack as s_shape_pick_stack } from '../vector/shape-pick-stack';
import { createShapePillarBars as s_shape_pillar_bars } from '../vector/shape-pillar-bars';
import { createShapePinwheel as s_shape_pinwheel } from '../vector/shape-pinwheel';
import { createShapePixelCluster as s_shape_pixel_cluster } from '../vector/shape-pixel-cluster';
import { createShapePlaneTrail as s_shape_plane_trail } from '../vector/shape-plane-trail';
import { createShapeQuiltPatch as s_shape_quilt_patch } from '../vector/shape-quilt-patch';
import { createShapeRadarSweep as s_shape_radar_sweep } from '../vector/shape-radar-sweep';
import { createShapeRaindrops as s_shape_raindrops } from '../vector/shape-raindrops';
import { createShapeRopeCross as s_shape_rope_cross } from '../vector/shape-rope-cross';
import { createShapeShellSpiral as s_shape_shell_spiral } from '../vector/shape-shell-spiral';
import { createShapeStainedPane as s_shape_stained_pane } from '../vector/shape-stained-pane';
import { createShapeStripeSun as s_shape_stripe_sun } from '../vector/shape-stripe-sun';
import { createShapeSundial as s_shape_sundial } from '../vector/shape-sundial';
import { createShapeSunriseArc as s_shape_sunrise_arc } from '../vector/shape-sunrise-arc';
import { createShapeTargetOffset as s_shape_target_offset } from '../vector/shape-target-offset';
import { createShapeTicTacGrid as s_shape_tictac_grid } from '../vector/shape-tictac-grid';
import { createShapeTideLayers as s_shape_tide_layers } from '../vector/shape-tide-layers';
import { createShapeTreeRingsOval as s_shape_tree_rings_oval } from '../vector/shape-tree-rings-oval';
import { createShapeTriSubdivide as s_shape_tri_subdivide } from '../vector/shape-tri-subdivide';
import { createShapeTriWeave as s_shape_tri_weave } from '../vector/shape-tri-weave';
import { createShapeTruchetQuarters as s_shape_truchet_quarters } from '../vector/shape-truchet-quarters';
import { createShapeVinylSpin as s_shape_vinyl_spin } from '../vector/shape-vinyl-spin';
import { createShapeVortexSwirl as s_shape_vortex_swirl } from '../vector/shape-vortex-swirl';
import { createShapeWaffleGrid as s_shape_waffle_grid } from '../vector/shape-waffle-grid';
import { createShapeWindowSky as s_shape_window_sky } from '../vector/shape-window-sky';
import { createShapeXylophoneBars as s_shape_xylophone_bars } from '../vector/shape-xylophone-bars';
import { createShapeYarnBall as s_shape_yarn_ball } from '../vector/shape-yarn-ball';
import { createShapeYinSpin as s_shape_yin_spin } from '../vector/shape-yin-spin';
import { createShapeZebraWavy as s_shape_zebra_wavy } from '../vector/shape-zebra-wavy';
import { createShapeZigzagBand as s_shape_zigzag_band } from '../vector/shape-zigzag-band';
import { createShapeZipperTeeth as s_shape_zipper_teeth } from '../vector/shape-zipper-teeth';
import { createIsoArmchair as s_iso_armchair } from '../isometric/iso-armchair';
import { createIsoArtEasel as s_iso_art_easel } from '../isometric/iso-art-easel';
import { createIsoBakeryStand as s_iso_bakery_stand } from '../isometric/iso-bakery-stand';
import { createIsoBalloon as s_iso_balloon } from '../isometric/iso-balloon';
import { createIsoBarbell as s_iso_barbell } from '../isometric/iso-barbell';
import { createIsoBbqGrill as s_iso_bbq_grill } from '../isometric/iso-bbq-grill';
import { createIsoBillboard as s_iso_billboard } from '../isometric/iso-billboard';
import { createIsoBirthdayCake as s_iso_birthday_cake } from '../isometric/iso-birthday-cake';
import { createIsoBlender as s_iso_blender } from '../isometric/iso-blender';
import { createIsoBonsai as s_iso_bonsai } from '../isometric/iso-bonsai';
import { createIsoBookshelf as s_iso_bookshelf } from '../isometric/iso-bookshelf';
import { createIsoBooth as s_iso_booth } from '../isometric/iso-booth';
import { createIsoBotAssembly as s_iso_bot_assembly } from '../isometric/iso-bot-assembly';
import { createIsoBread as s_iso_bread } from '../isometric/iso-bread';
import { createIsoBusStop as s_iso_bus_stop } from '../isometric/iso-bus-stop';
import { createIsoCamera as s_iso_camera } from '../isometric/iso-camera';
import { createIsoCamperVan as s_iso_camper_van } from '../isometric/iso-camper-van';
import { createIsoCandyJar as s_iso_candy_jar } from '../isometric/iso-candy-jar';
import { createIsoCargoCrane as s_iso_cargo_crane } from '../isometric/iso-cargo-crane';
import { createIsoCastleKeep as s_iso_castle_keep } from '../isometric/iso-castle-keep';
import { createIsoCatTower as s_iso_cat_tower } from '../isometric/iso-cat-tower';
import { createIsoChessBoard as s_iso_chess_board } from '../isometric/iso-chess-board';
import { createIsoClockTower as s_iso_clock_tower } from '../isometric/iso-clock-tower';
import { createIsoCoffeeCart as s_iso_coffee_cart } from '../isometric/iso-coffee-cart';
import { createIsoConsole as s_iso_console } from '../isometric/iso-console';
import { createIsoControlPanel as s_iso_control_panel } from '../isometric/iso-control-panel';
import { createIsoCrystalCluster as s_iso_crystal_cluster } from '../isometric/iso-crystal-cluster';
import { createIsoDeliveryScooter as s_iso_delivery_scooter } from '../isometric/iso-delivery-scooter';
import { createIsoDiceTower as s_iso_dice_tower } from '../isometric/iso-dice-tower';
import { createIsoDronePad as s_iso_drone_pad } from '../isometric/iso-drone-pad';
import { createIsoDrumKit as s_iso_drum_kit } from '../isometric/iso-drum-kit';
import { createIsoEspressoMachine as s_iso_espresso_machine } from '../isometric/iso-espresso-machine';
import { createIsoFarmSilo as s_iso_farm_silo } from '../isometric/iso-farm-silo';
import { createIsoFireHydrant as s_iso_fire_hydrant } from '../isometric/iso-fire-hydrant';
import { createIsoFishingBoat as s_iso_fishing_boat } from '../isometric/iso-fishing-boat';
import { createIsoFlowerBed as s_iso_flower_bed } from '../isometric/iso-flower-bed';
import { createIsoForge as s_iso_forge } from '../isometric/iso-forge';
import { createIsoFountain as s_iso_fountain } from '../isometric/iso-fountain';
import { createIsoGasPump as s_iso_gas_pump } from '../isometric/iso-gas-pump';
import { createIsoGreenhouse as s_iso_greenhouse } from '../isometric/iso-greenhouse';
import { createIsoGuitarAmp as s_iso_guitar_amp } from '../isometric/iso-guitar-amp';
import { createIsoGumballMachine as s_iso_gumball_machine } from '../isometric/iso-gumball-machine';
import { createIsoHammock as s_iso_hammock } from '../isometric/iso-hammock';
import { createIsoHotdogStand as s_iso_hotdog_stand } from '../isometric/iso-hotdog-stand';
import { createIsoIceCreamCart as s_iso_ice_cream_cart } from '../isometric/iso-ice-cream-cart';
import { createIsoJacuzzi as s_iso_jacuzzi } from '../isometric/iso-jacuzzi';
import { createIsoKiteShack as s_iso_kite_shack } from '../isometric/iso-kite-shack';
import { createIsoLighthouse as s_iso_lighthouse } from '../isometric/iso-lighthouse';
import { createIsoMailbox as s_iso_mailbox } from '../isometric/iso-mailbox';
import { createIsoMarketStall as s_iso_market_stall } from '../isometric/iso-market-stall';
import { createIsoMeteorCrater as s_iso_meteor_crater } from '../isometric/iso-meteor-crater';
import { createIsoMilkCrates as s_iso_milk_crates } from '../isometric/iso-milk-crates';
import { createIsoMonolith as s_iso_monolith } from '../isometric/iso-monolith';
import { createIsoMoonRover as s_iso_moon_rover } from '../isometric/iso-moon-rover';
import { createIsoMushroomGrove as s_iso_mushroom_grove } from '../isometric/iso-mushroom-grove';
import { createIsoNeonSign as s_iso_neon_sign } from '../isometric/iso-neon-sign';
import { createIsoNoodleBowl as s_iso_noodle_bowl } from '../isometric/iso-noodle-bowl';
import { createIsoObservatory as s_iso_observatory } from '../isometric/iso-observatory';
import { createIsoOilPumpjack as s_iso_oil_pumpjack } from '../isometric/iso-oil-pumpjack';
import { createIsoPancakeStack as s_iso_pancake_stack } from '../isometric/iso-pancake-stack';
import { createIsoParkBench as s_iso_park_bench } from '../isometric/iso-park-bench';
import { createIsoPicnicSpot as s_iso_picnic_spot } from '../isometric/iso-picnic-spot';
import { createIsoPinballTable as s_iso_pinball_table } from '../isometric/iso-pinball-table';
import { createIsoPizzaOven as s_iso_pizza_oven } from '../isometric/iso-pizza-oven';
import { createIsoPlanterBox as s_iso_planter_box } from '../isometric/iso-planter-box';
import { createIsoPodcastMic as s_iso_podcast_mic } from '../isometric/iso-podcast-mic';
import { createIsoPondDock as s_iso_pond_dock } from '../isometric/iso-pond-dock';
import { createIsoPrinterStation as s_iso_printer_station } from '../isometric/iso-printer-station';
import { createIsoPunchingBag as s_iso_punching_bag } from '../isometric/iso-punching-bag';
import { createIsoRailCrossing as s_iso_rail_crossing } from '../isometric/iso-rail-crossing';
import { createIsoRecordPlayer as s_iso_record_player } from '../isometric/iso-record-player';
import { createIsoRetroRadio as s_iso_retro_radio } from '../isometric/iso-retro-radio';
import { createIsoRobotVacuum as s_iso_robot_vacuum } from '../isometric/iso-robot-vacuum';
import { createIsoRunningTrack as s_iso_running_track } from '../isometric/iso-running-track';
import { createIsoSatelliteDish as s_iso_satellite_dish } from '../isometric/iso-satellite-dish';
import { createIsoSaunaCabin as s_iso_sauna_cabin } from '../isometric/iso-sauna-cabin';
import { createIsoSculpturePlaza as s_iso_sculpture_plaza } from '../isometric/iso-sculpture-plaza';
import { createIsoSkateRamp as s_iso_skate_ramp } from '../isometric/iso-skate-ramp';
import { createIsoSlotMachine as s_iso_slot_machine } from '../isometric/iso-slot-machine';
import { createIsoSmartSpeaker as s_iso_smart_speaker } from '../isometric/iso-smart-speaker';
import { createIsoSolarArray as s_iso_solar_array } from '../isometric/iso-solar-array';
import { createIsoSpaceTelescope as s_iso_space_telescope } from '../isometric/iso-space-telescope';
import { createIsoStageSpeakers as s_iso_stage_speakers } from '../isometric/iso-stage-speakers';
import { createIsoStatuePlinth as s_iso_statue_plinth } from '../isometric/iso-statue-plinth';
import { createIsoSubstation as s_iso_substation } from '../isometric/iso-substation';
import { createIsoSwimmingPool as s_iso_swimming_pool } from '../isometric/iso-swimming-pool';
import { createIsoTacoTruck as s_iso_taco_truck } from '../isometric/iso-taco-truck';
import { createIsoTeaSet as s_iso_tea_set } from '../isometric/iso-tea-set';
import { createIsoTent as s_iso_tent } from '../isometric/iso-tent';
import { createIsoToolShed as s_iso_tool_shed } from '../isometric/iso-tool-shed';
import { createIsoToyBlocks as s_iso_toy_blocks } from '../isometric/iso-toy-blocks';
import { createIsoTrafficLight as s_iso_traffic_light } from '../isometric/iso-traffic-light';
import { createIsoTramStop as s_iso_tram_stop } from '../isometric/iso-tram-stop';
import { createIsoTreehouse as s_iso_treehouse } from '../isometric/iso-treehouse';
import { createIsoTurntableBooth as s_iso_turntable_booth } from '../isometric/iso-turntable-booth';
import { createIsoVendingMachine as s_iso_vending_machine } from '../isometric/iso-vending-machine';
import { createIsoWashingMachine as s_iso_washing_machine } from '../isometric/iso-washing-machine';
import { createIsoWaterTower as s_iso_water_tower } from '../isometric/iso-water-tower';
import { createIsoWindTurbine as s_iso_wind_turbine } from '../isometric/iso-wind-turbine';
import { createIsoWineCellar as s_iso_wine_cellar } from '../isometric/iso-wine-cellar';
import { createAvatarAcorn as s_avatar_acorn } from '../avatars/avatar-acorn';
import { createAvatarArtist as s_avatar_artist } from '../avatars/avatar-artist';
import { createAvatarAstronaut as s_avatar_astronaut } from '../avatars/avatar-astronaut';
import { createAvatarBackpack as s_avatar_backpack } from '../avatars/avatar-backpack';
import { createAvatarBalloon as s_avatar_balloon } from '../avatars/avatar-balloon';
import { createAvatarBarista as s_avatar_barista } from '../avatars/avatar-barista';
import { createAvatarBattery as s_avatar_battery } from '../avatars/avatar-battery';
import { createAvatarBear as s_avatar_bear } from '../avatars/avatar-bear';
import { createAvatarBee as s_avatar_bee } from '../avatars/avatar-bee';
import { createAvatarBell as s_avatar_bell } from '../avatars/avatar-bell';
import { createAvatarBook as s_avatar_book } from '../avatars/avatar-book';
import { createAvatarCactus as s_avatar_cactus } from '../avatars/avatar-cactus';
import { createAvatarCamera as s_avatar_camera } from '../avatars/avatar-camera';
import { createAvatarCampfire as s_avatar_campfire } from '../avatars/avatar-campfire';
import { createAvatarChef as s_avatar_chef } from '../avatars/avatar-chef';
import { createAvatarChick as s_avatar_chick } from '../avatars/avatar-chick';
import { createAvatarClock as s_avatar_clock } from '../avatars/avatar-clock';
import { createAvatarCloud as s_avatar_cloud } from '../avatars/avatar-cloud';
import { createAvatarCoffee as s_avatar_coffee } from '../avatars/avatar-coffee';
import { createAvatarCowboy as s_avatar_cowboy } from '../avatars/avatar-cowboy';
import { createAvatarCrab as s_avatar_crab } from '../avatars/avatar-crab';
import { createAvatarCrown as s_avatar_crown } from '../avatars/avatar-crown';
import { createAvatarCrystal as s_avatar_crystal } from '../avatars/avatar-crystal';
import { createAvatarCyclops as s_avatar_cyclops } from '../avatars/avatar-cyclops';
import { createAvatarDeer as s_avatar_deer } from '../avatars/avatar-deer';
import { createAvatarDetective as s_avatar_detective } from '../avatars/avatar-detective';
import { createAvatarDinosaur as s_avatar_dinosaur } from '../avatars/avatar-dinosaur';
import { createAvatarDoctor as s_avatar_doctor } from '../avatars/avatar-doctor';
import { createAvatarDolphin as s_avatar_dolphin } from '../avatars/avatar-dolphin';
import { createAvatarDonut as s_avatar_donut } from '../avatars/avatar-donut';
import { createAvatarDragon as s_avatar_dragon } from '../avatars/avatar-dragon';
import { createAvatarDuck as s_avatar_duck } from '../avatars/avatar-duck';
import { createAvatarEgg as s_avatar_egg } from '../avatars/avatar-egg';
import { createAvatarElf as s_avatar_elf } from '../avatars/avatar-elf';
import { createAvatarFairy as s_avatar_fairy } from '../avatars/avatar-fairy';
import { createAvatarFarmer as s_avatar_farmer } from '../avatars/avatar-farmer';
import { createAvatarFirefighter as s_avatar_firefighter } from '../avatars/avatar-firefighter';
import { createAvatarFlamingo as s_avatar_flamingo } from '../avatars/avatar-flamingo';
import { createAvatarFlower as s_avatar_flower } from '../avatars/avatar-flower';
import { createAvatarFox as s_avatar_fox } from '../avatars/avatar-fox';
import { createAvatarFrog as s_avatar_frog } from '../avatars/avatar-frog';
import { createAvatarGamepad as s_avatar_gamepad } from '../avatars/avatar-gamepad';
import { createAvatarGenie as s_avatar_genie } from '../avatars/avatar-genie';
import { createAvatarGoblin as s_avatar_goblin } from '../avatars/avatar-goblin';
import { createAvatarGraduate as s_avatar_graduate } from '../avatars/avatar-graduate';
import { createAvatarHamster as s_avatar_hamster } from '../avatars/avatar-hamster';
import { createAvatarHeadphones as s_avatar_headphones } from '../avatars/avatar-headphones';
import { createAvatarHedgehog as s_avatar_hedgehog } from '../avatars/avatar-hedgehog';
import { createAvatarIcecream as s_avatar_icecream } from '../avatars/avatar-icecream';
import { createAvatarJellyfish as s_avatar_jellyfish } from '../avatars/avatar-jellyfish';
import { createAvatarKoala as s_avatar_koala } from '../avatars/avatar-koala';
import { createAvatarLadybug as s_avatar_ladybug } from '../avatars/avatar-ladybug';
import { createAvatarLamp as s_avatar_lamp } from '../avatars/avatar-lamp';
import { createAvatarLeaf as s_avatar_leaf } from '../avatars/avatar-leaf';
import { createAvatarMermaid as s_avatar_mermaid } from '../avatars/avatar-mermaid';
import { createAvatarMoodCool as s_avatar_mood_cool } from '../avatars/avatar-mood-cool';
import { createAvatarMoodDizzy as s_avatar_mood_dizzy } from '../avatars/avatar-mood-dizzy';
import { createAvatarMoodGrumpy as s_avatar_mood_grumpy } from '../avatars/avatar-mood-grumpy';
import { createAvatarMoodHappy as s_avatar_mood_happy } from '../avatars/avatar-mood-happy';
import { createAvatarMoodLove as s_avatar_mood_love } from '../avatars/avatar-mood-love';
import { createAvatarMoodShy as s_avatar_mood_shy } from '../avatars/avatar-mood-shy';
import { createAvatarMoodSleepy as s_avatar_mood_sleepy } from '../avatars/avatar-mood-sleepy';
import { createAvatarMoodWink as s_avatar_mood_wink } from '../avatars/avatar-mood-wink';
import { createAvatarMoon as s_avatar_moon } from '../avatars/avatar-moon';
import { createAvatarMouse as s_avatar_mouse } from '../avatars/avatar-mouse';
import { createAvatarMummy as s_avatar_mummy } from '../avatars/avatar-mummy';
import { createAvatarNinja as s_avatar_ninja } from '../avatars/avatar-ninja';
import { createAvatarOctopus as s_avatar_octopus } from '../avatars/avatar-octopus';
import { createAvatarOgre as s_avatar_ogre } from '../avatars/avatar-ogre';
import { createAvatarPanda as s_avatar_panda } from '../avatars/avatar-panda';
import { createAvatarPhoenix as s_avatar_phoenix } from '../avatars/avatar-phoenix';
import { createAvatarPilot as s_avatar_pilot } from '../avatars/avatar-pilot';
import { createAvatarPirate as s_avatar_pirate } from '../avatars/avatar-pirate';
import { createAvatarPizza as s_avatar_pizza } from '../avatars/avatar-pizza';
import { createAvatarPlanet as s_avatar_planet } from '../avatars/avatar-planet';
import { createAvatarPotion as s_avatar_potion } from '../avatars/avatar-potion';
import { createAvatarPumpkin as s_avatar_pumpkin } from '../avatars/avatar-pumpkin';
import { createAvatarRaccoon as s_avatar_raccoon } from '../avatars/avatar-raccoon';
import { createAvatarRainbow as s_avatar_rainbow } from '../avatars/avatar-rainbow';
import { createAvatarRockstar as s_avatar_rockstar } from '../avatars/avatar-rockstar';
import { createAvatarSailor as s_avatar_sailor } from '../avatars/avatar-sailor';
import { createAvatarSamurai as s_avatar_samurai } from '../avatars/avatar-samurai';
import { createAvatarScientist as s_avatar_scientist } from '../avatars/avatar-scientist';
import { createAvatarSloth as s_avatar_sloth } from '../avatars/avatar-sloth';
import { createAvatarSnail as s_avatar_snail } from '../avatars/avatar-snail';
import { createAvatarSnowflake as s_avatar_snowflake } from '../avatars/avatar-snowflake';
import { createAvatarSnowman as s_avatar_snowman } from '../avatars/avatar-snowman';
import { createAvatarSquirrel as s_avatar_squirrel } from '../avatars/avatar-squirrel';
import { createAvatarStar as s_avatar_star } from '../avatars/avatar-star';
import { createAvatarSun as s_avatar_sun } from '../avatars/avatar-sun';
import { createAvatarTelevision as s_avatar_television } from '../avatars/avatar-television';
import { createAvatarToaster as s_avatar_toaster } from '../avatars/avatar-toaster';
import { createAvatarToucan as s_avatar_toucan } from '../avatars/avatar-toucan';
import { createAvatarUnicorn as s_avatar_unicorn } from '../avatars/avatar-unicorn';
import { createAvatarVampire as s_avatar_vampire } from '../avatars/avatar-vampire';
import { createAvatarViking as s_avatar_viking } from '../avatars/avatar-viking';
import { createAvatarWerewolf as s_avatar_werewolf } from '../avatars/avatar-werewolf';
import { createAvatarWhale as s_avatar_whale } from '../avatars/avatar-whale';
import { createAvatarYeti as s_avatar_yeti } from '../avatars/avatar-yeti';
import { createAvatarZombie as s_avatar_zombie } from '../avatars/avatar-zombie';
import { createAnglerto as s_monster_anglerto } from '../monsters/monster-anglerto';
import { createAxoloto as s_monster_axoloto } from '../monsters/monster-axoloto';
import { createBambooling as s_monster_bambooling } from '../monsters/monster-bambooling';
import { createBasilisko as s_monster_basilisko } from '../monsters/monster-basilisko';
import { createBerryling as s_monster_berryling } from '../monsters/monster-berryling';
import { createBlizzo as s_monster_blizzo } from '../monsters/monster-blizzo';
import { createBolto as s_monster_bolto } from '../monsters/monster-bolto';
import { createBonbono as s_monster_bonbono } from '../monsters/monster-bonbono';
import { createBookling as s_monster_bookling } from '../monsters/monster-bookling';
import { createBramblet as s_monster_bramblet } from '../monsters/monster-bramblet';
import { createBubblegumo as s_monster_bubblegumo } from '../monsters/monster-bubblegumo';
import { createCandleo as s_monster_candleo } from '../monsters/monster-candleo';
import { createCheeso as s_monster_cheeso } from '../monsters/monster-cheeso';
import { createChomplo as s_monster_chomplo } from '../monsters/monster-chomplo';
import { createCicado as s_monster_cicado } from '../monsters/monster-cicado';
import { createClaylo as s_monster_claylo } from '../monsters/monster-claylo';
import { createClovero as s_monster_clovero } from '../monsters/monster-clovero';
import { createCogling as s_monster_cogling } from '../monsters/monster-cogling';
import { createCometo as s_monster_cometo } from '../monsters/monster-cometo';
import { createCoraling as s_monster_coraling } from '../monsters/monster-coraling';
import { createCrumblet as s_monster_crumblet } from '../monsters/monster-crumblet';
import { createCupcako as s_monster_cupcako } from '../monsters/monster-cupcako';
import { createDewo as s_monster_dewo } from '../monsters/monster-dewo';
import { createDonuto as s_monster_donuto } from '../monsters/monster-donuto';
import { createDrizzlo as s_monster_drizzlo } from '../monsters/monster-drizzlo';
import { createDuneo as s_monster_duneo } from '../monsters/monster-duneo';
import { createEclipso as s_monster_eclipseo } from '../monsters/monster-eclipseo';
import { createFernling as s_monster_fernling } from '../monsters/monster-fernling';
import { createFrosto as s_monster_frosto } from '../monsters/monster-frosto';
import { createGalaxo as s_monster_galaxo } from '../monsters/monster-galaxo';
import { createGargoylo as s_monster_gargoylo } from '../monsters/monster-gargoylo';
import { createGeckolo as s_monster_geckolo } from '../monsters/monster-geckolo';
import { createGhostling as s_monster_ghostling } from '../monsters/monster-ghostling';
import { createGingero as s_monster_gingero } from '../monsters/monster-gingero';
import { createGlitchling as s_monster_glitchling } from '../monsters/monster-glitchling';
import { createGriffling as s_monster_griffling } from '../monsters/monster-griffling';
import { createHailo as s_monster_hailo } from '../monsters/monster-hailo';
import { createHedgo as s_monster_hedgo } from '../monsters/monster-hedgo';
import { createHoneyo as s_monster_honeyo } from '../monsters/monster-honeyo';
import { createIceling as s_monster_iceling } from '../monsters/monster-iceling';
import { createJellop as s_monster_jellop } from '../monsters/monster-jellop';
import { createKelpo as s_monster_kelpo } from '../monsters/monster-kelpo';
import { createKitsuno as s_monster_kitsuno } from '../monsters/monster-kitsuno';
import { createLanternoo as s_monster_lanternoo } from '../monsters/monster-lanternoo';
import { createLavaling as s_monster_lavaling } from '../monsters/monster-lavaling';
import { createLeafo as s_monster_leafo } from '../monsters/monster-leafo';
import { createLichling as s_monster_lichling } from '../monsters/monster-lichling';
import { createLotuso as s_monster_lotuso } from '../monsters/monster-lotuso';
import { createMagneto as s_monster_magneto } from '../monsters/monster-magneto';
import { createMarshmo as s_monster_marshmo } from '../monsters/monster-marshmo';
import { createMelono as s_monster_melono } from '../monsters/monster-melono';
import { createMerming as s_monster_merming } from '../monsters/monster-merming';
import { createMeteorling as s_monster_meteorling } from '../monsters/monster-meteorling';
import { createMirrorling as s_monster_mirrorling } from '../monsters/monster-mirrorling';
import { createMistling as s_monster_mistling } from '../monsters/monster-mistling';
import { createMossyo as s_monster_mossyo } from '../monsters/monster-mossyo';
import { createMuffino as s_monster_muffino } from '../monsters/monster-muffino';
import { createNebulo as s_monster_nebulo } from '../monsters/monster-nebulo';
import { createNoodlo as s_monster_noodlo } from '../monsters/monster-noodlo';
import { createOctopo as s_monster_octopo } from '../monsters/monster-octopo';
import { createOnigo as s_monster_onigo } from '../monsters/monster-onigo';
import { createOrbito as s_monster_orbito } from '../monsters/monster-orbito';
import { createOtterling as s_monster_otterling } from '../monsters/monster-otterling';
import { createPangolo as s_monster_pangolo } from '../monsters/monster-pangolo';
import { createPapero as s_monster_papero } from '../monsters/monster-papero';
import { createPengo as s_monster_pengo } from '../monsters/monster-pengo';
import { createPhoenixling as s_monster_phoenixling } from '../monsters/monster-phoenixling';
import { createPixo as s_monster_pixo } from '../monsters/monster-pixo';
import { createPlanetling as s_monster_planetling } from '../monsters/monster-planetling';
import { createPlumpling as s_monster_plumpling } from '../monsters/monster-plumpling';
import { createPopcorning as s_monster_popcorning } from '../monsters/monster-popcorning';
import { createPuddingo as s_monster_puddingo } from '../monsters/monster-puddingo';
import { createQuillo as s_monster_quillo } from '../monsters/monster-quillo';
import { createRainbowling as s_monster_rainbowling } from '../monsters/monster-rainbowling';
import { createRubberto as s_monster_rubberto } from '../monsters/monster-rubberto';
import { createSalamango as s_monster_salamango } from '../monsters/monster-salamango';
import { createSeaho as s_monster_seaho } from '../monsters/monster-seaho';
import { createShelmo as s_monster_shelmo } from '../monsters/monster-shelmo';
import { createSlotho as s_monster_slotho } from '../monsters/monster-slotho';
import { createSnailo as s_monster_snailo } from '../monsters/monster-snailo';
import { createSnowpo as s_monster_snowpo } from '../monsters/monster-snowpo';
import { createSpongo as s_monster_spongo } from '../monsters/monster-spongo';
import { createSquido as s_monster_squido } from '../monsters/monster-squido';
import { createStalacto as s_monster_stalacto } from '../monsters/monster-stalacto';
import { createStormling as s_monster_stormling } from '../monsters/monster-stormling';
import { createSunling as s_monster_sunling } from '../monsters/monster-sunling';
import { createTeapo as s_monster_teapo } from '../monsters/monster-teapo';
import { createThistlo as s_monster_thistlo } from '../monsters/monster-thistlo';
import { createToasto as s_monster_toasto } from '../monsters/monster-toasto';
import { createTortoiso as s_monster_tortoiso } from '../monsters/monster-tortoiso';
import { createTulipo as s_monster_tulipo } from '../monsters/monster-tulipo';
import { createTundro as s_monster_tundro } from '../monsters/monster-tundro';
import { createUmbrello as s_monster_umbrello } from '../monsters/monster-umbrello';
import { createVesperto as s_monster_vesperto } from '../monsters/monster-vesperto';
import { createVineling as s_monster_vineling } from '../monsters/monster-vineling';
import { createVolcling as s_monster_volcling } from '../monsters/monster-volcling';
import { createWasabio as s_monster_wasabio } from '../monsters/monster-wasabio';
import { createYetling as s_monster_yetling } from '../monsters/monster-yetling';
import { createZephyro as s_monster_zephyro } from '../monsters/monster-zephyro';
import { createZigzago as s_monster_zigzago } from '../monsters/monster-zigzago';
import { createElementalAsh as s_elemental_ash } from '../elementals/elemental-ash';
import { createElementalAurora as s_elemental_aurora } from '../elementals/elemental-aurora';
import { createElementalBasalt as s_elemental_basalt } from '../elementals/elemental-basalt';
import { createElementalBeacon as s_elemental_beacon } from '../elementals/elemental-beacon';
import { createElementalBloom as s_elemental_bloom } from '../elementals/elemental-bloom';
import { createElementalBrine as s_elemental_brine } from '../elementals/elemental-brine';
import { createElementalBronze as s_elemental_bronze } from '../elementals/elemental-bronze';
import { createElementalBubble as s_elemental_bubble } from '../elementals/elemental-bubble';
import { createElementalChaos as s_elemental_chaos } from '../elementals/elemental-chaos';
import { createElementalChrono as s_elemental_chrono } from '../elementals/elemental-chrono';
import { createElementalComet as s_elemental_comet } from '../elementals/elemental-comet';
import { createElementalCopper as s_elemental_copper } from '../elementals/elemental-copper';
import { createElementalCrystal as s_elemental_crystal } from '../elementals/elemental-crystal';
import { createElementalDawn as s_elemental_dawn } from '../elementals/elemental-dawn';
import { createElementalDecay as s_elemental_decay } from '../elementals/elemental-decay';
import { createElementalDew as s_elemental_dew } from '../elementals/elemental-dew';
import { createElementalDune as s_elemental_dune } from '../elementals/elemental-dune';
import { createElementalDust as s_elemental_dust } from '../elementals/elemental-dust';
import { createElementalEclipse as s_elemental_eclipse } from '../elementals/elemental-eclipse';
import { createElementalEther as s_elemental_ether } from '../elementals/elemental-ether';
import { createElementalFern as s_elemental_fern } from '../elementals/elemental-fern';
import { createElementalFirefly as s_elemental_firefly } from '../elementals/elemental-firefly';
import { createElementalFoam as s_elemental_foam } from '../elementals/elemental-foam';
import { createElementalFog as s_elemental_fog } from '../elementals/elemental-fog';
import { createElementalFungus as s_elemental_fungus } from '../elementals/elemental-fungus';
import { createElementalGalaxy as s_elemental_galaxy } from '../elementals/elemental-galaxy';
import { createElementalGeode as s_elemental_geode } from '../elementals/elemental-geode';
import { createElementalGeyser as s_elemental_geyser } from '../elementals/elemental-geyser';
import { createElementalGlacier as s_elemental_glacier } from '../elementals/elemental-glacier';
import { createElementalGlass as s_elemental_glass } from '../elementals/elemental-glass';
import { createElementalGlitch as s_elemental_glitch } from '../elementals/elemental-glitch';
import { createElementalGold as s_elemental_gold } from '../elementals/elemental-gold';
import { createElementalGranite as s_elemental_granite } from '../elementals/elemental-granite';
import { createElementalGravity as s_elemental_gravity } from '../elementals/elemental-gravity';
import { createElementalHail as s_elemental_hail } from '../elementals/elemental-hail';
import { createElementalHalo as s_elemental_halo } from '../elementals/elemental-halo';
import { createElementalHoney as s_elemental_honey } from '../elementals/elemental-honey';
import { createElementalHourglass as s_elemental_hourglass } from '../elementals/elemental-hourglass';
import { createElementalIce as s_elemental_ice } from '../elementals/elemental-ice';
import { createElementalInk as s_elemental_ink } from '../elementals/elemental-ink';
import { createElementalIron as s_elemental_iron } from '../elementals/elemental-iron';
import { createElementalIvory as s_elemental_ivory } from '../elementals/elemental-ivory';
import { createElementalJade as s_elemental_jade } from '../elementals/elemental-jade';
import { createElementalLantern as s_elemental_lantern } from '../elementals/elemental-lantern';
import { createElementalLava as s_elemental_lava } from '../elementals/elemental-lava';
import { createElementalMercury as s_elemental_mercury } from '../elementals/elemental-mercury';
import { createElementalMeteor as s_elemental_meteor } from '../elementals/elemental-meteor';
import { createElementalMirage as s_elemental_mirage } from '../elementals/elemental-mirage';
import { createElementalMirror as s_elemental_mirror } from '../elementals/elemental-mirror';
import { createElementalMist as s_elemental_mist } from '../elementals/elemental-mist';
import { createElementalMonsoon as s_elemental_monsoon } from '../elementals/elemental-monsoon';
import { createElementalMoon as s_elemental_moon } from '../elementals/elemental-moon';
import { createElementalNebula as s_elemental_nebula } from '../elementals/elemental-nebula';
import { createElementalNeon as s_elemental_neon } from '../elementals/elemental-neon';
import { createElementalNova as s_elemental_nova } from '../elementals/elemental-nova';
import { createElementalObsidian as s_elemental_obsidian } from '../elementals/elemental-obsidian';
import { createElementalOcean as s_elemental_ocean } from '../elementals/elemental-ocean';
import { createElementalOil as s_elemental_oil } from '../elementals/elemental-oil';
import { createElementalOpal as s_elemental_opal } from '../elementals/elemental-opal';
import { createElementalOrbit as s_elemental_orbit } from '../elementals/elemental-orbit';
import { createElementalOzone as s_elemental_ozone } from '../elementals/elemental-ozone';
import { createElementalPaper as s_elemental_paper } from '../elementals/elemental-paper';
import { createElementalPearl as s_elemental_pearl } from '../elementals/elemental-pearl';
import { createElementalPetal as s_elemental_petal } from '../elementals/elemental-petal';
import { createElementalPlasma as s_elemental_plasma } from '../elementals/elemental-plasma';
import { createElementalPollen as s_elemental_pollen } from '../elementals/elemental-pollen';
import { createElementalPrism as s_elemental_prism } from '../elementals/elemental-prism';
import { createElementalPulse as s_elemental_pulse } from '../elementals/elemental-pulse';
import { createElementalQuasar as s_elemental_quasar } from '../elementals/elemental-quasar';
import { createElementalQuicksand as s_elemental_quicksand } from '../elementals/elemental-quicksand';
import { createElementalRainbow as s_elemental_rainbow } from '../elementals/elemental-rainbow';
import { createElementalReef as s_elemental_reef } from '../elementals/elemental-reef';
import { createElementalRipple as s_elemental_ripple } from '../elementals/elemental-ripple';
import { createElementalRiver as s_elemental_river } from '../elementals/elemental-river';
import { createElementalRoot as s_elemental_root } from '../elementals/elemental-root';
import { createElementalRust as s_elemental_rust } from '../elementals/elemental-rust';
import { createElementalSalt as s_elemental_salt } from '../elementals/elemental-salt';
import { createElementalShimmer as s_elemental_shimmer } from '../elementals/elemental-shimmer';
import { createElementalSilk as s_elemental_silk } from '../elementals/elemental-silk';
import { createElementalSilver as s_elemental_silver } from '../elementals/elemental-silver';
import { createElementalSleet as s_elemental_sleet } from '../elementals/elemental-sleet';
import { createElementalSmoke as s_elemental_smoke } from '../elementals/elemental-smoke';
import { createElementalSnow as s_elemental_snow } from '../elementals/elemental-snow';
import { createElementalSolar as s_elemental_solar } from '../elementals/elemental-solar';
import { createElementalSpark as s_elemental_spark } from '../elementals/elemental-spark';
import { createElementalSpore as s_elemental_spore } from '../elementals/elemental-spore';
import { createElementalStar as s_elemental_star } from '../elementals/elemental-star';
import { createElementalStatic as s_elemental_static } from '../elementals/elemental-static';
import { createElementalSteam as s_elemental_steam } from '../elementals/elemental-steam';
import { createElementalSteel as s_elemental_steel } from '../elementals/elemental-steel';
import { createElementalStone as s_elemental_stone } from '../elementals/elemental-stone';
import { createElementalStorm as s_elemental_storm } from '../elementals/elemental-storm';
import { createElementalSulfur as s_elemental_sulfur } from '../elementals/elemental-sulfur';
import { createElementalTar as s_elemental_tar } from '../elementals/elemental-tar';
import { createElementalThunder as s_elemental_thunder } from '../elementals/elemental-thunder';
import { createElementalTwilight as s_elemental_twilight } from '../elementals/elemental-twilight';
import { createElementalVein as s_elemental_vein } from '../elementals/elemental-vein';
import { createElementalVine as s_elemental_vine } from '../elementals/elemental-vine';
import { createElementalVortex as s_elemental_vortex } from '../elementals/elemental-vortex';
import { createElementalWisp as s_elemental_wisp } from '../elementals/elemental-wisp';
import { createTextureAbalone as s_texture_abalone } from '../textures/texture-abalone';
import { createTextureBarcode as s_texture_barcode } from '../textures/texture-barcode';
import { createTextureBasaltColumns as s_texture_basalt_columns } from '../textures/texture-basalt-columns';
import { createTextureBatik as s_texture_batik } from '../textures/texture-batik';
import { createTextureBeetleShell as s_texture_beetle_shell } from '../textures/texture-beetle-shell';
import { createTextureBrushedSteel as s_texture_brushed_steel } from '../textures/texture-brushed-steel';
import { createTextureBurl as s_texture_burl } from '../textures/texture-burl';
import { createTextureBurlap as s_texture_burlap } from '../textures/texture-burlap';
import { createTextureButterflyWing as s_texture_butterfly_wing } from '../textures/texture-butterfly-wing';
import { createTextureCardboard as s_texture_cardboard } from '../textures/texture-cardboard';
import { createTextureChainmail as s_texture_chainmail } from '../textures/texture-chainmail';
import { createTextureChalkboard as s_texture_chalkboard } from '../textures/texture-chalkboard';
import { createTextureCharcoalSketch as s_texture_charcoal_sketch } from '../textures/texture-charcoal-sketch';
import { createTextureCircuitBoard as s_texture_circuit_board } from '../textures/texture-circuit-board';
import { createTextureCobblestone as s_texture_cobblestone } from '../textures/texture-cobblestone';
import { createTextureCoffeeStain as s_texture_coffee_stain } from '../textures/texture-coffee-stain';
import { createTextureConcrete as s_texture_concrete } from '../textures/texture-concrete';
import { createTextureCondensation as s_texture_condensation } from '../textures/texture-condensation';
import { createTextureCoral as s_texture_coral } from '../textures/texture-coral';
import { createTextureCorduroy as s_texture_corduroy } from '../textures/texture-corduroy';
import { createTextureCowHide as s_texture_cow_hide } from '../textures/texture-cow-hide';
import { createTextureCrackedMud as s_texture_cracked_mud } from '../textures/texture-cracked-mud';
import { createTextureCrochet as s_texture_crochet } from '../textures/texture-crochet';
import { createTextureCrocodile as s_texture_crocodile } from '../textures/texture-crocodile';
import { createTextureCrumpledPaper as s_texture_crumpled_paper } from '../textures/texture-crumpled-paper';
import { createTextureDamascusSteel as s_texture_damascus_steel } from '../textures/texture-damascus-steel';
import { createTextureDragonScale as s_texture_dragon_scale } from '../textures/texture-dragon-scale';
import { createTextureDriftwood as s_texture_driftwood } from '../textures/texture-driftwood';
import { createTextureDunes as s_texture_dunes } from '../textures/texture-dunes';
import { createTextureFeathers as s_texture_feathers } from '../textures/texture-feathers';
import { createTextureFern as s_texture_fern } from '../textures/texture-fern';
import { createTextureFlagstone as s_texture_flagstone } from '../textures/texture-flagstone';
import { createTextureFoamBubbles as s_texture_foam_bubbles } from '../textures/texture-foam-bubbles';
import { createTextureFrost as s_texture_frost } from '../textures/texture-frost';
import { createTextureFrostedGlass as s_texture_frosted_glass } from '../textures/texture-frosted-glass';
import { createTextureFur as s_texture_fur } from '../textures/texture-fur';
import { createTextureGeode as s_texture_geode } from '../textures/texture-geode';
import { createTextureGlazeCrackle as s_texture_glaze_crackle } from '../textures/texture-glaze-crackle';
import { createTextureGoldFoil as s_texture_gold_foil } from '../textures/texture-gold-foil';
import { createTextureGranite as s_texture_granite } from '../textures/texture-granite';
import { createTextureGraphite as s_texture_graphite } from '../textures/texture-graphite';
import { createTextureGrass as s_texture_grass } from '../textures/texture-grass';
import { createTextureGuilloche as s_texture_guilloche } from '../textures/texture-guilloche';
import { createTextureHammeredCopper as s_texture_hammered_copper } from '../textures/texture-hammered-copper';
import { createTextureHerringbone as s_texture_herringbone } from '../textures/texture-herringbone';
import { createTextureHoneycomb as s_texture_honeycomb } from '../textures/texture-honeycomb';
import { createTextureHoundstooth as s_texture_houndstooth } from '../textures/texture-houndstooth';
import { createTextureIceCracks as s_texture_ice_cracks } from '../textures/texture-ice-cracks';
import { createTextureIkat as s_texture_ikat } from '../textures/texture-ikat';
import { createTextureInkWash as s_texture_ink_wash } from '../textures/texture-ink-wash';
import { createTextureIvy as s_texture_ivy } from '../textures/texture-ivy';
import { createTextureLace as s_texture_lace } from '../textures/texture-lace';
import { createTextureLavaCrust as s_texture_lava_crust } from '../textures/texture-lava-crust';
import { createTextureLeather as s_texture_leather } from '../textures/texture-leather';
import { createTextureLeaves as s_texture_leaves } from '../textures/texture-leaves';
import { createTextureLeopardRosettes as s_texture_leopard_rosettes } from '../textures/texture-leopard-rosettes';
import { createTextureLichen as s_texture_lichen } from '../textures/texture-lichen';
import { createTextureLinen as s_texture_linen } from '../textures/texture-linen';
import { createTextureMacrame as s_texture_macrame } from '../textures/texture-macrame';
import { createTextureMosaicTile as s_texture_mosaic_tile } from '../textures/texture-mosaic-tile';
import { createTextureMoss as s_texture_moss } from '../textures/texture-moss';
import { createTextureNebula as s_texture_nebula } from '../textures/texture-nebula';
import { createTextureObsidian as s_texture_obsidian } from '../textures/texture-obsidian';
import { createTexturePaisley as s_texture_paisley } from '../textures/texture-paisley';
import { createTexturePapyrus as s_texture_papyrus } from '../textures/texture-papyrus';
import { createTextureParquet as s_texture_parquet } from '../textures/texture-parquet';
import { createTexturePatinaBronze as s_texture_patina_bronze } from '../textures/texture-patina-bronze';
import { createTexturePearls as s_texture_pearls } from '../textures/texture-pearls';
import { createTexturePebbles as s_texture_pebbles } from '../textures/texture-pebbles';
import { createTexturePineNeedles as s_texture_pine_needles } from '../textures/texture-pine-needles';
import { createTexturePixelDither as s_texture_pixel_dither } from '../textures/texture-pixel-dither';
import { createTextureQuartzCluster as s_texture_quartz_cluster } from '../textures/texture-quartz-cluster';
import { createTextureRainDroplets as s_texture_rain_droplets } from '../textures/texture-rain-droplets';
import { createTextureRattan as s_texture_rattan } from '../textures/texture-rattan';
import { createTextureRicePaper as s_texture_rice_paper } from '../textures/texture-rice-paper';
import { createTextureRisograph as s_texture_risograph } from '../textures/texture-risograph';
import { createTextureRust as s_texture_rust } from '../textures/texture-rust';
import { createTextureSaltFlats as s_texture_salt_flats } from '../textures/texture-salt-flats';
import { createTextureSandstone as s_texture_sandstone } from '../textures/texture-sandstone';
import { createTextureSashiko as s_texture_sashiko } from '../textures/texture-sashiko';
import { createTextureScales as s_texture_scales } from '../textures/texture-scales';
import { createTextureScanlines as s_texture_scanlines } from '../textures/texture-scanlines';
import { createTextureSeedHead as s_texture_seed_head } from '../textures/texture-seed-head';
import { createTextureSequins as s_texture_sequins } from '../textures/texture-sequins';
import { createTextureShells as s_texture_shells } from '../textures/texture-shells';
import { createTextureShibori as s_texture_shibori } from '../textures/texture-shibori';
import { createTextureSlate as s_texture_slate } from '../textures/texture-slate';
import { createTextureSnakeskin as s_texture_snakeskin } from '../textures/texture-snakeskin';
import { createTextureSnow as s_texture_snow } from '../textures/texture-snow';
import { createTextureStraw as s_texture_straw } from '../textures/texture-straw';
import { createTextureSuede as s_texture_suede } from '../textures/texture-suede';
import { createTextureTerracotta as s_texture_terracotta } from '../textures/texture-terracotta';
import { createTextureTieDye as s_texture_tie_dye } from '../textures/texture-tie-dye';
import { createTextureTigerStripes as s_texture_tiger_stripes } from '../textures/texture-tiger-stripes';
import { createTextureTopographic as s_texture_topographic } from '../textures/texture-topographic';
import { createTextureTortoiseshell as s_texture_tortoiseshell } from '../textures/texture-tortoiseshell';
import { createTextureTweed as s_texture_tweed } from '../textures/texture-tweed';
import { createTextureVelvet as s_texture_velvet } from '../textures/texture-velvet';
import { createTextureWoodGrain as s_texture_wood_grain } from '../textures/texture-wood-grain';
import { createTextureZebra as s_texture_zebra } from '../textures/texture-zebra';
import s_loader_atom_orbits from '../loaders/loader-atom-orbits.ts?raw';
import s_loader_aurora_shift from '../loaders/loader-aurora-shift.ts?raw';
import s_loader_balloon_bob from '../loaders/loader-balloon-bob.ts?raw';
import s_loader_battery_fill from '../loaders/loader-battery-fill.ts?raw';
import s_loader_binary_scroll from '../loaders/loader-binary-scroll.ts?raw';
import s_loader_black_hole from '../loaders/loader-black-hole.ts?raw';
import s_loader_bokeh_blur from '../loaders/loader-bokeh-blur.ts?raw';
import s_loader_bracket_orbit from '../loaders/loader-bracket-orbit.ts?raw';
import s_loader_bubble_rise from '../loaders/loader-bubble-rise.ts?raw';
import s_loader_bulb_flicker from '../loaders/loader-bulb-flicker.ts?raw';
import s_loader_butterfly_flap from '../loaders/loader-butterfly-flap.ts?raw';
import s_loader_card_flip3d from '../loaders/loader-card-flip3d.ts?raw';
import s_loader_cassette_reels from '../loaders/loader-cassette-reels.ts?raw';
import s_loader_checkmark_draw from '../loaders/loader-checkmark-draw.ts?raw';
import s_loader_circle_trace from '../loaders/loader-circle-trace.ts?raw';
import s_loader_clock_hands from '../loaders/loader-clock-hands.ts?raw';
import s_loader_cocktail_stir from '../loaders/loader-cocktail-stir.ts?raw';
import s_loader_code_blocks from '../loaders/loader-code-blocks.ts?raw';
import s_loader_coffee_steam from '../loaders/loader-coffee-steam.ts?raw';
import s_loader_comet_tail from '../loaders/loader-comet-tail.ts?raw';
import s_loader_compass_needle from '../loaders/loader-compass-needle.ts?raw';
import s_loader_count_up from '../loaders/loader-count-up.ts?raw';
import s_loader_dice_tumble from '../loaders/loader-dice-tumble.ts?raw';
import s_loader_dna_helix from '../loaders/loader-dna-helix.ts?raw';
import s_loader_domino_fall from '../loaders/loader-domino-fall.ts?raw';
import s_loader_dot_grid_wave from '../loaders/loader-dot-grid-wave.ts?raw';
import s_loader_droplet_drip from '../loaders/loader-droplet-drip.ts?raw';
import s_loader_ember_rise from '../loaders/loader-ember-rise.ts?raw';
import s_loader_equalizer from '../loaders/loader-equalizer.ts?raw';
import s_loader_fan_blades from '../loaders/loader-fan-blades.ts?raw';
import s_loader_fidget_spinner from '../loaders/loader-fidget-spinner.ts?raw';
import s_loader_firefly_drift from '../loaders/loader-firefly-drift.ts?raw';
import s_loader_fish_school from '../loaders/loader-fish-school.ts?raw';
import s_loader_gear_turn from '../loaders/loader-gear-turn.ts?raw';
import s_loader_glitch_text from '../loaders/loader-glitch-text.ts?raw';
import s_loader_globe_meridians from '../loaders/loader-globe-meridians.ts?raw';
import s_loader_hammer_pulse from '../loaders/loader-hammer-pulse.ts?raw';
import s_loader_heart_pulse from '../loaders/loader-heart-pulse.ts?raw';
import s_loader_heartbeat_line from '../loaders/loader-heartbeat-line.ts?raw';
import s_loader_hexagon_cluster from '../loaders/loader-hexagon-cluster.ts?raw';
import s_loader_infinity_trace from '../loaders/loader-infinity-trace.ts?raw';
import s_loader_jellyfish_bob from '../loaders/loader-jellyfish-bob.ts?raw';
import s_loader_kaleidoscope from '../loaders/loader-kaleidoscope.ts?raw';
import s_loader_ladder_climb from '../loaders/loader-ladder-climb.ts?raw';
import s_loader_letter_bounce from '../loaders/loader-letter-bounce.ts?raw';
import s_loader_lightning_bolt from '../loaders/loader-lightning-bolt.ts?raw';
import s_loader_lissajous_dot from '../loaders/loader-lissajous-dot.ts?raw';
import s_loader_magnifier_scan from '../loaders/loader-magnifier-scan.ts?raw';
import s_loader_map_pin_bounce from '../loaders/loader-map-pin-bounce.ts?raw';
import s_loader_matrix_rain from '../loaders/loader-matrix-rain.ts?raw';
import s_loader_meteor_shower from '../loaders/loader-meteor-shower.ts?raw';
import s_loader_mixer_faders from '../loaders/loader-mixer-faders.ts?raw';
import s_loader_moon_phases from '../loaders/loader-moon-phases.ts?raw';
import s_loader_neon_flicker from '../loaders/loader-neon-flicker.ts?raw';
import s_loader_newton_cradle from '../loaders/loader-newton-cradle.ts?raw';
import s_loader_orbit_moons from '../loaders/loader-orbit-moons.ts?raw';
import s_loader_oscilloscope from '../loaders/loader-oscilloscope.ts?raw';
import s_loader_pacman_chomp from '../loaders/loader-pacman-chomp.ts?raw';
import s_loader_paper_plane from '../loaders/loader-paper-plane.ts?raw';
import s_loader_pendulum_swing from '../loaders/loader-pendulum-swing.ts?raw';
import s_loader_percent_ring from '../loaders/loader-percent-ring.ts?raw';
import s_loader_pinwheel from '../loaders/loader-pinwheel.ts?raw';
import s_loader_pizza_spin from '../loaders/loader-pizza-spin.ts?raw';
import s_loader_prism_split from '../loaders/loader-prism-split.ts?raw';
import s_loader_propeller from '../loaders/loader-propeller.ts?raw';
import s_loader_radar_sweep from '../loaders/loader-radar-sweep.ts?raw';
import s_loader_radio_tuner from '../loaders/loader-radio-tuner.ts?raw';
import s_loader_rain_cloud from '../loaders/loader-rain-cloud.ts?raw';
import s_loader_ripple_pond from '../loaders/loader-ripple-pond.ts?raw';
import s_loader_rocket_launch from '../loaders/loader-rocket-launch.ts?raw';
import s_loader_rubik_cube from '../loaders/loader-rubik-cube.ts?raw';
import s_loader_satellite_dish from '../loaders/loader-satellite-dish.ts?raw';
import s_loader_saturn_ring from '../loaders/loader-saturn-ring.ts?raw';
import s_loader_seismo_bars from '../loaders/loader-seismo-bars.ts?raw';
import s_loader_shine_bar from '../loaders/loader-shine-bar.ts?raw';
import s_loader_shooting_star from '../loaders/loader-shooting-star.ts?raw';
import s_loader_signature_loop from '../loaders/loader-signature-loop.ts?raw';
import s_loader_spiral_swirl from '../loaders/loader-spiral-swirl.ts?raw';
import s_loader_square_draw from '../loaders/loader-square-draw.ts?raw';
import s_loader_square_fold from '../loaders/loader-square-fold.ts?raw';
import s_loader_stack_cubes from '../loaders/loader-stack-cubes.ts?raw';
import s_loader_stairs_bounce from '../loaders/loader-stairs-bounce.ts?raw';
import s_loader_step_segments from '../loaders/loader-step-segments.ts?raw';
import s_loader_sun_rays from '../loaders/loader-sun-rays.ts?raw';
import s_loader_target_lock from '../loaders/loader-target-lock.ts?raw';
import s_loader_terminal_cursor from '../loaders/loader-terminal-cursor.ts?raw';
import s_loader_thermo_fill from '../loaders/loader-thermo-fill.ts?raw';
import s_loader_toast_pop from '../loaders/loader-toast-pop.ts?raw';
import s_loader_triangle_spin from '../loaders/loader-triangle-spin.ts?raw';
import s_loader_twinkle_field from '../loaders/loader-twinkle-field.ts?raw';
import s_loader_typing_cursor from '../loaders/loader-typing-cursor.ts?raw';
import s_loader_ufo_beam from '../loaders/loader-ufo-beam.ts?raw';
import s_loader_vinyl_spin from '../loaders/loader-vinyl-spin.ts?raw';
import s_loader_vu_meter from '../loaders/loader-vu-meter.ts?raw';
import s_loader_waterfall_dots from '../loaders/loader-waterfall-dots.ts?raw';
import s_loader_wave_lines from '../loaders/loader-wave-lines.ts?raw';
import s_loader_wifi_arcs from '../loaders/loader-wifi-arcs.ts?raw';
import s_loader_windmill from '../loaders/loader-windmill.ts?raw';
import s_loader_yin_yang from '../loaders/loader-yin-yang.ts?raw';
import s_loader_zigzag_runner from '../loaders/loader-zigzag-runner.ts?raw';
import s_button_accordion_expand from '../buttons/button-accordion-expand.ts?raw';
import s_button_airplane_mode from '../buttons/button-airplane-mode.ts?raw';
import s_button_api_call from '../buttons/button-api-call.ts?raw';
import s_button_arcade_start from '../buttons/button-arcade-start.ts?raw';
import s_button_arrow_nudge from '../buttons/button-arrow-nudge.ts?raw';
import s_button_balloon_pop from '../buttons/button-balloon-pop.ts?raw';
import s_button_battery_charge from '../buttons/button-battery-charge.ts?raw';
import s_button_bell_badge from '../buttons/button-bell-badge.ts?raw';
import s_button_bluetooth_pair from '../buttons/button-bluetooth-pair.ts?raw';
import s_button_bookmark_save from '../buttons/button-bookmark-save.ts?raw';
import s_button_brutalist_shift from '../buttons/button-brutalist-shift.ts?raw';
import s_button_bubble_wrap from '../buttons/button-bubble-wrap.ts?raw';
import s_button_camera_flash from '../buttons/button-camera-flash.ts?raw';
import s_button_carousel_next from '../buttons/button-carousel-next.ts?raw';
import s_button_cart_add from '../buttons/button-cart-add.ts?raw';
import s_button_chat_bubble from '../buttons/button-chat-bubble.ts?raw';
import s_button_ci_pipeline from '../buttons/button-ci-pipeline.ts?raw';
import s_button_clap_count from '../buttons/button-clap-count.ts?raw';
import s_button_code_execute from '../buttons/button-code-execute.ts?raw';
import s_button_coin_flip from '../buttons/button-coin-flip.ts?raw';
import s_button_color_cycle from '../buttons/button-color-cycle.ts?raw';
import s_button_compass_navigate from '../buttons/button-compass-navigate.ts?raw';
import s_button_confetti_pop from '../buttons/button-confetti-pop.ts?raw';
import s_button_console_log from '../buttons/button-console-log.ts?raw';
import s_button_corners_accent from '../buttons/button-corners-accent.ts?raw';
import s_button_counter_tap from '../buttons/button-counter-tap.ts?raw';
import s_button_crystal_glow from '../buttons/button-crystal-glow.ts?raw';
import s_button_dark_mode_switch from '../buttons/button-dark-mode-switch.ts?raw';
import s_button_dial_rotate from '../buttons/button-dial-rotate.ts?raw';
import s_button_dice_roll from '../buttons/button-dice-roll.ts?raw';
import s_button_door_open from '../buttons/button-door-open.ts?raw';
import s_button_double_layer_text from '../buttons/button-double-layer-text.ts?raw';
import s_button_download_progress from '../buttons/button-download-progress.ts?raw';
import s_button_drum_pad from '../buttons/button-drum-pad.ts?raw';
import s_button_eject_disc from '../buttons/button-eject-disc.ts?raw';
import s_button_emoji_picker_pill from '../buttons/button-emoji-picker-pill.ts?raw';
import s_button_fan_speed from '../buttons/button-fan-speed.ts?raw';
import s_button_firework_burst from '../buttons/button-firework-burst.ts?raw';
import s_button_flip_card from '../buttons/button-flip-card.ts?raw';
import s_button_fold_unfold from '../buttons/button-fold-unfold.ts?raw';
import s_button_follow_slide from '../buttons/button-follow-slide.ts?raw';
import s_button_fortune_cookie from '../buttons/button-fortune-cookie.ts?raw';
import s_button_gamepad_dpad from '../buttons/button-gamepad-dpad.ts?raw';
import s_button_git_commit from '../buttons/button-git-commit.ts?raw';
import s_button_glitch_text from '../buttons/button-glitch-text.ts?raw';
import s_button_gradient_border_rotate from '../buttons/button-gradient-border-rotate.ts?raw';
import s_button_gradient_mixer from '../buttons/button-gradient-mixer.ts?raw';
import s_button_heart_burst from '../buttons/button-heart-burst.ts?raw';
import s_button_hold_to_confirm from '../buttons/button-hold-to-confirm.ts?raw';
import s_button_hologram_scan from '../buttons/button-hologram-scan.ts?raw';
import s_button_hue_picker from '../buttons/button-hue-picker.ts?raw';
import s_button_icon_morph from '../buttons/button-icon-morph.ts?raw';
import s_button_jelly_press from '../buttons/button-jelly-press.ts?raw';
import s_button_joystick_move from '../buttons/button-joystick-move.ts?raw';
import s_button_keyboard_key from '../buttons/button-keyboard-key.ts?raw';
import s_button_lang_toggle from '../buttons/button-lang-toggle.ts?raw';
import s_button_lava_lamp from '../buttons/button-lava-lamp.ts?raw';
import s_button_lever_pull from '../buttons/button-lever-pull.ts?raw';
import s_button_lightbulb_toggle from '../buttons/button-lightbulb-toggle.ts?raw';
import s_button_liquid_fill from '../buttons/button-liquid-fill.ts?raw';
import s_button_magic_orb from '../buttons/button-magic-orb.ts?raw';
import s_button_magnet_hover from '../buttons/button-magnet-hover.ts?raw';
import s_button_mail_send from '../buttons/button-mail-send.ts?raw';
import s_button_map_zoom from '../buttons/button-map-zoom.ts?raw';
import s_button_mic_record from '../buttons/button-mic-record.ts?raw';
import s_button_neumorphic_dent from '../buttons/button-neumorphic-dent.ts?raw';
import s_button_password_reveal from '../buttons/button-password-reveal.ts?raw';
import s_button_piano_key from '../buttons/button-piano-key.ts?raw';
import s_button_pin_drop from '../buttons/button-pin-drop.ts?raw';
import s_button_plasma_ball from '../buttons/button-plasma-ball.ts?raw';
import s_button_play_pause_morph from '../buttons/button-play-pause-morph.ts?raw';
import s_button_power_toggle from '../buttons/button-power-toggle.ts?raw';
import s_button_pulse_ring from '../buttons/button-pulse-ring.ts?raw';
import s_button_reaction_bar from '../buttons/button-reaction-bar.ts?raw';
import s_button_repeat_loop from '../buttons/button-repeat-loop.ts?raw';
import s_button_ripple_click from '../buttons/button-ripple-click.ts?raw';
import s_button_rocket_launch from '../buttons/button-rocket-launch.ts?raw';
import s_button_segmented_control from '../buttons/button-segmented-control.ts?raw';
import s_button_server_status from '../buttons/button-server-status.ts?raw';
import s_button_shadow_stack from '../buttons/button-shadow-stack.ts?raw';
import s_button_shine_sweep from '../buttons/button-shine-sweep.ts?raw';
import s_button_shuffle_playlist from '../buttons/button-shuffle-playlist.ts?raw';
import s_button_skew_slide from '../buttons/button-skew-slide.ts?raw';
import s_button_skip_track from '../buttons/button-skip-track.ts?raw';
import s_button_slot_machine from '../buttons/button-slot-machine.ts?raw';
import s_button_speed_dial from '../buttons/button-speed-dial.ts?raw';
import s_button_star_rating from '../buttons/button-star-rating.ts?raw';
import s_button_tab_switcher from '../buttons/button-tab-switcher.ts?raw';
import s_button_tag_add from '../buttons/button-tag-add.ts?raw';
import s_button_terminal_type from '../buttons/button-terminal-type.ts?raw';
import s_button_text_scramble from '../buttons/button-text-scramble.ts?raw';
import s_button_theme_chips from '../buttons/button-theme-chips.ts?raw';
import s_button_upload_pulse from '../buttons/button-upload-pulse.ts?raw';
import s_button_vinyl_spin from '../buttons/button-vinyl-spin.ts?raw';
import s_button_volume_slider from '../buttons/button-volume-slider.ts?raw';
import s_button_vote_arrows from '../buttons/button-vote-arrows.ts?raw';
import s_button_webhook_send from '../buttons/button-webhook-send.ts?raw';
import s_button_whack_a_mole from '../buttons/button-whack-a-mole.ts?raw';
import s_button_wifi_connect from '../buttons/button-wifi-connect.ts?raw';
import s_button_window_minimize from '../buttons/button-window-minimize.ts?raw';
import s_effect_accordion_glow from '../effects/effect-accordion-glow.ts?raw';
import s_effect_avatar_stack_fan from '../effects/effect-avatar-stack-fan.ts?raw';
import s_effect_binary_clock from '../effects/effect-binary-clock.ts?raw';
import s_effect_black_hole_vortex from '../effects/effect-black-hole-vortex.ts?raw';
import s_effect_blob_cursor_follow from '../effects/effect-blob-cursor-follow.ts?raw';
import s_effect_bubble_rise from '../effects/effect-bubble-rise.ts?raw';
import s_effect_button_3d_press from '../effects/effect-button-3d-press.ts?raw';
import s_effect_campfire_embers from '../effects/effect-campfire-embers.ts?raw';
import s_effect_candle_flame from '../effects/effect-candle-flame.ts?raw';
import s_effect_checkbox_draw_check from '../effects/effect-checkbox-draw-check.ts?raw';
import s_effect_circle_wipe_reveal from '../effects/effect-circle-wipe-reveal.ts?raw';
import s_effect_compass_needle from '../effects/effect-compass-needle.ts?raw';
import s_effect_confetti_burst_panel from '../effects/effect-confetti-burst-panel.ts?raw';
import s_effect_countdown_flip from '../effects/effect-countdown-flip.ts?raw';
import s_effect_counter_roll_up from '../effects/effect-counter-roll-up.ts?raw';
import s_effect_cursor_trail_sparkles from '../effects/effect-cursor-trail-sparkles.ts?raw';
import s_effect_curtain_lights from '../effects/effect-curtain-lights.ts?raw';
import s_effect_diagonal_wipe_reveal from '../effects/effect-diagonal-wipe-reveal.ts?raw';
import s_effect_dna_helix from '../effects/effect-dna-helix.ts?raw';
import s_effect_dot_bounce_grid from '../effects/effect-dot-bounce-grid.ts?raw';
import s_effect_dot_matrix_board from '../effects/effect-dot-matrix-board.ts?raw';
import s_effect_dropdown_fade_scale from '../effects/effect-dropdown-fade-scale.ts?raw';
import s_effect_eclipse_corona from '../effects/effect-eclipse-corona.ts?raw';
import s_effect_energy_shield_hit from '../effects/effect-energy-shield-hit.ts?raw';
import s_effect_equalizer_bars from '../effects/effect-equalizer-bars.ts?raw';
import s_effect_expanding_search_bar from '../effects/effect-expanding-search-bar.ts?raw';
import s_effect_eye_follow_cursor from '../effects/effect-eye-follow-cursor.ts?raw';
import s_effect_fab_speed_dial from '../effects/effect-fab-speed-dial.ts?raw';
import s_effect_film_grain_flicker from '../effects/effect-film-grain-flicker.ts?raw';
import s_effect_fire_text from '../effects/effect-fire-text.ts?raw';
import s_effect_folder_open_hover from '../effects/effect-folder-open-hover.ts?raw';
import s_effect_galaxy_swirl_panel from '../effects/effect-galaxy-swirl-panel.ts?raw';
import s_effect_gradient_ring_loader from '../effects/effect-gradient-ring-loader.ts?raw';
import s_effect_gravity_drop_in from '../effects/effect-gravity-drop-in.ts?raw';
import s_effect_gyroscope_rings from '../effects/effect-gyroscope-rings.ts?raw';
import s_effect_heart_beat_pulse from '../effects/effect-heart-beat-pulse.ts?raw';
import s_effect_holo_scan_portrait from '../effects/effect-holo-scan-portrait.ts?raw';
import s_effect_hourglass_sand from '../effects/effect-hourglass-sand.ts?raw';
import s_effect_ice_frost_card from '../effects/effect-ice-frost-card.ts?raw';
import s_effect_image_compare_slider from '../effects/effect-image-compare-slider.ts?raw';
import s_effect_ink_bleed_reveal from '../effects/effect-ink-bleed-reveal.ts?raw';
import s_effect_iris_transition from '../effects/effect-iris-transition.ts?raw';
import s_effect_jelly_wobble from '../effects/effect-jelly-wobble.ts?raw';
import s_effect_kaleidoscope_panel from '../effects/effect-kaleidoscope-panel.ts?raw';
import s_effect_kinetic_marquee_ticker from '../effects/effect-kinetic-marquee-ticker.ts?raw';
import s_effect_lava_lamp_panel from '../effects/effect-lava-lamp-panel.ts?raw';
import s_effect_lightbox_zoom from '../effects/effect-lightbox-zoom.ts?raw';
import s_effect_lightning_storm from '../effects/effect-lightning-storm.ts?raw';
import s_effect_loading_bar_striped from '../effects/effect-loading-bar-striped.ts?raw';
import s_effect_lunar_phases from '../effects/effect-lunar-phases.ts?raw';
import s_effect_map_pin_drop from '../effects/effect-map-pin-drop.ts?raw';
import s_effect_matrix_code_mini from '../effects/effect-matrix-code-mini.ts?raw';
import s_effect_modal_glass_pop from '../effects/effect-modal-glass-pop.ts?raw';
import s_effect_mosaic_tile_reveal from '../effects/effect-mosaic-tile-reveal.ts?raw';
import s_effect_neon_switch_toggle from '../effects/effect-neon-switch-toggle.ts?raw';
import s_effect_night_city_windows from '../effects/effect-night-city-windows.ts?raw';
import s_effect_orbit_spinner from '../effects/effect-orbit-spinner.ts?raw';
import s_effect_page_curtain_load from '../effects/effect-page-curtain-load.ts?raw';
import s_effect_parallax_layers from '../effects/effect-parallax-layers.ts?raw';
import s_effect_pendulum_swing from '../effects/effect-pendulum-swing.ts?raw';
import s_effect_piano_keys_hover from '../effects/effect-piano-keys-hover.ts?raw';
import s_effect_pinwheel_spin from '../effects/effect-pinwheel-spin.ts?raw';
import s_effect_pixelate_transition from '../effects/effect-pixelate-transition.ts?raw';
import s_effect_plasma_panel from '../effects/effect-plasma-panel.ts?raw';
import s_effect_polaroid_scatter_gallery from '../effects/effect-polaroid-scatter-gallery.ts?raw';
import s_effect_pricing_popular_glow from '../effects/effect-pricing-popular-glow.ts?raw';
import s_effect_progress_ring_timer from '../effects/effect-progress-ring-timer.ts?raw';
import s_effect_radar_sweep from '../effects/effect-radar-sweep.ts?raw';
import s_effect_radial_menu_expand from '../effects/effect-radial-menu-expand.ts?raw';
import s_effect_rain_window_panel from '../effects/effect-rain-window-panel.ts?raw';
import s_effect_rating_stars_hover from '../effects/effect-rating-stars-hover.ts?raw';
import s_effect_receipt_zigzag from '../effects/effect-receipt-zigzag.ts?raw';
import s_effect_rubber_band_hover from '../effects/effect-rubber-band-hover.ts?raw';
import s_effect_scratch_card from '../effects/effect-scratch-card.ts?raw';
import s_effect_scroll_progress_topbar from '../effects/effect-scroll-progress-topbar.ts?raw';
import s_effect_smoke_wisps from '../effects/effect-smoke-wisps.ts?raw';
import s_effect_snow_globe_panel from '../effects/effect-snow-globe-panel.ts?raw';
import s_effect_sonar_ping from '../effects/effect-sonar-ping.ts?raw';
import s_effect_split_text_lines from '../effects/effect-split-text-lines.ts?raw';
import s_effect_springy_icon_bounce from '../effects/effect-springy-icon-bounce.ts?raw';
import s_effect_starfield_panel from '../effects/effect-starfield-panel.ts?raw';
import s_effect_steam_mug from '../effects/effect-steam-mug.ts?raw';
import s_effect_step_progress_tracker from '../effects/effect-step-progress-tracker.ts?raw';
import s_effect_sticky_note_peel from '../effects/effect-sticky-note-peel.ts?raw';
import s_effect_sun_cloud_weather from '../effects/effect-sun-cloud-weather.ts?raw';
import s_effect_tabs_indicator_slide from '../effects/effect-tabs-indicator-slide.ts?raw';
import s_effect_tag_chip_pop from '../effects/effect-tag-chip-pop.ts?raw';
import s_effect_terminal_typewriter from '../effects/effect-terminal-typewriter.ts?raw';
import s_effect_text_scramble_decode from '../effects/effect-text-scramble-decode.ts?raw';
import s_effect_ticket_notch_card from '../effects/effect-ticket-notch-card.ts?raw';
import s_effect_tilt_glare_card from '../effects/effect-tilt-glare-card.ts?raw';
import s_effect_toast_slide_stack from '../effects/effect-toast-slide-stack.ts?raw';
import s_effect_tooltip_bubble_pop from '../effects/effect-tooltip-bubble-pop.ts?raw';
import s_effect_typographic_wave from '../effects/effect-typographic-wave.ts?raw';
import s_effect_volume_knob_rotate from '../effects/effect-volume-knob-rotate.ts?raw';
import s_effect_wave_flag from '../effects/effect-wave-flag.ts?raw';
import s_effect_waveform_line from '../effects/effect-waveform-line.ts?raw';
import s_effect_wind_turbine_spin from '../effects/effect-wind-turbine-spin.ts?raw';
import s_effect_xmas_light_string from '../effects/effect-xmas-light-string.ts?raw';
import s_effect_zoom_blur_enter from '../effects/effect-zoom-blur-enter.ts?raw';
import s_motion_abacus_beads from '../motions/motion-abacus-beads.ts?raw';
import s_motion_accordion_pulse from '../motions/motion-accordion-pulse.ts?raw';
import s_motion_audio_bars from '../motions/motion-audio-bars.ts?raw';
import s_motion_balance_scale from '../motions/motion-balance-scale.ts?raw';
import s_motion_balloon_rise from '../motions/motion-balloon-rise.ts?raw';
import s_motion_bar_race from '../motions/motion-bar-race.ts?raw';
import s_motion_battery_charge from '../motions/motion-battery-charge.ts?raw';
import s_motion_bounce_cascade from '../motions/motion-bounce-cascade.ts?raw';
import s_motion_bubble_rise from '../motions/motion-bubble-rise.ts?raw';
import s_motion_card_shuffle from '../motions/motion-card-shuffle.ts?raw';
import s_motion_carousel_loop from '../motions/motion-carousel-loop.ts?raw';
import s_motion_cart_bounce from '../motions/motion-cart-bounce.ts?raw';
import s_motion_chat_typewriter from '../motions/motion-chat-typewriter.ts?raw';
import s_motion_checkbox_draw from '../motions/motion-checkbox-draw.ts?raw';
import s_motion_claw_machine from '../motions/motion-claw-machine.ts?raw';
import s_motion_cloud_drift from '../motions/motion-cloud-drift.ts?raw';
import s_motion_coffee_steam from '../motions/motion-coffee-steam.ts?raw';
import s_motion_compass_needle from '../motions/motion-compass-needle.ts?raw';
import s_motion_conveyor_belt from '../motions/motion-conveyor-belt.ts?raw';
import s_motion_countdown_ring from '../motions/motion-countdown-ring.ts?raw';
import s_motion_crane_hook from '../motions/motion-crane-hook.ts?raw';
import s_motion_curtain_rise from '../motions/motion-curtain-rise.ts?raw';
import s_motion_day_night from '../motions/motion-day-night.ts?raw';
import s_motion_dice_roll from '../motions/motion-dice-roll.ts?raw';
import s_motion_dna_helix from '../motions/motion-dna-helix.ts?raw';
import s_motion_domino_fall from '../motions/motion-domino-fall.ts?raw';
import s_motion_dot_loader from '../motions/motion-dot-loader.ts?raw';
import s_motion_download_tray from '../motions/motion-download-tray.ts?raw';
import s_motion_dribble_ball from '../motions/motion-dribble-ball.ts?raw';
import s_motion_dropdown_menu from '../motions/motion-dropdown-menu.ts?raw';
import s_motion_elevator_floors from '../motions/motion-elevator-floors.ts?raw';
import s_motion_escalator_steps from '../motions/motion-escalator-steps.ts?raw';
import s_motion_ferris_wheel from '../motions/motion-ferris-wheel.ts?raw';
import s_motion_firefly_drift from '../motions/motion-firefly-drift.ts?raw';
import s_motion_fish_school from '../motions/motion-fish-school.ts?raw';
import s_motion_flight_path from '../motions/motion-flight-path.ts?raw';
import s_motion_flip_clock from '../motions/motion-flip-clock.ts?raw';
import s_motion_gear_train from '../motions/motion-gear-train.ts?raw';
import s_motion_gravity_drop from '../motions/motion-gravity-drop.ts?raw';
import s_motion_heartbeat_line from '../motions/motion-heartbeat-line.ts?raw';
import s_motion_hourglass_flip from '../motions/motion-hourglass-flip.ts?raw';
import s_motion_hydraulic_press from '../motions/motion-hydraulic-press.ts?raw';
import s_motion_kaleidoscope from '../motions/motion-kaleidoscope.ts?raw';
import s_motion_lava_lamp from '../motions/motion-lava-lamp.ts?raw';
import s_motion_led_matrix from '../motions/motion-led-matrix.ts?raw';
import s_motion_lighthouse_beam from '../motions/motion-lighthouse-beam.ts?raw';
import s_motion_lightning_storm from '../motions/motion-lightning-storm.ts?raw';
import s_motion_like_heart from '../motions/motion-like-heart.ts?raw';
import s_motion_lottery_drum from '../motions/motion-lottery-drum.ts?raw';
import s_motion_marble_run from '../motions/motion-marble-run.ts?raw';
import s_motion_metronome from '../motions/motion-metronome.ts?raw';
import s_motion_modal_pop from '../motions/motion-modal-pop.ts?raw';
import s_motion_moon_phases from '../motions/motion-moon-phases.ts?raw';
import s_motion_neon_sign from '../motions/motion-neon-sign.ts?raw';
import s_motion_orbit_loader from '../motions/motion-orbit-loader.ts?raw';
import s_motion_pacman_chomp from '../motions/motion-pacman-chomp.ts?raw';
import s_motion_page_flip from '../motions/motion-page-flip.ts?raw';
import s_motion_parachute_drop from '../motions/motion-parachute-drop.ts?raw';
import s_motion_piston_engine from '../motions/motion-piston-engine.ts?raw';
import s_motion_pong_rally from '../motions/motion-pong-rally.ts?raw';
import s_motion_prize_wheel from '../motions/motion-prize-wheel.ts?raw';
import s_motion_progress_steps from '../motions/motion-progress-steps.ts?raw';
import s_motion_pulley_lift from '../motions/motion-pulley-lift.ts?raw';
import s_motion_radar_sweep from '../motions/motion-radar-sweep.ts?raw';
import s_motion_rating_stars from '../motions/motion-rating-stars.ts?raw';
import s_motion_robot_arm from '../motions/motion-robot-arm.ts?raw';
import s_motion_robot_vacuum from '../motions/motion-robot-vacuum.ts?raw';
import s_motion_rocket_launch from '../motions/motion-rocket-launch.ts?raw';
import s_motion_sailboat_wave from '../motions/motion-sailboat-wave.ts?raw';
import s_motion_search_scan from '../motions/motion-search-scan.ts?raw';
import s_motion_seismograph from '../motions/motion-seismograph.ts?raw';
import s_motion_slot_reels from '../motions/motion-slot-reels.ts?raw';
import s_motion_snow_globe from '../motions/motion-snow-globe.ts?raw';
import s_motion_solar_orbit from '../motions/motion-solar-orbit.ts?raw';
import s_motion_sonar_pulse from '../motions/motion-sonar-pulse.ts?raw';
import s_motion_space_invaders from '../motions/motion-space-invaders.ts?raw';
import s_motion_spinner_segments from '../motions/motion-spinner-segments.ts?raw';
import s_motion_spotlight_sweep from '../motions/motion-spotlight-sweep.ts?raw';
import s_motion_square_shuffle from '../motions/motion-square-shuffle.ts?raw';
import s_motion_stack_tumble from '../motions/motion-stack-tumble.ts?raw';
import s_motion_stadium_wave from '../motions/motion-stadium-wave.ts?raw';
import s_motion_star_twinkle from '../motions/motion-star-twinkle.ts?raw';
import s_motion_stock_ticker from '../motions/motion-stock-ticker.ts?raw';
import s_motion_subway_line from '../motions/motion-subway-line.ts?raw';
import s_motion_sync_cycle from '../motions/motion-sync-cycle.ts?raw';
import s_motion_tab_indicator from '../motions/motion-tab-indicator.ts?raw';
import s_motion_tetris_fall from '../motions/motion-tetris-fall.ts?raw';
import s_motion_text_ticker from '../motions/motion-text-ticker.ts?raw';
import s_motion_thermostat_dial from '../motions/motion-thermostat-dial.ts?raw';
import s_motion_toast_queue from '../motions/motion-toast-queue.ts?raw';
import s_motion_toggle_switch from '../motions/motion-toggle-switch.ts?raw';
import s_motion_traffic_light from '../motions/motion-traffic-light.ts?raw';
import s_motion_ufo_hover from '../motions/motion-ufo-hover.ts?raw';
import s_motion_venetian_blind from '../motions/motion-venetian-blind.ts?raw';
import s_motion_vinyl_record from '../motions/motion-vinyl-record.ts?raw';
import s_motion_volume_knob from '../motions/motion-volume-knob.ts?raw';
import s_motion_wave_loader from '../motions/motion-wave-loader.ts?raw';
import s_motion_weather_cycle from '../motions/motion-weather-cycle.ts?raw';
import s_motion_wifi_signal from '../motions/motion-wifi-signal.ts?raw';
import s_motion_windmill_spin from '../motions/motion-windmill-spin.ts?raw';
import s_d25_abacus_frame from '../d25/d25-abacus-frame.ts?raw';
import s_d25_arcade_cabinet from '../d25/d25-arcade-cabinet.ts?raw';
import s_d25_astrolabe_dial from '../d25/d25-astrolabe-dial.ts?raw';
import s_d25_basketball_hoop_shot from '../d25/d25-basketball-hoop-shot.ts?raw';
import s_d25_bowling_lane from '../d25/d25-bowling-lane.ts?raw';
import s_d25_bridge_lift from '../d25/d25-bridge-lift.ts?raw';
import s_d25_cable_car_gondola from '../d25/d25-cable-car-gondola.ts?raw';
import s_d25_camera_shutter_blades from '../d25/d25-camera-shutter-blades.ts?raw';
import s_d25_campfire_depth from '../d25/d25-campfire-depth.ts?raw';
import s_d25_card_shuffle_fan from '../d25/d25-card-shuffle-fan.ts?raw';
import s_d25_carousel_horses from '../d25/d25-carousel-horses.ts?raw';
import s_d25_catapult_launch from '../d25/d25-catapult-launch.ts?raw';
import s_d25_ceiling_fan_spin from '../d25/d25-ceiling-fan-spin.ts?raw';
import s_d25_chessboard_tilt from '../d25/d25-chessboard-tilt.ts?raw';
import s_d25_coin_flipper from '../d25/d25-coin-flipper.ts?raw';
import s_d25_compass_needle_float from '../d25/d25-compass-needle-float.ts?raw';
import s_d25_coral_reef_layers from '../d25/d25-coral-reef-layers.ts?raw';
import s_d25_crane_claw from '../d25/d25-crane-claw.ts?raw';
import s_d25_cube_carousel from '../d25/d25-cube-carousel.ts?raw';
import s_d25_dam_spillway_gates from '../d25/d25-dam-spillway-gates.ts?raw';
import s_d25_dice_tower from '../d25/d25-dice-tower.ts?raw';
import s_d25_diorama_room from '../d25/d25-diorama-room.ts?raw';
import s_d25_domino_run from '../d25/d25-domino-run.ts?raw';
import s_d25_door_gallery from '../d25/d25-door-gallery.ts?raw';
import s_d25_dragon_wing_flap from '../d25/d25-dragon-wing-flap.ts?raw';
import s_d25_drawbridge from '../d25/d25-drawbridge.ts?raw';
import s_d25_earthquake_shake_table from '../d25/d25-earthquake-shake-table.ts?raw';
import s_d25_elevator_shaft from '../d25/d25-elevator-shaft.ts?raw';
import s_d25_equalizer_bars_3d from '../d25/d25-equalizer-bars-3d.ts?raw';
import s_d25_escalator_steps from '../d25/d25-escalator-steps.ts?raw';
import s_d25_ferris_wheel from '../d25/d25-ferris-wheel.ts?raw';
import s_d25_film_clapperboard from '../d25/d25-film-clapperboard.ts?raw';
import s_d25_film_reel_projector from '../d25/d25-film-reel-projector.ts?raw';
import s_d25_floating_islands from '../d25/d25-floating-islands.ts?raw';
import s_d25_frame_wall from '../d25/d25-frame-wall.ts?raw';
import s_d25_garage_door_rollup from '../d25/d25-garage-door-rollup.ts?raw';
import s_d25_gramophone_horn from '../d25/d25-gramophone-horn.ts?raw';
import s_d25_greeting_card from '../d25/d25-greeting-card.ts?raw';
import s_d25_gumball_machine from '../d25/d25-gumball-machine.ts?raw';
import s_d25_gyroscope_rings from '../d25/d25-gyroscope-rings.ts?raw';
import s_d25_hand_fan_spread from '../d25/d25-hand-fan-spread.ts?raw';
import s_d25_harbor_crane_container from '../d25/d25-harbor-crane-container.ts?raw';
import s_d25_hot_air_balloon_rise from '../d25/d25-hot-air-balloon-rise.ts?raw';
import s_d25_hourglass_flow from '../d25/d25-hourglass-flow.ts?raw';
import s_d25_iceberg_cross_section from '../d25/d25-iceberg-cross-section.ts?raw';
import s_d25_jellyfish_drift from '../d25/d25-jellyfish-drift.ts?raw';
import s_d25_joystick_control from '../d25/d25-joystick-control.ts?raw';
import s_d25_jukebox_selection from '../d25/d25-jukebox-selection.ts?raw';
import s_d25_kaleidoscope_cone from '../d25/d25-kaleidoscope-cone.ts?raw';
import s_d25_kite_in_wind from '../d25/d25-kite-in-wind.ts?raw';
import s_d25_lantern_glow_swing from '../d25/d25-lantern-glow-swing.ts?raw';
import s_d25_lighthouse_beam from '../d25/d25-lighthouse-beam.ts?raw';
import s_d25_mailbox_flag from '../d25/d25-mailbox-flag.ts?raw';
import s_d25_mechanical_keyboard from '../d25/d25-mechanical-keyboard.ts?raw';
import s_d25_metronome_arm from '../d25/d25-metronome-arm.ts?raw';
import s_d25_moon_orbit_ring from '../d25/d25-moon-orbit-ring.ts?raw';
import s_d25_page_fold from '../d25/d25-page-fold.ts?raw';
import s_d25_paper_cut_landscape from '../d25/d25-paper-cut-landscape.ts?raw';
import s_d25_periscope from '../d25/d25-periscope.ts?raw';
import s_d25_photo_pile_lift from '../d25/d25-photo-pile-lift.ts?raw';
import s_d25_piano_hammer_lift from '../d25/d25-piano-hammer-lift.ts?raw';
import s_d25_pin_art_toy from '../d25/d25-pin-art-toy.ts?raw';
import s_d25_pinball_flippers from '../d25/d25-pinball-flippers.ts?raw';
import s_d25_pinwheel_spin from '../d25/d25-pinwheel-spin.ts?raw';
import s_d25_pocket_watch_open from '../d25/d25-pocket-watch-open.ts?raw';
import s_d25_portcullis_gate from '../d25/d25-portcullis-gate.ts?raw';
import s_d25_prism_beam_split from '../d25/d25-prism-beam-split.ts?raw';
import s_d25_radar_sweep_dome from '../d25/d25-radar-sweep-dome.ts?raw';
import s_d25_railway_crossing_gate from '../d25/d25-railway-crossing-gate.ts?raw';
import s_d25_revolving_door from '../d25/d25-revolving-door.ts?raw';
import s_d25_rotary_phone_dial from '../d25/d25-rotary-phone-dial.ts?raw';
import s_d25_rubiks_layer_twist from '../d25/d25-rubiks-layer-twist.ts?raw';
import s_d25_satellite_dish_tracker from '../d25/d25-satellite-dish-tracker.ts?raw';
import s_d25_seesaw_balance from '../d25/d25-seesaw-balance.ts?raw';
import s_d25_shadow_theater from '../d25/d25-shadow-theater.ts?raw';
import s_d25_skate_halfpipe_rider from '../d25/d25-skate-halfpipe-rider.ts?raw';
import s_d25_slide_puzzle from '../d25/d25-slide-puzzle.ts?raw';
import s_d25_slot_machine_reels from '../d25/d25-slot-machine-reels.ts?raw';
import s_d25_soccer_goal_net from '../d25/d25-soccer-goal-net.ts?raw';
import s_d25_solar_panel_array_tilt from '../d25/d25-solar-panel-array-tilt.ts?raw';
import s_d25_speaker_cone_thump from '../d25/d25-speaker-cone-thump.ts?raw';
import s_d25_spiral_staircase from '../d25/d25-spiral-staircase.ts?raw';
import s_d25_stack_tower from '../d25/d25-stack-tower.ts?raw';
import s_d25_submarine_dive from '../d25/d25-submarine-dive.ts?raw';
import s_d25_subway_turnstile from '../d25/d25-subway-turnstile.ts?raw';
import s_d25_swing_set_pendulum from '../d25/d25-swing-set-pendulum.ts?raw';
import s_d25_teacup_ride from '../d25/d25-teacup-ride.ts?raw';
import s_d25_telescope_mount from '../d25/d25-telescope-mount.ts?raw';
import s_d25_traffic_light_box from '../d25/d25-traffic-light-box.ts?raw';
import s_d25_treasure_chest_open from '../d25/d25-treasure-chest-open.ts?raw';
import s_d25_tunnel_rings from '../d25/d25-tunnel-rings.ts?raw';
import s_d25_typewriter_keys from '../d25/d25-typewriter-keys.ts?raw';
import s_d25_vending_machine from '../d25/d25-vending-machine.ts?raw';
import s_d25_venetian_blinds_tilt from '../d25/d25-venetian-blinds-tilt.ts?raw';
import s_d25_volcano_cross_section from '../d25/d25-volcano-cross-section.ts?raw';
import s_d25_watermill_wheel from '../d25/d25-watermill-wheel.ts?raw';
import s_d25_wind_chime_tubes from '../d25/d25-wind-chime-tubes.ts?raw';
import s_d25_windmill_blades from '../d25/d25-windmill-blades.ts?raw';
import s_d25_wishing_well_pulley from '../d25/d25-wishing-well-pulley.ts?raw';
import s_d25_zoetrope from '../d25/d25-zoetrope.ts?raw';
import s_acid_bloom from '../elements/acid-bloom.ts?raw';
import s_asteroid_drift from '../elements/asteroid-drift.ts?raw';
import s_aurora_ribbon from '../elements/aurora-ribbon.ts?raw';
import s_bacteria_culture from '../elements/bacteria-culture.ts?raw';
import s_bamboo_shadow from '../elements/bamboo-shadow.ts?raw';
import s_binary_star from '../elements/binary-star.ts?raw';
import s_bird_murmuration from '../elements/bird-murmuration.ts?raw';
import s_black_hole_lens from '../elements/black-hole-lens.ts?raw';
import s_blizzard_whiteout from '../elements/blizzard-whiteout.ts?raw';
import s_breathing_gradient from '../elements/breathing-gradient.ts?raw';
import s_bubble_universe from '../elements/bubble-universe.ts?raw';
import s_butterfly_meadow from '../elements/butterfly-meadow.ts?raw';
import s_candle_glow from '../elements/candle-glow.ts?raw';
import s_canyon_wind from '../elements/canyon-wind.ts?raw';
import s_cellular_automata from '../elements/cellular-automata.ts?raw';
import s_circuit_board from '../elements/circuit-board.ts?raw';
import s_city_lights from '../elements/city-lights.ts?raw';
import s_clockwork_gears from '../elements/clockwork-gears.ts?raw';
import s_coffee_swirl from '../elements/coffee-swirl.ts?raw';
import s_comet_tail from '../elements/comet-tail.ts?raw';
import s_confetti_drift from '../elements/confetti-drift.ts?raw';
import s_coral_glow from '../elements/coral-glow.ts?raw';
import s_cosmic_web from '../elements/cosmic-web.ts?raw';
import s_crystal_cave from '../elements/crystal-cave.ts?raw';
import s_crystal_prism from '../elements/crystal-prism.ts?raw';
import s_data_stream from '../elements/data-stream.ts?raw';
import s_deep_sea_jelly from '../elements/deep-sea-jelly.ts?raw';
import s_desert_mirage from '../elements/desert-mirage.ts?raw';
import s_digital_noise from '../elements/digital-noise.ts?raw';
import s_dune_shift from '../elements/dune-shift.ts?raw';
import s_dust_motes from '../elements/dust-motes.ts?raw';
import s_echo_ripple from '../elements/echo-ripple.ts?raw';
import s_eclipse_ring from '../elements/eclipse-ring.ts?raw';
import s_ember_storm from '../elements/ember-storm.ts?raw';
import s_equalizer_bars from '../elements/equalizer-bars.ts?raw';
import s_fern_fractal from '../elements/fern-fractal.ts?raw';
import s_fiber_optic from '../elements/fiber-optic.ts?raw';
import s_film_grain from '../elements/film-grain.ts?raw';
import s_firefly_swarm from '../elements/firefly-swarm.ts?raw';
import s_fireworks_night from '../elements/fireworks-night.ts?raw';
import s_fish_school from '../elements/fish-school.ts?raw';
import s_frost_window from '../elements/frost-window.ts?raw';
import s_glitch_art from '../elements/glitch-art.ts?raw';
import s_glitter_wave from '../elements/glitter-wave.ts?raw';
import s_gradient_orb from '../elements/gradient-orb.ts?raw';
import s_gravity_grid from '../elements/gravity-grid.ts?raw';
import s_hailstorm from '../elements/hailstorm.ts?raw';
import s_halo_ring from '../elements/halo-ring.ts?raw';
import s_heat_shimmer from '../elements/heat-shimmer.ts?raw';
import s_hologram_scan from '../elements/hologram-scan.ts?raw';
import s_honeycomb from '../elements/honeycomb.ts?raw';
import s_ice_flow from '../elements/ice-flow.ts?raw';
import s_kaleidoscope from '../elements/kaleidoscope.ts?raw';
import s_kelp_forest from '../elements/kelp-forest.ts?raw';
import s_lantern_festival from '../elements/lantern-festival.ts?raw';
import s_laser_grid from '../elements/laser-grid.ts?raw';
import s_lava_flow from '../elements/lava-flow.ts?raw';
import s_lava_lamp from '../elements/lava-lamp.ts?raw';
import s_light_leak from '../elements/light-leak.ts?raw';
import s_lighthouse_beam from '../elements/lighthouse-beam.ts?raw';
import s_lightning_field from '../elements/lightning-field.ts?raw';
import s_liquid_gradient from '../elements/liquid-gradient.ts?raw';
import s_lotus_pond from '../elements/lotus-pond.ts?raw';
import s_magnet_shavings from '../elements/magnet-shavings.ts?raw';
import s_mercury_droplet from '../elements/mercury-droplet.ts?raw';
import s_meteor_shower from '../elements/meteor-shower.ts?raw';
import s_mirror_hall from '../elements/mirror-hall.ts?raw';
import s_monsoon_clouds from '../elements/monsoon-clouds.ts?raw';
import s_moon_phases from '../elements/moon-phases.ts?raw';
import s_moth_flight from '../elements/moth-flight.ts?raw';
import s_mountain_mist from '../elements/mountain-mist.ts?raw';
import s_nebula_pillars from '../elements/nebula-pillars.ts?raw';
import s_neon_sign from '../elements/neon-sign.ts?raw';
import s_ocean_foam from '../elements/ocean-foam.ts?raw';
import s_ocean_swell from '../elements/ocean-swell.ts?raw';
import s_op_art from '../elements/op-art.ts?raw';
import s_orbit_garden from '../elements/orbit-garden.ts?raw';
import s_paint_drip from '../elements/paint-drip.ts?raw';
import s_pendulum_wave from '../elements/pendulum-wave.ts?raw';
import s_quantum_foam from '../elements/quantum-foam.ts?raw';
import s_radar_sweep from '../elements/radar-sweep.ts?raw';
import s_rain_veil from '../elements/rain-veil.ts?raw';
import s_river_delta from '../elements/river-delta.ts?raw';
import s_sand_ripple from '../elements/sand-ripple.ts?raw';
import s_sea_sparkle from '../elements/sea-sparkle.ts?raw';
import s_silk_ribbon from '../elements/silk-ribbon.ts?raw';
import s_smoke_column from '../elements/smoke-column.ts?raw';
import s_snow_globe from '../elements/snow-globe.ts?raw';
import s_solar_wind from '../elements/solar-wind.ts?raw';
import s_spider_silk from '../elements/spider-silk.ts?raw';
import s_spiral_shell from '../elements/spiral-shell.ts?raw';
import s_stained_glass from '../elements/stained-glass.ts?raw';
import s_star_nursery from '../elements/star-nursery.ts?raw';
import s_storm_front from '../elements/storm-front.ts?raw';
import s_tide_pool from '../elements/tide-pool.ts?raw';
import s_topographic_map from '../elements/topographic-map.ts?raw';
import s_tornado_vortex from '../elements/tornado-vortex.ts?raw';
import s_tree_canopy from '../elements/tree-canopy.ts?raw';
import s_wave_interference from '../elements/wave-interference.ts?raw';
import s_zen_garden from '../elements/zen-garden.ts?raw';
import s_abacus_frame from '../elements/abacus-frame.ts?raw';
import s_arcade_cabinet from '../elements/arcade-cabinet.ts?raw';
import s_armillary_sphere from '../elements/armillary-sphere.ts?raw';
import s_atom_model from '../elements/atom-model.ts?raw';
import s_balloon_cluster from '../elements/balloon-cluster.ts?raw';
import s_battery_cell from '../elements/battery-cell.ts?raw';
import s_beehive_skep from '../elements/beehive-skep.ts?raw';
import s_birdcage from '../elements/birdcage.ts?raw';
import s_black_hole_disk from '../elements/black-hole-disk.ts?raw';
import s_boombox from '../elements/boombox.ts?raw';
import s_boomerang_orbit from '../elements/boomerang-orbit.ts?raw';
import s_bowling_pin from '../elements/bowling-pin.ts?raw';
import s_cactus_trio from '../elements/cactus-trio.ts?raw';
import s_camera_vintage from '../elements/camera-vintage.ts?raw';
import s_cannon_ball from '../elements/cannon-ball.ts?raw';
import s_cassette_tape from '../elements/cassette-tape.ts?raw';
import s_castle_turret from '../elements/castle-turret.ts?raw';
import s_catapult from '../elements/catapult.ts?raw';
import s_chess_knight from '../elements/chess-knight.ts?raw';
import s_clay_vessel from '../elements/clay-vessel.ts?raw';
import s_compass_needle from '../elements/compass-needle.ts?raw';
import s_conch_shell from '../elements/conch-shell.ts?raw';
import s_coral_branch from '../elements/coral-branch.ts?raw';
import s_crystal_ball from '../elements/crystal-ball.ts?raw';
import s_crystal_wand from '../elements/crystal-wand.ts?raw';
import s_cube_stack from '../elements/cube-stack.ts?raw';
import s_d20_dice from '../elements/d20-dice.ts?raw';
import s_dartboard from '../elements/dartboard.ts?raw';
import s_disco_ball from '../elements/disco-ball.ts?raw';
import s_dna_twist from '../elements/dna-twist.ts?raw';
import s_domino_arc from '../elements/domino-arc.ts?raw';
import s_edison_bulb from '../elements/edison-bulb.ts?raw';
import s_faceted_head from '../elements/faceted-head.ts?raw';
import s_film_reel from '../elements/film-reel.ts?raw';
import s_gem_cluster from '../elements/gem-cluster.ts?raw';
import s_geode_slice from '../elements/geode-slice.ts?raw';
import s_goldfish_bowl from '../elements/goldfish-bowl.ts?raw';
import s_gong_strike from '../elements/gong-strike.ts?raw';
import s_gramophone from '../elements/gramophone.ts?raw';
import s_gyroscope from '../elements/gyroscope.ts?raw';
import s_hand_drum from '../elements/hand-drum.ts?raw';
import s_harp_strings from '../elements/harp-strings.ts?raw';
import s_headphones from '../elements/headphones.ts?raw';
import s_horseshoe_magnet from '../elements/horseshoe-magnet.ts?raw';
import s_hot_air_balloon from '../elements/hot-air-balloon.ts?raw';
import s_ice_cream_cone from '../elements/ice-cream-cone.ts?raw';
import s_joystick_arcade from '../elements/joystick-arcade.ts?raw';
import s_kite_drift from '../elements/kite-drift.ts?raw';
import s_knight_helmet from '../elements/knight-helmet.ts?raw';
import s_maracas from '../elements/maracas.ts?raw';
import s_metronome_arm from '../elements/metronome-arm.ts?raw';
import s_microphone from '../elements/microphone.ts?raw';
import s_microscope from '../elements/microscope.ts?raw';
import s_moai_statue from '../elements/moai-statue.ts?raw';
import s_mushroom_ring from '../elements/mushroom-ring.ts?raw';
import s_music_box from '../elements/music-box.ts?raw';
import s_nautilus_shell from '../elements/nautilus-shell.ts?raw';
import s_nest_eggs from '../elements/nest-eggs.ts?raw';
import s_newtons_cradle from '../elements/newtons-cradle.ts?raw';
import s_orbit_satellite from '../elements/orbit-satellite.ts?raw';
import s_paper_lantern from '../elements/paper-lantern.ts?raw';
import s_paper_plane_swarm from '../elements/paper-plane-swarm.ts?raw';
import s_penguin_chick from '../elements/penguin-chick.ts?raw';
import s_piano_keys from '../elements/piano-keys.ts?raw';
import s_pinball_bumper from '../elements/pinball-bumper.ts?raw';
import s_pinwheel_spin from '../elements/pinwheel-spin.ts?raw';
import s_plasma_globe from '../elements/plasma-globe.ts?raw';
import s_pocket_watch from '../elements/pocket-watch.ts?raw';
import s_poker_chips from '../elements/poker-chips.ts?raw';
import s_potion_flask from '../elements/potion-flask.ts?raw';
import s_pulsar_star from '../elements/pulsar-star.ts?raw';
import s_retro_rocket from '../elements/retro-rocket.ts?raw';
import s_royal_crown from '../elements/royal-crown.ts?raw';
import s_rubber_duck from '../elements/rubber-duck.ts?raw';
import s_satellite_dish from '../elements/satellite-dish.ts?raw';
import s_slinky_stairs from '../elements/slinky-stairs.ts?raw';
import s_slot_machine from '../elements/slot-machine.ts?raw';
import s_solar_panel_array from '../elements/solar-panel-array.ts?raw';
import s_space_station_core from '../elements/space-station-core.ts?raw';
import s_speaker_cone from '../elements/speaker-cone.ts?raw';
import s_spinning_top from '../elements/spinning-top.ts?raw';
import s_sunflower_head from '../elements/sunflower-head.ts?raw';
import s_swinging_bell from '../elements/swinging-bell.ts?raw';
import s_sword_in_stone from '../elements/sword-in-stone.ts?raw';
import s_teapot from '../elements/teapot.ts?raw';
import s_telescope from '../elements/telescope.ts?raw';
import s_tesla_coil from '../elements/tesla-coil.ts?raw';
import s_top_hat from '../elements/top-hat.ts?raw';
import s_tower_of_hanoi from '../elements/tower-of-hanoi.ts?raw';
import s_treasure_chest from '../elements/treasure-chest.ts?raw';
import s_trophy_cup from '../elements/trophy-cup.ts?raw';
import s_tuning_fork from '../elements/tuning-fork.ts?raw';
import s_ufo_saucer from '../elements/ufo-saucer.ts?raw';
import s_umbrella_spin from '../elements/umbrella-spin.ts?raw';
import s_vinyl_record from '../elements/vinyl-record.ts?raw';
import s_wind_chime from '../elements/wind-chime.ts?raw';
import s_wind_turbine from '../elements/wind-turbine.ts?raw';
import s_wire_bonsai from '../elements/wire-bonsai.ts?raw';
import s_witch_cauldron from '../elements/witch-cauldron.ts?raw';
import s_yoyo_trick from '../elements/yoyo-trick.ts?raw';
import s_abyssal_trench from '../elements/abyssal-trench.ts?raw';
import s_airship_armada from '../elements/airship-armada.ts?raw';
import s_alchemy_circle from '../elements/alchemy-circle.ts?raw';
import s_amethyst_cavern from '../elements/amethyst-cavern.ts?raw';
import s_astronaut_drift from '../elements/astronaut-drift.ts?raw';
import s_aurora_peaks from '../elements/aurora-peaks.ts?raw';
import s_book_portal from '../elements/book-portal.ts?raw';
import s_buried_colossus from '../elements/buried-colossus.ts?raw';
import s_campfire_comet from '../elements/campfire-comet.ts?raw';
import s_circus_tent from '../elements/circus-tent.ts?raw';
import s_cliffside_temple from '../elements/cliffside-temple.ts?raw';
import s_clockwork_orrery from '../elements/clockwork-orrery.ts?raw';
import s_cloud_haven from '../elements/cloud-haven.ts?raw';
import s_cosmic_curtain from '../elements/cosmic-curtain.ts?raw';
import s_cosmic_lotus from '../elements/cosmic-lotus.ts?raw';
import s_crane_wish from '../elements/crane-wish.ts?raw';
import s_crystal_deer from '../elements/crystal-deer.ts?raw';
import s_deep_diver from '../elements/deep-diver.ts?raw';
import s_desert_camp from '../elements/desert-camp.ts?raw';
import s_desert_night from '../elements/desert-night.ts?raw';
import s_desert_pyramid from '../elements/desert-pyramid.ts?raw';
import s_door_in_the_sky from '../elements/door-in-the-sky.ts?raw';
import s_dragon_hoard from '../elements/dragon-hoard.ts?raw';
import s_dragon_parade from '../elements/dragon-parade.ts?raw';
import s_dragonfly_dusk from '../elements/dragonfly-dusk.ts?raw';
import s_dreamcatcher from '../elements/dreamcatcher.ts?raw';
import s_dusk_balloon from '../elements/dusk-balloon.ts?raw';
import s_ember_forge from '../elements/ember-forge.ts?raw';
import s_fairy_ring from '../elements/fairy-ring.ts?raw';
import s_floating_city from '../elements/floating-city.ts?raw';
import s_floating_library from '../elements/floating-library.ts?raw';
import s_floating_runestones from '../elements/floating-runestones.ts?raw';
import s_frost_heart from '../elements/frost-heart.ts?raw';
import s_galaxy_jar from '../elements/galaxy-jar.ts?raw';
import s_genie_smoke from '../elements/genie-smoke.ts?raw';
import s_ghost_ship from '../elements/ghost-ship.ts?raw';
import s_glass_dunes from '../elements/glass-dunes.ts?raw';
import s_gondola_night from '../elements/gondola-night.ts?raw';
import s_gravity_well from '../elements/gravity-well.ts?raw';
import s_hanging_gardens from '../elements/hanging-gardens.ts?raw';
import s_harbor_moon from '../elements/harbor-moon.ts?raw';
import s_henge_dawn from '../elements/henge-dawn.ts?raw';
import s_hourglass_time from '../elements/hourglass-time.ts?raw';
import s_hyperspace_gate from '../elements/hyperspace-gate.ts?raw';
import s_iceberg_drift from '../elements/iceberg-drift.ts?raw';
import s_icebreaker_dawn from '../elements/icebreaker-dawn.ts?raw';
import s_ink_mountains from '../elements/ink-mountains.ts?raw';
import s_jelly_bloom from '../elements/jelly-bloom.ts?raw';
import s_jungle_temple from '../elements/jungle-temple.ts?raw';
import s_kitsune_foxfire from '../elements/kitsune-foxfire.ts?raw';
import s_long_neck_sunset from '../elements/long-neck-sunset.ts?raw';
import s_lumina_rain from '../elements/lumina-rain.ts?raw';
import s_magic_carpet from '../elements/magic-carpet.ts?raw';
import s_manta_glide from '../elements/manta-glide.ts?raw';
import s_marigold_night from '../elements/marigold-night.ts?raw';
import s_mermaid_rock from '../elements/mermaid-rock.ts?raw';
import s_midnight_carousel from '../elements/midnight-carousel.ts?raw';
import s_moon_gate from '../elements/moon-gate.ts?raw';
import s_moonlit_oasis from '../elements/moonlit-oasis.ts?raw';
import s_moonlit_sea from '../elements/moonlit-sea.ts?raw';
import s_mushroom_grove from '../elements/mushroom-grove.ts?raw';
import s_neon_metropolis from '../elements/neon-metropolis.ts?raw';
import s_night_ferris from '../elements/night-ferris.ts?raw';
import s_octopus_lair from '../elements/octopus-lair.ts?raw';
import s_orbital_station from '../elements/orbital-station.ts?raw';
import s_origami_flock from '../elements/origami-flock.ts?raw';
import s_owl_watch from '../elements/owl-watch.ts?raw';
import s_phoenix_ascent from '../elements/phoenix-ascent.ts?raw';
import s_pillar_of_dawn from '../elements/pillar-of-dawn.ts?raw';
import s_pipe_cathedral from '../elements/pipe-cathedral.ts?raw';
import s_planet_rise from '../elements/planet-rise.ts?raw';
import s_portal_stairs from '../elements/portal-stairs.ts?raw';
import s_redwood_rays from '../elements/redwood-rays.ts?raw';
import s_rocket_dawn from '../elements/rocket-dawn.ts?raw';
import s_rooftop_cat from '../elements/rooftop-cat.ts?raw';
import s_rune_circle from '../elements/rune-circle.ts?raw';
import s_serpent_of_stars from '../elements/serpent-of-stars.ts?raw';
import s_shrine_steps from '../elements/shrine-steps.ts?raw';
import s_sky_elevator from '../elements/sky-elevator.ts?raw';
import s_sky_isles from '../elements/sky-isles.ts?raw';
import s_sky_train from '../elements/sky-train.ts?raw';
import s_sleeping_giant from '../elements/sleeping-giant.ts?raw';
import s_snail_village from '../elements/snail-village.ts?raw';
import s_spirit_river from '../elements/spirit-river.ts?raw';
import s_star_whale from '../elements/star-whale.ts?raw';
import s_starfall_cliff from '../elements/starfall-cliff.ts?raw';
import s_stargazer_dome from '../elements/stargazer-dome.ts?raw';
import s_still_lake from '../elements/still-lake.ts?raw';
import s_stormbreak_rainbow from '../elements/stormbreak-rainbow.ts?raw';
import s_terraced_temple from '../elements/terraced-temple.ts?raw';
import s_totem_awakening from '../elements/totem-awakening.ts?raw';
import s_treasure_map from '../elements/treasure-map.ts?raw';
import s_underwater_ruins from '../elements/underwater-ruins.ts?raw';
import s_vine_arch from '../elements/vine-arch.ts?raw';
import s_winding_wall from '../elements/winding-wall.ts?raw';
import s_windmill_dusk from '../elements/windmill-dusk.ts?raw';
import s_windward_cliffs from '../elements/windward-cliffs.ts?raw';
import s_world_tree from '../elements/world-tree.ts?raw';
import s_world_turtle from '../elements/world-turtle.ts?raw';
import s_zodiac_wheel from '../elements/zodiac-wheel.ts?raw';

// Quality-wave factory elements (source shown verbatim on their pages).
import s_loader_honeycomb from '../loaders/loader-honeycomb.ts?raw';
import s_loader_sunrise from '../loaders/loader-sunrise.ts?raw';
import s_loader_shuffle from '../loaders/loader-shuffle.ts?raw';
import s_button_progress_fill from '../buttons/button-progress-fill.ts?raw';
import s_button_flip_confirm from '../buttons/button-flip-confirm.ts?raw';
import s_effect_aurora_text from '../effects/effect-aurora-text.ts?raw';
import s_effect_magnetic_card from '../effects/effect-magnetic-card.ts?raw';
import s_motion_elastic_tooltip from '../motions/motion-elastic-tooltip.ts?raw';
import s_motion_bounce_badge from '../motions/motion-bounce-badge.ts?raw';
import s_d25_coin_stack from '../d25/d25-coin-stack.ts?raw';
import s_d25_stair_shadow from '../d25/d25-stair-shadow.ts?raw';
import s_rain_ripples from '../elements/rain-ripples.ts?raw';
import s_aurora_waves from '../elements/aurora-waves.ts?raw';
import s_paper_crane_3d from '../elements/paper-crane-3d.ts?raw';
import s_hourglass_3d from '../elements/hourglass-3d.ts?raw';
import s_neon_city_hero from '../elements/neon-city-hero.ts?raw';
import s_murmuration_hero from '../elements/murmuration-hero.ts?raw';

// Forms and nav factories.
import s_form_floating_label from '../forms/form-floating-label.ts?raw';
import s_form_search_expand from '../forms/form-search-expand.ts?raw';
import s_form_otp_input from '../forms/form-otp-input.ts?raw';
import s_form_toggle_row from '../forms/form-toggle-row.ts?raw';
import s_form_range_slider from '../forms/form-range-slider.ts?raw';
import s_form_checkbox_draw from '../forms/form-checkbox-draw.ts?raw';
import s_form_radio_cards from '../forms/form-radio-cards.ts?raw';
import s_form_input_counter from '../forms/form-input-counter.ts?raw';
import s_nav_pill_nav from '../navs/nav-pill-nav.ts?raw';
import s_nav_underline_tabs from '../navs/nav-underline-tabs.ts?raw';
import s_nav_stepper from '../navs/nav-stepper.ts?raw';
import s_nav_dock_magnify from '../navs/nav-dock-magnify.ts?raw';
import s_nav_breadcrumb from '../navs/nav-breadcrumb.ts?raw';
import s_nav_rail from '../navs/nav-rail.ts?raw';
import s_nav_dots_pager from '../navs/nav-dots-pager.ts?raw';
import s_nav_burger_morph from '../navs/nav-burger-morph.ts?raw';

// Cards and pricing factories.
import s_card_profile from '../cards/card-profile.ts?raw';
import s_card_product from '../cards/card-product.ts?raw';
import s_card_stat from '../cards/card-stat.ts?raw';
import s_card_testimonial from '../cards/card-testimonial.ts?raw';
import s_card_article from '../cards/card-article.ts?raw';
import s_card_team from '../cards/card-team.ts?raw';
import s_card_notification from '../cards/card-notification.ts?raw';
import s_card_login from '../cards/card-login.ts?raw';
import s_pricing_tiers from '../pricing/pricing-tiers.ts?raw';
import s_pricing_billing_toggle from '../pricing/pricing-billing-toggle.ts?raw';
import s_pricing_feature_table from '../pricing/pricing-feature-table.ts?raw';
import s_pricing_hero from '../pricing/pricing-hero.ts?raw';
import s_pricing_addon_picker from '../pricing/pricing-addon-picker.ts?raw';
import s_pricing_coupon from '../pricing/pricing-coupon.ts?raw';
import s_pricing_invoice from '../pricing/pricing-invoice.ts?raw';
import s_pricing_currency from '../pricing/pricing-currency.ts?raw';

// Overlay and tooltip factories.
import s_overlay_modal from '../overlays/overlay-modal.ts?raw';
import s_overlay_command_palette from '../overlays/overlay-command-palette.ts?raw';
import s_overlay_popover from '../overlays/overlay-popover.ts?raw';
import s_overlay_drawer from '../overlays/overlay-drawer.ts?raw';
import s_overlay_snackbar from '../overlays/overlay-snackbar.ts?raw';
import s_overlay_confirm_dialog from '../overlays/overlay-confirm-dialog.ts?raw';
import s_overlay_lightbox from '../overlays/overlay-lightbox.ts?raw';
import s_overlay_context_menu from '../overlays/overlay-context-menu.ts?raw';
import s_table_sortable from '../tables/table-sortable.ts?raw';
import s_table_selectable from '../tables/table-selectable.ts?raw';
import s_table_expandable from '../tables/table-expandable.ts?raw';
import s_table_skeleton from '../tables/table-skeleton.ts?raw';
import s_table_sparkline_rows from '../tables/table-sparkline-rows.ts?raw';
import s_table_inline_edit from '../tables/table-inline-edit.ts?raw';
import s_tooltip_follow from '../tooltips/tooltip-follow.ts?raw';
import s_tooltip_hotkey from '../tooltips/tooltip-hotkey.ts?raw';
import s_tooltip_rich from '../tooltips/tooltip-rich.ts?raw';
import s_tooltip_anchor from '../tooltips/tooltip-anchor.ts?raw';
import s_tooltip_copy from '../tooltips/tooltip-copy.ts?raw';
import s_tooltip_avatar_stack from '../tooltips/tooltip-avatar-stack.ts?raw';

export const sources: Record<string, string> = {
  'particle-field': particleField,
  'wave-plane': wavePlane,
  'grid-floor': gridFloor,
  'distorted-sphere': distortedSphere,
  'wireframe-globe': wireframeGlobe,
  'liquid-knot': liquidKnot,
  'floating-shapes': floatingShapes,
  'orbit-loader': orbitLoader,
  'galaxy-spiral': galaxySpiral,
  'star-hyperspace': starHyperspace,
  'constellation-network': constellationNetwork,
  'text-particles': textParticles,
  'ripple-rings': rippleRings,
  'flow-field': flowField,
  'shard-crystal': shardCrystal,
  'torus-tunnel': torusTunnel,
  'dot-terrain': dotTerrain,
  'helix-strand': helixStrand,
  'fog-drift': fogDrift,
  'pulse-ring': pulseRing,
  'wire-cube': wireCube,
  monolith,
  'spotlight-stage': spotlightStage,
  'ring-portal': ringPortal,
  'aurora-mesh': createAuroraMesh(),
  'contour-lines': createContourLines(),
  'dot-matrix': createDotMatrix(),
  'radial-rays': createRadialRays(),
  'star-field': createStarField(),
  'wave-divider': createWaveDivider(),
  'hex-pattern': createHexPattern(),
  'topo-waves': createTopoWaves(),
  'blob-shape': createBlobShape(),
  'circuit-board': createCircuitBoard(),
  'chevron-pattern': createChevronPattern(),
  'plus-grid': createPlusGrid(),
  'retro-sun': createRetroSun(),
  'corner-frame': createCornerFrame(),
  'scan-lines': createScanLines(),
  'zigzag-divider': createZigzagDivider(),
  'spiral-dots': createSpiralDots(),
  'target-lock': createTargetLock(),
  'arrow-flow': createArrowFlow(),
  'burst-star': createBurstStar(),
  'wave-lines': createWaveLines(),
  'perspective-grid': createPerspectiveGrid(),
  'concentric-dots': createConcentricDots(),
  'diagonal-stripes': createDiagonalStripes(),
  'alpine-meadow': createAlpineMeadow(),
  'misty-pines': createMistyPines(),
  'aurora-lake': createAuroraLake(),
  'beach-day': createBeachDay(),
  'countryside-night': createCountrysideNight(),
  'desert-dunes': createDesertDunes(),
  'pixel-platformer': createPixelPlatformer(),
  'block-world': createBlockWorld(),
  'sakura-hill': createSakuraHill(),
  'arctic-night': createArcticNight(),
  'balloon-festival': createBalloonFestival(),
  'cable-car-line': createCableCarLine(),
  'camp-night': createCampNight(),
  'kite-beach': createKiteBeach(),
  'paper-boats': createPaperBoats(),
  'sailboat-regatta': createSailboatRegatta(),
  'wind-farm': createWindFarm(),
  'coral-reef': createCoralReef(),
  'vineyard-hill': createVineyardHill(),
  'storm-plains': createStormPlains(),
  'bamboo-path': createBambooPath(),
  'harbor-dusk': createHarborDusk(),
  'canyon-mesa': createCanyonMesa(),
  'windmill-valley': createWindmillValley(),
  'koi-pond': createKoiPond(),
  'storm-lighthouse': createStormLighthouse(),
  'shape-wave-stack': createWaveStack(),
  'shape-diamond-lattice': createDiamondLattice(),
  'shape-orbit-dots': createOrbitDots(),
  'texture-canvas-weave': createCanvasWeave(),
  'iso-ferry-dock': createIsoFerryDock(),
  'iso-attic-room': createIsoAtticRoom(),
  'monster-frostling': createFrostling(),
  'monster-gustling': createGustling(),
  'elemental-emberwing': createEmberwing(),
  'elemental-mossheart': createMossheart(),
  'chart-animated-bars': createAnimatedBars(),
  'chart-line-draw': createLineDraw(),
  'chart-donut': createDonutChart(),
  'chart-radial-gauge': createRadialGauge(),
  'chart-sparkline': createSparkline(),
  'chart-area-flow': createAreaFlow(),
  'chart-heatmap-grid': createHeatmapGrid(),
  'chart-radar': createRadarChart(),
  'chart-stacked-bars': createStackedBars(),
  'chart-progress-rings': createProgressRings(),
  'icon-wifi-pulse': createWifiPulse(),
  'icon-battery-charge': createBatteryCharge(),
  'icon-bluetooth-ping': createBluetoothPing(),
  'icon-volume-wave': createVolumeWave(),
  'icon-sync-rotate': createSyncRotate(),
  'icon-location-pulse': createLocationPulse(),
  'icon-heart-beat': createHeartBeat(),
  'icon-cloud-sync': createCloudSync(),
  'divider-gradient-fade': createGradientFade(),
  'divider-torn-paper': createTornPaper(),
  'divider-circuit': createCircuitDivider(),
  'divider-dots-fade': createDotsFade(),
  'divider-slash-cut': createSlashCut(),
  'divider-pulse-line': createPulseLine(),
  'divider-ribbon-swoosh': createRibbonSwoosh(),
  'divider-skyline': createSkylineDivider(),
  'badge-status': createStatusBadge(),
  'badge-verified': createVerifiedBadge(),
  'badge-live': createLiveIndicator(),
  'badge-level-medal': createLevelMedal(),
  'badge-price-tag': createPriceTag(),
  'badge-beta-pill': createBetaPill(),
  'badge-count': createCountBadge(),
  'badge-achievement-rosette': createAchievementRosette(),
  'timeline-vertical': createVerticalTimeline(),
  'timeline-alternating': createAlternatingTimeline(),
  'timeline-horizontal': createHorizontalMilestones(),
  'timeline-commit-log': createCommitLog(),
  'timeline-journey': createJourneyCurve(),
  'timeline-gantt': createGanttBars(),
  'timeline-agenda': createDayAgenda(),
  'timeline-era-bands': createEraBands(),
  'empty-inbox': createEmptyInbox(),
  'empty-search': createEmptySearch(),
  'empty-cart': createEmptyCart(),
  'empty-404': createError404(),
  'empty-folder': createEmptyFolder(),
  'empty-offline': createOfflineState(),
  'empty-notifications': createEmptyNotifications(),
  'empty-crash': createErrorCrash(),
  'iso-cube': createIsoCubes(),
  'iso-tower': createIsoTower(),
  'iso-server': createIsoServer(),
  'iso-trees': createIsoTrees(),
  'iso-boxes': createIsoBoxes(),
  'avatar-initials': createAvatarInitials({ name: 'Ada Lovelace' }),
  'avatar-pixel': createAvatarPixel({ seed: 42 }),
  'avatar-blob': createAvatarBlob({ variant: 0 }),
  'avatar-shapes': createAvatarShapes({ seed: 3 }),
  'avatar-status': createAvatarStatus({ status: 'online' }),
  'monster-ember': createMonsterEmber(),
  'monster-tide': createMonsterTide(),
  'monster-sprout': createMonsterSprout(),
  'monster-zap': createMonsterZap(),
  'monster-wisp': createMonsterWisp(),
  'capture-core': createCaptureCore(),
  'avatar-cat': createAvatarCat(),
  'avatar-robot': createAvatarRobot(),
  'avatar-animal': createAvatarAnimal({ variant: 'bear' }),
  'avatar-orbit': createAvatarOrbit({ initials: 'AK' }),
  'avatar-ring': createAvatarRing({ initials: 'MX' }),
  'shape-rings': createShapeRings(),
  'shape-arcs': createShapeArcs(),
  'shape-triangles': createShapeTriangles(),
  'shape-ribbon': createShapeRibbon(),
  'shape-waves': createShapeWaves(),
  'shape-confetti': createShapeConfetti({ seed: 11 }),
  'texture-static': createTextureStatic(),
  'texture-paper': createTexturePaper(),
  'texture-marble': createTextureMarble(),
  'texture-halftone': createTextureHalftone(),
  'texture-plaid': createTexturePlaid(),
  'texture-carbon': createTextureCarbon(),
  'texture-blueprint': createTextureBlueprint(),
  'texture-watercolor': createTextureWatercolor(),
  'texture-grain': createTextureGrain(),
  'texture-sand': createTextureSand(),
  'texture-knit': createTextureKnit(),
  'texture-fog': createTextureFog(),
  'texture-brick': createTextureBrick(),
  'texture-denim': createTextureDenim(),
  'texture-cork': createTextureCork(),
  'texture-terrazzo': createTextureTerrazzo(),
  'elemental-flame': createElementalFlame(),
  'elemental-tide': createElementalTide(),
  'elemental-terra': createElementalTerra(),
  'elemental-gale': createElementalGale(),
  'elemental-volt': createElementalVolt(),
  'elemental-frost': createElementalFrost(),
  'elemental-magma': createElementalMagma(),
  'elemental-lumen': createElementalLumen(),
  'elemental-umbra': createElementalUmbra(),
  'elemental-blizzard': createElementalBlizzard(),
  'elemental-quake': createElementalQuake(),
  'elemental-thorn': createElementalThorn(),
  'elemental-echo': createElementalEcho(),
  'motion-text-reveal': motionTextReveal,
  'motion-words-slide': motionWordsSlide,
  'motion-scroll-reveal': motionScrollReveal,
  'motion-parallax-layers': motionParallaxLayers,
  'motion-magnetic-button': motionMagneticButton,
  'motion-counter-roll': motionCounterRoll,
  'motion-marquee-loop': motionMarqueeLoop,
  'motion-letter-scramble': motionLetterScramble,
  'motion-elastic-drag': motionElasticDrag,
  'effect-glass-card': effectGlassCard,
  'effect-neon-text': effectNeonText,
  'effect-gradient-border-spin': effectGradientBorderSpin,
  'effect-shimmer-skeleton': effectShimmerSkeleton,
  'effect-spotlight-card': effectSpotlightCard,
  'effect-glitch-text': effectGlitchText,
  'effect-flip-card': effectFlipCard,
  'effect-aurora-border': effectAuroraBorder,
  'effect-blob-morph': effectBlobMorph,
  'effect-gradient-text-flow': effectGradientTextFlow,
  'effect-typing-dots': effectTypingDots,
  'button-glow': buttonGlow,
  'button-neon-outline': buttonNeonOutline,
  'button-glass': buttonGlass,
  'button-loading': buttonLoading,
  'button-icon-slide': buttonIconSlide,
  'button-social-circle': buttonSocialCircle,
  'button-border-trace': buttonBorderTrace,
  'button-elastic-press': buttonElasticPress,
  'avatar-ghost': createAvatarGhost(),
  'avatar-slime': createAvatarSlime(),
  'avatar-wizard': createAvatarWizard(),
  'avatar-knight': createAvatarKnight(),
  'avatar-owl': createAvatarOwl(),
  'avatar-penguin': createAvatarPenguin(),
  'avatar-bunny': createAvatarBunny(),
  'avatar-tiger': createAvatarTiger(),
  'avatar-alien': createAvatarAlien(),
  'avatar-mushroom': createAvatarMushroom(),
  'monster-golem': createMonsterGolem(),
  'monster-toxic': createMonsterToxic(),
  'monster-crystal': createMonsterCrystal(),
  'monster-fluff': createMonsterFluff(),
  'monster-bubble': createMonsterBubble(),
  'monster-shroom': createMonsterShroom(),
  'monster-fangling': createMonsterFangling(),
  'monster-cactling': createMonsterCactling(),
  'monster-drakeling': createMonsterDrakeling(),
  'monster-starning': createMonsterStarning(),
  'monster-wormling': createMonsterWormling(),
  'monster-mothling': createMonsterMothling(),
  'monster-sluggo': createMonsterSluggo(),
  'monster-beetle': createMonsterBeetle(),
  'monster-jelly': createMonsterJelly(),
  'monster-koiling': createMonsterKoiling(),
  'iso-desk': createIsoDesk(),
  'iso-gift': createIsoGift(),
  'iso-house': createIsoHouse(),
  'shape-stairs': createShapeStairs(),
  'shape-dunes': createShapeDunes(),
  'shape-pill-grid': createShapePillGrid(),
  'button-toggle-switch': buttonToggleSwitch,
  'button-copy-feedback': buttonCopyFeedback,
  'button-slide-text': buttonSlideText,
  'effect-chromatic-hover': effectChromaticHover,
  'effect-vignette-panel': effectVignettePanel,
  'effect-input-glow': effectInputGlow,
  "ant-trail": s_ant_trail(),
  "audio-pulse": s_audio_pulse(),
  "bamboo-grove": s_bamboo_grove(),
  "barber-pole": s_barber_pole(),
  "basket-weave": s_basket_weave(),
  "bathymetry-map": s_bathymetry_map(),
  "bird-flock": s_bird_flock(),
  "brick-fade": s_brick_fade(),
  "butterfly-wing": s_butterfly_wing(),
  "cafe-wall": s_cafe_wall(),
  "canyon-strata": s_canyon_strata(),
  "cave-columns": s_cave_columns(),
  "checker-warp": s_checker_warp(),
  "cherry-branch": s_cherry_branch(),
  "cloud-layers": s_cloud_layers(),
  "comet-tail-motif": s_comet_tail_motif(),
  "compass-rose": s_compass_rose(),
  "coral-branch-motif": s_coral_branch_motif(),
  "crystal-cluster": s_crystal_cluster(),
  "dandelion-seeds": s_dandelion_seeds(),
  "ember-rise": s_ember_rise(),
  "fern-fronds": s_fern_fronds(),
  "firefly-glow": s_firefly_glow(),
  "fish-school-motif": s_fish_school_motif(),
  "folded-planes": s_folded_planes(),
  "fractal-tree": s_fractal_tree(),
  "frost-window-motif": s_frost_window_motif(),
  "glacier-cracks": s_glacier_cracks(),
  "glass-shards": s_glass_shards(),
  "golden-spiral": s_golden_spiral(),
  "great-wave": s_great_wave(),
  "halftone-wave": s_halftone_wave(),
  "harbor-skyline": s_harbor_skyline(),
  "heartbeat-line": s_heartbeat_line(),
  "hermann-grid": s_hermann_grid(),
  "herringbone": s_herringbone(),
  "houndstooth": s_houndstooth(),
  "ikat-stripe": s_ikat_stripe(),
  "ivy-corner": s_ivy_corner(),
  "jellyfish-drift": s_jellyfish_drift(),
  "kelp-forest-motif": s_kelp_forest_motif(),
  "lantern-festival-motif": s_lantern_festival_motif(),
  "leaf-veins": s_leaf_veins(),
  "lighthouse-beams": s_lighthouse_beams(),
  "lightning-web": s_lightning_web(),
  "lotus-pads": s_lotus_pads(),
  "lunar-craters": s_lunar_craters(),
  "magnetic-field": s_magnetic_field(),
  "mandala-lines": s_mandala_lines(),
  "meteor-shower-motif": s_meteor_shower_motif(),
  "moire-rings": s_moire_rings(),
  "moon-phases-motif": s_moon_phases_motif(),
  "mosaic-tiles": s_mosaic_tiles(),
  "moss-patch": s_moss_patch(),
  "mud-cloth": s_mud_cloth(),
  "mushroom-ring-motif": s_mushroom_ring_motif(),
  "nebula-cloud": s_nebula_cloud(),
  "ocean-swells": s_ocean_swells(),
  "op-tunnel": s_op_tunnel(),
  "peacock-eye": s_peacock_eye(),
  "pendulum-arcs": s_pendulum_arcs(),
  "petal-bloom": s_petal_bloom(),
  "phyllotaxis": s_phyllotaxis(),
  "pinecone-spiral": s_pinecone_spiral(),
  "plaid-weave": s_plaid_weave(),
  "planet-rings": s_planet_rings(),
  "plume-swirl": s_plume_swirl(),
  "pulsar-beams": s_pulsar_beams(),
  "quilted-diamonds": s_quilted_diamonds(),
  "rain-veil-motif": s_rain_veil_motif(),
  "river-delta-motif": s_river_delta_motif(),
  "root-network": s_root_network(),
  "rose-window": s_rose_window(),
  "rune-stones": s_rune_stones(),
  "sashiko-stitch": s_sashiko_stitch(),
  "scatter-dust": s_scatter_dust(),
  "seismograph-trace": s_seismograph_trace(),
  "serpent-trail": s_serpent_trail(),
  "smoke-curl": s_smoke_curl(),
  "snake-scales": s_snake_scales(),
  "snowfall-drift": s_snowfall_drift(),
  "solar-flare": s_solar_flare(),
  "star-chart": s_star_chart(),
  "step-pyramid": s_step_pyramid(),
  "streamer-curl": s_streamer_curl(),
  "succulent-rosette": s_succulent_rosette(),
  "sunburst-mosaic": s_sunburst_mosaic(),
  "terraced-fields": s_terraced_fields(),
  "tornado-spin": s_tornado_spin(),
  "totem-column": s_totem_column(),
  "truchet-arcs": s_truchet_arcs(),
  "twist-spiral": s_twist_spiral(),
  "vine-lattice": s_vine_lattice(),
  "vortex-lines": s_vortex_lines(),
  "wheat-field": s_wheat_field(),
  "whirlpool-lines": s_whirlpool_lines(),
  "wireframe-globe": s_wireframe_globe(),
  "wormhole-stripes": s_wormhole_stripes(),
  "zellige-tile": s_zellige_tile(),
  "zen-garden-motif": s_zen_garden_motif(),
  "shape-antenna-hill": s_shape_antenna_hill(),
  "shape-arch-repeat": s_shape_arch_repeat(),
  "shape-arrow-mosaic": s_shape_arrow_mosaic(),
  "shape-atom-orbits": s_shape_atom_orbits(),
  "shape-balloon-bunch": s_shape_balloon_bunch(),
  "shape-barcode-fade": s_shape_barcode_fade(),
  "shape-beacon-beams": s_shape_beacon_beams(),
  "shape-blind-shift": s_shape_blind_shift(),
  "shape-blob-layers": s_shape_blob_layers(),
  "shape-bokeh-circles": s_shape_bokeh_circles(),
  "shape-book-spines": s_shape_book_spines(),
  "shape-bubbles-rise": s_shape_bubbles_rise(),
  "shape-celtic-knot": s_shape_celtic_knot(),
  "shape-checker-dither": s_shape_checker_dither(),
  "shape-circle-chain": s_shape_circle_chain(),
  "shape-city-skyline": s_shape_city_skyline(),
  "shape-clock-abstract": s_shape_clock_abstract(),
  "shape-constellation-links": s_shape_constellation_links(),
  "shape-corner-fan-arcs": s_shape_corner_fan_arcs(),
  "shape-corner-ripple": s_shape_corner_ripple(),
  "shape-crescent-duo": s_shape_crescent_duo(),
  "shape-crosshatch-patch": s_shape_crosshatch_patch(),
  "shape-diagonal-bands": s_shape_diagonal_bands(),
  "shape-diamond-shards": s_shape_diamond_shards(),
  "shape-dna-helix": s_shape_dna_helix(),
  "shape-domino-row": s_shape_domino_row(),
  "shape-drip-melt": s_shape_drip_melt(),
  "shape-eclipse-glow": s_shape_eclipse_glow(),
  "shape-enso-brush": s_shape_enso_brush(),
  "shape-feather-barb": s_shape_feather_barb(),
  "shape-film-strip": s_shape_film_strip(),
  "shape-five-rings": s_shape_five_rings(),
  "shape-flow-ribbons": s_shape_flow_ribbons(),
  "shape-fold-fan": s_shape_fold_fan(),
  "shape-gear-ring": s_shape_gear_ring(),
  "shape-gem-facet": s_shape_gem_facet(),
  "shape-glitch-rgb": s_shape_glitch_rgb(),
  "shape-gothic-arches": s_shape_gothic_arches(),
  "shape-grid-quarters": s_shape_grid_quarters(),
  "shape-halfmoon-row": s_shape_halfmoon_row(),
  "shape-halftone-gradient": s_shape_halftone_gradient(),
  "shape-hex-cluster": s_shape_hex_cluster(),
  "shape-hourglass-flow": s_shape_hourglass_flow(),
  "shape-icecream-cone": s_shape_icecream_cone(),
  "shape-infinity-track": s_shape_infinity_track(),
  "shape-inkblot-symmetry": s_shape_inkblot_symmetry(),
  "shape-iso-cubes": s_shape_iso_cubes(),
  "shape-jelly-arc": s_shape_jelly_arc(),
  "shape-jigsaw-strip": s_shape_jigsaw_strip(),
  "shape-juggle-parabola": s_shape_juggle_parabola(),
  "shape-kaleido-wedge": s_shape_kaleido_wedge(),
  "shape-keyhole-row": s_shape_keyhole_row(),
  "shape-kite-fly": s_shape_kite_fly(),
  "shape-ladder-tilt": s_shape_ladder_tilt(),
  "shape-lens-streak": s_shape_lens_streak(),
  "shape-lightning-split": s_shape_lightning_split(),
  "shape-lissajous-curve": s_shape_lissajous_curve(),
  "shape-marquee-border": s_shape_marquee_border(),
  "shape-maze-round": s_shape_maze_round(),
  "shape-metaball-merge": s_shape_metaball_merge(),
  "shape-moebius-band": s_shape_moebius_band(),
  "shape-mountain-layers": s_shape_mountain_layers(),
  "shape-neon-frame": s_shape_neon_frame(),
  "shape-nested-squares": s_shape_nested_squares(),
  "shape-notch-square": s_shape_notch_square(),
  "shape-onion-outline": s_shape_onion_outline(),
  "shape-op-eye": s_shape_op_eye(),
  "shape-op-warp": s_shape_op_warp(),
  "shape-orbit-system": s_shape_orbit_system(),
  "shape-pick-stack": s_shape_pick_stack(),
  "shape-pillar-bars": s_shape_pillar_bars(),
  "shape-pinwheel": s_shape_pinwheel(),
  "shape-pixel-cluster": s_shape_pixel_cluster(),
  "shape-plane-trail": s_shape_plane_trail(),
  "shape-quilt-patch": s_shape_quilt_patch(),
  "shape-radar-sweep": s_shape_radar_sweep(),
  "shape-raindrops": s_shape_raindrops(),
  "shape-rope-cross": s_shape_rope_cross(),
  "shape-shell-spiral": s_shape_shell_spiral(),
  "shape-stained-pane": s_shape_stained_pane(),
  "shape-stripe-sun": s_shape_stripe_sun(),
  "shape-sundial": s_shape_sundial(),
  "shape-sunrise-arc": s_shape_sunrise_arc(),
  "shape-target-offset": s_shape_target_offset(),
  "shape-tictac-grid": s_shape_tictac_grid(),
  "shape-tide-layers": s_shape_tide_layers(),
  "shape-tree-rings-oval": s_shape_tree_rings_oval(),
  "shape-tri-subdivide": s_shape_tri_subdivide(),
  "shape-tri-weave": s_shape_tri_weave(),
  "shape-truchet-quarters": s_shape_truchet_quarters(),
  "shape-vinyl-spin": s_shape_vinyl_spin(),
  "shape-vortex-swirl": s_shape_vortex_swirl(),
  "shape-waffle-grid": s_shape_waffle_grid(),
  "shape-window-sky": s_shape_window_sky(),
  "shape-xylophone-bars": s_shape_xylophone_bars(),
  "shape-yarn-ball": s_shape_yarn_ball(),
  "shape-yin-spin": s_shape_yin_spin(),
  "shape-zebra-wavy": s_shape_zebra_wavy(),
  "shape-zigzag-band": s_shape_zigzag_band(),
  "shape-zipper-teeth": s_shape_zipper_teeth(),
  "iso-armchair": s_iso_armchair(),
  "iso-art-easel": s_iso_art_easel(),
  "iso-bakery-stand": s_iso_bakery_stand(),
  "iso-balloon": s_iso_balloon(),
  "iso-barbell": s_iso_barbell(),
  "iso-bbq-grill": s_iso_bbq_grill(),
  "iso-billboard": s_iso_billboard(),
  "iso-birthday-cake": s_iso_birthday_cake(),
  "iso-blender": s_iso_blender(),
  "iso-bonsai": s_iso_bonsai(),
  "iso-bookshelf": s_iso_bookshelf(),
  "iso-booth": s_iso_booth(),
  "iso-bot-assembly": s_iso_bot_assembly(),
  "iso-bread": s_iso_bread(),
  "iso-bus-stop": s_iso_bus_stop(),
  "iso-camera": s_iso_camera(),
  "iso-camper-van": s_iso_camper_van(),
  "iso-candy-jar": s_iso_candy_jar(),
  "iso-cargo-crane": s_iso_cargo_crane(),
  "iso-castle-keep": s_iso_castle_keep(),
  "iso-cat-tower": s_iso_cat_tower(),
  "iso-chess-board": s_iso_chess_board(),
  "iso-clock-tower": s_iso_clock_tower(),
  "iso-coffee-cart": s_iso_coffee_cart(),
  "iso-console": s_iso_console(),
  "iso-control-panel": s_iso_control_panel(),
  "iso-crystal-cluster": s_iso_crystal_cluster(),
  "iso-delivery-scooter": s_iso_delivery_scooter(),
  "iso-dice-tower": s_iso_dice_tower(),
  "iso-drone-pad": s_iso_drone_pad(),
  "iso-drum-kit": s_iso_drum_kit(),
  "iso-espresso-machine": s_iso_espresso_machine(),
  "iso-farm-silo": s_iso_farm_silo(),
  "iso-fire-hydrant": s_iso_fire_hydrant(),
  "iso-fishing-boat": s_iso_fishing_boat(),
  "iso-flower-bed": s_iso_flower_bed(),
  "iso-forge": s_iso_forge(),
  "iso-fountain": s_iso_fountain(),
  "iso-gas-pump": s_iso_gas_pump(),
  "iso-greenhouse": s_iso_greenhouse(),
  "iso-guitar-amp": s_iso_guitar_amp(),
  "iso-gumball-machine": s_iso_gumball_machine(),
  "iso-hammock": s_iso_hammock(),
  "iso-hotdog-stand": s_iso_hotdog_stand(),
  "iso-ice-cream-cart": s_iso_ice_cream_cart(),
  "iso-jacuzzi": s_iso_jacuzzi(),
  "iso-kite-shack": s_iso_kite_shack(),
  "iso-lighthouse": s_iso_lighthouse(),
  "iso-mailbox": s_iso_mailbox(),
  "iso-market-stall": s_iso_market_stall(),
  "iso-meteor-crater": s_iso_meteor_crater(),
  "iso-milk-crates": s_iso_milk_crates(),
  "iso-monolith": s_iso_monolith(),
  "iso-moon-rover": s_iso_moon_rover(),
  "iso-mushroom-grove": s_iso_mushroom_grove(),
  "iso-neon-sign": s_iso_neon_sign(),
  "iso-noodle-bowl": s_iso_noodle_bowl(),
  "iso-observatory": s_iso_observatory(),
  "iso-oil-pumpjack": s_iso_oil_pumpjack(),
  "iso-pancake-stack": s_iso_pancake_stack(),
  "iso-park-bench": s_iso_park_bench(),
  "iso-picnic-spot": s_iso_picnic_spot(),
  "iso-pinball-table": s_iso_pinball_table(),
  "iso-pizza-oven": s_iso_pizza_oven(),
  "iso-planter-box": s_iso_planter_box(),
  "iso-podcast-mic": s_iso_podcast_mic(),
  "iso-pond-dock": s_iso_pond_dock(),
  "iso-printer-station": s_iso_printer_station(),
  "iso-punching-bag": s_iso_punching_bag(),
  "iso-rail-crossing": s_iso_rail_crossing(),
  "iso-record-player": s_iso_record_player(),
  "iso-retro-radio": s_iso_retro_radio(),
  "iso-robot-vacuum": s_iso_robot_vacuum(),
  "iso-running-track": s_iso_running_track(),
  "iso-satellite-dish": s_iso_satellite_dish(),
  "iso-sauna-cabin": s_iso_sauna_cabin(),
  "iso-sculpture-plaza": s_iso_sculpture_plaza(),
  "iso-skate-ramp": s_iso_skate_ramp(),
  "iso-slot-machine": s_iso_slot_machine(),
  "iso-smart-speaker": s_iso_smart_speaker(),
  "iso-solar-array": s_iso_solar_array(),
  "iso-space-telescope": s_iso_space_telescope(),
  "iso-stage-speakers": s_iso_stage_speakers(),
  "iso-statue-plinth": s_iso_statue_plinth(),
  "iso-substation": s_iso_substation(),
  "iso-swimming-pool": s_iso_swimming_pool(),
  "iso-taco-truck": s_iso_taco_truck(),
  "iso-tea-set": s_iso_tea_set(),
  "iso-tent": s_iso_tent(),
  "iso-tool-shed": s_iso_tool_shed(),
  "iso-toy-blocks": s_iso_toy_blocks(),
  "iso-traffic-light": s_iso_traffic_light(),
  "iso-tram-stop": s_iso_tram_stop(),
  "iso-treehouse": s_iso_treehouse(),
  "iso-turntable-booth": s_iso_turntable_booth(),
  "iso-vending-machine": s_iso_vending_machine(),
  "iso-washing-machine": s_iso_washing_machine(),
  "iso-water-tower": s_iso_water_tower(),
  "iso-wind-turbine": s_iso_wind_turbine(),
  "iso-wine-cellar": s_iso_wine_cellar(),
  "avatar-acorn": s_avatar_acorn(),
  "avatar-artist": s_avatar_artist(),
  "avatar-astronaut": s_avatar_astronaut(),
  "avatar-backpack": s_avatar_backpack(),
  "avatar-balloon": s_avatar_balloon(),
  "avatar-barista": s_avatar_barista(),
  "avatar-battery": s_avatar_battery(),
  "avatar-bear": s_avatar_bear(),
  "avatar-bee": s_avatar_bee(),
  "avatar-bell": s_avatar_bell(),
  "avatar-book": s_avatar_book(),
  "avatar-cactus": s_avatar_cactus(),
  "avatar-camera": s_avatar_camera(),
  "avatar-campfire": s_avatar_campfire(),
  "avatar-chef": s_avatar_chef(),
  "avatar-chick": s_avatar_chick(),
  "avatar-clock": s_avatar_clock(),
  "avatar-cloud": s_avatar_cloud(),
  "avatar-coffee": s_avatar_coffee(),
  "avatar-cowboy": s_avatar_cowboy(),
  "avatar-crab": s_avatar_crab(),
  "avatar-crown": s_avatar_crown(),
  "avatar-crystal": s_avatar_crystal(),
  "avatar-cyclops": s_avatar_cyclops(),
  "avatar-deer": s_avatar_deer(),
  "avatar-detective": s_avatar_detective(),
  "avatar-dinosaur": s_avatar_dinosaur(),
  "avatar-doctor": s_avatar_doctor(),
  "avatar-dolphin": s_avatar_dolphin(),
  "avatar-donut": s_avatar_donut(),
  "avatar-dragon": s_avatar_dragon(),
  "avatar-duck": s_avatar_duck(),
  "avatar-egg": s_avatar_egg(),
  "avatar-elf": s_avatar_elf(),
  "avatar-fairy": s_avatar_fairy(),
  "avatar-farmer": s_avatar_farmer(),
  "avatar-firefighter": s_avatar_firefighter(),
  "avatar-flamingo": s_avatar_flamingo(),
  "avatar-flower": s_avatar_flower(),
  "avatar-fox": s_avatar_fox(),
  "avatar-frog": s_avatar_frog(),
  "avatar-gamepad": s_avatar_gamepad(),
  "avatar-genie": s_avatar_genie(),
  "avatar-goblin": s_avatar_goblin(),
  "avatar-graduate": s_avatar_graduate(),
  "avatar-hamster": s_avatar_hamster(),
  "avatar-headphones": s_avatar_headphones(),
  "avatar-hedgehog": s_avatar_hedgehog(),
  "avatar-icecream": s_avatar_icecream(),
  "avatar-jellyfish": s_avatar_jellyfish(),
  "avatar-koala": s_avatar_koala(),
  "avatar-ladybug": s_avatar_ladybug(),
  "avatar-lamp": s_avatar_lamp(),
  "avatar-leaf": s_avatar_leaf(),
  "avatar-mermaid": s_avatar_mermaid(),
  "avatar-mood-cool": s_avatar_mood_cool(),
  "avatar-mood-dizzy": s_avatar_mood_dizzy(),
  "avatar-mood-grumpy": s_avatar_mood_grumpy(),
  "avatar-mood-happy": s_avatar_mood_happy(),
  "avatar-mood-love": s_avatar_mood_love(),
  "avatar-mood-shy": s_avatar_mood_shy(),
  "avatar-mood-sleepy": s_avatar_mood_sleepy(),
  "avatar-mood-wink": s_avatar_mood_wink(),
  "avatar-moon": s_avatar_moon(),
  "avatar-mouse": s_avatar_mouse(),
  "avatar-mummy": s_avatar_mummy(),
  "avatar-ninja": s_avatar_ninja(),
  "avatar-octopus": s_avatar_octopus(),
  "avatar-ogre": s_avatar_ogre(),
  "avatar-panda": s_avatar_panda(),
  "avatar-phoenix": s_avatar_phoenix(),
  "avatar-pilot": s_avatar_pilot(),
  "avatar-pirate": s_avatar_pirate(),
  "avatar-pizza": s_avatar_pizza(),
  "avatar-planet": s_avatar_planet(),
  "avatar-potion": s_avatar_potion(),
  "avatar-pumpkin": s_avatar_pumpkin(),
  "avatar-raccoon": s_avatar_raccoon(),
  "avatar-rainbow": s_avatar_rainbow(),
  "avatar-rockstar": s_avatar_rockstar(),
  "avatar-sailor": s_avatar_sailor(),
  "avatar-samurai": s_avatar_samurai(),
  "avatar-scientist": s_avatar_scientist(),
  "avatar-sloth": s_avatar_sloth(),
  "avatar-snail": s_avatar_snail(),
  "avatar-snowflake": s_avatar_snowflake(),
  "avatar-snowman": s_avatar_snowman(),
  "avatar-squirrel": s_avatar_squirrel(),
  "avatar-star": s_avatar_star(),
  "avatar-sun": s_avatar_sun(),
  "avatar-television": s_avatar_television(),
  "avatar-toaster": s_avatar_toaster(),
  "avatar-toucan": s_avatar_toucan(),
  "avatar-unicorn": s_avatar_unicorn(),
  "avatar-vampire": s_avatar_vampire(),
  "avatar-viking": s_avatar_viking(),
  "avatar-werewolf": s_avatar_werewolf(),
  "avatar-whale": s_avatar_whale(),
  "avatar-yeti": s_avatar_yeti(),
  "avatar-zombie": s_avatar_zombie(),
  "monster-anglerto": s_monster_anglerto(),
  "monster-axoloto": s_monster_axoloto(),
  "monster-bambooling": s_monster_bambooling(),
  "monster-basilisko": s_monster_basilisko(),
  "monster-berryling": s_monster_berryling(),
  "monster-blizzo": s_monster_blizzo(),
  "monster-bolto": s_monster_bolto(),
  "monster-bonbono": s_monster_bonbono(),
  "monster-bookling": s_monster_bookling(),
  "monster-bramblet": s_monster_bramblet(),
  "monster-bubblegumo": s_monster_bubblegumo(),
  "monster-candleo": s_monster_candleo(),
  "monster-cheeso": s_monster_cheeso(),
  "monster-chomplo": s_monster_chomplo(),
  "monster-cicado": s_monster_cicado(),
  "monster-claylo": s_monster_claylo(),
  "monster-clovero": s_monster_clovero(),
  "monster-cogling": s_monster_cogling(),
  "monster-cometo": s_monster_cometo(),
  "monster-coraling": s_monster_coraling(),
  "monster-crumblet": s_monster_crumblet(),
  "monster-cupcako": s_monster_cupcako(),
  "monster-dewo": s_monster_dewo(),
  "monster-donuto": s_monster_donuto(),
  "monster-drizzlo": s_monster_drizzlo(),
  "monster-duneo": s_monster_duneo(),
  "monster-eclipseo": s_monster_eclipseo(),
  "monster-fernling": s_monster_fernling(),
  "monster-frosto": s_monster_frosto(),
  "monster-galaxo": s_monster_galaxo(),
  "monster-gargoylo": s_monster_gargoylo(),
  "monster-geckolo": s_monster_geckolo(),
  "monster-ghostling": s_monster_ghostling(),
  "monster-gingero": s_monster_gingero(),
  "monster-glitchling": s_monster_glitchling(),
  "monster-griffling": s_monster_griffling(),
  "monster-hailo": s_monster_hailo(),
  "monster-hedgo": s_monster_hedgo(),
  "monster-honeyo": s_monster_honeyo(),
  "monster-iceling": s_monster_iceling(),
  "monster-jellop": s_monster_jellop(),
  "monster-kelpo": s_monster_kelpo(),
  "monster-kitsuno": s_monster_kitsuno(),
  "monster-lanternoo": s_monster_lanternoo(),
  "monster-lavaling": s_monster_lavaling(),
  "monster-leafo": s_monster_leafo(),
  "monster-lichling": s_monster_lichling(),
  "monster-lotuso": s_monster_lotuso(),
  "monster-magneto": s_monster_magneto(),
  "monster-marshmo": s_monster_marshmo(),
  "monster-melono": s_monster_melono(),
  "monster-merming": s_monster_merming(),
  "monster-meteorling": s_monster_meteorling(),
  "monster-mirrorling": s_monster_mirrorling(),
  "monster-mistling": s_monster_mistling(),
  "monster-mossyo": s_monster_mossyo(),
  "monster-muffino": s_monster_muffino(),
  "monster-nebulo": s_monster_nebulo(),
  "monster-noodlo": s_monster_noodlo(),
  "monster-octopo": s_monster_octopo(),
  "monster-onigo": s_monster_onigo(),
  "monster-orbito": s_monster_orbito(),
  "monster-otterling": s_monster_otterling(),
  "monster-pangolo": s_monster_pangolo(),
  "monster-papero": s_monster_papero(),
  "monster-pengo": s_monster_pengo(),
  "monster-phoenixling": s_monster_phoenixling(),
  "monster-pixo": s_monster_pixo(),
  "monster-planetling": s_monster_planetling(),
  "monster-plumpling": s_monster_plumpling(),
  "monster-popcorning": s_monster_popcorning(),
  "monster-puddingo": s_monster_puddingo(),
  "monster-quillo": s_monster_quillo(),
  "monster-rainbowling": s_monster_rainbowling(),
  "monster-rubberto": s_monster_rubberto(),
  "monster-salamango": s_monster_salamango(),
  "monster-seaho": s_monster_seaho(),
  "monster-shelmo": s_monster_shelmo(),
  "monster-slotho": s_monster_slotho(),
  "monster-snailo": s_monster_snailo(),
  "monster-snowpo": s_monster_snowpo(),
  "monster-spongo": s_monster_spongo(),
  "monster-squido": s_monster_squido(),
  "monster-stalacto": s_monster_stalacto(),
  "monster-stormling": s_monster_stormling(),
  "monster-sunling": s_monster_sunling(),
  "monster-teapo": s_monster_teapo(),
  "monster-thistlo": s_monster_thistlo(),
  "monster-toasto": s_monster_toasto(),
  "monster-tortoiso": s_monster_tortoiso(),
  "monster-tulipo": s_monster_tulipo(),
  "monster-tundro": s_monster_tundro(),
  "monster-umbrello": s_monster_umbrello(),
  "monster-vesperto": s_monster_vesperto(),
  "monster-vineling": s_monster_vineling(),
  "monster-volcling": s_monster_volcling(),
  "monster-wasabio": s_monster_wasabio(),
  "monster-yetling": s_monster_yetling(),
  "monster-zephyro": s_monster_zephyro(),
  "monster-zigzago": s_monster_zigzago(),
  "elemental-ash": s_elemental_ash(),
  "elemental-aurora": s_elemental_aurora(),
  "elemental-basalt": s_elemental_basalt(),
  "elemental-beacon": s_elemental_beacon(),
  "elemental-bloom": s_elemental_bloom(),
  "elemental-brine": s_elemental_brine(),
  "elemental-bronze": s_elemental_bronze(),
  "elemental-bubble": s_elemental_bubble(),
  "elemental-chaos": s_elemental_chaos(),
  "elemental-chrono": s_elemental_chrono(),
  "elemental-comet": s_elemental_comet(),
  "elemental-copper": s_elemental_copper(),
  "elemental-crystal": s_elemental_crystal(),
  "elemental-dawn": s_elemental_dawn(),
  "elemental-decay": s_elemental_decay(),
  "elemental-dew": s_elemental_dew(),
  "elemental-dune": s_elemental_dune(),
  "elemental-dust": s_elemental_dust(),
  "elemental-eclipse": s_elemental_eclipse(),
  "elemental-ether": s_elemental_ether(),
  "elemental-fern": s_elemental_fern(),
  "elemental-firefly": s_elemental_firefly(),
  "elemental-foam": s_elemental_foam(),
  "elemental-fog": s_elemental_fog(),
  "elemental-fungus": s_elemental_fungus(),
  "elemental-galaxy": s_elemental_galaxy(),
  "elemental-geode": s_elemental_geode(),
  "elemental-geyser": s_elemental_geyser(),
  "elemental-glacier": s_elemental_glacier(),
  "elemental-glass": s_elemental_glass(),
  "elemental-glitch": s_elemental_glitch(),
  "elemental-gold": s_elemental_gold(),
  "elemental-granite": s_elemental_granite(),
  "elemental-gravity": s_elemental_gravity(),
  "elemental-hail": s_elemental_hail(),
  "elemental-halo": s_elemental_halo(),
  "elemental-honey": s_elemental_honey(),
  "elemental-hourglass": s_elemental_hourglass(),
  "elemental-ice": s_elemental_ice(),
  "elemental-ink": s_elemental_ink(),
  "elemental-iron": s_elemental_iron(),
  "elemental-ivory": s_elemental_ivory(),
  "elemental-jade": s_elemental_jade(),
  "elemental-lantern": s_elemental_lantern(),
  "elemental-lava": s_elemental_lava(),
  "elemental-mercury": s_elemental_mercury(),
  "elemental-meteor": s_elemental_meteor(),
  "elemental-mirage": s_elemental_mirage(),
  "elemental-mirror": s_elemental_mirror(),
  "elemental-mist": s_elemental_mist(),
  "elemental-monsoon": s_elemental_monsoon(),
  "elemental-moon": s_elemental_moon(),
  "elemental-nebula": s_elemental_nebula(),
  "elemental-neon": s_elemental_neon(),
  "elemental-nova": s_elemental_nova(),
  "elemental-obsidian": s_elemental_obsidian(),
  "elemental-ocean": s_elemental_ocean(),
  "elemental-oil": s_elemental_oil(),
  "elemental-opal": s_elemental_opal(),
  "elemental-orbit": s_elemental_orbit(),
  "elemental-ozone": s_elemental_ozone(),
  "elemental-paper": s_elemental_paper(),
  "elemental-pearl": s_elemental_pearl(),
  "elemental-petal": s_elemental_petal(),
  "elemental-plasma": s_elemental_plasma(),
  "elemental-pollen": s_elemental_pollen(),
  "elemental-prism": s_elemental_prism(),
  "elemental-pulse": s_elemental_pulse(),
  "elemental-quasar": s_elemental_quasar(),
  "elemental-quicksand": s_elemental_quicksand(),
  "elemental-rainbow": s_elemental_rainbow(),
  "elemental-reef": s_elemental_reef(),
  "elemental-ripple": s_elemental_ripple(),
  "elemental-river": s_elemental_river(),
  "elemental-root": s_elemental_root(),
  "elemental-rust": s_elemental_rust(),
  "elemental-salt": s_elemental_salt(),
  "elemental-shimmer": s_elemental_shimmer(),
  "elemental-silk": s_elemental_silk(),
  "elemental-silver": s_elemental_silver(),
  "elemental-sleet": s_elemental_sleet(),
  "elemental-smoke": s_elemental_smoke(),
  "elemental-snow": s_elemental_snow(),
  "elemental-solar": s_elemental_solar(),
  "elemental-spark": s_elemental_spark(),
  "elemental-spore": s_elemental_spore(),
  "elemental-star": s_elemental_star(),
  "elemental-static": s_elemental_static(),
  "elemental-steam": s_elemental_steam(),
  "elemental-steel": s_elemental_steel(),
  "elemental-stone": s_elemental_stone(),
  "elemental-storm": s_elemental_storm(),
  "elemental-sulfur": s_elemental_sulfur(),
  "elemental-tar": s_elemental_tar(),
  "elemental-thunder": s_elemental_thunder(),
  "elemental-twilight": s_elemental_twilight(),
  "elemental-vein": s_elemental_vein(),
  "elemental-vine": s_elemental_vine(),
  "elemental-vortex": s_elemental_vortex(),
  "elemental-wisp": s_elemental_wisp(),
  "texture-abalone": s_texture_abalone(),
  "texture-barcode": s_texture_barcode(),
  "texture-basalt-columns": s_texture_basalt_columns(),
  "texture-batik": s_texture_batik(),
  "texture-beetle-shell": s_texture_beetle_shell(),
  "texture-brushed-steel": s_texture_brushed_steel(),
  "texture-burl": s_texture_burl(),
  "texture-burlap": s_texture_burlap(),
  "texture-butterfly-wing": s_texture_butterfly_wing(),
  "texture-cardboard": s_texture_cardboard(),
  "texture-chainmail": s_texture_chainmail(),
  "texture-chalkboard": s_texture_chalkboard(),
  "texture-charcoal-sketch": s_texture_charcoal_sketch(),
  "texture-circuit-board": s_texture_circuit_board(),
  "texture-cobblestone": s_texture_cobblestone(),
  "texture-coffee-stain": s_texture_coffee_stain(),
  "texture-concrete": s_texture_concrete(),
  "texture-condensation": s_texture_condensation(),
  "texture-coral": s_texture_coral(),
  "texture-corduroy": s_texture_corduroy(),
  "texture-cow-hide": s_texture_cow_hide(),
  "texture-cracked-mud": s_texture_cracked_mud(),
  "texture-crochet": s_texture_crochet(),
  "texture-crocodile": s_texture_crocodile(),
  "texture-crumpled-paper": s_texture_crumpled_paper(),
  "texture-damascus-steel": s_texture_damascus_steel(),
  "texture-dragon-scale": s_texture_dragon_scale(),
  "texture-driftwood": s_texture_driftwood(),
  "texture-dunes": s_texture_dunes(),
  "texture-feathers": s_texture_feathers(),
  "texture-fern": s_texture_fern(),
  "texture-flagstone": s_texture_flagstone(),
  "texture-foam-bubbles": s_texture_foam_bubbles(),
  "texture-frost": s_texture_frost(),
  "texture-frosted-glass": s_texture_frosted_glass(),
  "texture-fur": s_texture_fur(),
  "texture-geode": s_texture_geode(),
  "texture-glaze-crackle": s_texture_glaze_crackle(),
  "texture-gold-foil": s_texture_gold_foil(),
  "texture-granite": s_texture_granite(),
  "texture-graphite": s_texture_graphite(),
  "texture-grass": s_texture_grass(),
  "texture-guilloche": s_texture_guilloche(),
  "texture-hammered-copper": s_texture_hammered_copper(),
  "texture-herringbone": s_texture_herringbone(),
  "texture-honeycomb": s_texture_honeycomb(),
  "texture-houndstooth": s_texture_houndstooth(),
  "texture-ice-cracks": s_texture_ice_cracks(),
  "texture-ikat": s_texture_ikat(),
  "texture-ink-wash": s_texture_ink_wash(),
  "texture-ivy": s_texture_ivy(),
  "texture-lace": s_texture_lace(),
  "texture-lava-crust": s_texture_lava_crust(),
  "texture-leather": s_texture_leather(),
  "texture-leaves": s_texture_leaves(),
  "texture-leopard-rosettes": s_texture_leopard_rosettes(),
  "texture-lichen": s_texture_lichen(),
  "texture-linen": s_texture_linen(),
  "texture-macrame": s_texture_macrame(),
  "texture-mosaic-tile": s_texture_mosaic_tile(),
  "texture-moss": s_texture_moss(),
  "texture-nebula": s_texture_nebula(),
  "texture-obsidian": s_texture_obsidian(),
  "texture-paisley": s_texture_paisley(),
  "texture-papyrus": s_texture_papyrus(),
  "texture-parquet": s_texture_parquet(),
  "texture-patina-bronze": s_texture_patina_bronze(),
  "texture-pearls": s_texture_pearls(),
  "texture-pebbles": s_texture_pebbles(),
  "texture-pine-needles": s_texture_pine_needles(),
  "texture-pixel-dither": s_texture_pixel_dither(),
  "texture-quartz-cluster": s_texture_quartz_cluster(),
  "texture-rain-droplets": s_texture_rain_droplets(),
  "texture-rattan": s_texture_rattan(),
  "texture-rice-paper": s_texture_rice_paper(),
  "texture-risograph": s_texture_risograph(),
  "texture-rust": s_texture_rust(),
  "texture-salt-flats": s_texture_salt_flats(),
  "texture-sandstone": s_texture_sandstone(),
  "texture-sashiko": s_texture_sashiko(),
  "texture-scales": s_texture_scales(),
  "texture-scanlines": s_texture_scanlines(),
  "texture-seed-head": s_texture_seed_head(),
  "texture-sequins": s_texture_sequins(),
  "texture-shells": s_texture_shells(),
  "texture-shibori": s_texture_shibori(),
  "texture-slate": s_texture_slate(),
  "texture-snakeskin": s_texture_snakeskin(),
  "texture-snow": s_texture_snow(),
  "texture-straw": s_texture_straw(),
  "texture-suede": s_texture_suede(),
  "texture-terracotta": s_texture_terracotta(),
  "texture-tie-dye": s_texture_tie_dye(),
  "texture-tiger-stripes": s_texture_tiger_stripes(),
  "texture-topographic": s_texture_topographic(),
  "texture-tortoiseshell": s_texture_tortoiseshell(),
  "texture-tweed": s_texture_tweed(),
  "texture-velvet": s_texture_velvet(),
  "texture-wood-grain": s_texture_wood_grain(),
  "texture-zebra": s_texture_zebra(),
  "loader-atom-orbits": s_loader_atom_orbits,
  "loader-aurora-shift": s_loader_aurora_shift,
  "loader-balloon-bob": s_loader_balloon_bob,
  "loader-battery-fill": s_loader_battery_fill,
  "loader-binary-scroll": s_loader_binary_scroll,
  "loader-black-hole": s_loader_black_hole,
  "loader-bokeh-blur": s_loader_bokeh_blur,
  "loader-bracket-orbit": s_loader_bracket_orbit,
  "loader-bubble-rise": s_loader_bubble_rise,
  "loader-bulb-flicker": s_loader_bulb_flicker,
  "loader-butterfly-flap": s_loader_butterfly_flap,
  "loader-card-flip3d": s_loader_card_flip3d,
  "loader-cassette-reels": s_loader_cassette_reels,
  "loader-checkmark-draw": s_loader_checkmark_draw,
  "loader-circle-trace": s_loader_circle_trace,
  "loader-clock-hands": s_loader_clock_hands,
  "loader-cocktail-stir": s_loader_cocktail_stir,
  "loader-code-blocks": s_loader_code_blocks,
  "loader-coffee-steam": s_loader_coffee_steam,
  "loader-comet-tail": s_loader_comet_tail,
  "loader-compass-needle": s_loader_compass_needle,
  "loader-count-up": s_loader_count_up,
  "loader-dice-tumble": s_loader_dice_tumble,
  "loader-dna-helix": s_loader_dna_helix,
  "loader-domino-fall": s_loader_domino_fall,
  "loader-dot-grid-wave": s_loader_dot_grid_wave,
  "loader-droplet-drip": s_loader_droplet_drip,
  "loader-ember-rise": s_loader_ember_rise,
  "loader-equalizer": s_loader_equalizer,
  "loader-fan-blades": s_loader_fan_blades,
  "loader-fidget-spinner": s_loader_fidget_spinner,
  "loader-firefly-drift": s_loader_firefly_drift,
  "loader-fish-school": s_loader_fish_school,
  "loader-gear-turn": s_loader_gear_turn,
  "loader-glitch-text": s_loader_glitch_text,
  "loader-globe-meridians": s_loader_globe_meridians,
  "loader-hammer-pulse": s_loader_hammer_pulse,
  "loader-heart-pulse": s_loader_heart_pulse,
  "loader-heartbeat-line": s_loader_heartbeat_line,
  "loader-hexagon-cluster": s_loader_hexagon_cluster,
  "loader-infinity-trace": s_loader_infinity_trace,
  "loader-jellyfish-bob": s_loader_jellyfish_bob,
  "loader-kaleidoscope": s_loader_kaleidoscope,
  "loader-ladder-climb": s_loader_ladder_climb,
  "loader-letter-bounce": s_loader_letter_bounce,
  "loader-lightning-bolt": s_loader_lightning_bolt,
  "loader-lissajous-dot": s_loader_lissajous_dot,
  "loader-magnifier-scan": s_loader_magnifier_scan,
  "loader-map-pin-bounce": s_loader_map_pin_bounce,
  "loader-matrix-rain": s_loader_matrix_rain,
  "loader-meteor-shower": s_loader_meteor_shower,
  "loader-mixer-faders": s_loader_mixer_faders,
  "loader-moon-phases": s_loader_moon_phases,
  "loader-neon-flicker": s_loader_neon_flicker,
  "loader-newton-cradle": s_loader_newton_cradle,
  "loader-orbit-moons": s_loader_orbit_moons,
  "loader-oscilloscope": s_loader_oscilloscope,
  "loader-pacman-chomp": s_loader_pacman_chomp,
  "loader-paper-plane": s_loader_paper_plane,
  "loader-pendulum-swing": s_loader_pendulum_swing,
  "loader-percent-ring": s_loader_percent_ring,
  "loader-pinwheel": s_loader_pinwheel,
  "loader-pizza-spin": s_loader_pizza_spin,
  "loader-prism-split": s_loader_prism_split,
  "loader-propeller": s_loader_propeller,
  "loader-radar-sweep": s_loader_radar_sweep,
  "loader-radio-tuner": s_loader_radio_tuner,
  "loader-rain-cloud": s_loader_rain_cloud,
  "loader-ripple-pond": s_loader_ripple_pond,
  "loader-rocket-launch": s_loader_rocket_launch,
  "loader-rubik-cube": s_loader_rubik_cube,
  "loader-satellite-dish": s_loader_satellite_dish,
  "loader-saturn-ring": s_loader_saturn_ring,
  "loader-seismo-bars": s_loader_seismo_bars,
  "loader-shine-bar": s_loader_shine_bar,
  "loader-shooting-star": s_loader_shooting_star,
  "loader-signature-loop": s_loader_signature_loop,
  "loader-spiral-swirl": s_loader_spiral_swirl,
  "loader-square-draw": s_loader_square_draw,
  "loader-square-fold": s_loader_square_fold,
  "loader-stack-cubes": s_loader_stack_cubes,
  "loader-stairs-bounce": s_loader_stairs_bounce,
  "loader-step-segments": s_loader_step_segments,
  "loader-sun-rays": s_loader_sun_rays,
  "loader-target-lock": s_loader_target_lock,
  "loader-terminal-cursor": s_loader_terminal_cursor,
  "loader-thermo-fill": s_loader_thermo_fill,
  "loader-toast-pop": s_loader_toast_pop,
  "loader-triangle-spin": s_loader_triangle_spin,
  "loader-twinkle-field": s_loader_twinkle_field,
  "loader-typing-cursor": s_loader_typing_cursor,
  "loader-ufo-beam": s_loader_ufo_beam,
  "loader-vinyl-spin": s_loader_vinyl_spin,
  "loader-vu-meter": s_loader_vu_meter,
  "loader-waterfall-dots": s_loader_waterfall_dots,
  "loader-wave-lines": s_loader_wave_lines,
  "loader-wifi-arcs": s_loader_wifi_arcs,
  "loader-windmill": s_loader_windmill,
  "loader-yin-yang": s_loader_yin_yang,
  "loader-zigzag-runner": s_loader_zigzag_runner,
  "button-accordion-expand": s_button_accordion_expand,
  "button-airplane-mode": s_button_airplane_mode,
  "button-api-call": s_button_api_call,
  "button-arcade-start": s_button_arcade_start,
  "button-arrow-nudge": s_button_arrow_nudge,
  "button-balloon-pop": s_button_balloon_pop,
  "button-battery-charge": s_button_battery_charge,
  "button-bell-badge": s_button_bell_badge,
  "button-bluetooth-pair": s_button_bluetooth_pair,
  "button-bookmark-save": s_button_bookmark_save,
  "button-brutalist-shift": s_button_brutalist_shift,
  "button-bubble-wrap": s_button_bubble_wrap,
  "button-camera-flash": s_button_camera_flash,
  "button-carousel-next": s_button_carousel_next,
  "button-cart-add": s_button_cart_add,
  "button-chat-bubble": s_button_chat_bubble,
  "button-ci-pipeline": s_button_ci_pipeline,
  "button-clap-count": s_button_clap_count,
  "button-code-execute": s_button_code_execute,
  "button-coin-flip": s_button_coin_flip,
  "button-color-cycle": s_button_color_cycle,
  "button-compass-navigate": s_button_compass_navigate,
  "button-confetti-pop": s_button_confetti_pop,
  "button-console-log": s_button_console_log,
  "button-corners-accent": s_button_corners_accent,
  "button-counter-tap": s_button_counter_tap,
  "button-crystal-glow": s_button_crystal_glow,
  "button-dark-mode-switch": s_button_dark_mode_switch,
  "button-dial-rotate": s_button_dial_rotate,
  "button-dice-roll": s_button_dice_roll,
  "button-door-open": s_button_door_open,
  "button-double-layer-text": s_button_double_layer_text,
  "button-download-progress": s_button_download_progress,
  "button-drum-pad": s_button_drum_pad,
  "button-eject-disc": s_button_eject_disc,
  "button-emoji-picker-pill": s_button_emoji_picker_pill,
  "button-fan-speed": s_button_fan_speed,
  "button-firework-burst": s_button_firework_burst,
  "button-flip-card": s_button_flip_card,
  "button-fold-unfold": s_button_fold_unfold,
  "button-follow-slide": s_button_follow_slide,
  "button-fortune-cookie": s_button_fortune_cookie,
  "button-gamepad-dpad": s_button_gamepad_dpad,
  "button-git-commit": s_button_git_commit,
  "button-glitch-text": s_button_glitch_text,
  "button-gradient-border-rotate": s_button_gradient_border_rotate,
  "button-gradient-mixer": s_button_gradient_mixer,
  "button-heart-burst": s_button_heart_burst,
  "button-hold-to-confirm": s_button_hold_to_confirm,
  "button-hologram-scan": s_button_hologram_scan,
  "button-hue-picker": s_button_hue_picker,
  "button-icon-morph": s_button_icon_morph,
  "button-jelly-press": s_button_jelly_press,
  "button-joystick-move": s_button_joystick_move,
  "button-keyboard-key": s_button_keyboard_key,
  "button-lang-toggle": s_button_lang_toggle,
  "button-lava-lamp": s_button_lava_lamp,
  "button-lever-pull": s_button_lever_pull,
  "button-lightbulb-toggle": s_button_lightbulb_toggle,
  "button-liquid-fill": s_button_liquid_fill,
  "button-magic-orb": s_button_magic_orb,
  "button-magnet-hover": s_button_magnet_hover,
  "button-mail-send": s_button_mail_send,
  "button-map-zoom": s_button_map_zoom,
  "button-mic-record": s_button_mic_record,
  "button-neumorphic-dent": s_button_neumorphic_dent,
  "button-password-reveal": s_button_password_reveal,
  "button-piano-key": s_button_piano_key,
  "button-pin-drop": s_button_pin_drop,
  "button-plasma-ball": s_button_plasma_ball,
  "button-play-pause-morph": s_button_play_pause_morph,
  "button-power-toggle": s_button_power_toggle,
  "button-pulse-ring": s_button_pulse_ring,
  "button-reaction-bar": s_button_reaction_bar,
  "button-repeat-loop": s_button_repeat_loop,
  "button-ripple-click": s_button_ripple_click,
  "button-rocket-launch": s_button_rocket_launch,
  "button-segmented-control": s_button_segmented_control,
  "button-server-status": s_button_server_status,
  "button-shadow-stack": s_button_shadow_stack,
  "button-shine-sweep": s_button_shine_sweep,
  "button-shuffle-playlist": s_button_shuffle_playlist,
  "button-skew-slide": s_button_skew_slide,
  "button-skip-track": s_button_skip_track,
  "button-slot-machine": s_button_slot_machine,
  "button-speed-dial": s_button_speed_dial,
  "button-star-rating": s_button_star_rating,
  "button-tab-switcher": s_button_tab_switcher,
  "button-tag-add": s_button_tag_add,
  "button-terminal-type": s_button_terminal_type,
  "button-text-scramble": s_button_text_scramble,
  "button-theme-chips": s_button_theme_chips,
  "button-upload-pulse": s_button_upload_pulse,
  "button-vinyl-spin": s_button_vinyl_spin,
  "button-volume-slider": s_button_volume_slider,
  "button-vote-arrows": s_button_vote_arrows,
  "button-webhook-send": s_button_webhook_send,
  "button-whack-a-mole": s_button_whack_a_mole,
  "button-wifi-connect": s_button_wifi_connect,
  "button-window-minimize": s_button_window_minimize,
  "effect-accordion-glow": s_effect_accordion_glow,
  "effect-avatar-stack-fan": s_effect_avatar_stack_fan,
  "effect-binary-clock": s_effect_binary_clock,
  "effect-black-hole-vortex": s_effect_black_hole_vortex,
  "effect-blob-cursor-follow": s_effect_blob_cursor_follow,
  "effect-bubble-rise": s_effect_bubble_rise,
  "effect-button-3d-press": s_effect_button_3d_press,
  "effect-campfire-embers": s_effect_campfire_embers,
  "effect-candle-flame": s_effect_candle_flame,
  "effect-checkbox-draw-check": s_effect_checkbox_draw_check,
  "effect-circle-wipe-reveal": s_effect_circle_wipe_reveal,
  "effect-compass-needle": s_effect_compass_needle,
  "effect-confetti-burst-panel": s_effect_confetti_burst_panel,
  "effect-countdown-flip": s_effect_countdown_flip,
  "effect-counter-roll-up": s_effect_counter_roll_up,
  "effect-cursor-trail-sparkles": s_effect_cursor_trail_sparkles,
  "effect-curtain-lights": s_effect_curtain_lights,
  "effect-diagonal-wipe-reveal": s_effect_diagonal_wipe_reveal,
  "effect-dna-helix": s_effect_dna_helix,
  "effect-dot-bounce-grid": s_effect_dot_bounce_grid,
  "effect-dot-matrix-board": s_effect_dot_matrix_board,
  "effect-dropdown-fade-scale": s_effect_dropdown_fade_scale,
  "effect-eclipse-corona": s_effect_eclipse_corona,
  "effect-energy-shield-hit": s_effect_energy_shield_hit,
  "effect-equalizer-bars": s_effect_equalizer_bars,
  "effect-expanding-search-bar": s_effect_expanding_search_bar,
  "effect-eye-follow-cursor": s_effect_eye_follow_cursor,
  "effect-fab-speed-dial": s_effect_fab_speed_dial,
  "effect-film-grain-flicker": s_effect_film_grain_flicker,
  "effect-fire-text": s_effect_fire_text,
  "effect-folder-open-hover": s_effect_folder_open_hover,
  "effect-galaxy-swirl-panel": s_effect_galaxy_swirl_panel,
  "effect-gradient-ring-loader": s_effect_gradient_ring_loader,
  "effect-gravity-drop-in": s_effect_gravity_drop_in,
  "effect-gyroscope-rings": s_effect_gyroscope_rings,
  "effect-heart-beat-pulse": s_effect_heart_beat_pulse,
  "effect-holo-scan-portrait": s_effect_holo_scan_portrait,
  "effect-hourglass-sand": s_effect_hourglass_sand,
  "effect-ice-frost-card": s_effect_ice_frost_card,
  "effect-image-compare-slider": s_effect_image_compare_slider,
  "effect-ink-bleed-reveal": s_effect_ink_bleed_reveal,
  "effect-iris-transition": s_effect_iris_transition,
  "effect-jelly-wobble": s_effect_jelly_wobble,
  "effect-kaleidoscope-panel": s_effect_kaleidoscope_panel,
  "effect-kinetic-marquee-ticker": s_effect_kinetic_marquee_ticker,
  "effect-lava-lamp-panel": s_effect_lava_lamp_panel,
  "effect-lightbox-zoom": s_effect_lightbox_zoom,
  "effect-lightning-storm": s_effect_lightning_storm,
  "effect-loading-bar-striped": s_effect_loading_bar_striped,
  "effect-lunar-phases": s_effect_lunar_phases,
  "effect-map-pin-drop": s_effect_map_pin_drop,
  "effect-matrix-code-mini": s_effect_matrix_code_mini,
  "effect-modal-glass-pop": s_effect_modal_glass_pop,
  "effect-mosaic-tile-reveal": s_effect_mosaic_tile_reveal,
  "effect-neon-switch-toggle": s_effect_neon_switch_toggle,
  "effect-night-city-windows": s_effect_night_city_windows,
  "effect-orbit-spinner": s_effect_orbit_spinner,
  "effect-page-curtain-load": s_effect_page_curtain_load,
  "effect-parallax-layers": s_effect_parallax_layers,
  "effect-pendulum-swing": s_effect_pendulum_swing,
  "effect-piano-keys-hover": s_effect_piano_keys_hover,
  "effect-pinwheel-spin": s_effect_pinwheel_spin,
  "effect-pixelate-transition": s_effect_pixelate_transition,
  "effect-plasma-panel": s_effect_plasma_panel,
  "effect-polaroid-scatter-gallery": s_effect_polaroid_scatter_gallery,
  "effect-pricing-popular-glow": s_effect_pricing_popular_glow,
  "effect-progress-ring-timer": s_effect_progress_ring_timer,
  "effect-radar-sweep": s_effect_radar_sweep,
  "effect-radial-menu-expand": s_effect_radial_menu_expand,
  "effect-rain-window-panel": s_effect_rain_window_panel,
  "effect-rating-stars-hover": s_effect_rating_stars_hover,
  "effect-receipt-zigzag": s_effect_receipt_zigzag,
  "effect-rubber-band-hover": s_effect_rubber_band_hover,
  "effect-scratch-card": s_effect_scratch_card,
  "effect-scroll-progress-topbar": s_effect_scroll_progress_topbar,
  "effect-smoke-wisps": s_effect_smoke_wisps,
  "effect-snow-globe-panel": s_effect_snow_globe_panel,
  "effect-sonar-ping": s_effect_sonar_ping,
  "effect-split-text-lines": s_effect_split_text_lines,
  "effect-springy-icon-bounce": s_effect_springy_icon_bounce,
  "effect-starfield-panel": s_effect_starfield_panel,
  "effect-steam-mug": s_effect_steam_mug,
  "effect-step-progress-tracker": s_effect_step_progress_tracker,
  "effect-sticky-note-peel": s_effect_sticky_note_peel,
  "effect-sun-cloud-weather": s_effect_sun_cloud_weather,
  "effect-tabs-indicator-slide": s_effect_tabs_indicator_slide,
  "effect-tag-chip-pop": s_effect_tag_chip_pop,
  "effect-terminal-typewriter": s_effect_terminal_typewriter,
  "effect-text-scramble-decode": s_effect_text_scramble_decode,
  "effect-ticket-notch-card": s_effect_ticket_notch_card,
  "effect-tilt-glare-card": s_effect_tilt_glare_card,
  "effect-toast-slide-stack": s_effect_toast_slide_stack,
  "effect-tooltip-bubble-pop": s_effect_tooltip_bubble_pop,
  "effect-typographic-wave": s_effect_typographic_wave,
  "effect-volume-knob-rotate": s_effect_volume_knob_rotate,
  "effect-wave-flag": s_effect_wave_flag,
  "effect-waveform-line": s_effect_waveform_line,
  "effect-wind-turbine-spin": s_effect_wind_turbine_spin,
  "effect-xmas-light-string": s_effect_xmas_light_string,
  "effect-zoom-blur-enter": s_effect_zoom_blur_enter,
  "motion-abacus-beads": s_motion_abacus_beads,
  "motion-accordion-pulse": s_motion_accordion_pulse,
  "motion-audio-bars": s_motion_audio_bars,
  "motion-balance-scale": s_motion_balance_scale,
  "motion-balloon-rise": s_motion_balloon_rise,
  "motion-bar-race": s_motion_bar_race,
  "motion-battery-charge": s_motion_battery_charge,
  "motion-bounce-cascade": s_motion_bounce_cascade,
  "motion-bubble-rise": s_motion_bubble_rise,
  "motion-card-shuffle": s_motion_card_shuffle,
  "motion-carousel-loop": s_motion_carousel_loop,
  "motion-cart-bounce": s_motion_cart_bounce,
  "motion-chat-typewriter": s_motion_chat_typewriter,
  "motion-checkbox-draw": s_motion_checkbox_draw,
  "motion-claw-machine": s_motion_claw_machine,
  "motion-cloud-drift": s_motion_cloud_drift,
  "motion-coffee-steam": s_motion_coffee_steam,
  "motion-compass-needle": s_motion_compass_needle,
  "motion-conveyor-belt": s_motion_conveyor_belt,
  "motion-countdown-ring": s_motion_countdown_ring,
  "motion-crane-hook": s_motion_crane_hook,
  "motion-curtain-rise": s_motion_curtain_rise,
  "motion-day-night": s_motion_day_night,
  "motion-dice-roll": s_motion_dice_roll,
  "motion-dna-helix": s_motion_dna_helix,
  "motion-domino-fall": s_motion_domino_fall,
  "motion-dot-loader": s_motion_dot_loader,
  "motion-download-tray": s_motion_download_tray,
  "motion-dribble-ball": s_motion_dribble_ball,
  "motion-dropdown-menu": s_motion_dropdown_menu,
  "motion-elevator-floors": s_motion_elevator_floors,
  "motion-escalator-steps": s_motion_escalator_steps,
  "motion-ferris-wheel": s_motion_ferris_wheel,
  "motion-firefly-drift": s_motion_firefly_drift,
  "motion-fish-school": s_motion_fish_school,
  "motion-flight-path": s_motion_flight_path,
  "motion-flip-clock": s_motion_flip_clock,
  "motion-gear-train": s_motion_gear_train,
  "motion-gravity-drop": s_motion_gravity_drop,
  "motion-heartbeat-line": s_motion_heartbeat_line,
  "motion-hourglass-flip": s_motion_hourglass_flip,
  "motion-hydraulic-press": s_motion_hydraulic_press,
  "motion-kaleidoscope": s_motion_kaleidoscope,
  "motion-lava-lamp": s_motion_lava_lamp,
  "motion-led-matrix": s_motion_led_matrix,
  "motion-lighthouse-beam": s_motion_lighthouse_beam,
  "motion-lightning-storm": s_motion_lightning_storm,
  "motion-like-heart": s_motion_like_heart,
  "motion-lottery-drum": s_motion_lottery_drum,
  "motion-marble-run": s_motion_marble_run,
  "motion-metronome": s_motion_metronome,
  "motion-modal-pop": s_motion_modal_pop,
  "motion-moon-phases": s_motion_moon_phases,
  "motion-neon-sign": s_motion_neon_sign,
  "motion-orbit-loader": s_motion_orbit_loader,
  "motion-pacman-chomp": s_motion_pacman_chomp,
  "motion-page-flip": s_motion_page_flip,
  "motion-parachute-drop": s_motion_parachute_drop,
  "motion-piston-engine": s_motion_piston_engine,
  "motion-pong-rally": s_motion_pong_rally,
  "motion-prize-wheel": s_motion_prize_wheel,
  "motion-progress-steps": s_motion_progress_steps,
  "motion-pulley-lift": s_motion_pulley_lift,
  "motion-radar-sweep": s_motion_radar_sweep,
  "motion-rating-stars": s_motion_rating_stars,
  "motion-robot-arm": s_motion_robot_arm,
  "motion-robot-vacuum": s_motion_robot_vacuum,
  "motion-rocket-launch": s_motion_rocket_launch,
  "motion-sailboat-wave": s_motion_sailboat_wave,
  "motion-search-scan": s_motion_search_scan,
  "motion-seismograph": s_motion_seismograph,
  "motion-slot-reels": s_motion_slot_reels,
  "motion-snow-globe": s_motion_snow_globe,
  "motion-solar-orbit": s_motion_solar_orbit,
  "motion-sonar-pulse": s_motion_sonar_pulse,
  "motion-space-invaders": s_motion_space_invaders,
  "motion-spinner-segments": s_motion_spinner_segments,
  "motion-spotlight-sweep": s_motion_spotlight_sweep,
  "motion-square-shuffle": s_motion_square_shuffle,
  "motion-stack-tumble": s_motion_stack_tumble,
  "motion-stadium-wave": s_motion_stadium_wave,
  "motion-star-twinkle": s_motion_star_twinkle,
  "motion-stock-ticker": s_motion_stock_ticker,
  "motion-subway-line": s_motion_subway_line,
  "motion-sync-cycle": s_motion_sync_cycle,
  "motion-tab-indicator": s_motion_tab_indicator,
  "motion-tetris-fall": s_motion_tetris_fall,
  "motion-text-ticker": s_motion_text_ticker,
  "motion-thermostat-dial": s_motion_thermostat_dial,
  "motion-toast-queue": s_motion_toast_queue,
  "motion-toggle-switch": s_motion_toggle_switch,
  "motion-traffic-light": s_motion_traffic_light,
  "motion-ufo-hover": s_motion_ufo_hover,
  "motion-venetian-blind": s_motion_venetian_blind,
  "motion-vinyl-record": s_motion_vinyl_record,
  "motion-volume-knob": s_motion_volume_knob,
  "motion-wave-loader": s_motion_wave_loader,
  "motion-weather-cycle": s_motion_weather_cycle,
  "motion-wifi-signal": s_motion_wifi_signal,
  "motion-windmill-spin": s_motion_windmill_spin,
  "d25-abacus-frame": s_d25_abacus_frame,
  "d25-arcade-cabinet": s_d25_arcade_cabinet,
  "d25-astrolabe-dial": s_d25_astrolabe_dial,
  "d25-basketball-hoop-shot": s_d25_basketball_hoop_shot,
  "d25-bowling-lane": s_d25_bowling_lane,
  "d25-bridge-lift": s_d25_bridge_lift,
  "d25-cable-car-gondola": s_d25_cable_car_gondola,
  "d25-camera-shutter-blades": s_d25_camera_shutter_blades,
  "d25-campfire-depth": s_d25_campfire_depth,
  "d25-card-shuffle-fan": s_d25_card_shuffle_fan,
  "d25-carousel-horses": s_d25_carousel_horses,
  "d25-catapult-launch": s_d25_catapult_launch,
  "d25-ceiling-fan-spin": s_d25_ceiling_fan_spin,
  "d25-chessboard-tilt": s_d25_chessboard_tilt,
  "d25-coin-flipper": s_d25_coin_flipper,
  "d25-compass-needle-float": s_d25_compass_needle_float,
  "d25-coral-reef-layers": s_d25_coral_reef_layers,
  "d25-crane-claw": s_d25_crane_claw,
  "d25-cube-carousel": s_d25_cube_carousel,
  "d25-dam-spillway-gates": s_d25_dam_spillway_gates,
  "d25-dice-tower": s_d25_dice_tower,
  "d25-diorama-room": s_d25_diorama_room,
  "d25-domino-run": s_d25_domino_run,
  "d25-door-gallery": s_d25_door_gallery,
  "d25-dragon-wing-flap": s_d25_dragon_wing_flap,
  "d25-drawbridge": s_d25_drawbridge,
  "d25-earthquake-shake-table": s_d25_earthquake_shake_table,
  "d25-elevator-shaft": s_d25_elevator_shaft,
  "d25-equalizer-bars-3d": s_d25_equalizer_bars_3d,
  "d25-escalator-steps": s_d25_escalator_steps,
  "d25-ferris-wheel": s_d25_ferris_wheel,
  "d25-film-clapperboard": s_d25_film_clapperboard,
  "d25-film-reel-projector": s_d25_film_reel_projector,
  "d25-floating-islands": s_d25_floating_islands,
  "d25-frame-wall": s_d25_frame_wall,
  "d25-garage-door-rollup": s_d25_garage_door_rollup,
  "d25-gramophone-horn": s_d25_gramophone_horn,
  "d25-greeting-card": s_d25_greeting_card,
  "d25-gumball-machine": s_d25_gumball_machine,
  "d25-gyroscope-rings": s_d25_gyroscope_rings,
  "d25-hand-fan-spread": s_d25_hand_fan_spread,
  "d25-harbor-crane-container": s_d25_harbor_crane_container,
  "d25-hot-air-balloon-rise": s_d25_hot_air_balloon_rise,
  "d25-hourglass-flow": s_d25_hourglass_flow,
  "d25-iceberg-cross-section": s_d25_iceberg_cross_section,
  "d25-jellyfish-drift": s_d25_jellyfish_drift,
  "d25-joystick-control": s_d25_joystick_control,
  "d25-jukebox-selection": s_d25_jukebox_selection,
  "d25-kaleidoscope-cone": s_d25_kaleidoscope_cone,
  "d25-kite-in-wind": s_d25_kite_in_wind,
  "d25-lantern-glow-swing": s_d25_lantern_glow_swing,
  "d25-lighthouse-beam": s_d25_lighthouse_beam,
  "d25-mailbox-flag": s_d25_mailbox_flag,
  "d25-mechanical-keyboard": s_d25_mechanical_keyboard,
  "d25-metronome-arm": s_d25_metronome_arm,
  "d25-moon-orbit-ring": s_d25_moon_orbit_ring,
  "d25-page-fold": s_d25_page_fold,
  "d25-paper-cut-landscape": s_d25_paper_cut_landscape,
  "d25-periscope": s_d25_periscope,
  "d25-photo-pile-lift": s_d25_photo_pile_lift,
  "d25-piano-hammer-lift": s_d25_piano_hammer_lift,
  "d25-pin-art-toy": s_d25_pin_art_toy,
  "d25-pinball-flippers": s_d25_pinball_flippers,
  "d25-pinwheel-spin": s_d25_pinwheel_spin,
  "d25-pocket-watch-open": s_d25_pocket_watch_open,
  "d25-portcullis-gate": s_d25_portcullis_gate,
  "d25-prism-beam-split": s_d25_prism_beam_split,
  "d25-radar-sweep-dome": s_d25_radar_sweep_dome,
  "d25-railway-crossing-gate": s_d25_railway_crossing_gate,
  "d25-revolving-door": s_d25_revolving_door,
  "d25-rotary-phone-dial": s_d25_rotary_phone_dial,
  "d25-rubiks-layer-twist": s_d25_rubiks_layer_twist,
  "d25-satellite-dish-tracker": s_d25_satellite_dish_tracker,
  "d25-seesaw-balance": s_d25_seesaw_balance,
  "d25-shadow-theater": s_d25_shadow_theater,
  "d25-skate-halfpipe-rider": s_d25_skate_halfpipe_rider,
  "d25-slide-puzzle": s_d25_slide_puzzle,
  "d25-slot-machine-reels": s_d25_slot_machine_reels,
  "d25-soccer-goal-net": s_d25_soccer_goal_net,
  "d25-solar-panel-array-tilt": s_d25_solar_panel_array_tilt,
  "d25-speaker-cone-thump": s_d25_speaker_cone_thump,
  "d25-spiral-staircase": s_d25_spiral_staircase,
  "d25-stack-tower": s_d25_stack_tower,
  "d25-submarine-dive": s_d25_submarine_dive,
  "d25-subway-turnstile": s_d25_subway_turnstile,
  "d25-swing-set-pendulum": s_d25_swing_set_pendulum,
  "d25-teacup-ride": s_d25_teacup_ride,
  "d25-telescope-mount": s_d25_telescope_mount,
  "d25-traffic-light-box": s_d25_traffic_light_box,
  "d25-treasure-chest-open": s_d25_treasure_chest_open,
  "d25-tunnel-rings": s_d25_tunnel_rings,
  "d25-typewriter-keys": s_d25_typewriter_keys,
  "d25-vending-machine": s_d25_vending_machine,
  "d25-venetian-blinds-tilt": s_d25_venetian_blinds_tilt,
  "d25-volcano-cross-section": s_d25_volcano_cross_section,
  "d25-watermill-wheel": s_d25_watermill_wheel,
  "d25-wind-chime-tubes": s_d25_wind_chime_tubes,
  "d25-windmill-blades": s_d25_windmill_blades,
  "d25-wishing-well-pulley": s_d25_wishing_well_pulley,
  "d25-zoetrope": s_d25_zoetrope,
  "acid-bloom": s_acid_bloom,
  "asteroid-drift": s_asteroid_drift,
  "aurora-ribbon": s_aurora_ribbon,
  "bacteria-culture": s_bacteria_culture,
  "bamboo-shadow": s_bamboo_shadow,
  "binary-star": s_binary_star,
  "bird-murmuration": s_bird_murmuration,
  "black-hole-lens": s_black_hole_lens,
  "blizzard-whiteout": s_blizzard_whiteout,
  "breathing-gradient": s_breathing_gradient,
  "bubble-universe": s_bubble_universe,
  "butterfly-meadow": s_butterfly_meadow,
  "candle-glow": s_candle_glow,
  "canyon-wind": s_canyon_wind,
  "cellular-automata": s_cellular_automata,
  "circuit-board": s_circuit_board,
  "city-lights": s_city_lights,
  "clockwork-gears": s_clockwork_gears,
  "coffee-swirl": s_coffee_swirl,
  "comet-tail": s_comet_tail,
  "confetti-drift": s_confetti_drift,
  "coral-glow": s_coral_glow,
  "cosmic-web": s_cosmic_web,
  "crystal-cave": s_crystal_cave,
  "crystal-prism": s_crystal_prism,
  "data-stream": s_data_stream,
  "deep-sea-jelly": s_deep_sea_jelly,
  "desert-mirage": s_desert_mirage,
  "digital-noise": s_digital_noise,
  "dune-shift": s_dune_shift,
  "dust-motes": s_dust_motes,
  "echo-ripple": s_echo_ripple,
  "eclipse-ring": s_eclipse_ring,
  "ember-storm": s_ember_storm,
  "equalizer-bars": s_equalizer_bars,
  "fern-fractal": s_fern_fractal,
  "fiber-optic": s_fiber_optic,
  "film-grain": s_film_grain,
  "firefly-swarm": s_firefly_swarm,
  "fireworks-night": s_fireworks_night,
  "fish-school": s_fish_school,
  "frost-window": s_frost_window,
  "glitch-art": s_glitch_art,
  "glitter-wave": s_glitter_wave,
  "gradient-orb": s_gradient_orb,
  "gravity-grid": s_gravity_grid,
  "hailstorm": s_hailstorm,
  "halo-ring": s_halo_ring,
  "heat-shimmer": s_heat_shimmer,
  "hologram-scan": s_hologram_scan,
  "honeycomb": s_honeycomb,
  "ice-flow": s_ice_flow,
  "kaleidoscope": s_kaleidoscope,
  "kelp-forest": s_kelp_forest,
  "lantern-festival": s_lantern_festival,
  "laser-grid": s_laser_grid,
  "lava-flow": s_lava_flow,
  "lava-lamp": s_lava_lamp,
  "light-leak": s_light_leak,
  "lighthouse-beam": s_lighthouse_beam,
  "lightning-field": s_lightning_field,
  "liquid-gradient": s_liquid_gradient,
  "lotus-pond": s_lotus_pond,
  "magnet-shavings": s_magnet_shavings,
  "mercury-droplet": s_mercury_droplet,
  "meteor-shower": s_meteor_shower,
  "mirror-hall": s_mirror_hall,
  "monsoon-clouds": s_monsoon_clouds,
  "moon-phases": s_moon_phases,
  "moth-flight": s_moth_flight,
  "mountain-mist": s_mountain_mist,
  "nebula-pillars": s_nebula_pillars,
  "neon-sign": s_neon_sign,
  "ocean-foam": s_ocean_foam,
  "ocean-swell": s_ocean_swell,
  "op-art": s_op_art,
  "orbit-garden": s_orbit_garden,
  "paint-drip": s_paint_drip,
  "pendulum-wave": s_pendulum_wave,
  "quantum-foam": s_quantum_foam,
  "radar-sweep": s_radar_sweep,
  "rain-veil": s_rain_veil,
  "river-delta": s_river_delta,
  "sand-ripple": s_sand_ripple,
  "sea-sparkle": s_sea_sparkle,
  "silk-ribbon": s_silk_ribbon,
  "smoke-column": s_smoke_column,
  "snow-globe": s_snow_globe,
  "solar-wind": s_solar_wind,
  "spider-silk": s_spider_silk,
  "spiral-shell": s_spiral_shell,
  "stained-glass": s_stained_glass,
  "star-nursery": s_star_nursery,
  "storm-front": s_storm_front,
  "tide-pool": s_tide_pool,
  "topographic-map": s_topographic_map,
  "tornado-vortex": s_tornado_vortex,
  "tree-canopy": s_tree_canopy,
  "wave-interference": s_wave_interference,
  "zen-garden": s_zen_garden,
  "abacus-frame": s_abacus_frame,
  "arcade-cabinet": s_arcade_cabinet,
  "armillary-sphere": s_armillary_sphere,
  "atom-model": s_atom_model,
  "balloon-cluster": s_balloon_cluster,
  "battery-cell": s_battery_cell,
  "beehive-skep": s_beehive_skep,
  "birdcage": s_birdcage,
  "black-hole-disk": s_black_hole_disk,
  "boombox": s_boombox,
  "boomerang-orbit": s_boomerang_orbit,
  "bowling-pin": s_bowling_pin,
  "cactus-trio": s_cactus_trio,
  "camera-vintage": s_camera_vintage,
  "cannon-ball": s_cannon_ball,
  "cassette-tape": s_cassette_tape,
  "castle-turret": s_castle_turret,
  "catapult": s_catapult,
  "chess-knight": s_chess_knight,
  "clay-vessel": s_clay_vessel,
  "compass-needle": s_compass_needle,
  "conch-shell": s_conch_shell,
  "coral-branch": s_coral_branch,
  "crystal-ball": s_crystal_ball,
  "crystal-wand": s_crystal_wand,
  "cube-stack": s_cube_stack,
  "d20-dice": s_d20_dice,
  "dartboard": s_dartboard,
  "disco-ball": s_disco_ball,
  "dna-twist": s_dna_twist,
  "domino-arc": s_domino_arc,
  "edison-bulb": s_edison_bulb,
  "faceted-head": s_faceted_head,
  "film-reel": s_film_reel,
  "gem-cluster": s_gem_cluster,
  "geode-slice": s_geode_slice,
  "goldfish-bowl": s_goldfish_bowl,
  "gong-strike": s_gong_strike,
  "gramophone": s_gramophone,
  "gyroscope": s_gyroscope,
  "hand-drum": s_hand_drum,
  "harp-strings": s_harp_strings,
  "headphones": s_headphones,
  "horseshoe-magnet": s_horseshoe_magnet,
  "hot-air-balloon": s_hot_air_balloon,
  "ice-cream-cone": s_ice_cream_cone,
  "joystick-arcade": s_joystick_arcade,
  "kite-drift": s_kite_drift,
  "knight-helmet": s_knight_helmet,
  "maracas": s_maracas,
  "metronome-arm": s_metronome_arm,
  "microphone": s_microphone,
  "microscope": s_microscope,
  "moai-statue": s_moai_statue,
  "mushroom-ring": s_mushroom_ring,
  "music-box": s_music_box,
  "nautilus-shell": s_nautilus_shell,
  "nest-eggs": s_nest_eggs,
  "newtons-cradle": s_newtons_cradle,
  "orbit-satellite": s_orbit_satellite,
  "paper-lantern": s_paper_lantern,
  "paper-plane-swarm": s_paper_plane_swarm,
  "penguin-chick": s_penguin_chick,
  "piano-keys": s_piano_keys,
  "pinball-bumper": s_pinball_bumper,
  "pinwheel-spin": s_pinwheel_spin,
  "plasma-globe": s_plasma_globe,
  "pocket-watch": s_pocket_watch,
  "poker-chips": s_poker_chips,
  "potion-flask": s_potion_flask,
  "pulsar-star": s_pulsar_star,
  "retro-rocket": s_retro_rocket,
  "royal-crown": s_royal_crown,
  "rubber-duck": s_rubber_duck,
  "satellite-dish": s_satellite_dish,
  "slinky-stairs": s_slinky_stairs,
  "slot-machine": s_slot_machine,
  "solar-panel-array": s_solar_panel_array,
  "space-station-core": s_space_station_core,
  "speaker-cone": s_speaker_cone,
  "spinning-top": s_spinning_top,
  "sunflower-head": s_sunflower_head,
  "swinging-bell": s_swinging_bell,
  "sword-in-stone": s_sword_in_stone,
  "teapot": s_teapot,
  "telescope": s_telescope,
  "tesla-coil": s_tesla_coil,
  "top-hat": s_top_hat,
  "tower-of-hanoi": s_tower_of_hanoi,
  "treasure-chest": s_treasure_chest,
  "trophy-cup": s_trophy_cup,
  "tuning-fork": s_tuning_fork,
  "ufo-saucer": s_ufo_saucer,
  "umbrella-spin": s_umbrella_spin,
  "vinyl-record": s_vinyl_record,
  "wind-chime": s_wind_chime,
  "wind-turbine": s_wind_turbine,
  "wire-bonsai": s_wire_bonsai,
  "witch-cauldron": s_witch_cauldron,
  "yoyo-trick": s_yoyo_trick,
  "abyssal-trench": s_abyssal_trench,
  "airship-armada": s_airship_armada,
  "alchemy-circle": s_alchemy_circle,
  "amethyst-cavern": s_amethyst_cavern,
  "astronaut-drift": s_astronaut_drift,
  "aurora-peaks": s_aurora_peaks,
  "book-portal": s_book_portal,
  "buried-colossus": s_buried_colossus,
  "campfire-comet": s_campfire_comet,
  "circus-tent": s_circus_tent,
  "cliffside-temple": s_cliffside_temple,
  "clockwork-orrery": s_clockwork_orrery,
  "cloud-haven": s_cloud_haven,
  "cosmic-curtain": s_cosmic_curtain,
  "cosmic-lotus": s_cosmic_lotus,
  "crane-wish": s_crane_wish,
  "crystal-deer": s_crystal_deer,
  "deep-diver": s_deep_diver,
  "desert-camp": s_desert_camp,
  "desert-night": s_desert_night,
  "desert-pyramid": s_desert_pyramid,
  "door-in-the-sky": s_door_in_the_sky,
  "dragon-hoard": s_dragon_hoard,
  "dragon-parade": s_dragon_parade,
  "dragonfly-dusk": s_dragonfly_dusk,
  "dreamcatcher": s_dreamcatcher,
  "dusk-balloon": s_dusk_balloon,
  "ember-forge": s_ember_forge,
  "fairy-ring": s_fairy_ring,
  "floating-city": s_floating_city,
  "floating-library": s_floating_library,
  "floating-runestones": s_floating_runestones,
  "frost-heart": s_frost_heart,
  "galaxy-jar": s_galaxy_jar,
  "genie-smoke": s_genie_smoke,
  "ghost-ship": s_ghost_ship,
  "glass-dunes": s_glass_dunes,
  "gondola-night": s_gondola_night,
  "gravity-well": s_gravity_well,
  "hanging-gardens": s_hanging_gardens,
  "harbor-moon": s_harbor_moon,
  "henge-dawn": s_henge_dawn,
  "hourglass-time": s_hourglass_time,
  "hyperspace-gate": s_hyperspace_gate,
  "iceberg-drift": s_iceberg_drift,
  "icebreaker-dawn": s_icebreaker_dawn,
  "ink-mountains": s_ink_mountains,
  "jelly-bloom": s_jelly_bloom,
  "jungle-temple": s_jungle_temple,
  "kitsune-foxfire": s_kitsune_foxfire,
  "long-neck-sunset": s_long_neck_sunset,
  "lumina-rain": s_lumina_rain,
  "magic-carpet": s_magic_carpet,
  "manta-glide": s_manta_glide,
  "marigold-night": s_marigold_night,
  "mermaid-rock": s_mermaid_rock,
  "midnight-carousel": s_midnight_carousel,
  "moon-gate": s_moon_gate,
  "moonlit-oasis": s_moonlit_oasis,
  "moonlit-sea": s_moonlit_sea,
  "mushroom-grove": s_mushroom_grove,
  "neon-metropolis": s_neon_metropolis,
  "night-ferris": s_night_ferris,
  "octopus-lair": s_octopus_lair,
  "orbital-station": s_orbital_station,
  "origami-flock": s_origami_flock,
  "owl-watch": s_owl_watch,
  "phoenix-ascent": s_phoenix_ascent,
  "pillar-of-dawn": s_pillar_of_dawn,
  "pipe-cathedral": s_pipe_cathedral,
  "planet-rise": s_planet_rise,
  "portal-stairs": s_portal_stairs,
  "redwood-rays": s_redwood_rays,
  "rocket-dawn": s_rocket_dawn,
  "rooftop-cat": s_rooftop_cat,
  "rune-circle": s_rune_circle,
  "serpent-of-stars": s_serpent_of_stars,
  "shrine-steps": s_shrine_steps,
  "sky-elevator": s_sky_elevator,
  "sky-isles": s_sky_isles,
  "sky-train": s_sky_train,
  "sleeping-giant": s_sleeping_giant,
  "snail-village": s_snail_village,
  "spirit-river": s_spirit_river,
  "star-whale": s_star_whale,
  "starfall-cliff": s_starfall_cliff,
  "stargazer-dome": s_stargazer_dome,
  "still-lake": s_still_lake,
  "stormbreak-rainbow": s_stormbreak_rainbow,
  "terraced-temple": s_terraced_temple,
  "totem-awakening": s_totem_awakening,
  "treasure-map": s_treasure_map,
  "underwater-ruins": s_underwater_ruins,
  "vine-arch": s_vine_arch,
  "winding-wall": s_winding_wall,
  "windmill-dusk": s_windmill_dusk,
  "windward-cliffs": s_windward_cliffs,
  "world-tree": s_world_tree,
  "world-turtle": s_world_turtle,
  "zodiac-wheel": s_zodiac_wheel,
  "loader-honeycomb": s_loader_honeycomb,
  "loader-sunrise": s_loader_sunrise,
  "loader-shuffle": s_loader_shuffle,
  "button-progress-fill": s_button_progress_fill,
  "button-flip-confirm": s_button_flip_confirm,
  "effect-aurora-text": s_effect_aurora_text,
  "effect-magnetic-card": s_effect_magnetic_card,
  "motion-elastic-tooltip": s_motion_elastic_tooltip,
  "motion-bounce-badge": s_motion_bounce_badge,
  "d25-coin-stack": s_d25_coin_stack,
  "d25-stair-shadow": s_d25_stair_shadow,
  "rain-ripples": s_rain_ripples,
  "aurora-waves": s_aurora_waves,
  "paper-crane-3d": s_paper_crane_3d,
  "hourglass-3d": s_hourglass_3d,
  "neon-city-hero": s_neon_city_hero,
  "murmuration-hero": s_murmuration_hero,
  "form-floating-label": s_form_floating_label,
  "form-search-expand": s_form_search_expand,
  "form-otp-input": s_form_otp_input,
  "form-toggle-row": s_form_toggle_row,
  "form-range-slider": s_form_range_slider,
  "form-checkbox-draw": s_form_checkbox_draw,
  "form-radio-cards": s_form_radio_cards,
  "form-input-counter": s_form_input_counter,
  "nav-pill-nav": s_nav_pill_nav,
  "nav-underline-tabs": s_nav_underline_tabs,
  "nav-stepper": s_nav_stepper,
  "nav-dock-magnify": s_nav_dock_magnify,
  "nav-breadcrumb": s_nav_breadcrumb,
  "nav-rail": s_nav_rail,
  "nav-dots-pager": s_nav_dots_pager,
  "nav-burger-morph": s_nav_burger_morph,
  "card-profile": s_card_profile,
  "card-product": s_card_product,
  "card-stat": s_card_stat,
  "card-testimonial": s_card_testimonial,
  "card-article": s_card_article,
  "card-team": s_card_team,
  "card-notification": s_card_notification,
  "card-login": s_card_login,
  "pricing-tiers": s_pricing_tiers,
  "pricing-billing-toggle": s_pricing_billing_toggle,
  "pricing-feature-table": s_pricing_feature_table,
  "pricing-hero": s_pricing_hero,
  "pricing-addon-picker": s_pricing_addon_picker,
  "pricing-coupon": s_pricing_coupon,
  "pricing-invoice": s_pricing_invoice,
  "pricing-currency": s_pricing_currency,
  "overlay-modal": s_overlay_modal,
  "overlay-command-palette": s_overlay_command_palette,
  "overlay-popover": s_overlay_popover,
  "overlay-drawer": s_overlay_drawer,
  "overlay-snackbar": s_overlay_snackbar,
  "overlay-confirm-dialog": s_overlay_confirm_dialog,
  "overlay-lightbox": s_overlay_lightbox,
  "overlay-context-menu": s_overlay_context_menu,
  "table-sortable": s_table_sortable,
  "table-selectable": s_table_selectable,
  "table-expandable": s_table_expandable,
  "table-skeleton": s_table_skeleton,
  "table-sparkline-rows": s_table_sparkline_rows,
  "table-inline-edit": s_table_inline_edit,
  "tooltip-follow": s_tooltip_follow,
  "tooltip-hotkey": s_tooltip_hotkey,
  "tooltip-rich": s_tooltip_rich,
  "tooltip-anchor": s_tooltip_anchor,
  "tooltip-copy": s_tooltip_copy,
  "tooltip-avatar-stack": s_tooltip_avatar_stack,
};

export function getSource(slug: string): string {
  return sources[slug] ?? '';
}

export const factoryNames: Record<string, string> = {
  "loader-atom-orbits": "createLoaderAtomOrbits",
  "loader-aurora-shift": "createLoaderAuroraShift",
  "loader-balloon-bob": "createLoaderBalloonBob",
  "loader-battery-fill": "createLoaderBatteryFill",
  "loader-binary-scroll": "createLoaderBinaryScroll",
  "loader-black-hole": "createLoaderBlackHole",
  "loader-bokeh-blur": "createLoaderBokehBlur",
  "loader-bracket-orbit": "createLoaderBracketOrbit",
  "loader-bubble-rise": "createLoaderBubbleRise",
  "loader-bulb-flicker": "createLoaderBulbFlicker",
  "loader-butterfly-flap": "createLoaderButterflyFlap",
  "loader-card-flip3d": "createLoaderCardFlip3d",
  "loader-cassette-reels": "createLoaderCassetteReels",
  "loader-checkmark-draw": "createLoaderCheckmarkDraw",
  "loader-circle-trace": "createLoaderCircleTrace",
  "loader-clock-hands": "createLoaderClockHands",
  "loader-cocktail-stir": "createLoaderCocktailStir",
  "loader-code-blocks": "createLoaderCodeBlocks",
  "loader-coffee-steam": "createLoaderCoffeeSteam",
  "loader-comet-tail": "createLoaderCometTail",
  "loader-compass-needle": "createLoaderCompassNeedle",
  "loader-count-up": "createLoaderCountUp",
  "loader-dice-tumble": "createLoaderDiceTumble",
  "loader-dna-helix": "createLoaderDnaHelix",
  "loader-domino-fall": "createLoaderDominoFall",
  "loader-dot-grid-wave": "createLoaderDotGridWave",
  "loader-droplet-drip": "createLoaderDropletDrip",
  "loader-ember-rise": "createLoaderEmberRise",
  "loader-equalizer": "createLoaderEqualizer",
  "loader-fan-blades": "createLoaderFanBlades",
  "loader-fidget-spinner": "createLoaderFidgetSpinner",
  "loader-firefly-drift": "createLoaderFireflyDrift",
  "loader-fish-school": "createLoaderFishSchool",
  "loader-gear-turn": "createLoaderGearTurn",
  "loader-glitch-text": "createLoaderGlitchText",
  "loader-globe-meridians": "createLoaderGlobeMeridians",
  "loader-hammer-pulse": "createLoaderHammerPulse",
  "loader-heart-pulse": "createLoaderHeartPulse",
  "loader-heartbeat-line": "createLoaderHeartbeatLine",
  "loader-hexagon-cluster": "createLoaderHexagonCluster",
  "loader-infinity-trace": "createLoaderInfinityTrace",
  "loader-jellyfish-bob": "createLoaderJellyfishBob",
  "loader-kaleidoscope": "createLoaderKaleidoscope",
  "loader-ladder-climb": "createLoaderLadderClimb",
  "loader-letter-bounce": "createLoaderLetterBounce",
  "loader-lightning-bolt": "createLoaderLightningBolt",
  "loader-lissajous-dot": "createLoaderLissajousDot",
  "loader-magnifier-scan": "createLoaderMagnifierScan",
  "loader-map-pin-bounce": "createLoaderMapPinBounce",
  "loader-matrix-rain": "createLoaderMatrixRain",
  "loader-meteor-shower": "createLoaderMeteorShower",
  "loader-mixer-faders": "createLoaderMixerFaders",
  "loader-moon-phases": "createLoaderMoonPhases",
  "loader-neon-flicker": "createLoaderNeonFlicker",
  "loader-newton-cradle": "createLoaderNewtonCradle",
  "loader-orbit-moons": "createLoaderOrbitMoons",
  "loader-oscilloscope": "createLoaderOscilloscope",
  "loader-pacman-chomp": "createLoaderPacmanChomp",
  "loader-paper-plane": "createLoaderPaperPlane",
  "loader-pendulum-swing": "createLoaderPendulumSwing",
  "loader-percent-ring": "createLoaderPercentRing",
  "loader-pinwheel": "createLoaderPinwheel",
  "loader-pizza-spin": "createLoaderPizzaSpin",
  "loader-prism-split": "createLoaderPrismSplit",
  "loader-propeller": "createLoaderPropeller",
  "loader-radar-sweep": "createLoaderRadarSweep",
  "loader-radio-tuner": "createLoaderRadioTuner",
  "loader-rain-cloud": "createLoaderRainCloud",
  "loader-ripple-pond": "createLoaderRipplePond",
  "loader-rocket-launch": "createLoaderRocketLaunch",
  "loader-rubik-cube": "createLoaderRubikCube",
  "loader-satellite-dish": "createLoaderSatelliteDish",
  "loader-saturn-ring": "createLoaderSaturnRing",
  "loader-seismo-bars": "createLoaderSeismoBars",
  "loader-shine-bar": "createLoaderShineBar",
  "loader-shooting-star": "createLoaderShootingStar",
  "loader-signature-loop": "createLoaderSignatureLoop",
  "loader-spiral-swirl": "createLoaderSpiralSwirl",
  "loader-square-draw": "createLoaderSquareDraw",
  "loader-square-fold": "createLoaderSquareFold",
  "loader-stack-cubes": "createLoaderStackCubes",
  "loader-stairs-bounce": "createLoaderStairsBounce",
  "loader-step-segments": "createLoaderStepSegments",
  "loader-sun-rays": "createLoaderSunRays",
  "loader-target-lock": "createLoaderTargetLock",
  "loader-terminal-cursor": "createLoaderTerminalCursor",
  "loader-thermo-fill": "createLoaderThermoFill",
  "loader-toast-pop": "createLoaderToastPop",
  "loader-triangle-spin": "createLoaderTriangleSpin",
  "loader-twinkle-field": "createLoaderTwinkleField",
  "loader-typing-cursor": "createLoaderTypingCursor",
  "loader-ufo-beam": "createLoaderUfoBeam",
  "loader-vinyl-spin": "createLoaderVinylSpin",
  "loader-vu-meter": "createLoaderVuMeter",
  "loader-waterfall-dots": "createLoaderWaterfallDots",
  "loader-wave-lines": "createLoaderWaveLines",
  "loader-wifi-arcs": "createLoaderWifiArcs",
  "loader-windmill": "createLoaderWindmill",
  "loader-yin-yang": "createLoaderYinYang",
  "loader-zigzag-runner": "createLoaderZigzagRunner",
  "button-accordion-expand": "createAccordionExpandButton",
  "button-airplane-mode": "createAirplaneModeButton",
  "button-api-call": "createApiCallButton",
  "button-arcade-start": "createArcadeStartButton",
  "button-arrow-nudge": "createArrowNudgeButton",
  "button-balloon-pop": "createBalloonPopButton",
  "button-battery-charge": "createBatteryChargeButton",
  "button-bell-badge": "createBellBadgeButton",
  "button-bluetooth-pair": "createBluetoothPairButton",
  "button-bookmark-save": "createBookmarkSaveButton",
  "button-brutalist-shift": "createBrutalistShiftButton",
  "button-bubble-wrap": "createBubbleWrapButton",
  "button-camera-flash": "createCameraFlashButton",
  "button-carousel-next": "createCarouselNextButton",
  "button-cart-add": "createCartAddButton",
  "button-chat-bubble": "createChatBubbleButton",
  "button-ci-pipeline": "createCiPipelineButton",
  "button-clap-count": "createClapCountButton",
  "button-code-execute": "createCodeExecuteButton",
  "button-coin-flip": "createCoinFlipButton",
  "button-color-cycle": "createColorCycleButton",
  "button-compass-navigate": "createCompassNavigateButton",
  "button-confetti-pop": "createConfettiPopButton",
  "button-console-log": "createConsoleLogButton",
  "button-corners-accent": "createCornersAccentButton",
  "button-counter-tap": "createCounterTapButton",
  "button-crystal-glow": "createCrystalGlowButton",
  "button-dark-mode-switch": "createDarkModeSwitchButton",
  "button-dial-rotate": "createDialRotateButton",
  "button-dice-roll": "createDiceRollButton",
  "button-door-open": "createDoorOpenButton",
  "button-double-layer-text": "createDoubleLayerTextButton",
  "button-download-progress": "createDownloadProgressButton",
  "button-drum-pad": "createDrumPadButton",
  "button-eject-disc": "createEjectDiscButton",
  "button-emoji-picker-pill": "createEmojiPickerPill",
  "button-fan-speed": "createFanSpeedButton",
  "button-firework-burst": "createFireworkBurstButton",
  "button-flip-card": "createFlipCardButton",
  "button-fold-unfold": "createFoldUnfoldButton",
  "button-follow-slide": "createFollowSlideButton",
  "button-fortune-cookie": "createFortuneCookieButton",
  "button-gamepad-dpad": "createGamepadDpadButton",
  "button-git-commit": "createGitCommitButton",
  "button-glitch-text": "createGlitchTextButton",
  "button-gradient-border-rotate": "createGradientBorderRotateButton",
  "button-gradient-mixer": "createGradientMixerButton",
  "button-heart-burst": "createHeartBurstButton",
  "button-hold-to-confirm": "createHoldToConfirmButton",
  "button-hologram-scan": "createHologramScanButton",
  "button-hue-picker": "createHuePickerButton",
  "button-icon-morph": "createIconMorphButton",
  "button-jelly-press": "createJellyPressButton",
  "button-joystick-move": "createJoystickMoveButton",
  "button-keyboard-key": "createKeyboardKeyButton",
  "button-lang-toggle": "createLangToggleButton",
  "button-lava-lamp": "createLavaLampButton",
  "button-lever-pull": "createLeverPullButton",
  "button-lightbulb-toggle": "createLightbulbToggleButton",
  "button-liquid-fill": "createLiquidFillButton",
  "button-magic-orb": "createMagicOrbButton",
  "button-magnet-hover": "createMagnetHoverButton",
  "button-mail-send": "createMailSendButton",
  "button-map-zoom": "createMapZoomButton",
  "button-mic-record": "createMicRecordButton",
  "button-neumorphic-dent": "createNeumorphicDentButton",
  "button-password-reveal": "createPasswordRevealButton",
  "button-piano-key": "createPianoKeyButton",
  "button-pin-drop": "createPinDropButton",
  "button-plasma-ball": "createPlasmaBallButton",
  "button-play-pause-morph": "createPlayPauseMorphButton",
  "button-power-toggle": "createPowerToggleButton",
  "button-pulse-ring": "createPulseRingButton",
  "button-reaction-bar": "createReactionBarButton",
  "button-repeat-loop": "createRepeatLoopButton",
  "button-ripple-click": "createRippleClickButton",
  "button-rocket-launch": "createRocketLaunchButton",
  "button-segmented-control": "createSegmentedControl",
  "button-server-status": "createServerStatusButton",
  "button-shadow-stack": "createShadowStackButton",
  "button-shine-sweep": "createShineSweepButton",
  "button-shuffle-playlist": "createShufflePlaylistButton",
  "button-skew-slide": "createSkewSlideButton",
  "button-skip-track": "createSkipTrackButton",
  "button-slot-machine": "createSlotMachineButton",
  "button-speed-dial": "createSpeedDialButton",
  "button-star-rating": "createStarRatingButton",
  "button-tab-switcher": "createTabSwitcherButton",
  "button-tag-add": "createTagAddButton",
  "button-terminal-type": "createTerminalTypeButton",
  "button-text-scramble": "createTextScrambleButton",
  "button-theme-chips": "createThemeChipsButton",
  "button-upload-pulse": "createUploadPulseButton",
  "button-vinyl-spin": "createVinylSpinButton",
  "button-volume-slider": "createVolumeSliderButton",
  "button-vote-arrows": "createVoteArrowsButton",
  "button-webhook-send": "createWebhookSendButton",
  "button-whack-a-mole": "createWhackAMoleButton",
  "button-wifi-connect": "createWifiConnectButton",
  "button-window-minimize": "createWindowMinimizeButton",
  "effect-accordion-glow": "createAccordionGlow",
  "effect-avatar-stack-fan": "createAvatarStackFan",
  "effect-binary-clock": "createBinaryClock",
  "effect-black-hole-vortex": "createBlackHoleVortex",
  "effect-blob-cursor-follow": "createBlobCursorFollow",
  "effect-bubble-rise": "createBubbleRise",
  "effect-button-3d-press": "createButton3dPress",
  "effect-campfire-embers": "createCampfireEmbers",
  "effect-candle-flame": "createCandleFlame",
  "effect-checkbox-draw-check": "createCheckboxDrawCheck",
  "effect-circle-wipe-reveal": "createCircleWipeReveal",
  "effect-compass-needle": "createCompassNeedle",
  "effect-confetti-burst-panel": "createConfettiBurstPanel",
  "effect-countdown-flip": "createCountdownFlip",
  "effect-counter-roll-up": "createCounterRollUp",
  "effect-cursor-trail-sparkles": "createCursorTrailSparkles",
  "effect-curtain-lights": "createCurtainLights",
  "effect-diagonal-wipe-reveal": "createDiagonalWipeReveal",
  "effect-dna-helix": "createDnaHelix",
  "effect-dot-bounce-grid": "createDotBounceGrid",
  "effect-dot-matrix-board": "createDotMatrixBoard",
  "effect-dropdown-fade-scale": "createDropdownFadeScale",
  "effect-eclipse-corona": "createEclipseCorona",
  "effect-energy-shield-hit": "createEnergyShieldHit",
  "effect-equalizer-bars": "createEqualizerBars",
  "effect-expanding-search-bar": "createExpandingSearchBar",
  "effect-eye-follow-cursor": "createEyeFollowCursor",
  "effect-fab-speed-dial": "createFabSpeedDial",
  "effect-film-grain-flicker": "createFilmGrainFlicker",
  "effect-fire-text": "createFireText",
  "effect-folder-open-hover": "createFolderOpenHover",
  "effect-galaxy-swirl-panel": "createGalaxySwirlPanel",
  "effect-gradient-ring-loader": "createGradientRingLoader",
  "effect-gravity-drop-in": "createGravityDropIn",
  "effect-gyroscope-rings": "createGyroscopeRings",
  "effect-heart-beat-pulse": "createHeartBeatPulse",
  "effect-holo-scan-portrait": "createHoloScanPortrait",
  "effect-hourglass-sand": "createHourglassSand",
  "effect-ice-frost-card": "createIceFrostCard",
  "effect-image-compare-slider": "createImageCompareSlider",
  "effect-ink-bleed-reveal": "createInkBleedReveal",
  "effect-iris-transition": "createIrisTransition",
  "effect-jelly-wobble": "createJellyWobble",
  "effect-kaleidoscope-panel": "createKaleidoscopePanel",
  "effect-kinetic-marquee-ticker": "createKineticMarqueeTicker",
  "effect-lava-lamp-panel": "createLavaLampPanel",
  "effect-lightbox-zoom": "createLightboxZoom",
  "effect-lightning-storm": "createLightningStorm",
  "effect-loading-bar-striped": "createLoadingBarStriped",
  "effect-lunar-phases": "createLunarPhases",
  "effect-map-pin-drop": "createMapPinDrop",
  "effect-matrix-code-mini": "createMatrixCodeMini",
  "effect-modal-glass-pop": "createModalGlassPop",
  "effect-mosaic-tile-reveal": "createMosaicTileReveal",
  "effect-neon-switch-toggle": "createNeonSwitchToggle",
  "effect-night-city-windows": "createNightCityWindows",
  "effect-orbit-spinner": "createOrbitSpinner",
  "effect-page-curtain-load": "createPageCurtainLoad",
  "effect-parallax-layers": "createParallaxLayers",
  "effect-pendulum-swing": "createPendulumSwing",
  "effect-piano-keys-hover": "createPianoKeysHover",
  "effect-pinwheel-spin": "createPinwheelSpin",
  "effect-pixelate-transition": "createPixelateTransition",
  "effect-plasma-panel": "createPlasmaPanel",
  "effect-polaroid-scatter-gallery": "createPolaroidScatterGallery",
  "effect-pricing-popular-glow": "createPricingPopularGlow",
  "effect-progress-ring-timer": "createProgressRingTimer",
  "effect-radar-sweep": "createRadarSweep",
  "effect-radial-menu-expand": "createRadialMenuExpand",
  "effect-rain-window-panel": "createRainWindowPanel",
  "effect-rating-stars-hover": "createRatingStarsHover",
  "effect-receipt-zigzag": "createReceiptZigzag",
  "effect-rubber-band-hover": "createRubberBandHover",
  "effect-scratch-card": "createScratchCard",
  "effect-scroll-progress-topbar": "createScrollProgressTopbar",
  "effect-smoke-wisps": "createSmokeWisps",
  "effect-snow-globe-panel": "createSnowGlobePanel",
  "effect-sonar-ping": "createSonarPing",
  "effect-split-text-lines": "createSplitTextLines",
  "effect-springy-icon-bounce": "createSpringyIconBounce",
  "effect-starfield-panel": "createStarfieldPanel",
  "effect-steam-mug": "createSteamMug",
  "effect-step-progress-tracker": "createStepProgressTracker",
  "effect-sticky-note-peel": "createStickyNotePeel",
  "effect-sun-cloud-weather": "createSunCloudWeather",
  "effect-tabs-indicator-slide": "createTabsIndicatorSlide",
  "effect-tag-chip-pop": "createTagChipPop",
  "effect-terminal-typewriter": "createTerminalTypewriter",
  "effect-text-scramble-decode": "createTextScrambleDecode",
  "effect-ticket-notch-card": "createTicketNotchCard",
  "effect-tilt-glare-card": "createTiltGlareCard",
  "effect-toast-slide-stack": "createToastSlideStack",
  "effect-tooltip-bubble-pop": "createTooltipBubblePop",
  "effect-typographic-wave": "createTypographicWave",
  "effect-volume-knob-rotate": "createVolumeKnobRotate",
  "effect-wave-flag": "createWaveFlag",
  "effect-waveform-line": "createWaveformLine",
  "effect-wind-turbine-spin": "createWindTurbineSpin",
  "effect-xmas-light-string": "createXmasLightString",
  "effect-zoom-blur-enter": "createZoomBlurEnter",
  "motion-abacus-beads": "createAbacusBeads",
  "motion-accordion-pulse": "createAccordionPulse",
  "motion-audio-bars": "createAudioBars",
  "motion-balance-scale": "createBalanceScale",
  "motion-balloon-rise": "createBalloonRise",
  "motion-bar-race": "createBarRace",
  "motion-battery-charge": "createBatteryCharge",
  "motion-bounce-cascade": "createBounceCascade",
  "motion-bubble-rise": "createBubbleRise",
  "motion-card-shuffle": "createCardShuffle",
  "motion-carousel-loop": "createCarouselLoop",
  "motion-cart-bounce": "createCartBounce",
  "motion-chat-typewriter": "createChatTypewriter",
  "motion-checkbox-draw": "createCheckboxDraw",
  "motion-claw-machine": "createClawMachine",
  "motion-cloud-drift": "createCloudDrift",
  "motion-coffee-steam": "createCoffeeSteam",
  "motion-compass-needle": "createCompassNeedle",
  "motion-conveyor-belt": "createConveyorBelt",
  "motion-countdown-ring": "createCountdownRing",
  "motion-crane-hook": "createCraneHook",
  "motion-curtain-rise": "createCurtainRise",
  "motion-day-night": "createDayNight",
  "motion-dice-roll": "createDiceRoll",
  "motion-dna-helix": "createDnaHelix",
  "motion-domino-fall": "createDominoFall",
  "motion-dot-loader": "createDotLoader",
  "motion-download-tray": "createDownloadTray",
  "motion-dribble-ball": "createDribbleBall",
  "motion-dropdown-menu": "createDropdownMenu",
  "motion-elevator-floors": "createElevatorFloors",
  "motion-escalator-steps": "createEscalatorSteps",
  "motion-ferris-wheel": "createFerrisWheel",
  "motion-firefly-drift": "createFireflyDrift",
  "motion-fish-school": "createFishSchool",
  "motion-flight-path": "createFlightPath",
  "motion-flip-clock": "createFlipClock",
  "motion-gear-train": "createGearTrain",
  "motion-gravity-drop": "createGravityDrop",
  "motion-heartbeat-line": "createHeartbeatLine",
  "motion-hourglass-flip": "createHourglassFlip",
  "motion-hydraulic-press": "createHydraulicPress",
  "motion-kaleidoscope": "createKaleidoscope",
  "motion-lava-lamp": "createLavaLamp",
  "motion-led-matrix": "createLedMatrix",
  "motion-lighthouse-beam": "createLighthouseBeam",
  "motion-lightning-storm": "createLightningStorm",
  "motion-like-heart": "createLikeHeart",
  "motion-lottery-drum": "createLotteryDrum",
  "motion-marble-run": "createMarbleRun",
  "motion-metronome": "createMetronome",
  "motion-modal-pop": "createModalPop",
  "motion-moon-phases": "createMoonPhases",
  "motion-neon-sign": "createNeonSign",
  "motion-orbit-loader": "createOrbitLoader",
  "motion-pacman-chomp": "createPacmanChomp",
  "motion-page-flip": "createPageFlip",
  "motion-parachute-drop": "createParachuteDrop",
  "motion-piston-engine": "createPistonEngine",
  "motion-pong-rally": "createPongRally",
  "motion-prize-wheel": "createPrizeWheel",
  "motion-progress-steps": "createProgressSteps",
  "motion-pulley-lift": "createPulleyLift",
  "motion-radar-sweep": "createRadarSweep",
  "motion-rating-stars": "createRatingStars",
  "motion-robot-arm": "createRobotArm",
  "motion-robot-vacuum": "createRobotVacuum",
  "motion-rocket-launch": "createRocketLaunch",
  "motion-sailboat-wave": "createSailboatWave",
  "motion-search-scan": "createSearchScan",
  "motion-seismograph": "createSeismograph",
  "motion-slot-reels": "createSlotReels",
  "motion-snow-globe": "createSnowGlobe",
  "motion-solar-orbit": "createSolarOrbit",
  "motion-sonar-pulse": "createSonarPulse",
  "motion-space-invaders": "createSpaceInvaders",
  "motion-spinner-segments": "createSpinnerSegments",
  "motion-spotlight-sweep": "createSpotlightSweep",
  "motion-square-shuffle": "createSquareShuffle",
  "motion-stack-tumble": "createStackTumble",
  "motion-stadium-wave": "createStadiumWave",
  "motion-star-twinkle": "createStarTwinkle",
  "motion-stock-ticker": "createStockTicker",
  "motion-subway-line": "createSubwayLine",
  "motion-sync-cycle": "createSyncCycle",
  "motion-tab-indicator": "createTabIndicator",
  "motion-tetris-fall": "createTetrisFall",
  "motion-text-ticker": "createTextTicker",
  "motion-thermostat-dial": "createThermostatDial",
  "motion-toast-queue": "createToastQueue",
  "motion-toggle-switch": "createToggleSwitch",
  "motion-traffic-light": "createTrafficLight",
  "motion-ufo-hover": "createUfoHover",
  "motion-venetian-blind": "createVenetianBlind",
  "motion-vinyl-record": "createVinylRecord",
  "motion-volume-knob": "createVolumeKnob",
  "motion-wave-loader": "createWaveLoader",
  "motion-weather-cycle": "createWeatherCycle",
  "motion-wifi-signal": "createWifiSignal",
  "motion-windmill-spin": "createWindmillSpin",
  "d25-abacus-frame": "createAbacusFrame3D",
  "d25-arcade-cabinet": "createArcadeCabinet",
  "d25-astrolabe-dial": "createAstrolabeDial",
  "d25-basketball-hoop-shot": "createBasketballHoopShot",
  "d25-bowling-lane": "createBowlingLanePins",
  "d25-bridge-lift": "createBridgeLift",
  "d25-cable-car-gondola": "createCableCarGondola",
  "d25-camera-shutter-blades": "createCameraShutterBlades",
  "d25-campfire-depth": "createCampfireDepth",
  "d25-card-shuffle-fan": "createCardShuffleFan",
  "d25-carousel-horses": "createCarouselHorses",
  "d25-catapult-launch": "createCatapultLaunch",
  "d25-ceiling-fan-spin": "createCeilingFanSpin",
  "d25-chessboard-tilt": "createChessboardTilt",
  "d25-coin-flipper": "createCoinFlipper",
  "d25-compass-needle-float": "createCompassNeedleFloat",
  "d25-coral-reef-layers": "createCoralReefLayers",
  "d25-crane-claw": "createCraneClaw",
  "d25-cube-carousel": "createCubeCarousel",
  "d25-dam-spillway-gates": "createDamSpillwayGates",
  "d25-dice-tower": "createDiceTower",
  "d25-diorama-room": "createDioramaRoom",
  "d25-domino-run": "createDominoRun",
  "d25-door-gallery": "createDoorGallery",
  "d25-dragon-wing-flap": "createDragonWingFlap",
  "d25-drawbridge": "createDrawbridge",
  "d25-earthquake-shake-table": "createEarthquakeShakeTable",
  "d25-elevator-shaft": "createElevatorShaftView",
  "d25-equalizer-bars-3d": "createEqualizerBars3D",
  "d25-escalator-steps": "createEscalatorSteps",
  "d25-ferris-wheel": "createFerrisWheelCabins",
  "d25-film-clapperboard": "createFilmClapperboard",
  "d25-film-reel-projector": "createFilmReelProjector",
  "d25-floating-islands": "createFloatingIslandsParallax",
  "d25-frame-wall": "createMuseumFrameWall",
  "d25-garage-door-rollup": "createGarageDoorRollup",
  "d25-gramophone-horn": "createGramophoneHorn",
  "d25-greeting-card": "createGreetingCard",
  "d25-gumball-machine": "createGumballMachine",
  "d25-gyroscope-rings": "createGyroscopeRings",
  "d25-hand-fan-spread": "createHandFanSpread",
  "d25-harbor-crane-container": "createHarborCraneContainer",
  "d25-hot-air-balloon-rise": "createHotAirBalloonRise",
  "d25-hourglass-flow": "createHourglassFlow",
  "d25-iceberg-cross-section": "createIcebergCrossSection",
  "d25-jellyfish-drift": "createJellyfishDrift",
  "d25-joystick-control": "createJoystickControl",
  "d25-jukebox-selection": "createJukeboxSelection",
  "d25-kaleidoscope-cone": "createKaleidoscopeCone",
  "d25-kite-in-wind": "createKiteInWind",
  "d25-lantern-glow-swing": "createLanternGlowSwing",
  "d25-lighthouse-beam": "createLighthouseBeam",
  "d25-mailbox-flag": "createMailboxFlag",
  "d25-mechanical-keyboard": "createMechanicalKeyboard",
  "d25-metronome-arm": "createMetronomeArm",
  "d25-moon-orbit-ring": "createPlanetMoonOrbitRing",
  "d25-page-fold": "createBookPageFold",
  "d25-paper-cut-landscape": "createPaperCutLandscape",
  "d25-periscope": "createPeriscope",
  "d25-photo-pile-lift": "createPhotoPileLift",
  "d25-piano-hammer-lift": "createPianoHammerLift",
  "d25-pin-art-toy": "createPinArtToy",
  "d25-pinball-flippers": "createPinballFlippers",
  "d25-pinwheel-spin": "createPinwheelSpin",
  "d25-pocket-watch-open": "createPocketWatchOpen",
  "d25-portcullis-gate": "createPortcullisGate",
  "d25-prism-beam-split": "createPrismBeamSplit",
  "d25-radar-sweep-dome": "createRadarSweepDome",
  "d25-railway-crossing-gate": "createRailwayCrossingGate",
  "d25-revolving-door": "createRevolvingDoor",
  "d25-rotary-phone-dial": "createRotaryPhoneDial",
  "d25-rubiks-layer-twist": "createRubiksLayerTwist",
  "d25-satellite-dish-tracker": "createSatelliteDishTracker",
  "d25-seesaw-balance": "createSeesawBalance",
  "d25-shadow-theater": "createShadowTheater",
  "d25-skate-halfpipe-rider": "createSkateHalfpipeRider",
  "d25-slide-puzzle": "createDepthSlidePuzzle",
  "d25-slot-machine-reels": "createSlotMachineReels",
  "d25-soccer-goal-net": "createSoccerGoalNet",
  "d25-solar-panel-array-tilt": "createSolarPanelArrayTilt",
  "d25-speaker-cone-thump": "createSpeakerConeThump",
  "d25-spiral-staircase": "createSpiralStaircase",
  "d25-stack-tower": "createStackGameTower",
  "d25-submarine-dive": "createSubmarineDive",
  "d25-subway-turnstile": "createSubwayTurnstile",
  "d25-swing-set-pendulum": "createSwingSetPendulum",
  "d25-teacup-ride": "createTeacupRide",
  "d25-telescope-mount": "createTelescopeMount",
  "d25-traffic-light-box": "createTrafficLightBox",
  "d25-treasure-chest-open": "createTreasureChestOpen",
  "d25-tunnel-rings": "createTunnelRings",
  "d25-typewriter-keys": "createTypewriterKeys",
  "d25-vending-machine": "createVendingMachine",
  "d25-venetian-blinds-tilt": "createVenetianBlindsTilt",
  "d25-volcano-cross-section": "createVolcanoCrossSection",
  "d25-watermill-wheel": "createWatermillWheel",
  "d25-wind-chime-tubes": "createWindChimeTubes",
  "d25-windmill-blades": "createWindmillBlades",
  "d25-wishing-well-pulley": "createWishingWellPulley",
  "d25-zoetrope": "createZoetrope",
  "acid-bloom": "createAcidBloom",
  "asteroid-drift": "createAsteroidDrift",
  "aurora-ribbon": "createAuroraRibbon",
  "bacteria-culture": "createBacteriaCulture",
  "bamboo-shadow": "createBambooShadow",
  "binary-star": "createBinaryStar",
  "bird-murmuration": "createBirdMurmuration",
  "black-hole-lens": "createBlackHoleLens",
  "blizzard-whiteout": "createBlizzardWhiteout",
  "breathing-gradient": "createBreathingGradient",
  "bubble-universe": "createBubbleUniverse",
  "butterfly-meadow": "createButterflyMeadow",
  "candle-glow": "createCandleGlow",
  "canyon-wind": "createCanyonWind",
  "cellular-automata": "createCellularAutomata",
  "circuit-board": "createCircuitBoard",
  "city-lights": "createCityLights",
  "clockwork-gears": "createClockworkGears",
  "coffee-swirl": "createCoffeeSwirl",
  "comet-tail": "createCometTail",
  "confetti-drift": "createConfettiDrift",
  "coral-glow": "createCoralGlow",
  "cosmic-web": "createCosmicWeb",
  "crystal-cave": "createCrystalCave",
  "crystal-prism": "createCrystalPrism",
  "data-stream": "createDataStream",
  "deep-sea-jelly": "createDeepSeaJelly",
  "desert-mirage": "createDesertMirage",
  "digital-noise": "createDigitalNoise",
  "dune-shift": "createDuneShift",
  "dust-motes": "createDustMotes",
  "echo-ripple": "createEchoRipple",
  "eclipse-ring": "createEclipseRing",
  "ember-storm": "createEmberStorm",
  "equalizer-bars": "createEqualizerBars",
  "fern-fractal": "createFernFractal",
  "fiber-optic": "createFiberOptic",
  "film-grain": "createFilmGrain",
  "firefly-swarm": "createFireflySwarm",
  "fireworks-night": "createFireworksNight",
  "fish-school": "createFishSchool",
  "frost-window": "createFrostWindow",
  "glitch-art": "createGlitchArt",
  "glitter-wave": "createGlitterWave",
  "gradient-orb": "createGradientOrb",
  "gravity-grid": "createGravityGrid",
  "hailstorm": "createHailstorm",
  "halo-ring": "createHaloRing",
  "heat-shimmer": "createHeatShimmer",
  "hologram-scan": "createHologramScan",
  "honeycomb": "createHoneycomb",
  "ice-flow": "createIceFlow",
  "kaleidoscope": "createKaleidoscope",
  "kelp-forest": "createKelpForest",
  "lantern-festival": "createLanternFestival",
  "laser-grid": "createLaserGrid",
  "lava-flow": "createLavaFlow",
  "lava-lamp": "createLavaLamp",
  "light-leak": "createLightLeak",
  "lighthouse-beam": "createLighthouseBeam",
  "lightning-field": "createLightningField",
  "liquid-gradient": "createLiquidGradient",
  "lotus-pond": "createLotusPond",
  "magnet-shavings": "createMagnetShavings",
  "mercury-droplet": "createMercuryDroplet",
  "meteor-shower": "createMeteorShower",
  "mirror-hall": "createMirrorHall",
  "monsoon-clouds": "createMonsoonClouds",
  "moon-phases": "createMoonPhases",
  "moth-flight": "createMothFlight",
  "mountain-mist": "createMountainMist",
  "nebula-pillars": "createNebulaPillars",
  "neon-sign": "createNeonSign",
  "ocean-foam": "createOceanFoam",
  "ocean-swell": "createOceanSwell",
  "op-art": "createOpArt",
  "orbit-garden": "createOrbitGarden",
  "paint-drip": "createPaintDrip",
  "pendulum-wave": "createPendulumWave",
  "quantum-foam": "createQuantumFoam",
  "radar-sweep": "createRadarSweep",
  "rain-veil": "createRainVeil",
  "river-delta": "createRiverDelta",
  "sand-ripple": "createSandRipple",
  "sea-sparkle": "createSeaSparkle",
  "silk-ribbon": "createSilkRibbon",
  "smoke-column": "createSmokeColumn",
  "snow-globe": "createSnowGlobe",
  "solar-wind": "createSolarWind",
  "spider-silk": "createSpiderSilk",
  "spiral-shell": "createSpiralShell",
  "stained-glass": "createStainedGlass",
  "star-nursery": "createStarNursery",
  "storm-front": "createStormFront",
  "tide-pool": "createTidePool",
  "topographic-map": "createTopographicMap",
  "tornado-vortex": "createTornadoVortex",
  "tree-canopy": "createTreeCanopy",
  "wave-interference": "createWaveInterference",
  "zen-garden": "createZenGarden",
  "abacus-frame": "createAbacusFrame",
  "arcade-cabinet": "createArcadeCabinet",
  "armillary-sphere": "createArmillarySphere",
  "atom-model": "createAtomModel",
  "balloon-cluster": "createBalloonCluster",
  "battery-cell": "createBatteryCell",
  "beehive-skep": "createBeehiveSkep",
  "birdcage": "createBirdcage",
  "black-hole-disk": "createBlackHoleDisk",
  "boombox": "createBoombox",
  "boomerang-orbit": "createBoomerangOrbit",
  "bowling-pin": "createBowlingPin",
  "cactus-trio": "createCactusTrio",
  "camera-vintage": "createCameraVintage",
  "cannon-ball": "createCannonBall",
  "cassette-tape": "createCassetteTape",
  "castle-turret": "createCastleTurret",
  "catapult": "createCatapult",
  "chess-knight": "createChessKnight",
  "clay-vessel": "createClayVessel",
  "compass-needle": "createCompassNeedle",
  "conch-shell": "createConchShell",
  "coral-branch": "createCoralBranch",
  "crystal-ball": "createCrystalBall",
  "crystal-wand": "createCrystalWand",
  "cube-stack": "createCubeStack",
  "d20-dice": "createD20Dice",
  "dartboard": "createDartboard",
  "disco-ball": "createDiscoBall",
  "dna-twist": "createDnaTwist",
  "domino-arc": "createDominoArc",
  "edison-bulb": "createEdisonBulb",
  "faceted-head": "createFacetedHead",
  "film-reel": "createFilmReel",
  "gem-cluster": "createGemCluster",
  "geode-slice": "createGeodeSlice",
  "goldfish-bowl": "createGoldfishBowl",
  "gong-strike": "createGongStrike",
  "gramophone": "createGramophone",
  "gyroscope": "createGyroscope",
  "hand-drum": "createHandDrum",
  "harp-strings": "createHarpStrings",
  "headphones": "createHeadphones",
  "horseshoe-magnet": "createHorseshoeMagnet",
  "hot-air-balloon": "createHotAirBalloon",
  "ice-cream-cone": "createIceCreamCone",
  "joystick-arcade": "createJoystickArcade",
  "kite-drift": "createKiteDrift",
  "knight-helmet": "createKnightHelmet",
  "maracas": "createMaracas",
  "metronome-arm": "createMetronomeArm",
  "microphone": "createMicrophone",
  "microscope": "createMicroscope",
  "moai-statue": "createMoaiStatue",
  "mushroom-ring": "createMushroomRing",
  "music-box": "createMusicBox",
  "nautilus-shell": "createNautilusShell",
  "nest-eggs": "createNestEggs",
  "newtons-cradle": "createNewtonsCradle",
  "orbit-satellite": "createOrbitSatellite",
  "paper-lantern": "createPaperLantern",
  "paper-plane-swarm": "createPaperPlaneSwarm",
  "penguin-chick": "createPenguinChick",
  "piano-keys": "createPianoKeys",
  "pinball-bumper": "createPinballBumper",
  "pinwheel-spin": "createPinwheelSpin",
  "plasma-globe": "createPlasmaGlobe",
  "pocket-watch": "createPocketWatch",
  "poker-chips": "createPokerChips",
  "potion-flask": "createPotionFlask",
  "pulsar-star": "createPulsarStar",
  "retro-rocket": "createRetroRocket",
  "royal-crown": "createRoyalCrown",
  "rubber-duck": "createRubberDuck",
  "satellite-dish": "createSatelliteDish",
  "slinky-stairs": "createSlinkyStairs",
  "slot-machine": "createSlotMachine",
  "solar-panel-array": "createSolarPanelArray",
  "space-station-core": "createSpaceStationCore",
  "speaker-cone": "createSpeakerCone",
  "spinning-top": "createSpinningTop",
  "sunflower-head": "createSunflowerHead",
  "swinging-bell": "createSwingingBell",
  "sword-in-stone": "createSwordInStone",
  "teapot": "createTeapot",
  "telescope": "createTelescope",
  "tesla-coil": "createTeslaCoil",
  "top-hat": "createTopHat",
  "tower-of-hanoi": "createTowerOfHanoi",
  "treasure-chest": "createTreasureChest",
  "trophy-cup": "createTrophyCup",
  "tuning-fork": "createTuningFork",
  "ufo-saucer": "createUfoSaucer",
  "umbrella-spin": "createUmbrellaSpin",
  "vinyl-record": "createVinylRecord",
  "wind-chime": "createWindChime",
  "wind-turbine": "createWindTurbine",
  "wire-bonsai": "createWireBonsai",
  "witch-cauldron": "createWitchCauldron",
  "yoyo-trick": "createYoYoTrick",
  "abyssal-trench": "createAbyssalTrench",
  "airship-armada": "createAirshipArmada",
  "alchemy-circle": "createAlchemyCircle",
  "amethyst-cavern": "createAmethystCavern",
  "astronaut-drift": "createAstronautDrift",
  "aurora-peaks": "createAuroraPeaks",
  "book-portal": "createBookPortal",
  "buried-colossus": "createBuriedColossus",
  "campfire-comet": "createCampfireComet",
  "circus-tent": "createCircusTent",
  "cliffside-temple": "createCliffsideTemple",
  "clockwork-orrery": "createClockworkOrrery",
  "cloud-haven": "createCloudHaven",
  "cosmic-curtain": "createCosmicCurtain",
  "cosmic-lotus": "createCosmicLotus",
  "crane-wish": "createCraneWish",
  "crystal-deer": "createCrystalDeer",
  "deep-diver": "createDeepDiver",
  "desert-camp": "createDesertCamp",
  "desert-night": "createDesertNight",
  "desert-pyramid": "createDesertPyramid",
  "door-in-the-sky": "createDoorInTheSky",
  "dragon-hoard": "createDragonHoard",
  "dragon-parade": "createDragonParade",
  "dragonfly-dusk": "createDragonflyDusk",
  "dreamcatcher": "createDreamcatcher",
  "dusk-balloon": "createDuskBalloon",
  "ember-forge": "createEmberForge",
  "fairy-ring": "createFairyRing",
  "floating-city": "createFloatingCity",
  "floating-library": "createFloatingLibrary",
  "floating-runestones": "createFloatingRunestones",
  "frost-heart": "createFrostHeart",
  "galaxy-jar": "createGalaxyJar",
  "genie-smoke": "createGenieSmoke",
  "ghost-ship": "createGhostShip",
  "glass-dunes": "createGlassDunes",
  "gondola-night": "createGondolaNight",
  "gravity-well": "createGravityWell",
  "hanging-gardens": "createHangingGardens",
  "harbor-moon": "createHarborMoon",
  "henge-dawn": "createHengeDawn",
  "hourglass-time": "createHourglassTime",
  "hyperspace-gate": "createHyperspaceGate",
  "iceberg-drift": "createIcebergDrift",
  "icebreaker-dawn": "createIcebreakerDawn",
  "ink-mountains": "createInkMountains",
  "jelly-bloom": "createJellyBloom",
  "jungle-temple": "createJungleTemple",
  "kitsune-foxfire": "createKitsuneFoxfire",
  "long-neck-sunset": "createLongNeckSunset",
  "lumina-rain": "createLuminaRain",
  "magic-carpet": "createMagicCarpet",
  "manta-glide": "createMantaGlide",
  "marigold-night": "createMarigoldNight",
  "mermaid-rock": "createMermaidRock",
  "midnight-carousel": "createMidnightCarousel",
  "moon-gate": "createMoonGate",
  "moonlit-oasis": "createMoonlitOasis",
  "moonlit-sea": "createMoonlitSea",
  "mushroom-grove": "createMushroomGrove",
  "neon-metropolis": "createNeonMetropolis",
  "night-ferris": "createNightFerris",
  "octopus-lair": "createOctopusLair",
  "orbital-station": "createOrbitalStation",
  "origami-flock": "createOrigamiFlock",
  "owl-watch": "createOwlWatch",
  "phoenix-ascent": "createPhoenixAscent",
  "pillar-of-dawn": "createPillarOfDawn",
  "pipe-cathedral": "createPipeCathedral",
  "planet-rise": "createPlanetRise",
  "portal-stairs": "createPortalStairs",
  "redwood-rays": "createRedwoodRays",
  "rocket-dawn": "createRocketDawn",
  "rooftop-cat": "createRooftopCat",
  "rune-circle": "createRuneCircle",
  "serpent-of-stars": "createSerpentOfStars",
  "shrine-steps": "createShrineSteps",
  "sky-elevator": "createSkyElevator",
  "sky-isles": "createSkyIsles",
  "sky-train": "createSkyTrain",
  "sleeping-giant": "createSleepingGiant",
  "snail-village": "createSnailVillage",
  "spirit-river": "createSpiritRiver",
  "star-whale": "createStarWhale",
  "starfall-cliff": "createStarfallCliff",
  "stargazer-dome": "createStargazerDome",
  "still-lake": "createStillLake",
  "stormbreak-rainbow": "createStormbreakRainbow",
  "terraced-temple": "createTerracedTemple",
  "totem-awakening": "createTotemAwakening",
  "treasure-map": "createTreasureMap",
  "underwater-ruins": "createUnderwaterRuins",
  "vine-arch": "createVineArch",
  "winding-wall": "createWindingWall",
  "windmill-dusk": "createWindmillDusk",
  "windward-cliffs": "createWindwardCliffs",
  "world-tree": "createWorldTree",
  "world-turtle": "createWorldTurtle",
  "zodiac-wheel": "createZodiacWheel",
  "loader-honeycomb": "createLoaderHoneycomb",
  "loader-sunrise": "createLoaderSunrise",
  "loader-shuffle": "createLoaderShuffle",
  "button-progress-fill": "createProgressFillButton",
  "button-flip-confirm": "createFlipConfirmButton",
  "effect-aurora-text": "createAuroraText",
  "effect-magnetic-card": "createMagneticCard",
  "motion-elastic-tooltip": "createElasticTooltip",
  "motion-bounce-badge": "createBounceBadge",
  "d25-coin-stack": "createCoinStack",
  "d25-stair-shadow": "createStairShadow",
  "rain-ripples": "createRainRipples",
  "aurora-waves": "createAuroraWaves",
  "paper-crane-3d": "createPaperCrane3D",
  "hourglass-3d": "createHourglass3D",
  "neon-city-hero": "createNeonCityHero",
  "murmuration-hero": "createMurmurationHero",
  "form-floating-label": "createFloatingLabelInput",
  "form-search-expand": "createSearchExpand",
  "form-otp-input": "createOtpInput",
  "form-toggle-row": "createToggleRow",
  "form-range-slider": "createRangeSlider",
  "form-checkbox-draw": "createCheckboxDraw",
  "form-radio-cards": "createRadioCards",
  "form-input-counter": "createInputCounter",
  "nav-pill-nav": "createPillNav",
  "nav-underline-tabs": "createUnderlineTabs",
  "nav-stepper": "createStepper",
  "nav-dock-magnify": "createDockMagnify",
  "nav-breadcrumb": "createBreadcrumb",
  "nav-rail": "createRailNav",
  "nav-dots-pager": "createDotsPager",
  "nav-burger-morph": "createBurgerMorph",
  "card-profile": "createProfileCard",
  "card-product": "createProductCard",
  "card-stat": "createStatCard",
  "card-testimonial": "createTestimonialCard",
  "card-article": "createArticleCard",
  "card-team": "createTeamCard",
  "card-notification": "createNotificationCard",
  "card-login": "createLoginCard",
  "pricing-tiers": "createPricingTiers",
  "pricing-billing-toggle": "createBillingToggle",
  "pricing-feature-table": "createFeatureTable",
  "pricing-hero": "createPricingHero",
  "pricing-addon-picker": "createAddonPicker",
  "pricing-coupon": "createCouponInput",
  "pricing-invoice": "createInvoiceCard",
  "pricing-currency": "createCurrencySwitcher",
  "overlay-modal": "createModal",
  "overlay-command-palette": "createCommandPalette",
  "overlay-popover": "createPopover",
  "overlay-drawer": "createDrawer",
  "overlay-snackbar": "createSnackbar",
  "overlay-confirm-dialog": "createConfirmDialog",
  "overlay-lightbox": "createLightbox",
  "overlay-context-menu": "createContextContextMenu",
  "table-sortable": "createSortableTable",
  "table-selectable": "createSelectableTable",
  "table-expandable": "createExpandableTable",
  "table-skeleton": "createSkeletonTable",
  "table-sparkline-rows": "createSparklineRows",
  "table-inline-edit": "createInlineEditTable",
  "tooltip-follow": "createFollowTooltip",
  "tooltip-hotkey": "createHotkeyTooltip",
  "tooltip-rich": "createRichTooltip",
  "tooltip-anchor": "createAnchorTooltip",
  "tooltip-copy": "createCopyTooltip",
  "tooltip-avatar-stack": "createAvatarTooltip",
};
