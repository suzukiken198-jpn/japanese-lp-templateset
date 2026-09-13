# Design QA — そら内科クリニック

## Source and target

- Source: `/Users/suzukikenichi/Desktop/クリニック.jpg`, 640×1773 pixels, no browser frame.
- Local target: `http://127.0.0.1:4181/`, 640 CSS px wide desktop layout. CUA viewport tiles 640×900 captured at scrollY 0, 670.5, 922 and assembled at actual scroll offsets. No density scaling (1 output pixel per CSS px).
- State: default page, FAQs closed, dialogs closed, all 16 raster assets loaded.
- Full comparison: `qa/comparison-full-v1.png`.
- Focused comparisons: `qa/comparison-hero-v1.png`, `qa/comparison-middle-v1.png`, `qa/comparison-bottom-v1.png`.

## Iteration 1 — findings

- [P2] Body and compact card text were too fine/small versus the reference. About/medical/facility/table/FAQ text required modest size and weight increases. Maintain the existing headline hierarchy and narrow five-column layout.
- [P2] The physician portrait was framed too wide, and the footer family crop cut off the child's face. Increase portrait crop scale 1.25 and move footer photo's vertical crop to 75%.
- [P2] Middle-page vertical rhythm drifted approximately 30px by access. The natural height of the facade image and extra facility padding contributed. Position the facade within its defined frame and reduce facility section padding.
- Earlier implementation checks (before formal visual QA): enlarged header logo by trimming white margins in CSS; moved mobile secondary headline away from physician face; adjusted desktop hero benefit spacing; preserved outer-dialog focus through nested details; added focus to booking review heading.

## Iterations 2–3 — fixes and re-comparison

- `qa/comparison-full-v2.png`, `qa/comparison-middle-v2.png`, `qa/comparison-bottom-v2.png`: stronger compact text, closer portrait and fully visible family faces verified. Reference/source photos are not byte-identical; generated imagery preserves subject, pale daylight palette and composition. Reduced middle-page padding brings the section rhythm closer to the reference.
- [P2, resolved] Increasing hero benefit text caused the middle label to wrap to three lines. Expanded the benefit row from 36cqw to 39cqw and preserved the intended two lines. `qa/comparison-hero-v3.png` verifies the fix.
- `qa/comparison-full-v3.png` is the final desktop full comparison. Focused evidence: `qa/comparison-hero-v3.png`, `qa/comparison-middle-v3.png`, `qa/comparison-bottom-v3.png`. The final page is approximately 1817px tall including the additional demo disclaimer. Same 640px CSS width and default state; three viewport captures assembled at actual scroll offsets 0, 671, 916.5. A 1900px-tall capture initially exceeded the browser capture area; that invalid image was replaced by these complete tiles, not used for passing QA.
- [P2, resolved, mobile] The desktop footer crop hid most of the family at 390px and the heading broke awkwardly. Evidence `qa/mobile-footer-before.png`. Changed mobile footer to a full-width 145px photo above the copy and preserved the two-line heading. `qa/mobile-footer-final.png` shows all faces and a clear CTA. This change is mobile-only and does not alter the final desktop comparison.

## Required fidelity surfaces

- Typography: Noto Serif JP / serif display headings, Noto Sans JP / sans-serif controls. Hierarchy, line wrapping, weight and compact text checked in focused comparisons and 1280px capture. The reference's slightly handwritten secondary headline is approximated with italic serif text to keep it editable; minor optical difference (P3).
- Layout: ordered sections, full-width hero, four benefits, split about, five medical cards, three-column physician section, five facility cards, hours/access and two-column FAQ retained. Header/hero/about start positions match the source. Small remaining section-height differences are expected from editable font metrics and sample disclaimers; no overlap or hidden content. Mobile intentionally reflows to readable stacked content.
- Colors: pale blue/white backgrounds, restrained teal icons and blue reservation buttons match the source direction. Focus ring is deliberately stronger for keyboard use.
- Images: all 16 individual generated PNG assets inspected and placed. No page-sized raster used as UI, no placeholder images, no hand-drawn SVG/CSS substitutes. Raster logo, signage and fictional map are retained as image content. Map geography is intentionally fictional and opens a warning instead of misleading navigation.
- Copy: main reference headings retained as editable HTML. Unverified physician qualifications were replaced with sample disclosures. No real medical service, booking confirmation or health advice is claimed by the demo form. Real clinic information must be substituted before public operation.
- Icons: Phosphor line icons used consistently for functional controls and feature illustrations. Exact custom anatomical outlines differ from the source (P3), but categories remain text-labeled.

## Browser interaction checks

- Desktop widths 640 and 1280; mobile widths 390 and 320. No horizontal page overflow. 320px hero CTA and note fully visible.
- Navigation anchors; mobile menu opens, exposes links, navigates and closes.
- FAQ opens and closes.
- Facility carousel verified by rendered status text: 受付 → 待合室 → 受付; both Enter and pointer activation work.
- Medical list → individual details → reservation input journey works. Outer trigger focus returns when nested dialog closes.
- Native form validation blocks missing date/name/email/consent. Date entered as 2026-10-10 using the native segmented date input (browser automation's direct fill was unsupported). Dummy name and test@example.com only.
- Input → review → edit preserves data → review → finish closes without sending. Review heading receives keyboard focus. `qa/booking-review.png` records the visible review screen.
- Access button opens fictional-location/setup explanation; no misleading external map navigation.
- Browser error logs checked after final interactions: empty. No app network submission or persistent storage code.
- `npm run build` and all 11 `npm test` checks passed. Automated source checks complement the browser checks; they are not a substitute for them.

## Final evidence and handoff checklist

- `qa/desktop-1280.png`, `qa/mobile-390.png`, `qa/mobile-320.png`, `qa/mobile-menu.png`, `qa/mobile-access.png`, `qa/mobile-footer-final.png`, `qa/booking-review.png`.
- Completed implementation, local preview, separate raster assets and editable source; README, asset provenance and editing guide supplied.
- No actionable P0/P1/P2 findings remain. P3 differences: exact generated-photo identity, custom icon shapes and handwriting nuances. Medical content is sample content, not reviewed for operating a real clinic.
- No Vercel deployment, GitHub push or central catalog registration performed for this clinic in this build-only turn.

final result: passed
