# 可视化修改指南 / Customization guide

[中文首页](../README.zh-CN.md) · [English README](../README.md) · [默认参数 / Defaults](DEFAULTS.md)

## 打开面板 / Open the editor

点击齿轮或按 **F2**，按 **Esc** 关闭。宽窗口左右排列，窄窗口上下排列；游戏保持正确比例，面板不遮住棋盘。**打开、编辑、关闭都不暂停，也不改变当前速度**，移动、计时和已开始的事件继续推进。没有“编辑时暂停”开关；需要暂停时主动按暂停或设为 0 倍。若已经是 0 倍，关闭面板也不会自动恢复。

Click the gear or press **F2**; **Esc** closes it. The game and editor sit side-by-side on wide screens and stack on narrow ones, without covering or stretching the board. **Opening, editing and closing neither pause nor change speed**: movement, timers and started events continue. There is no pause-while-editing switch; pause explicitly or select 0× when wanted. Closing the editor never restores speed from a user-selected 0×.

字段输入与游戏键盘隔离，避免输入名字或数值时误触掷骰。要在面板打开时操作游戏，点击游戏画布，再使用原来的游戏按键；这只切换输入焦点，不需要关闭面板，也不是恢复计时的按钮。

Editor typing is isolated from gameplay keys, preventing accidental rolls while entering names or values. To control the game with the panel open, click the game canvas, then use the normal game keys. This changes input focus only: it does not require closing the panel or resume a stopped clock.

六页按本作实际系统分类：**本局沙盒、角色、地产、建造租金、商店道具、时间 / 高级**。这里没有凭空添加兵种、僵尸、关卡或出怪波次。

The six pages cover this game's actual systems: **current-match sandbox, characters, property, construction/rent, shop items, and timing/advanced numbers**. This board game has no troop, zombie, campaign or wave settings.

## 三种修改，三个生效时机 / Three kinds of changes

| 操作 / Operation | 生效与保存 / Effect and persistence |
|---|---|
| 本局沙盒 / Current-match sandbox | 明确确认后立即改变当前局；不是新局初始配置，也不是战局存档。Explicit immediate changes to the current match, not next-match defaults or a saved game. |
| 规则草稿与本局应用 / Rules draft and live application | 默认合法字段失焦或按 Enter 后自动应用本局；也可点“立即应用本局”。不自动重开、不自动保存。By default valid field changes apply on blur/Enter, or use “立即应用本局” (apply now). No automatic restart or saving. |
| 运行速度 / Playback speed | 即时改变推进速度，不改租金、费用或规则时间的配置值。Immediately changes pacing without rewriting rent, costs or configured rule durations. |

**自动应用不等于自动保存。** 本局已付款、已发生的租金不会因修改而追溯退款或重算。需要直接改某位玩家或单格地产时可用沙盒；修改角色配置与业务规则则走本局应用，不必重新选角。

**Automatic application is not automatic saving.** Changes do not retroactively refund purchases or recalculate rent already paid. Use the sandbox for direct current-player or single-tile edits; apply character configuration and business-rule changes to the existing game without selecting characters again.

最短操作：保持勾选**修改后自动应用本局（不自动保存）** → 修改字段 → 失焦或按 Enter → 查看已应用/等待提示。关闭自动应用时，点**立即应用本局**。想下次启动继续使用已生效规则，再点**保存已应用到本机**；想收藏一份草稿，点**保存命名草稿**。需要主动丢弃当前进度时，才使用需确认的次级**按配置重新开局**。

Quick workflow: leave **修改后自动应用本局（不自动保存） (auto-apply, do not auto-save)** checked → edit a field → blur or press Enter → check the applied/pending status. With automatic application off, use **立即应用本局 (apply now)**. Use **保存已应用到本机 (save applied rules locally)** for the next launch, or **保存命名草稿 (save named draft)** to keep a draft preset. Use the separate confirmed **按配置重新开局 (restart with configuration)** only when you intend to discard current progress.

预设加载、JSON 导入、撤销、恢复原版/文件基准属于**批量草稿**，不会自动提交；之后再编辑一个小字段或关闭面板也不会绕过确认，需明确点**立即应用本局**。无效输入会标红并阻止整份提交，输入中的半成品不会应用。

Preset loading, JSON import, undo and original/file-baseline resets create a **bulk draft** and require an explicit **apply now**. Editing one more small field or closing the panel does not bypass that requirement. Invalid input is marked and blocks the complete submission; partially typed values are not applied.

普通字段尚未失焦就按 Esc/F2 关闭时，合法修改也会提交；无效修改仍留在草稿并提示，不会套入游戏。此关闭提交不适用于上述批量草稿。

Closing with Esc/F2 can also commit a valid ordinary field that has not blurred yet. Invalid edits remain in the draft with a warning, not in the game. This closing behavior never submits a protected bulk draft.

### 本局应用的范围 / Live-application scope

| 修改 / Change | 生效方式 / Effect |
|---|---|
| 角色字段 / Character fields | 只将本次改变的字段同步给使用该角色的已选玩家；数值直接设为新值，不把整套初始属性重灌一次。不相关余额与位置保留。Only changed fields synchronize to selected matching players, set to their new values; unrelated balances and positions remain intact. |
| 地价与业务规则 / Prices and business rules | 后续购买、建造、收租、道具等操作使用新值；不退款、不重算已完成交易，不改变已有地产归属。Subsequent purchases, building, rent and item actions use updated values; no refunds, retroactive recalculation or ownership reset. |
| 命名时间参数 / Named timer settings | 保持现有间隔的进度后调整计时，不重掷骰子、不重置已走步数。Retiming preserves interval progress without rerolling dice or resetting steps already taken. |
| 骰子面数 / Dice faces | 下次掷骰使用新范围，当前点数与剩余步数不变。New range on the next roll; current roll and remaining steps stay unchanged. |
| 高级源码数字 / Advanced source numbers | 风险确认后仅影响后续源码取值；已执行的初始化常量需新局，已有对象不重建。Future source reads only after risk confirmation; executed initialization requires a new game, and existing objects are not rebuilt. |

若当前交易不适合中途换规则，整份配置等待安全时机再应用，不会一半旧规则、一半新规则。面板保持打开时移动和事件仍会继续；需要回应弹窗时点击画布再操作。若主动设为 0 倍，需要恢复正倍速让计时流程完成。已经排队不等于已经应用，也不等于已经保存。

If a transaction cannot safely change rules halfway through, the complete update waits for a safe point instead of applying a mixture. Movement and events continue while the editor stays open; click the canvas to answer a game dialog. If you explicitly chose 0×, restore a positive speed so timed actions can finish. Queued is not applied, and neither means saved.

弹窗决策、已付款转盘和未结束的计时事务会等待旧规则结算；赌场/命运已经结算、仅保留结果画面时，不会无谓阻塞应用。移动中单独修改命名规则可以应用；若同一份修改还包含角色、地产价格或 `src.*`，则整份等待这次移动及落地事务完成。再次提交会替换尚未应用的整份请求；**取消待应用**保留草稿、本局不变。胜负已定后可更新供新局使用的配置，但不改变赢家或重放棋盘。

Decision dialogs, paid spins and unfinished timed transactions settle under their old rules; a settled casino/fortune result display does not unnecessarily block application. Named-rule-only updates can apply during movement; a mixed update containing characters, property prices or `src.*` waits for movement and landing to finish. Resubmitting replaces the complete pending request. **取消待应用 (cancel pending)** retains the draft without changing the match. After a game ends, configuration can update for a new match without changing the winner or replaying the board.

计时均用游戏毫秒：活动间隔的剩余比例为 `clamp((旧下一次时刻 - 当前时刻) / 旧间隔, 0, 1)`，新下一次时刻为 `当前时刻 + 剩余比例 × 新间隔`，不额外取整，仍由 20 ms 逻辑步检查到期。选角剩余次数则按 `ceil(旧剩余次数 / 旧总次数 × 新总次数)` 换算，未结束时至少为 1；棋盘中修改不会把玩家踢回选角。

Timing uses game milliseconds. Remaining interval fraction is `clamp((old next time - now) / old interval, 0, 1)`; the new next time is `now + fraction × new interval`, without extra rounding, still checked by 20 ms logic ticks. Menu countdown ticks use `ceil(old remaining / old total × new total)`, with a minimum of 1 while unfinished. Changes on the board never force a return to character selection.

### 本局沙盒的实际范围 / Sandbox scope

仅在棋盘上稳定等待掷骰时允许即时修改。移动、弹窗、抽奖与胜负结算期间拒绝操作，避免修改一半的交易。可修改两位玩家的现金、透支额、银行奖金、税率、钻石、升级星、护身符和陷害卡；住院状态只读，不能当作单个数字安全地改写。

Immediate edits are allowed only on the board while stably waiting for a roll. Movement, dialogs, roulette and winner scenes reject edits rather than mutate half-completed transactions. Player cash, overdraft, bank bonus, tax, diamonds, stars, charms and mines are editable; hospital state is read-only because it also depends on location and turn flow.

现金可为负数或小数；税率为 0～100%，道具数量为非负整数。普通数值的绝对安全上限为 10 亿。地产可直接设置单格所有者（无主、玩家一、玩家二）和建筑等级 0～4；无主地必须为 0 级。沙盒直接修改**单格**，不扣款、不模拟买地、不自动联动整个色带，因此明确不是原版买地操作。

Cash may be negative or fractional; tax is 0–100%, and item counts are nonnegative integers. Ordinary numeric fields have an absolute safety limit of one billion. A single property can be assigned an owner (none/P1/P2) and level 0–4; unowned land must have level 0. This direct **single-tile** sandbox action does not charge money, simulate a purchase or transfer a whole band: it is deliberately non-original gameplay.

操作记录最多保留本次对局最近 50 条，仅在内存中展示；它没有撤销功能，重开后清空。草稿的 30 步撤销不适用于这些即时操作。

The current match keeps up to 50 sandbox log entries in memory. They are not undoable and are cleared on restart. The draft's 30-step undo does not undo sandbox actions.

## 草稿、预设与配置文件 / Drafts, presets and configuration files

- **撤销**保留最多 30 步草稿修改，撤销后需手动应用；它不是回滚整盘对局或已付款交易的功能。
- **预设**最多 25 套，名称为 1～48 个字符。加载/导入先生成批量草稿，再点“立即应用本局”；保存预设不等于应用或设为下次启动规则。预设不保存棋盘、当前回合或随机状态。
- **JSON 导入/导出**用于备份与跨设备共享规则，单份 JSON 按 UTF-8 大小限制为 2 MiB，整个本机持久化库也受此上限限制。导入校验版本、结构、字段和数值；非法配置不会部分套进游戏。
- **本机保存**是显式操作，使用浏览器存储。需要同一浏览器、浏览配置和同一来源（协议、地址、端口）；清理浏览数据也可能删除它。切换设备、浏览器、服务端口、本地文件路径或解压位置前，先导出 JSON。
- **恢复原版**把草稿还原为源码恢复出的默认值；**恢复文件基底**恢复 `public/config/overrides.js` 合并后的基底。重置草稿不自动开新局，不删除预设。
- 编辑器不会改写 `public/config/overrides.js`。生成器也不会覆盖该文件、人工扩展或编辑器代码。
- 文件配置改变后，旧浏览器保存的已应用覆盖不再自动压过新文件，预设仍保留。存储不可用或空间不足时会提示，规则可暂留内存，但不能当作已保存；请导出 JSON 备份。

- **Undo** keeps up to 30 draft edits and requires manual application afterward; it is not a whole-match or paid-transaction rollback.
- Up to **25 presets**, with names of 1–48 characters. Loading/importing creates a bulk draft; use “立即应用本局” to submit it. Saving a preset neither applies it nor makes it the next-launch configuration. Presets contain rules, not board state, turns or random state.
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

页面隐藏时暂停，不累计后台时间；恢复、切换速度和主动暂停时清除旧欠账。长时间卡顿也不会无限补跑。打开或关闭编辑器不改变暂停状态：暂停只来自用户的 0 倍/暂停操作或页面隐藏保护。

Hidden pages do not accumulate time. Resuming, changing speed and explicit pause discard old timing debt; long stalls do not cause unbounded catch-up. Opening or closing the editor does not change pause state; only user-selected 0×/pause or hidden-page protection stops time.

## 参数范围与边界 / Parameter scope and limits

角色字段既是后续选角的**初始**配置，也会在本局应用时同步本次修改的字段给匹配玩家；只想改一位当前玩家时可用沙盒。地产价格仍按原版落脚格结算，买一次取得整个色带，不会变成逐格买地。升级、商店、租金与时间按各字段注明的单位修改；未填写的覆盖仍用默认值。全部基础值和计算语义见 [DEFAULTS.md](DEFAULTS.md)。

Character fields remain **starting** values for later selections, and live application synchronizes edited fields to matching current players. Use the sandbox to target just one current player. Property pricing retains the original whole-band purchase rule: pay from the landing tile and acquire its entire band. Building, shop, rent and timing fields use their stated units. Unspecified overrides retain defaults; see [DEFAULTS.md](DEFAULTS.md) for calculations.

高级数字来自源码定位键，里面既有业务数值，也有坐标、状态编号、循环与显示常量。通过范围校验不等于任意组合都业务安全；错误组合可能破坏流程或画面。优先使用命名参数；高级修改先导出备份、在新局中测试。这里不是任意执行 JavaScript 的控制台，也不承诺无需开发就能增加新角色、新事件或全新地图。

Advanced source-number keys include coordinates, state IDs, loops and display constants as well as gameplay values. Numeric validation does not make every combination semantically safe; bad combinations can break scenes or flow. Prefer named parameters, export a backup, and test advanced changes in a new match. This is not an arbitrary JavaScript console or a promise of adding new characters, events or maps without development.
