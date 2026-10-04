import Link from "next/link";
import { RoutePlaceholder } from "../components/pages/route-placeholder";
import { SITE_LINKS } from "../lib/site/navigation";
import styles from "./page.module.css";
import { ReplayIntroButton } from "../components/intro/replay-intro-button";

export default function Home() {
  return (
    <RoutePlaceholder
      eyebrow="PERSONAL INTERNET SPACE"
      title="Breakspider"
      summary="A place for software, games, and things worth inspecting."
    >
      <ul className={styles.links}>
        {SITE_LINKS.map((link) => (
          <li key={link.href}><Link href={link.href}>{link.label} ↗</Link></li>
        ))}
      </ul>
      <ReplayIntroButton />
    </RoutePlaceholder>
  );
}
