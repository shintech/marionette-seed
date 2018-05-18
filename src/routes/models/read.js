import { headers } from '../../lib'

export default function (options) {
  const { db, logger } = options

  return {
    all: async function (req, res) {
      let results, status

      options.startTime = Date.now()

      try {
        results = await db.any('select * from models')
        status = 200
      } catch (err) {
        results = { error: err.message || err }
        status = (err.constructor.name === 'QueryResultError') ? 404 : 500
        logger.error(results.error)
      }

      res.status(status)
        .format({
          json: () => {
            res.set(headers(results, options))
              .write(JSON.stringify(results))

            res.end()
          }
        })
    },

    one: async function (req, res) {
      const modelId = parseInt(req.params.id)

      let result, status

      options.startTime = Date.now()

      try {
        result = await db.one('select * from models where id = $1', modelId)
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
