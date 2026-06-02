(() => {
  const existing = document.getElementById("ben-ai-widget-root");

  if (existing) {
    return;
  }

  const config = window.BEN_AI_WIDGET_CONFIG || {};
  const chatUrl =
    config.chatUrl ||
    "https://ben-ai-git-main-admin-22988206s-projects.vercel.app";
  const title = config.title || "BEN.AI";
  const subtitle = config.subtitle || "The Adventure Starts Here";
  const avatarUrl = config.avatarUrl || "";
  const avatarAlt = config.avatarAlt || "BEN.AI";

  const root = document.createElement("div");
  root.id = "ben-ai-widget-root";

  const styles = document.createElement("style");
  styles.textContent = `
    #ben-ai-widget-root {
      position: fixed;
      right: 18px;
      bottom: 18px;
      z-index: 2147483647;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    .ben-ai-launcher {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 172px;
      border: 1px solid rgba(250, 204, 21, 0.42);
      border-radius: 999px;
      background: radial-gradient(circle at 18% 14%, rgba(250, 204, 21, 0.24), rgba(0, 0, 0, 0.96) 48%);
      color: #fff7d6;
      box-shadow: 0 18px 58px rgba(0, 0, 0, 0.42), 0 0 42px rgba(234, 179, 8, 0.20);
      cursor: pointer;
      padding: 11px 15px 11px 11px;
      transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
    }

    .ben-ai-launcher:hover {
      transform: translateY(-2px);
      border-color: rgba(250, 204, 21, 0.82);
      box-shadow: 0 24px 70px rgba(0, 0, 0, 0.5), 0 0 58px rgba(234, 179, 8, 0.3);
    }

    .ben-ai-launcher.is-hidden {
      display: none;
    }

    .ben-ai-orb {
      display: grid;
      width: 42px;
      height: 42px;
      place-items: center;
      overflow: hidden;
      border: 1px solid rgba(250, 204, 21, 0.62);
      border-radius: 999px;
      background: linear-gradient(135deg, #facc15, #92400e 58%, #111827);
      color: #111827;
      font-weight: 800;
      letter-spacing: -0.05em;
      box-shadow: 0 0 26px rgba(234, 179, 8, 0.24);
    }

    .ben-ai-avatar {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
    }

    .ben-ai-launcher-copy {
      display: flex;
      flex-direction: column;
      line-height: 1.1;
    }

    .ben-ai-launcher-title {
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .ben-ai-launcher-subtitle {
      margin-top: 3px;
      color: rgba(255, 247, 214, 0.68);
      font-size: 11px;
    }

    .ben-ai-panel {
      position: fixed;
      right: 18px;
      bottom: 18px;
      display: none;
      width: min(430px, calc(100vw - 28px));
      height: min(700px, calc(100vh - 42px));
      overflow: hidden;
      border: 1px solid rgba(250, 204, 21, 0.34);
      border-radius: 28px;
      background: #030303;
      box-shadow: 0 28px 110px rgba(0, 0, 0, 0.58), 0 0 74px rgba(234, 179, 8, 0.18);
    }

    .ben-ai-panel.is-open {
      display: block;
    }

    .ben-ai-panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      border-bottom: 1px solid rgba(250, 204, 21, 0.16);
      background: radial-gradient(circle at 15% 0%, rgba(250, 204, 21, 0.2), transparent 32%), linear-gradient(135deg, rgba(10, 10, 10, 0.98), rgba(0, 0, 0, 0.96));
      color: #fff7d6;
      padding: 12px 14px;
    }

    .ben-ai-panel-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }

    .ben-ai-panel-heading {
      display: flex;
      flex-direction: column;
      line-height: 1.15;
      min-width: 0;
    }

    .ben-ai-panel-title {
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .ben-ai-panel-subtitle {
      margin-top: 3px;
      color: rgba(255, 247, 214, 0.68);
      font-size: 11px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ben-ai-close {
      width: 32px;
      height: 32px;
      border: 1px solid rgba(255, 247, 214, 0.18);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.05);
      color: #fff7d6;
      cursor: pointer;
    }

    .ben-ai-close:hover {
      background: rgba(250, 204, 21, 0.12);
    }

    .ben-ai-frame {
      width: 100%;
      height: calc(100% - 63px);
      border: 0;
      background: #030303;
    }

    @media (max-width: 560px) {
      #ben-ai-widget-root {
        right: 10px;
        bottom: 10px;
      }

      .ben-ai-panel {
        right: 10px;
        bottom: 10px;
        width: calc(100vw - 20px);
        height: calc(100vh - 20px);
        border-radius: 22px;
      }

      .ben-ai-launcher-copy {
        display: none;
      }
    }
  `;

  const panel = document.createElement("section");
  panel.className = "ben-ai-panel";
  panel.setAttribute("aria-label", "BEN.AI chat panel");

  const header = document.createElement("div");
  header.className = "ben-ai-panel-header";

  const orbMarkup = avatarUrl
    ? `<span class="ben-ai-orb"><img class="ben-ai-avatar" src="${avatarUrl}" alt="${avatarAlt}" loading="lazy" decoding="async" /></span>`
    : `<span class="ben-ai-orb">B</span>`;

  header.innerHTML = `
    <div class="ben-ai-panel-brand">
      ${orbMarkup}
      <div class="ben-ai-panel-heading">
        <span class="ben-ai-panel-title">${title}</span>
        <span class="ben-ai-panel-subtitle">Built from real experiences. Designed for real life.</span>
      </div>
    </div>
  `;

  const closeButton = document.createElement("button");
  closeButton.className = "ben-ai-close";
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Minimise BEN.AI");
  closeButton.textContent = "-";

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
    ${orbMarkup}
    <span class="ben-ai-launcher-copy">
      <span class="ben-ai-launcher-title">${title}</span>
      <span class="ben-ai-launcher-subtitle">${subtitle}</span>
    </span>
  `;

  const setOpen = (isOpen) => {
    panel.classList.toggle("is-open", isOpen);
    launcher.classList.toggle("is-hidden", isOpen);
  };

  launcher.addEventListener("click", () => setOpen(true));
  closeButton.addEventListener("click", () => setOpen(false));

  header.appendChild(closeButton);
  panel.appendChild(header);
  panel.appendChild(frame);
  root.appendChild(panel);
  root.appendChild(launcher);

  document.head.appendChild(styles);
  document.body.appendChild(root);
})();
