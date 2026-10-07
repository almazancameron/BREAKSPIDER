import Link from "next/link";
import { ContentImage } from "../components/ui/content-image";
import { getHomepageContent, getProjects } from "../lib/content/repository";
import styles from "./page.module.css";
import { ReplayIntroButton } from "../components/intro/replay-intro-button";

export default async function Home() {
    const [home, projects] = await Promise.all([
        getHomepageContent(),
        getProjects(),
    ]);
    const currentProject = projects.find(
        (project) => project.slug === home.currentProjectSlug,
    ) ?? null;
    const viscap = projects.find((project) => project.slug === "viscap-ai") ?? null;
    const onff = projects.find(
        (project) => project.slug === "one-night-familiar-fight",
    ) ?? null;

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

            <div className={styles.homeActions}>
                <ReplayIntroButton />
            </div>
        </div>
    );
}
