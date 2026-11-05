/* ===== 地丰体育场馆预约与管理系统 - Stub API ===== */
// 模拟异步API，所有方法返回Promise，不调用真实后端
window.API = {
  delay: 200,
  _simulate(data){ return new Promise(r=>setTimeout(()=>r(data), this.delay)); },
  
  // 场馆场地
  getVenues(){ return this._simulate(MOCK.venues); },
  getCourts(){ return this._simulate(MOCK.courts); },
  getPriceRules(){ return this._simulate(MOCK.priceRules); },
  
  // 客户会员
  getCustomers(){ return this._simulate(MOCK.customers); },
  getMembers(){ return this._simulate(MOCK.members); },
  getTimeCards(){ return this._simulate(MOCK.timeCards); },
  
  // 订单
  getOrders(){ return this._simulate(MOCK.orders); },
  
  // 赛事
  getEvents(){ return this._simulate(MOCK.events); },
  
  // 商品租赁
  getGoods(){ return this._simulate(MOCK.goods); },
  getRentalItems(){ return this._simulate(MOCK.rentalItems); },
  
  // 仓储
  getWarehouses(){ return this._simulate(MOCK.warehouses); },
  getPurchaseOrders(){ return this._simulate(MOCK.purchaseOrders); },
  
  // 业财
  getReceivables(){ return this._simulate(MOCK.financeReceivables); },
  getReceipts(){ return this._simulate(MOCK.financeReceipts); },
  
  // 发票
  getInvoices(){ return this._simulate(MOCK.invoices); },
  
  // 短信
  getSmsTemplates(){ return this._simulate(MOCK.smsTemplates); },
  
  // 系统
  getSystemLog(){ return this._simulate(MOCK.systemLog); },
  getOrgs(){ return this._simulate(MOCK.orgs); },
  getEmployees(){ return this._simulate(MOCK.employees); },
  getRoles(){ return this._simulate(MOCK.roles); },
  
  // 分析
  getDailyRevenue(){ return this._simulate(MOCK.dailyRevenue); },
  getChannelData(){ return this._simulate(MOCK.channelData); },
};
