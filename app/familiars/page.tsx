import { FamiliarPreview } from "../../components/familiars/familiar-preview";
import { RoutePlaceholder } from "../../components/pages/route-placeholder";
import { getFamiliars } from "../../lib/content/repository";

export default async function FamiliarsPage() {
    const familiars = await getFamiliars();

    return (
        <RoutePlaceholder
            eyebrow="PIXEL PUGILISTS / PUBLIC ROSTER"
            title="Familiars"
            summary="A growing collection of combat companions."
        >
            {familiars.map((familiar) => <FamiliarPreview key={familiar.id} familiar={familiar} />)}
        </RoutePlaceholder>
    );
}
