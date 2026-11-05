/* ===== 地丰体育场馆预约与管理系统 - App Shell ===== */
// 所有页面共享的侧边栏导航与顶部栏，保证导航一致性
(function(){
  const NAV = [
    {group:'工作台', items:[
      {id:'dashboard', label:'工作台', icon:'layout-dashboard', href:'index.html'}
    ]},
    {group:'场馆运营', items:[
      {id:'venue-court', label:'场馆及场地管理', icon:'map-pin', href:'pages/venue-court.html'},
      {id:'price-rule', label:'时段与价格规则', icon:'tags', href:'pages/price-rule.html'},
      {id:'schedule', label:'场地排期与锁定', icon:'calendar-clock', href:'pages/schedule.html'},
      {id:'booking', label:'预约下单', icon:'ticket', href:'pages/booking.html'},
      {id:'order', label:'订单管理', icon:'receipt', href:'pages/order.html'},
      {id:'refund', label:'取消与退款', icon:'rotate-ccw', href:'pages/refund.html'},
      {id:'verify', label:'预约核销', icon:'scan-line', href:'pages/verify.html'},
    ]},
    {group:'会员客户', items:[
      {id:'customer', label:'客户档案', icon:'users', href:'pages/customer.html'},
      {id:'member', label:'会员卡与权益', icon:'credit-card', href:'pages/member.html'},
      {id:'stored-value', label:'储值/积分/优惠', icon:'wallet', href:'pages/stored-value.html'},
      {id:'time-card', label:'次卡管理', icon:'repeat', href:'pages/time-card.html'},
      {id:'consumption', label:'客户消费记录', icon:'history', href:'pages/consumption.html'},
    ]},
    {group:'赛事活动', items:[
      {id:'event', label:'赛事档案与场地', icon:'trophy', href:'pages/event.html'},
      {id:'event-billing', label:'赛事账单与收款', icon:'calculator', href:'pages/event-billing.html'},
      {id:'event-online', label:'线上赛事报名', icon:'globe', href:'pages/event-online.html'},
    ]},
    {group:'商品租赁', items:[
      {id:'goods', label:'商品销售', icon:'shopping-cart', href:'pages/goods.html'},
      {id:'rental', label:'物品租赁', icon:'package-check', href:'pages/rental.html'},
      {id:'rental-deposit', label:'押金/归还/赔偿', icon:'shield-check', href:'pages/rental-deposit.html'},
    ]},
    {group:'仓储进销存', items:[
      {id:'warehouse-goods', label:'商品/仓库/库位', icon:'archive', href:'pages/warehouse-goods.html'},
      {id:'purchase', label:'采购管理', icon:'clipboard-list', href:'pages/purchase.html'},
      {id:'inventory', label:'销售/调拨/盘点', icon:'git-branch', href:'pages/inventory.html'},
      {id:'inventory-loss', label:'报损/预警/流水', icon:'alert-triangle', href:'pages/inventory-loss.html'},
    ]},
    {group:'业财一体化', items:[
      {id:'finance-receipt', label:'收款流水', icon:'banknote', href:'pages/finance-receipt.html'},
      {id:'finance-merchant', label:'客商主数据', icon:'building-2', href:'pages/finance-merchant.html'},
      {id:'finance-receivable', label:'应收单管理', icon:'file-text', href:'pages/finance-receivable.html'},
      {id:'finance-payment', label:'收款单与核销', icon:'check-check', href:'pages/finance-payment.html'},
      {id:'finance-payable', label:'付款单管理', icon:'arrow-up-circle', href:'pages/finance-payable.html'},
      {id:'finance-revenue', label:'收入确认', icon:'trending-up', href:'pages/finance-revenue.html'},
      {id:'finance-reconcile', label:'财务对账', icon:'scale', href:'pages/finance-reconcile.html'},
      {id:'finance-api-log', label:'接口日志', icon:'terminal', href:'pages/finance-api-log.html'},
    ]},
    {group:'发票通知', items:[
      {id:'invoice', label:'电子发票管理', icon:'file-invoice', href:'pages/invoice.html'},
      {id:'invoice-red', label:'红字发票', icon:'file-minus', href:'pages/invoice-red.html'},
      {id:'sms', label:'短信通道与模板', icon:'message-square', href:'pages/sms.html'},
      {id:'sms-broadcast', label:'短信群发', icon:'send', href:'pages/sms-broadcast.html'},
      {id:'sms-record', label:'发送记录统计', icon:'bar-chart-3', href:'pages/sms-record.html'},
    ]},
    {group:'渠道接口', items:[
      {id:'thirdparty-goods', label:'商品套餐同步', icon:'store', href:'pages/thirdparty-goods.html'},
      {id:'thirdparty-order', label:'订单接入与核销', icon:'qr-code', href:'pages/thirdparty-order.html'},
      {id:'thirdparty-reconcile', label:'渠道对账结算', icon:'coins', href:'pages/thirdparty-reconcile.html'},
    ]},
    {group:'经营分析', items:[
      {id:'analytics', label:'经营与场地分析', icon:'bar-chart-2', href:'pages/analytics.html'},
      {id:'analytics-member', label:'会员/商品/租赁分析', icon:'pie-chart', href:'pages/analytics-member.html'},
      {id:'analytics-finance', label:'财务/库存/多场馆', icon:'git-merge', href:'pages/analytics-finance.html'},
    ]},
    {group:'系统管理', items:[
      {id:'org', label:'组织架构', icon:'network', href:'pages/org.html'},
      {id:'role', label:'角色与数据权限', icon:'shield', href:'pages/role.html'},
      {id:'system-config', label:'系统基础配置', icon:'settings', href:'pages/system-config.html'},
      {id:'system-log', label:'操作日志审计', icon:'clipboard-check', href:'pages/system-log.html'},
      {id:'privacy', label:'隐私数据安全管控', icon:'eye-off', href:'pages/privacy.html'},
      {id:'backup', label:'数据备份与灾备', icon:'database-backup', href:'pages/backup.html'},
      {id:'api-integration', label:'对外系统接口', icon:'plug', href:'pages/api-integration.html'},
      {id:'migration', label:'旧系统数据迁移', icon:'database-import', href:'pages/migration.html'},
    ]},
    {group:'移动端', items:[
      {id:'mobile-index', label:'小程序预览', icon:'smartphone', href:'mobile/index.html'},
    ]},
  ];

  function renderShell(activeId, pageTitle){
    const pathPrefix = window.__PREFIX__ || '';
    const iconMap = {};
    const navHtml = NAV.map(g => {
      const items = g.items.map(it => {
        const active = it.id === activeId ? 'active' : '';
        const href = pathPrefix + it.href;
        return `<a class="nav-item ${active}" href="${href}" data-id="${it.id}">
          <span class="nav-icon" data-lucide="${it.icon}"></span>
          <span class="nav-label">${it.label}</span>
        </a>`;
      }).join('');
      return `<div class="nav-group">
        <div class="nav-group-title">${g.group}</div>
        ${items}
      </div>`;
    }).join('');

    document.getElementById('app-shell').innerHTML = `
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-logo">
          <div class="logo-icon">🏟</div>
          <span class="logo-text">地丰体育管理</span>
        </div>
        <nav class="sidebar-nav">${navHtml}</nav>
      </aside>
      <div class="main">
        <header class="topbar">
          <div class="toggle-btn" onclick="document.getElementById('sidebar').classList.toggle('collapsed')">
            <i data-lucide="menu"></i>
          </div>
          <div class="breadcrumb">地丰体育场馆预约与管理系统 / <b>${pageTitle}</b></div>
          <div class="topbar-right">
            <div class="topbar-search">
              <i data-lucide="search"></i>
              <input placeholder="搜索订单/客户/场地…" />
            </div>
            <div class="topbar-icon" title="通知"><i data-lucide="bell"></i><span class="badge"></span></div>
            <div class="topbar-icon" title="帮助"><i data-lucide="circle-help"></i></div>
            <div class="user-avatar" title="管理员">管</div>
          </div>
        </header>
        <main class="content" id="page-content"></main>
      </div>
    `;
    if(window.lucide) lucide.createIcons();
  }
  window.renderShell = renderShell;
  window.NAV_CONFIG = NAV;
})();

// Toast 工具
function toast(msg, type='success'){
  const colors = {success:'var(--success)', error:'var(--error)', warning:'var(--warning)', info:'var(--info)'};
  const icons = {success:'check-circle', error:'x-circle', warning:'alert-triangle', info:'info'};
  const el = document.createElement('div');
  el.className = 'toast';
  el.style.borderLeft = `3px solid ${colors[type]}`;
  el.innerHTML = `<i data-lucide="${icons[type]}" style="color:${colors[type]}"></i><span>${msg}</span>`;
  document.body.appendChild(el);
  if(window.lucide) lucide.createIcons({nameAttr:'data-lucide'});
  setTimeout(()=>{el.style.opacity='0';el.style.transform='translateX(100%)';setTimeout(()=>el.remove(),300)},2500);
}

// Modal 工具
function openModal(html, opts={}){
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = html;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e=>{if(e.target===overlay) closeModal(overlay)});
  if(window.lucide) lucide.createIcons();
  return overlay;
}
function closeModal(el){ el.remove(); }

// 确认框
function confirmDialog(msg, onOk){
  const html = `<div class="modal" style="max-width:420px">
    <div class="modal-header"><div class="modal-title">操作确认</div><div class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</div></div>
    <div class="modal-body" style="display:flex;gap:12px;align-items:flex-start"><i data-lucide="alert-triangle" style="color:var(--warning);width:24px;height:24px;flex-shrink:0"></i><div>${msg}</div></div>
    <div class="modal-footer">
      <button class="btn btn-default" onclick="this.closest('.modal-overlay').remove()">取消</button>
      <button class="btn btn-primary" id="confirm-ok">确定</button>
    </div></div>`;
  const ov = openModal(html);
  ov.querySelector('#confirm-ok').onclick = ()=>{ closeModal(ov); onOk && onOk(); };
}
