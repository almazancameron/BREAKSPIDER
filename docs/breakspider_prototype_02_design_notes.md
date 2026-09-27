# Breakspider Prototype 02 — design notes

**Archive note:** Prototype 02 has been retired. Prototype 04 is the canonical homepage; use the [Prototype 04 layout and design inventory](breakspider_prototype_04_design_inventory.md) for current implementation guidance. This file and the [Prototype 02 visual direction brief](breakspider_visual_direction_prototype_02.md) remain as historical design context.

These notes record what was working in the Prototype 02 homepage at the time.

## Composition

- Treat the desktop viewport as a customized profile canvas. Use the width, approach the edges, and arrange content in uneven clusters with open space between them.
- Keep the reading priority clear: **Spotlight → About and Projects → current project, Sketchbook, Familiar, and changelog → optional discoveries**. Professional facts and paths stay visible without interaction.
- Give the Spotlight the largest and highest-contrast footprint. Let supporting objects meet or cross its edges while keeping its text and actions unobstructed.
- Position each secondary element for its job. About is a direct profile path; Projects presents evidence from different kinds of work; the Familiar can stand alone; changelog and Sketchbook can be compact live fragments.
- Keep the page one continuous field as it scrolls. Add material below the fold without turning each cluster into a full-width section.

## Visual language

- Mix native web text, game HUD details, profile widgets, sprites, and genuine project screenshots. Their differences give the page character; they do not need matching frames.
- Let creator-owned material carry identity: Breakspider logo and animation, Pixel Pugilists screens, Viscap screens, and original Familiar sprites. Use recognizable reference material only as occasional personal texture.
- Use dark digital surfaces with small, deliberate hits of lime, cyan, pink, and orange. Status colors should help locate actions or information. Preserve dark and empty areas for contrast.
- Use bold sans type for destinations and readable text for explanation. Reserve compact mono type for file names, status readouts, versions, and interface labels.
- Write plainly. Functional labels and short facts fit this page better than poetic statements about exploration.

## Prototype 02 quirks worth keeping

- The pinned Spotlight has simple window chrome, an availability signal, and a real Pixel Pugilists capture that protrudes from its frame.
- About is a strong profile fragment near the viewport edge. Projects is a separate overlapping pair of Viscap and Pixel Pugilists evidence, with a direct archive link.
- A free-standing Familiar acts as a small route into the catalogue. The lower Familiar module can switch between the two original sprites.
- The found Map is an original, inspectable site object. The open-file pile brings selected work into focus; its **Shuffle focus** control makes that function feel like a toy.
- The visitor avatar and sound toggle stay in the header. The avatar opens a compact local profile; sound state persists in the browser.
- The existing splash remains the entry point and appears once per browser unless replayed.

## Mobile translation

At about 390px, use the order **Spotlight → About → Projects → current project → smaller discoveries**. Make navigation explicit with Menu. Keep the real screenshots and sprites, reduce overlap, and let the file pile become a swipeable strip with tap-to-inspect.

## Review checks

At 1440×900, the first screen should show the professional Spotlight, clear About and Projects destinations, and visible game or internet culture before much copy is read. At 390×844, the Spotlight and start of About should be legible without horizontal page overflow. Check that overlapping objects never cover essential links, that every playful object has a useful action, and that dense screenshots can be opened at a readable size.

The creator name, contact address, and résumé are placeholders in this prototype. Replace them with supplied details before treating the professional path as finished. Viscap's interface is dense at homepage scale; future work may need a purposeful crop or a connected-system diagram to explain it in detail.
