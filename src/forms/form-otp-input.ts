/** OTP Input — six digit boxes with auto-advance, backspace and paste support. */
export interface OtpInputOptions {
  length?: number;
  accent?: string;
  onComplete?: (code: string) => void;
}

export function createOtpInput(container: HTMLElement, options: OtpInputOptions = {}): () => void {
  const { length = 6, accent = '#8b5cf6', onComplete } = options;
  container.innerHTML = `<style>
    .fm-otp{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .fm-otp .row{display:flex;gap:9px}
    .fm-otp input{width:44px;height:54px;text-align:center;font:700 21px system-ui;color:#fafafa;
      background:#18181b;border:1.5px solid #3f3f46;border-radius:11px;outline:none;caret-color:${accent};
      transition:border-color .15s ease,box-shadow .15s ease,transform .15s ease}
    .fm-otp input:focus{border-color:${accent};box-shadow:0 0 0 3px ${accent}33;transform:translateY(-2px)}
  </style>
  <div class="fm-otp"><div class="row">
    ${Array.from({ length }, (_, i) => `<input inputmode="numeric" maxlength="1" aria-label="Digit ${i + 1}"/>`).join('')}
  </div></div>`;

  const inputs = [...container.querySelectorAll<HTMLInputElement>('input')];

  const onInput = (e: Event) => {
    const el = e.target as HTMLInputElement;
    const idx = inputs.indexOf(el);
    el.value = el.value.replace(/\D/g, '').slice(-1);
    if (el.value && idx < inputs.length - 1) inputs[idx + 1].focus();
    const code = inputs.map((i) => i.value).join('');
    if (code.length === length && !code.includes('')) onComplete?.(code);
  };
  const onKey = (e: KeyboardEvent) => {
    const el = e.target as HTMLInputElement;
    const idx = inputs.indexOf(el);
    if (e.key === 'Backspace' && !el.value && idx > 0) inputs[idx - 1].focus();
    if (e.key === 'ArrowLeft' && idx > 0) inputs[idx - 1].focus();
    if (e.key === 'ArrowRight' && idx < inputs.length - 1) inputs[idx + 1].focus();
  };
  const onPaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const digits = (e.clipboardData?.getData('text') ?? '').replace(/\D/g, '').slice(0, length);
    digits.split('').forEach((d, i) => (inputs[i].value = d));
    inputs[Math.min(digits.length, length - 1)].focus();
    if (digits.length === length) onComplete?.(digits);
  };

  inputs.forEach((el) => {
    el.addEventListener('input', onInput);
    el.addEventListener('keydown', onKey);
    el.addEventListener('paste', onPaste);
  });
  return () => {
    inputs.forEach((el) => {
      el.removeEventListener('input', onInput);
      el.removeEventListener('keydown', onKey);
      el.removeEventListener('paste', onPaste);
    });
    container.innerHTML = '';
  };
}
