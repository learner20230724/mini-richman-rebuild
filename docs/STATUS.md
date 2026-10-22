# Delivery status / 交付状态

Updated 2026-10-23, Asia/Shanghai. **In development; not a complete-delivery claim.**

## Implemented and checked / 已实现及已检查

- 45 recovered script blocks mapped into editable JavaScript; 259 display definitions.
- Seven characters, 30 purchase tiles, whole-band purchases, buildings, taxes, items,
  traps, hospital branches, both casino variants, 15 fortune branches and bankruptcy.
- 141 source-based controlled tests passed; all 45 script blocks were exercised.
  Script execution coverage is not branch coverage or independent Flash equivalence.
- Three natural headless key-only games reached the winner scene with original
  values. Seeds 5976/42/123456: 463/465/456 rolls. The declared policy deliberately
  invests for P1 and declines investments for P2; no money/position/dice injection.
- Initial menu and board were visually inspected in Edge. Windows PowerShell's
  loopback server loaded the actual application without Node/Java/Flash.
- Shared bitmap extraction removes repeated embedded images without redrawing them.
- Human configuration and handwritten runtime files are outside generation outputs.

## Remaining acceptance / 待完成验收

- Complete browser interaction matrix, fullscreen/scaled input, winner rendering.
- Custom-value presentation: runtime payments and character stats are configurable,
  but some static menu/map artwork still prints original values.
- Independent original-runtime comparison; no full pixel-equivalence claim.
- Regeneration preservation test, clean-clone rebuild and detached package testing.
- Actual public repository push, immutable matching Release, final privacy audit
  and storage figures. No publication or Release exists at this status checkpoint.

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
