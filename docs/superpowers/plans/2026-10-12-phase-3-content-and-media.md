# Phase 3 Part 1 — Content and Media Implementation Plan

> **For agentic workers:** Use `superpowers:executing-plans` only if implementation is later requested. This tutorial authorizes no implementation, delegation, commit, or deployment.

**Status:** Content types, repository read and draft content implemented October 13, 2026. Real résumé and privacy-reviewed Viscap storyboard remain pending at the owner's direction. Copy awaits owner review. See [content replacements](../../design/phase-3-about-contact/placeholder-content.md); Phase 3 is not accepted.

**Goal:** Establish a small content contract, reviewable copy, and truthful media/contact states for About.

**Architecture:** Add one authored record and repository read. Consume accepted homepage identity separately; keep About evidence choices local rather than changing shared project media or homepage ownership.

**Tech Stack:** Existing TypeScript, repository and media models, Vitest. No dependencies.

**Spec and global constraints:** [Phase 3 reading guide](2026-10-12-phase-3-about-contact.md); its owner decisions and constraints apply throughout.

**Review focus:** Missing PDF, unsafe storyboard, copy accuracy, and accidental duplication of accepted identity.

## Learn first

Content records describe what the room says; page JSX/CSS describe how it is arranged. A typed record does not need to become a page schema. The repository is the existing boundary for future storage replacement, not a reason to build a CMS now.

Read `content/homepage.ts`, `content/projects.ts`, `content/familiars.ts`, `lib/content/models.ts`, `lib/content/repository.ts`, and `tests/content-repository.test.mjs`. Inspect the actual portrait, storyboard and ONFF priority capture alongside the About screenshots.

## Task 1: Define and author About content

**Files:** Modify `lib/content/models.ts` and `lib/content/repository.ts`; create `content/about.ts`.

**Consumes:** `ImageMedia`, `getHomepageContent(): Promise<HomepageContent>`, existing project/Familiar slug conventions.

**Produces:** `aboutContent` and `getAboutContent(): Promise<AboutContent>` with this contract:

```ts
export type AboutProjectEvidence = {
    projectSlug: string;
    caption: string;
    media: ImageMedia | null;
};

export type AboutContent = {
    introduction: string;
    practiceSummary: string;
    skillLabels: string[];
    githubUrl: string;
    linkedinUrl: string;
    resumeUrl: string | null;
    evidence: AboutProjectEvidence[];
    familiarSlug: string;
};
```

- [ ] Draft a short introduction and practice paragraph from accepted homepage copy and existing ONFF/Viscap records. Use the full-stack engineer / game developer identity; distinguish confirmed facts from wording needing approval. Show the owner the draft before treating copy as final.
- [ ] Add the types, then author `aboutContent` with `satisfies AboutContent`. Use the confirmed social URLs; keep `resumeUrl: null` until the owner supplies a working PDF. Do not create a text placeholder résumé.
- [ ] Set evidence order to `viscap-ai`, then `one-night-familiar-fight`; set `familiarSlug` to `ashwing`. Use concise factual captions. Viscap media remains null until the reviewed derivative exists. ONFF uses the existing priority builder with accurate alt text and 1159×661 dimensions.
- [ ] Add the asynchronous repository accessor, following existing shallow-copy reads. Do not change `getHomepageContent()` or duplicate its name, email, availability, and portrait in the About record.
- [ ] Run `npm run typecheck`; expect no errors. If adding a repository test, extend the existing test file to cover confirmed URLs, canonical slugs, and nullable pending media/résumé. Avoid tests that only reproduce every copy string.

## Task 2: Prepare production evidence and the résumé state

**Files:** Source `assets/work-screenshots/viscap-storyboard.PNG`; selected output `public/media/about/viscap-storyboard.png`; update `content/about.ts`. Owner-supplied `public/resume.pdf` when available.

**Produces:** Truthful `ImageMedia` for the reviewed derivative and a working résumé destination or explicit pending state.

- [ ] Review the source storyboard with the owner: actor thumbnails, client names, script text, identifiers and file names are visible. Agree what can remain and what needs anonymization/redaction. Do not assume the capture is approved merely because it is in `assets/`.
- [ ] Produce only the reviewed derivative when that decision is available. Preserve the native dark/blue software character and recognizable storyboard structure; leave the source unchanged. Measure the derivative rather than assuming it retains the source's 1867×996 dimensions.
- [ ] Update Viscap's About evidence record with the actual path, dimensions and descriptive storyboard alt text. Do not use the existing shared Viscap media record's ONFF alt text or 1159×661 dimensions; its current media-library file is actually 1865×990.
- [ ] When the owner adds the PDF, verify the file is a readable PDF at the agreed path, then set `resumeUrl`. Until then, keep it null and document the pending owner delivery.

## Checkpoint before Part 2

- [ ] Copy is reviewable and its approval status recorded.
- [ ] Confirmed contact URLs and canonical project slugs are in one About record; accepted identity still has one owner.
- [ ] Available image paths resolve and metadata describes the actual selected images.
- [ ] Unavailable PDF/unreviewed storyboard remain explicit pending states. They need not prevent layout work, but remain acceptance prerequisites.
- [ ] Typecheck and any meaningful changed-content tests pass. This content part does not change homepage/editor behavior; the authorized shared-editor extraction belongs to Part 3.

Next: [Part 2 — Profile and contact](2026-10-12-phase-3-profile-and-contact.md).
