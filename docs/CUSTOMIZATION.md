# 可视化修改指南 / Customization guide

[中文首页](../README.zh-CN.md) · [English README](../README.md) · [默认参数 / Defaults](DEFAULTS.md)

## 打开面板 / Open the editor

点击齿轮或按 **F2**，按 **Esc** 关闭。宽窗口左右排列，窄窗口上下排列；游戏保持正确比例，面板不遮住棋盘。打开默认暂停；取消勾选**编辑时暂停**可保持面板打开继续游戏。编辑字段时，键盘不会同时控制游戏。关闭面板只解除编辑器自己的暂停，不会把用户设定的 0 倍改回 1 倍。

Click the gear or press **F2**; **Esc** closes it. The game and editor sit side-by-side on wide screens and stack on narrow ones, without covering or stretching the board. Opening pauses by default; uncheck **编辑时暂停 (pause while editing)** to resume with the panel open. Typing in the panel does not control the game. Closing removes only the editor's pause, not a user-selected 0× speed.

六页按本作实际系统分类：**本局沙盒、角色、地产、建造租金、商店道具、时间 / 高级**。这里没有凭空添加兵种、僵尸、关卡或出怪波次。

The six pages cover this game's actual systems: **current-match sandbox, characters, property, construction/rent, shop items, and timing/advanced numbers**. This board game has no troop, zombie, campaign or wave settings.

## 三种修改，三个生效时机 / Three kinds of changes

| 操作 / Operation | 生效与保存 / Effect and persistence |
|---|---|
| 本局沙盒 / Current-match sandbox | 明确确认后立即改变当前局；不是新局初始配置，也不是战局存档。Explicit immediate changes to the current match, not next-match defaults or a saved game. |
| 规则草稿 / Rules draft | 编辑、导入、加载、保存都不直接改当前局；应用后开始新局并重新选角。Editing, importing, loading or saving does not mutate the running match; applying starts a new match with character selection. |
| 运行速度 / Playback speed | 即时改变推进速度，不改租金、费用或规则时间的配置值。Immediately changes pacing without rewriting rent, costs or configured rule durations. |

本局已付款、已发生的租金不会因草稿修改而追溯退款或重算。需要改正在进行的对局时，使用标明即时生效的沙盒操作；需要改变规则时，应用草稿开始新局。

Draft changes do not retroactively refund purchases or recalculate rent already paid. Use explicitly immediate sandbox controls for the current match, or apply a draft and start over to change rules.

最短操作：修改参数 → **应用并重新开局** → 关闭设置或取消编辑暂停 → 重新选角。想下次启动继续使用这套规则，再点**保存已应用到本机**；想收藏一份未应用的草稿，点**保存命名草稿**。

Quick workflow: edit values → **应用并重新开局 (apply and restart)** → close the panel or release editor pause → select characters again. Use **保存已应用到本机 (save applied rules locally)** for the next launch, or **保存命名草稿 (save named draft)** to keep an unapplied preset.

### 本局沙盒的实际范围 / Sandbox scope

仅在棋盘上稳定等待掷骰时允许即时修改。移动、弹窗、抽奖与胜负结算期间拒绝操作，避免修改一半的交易。可修改两位玩家的现金、透支额、银行奖金、税率、钻石、升级星、护身符和陷害卡；住院状态只读，不能当作单个数字安全地改写。

Immediate edits are allowed only on the board while stably waiting for a roll. Movement, dialogs, roulette and winner scenes reject edits rather than mutate half-completed transactions. Player cash, overdraft, bank bonus, tax, diamonds, stars, charms and mines are editable; hospital state is read-only because it also depends on location and turn flow.

现金可为负数或小数；税率为 0～100%，道具数量为非负整数。普通数值的绝对安全上限为 10 亿。地产可直接设置单格所有者（无主、玩家一、玩家二）和建筑等级 0～4；无主地必须为 0 级。沙盒直接修改**单格**，不扣款、不模拟买地、不自动联动整个色带，因此明确不是原版买地操作。

Cash may be negative or fractional; tax is 0–100%, and item counts are nonnegative integers. Ordinary numeric fields have an absolute safety limit of one billion. A single property can be assigned an owner (none/P1/P2) and level 0–4; unowned land must have level 0. This direct **single-tile** sandbox action does not charge money, simulate a purchase or transfer a whole band: it is deliberately non-original gameplay.

操作记录最多保留本次对局最近 50 条，仅在内存中展示；它没有撤销功能，重开后清空。草稿的 30 步撤销不适用于这些即时操作。

The current match keeps up to 50 sandbox log entries in memory. They are not undoable and are cleared on restart. The draft's 30-step undo does not undo sandbox actions.

## 草稿、预设与配置文件 / Drafts, presets and configuration files

- **撤销**保留最多 30 步草稿修改；不要把它当作回滚整盘对局的功能。
- **预设**最多 25 套，名称为 1～48 个字符。加载只改草稿，保存不自动应用；保存的是规则，不保存棋盘、当前回合或随机状态。
- **JSON 导入/导出**用于备份与跨设备共享规则，单份 JSON 按 UTF-8 大小限制为 2 MiB，整个本机持久化库也受此上限限制。导入校验版本、结构、字段和数值；非法配置不会部分套进游戏。
- **本机保存**是显式操作，使用浏览器存储。需要同一浏览器、浏览配置和同一来源（协议、地址、端口）；清理浏览数据也可能删除它。切换设备、浏览器、服务端口、本地文件路径或解压位置前，先导出 JSON。
- **恢复原版**把草稿还原为源码恢复出的默认值；**恢复文件基底**恢复 `public/config/overrides.js` 合并后的基底。重置草稿不自动开新局，不删除预设。
- 编辑器不会改写 `public/config/overrides.js`。生成器也不会覆盖该文件、人工扩展或编辑器代码。
- 文件配置改变后，旧浏览器保存的已应用覆盖不再自动压过新文件，预设仍保留。存储不可用或空间不足时会提示，规则可暂留内存，但不能当作已保存；请导出 JSON 备份。

- **Undo** keeps up to 30 draft edits; it is not a whole-match rollback.
- Up to **25 presets**, with names of 1–48 characters. Loading changes the draft; saving does not apply it. Presets contain rules, not board state, turns or random state.
- **JSON import/export** backs up and shares rules. Each JSON input and the entire persisted local library are limited to 2 MiB of UTF-8 data. Version, structure, fields and values are validated atomically.
- **Local saving** is explicit and uses browser storage. Reuse the same browser, profile and origin (protocol, address and port); clearing browser data can remove it. Export JSON before changing device, browser, server port, local-file path or extraction location.
- **Original defaults** resets the draft to recovered defaults; **file baseline** resets it to defaults merged with `public/config/overrides.js`. Neither automatically starts a match or deletes presets.
- The editor never rewrites `public/config/overrides.js`. Regeneration also preserves that file, handwritten extensions and editor code.
- When the file configuration changes, old saved active overrides no longer take priority; presets are retained. Unavailable/full storage produces a warning: in-memory rules are not a successful save. Export JSON as a backup.

导入接受原始覆盖对象，或如下版本包装；不要把 JavaScript 的 `const` 声明粘进 JSON。Imports accept a raw overrides object or this versioned wrapper, not JavaScript declarations:

```json
{
  "schemaVersion": 1,
  "overrides": {
    "characters": { "b6": { "cash": 12000 } },
    "numbers": { "rules.houseCash": 300 }
  }
}
```

Windows 的 `Start-Local-Game.cmd` 默认固定使用 `http://127.0.0.1:18758/`，便于下次访问同一份浏览器存储。若端口被占用，请先关闭之前的服务窗口；不会自动换端口导致“预设消失”。开发者可用 `Start-Local.ps1 -Port <固定端口>`，或 `-Port 0` 创建临时隔离来源，但需自行用 JSON 迁移规则。直接 `file:` 打开时，本地存储行为还受浏览器文件来源策略影响。

On Windows, `Start-Local-Game.cmd` uses fixed `http://127.0.0.1:18758/` so the next launch can access the same browser storage. If occupied, close the previous server window; the launcher does not silently change origins. Developers may use `Start-Local.ps1 -Port <fixed port>`, or `-Port 0` for a temporary isolated origin, and transfer rules through JSON. With direct `file:` startup, storage behavior also depends on the browser's local-file origin policy.

## 0～20 倍与暂停 / 0–20× speed and pause

| 设置 / Setting | 含义 / Meaning |
|---|---|
| 0× | 暂停模拟与游戏操作，编辑器仍可用。Pause simulation and gameplay input; editor controls remain usable. |
| 0.1～20× | 每 0.1 倍一级，1× 为原速。Target multiplier in 0.1 increments; 1× is original speed. |
| 单步 / Single-step | 暂停时推进一个原始 20 ms 逻辑 tick，不是走一格或结束一个回合。Advance one original 20 ms logic tick while paused, not a tile or turn. |

加速仍逐次使用 `game.step(20)`，不把一大段时间一次塞进逻辑，也不偷偷降低走格间隔等原版参数。默认 700 ms 的走格间隔，在 20× 目标下约对应 35 ms 墙钟时间；这个例子假设未修改时间配置且设备足够快。显示的是目标倍速，不保证慢设备实际达到 20 倍。

Speed changes keep repeated `game.step(20)` calls instead of passing a large delta or lowering original rule parameters. An unchanged 700 ms movement interval corresponds to about 35 ms of wall-clock time at a 20× target if the device keeps up. The setting is a target, not a guarantee of actual 20× performance.

页面隐藏时暂停，不累计后台时间；恢复、切换速度和暂停时清除旧欠账。长时间卡顿也不会无限补跑。编辑器暂停与用户 0 倍相互独立。

Hidden pages do not accumulate time. Resuming, changing speed and pausing discard old timing debt; long stalls do not cause unbounded catch-up. Editor pause and user-selected 0× remain independent.

## 参数范围与边界 / Parameter scope and limits

角色页修改的是**初始**属性。本局资源需用沙盒修改。地产价格仍按原版落脚格结算，买一次取得整个色带，不会变成逐格买地。升级、商店、租金与时间按各字段注明的单位修改；未填写的覆盖仍用默认值。全部基础值和计算语义见 [DEFAULTS.md](DEFAULTS.md)。

Character settings are **starting** values; use the sandbox for current resources. Property pricing retains the original whole-band purchase rule: pay from the landing tile and acquire its entire band. Building, shop, rent and timing fields use their stated units. Unspecified overrides retain defaults; see [DEFAULTS.md](DEFAULTS.md) for calculations.

高级数字来自源码定位键，里面既有业务数值，也有坐标、状态编号、循环与显示常量。通过范围校验不等于任意组合都业务安全；错误组合可能破坏流程或画面。优先使用命名参数；高级修改先导出备份、在新局中测试。这里不是任意执行 JavaScript 的控制台，也不承诺无需开发就能增加新角色、新事件或全新地图。

Advanced source-number keys include coordinates, state IDs, loops and display constants as well as gameplay values. Numeric validation does not make every combination semantically safe; bad combinations can break scenes or flow. Prefer named parameters, export a backup, and test advanced changes in a new match. This is not an arbitrary JavaScript console or a promise of adding new characters, events or maps without development.
