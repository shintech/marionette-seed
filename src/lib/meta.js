export default function paginate (req, data, pageSize) {
  let total
  let pageCount
  let pageData = {}

  return new Promise(function (resolve, reject) {
    total = data.length

    pageCount = total / pageSize

    pageData = {
      pageSize: pageSize,
      total: total,
      pageCount: Math.ceil(pageCount)
    }

    resolve(pageData)
  })
}
