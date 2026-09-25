"""Build the Breakspider SVG asset set from one shared drawing vocabulary.

Run from the project root: python tools/build_logo.py
The PNG concept is a visual reference only; no pixels from it are embedded here.
"""

from pathlib import Path
import html
import json
import math
import random

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "breakspider-logo"
OUT.mkdir(parents=True, exist_ok=True)

INK = "#f4f0e5"
BLACK = "#090909"
CANVAS = 'viewBox="0 0 1600 820" width="1600" height="820"'
SPIDER_ORIGIN = (1490,590)
SPIDER_ANGLE = 10
SPIDER_SILK_START = (32,-15)
angle = math.radians(SPIDER_ANGLE)
SPIDER_SILK_ANCHOR = (
    SPIDER_ORIGIN[0] + SPIDER_SILK_START[0]*math.cos(angle) - SPIDER_SILK_START[1]*math.sin(angle),
    SPIDER_ORIGIN[1] + SPIDER_SILK_START[0]*math.sin(angle) + SPIDER_SILK_START[1]*math.cos(angle),
)


def svg(body, viewbox="0 0 1600 820", width=1600, height=820, title="Breakspider artwork"):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}" '
            f'width="{width}" height="{height}" role="img" aria-label="{html.escape(title)}">\n'
            f'<title>{html.escape(title)}</title>\n{body}\n</svg>\n')


def polygon(points):
    return "M " + " L ".join(f"{x},{y}" for x, y in points) + " Z"


# A custom cut-letter alphabet: oblique shoulders, clipped terminals, and
# deliberately different counters. The same E and R unite both wordmarks.
GLYPHS = {
    "B": [
        [(1,8),(21,0),(73,3),(90,17),(99,43),(91,69),(76,87),(96,99),(104,138),(91,167),(71,181),(0,181),(8,116)],
        [(34,29),(65,27),(76,37),(75,59),(67,72),(31,72)],
        [(31,106),(67,101),(79,113),(80,140),(67,153),(27,154)],
    ],
    "R": [
        [(2,7),(22,0),(77,3),(94,17),(100,48),(90,79),(72,94),(109,176),(73,179),(49,117),(34,121),(29,180),(0,180),(7,95)],
        [(35,30),(68,28),(78,39),(75,68),(66,80),(32,81)],
    ],
    "E": [[(2,8),(105,0),(97,31),(35,35),(31,70),(87,66),(81,94),(28,99),(27,150),(106,143),(99,178),(0,183),(7,103)]],
    "A": [
        [(38,3),(75,0),(110,177),(77,180),(68,132),(37,137),(27,182),(-4,182)],
        [(43,106),(65,104),(55,46)],
    ],
    "K": [[(3,4),(36,0),(29,76),(74,3),(111,3),(67,84),(113,179),(75,178),(46,113),(28,134),(28,180),(-4,180)]],
    "S": [[(91,1),(105,25),(79,37),(56,31),(34,47),(30,65),(79,81),(96,95),(103,136),(89,161),(64,178),(17,181),(-1,164),(12,137),(42,147),(65,141),(70,122),(60,110),(18,101),(4,85),(1,54),(20,21),(47,3)]],
    "P": [
        [(2,7),(22,0),(77,3),(95,16),(102,48),(94,86),(74,109),(31,112),(28,181),(-3,181),(7,93)],
        [(35,31),(68,28),(79,39),(76,72),(66,83),(32,84)],
    ],
    "I": [[(1,5),(55,0),(52,29),(39,32),(33,149),(51,147),(49,179),(-4,182),(0,153),(12,150),(15,34),(-3,35)]],
    "D": [
        [(2,8),(23,0),(69,3),(94,18),(106,51),(107,119),(94,157),(70,179),(-2,182),(7,104)],
        [(34,32),(64,29),(77,42),(79,68),(76,119),(65,147),(28,151)],
    ],
}

LETTERS = {
    "BREAK": [
        ("B",106,165,1.12,1.36,-5),
        ("R",232,202,1.13,1.35,-3),
        ("E",358,237,1.12,1.34,-1),
        ("A",480,268,1.10,1.33,1),
        ("K",606,292,1.10,1.34,3),
    ],
    "SPIDER": [
        ("S",764,303,1.03,1.32,-3),
        ("P",872,279,1.02,1.32,-2),
        ("I",982,252,1.00,1.32,0),
        ("D",1048,221,1.04,1.32,1),
        ("E",1165,190,1.06,1.33,3),
        ("R",1278,158,1.08,1.36,5),
    ],
}


def letter_markup(word):
    bits = []
    for index, (char, x, y, sx, sy, rot) in enumerate(LETTERS[word]):
        path = " ".join(polygon(shape) for shape in GLYPHS[char])
        # Light screen-print wear is clipped into the designed silhouette.
        # Large, random scratches would obscure the actual custom letterwork.
        rng = random.Random(421 + index * 39 + (0 if word == "BREAK" else 500))
        scratches = []
        for _ in range(5):
            px = rng.randrange(7, 88)
            py = rng.randrange(15, 164)
            length = rng.randrange(5, 16)
            dy = rng.randrange(-5, 2)
            scratches.append(f'<path d="M{px} {py} l{length} {dy}" stroke="{BLACK}" '
                             f'stroke-width="{rng.choice([0.9, 1.2, 1.5])}" fill="none"/>')
        scratches.append(f'<path d="M5 63 l17 -5 M80 122 l18 -4" stroke="{BLACK}" stroke-width="2.4" fill="none"/>')
        bits.append(
            f'<g id="{word.lower()}-{index+1}" transform="translate({x} {y}) rotate({rot}) skewX(-5) scale({sx} {sy})">'
            f'<defs><clipPath id="clip-{word.lower()}-{index+1}"><path d="{path}" fill-rule="evenodd"/></clipPath></defs>'
            f'<path d="{path}" fill="{INK}" fill-rule="evenodd"/>'
            f'<g clip-path="url(#clip-{word.lower()}-{index+1})">{"".join(scratches)}</g></g>'
        )
    return f'<g id="word-{word.lower()}">\n' + "\n".join(bits) + "\n</g>"


def stroke_path(d, width=3.0, opacity=1):
    return (f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="{width}" '
            f'stroke-opacity="{opacity}" stroke-linecap="round" stroke-linejoin="round"/>')


def fan_web(top, hub, group_id, tether=False):
    """A partial orb web: support strand, radial spokes, curved capture silk."""
    hx, hy = hub
    parts = [f'<g id="{group_id}">']
    rail = " ".join(("M" if i == 0 else "L") + f"{x} {y}" for i, (x,y) in enumerate(top))
    parts.append(stroke_path(rail, 3.5))
    # The support is a single load-bearing line. These rays converge toward
    # the torn hub instead of forming parallel vertical strands.
    for i, (x,y) in enumerate(top):
        stopx = hx + (-4 + i * 1.6)
        stopy = hy + (i % 3 - 1) * 2
        cx = (x + stopx) / 2 + (4 if x < hx else -4)
        cy = (y + stopy) / 2 + (i % 2 * 3)
        parts.append(stroke_path(f'M{x} {y} Q{cx:.1f} {cy:.1f} {stopx:.1f} {stopy:.1f}',
                                 1.55 if i % 3 else 1.9))

    offsets = [0, .018, -.012, .025, -.017, .01, -.008, .015, -.021, .014, 0]
    for ring, radius in enumerate((.27, .46, .65, .83)):
        for i in range(len(top)-1):
            r1 = radius + offsets[i]
            r2 = radius + offsets[i+1]
            x1 = hx + (top[i][0]-hx)*r1
            y1 = hy + (top[i][1]-hy)*r1
            x2 = hx + (top[i+1][0]-hx)*r2
            y2 = hy + (top[i+1][1]-hy)*r2
            # Bow toward the hub, as a captured strand pulled between rays.
            bow = .35 + .04 * ((ring+i)%3)
            cx = (x1+x2)/2 + (hx-(x1+x2)/2)*bow
            cy = (y1+y2)/2 + (hy-(y1+y2)/2)*bow
            parts.append(stroke_path(f'M{x1:.1f} {y1:.1f} Q{cx:.1f} {cy:.1f} {x2:.1f} {y2:.1f}',
                                     1.3 if ring % 2 else 1.5))
    if tether:
        endx,endy = SPIDER_SILK_ANCHOR
        # Match both the endpoint and its down-left tangent to the spider's
        # short silk segment; the files meet without a visible seam.
        parts.append(stroke_path(f'M1419 439 C1480 490 1527 566 {endx:.3f} {endy:.3f}',1.6))
    parts.append('</g>')
    return '\n'.join(parts)


POSES = {
    'preload': {'center_y':480, 'hub_y':535, 'gap':8, 'bridge_sag':1},
    'loaded': {'center_y':544, 'hub_y':622, 'gap':24, 'bridge_sag':10},
    'broken': {'center_y':614, 'hub_y':735, 'gap':80},
}
BRIDGE_RADII = (1, .72, .42, 0)


def pose_geometry(name):
    """All key poses use the same twelve spokes and four capture rings."""
    pose = POSES[name]
    gap = pose['gap']
    center_y = pose['center_y']
    left_base = [112,248,375,500,608,750]
    right_base = [750,892,1018,1147,1276,1419]
    left = []
    right = []
    for i, x in enumerate(left_base):
        t = i/5
        left.append((round(x-gap/2*t*t,1), round(446+(center_y-446)*t**1.25,1)))
    for i, x in enumerate(right_base):
        t = (5-i)/5
        right.append((round(x+gap/2*t*t,1), round(439+(center_y-439)*t**1.25,1)))
    return {'left':left, 'right':right,
            'left_hub':(750-gap/2,pose['hub_y']),
            'right_hub':(750+gap/2,pose['hub_y']),
            'bridge_sag':pose.get('bridge_sag',0)}


def point_on_inner_spoke(geometry, side, radius):
    top = geometry[side][-1 if side == 'left' else 0]
    hub = geometry[side+'_hub']
    return (hub[0]+(top[0]-hub[0])*radius,
            hub[1]+(top[1]-hub[1])*radius)


def connected_bridge(geometry):
    parts = ['<g id="center-silk-bridge">']
    for radius in BRIDGE_RADII:
        lx,ly = point_on_inner_spoke(geometry,'left',radius)
        rx,ry = point_on_inner_spoke(geometry,'right',radius)
        sag = geometry['bridge_sag']*(1.0 if radius >= .65 else .6)
        parts.append(stroke_path(
            f'M{lx:.1f} {ly:.1f} Q750 {((ly+ry)/2+sag):.1f} {rx:.1f} {ry:.1f}',
            3.5 if radius == 1 else 1.35))
    parts.append('</g>')
    return '\n'.join(parts)


def web_pose(name):
    geometry = pose_geometry(name)
    left = fan_web(geometry['left'],geometry['left_hub'],'web-left')
    right = fan_web(geometry['right'],geometry['right_hub'],'web-right',tether=True)
    bridge = frays(geometry) if name == 'broken' else connected_bridge(geometry)
    return left,right,bridge


def frays(geometry):
    """Paired broken ends replace the same four bridges in the other poses."""
    parts = ['<g id="web-frays">']
    for index,radius in enumerate(BRIDGE_RADII):
        lx,ly = point_on_inner_spoke(geometry,'left',radius)
        rx,ry = point_on_inner_spoke(geometry,'right',radius)
        reach = (32,25,29,34)[index]
        left_drop = (10,18,-2,25)[index]
        right_drop = (12,8,16,20)[index]
        left_lift = (9,3,11,-4)[index]
        right_lift = (4,-7,9,-3)[index]
        width = 3.2 if index == 0 else 1.4 if index % 2 else 1.15
        left_end = (lx+reach,ly+left_drop)
        right_end = (rx-reach-2,ry+right_drop)
        parts.append(stroke_path(
            f'M{lx:.1f} {ly:.1f} C{lx+reach*.25:.1f} {ly-left_lift:.1f} '
            f'{lx+reach*.88:.1f} {ly+left_drop+5:.1f} {left_end[0]:.1f} {left_end[1]:.1f}',width))
        parts.append(stroke_path(
            f'M{rx:.1f} {ry:.1f} C{rx-reach*.27:.1f} {ry+right_lift:.1f} '
            f'{rx-reach*.78:.1f} {ry+right_drop-6:.1f} {right_end[0]:.1f} {right_end[1]:.1f}',width*.9))
        if index == 0:
            parts.append(stroke_path(f'M{left_end[0]:.1f} {left_end[1]:.1f} q7 10 0 20 '
                                     f'M{right_end[0]:.1f} {right_end[1]:.1f} q-7 8 -2 17',.85))
        elif index == 2:
            parts.append(stroke_path(f'M{left_end[0]:.1f} {left_end[1]:.1f} q8 -7 14 -4',.75))
        elif index == 3:
            parts.append(stroke_path(f'M{left_end[0]:.1f} {left_end[1]:.1f} C750 772 735 782 725 790 '
                                     f'M{right_end[0]:.1f} {right_end[1]:.1f} C751 768 766 781 778 788',1.05))
    # Fine ends recoil and hang from the exact junction formerly tied above.
    parts.append('</g>')
    return '\n'.join(parts)


def spider():
    # Local coordinates: the leg gestures stay readable even at small sizes.
    legs = [
        'M24 23 C9 15 8 6 3 3 M20 30 C8 27 3 29 -5 23 M18 37 C8 41 4 47 -3 51 M23 45 C15 56 17 64 11 71',
        'M45 21 C55 12 59 6 66 5 M49 29 C61 23 68 24 76 22 M50 38 C63 38 68 46 77 50 M45 46 C54 57 50 65 58 71'
    ]
    parts = ['<g id="small-spider">',stroke_path('M32 -15 C32 -2 31 7 31 14',1.7)]
    for d in legs:
        parts.append(stroke_path(d,2.4))
    parts += [f'<path d="M27 16 Q33 11 40 17 L43 28 Q51 37 46 49 Q37 58 26 51 Q15 43 18 32 L23 25 Z" fill="{INK}"/>',
              f'<path d="M27 31 l6 -2 M34 45 l4 -2" stroke="{BLACK}" stroke-width="1"/>','</g>']
    return '\n'.join(parts)


BREAK = letter_markup("BREAK")
SPIDER = letter_markup("SPIDER")
PRE_LEFT, PRE_RIGHT, PRE_BRIDGE = web_pose('preload')
LOAD_LEFT, LOAD_RIGHT, LOAD_BRIDGE = web_pose('loaded')
LEFT, RIGHT, FRAYS = web_pose('broken')
SPIDER_BUG = f'<g transform="translate({SPIDER_ORIGIN[0]} {SPIDER_ORIGIN[1]}) rotate({SPIDER_ANGLE})">{spider()}</g>'
TAUT = '\n'.join([PRE_LEFT, PRE_RIGHT, PRE_BRIDGE])
LOADED = '\n'.join([LOAD_LEFT, LOAD_RIGHT, LOAD_BRIDGE])
BROKEN = '\n'.join([LEFT, RIGHT, FRAYS])
FULL = '\n'.join([BREAK, SPIDER, LEFT, RIGHT, FRAYS, SPIDER_BUG])

BBOX = {
    'break.svg': (80,140,675,430),
    'spider-wordmark.svg': (735,130,700,445),
    'web-left.svg': (85,420,660,370),
    'web-right.svg': (755,415,790,380),
    'web-frays.svg': (670,595,160,215),
    'spider.svg': (1460,555,135,150),
    'web-taut.svg': (85,420,1460,180),
    'web-loaded.svg': (85,420,1460,250),
    'web-broken.svg': (85,415,1460,400),
    'logo-full.svg': (0,0,1600,820),
    'logo-assembled.svg': (0,0,1600,820),
}
DRAWINGS = {
    'break.svg': (BREAK,'BREAK wordmark'),
    'spider-wordmark.svg': (SPIDER,'SPIDER wordmark'),
    'web-left.svg': (LEFT,'Left sagged web section'),
    'web-right.svg': (RIGHT,'Right sagged web section'),
    'web-frays.svg': (FRAYS,'Snapped center silk strands'),
    'spider.svg': (SPIDER_BUG,'Small spider motif'),
    'web-taut.svg': (TAUT,'Taut intact starting web'),
    'web-loaded.svg': (LOADED,'Loaded intact middle web pose'),
    'web-broken.svg': (BROKEN,'Sagged broken ending web'),
    'logo-full.svg': (FULL,'Breakspider full logo'),
}
FILES = {}
for name, (drawing, title) in DRAWINGS.items():
    x,y,w,h = BBOX[name]
    FILES[name] = svg(drawing, f'{x} {y} {w} {h}', w, h, title)

# The preview page demonstrates the six exported files in a positioned stack.
# This SVG retains those same independent groups but is self-contained, since
# browsers block nested external SVG references when an SVG is used as an img.
ASSEMBLED_PARTS = ['web-left.svg','web-right.svg','web-frays.svg','break.svg','spider-wordmark.svg','spider.svg']
FILES['logo-assembled.svg'] = svg('\n'.join([
    LEFT, RIGHT, FRAYS, BREAK, SPIDER, SPIDER_BUG
]), title='Breakspider logo with individually grouped motion layers')

for filename, content in FILES.items():
    (OUT / filename).write_text(content, encoding='utf-8')

(OUT / 'manifest.json').write_text(json.dumps({
    'canvas': {'width':1600,'height':820,'background':'transparent','ink':INK},
    'bounds': {name: {'x':b[0],'y':b[1],'width':b[2],'height':b[3]} for name,b in BBOX.items()},
    'reference':'../logo-concept-draft.png',
    'layer_order':ASSEMBLED_PARTS,
    'assets':list(FILES),
    'web_keyframes': {
        'preload': {'asset':'web-taut.svg', **POSES['preload'], 'center_connected':True},
        'loaded': {'asset':'web-loaded.svg', **POSES['loaded'], 'center_connected':True},
        'broken': {'asset':'web-broken.svg', **POSES['broken'], 'center_connected':False},
        'shared_topology': {'spokes_per_side':6,'capture_rings':4,'center_bridge_points':len(BRIDGE_RADII)},
    },
    'spider_tether_join': {'x':round(SPIDER_SILK_ANCHOR[0],3),'y':round(SPIDER_SILK_ANCHOR[1],3)},
    'usage':'SVGs have tightly cropped transparent bounds. Place each component using its bounds in the 1600x820 composition. Both full logo SVGs are self-contained. preview.html proves the assembly by positioning the six separate SVG files.',
    'motion_notes':{
        'wordmarks':'Rigid whole-object layers; animate each SVG with translation and rotation.',
        'web':'Three poses share twelve spoke indices, four capture rings, outer anchors, and center-bridge attachment points. Animate web-taut.svg to web-loaded.svg to web-broken.svg.',
        'frays':'At the snap, replace the four connected center silk bridges with their paired broken ends. The ends start at corresponding attachment points on each half.',
        'spider':'Independent far-right SVG layer; the right-web tether and spider silk share the exact spider_tether_join coordinate.'
    }
},indent=2)+'\n',encoding='utf-8')

print(f'Wrote {len(FILES)} SVGs and manifest to {OUT}')
