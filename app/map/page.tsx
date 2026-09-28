import Link from "next/link";
import { RoutePlaceholder } from "../../components/pages/route-placeholder";
import { PUBLIC_ROUTE_GROUPS, SITE_LINKS } from "../../lib/site/navigation";
import styles from "./page.module.css";

export default function MapPage() {
  return (
    <RoutePlaceholder
      eyebrow="PUBLIC DIRECTORY"
      title="Map"
      summary="A direct index of Breakspider’s public rooms."
    >
      <div className={styles.directory}>
        {PUBLIC_ROUTE_GROUPS.map((group) => (
          <section className={styles.group} key={group} aria-labelledby={`route-group-${group}`}>
            <h2 id={`route-group-${group}`}>{group}</h2>
            <ul>
              {SITE_LINKS.filter((link) => link.group === group).map((link) => (
                <li key={link.href}><Link href={link.href}>{link.label} ↗</Link></li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </RoutePlaceholder>
  );
}
