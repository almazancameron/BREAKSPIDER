import type { AuthoredPlacement, ClutterAsset } from "../lib/home/clutter-types";

// Approved authored keepsakes. Noise and other pickups belong to the later random pass.
// Offsets locate the image center relative to its anchor corner, in CSS pixels.
export const HOME_CLUTTER_ASSETS: ClutterAsset[] = [
    {
        "id": "spotlight-narwhal",
        "media": {
            "kind": "image",
            "src": "/media/home/clutter/pixel-art-purple-narwhal-purple-narwhal-left.png",
            "alt": "",
            "width": 277,
            "height": 277
        },
        "pixelArt": true
    },
    {
        "id": "margin-miku",
        "media": {
            "kind": "image",
            "src": "/media/home/clutter/miku_tv_static.png",
            "alt": "",
            "width": 323,
            "height": 327
        },
        "pixelArt": false
    },
    {
        "id": "about-kris",
        "media": {
            "kind": "image",
            "src": "/media/home/clutter/action-acting.gif",
            "alt": "",
            "width": 200,
            "height": 139
        },
        "pixelArt": true,
        "reducedMotionMedia": {
            "kind": "image",
            "src": "/media/home/clutter/stills/action-acting.png",
            "alt": "",
            "width": 200,
            "height": 139
        }
    },
    {
        "id": "about-killer-queen",
        "media": {
            "kind": "image",
            "src": "/media/home/clutter/jojo-killer-queen.png",
            "alt": "",
            "width": 287,
            "height": 326
        },
        "pixelArt": false
    },
    {
        "id": "onff-process",
        "media": {
            "kind": "image",
            "src": "/media/home/clutter/onff-godot-panel.png",
            "alt": "",
            "width": 660,
            "height": 634
        },
        "pixelArt": false,
        "framed": true
    },
    {
        "id": "familiar-strawberry",
        "media": {
            "kind": "image",
            "src": "/media/home/clutter/Strawberry_flap.gif",
            "alt": "",
            "width": 200,
            "height": 120
        },
        "pixelArt": true,
        "reducedMotionMedia": {
            "kind": "image",
            "src": "/media/home/clutter/stills/Strawberry_flap.png",
            "alt": "",
            "width": 200,
            "height": 120
        }
    },
    {
        "id": "pink-handheld",
        "media": {
            "kind": "image",
            "src": "/media/home/clutter/color-pixels-old-games-pink-handheld.png",
            "alt": "",
            "width": 268,
            "height": 268
        },
        "pixelArt": true
    },
    {
        "id": "lancer",
        "media": {
            "kind": "image",
            "src": "/media/home/clutter/lancer-deltarune.gif",
            "alt": "",
            "width": 148,
            "height": 125
        },
        "pixelArt": true,
        "reducedMotionMedia": {
            "kind": "image",
            "src": "/media/home/clutter/stills/lancer-deltarune.png",
            "alt": "",
            "width": 148,
            "height": 125
        }
    },
    {
        "id": "snake-ring",
        "media": {
            "kind": "image",
            "src": "/media/home/clutter/StS2_RingOfTheSnake.png",
            "alt": "",
            "width": 200,
            "height": 200
        },
        "pixelArt": false
    },
    {
        "id": "snecko-skull",
        "media": {
            "kind": "image",
            "src": "/media/home/clutter/StS2_SneckoSkull.png",
            "alt": "",
            "width": 200,
            "height": 200
        },
        "pixelArt": false
    },
    {
        "id": "megaphone",
        "media": {
            "kind": "image",
            "src": "/media/home/clutter/acnh_megaphone.png",
            "alt": "",
            "width": 128,
            "height": 128
        },
        "pixelArt": false
    },
    {
        "id": "glitch-slime",
        "media": {
            "kind": "image",
            "src": "/media/home/clutter/slimerancher_glitch.png",
            "alt": "",
            "width": 278,
            "height": 326
        },
        "pixelArt": false
    },
    {
        "id": "wayfinder",
        "media": {
            "kind": "image",
            "src": "/media/home/clutter/Aqua's_Wayfinder.webp",
            "alt": "",
            "width": 251,
            "height": 329
        },
        "pixelArt": false
    },
    {
        "id": "light-crystal",
        "media": {
            "kind": "image",
            "src": "/media/home/clutter/FF4_PSP_Light_Crystal.webp",
            "alt": "",
            "width": 28,
            "height": 64
        },
        "pixelArt": true
    },
    {
        "id": "dark-crystal",
        "media": {
            "kind": "image",
            "src": "/media/home/clutter/FF4_PSP_Dark_Crystal.webp",
            "alt": "",
            "width": 28,
            "height": 64
        },
        "pixelArt": true
    },
    {
        "id": "starforce",
        "media": {
            "kind": "image",
            "src": "/media/home/clutter/starforce_omega_1.png",
            "alt": "",
            "width": 36,
            "height": 42
        },
        "pixelArt": true
    },
    {
        "id": "terra-blade",
        "media": {
            "kind": "image",
            "src": "/media/home/clutter/Terra_Blade.webp",
            "alt": "",
            "width": 46,
            "height": 54
        },
        "pixelArt": true
    },
    {
        "id": "kuromi",
        "media": {
            "kind": "image",
            "src": "/media/home/clutter/sanrio-nyanmi-pack.png",
            "alt": "",
            "width": 302,
            "height": 326
        },
        "pixelArt": false
    },
    {
        "id": "ukulele",
        "media": {
            "kind": "image",
            "src": "/media/home/clutter/Ukulele.webp",
            "alt": "",
            "width": 160,
            "height": 165
        },
        "pixelArt": true
    }
];

export const HOME_AUTHORED_PLACEMENTS: AuthoredPlacement[] = [
    {
        "id": "spotlight-narwhal",
        "assetId": "spotlight-narwhal",
        "anchor": "spotlight",
        "anchorPoint": "top-left",
        "x": -15,
        "y": -15,
        "width": 84,
        "rotation": -5,
        "scale": 1,
        "zIndex": 3,
        "hidden": false,
        "flip": false,
        "edgeOffset": null,
        "exclusionPadding": 12,
        "tablet": {
            "x": -5,
            "y": -19,
            "width": 60
        },
        "mobile": {
            "x": 1,
            "y": -12,
            "width": 44
        }
    },
    {
        "id": "margin-miku",
        "assetId": "margin-miku",
        "anchor": "changelog",
        "anchorPoint": "bottom-right",
        "x": 0,
        "y": 116,
        "width": 220,
        "rotation": 0,
        "scale": 1,
        "zIndex": 3,
        "hidden": false,
        "flip": false,
        "edgeOffset": 23,
        "exclusionPadding": 12,
        "narrow": {
            "width": 190
        },
        "tablet": {
            "y": 92,
            "width": 150
        },
        "mobile": {
            "anchor": "sketchbook",
            "anchorPoint": "top-right",
            "x": -41,
            "y": -39,
            "width": 88,
            "edgeOffset": null
        }
    },
    {
        "id": "about-kris",
        "assetId": "about-kris",
        "anchor": "about",
        "anchorPoint": "top-right",
        "x": 0,
        "y": 16,
        "width": 160,
        "rotation": 0,
        "scale": 1,
        "zIndex": 3,
        "hidden": false,
        "flip": true,
        "edgeOffset": 93,
        "exclusionPadding": 12,
        "narrow": {
            "width": 128,
            "y": -24
        },
        "tablet": {
            "anchorPoint": "bottom-right",
            "x": -51,
            "y": 62,
            "width": 140,
            "edgeOffset": null
        },
        "mobile": {
            "anchorPoint": "bottom-left",
            "x": 61,
            "y": -91,
            "width": 104,
            "flip": false,
            "edgeOffset": null
        }
    },
    {
        "id": "about-killer-queen",
        "assetId": "about-killer-queen",
        "anchor": "about",
        "anchorPoint": "bottom-right",
        "x": -163,
        "y": 10,
        "width": 66,
        "rotation": -9,
        "scale": 1,
        "zIndex": 3,
        "hidden": false,
        "flip": false,
        "edgeOffset": null,
        "exclusionPadding": 12,
        "tablet": {
            "anchorPoint": "bottom-left",
            "x": 165,
            "y": 30,
            "width": 60
        },
        "mobile": {
            "hidden": true
        }
    },
    {
        "id": "onff-process",
        "assetId": "onff-process",
        "anchor": "sketchbook",
        "anchorPoint": "top-left",
        "x": 44,
        "y": 32,
        "width": 172,
        "rotation": 7,
        "scale": 1,
        "zIndex": 1,
        "hidden": false,
        "flip": false,
        "edgeOffset": null,
        "exclusionPadding": 12,
        "wide": {
            "x": -8
        },
        "narrow": {
            "width": 152
        },
        "tablet": {
            "anchor": "current",
            "anchorPoint": "top-right",
            "x": -113,
            "y": 210,
            "width": 150
        },
        "mobile": {
            "hidden": true
        }
    },
    {
        "id": "familiar-strawberry",
        "assetId": "familiar-strawberry",
        "anchor": "familiar",
        "anchorPoint": "bottom-right",
        "x": -140,
        "y": 34,
        "width": 76,
        "rotation": -8,
        "scale": 1,
        "zIndex": 3,
        "hidden": false,
        "flip": false,
        "edgeOffset": null,
        "exclusionPadding": 12,
        "tablet": {
            "anchorPoint": "bottom-left",
            "x": 60,
            "y": 18,
            "width": 62
        },
        "mobile": {
            "anchorPoint": "bottom-left",
            "x": 52,
            "y": 10,
            "width": 50,
            "rotation": -7
        }
    },
    {
        "id": "pink-handheld",
        "assetId": "pink-handheld",
        "anchor": "familiar",
        "anchorPoint": "bottom-left",
        "x": 112,
        "y": 163,
        "width": 160,
        "rotation": -12,
        "scale": 1,
        "zIndex": 3,
        "hidden": false,
        "flip": false,
        "edgeOffset": null,
        "exclusionPadding": 12,
        "tablet": {
            "x": 162,
            "y": 77,
            "width": 114
        },
        "mobile": {
            "x": 45,
            "y": -74,
            "width": 72
        }
    },
    {
        "id": "lancer",
        "assetId": "lancer",
        "anchor": "familiar",
        "anchorPoint": "bottom-left",
        "x": 306,
        "y": 120,
        "width": 152,
        "rotation": 0,
        "scale": 1,
        "zIndex": 3,
        "hidden": false,
        "flip": false,
        "edgeOffset": null,
        "exclusionPadding": 12,
        "tablet": {
            "hidden": true
        },
        "mobile": {
            "hidden": true
        }
    },
    {
        "id": "snake-ring",
        "assetId": "snake-ring",
        "anchor": "sketchbook",
        "anchorPoint": "bottom-right",
        "x": 55,
        "y": -86,
        "width": 78,
        "rotation": -15,
        "scale": 1,
        "zIndex": 3,
        "hidden": false,
        "flip": false,
        "edgeOffset": null,
        "exclusionPadding": 12,
        "narrow": {
            "x": 35
        },
        "tablet": {
            "anchorPoint": "bottom-left",
            "x": -50,
            "y": -69,
            "width": 48
        },
        "mobile": {
            "hidden": true
        }
    },
    {
        "id": "snecko-skull",
        "assetId": "snecko-skull",
        "anchor": "sketchbook",
        "anchorPoint": "bottom-right",
        "x": 112,
        "y": -14,
        "width": 104,
        "rotation": 9,
        "scale": 1,
        "zIndex": 3,
        "hidden": false,
        "flip": false,
        "edgeOffset": null,
        "exclusionPadding": 12,
        "narrow": {
            "x": 65
        },
        "tablet": {
            "anchorPoint": "bottom-left",
            "x": -76,
            "y": -8,
            "width": 62
        },
        "mobile": {
            "hidden": true
        }
    },
    {
        "id": "megaphone",
        "assetId": "megaphone",
        "anchor": "changelog",
        "anchorPoint": "top-left",
        "x": -44,
        "y": 35,
        "width": 140,
        "rotation": -12,
        "scale": 1,
        "zIndex": 3,
        "hidden": false,
        "flip": false,
        "edgeOffset": null,
        "exclusionPadding": 12,
        "tablet": {
            "x": -25,
            "y": 31,
            "width": 110
        },
        "mobile": {
            "anchorPoint": "top-right",
            "x": -35,
            "y": -28,
            "width": 80,
            "rotation": 10
        }
    },
    {
        "id": "glitch-slime",
        "assetId": "glitch-slime",
        "anchor": "map",
        "anchorPoint": "top-left",
        "x": -105,
        "y": 77,
        "width": 130,
        "rotation": -8,
        "scale": 1,
        "zIndex": 3,
        "hidden": false,
        "flip": false,
        "edgeOffset": null,
        "exclusionPadding": 12,
        "tablet": {
            "x": -90,
            "y": 78,
            "width": 105
        },
        "mobile": {
            "x": -55,
            "y": 128,
            "width": 66,
            "rotation": -5
        }
    },
    {
        "id": "wayfinder",
        "assetId": "wayfinder",
        "anchor": "map",
        "anchorPoint": "top-right",
        "x": 35,
        "y": 40,
        "width": 86,
        "rotation": 12,
        "scale": 1,
        "zIndex": 3,
        "hidden": false,
        "flip": false,
        "edgeOffset": null,
        "exclusionPadding": 12,
        "tablet": {
            "x": 30,
            "width": 80
        },
        "mobile": {
            "x": 38,
            "y": 50,
            "width": 64,
            "rotation": 10
        }
    },
    {
        "id": "light-crystal",
        "assetId": "light-crystal",
        "anchor": "map",
        "anchorPoint": "top-right",
        "x": 105,
        "y": 101,
        "width": 22,
        "rotation": -8,
        "scale": 1,
        "zIndex": 3,
        "hidden": false,
        "flip": false,
        "edgeOffset": null,
        "exclusionPadding": 12,
        "tablet": {
            "x": 96,
            "y": 111,
            "width": 18
        },
        "mobile": {
            "x": 21,
            "y": 117,
            "width": 15
        }
    },
    {
        "id": "dark-crystal",
        "assetId": "dark-crystal",
        "anchor": "map",
        "anchorPoint": "top-left",
        "x": -35,
        "y": 160,
        "width": 20,
        "rotation": 9,
        "scale": 1,
        "zIndex": 3,
        "hidden": false,
        "flip": false,
        "edgeOffset": null,
        "exclusionPadding": 12,
        "tablet": {
            "x": -28,
            "y": 168,
            "width": 18
        },
        "mobile": {
            "x": -29,
            "y": 169,
            "width": 14
        }
    },
    {
        "id": "starforce",
        "assetId": "starforce",
        "anchor": "pile",
        "anchorPoint": "top-left",
        "x": 430,
        "y": -29,
        "width": 100,
        "rotation": 0,
        "scale": 1,
        "zIndex": 1,
        "hidden": false,
        "flip": false,
        "edgeOffset": null,
        "exclusionPadding": 12,
        "narrow": {
            "x": 380
        },
        "tablet": {
            "x": 470,
            "y": 34,
            "width": 80
        },
        "mobile": {
            "hidden": true
        }
    },
    {
        "id": "terra-blade",
        "assetId": "terra-blade",
        "anchor": "projects",
        "anchorPoint": "bottom-right",
        "x": 0,
        "y": 8,
        "width": 106,
        "rotation": 9,
        "scale": 1,
        "zIndex": 3,
        "hidden": false,
        "flip": false,
        "edgeOffset": 84,
        "exclusionPadding": 12,
        "tablet": {
            "hidden": true
        },
        "mobile": {
            "hidden": true
        }
    },
    {
        "id": "kuromi",
        "assetId": "kuromi",
        "anchor": "pile",
        "anchorPoint": "top-right",
        "x": -69,
        "y": -15,
        "width": 130,
        "rotation": 9,
        "scale": 1,
        "zIndex": 1,
        "hidden": false,
        "flip": false,
        "edgeOffset": null,
        "exclusionPadding": 12,
        "tablet": {
            "x": -66,
            "y": -18,
            "width": 104
        },
        "mobile": {
            "x": -36,
            "y": -10,
            "width": 72
        }
    },
    {
        "id": "ukulele",
        "assetId": "ukulele",
        "anchor": "pile",
        "anchorPoint": "bottom-left",
        "x": 223,
        "y": 34,
        "width": 124,
        "rotation": -12,
        "scale": 1,
        "zIndex": 3,
        "hidden": false,
        "flip": false,
        "edgeOffset": null,
        "exclusionPadding": 12,
        "tablet": {
            "x": 170,
            "y": 42,
            "width": 100
        },
        "mobile": {
            "anchorPoint": "bottom-right",
            "x": -50,
            "y": 60,
            "width": 78
        }
    }
];
