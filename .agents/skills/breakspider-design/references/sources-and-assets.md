# Sources, precedence, and asset selection

## Source precedence

When sources disagree, use this order:

1. The current user request and explicit clarifications.
2. Repository `AGENTS.md` and current implementation constraints.
3. Current product/architecture documentation and production content models.
4. Canonical prototype documentation and screenshots for art direction.
5. Historical prototype notes and external inspiration research.

Do not mistake the production app's current foundation state for the finished visual target. Conversely, do not copy prototype architecture wholesale: prototypes are visual and interaction references.

## High-value repository sources

- `docs/breakspider_design_philosophy.md` — enduring purpose, personality, professional/discovery balance, voice, mobile, and anti-goals.
- `docs/breakspider_prototype_04_design_inventory.md` — canonical homepage hierarchy and spatial/material behavior.
- `docs/breakspider_prototypes_final_summary.md` — route-specific “different room” intentions and desktop/mobile capture index.
- `docs/breakspider_prototype_reuse_map.md` — what may be shared versus what remains page-specific.
- `docs/breakspider_visual_direction_prototype_02.md` — durable corrections against editorial layouts, paper-first styling, uniform containers, and generic portfolio templates; its homepage status is historical.
- `docs/CLUTTER_POSITIONING.md` — proposed anchor-relative authoring behavior, not proof that the tool exists.
- `docs/breakspider_asset_curation.md` and `docs/breakspider_asset_inventory.csv` — asset metadata, provenance notes, and earlier recommendations; useful indexes, not limits on the curated pool.
- `screenshots/` — visual truth for the canonical homepage and the distinct route prototypes at desktop/mobile sizes. Inspect the target route's viewport and full-page captures.
- `prototype/breakspider-nextjs-prototype/` — inspect component/CSS behavior when screenshots or prose do not answer a visual question. Translate intent into production code; do not blindly copy.
- `styles/tokens.css` and current production components — shared implementation vocabulary and current constraints.

Prototype 04 is canonical for the homepage. Prototype 01–03 homepage work is historical context. Prototype material named **Pixel Pugilists** belongs to **One Night Familiar Fight (ONFF)**; use production routes `/projects/one-night-familiar-fight` and `/play/onff`.

## Asset library rule

The entire repository `assets/` tree is the curated candidate library, including:

- `assets/breakspider-logo/`;
- `assets/work-screenshots/`;
- every category under `assets/artifacts/`, including sprites, badges, vectors, audio, avatars, images, and Noise banks.

`public/` and `public/media/` contain only assets already copied into the deployable namespace. They are not the approval boundary and must not be treated as the complete library. Select from `assets/`, then copy/optimize only the chosen files into the appropriate production path as part of implementation.

## Selecting assets

Treat the library as a box of curated material, not a checklist or a locked prototype kit.

- Re-curate for the route, nearby content, silhouette, scale, color, interaction, and layer role.
- Prototype clutter selections and positions are not close to final. Preserve their demonstrated grammar—clusters, edge activity, layering, meaningful anchors, varied density—not their roster.
- Let creator-owned material carry core identity: Breakspider logo/animation, original UI, ONFF captures and Familiars, Viscap evidence, and future original collectibles.
- Use recognizable third-party/franchise material as occasional personal cultural texture, not the logo, primary navigation identity, permanent architecture, or only source of personality.
- Check the inventory's provenance notes and confirm public-use rights before shipping recognizable external material. When appropriate, create an original reinterpretation instead.
- Preserve native asset character. Use nearest-neighbor rendering for pixel art when scaled; do not pixelate photographs, product captures, or illustrations merely to make them match.
- Prefer a few strong relationships over exhausting a category or filling every gap.
- Reserve assets with a documented future role rather than consuming them as filler.

## Practical inspection path

1. Identify the route's content role and missing visual job.
2. Inspect relevant screenshots and prototype behavior.
3. Search the full `assets/` tree and the inventory by subject, source category, dimensions, transparency, and suggested use.
4. Compare candidates at intended display size and against nearby colors/shapes.
5. Confirm provenance, accessibility treatment, crop behavior, and responsive visibility.
6. Add only the selected production derivatives to `public/`; keep source assets in `assets/`.
