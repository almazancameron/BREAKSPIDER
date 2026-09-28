import type { Collectible } from "../lib/content/models.ts";

export const collectibles = [
  {
    id: "found-map",
    name: "Found Map",
    type: "map",
    media: null,
    description: "A guide to the public rooms.",
    unlockRuleId: "find-map",
    cosmetic: null,
  },
] satisfies Collectible[];
