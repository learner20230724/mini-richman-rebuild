"""Build this game's editable JS and timeline assets; never execute the SWF.

Input: pinned SWF + JPEXS 26.4.0 static exports. No AS bytecode/VM in output.
"""
from pathlib import Path
import base64, hashlib, json, re, shutil, xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
EXPECTED = '085e03379de664bb079659b55aba5d1ea5c86b8fbd7b4f1e9ed4f71c38dc1811'
def digest(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def write_json(p, obj):
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(obj, ensure_ascii=False, separators=(',', ':')), 'utf-8')
def true(t, k): return t.get(k) == 'true'
def rect(t):
    return [int(t.get(k, '0')) / 20 for k in ['Xmin','Ymin','Xmax','Ymax']]
def matrix(t):
    if t is None: return [1,0,0,1,0,0]
    return [float(t.get('scaleX',1)),float(t.get('rotateSkew0',0)),
            float(t.get('rotateSkew1',0)),float(t.get('scaleY',1)),
            int(t.get('translateX',0))/20,int(t.get('translateY',0))/20]

def build():
    swf = ROOT/'original/mini-richman-4399-1758.swf'
    if swf.exists() and digest(swf) != EXPECTED: raise ValueError('Original SWF hash mismatch')
    origin=json.loads((ROOT/'recovered/provenance.json').read_text('utf-8'))
    if origin['sourceSHA256']!=EXPECTED:raise ValueError('Recovery source identity mismatch')
    xml = ROOT/'recovered/game.xml'
    root = ET.parse(xml).getroot()
    if root.get('_xmlExportMajor') != '4': raise ValueError('Unexpected FFDec XML schema')
    scripts_dir = ROOT/'recovered/scripts'
    script_ids, scripts, provenance = {}, [], []
    numbers, locations = {}, []
    # Named aliases share values at BOTH the affordability check and deduction.
    # Remaining literal sites stay available in an advanced, source-linked map.
    aliases={
      'houseCash':200,'rentHouse':100,'rentTower':200,
      'stepMilliseconds':700,'selectionTickMilliseconds':100,'selectionTicks':20,
      'minuteMilliseconds':60000,'diceFaces':6,
      'upgradeStars':1,'itemCap':5,
      'shopDiamondCash':200,'shopStarCash':100,'shopCharmCash':200,'shopMineCash':300,
      'shopDiamondRedeem':2000,'shopStarRedeem':1000,'shopCharmRedeem':2000,'shopMineRedeem':3000,
    }
    def parameterize(text,path,sid):
        result=[]
        # A tokenizer, not a global digit replacement: quoted messages, linkage
        # IDs and identifiers retain their exact original bytes.
        token=re.compile(r'"(?:\\.|[^"\\])*"|\b\d+(?:\.\d+)?\b')
        shop_item=None
        for line_no,line in enumerate(text.splitlines(keepends=True),1):
            selection=re.search(r'if\(this\._x == (0|50|100|150)\)',line)
            if selection:shop_item={'0':'Diamond','50':'Star','100':'Charm','150':'Mine'}[selection[1]]
            ordinal=0
            def replace(m):
                nonlocal ordinal
                raw=m.group(0)
                if raw.startswith('"'):return raw
                ordinal+=1;value=float(raw) if '.' in raw else int(raw)
                key=f'src.s{sid}.l{line_no}.n{ordinal}'
                alias=None
                if 'setInterval(xingzou,' in line and value==700:alias='stepMilliseconds'
                if 'setInterval(kaishi,' in line and value==100:alias='selectionTickMilliseconds'
                if 'setInterval(jiajia,' in line and value==60000:alias='minuteMilliseconds'
                if path=='frame_1/DoAction.as' and re.match(r'\s*n = 20;',line):alias='selectionTicks'
                if 'p = random(6) + 1' in line and value==6:alias='diceFaces'
                cost=re.search(r'_root.xianjin[12] (?:>=|<|-=) (200)',line)
                if cost and m.start()==cost.start(1) and ('DefineSprite_13_' in path or path.startswith('frame_2/PlaceObject2_206')):
                    # The root movement script also has rent deductions of 200;
                    # those are rentTower, not houseCash.
                    alias='rentTower' if '-= 200' in line and path.startswith('frame_2/') else 'houseCash'
                if path.startswith('frame_2/PlaceObject2_206') or path.startswith('DefineSprite_20_baohu/'):
                    rent=re.search(r'_root.xianjin[12] (?:-=|\+=) (100|200)(?: \*|;)',line)
                    if rent and m.start()==rent.start(1):alias='rentHouse' if rent[1]=='100' else 'rentTower'
                stars=re.search(r'_root.wuxing[12] >= (1)',line)
                if stars and m.start()==stars.start(1):alias='upgradeStars'
                cap=re.search(r'_root\.(?:zuanshi|wuxing|yumao|dilei)[12] (?:==|<) (5)',line)
                if cap and m.start()==cap.start(1):alias='itemCap'
                if path.startswith('DefineSprite_94_chaoshi/') and shop_item:
                    cash=re.search(r'_root.xianjin[12] (>=|-=|\+=) (\d+)',line)
                    if cash and m.start()==cash.start(2):alias='shop'+shop_item+('Redeem' if cash[1]=='+=' else 'Cash')
                if alias and value!=aliases[alias]:raise ValueError(('Alias default mismatch',path,line,raw,alias))
                effective='rules.'+alias if alias else key
                numbers[effective]=value
                locations.append({'key':key,'effectiveKey':effective,'default':value,'path':path,'line':line_no,'column':m.start()+1,'statement':line.strip()})
                return '_config.number('+json.dumps(effective)+')'
            result.append(token.sub(replace,line))
        return ''.join(result)
    for p in sorted(scripts_dir.rglob('*.as')):
        relative = p.relative_to(scripts_dir).as_posix()
        text = p.read_text('utf-8')
        # This corpus has four zero-argument declarations, no var/class/cast syntax.
        # Store them on the clip scope, as AVM1 DefineFunction does.
        body = text
        if body.startswith('onClipEvent('):
            body = body[body.index('{')+1:body.rfind('}')]
        if relative.startswith('DefineSprite_10_maidi/') and 'onClipEvent(keyDown)' in relative:
            # Original purchase script repeats literal band costs, while the
            # admission check uses the price arrays. Normalize only those debit
            # statements to the same arrays, preserving whole-band ownership.
            body,n=re.subn(r'\s*_root\.(?:xianjin|zuanshi)[12] -= \d+;', '',body)
            if n!=30:raise ValueError(('Unexpected purchase debit count',n))
            for player,keycode in [(1,87),(2,38)]:
                pattern=r'(if\(Key.getCode\(\) == '+str(keycode)+r' && _root.shui == '+str(player)+r'\)\s*\{)'
                debit='\n      _root.xianjin'+str(player)+' -= _root.xianjin[_root.weizhi];\n      _root.zuanshi'+str(player)+' -= _root.zuanshi[_root.weizhi];'
                body,n=re.subn(pattern,lambda m:m[0]+debit,body)
                if n!=1:raise ValueError('Missing purchase confirmation block')
        if re.search(r'\b(var|class|import|with)\b',body):
            raise ValueError('Unreviewed AS syntax in ' + relative)
        body = re.sub(r'\bfunction\s+(\w+)\s*\(\s*\)',
                      r'\1 = function \1()',body)
        # AVM1 CallMethod on an absent target returns undefined. In particular,
        # the original move callback continues after a bankruptcy frame jump,
        # when the dice movie has been removed. JS must not throw there.
        body=re.sub(r'\b(_root(?:\.\w+)?|_parent(?:\.\w+)?|this|ss)\.(gotoAndPlay|gotoAndStop|attachMovie|attachSound|start|stop)\(',
                    lambda m:'_invoke('+m[1]+','+json.dumps(m[2])+',',body)
        if relative.startswith(('DefineSprite_9_shengji/','DefineSprite_16_bieshu/')):
            body=re.sub(r'(_root.wuxing[12])--;',r'\1 -= _config.number("rules.upgradeStars");',body)
        body=body.replace('"请付100元住宿费"','"请付" + _config.number("rules.rentHouse") + "元住宿费"')
        body=body.replace('"请付200元住宿费"','"请付" + _config.number("rules.rentTower") + "元住宿费"')
        # Named function expressions retain recursion while assignments persist
        # across future key events and interval callbacks on the same clip.
        # Their trailing } is a declaration in AS but an expression in JS;
        # ASI inserts the semicolon at the next statement (all four declarations
        # end with a line break and a following independent statement).
        sid = len(scripts)
        script_ids[relative] = sid
        scripts.append('// '+relative+'\nfunction(__scope) { with (__scope) {\n'+parameterize(body,relative,sid)+'\n} }')
        provenance.append({'id':sid,'path':relative,'sha256':digest(p),'lines':len(text.splitlines())})
    used = set()
    def lookup(owner, frame, name):
        prefix = ('frame_'+str(frame)) if owner == 0 else None
        matches = []
        for path,sid in script_ids.items():
            chunks = path.split('/')
            if owner == 0:
                if chunks[0] != prefix: continue
                rest = chunks[1:]
            else:
                if not re.match(r'DefineSprite_'+str(owner)+r'(?:_|$)',chunks[0]): continue
                if chunks[1] != 'frame_'+str(frame): continue
                rest = chunks[2:]
            if name is None:
                if rest == ['DoAction.as']: matches.append(sid)
            else:
                char,depth,event = name
                if len(rest)==2 and re.match(r'PlaceObject2_'+str(char)+r'(?:_|$)',rest[0]) and rest[0].endswith('_'+str(depth)) and rest[1]=='CLIPACTIONRECORD onClipEvent('+event+').as':
                    matches.append(sid)
        if len(matches)!=1: raise ValueError(('Script mapping ambiguity',owner,frame,name,matches))
        used.add(matches[0]);return matches[0]
    def timeline(owner,tags,count):
        frames,commands,frame = [],[],1
        for t in tags:
            kind=t.get('type')
            if kind == 'ShowFrameTag':
                frames.append(commands);commands=[];frame+=1
            elif kind == 'DoActionTag':
                commands.append({'op':'script','id':lookup(owner,frame,None)})
            elif kind == 'RemoveObject2Tag':
                commands.append({'op':'remove','depth':int(t.get('depth'))})
            elif kind == 'PlaceObject2Tag':
                c={'op':'place','depth':int(t.get('depth')),'move':true(t,'placeFlagMove')}
                if true(t,'placeFlagHasCharacter'): c['id']=int(t.get('characterId'))
                if true(t,'placeFlagHasMatrix'): c['matrix']=matrix(t.find('matrix'))
                if true(t,'placeFlagHasName'): c['name']=t.get('name')
                if true(t,'placeFlagHasColorTransform'):
                    ct=t.find('colorTransform')
                    c['color']=[int(ct.get(ch+'MultTerm',256))/256 for ch in ['red','green','blue','alpha']]+[int(ct.get(ch+'AddTerm',0)) for ch in ['red','green','blue','alpha']]
                if true(t,'placeFlagHasClipDepth'):c['clipDepth']=int(t.get('clipDepth'))
                if true(t,'placeFlagHasClipActions'):
                    c['events']={}
                    for action in t.findall('./clipActions/clipActionRecords/item'):
                        flags=action.find('eventFlags')
                        if flags is None: raise ValueError('Missing clip flags')
                        for flag in ['KeyDown','EnterFrame']:
                            if true(flags,'clipEvent'+flag):
                                ev=flag[0].lower()+flag[1:]
                                c['events'][ev]=lookup(owner,frame,(int(t.get('characterId')),int(t.get('depth')),ev))
                        if not c['events']: raise ValueError('Unreviewed clip event')
                commands.append(c)
            elif kind == 'FrameLabelTag':commands.append({'op':'label','name':t.get('name')})
            elif kind.startswith(('Define','Export')) or kind in ['JPEGTablesTag','SetBackgroundColorTag']: pass
            else: raise ValueError('Unsupported timeline tag '+str(kind))
        if commands: raise ValueError('Unterminated frame')
        if len(frames)!=count: raise ValueError('Frame count mismatch')
        return {'kind':'sprite','frames':frames}
    definitions, exports = {},{}
    font_codes={int(t.get('fontID')):[int(x.text) for x in t.findall('./codeTable/item')]
                for t in root.find('tags') if t.get('type')=='DefineFont2Tag'}
    public=ROOT/'public';assets=public/'assets';assets.mkdir(parents=True,exist_ok=True)
    asset_data={'bitmaps':{},'svg':{},'fonts':{}}
    def asset(t,kind,key,bounds,source):
        cid=int(t.get(key));sv=ET.parse(source).getroot()
        filename=f'{kind}-{cid}.svg'
        svg=source.read_text('utf-8')
        def bitmap(m):
            uri=m[0];raw=base64.b64decode(uri.split(',',1)[1]);sha=hashlib.sha256(raw).hexdigest()
            asset_data['bitmaps'][sha]=uri
            images=assets/'images';images.mkdir(exist_ok=True);(images/(sha+'.png')).write_bytes(raw)
            return '__RICHMAN_BITMAP_'+sha+'__'
        template=re.sub(r'data:image/[^;]+;base64,[A-Za-z0-9+/=]+',bitmap,svg)
        def local_bitmap(m):
            p=source.parent/m[1]
            raw=p.read_bytes();uri='data:image/png;base64,'+base64.b64encode(raw).decode('ascii')
            class Match:
                def __getitem__(self,index):return uri
            return '"'+bitmap(Match())+'"'
        template=re.sub(r'"(\.\./bitmaps/[0-9a-f]{64}\.png)"',local_bitmap,template)
        asset_data['svg'][str(cid)]=template
        # Human-readable SVGs remain ordinary files with shared image references.
        (assets/filename).write_text(re.sub(r'__RICHMAN_BITMAP_([0-9a-f]+)__',r'images/\1.png',template),'utf-8')
        definitions[str(cid)]={'kind':'asset','url':'assets/'+filename,'bounds':rect(t.find(bounds)),
          'width':float(sv.get('width').removesuffix('px')),'height':float(sv.get('height').removesuffix('px'))}
        if kind=='text':
            text=[];font=None;height=None;color=None
            for rec in t.findall('./textRecords/item'):
                if true(rec,'styleFlagsHasFont'):font=int(rec.get('fontId'));height=int(rec.get('textHeight'))/20
                if true(rec,'styleFlagsHasColor'):color=rec.find('textColor')
                for glyph in rec.findall('./glyphEntries/item'):text.append(chr(font_codes[font][int(glyph.get('glyphIndex'))]))
            definitions[str(cid)]['text']=''.join(text)
            definitions[str(cid)]['textStyle']={'font':font,'size':height,'color':'#'+''.join(f'{int(color.get(ch,0)):02x}' for ch in ['red','green','blue'])}
    for t in root.find('tags'):
        kind=t.get('type')
        if kind=='DefineSpriteTag':definitions[t.get('spriteId')]=timeline(int(t.get('spriteId')),t.find('subTags'),int(t.get('frameCount')))
        elif kind=='DefineShapeTag':asset(t,'shape','shapeId','shapeBounds',ROOT/f'recovered/shapes/{t.get("shapeId")}.svg')
        elif kind=='DefineTextTag':asset(t,'text','characterID','textBounds',ROOT/f'recovered/texts/{t.get("characterID")}.svg')
        elif kind=='DefineEditTextTag':
            color=t.find('textColor')
            definitions[t.get('characterID')]={'kind':'edit','bounds':rect(t.find('bounds')),'variable':t.get('variableName',''),
                'initial':t.get('initialText',''),'size':int(t.get('fontHeight'))/20,'font':t.get('fontId'),
                'align':int(t.get('align',0)),'color':'#'+''.join(f'{int(color.get(ch,0)):02x}' for ch in ['red','green','blue']),
                'multiline':true(t,'multiline'),'wrap':true(t,'wordWrap'),'leading':int(t.get('leading',0))/20}
        elif kind=='ExportAssetsTag':
            for tid,name in zip(t.findall('./tags/item'),t.findall('./names/item')):exports[name.text]=int(tid.text)
    definitions['0']=timeline(0,root.find('tags'),int(root.get('frameCount')))
    # The sole mask in this corpus is the original 500x100 rectangular window
    # on the winner parade, not a visible white shape.
    masks={c['id'] for d in definitions.values() if d['kind']=='sprite' for frame in d['frames'] for c in frame if c.get('clipDepth')}
    if masks!={265}:raise ValueError(('Unreviewed mask set',masks))
    mask_text=(ROOT/'recovered/shapes/265.svg').read_text('utf-8')
    if 'M500.0 100.0 L0.0 100.0 0.0 0.0 500.0 0.0 500.0 100.0' not in mask_text:raise ValueError('Winner mask is no longer the reviewed rectangle')
    definitions['265']['maskRect']=[0,0,500,100]
    if used != set(range(len(scripts))):raise ValueError(('Unmapped scripts',set(range(len(scripts)))-used))
    fonts={}
    for t in root.find('tags'):
        if t.get('type')=='DefineFont2Tag':
            filename=next((ROOT/'recovered/fonts').glob(t.get('fontID')+'_*.ttf'),None)
            if filename:
                target='font-'+t.get('fontID')+'.ttf';shutil.copyfile(filename,assets/target);fonts[t.get('fontID')]='assets/'+target
                asset_data['fonts'][t.get('fontID')]='data:font/ttf;base64,'+base64.b64encode(filename.read_bytes()).decode('ascii')
    data={'sourceSHA256':EXPECTED,'width':600,'height':450,'fps':50,'background':'#66cc00',
          'definitions':definitions,'exports':exports,'fonts':fonts,'missingSounds':True}
    # Actual SWF background, rather than screenshot-derived color.
    bg=root.find('./tags/item[@type="SetBackgroundColorTag"]/backgroundColor')
    data['background']='#'+''.join(f'{int(bg.get(ch)):02x}' for ch in ['red','green','blue'])
    write_json(public/'game-data.json',data)
    (public/'game-data.js').write_text('const RichmanData = '+json.dumps(data,ensure_ascii=False,separators=(',',':'))+';\n','utf-8')
    (public/'asset-data.js').write_text('const RichmanAssetData = '+json.dumps(asset_data,ensure_ascii=False,separators=(',',':'))+';\n','utf-8')
    (public/'generated-game.js').write_text('// Generated from pinned SWF static decompilation. Do not hand edit.\n'
        +'const RichmanScripts = [\n'+',\n'.join(scripts)+'\n];\n'
        +'if (typeof module !== "undefined") module.exports = RichmanScripts;\n','utf-8')
    init=(scripts_dir/'frame_2/DoAction.as').read_text('utf-8').split('if(ppp2')[0]
    fields={'name':'name','xianjin':'cash','touzhi':'overdraft','jiangjin':'bankBonus','shuilv':'taxPercent','zuanshi':'diamonds','wuxing':'stars','yumao':'charms','dilei':'mines'}
    characters={}
    for match in re.finditer(r'(?:if|else if)\(ppp1 == "(b\d)"\)\s*\{([^}]+\}[^}]+\}[^}]+)\}',init):
        # attachMovie initializer braces precede the numeric assignments.
        values={}
        for source,target in fields.items():
            m=re.search(r'\b'+source+r'1 = ("[^"\n]*"|\d+);',match[2])
            if m:values[target]=json.loads(m[1])
        if len(values)!=len(fields):raise ValueError('Character extraction incomplete')
        characters[match[1]]=values
    if len(characters)!=7:raise ValueError(('Expected seven characters',characters))
    prices={}
    for match in re.finditer(r'i = (\d+);\s*while\(i < (\d+)\)\s*\{\s*xianjin\[i\] = (\d+);\s*zuanshi\[i\] = (\d+);',init):
        for i in range(int(match[1]),int(match[2])):prices[str(i)]={'cash':int(match[3]),'diamonds':int(match[4])}
    for field,target in [('xianjin','cash'),('zuanshi','diamonds')]:
        for i,value in re.findall(field+r'\[(\d+)\] = (\d+);',init):prices.setdefault(i,{})[target]=int(value)
    if len(prices)!=30:raise ValueError('Property price extraction incomplete')
    defaults={'characters':characters,'properties':prices,'numbers':numbers,'initializationScript':script_ids['frame_2/DoAction.as']}
    # Static menu labels repeat a few text symbols at many placements. Bind the
    # placement, not the shared symbol, so a change to b1 never changes b2.
    names={v['name']:id for id,v in characters.items()}
    menu=definitions['0']['frames'][0]
    centers={}
    for command in menu:
        d=definitions.get(str(command.get('id')),{});m=command.get('matrix')
        if m and d.get('text') in names:
            b=d['bounds'];centers[names[d['text']]]=m[4]+m[0]*(b[0]+b[2])/2
    rows={209:'name',233:'cash',257:'overdraft',281:'bankBonus',305:'taxPercent',329:'diamonds',353:'stars',377:'charms',401:'mines'}
    menu_bindings=0
    for command in menu:
        d=definitions.get(str(command.get('id')),{});m=command.get('matrix')
        if not m or 'text' not in d or round(m[5],6) not in rows:continue
        field=rows[round(m[5],6)];b=d['bounds'];cx=m[4]+m[0]*(b[0]+b[2])/2
        closest=min(centers,key=lambda k:abs(centers[k]-cx))
        original=str(characters[closest][field])+('%' if field=='taxPercent' else '')
        if abs(centers[closest]-cx)<25 and d['text']==original:
            command['configurationText']={'character':closest,'field':field,'suffix':'%' if field=='taxPercent' else ''};menu_bindings+=1
    if menu_bindings!=63:raise ValueError(('Expected all 7x9 menu stat labels',menu_bindings))
    price_texts={228:[30],229:list(range(1,6)),230:list(range(13,16)),231:list(range(8,12)),232:[21,22],233:list(range(16,21)),234:[27,28,29],235:[6,7]}
    for command in definitions['0']['frames'][1]:
        if command.get('id') in price_texts:command['configurationText']={'properties':price_texts[command['id']]}
    write_json(public/'game-data.json',data)
    (public/'game-data.js').write_text('const RichmanData = '+json.dumps(data,ensure_ascii=False,separators=(',',':'))+';\n','utf-8')
    config=public/'config';config.mkdir(exist_ok=True)
    write_json(config/'defaults.json',defaults)
    (config/'defaults.js').write_text('const RichmanDefaults = '+json.dumps(defaults,ensure_ascii=False,separators=(',',':'))+';\nif(typeof module!=="undefined")module.exports=RichmanDefaults;\n','utf-8')
    write_json(ROOT/'data/number-sources.json',locations)
    write_json(ROOT/'output/build-report.json',{'swfSHA256':EXPECTED,'xmlSHA256':digest(xml),'scriptCount':len(scripts),
        'mappedScriptCount':len(used),'definitions':len(definitions),'exports':len(exports),'sourceScripts':provenance,
        'generatedSHA256':digest(public/'generated-game.js'),'dataSHA256':digest(public/'game-data.json'),
        'runtimeUsesSWF':False,'originalExecuted':False,'parityVerified':False})
    print(f'Built {len(scripts)} mapped scripts, {len(definitions)} display definitions, {len(exports)} export names.')

if __name__=='__main__':build()
