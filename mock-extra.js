/* ===== 地丰体育 - 扩展 Mock 数据（供后续模块页面使用） ===== */

/* 本地内联封面图（data-URI SVG）：离线/无外网时也能正常渲染，避免图片加载报错 */
window.coverSVG = function(c1, c2){
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">'
    + '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient></defs>'
    + '<rect width="800" height="600" fill="url(#g)"/>'
    + '<g fill="none" stroke="rgba(255,255,255,.30)" stroke-width="5"><rect x="64" y="70" width="672" height="460" rx="12"/><line x1="400" y1="70" x2="400" y2="530"/><circle cx="400" cy="300" r="84"/><rect x="64" y="186" width="112" height="228"/><rect x="624" y="186" width="112" height="228"/></g>'
    + '<g stroke="rgba(255,255,255,.14)" stroke-width="2"><line x1="0" y1="140" x2="800" y2="140"/><line x1="0" y1="460" x2="800" y2="460"/></g></svg>';
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
};

window.MOCK_EXT = {
  /* ---------- 仓储进销存 ---------- */
  stockList: [
    {id:'SK001', goodsCode:'SP001', name:'农夫山泉550ml', category:'饮料', warehouse:'总部主仓库', location:'A-01-01', batch:'B20261015', qty:320, minQty:100, cost:1.8, expiry:'2027-04-15'},
    {id:'SK002', goodsCode:'SP002', name:'脉动运动饮料', category:'饮料', warehouse:'总部主仓库', location:'A-01-02', batch:'B20261018', qty:180, minQty:80, cost:4.2, expiry:'2027-03-18'},
    {id:'SK003', goodsCode:'SP003', name:'红双喜DHS羽毛球', category:'球类', warehouse:'总部主仓库', location:'B-02-01', batch:'B20260920', qty:45, minQty:30, cost:62, expiry:''},
    {id:'SK004', goodsCode:'SP004', name:'斯伯丁篮球7号', category:'球类', warehouse:'篮球公园仓', location:'A-01-01', batch:'B20261025', qty:12, minQty:10, cost:145, expiry:''},
    {id:'SK005', goodsCode:'SP005', name:'能量棒', category:'食品', warehouse:'总部主仓库', location:'C-01-01', batch:'B20260901', qty:0, minQty:20, cost:7.5, expiry:'2026-12-01'},
    {id:'SK006', goodsCode:'SP006', name:'运动毛巾', category:'运动用品', warehouse:'网球中心仓', location:'A-02-01', batch:'B20260801', qty:88, minQty:40, cost:18, expiry:''},
  ],
  transfers: [
    {id:'TR20261028001', from:'总部主仓库', to:'篮球公园仓', items:'斯伯丁篮球×5', qty:5, reason:'场馆补货', status:'调入方待确认', createDate:'2026-10-28', operator:'刘库管'},
    {id:'TR20261025002', from:'总部主仓库', to:'网球中心仓', items:'运动毛巾×20', qty:20, reason:'新店备货', status:'已完成', createDate:'2026-10-25', operator:'刘库管'},
    {id:'TR20261020003', from:'篮球公园仓', to:'总部主仓库', items:'脉动×30', qty:30, reason:'滞销回仓', status:'已驳回', createDate:'2026-10-20', operator:'陈库管'},
  ],
  stocktakes: [
    {id:'ST20261026', warehouse:'总部主仓库', bookQty:545, actualQty:538, gain:0, loss:7, diffAmount:-52.5, status:'待确认', createDate:'2026-10-26', operator:'刘库管'},
    {id:'ST20261018', warehouse:'篮球公园仓', bookQty:44, actualQty:46, gain:2, loss:0, diffAmount:290, status:'已调整', createDate:'2026-10-18', operator:'陈库管'},
  ],
  losses: [
    {id:'LS20261029001', goods:'能量棒', warehouse:'总部主仓库', qty:24, amount:180, reason:'临期报废', owner:'刘库管', method:'直接报废', status:'已确认', date:'2026-10-29'},
    {id:'LS20261020002', goods:'斯伯丁篮球7号', warehouse:'篮球公园仓', qty:1, amount:145, reason:'表皮破损', owner:'陈库管', method:'降级处理', status:'待确认', date:'2026-10-20'},
  ],
  stockAlerts: [
    {id:'AL001', type:'最低库存', goods:'能量棒', warehouse:'总部主仓库', current:0, threshold:20, level:'严重', time:'2026-10-30 08:00'},
    {id:'AL002', type:'临期库存', goods:'能量棒', warehouse:'总部主仓库', current:0, threshold:'2026-12-01', level:'严重', time:'2026-10-30 08:00'},
    {id:'AL003', type:'最低库存', goods:'斯伯丁篮球7号', warehouse:'篮球公园仓', current:12, threshold:10, level:'提醒', time:'2026-10-30 08:00'},
    {id:'AL004', type:'临期库存', goods:'脉动运动饮料', warehouse:'总部主仓库', current:180, threshold:'2027-03-18', level:'提醒', time:'2026-10-30 08:00'},
  ],
  stockFlows: [
    {id:'SF001', type:'采购入库', goods:'农夫山泉550ml', qty:200, before:120, after:320, doc:'PO20261020003', warehouse:'总部主仓库', operator:'刘库管', time:'2026-10-20 10:20'},
    {id:'SF002', type:'销售出库', goods:'脉动运动饮料', qty:20, before:200, after:180, doc:'ORD20261030002', warehouse:'总部主仓库', operator:'张前台', time:'2026-10-30 14:10'},
    {id:'SF003', type:'调拨出库', goods:'斯伯丁篮球7号', qty:5, before:17, after:12, doc:'TR20261028001', warehouse:'总部主仓库', operator:'刘库管', time:'2026-10-28 09:30'},
    {id:'SF004', type:'报损出库', goods:'能量棒', qty:24, before:24, after:0, doc:'LS20261029001', warehouse:'总部主仓库', operator:'刘库管', time:'2026-10-29 16:00'},
    {id:'SF005', type:'盘点调整', goods:'斯伯丁篮球7号', qty:2, before:44, after:46, doc:'ST20261018', warehouse:'篮球公园仓', operator:'陈库管', time:'2026-10-18 18:00'},
  ],

  /* ---------- 业财一体化 ---------- */
  financeReceipts: [
    {id:'RC20261030001', txnNo:'XEF202610300001', amount:240.00, fee:1.56, net:238.44, channel:'微信支付', venue:'总部', merchant:'散客', order:'ORD20261030001', status:'已推送', matchType:'自动匹配', time:'2026-10-30 18:02'},
    {id:'RC20261030002', txnNo:'XEF202610300002', amount:800.00, fee:5.20, net:794.80, channel:'微信支付', venue:'总部', merchant:'陈晓明', order:'', status:'待推送', matchType:'手动匹配', time:'2026-10-30 16:40'},
    {id:'RC20261030003', txnNo:'CASH2026103001', amount:200.00, fee:0, net:200.00, channel:'现金', venue:'篮球公园', merchant:'散客', order:'ORD20261029003', status:'已匹配', matchType:'内部流水', time:'2026-10-30 15:20'},
    {id:'RC20261030004', txnNo:'BANK20261030001', amount:12500.00, fee:0, net:12500.00, channel:'对公转账', venue:'总部', merchant:'厦门建工集团有限公司', order:'', status:'待认领', matchType:'待匹配', time:'2026-10-30 11:00'},
    {id:'RC20261029005', txnNo:'XEF202610290005', amount:400.00, fee:2.60, net:397.40, channel:'微信支付', venue:'总部', merchant:'厦门建工集团有限公司', order:'ORD20261029004', status:'已核销', matchType:'自动匹配', time:'2026-10-29 17:05'},
  ],
  merchants: [
    {id:'MC001', name:'散客', finCode:'NCC-KH-0001', type:'个人', taxNo:'', mappings:4, status:'已同步', lastSync:'2026-10-30'},
    {id:'MC002', name:'陈晓明', finCode:'NCC-KH-0102', type:'个人', taxNo:'', mappings:1, status:'已同步', lastSync:'2026-10-28'},
    {id:'MC003', name:'厦门建工集团有限公司', finCode:'NCC-KH-0088', type:'企业', taxNo:'913502**********AB', mappings:1, status:'已同步', lastSync:'2026-10-25'},
    {id:'MC004', name:'鹭岛篮球俱乐部', finCode:'', type:'团体', taxNo:'', mappings:0, status:'同步失败', lastSync:'2026-10-26'},
  ],
  receivables: [
    {id:'AR20261030', venue:'总部', date:'2026-10-30', amount:26750.00, detail:38, status:'待推送', finNo:'', pushTime:'23:00 定时'},
    {id:'AR20261029', venue:'总部', date:'2026-10-29', amount:22380.00, detail:32, status:'已入账', finNo:'NCC-AR-20261029-002', pushTime:'2026-10-29 23:00'},
    {id:'AR20261028', venue:'篮球公园', date:'2026-10-28', amount:9820.00, detail:18, status:'推送失败', finNo:'', pushTime:'2026-10-28 23:00'},
    {id:'AR20261027', venue:'网球中心', date:'2026-10-27', amount:3680.00, detail:12, status:'已审核', finNo:'NCC-AR-20261027-003', pushTime:'2026-10-27 23:00'},
    {id:'AR20261026', venue:'羽毛球馆', date:'2026-10-26', amount:5940.00, detail:16, status:'已冲销', finNo:'NCC-AR-20261026-004', pushTime:'2026-10-26 23:00'},
  ],
  payables: [
    {id:'AP20261028001', supplier:'厦门体育用品有限公司', venue:'总部', amount:1800.00, type:'采购付款', status:'接口预留未启用', finNo:'', date:'2026-10-28'},
    {id:'AP20261025002', supplier:'鸿星体育批发', venue:'篮球公园', amount:1500.00, type:'供应商结算', status:'接口预留未启用', finNo:'', date:'2026-10-25'},
  ],
  revenueRecords: [
    {id:'RV001', order:'ORD20261030001', venue:'总部', bizType:'场地预约', occurTime:'2026-10-30 18:00', amount:240.00, preReceived:0, receivable:240.00, received:240.00, project:'体育服务收入', status:'已确认'},
    {id:'RV002', order:'RC20261030002', venue:'总部', bizType:'会员充值', occurTime:'2026-10-30 16:40', amount:800.00, preReceived:800.00, receivable:0, received:800.00, project:'预收账款', status:'递延中'},
    {id:'RV003', order:'ORD20261029003', venue:'篮球公园', bizType:'渠道订单', occurTime:'2026-10-29 19:00', amount:200.00, preReceived:0, receivable:200.00, received:200.00, project:'体育服务收入', status:'已确认'},
    {id:'RV004', order:'EV002', venue:'网球中心', bizType:'赛事收入', occurTime:'2026-10-12 18:00', amount:18600.00, preReceived:0, receivable:18600.00, received:18600.00, project:'赛事活动收入', status:'已确认'},
  ],
  reconcileDiffs: [
    {id:'DF202610', period:'2026-10', type:'金额不符', bizAmount:26750.00, finAmount:26680.00, diff:-70.00, doc:'AR20261030', reason:'手续费未扣减', status:'待处理'},
    {id:'DF202609', period:'2026-10', type:'单据缺失', bizAmount:9820.00, finAmount:0, diff:-9820.00, doc:'AR20261028', reason:'推送失败未重试', status:'处理中'},
    {id:'DF202608', period:'2026-10', type:'状态不一致', bizAmount:3680.00, finAmount:3680.00, diff:0, doc:'AR20261027', reason:'财务已审核业务未回写', status:'已处理'},
  ],
  apiLogs: [
    {id:'IL001', api:'用友NCC-应收单推送', doc:'AR20261030', time:'2026-10-30 23:00:12', cost:1820, code:'200', result:'成功', req:'{venue:"总部",amount:26750.00,date:"2026-10-30"}'},
    {id:'IL002', api:'用友NCC-收款单推送', doc:'RC20261030001', time:'2026-10-30 18:02:20', cost:960, code:'200', result:'成功', req:'{amount:240.00,fee:1.56,merchant:"散客"}'},
    {id:'IL003', api:'百旺-发票开具', doc:'ORD20261027006', time:'2026-10-27 20:15:03', cost:2300, code:'E1002', result:'失败', req:'{buyer:"王志强",amount:80.00}'},
    {id:'IL004', api:'兴E付-退款申请', doc:'ORD20261027006', time:'2026-10-27 20:40:11', cost:1450, code:'200', result:'成功', req:'{orderNo:"ORD20261027006",amount:80.00}'},
    {id:'IL005', api:'用友NCC-客商同步', doc:'MC004', time:'2026-10-26 10:12:08', cost:3100, code:'E2001', result:'失败', req:'{name:"鹭岛篮球俱乐部"}'},
  ],

  /* ---------- 电子发票 ---------- */
  invoiceConfigs: [
    {venue:'总部', subject:'厦门地丰置业有限公司', taxNo:'91350200**********', address:'厦门市思明区体育路88号', bank:'兴业银行厦门分行', account:'6222********8888', drawer:'王财务'},
    {venue:'篮球公园', subject:'厦门地丰体育文化有限公司', taxNo:'91350206**********', address:'厦门市湖里区金尚路168号', bank:'兴业银行厦门分行', account:'6222********6666', drawer:'陈财务'},
  ],
  invoiceItems: [
    {id:'II01', name:'体育场馆服务费', taxCode:'3070401000000000000', taxRate:6, included:false, type:'服务类'},
    {id:'II02', name:'体育用品销售', taxCode:'1090101000000000000', taxRate:13, included:false, type:'商品类'},
    {id:'II03', name:'赛事活动服务费', taxCode:'3070402000000000000', taxRate:6, included:false, type:'服务类'},
    {id:'II04', name:'物品租赁服务费', taxCode:'3040301000000000000', taxRate:13, included:false, type:'服务类'},
  ],
  invoices: [
    {id:'INV001', no:'243500000001234567', order:'ORD20261030001', customer:'陈晓明', type:'电子普通发票', amount:240.00, tax:13.58, status:'开具成功', venue:'总部', date:'2026-10-30 18:05', email:'chen@example.com', item:'体育场馆服务费'},
    {id:'INV002', no:'243500000001234568', order:'ORD20261029004', customer:'厦门建工集团有限公司', type:'增值税专用发票', amount:400.00, tax:22.64, status:'开具成功', venue:'总部', date:'2026-10-29 17:10', email:'finance@xmjg.com', item:'体育场馆服务费'},
    {id:'INV003', no:'', order:'ORD20261027006', customer:'王志强', type:'电子普通发票', amount:80.00, tax:4.53, status:'开具失败', venue:'总部', date:'2026-10-27 20:15', email:'wang@example.com', item:'体育场馆服务费', failReason:'购方信息校验不通过'},
    {id:'INV004', no:'243500000001234569', order:'EV002', customer:'厦门市网球协会', type:'电子普通发票', amount:18600.00, tax:1052.83, status:'已红冲', venue:'网球中心', date:'2026-10-12 18:30', email:'tennis@xm.cn', item:'赛事活动服务费'},
    {id:'INV005', no:'243500000001234570', order:'ORD20261029003', customer:'散客', type:'电子普通发票', amount:200.00, tax:11.32, status:'申请中', venue:'篮球公园', date:'2026-10-29 21:00', email:'', item:'体育场馆服务费'},
  ],
  redInvoices: [
    {id:'RD001', originNo:'243500000001234569', redNo:'243500000001239999', order:'EV002', amount:18600.00, reason:'赛事取消', applicant:'王财务', time:'2026-10-13 09:00', status:'已红冲'},
    {id:'RD002', originNo:'243500000001234567', redNo:'', order:'ORD20261030001', amount:240.00, reason:'开票信息错误', applicant:'张前台', time:'2026-10-31 10:20', status:'待红冲'},
  ],

  /* ---------- 短信通知 ---------- */
  smsChannels: [
    {id:'CH001', name:'阿里云短信主通道', provider:'阿里云', sign:'【地丰体育】', priority:1, status:'启用', successRate:98.6},
    {id:'CH002', name:'腾讯云备用通道', provider:'腾讯云', sign:'【地丰体育】', priority:2, status:'启用', successRate:97.2},
  ],
  smsRecords: [
    {id:'SM001', phone:'138****1234', template:'充值到账通知', content:'您充值800元成功，赠送80元，当前余额2350元', time:'2026-10-30 16:41', status:'成功', receipt:'2026-10-30 16:41'},
    {id:'SM002', phone:'139****5678', template:'预约确认', content:'您已预约总部B1羽毛球场 10-31 14:00-15:00', time:'2026-10-30 10:12', status:'成功', receipt:'2026-10-30 10:12'},
    {id:'SM003', phone:'136****3456', template:'余额不足提醒', content:'您的储值余额仅剩32元，请及时充值', time:'2026-10-30 09:00', status:'失败', receipt:'', failReason:'号码停机'},
    {id:'SM004', phone:'137****9012', template:'消费通知', content:'您消费240元，剩余余额1080元', time:'2026-10-29 20:03', status:'待回执', receipt:''},
  ],
  smsBroadcast: [
    {id:'BC001', name:'双十一会员促销', filter:'储值会员 + 近90天有消费', template:'活动通知', total:1280, success:1256, status:'已完成', time:'2026-10-28 10:00', operator:'李运营'},
    {id:'BC002', name:'篮球馆停馆通知', filter:'篮球公园会员', template:'场馆公告', total:320, success:318, status:'已完成', time:'2026-10-26 15:00', operator:'李运营'},
    {id:'BC003', name:'元旦活动预热', filter:'全部注册用户', template:'活动通知', total:3200, success:0, status:'定时待发', time:'2026-12-25 09:00', operator:'李运营'},
  ],

  /* ---------- 第三方平台 ---------- */
  platformGoods: [
    {id:'PG001', platform:'美团', name:'篮球半场2小时套餐', price:158, stock:50, venue:'篮球公园', status:'已同步', updateTime:'2026-10-28'},
    {id:'PG002', platform:'美团', name:'羽毛球1小时体验券', price:39.9, stock:200, venue:'羽毛球馆', status:'已同步', updateTime:'2026-10-27'},
    {id:'PG003', platform:'抖音', name:'网球私教体验课', price:199, stock:30, venue:'网球中心', status:'待同步', updateTime:'2026-10-30'},
    {id:'PG004', platform:'抖音', name:'篮球馆月卡', price:899, stock:10, venue:'篮球公园', status:'同步失败', updateTime:'2026-10-29'},
  ],
  channelOrders: [
    {id:'CO001', platform:'美团', platformNo:'MT202610290001', product:'篮球半场2小时套餐', buyer:'王先生', phone:'137****0001', amount:158, buyTime:'2026-10-29 12:00', validUntil:'2026-11-29', status:'已核销', verifyTime:'2026-10-29 19:05'},
    {id:'CO002', platform:'美团', platformNo:'MT202610300002', product:'羽毛球1小时体验券', buyer:'李女士', phone:'138****0002', amount:39.9, buyTime:'2026-10-30 08:00', validUntil:'2026-11-30', status:'待核销', verifyTime:''},
    {id:'CO003', platform:'抖音', platformNo:'DY202610280003', product:'网球私教体验课', buyer:'张先生', phone:'139****0003', amount:199, buyTime:'2026-10-28 20:00', validUntil:'2026-11-28', status:'已退款', verifyTime:''},
    {id:'CO004', platform:'美团', platformNo:'MT202610270004', product:'篮球半场2小时套餐', buyer:'赵女士', phone:'136****0004', amount:158, buyTime:'2026-10-27 09:00', validUntil:'2026-11-27', status:'核销失败', verifyTime:'2026-10-27 18:30'},
  ],
  channelReconcile: [
    {id:'CR202610', platform:'美团', period:'2026-10', orders:186, orderAmount:28460.00, settleAmount:27604.20, verifyQty:172, refundQty:6, diffAmount:-855.80, status:'待核对'},
    {id:'CR202609', platform:'抖音', period:'2026-10', orders:64, orderAmount:18920.00, settleAmount:18481.40, verifyQty:58, refundQty:3, diffAmount:-438.60, status:'已核对'},
  ],

  /* ---------- 经营分析 ---------- */
  businessMetrics: {
    revenue: 26750, orders: 128, customers: 96, avgPrice: 209,
    revenueMoM: 8.2, ordersMoM: 5.0, customersMoM: 3.1, avgPriceMoM: 4.9
  },
  venueCompare: [
    {venue:'地丰体育中心（总部）', revenue:18650, orders:68, customers:52, usage:75.2, avgPrice:274, cost:6820, perCapita:358},
    {venue:'地丰篮球公园', revenue:9820, orders:32, customers:26, usage:48.5, avgPrice:307, cost:3920, perCapita:378},
    {venue:'地丰网球中心', revenue:3680, orders:15, customers:11, usage:21.4, avgPrice:245, cost:1830, perCapita:335},
    {venue:'地丰羽毛球馆', revenue:5940, orders:23, customers:18, usage:31.8, avgPrice:258, cost:2410, perCapita:330},
  ],
  courtUsage: [
    {court:'2号篮球场', type:'篮球', usage:82.5, revenue:4820, peak:'18:00-21:00'},
    {court:'1号足球场', type:'足球', usage:68.2, revenue:6350, peak:'19:00-21:00'},
    {court:'B1羽毛球场', type:'羽毛球', usage:56.4, revenue:2940, peak:'14:00-17:00'},
    {court:'3号网球场', type:'网球', usage:18.5, revenue:1680, peak:'09:00-11:00'},
  ],
  peakDistribution: [
    {slot:'06-08', density:12}, {slot:'08-10', density:28}, {slot:'10-12', density:35},
    {slot:'12-14', density:22}, {slot:'14-16', density:40}, {slot:'16-18', density:58},
    {slot:'18-20', density:86}, {slot:'20-22', density:74}, {slot:'22-23', density:24},
  ],
  memberAnalytics: {total:1280, newMembers:86, rechargeAmount:42800, consumeAmount:38650, active30:612, active90:894, storedTotal:128600, cardStock:420},
  rechargeRanking: [
    {name:'厦门建工集团有限公司', count:3, amount:12800},
    {name:'陈晓明', count:5, amount:4200},
    {name:'鹭岛篮球俱乐部', count:2, amount:3800},
    {name:'林雅婷', count:3, amount:1860},
  ],
  goodsAnalytics: [
    {name:'农夫山泉550ml', category:'饮料', sales:386, amount:1158, stock:320, stockAmount:576, rate:'畅销'},
    {name:'脉动运动饮料', category:'饮料', sales:142, amount:852, stock:180, stockAmount:756, rate:'畅销'},
    {name:'红双喜DHS羽毛球', category:'球类', sales:28, amount:2380, stock:45, stockAmount:2790, rate:'平销'},
    {name:'能量棒', category:'食品', sales:6, amount:72, stock:0, stockAmount:0, rate:'滞销'},
  ],
  rentalAnalytics: {rentCount:186, rentRevenue:4280, depositCount:186, depositBalance:28600, damageAmount:1380, turnover:3.2},
  financeAnalytics: {revenue:386500, receivable:412800, received:398200, preReceived:128600, payable:18600, taxAmount:22800, taxExcl:363700},
  inventoryAnalytics: {balance:58620, inAmount:12800, outAmount:9640, gain:290, loss:412.5, alertCount:4},
  analyticsTrend: [
    {month:'5月', revenue:328000, orders:1420}, {month:'6月', revenue:356000, orders:1580},
    {month:'7月', revenue:382000, orders:1680}, {month:'8月', revenue:412000, orders:1820},
    {month:'9月', revenue:368000, orders:1620}, {month:'10月', revenue:386500, orders:1740},
  ],

  /* ---------- 系统管理 ---------- */
  systemConfigs: [
    {group:'预约参数', key:'bookingDays', label:'可提前预约天数', value:'7', unit:'天', desc:'对所有用户一致，与会员身份无关'},
    {group:'预约参数', key:'lastOrderTime', label:'最晚下单时间', value:'开场前30分钟', unit:'', desc:'超过该时间不可下单'},
    {group:'预约参数', key:'sameDayBooking', label:'当日是否可约', value:'是', unit:'', desc:'控制当日时段是否开放'},
    {group:'收银参数', key:'allowPriceChange', label:'是否允许改价', value:'是', unit:'', desc:'改价需记录原因'},
    {group:'收银参数', key:'printCopies', label:'单据打印份数', value:'2', unit:'份', desc:''},
    {group:'库存参数', key:'minStockAlert', label:'最低库存预警阈值', value:'20', unit:'', desc:'低于阈值触发预警'},
    {group:'库存参数', key:'expiryAlertDays', label:'临期预警天数', value:'30', unit:'天', desc:''},
    {group:'财务参数', key:'feeCalc', label:'手续费计算方式', value:'按银行返回金额', unit:'', desc:''},
    {group:'财务参数', key:'arPushTime', label:'应收单推送时间', value:'23:00', unit:'', desc:'按场馆每日汇总推送'},
    {group:'财务参数', key:'reconcileCycle', label:'对账周期', value:'每月', unit:'', desc:''},
    {group:'系统参数', key:'sessionTimeout', label:'会话超时', value:'30', unit:'分钟', desc:''},
    {group:'系统参数', key:'logRetention', label:'日志留存策略', value:'长期保留', unit:'', desc:'不做定期清理'},
  ],
  dicts: [
    {id:'D001', type:'场地类型', code:'courtType', items:['足球','篮球','网球','羽毛球','乒乓球'], status:'启用'},
    {id:'D002', type:'场地分区', code:'courtArea', items:['室内','室外'], status:'启用'},
    {id:'D003', type:'场地属性', code:'courtAttr', items:['普通场','VIP场'], status:'启用'},
    {id:'D004', type:'客户类型', code:'customerType', items:['个人','企业','团体'], status:'启用'},
    {id:'D005', type:'订单来源', code:'orderSource', items:['小程序','线下','美团','抖音'], status:'启用'},
    {id:'D006', type:'支付方式', code:'payMethod', items:['在线支付','现金','银行卡','储值余额','次卡','渠道结算'], status:'启用'},
    {id:'D007', type:'发票项目', code:'invoiceItem', items:['体育场馆服务费','体育用品销售','赛事活动服务费','物品租赁服务费'], status:'启用'},
    {id:'D008', type:'收支项目', code:'incomeExpense', items:['体育服务收入','赛事活动收入','商品销售收入','租赁收入','预收账款'], status:'启用'},
    {id:'D009', type:'商品分类', code:'goodsCategory', items:['饮料','食品','球类','运动用品'], status:'启用'},
  ],
  messageConfigs: [
    {id:'MC01', scene:'预约成功', wechat:'预约成功通知', sms:'预约确认', station:'站内消息', status:'启用'},
    {id:'MC02', scene:'开场提醒', wechat:'开场前提醒', sms:'预约确认', station:'站内消息', status:'启用'},
    {id:'MC03', scene:'充值到账', wechat:'-', sms:'充值到账通知', station:'站内消息', status:'启用'},
    {id:'MC04', scene:'退款通知', wechat:'退款结果通知', sms:'消费通知', station:'站内消息', status:'启用'},
    {id:'MC05', scene:'开票结果', wechat:'开票完成通知', sms:'-', station:'站内消息', status:'启用'},
  ],
  backups: [
    {id:'BK20261030', type:'自动备份', scope:'业务库+文件', start:'2026-10-30 02:00', end:'2026-10-30 02:18', size:'8.6GB', result:'成功', target:'本地+异地'},
    {id:'BK20261029', type:'自动备份', scope:'业务库+文件', start:'2026-10-29 02:00', end:'2026-10-29 02:17', size:'8.4GB', result:'成功', target:'本地+异地'},
    {id:'BK20261028', type:'手动备份', scope:'业务库', start:'2026-10-28 21:30', end:'2026-10-28 21:36', size:'6.2GB', result:'成功', target:'本地'},
    {id:'BK20261027', type:'自动备份', scope:'业务库+文件', start:'2026-10-27 02:00', end:'2026-10-27 02:00', size:'-', result:'失败', target:'本地+异地'},
  ],
  privacyFields: [
    {id:'PF01', module:'会员', field:'会员姓名', rule:'保留姓+*', decrypt:'会员管理员'},
    {id:'PF02', module:'会员', field:'会员手机号', rule:'138****1234', decrypt:'会员管理员'},
    {id:'PF03', module:'会员', field:'身份证号', rule:'前6后4其余*', decrypt:'系统管理员'},
    {id:'PF04', module:'客商', field:'联系人及电话', rule:'部分掩码', decrypt:'财务主管'},
    {id:'PF05', module:'发票', field:'发票抬头', rule:'企业名称完整展示', decrypt:'财务'},
    {id:'PF06', module:'发票', field:'税号', rule:'前6后4', decrypt:'财务主管'},
  ],
  migrationBatches: [
    {id:'MG01', object:'场馆与场地', total:42, migrated:42, status:'已核对', lastTime:'2026-09-18'},
    {id:'MG02', object:'商品与仓库库位', total:186, migrated:186, status:'已核对', lastTime:'2026-09-19'},
    {id:'MG03', object:'客商', total:1420, migrated:1408, status:'差异待处理', lastTime:'2026-09-20'},
    {id:'MG04', object:'会员与资产', total:2860, migrated:2812, status:'差异待处理', lastTime:'2026-09-22'},
    {id:'MG05', object:'订单与应收收款', total:12860, migrated:12860, status:'已核对', lastTime:'2026-09-24'},
    {id:'MG06', object:'库存', total:320, migrated:320, status:'待执行', lastTime:''},
  ],
  apiIntegrations: [
    {id:'AI01', name:'兴业银行兴E付', type:'银行', content:'聚合收款下单、支付结果通知、退款申请、退款结果通知、交易查询、收款流水下载', endpoint:'https://open.xybank.net/api', auth:'签名验签+RSA', status:'已联通', lastTest:'2026-10-30'},
    {id:'AI02', name:'百旺电子发票平台', type:'发票', content:'发票开具、红冲申请、状态查询、文件下载、购方信息校验', endpoint:'https://api.baiwang.com', auth:'Token', status:'已联通', lastTest:'2026-10-30'},
    {id:'AI03', name:'用友 NCC', type:'财务', content:'客商同步、应收单、收款单、付款单、状态回写、对账数据', endpoint:'https://ncc.difeng.com/api', auth:'AppKey+签名', status:'已联通', lastTest:'2026-10-30'},
    {id:'AI04', name:'美团开放平台', type:'第三方', content:'商品套餐同步、订单接入、券码核销、核销状态回传、退款', endpoint:'https://open.meituan.com', auth:'OAuth2', status:'联调中', lastTest:'2026-10-29'},
    {id:'AI05', name:'抖音开放平台', type:'第三方', content:'团购商品同步、订单接入、核销、退款状态', endpoint:'https://open.douyin.com', auth:'OAuth2', status:'联调中', lastTest:'2026-10-28'},
    {id:'AI06', name:'微信平台', type:'基础', content:'小程序登录、用户信息授权、订阅消息', endpoint:'https://api.weixin.qq.com', auth:'AppSecret', status:'已联通', lastTest:'2026-10-30'},
    {id:'AI07', name:'短信服务商', type:'基础', content:'短信下发、状态回执', endpoint:'https://dysmsapi.aliyuncs.com', auth:'AccessKey', status:'已联通', lastTest:'2026-10-30'},
  ],

  /* ---------- 小程序 C 端 ---------- */
  appVenues: [
    {id:'V001', name:'地丰体育中心', distance:'1.2km', address:'思明区体育路88号', openTime:'06:00-23:00', sports:['足球','篮球','网球'], tags:['室内','VIP场'], img:coverSVG('#0b63e5','#0ea5e9')},
    {id:'V002', name:'地丰篮球公园', distance:'3.8km', address:'湖里区金尚路168号', openTime:'07:00-22:30', sports:['篮球'], tags:['室内'], img:coverSVG('#c2410c','#f59e0b')},
    {id:'V003', name:'地丰网球中心', distance:'8.5km', address:'集美区杏林湾路66号', openTime:'06:30-22:00', sports:['网球'], tags:['室外'], img:coverSVG('#15803d','#22c55e')},
    {id:'V004', name:'地丰羽毛球馆', distance:'12km', address:'海沧区沧湖东路12号', openTime:'06:00-23:00', sports:['羽毛球'], tags:['室内'], img:coverSVG('#6d28d9','#a78bfa')},
  ],
  appSlots: [
    {time:'09:00-10:00', price:80, status:'available'}, {time:'10:00-11:00', price:80, status:'available'},
    {time:'11:00-12:00', price:120, status:'booked'}, {time:'14:00-15:00', price:80, status:'available'},
    {time:'15:00-16:00', price:80, status:'available'}, {time:'16:00-17:00', price:120, status:'available'},
    {time:'17:00-18:00', price:120, status:'locked'}, {time:'18:00-19:00', price:120, status:'available'},
    {time:'19:00-20:00', price:120, status:'available'}, {time:'20:00-21:00', price:120, status:'available'},
  ],
  appOrders: [
    {id:'ORD20261030001', type:'场地预约', title:'2号篮球场', venue:'地丰体育中心', time:'2026-11-01 18:00-20:00', amount:240, status:'待使用', code:'DF8K2M9Q'},
    {id:'ORD20261028007', type:'商品购买', title:'农夫山泉×2 脉动×2', venue:'地丰体育中心', time:'2026-10-28 15:20', amount:18, status:'已完成', code:'DF5H7N3P'},
    {id:'ORD20261026008', type:'物品租赁', title:'网球拍×2（2小时）', venue:'地丰网球中心', time:'2026-10-26 10:00', amount:80, status:'已完成', code:'DF2R6T8W'},
    {id:'ORD20260928009', type:'赛事报名', title:'地丰羽毛球团体赛·业余组', venue:'地丰羽毛球馆', time:'2026-11-25 09:00', amount:120, status:'已完成', code:'DF4Y1U5V'},
    {id:'ORD20261021010', type:'场地预约', title:'B1羽毛球场', venue:'地丰羽毛球馆', time:'2026-10-21 19:00-20:00', amount:60, status:'已取消', code:''},
  ],
  appTimeCards: [
    {name:'篮球10次卡', total:10, used:4, remain:6, validUntil:'2027-06-30'},
    {name:'网球5次卡', total:5, used:2, remain:3, validUntil:'2027-03-31'},
  ],
  appEvents: [
    {id:'EV003', name:'地丰羽毛球团体赛', mode:'线上报名', date:'2026-11-25', groups:[{name:'业余组', cap:32, joined:26, price:120},{name:'专业组', cap:16, joined:9, price:180}], status:'报名中'},
    {id:'EV001', name:'2026地丰杯青少年篮球邀请赛', mode:'线下赛事', date:'2026-11-15', groups:[], status:'筹备中'},
  ],
};
