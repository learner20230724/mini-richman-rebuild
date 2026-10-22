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
def scan(root,paths):
    errors=[];count=0
    for path in paths:
        p=root/path
        if not p.is_file() or p.suffix.lower() not in EXTENSIONS:continue
        try:text=p.read_text('utf-8-sig')
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
    result=scan(ROOT,paths);print(json.dumps(result,ensure_ascii=False,indent=2))
    raise SystemExit(0 if result['pass'] else 1)
