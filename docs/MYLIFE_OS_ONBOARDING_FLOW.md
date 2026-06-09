# My Life OS Onboarding Flow

## Product decision

The public landing page should not begin with a fully physical BEN.AI character experience if that makes the visitor unsure what they have landed in.

The first screen should quickly explain where the visitor is, ask a few calm questions, and use those answers to shape a personalised My Life OS preview.

BEN.AI can then appear inside the personalised workspace as the smart assistant that helps action requests, explain options, and adjust the page.

## Plain explanation for users

My Life OS is your personal MLAB workspace.

It starts by asking what you are trying to sort out, then builds a calmer page around the tools you actually need first.

You can add, remove, or change widgets later.

## Landing page role

The landing page has three jobs:

1. Orient the user quickly.
2. Ask a few preference and intention questions.
3. Create a personalised workspace preview and invite the user to save it.

It should not show the full MLAB ecosystem at once.

## Recommended first screen

Use direct copy like:

"Build your My Life OS page."

"Answer a few questions and MLAB will shape a workspace around what you need first. No giant dashboard. No thousand tabs. Just the tools that match where you are right now."

Primary action:

- Build my page

Secondary action:

- Ask a quick question

## First questions

Ask as few questions as possible:

1. What are you here to sort out first?
2. Which areas matter today?
3. How do you prefer things shown?
4. Do you want BEN.AI to suggest widgets, or do you want to choose them yourself?

Example area options:

- Travel / holiday
- Moving abroad
- Business / startup
- Learning / courses
- Life admin
- Community
- Money / planning
- Not sure yet

Example layout options:

- Simple
- Visual cards
- Step by step
- Table/list
- Colour-coded

## Save timing

The user can answer questions before logging in.

The app should hold the answers temporarily in browser state.

After the preview is created, ask:

"Want me to save this as your My Life OS page?"

Options:

- Save my page
- Keep testing without saving

If the user chooses to save, ask them to log in or create an account, then save the preferences and active widget choices to the database.

## Technical flow

Landing page
-> short onboarding questions
-> temporary personalised preview
-> login/create account only if user wants to save
-> save preferences and widget choices
-> load saved My Life OS welcome page

## What should be saved later

- chosen areas
- immediate goal
- preferred layout style
- BEN.AI suggested vs user-chosen widgets
- active widgets
- removed widgets
- suggested widgets
- welcome message
- onboarding completion state

## Widget rule

Widgets are the tools in the ecosystem, but users should not see all of them at once.

The system should choose the strongest matches based on the user's answers.

If the user chooses Travel, the first board should be travel-led. It should not show business, wealth, community, courses and admin tools all at once.

## Remove vs minimise

Closing a widget should remove it from the active board.

The user can add it back from Add Widgets later.

Minimising is only for widgets the user wants to keep nearby, not for clearing clutter.

## BEN.AI role

BEN.AI is the smart assistant inside the workspace.

He can:

- answer questions
- explain choices
- suggest widgets
- help adjust the page
- create plans or next steps
- route the user to MLAB services

He should not be introduced as a confusing standalone character before the user understands where they are.

## Guard rules

- Do not show unfinished tools as if live.
- Do not collect unnecessary private information before login.
- Do not save preferences until the user chooses to save or logs in.
- Do not overwhelm users with the full ecosystem at the gate.
- Do not make fake claims about connected tools, payments, travel availability, or database saving.
