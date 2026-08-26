/** Commit Log — a git-style graph with branch lines and popping commits. */
export interface CommitLogOptions {
  commits?: Array<{ msg: string; hash: string; branch: number }>;
  accent?: string;
}

export function createCommitLog(options: CommitLogOptions = {}): string {
  const {
    commits = [
      { msg: 'feat: streaming responses', hash: 'a3f9c21', branch: 0 },
      { msg: 'fix: token retry loop', hash: '7b21e04', branch: 1 },
      { msg: 'chore: bump deps', hash: 'c91d772', branch: 0 },
      { msg: 'feat: usage dashboard', hash: '44a0b8e', branch: 2 },
      { msg: 'docs: quickstart', hash: 'e2c551f', branch: 0 },
    ],
    accent = '#8b5cf6',
  } = options;

  const branchX = [26, 52, 78];
  const branchColors = [accent, '#22d3ee', '#f472b6'];
  const rowH = 56;
  const height = commits.length * rowH + 24;

  return `<svg viewBox="0 0 460 ${height}" width="460" height="${height}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  ${branchX
    .map(
      (x, bi) =>
        `<line x1="${x}" y1="14" x2="${x}" y2="${height - 10}" stroke="${branchColors[bi]}" stroke-width="2" opacity="0.28"/>`,
    )
    .join('')}
  ${commits
    .map((c, i) => {
      const y = 30 + i * rowH;
      const x = branchX[c.branch] ?? branchX[0];
      const tone = branchColors[c.branch] ?? accent;
      return `<g opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="${(0.15 + i * 0.22).toFixed(2)}s" fill="freeze"/>
        ${i < commits.length - 1 && commits[i + 1].branch !== c.branch
          ? `<path d="M${x} ${y} C ${x} ${y + rowH / 2} ${branchX[commits[i + 1].branch]} ${y + rowH / 2} ${branchX[commits[i + 1].branch]} ${y + rowH}" fill="none" stroke="${branchColors[commits[i + 1].branch]}" stroke-width="2" opacity="0.6"/>`
          : ''}
        <circle cx="${x}" cy="${y}" r="7" fill="#0b0b10" stroke="${tone}" stroke-width="2.6"/>
        <circle cx="${x}" cy="${y}" r="2.6" fill="${tone}"/>
        <text x="${x + 22}" y="${y - 2}" fill="#e4e4e7" font-size="13.5" font-weight="600" font-family="ui-monospace,monospace">${c.msg}</text>
        <text x="${x + 22}" y="${y + 14}" fill="#52525b" font-size="11" font-family="ui-monospace,monospace">${c.hash}</text>
      </g>`;
    })
    .join('')}
</svg>`;
}
