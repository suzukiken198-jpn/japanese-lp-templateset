# Prototype Instructions

This project recreates the user's selected デイサービス.png as an editable Japanese LP. Preserve the white/orange/green palette, source section order and photograph-led design. Only this day-service template is in scope; do not alter home-care, clinic or other templates. Consultation is a frontend-only input/review demo, never a real booking, medical advice service or sender. The pack's custom commercial LICENSE applies, not MIT. Preview locally for review before deployment.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
