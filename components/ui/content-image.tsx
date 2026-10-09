import Image from "next/image";
import type { ImageMedia } from "../../lib/content/models";
import styles from "./content-image.module.css";

type ContentImageProps = {
    media: ImageMedia;
    className?: string;
    sizes?: string;
    loading?: "eager" | "lazy";
    unoptimized?: boolean;
};

export function ContentImage({
    media,
    className,
    sizes = "(max-width: 48rem) 100vw, 50vw",
    loading = "lazy",
    unoptimized = false,
}: ContentImageProps) {
    return (
        <Image
            className={`${styles.image} ${className ?? ""}`}
            src={media.src}
            alt={media.alt}
            width={media.width ?? 960}
            height={media.height ?? 540}
            sizes={sizes}
            loading={loading}
            unoptimized={unoptimized}
        />
    );
}
