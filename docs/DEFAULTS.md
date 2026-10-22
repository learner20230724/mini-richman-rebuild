# 默认参数与规则 / Default parameters and rules

Defaults below are recovered from this game's scripts, not inferred from its
screenshots. This is a single-board, two-player game: it has **no troop types,
enemy waves, combat attack speeds or campaign difficulty multipliers**.

本作没有兵种、敌军波次、攻速或不同关卡倍率。以下按原作实际存在的系统列值。

## Characters / 角色

Configuration: `characters.<ID>.<field>` in `public/config/overrides.js`.

| ID | 姓名 / Name | cash 现金 | overdraft 透支额 | bankBonus 银行奖金 | taxPercent 税率 % | diamonds 钻石 | stars 升级星 | charms 护身符 | mines 陷害卡 |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|
| b1 | 阿布 | 6000 | 300 | 200 | 30 | 0 | 0 | 0 | 0 |
| b2 | 忍者 | 6000 | 300 | 200 | 30 | 0 | 0 | 0 | 0 |
| b3 | 丽丽 | 5000 | 500 | 200 | 20 | 1 | 2 | 0 | 0 |
| b4 | 小强 | 4000 | 300 | 300 | 40 | 0 | 2 | 0 | 1 |
| b5 | 咚咚 | 3000 | 100 | 400 | 50 | 1 | 1 | 1 | 0 |
| b6 | 小镁 | 2000 | 500 | 300 | 20 | 3 | 3 | 2 | 2 |
| b7 | 大宝 | 8000 | 100 | 100 | 40 | 0 | 0 | 0 | 0 |

Overdraft is a bankruptcy allowance, not starting cash. Original rent branches
end the game only when `cash + overdraft < 0`, not when cash alone becomes negative.
Passing the bank adds the character's bonus; merely completing a turn does not.

透支额不是额外发放的现金；破产使用严格小于零判断。经过银行才加奖金，不是每轮固定发钱。

## Property bands / 地块组

There are 38 perimeter cells, including 30 purchasable tiles in 10 bands. Four
corners are shops; bank, hospital, fortune and casino occupy the other special cells.

| Tile IDs / 地块编号 | Cash / 现金 | Diamonds / 钻石 | Ownership acquired / 取得所有权 |
|---|---:|---:|---|
| 1–5 | 400 | 3 | 1–5 |
| 6–7 | 300 | 1 | 6–7 |
| 8–11 | 700 | 2 | 8–11 |
| 12 | 0 | 1 | 12 |
| 13–15 | 1000 | 0 | 13–15 |
| 16–20 | 1200 | 2 | 16–20 |
| 21–22 | 800 | 0 | 21–22 |
| 23–26 | 0 | 5 | 23–26 |
| 27–29 | 600 | 2 | 27–29 |
| 30 | 500 | 0 | 30 |

Configuration: `properties.'<tile ID>'.cash` / `.diamonds`. A purchase pays **once**
and grants the entire band's ownership; it does not construct buildings on every
tile. The original owner/level arrays remain independent for each tile.

配置价格按落脚格编号；付款一次取得整组土地，不会顺带盖好整组房子。建筑等级逐格独立。

## Buildings and rent / 建筑与租金

| Level / 等级 | Type / 类型 | Construction or upgrade / 消耗与前提 | Base rent / 基础住宿费 |
|---:|---|---|---|
| 0 | Bare land / 空地 | Own the tile / 自有土地 | 0 |
| 1 | House / 房子 | Level 0 + 200 cash / 空地加200现金 | 100 |
| 2 | Tower / 新房 | Level 1 + 1 star / 一级加1颗升级星 | 200 |
| 3 | Villa / 别墅 | Level 2 + 1 star / 二级加1颗升级星 | Roulette: 100, 200, 300, 400, 500, 600 |
| 4 | Trap / 陷阱 | Own bare tile + 1 mine; reached by declining construction, or the low-cash fallback / 自有空地消耗1卡，按原建房取消分支或现金不足分支进入 | Hospital effect, not rent / 住院，不收租 |

Payer loses full base rent. Owner receives `baseRent * (1 - ownerTaxPercent / 100)`.
The code does **not** round this result to an integer. An owner in hospital normally
cannot collect building rent; original branch order and hospital exceptions remain.
An available charm opens an optional protection dialog. Villa rent is selected by
the original slowing-wheel algorithm, not a newly invented uniform choice.

付款人付基础值，房主拿税后值；不擅自取整。房主住院时按原分支免费。护身符可以选择用或不用。

Named numeric settings: `rules.houseCash`, `rules.rentHouse`, `rules.rentTower`.
Default values are 200, 100, 200 respectively. `rules.upgradeStars` defaults to 1
and changes both the upgrade eligibility check and actual star debit. Advanced
mine literals remain source-linked in `data/number-sources.json`.

## Shop / 商店

| Item / 道具 | Buy / 单次购买 | If already holding 5 / 已持有5张时确认 |
|---|---:|---|
| Diamond / 钻石 | 200 | Clear all 5, receive 2000 / 清零换2000 |
| Upgrade star / 升级星 | 100 | Clear all 5, receive 1000 / 清零换1000 |
| Charm / 护身符 | 200 | Clear all 5, receive 2000 / 清零换2000 |
| Trap card / 陷害卡 | 300 | Clear all 5, receive 3000 / 清零换3000 |

The fifth item is not automatically sold when acquired. Redemption happens on
the next confirmation while the selected item count equals five. One purchase or
redemption ends the visit. The original four selection positions are retained.

不是拿到第5张立即卖出；已有5张时再次确认才换钱。一次交易结束本次访问。

Named settings: `rules.shopDiamondCash`, `rules.shopStarCash`,
`rules.shopCharmCash`, `rules.shopMineCash` and the corresponding `...Redeem`
keys. `rules.itemCap` changes the shared holding/redemption threshold (default 5).

## Casino / 赌场

| Game / 类型 | Stake / 押注 | Winning payout / 猜中后总入账 | Initial speed / 初速 | Per-frame slowdown check / 每帧减速条件 |
|---|---|---|---:|---|
| Odd/even / 单双 | `int(x/40 + 1) * 100` = 100–500 | `int(x/40 + 1) * 200` = 200–1000 | 10 | `random(30) == 10` |
| Number / 数字 | `int(x/60 + 1) * 100` = 100–300 | `int(x/60 + 1) * 600` = 600–1800 | 5 | `random(50) == 10` |

Stakes are deducted before spinning. Winning payout is added afterward; it is
not an extra net-profit figure. Cash below 100 prevents entry into a betting game,
but cancelling the casino menu is allowed. Once inside the betting screen the
original cancellation refusal is retained. No fairness/probability guarantee is
inferred from the wheel artwork.

## Fortune / 命运

Random integer 0–14 selects the branch, with original item caps and conditions.

| Code | Effect / 效果 |
|---:|---|
| 0 | No effect / 无事发生 |
| 1–4 | +1 diamond/star/charm/mine if that count is below 5 / 对应卡少于5时加1 |
| 5 | +300 cash / 现金加300 |
| 6 | Lose 300 cash if at least 300; otherwise set cash to 0 / 足300扣300，否则现金清零 |
| 7 | +200 overdraft / 透支额加200 |
| 8 | −200 overdraft, only if above 200 / 大于200才减200 |
| 9 | +10 tax percentage points if below 88 / 税率小于88才加10个百分点 |
| 10 | −10 tax percentage points if above 8 / 税率大于8才减10个百分点 |
| 11 | Clear all four item inventories / 四种卡片清零 |
| 12 | +50 bank bonus / 银行奖金加50 |
| 13 | −50 bank bonus if above 50 / 奖金大于50才减50 |
| 14 | Hospital counter 3, if opponent is not in hospital / 对方未住院时住院计数设3 |

Failed conditions fall through to the original no-effect message. Original message
quirks are retained; for example, one loss branch writes zero before composing its
displayed loss amount. No balancing adjustment has been added.

## Timing, units and rounding / 时序、单位与取整

| Parameter | Default | Unit / 说明 |
|---|---:|---|
| Stage / 逻辑画布 | 600 × 450 | Logical pixels; display scales independently / 逻辑像素 |
| Frame rate / 帧率 | 50 | Frames per second / 每秒帧数 |
| Dice / 骰子 | 1–6 | Integer steps / 整数步 |
| Movement / 移动 | 50 | Logical pixels per step / 每步逻辑像素 |
| `rules.stepMilliseconds` | 700 | Milliseconds per movement step / 每步毫秒 |
| `rules.selectionTickMilliseconds` | 100 | Milliseconds per ready check / 双方就绪检查间隔 |
| `rules.selectionTicks` | 20 | Ready checks before start / 开始前检查次数 |
| `rules.minuteMilliseconds` | 60000 | Milliseconds per displayed minute / 用时计数 |
| Fortune animation / 命运动画 | 300 | Timeline frames; resolves at frame 300 / 第300帧结算 |

`int()` truncates toward zero. `random(n)` returns an integer from 0 through n−1.
The adapter processes at 20 ms frame boundaries. Money calculations use ordinary
floating-point numbers; no extra integer truncation is applied to rent or tax.
There is no original combat cooldown, attack interval, wave schedule or fixed
attack speed to document. Hospital counters are decremented by original turn
branches, not by wall-clock seconds; protection-decline and direct-hit branches
use different initial counters, which have not been normalized away.

### Configuration boundaries / 配置边界

Generated defaults are separate from human overrides. Advanced literal keys
include geometry and controls as well as business values; treat them as developer
settings, not guaranteed independent balance sliders. The source-location catalog
describes the pre-parameterization projection; purchase debit normalization and
method-call adaptation can shift its lines relative to the recovered AS file.
Static artwork may contain printed default numbers; see current UI configuration
coverage in [STATUS](STATUS.md) before relying on custom-value presentation.
