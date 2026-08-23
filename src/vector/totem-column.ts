export interface TotemColumnOptions {
  seed?: number;
  size?: number;
  tiers?: number;
  base?: string;
  accent?: string;
}

export function createTotemColumn(options: TotemColumnOptions = {}): string {
  const { seed = 30, size = 720, tiers = 6, base = '#18181b', accent = '#f472b6' } = options;
  const cx = size / 2;
  const colW = size * 0.34;
  const tierH = size * 0.82 / tiers;
  const topY = size * 0.9;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const els: string[] = [];
  for (let i = 0; i < tiers; i++) {
    const y = topY - (i + 1) * tierH;
    const w = colW * (1 - i * 0.07);
    const isAccent = i === Math.floor(tiers / 2);
    const color = isAccent ? accent : base;
    els.push(`      <rect x="${(cx - w / 2).toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${tierH.toFixed(1)}" fill="${color}" fill-opacity="${isAccent ? 0.3 : 1}" stroke="#52525b" stroke-width="1.2"${isAccent ? '>\n        <animate attributeName="fill-opacity" values="0.3;0.55;0.3" dur="5s" repeatCount="indefinite" />\n      ' : ''} />`);
    const kind = i % 3;
    if (kind === 0) {
      els.push(`      <circle cx="${cx - w * 0.2}" cy="${(y + tierH * 0.45).toFixed(1)}" r="${(tierH * 0.12).toFixed(1)}" fill="#a1a1aa" />
      <circle cx="${cx + w * 0.2}" cy="${(y + tierH * 0.45).toFixed(1)}" r="${(tierH * 0.12).toFixed(1)}" fill="#a1a1aa" />`);
    } else if (kind === 1) {
      const teeth = 5;
      let d = `M${(cx - w * 0.35).toFixed(1)} ${(y + tierH * 0.7).toFixed(1)}`;
      for (let t = 0; t < teeth; t++) {
        d += ` l${(w * 0.14).toFixed(1)} ${(-tierH * 0.22).toFixed(1)} l${(w * 0.14).toFixed(1)} ${(tierH * 0.22).toFixed(1)}`;
      }
      els.push(`      <path d="${d}" fill="none" stroke="#a1a1aa" stroke-width="2" />`);
    } else {
      els.push(`      <path d="M${(cx - w * 0.3).toFixed(1)} ${(y + tierH * 0.75).toFixed(1)} Q${cx} ${(y + tierH * (rnd() > 0.5 ? 0.15 : 0.85)).toFixed(1)} ${(cx + w * 0.3).toFixed(1)} ${(y + tierH * 0.75).toFixed(1)}" fill="none" stroke="#a1a1aa" stroke-width="2" />`);
    }
  }
  els.push(`      <rect x="${(cx - colW * 0.42).toFixed(1)}" y="${(topY + 4).toFixed(1)}" width="${(colW * 0.84).toFixed(1)}" height="10" fill="#27272a" />`);

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
