/* ==========================================================
   地丰体育 · C 端小程序原型 本地 Mock / 交互基础库
   数据来源：后台 mock.js + 建设方案 3.6.12 小程序与移动端
   所有状态写入 localStorage，刷新不丢失、不会崩。
   ========================================================== */
(function(){
  'use strict';

  var KEY = 'df_mobile_v1';
  var MIN_SLOT = 30;
  var DAY_START = 6 * 60;   // 06:00
  var DAY_END = 22 * 60;    // 22:00

  /* ---------------- 基础工具 ---------------- */
  function pad(n){ return n < 10 ? '0' + n : '' + n; }
  function fmtDate(d){ return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function parseDate(s){ var a = s.split('-'); return new Date(+a[0], +a[1] - 1, +a[2]); }
  function addDays(d, n){ var x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; }
  function todayStr(){ return fmtDate(new Date()); }
  var WEEK = ['周日','周一','周二','周三','周四','周五','周六'];
  function weekCN(s){ return WEEK[parseDate(s).getDay()]; }
  function dateCN(s){ var a = s.split('-'); return (+a[1]) + '月' + (+a[2]) + '日'; }
  function relDay(s){
    var t = todayStr();
    if (s === t) return '今天';
    if (s === fmtDate(addDays(new Date(), 1))) return '明天';
    if (s === fmtDate(addDays(new Date(), 2))) return '后天';
    return weekCN(s);
  }
  function rmb(n){ return (Math.round(n * 100) / 100).toFixed(2).replace(/\.00$/, ''); }
  function hash(str){ var h = 2166136261; for (var i = 0; i < str.length; i++){ h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return Math.abs(h); }

  /* ---------------- 静态数据 ---------------- */
  var PRICING = {
    '篮球':   { low: 80,  peak: 120, weekend: 150 },
    '足球':   { low: 200, peak: 350, weekend: 350 },
    '网球':   { low: 60,  peak: 90,  weekend: 100 },
    '羽毛球': { low: 40,  peak: 60,  weekend: 70 },
    '乒乓球': { low: 30,  peak: 45,  weekend: 50 }
  };

  var VENUES = [
    { id:'V001', name:'地丰体育中心（总部）', short:'总部', district:'思明区', address:'厦门市思明区体育路88号',
      openTime:'06:00-23:00', courts:24, distance:'1.2km', thumb:'vt-blue', contact:'张经理', phone:'13800001111',
      tags:['室内篮球','足球场','羽毛球','淋浴更衣'], desc:'地丰体育旗舰场馆，含室内篮球馆、室外足球场、羽毛球馆与网球场，配套淋浴更衣、运动用品租借服务。',
      notice:'2号篮球场（VIP）11 月周末时段已开放预约。' },
    { id:'V002', name:'地丰篮球公园', short:'篮球公园', district:'湖里区', address:'厦门市湖里区金尚路168号',
      openTime:'07:00-22:30', courts:12, distance:'3.8km', thumb:'vt-orange', contact:'李经理', phone:'13800002222',
      tags:['室内篮球','夜场灯光','停车场'], desc:'以篮球为主的主题场馆，12 片室内标准场，夜间灯光开放至 22:30，适合球队包场与散场。',
      notice:'工作日 07:00-16:00 低峰时段执行优惠价。' },
    { id:'V003', name:'地丰网球中心', short:'网球中心', district:'集美区', address:'厦门市集美区杏林湾路66号',
      openTime:'06:30-22:00', courts:8, distance:'9.6km', thumb:'vt-green', contact:'王经理', phone:'13800003333',
      tags:['室外网球','专业场地','教练服务'], desc:'8 片室外硬地网球场，提供球拍租借与教练预约服务，T1 场地 11 月 8 日全天维护。',
      notice:'T1 网球场 11 月 8 日全天维护，暂停预约。' },
    { id:'V004', name:'地丰羽毛球馆', short:'羽毛球馆', district:'海沧区', address:'厦门市海沧区沧湖东路12号',
      openTime:'06:00-23:00', courts:16, distance:'12.4km', thumb:'vt-purple', contact:'赵经理', phone:'13800004444',
      tags:['室内羽毛球','VIP 场','器材租借'], desc:'16 片室内羽毛球场，B2 为 VIP 场，提供球拍租借与穿线服务。',
      notice:'双十一储值充值赠送活动进行中。' }
  ];

  var COURTS = [
    { id:'C001', venueId:'V001', name:'1号足球场', type:'足球', area:'室外', attr:'普通', capacity:22, status:'可用' },
    { id:'C002', venueId:'V001', name:'2号篮球场', type:'篮球', area:'室内', attr:'VIP', capacity:10, status:'可用' },
    { id:'C003', venueId:'V001', name:'3号网球场', type:'网球', area:'室外', attr:'普通', capacity:4, status:'维修' },
    { id:'C004', venueId:'V002', name:'A1篮球场', type:'篮球', area:'室内', attr:'普通', capacity:10, status:'可用' },
    { id:'C005', venueId:'V002', name:'A2篮球场', type:'篮球', area:'室内', attr:'普通', capacity:10, status:'可用' },
    { id:'C006', venueId:'V003', name:'T1网球场', type:'网球', area:'室外', attr:'普通', capacity:4, status:'可用' },
    { id:'C007', venueId:'V004', name:'B1羽毛球场', type:'羽毛球', area:'室内', attr:'普通', capacity:4, status:'可用' },
    { id:'C008', venueId:'V004', name:'B2羽毛球场', type:'羽毛球', area:'室内', attr:'VIP', capacity:4, status:'可用' },
    { id:'C009', venueId:'V001', name:'4号篮球场', type:'篮球', area:'室内', attr:'普通', capacity:10, status:'可用' },
    { id:'C010', venueId:'V004', name:'C1乒乓球场', type:'乒乓球', area:'室内', attr:'普通', capacity:4, status:'可用' }
  ];

  var CARD_PRODUCTS = [
    { id:'P01', name:'篮球 10 次卡', type:'篮球', total:10, price:800, validMonths:12, desc:'适用于全部室内篮球场，工作日/周末通用，单次最长 2 小时。' },
    { id:'P02', name:'羽毛球 20 次卡', type:'羽毛球', total:20, price:1200, validMonths:12, desc:'适用于 B1/B2 羽毛球场，VIP 场可用，需提前预约。' },
    { id:'P03', name:'网球 5 次卡', type:'网球', total:5, price:600, validMonths:9, desc:'适用于网球中心室外场地，不含球拍租借费用。' },
    { id:'P04', name:'乒乓球 10 次卡', type:'乒乓球', total:10, price:300, validMonths:12, desc:'适用于 C1 乒乓球场，可预约任意非维护时段。' }
  ];

  var ANNOUNCEMENTS = [
    '双十一储值活动：充 500 赠 80，充 1000 赠 200，活动截至 11 月 11 日。',
    '羽毛球馆 B2（VIP）新增晚场时段，可提前 7 天预约。',
    '网球中心 T1 场地 11 月 8 日全天维护，已预约订单可免费取消。'
  ];

  /* ---------------- 订单 / 会员初始数据 ---------------- */
  function seedOrders(){
    var t = new Date();
    var d1 = fmtDate(addDays(t, 1));
    var d2 = fmtDate(addDays(t, -2));
    var d3 = fmtDate(addDays(t, -4));
    var d4 = fmtDate(addDays(t, -6));
    var d5 = fmtDate(addDays(t, 3));
    return [
      { id:'ORD' + d1.replace(/-/g,'') + '001', type:'court', source:'小程序',
        title:'地丰篮球公园 · A1篮球场', venue:'地丰篮球公园', court:'A1篮球场', sport:'篮球',
        date:d1, time:'19:00-21:00', amount:240, payMethod:'微信支付', payment:'wechat',
        status:'paid', verifyCode:'86214473', createdAt:d1 + ' 09:12',
        invoice:{ status:'可开具', email:'chen@example.com' }, remark:'' },
      { id:'ORD' + d5.replace(/-/g,'') + '002', type:'court', source:'小程序',
        title:'地丰体育中心 · 1号足球场', venue:'地丰体育中心（总部）', court:'1号足球场', sport:'足球',
        date:d5, time:'15:00-17:00', amount:400, payMethod:'待支付', payment:'wechat',
        status:'pending', verifyCode:'', createdAt:d5 + ' 08:30',
        invoice:{ status:'未开具', email:'' }, remark:'' },
      { id:'ORD' + d2.replace(/-/g,'') + '003', type:'court', source:'小程序',
        title:'地丰体育中心 · B1羽毛球场', venue:'地丰体育中心（总部）', court:'B1羽毛球场', sport:'羽毛球',
        date:d2, time:'14:00-15:00', amount:60, payMethod:'储值余额', payment:'balance',
        status:'used', verifyCode:'44719026', createdAt:d2 + ' 10:02',
        invoice:{ status:'已开具', no:'243500000001234588', email:'chen@example.com' }, remark:'' },
      { id:'ORD' + d3.replace(/-/g,'') + '004', type:'event', source:'小程序',
        title:'2026 春季羽毛球双打赛（往期）', venue:'地丰羽毛球馆', court:'', sport:'羽毛球',
        date:d3, time:'混合双打 · 已完赛', amount:120, payMethod:'微信支付', payment:'wechat',
        status:'used', verifyCode:'90127355', createdAt:d3 + ' 16:20', group:'混合双打',
        invoice:{ status:'未开具', email:'' }, remark:'' },
      { id:'ORD' + d4.replace(/-/g,'') + '005', type:'court', source:'小程序',
        title:'地丰篮球公园 · A2篮球场', venue:'地丰篮球公园', court:'A2篮球场', sport:'篮球',
        date:d4, time:'20:00-22:00', amount:240, payMethod:'次卡抵扣', payment:'card',
        status:'canceled', verifyCode:'', createdAt:d4 + ' 17:45',
        invoice:{ status:'未开具', email:'' }, remark:'用户主动取消，已释放时段' },
      { id:'ORD' + d4.replace(/-/g,'') + '006', type:'court', source:'小程序',
        title:'地丰网球中心 · T1网球场', venue:'地丰网球中心', court:'T1网球场', sport:'网球',
        date:d4, time:'10:00-11:00', amount:60, payMethod:'微信支付', payment:'wechat',
        status:'refunding', verifyCode:'', createdAt:d4 + ' 09:20',
        invoice:{ status:'已开具', no:'243500000001234601', email:'chen@example.com' }, remark:'已提交退款申请，原路退回' }
    ];
  }

  function seedCards(){
    var y = new Date();
    return [
      { id:'TC001', name:'篮球 10 次卡', type:'篮球', total:10, used:4,
        validUntil: String(y.getFullYear() + 1) + '-06-30', status:'有效', price:800 },
      { id:'TC003', name:'网球 5 次卡', type:'网球', total:5, used:2,
        validUntil: String(y.getFullYear() + 1) + '-03-31', status:'有效', price:600 },
      { id:'TC002', name:'羽毛球 20 次卡', type:'羽毛球', total:20, used:20,
        validUntil: fmtDate(addDays(y, -40)), status:'已过期', price:1200 }
    ];
  }

  function seedFlows(){
    var t = new Date();
    return [
      { date: fmtDate(addDays(t, -1)) + ' 18:20', label:'场地消费 · A1篮球场', type:'consume', amount:240, method:'微信支付' },
      { date: fmtDate(addDays(t, -2)) + ' 10:02', label:'场地消费 · B1羽毛球场', type:'consume', amount:60, method:'储值余额' },
      { date: fmtDate(addDays(t, -5)) + ' 21:14', label:'储值充值（赠 80）', type:'recharge', amount:800, method:'微信支付' },
      { date: fmtDate(addDays(t, -9)) + ' 19:30', label:'次卡购买 · 篮球 10 次卡', type:'consume', amount:800, method:'微信支付' },
      { date: fmtDate(addDays(t, -12)) + ' 08:46', label:'充值赠送额度入账', type:'gift', amount:80, method:'活动赠送' }
    ];
  }

  function seedMessages(){
    var t = new Date();
    return [
      { id:'MSG1', type:'预约成功', time: fmtDate(t) + ' 09:12', title:'预约成功',
        content:'您已预约地丰篮球公园 A1篮球场 ' + fmtDate(addDays(t, 1)) + ' 19:00-21:00，到场请出示订单核销码。', read:false },
      { id:'MSG2', type:'开场提醒', time: fmtDate(addDays(t, -1)) + ' 18:00', title:'开场提醒',
        content:'您预约的场地将在 30 分钟后开场，请提前 10 分钟到场。', read:false },
      { id:'MSG3', type:'充值到账', time: fmtDate(addDays(t, -5)) + ' 21:14', title:'充值到账通知',
        content:'充值 800 元成功，赠送 80 元，当前储值余额以会员卡展示为准。', read:true },
      { id:'MSG4', type:'开票结果', time: fmtDate(addDays(t, -4)) + ' 11:30', title:'电子发票已开具',
        content:'订单电子发票已开具并推送至预留邮箱，可在订单详情中查看。', read:true }
    ];
  }

  function fresh(){
    return {
      version: 1,
      member: {
        name:'陈晓明', phone:'138****1234', realName:'陈晓明', verified:true, level:'普通会员',
        cardNo:'VIP20240315001', balance:2350, gift:180, points:1280, validUntil:'2027-03-15',
        regDate:'2024-03-15', totalConsume:12580
      },
      orders: seedOrders(),
      cards: seedCards(),
      flows: seedFlows(),
      messages: seedMessages(),
      contacts:[
        { name:'林雅婷', phone:'139****5678' },
        { name:'王志强', phone:'136****3456' }
      ],
      invoiceInfo:{ type:'个人', title:'陈晓明', taxNo:'', email:'chen@example.com', phone:'138****1234' },
      draft: null
    };
  }

  function load(){
    try {
      var raw = localStorage.getItem(KEY);
      if (raw){
        var obj = JSON.parse(raw);
        if (obj && obj.version === 1 && obj.member && Array.isArray(obj.orders)){
          var base = fresh();
          base.member = Object.assign(base.member, obj.member || {});
          base.orders = obj.orders || base.orders;
          base.cards = obj.cards || base.cards;
          base.flows = obj.flows || base.flows;
          base.messages = obj.messages || base.messages;
          base.contacts = obj.contacts || base.contacts;
          base.invoiceInfo = Object.assign(base.invoiceInfo, obj.invoiceInfo || {});
          base.draft = obj.draft || null;
          return base;
        }
      }
    } catch (e) { /* 本地数据损坏时回退到初始数据 */ }
    var s = fresh();
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
    return s;
  }

  var S = load();
  function save(){
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
  }

  /* ---------------- 赛事 ---------------- */
  function seedEvents(){
    var t = new Date();
    var eV = fmtDate(addDays(t, 12));
    var eV2 = fmtDate(addDays(t, 20));
    var past = fmtDate(addDays(t, -18));
    return [
      { id:'EV003', name:'地丰羽毛球团体赛（线上报名）', type:'羽毛球', mode:'线上赛事', status:'报名中',
        startDate:eV, endDate:fmtDate(addDays(t, 13)), venue:'地丰羽毛球馆', address:'厦门市海沧区沧湖东路12号',
        cover:'ec-green', organizer:'地丰体育', priceFrom:120,
        intro:'面向业余羽毛球爱好者的团体赛事，设男子双打、混合双打与团体组三个组别，线上报名、线上支付，赛后统一开具电子发票。',
        notice:['报名成功后可在线取消并按原路退款，名额同步释放。','参赛当日凭报名凭证与身份证件到前台签到，无需现场核销。','比赛用球由主办方提供，球拍可现场租借。'],
        groups:[
          { id:'G1', name:'男子双打', price:120, quota:32, joined:19, unit:'人', desc:'两人一组，按个人报名，可自行组队' },
          { id:'G2', name:'混合双打', price:120, quota:32, joined:24, unit:'人', desc:'一男一女组合，按个人报名' },
          { id:'G3', name:'团体组', price:300, quota:12, joined:8, unit:'队', desc:'每队 6-8 人，按队伍报名' }
        ] },
      { id:'EV001', name:'2026 地丰杯青少年篮球邀请赛', type:'篮球', mode:'线上赛事', status:'即将开始',
        startDate:eV2, endDate:fmtDate(addDays(t, 22)), venue:'地丰体育中心（总部）', address:'厦门市思明区体育路88号',
        cover:'ec-blue', organizer:'厦门地丰置业有限公司', priceFrom:0,
        intro:'面向 12-16 岁青少年篮球队伍的邀请赛，由地丰置业主办，赛事场地与赛程已排定，参赛队伍由组委会邀请确认。',
        notice:['本赛事为邀请制，不开放线上报名。','观众可免费入场观赛，请遵守场馆秩序。'],
        groups:[] },
      { id:'EV002', name:'厦门市业余网球公开赛', type:'网球', mode:'线下赛事', status:'已结束',
        startDate: fmtDate(addDays(t, -30)), endDate: fmtDate(addDays(t, -28)), venue:'地丰网球中心', address:'厦门市集美区杏林湾路66号',
        cover:'ec-purple', organizer:'厦门市网球协会', priceFrom:0,
        intro:'由厦门市网球协会主办的年度业余网球公开赛，赛事已结束，成绩与赛事回顾可在场馆公告查看。',
        notice:['赛事已结束，报名与签到通道已关闭。'], groups:[] }
    ];
  }
  var EVENTS = seedEvents();

  /* ---------------- 数据访问 ---------------- */
  function courtById(id){ for (var i = 0; i < COURTS.length; i++) if (COURTS[i].id === id) return COURTS[i]; return null; }
  function venueById(id){ for (var i = 0; i < VENUES.length; i++) if (VENUES[i].id === id) return VENUES[i]; return null; }
  function eventById(id){ for (var i = 0; i < EVENTS.length; i++) if (EVENTS[i].id === id) return EVENTS[i]; return null; }
  function cardProductById(id){ for (var i = 0; i < CARD_PRODUCTS.length; i++) if (CARD_PRODUCTS[i].id === id) return CARD_PRODUCTS[i]; return null; }

  /* 价格：30 分钟为最小单位，跨时段按各时段单价累加 */
  function priceFor(court, dateStr, startMin){
    var p = PRICING[court.type] || PRICING['篮球'];
    var d = parseDate(dateStr).getDay();
    var isWeekend = (d === 0 || d === 6);
    var isPeak = startMin >= 18 * 60 && startMin < 22 * 60;
    var hourly = isWeekend ? p.weekend : (isPeak ? p.peak : p.low);
    if (court.attr === 'VIP') hourly += 30;
    return Math.round(hourly / 2);
  }

  function slotLabel(min){ return pad(Math.floor(min / 60)) + ':' + pad(min % 60); }

  function bookedByOrder(courtId, dateStr, startMin){
    for (var i = 0; i < S.orders.length; i++){
      var o = S.orders[i];
      if (o.type !== 'court' || o.courtId !== courtId) continue;
      if (!o.date || o.date !== dateStr) continue;
      if (o.status === 'canceled') continue;
      if (!o.startMin && o.startMin !== 0) continue;
      if (startMin >= o.startMin && startMin < o.startMin + (o.duration || 60)) return true;
    }
    return false;
  }

  function slotsFor(courtId, dateStr){
    var court = courtById(courtId);
    var out = [];
    var now = new Date();
    var isToday = dateStr === todayStr();
    for (var m = DAY_START; m < DAY_END; m += MIN_SLOT){
      var price = court ? priceFor(court, dateStr, m) : 0;
      var booked = hash(courtId + dateStr + m) % 100 < 17;
      var past = isToday && m <= (now.getHours() * 60 + now.getMinutes());
      if (bookedByOrder(courtId, dateStr, m)) booked = true;
      out.push({
        startMin:m, endMin:m + MIN_SLOT,
        start: slotLabel(m), end: slotLabel(m + MIN_SLOT),
        price: price,
        disabled: booked || past,
        reason: past ? '已过' : (booked ? '已订' : '')
      });
    }
    return out;
  }

  function datesFor(count){
    var out = [], t = new Date();
    for (var i = 0; i < count; i++){
      var d = addDays(t, i);
      out.push({ date: fmtDate(d), day: +pad(d.getDate()), week: relDay(fmtDate(d)), label: dateCN(fmtDate(d)) });
    }
    return out;
  }

  /* ---------------- 订单 ---------------- */
  function genOrderNo(){
    var base = 'ORD' + todayStr().replace(/-/g,'');
    var n = 1, no;
    do { no = base + ('00' + n).slice(-3); n++; } while (S.orders.some(function(o){ return o.id === no; }));
    return no;
  }
  function genCode(){
    var a = String(Math.floor(Math.random() * 9000) + 1000);
    var b = String(Math.floor(Math.random() * 9000) + 1000);
    return a + b;
  }
  function createOrder(data){
    var o = Object.assign({ id: genOrderNo(), source:'小程序', createdAt: fmtDate(new Date()) + ' ' + pad(new Date().getHours()) + ':' + pad(new Date().getMinutes()) }, data);
    S.orders.unshift(o);
    save();
    return o;
  }
  function getOrder(id){ for (var i = 0; i < S.orders.length; i++) if (S.orders[i].id === id) return S.orders[i]; return null; }
  function updateOrder(id, patch){
    var o = getOrder(id);
    if (!o) return null;
    Object.assign(o, patch);
    save();
    return o;
  }
  function latestOrder(filter){
    if (filter){
      for (var i = 0; i < S.orders.length; i++) if (filter(S.orders[i])) return S.orders[i];
      return null;
    }
    return S.orders[0] || null;
  }
  function statusMeta(s){
    var map = {
      pending:   { label:'待支付', tone:'tag-orange' },
      paid:      { label:'待使用', tone:'tag-blue' },
      used:      { label:'已完成', tone:'tag-green' },
      done:      { label:'已完成', tone:'tag-green' },
      canceled:  { label:'已取消', tone:'tag-gray' },
      refunding: { label:'退款中', tone:'tag-orange' },
      refunded:  { label:'已退款', tone:'tag-gray' }
    };
    return map[s] || { label:s, tone:'tag-gray' };
  }
  function methodCN(p){
    return { wechat:'微信支付', balance:'储值余额', card:'次卡抵扣', cash:'现金', pending:'待支付' }[p] || p || '-';
  }

  /* ---------------- UI 基础 ---------------- */
  var ICON = {
    home:'<path d="M3 10.6 12 3l9 7.6"/><path d="M5.2 9.4V21h13.6V9.4"/><path d="M10 21v-6.2h4V21"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2.2"/><path d="M3 10.2h18M7.6 3v4M16.4 3v4"/><path d="M8 14.5h2M14 14.5h2M8 18h2"/>',
    receipt:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
    user:'<circle cx="12" cy="8" r="4"/><path d="M4.2 21c0-4 3.5-6.8 7.8-6.8s7.8 2.8 7.8 6.8"/>',
    back:'<path d="M15 4.5 7.5 12l7.5 7.5"/>',
    right:'<path d="M9 4.5 16.5 12 9 19.5"/>',
    search:'<circle cx="10.8" cy="10.8" r="6.6"/><path d="m20 20-4.2-4.2"/>',
    bell:'<path d="M18 16.2V11a6 6 0 1 0-12 0v5.2L4 19h16l-2-2.8z"/><path d="M9.6 19.5a2.4 2.4 0 0 0 4.8 0"/>',
    wallet:'<rect x="3" y="6" width="18" height="14" rx="3"/><path d="M3 10.2h18"/><circle cx="17" cy="15" r="1.4"/>',
    ticket:'<path d="M4 8.2A2.2 2.2 0 0 1 6.2 6h11.6A2.2 2.2 0 0 1 20 8.2v.6a2.4 2.4 0 0 0 0 4.8v.6a2.2 2.2 0 0 1-2.2 2.2H6.2A2.2 2.2 0 0 1 4 15.8v-.6a2.4 2.4 0 0 0 0-4.8v-.6z"/><path d="M12 7.4v2.2M12 12v2.2M12 16.4v2.2"/>',
    trophy:'<path d="M8 4h8v5.2a4 4 0 0 1-8 0V4z"/><path d="M8 5.6H5.2A2.8 2.8 0 0 0 8 8.4M16 5.6h2.8A2.8 2.8 0 0 1 16 8.4"/><path d="M12 13.4v3.4M9 20.6h6"/>',
    qr:'<rect x="3.4" y="3.4" width="6.8" height="6.8" rx="1"/><rect x="13.8" y="3.4" width="6.8" height="6.8" rx="1"/><rect x="3.4" y="13.8" width="6.8" height="6.8" rx="1"/><path d="M14 14h2.6v2.6h-2.6zM19 19h2M19 15.4v1.2"/>',
    clock:'<circle cx="12" cy="12" r="8.8"/><path d="M12 7.2V12l3.2 2"/>',
    pin:'<path d="M12 21s6.8-6.1 6.8-10.6a6.8 6.8 0 1 0-13.6 0C5.2 14.9 12 21 12 21z"/><circle cx="12" cy="10.2" r="2.4"/>',
    card:'<rect x="3" y="5.2" width="18" height="13.6" rx="2.4"/><path d="M3 9.4h18M7 15h3.2"/>',
    shield:'<path d="M12 3 20 6v6c0 4.8-3.4 7.8-8 9-4.6-1.2-8-4.2-8-9V6l8-3z"/><path d="m9 12 2 2 4-4"/>',
    mail:'<rect x="3" y="5.2" width="18" height="13.6" rx="2.2"/><path d="m3.4 7 8.6 5.8 8.6-5.8"/>',
    users:'<circle cx="9" cy="9" r="3.4"/><path d="M2.2 20c0-3.2 3-5.4 6.8-5.4s6.8 2.2 6.8 5.4"/><path d="M16.2 5.6a3.4 3.4 0 0 1 0 6.8M18 14c2.4.6 3.8 2.3 3.8 5"/>',
    file:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
    check:'<path d="m4.5 12.4 4.8 4.8 10-10"/>',
    close:'<path d="M6 6 18 18M18 6 6 18"/>',
    phone:'<path d="M7.2 3h3l1.8 4.8-2 1.2a12 12 0 0 0 5 5l1.2-2 4.8 1.8v3a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 5 5.2 2 2 0 0 1 7.2 3z"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    gift:'<rect x="3.6" y="8.4" width="16.8" height="12" rx="1.4"/><path d="M3.6 12.4h16.8M12 8.4v12"/><path d="M8.4 8.4C6.8 8.4 5.6 7.2 5.6 5.8S6.8 3.4 8 3.4c2 0 4 5 4 5M15.6 8.4c1.6 0 2.8-1.2 2.8-2.6S17.2 3.4 16 3.4c-2 0-4 5-4 5"/>',
    refresh:'<path d="M20 12a8 8 0 1 1-2.4-5.7"/><path d="M20 4v5h-5"/>',
    info:'<circle cx="12" cy="12" r="8.8"/><path d="M12 8h.01M11 11.2h1v5"/>',
    chat:'<path d="M21 12.4c0 3.8-4 6.8-9 6.8-1 0-2-.1-2.9-.4L5 20.6l1.2-3.2C4.8 16.2 3 14.4 3 12.4 3 8.6 7 5.6 12 5.6s9 3 9 6.8z"/>',
    lock:'<rect x="4.6" y="10.4" width="14.8" height="10" rx="2"/><path d="M8 10.4V7.6a4 4 0 1 1 8 0v2.8"/>',
    sport:'<circle cx="12" cy="12" r="8.8"/><path d="M5 7.6c3.6 2 9.4 2 14 0M5 16.4c3.6-2 9.4-2 14 0M12 3.2v17.6"/>'
  };
  function icon(name, size){
    var s = size || 22;
    return '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + (ICON[name] || '') + '</svg>';
  }

  function $(sel, root){ return (root || document).querySelector(sel); }
  function $$(sel, root){ return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function toast(msg, type){
    var old = $('.toast');
    if (old) old.remove();
    var app = $('.app');
    if (!app) return;
    var el = document.createElement('div');
    el.className = 'toast' + (type === 'success' ? ' success' : '');
    el.textContent = msg;
    app.appendChild(el);
    setTimeout(function(){
      el.style.transition = 'opacity .3s';
      el.style.opacity = '0';
      setTimeout(function(){ el.remove(); }, 300);
    }, 1900);
  }

  /* 模拟收银台 */
  function pay(opt){
    opt = opt || {};
    if ($('#payOverlay')) return;
    var app = $('.app');
    var amount = opt.amount || 0;
    var mName = opt.method === 'balance' ? '储值余额' : (opt.method === 'card' ? '次卡抵扣' : '微信支付（兴E付）');
    var mIcon = opt.method === 'balance' ? 'wallet' : (opt.method === 'card' ? 'ticket' : 'card');
    var el = document.createElement('div');
    el.className = 'overlay';
    el.id = 'payOverlay';
    el.innerHTML =
      '<div class="sheet">' +
        '<div class="sheet-grab"></div>' +
        '<div class="sheet-title">收银台</div>' +
        '<div class="sheet-sub">兴业银行兴E付 · 聚合收单</div>' +
        '<div style="text-align:center;margin:20px 0 6px;font-size:32px;font-weight:700;font-variant-numeric:tabular-nums">¥' + rmb(amount) + '</div>' +
        '<div style="display:flex;align-items:center;gap:12px;border:1px solid var(--m-line);border-radius:12px;padding:13px 14px;margin-top:16px">' +
          '<div style="width:36px;height:36px;border-radius:9px;display:grid;place-items:center;background:var(--m-primary-bg);color:var(--m-primary)">' + icon(mIcon, 20) + '</div>' +
          '<div style="flex:1"><div style="font-size:14px;font-weight:500">' + mName + '</div>' +
          '<div style="font-size:11px;color:var(--m-text-3);margin-top:1px">' + (opt.method === 'balance' ? '余额支付 · 不足部分请先充值' : '支付结果以银行返回状态为准') + '</div></div>' +
          '<div style="width:18px;height:18px;border-radius:50%;background:var(--m-primary);display:grid;place-items:center"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><path d="m4.5 12.4 4.8 4.8 10-10"/></svg></div>' +
        '</div>' +
        '<div style="font-size:11px;color:var(--m-text-4);text-align:center;margin-top:12px;line-height:1.6">演示环境模拟支付，不会产生真实扣款</div>' +
        '<div class="sheet-foot"><button class="btn btn-primary btn-block" id="payConfirm" style="height:48px">确认支付 ¥' + rmb(amount) + '</button></div>' +
      '</div>';
    app.appendChild(el);
    el.addEventListener('click', function(e){ if (e.target === el){ el.remove(); } });
    var btn = $('#payConfirm', el);
    btn.addEventListener('click', function(){
      if (btn.disabled) return;
      btn.disabled = true;
      btn.style.opacity = '.75';
      btn.innerHTML = '<span class="spinner" style="border-color:rgba(255,255,255,.4);border-top-color:#fff"></span> 支付处理中';
      setTimeout(function(){
        el.remove();
        if (typeof opt.onSuccess === 'function') opt.onSuccess();
      }, 900);
    });
  }

  /* 确认弹窗 */
  function modal(opt){
    opt = opt || {};
    var app = $('.app');
    var el = document.createElement('div');
    el.className = 'overlay center';
    el.innerHTML =
      '<div class="modal">' +
        '<div class="modal-title">' + (opt.title || '提示') + '</div>' +
        '<div class="modal-text">' + (opt.text || '') + '</div>' +
        '<div class="modal-acts">' +
          (opt.cancelText === false ? '' : '<button class="btn btn-line" data-act="cancel">' + (opt.cancelText || '取消') + '</button>') +
          '<button class="btn btn-primary" data-act="ok">' + (opt.confirmText || '确定') + '</button>' +
        '</div>' +
      '</div>';
    app.appendChild(el);
    el.addEventListener('click', function(e){
      var act = e.target.getAttribute && e.target.getAttribute('data-act');
      if (act === 'cancel' || e.target === el){
        el.remove();
        if (typeof opt.onCancel === 'function') opt.onCancel();
      } else if (act === 'ok'){
        el.remove();
        if (typeof opt.onConfirm === 'function') opt.onConfirm();
      }
    });
  }

  /* 二维码（确定性生成的演示码） */
  function drawQR(canvas, text, box){
    var n = 29;
    var target = box || 156;
    var cell = Math.floor(target / n);
    var size = cell * n;
    canvas.width = size; canvas.height = size;
    canvas.style.width = size + 'px'; canvas.style.height = size + 'px';
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = '#101828';
    var seed = hash(String(text));
    function mod(i, j){
      seed = (Math.imul(seed, 1103515245) + 12345) >>> 0;
      return ((seed >>> 8) % 100) < 46;
    }
    function inFinder(i, j){
      return (i < 8 && j < 8) || (i > n - 9 && j < 8) || (i < 8 && j > n - 9);
    }
    for (var i = 0; i < n; i++){
      for (var j = 0; j < n; j++){
        if (inFinder(i, j)) continue;
        if (mod(i, j)) ctx.fillRect(i * cell, j * cell, cell, cell);
      }
    }
    function finder(ox, oy){
      ctx.fillStyle = '#101828';
      ctx.fillRect(ox * cell, oy * cell, 7 * cell, 7 * cell);
      ctx.fillStyle = '#fff';
      ctx.fillRect((ox + 1) * cell, (oy + 1) * cell, 5 * cell, 5 * cell);
      ctx.fillStyle = '#101828';
      ctx.fillRect((ox + 2) * cell, (oy + 2) * cell, 3 * cell, 3 * cell);
    }
    finder(0, 0); finder(n - 7, 0); finder(0, n - 7);
  }

  /* 状态栏 / 底部导航 */
  function mountStatus(){
    var app = $('.app');
    if (!app || $('.statusbar')) return;
    var theme = document.body.getAttribute('data-status') || 'dark';
    var el = document.createElement('div');
    el.className = 'statusbar';
    el.setAttribute('data-theme', theme === 'light' ? 'light' : 'dark');
    el.innerHTML =
      '<span>9:41</span>' +
      '<div class="sb-right">' +
        '<svg viewBox="0 0 18 12" width="17" height="11" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="4.5" y="6" width="3" height="6" rx="1"/><rect x="9" y="3.5" width="3" height="8.5" rx="1"/><rect x="13.5" y="1" width="3" height="11" rx="1"/></svg>' +
        '<svg viewBox="0 0 20 14" width="16" height="11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M2 5.4a12 12 0 0 1 16 0"/><path d="M5 8.2a7.6 7.6 0 0 1 10 0"/><path d="M8 11a3.4 3.4 0 0 1 4 0"/></svg>' +
        '<span class="sb-battery"></span>' +
      '</div>';
    app.insertBefore(el, app.firstChild);

    if (theme === 'light'){
      var scroller = $('.scroll');
      if (scroller){
        scroller.addEventListener('scroll', function(){
          if (scroller.scrollTop > 56) el.classList.add('scrolled');
          else el.classList.remove('scrolled');
        });
      }
    }
  }

  var TABS = [
    { id:'home',   label:'首页', icon:'home',    href:'home.html' },
    { id:'booking',label:'订场', icon:'calendar',href:'venues.html' },
    { id:'orders', label:'订单', icon:'receipt', href:'orders.html' },
    { id:'me',     label:'我的', icon:'user',    href:'me.html' }
  ];
  function mountTab(active){
    var app = $('.app');
    if (!app || $('.tabbar')) return;
    var html = '<nav class="tabbar">';
    TABS.forEach(function(t){
      html += '<a class="tab' + (t.id === active ? ' active' : '') + '" href="' + t.href + '">' +
        icon(t.icon, 22) + '<span>' + t.label + '</span></a>';
    });
    html += '</nav><div class="homebar"></div>';
    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    while (wrap.firstChild) app.appendChild(wrap.firstChild);
  }

  /* 页面名 + 通知父级（外壳高亮） */
  function pageName(){
    var p = (location.pathname || '').split('/').pop() || 'home.html';
    return p.replace('.html', '') || 'home';
  }
  function notifyParent(){
    if (window.parent && window.parent !== window){
      try { window.parent.postMessage({ type:'df:page', page:pageName() }, '*'); } catch (e) {}
    }
  }

  function go(url){ location.href = url; }

  /* 初始化公共骨架 */
  function init(opt){
    opt = opt || {};
    mountStatus();
    if (opt.tab) mountTab(opt.tab);
    notifyParent();
    window.addEventListener('message', function(e){
      var d = e.data;
      if (d && d.type === 'df:go' && d.href) location.href = d.href;
    });
  }

  /* ---------------- 对外 API ---------------- */
  window.M = {
    get state(){ return S; },
    save: save,
    reset: function(){
      try { localStorage.removeItem(KEY); } catch (e) {}
      location.reload();
    },
    VENUES: VENUES, COURTS: COURTS, EVENTS: EVENTS, CARD_PRODUCTS: CARD_PRODUCTS,
    ANNOUNCEMENTS: ANNOUNCEMENTS, PRICING: PRICING,
    venue: venueById, court: courtById, event: eventById, cardProduct: cardProductById,
    slots: slotsFor, dates: datesFor, price: priceFor,
    today: todayStr, addDays: addDays, fmtDate: fmtDate, dateCN: dateCN,
    weekCN: weekCN, relDay: relDay, rmb: rmb,
    createOrder: createOrder, getOrder: getOrder, updateOrder: updateOrder,
    latestOrder: latestOrder, statusMeta: statusMeta, methodCN: methodCN,
    pay: pay, modal: modal, toast: toast, drawQR: drawQR,
    icon: icon, $: $, $$: $$, go: go, init: init, pageName: pageName, notifyParent: notifyParent
  };
})();

/* 供页面在页面加载后调用：M.init({tab:'home'}) */
