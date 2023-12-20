module.exports = {
  generalErrorHandler (err, req, res, next) {
    // 判斷傳入的err是不是Error型別
    if (err instanceof Error) {
      // 是，使用快閃訊息傳送錯誤訊息(Error裡有兩種屬性就是name、message)
      req.flash('error_messages', `${err.name} : ${err.message}`)
    } else {
      // 否，將錯誤訊息傳送即可
      req.flash('error_messages', `${err}`)
    }
    res.redirect('back')
    next(err)
  }
}
