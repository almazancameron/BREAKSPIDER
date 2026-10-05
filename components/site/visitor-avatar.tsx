import Image from "next/image";
import styles from "./visitor-avatar.module.css";

type VisitorAvatarProps = {
    size?: number;
    showBadge?: boolean;
};

export function VisitorAvatar({ size = 46, showBadge = true }: VisitorAvatarProps) {
    return (
        <span className={styles.avatar} style={{ width: size, height: size }}>
            <Image
                src="/media/profile/default-avatar.png"
                alt=""
                width={size}
                height={size}
            />
            {showBadge && (
                <Image
                    className={styles.badge}
                    src="/media/profile/heart-badge.png"
                    alt=""
                    aria-hidden="true"
                    width={Math.round(size * 0.42)}
                    height={Math.round(size * 0.42)}
                />
            )}
        </span>
    );
}
