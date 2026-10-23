# 迷你大富翁

[English](README.md) · [可视化修改指南](docs/CUSTOMIZATION.md) · [默认参数](docs/DEFAULTS.md) · [交付状态](docs/STATUS.md) · [下载运行包](https://github.com/learner20230724/mini-richman-rebuild/releases)

双人同屏经营棋盘游戏，保留七名角色、买地、建房升级、税后租金、道具、赌场、命运事件、住院与破产结算。游戏运行在现代浏览器中，不播放 SWF，不依赖 Flash 或 Ruffle。

## 运行

- 解压后双击 `Start-Game.cmd`，或打开 `public/index.html`。不需要安装 Node.js、Java 或 Flash。
- 如果浏览器限制本地文件，运行 `Start-Local-Game.cmd`，Windows 自带 PowerShell 提供本机服务 `http://127.0.0.1:18758/`；关闭命令窗口停止。端口占用时，先关闭之前的游戏服务窗口再启动。
- 玩家一：**A/D** 选择，**W** 确认/掷骰，**S** 取消。
- 玩家二：**←/→** 选择，**↑** 确认/掷骰，**↓** 取消。
- 双方确认选角后等待约两秒开始。**Alt+Enter** 切换全屏，窗口变化时等比缩放，不裁切。
- 原始游戏仍使用键盘操作；可选设置面板支持鼠标和键盘，没有添加常驻项目介绍。

## 修改配置

点击**齿轮**或按 **F2** 打开六页设置面板。打开时默认暂停，可保持面板打开继续游戏；面板占用独立空间，不盖住游戏。

- 可调角色属性、地产价格、建造与租金、商店道具、计时，**不必重开**。默认合法字段失焦或按 Enter 后自动应用；也可点**立即应用本局**。自动应用不等于自动保存。
- 人物只把修改的字段同步给使用该角色的玩家，不重置其他余额或位置；地价与规则用于后续交易。正在处理交易时整份配置等待安全时机，已付款不回算。
- **本局沙盒**保留直接改玩家/单格地产的操作；重新开局改为独立、需确认的次级操作。高级源码数字有额外的本局应用限制。
- 支持最多 **30 步草稿撤销**、**25 套命名预设**、**2 MiB** 上限的 JSON 导入导出；预设/导入/恢复等批量草稿需显式应用。本机保存只存规则，不存战局；请沿用同一浏览器、地址与端口，迁移时用 JSON。
- 目标速度 **0～20 倍**，每次 **0.1 倍**；0 为暂停，1 为原速。单步推进原来的 **20 毫秒**，切到后台不积压时间、回来不补跑。

应用、保存、重置和沙盒的区别见[修改指南](docs/CUSTOMIZATION.md)。未应用自定义规则时，原版默认数值不变。

也可以编辑 **`public/config/overrides.js`**，刷新游戏生效。例如：

```js
const RichmanOverrides = {
  characters: { b6: { cash: 12000, bankBonus: 500 } },
  properties: { '1': { cash: 100, diamonds: 0 } },
  numbers: { 'rules.houseCash': 300, 'rules.stepMilliseconds': 400 }
};
if (typeof module !== 'undefined') module.exports = RichmanOverrides;
```

不填写的项目保留原值；面板不会改写这份文件。角色与地块编号、字段解释和规则见[默认参数表](docs/DEFAULTS.md)。高级数字参数的原语句、位置和默认值在 `data/number-sources.json`，对应配置的 `numbers` 字段；其中也有坐标、状态常量，不能当作全部安全的业务参数。不要直接手改生成文件。

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
| `public/clock.js` | 0～20 倍固定步长播放时钟 |
| `public/settings.js` | 配置校验与应用 |
| `public/live-settings.js` | 本局安全热更新及计时进度适配 |
| `public/config-store.js` | 草稿、预设与显式浏览器保存 |
| `public/editor.js`、`public/editor.css` | 人工维护的可视化编辑器与布局 |
| `public/sandbox.js` | 带状态保护的本局开发工具 |
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
