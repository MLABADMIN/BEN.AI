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

## First-time experience

My Life OS should not open as a giant dashboard with every MLAB tool visible.

The first-time experience should ask a few simple questions, then write the user into their own welcome page/workspace.

The goal is to create a personal starting board, not an ecosystem dump.

Example first-time questions:

1. What brings you here today?
2. What are you trying to sort out first?
3. Do you want a simple page, a visual widget board, or a fuller dashboard?
4. Are you here for travel, moving abroad, business, learning, life admin, community, money, or something else?
5. Do you want BEN.AI to suggest widgets, or do you want to choose them yourself?

The answers should decide which widgets appear first.

Example: if a user answers travel, they should see a travel-centred workspace, not a dashboard full of business, wealth, community, courses and admin tools. Other tools can be suggested gently later, but not shown all at once.

## Personalised welcome page

After the first-time questions, the user's My Life OS should create a welcome page containing:

- A calm welcome message based on their answers
- A small number of relevant widgets
- A next-step card
- Optional suggested widgets
- A clear way to add or remove widgets
- A clear way to ask BEN.AI for help

The first screen should be useful within seconds. If the user has to understand the whole ecosystem before taking action, the design has failed.

## Widget behaviour

Widgets should eventually be:

- User-selectable
- Moveable around the screen
- Minimisable
- Re-openable
- Removable from the widget board
- Able to be reinstated later from an Add Widgets area
- Able to stay open while other work continues
- Optional per user
- Configurable in settings
- Designed for ADHD-friendly use, without being patronising

Important: closing a widget should mean removing it from the active board, not merely minimising it into clutter. Users should be able to reinstate removed widgets when they want.

The workspace should feel like a place to put things safely, not another overwhelming dashboard.

## Widget recommendation logic

My Life OS should recommend widgets based on the user's stated needs.

Example routes:

- Travel: trip planner, weather timing, transfer/excursion notes, saved places, travel checklist
- Moving abroad: relocation checklist, documents, visa/citizenship notes, timeline, budget notes
- Business: business idea board, launch checklist, content plan, customer intake, admin tasks
- Learning: course path, reading list, progress tracker, questions for BEN.AI
- Life admin: notes, reminders, forms, appointments, document parking
- Community: events, groups, support circles, contact notes
- Money: budget notes, savings plan, Pardner/wealth education, decision log

Only the strongest matches should appear first. Other modules should sit in Suggestions or Add Widgets.

## ADHD-friendly presentation

My Life OS should reduce overwhelm by default.

Design rules:

- Start with fewer widgets, not more
- Use one next step prominently
- Use cards with clear headings
- Avoid long walls of text
- Let users choose compact, visual, table, or chunked modes later
- Support removing widgets from view completely
- Keep suggested next actions short and specific
- Use progressive reveal instead of showing the full ecosystem at once

## Notes widget

A Notes widget should exist alongside the main BEN.AI chat/workspace.

Concept:

- Similar in spirit to Apple Notes
- Always reachable
- Can be opened, minimised, moved or removed from the active board
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
- Which widgets are removed from the active board
- Which widgets can remind them
- How long before stale-item reminders appear
- Whether digital declutter reminders are on or off
- Whether gift suggestions appear in Calendar, Notes, both or neither
- Whether BEN.AI can suggest organising old notes/tasks
- Whether they prefer compact, visual, table, colour-coded, or chunked layouts

## Phase placement

Phase 1:

- Preserve the concept in documentation.
- Avoid hard-coding sidebar labels as final product architecture.
- Keep BEN.AI launch guide simple.
- Do not expose unfinished My Life OS widgets on the public front door.
- If showing a prototype, it must be plain, polished, useful and clearly limited.

Phase 2:

- Start modelling widgets/modules and user preferences.
- Add first-time questions and personalised welcome workspace.
- Add clearer journeys for life admin and member support.

Phase 3:

- Build My Life OS as a flexible workspace with notes, calendar, reminders, gift-voucher integration and configurable widgets.

## Design rule

My Life OS should feel calming, flexible and intelligent. It should not become a busy dashboard that creates more pressure.

The goal is to help users turn open loops into saved, organised, actionable items.
