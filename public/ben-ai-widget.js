(() => {
  const existing = document.getElementById("ben-ai-widget-root");

  if (existing) {
    return;
  }

  const config = window.BEN_AI_WIDGET_CONFIG || {};
  const chatUrl = config.chatUrl || "https://ben-ai-beta.vercel.app";
  const title = config.title || "BEN.AI";
  const subtitle = config.subtitle || "The Adventure Starts Here";

  const root = document.createElement("div");
  root.id = "ben-ai-widget-root";

  const styles = document.createElement("style");
  styles.textContent = `
    #ben-ai-widget-root {
      position: fixed;
      right: 20px;
      bottom: 20px;
      z-index: 2147483647;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    .ben-ai-launcher {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 168px;
      border: 1px solid rgba(234, 179, 8, 0.42);
      border-radius: 999px;
      background: radial-gradient(circle at 20% 20%, rgba(234, 179, 8, 0.22), rgba(0, 0, 0, 0.94) 46%);
      color: #fff7d6;
      box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35), 0 0 35px rgba(234, 179, 8, 0.18);
      cursor: pointer;
      padding: 12px 16px 12px 12px;
      transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
    }

    .ben-ai-launcher:hover {
      transform: translateY(-2px);
      border-color: rgba(250, 204, 21, 0.8);
      box-shadow: 0 22px 60px rgba(0, 0, 0, 0.42), 0 0 46px rgba(234, 179, 8, 0.28);
    }

    .ben-ai-orb {
      display: grid;
      width: 38px;
      height: 38px;
      place-items: center;
      border-radius: 999px;
      background: linear-gradient(135deg, #facc15, #92400e 58%, #111827);
      color: #111827;
      font-weight: 800;
      letter-spacing: -0.05em;
    }

    .ben-ai-launcher-copy {
      display: flex;
      flex-direction: column;
      line-height: 1.1;
    }

    .ben-ai-launcher-title {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.02em;
    }

    .ben-ai-launcher-subtitle {
      margin-top: 3px;
      color: rgba(255, 247, 214, 0.72);
      font-size: 11px;
    }

    .ben-ai-panel {
      position: fixed;
      right: 20px;
      bottom: 86px;
      display: none;
      width: min(420px, calc(100vw - 28px));
      height: min(680px, calc(100vh - 112px));
      overflow: hidden;
      border: 1px solid rgba(234, 179, 8, 0.35);
      border-radius: 24px;
      background: #050505;
      box-shadow: 0 26px 90px rgba(0, 0, 0, 0.48), 0 0 60px rgba(234, 179, 8, 0.16);
    }

    .ben-ai-panel.is-open {
      display: block;
    }

    .ben-ai-panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(234, 179, 8, 0.18);
      background: linear-gradient(135deg, rgba(234, 179, 8, 0.18), rgba(0, 0, 0, 0.96));
      color: #fff7d6;
      padding: 12px 14px;
    }

    .ben-ai-panel-heading {
      display: flex;
      flex-direction: column;
      line-height: 1.15;
    }

    .ben-ai-panel-title {
      font-size: 13px;
      font-weight: 800;
    }

    .ben-ai-panel-subtitle {
      margin-top: 3px;
      color: rgba(255, 247, 214, 0.68);
      font-size: 11px;
    }

    .ben-ai-close {
      width: 30px;
      height: 30px;
      border: 1px solid rgba(255, 247, 214, 0.18);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.05);
      color: #fff7d6;
      cursor: pointer;
    }

    .ben-ai-frame {
      width: 100%;
      height: calc(100% - 55px);
      border: 0;
      background: #050505;
    }

    @media (max-width: 520px) {
      #ben-ai-widget-root {
        right: 14px;
        bottom: 14px;
      }

      .ben-ai-panel {
        right: 8px;
        bottom: 78px;
        width: calc(100vw - 16px);
        height: calc(100vh - 92px);
        border-radius: 20px;
      }
    }
  `;

  const panel = document.createElement("section");
  panel.className = "ben-ai-panel";
  panel.setAttribute("aria-label", "BEN.AI chat panel");

  const header = document.createElement("div");
  header.className = "ben-ai-panel-header";
  header.innerHTML = `
    <div class="ben-ai-panel-heading">
      <span class="ben-ai-panel-title">${title}</span>
      <span class="ben-ai-panel-subtitle">Built from real experiences. Designed for real life.</span>
    </div>
  `;

  const closeButton = document.createElement("button");
  closeButton.className = "ben-ai-close";
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Close BEN.AI");
  closeButton.textContent = "x";

  const frame = document.createElement("iframe");
  frame.className = "ben-ai-frame";
  frame.title = "BEN.AI";
  frame.loading = "lazy";
  frame.referrerPolicy = "strict-origin-when-cross-origin";
  frame.src = chatUrl;

  const launcher = document.createElement("button");
  launcher.className = "ben-ai-launcher";
  launcher.type = "button";
  launcher.setAttribute("aria-label", "Open BEN.AI");
  launcher.innerHTML = `
    <span class="ben-ai-orb">B</span>
    <span class="ben-ai-launcher-copy">
      <span class="ben-ai-launcher-title">${title}</span>
      <span class="ben-ai-launcher-subtitle">${subtitle}</span>
    </span>
  `;

  const togglePanel = () => {
    panel.classList.toggle("is-open");
  };

  launcher.addEventListener("click", togglePanel);
  closeButton.addEventListener("click", togglePanel);

  header.appendChild(closeButton);
  panel.appendChild(header);
  panel.appendChild(frame);
  root.appendChild(panel);
  root.appendChild(launcher);

  document.head.appendChild(styles);
  document.body.appendChild(root);
})();
