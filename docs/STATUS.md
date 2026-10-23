# Delivery status / 交付状态

Updated 2026-10-23, Asia/Shanghai. **v0.3.1 uninterrupted-editing update; not a claim of
native-Flash or full-pixel equivalence.** [Verification summary](VERIFICATION.json)

## v0.3.1 scope / 本轮更新范围

- Removed automatic editor pause and the pause-while-editing option entirely.
  Opening F2, editing fields and closing settings do not change speed, stop timers,
  interrupt movement or suspend an event already in progress.
- User-selected 0× and the explicit pause control still stop gameplay. Closing
  settings does not undo that choice. Hidden-page protection still prevents
  background time accumulation and catch-up on return.
- Editor input remains isolated from game keys. Click the canvas to roll or
  answer a dialog with the panel open; closing restores canvas focus. Input focus
  does not stop the simulation clock.
- Existing live-application, safe transaction queues, presets and 0–20× target
  speed remain. This revision removes an unwanted pause behavior; it is not a
  20× performance optimization or a claim to fix every freeze/crash.

本轮改动是取消用户已确认的编辑自动暂停，不应描述为已修复所有卡死。本轮验收如下；后续历史章节的数据属于旧版本。

This removes the user-confirmed automatic editor pause. Current checks are below;
older version sections remain historical evidence.

## v0.3.1 verification / 本轮验收

- 278 unit tests passed; three original-default headless journeys again completed
  in 463/465/456 rolls. Regeneration preserved 12 handwritten files and unchanged
  generated outputs.
- 139 browser checks passed: 18 original flow, 6 additional screens, 13 controls,
  33 editor, 32 live-update and 37 dedicated keep-playing checks.
- Actual F2 during the original 1× countdown continued into the board. A real
  six-cell move completed with settings open while 2×/5×/20× and the pointer
  speed slider were used. Rendering heartbeats remained responsive.
- Numeric speed Enter applied without blur; manual 0× and explicit Continue
  remained effective across F2 open/close. There is no editor-pause control/API.
- An actual detached ZIP passed all 37 keep-playing checks with its included
  Windows PowerShell server and Node/Java absent from PATH. The final tagged
  runtime is checked against that tested payload digest.
- This addresses the confirmed automatic-pause behavior. It is not a claim of
  solving every performance or unsafe advanced-source-number problem.

## Historical v0.3.0 scope / v0.3.0 历史更新范围

- Valid field changes apply to the current game by default on blur/Enter.
  The primary action is "立即应用本局" (apply now), not restart. Explicit saving
  remains separate; automatic application is not automatic persistence.
- Only changed character fields synchronize to currently selected matching
  players. Other player balances, positions and match progress are not reset.
  Future character selections use the updated starting configuration.
- Updated prices and business rules govern later actions. Busy transactions queue
  the whole update for a safe point; already-paid costs/rent are not recalculated.
- Named timer changes preserve interval progress instead of restarting the match.
  Advanced source-number changes remain risk-limited and do not forcibly replay
  scenes or reconstruct arbitrary current display state.
- Confirmed restart remains available as a separate secondary action. Presets,
  JSON files and local browser storage still save rules rather than match state.
- Preset loading, JSON import, undo and resets create a protected bulk draft.
  They require explicit application even when field auto-apply is enabled.
- The six-page editor, current-match sandbox, and 0–20× target speed are retained.

## Historical v0.3.0 validation / v0.3.0 历史验收

- 278 unit tests passed, including live-state/resource preservation, proportional
  timers, transactional queues, and all supported shop settlement cases.
- 66 retained browser checks and 32 new live-update checks passed in Edge.
  Real current-game purchases, construction, rent, bank rewards and shop payments
  used changed values without replacing the game, moving players or resetting cash.
- A moving 700→1400 ms interval retained its remaining fraction, position, dice
  and turn. Queued 300/1 purchases settled under old rules, then 73/0 applied to
  the next actual purchase. Explicit restart remained a separate confirmation.
- Original-default journeys again finished in 463/465/456 rolls. Regeneration
  preserved 12 handwritten files and all generated outputs. Privacy canaries
  passed; CSS is now included in privacy scanning.
- Browser validation found and fixed an original shop-result-display edge case:
  a completed hidden h=0 selector no longer blocks later live edits forever.

下面 v0.2.0 与 v0.1.1 的数据也为历史记录。

- An actual detached v0.3.0 ZIP passed all 32 live-update browser checks using
  its included Windows PowerShell server with Node/Java absent from PATH.
  The final tagged runtime is matched to that tested payload by digest.
  Package hashes and candidate commit are recorded in VERIFICATION.json.
- At v0.3.0, approximate storage: 10.1 MB tracked source (including 1.8 MB runtime
  asset files), 3.1 MB ZIP / 5.6 MB extracted. Decimal values, not additive.

The v0.2.0/v0.1.1 records below are historical.

See [the customization guide](CUSTOMIZATION.md) for exact application, queue,
persistence and advanced-setting limits.

## Historical v0.2.0 scope / v0.2.0 历史更新范围

- Six-page visual editor, opened with the gear/F2, in separate responsive space.
  Opening pauses by default; continuing leaves the panel open. Editor input is
  isolated from gameplay input.
- Character, property, construction/rent, shop-item and timing rule drafts;
  applying starts a new match rather than silently changing a paid transaction.
- Explicit current-match player/property sandbox, with stable-board safeguards
  and an in-memory operation log. This is not original-rule gameplay or a savegame.
- Up to 30 draft undo steps, 25 presets, validated JSON import/export (2 MiB),
  explicit local saving, and separate original/file-baseline draft resets.
- Target speed 0–20× in 0.1× increments, default 1×, original 20 ms fixed steps,
  single-step, hidden-page pause and no accumulated catch-up. A slow machine may
  not achieve the target multiplier; changing speed does not rewrite rule values.
- The editor's pause does not override a user's 0× choice. Paused gameplay keys
  are blocked while editor controls remain usable.

See [the customization guide](CUSTOMIZATION.md) for apply/save distinctions,
scope and safety limits.

## Historical v0.2.0 verification / v0.2.0 历史验收

- 228 unit tests passed (143 original + 85 clock/configuration/sandbox and pacing tests).
- The same three original-default headless journeys passed again: 463/465/456 rolls.
- 18 original browser-flow + 6 extra screen checks passed. The new editor passed
  31 browser checks; focus, advanced UI, storage-failure feedback and open-panel
  pointer mapping passed 11 more checks. Total: 66 checks in Edge.
- Actual UI configuration 12000 cash and 37/0 land price produced a real
  11963-cash purchase. Only the dice was controlled in this transaction test.
- Actual regeneration preserved 11 handwritten files and unchanged generated
  outputs. Privacy regression checks passed.
- An actual detached portable ZIP passed the same 66 browser checks using its
  included Windows PowerShell server with a system-only PATH: Node and Java were
  unavailable. Runtime identity with the final tagged package is checked by a
  combined payload digest; the candidate commit/hash are recorded explicitly.
- 0.1×/1×/20× produced identical seeded game snapshots, RNG state and diagnostics
  after equal simulation time. A focus regression found during review was fixed:
  mouse-closing settings or resuming from the compact control restores game keys.
- At v0.2.0, storage was approximately 10 MB of tracked source, including 1.8 MB of
  runtime editable assets; the ZIP is approximately 3.1 MB / 5.5 MB extracted.
  These decimal sizes are not additive. Older counts below are historical.

## Historical v0.1.1 validation / v0.1.1 历史验收

- 45 recovered script blocks mapped into editable JavaScript; 259 display definitions.
- Seven characters, 30 purchase tiles, whole-band purchases, buildings, taxes, items,
  traps, hospital branches, both casino variants, 15 fortune branches and bankruptcy.
- 143 source-based controlled tests passed; all 45 script blocks were exercised.
  Script execution coverage is not branch coverage or independent Flash equivalence.
- Three natural headless key-only games reached the winner scene with original
  values. Seeds 5976/42/123456: 463/465/456 rolls. The declared policy deliberately
  invests for P1 and declines investments for P2; no money/position/dice injection.
- 18 browser-flow checks and 6 additional screen checks passed in Edge: real menu
  keys, whole-band purchase, controlled rent bankruptcy, shop, casino, fortune,
  hospital, 600x450/1280x720/1920x1080 scaling, pointer mapping and fullscreen.
  Explicit fixture setup is not described as natural browser-game completion.
- v0.1.1 shortens custom-price confirmation to fit the original narrow message
  field. Configured cost visibility and actual payment are both browser-checked;
  the original empty-override rules and numeric defaults are unchanged.
- Initial menu, custom menu, board, purchase popup and winner were visually
  inspected. Windows PowerShell's loopback server loaded the actual application
  without Node/Java/Flash.
- Shared bitmap extraction removes repeated embedded images without redrawing them.
- Actual regeneration preserved six handwritten/configuration files and produced
  byte-identical generated outputs. Empty extension hooks preserve default rules.
- Privacy scan passed; canary tests detect token/personal-path values and staged
  secrets hidden by a subsequently cleaned working file. A pre-commit hook is included.
- Code has actually been pushed to the public repository:
  <https://github.com/learner20230724/mini-richman-rebuild>.

## Historical v0.1.1 delivery / v0.1.1 历史交付

- A clean public clone rebuilt without the original SWF, FFDec, Java or any
  private local inputs. All 143 unit tests passed; generated outputs were unchanged.
- A detached candidate ZIP passed every manifest/file hash and privacy check.
  It ran using built-in Windows PowerShell with a system-only PATH, without
  Node/Java/Flash visibility. Its recorded browser-flow checks passed against
  that extraction.
- The final portable ZIP is built from an exact committed Git tree and contains
  `release-manifest.json` identifying that commit and hashing all payload files.
- Downloads: <https://github.com/learner20230724/mini-richman-rebuild/releases>.
- v0.1.1 approximate storage: complete source checkout **9.8 MB**, including about
  **1.8 MB** of runtime editable asset files; runtime ZIP about **3.0 MB**, about
  **5.3 MB** extracted. These are decimal MB and are not additive asset/source totals.

## Known limits / 已知边界

Independent original-runtime differential and full pixel equality have not been
proven. The implementation follows recovered scripts and source-derived values;
the tests do not certify every branch or every possible custom configuration.

Custom character values now update both the selection table and runtime state.
Existing map cash labels show configured cash/ranges, and purchase confirmation
shows actual configured cash/diamond costs. Original bitmap diamond icons remain
default artwork; they are not a live numeric representation of custom prices.

## Source limitations / 原文件边界

The pinned SWF contains sound API calls and linkage names but no DefineSound or
streaming-audio tags. No audio has been invented or downloaded from an unrelated
version. The adapter records unavailable-sound calls; the current build is silent.

Browser automation refused file-protocol navigation. Direct-HTML startup is
provided by design but has **not** been certified by that automation. The built-in
PowerShell loopback route has been tested instead; this does not require Node.js.

## Retained failures / 保留的失败

The first unit pass exposed a JS/AVM1 missing-method difference after bankruptcy
and an inconsistent configurable purchase debit. The adapter/code generator was
corrected; the same relevant assertions now pass. One original test incorrectly
gave P2 fewer diamonds than required and was corrected as a fixture mistake.

Natural journey V1 used an always-confirm casino policy. Two games remained
economically alive past the cap; a third repeatedly chose an unaffordable wager
instead of using the available cancel key. Those are retained policy failures,
not evidence that the game's rules should be changed. V2 uses an explicit key-only
investing/declining policy and leaves all original gameplay values intact.

Raw local evidence stays outside publication because it can contain machine paths.
Publishable summaries will be sanitized separately.
