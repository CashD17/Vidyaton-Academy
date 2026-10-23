/* Decorative "AI Assistant — Preview". Visual element only: no AI service, no network calls. */
(function () {
  if (document.getElementById("vaAi")) return;
  const css = document.createElement("style");
  css.textContent = `
  #vaAi{position:fixed;right:18px;bottom:18px;z-index:90;font-family:'Segoe UI','Noto Sans Georgian',system-ui,sans-serif}
  #vaAi .fab{width:44px;height:44px;border-radius:50%;border:1px solid rgba(168,85,247,.6);background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;cursor:pointer;display:grid;place-items:center;box-shadow:0 8px 24px rgba(124,58,237,.45);opacity:.9;transition:.2s}
  #vaAi .fab:hover{opacity:1;transform:scale(1.07)}
  #vaAi .fab svg{width:22px;height:22px;fill:#fff}
  #vaAi .panel{position:absolute;right:0;bottom:56px;width:min(300px,calc(100vw - 36px));background:#150c24;color:#fff;border:1px solid rgba(168,85,247,.45);border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.5);overflow:hidden;display:none}
  #vaAi.open .panel{display:block}
  #vaAi .ph{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;background:rgba(124,58,237,.35);font-weight:700;font-size:.9rem}
  #vaAi .ph button{background:none;border:0;color:#fff;font-size:1.3rem;cursor:pointer;line-height:1}
  #vaAi .pb{padding:14px;font-size:.88rem;color:#d8c8f5;line-height:1.5}
  #vaAi .bubble{background:rgba(255,255,255,.07);border-radius:12px;padding:10px 12px;margin-bottom:10px}
  #vaAi input{width:100%;padding:10px 12px;border-radius:10px;border:1px solid rgba(168,85,247,.3);background:#0b0614;color:#8a7aa8;font:inherit;font-size:.85rem}
  #vaAi .tag{display:inline-block;margin-top:8px;font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;color:#a855f7}`;
  document.head.appendChild(css);
  const el = document.createElement("div");
  el.id = "vaAi";
  el.innerHTML = `
    <div class="panel" role="dialog" aria-label="AI Assistant — Preview">
      <div class="ph"><span>AI Assistant — Preview</span><button aria-label="Close" data-x>&times;</button></div>
      <div class="pb">
        <div class="bubble">Hi! 👋 I’m a design preview of a future study helper.</div>
        <div class="bubble">This is only a visual element — no AI service is connected, and nothing you type is sent anywhere.</div>
        <input disabled placeholder="Ask me anything… (disabled in preview)" aria-label="Disabled preview input">
        <span class="tag">Preview · not functional</span>
      </div>
    </div>
    <button class="fab" aria-label="Open AI Assistant — Preview" title="AI Assistant — Preview">
      <svg viewBox="0 0 24 24"><path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2zM19 14l.9 2.6L22.5 17.5l-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9L19 14zM5 15l.7 2 2 .7-2 .7L5 20.4l-.7-2-2-.7 2-.7L5 15z"/></svg>
    </button>`;
  document.body.appendChild(el);
  el.querySelector(".fab").onclick = () => el.classList.toggle("open");
  el.querySelector("[data-x]").onclick = () => el.classList.remove("open");
  document.addEventListener("keydown", e => { if (e.key === "Escape") el.classList.remove("open"); });
})();
