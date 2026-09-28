export type SiteLink = {
  label: string;
  href: string;
  group: "Start here" | "Project rooms" | "Other rooms";
  primary: boolean;
};

export const SITE_LINKS: SiteLink[] = [
  { label: "Home", href: "/", group: "Start here", primary: true },
  { label: "Projects", href: "/projects", group: "Start here", primary: true },
  { label: "About", href: "/about", group: "Start here", primary: true },
  { label: "Pixel Pugilists", href: "/projects/pixel-pugilists", group: "Project rooms", primary: false },
  { label: "Viscap", href: "/projects/viscap-ai", group: "Project rooms", primary: false },
  { label: "Sketchbook", href: "/sketchbook", group: "Other rooms", primary: false },
  { label: "Familiars", href: "/familiars", group: "Other rooms", primary: false },
  { label: "Collection", href: "/collection", group: "Other rooms", primary: false },
  { label: "Map", href: "/map", group: "Other rooms", primary: false },
  { label: "One Night Familiar Fight", href: "/projects/one-night-familiar-fight", group: "Project rooms", primary: false },
];

export const PRIMARY_NAVIGATION = SITE_LINKS.filter((link) => link.primary);

export const PUBLIC_ROUTE_GROUPS = ["Start here", "Project rooms", "Other rooms"] as const;
