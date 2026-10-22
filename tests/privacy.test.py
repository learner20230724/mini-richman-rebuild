"""Canary test: real index bytes, not merely the clean working tree, are scanned."""
from pathlib import Path
import importlib.util,subprocess,tempfile
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('privacy',ROOT/'scripts/privacy.py')
privacy=importlib.util.module_from_spec(spec);spec.loader.exec_module(privacy)
(ROOT/'output').mkdir(exist_ok=True)
with tempfile.TemporaryDirectory(dir=ROOT/'output') as tmp:
    root=Path(tmp);p=root/'example.txt'
    fake_token='ghp_'+'a'*36
    personal='C:'+chr(92)+'Users'+chr(92)+'example'+chr(92)+'x.txt'
    p.write_text(fake_token+'\n'+personal+'\n','utf-8')
    result=privacy.scan(root,[Path('example.txt')]);assert not result['pass']
    assert {x['rule'] for x in result['violations']}=={'github-token','windows-personal-path'}
    subprocess.run(['git','init','-q'],cwd=root,check=True)
    subprocess.run(['git','add','example.txt'],cwd=root,check=True)
    p.write_text('clean working tree\n','utf-8')
    assert privacy.scan(root,[Path('example.txt')])['pass']
    assert not privacy.scan(root,[Path('example.txt')],indexed=True)['pass']
print('PASS: token/path canaries and staged-secret/clean-working-tree regression')
