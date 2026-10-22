# Delivery status / 交付状态

Updated 2026-10-23, Asia/Shanghai. **Runnable reconstruction v0.1.1; not a claim of
native-Flash or full-pixel equivalence.** [Verification summary](VERIFICATION.json)

## Implemented and checked / 已实现及已检查

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

## Standalone delivery / 独立交付

- A clean public clone rebuilt without the original SWF, FFDec, Java or any
  private local inputs. All 143 unit tests passed; generated outputs were unchanged.
- A detached candidate ZIP passed every manifest/file hash and privacy check.
  It ran using built-in Windows PowerShell with a system-only PATH, without
  Node/Java/Flash visibility. All 22 browser checks passed against that extraction.
- The final portable ZIP is built from an exact committed Git tree and contains
  `release-manifest.json` identifying that commit and hashing all payload files.
- Downloads: <https://github.com/learner20230724/mini-richman-rebuild/releases>.
- Approximate storage: complete source checkout **9.8 MB**, including about
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
