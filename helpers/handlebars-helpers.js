const dayjs = require('dayjs')

module.exports = {
  currentYear: () => dayjs().year(), // 取得當年年份作為 currentYear 的屬性值，並導出
  // 接收兩個參數，如果a=b就回傳{{#ifCond}}{{/ifCond}}內容
  ifCond: function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this)
  }
}
