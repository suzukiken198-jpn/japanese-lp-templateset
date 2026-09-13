# Design QA — relie DAIKANYAMA

final result: passed

## Reference and evidence

- Source visual truth: user-provided `ChatGPT Image 2026年9月12日 13_26_25.png`, 1024 × 1536 px.
- Implementation: local Vite preview, `/`, default light-text/dark-photo state, dialogs closed.
- Desktop evidence: `qa/desktop-upper.png` and `qa/desktop-lower.png`, each 1024 × 900 px. CSS viewport 1024 × 900; screenshots are normalized by the browser to CSS-pixel dimensions. Upper scroll position 0; lower scroll position 636. Together they cover the full 1536px page with overlap.
- Mobile evidence: `qa/mobile.png` and `qa/mobile-about.png`, 390 × 844 px; `qa/mobile-footer.png`, 320 × 740 px.
- The browser's full-page screenshot stitching produced duplicate/half-scale tiles. That capture was rejected; normal viewport captures and measured DOM dimensions were used instead. This is a capture artifact, not the rendered page layout.
- Full composition was reviewed with the original and rendered captures supplied in the same comparison input. Focused checks covered the hero typography, introduction/feature row, three image cards, and footer CTA.
- Screenshots remain local in `qa/` and are excluded from the published repository.

## Comparison history

1. Initial render: [P2] feature buttons spread into the right-hand editorial caption; constrained the feature row to 34.5cqw and allowed the content grid to shrink. [P3] English hero caption sat slightly low; reduced its top margin.
2. Revised captures: feature icons and captions now stay within the introduction column; hero caption alignment corrected. No remaining actionable P0/P1/P2 findings.

## Required fidelity surfaces

- Typography: Japanese Mincho / Noto Serif JP and Cormorant Garamond/Georgia English. Three-line hero, two-line introduction and footer hierarchy maintained. Editable copy and reading order verified. Exact generated-image letterforms are intentionally not reproduced.
- Layout: desktop section boundaries at approximately y=549, 991, 1329 and 1536, matching the source. Storefront crop and three equal-width scenes maintained. Mobile intentionally stacks sections with larger readable text.
- Colors: deep teal photography, warm ivory introduction, white text and restrained brass CTA match the source palette.
- Image quality: input composition preserved through background inpainting; source storefront, bottle, cup, books and botanical shadows retained. Slight generated photographic detail changes are accepted. No placeholder photographs or custom icon drawings.
- Copy: reference wording retained, with malformed generated lettering corrected to natural Japanese and DAIKANYAMA. Detail dialog descriptions are added editorial sample copy. Address/hours were not supplied; access dialog clearly says information is being prepared.

## Interaction and responsive verification

- About and Scenes anchors move to the appropriate sections.
- Products, Café and Journal open the corresponding detail content.
- Detail-to-access button opens the access content.
- VISIT US opens access; close button and Escape dismiss the native dialog.
- Mobile menu opens, links work, and selecting an item closes the menu.
- Native dialog keyboard focus, visible focus rings and reduced-motion CSS present.
- No horizontal page overflow at 1024px, 390px or 320px viewport widths.
- Browser error log after dependency repair: no errors.
- Production build succeeds.

## Follow-up polish

- [P3] Library thin-stroke icons are semantic equivalents rather than exact replicas of the hand-drawn reference.
- [P3] Minor font metrics and inpainted photographic texture differ from the supplied image.
- Future content: replace access preparation message with the confirmed address and opening hours.

## Implementation checklist

- [x] Reference layout implemented with editable text.
- [x] Responsive layouts and primary interactions verified.
- [x] Images and library icons connected.
- [x] P0/P1/P2 visual findings resolved and recaptured.
- [x] Production build verified.
