"""Create an immutable, self-contained runtime ZIP from an exact clean Git commit."""
from pathlib import Path
import hashlib,json,subprocess,zipfile
ROOT=Path(__file__).resolve().parents[1]
def git(*args):return subprocess.check_output(['git',*args],cwd=ROOT)
if git('status','--porcelain').strip():raise SystemExit('Commit tracked changes before packaging')
commit=git('rev-parse','HEAD').decode().strip()
version=json.loads(git('show',commit+':package.json'))['version']
names=[p.decode('utf-8') for p in git('ls-tree','-r','--name-only','-z',commit).split(b'\0') if p]
exact={'Start-Game.cmd','Start-Local-Game.cmd','scripts/Start-Local.ps1','README.md','README.zh-CN.md','LICENSE','THIRD_PARTY_NOTICES.md','docs/DEFAULTS.md','docs/STATUS.md','docs/VERIFICATION.json','data/number-sources.json'}
selected=[p for p in names if p.startswith('public/') or p in exact]
payload={p:git('show',commit+':'+p) for p in selected}
manifest={'version':version,'sourceCommit':commit,'sourceRepository':'https://github.com/learner20230724/mini-richman-rebuild','sourceSWFSHA256':'085e03379de664bb079659b55aba5d1ea5c86b8fbd7b4f1e9ed4f71c38dc1811','runtimeRequiresSWF':False,'runtimeRequiresNode':False,'runtimeRequiresJava':False,
    'files':[{'path':p,'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()} for p,b in payload.items()]}
payload['release-manifest.json']=(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n').encode('utf-8')
out=ROOT/'release';out.mkdir(exist_ok=True)
filename=out/f'mini-richman-v{version}-portable.zip'
with zipfile.ZipFile(filename,'x',compression=zipfile.ZIP_DEFLATED,compresslevel=9) as archive:
    for p,b in sorted(payload.items()):
        info=zipfile.ZipInfo('mini-richman/'+p,date_time=(2026,10,23,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o644<<16
        archive.writestr(info,b,compress_type=zipfile.ZIP_DEFLATED,compresslevel=9)
sha=hashlib.sha256(filename.read_bytes()).hexdigest()
filename.with_suffix('.zip.sha256').write_text(sha+'  '+filename.name+'\n','ascii')
print(json.dumps({'file':filename.relative_to(ROOT).as_posix(),'version':version,'sourceCommit':commit,'files':len(payload),'uncompressedBytes':sum(map(len,payload.values())),'zipBytes':filename.stat().st_size,'sha256':sha},indent=2))
