from pathlib import Path
from PIL import Image, ImageDraw

root = Path(__file__).parent
reference = Image.open(root / 'reference.png').convert('RGB')
rendered = Image.new('RGB', (854, 1872), 'white')
for name, y in [('top-final.png', 0), ('middle-final.png', 900), ('bottom-final.png', 972)]:
    tile = Image.open(root / name).convert('RGB')
    rendered.paste(tile, (0, y))
rendered.save(root / 'desktop-final.png')
comparison = Image.new('RGB', (1728, 1912), '#dddddd')
draw = ImageDraw.Draw(comparison)
draw.text((12, 12), 'REFERENCE', fill='black')
draw.text((886, 12), 'IMPLEMENTATION', fill='black')
comparison.paste(reference, (0, 40))
comparison.paste(rendered, (874, 40))
comparison.save(root / 'comparison-final.png')
comparison.crop((0, 0, 1728, 847)).save(root / 'comparison-top-final.png')
comparison.crop((0, 847, 1728, 1912)).save(root / 'comparison-bottom-final.png')
