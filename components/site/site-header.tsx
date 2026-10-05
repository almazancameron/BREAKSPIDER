import { VisitorProfile } from "./visitor-profile"
import { SoundToggle } from "./sound-toggle"
import { SiteNavigation } from "./site-navigation"
import { HeaderLogo } from "./header-logo"
import styles from "./site-header.module.css"

export const SiteHeader = () => {
    return (
        <header className={styles.header}>
            <div className={styles.controls}>
                <VisitorProfile />
                <SoundToggle />
            </div>
            <SiteNavigation />
            <div className={styles.identity}>
                <HeaderLogo />
            </div>
        </header>
    )
}
