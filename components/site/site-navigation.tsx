"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { PRIMARY_NAVIGATION } from "../../lib/site/navigation"
import styles from "./site-navigation.module.css"

const linkStyles: Record<string, string> = {
    "/": styles.home,
    "/projects": styles.projects,
    "/about": styles.about,
}

export const SiteNavigation = () => {
    const pathname = usePathname()

    return (
        <nav className={styles.navigation} aria-label="Primary navigation">
            {PRIMARY_NAVIGATION.map((link) => {
                const current = link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`)

                return (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`${styles.link} ${linkStyles[link.href]}`}
                    aria-current={current ? (pathname === link.href ? "page" : "location") : undefined}
                >
                    {link.label}
                </Link>
                )
            })}
        </nav>
    )
}