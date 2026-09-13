from PIL import Image, ImageDraw
from pathlib import Path
import sys,json
folder=Path(__file__).parent
version=sys.argv[1] if len(sys.argv)>1 else 'v1'
source=Image.open(folder/'reference.jpg').convert('RGB')
screen=Image.new('RGB',(640,1822),'white')
for tile in json.loads((folder/f'tiles-{version}.json').read_text()):
    im=Image.open(folder/f'{tile["name"]}-{version}.png').convert('RGB')
    print(tile,im.size)
    im=im.resize((640,round(im.height*640/im.width)),Image.Resampling.LANCZOS)
    screen.paste(im,(0,round(tile['y'])))
screen.save(folder/f'desktop-{version}.png')
def pair(a,b,name):
    out=Image.new('RGB',(a.width+b.width+12,max(a.height,b.height)+28),'#ffffff')
    draw=ImageDraw.Draw(out)
    draw.text((8,8),'REFERENCE',fill='#182739')
    draw.text((a.width+20,8),'IMPLEMENTATION',fill='#182739')
    out.paste(a,(0,28));out.paste(b,(a.width+12,28));out.save(folder/f'{name}-{version}.png')
pair(source,screen.crop((0,0,640,1822)),'comparison-full')
pair(source.crop((0,0,640,484)),screen.crop((0,0,640,484)),'comparison-hero')
pair(source.crop((0,679,640,1268)),screen.crop((0,686,640,1299)),'comparison-middle')
pair(source.crop((0,1268,640,1773)),screen.crop((0,1299,640,1822)),'comparison-bottom')
