"""Actually regenerate and assert deterministic output + human-file preservation."""
from pathlib import Path
import hashlib,json,subprocess,sys
ROOT=Path(__file__).resolve().parents[1]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
human=['public/config/overrides.js','public/extensions.js','public/runtime.js','public/settings.js','public/app.js','public/index.html','public/config-store.js','public/clock.js','public/sandbox.js','public/editor.js','public/editor.css','public/live-settings.js']
generated=['public/generated-game.js','public/game-data.js','public/game-data.json','public/asset-data.js','public/config/defaults.js','public/config/defaults.json','data/number-sources.json']
before={name:sha(ROOT/name) for name in human+generated}
subprocess.run([sys.executable,'scripts/build.py'],cwd=ROOT,check=True)
after={name:sha(ROOT/name) for name in human+generated}
result={'pass':before==after,'humanFilesPreserved':all(before[p]==after[p] for p in human),'generatedDeterministic':all(before[p]==after[p] for p in generated),'files':after}
(ROOT/'output').mkdir(exist_ok=True)
(ROOT/'output/regeneration.json').write_text(json.dumps(result,indent=2)+'\n','utf-8')
print(json.dumps({key:value for key,value in result.items() if key!='files'},indent=2))
raise SystemExit(0 if result['pass'] else 1)
