import type { ReactNode } from "react";
import styles from "./route-placeholder.module.css";

type RoutePlaceholderProps = {
  eyebrow: string;
  title: string;
  summary: string;
  children?: ReactNode;
};

/** Temporary route shell; each content route gets its own composition in later phases. */
export function RoutePlaceholder({ eyebrow, title, summary, children }: RoutePlaceholderProps) {
  return (
    <section className={styles.page}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1>{title}</h1>
      <p className={styles.summary}>{summary}</p>
      {children}
    </section>
  );
}
