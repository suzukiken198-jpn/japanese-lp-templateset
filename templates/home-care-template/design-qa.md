# Design QA — あすの訪問介護

Status: passed

Date: 2026-09-13. Scope: local, editable landing-page prototype; not a live care service.

## Reference and evidence

- User reference: `qa/reference.png` (854 × 1842).
- Desktop comparison: `qa/comparison-final.png`, with reference and implementation at equal 854px width.
- Focused comparisons: `qa/comparison-top-final.png`, `qa/comparison-bottom-final.png`.
- Implementation: `qa/desktop-final.png`, assembled from browser viewport captures at y=0, 900, 971.5 (last rounded to 972 for image compositing).
- Mobile: `qa/mobile-hero-390.png`, `qa/mobile-390.png` (services/features), `qa/mobile-320.png`.
- `qa/compare.py` reproduces the final comparison. Earlier v2 composite had an incorrect scroll offset and is not final QA evidence.

## Comparison and corrections

The same white/pale-pink background, navy Japanese serif headings, teal/pink icons, capsule buttons, photo proportions and section order were retained. Photos are 15 separate generated assets, not a flattened screenshot. Text, prices, navigation and actions are editable HTML/React.

Initial desktop check found the hero CTA overlapping the news strip. Adjusting heading leading, benefit spacing and circle dimensions moved the CTA fully into the hero. Excess section padding was then reduced: the final closing section starts at y=1631 versus reference y≈1620. The remaining ~11px difference is minor; the footer intentionally adds an explicit fictional-data/demo notice. Captured final comparisons were inspected as a whole and by top/bottom region.

All 15 assets were individually inspected. Faces, hands, home interiors and house mark match the reference's visual role; generated photography, logo details and icon shapes are not pixel-identical. These are accepted P3 differences. No missing asset placeholders or flattened text overlays were used. Font pair is Noto Serif JP / Noto Sans JP, with Phosphor UI icons. Mobile moves hero copy below the photograph and cards into readable columns.

## Interaction and responsive checks

- Widths 320, 390, 680, 854 and 1280: document width equals viewport width; no horizontal overflow.
- Hero CTA stays within its section at 854 and 1280.
- Mobile menu opens; service navigation moves to the section and closes the menu.
- Service cards open details and provide a consultation entry.
- Required name, email and demo-consent fields block incomplete progression.
- Synthetic values only (`表示確認`, `demo@example.com`) verified review, retained values on edit, and honest non-submitting completion.
- Modal cleanup corrected to close the dialog before restoring focus; Escape restores focus to the initiating service card.
- Voice control changes first visible testimonial to 70代 男性; FAQ expands and “more” adds two questions (4 → 6).
- Map button explains placeholder location and required real-map configuration, rather than linking to an invented business.
- Browser error log: none at final check.
- Automated tests: 11/11 passed. Production build succeeded.

## Deliberate limitations / handoff

No server-side submission, reservation, storage, payment or real phone action. Business identity, fees, claims, reviews, staff, phone and address are samples and must be replaced before real operation. Generated photos are fictional. Existing commercial LICENSE was retained (not MIT). User approved GitHub publication, Vercel deployment and collection registration after local review.

No unresolved P0/P1/P2 design or core-interaction issues found in this scope.
