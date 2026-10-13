import type { Metadata } from "next";
import Link from "next/link";
import { ContentImage } from "../../components/ui/content-image";
import { ClutterBoundary } from "../../components/clutter/clutter-page";
import { ClutterLayer } from "../../components/clutter/clutter-layer";
import { getPageClutter } from "../../lib/clutter/repository";
import { getAboutContent, getFamiliar, getHomepageContent, getProjects } from "../../lib/content/repository";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
    const identity = await getHomepageContent();
    return {
        title: `About + Contact — ${identity.displayName} | Breakspider`,
        description: `Meet ${identity.displayName}, a full-stack software engineer and game developer. Projects, professional links, and contact information.`,
    };
}

export default async function AboutPage() {
    const [identity, about, projects] = await Promise.all([
        getHomepageContent(), getAboutContent(), getProjects(),
    ]);
    const familiar = await getFamiliar(about.familiarSlug);
    const clutter = getPageClutter("about");
    const layer = (anchor: string) => <ClutterLayer anchor={anchor} assets={clutter.assets} placements={clutter.placements} />;

    return (
        <ClutterBoundary clutter={clutter}>
            <div className={styles.page} data-clutter-anchor="canvas">
                <div className={styles.routeLine}>
                    <Link href="/">← HOME</Link>
                    <span>/ ABOUT + CONTACT</span>
                    <span className={styles.routeStatus}>PROFILE / PUBLIC</span>
                </div>
                <section className={styles.identity} data-clutter-anchor="identity" aria-labelledby="about-title">
                    <div className={styles.identityCopy}>
                        <p className={styles.status}>
                            <span className={styles.statusDot} aria-hidden="true" />
                            {identity.availability}
                            <span className={styles.statusNote}>{"// ABOUT THIS PERSON"}</span>
                        </p>
                        <h1 id="about-title">About <span>me.</span></h1>
                        <p className={styles.name}>
                            <strong>{identity.displayName}</strong>
                            <span>full-stack software engineer / game developer</span>
                        </p>
                        <p className={styles.lead}>{about.introduction}</p>
                        <div className={styles.quickLinks}>
                            <a href="#contact">Contact <span aria-hidden="true">↗</span></a>
                            <Link href="/projects">See projects <span aria-hidden="true">↗</span></Link>
                        </div>
                    </div>
                    <figure className={styles.portrait} data-clutter-anchor="portrait">
                        <ContentImage media={identity.portrait} loading="eager"
                            sizes="(max-width: 47.5rem) 65vw, (max-width: 76.25rem) 32vw, 24vw" />
                        <figcaption>{about.portraitCaption}</figcaption>
                        {layer("portrait")}
                    </figure>
                    {layer("identity")}
                </section>
                <section className={styles.contact} data-clutter-anchor="contact" id="contact" aria-labelledby="contact-title">
                    <div className={styles.contactBar} aria-hidden="true">
                        <span>CONTACT.TXT</span><span>PUBLIC / OPEN</span><span>□ ×</span>
                    </div>
                    <div className={styles.contactBody}>
                        <p className={styles.kicker}>EASIEST WAY TO REACH ME</p>
                        <h2 id="contact-title">Get in touch.</h2>
                        {identity.email ? (
                            <a className={styles.email} href={`mailto:${identity.email}`}>
                                {identity.email} <span aria-hidden="true">↗</span>
                            </a>
                        ) : <p className={styles.pending}>Email pending</p>}
                        <div className={styles.contactLinks}>
                            <a href={about.githubUrl}>
                                <strong>GITHUB</strong><span>almazancameron <span aria-hidden="true">↗</span></span>
                            </a>
                            <a href={about.linkedinUrl}>
                                <strong>LINKEDIN</strong><span>Cameron Almazan <span aria-hidden="true">↗</span></span>
                            </a>
                            {about.resumeUrl ? (
                                <div className={styles.resumeRow}>
                                    <strong>RÉSUMÉ</strong>
                                    <span>
                                        <a href={about.resumeUrl}>View PDF <span aria-hidden="true">↗</span></a>
                                        <a href={about.resumeUrl} download>Download <span aria-hidden="true">↓</span></a>
                                    </span>
                                </div>
                            ) : (
                                <div className={styles.resumeRow}>
                                    <strong>RÉSUMÉ</strong><span className={styles.pending}>PDF coming soon</span>
                                </div>
                            )}
                        </div>
                    </div>
                    {layer("contact")}
                </section>
                <section className={styles.practice} data-clutter-anchor="practice" aria-labelledby="practice-title">
                    <p className={styles.kicker}>WHAT I DO</p>
                    <h2 id="practice-title">Software <span>and</span> game systems.</h2>
                    <p className={styles.practiceSummary}>{about.practiceSummary}</p>
                    <ul className={styles.skillLine} aria-label="Areas of practice">
                        {about.skillLabels.map((label) => <li key={label}>{label}</li>)}
                    </ul>
                    {layer("practice")}
                </section>
                <section className={styles.workTrail} data-clutter-anchor="workTrail" aria-labelledby="evidence-title">
                    <div className={styles.workIntro}>
                        <h2 id="evidence-title" className={styles.kicker}>SOME RECEIPTS</h2>
                        <p>Two different kinds of work.<br />The project pages have the details.</p>
                    </div>
                    {about.evidence.map((evidence) => {
                        const project = projects.find((item) => item.slug === evidence.projectSlug);
                        return (
                            <Link key={evidence.projectSlug}
                                className={`${styles.evidence} ${project?.type === "game" ? styles.gameEvidence : styles.softwareEvidence}`}
                                href={project ? `/projects/${project.slug}` : "/projects"}>
                                {evidence.media ? (
                                    <ContentImage media={evidence.media}
                                        sizes="(max-width: 47.5rem) 90vw, (max-width: 76.25rem) 45vw, 31vw" />
                                ) : (
                                    <div className={styles.mediaPending}>
                                        <span>STORYBOARD / PREVIEW</span>
                                        <strong>Media pending review</strong>
                                        <span>Viscap project details <span aria-hidden="true">↗</span></span>
                                    </div>
                                )}
                                <span className={styles.evidenceCaption}>
                                    <strong>{project?.title ?? "Project pending"}</strong>
                                    <span>{evidence.caption} <span aria-hidden="true">↗</span></span>
                                </span>
                            </Link>
                        );
                    })}
                    {layer("workTrail")}
                </section>
                <aside className={styles.satellite} data-clutter-anchor="satellite" aria-label="Related game work">
                    {familiar && <ContentImage media={familiar.sprite} sizes="88px" />}
                    <div>
                        <p>Making this one too.</p>
                        <Link href="/familiars">Meet the Familiars <span aria-hidden="true">↗</span></Link>
                    </div>
                    {layer("satellite")}
                </aside>
                {layer("canvas")}
            </div>
        </ClutterBoundary>
    );
}
