import { headers } from '../../lib'

export default function (options) {
  const { db, logger } = options

  return {
    all: async function (req, res) {
      let results, status, message, response

      options.startTime = Date.now()

      try {
        results = await db.any('select * from models')
        status = 200
        message = `Successfully fetched ${results.length} models...`
      } catch (err) {
        message = err.message || err
        status = (err.constructor.name === 'QueryResultError') ? 404 : 500

        logger.error(message)
      }

      response = { results, status, message }

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
      const modelId = parseInt(req.params.id)

      let result, status, message, response

      options.startTime = Date.now()

      try {
        result = await db.one('select * from models where id = $1', modelId)
        message = `Successfully fetched one model...`
        status = 200
      } catch (err) {
        message = err.message || err
        status = (err.constructor.name === 'QueryResultError') ? 404 : 500

        logger.error(message)
      }

      response = { result, status, message }

      res.status(status)
        .format({
          json: () => {
            res.set(headers(response, options))
              .write(JSON.stringify(response))

            res.end()
          }
        })
    }
  }
}
