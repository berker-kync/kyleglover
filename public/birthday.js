/* ==========================================================================
   BIRTHDAY ENVELOPE — temporary feature
   To remove: delete this file AND the line
     <script src="birthday.js"></script>
   from index.html. Nothing else depends on it.
   ========================================================================== */
(() => {
  const css = `
  .bd {
    position: fixed; inset: 0; z-index: 1000;
    perspective: 1800px;
    overflow: hidden;
    font-family: "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;
  }
  .bd-inside { position: absolute; inset: 0; background: #5E2A15; transition: opacity .6s ease .9s; }

  .bd-piece { position: absolute; inset: 0; transition: transform 1s cubic-bezier(.7,0,.25,1); will-change: transform; }
  .bd-left   { background: #E6DBC8; clip-path: polygon(0 0, 52% 54%, 0 100%); }
  .bd-right  { background: #E6DBC8; clip-path: polygon(100% 0, 48% 54%, 100% 100%); }
  .bd-bottom-wrap { filter: drop-shadow(0 -6px 10px rgba(43,38,33,.12)); }
  .bd-bottom { position: absolute; inset: 0; background: #EFE7D9; clip-path: polygon(0 100%, 50% 46%, 100% 100%); }

  /* Top flap — folds open around its top edge */
  .bd-flap-wrap {
    position: absolute; inset: 0;
    transform-origin: 50% 0;
    transform-style: preserve-3d;
    filter: drop-shadow(0 10px 14px rgba(43,38,33,.25));
    transition: transform 1s cubic-bezier(.6,0,.3,1);
    z-index: 3;
  }
  .bd-flap { position: absolute; inset: 0; background: #8F4526; clip-path: polygon(0 0, 100% 0, 50% 58%); }
  .bd-flap::after {   /* subtle fold highlight */
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(255,255,255,.06), transparent 60%);
  }

  /* Text on the envelope */
  .bd-note {
    position: absolute; left: 0; right: 0; bottom: 9vh;
    text-align: center; color: #2B2621; z-index: 2;
    padding: 0 24px;
    transition: opacity .4s ease, transform .6s ease;
  }
  .bd-to {
    font-size: 11px; letter-spacing: .24em; text-transform: uppercase;
    color: #8F4526; margin-bottom: 12px;
  }
  .bd-msg {
    font-family: "Instrument Serif", Georgia, serif;
    font-size: clamp(40px, 7.5vw, 92px);
    line-height: 1; letter-spacing: -.01em;
  }
  .bd-msg em { color: #8F4526; }
  .bd-hint { margin-top: 16px; font-size: 13px; color: #6B6053; }

  /* Wax seal = the open button */
  .bd-seal {
    position: absolute; left: 50%; top: 58%;
    width: clamp(84px, 11vw, 120px); aspect-ratio: 1;
    transform: translate(-50%, -50%);
    border: 0; border-radius: 50%; cursor: pointer; z-index: 4;
    background: radial-gradient(circle at 35% 30%, #A65532, #6E3219 70%);
    box-shadow: 0 6px 16px rgba(43,38,33,.35), inset 0 0 0 6px rgba(0,0,0,.08), inset 0 0 0 8px rgba(255,255,255,.08);
    color: #F3E7D8;
    font-family: "Instrument Serif", Georgia, serif;
    font-size: clamp(26px, 3.2vw, 36px);
    display: grid; place-items: center;
    transition: transform .45s cubic-bezier(.5,-.5,.5,1.5), opacity .35s ease;
    animation: bd-pulse 2.4s ease-in-out infinite;
  }
  .bd-seal span { display: block; line-height: 1; }
  .bd-seal small {
    position: absolute; bottom: 22%;
    font-family: "DM Sans", sans-serif; font-size: 9px; letter-spacing: .2em; text-transform: uppercase; opacity: .75;
  }
  .bd-seal:hover { transform: translate(-50%, -50%) scale(1.06); }
  .bd-seal:focus-visible { outline: 2px solid #F3E7D8; outline-offset: 6px; }
  @keyframes bd-pulse {
    0%, 100% { box-shadow: 0 6px 16px rgba(43,38,33,.35), 0 0 0 0 rgba(143,69,38,.35); }
    50%      { box-shadow: 0 6px 16px rgba(43,38,33,.35), 0 0 0 14px rgba(143,69,38,0); }
  }

  /* ----- Opening sequence ----- */
  .bd.open .bd-seal  { animation: none; transform: translate(-50%, -50%) scale(0); opacity: 0; }
  .bd.open .bd-note  { opacity: 0; transform: translateY(20px); }
  .bd.open .bd-flap-wrap { transform: rotateX(180deg); }
  .bd.open .bd-flap  { background: #6E3219; }

  .bd.reveal .bd-left   { transform: translateX(-105%); }
  .bd.reveal .bd-right  { transform: translateX(105%); }
  .bd.reveal .bd-bottom-wrap { transform: translateY(105%); }
  .bd.reveal .bd-flap-wrap   { transform: rotateX(180deg) translateY(110%); }
  .bd.reveal .bd-inside { opacity: 0; transition-delay: 0s; }

  .bd-confetti { position: fixed; inset: 0; z-index: 1001; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .bd *, .bd { transition-duration: .01s !important; animation: none !important; }
  }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const el = document.createElement('div');
  el.className = 'bd';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-label', 'Birthday envelope');
  el.innerHTML = `
    <div class="bd-inside"></div>
    <div class="bd-piece bd-left"></div>
    <div class="bd-piece bd-right"></div>
    <div class="bd-piece bd-bottom-wrap"><div class="bd-bottom"></div></div>
    <div class="bd-flap-wrap"><div class="bd-flap"></div></div>
    <div class="bd-note">
      <p class="bd-to">For Kyle</p>
      <p class="bd-msg">Happy Birthday, <em>Kyle</em></p>
      <p class="bd-hint">Tap the seal to open</p>
    </div>
    <button class="bd-seal" aria-label="Open the envelope"><span>KG</span><small>Open</small></button>
  `;
  document.body.prepend(el);

  const seal = el.querySelector('.bd-seal');
  seal.focus({ preventScroll: true });

  seal.addEventListener('click', () => {
    if (el.classList.contains('open')) return;
    el.classList.add('open');                       // seal pops, flap folds open
    setTimeout(() => {
      el.classList.add('reveal');                   // envelope slides away
      confetti();
      replayCard();
    }, 950);
    setTimeout(() => el.remove(), 2300);            // clean up
  });

  /* Re-run the business card's entrance so it "lands" after the envelope opens */
  function replayCard() {
    const scene = document.querySelector('.scene');
    if (!scene) return;
    scene.style.animation = 'none';
    void scene.offsetWidth;
    scene.style.animation = '';
  }

  /* Confetti in the site's palette */
  function confetti() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = document.createElement('canvas');
    c.className = 'bd-confetti';
    document.body.appendChild(c);
    const ctx = c.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = c.width = innerWidth * dpr, H = c.height = innerHeight * dpr;
    c.style.width = innerWidth + 'px'; c.style.height = innerHeight + 'px';
    const colors = ['#8F4526', '#C9824F', '#E6A47E', '#F3E7D8', '#2B2621', '#D4A64A'];
    const count = innerWidth < 700 ? 110 : 180;
    const bits = Array.from({ length: count }, () => ({
      x: W / 2 + (Math.random() - .5) * W * .3,
      y: H * .55,
      vx: (Math.random() - .5) * 26 * dpr,
      vy: (-Math.random() * 26 - 10) * dpr,
      w: (6 + Math.random() * 6) * dpr,
      h: (8 + Math.random() * 10) * dpr,
      r: Math.random() * Math.PI,
      vr: (Math.random() - .5) * .3,
      color: colors[(Math.random() * colors.length) | 0],
    }));
    const start = performance.now();
    (function frame(t) {
      const age = t - start;
      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = Math.max(0, 1 - Math.max(0, age - 2200) / 800);
      for (const b of bits) {
        b.vy += .55 * dpr; b.vx *= .985; b.vy *= .985;
        b.x += b.vx; b.y += b.vy; b.r += b.vr;
        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.r);
        ctx.fillStyle = b.color;
        ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h * Math.abs(Math.cos(b.r * 2)));
        ctx.restore();
      }
      if (age < 3000) requestAnimationFrame(frame); else c.remove();
    })(start);
  }
})();
