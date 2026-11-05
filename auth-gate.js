/* ===== 地丰体育演示环境 · 前端访问门禁 =====
   说明：这是前端门禁，只用于防止链接被误入/误传，不防技术破解；正式对外请叠加托管平台密码或服务端鉴权。
   接入方式：在页面 <head> 中同时引入 config.js 与本脚本，未认证时全屏显示登录层。 */
(function () {
  var KEY = 'difeng_demo_auth_v1';
  var cfg = window.DIFENG_CONFIG || {};
  var PWD = cfg.accessPassword || 'difeng2026';
  var siteName = cfg.siteName || '地丰体育场馆预约与管理系统';
  var hint = cfg.demoHint || '内部演示环境 · 请输入访问密码';

  try {
    if (window.sessionStorage.getItem(KEY) === PWD) return;
  } catch (e) {}

  var html = document.documentElement;
  html.classList.add('df-gate-locked');

  var style = document.createElement('style');
  style.textContent = [
    'html.df-gate-locked body{visibility:hidden}',
    '.df-gate{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:24px;',
    'background:radial-gradient(900px 520px at 10% -10%,#e3efff 0,rgba(227,239,255,0) 60%),',
    'radial-gradient(800px 520px at 95% 110%,#e4fbf7 0,rgba(228,251,247,0) 58%),#f3f5f9;',
    'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif}',
    '.df-gate *{box-sizing:border-box}',
    '.df-gate-card{width:400px;max-width:100%;background:#fff;border-radius:18px;padding:34px 32px 24px;text-align:center;',
    'box-shadow:0 24px 60px -18px rgba(15,23,42,.28),0 8px 20px rgba(15,23,42,.08)}',
    '.df-gate-logo{width:56px;height:56px;margin:0 auto 16px;border-radius:16px;display:grid;place-items:center;',
    'background:linear-gradient(135deg,#1677ff,#0aa0e6);box-shadow:0 10px 20px -8px rgba(22,119,255,.6)}',
    '.df-gate-logo svg{width:28px;height:28px;stroke:#fff;fill:none}',
    '.df-gate h1{font-size:20px;color:#0f172a;margin:0 0 6px;font-weight:600;letter-spacing:.3px}',
    '.df-gate .sub{font-size:12.5px;color:#8a94a6;margin:0 0 22px}',
    '.df-gate-field{display:flex;align-items:center;gap:8px;height:46px;border:1px solid #e5e7eb;border-radius:12px;padding:0 12px;background:#fff;transition:.15s}',
    '.df-gate-field:focus-within{border-color:#1677ff;box-shadow:0 0 0 3px rgba(22,119,255,.12)}',
    '.df-gate-field.err{border-color:#ef4444;box-shadow:0 0 0 3px rgba(239,68,68,.1)}',
    '.df-gate-field svg{width:18px;height:18px;stroke:#9aa3b2;flex-shrink:0;fill:none}',
    '.df-gate-field input{flex:1;border:0;outline:0;font-size:14px;color:#1f2937;height:100%;background:transparent;font-family:inherit}',
    '.df-gate-btn{width:100%;height:44px;margin-top:14px;border:0;border-radius:22px;cursor:pointer;font-family:inherit;',
    'font-size:15px;font-weight:600;color:#fff;background:linear-gradient(135deg,#1677ff,#0aa0e6);',
    'box-shadow:0 8px 18px -6px rgba(22,119,255,.55)}',
    '.df-gate-btn:active{transform:scale(.99)}',
    '.df-gate-err{min-height:18px;margin-top:8px;font-size:12px;color:#ef4444;text-align:left;padding-left:2px}',
    '.df-gate-note{margin-top:16px;padding-top:14px;border-top:1px solid #f1f3f7;font-size:11.5px;color:#9aa3b2;line-height:1.6;text-align:left}',
    '.df-gate-note b{color:#64748b;font-weight:600}'
  ].join('\n');
  (document.head || html).appendChild(style);

  function mount() {
    var wrap = document.createElement('div');
    wrap.className = 'df-gate';
    wrap.innerHTML =
      '<div class="df-gate-card">' +
        '<div class="df-gate-logo">' +
          '<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<rect x="3" y="11" width="18" height="11" rx="2"></rect>' +
            '<path d="M7 11V7a5 5 0 0 1 10 0v4"></path>' +
          '</svg>' +
        '</div>' +
        '<h1>' + siteName + '</h1>' +
        '<div class="sub">' + hint + '</div>' +
        '<div class="df-gate-field" id="dfGateField">' +
          '<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<rect x="3" y="11" width="18" height="11" rx="2"></rect>' +
            '<path d="M7 11V7a5 5 0 0 1 10 0v4"></path>' +
          '</svg>' +
          '<input id="dfGateInput" type="password" placeholder="请输入访问密码" autocomplete="current-password" aria-label="访问密码">' +
        '</div>' +
        '<div class="df-gate-err" id="dfGateErr"></div>' +
        '<button class="df-gate-btn" id="dfGateBtn" type="button">进入系统</button>' +
        '<div class="df-gate-note"><b>访问说明</b><br>本环境为内部评审演示，数据均为模拟数据；请勿对外传播链接。</div>' +
      '</div>';
    html.appendChild(wrap);

    var input = document.getElementById('dfGateInput');
    var btn = document.getElementById('dfGateBtn');
    var err = document.getElementById('dfGateErr');
    var field = document.getElementById('dfGateField');

    function fail() {
      err.textContent = '密码不正确，请重新输入';
      field.classList.add('err');
      input.select();
      input.focus();
    }

    function submit() {
      var val = input.value.trim();
      if (!val) {
        err.textContent = '请输入访问密码';
        field.classList.add('err');
        input.focus();
        return;
      }
      if (val !== PWD) {
        fail();
        return;
      }
      try { window.sessionStorage.setItem(KEY, PWD); } catch (e) {}
      html.classList.remove('df-gate-locked');
      wrap.remove();
      document.dispatchEvent(new CustomEvent('difeng:unlocked'));
    }

    btn.addEventListener('click', submit);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') submit();
      if (err.textContent) { err.textContent = ''; field.classList.remove('err'); }
    });
    input.addEventListener('input', function () {
      if (err.textContent) { err.textContent = ''; field.classList.remove('err'); }
    });
    setTimeout(function () { input.focus(); }, 30);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
