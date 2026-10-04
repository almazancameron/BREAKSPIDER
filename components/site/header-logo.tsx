import Image from "next/image"
import Link from "next/link"
import styles from "./header-logo.module.css"

export const HeaderLogo = () => {
    return (
        <Link className={styles.logo} href="/" aria-label="Breakspider home">
            <Image
                src="/media/branding/breakspider-logo.svg"
                alt=""
                width={1600}
                height={820}
                className={styles.artwork}
            />
        </Link>
    )
}
