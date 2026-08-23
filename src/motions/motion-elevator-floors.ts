import gsap from 'gsap';

export interface ElevatorFloorsOptions {
  floors?: number;
}

export function createElevatorFloors(
  container: HTMLElement,
  options: ElevatorFloorsOptions = {},
): () => void {
  const { floors = 5 } = options;

  container.innerHTML = `
    <style>
      .el { height:100%; display:flex; align-items:center; justify-content:center; gap:26px; background:#0b0b10;
        font-family:ui-monospace,monospace; }
      .el-shaft { position:relative; width:64px; height:min(320px,70%); border:1px solid #3f3f46; border-radius:12px;
        background:#131317; overflow:hidden; }
      .el-car { position:absolute; left:6px; height:56px; width:calc(100% - 12px);
        background:linear-gradient(180deg,#a78bfa,#7c3aed); border-radius:8px;
        display:flex; align-items:center; justify-content:center; color:#fff; font-size:15px; font-weight:700; }
      .el-panel { display:flex; flex-direction:column-reverse; gap:10px; }
      .el-floor { width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center;
        font-size:13px; color:#71717a; border:1px solid #27272a; background:#121218; }
      .el-floor.on { color:#fff; background:#7c3aed; border-color:#a78bfa; box-shadow:0 0 12px #8b5cf666; }
    </style>
    <div class="el">
      <div class="el-shaft"><div class="el-car">1</div></div>
      <div class="el-panel">
        ${Array.from({ length: floors }, (_, i) => `<div class="el-floor">${i + 1}</div>`).join('')}
      </div>
    </div>
  `;

  const shaft = container.querySelector<HTMLElement>('.el-shaft')!;
  const car = shaft.querySelector<HTMLElement>('.el-car')!;
  const stops = [...container.querySelectorAll<HTMLElement>('.el-floor')];
  const order = [1, 3, 5, 2, 4].filter((n) => n <= floors);

  const ctx = gsap.context(() => {
    gsap.set(car, { bottom: 6 });
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
    order.forEach((stop) => {
      const slotH = (shaft.clientHeight - 12) / floors;
      tl.to(car, { bottom: 6 + slotH * (stop - 1), duration: 0.9, ease: 'power2.inOut' });
      tl.call(() => {
        stops.forEach((s, j) => s.classList.toggle('on', j === stop - 1));
        car.textContent = String(stop);
      });
      tl.to(car, { scaleY: 0.94, duration: 0.08, yoyo: true, repeat: 1 }, '<');
      tl.to({}, { duration: 0.55 });
    });
  }, container);

  return () => ctx.revert();
}
