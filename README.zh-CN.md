# 迷你大富翁

[English](README.md) · [默认参数与规则](docs/DEFAULTS.md) · [交付状态](docs/STATUS.md)

双人同屏经营棋盘游戏，保留七名角色、买地、建房升级、税后租金、道具、赌场、命运事件、住院与破产结算。游戏运行在现代浏览器中，不播放 SWF，不依赖 Flash 或 Ruffle。

## 运行

- 解压后双击 `Start-Game.cmd`，或打开 `public/index.html`。不需要安装 Node.js、Java 或 Flash。
- 如果浏览器限制本地文件，运行 `Start-Local-Game.cmd`，使用 Windows 自带 PowerShell 提供仅绑定本机的静态服务；关闭命令窗口即可停止。
- 玩家一：**A/D** 选择，**W** 确认/掷骰，**S** 取消。
- 玩家二：**←/→** 选择，**↑** 确认/掷骰，**↓** 取消。
- 双方确认选角后等待约两秒开始。**Alt+Enter** 切换全屏，窗口变化时等比缩放，不裁切。
- 本作原始交互使用键盘；没有添加鼠标点选玩法或常驻项目说明。

## 修改配置

编辑 **`public/config/overrides.js`**，刷新游戏生效。例如：

```js
const RichmanOverrides = {
  characters: { b6: { cash: 12000, bankBonus: 500 } },
  properties: { '1': { cash: 100, diamonds: 0 } },
  numbers: { 'rules.houseCash': 300, 'rules.stepMilliseconds': 400 }
};
if (typeof module !== 'undefined') module.exports = RichmanOverrides;
```

不填写的项目保留原值。角色与地块编号、字段解释和规则见[默认参数表](docs/DEFAULTS.md)。高级数字参数的原语句、位置和默认值在 `data/number-sources.json`，对应配置的 `numbers` 字段。修改生成文件不是推荐的扩展方式。

**买地按原版取得整组所有权**，不是只买当前一格。地块价格覆盖会改变从该格购买时的准入检查和实际付款，不会偷偷改变取得整组的规则。自定义配置不会被 `npm run build` 覆盖。

## 开发入口

| 位置 | 用途 |
|---|---|
| `recovered/scripts/` | 可编辑的原游戏脚本恢复稿 |
| `recovered/game.xml` | 原时间轴、摆放、图形及脚本元数据 |
| `recovered/shapes/`、`texts/`、`bitmaps/`、`fonts/` | 原素材的可编辑提取源 |
| `public/generated-game.js` | 由脚本源生成的游戏逻辑，不手改 |
| `public/runtime.js` | 显示树、计时器、输入与脚本作用域适配 |
| `public/app.js` | Canvas 渲染、缩放及浏览器输入 |
| `public/settings.js` | 配置校验与应用 |
| `public/config/overrides.js` | 人工配置，生成器不覆盖 |
| `public/extensions.js` | 人工扩展钩子，生成器不覆盖 |
| `tests/` | 规则、配置与连续对局测试 |

开发测试需要 Node.js 18+；重新生成需要 Python 3.9+ 标准库。运行发布包不需要这两项。

```powershell
npm run build
npm test
npm run test:journey
npm start
python scripts/privacy.py
python scripts/verify-regeneration.py
```

开发服务地址：`http://127.0.0.1:8319/`。构建读取随仓库提供的恢复源，无需原 SWF、FFDec、联网下载或访问开发者私人目录。

可运行 `git config core.hooksPath .githooks` 启用提交前隐私扫描；检查的是 Git 暂存内容，不会漏过“暂存有密钥、工作文件已清理”的情况。

当前验收范围和已知问题见[交付状态](docs/STATUS.md)。权利和再分发说明单列于 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
