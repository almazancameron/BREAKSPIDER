import Link from "next/link";
import type { Familiar } from "../../lib/content/models";
import { RoutePlaceholder } from "../pages/route-placeholder";
import { ContentImage } from "../ui/content-image";

export function FamiliarProfile({ familiar }: { familiar: Familiar }) {
    return (
        <RoutePlaceholder
            eyebrow={`FAMILIAR / ${familiar.playstyle}`}
            title={familiar.name}
            summary={familiar.description}
        >
            <ContentImage media={familiar.sprite} sizes="64px" />
            <p>{familiar.tags.join(" / ")}</p>
            <Link href="/familiars">Back to the Familiar roster</Link>
        </RoutePlaceholder>
    );
}
