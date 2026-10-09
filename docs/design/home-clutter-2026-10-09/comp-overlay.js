/* DESIGN PREVIEW ONLY. Evaluated in a temporary browser; never imported by the app. */
(() => {
    const canvas = document.querySelector('[class*="__canvas"]');
    const canvasRect = canvas.getBoundingClientRect();
    const viewport = document.documentElement.clientWidth;
    const desktop = viewport > 1220;
    const mobile = viewport <= 760;
    const byTitle = title => document.querySelector(`[aria-labelledby="home-${title}-title"]`);
    const anchors = {
        spotlight: byTitle('spotlight'),
        about: byTitle('about'),
        projects: byTitle('projects'),
        current: byTitle('current'),
        sketchbook: byTitle('sketchbook'),
        familiar: byTitle('familiar'),
        changelog: byTitle('changelog'),
        map: document.querySelector('[aria-label="Found site map"]'),
        pile: byTitle('artifacts'),
    };
    const dimensions = {
        "Aqua's_Wayfinder.webp": [251, 329],
        'FF4_PSP_Dark_Crystal.webp': [28, 64],
        'FF4_PSP_Light_Crystal.webp': [28, 64],
        'LoL_item_jaksho.png': [17, 21],
        'LoL_item_lichbane.png': [19, 19],
        'LoL_item_locket.png': [18, 24],
        'LoL_item_rabadon.png': [22, 20],
        'LoL_item_witsend.png': [17, 18],
        'StS2_RingOfTheSnake.png': [200, 200],
        'StS2_SneckoSkull.png': [200, 200],
        'Strawberry_flap.gif': [200, 120],
        'Terra_Blade.webp': [46, 54],
        'Ukulele.webp': [160, 165],
        'acnh_megaphone.png': [128, 128],
        'avatar-sokka-boomerang.png': [326, 326],
        'color-pixels-old-games-pink-handheld.png': [268, 268],
        'jojo-giorno-pin.png': [320, 327],
        'jojo-killer-queen.png': [287, 326],
        'lancer-deltarune.gif': [148, 125],
        'miku_tv_static.png': [323, 327],
        'noise_01_orange.png': [170, 173],
        'noise_02_lavender.png': [75, 83],
        'noise_04_red.png': [129, 160],
        'noise_05_lavender.png': [125, 153],
        'noise_06_red.png': [52, 40],
        'noise_07_blue.png': [67, 83],
        'noise_08_lavender.png': [293, 186],
        'noise_10_blue.png': [145, 123],
        'noise_12_orange.png': [124, 114],
        'noise_13_blue.png': [86, 102],
        'noise_14_red.png': [111, 148],
        'noise_15_orange.png': [94, 139],
        'rainbow_badge.png': [64, 64],
        'relic_badge.png': [64, 64],
        'rising_badge.png': [64, 64],
        'sanrio-nyanmi-pack.png': [302, 326],
        'slimerancher_glitch.png': [278, 326],
        'starforce_omega_1.png': [36, 42],
    };
    const layers = new Map();
    const placements = [];
    const place = (cluster, file, anchor, point, x, y, width, rotation = 0, layer = 1) => {
        const rect = anchors[anchor].getBoundingClientRect();
        const anchorX = point.includes('right') ? rect.right : rect.left;
        const anchorY = point.includes('bottom') ? rect.bottom : rect.top;
        const centerX = anchorX + x;
        const centerY = anchorY + y;
        let parent = layers.get(layer);
        if (!parent) {
            parent = document.createElement('div');
            parent.setAttribute('data-clutter-comp', '');
            parent.setAttribute('aria-hidden', 'true');
            parent.style.cssText = `position:absolute;inset:0;overflow:clip;pointer-events:none;z-index:${layer}`;
            canvas.append(parent);
            layers.set(layer, parent);
        }
        const img = document.createElement('img');
        img.src = '/media/home/clutter/' + encodeURIComponent(file);
        img.alt = '';
        const height = width * dimensions[file][1] / dimensions[file][0];
        const pixelArt = /^(LoL_|FF4_|Terra_|Ukulele|starforce|lancer|Strawberry|color-pixels)/.test(file);
        img.style.cssText = `position:absolute;left:${centerX - canvasRect.left}px;top:${centerY - canvasRect.top}px;width:${width}px;height:${height}px;object-fit:contain;transform:translate(-50%,-50%) rotate(${rotation}deg);image-rendering:${pixelArt ? 'pixelated' : 'auto'};filter:drop-shadow(2px 3px 0 #090b1380)`;
        parent.append(img);
        placements.push({ cluster, file, anchor, point, x, y, width, rotation, layer, centerX, centerY });
        return img;
    };
    const rail = (cluster, file, anchor, point, edge, inset, y, width, rotation = 0) => {
        const rect = anchors[anchor].getBoundingClientRect();
        const edgeX = edge === 'left' ? inset : viewport - inset;
        const anchorX = point.includes('right') ? rect.right : rect.left;
        place(cluster, file, anchor, point, edgeX - anchorX, y, width, rotation);
    };
    if (desktop) {
        rail('A', 'noise_01_orange.png', 'spotlight', 'top-left', 'left', 18, 26, 92, -5);
        rail('A', 'noise_02_lavender.png', 'spotlight', 'top-left', 'left', 35, 118, 35, 7);
        rail('A', 'noise_04_red.png', 'spotlight', 'top-left', 'left', 6, 207, 56, -8);
        rail('A', 'noise_07_blue.png', 'spotlight', 'top-left', 'left', 30, 266, 34, 2);
        rail('A', 'noise_05_lavender.png', 'spotlight', 'top-left', 'left', 9, 347, 52, 6);
        rail('A', 'noise_06_red.png', 'spotlight', 'top-left', 'left', 38, 393, 24, -6);
        rail('A', 'noise_12_orange.png', 'spotlight', 'bottom-left', 'left', 14, -35, 58, -6);
        rail('A', 'noise_13_blue.png', 'spotlight', 'bottom-left', 'left', 31, 28, 42, 8);
        rail('A', 'noise_14_red.png', 'familiar', 'top-left', 'left', 8, -60, 48, -4);
        rail('A', 'noise_02_lavender.png', 'familiar', 'top-left', 'left', 29, 78, 34, 3);
        rail('A', 'noise_15_orange.png', 'familiar', 'bottom-left', 'left', 10, -10, 60, -7);
        rail('A', 'noise_07_blue.png', 'familiar', 'bottom-left', 'left', 34, 82, 34, 5);
        rail('A', 'noise_08_lavender.png', 'pile', 'top-left', 'left', 0, 123, viewport >= 1800 ? 120 : 96, 8);
        rail('A', 'noise_06_red.png', 'pile', 'bottom-left', 'left', 32, -48, 26, -5);
        rail('B', 'noise_13_blue.png', 'about', 'top-right', 'right', 16, 116, 50, 5);
        rail('B', 'noise_06_red.png', 'about', 'top-right', 'right', 39, 154, 26, -5);
        rail('B', 'noise_05_lavender.png', 'projects', 'top-right', 'right', 10, -61, 68, -7);
        rail('B', 'noise_10_blue.png', 'projects', 'top-right', 'right', 24, 106, 55, 8);
        rail('B', 'noise_14_red.png', 'projects', 'top-right', 'right', 7, 233, 44, -4);
        rail('B', 'noise_08_lavender.png', 'projects', 'bottom-right', 'right', 7, -6, 112, -9);
        rail('B', 'noise_04_red.png', 'changelog', 'top-right', 'right', 12, 92, 51, 5);
        rail('B', 'noise_02_lavender.png', 'changelog', 'bottom-right', 'right', 34, -17, 38, -5);
        rail('B', 'noise_15_orange.png', 'pile', 'top-right', 'right', 17, 37, 56, -5);
        rail('B', 'noise_07_blue.png', 'pile', 'bottom-right', 'right', 30, -30, 42, 5);
        place('C', 'rainbow_badge.png', 'spotlight', 'top-left', 3, -10, 32, -12, 4);
        place('C', 'relic_badge.png', 'spotlight', 'top-left', 39, -19, 28, 9, 4);
        place('C', 'jojo-giorno-pin.png', 'about', 'top-left', -43, 101, 62, -14, 4);
        place('C', 'avatar-sokka-boomerang.png', 'about', 'top-right', 12, 10, 118, 28);
        place('C', 'jojo-killer-queen.png', 'about', 'bottom-right', -163, 10, 66, -9);
        place('C', 'LoL_item_locket.png', 'about', 'bottom-right', -112, 19, 36, 8);
        place('C', 'noise_02_lavender.png', 'about', 'bottom-right', -219, 11, 29, -7);
        place('D', 'LoL_item_rabadon.png', 'current', 'top-right', -124, -21, 34, -8);
        place('D', 'LoL_item_lichbane.png', 'current', 'top-right', -69, -17, 34, 8);
        place('D', 'LoL_item_jaksho.png', 'current', 'top-right', -18, -23, 26, 0);
        place('D', 'noise_06_red.png', 'current', 'top-right', -50, -54, 24, -6);
        place('E', 'Strawberry_flap.gif', 'familiar', 'bottom-right', -140, 34, 76, -8);
        place('E', 'StS2_RingOfTheSnake.png', 'familiar', 'bottom-left', 96, 74, 70, -15);
        place('E', 'StS2_SneckoSkull.png', 'familiar', 'bottom-left', 165, 65, 94, 9);
        place('E', 'noise_07_blue.png', 'familiar', 'bottom-left', 218, 100, 30, -4);
        place('F', 'miku_tv_static.png', 'sketchbook', 'bottom-right', viewport >= 1600 ? 63 : 56, -40, viewport >= 1600 ? 210 : 186, 5);
        place('F', 'rising_badge.png', 'sketchbook', 'bottom-right', -23, 16, 34, -12);
        place('E', 'color-pixels-old-games-pink-handheld.png', 'familiar', 'bottom-left', 88, 187, 160, -12);
        place('E', 'lancer-deltarune.gif', 'familiar', 'bottom-left', 306, 120, 152, 0);
        place('G', 'acnh_megaphone.png', 'changelog', 'top-left', -44, 35, 140, -12);
        place('G', 'noise_06_red.png', 'changelog', 'top-left', -39, 106, 28, 5);
        place('H', 'slimerancher_glitch.png', 'map', 'top-left', -86, 77, 130, -8);
        place('H', "Aqua's_Wayfinder.webp", 'map', 'top-right', 35, 40, 86, 12);
        place('H', 'FF4_PSP_Light_Crystal.webp', 'map', 'top-right', 105, 101, 22, -8);
        place('H', 'FF4_PSP_Dark_Crystal.webp', 'map', 'top-left', -35, 160, 20, 9);
        place('H', 'noise_10_blue.png', 'map', 'top-left', -176, 27, 43, -9);
        place('I', 'starforce_omega_1.png', 'pile', 'top-left', 292, -25, 72, 0);
        place('I', 'Terra_Blade.webp', 'pile', 'top-left', 579, 0, 92, 9);
        place('I', 'noise_12_orange.png', 'pile', 'top-left', 652, -36, 46, -8);
        const processRect = anchors.pile.getBoundingClientRect();
        const process = document.createElement('img');
        process.setAttribute('data-clutter-comp', '');
        process.setAttribute('aria-hidden', 'true');
        process.alt = '';
        process.src = window.__clutterProcessImage;
        process.style.cssText = `position:absolute;left:${processRect.left - canvasRect.left + 430}px;top:${processRect.top - canvasRect.top + 20}px;width:180px;height:173px;transform:translate(-50%,-50%) rotate(7deg);border:2px solid #9da1bb;box-shadow:5px 6px 0 #090b13;z-index:1;pointer-events:none`;
        canvas.append(process);
        /* The preview places files above decoration; production should use local layers. */
        anchors.pile.style.position = 'relative';
        anchors.pile.style.zIndex = '2';
        place('I', 'sanrio-nyanmi-pack.png', 'pile', 'top-right', -69, -15, 130, 9);
        place('I', 'noise_05_lavender.png', 'pile', 'top-right', -20, -37, 44, -6);
        place('I', 'Ukulele.webp', 'pile', 'bottom-left', 223, 34, 124, -12);
    } else if (mobile) {
        place('C', 'relic_badge.png', 'spotlight', 'top-left', 16, -7, 24, 7, 4);
        place('C', 'jojo-giorno-pin.png', 'about', 'bottom-right', -28, -2, 42, -12, 4);
        place('A', 'noise_02_lavender.png', 'projects', 'top-left', -2, -19, 30, -9);
        place('D', 'LoL_item_rabadon.png', 'current', 'bottom-right', -20, 15, 33, -8);
        place('F', 'miku_tv_static.png', 'sketchbook', 'top-right', -41, -39, 88, 8);
        place('E', 'Strawberry_flap.gif', 'familiar', 'bottom-left', 52, 10, 50, -7);
        place('G', 'acnh_megaphone.png', 'changelog', 'top-right', -35, -9, 90, 10);
        place('H', "Aqua's_Wayfinder.webp", 'map', 'top-right', 38, 50, 64, 10);
        place('H', 'slimerancher_glitch.png', 'map', 'top-left', -44, 128, 66, -5);
        place('I', 'noise_08_lavender.png', 'pile', 'bottom-right', -51, 57, 88, -6);
    } else {
        place('C', 'rainbow_badge.png', 'spotlight', 'top-left', 4, -10, 30, -12, 4);
        place('C', 'relic_badge.png', 'spotlight', 'top-left', 40, -18, 28, 9, 4);
        place('C', 'jojo-giorno-pin.png', 'about', 'top-left', 80, 125, 50, -12, 4);
        rail('A', 'noise_01_orange.png', 'spotlight', 'top-left', 'left', 8, 38, 78, -5);
        rail('A', 'noise_05_lavender.png', 'spotlight', 'bottom-left', 'left', 12, -90, 48, 6);
        rail('B', 'noise_10_blue.png', 'projects', 'top-right', 'right', 15, 63, 48, 8);
        rail('B', 'noise_14_red.png', 'changelog', 'bottom-right', 'right', 12, -25, 43, -4);
        place('E', 'Strawberry_flap.gif', 'familiar', 'bottom-left', 60, 18, 62, -8);
        place('F', 'miku_tv_static.png', 'sketchbook', 'bottom-left', -54, -71, 112, 8);
        place('E', 'color-pixels-old-games-pink-handheld.png', 'familiar', 'bottom-left', 148, 91, 114, -12);
        place('G', 'acnh_megaphone.png', 'changelog', 'top-left', -25, 31, 110, -12);
        place('H', 'slimerancher_glitch.png', 'map', 'top-left', -72, 78, 105, -8);
        place('H', "Aqua's_Wayfinder.webp", 'map', 'top-right', 30, 40, 80, 12);
        place('I', 'sanrio-nyanmi-pack.png', 'pile', 'top-right', -66, -18, 104, 9);
        place('I', 'noise_08_lavender.png', 'pile', 'bottom-left', 12, 60, 106, 8);
    }
    window.__clutterDesignPlacements = placements;
    return placements;
})();
