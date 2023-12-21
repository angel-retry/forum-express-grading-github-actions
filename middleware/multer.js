const multer = require('multer')

// 呼叫multer使用參數設定把使用者上船的圖片存到指定路徑的暫存資料夾
const upload = multer({ dest: 'temp/' })

module.exports = upload
