# Phase 3 — Content to replace or review

The About composition and contact paths are implemented. Phase 3 remains unaccepted while copy, résumé, reviewed Viscap evidence and clutter are pending. Name, email, availability, illustrated portrait, GitHub and LinkedIn use the owner's confirmed values.

| Item | What the owner should supply or approve | Where to update |
| --- | --- | --- |
| Introduction | Review the draft beginning “I build web applications, connected systems, and games.” Replace with preferred concise professional/personal introduction. | `content/about.ts`: `introduction` |
| Practice summary | Review the draft about connected interfaces and ONFF. Supply any specific strengths, tools or experience to emphasize; no employment history was invented. | `content/about.ts`: `practiceSummary` |
| Skills | Confirm or replace WEB APPS, SYSTEMS THINKING, GAME DEVELOPMENT and INTERACTION. | `content/about.ts`: `skillLabels` |
| Résumé | Add a real PDF; recommended file `public/resume.pdf`. Then set `resumeUrl` to `/resume.pdf`. Until then the page says “PDF coming soon” without a broken download. | `content/about.ts`: `resumeUrl` |
| Viscap storyboard | Supply or approve a privacy-reviewed derivative. The source at `assets/work-screenshots/viscap-storyboard.PNG` contains actor thumbnails, client/script text and identifiers; it has not been copied to About's public media. | `content/about.ts`: Viscap `evidence[0].media` |
| Short captions | Optional review: “Connected web platform”, “Game systems in progress”, and “ALSO ME, SORT OF”. | `content/about.ts`: evidence captions and `portraitCaption` |
| Clutter | Provide the image folder for subsequent selection and authored placement. About and the other new-page placement files remain empty; the shared development editor is ready. | `content/about-clutter.ts`, `content/clutter/`, shared asset palette |

For the reviewed storyboard, set a selected production path, accurate dimensions and descriptive alt text. Do not assume the derivative retains the source's 1867×996 dimensions:

```ts
media: {
    kind: "image",
    src: "/media/about/viscap-storyboard.png",
    alt: "Viscap storyboard workspace with clips and production workflow columns",
    width: 1867,
    height: 996,
},
```

The dimensions above describe the original source only; replace them with the approved derivative's measured dimensions. ONFF already uses the real priority-builder capture and canonical production link.
