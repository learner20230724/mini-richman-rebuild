"""Fail closed on personal paths and credential-shaped values in publish files."""
from pathlib import Path
import argparse,json,re,subprocess
ROOT=Path(__file__).resolve().parents[1]
RULES={
    'windows-personal-path':re.compile(r'\b[A-Za-z]:[\\/](?:Users|Documents and Settings)[\\/]',re.I),
    'unix-personal-path':re.compile(r'/(?:Users|home)/[A-Za-z0-9_.-]+/'),
    'github-token':re.compile(r'\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{30,})\b'),
    'private-key':re.compile(r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----'),
    'authorization-value':re.compile(r'(?i)authorization[\"\s:=]+(?:bearer|token)\s+[A-Za-z0-9_.-]{20,}'),
}
EXTENSIONS={'.js','.cjs','.py','.ps1','.cmd','.html','.json','.md','.xml','.svg','.txt','.yml','.yaml','.toml','.as',''}
def index_bytes(root,paths):
    entries=subprocess.check_output(['git','ls-files','--stage','-z'],cwd=root)
    objects={}
    for entry in entries.split(b'\0'):
        if not entry:continue
        meta,name=entry.split(b'\t',1);mode,sha,stage=meta.split()
        if stage!=b'0':raise ValueError('Unmerged Git index cannot be certified')
        objects[name.decode('utf-8')]=sha
    selected={p.as_posix():objects[p.as_posix()] for p in paths if p.suffix.lower() in EXTENSIONS}
    ids=list(dict.fromkeys(selected.values()))
    if not ids:return {}
    data=subprocess.check_output(['git','cat-file','--batch'],input=b'\n'.join(ids)+b'\n',cwd=root)
    blobs={};cursor=0
    for expected in ids:
        end=data.index(b'\n',cursor);sha,kind,length=data[cursor:end].split()
        if sha!=expected or kind!=b'blob':raise ValueError('Unexpected index object')
        cursor=end+1;size=int(length);blobs[sha]=data[cursor:cursor+size];cursor+=size
        if data[cursor:cursor+1]!=b'\n':raise ValueError('Malformed Git batch boundary')
        cursor+=1
    if cursor!=len(data):raise ValueError('Unexpected trailing index bytes')
    return {name:blobs[sha] for name,sha in selected.items()}
def scan(root,paths,indexed=False):
    errors=[];count=0
    staged=index_bytes(root,paths) if indexed else None
    for path in paths:
        p=root/path
        if p.suffix.lower() not in EXTENSIONS:continue
        if not indexed and not p.is_file():continue
        try:
            raw=staged[path.as_posix()] if indexed else p.read_bytes()
            text=raw.decode('utf-8-sig')
        except UnicodeDecodeError:continue
        count+=1
        for name,rule in RULES.items():
            for m in rule.finditer(text):errors.append({'file':path.as_posix(),'rule':name,'line':text.count('\n',0,m.start())+1})
    return {'filesScanned':count,'violations':errors,'pass':not errors}
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--staged',action='store_true');args=parser.parse_args()
    if args.staged:
        raw=subprocess.check_output(['git','ls-files','-z'],cwd=ROOT)
        paths=[Path(p.decode('utf-8')) for p in raw.split(b'\0') if p]
    else:
        paths=[p.relative_to(ROOT) for base in ['public','recovered','scripts','tests','data','docs'] for p in (ROOT/base).rglob('*') if p.is_file()]
        paths += [p.relative_to(ROOT) for p in ROOT.iterdir() if p.is_file()]
    result=scan(ROOT,paths,indexed=args.staged);print(json.dumps(result,ensure_ascii=False,indent=2))
    raise SystemExit(0 if result['pass'] else 1)
