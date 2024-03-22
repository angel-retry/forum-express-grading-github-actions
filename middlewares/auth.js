const helpers = require('../helpers/auth-helpers')

// 一般user確認
const authenticated = (req, res, next) => {
  if (helpers.ensureAuthenticated(req)) return next()
  return res.redirect('/signin')
}

// admin使用者確認
const authenticatedAdmin = (req, res, next) => {
  if (helpers.ensureAuthenticated(req)) {
    if (helpers.getUser(req).isAdmin) {
      return next()
    }
    return res.redirect('/')
  }
  return res.redirect('/signin')
}

module.exports = {
  authenticated,
  authenticatedAdmin
}
