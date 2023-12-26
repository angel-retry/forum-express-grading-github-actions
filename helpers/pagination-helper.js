// 取得offset，先預設參數，經過運算回傳數值
const getOffset = (page = 1, limit = 10) => { return (page - 1) * limit }

// 宣告變數，取得分頁的運算
const getPagination = (limit = 10, page = 1, total = 50) => {
  // 先計算總共幾頁
  const totalPage = Math.ceil(total / limit)

  // 宣告pages存放陣列，裡面值為各分頁的頁數 => [1,2,3,4,5]
  const pages = Array.from({ length: totalPage }, (_, index) => index + 1) // 先創造空陣列有幾個位置(index)，再放入值，值為index+1

  // 宣告currentPage為當前頁 三元運算子都從後面開始算
  const currentPage = page < 1 ? 1 : page > totalPage ? totalPage : page // page不可以比totalPage大

  const prev = currentPage - 1 < 1 ? 1 : currentPage - 1 // 前一頁不可以比1小
  const next = currentPage > totalPage ? totalPage : currentPage + 1 // 後一頁不可以比totalPage大

  // 回傳以上變數
  return {
    totalPage,
    pages,
    currentPage,
    prev,
    next
  }
}

module.exports = {
  getOffset,
  getPagination
}
