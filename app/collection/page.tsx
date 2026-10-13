import { ClutterPage } from "../../components/clutter/clutter-page";
import { RoutePlaceholder } from "../../components/pages/route-placeholder";

export default function CollectionPage() {
    return (
        <ClutterPage pageId="collection">
            <RoutePlaceholder
                eyebrow="LOCAL VISITOR PROFILE"
                title="Collection"
                summary="Visitor cosmetics and discoveries will live here."
            />
        </ClutterPage>
    );
}
