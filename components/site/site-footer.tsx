import Link from "next/link";
import { SITE_LINKS } from "../../lib/site/navigation";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <span>BREAKSPIDER / V0.1 FOUNDATION</span>
      <nav aria-label="Footer navigation">
        {SITE_LINKS.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
