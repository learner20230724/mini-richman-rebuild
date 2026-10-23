(function (root) {
  'use strict';

  const TABS = [['sandbox', '本局沙盒'], ['characters', '角色'], ['properties', '地产'], ['building', '建造租金'], ['shop', '商店道具'], ['advanced', '时间 / 高级']];
  const CHARACTER_FIELDS = [
    ['name', '角色名称', '文字'], ['cash', '现金', '元'], ['overdraft', '透支额度', '元'],
    ['bankBonus', '经过银行奖励', '元 / 次'], ['taxPercent', '收租税率', '%'],
    ['diamonds', '钻石', '颗'], ['stars', '星星', '颗'], ['charms', '护符', '个'], ['mines', '地雷', '个']
  ];
  const RULE_FIELDS = {
    building: [['rules.houseCash', '建造平房费用', '元'], ['rules.upgradeStars', '每次升级消耗', '颗星'], ['rules.rentHouse', '平房租金', '元 / 次'], ['rules.rentTower', '高楼租金', '元 / 次']],
    shop: [['rules.itemCap', '满额兑换数量', '个 / 次'], ['rules.shopDiamondCash', '购买钻石', '元 / 颗'], ['rules.shopDiamondRedeem', '满额钻石兑换', '元 / 次'], ['rules.shopStarCash', '购买星星', '元 / 颗'], ['rules.shopStarRedeem', '满额星星兑换', '元 / 次'], ['rules.shopCharmCash', '购买护符', '元 / 个'], ['rules.shopCharmRedeem', '满额护符兑换', '元 / 次'], ['rules.shopMineCash', '购买地雷', '元 / 个'], ['rules.shopMineRedeem', '满额地雷兑换', '元 / 次']],
    timing: [['rules.diceFaces', '骰子面数', '面'], ['rules.stepMilliseconds', '移动一格间隔', '游戏毫秒'], ['rules.selectionTicks', '选角倒计时次数', '次'], ['rules.selectionTickMilliseconds', '选角倒计时间隔', '游戏毫秒'], ['rules.minuteMilliseconds', '游戏分钟长度', '游戏毫秒']]
  };
  const SANDBOX_FIELDS = [['cash', '现金', '元'], ['overdraft', '透支额度', '元'], ['bankBonus', '银行奖励', '元 / 次'], ['taxPercent', '收租税率', '%'], ['diamonds', '钻石', '颗'], ['stars', '星星', '颗'], ['charms', '护符', '个'], ['mines', '地雷', '个']];
  const clone = value => JSON.parse(JSON.stringify(value));
  const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const valueText = value => typeof value === 'string' ? value : String(value);
  const pathKey = (group, id, field) => [group, id, field].filter(value => value !== undefined).join('.');
  function numberValue(text) {
    if (String(text).trim() === '') throw new Error('数值不能为空。');
    const value = Number(text);
    if (!Number.isFinite(value)) throw new Error('请输入有限数值。');
    return value;
  }
  function filename(name) {
    return 'mini-richman-' + (String(name || 'custom').normalize('NFKC').replace(/[^a-zA-Z0-9\u3400-\u9fff_-]+/g, '-').slice(0, 48) || 'custom') + '.json';
  }

  class RichmanEditor {
    constructor(adapter, options = {}) {
      if (!adapter || !adapter.store || !adapter.defaults) throw new Error('RichmanEditor 需要配置存储与原版参数。');
      this.adapter = adapter;
      this.store = adapter.store;
      this.defaults = adapter.defaults;
      this.doc = options.document || root.document;
      this.win = options.window || root;
      this.opened = false;
      this.activeTab = 'sandbox';
      this.selection = {characters: 'b1', properties: '1', player: 1, tile: '1'};
      this.advancedPage = 0;
      this.advancedSearch = '';
      this.advancedEnabled = false;
      this.undo = [];
      this.invalid = new Map();
      this.previousSpeed = Number(adapter.getSpeed()) || 1;
      this.cleanups = [];
      this.selectedPreset = '';
      this.disposed = false;
      this.autoFieldPending = false;
      this.manualApplyRequired = false;
      this.manualApplyReason = '已载入批量草稿';
      this.liveApplying = false;
      this.lastLiveResult = null;
      this.build();
      this.on(this.win, 'keydown', event => {
        if (event.key === 'F2') { event.preventDefault(); event.stopImmediatePropagation(); this.toggle(); }
        else if (event.key === 'Escape' && this.opened) { event.preventDefault(); event.stopImmediatePropagation(); this.close(); }
      }, true);
      this.timer = this.win.setInterval(() => this.refreshPlayback(), 250);
      this.refreshPlayback();
      this.refreshState();
      if (this.store.warnings && this.store.warnings.length) this.notice('配置提示：' + this.store.warnings.at(-1), true);
    }
    node(tag, className, text) {
      const element = this.doc.createElement(tag);
      if (className) element.className = className;
      if (text !== undefined) element.textContent = String(text);
      return element;
    }
    on(element, type, callback, options) {
      element.addEventListener(type, callback, options);
      this.cleanups.push(() => element.removeEventListener(type, callback, options));
      return element;
    }
    button(text, callback, className = '') {
      const button = this.node('button', 'rm-editor-button ' + className, text);
      button.type = 'button';
      if (/^(撤销|草稿恢复|原版$|导入 JSON$)/.test(text)) button.dataset.draftOnly = 'true';
      button.addEventListener('click', () => this.action(callback));
      return button;
    }
    select(options, selected, label, callback) {
      const select = this.node('select');
      select.setAttribute('aria-label', label);
      for (const [value, text] of options) {
        const option = this.node('option', '', text); option.value = String(value); select.appendChild(option);
      }
      select.value = String(selected);
      if (callback) select.addEventListener('change', () => this.action(() => callback(select.value)));
      return select;
    }
    label(text, input) {
      const label = this.node('label', 'rm-editor-label'); label.append(this.node('span', '', text), input); return label;
    }
    note(text, className = '') { return this.node('p', 'rm-editor-note ' + className, text); }
    notice(text, error = false) {
      this.message.textContent = text || '';
      delete this.message.dataset.liveFeedback;
      this.message.classList.toggle('rm-editor-error', error);
      this.message.setAttribute('role', error ? 'alert' : 'status');
    }
    async action(callback) {
      try { await callback(); }
      catch (error) { this.notice(String(error && error.message || error), true); }
    }
    checkValid() {
      if (!this.invalid.size) return;
      const [key, invalid] = this.invalid.entries().next().value;
      const input = this.panel.querySelector('[data-field="' + key + '"]');
      if (input) input.focus();
      throw new Error(invalid.message);
    }
    remember() { this.undo.push(clone(this.store.current)); if (this.undo.length > 30) this.undo.shift(); }
    isDirty() { return !!this.invalid.size || !!this.store.stats().draftChanged; }
    confirmReplace(message) { return !this.isDirty() || this.win.confirm(message + '\n当前草稿会被替换；不会自动应用或保存。'); }
    stageBulkDraft(reason = '已载入批量草稿') { this.manualApplyRequired = true; this.manualApplyReason = reason; this.autoFieldPending = false; }
    replace(next, message) {
      this.remember(); this.store.replace(next); this.invalid.clear(); this.stageBulkDraft('已撤销或恢复配置草稿'); this.render(); this.refreshState(); this.notice(message);
    }
    refreshFields() { for (const row of this.content.querySelectorAll('.rm-editor-field')) row.richmanRefreshState?.(); }
    async applyCurrentLive(automatic = false) {
      this.checkValid();
      if (automatic && (!this.autoApplyCheck.checked || this.manualApplyRequired || !this.autoFieldPending)) return;
      if (this.liveApplying) { if (!automatic) throw new Error('正在提交本局配置，请稍候。'); return; }
      if (typeof this.adapter.applyLive !== 'function') throw new Error('当前运行适配层不支持本局即时应用。');
      this.liveApplying = true; this.refreshState();
      try {
        const config = clone(this.store.current);
        const result = await this.adapter.applyLive(config);
        this.lastLiveResult = result || {};
        this.autoFieldPending = false;
        this.manualApplyRequired = false;
        this.refreshFields();
        const pending = !!this.lastLiveResult.pending;
        const reason = this.lastLiveResult.reason ? '：' + this.lastLiveResult.reason : '';
        this.notice(pending ? '配置已提交，正在等待安全点' + reason + '。不会重新开局或自动保存。' : this.lastLiveResult.deferred ? '本局可更新的配置已应用；部分源脚本参数只在后续读取或新局生效。未自动保存。' : (automatic ? '已自动应用本局' : '已立即应用本局') + '；保留当前进度，未自动保存。');
        this.message.dataset.liveFeedback = 'true';
      } finally { this.liveApplying = false; this.refreshState(); }
    }
    commitAutoField() {
      if (this.suppressAutoCommit) return;
      if (!this.autoFieldPending || !this.autoApplyCheck.checked || this.manualApplyRequired) return;
      if (this.invalid.size) { this.notice('仍有无效输入，已保留草稿，未自动提交本局。', true); return; }
      return this.applyCurrentLive(true);
    }
    refreshLiveStatus(status) {
      if (!this.liveStatus || !this.autoHint) return;
      const live = status && status.liveSettings || this.lastLiveResult || {};
      const pending = !!live.pending;
      if (this.lastDisplayedPending && !pending && this.message?.dataset.liveFeedback === 'true') {
        this.notice(live.deferred || live.lastResult?.deferred ? '排队配置已在安全点应用；仍有源参数仅在后续读取或新局生效。未自动保存。' : '排队配置已在安全点应用；对局进度保留，未自动保存。');
        this.message.dataset.liveFeedback = 'true';
      }
      this.lastDisplayedPending = pending;
      let text;
      if (this.liveApplying) text = '正在提交本局配置…';
      else if (pending) text = '等待安全点，本次配置尚未生效：' + (live.reason || '当前操作需要先结束。') + ' 完成当前移动 / 弹窗后自动生效；手动设为 0 倍暂停时请先继续游戏。';
      else if (live.deferred || live.lastResult?.deferred) text = '本局配置已更新；部分源数字仅在后续读取或重新开局生效。';
      else text = '本局即时应用保留位置、回合和未修改的资源；存储仍需单独保存。';
      this.liveStatus.textContent = text; this.liveStatus.dataset.pending = String(pending); this.liveStatus.classList.toggle('rm-editor-pending', pending);
      if (this.cancelPendingButton) { this.cancelPendingButton.hidden = !pending; this.cancelPendingButton.disabled = typeof this.adapter.cancelPending !== 'function'; }
      this.autoHint.textContent = this.manualApplyRequired ? this.manualApplyReason + '，点“立即应用本局”生效。即使再改小字段或关闭设置，也不会自动提交这份待确认草稿。' : this.autoApplyCheck.checked ? '合法字段在失焦或 Enter 确认后自动提交本局；输入过程不提交，也不会自动保存。' : '自动应用已关闭：修改仅保留为草稿，请点“立即应用本局”。';
      this.autoHint.classList.toggle('rm-editor-pending', this.manualApplyRequired);
    }
    effective(config, group, id, field) {
      if (group === 'numbers') return config.numbers && Object.hasOwn(config.numbers, id) ? config.numbers[id] : this.defaults.numbers[id];
      return config[group] && config[group][id] && Object.hasOwn(config[group][id], field) ? config[group][id][field] : this.defaults[group][id][field];
    }
    build() {
      this.entry = this.node('div', 'rm-editor-entry');
      this.gear = this.button('⚙ 设置', () => this.open()); this.gear.title = '自定义规则与沙盒 · F2';
      this.gear.setAttribute('aria-controls', 'rm-editor-panel'); this.gear.setAttribute('aria-expanded', 'false');
      this.compactSpeed = this.button('', () => {this.setSpeed(this.adapter.getSpeed() === 0 ? this.previousSpeed : 0);this.doc.getElementById('game')?.focus();}, 'rm-editor-compact-speed');
      this.compactSpeed.title = '暂停 / 恢复；更多倍速请打开设置';
      this.entry.append(this.gear, this.compactSpeed);
      this.overlay = this.node('div', 'rm-editor-overlay'); this.overlay.hidden = true;
      this.panel = this.node('section', 'rm-editor-panel'); this.panel.id = 'rm-editor-panel';
      this.panel.tabIndex = -1; this.panel.setAttribute('role', 'complementary'); this.panel.setAttribute('aria-labelledby', 'rm-editor-title');
      this.overlay.appendChild(this.panel);
      const header = this.node('header', 'rm-editor-header');
      const title = this.node('h1', '', '自定义规则与沙盒'); title.id = 'rm-editor-title';
      header.append(title, this.button('关闭 · Esc', () => this.close())); this.panel.appendChild(header);
      // Stop before the game's window bubble listeners without suppressing
      // native text editing or the tab list's own keyboard handling.
      for (const type of ['keydown', 'keyup', 'keypress']) this.on(this.panel, type, event => {
        if (event.key !== 'F2' && event.key !== 'Escape') event.stopPropagation();
      });
      // A click on a draft-only action must not first blur-commit the field the
      // user is about to undo, replace or import over.
      this.on(this.panel, 'pointerdown', event => {
        if (event.target.closest?.('[data-draft-only],select[aria-label="命名预设"]')) {
          this.suppressAutoCommit = true;
          this.win.setTimeout(() => { this.suppressAutoCommit = false; }, 0);
        }
      }, true);
      const speed = this.node('section', 'rm-editor-speed'); speed.setAttribute('aria-label', '游戏速度');
      this.playbackStatus = this.node('strong', 'rm-editor-playback-status'); speed.appendChild(this.playbackStatus);
      const speedInputs = this.node('div', 'rm-editor-speed-inputs');
      this.speedRange = this.node('input'); this.speedRange.type = 'range'; this.speedRange.min = '0'; this.speedRange.max = '20'; this.speedRange.step = '0.1'; this.speedRange.setAttribute('aria-label', '游戏速度，0 到 20 倍'); this.speedRange.dataset.speedRange = 'true';
      this.speedNumber = this.node('input'); this.speedNumber.type = 'number'; this.speedNumber.min = '0'; this.speedNumber.max = '20'; this.speedNumber.step = '0.1'; this.speedNumber.setAttribute('aria-label', '游戏速度倍数'); this.speedNumber.dataset.speedNumber = 'true';
      this.speedRange.addEventListener('input', () => this.action(() => this.setSpeed(numberValue(this.speedRange.value))));
      this.speedNumber.addEventListener('change', () => this.action(() => this.setSpeed(numberValue(this.speedNumber.value))));
      this.speedNumber.addEventListener('keydown', event => {
        if (event.key === 'Enter' && !event.isComposing) { event.preventDefault(); this.action(() => this.setSpeed(numberValue(this.speedNumber.value))); }
      });
      speedInputs.append(this.speedRange, this.speedNumber, this.node('span', '', '倍')); speed.appendChild(speedInputs);
      const shortcuts = this.node('div', 'rm-editor-inline rm-editor-speed-shortcuts');
      for (const multiplier of [0, 1, 2, 5, 10, 20]) {
        const button = this.button(multiplier + '×', () => this.setSpeed(multiplier)); button.dataset.speed = String(multiplier); shortcuts.appendChild(button);
      }
      this.pauseButton = this.button('暂停', () => this.setSpeed(this.adapter.getSpeed() === 0 ? this.previousSpeed : 0)); this.pauseButton.dataset.pauseSpeed = 'true';
      this.stepButton = this.button('单步 · 20ms', () => { this.adapter.stepOnce(); this.refreshPlayback(); }); this.stepButton.dataset.singleStep = 'true';
      shortcuts.append(this.pauseButton, this.stepButton); speed.appendChild(shortcuts);
      speed.appendChild(this.note('调速即刻生效，0 倍暂停。点击棋盘可继续键盘操作。', 'rm-editor-speed-hint'));
      this.autoApplyCheck = this.node('input'); this.autoApplyCheck.type = 'checkbox'; this.autoApplyCheck.checked = true; this.autoApplyCheck.dataset.autoApply = 'true';
      this.autoApplyCheck.addEventListener('change', () => { this.refreshState(); });
      const autoLabel = this.label('修改后自动应用本局（不自动保存）', this.autoApplyCheck); autoLabel.classList.add('rm-editor-checkbox'); speed.appendChild(autoLabel);
      this.autoHint = this.note('', 'rm-editor-auto-hint'); this.autoHint.dataset.autoApplyHint = 'true'; speed.appendChild(this.autoHint);
      this.panel.appendChild(speed);
      this.buildPresets();
      this.nav = this.node('nav', 'rm-editor-tabs'); this.nav.setAttribute('role', 'tablist'); this.nav.setAttribute('aria-label', '配置分类');
      this.tabButtons = new Map();
      for (const [key, text] of TABS) {
        const button = this.button(text, () => { this.activeTab = key; this.render(); });
        button.setAttribute('role', 'tab'); button.id = 'rm-editor-tab-' + key; button.setAttribute('aria-controls', 'rm-editor-content'); button.dataset.tab = key;
        this.nav.appendChild(button); this.tabButtons.set(key, button);
      }
      this.nav.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        const keys = TABS.map(tab => tab[0]), index = keys.indexOf(this.activeTab);
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? keys.length - 1 : (index + (event.key === 'ArrowLeft' ? -1 : 1) + keys.length) % keys.length;
        event.preventDefault(); this.activeTab = keys[next]; this.render(); this.tabButtons.get(this.activeTab).focus();
      });
      this.panel.appendChild(this.nav);
      this.content = this.node('div', 'rm-editor-content'); this.content.id = 'rm-editor-content'; this.content.setAttribute('role', 'tabpanel');
      this.panel.appendChild(this.content);
      this.message = this.node('p', 'rm-editor-message'); this.message.setAttribute('aria-live', 'polite'); this.message.setAttribute('role', 'status'); this.panel.appendChild(this.message);
      const footer = this.node('footer', 'rm-editor-footer');
      this.stateLabel = this.node('p', 'rm-editor-state'); this.stateLabel.dataset.configState = 'true'; footer.appendChild(this.stateLabel);
      this.liveStatus = this.node('p', 'rm-editor-live-status'); this.liveStatus.dataset.liveStatus = 'true'; this.liveStatus.setAttribute('aria-live', 'polite'); footer.appendChild(this.liveStatus);
      this.cancelPendingButton = this.button('取消待应用', async () => {
        if (typeof this.adapter.cancelPending !== 'function') throw new Error('当前适配层不支持取消待应用。');
        await this.adapter.cancelPending(); this.lastDisplayedPending = false; this.lastLiveResult = null; this.stageBulkDraft('已取消本次待应用配置'); this.refreshState(); this.notice('已取消待应用；本局保持原样，草稿仍保留。需要应用时请再次点击“立即应用本局”。');
      }, 'rm-editor-small'); this.cancelPendingButton.dataset.cancelPending = 'true'; this.cancelPendingButton.hidden = true; footer.appendChild(this.cancelPendingButton);
      const applyRow = this.node('div', 'rm-editor-inline');
      this.applyButton = this.button('立即应用本局', () => this.applyCurrentLive(false), 'rm-editor-primary'); this.applyButton.dataset.applyConfig = 'true';
      this.restartButton = this.button('按配置重新开局', async () => {
        this.checkValid();
        if (!this.win.confirm('按当前草稿重新开局？当前对局进度将丢失。\n仅想修改当前游戏请取消，使用“立即应用本局”。不会自动保存到本机。')) return;
        await this.adapter.apply(clone(this.store.current)); this.autoFieldPending = false; this.manualApplyRequired = false; this.lastLiveResult = null; this.refreshState(); this.render(); this.notice('已按草稿重新开局。需要下次启动继续使用时，请单独点击“保存已应用到本机”。');
      }); this.restartButton.dataset.restartConfig = 'true';
      this.saveButton = this.button('保存已应用到本机', () => {
        const saved = this.store.saveActive(); this.refreshState();
        this.notice(saved === false || this.store.lastSaveSucceeded === false ? '无法保存到本机：当前规则只保留在本页面内存。请导出 JSON 备份；尚未应用的草稿也未保存。' : '已保存当前已应用规则。尚未应用的草稿不在本次保存内。', saved === false || this.store.lastSaveSucceeded === false);
      }); this.saveButton.dataset.saveActive = 'true';
      applyRow.append(this.applyButton, this.saveButton); footer.appendChild(applyRow);
      const tools = this.node('div', 'rm-editor-inline');
      this.undoButton = this.button('撤销一项', () => { if (!this.undo.length) return; this.store.replace(this.undo.pop()); this.invalid.clear(); this.stageBulkDraft('已撤销草稿修改'); this.render(); this.refreshState(); this.notice('已撤销一项草稿修改，未改变本局；点击“立即应用本局”才提交。'); });
      tools.append(this.undoButton, this.button('撤销到已应用', () => { if (this.confirmReplace('撤销草稿到本局已应用的规则？')) this.replace(this.store.active, '草稿已回到已应用规则。'); }));
      tools.appendChild(this.restartButton);
      const reset = this.node('details', 'rm-editor-reset'); reset.appendChild(this.node('summary', '', '恢复 / 清除设置'));
      const resetTools = this.node('div', 'rm-editor-inline');
      resetTools.append(
        this.button('草稿恢复文件基准', () => { if (this.confirmReplace('将草稿恢复为 config/overrides.js 文件基准？')) this.replace(this.store.fileBase, '草稿已恢复文件基准；未改变本局和本机保存。'); }),
        this.button('草稿恢复原版', () => { if (this.confirmReplace('将草稿全部恢复为原版数值？')) this.replace({}, '草稿已恢复原版默认；未改变本局和本机保存。'); }),
        this.button('清除本机已应用保存', () => {
          if (!this.win.confirm('清除本机保存的已应用规则？下次启动使用 overrides.js 文件基准。\n当前本局、草稿和命名预设保持不变。')) return;
          let cleared;
          if (typeof this.store.clearSaved === 'function') cleared = this.store.clearSaved();
          else throw new Error('当前配置存储尚不支持安全清除；本局与草稿保持不变。');
          this.refreshState(); this.notice(cleared === false ? '本机存储不可写，未能清除。本局、草稿和命名预设保持不变。' : '已清除本机已应用规则；当前本局、草稿和命名预设保持不变。', cleared === false);
        })
      ); reset.appendChild(resetTools); footer.append(tools, reset); this.panel.appendChild(footer);
      this.doc.body.append(this.entry, this.overlay);
      this.render();
    }
    buildPresets() {
      const details = this.node('details', 'rm-editor-presets'); details.appendChild(this.node('summary', '', '命名预设 / 导入导出（最多 25 份）'));
      this.presetSelect = this.select([['', '选择命名预设']], '', '命名预设', name => {
        if (!name) { this.selectedPreset = ''; this.presetName.value = ''; return; }
        if (!this.confirmReplace('加载命名预设“' + name + '”？')) { this.presetSelect.value = this.selectedPreset; return; }
        this.remember(); this.store.loadPreset(name); this.invalid.clear(); this.stageBulkDraft(); this.selectedPreset = name; this.presetName.value = name;
        this.render(); this.refreshState(); this.notice('已载入预设到批量草稿；点击“立即应用本局”生效，未自动应用或保存启动规则。');
      });
      this.presetName = this.node('input'); this.presetName.type = 'text'; this.presetName.maxLength = 48; this.presetName.placeholder = '给这套规则命名（1–48 字符）'; this.presetName.setAttribute('aria-label', '预设名称');
      details.append(this.label('已保存预设', this.presetSelect), this.label('预设名称', this.presetName));
      const buttons = this.node('div', 'rm-editor-inline');
      buttons.append(
        this.button('保存命名草稿', () => { this.checkValid(); const name = this.presetName.value.trim(); if (!name) throw new Error('请填写预设名称。'); if (this.store.listPresets().some(preset => preset.name === name) && !this.win.confirm('覆盖同名预设“' + name + '”？')) return; this.store.savePreset(name, this.store.current); this.selectedPreset = name; this.refreshPresets(); this.refreshState(); this.notice(this.store.lastSaveSucceeded === false ? '预设仅保存在当前页面内存，未保存本机。请导出 JSON 备份。' : '已保存命名草稿；未改变本局或启动规则。', this.store.lastSaveSucceeded === false); }),
        this.button('删除命名预设', () => { const name = this.selectedPreset; if (!name) throw new Error('请先选择要删除的预设。'); if (!this.win.confirm('删除命名预设“' + name + '”？当前草稿保持不变。')) return; this.store.removePreset(name); this.selectedPreset = ''; this.refreshPresets(); this.refreshState(); this.notice(this.store.lastSaveSucceeded === false ? '仅从当前页面内存删除；本机保存更新失败，刷新后可能重新出现。当前草稿保持不变。' : '已删除命名预设；当前草稿保持不变。', this.store.lastSaveSucceeded === false); })
      );
      this.importInput = this.node('input', 'rm-editor-file'); this.importInput.type = 'file'; this.importInput.accept = '.json,application/json'; this.importInput.tabIndex = -1;
      this.importInput.addEventListener('change', () => this.action(async () => {
        try {
          const file = this.importInput.files && this.importInput.files[0]; if (!file) return;
          if (file.size > 2 * 1024 * 1024) throw new Error('JSON 文件超过 2 MiB，未读取或导入。');
          const text = await file.text();
          if (!this.confirmReplace('导入 JSON 到草稿？')) return;
          const before = clone(this.store.current); this.store.importJSON(text); this.undo.push(before); if (this.undo.length > 30) this.undo.shift();
          this.invalid.clear(); this.stageBulkDraft(); this.selectedPreset = ''; this.render(); this.refreshPresets(); this.refreshState(); this.notice('JSON 已校验并载入批量草稿；点击“立即应用本局”生效，未自动应用或保存。');
        } finally { this.importInput.value = ''; }
      }));
      buttons.append(this.button('导入 JSON', () => this.importInput.click()), this.button('导出草稿 JSON', () => {
        this.checkValid();
        const blob = new this.win.Blob([this.store.exportJSON()], {type: 'application/json;charset=utf-8'});
        const url = this.win.URL.createObjectURL(blob), link = this.node('a'); link.href = url; link.download = filename(this.presetName.value); this.doc.body.appendChild(link); link.click(); link.remove(); this.win.setTimeout(() => this.win.URL.revokeObjectURL(url), 1000); this.notice('已导出当前草稿；导出不会应用或保存启动规则。');
      }));
      details.append(buttons, this.importInput); this.panel.appendChild(details); this.refreshPresets();
    }
    refreshPresets() {
      this.presetSelect.replaceChildren();
      for (const [value, text] of [['', '选择命名预设'], ...this.store.listPresets().map(preset => [preset.name, preset.name])]) {
        const option = this.node('option', '', text); option.value = value; this.presetSelect.appendChild(option);
      }
      this.presetSelect.value = this.selectedPreset;
    }
    refreshState(status = this.adapter.getStatus ? this.adapter.getStatus() : {}) {
      const stats = this.store.stats();
      this.stateLabel.textContent = (status.liveSettings?.pending ? '◷ 配置已提交，等待安全点' : stats.draftChanged || this.invalid.size ? '● 草稿未应用' : '✓ 草稿与已应用配置一致') + ' · ' + (stats.unsavedChanges ? '已应用规则未保存到本机' : '已应用规则与本机保存一致') + ' · 偏离原版 ' + stats.changed + ' 项' + (this.invalid.size ? ' · 无效输入 ' + this.invalid.size + ' 项' : '');
      this.stateLabel.dataset.dirty = String(!!(stats.draftChanged || this.invalid.size));
      this.undoButton.disabled = !this.undo.length;
      this.applyButton.disabled = !!this.invalid.size || this.liveApplying;
      this.restartButton.disabled = !!this.invalid.size || this.liveApplying;
      this.refreshLiveStatus(status);
    }
    setSpeed(speed) {
      if (!Number.isFinite(speed) || speed < 0 || speed > 20) throw new Error('速度必须在 0 到 20 倍之间。');
      if (Math.abs(speed * 10 - Math.round(speed * 10)) > 1e-7) throw new Error('速度步进为 0.1 倍，例如 1.0、1.1。');
      speed = Math.round(speed * 10) / 10;
      this.adapter.setSpeed(speed); if (speed > 0) this.previousSpeed = speed; this.refreshPlayback();
    }
    refreshPlayback() {
      if (this.disposed) return;
      const speed = Number(this.adapter.getSpeed()), status = this.adapter.getStatus ? this.adapter.getStatus() : {};
      if (speed > 0) this.previousSpeed = speed;
      this.playbackStatus.textContent = speed === 0 ? '已手动暂停 · 0×' : '运行中 · ' + speed.toFixed(1).replace(/\.0$/, '') + '×';
      this.compactSpeed.textContent = speed === 0 ? '▶ 恢复' : speed.toFixed(1).replace(/\.0$/, '') + '× Ⅱ';
      this.pauseButton.textContent = speed === 0 ? '继续 ' + this.previousSpeed + '×' : '暂停';
      if (this.doc.activeElement !== this.speedNumber) this.speedNumber.value = String(speed);
      this.speedRange.value = String(speed);
      this.stepButton.disabled = speed !== 0;
      this.panel.dataset.userSpeed = String(speed);
      this.refreshState(status); this.refreshFields();
    }
    open() {
      if (this.opened) return;
      this.previousFocus = this.doc.activeElement;
      this.opened = true; this.overlay.hidden = false; this.entry.hidden = true;
      this.doc.body.classList.add('richman-editor-open'); this.gear.setAttribute('aria-expanded', 'true');
      this.refreshPlayback(); this.render(); this.panel.focus();
      this.win.dispatchEvent(new this.win.Event('resize'));
    }
    close(commitPending = true) {
      if (!this.opened) return;
      if (commitPending) this.action(() => this.commitAutoField());
      this.opened = false; this.overlay.hidden = true; this.entry.hidden = false;
      this.doc.body.classList.remove('richman-editor-open'); this.gear.setAttribute('aria-expanded', 'false');
      this.refreshPlayback();
      const focus=this.previousFocus&&this.previousFocus.isConnected&&!this.previousFocus.closest?.('.rm-editor-entry,.rm-editor-overlay')?this.previousFocus:this.doc.getElementById('game')||this.gear;focus.focus();
      this.win.dispatchEvent(new this.win.Event('resize'));
    }
    toggle() { this.opened ? this.close() : this.open(); }
    render() {
      this.content.replaceChildren();
      for (const [key, button] of this.tabButtons) { const selected = key === this.activeTab; button.setAttribute('aria-selected', String(selected)); button.tabIndex = selected ? 0 : -1; }
      this.content.setAttribute('aria-labelledby', 'rm-editor-tab-' + this.activeTab);
      if (this.activeTab === 'sandbox') this.renderSandbox();
      else if (this.activeTab === 'characters') this.renderCharacters();
      else if (this.activeTab === 'properties') this.renderProperties();
      else if (this.activeTab === 'advanced') this.renderAdvanced();
      else {
        this.content.appendChild(this.note(this.activeTab === 'building' ? '本局应用后，下次建造、升级或收租使用新规则；当前交易弹窗未结束时先排队，不改已结算交易。别墅仍用原版轮盘，租金扣角色税率且不额外取整。' : '本局应用后，下次购买 / 满额兑换使用新规则；当前商店或事件弹窗结束后安全应用，不改已完成交易。满额兑换仍需商店确认触发。'));
        for (const [key, label, unit] of RULE_FIELDS[this.activeTab]) this.field(this.content, 'numbers', key, undefined, label, unit);
      }
      this.refreshState();
    }
    field(parent, group, id, field, label, unit) {
      const key = pathKey(group, id, field), original = this.effective({}, group, id, field);
      const input = this.node('input'); input.type = typeof original === 'number' ? 'number' : 'text';
      if (input.type === 'number') input.step = 'any'; else input.maxLength = 80;
      const rule = root.RichmanSettings && typeof root.RichmanSettings.fieldRule === 'function' ? root.RichmanSettings.fieldRule(this.defaults, group, id, field) : null;
      if (rule) { if (rule.min !== undefined) input.min = String(rule.min); if (rule.max !== undefined) input.max = String(rule.max); if (rule.integer) input.step = '1'; }
      input.dataset.field = key; input.setAttribute('aria-label', label + '（' + unit + '）');
      const invalid = this.invalid.get(key); input.value = invalid ? invalid.value : valueText(this.store.get(group, id, field));
      if (invalid) { input.setAttribute('aria-invalid', 'true'); input.title = invalid.message; }
      const row = this.node('div', 'rm-editor-field'), heading = this.node('label', 'rm-editor-field-label');
      input.id = 'rm-field-' + key.replace(/[^a-zA-Z0-9_-]/g, '-'); heading.htmlFor = input.id; heading.append(this.node('span', '', label), this.node('small', '', unit));
      const meta = this.node('small', 'rm-editor-field-meta');
      const updateMeta = () => {
        const applied = this.effective(this.store.active, group, id, field), value = this.store.get(group, id, field);
        meta.textContent = '原版 ' + valueText(original) + ' · 已应用配置 ' + valueText(applied) + ' · 草稿 ' + (this.invalid.has(key) ? '输入无效' : valueText(value)) + (rule ? ' · 范围 '+(rule.type==='string'?'1–24字':rule.min+'～'+rule.max+(rule.integer?' 整数':'')) : '') + ' · ' + this.fieldEffect(group, id);
        row.classList.toggle('rm-editor-changed', this.invalid.has(key) || value !== applied);
      };
      row.richmanRefreshState = updateMeta;
      input.addEventListener('input', () => {
        this.autoFieldPending = true;
        try {
          const value = typeof original === 'number' ? numberValue(input.value) : input.value;
          const before = clone(this.store.current);
          if (group === 'numbers') this.store.set(group, id, value); else this.store.set(group, id, field, value);
          if (!equal(before, this.store.current)) { this.undo.push(before); if (this.undo.length > 30) this.undo.shift(); }
          this.invalid.delete(key); input.removeAttribute('aria-invalid'); input.title = '';
        } catch (error) { const message = label + '：' + String(error.message || error); this.invalid.set(key, {value: input.value, message}); input.setAttribute('aria-invalid', 'true'); input.title = message; this.notice(message, true); }
        updateMeta(); this.refreshState();
      });
      input.addEventListener('change', () => this.action(() => this.commitAutoField()));
      input.addEventListener('keydown', event => {
        if (event.key === 'Enter' && !event.isComposing) { event.preventDefault(); this.action(() => this.commitAutoField()); }
      });
      const originalButton = this.button('原版', () => {
        this.remember(); this.store.remove(group, id, field); this.invalid.delete(key); this.stageBulkDraft('此字段已恢复原版草稿'); input.value = valueText(this.store.get(group, id, field)); input.removeAttribute('aria-invalid'); input.title = ''; updateMeta(); this.refreshState(); this.notice('此字段已恢复原版草稿；点击“立即应用本局”生效。');
      }, 'rm-editor-small'); originalButton.title = '仅此字段草稿恢复原版；未改变本局';
      row.append(heading, input, originalButton, meta); updateMeta(); parent.appendChild(row);
    }
    fieldEffect(group, id) {
      if (group === 'characters') return '已选用此角色：安全点只设置已改字段；未选用：下次选用生效';
      if (group === 'properties') return '购地价格在安全点更新；交易弹窗关闭后应用，不追溯已支付价格';
      if (id.startsWith('src.s40.')) return '棋盘初始化源值：已经执行的初始化不回写，本局对应字段需新局';
      if (id.startsWith('src.')) return '安全点替换后续源值读取；不重跑初始化，不回写已建对象';
      if (id === 'rules.diceFaces') return '下次掷骰生效；当前点数和剩余步数保持不变';
      if (id === 'rules.stepMilliseconds') return '保持已走步数，活动移动计时按剩余比例换算';
      if (/Milliseconds$/.test(id)) return '相关活动计时按剩余比例换算；保留已发生事件';
      if (id === 'rules.selectionTicks') return '选角中按剩余比例换算次数；棋盘中用于下次选角，不重开场景';
      return '下次相关费用 / 租金 / 物品计算生效；当前交易弹窗结束后应用';
    }
    renderCharacters() {
      const selector = this.select(Object.entries(this.defaults.characters).map(([id, character]) => [id, id + ' · ' + character.name]), this.selection.characters, '选择角色', id => { this.selection.characters = id; this.render(); });
      this.content.append(this.label('编辑角色', selector), this.note('当前选中角色的已修改字段会直接设置到使用该角色的玩家；其他资源、位置和回合不变。现金修改是“设为此值”，不是增加差额。未上场角色保留为下次选用规则；弹窗或移动时等待安全点。'));
      for (const [key, label, unit] of CHARACTER_FIELDS) this.field(this.content, 'characters', this.selection.characters, key, label, unit);
    }
    renderProperties() {
      const ids = Object.keys(this.defaults.properties).sort((a, b) => Number(a) - Number(b));
      this.content.append(this.label('地产编号', this.select(ids.map(id => [id, '地产 ' + id]), this.selection.properties, '选择地产', id => { this.selection.properties = id; this.render(); })), this.note('共 30 块可购地产。原版买地会取得整组所有权，但按停留地块的价格支付一次；这里只改该编号价格，不会默默改整组。'));
      this.field(this.content, 'properties', this.selection.properties, 'cash', '购地现金', '元 / 次');
      this.field(this.content, 'properties', this.selection.properties, 'diamonds', '购地钻石', '颗 / 次');
      this.content.appendChild(this.note('新价格可应用当前对局，交易弹窗未结束时先排队，不追溯已付费用。地图钻石图标保留原画，实际价格以购地确认提示为准。所有权和建筑等级使用“本局沙盒”。'));
    }
    renderSandbox() {
      const status = this.adapter.getStatus ? this.adapter.getStatus() : {};
      this.content.appendChild(this.note('本局调试：不是原版功能，不会写进配置或预设。只在棋盘稳定、没有移动和弹窗时可用；即时应用配置不重开对局，但明确“按配置重新开局”会清除本局修改。', 'rm-editor-warning'));
      this.sandboxSummary=this.note('');this.content.appendChild(this.sandboxSummary);
      this.content.appendChild(this.button('刷新本局数值', () => this.render()));
      const players = status.players || [], selected = players.find(player => Number(player.id || player.player) === this.selection.player) || players[this.selection.player - 1] || {};
      this.content.appendChild(this.label('本局玩家', this.select([[1, '玩家 1' + (players[0] && players[0].name ? ' · ' + players[0].name : '')], [2, '玩家 2' + (players[1] && players[1].name ? ' · ' + players[1].name : '')]], this.selection.player, '本局玩家', player => { this.selection.player = Number(player); this.render(); })));
      const inputs = new Map();
      for (const [key, label, unit] of SANDBOX_FIELDS) {
        const input = this.node('input'); input.type = 'number'; input.step = ['cash', 'overdraft', 'bankBonus', 'taxPercent'].includes(key) ? 'any' : '1'; input.value = selected[key] === undefined ? '' : String(selected[key]); input.dataset.sandboxField = key;
        this.content.appendChild(this.label(label + '（' + unit + '）', input)); inputs.set(key, input);
      }
      this.content.appendChild(this.note('住院计数：' + (selected.hospital === undefined ? '尚未开始' : selected.hospital) + '（回合计数，只读；不同原版分支语义不同）'));
      const playerApply = this.button('修改本局玩家数值', async () => {
        const values = {}; for (const [key, input] of inputs) values[key] = numberValue(input.value);
        await this.adapter.sandbox('player', {player: this.selection.player, values}); this.render(); this.notice('已修改本局玩家；配置草稿与启动规则未改变。');
      }); playerApply.disabled = status.canEdit === false; this.content.appendChild(playerApply);
      if (status.canEdit === false) this.content.appendChild(this.note('当前不可修改：' + (status.reason || '请在稳定待掷骰界面刷新数值。')));
      this.content.appendChild(this.node('h2', '', '本局地产所有权 / 建筑'));
      const ids = Object.keys(this.defaults.properties).sort((a, b) => Number(a) - Number(b));
      this.content.appendChild(this.label('地产编号', this.select(ids.map(id => [id, '地产 ' + id]), this.selection.tile, '本局地产编号', id => { this.selection.tile = id; this.render(); })));
      const property = (status.properties || []).find(item => String(item.id) === this.selection.tile) || {};
      const owner = this.select([[0, '无主'], [1, '玩家 1'], [2, '玩家 2']], property.owner || 0, '本局地产所有者');
      const level = this.select([[0, '0 · 空地'], [1, '1 · 平房'], [2, '2 · 高楼'], [3, '3 · 别墅'], [4, '4 · 地雷']], property.level || 0, '本局建筑等级');
      const propertyApply = this.button('修改本局这块地产', async () => {
        await this.adapter.sandbox('property', {id: Number(this.selection.tile), owner: Number(owner.value), level: Number(level.value)}); this.render(); this.notice('已修改本局这块地产；不会自动占领整组，也不会修改价格配置。');
      }); propertyApply.disabled = status.canEdit === false;
      this.content.append(this.label('所有者', owner), this.label('建筑等级', level), propertyApply);
      const log=this.node('details','rm-editor-session-log');log.appendChild(this.node('summary','','本局操作记录（'+(status.log||[]).length+' / 50）'));
      for(const entry of status.log||[])log.appendChild(this.note('#'+entry.sequence+' · '+(entry.time/1000).toFixed(2)+'s · '+(entry.action==='player'?'玩家资源':'单格地产')+' '+JSON.stringify(entry.payload)));
      if(!(status.log||[]).length)log.appendChild(this.note('本局尚无沙盒操作；重新开局后清空。'));
      this.content.appendChild(log);this.refreshPlayback();
    }
    renderAdvanced() {
      this.content.appendChild(this.node('h2', '', '时间与骰子'));
      this.content.appendChild(this.note('时间单位均为游戏时间，受顶部倍速统一控制；倍速不改写规则。1× 每逻辑帧 20ms。时间改动保留进度，相关活动计时按剩余比例换算；当前骰点不变，新面数用于下一掷。'));
      for (const [key, label, unit] of RULE_FIELDS.timing) this.field(this.content, 'numbers', key, undefined, label, unit);
      this.content.appendChild(this.node('h2', '', '源脚本数字（高级）'));
      this.content.appendChild(this.note('警告：src.* 包含流程、布局、坐标、分支和规则常量，不是全部都能安全热改。应用只影响后续读取，不能追溯已执行初始化或重建现有对象；部分值需明确重新开局才可见。存在弹窗或移动时先排队。请先导出预设。', 'rm-editor-warning'));
      const enabled = this.node('input'); enabled.type = 'checkbox'; enabled.checked = this.advancedEnabled;
      enabled.addEventListener('change', () => { this.advancedEnabled = enabled.checked; this.render(); });
      const enabledLabel = this.label('我了解风险，显示源数字编辑器', enabled); enabledLabel.classList.add('rm-editor-checkbox'); this.content.appendChild(enabledLabel);
      if (!this.advancedEnabled) return;
      const search = this.node('input'); search.type = 'search'; search.value = this.advancedSearch; search.placeholder = '按 src.s40 / l103 / 数值搜索'; search.setAttribute('aria-label', '搜索源数字');
      const result = this.node('div', 'rm-editor-advanced-results');
      const renderResults = () => {
        result.replaceChildren();
        const query = this.advancedSearch.trim().toLowerCase();
        const keys = Object.keys(this.defaults.numbers).filter(key => key.startsWith('src.') && (!query || (key + ' ' + this.defaults.numbers[key]).toLowerCase().includes(query)));
        const pages = Math.max(1, Math.ceil(keys.length / 24)); this.advancedPage = Math.max(0, Math.min(this.advancedPage, pages - 1));
        const pager = this.node('div', 'rm-editor-inline');
        const previous = this.button('上一页', () => { this.advancedPage--; renderResults(); }); previous.disabled = this.advancedPage === 0;
        const next = this.button('下一页', () => { this.advancedPage++; renderResults(); }); next.disabled = this.advancedPage >= pages - 1;
        pager.append(previous, this.node('span', '', '第 ' + (this.advancedPage + 1) + ' / ' + pages + ' 页 · ' + keys.length + ' 项'), next); result.appendChild(pager);
        for (const key of keys.slice(this.advancedPage * 24, this.advancedPage * 24 + 24)) this.field(result, 'numbers', key, undefined, key, '源数值');
        if (!keys.length) result.appendChild(this.note('没有匹配的源数字。'));
      };
      search.addEventListener('input', () => { this.advancedSearch = search.value; this.advancedPage = 0; renderResults(); });
      this.content.append(this.label('搜索', search), result); renderResults();
    }
    destroy() {
      if (this.disposed) return;
      this.close(false); this.disposed = true; this.win.clearInterval(this.timer);
      for (const cleanup of this.cleanups.splice(0)) cleanup();
      this.entry.remove(); this.overlay.remove();
    }
  }
  RichmanEditor.TABS = TABS;
  RichmanEditor.CHARACTER_FIELDS = CHARACTER_FIELDS;
  RichmanEditor.RULE_FIELDS = RULE_FIELDS;
  RichmanEditor.numberValue = numberValue;
  RichmanEditor.filename = filename;
  if (typeof module === 'object' && module.exports) module.exports = RichmanEditor;
  else root.RichmanEditor = RichmanEditor;
})(typeof globalThis === 'object' ? globalThis : this);
