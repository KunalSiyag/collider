/** Breadcrumb — crumbs with a chevron slide-in on the active segment. */
export interface BreadcrumbOptions {
  parts?: string[];
  accent?: string;
}

export function createBreadcrumb(container: HTMLElement, options: BreadcrumbOptions = {}): () => void {
  const { parts = ['Workspace', 'Projects', 'Collider', 'Charts'], accent = '#8b5cf6' } = options;
  container.innerHTML = `<style>
    .nv-bc{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .nv-bc nav{display:flex;align-items:center;gap:4px;font:500 13.5px system-ui}
    .nv-bc a{color:#71717a;text-decoration:none;padding:5px 8px;border-radius:7px;transition:color .15s ease,background .15s ease}
    .nv-bc a:hover{color:#fafafa;background:#18181b}
    .nv-bc .current{color:#fafafa;background:${accent}1f;padding:5px 10px;border-radius:7px;
      animation:nv-bc-in .4s cubic-bezier(.3,1.2,.4,1) both}
    .nv-bc .sep{color:#3f3f46;animation:nv-bc-in .4s ease both}
    @keyframes nv-bc-in{from{opacity:0;transform:translateX(-7px)}to{opacity:1;transform:none}}
  </style>
  <div class="nv-bc"><nav aria-label="Breadcrumb">
    ${parts
      .map((p, i) => {
        const last = i === parts.length - 1;
        return `${i > 0 ? `<span class="sep" style="animation-delay:${i * 0.06}s">›</span>` : ''}${
          last
            ? `<span class="current" style="animation-delay:${i * 0.06}s" aria-current="page">${p}</span>`
            : `<a href="#" style="animation-delay:${i * 0.06}s" onclick="return false">${p}</a>`
        }`;
      })
      .join('')}
  </nav></div>`;
  return () => { container.innerHTML = ''; };
}
