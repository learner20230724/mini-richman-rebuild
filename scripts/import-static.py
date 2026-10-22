"""Import a fresh local FFDec export into the portable recovery source tree.

Never overwrites an existing recovered tree. FFDec itself is not redistributed.
"""
from pathlib import Path
import base64,hashlib,json,re,shutil
ROOT=Path(__file__).resolve().parents[1]
SOURCE='085e03379de664bb079659b55aba5d1ea5c86b8fbd7b4f1e9ed4f71c38dc1811'
if hashlib.sha256((ROOT/'original/mini-richman-4399-1758.swf').read_bytes()).hexdigest()!=SOURCE:
    raise ValueError('Original hash mismatch')
out=ROOT/'recovered'
out.mkdir(exist_ok=False)
shutil.copyfile(ROOT/'reference/game.xml',out/'game.xml')
shutil.copytree(ROOT/'reference/ffdec/scripts',out/'scripts')
shutil.copytree(ROOT/'reference/ffdec/fonts',out/'fonts')
shutil.copytree(ROOT/'reference/text-svg',out/'texts')
(out/'shapes').mkdir();(out/'bitmaps').mkdir()
for p in (ROOT/'reference/ffdec/shapes').glob('*.svg'):
    def replace(match):
        raw=base64.b64decode(match[0].split(',',1)[1]);sha=hashlib.sha256(raw).hexdigest()
        (out/'bitmaps'/(sha+'.png')).write_bytes(raw)
        return '../bitmaps/'+sha+'.png'
    (out/'shapes'/p.name).write_text(re.sub(r'data:image/[^;]+;base64,[A-Za-z0-9+/=]+',replace,p.read_text('utf-8')),'utf-8')
(out/'provenance.json').write_text(json.dumps({'sourceSHA256':SOURCE,'url':'https://s1.4399.com/4399swf/upload_swf/ftp/20050629/14.swf','page':'https://www.4399.com/flash/1758.htm','tool':'JPEXS FFDec 26.4.0','sourceExecutedDuringExport':False},indent=2)+'\n','utf-8')
print('Imported portable recovered sources, preserving original script bytes.')
