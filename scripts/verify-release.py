"""Validate every ZIP entry, commit manifest, hash and local dependency; extract fresh."""
from pathlib import Path,PurePosixPath
import argparse,hashlib,json,re,zipfile
from privacy import scan
ROOT=Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser();p.add_argument('zip');p.add_argument('--extract-to',required=True);args=p.parse_args()
archive_path=(ROOT/args.zip).resolve();target=(ROOT/args.extract_to).resolve()
if not target.is_relative_to(ROOT/'output'):raise ValueError('Verification extraction must stay under project output/')
if target.exists():raise ValueError('Refusing to overwrite an existing verification extraction')
with zipfile.ZipFile(archive_path) as archive:
    names=archive.namelist()
    if len(names)!=len(set(names)):raise ValueError('Duplicate archive entry')
    for info in archive.infolist():
        path=PurePosixPath(info.filename)
        if not info.filename.startswith('mini-richman/') or path.is_absolute() or '..' in path.parts or '\\' in info.filename:raise ValueError('Unsafe ZIP path')
        if (info.external_attr>>16)&0o170000==0o120000:raise ValueError('Symlink ZIP entry')
    manifest=json.loads(archive.read('mini-richman/release-manifest.json'))
    if not re.fullmatch('[0-9a-f]{40}',manifest['sourceCommit']):raise ValueError('Invalid source commit')
    expected={'mini-richman/'+x['path'] for x in manifest['files']}|{'mini-richman/release-manifest.json'}
    if set(names)!=expected:raise ValueError('Manifest/archive file set mismatch')
    for row in manifest['files']:
        b=archive.read('mini-richman/'+row['path'])
        if len(b)!=row['bytes'] or hashlib.sha256(b).hexdigest()!=row['sha256']:raise ValueError('Payload hash mismatch: '+row['path'])
    for flag in ['runtimeRequiresSWF','runtimeRequiresNode','runtimeRequiresJava']:
        if manifest[flag]:raise ValueError('Unexpected runtime dependency')
    if any(name.lower().endswith(('.swf','.exe','.jar','.wasm')) for name in names):raise ValueError('Unexpected Flash/native/tool payload')
    html=archive.read('mini-richman/public/index.html').decode('utf-8')
    for src in re.findall(r'<script src="([^"]+)"',html):
        if 'mini-richman/public/'+src not in expected:raise ValueError('Missing script dependency: '+src)
    for href in re.findall(r'<link[^>]+href="([^"?]+\.css)"',html):
        if 'mini-richman/public/'+href not in expected:raise ValueError('Missing stylesheet dependency: '+href)
    archive.extractall(target)
game_root=target/'mini-richman'
privacy=scan(game_root,[p.relative_to(game_root) for p in game_root.rglob('*') if p.is_file()])
if not privacy['pass']:raise ValueError('Package privacy scan failed')
result={'pass':True,'zipSHA256':hashlib.sha256(archive_path.read_bytes()).hexdigest(),'sourceCommit':manifest['sourceCommit'],'version':manifest['version'],'files':len(names),'privacyFilesScanned':privacy['filesScanned'],'externalScriptDependencies':0}
(target/'verification.json').write_text(json.dumps(result,indent=2)+'\n','utf-8')
print(json.dumps(result,indent=2))
