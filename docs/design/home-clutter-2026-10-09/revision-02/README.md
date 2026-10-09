# Homepage authored clutter: revision 02

**Implementation status, October 9, 2026:** the approved composition is now implemented, including the final adjustment that keeps the whole Terra Blade visible. See [implementation details and browser evidence](implementation-notes.md). Owner verification locally and live is pending. The design comps below remain the proposal captures; application screenshots are linked in the implementation notes.

**Recommended direction:** a small collection of deliberately placed keepsakes, with lively outer corners and an increasingly playful lower field. Leave the remaining space for the future randomized layer. The combined page should reach roughly 6/10 chaos; the authored layer alone should not try to fill every gap.

This revision incorporates the owner's feedback on groups A–I. There is no strict image quota. It uses **18 of the 44 supplied images plus one existing ONFF process screenshot** on desktop. The rainbow badge is an alternative to the narwhal, rather than an additional placement. Noise, Pokémon badges, and most tiny miscellaneous pickups are reserved for consideration in the random layer.

## Look first

Open [the offline visual review](review.html) in a browser. It compares this revision with the unchanged homepage and the earlier proposal, switches between five viewport captures, and offers the rainbow-pin alternative at 1920. No server is needed.

- [1920 desktop](comp-1920.png)
- [1600 desktop](comp-1600.png)
- [1440 desktop](comp-1440.png)
- [1024 tablet](comp-1024.png)
- [390 mobile](comp-390.png)
- [Rainbow badge alternative](fallback-rainbow-1920.png)
- [About detail](about-detail.png), [Working on detail](working-detail.png), [lower field](lower-detail.png), and [Miku edge](miku-detail.png)

Read the [placement plan and critical review](placement-plan.md), then the [all-44 coverage checklist](asset-coverage.md) and [numerical reference](placement-reference.md).

## What changed

- A narwhal catches the Spotlight's upper-left corner. The smaller rainbow badge remains a good fallback.
- Terra Blade occupies the right margin near the Projects panel's lower corner. Miku peeks from open space farther down, below the changelog, without being clipped by Projects.
- Flipped Kris points toward the portrait from under the logo, nudged inward from the page edge. A small Killer Queen head sits lower down; the ladybug brooch is removed.
- The actual Godot process image sits lower and farther left beside Working on, partially behind Sketchbook.
- The handheld moves slightly up/right, away from More stuff. It stays with Lancer; the two Slay the Spire relics form a diagonal pocket beside Sketchbook.
- The megaphone stays beside the changelog. The glitch slime shifts slightly left; the two FF4 crystals remain near the map.
- Kuromi and the ukulele keep their desktop positions. A larger Starforce sprite remains on the file pile's opposite side; the sword now belongs to the Projects margin.
- All Noise and incidental badge scatter are removed from this authored revision.

## Scope and evidence

These are design artifacts, **not implemented homepage changes**. The comps overlay actual supplied assets on the previously captured production homepage. They reuse the same baseline and Familiar state as revision 01. The requested widths are 1920, 1600, 1440, 1024, and 390; the image content is 15 pixels narrower because of the captured scrollbar.

The full asset inspection remains in the [original visual inventory](../asset-review.md), including contact sheets and GIF timing. Its old placement recommendations are superseded by this revision. Every supplied image has a current disposition in the new checklist.

The HTML previews use frozen section geometry and image masks to demonstrate objects tucked behind frames. Those masks are compositing tools, not a production layering implementation. The PNGs freeze GIFs at a sampled frame. Live anchor movement, expanded changelog, file shuffling, focus states, and complete GIF cycles still require checks during implementation. The revised comp does not claim live verification at 320 or the desktop breakpoint.

No application code was edited. No application server was started for this revision; temporary capture browsers are stopped after use.
