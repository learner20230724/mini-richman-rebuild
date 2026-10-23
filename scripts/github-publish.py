"""Explicit GitHub publication using existing Git credentials in memory only.

Never prints or writes credentials. No new credential store is created.
"""
from pathlib import Path
import argparse,json,os,subprocess,urllib.error,urllib.request
ROOT=Path(__file__).resolve().parents[1]
REPO='mini-richman-rebuild';OWNER='learner20230724'
def credential():
    p=subprocess.run(['git','credential','fill'],input='protocol=https\nhost=github.com\n\n',text=True,capture_output=True,env={**os.environ,'GIT_TERMINAL_PROMPT':'0'},check=True)
    fields=dict(line.split('=',1) for line in p.stdout.splitlines() if '=' in line)
    return fields['password']
def api(token,route,method='GET',data=None,content_type='application/json'):
    body=None if data is None else (json.dumps(data).encode() if isinstance(data,dict) else data)
    url=route if route.startswith('https://') else 'https://api.github.com'+route
    request=urllib.request.Request(url,data=body,method=method,headers={'Authorization':'Bearer '+token,'Accept':'application/vnd.github+json','Content-Type':content_type,'User-Agent':'mini-richman-publication'})
    with urllib.request.urlopen(request,timeout=120) as response:return json.load(response)
def main():
    p=argparse.ArgumentParser();p.add_argument('--create-repository',action='store_true');p.add_argument('--release');p.add_argument('--commit');p.add_argument('--asset');p.add_argument('--prerelease',action='store_true');p.add_argument('--notes-file');args=p.parse_args()
    token=credential();user=api(token,'/user')
    if user['login']!=OWNER:raise ValueError('Authenticated account does not match intended repository owner')
    if args.create_repository:
        try:repo=api(token,f'/repos/{OWNER}/{REPO}')
        except urllib.error.HTTPError as e:
            if e.code!=404:raise
            repo=api(token,'/user/repos','POST',{'name':REPO,'description':'迷你大富翁：可修改逻辑、素材与配置的浏览器重建 / Editable browser reconstruction','private':False,'auto_init':False})
        if repo['private']:raise ValueError('Repository unexpectedly private')
        result={'owner':OWNER,'name':REPO,'url':repo['html_url'],'id':repo['id'],'visibility':repo['visibility'],'userId':user['id']}
        (ROOT/'docs/publication.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n','utf-8')
        print(json.dumps(result,ensure_ascii=False))
    if args.release:
        if not args.commit or not args.asset:raise ValueError('Release requires explicit commit and asset')
        asset=(ROOT/args.asset).resolve()
        if not asset.is_relative_to(ROOT/'release') or not asset.is_file():raise ValueError('Release asset must exist under release/')
        body='中文：解压后双击 Start-Game.cmd；受限时使用 Start-Local-Game.cmd。English: Extract and open Start-Game.cmd, or Start-Local-Game.cmd. No Node/Java/Flash installation.\n\nSource commit: '+args.commit
        if args.notes_file:
            notes=(ROOT/args.notes_file).resolve()
            if not notes.is_relative_to(ROOT/'docs') or not notes.is_file():raise ValueError('Release notes must exist under docs/')
            body=notes.read_text('utf-8')+'\n\nSource commit: '+args.commit
        try:release=api(token,f'/repos/{OWNER}/{REPO}/releases/tags/{args.release}')
        except urllib.error.HTTPError as e:
            if e.code!=404:raise
            release=api(token,f'/repos/{OWNER}/{REPO}/releases','POST',{'tag_name':args.release,'target_commitish':args.commit,'name':'Mini Richman '+args.release,'draft':False,'prerelease':args.prerelease,'body':body})
        existing=next((a for a in release['assets'] if a['name']==asset.name),None)
        if existing:raise ValueError('Release asset already exists; refusing to replace immutable version')
        upload=release['upload_url'].split('{',1)[0]+'?name='+urllib.parse.quote(asset.name)
        uploaded=api(token,upload,'POST',asset.read_bytes(),'application/zip')
        print(json.dumps({'release':release['html_url'],'asset':uploaded['browser_download_url'],'bytes':uploaded['size'],'tag':release['tag_name']},ensure_ascii=False))
if __name__=='__main__':main()
