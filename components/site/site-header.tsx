import Image from "next/image";
import Link from "next/link";
import { PRIMARY_NAVIGATION } from "../../lib/site/navigation";
import { VisitorProfile } from "./visitor-profile";
import { SoundToggle } from "./sound-toggle";
import styles from "./site-header.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Link className={styles.brand} href="/" aria-label="Breakspider home">
        <Image
          src="/media/branding/breakspider-logo.svg"
          alt="Breakspider"
          width={1600}
          height={820}
          priority
        />
        <span>PERSONAL INTERNET SPACE</span>
      </Link>
      <nav className={styles.navigation} aria-label="Primary navigation">
        {PRIMARY_NAVIGATION.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className={styles.controls}>
        <SoundToggle />
        <VisitorProfile />
      </div>
    </header>
  );
}
