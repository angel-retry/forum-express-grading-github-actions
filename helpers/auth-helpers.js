// 權責分離，避免app.js直接使用到req.user
// 宣告函數getUser，接受參數req，此函數會回傳req.user
const getUser = req => {
  return req.user || null
}

// 宣告ensureAuthenticated接收參數，回傳此使用者已有登入過
const ensureAuthenticated = req => {
  return req.isAuthenticated()
}

module.exports = {
  getUser,
  ensureAuthenticated
}
