# Mini Richman

[中文](README.zh-CN.md) · [Default parameters and rules](docs/DEFAULTS.md) · [Delivery status](docs/STATUS.md) · [Downloads](https://github.com/learner20230724/mini-richman-rebuild/releases)

A local two-player board game with seven characters, whole-band property purchases, building upgrades, taxed rent, items, two casino games, fortune events, hospital stays and bankruptcy. The reconstructed game runs in a modern browser without playing a SWF or requiring Flash/Ruffle.

## Play

- Extract the package and double-click `Start-Game.cmd`, or open `public/index.html`. No Node.js, Java or Flash installation is needed.
- If your browser restricts local files, use `Start-Local-Game.cmd`. It serves the game on loopback using built-in Windows PowerShell. Close its console window to stop it.
- Player 1: **A/D** select, **W** confirm/roll, **S** cancel.
- Player 2: **Left/Right** select, **Up** confirm/roll, **Down** cancel.
- The game starts about two seconds after both players confirm. **Alt+Enter** toggles fullscreen. The original aspect ratio is preserved without cropping.
- Original interaction is keyboard-only; no new mouse-based gameplay or persistent project banners have been added.

## Configure

Edit **`public/config/overrides.js`**, then reload:

```js
const RichmanOverrides = {
  characters: { b6: { cash: 12000, bankBonus: 500 } },
  properties: { '1': { cash: 100, diamonds: 0 } },
  numbers: { 'rules.houseCash': 300, 'rules.stepMilliseconds': 400 }
};
if (typeof module !== 'undefined') module.exports = RichmanOverrides;
```

Unspecified settings keep their original values. See the [parameter tables](docs/DEFAULTS.md) for IDs, fields and timing units. `data/number-sources.json` links advanced numeric keys to original statements and defaults; override those through `numbers` rather than editing generated JavaScript.

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
| `public/settings.js` | Configuration validation/application |
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
