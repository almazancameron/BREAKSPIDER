import Image from "next/image"
import Link from "next/link"
import styles from "./header-logo.module.css"

export const HeaderLogo = () => {
    return (
        <Link className={styles.logo} href="/" aria-label="Breakspider home">
            <span className={styles.artwork} aria-hidden="true">
                <span className={`${styles.half} ${styles.left}`}>
                    <Image
                        src="/media/branding/breakspider-logo.svg"
                        alt=""
                        width={1600}
                        height={820}
                    />
                </span>
                <span className={`${styles.half} ${styles.right}`}>
                    <Image
                        src="/media/branding/breakspider-logo.svg"
                        alt=""
                        width={1600}
                        height={820}
                    />
                </span>
            </span>
        </Link>
    )
}
