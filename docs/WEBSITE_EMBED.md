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
    subtitle: "The Adventure Starts Here"
  };
</script>
<script src="https://ben-ai-beta.vercel.app/ben-ai-widget.js" defer></script>
```

## What it does

- Adds a floating BEN.AI launcher in the lower-right corner.
- Uses black and gold styling to match the MLAB premium direction.
- Opens BEN.AI in a compact panel using the configured chat URL.
- Keeps MLAB as the main website experience.
- Lets BEN.AI act as the guide into travel, relocation, learning, wealth, business and community.

## Configuration

The widget accepts these values:

```js
window.BEN_AI_WIDGET_CONFIG = {
  chatUrl: "https://ben-ai-beta.vercel.app",
  title: "BEN.AI",
  subtitle: "The Adventure Starts Here"
};
```

Use the final production BEN.AI URL once the domain is confirmed.

## Phase 1 notes

For launch, this is the safest integration route because it does not require rebuilding the website around BEN.AI.

Later phases can replace this with a deeper native website integration, member dashboard, or full MLAB OS experience.

## Final checks

Before launch:

- Confirm the final BEN.AI URL.
- Confirm whether the widget should appear on every page or only selected pages.
- Confirm mobile display on the live website.
- Confirm that the chatbot opens cleanly and does not cover important website buttons.
- Replace beta URL with the final public domain when ready.
