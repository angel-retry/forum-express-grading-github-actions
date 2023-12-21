const { getUser, ensureAuthenticated } = require('../helpers/auth-helpers')

// 一般使用者登入驗證
const authenticated = (req, res, next) => {
  // 使用者是否有登入?等於req.isAuthenticated()
  if (ensureAuthenticated(req)) {
    // 有登入，可繼續往下走
    return next()
  }
  // 否，回傳到登入頁
  res.redirect('/signin')
}

// admin使用者登入驗證
const authenticatedAdmin = (req, res, next) => {
  // 先確認是否為一般使用者
  if (ensureAuthenticated(req)) {
    // 透過req.user.isAdmin判斷是否為admin身分者
    if (getUser(req).isAdmin) { // getUser(req) = req.user.isAdmin
      // 是，繼續下一步
      return next()
    }
    // 否，回首頁也就是/restaurants
    res.redirect('/')
  } else {
    res.redirect('/signin')
  }
}

module.exports = {
  authenticated,
  authenticatedAdmin
}
