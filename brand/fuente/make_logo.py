"""Genera el logo HGS: símbolo (pozo + cono de abatimiento tipo Theis) y wordmark contorneado.

Uso: python -I make_logo.py <fuente.ttf> <carpeta_salida>
"""
import math
import sys
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

FONT, OUT = Path(sys.argv[1]), Path(sys.argv[2])
OUT.mkdir(parents=True, exist_ok=True)

C = {
    "seco": "#0F5E7A",      # zona no saturada (brand-primary)
    "agua": "#2E9CC0",      # zona saturada (blanco 3,17:1)
    "pozo": "#FFFFFF",
    "rejilla": "#121317",
    "ink": "#121317",
    "ink_d": "#F3F4F6",
    "muted": "#61666F",
    "muted_d": "#A7AEB9",
}

# ---------- Símbolo 64x64 ----------
S, R_CORNER = 64, 16
X0 = S / 2            # eje del pozo
Y_NE = 25.0           # nivel estático
RW, RMAX = 3.0, 30.0  # radio de pozo y radio de influencia
DEPTH = 17.0          # abatimiento en el pozo


def cono(r):
    """Abatimiento ∝ ln(R/r): forma de Cooper-Jacob/Theis a tiempo tardío."""
    r = max(r, RW)
    return Y_NE + DEPTH * math.log(RMAX / r) / math.log(RMAX / RW) if r < RMAX else Y_NE


def curva_superficie():
    pts = []
    for i in range(0, 61):
        x = -2 + (S + 4) * i / 60
        pts.append((x, cono(abs(x - X0))))
    return pts


pts = curva_superficie()
agua = "M" + " L".join(f"{x:.2f} {y:.2f}" for x, y in pts) + f" L{S + 2} {S + 2} L-2 {S + 2} Z"
fondo_y = cono(RW)
POZO_W = 3.6
# rejilla ranurada: tramos cortos bajo el nivel dinámico
_y, _seg = [], fondo_y + 2.5
while _seg + 2.6 <= 55:
    _y.append(_seg); _seg += 4.4
BLANCO = C["pozo"]
rejilla = "\n".join(
    f'    <rect x="{X0 - POZO_W / 2:.2f}" y="{y:.2f}" width="{POZO_W}" height="2.6" fill="{BLANCO}"/>' for y in _y)

simbolo_cuerpo = f"""<defs><clipPath id="hgs-clip"><rect width="{S}" height="{S}" rx="{R_CORNER}"/></clipPath></defs>
  <g clip-path="url(#hgs-clip)">
    <rect width="{S}" height="{S}" fill="{C['seco']}"/>
    <path d="{agua}" fill="{C['agua']}"/>
    <rect x="{X0 - POZO_W / 2:.2f}" y="-4" width="{POZO_W}" height="{fondo_y + 4:.2f}" fill="{C['pozo']}"/>
{rejilla}
  </g>"""


def svg(w, h, body, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.2f} {h:.2f}" '
            f'width="{w:.0f}" height="{h:.0f}" role="img" aria-label="{title}">\n'
            f'  <title>{title}</title>\n  {body}\n</svg>\n')


# ---------- Wordmark contorneado ----------
font = TTFont(FONT)
inst = instantiateVariableFont(font, {"wght": 800}, inplace=False)
gs = inst.getGlyphSet()
cmap = inst.getBestCmap()
UPM = inst["head"].unitsPerEm
CAP = inst["OS/2"].sCapHeight


def texto(cadena, cap_px, tracking_em, x0, baseline, fill, fuente=gs):
    esc = cap_px / CAP
    x, paths = x0, []
    for ch in cadena:
        if ch == " ":
            x += fuente[cmap[ord(" ")]].width * esc + tracking_em * UPM * esc
            continue
        g = cmap[ord(ch)]
        pen = SVGPathPen(fuente)
        fuente[g].draw(TransformPen(pen, (esc, 0, 0, -esc, x, baseline)))
        paths.append(pen.getCommands())
        x += fuente[g].width * esc + tracking_em * UPM * esc
    x -= tracking_em * UPM * esc
    return f'<path fill="{fill}" d="{" ".join(paths)}"/>', x - x0


inst600 = instantiateVariableFont(TTFont(FONT), {"wght": 600}, inplace=False)
gs600 = inst600.getGlyphSet()


def lockup(ink, muted, sufijo):
    # símbolo 64 px; "HGS" con altura de mayúscula 30 px; descriptor 7,5 px
    gap = 16
    marca, w_marca = texto("HGS", 30, -0.02, S + gap, 36, ink)
    desc, w_desc = texto("HIDROGEOLOGÍA Y GEOCIENCIAS", 7.2, 0.14, S + gap + 1, 54, muted, gs600)
    w = S + gap + max(w_marca, w_desc) + 2
    body = f"{simbolo_cuerpo}\n  {marca}\n  {desc}"
    (OUT / f"hgs-logo{sufijo}.svg").write_text(svg(w, S, body, "HGS — Hidrogeología y geociencias"), encoding="utf-8")
    return w


(OUT / "hgs-simbolo.svg").write_text(svg(S, S, simbolo_cuerpo, "HGS"), encoding="utf-8")
(OUT / "favicon.svg").write_text(svg(S, S, simbolo_cuerpo, "HGS"), encoding="utf-8")
w1 = lockup(C["ink"], C["muted"], "")
w2 = lockup(C["ink_d"], C["muted_d"], "-oscuro")
print("ok", round(w1, 1), round(w2, 1), "fondo cono y=", round(fondo_y, 2))
