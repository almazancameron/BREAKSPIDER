import Link from "next/link";
import { ContentImage } from "../components/ui/content-image";
import { HomeFamiliar } from "../components/home/home-familiar";
import {
    getChangelogEntries,
    getFamiliars,
    getHomepageContent,
    getProjects,
    getSketchbookPosts,
} from "../lib/content/repository";
import styles from "./page.module.css";
import { ReplayIntroButton } from "../components/intro/replay-intro-button";

const updateDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
});

export default async function Home() {
    const [home, projects, familiars, posts, changelog] = await Promise.all([
        getHomepageContent(),
        getProjects(),
        getFamiliars(),
        getSketchbookPosts(),
        getChangelogEntries(),
    ]);
    const currentProject = projects.find(
        (project) => project.slug === home.currentProjectSlug,
    ) ?? null;
    const viscap = projects.find((project) => project.slug === "viscap-ai") ?? null;
    const onff = projects.find(
        (project) => project.slug === "one-night-familiar-fight",
    ) ?? null;
    const recentPosts = posts.slice(0, 10);
    const latestUpdate = changelog[0] ?? null;
    const olderUpdates = changelog.slice(1);
    const roamingFamiliar = familiars.find((familiar) => familiar.slug === "ashwing") ?? null;

    return (
        <div className={styles.canvas}>
            <section className={styles.spotlight} aria-labelledby="home-spotlight-title">
                <div className={styles.windowBar}>
                    <span><i aria-hidden="true" /> PINNED TO PROFILE</span>
                    <span>{home.availability}</span>
                    <span aria-hidden="true">□ ×</span>
                </div>
                <div className={styles.spotlightBody}>
                    <p className={styles.signal}>
                        <span>{home.availability}</span>
                        <span className={styles.displayName}>{"// "}{home.displayName}</span>
                    </p>
                    <h1 id="home-spotlight-title" className={styles.headline}>
                        <span>Full-stack</span>
                        <span>software engineer.</span>
                        <em>Game developer.</em>
                    </h1>
                    <p className={styles.introduction}>{home.introduction}</p>
                    <div className={styles.spotlightLinks}>
                        <Link href="/projects">See projects <span aria-hidden="true">↗</span></Link>
                        <Link href="/about">About + contact <span aria-hidden="true">↗</span></Link>
                    </div>
                    <ul className={styles.facts} aria-label="Areas of focus">
                        <li>WEB APPS</li>
                        <li>GAME SYSTEMS</li>
                        <li>INTERACTIONS</li>
                    </ul>
                </div>
                <figure className={styles.heroCapture}>
                    <div className={styles.captureBar}>
                        <span>BUILD / ONFF</span>
                        <span aria-hidden="true">●</span>
                    </div>
                    <ContentImage
                        media={home.spotlightCapture}
                        className={styles.combatImage}
                        loading="eager"
                        sizes="(max-width: 47.5rem) 85vw, (max-width: 76.25rem) 50vw, 25vw"
                    />
                    <figcaption>
                        <Link href={currentProject ? `/projects/${currentProject.slug}` : "/projects"}>
                            {currentProject ? "Open ONFF project" : "Open projects"}
                            <span aria-hidden="true"> ↗</span>
                        </Link>
                    </figcaption>
                </figure>
                <span className={styles.spotlightCorner} aria-hidden="true">◆</span>
            </section>

            <section className={styles.about} aria-labelledby="home-about-title">
                <div className={styles.aboutCopy}>
                    <p className={styles.moduleLabel}>A LITTLE ABOUT ME</p>
                    <h2 id="home-about-title">About me</h2>
                    <p>{home.displayName} · {home.aboutSummary}</p>
                    {home.email && (
                        <a className={styles.email} href={`mailto:${home.email}`}>{home.email}</a>
                    )}
                    <Link className={styles.aboutLink} href="/about">
                        Profile + contact <span aria-hidden="true">↗</span>
                    </Link>
                    <span className={styles.aboutBracket} aria-hidden="true">[ mostly human ]</span>
                </div>
                <Link className={styles.creatorPortrait} href="/about" aria-label="About the creator">
                    <ContentImage media={home.portrait} sizes="(max-width: 76.25rem) 104px, 128px" />
                </Link>
            </section>

            <section className={styles.projects} aria-labelledby="home-projects-title">
                {roamingFamiliar && (
                    <Link className={styles.roamingFamiliar} href="/familiars" aria-label="Meet the Familiars — wild encounter">
                        <ContentImage media={roamingFamiliar.sprite} sizes="88px" />
                        <span>WILD ENCOUNTER <span aria-hidden="true">↗</span></span>
                    </Link>
                )}
                <div className={styles.projectHead}>
                    <p className={styles.moduleLabel}>PROJECTS</p>
                    <h2 id="home-projects-title">THINGS I&apos;VE MADE <span aria-hidden="true">↗</span></h2>
                </div>
                <div className={styles.projectImages}>
                    <Link
                        className={`${styles.projectPreview} ${styles.viscapPreview}`}
                        href={viscap ? `/projects/${viscap.slug}` : "/projects"}
                        aria-label={viscap ? `Open ${viscap.title} project` : "Viscap pending — open projects"}
                    >
                        {viscap?.heroMedia ? (
                            <ContentImage media={viscap.heroMedia} sizes="(max-width: 47.5rem) 60vw, 25vw" />
                        ) : (
                            <div className={styles.pendingMedia}>
                                <strong>{viscap?.title ?? "Viscap"}</strong>
                                <span>Media pending review</span>
                            </div>
                        )}
                        <span className={styles.previewLabel}>VISCAP / PLATFORM</span>
                    </Link>
                    <Link
                        className={`${styles.projectPreview} ${styles.onffPreview}`}
                        href={onff ? `/projects/${onff.slug}` : "/projects"}
                        aria-label={onff ? `Open ${onff.title} project` : "ONFF pending — open projects"}
                    >
                        {onff?.heroMedia ? (
                            <ContentImage media={onff.heroMedia} sizes="(max-width: 47.5rem) 60vw, 25vw" />
                        ) : (
                            <div className={styles.pendingMedia}>
                                <strong>ONFF</strong>
                                <span>Project media pending</span>
                            </div>
                        )}
                        <span className={styles.previewLabel}>ONFF / GAME BUILD</span>
                    </Link>
                </div>
                <p className={styles.projectSummary}>{viscap?.summary ?? "Viscap project details pending."}</p>
                <div className={styles.projectBottom}>
                    <span>SOFTWARE + GAMES</span>
                    <Link href="/projects">All projects <span aria-hidden="true">↗</span></Link>
                </div>
            </section>

            <section className={styles.current} aria-labelledby="home-current-title">
                <div className={styles.currentCopy}>
                    <p className={styles.moduleLabel}>WORKING ON</p>
                    <h2 id="home-current-title">{currentProject?.title ?? "Current project"}</h2>
                    <p>{currentProject?.summary ?? "Current project details pending."}</p>
                    <Link href={currentProject ? `/projects/${currentProject.slug}` : "/projects"}>
                        {currentProject ? "Open project" : "See projects"} <span aria-hidden="true">↗</span>
                    </Link>
                </div>
            </section>

            <section className={styles.sketchbook} aria-labelledby="home-sketchbook-title">
                <div className={styles.sketchbookHead}>
                    <p className={styles.moduleLabel}>FROM THE SKETCHBOOK</p>
                    <h2 id="home-sketchbook-title">Recent posts</h2>
                </div>
                <div className={styles.sketchbookFeed} role="region" aria-label="Recent Sketchbook posts" tabIndex={0}>
                    {recentPosts.length > 0 ? recentPosts.map((post) => (
                        <article className={styles.sketchbookPost} key={post.id}>
                            <time dateTime={post.publishedAt}>{updateDate.format(new Date(post.publishedAt))}</time>
                            <h3>{post.title}</h3>
                            <p>{post.excerpt}</p>
                            <Link href={post.isLongform ? `/sketchbook/${post.slug}` : "/sketchbook"}>
                                {post.isLongform ? "Read post" : "Open Sketchbook"} <span aria-hidden="true">↗</span>
                            </Link>
                            {post.tags.length > 0 && <p className={styles.postTags}>{post.tags.join(" · ")}</p>}
                        </article>
                    )) : <p className={styles.sketchbookEmpty}>No Sketchbook entries yet</p>}
                </div>
                <div className={styles.sketchbookBottom}>
                    <Link href="/sketchbook">All Sketchbook posts <span aria-hidden="true">↗</span></Link>
                </div>
            </section>

            <section className={styles.familiar} aria-labelledby="home-familiar-title">
                <HomeFamiliar familiars={familiars} featuredSlug={home.featuredFamiliarSlug} />
            </section>

            <section className={styles.changelog} aria-labelledby="home-changelog-title">
                <div className={styles.updateBar}>
                    <span>UPDATE.TXT</span>
                    {latestUpdate && <span>{latestUpdate.version}</span>}
                </div>
                <div className={styles.updateBody}>
                    <h2 id="home-changelog-title">Site changelog</h2>
                    {latestUpdate ? (
                        <>
                            <h3>{latestUpdate.title}</h3>
                            <time dateTime={latestUpdate.publishedAt}>
                                {updateDate.format(new Date(latestUpdate.publishedAt))}
                            </time>
                            <ul>
                                {latestUpdate.notes.slice(0, 3).map((note, index) => <li key={index}>{note}</li>)}
                            </ul>
                            {latestUpdate.links.map((link) => <Link key={link.href} href={link.href}>{link.label} <span aria-hidden="true">↗</span></Link>)}
                            {(olderUpdates.length > 0 || latestUpdate.notes.length > 3) && (
                                <details className={styles.updates}>
                                    <summary>See updates</summary>
                                    {latestUpdate.notes.length > 3 && (
                                        <ul>{latestUpdate.notes.slice(3).map((note, index) => <li key={index}>{note}</li>)}</ul>
                                    )}
                                    {olderUpdates.map((entry) => (
                                        <article key={entry.id}>
                                            <p className={styles.updateVersion}>{entry.version}</p>
                                            <h3>{entry.title}</h3>
                                            <time dateTime={entry.publishedAt}>{updateDate.format(new Date(entry.publishedAt))}</time>
                                            <ul>{entry.notes.map((note, index) => <li key={index}>{note}</li>)}</ul>
                                            {entry.links.map((link) => <Link key={link.href} href={link.href}>{link.label} <span aria-hidden="true">↗</span></Link>)}
                                        </article>
                                    ))}
                                </details>
                            )}
                        </>
                    ) : <p>No site updates yet</p>}
                </div>
            </section>

            <div className={styles.homeActions}>
                <ReplayIntroButton />
            </div>
        </div>
    );
}
