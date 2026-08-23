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
};

export function getSource(slug: string): string {
  return sources[slug] ?? '';
}
