# BEN.AI Website Embed

This document explains the fastest Phase 1 way to connect BEN.AI into the MLAB website as a floating assistant.

## Purpose

The embed keeps the website focused on MLAB while BEN.AI lives inside the site as the guide, concierge and visitor assistant.

This avoids turning the whole homepage into a chatbot, while still making BEN.AI available from the lower-right corner.

## Basic embed code

Add this near the end of the website body:

```html
<script>
  window.BEN_AI_WIDGET_CONFIG = {
    chatUrl: "https://ben-ai-beta.vercel.app",
    title: "BEN.AI",
    subtitle: "The Adventure Starts Here",
    avatarUrl: "https://YOUR-WEBSITE-OR-CDN-PATH/ben-ai-cut-out.png",
    avatarAlt: "BEN.AI"
  };
</script>
<script src="https://ben-ai-beta.vercel.app/ben-ai-widget.js" defer></script>
```

Use the approved BEN.AI photo/cut-out exactly for `avatarUrl`. Do not use a generated, stylised, morphed, beautified, aged, or altered face asset.

## What it does

- Adds a floating BEN.AI launcher in the lower-right corner.
- Uses black and gold styling to match the MLAB premium direction.
- Opens BEN.AI in a compact panel using the configured chat URL.
- Supports an approved BEN.AI portrait/cut-out in the launcher circle.
- Keeps MLAB as the main website experience.
- Lets BEN.AI act as the guide into travel, relocation, learning, wealth, business and community.

## Configuration

The widget accepts these values:

```js
window.BEN_AI_WIDGET_CONFIG = {
  chatUrl: "https://ben-ai-beta.vercel.app",
  title: "BEN.AI",
  subtitle: "The Adventure Starts Here",
  avatarUrl: "https://YOUR-WEBSITE-OR-CDN-PATH/ben-ai-cut-out.png",
  avatarAlt: "BEN.AI"
};
```

Use the final production BEN.AI URL once the domain is confirmed.

## Navigation rules for Phase 1

- Top website menu should stay minimal: About Us, Join, Contact, and optionally Sign In.
- Bottom bar can carry the ecosystem lanes: Travel, Learning, Business, Wealth, Community.
- Do not duplicate the same ecosystem sections across both the top and bottom navigation.
- Do not redesign the whole website around the chatbot.

## Phase 1 notes

For launch, this is the safest integration route because it does not require rebuilding the website around BEN.AI.

Later phases can replace this with a deeper native website integration, member dashboard, or full MLAB OS experience.

## Final checks

Before launch:

- Confirm the final BEN.AI URL.
- Upload the approved BEN.AI cut-out/photo to a stable public path.
- Add the approved image URL to `avatarUrl` in the embed config.
- Confirm whether the widget should appear on every page or only selected pages.
- Confirm mobile display on the live website.
- Confirm that the chatbot opens cleanly and does not cover important website buttons.
- Replace beta URL with the final public domain when ready.
