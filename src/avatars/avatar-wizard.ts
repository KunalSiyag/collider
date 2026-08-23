export interface AvatarWizardOptions {
  size?: number;
}

export function createAvatarWizard(options: AvatarWizardOptions = {}): string {
  const { size = 128 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Wizard avatar">
  <rect width="128" height="128" rx="36" fill="#6366f1" opacity="0.15"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -2.5;0 0" dur="2.7s" repeatCount="indefinite"/>
    <circle cx="64" cy="74" r="30" fill="#fbbf24"/>
    <path d="M64 10 L96 56 L32 56 Z" fill="#4338ca"/>
    <path d="M64 10 L80 34 L48 34 Z" fill="#6366f1"/>
    <path d="M64 4 L67 12 L64 20 L61 12 Z" fill="#facc15"><animate attributeName="opacity" values="1;.4;1" dur="1.8s" repeatCount="indefinite"/></path>
    <circle cx="53" cy="76" r="5.5" fill="#1e1b4b"/><circle cx="75" cy="76" r="5.5" fill="#1e1b4b"/>
    <circle cx="55" cy="74" r="2" fill="#fff"/><circle cx="77" cy="74" r="2" fill="#fff"/>
    <path d="M56 90 Q64 97 72 90" stroke="#78350f" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M40 62 C50 54 78 54 88 62 L84 68 C74 60 54 60 44 68 Z" fill="#312e81"/>
    <g stroke="#a5b4fc" stroke-width="2.5" stroke-linecap="round" opacity=".9">
      <path d="M104 30 l4 0 m-2 -2 l0 4"><animate attributeName="opacity" values="1;.2;1" dur="1.4s" repeatCount="indefinite"/></path>
      <path d="M112 42 l5 0 m-2.5 -2.5 l0 5"><animate attributeName="opacity" values=".2;1;.2" dur="1.8s" repeatCount="indefinite"/></path>
    </g>
  </g>
</svg>`;
}
