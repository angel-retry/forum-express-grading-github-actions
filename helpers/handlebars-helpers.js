const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime') // dayjs裡面的套件

dayjs.extend(relativeTime) // 用extend使出relativeTime套件即可

module.exports = {
  currentYear: () => dayjs().year(), // 取得當年年份作為 currentYear 的屬性值，並導出
  // 接收兩個參數，如果a=b就回傳{{#ifCond}}{{/ifCond}}內容
  relativeTimeFromNow: a => dayjs(a).fromNow(),
  ifCond: function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this)
  }
}
