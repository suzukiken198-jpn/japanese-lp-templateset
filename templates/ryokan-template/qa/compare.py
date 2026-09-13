from PIL import Image
from pathlib import Path
p=Path(__file__).parent
ref=Image.open(p/'reference.png').convert('RGB')
top=Image.open(p/'desktop-top.jpg').convert('RGB')
bottom=Image.open(p/'desktop-bottom.jpg').convert('RGB')
full=Image.new('RGB',(1024,1596),'white')
full.paste(top,(0,0)); full.paste(bottom.crop((0,204,1024,900)),(0,900))
full.save(p/'desktop-full.jpg',quality=95)
for name,a,b in [('full',ref,full),('hero',ref.crop((0,0,1024,430)),full.crop((0,0,1024,430))),('cards',ref.crop((0,575,1024,1147)),full.crop((0,580,1024,1157))),('access-footer',ref.crop((0,1147,1024,1536)),full.crop((0,1157,1024,1567)))]:
    pair=Image.new('RGB',(2048,max(a.height,b.height)),'#eeeeee');pair.paste(a,(0,0));pair.paste(b,(1024,0));pair.save(p/(name+'-comparison.jpg'),quality=95)
