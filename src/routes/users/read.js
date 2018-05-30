import { headers, MetaData } from '../../lib'

export default function (options) {
  const { db, logger } = options

  return {
    all: async function (req, res) {
      let response, meta, status
      let pageSize = 12
      let page = parseInt(req.query.page)

      let offset = (page !== 1) ? (page - 1) * pageSize : 0
      options.startTime = Date.now()

      try {
        let query = `select count(*) over() total_count, * from users order by id asc offset ${offset} fetch next ${pageSize} rows only;`

        response = await db.any(query)

        let count = response[0].total_count
        let pageCount = count / pageSize

        meta = {
          count: count,
          pageSize: pageSize,
          pageCount: pageCount
        }

        status = 200
      } catch (err) {
        response = { error: err.message || err }
        status = (err.constructor.name === 'QueryResultError') ? 404 : 500

        logger.error(response.error)
      }

      response = { meta, response }

      res.status(status)
        .format({
          json: () => {
            res.set(headers(response, options))
              .write(JSON.stringify(response))

            res.end()
          }
        })
    },

    one: async function (req, res) {
      const userId = parseInt(req.params.id)

      let result, status

      options.startTime = Date.now()

      try {
        result = await db.one('select * from users where id = $1', userId)
        status = 200
      } catch (err) {
        result = { error: err.message || err }
        status = (err.constructor.name === 'QueryResultError') ? 404 : 500

        logger.error(result.error)
      }

      res.status(status)
        .format({
          json: () => {
            res.set(headers(result, options))
              .write(JSON.stringify(result))

            res.end()
          }
        })
    }
  }
}
