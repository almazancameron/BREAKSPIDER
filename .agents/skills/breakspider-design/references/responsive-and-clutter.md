# Responsive composition and decorative clutter

## Separate three layout concerns

1. **Page structure:** semantic sections, content order, and functional composition belong in page-owned JSX and CSS using grid, flexbox, and deliberate positioning.
2. **Decorative clutter:** small optional objects attach to named semantic anchors and may use saved offsets or visibility overrides.
3. **Authored diagrams:** Map and Viscap relationship views may keep page-owned node/connection data. Do not turn them into a universal diagram system.

Decorative placement data must not become a general page builder or a substitute for real layout CSS.

## Desktop composition

Desktop is the canonical expressive view. Review around 1440px and 1920px plus an intermediate narrow desktop/tablet width.

- Establish content hierarchy and cluster silhouettes before adding decoration.
- Use edge proximity, varied object scale, asymmetry, selective rotation, and selective overlap.
- Place clutter in authored banks or pockets: around edges, attached to a meaningful module, bridging related regions, or behind a legible foreground object.
- Vary density and silhouette. Avoid mirrored banks, regular spacing, evenly filled gaps, and the same “quirky” transform on every object.
- Partial cropping can activate the viewport edge; total disappearance or covering essential content is a failure.
- Preserve readable safe zones around headlines, body copy, controls, and focus outlines.

Prototype 04 proves that dense perimeter banks, quieter interior pockets, and a few content-attached keepsakes can coexist. It does **not** finalize which artifacts, sprites, badges, or Noise assets production must use, nor their exact coordinates.

## Anchor-relative clutter

When implementing the proposed clutter authoring system from `docs/CLUTTER_POSITIONING.md`:

- eligible anchors are intentional static regions such as sections, cards, headings, images, or widgets—not arbitrary DOM nodes;
- save a chosen anchor, anchor point/edge, relative offset, rotation, scale, layer, and optional breakpoint overrides;
- choose the nearest eligible anchor during authoring, allow manual correction, and do not recompute the anchor at runtime;
- keep runtime rendering deterministic and independent from the dev-only editor;
- store placement as repo-authored data outside page markup when practical.

For simple one-off relationships, page-owned CSS is still appropriate. Do not build the editor merely to move one decorative object.

## Mobile translation

Mobile is a recomposition, not a shrunken desktop canvas. Review around 390×844 and at the repository minimum width.

- Preserve content priority and explicit navigation.
- Convert absolute desktop clusters into a vertical flow where necessary.
- Reduce overlap and decorative density; retain a few identity-bearing edge or anchored objects so the page still feels authored.
- Hide or relocate clutter that competes with reading. Breakpoint-specific scale, offset, and visibility are expected.
- Convert hover interactions to tap/direct manipulation and keep keyboard behavior.
- Use horizontal scrolling only for a purposeful inspectable strip with visible affordance and snap behavior—not for the page itself.
- Prevent horizontal page overflow and keep screenshots/media readable or inspectable.

For Home, the established mobile priority is Spotlight → About → Projects → current project → Sketchbook → Familiar → changelog → Map → artifact pile. Other routes derive their own content-first order from their room purpose and reference screenshots.

## Accessibility and motion

- Decorative clutter receives empty alt text or `aria-hidden` and does not enter the tab order.
- Interactive-looking objects are real links/buttons with labels, focus treatment, and adequate targets.
- Do not communicate state by color or motion alone.
- Honor `prefers-reduced-motion`; remove nonessential wandering, parallax, and transition effects while preserving information and controls.
- Avoid layout shifts from late-loading assets by reserving dimensions.

## Responsive review checklist

- Dominant content remains dominant at every width.
- Professional paths never depend on clutter, hover, animation, or discovery.
- No decorative item covers text, controls, captions, or focus outlines.
- Native project media remains recognizable and is not cropped into meaninglessness.
- Density changes feel intentional rather than like missing assets.
- The mobile page has no horizontal overflow.
- Intermediate widths do not inherit desktop collisions or mobile-scale type prematurely.
