import Link from "next/link";
import { RoutePlaceholder } from "../components/pages/route-placeholder";

export default function NotFoundPage() {
    return (
        <RoutePlaceholder
            eyebrow="NO PUBLIC ROUTE FOUND"
            title="Nothing here"
            summary="That route does not match a public Breakspider page."
        >
            <Link href="/">Return home</Link>
        </RoutePlaceholder>
    );
}
