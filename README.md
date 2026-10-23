# Mini Richman

[中文](README.zh-CN.md) · [Customization guide](docs/CUSTOMIZATION.md) · [Default parameters](docs/DEFAULTS.md) · [Delivery status](docs/STATUS.md) · [Downloads](https://github.com/learner20230724/mini-richman-rebuild/releases)

A local two-player board game with seven characters, whole-band property purchases, building upgrades, taxed rent, items, two casino games, fortune events, hospital stays and bankruptcy. The reconstructed game runs in a modern browser without playing a SWF or requiring Flash/Ruffle.

## Play

- Extract the package and double-click `Start-Game.cmd`, or open `public/index.html`. No Node.js, Java or Flash installation is needed.
- If your browser restricts local files, use `Start-Local-Game.cmd`. Built-in Windows PowerShell serves `http://127.0.0.1:18758/`; close its console to stop it. If the port is occupied, close the previous game-server window before restarting.
- Player 1: **A/D** select, **W** confirm/roll, **S** cancel.
- Player 2: **Left/Right** select, **Up** confirm/roll, **Down** cancel.
- The game starts about two seconds after both players confirm. **Alt+Enter** toggles fullscreen. The original aspect ratio is preserved without cropping.
- The original game uses keyboard input. The optional customization panel uses mouse/keyboard; no project banners are placed around the game.

## Configure

Click the **gear** or press **F2** to open the six-page editor. Opening pauses the game by default; you can continue playing while the panel stays open. The panel occupies its own space rather than covering the game.

- Adjust character values, property prices, construction/rent, shop items and timing **without restarting**. By default a valid field applies on blur/Enter; **立即应用本局 (apply now)** applies manually. Applying does not save to the browser.
- Only changed character fields are synchronized to players using that character; other balances and positions stay intact. Prices/rules affect subsequent transactions; active transactions queue the complete update until safe. Paid costs are not recalculated.
- Use the explicit **sandbox** for direct current-player/property edits. Restarting is a separate, confirmed action, not the normal apply path. Advanced source-number keys have additional live-application limits.
- Up to **30 draft undo steps**, **25 named presets**, and JSON import/export with a **2 MiB** size limit. Preset/import/reset batches require explicit application. Local saving keeps rules, not a running match; reuse the same browser/address/port, or transfer via JSON.
- Target speed **0–20×**, in **0.1×** steps: 0 pauses, 1 is the original speed. Single-step advances one original **20 ms** tick. Hidden pages do not accumulate catch-up time.

Read [the customization guide](docs/CUSTOMIZATION.md) for apply/save/reset semantics and sandbox limits. Default gameplay values remain unchanged until you apply custom rules.

For file-based configuration, edit **`public/config/overrides.js`**, then reload:

```js
const RichmanOverrides = {
  characters: { b6: { cash: 12000, bankBonus: 500 } },
  properties: { '1': { cash: 100, diamonds: 0 } },
  numbers: { 'rules.houseCash': 300, 'rules.stepMilliseconds': 400 }
};
if (typeof module !== 'undefined') module.exports = RichmanOverrides;
```

Unspecified settings keep their original values. The editor never rewrites this file. See the [parameter tables](docs/DEFAULTS.md) for IDs, fields and timing units. `data/number-sources.json` links advanced numeric keys to original statements and defaults; these include coordinates/state constants, not only safe business settings. Override them through `numbers` rather than editing generated JavaScript.

A purchase retains the original **whole-band ownership** rule. A per-tile price override changes eligibility and payment when purchasing from that tile, not the set of acquired properties. Regeneration never overwrites `overrides.js` or the handwritten runtime.

## Develop

| Path | Purpose |
|---|---|
| `recovered/scripts/` | Editable recovered gameplay scripts |
| `recovered/game.xml` | Timeline, placement, geometry and script metadata |
| `recovered/shapes/`, `texts/`, `bitmaps/`, `fonts/` | Editable extracted asset sources |
| `public/generated-game.js` | Generated gameplay logic; do not hand-edit |
| `public/runtime.js` | Display tree, timers, input and script-scope adapter |
| `public/app.js` | Canvas renderer, scaling and browser input |
| `public/clock.js` | Fixed-step 0–20× playback clock |
| `public/settings.js` | Configuration validation/application |
| `public/live-settings.js` | Safe in-match updates and timer-progress adaptation |
| `public/config-store.js` | Drafts, presets and explicit browser persistence |
| `public/editor.js`, `public/editor.css` | Human-owned visual editor and layout |
| `public/sandbox.js` | Guarded current-match development controls |
| `public/config/overrides.js` | Human-owned configuration |
| `public/extensions.js` | Human-owned extension hooks |
| `tests/` | Rules, configuration and continuous-game tests |

Development tests need Node.js 18+. Regeneration needs Python 3.9+'s standard library. Neither is needed to play the release package.

```text
npm run build
npm test
npm run test:journey
npm start
python scripts/privacy.py
python scripts/verify-regeneration.py
```

Development server: `http://127.0.0.1:8319/`. Build inputs are included; no original SWF, FFDec installation, network download or developer-private directory is needed.

Enable the pre-commit privacy scan with `git config core.hooksPath .githooks`.
It checks actual Git-index bytes, including a staged-secret/clean-working-tree regression case.

See [delivery status](docs/STATUS.md) for actual verification scope and remaining issues. Rights and redistribution information are separate in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
