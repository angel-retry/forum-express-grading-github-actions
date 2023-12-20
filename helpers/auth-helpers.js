// 權責分離，避免app.js直接使用到req.user
// 宣告函數getUser，接受參數req，此函數會回傳req.user
const getUser = req => {
  return req.user || null
}

module.exports = {
  getUser
}
