export interface AvatarAnimalOptions {
  variant?: 'bear' | 'panda' | 'frog' | 'fox';
  size?: number;
}

interface AnimalConfig {
  head: string;
  ear: string;
  earInner?: string;
  muzzle?: string;
  extra: 'muzzle' | 'patches' | 'eye-bumps' | 'cheeks';
}

const CONFIGS: Record<string, AnimalConfig> = {
  bear: { head: '#a1743c', ear: '#8a5f2e', muzzle: '#e7d0ae', extra: 'muzzle' },
  panda: { head: '#fafafa', ear: '#18181b', extra: 'patches' },
  frog: { head: '#4ade80', ear: '#22c55e', extra: 'eye-bumps' },
  fox: { head: '#f97316', ear: '#ea580c', muzzle: '#fff7ed', extra: 'cheeks' },
};

export function createAvatarAnimal(options: AvatarAnimalOptions = {}): string {
  const { variant = 'bear', size = 128 } = options;
  const config = CONFIGS[variant] ?? CONFIGS.bear!;

  let ears = '';
  let face = '';

  if (config.extra === 'eye-bumps') {
    ears = `
    <circle cx="42" cy="38" r="16" fill="${config.head}" />
    <circle cx="86" cy="38" r="16" fill="${config.head}" />
    <circle cx="42" cy="38" r="9" fill="#ffffff" />
    <circle cx="86" cy="38" r="9" fill="#ffffff" />
    <circle cx="44" cy="40" r="4.5" fill="#18181b" />
    <circle cx="84" cy="40" r="4.5" fill="#18181b" />`;
    face = `
    <path d="M48 74 Q64 88 80 74" stroke="#14532d" stroke-width="4.5" fill="none" stroke-linecap="round" />
    <circle cx="30" cy="70" r="6" fill="#fb7185" opacity="0.55" />
    <circle cx="98" cy="70" r="6" fill="#fb7185" opacity="0.55" />`;
  } else if (config.extra === 'patches') {
    ears = `
    <circle cx="36" cy="34" r="14" fill="${config.ear}" />
    <circle cx="92" cy="34" r="14" fill="${config.ear}" />`;
    face = `
    <ellipse cx="48" cy="64" rx="13" ry="15" fill="${config.ear}" transform="rotate(-18 48 64)" />
    <ellipse cx="80" cy="64" rx="13" ry="15" fill="${config.ear}" transform="rotate(18 80 64)" />
    <circle cx="49" cy="61" r="5" fill="#ffffff" />
    <circle cx="79" cy="61" r="5" fill="#ffffff" />
    <ellipse cx="64" cy="82" rx="10" ry="7" fill="${config.ear}" />
    <path d="M58 92 Q64 97 70 92" stroke="#18181b" stroke-width="3.5" fill="none" stroke-linecap="round" />`;
  } else if (config.extra === 'cheeks') {
    ears = `
    <path d="M28 44 L24 18 L50 32 Z" fill="${config.ear}" />
    <path d="M100 44 L104 18 L78 32 Z" fill="${config.ear}" />
    <path d="M31 40 L29 26 L43 33 Z" fill="#1c1917" />
    <path d="M97 40 L99 26 L85 33 Z" fill="#1c1917" />`;
    face = `
    <path d="M40 76 C40 96 52 102 64 102 C76 102 88 96 88 76 C80 82 72 84 64 84 C56 84 48 82 40 76 Z" fill="${config.muzzle}" />
    <ellipse cx="64" cy="76" rx="6.5" ry="5" fill="#1c1917" />
    <path d="M64 81 L60 87 M64 81 L68 87" stroke="#1c1917" stroke-width="2.5" stroke-linecap="round" />
    <circle cx="46" cy="62" r="5.5" fill="#18181b" />
    <circle cx="82" cy="62" r="5.5" fill="#18181b" />
    <circle cx="47.5" cy="60.5" r="2" fill="#ffffff" />
    <circle cx="83.5" cy="60.5" r="2" fill="#ffffff" />`;
  } else {
    ears = `
    <circle cx="36" cy="32" r="14" fill="${config.ear}" />
    <circle cx="92" cy="32" r="14" fill="${config.ear}" />
    <circle cx="36" cy="32" r="7" fill="${config.muzzle}" opacity="0.5" />
    <circle cx="92" cy="32" r="7" fill="${config.muzzle}" opacity="0.5" />`;
    face = `
    <ellipse cx="64" cy="80" rx="20" ry="15" fill="${config.muzzle}" />
    <ellipse cx="64" cy="72" rx="7" ry="5.5" fill="#1c1917" />
    <path d="M64 77 L60 83 M64 77 L68 83" stroke="#1c1917" stroke-width="2.5" stroke-linecap="round" />
    <circle cx="46" cy="60" r="5.5" fill="#1c1917" />
    <circle cx="82" cy="60" r="5.5" fill="#1c1917" />
    <circle cx="47.5" cy="58.5" r="2" fill="#ffffff" />
    <circle cx="83.5" cy="58.5" r="2" fill="#ffffff" />`;
  }

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${variant} avatar">
  <rect width="128" height="128" rx="36" fill="${config.head}" opacity="0.12" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="2.6s" repeatCount="indefinite" />
    ${ears}
    <circle cx="64" cy="68" r="40" fill="${config.head}" />
    ${face}
  </g>
</svg>`;
}
