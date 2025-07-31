# G.E.T. – Gig Efficiency Tracker

**Author:** Alan Webb  
**License:** MIT  
**Status:** Open Source – Learning Tool  
**Live Site:** [transitwebb.com](https://transitwebb.com)

## 🚀 What is G.E.T.?

G.E.T. is a driver-first tool designed to help gig workers track shift performance, unpaid overhead, and true profitability. Built from lived experience and pragmatic design, it offers clarity where most gig apps offer confusion.

## 🧰 Features

- Shift-based logging of gigs, expenses, and unpaid time
- DateDimension engine with payout-aware logic (e.g. RoadieTuesday)
- Modular JavaScript architecture for easy expansion
- LocalStorage-based persistence (no backend required)
- Open source and license-free for personal use

## File Structure

G.E.T. follows a modular file structure that prioritizes clarity, atomicity, and maintainability. Each module is scoped to its domain, avoiding bloated utility files or tangled cross-dependencies.

### Core Directories

- `modules/` – Feature-specific logic units
  - `dataCollector.js` – Extracts and sanitizes gig form data for evaluation and logging
  - `eventManager.js` – Central dispatcher for app-wide events, standardizes feedback and tracing
  - `KeyManager.js` – Generates unique keys with collision handling for shifts, gigs, and expenses
  - `shiftController.js` – Handles saving, editing, and indexing shift records
  - `gigHandler.js` – Manages gig data flow, gig ID generation, and gig-specific evaluations

- `constants/`
  - `appEvents.js` – Centralized list of application-wide event identifiers

- `styles/` – UI and layout assets (if applicable)

- `views/` – HTML templates or tabbed interface components

- `README.md` – Architectural philosophy, module guidance, and system overview

### Design Principles

- **Modularity over generalization**: Each file serves a distinct purpose. Shared functionality is scoped rather than centralized.
- **Flat hierarchy**: Avoids nesting that obscures relationships. Related files sit side-by-side.
- **Atomic logic units**: Functions and classes are kept lean, doing one thing well.
- **Future-proof hooks**: Expansion points (e.g., nationalization, analytics) are planned but not preemptively scaffolded.


## ID and Time Logic Principles

G.E.T. maintains strict atomicity and contextual integrity across modules:

- **ShiftKey is date-only (as a string)**  
  This key anchors temporal data precisely and consistently. It’s stored as a simple string—no suffixes, no modifiers—making it cleanly sortable and universally compatible across modules.

- **All keys and identifiers are stored as strings**  
  String-based storage eliminates locale-driven parsing issues, ensures consistent serialization, and simplifies debugging, logging, and lookups. This decision echoes G.E.T.’s design goal: clarity and predictability over clever abstraction.

- **GigID lives in the gigs module**  
  Gig identifiers are generated contextually within gig-handling logic. No external utility functions or shared generation patterns. This preserves gig-specific metadata without global dependency.

- **Formatting logic is localized**  
  Currency, time, and rounding functions are scattered intentionally. While these may appear in multiple modules, their usage reflects domain-specific formatting needs. No centralized utils file exists for these purposes.

- **No Leatherman coding**  
  Tools are scoped narrowly to their module’s purpose. Shared convenience is sacrificed for clarity and maintainability. Each function exists where it’s most semantically and operationally relevant.

- **Internationalization hooks are future-facing**  
  User locale handling (language, timezone, format preferences) will be introduced when end-user customization demands it—but isn’t active in current logic.
