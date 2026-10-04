export type SiteLink = {
  label: string;
  href: string;
  group: "main" | "projects" | "other";
  primary: boolean;
};

export const SITE_LINKS: SiteLink[] = [
  { label: "Home", href: "/", group: "main", primary: true },
  { label: "Projects", href: "/projects", group: "main", primary: true },
  { label: "About", href: "/about", group: "main", primary: true },
  { label: "Viscap", href: "/projects/viscap-ai", group: "projects", primary: false },
  { label: "Sketchbook", href: "/sketchbook", group: "other", primary: false },
  { label: "Familiars", href: "/familiars", group: "other", primary: false },
  { label: "Collection", href: "/collection", group: "other", primary: false },
  { label: "Map", href: "/map", group: "other", primary: false },
  { label: "One Night Familiar Fight", href: "/projects/one-night-familiar-fight", group: "projects", primary: false },
];

export const PRIMARY_NAVIGATION = SITE_LINKS.filter((link) => link.primary);

export const PUBLIC_ROUTE_GROUPS = ["main", "projects", "other"] as const;
