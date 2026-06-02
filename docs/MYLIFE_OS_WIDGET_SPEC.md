# My Life OS Widget Specification

This document preserves Ben's clarification about the sidebar widgets and the future My Life OS feature set.

## Status

This is a product specification and build note, not a Phase 1 launch promise.

Phase 1 should keep BEN.AI focused on the launch guide, embed, black/gold chatbox styling and MLAB explanation. My Life OS should be protected in the roadmap and designed carefully before being built as a full workspace feature.

## Core clarification

The sidebar items such as Travel Planner, Life Admin, Wealth Circles, Community and Settings should not be treated as fixed static pages only.

They are intended to become changeable, user-controlled widgets/modules. Each user should be able to choose the widgets they need, hide the ones they do not need, and arrange the workspace around how their brain and life actually work.

## Product name

Use: My Life OS

Do not reduce this concept to only Life Admin. Life Admin can be one module inside My Life OS, but My Life OS is the wider workspace/control-centre idea.

## My Life OS purpose

My Life OS is a flexible personal operating system for everyday life, especially useful for people who feel like they have a million tabs open.

It should help users hold thoughts, reminders, calendar items, gift ideas, notes, tasks and life-admin flows without needing to keep everything open in browser tabs or in their head.

## Widget behaviour

Widgets should eventually be:

- User-selectable
- Moveable around the screen
- Minimisable
- Re-openable
- Able to stay open while other work continues
- Optional per user
- Configurable in settings
- Designed for ADHD-friendly use, without being patronising

Important: the workspace should feel like a place to put things safely, not another overwhelming dashboard.

## Notes widget

A Notes widget should exist alongside the main BEN.AI chat/workspace.

Concept:

- Similar in spirit to Apple Notes
- Always reachable
- Can be opened, minimised or moved
- Lets users quickly write ideas, reminders, thoughts, lists and unfinished things
- Should support BEN.AI helping organise notes later
- Should not require the user to make every note perfect before saving it

Product feeling: a safe place to hide things, park thoughts and return later.

## Calendar and gift voucher flow

My Life OS should include a calendar-connected gift and reminder feature.

Example flow:

1. User adds a birthday, celebration or important date to the calendar.
2. BEN.AI / My Life OS can remind the user ahead of time.
3. The system can connect to the gift voucher system.
4. Gift suggestions can appear either:
   - inside the calendar event, or
   - inside the Notes widget / related note area.
5. User can save, dismiss, buy, or revisit the suggestions.

The feature should feel helpful and human, not spammy.

## Long-open reminder / digital declutter feature

My Life OS should eventually include an optional setting that notices stale open items.

Example behaviour:

- If a widget, note, workspace, tab-like item or task has been open/stale for a long time, BEN.AI can gently ask whether the user wants to clear it, archive it, save it or keep it.
- This should not trigger too soon. Do not nag after two minutes.
- Example timeframe: after around 10 days, depending on user settings.
- This feature must be optional and adjustable in Settings.

Suggested BEN.AI tone:

"This has been open for 10 days. Want me to clear it, save it somewhere safe, or leave it alone? Clearing old history and clutter can help things run faster. It is a bit like meditation for computers."

Security angle:

- Clearing stale history, cookies or old sessions can be framed as good for speed and security.
- BEN.AI must not delete anything automatically without permission.
- The user should always have a clear keep/save/archive/clear choice.

## Settings requirements

Users should be able to control:

- Which widgets are visible
- Which widgets can remind them
- How long before stale-item reminders appear
- Whether digital declutter reminders are on or off
- Whether gift suggestions appear in Calendar, Notes, both or neither
- Whether BEN.AI can suggest organising old notes/tasks

## Phase placement

Phase 1:

- Preserve the concept in documentation.
- Avoid hard-coding sidebar labels as final product architecture.
- Keep BEN.AI launch guide simple.
- Do not overbuild My Life OS yet.

Phase 2:

- Start modelling widgets/modules and user preferences.
- Add clearer journeys for life admin and member support.

Phase 3:

- Build My Life OS as a flexible workspace with notes, calendar, reminders, gift-voucher integration and configurable widgets.

## Design rule

My Life OS should feel calming, flexible and intelligent. It should not become a busy dashboard that creates more pressure.

The goal is to help users turn open loops into saved, organised, actionable items.
