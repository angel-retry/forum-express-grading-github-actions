// fs是node原生模組，可查找檔案，再組合檔案
const fs = require('fs')

const localFileHandler = file => { // file是multer處理完的檔案
  return new Promise((resolve, reject) => {
    // 沒有file，就直接結束此程式
    if (!file) return resolve(null)
    // 宣告fileName存取完整圖片的路徑，upload是對外宣稱的資料夾
    const fileName = `upload/${file.originalname}`
    // 以下動作代表將圖片資料複製到upload資料夾去
    return fs.promises.readFile(file.path) // 先讀取檔案原本的路徑得取此檔案資料
      .then(data => fs.promises.writeFile(fileName, data))// 取得資料後，使用writeFile複製到指定的路徑及複製檔案資料
      .then(() => resolve(`/${fileName}`)) // 成功的話，使用reslove傳遞成功複製路徑的值，代表已解決
      .catch(err => reject(err))
  })
}

module.exports = {
  localFileHandler
}
