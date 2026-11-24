"""Build the public EV interior selection from existing, approved catalog photos.

Run with Python 3 and ReportLab (`python3 scripts/build_interior_selection.py`).
Photo framing is performed at PDF layout time; source images stay unchanged.
"""

from dataclasses import dataclass
from pathlib import Path

from PIL import Image
from reportlab import __file__ as reportlab_init
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader, simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


PUBLIC = Path(__file__).resolve().parents[1] / "public"
OUTPUT = PUBLIC / "downloads" / "TINKON_EV_Interior_Accessories_Selection.pdf"
SITE = "https://tinkontech.com"
EMAIL = "allen@tinkontech.com"
WIDTH, HEIGHT = A4
MARGIN = 43
RIGHT = WIDTH - MARGIN
INK = HexColor("#141c1c")
MUTED = HexColor("#4f5d5c")
GREEN = HexColor("#326d13")
LIME = HexColor("#cafa49")
RULE = HexColor("#dce4df")
DARK = HexColor("#17261f")
REGULAR = "Tinkon-Regular"
BOLD = "Tinkon-Bold"


@dataclass(frozen=True)
class Item:
    slug: str
    vehicle: str
    name: str
    summary: str
    frame: tuple[int, int, int, int] | None = None


ORGANIZERS = (
    Item(
        "tesla-model-3-highland-door-pocket-organizer-set",
        "TESLA MODEL 3 HIGHLAND",
        "Door Pocket Organizer Set",
        "Four removable molded inserts for the front and rear door pockets of compatible vehicles.",
    ),
    Item(
        "tesla-model-y-standard-console-cup-holder-organizer",
        "TESLA MODEL Y STANDARD",
        "Console Cup Holder Organizer",
        "A console organizer with two cup holders, a tissue slot and an open tray. Black and silver-gray versions are shown online.",
    ),
    Item(
        "tesla-model-3-y-tpe-seat-gap-storage-box-set",
        "TESLA MODEL 3 / MODEL Y",
        "TPE Seat Gap Storage Box Set",
        "A left and right pair that uses the space between compatible front seats and the center console.",
        (126, 12, 670, 597),
    ),
)
PROTECTION = (
    Item(
        "tesla-model-y-juniper-tpe-floor-mats",
        "TESLA MODEL Y JUNIPER",
        "Color-Injected TPE Floor Mat Set",
        "Two front mats and a one-piece rear mat with raised edges and molded channels. The photo shows one color option.",
        (96, 0, 705, 606),
    ),
    Item(
        "tesla-model-yl-interior-door-sill-covers",
        "TESLA MODEL YL",
        "Interior Door Sill Cover Set",
        "Four shaped covers for the front and rear interior sill areas. Confirm the finish and mounting method by sample.",
        (455, 397, 901, 979),
    ),
    Item(
        "rivian-r2-rear-seat-back-protector-mats",
        "RIVIAN R2",
        "Rear Seat Back Protector Mats",
        "Three molded panels for the cargo-facing rear seat backs. Confirm the market version, split-seat layout and sample fit.",
    ),
)


def write_text(pdf, text, x, y, font=REGULAR, size=10, color=INK):
    pdf.setFont(font, size)
    pdf.setFillColor(color)
    pdf.drawString(x, y, text)


def text_block(pdf, text, x, y, width, size=11.5, leading=16, color=MUTED):
    for line in simpleSplit(text, REGULAR, size, width):
        write_text(pdf, line, x, y, size=size, color=color)
        y -= leading
    return y


def link(pdf, label, url, x, y, color=GREEN, size=10):
    font = BOLD
    write_text(pdf, label, x, y, font, size, color)
    end = x + pdf.stringWidth(label, font, size)
    pdf.setStrokeColor(color)
    pdf.setLineWidth(0.7)
    pdf.line(end + 5, y + 2, end + 11, y + 8)
    pdf.line(end + 7, y + 8, end + 11, y + 8)
    pdf.line(end + 11, y + 4, end + 11, y + 8)
    pdf.linkURL(url, (x, y - 3, end + 13, y + 11), relative=0, thickness=0)


def photo(pdf, item, x, y, w, h):
    image = ImageReader(str(PUBLIC / "catalog" / f"{item.slug}.jpg"))
    image_w, image_h = image.getSize()
    x0, y0, x1, y1 = item.frame or (0, 0, image_w, image_h)
    assert 0 <= x0 < x1 <= image_w and 0 <= y0 < y1 <= image_h
    scale = min(w / (x1 - x0), h / (y1 - y0))
    frame_w, frame_h = (x1 - x0) * scale, (y1 - y0) * scale
    frame_x, frame_y = x + (w - frame_w) / 2, y + (h - frame_h) / 2
    pdf.saveState()
    clipping = pdf.beginPath()
    clipping.rect(frame_x, frame_y, frame_w, frame_h)
    pdf.clipPath(clipping, stroke=0, fill=0)
    pdf.drawImage(image, frame_x - x0 * scale, frame_y - (image_h - y1) * scale,
                  width=image_w * scale, height=image_h * scale)
    pdf.restoreState()


def header(pdf, page_number, heading, section):
    with Image.open(PUBLIC / "tinkon-logo.png") as source:
        logo = ImageReader(source.resize((192, 192), Image.Resampling.LANCZOS))
    pdf.drawImage(logo, MARGIN - 2, HEIGHT - 71,
                  width=42, height=42, mask="auto")
    write_text(pdf, "TINKON", MARGIN + 44, HEIGHT - 47, BOLD, 14)
    write_text(pdf, "EV ACCESSORIES FOR TRADE BUYERS", MARGIN + 44, HEIGHT - 59,
               BOLD, 6.8, MUTED)
    pdf.setFont(BOLD, 9)
    pdf.setFillColor(GREEN)
    pdf.drawRightString(RIGHT, HEIGHT - 52, f"PRODUCT SELECTION  /  0{page_number}")
    pdf.setStrokeColor(RULE)
    pdf.line(MARGIN, HEIGHT - 82, RIGHT, HEIGHT - 82)
    write_text(pdf, section, MARGIN, HEIGHT - 108, BOLD, 10, GREEN)
    write_text(pdf, heading, MARGIN, HEIGHT - 153, BOLD, 34)


def item_row(pdf, item, top):
    bottom = top - 141
    pdf.setStrokeColor(RULE)
    pdf.setLineWidth(0.7)
    pdf.line(MARGIN, top, RIGHT, top)
    photo(pdf, item, MARGIN + 5, bottom + 7, 163, 126)
    x = MARGIN + 193
    write_text(pdf, item.vehicle, x, top - 30, BOLD, 8.5, GREEN)
    assert pdf.stringWidth(item.name, BOLD, 15) < RIGHT - x
    write_text(pdf, item.name, x, top - 51, BOLD, 15)
    y = text_block(pdf, item.summary, x, top - 72, RIGHT - x)
    link(pdf, "View product & fitment", f"{SITE}/products/{item.slug}", x, y - 5)


def footer(pdf, page_number, section_label, section_slug):
    pdf.setStrokeColor(RULE)
    pdf.line(MARGIN, 204, RIGHT, 204)
    link(pdf, section_label, f"{SITE}/products/category/{section_slug}", MARGIN, 184)

    pdf.setFillColor(DARK)
    pdf.roundRect(MARGIN, 63, RIGHT - MARGIN, 101, radius=10, stroke=0, fill=1)
    x = MARGIN + 17
    write_text(pdf, "Planning a wholesale assortment?", x, 139, BOLD, 13, white)
    text_block(pdf, "Include the product links, vehicle year and market, estimated quantity, and any packaging preferences. Confirm exact fitment and sample fit before bulk orders.",
               x, 120, RIGHT - x - 17, size=10, leading=14, color=white)
    link(pdf, EMAIL, f"mailto:{EMAIL}", x, 81, color=LIME)
    link(pdf, "tinkontech.com", SITE, x + 175, 81, color=LIME)

    write_text(pdf, "Dongguan TinKon Technology Co., Ltd.", MARGIN, 38, size=8.5, color=MUTED)
    pdf.setFont(REGULAR, 8.5)
    pdf.drawRightString(RIGHT, 38, f"{page_number} / 2")


def draw_page(pdf, page_number, heading, section, tagline, items, section_label, section_slug):
    header(pdf, page_number, heading, section)
    text_block(pdf, tagline, MARGIN, HEIGHT - 176, RIGHT - MARGIN, size=11, leading=15)
    for n, item in enumerate(items):
        item_row(pdf, item, 627 - n * 141)
    footer(pdf, page_number, section_label, section_slug)
    pdf.showPage()


def main():
    fonts = Path(reportlab_init).parent / "fonts"
    pdfmetrics.registerFont(TTFont(REGULAR, str(fonts / "Vera.ttf")))
    pdfmetrics.registerFont(TTFont(BOLD, str(fonts / "VeraBd.ttf")))
    pdf = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1, invariant=1,
                        initialFontName=REGULAR)
    pdf.setTitle("TINKON EV Interior Accessories Selection")
    pdf.setAuthor("Dongguan TinKon Technology Co., Ltd.")
    pdf.setCreator("TINKON")
    pdf.setSubject("Selected car organizers and EV interior protection accessories")
    draw_page(pdf, 1, "EV interior accessories", "01 / CAR ORGANIZERS",
              "A short selection of cabin organizers and interior protection for distributors, importers and accessory brands. Browse each product for current details.",
              ORGANIZERS, "Browse Tesla storage & organization", "tesla-storage-organization")
    draw_page(pdf, 2, "Interior protection", "02 / FLOOR, SILL & SEAT BACKS",
              "Vehicle-specific protection for frequently used cabin and cargo surfaces. Match the exact model, model year and trim before ordering.",
              PROTECTION, "Browse Tesla interior protection", "tesla-interior-protection")
    pdf.save()


if __name__ == "__main__":
    main()
