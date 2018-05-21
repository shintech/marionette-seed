import { headers, MetaData } from '../../lib'

export default function (options) {
  const { db, logger } = options

  return {
    all: async function (req, res) {
      let response, meta, status

      options.startTime = Date.now()

      try {
        response = await db.any('select * from devices')
        meta = await MetaData(req, response, 10)
        status = 200
      } catch (err) {
        response = { error: err.message || err }
        status = (err.constructor.name === 'QueryResultError') ? 404 : 500

        logger.error(response.error)
      }

      let obj = { meta, response }

      res.status(status)
        .format({
          json: () => {
            res.set(headers(obj, options))
              .write(JSON.stringify(obj))

            res.end()
          }
        })
    },

    one: async function (req, res) {
      const deviceId = parseInt(req.params.id)

      let result, status

      options.startTime = Date.now()

      try {
        result = await db.one('select * from devices where id = $1', deviceId)
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
