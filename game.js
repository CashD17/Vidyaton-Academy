/* VIDYATON mini flappy game — white bird, black background, purple obstacles.
   Easy on purpose: wide gaps, slow speed, forgiving hitbox, only GOAL obstacles to win. */
(function () {
  const cv = document.getElementById("flappy");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const W = 480, H = 320, GOAL = 5;
  const GRAV = 820, FLAP = -280, SPEED = 110, PIPE_W = 58, GAP = 160, SPACING = 230;
  const BX = 120, BR = 12, HIT = 8;                 // bird x, drawn radius, forgiving hit radius
  const scoreEl = document.getElementById("gScore");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  cv.width = W * dpr; cv.height = H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  let state = "ready";                              // ready | playing | over | won
  let bird, pipes, score, last = 0, raf = 0, visible = true, t0 = 0, confetti = [];
  const stars = Array.from({ length: 36 }, () => ({ x:Math.random() * W, y:Math.random() * H, r:Math.random() * 1.4 + .3, s:Math.random() * 10 + 4 }));

  function reset() {
    bird = { y:H / 2, v:0 };
    pipes = []; score = 0; confetti = [];
    let cy = H / 2;
    for (let i = 0; i < 4; i++) {
      pipes.push({ x:W + 140 + i * SPACING, cy, done:false });
      cy = Math.max(GAP / 2 + 30, Math.min(H - GAP / 2 - 30, cy + (Math.random() - .5) * 110));   // gentle height changes
    }
    pipes.forEach((p, i) => { if (i === 0) p.cy = H / 2; });
    updateScore();
  }
  function updateScore() { if (scoreEl) scoreEl.textContent = Math.min(score, GOAL) + " / " + GOAL; }

  function flap() {
    if (state === "ready") { state = "playing"; }
    else if (state === "over" || state === "won") { reset(); state = "playing"; }
    if (state === "playing") bird.v = FLAP;
  }

  function step(dt) {
    stars.forEach(s => { s.x -= s.s * dt; if (s.x < 0) { s.x = W; s.y = Math.random() * H; } });
    if (state === "ready") { bird.y = H / 2 + Math.sin(performance.now() / 280) * 8; return; }
    if (state === "won") { confetti.forEach(c => { c.x += c.vx * dt; c.y += c.vy * dt; c.vy += 120 * dt; }); bird.y = H / 2 + Math.sin(performance.now() / 300) * 6; return; }
    if (state !== "playing") return;
    bird.v += GRAV * dt; bird.y += bird.v * dt;
    if (bird.y < BR) { bird.y = BR; bird.v = 0; }               // ceiling is safe
    if (bird.y > H - BR) { state = "over"; return; }           // floor ends the run
    pipes.forEach(p => {
      p.x -= SPEED * dt;
      if (!p.done && p.x + PIPE_W < BX - BR) { p.done = true; score++; updateScore(); }
      const hitX = BX + HIT > p.x && BX - HIT < p.x + PIPE_W;
      if (hitX && (bird.y - HIT < p.cy - GAP / 2 || bird.y + HIT > p.cy + GAP / 2)) state = "over";
    });
    if (score >= GOAL && state === "playing") {
      state = "won"; t0 = performance.now();
      confetti = Array.from({ length: 60 }, () => ({ x:W / 2, y:H / 2, vx:(Math.random() - .5) * 320, vy:-Math.random() * 220 - 40, c:Math.random() > .5 ? "#a855f7" : "#ffffff", s:Math.random() * 4 + 2 }));
    }
    if (pipes[0].x + PIPE_W < -10) { const l = pipes[pipes.length - 1]; pipes.shift(); pipes.push({ x:l.x + SPACING, cy:Math.max(GAP / 2 + 30, Math.min(H - GAP / 2 - 30, l.cy + (Math.random() - .5) * 110)), done:false }); }
  }

  function pipe(p) {
    const top = p.cy - GAP / 2, bot = p.cy + GAP / 2;
    const g = ctx.createLinearGradient(p.x, 0, p.x + PIPE_W, 0);
    g.addColorStop(0, "#5b21b6"); g.addColorStop(.5, "#a855f7"); g.addColorStop(1, "#6d28d9");
    ctx.fillStyle = g;
    ctx.fillRect(p.x, 0, PIPE_W, top); ctx.fillRect(p.x, bot, PIPE_W, H - bot);
    ctx.fillStyle = "#c084fc";                                  // lighter caps
    ctx.fillRect(p.x - 5, top - 14, PIPE_W + 10, 14); ctx.fillRect(p.x - 5, bot, PIPE_W + 10, 14);
  }

  function drawBird() {
    const tilt = state === "playing" || state === "over" ? Math.max(-.5, Math.min(1.1, bird.v / 420)) : 0;
    ctx.save(); ctx.translate(BX, bird.y); ctx.rotate(tilt);
    ctx.shadowColor = "rgba(255,255,255,.6)"; ctx.shadowBlur = 14;
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.arc(0, 0, BR, 0, 7); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.beginPath(); ctx.moveTo(BR - 2, -2); ctx.lineTo(BR + 8, 2); ctx.lineTo(BR - 2, 6); ctx.fill();   // beak
    ctx.fillStyle = "#000"; ctx.beginPath(); ctx.arc(4, -4, 2.4, 0, 7); ctx.fill();                      // eye
    ctx.strokeStyle = "#d8b4fe"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(-4, 3, 5, .3, 2.6); ctx.stroke(); // wing
    ctx.restore();
  }

  function center(text, y, size, color, glow) {
    ctx.textAlign = "center"; ctx.font = "800 " + size + "px 'Segoe UI',system-ui,sans-serif";
    ctx.shadowColor = glow || "transparent"; ctx.shadowBlur = glow ? 22 : 0;
    ctx.fillStyle = color; ctx.fillText(text, W / 2, y); ctx.shadowBlur = 0;
  }

  function draw() {
    ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(168,85,247,.55)"; stars.forEach(s => { ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 7); ctx.fill(); });
    if (state !== "won") pipes.forEach(pipe);
    drawBird();
    if (state === "playing" || state === "over") center(Math.min(score, GOAL) + " / " + GOAL, 36, 26, "#fff", "#a855f7");
    if (state === "ready") { center("Tap, click or press Space", 70, 20, "#fff", "#a855f7"); center("Pass " + GOAL + " obstacles to win", 98, 15, "#c4b5fd"); }
    if (state === "over") { ctx.fillStyle = "rgba(0,0,0,.55)"; ctx.fillRect(0, 0, W, H); center("Oops! " + score + " / " + GOAL, 140, 30, "#fff"); center("Tap to try again", 176, 17, "#c4b5fd"); }
    if (state === "won") {
      confetti.forEach(c => { ctx.fillStyle = c.c; ctx.fillRect(c.x, c.y, c.s, c.s); });
      const k = Math.min(1, (performance.now() - t0) / 500);
      ctx.fillStyle = "rgba(0,0,0," + (.7 * k) + ")"; ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = k;
      center("Welcome to VIDYATON", H / 2 + 6, 38, "#fff", "#a855f7");
      center("You made it! Tap to play again", H / 2 + 44, 15, "#c4b5fd");
      ctx.globalAlpha = 1;
    }
  }

  function loop(ts) {
    const dt = Math.min(.033, (ts - last) / 1000 || 0); last = ts;
    step(dt); draw();
    raf = visible ? requestAnimationFrame(loop) : 0;
  }
  const start = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(loop); } };

  /* input */
  cv.addEventListener("pointerdown", e => { e.preventDefault(); flap(); });
  cv.addEventListener("keydown", e => { if (e.code === "Space" || e.code === "ArrowUp") { e.preventDefault(); flap(); } });
  document.addEventListener("keydown", e => {
    if (e.code !== "Space" || !visible) return;
    const t = e.target; if (t && /^(INPUT|TEXTAREA|SELECT|BUTTON|A)$/.test(t.tagName)) return;
    const r = cv.getBoundingClientRect();
    if (r.top < innerHeight * .8 && r.bottom > innerHeight * .2) { e.preventDefault(); flap(); }    // Space works while the game is on screen
  });
  const rb = document.getElementById("gReset");
  if (rb) rb.onclick = () => { reset(); state = "ready"; };
  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) start(); }, { threshold: .1 }).observe(cv);

  window.VIDYATON_GAME = { get state() { return state; }, get bird() { return bird; }, get pipes() { return pipes; }, get score() { return score; }, flap };   // used by automated tests
  reset(); start();
})();
