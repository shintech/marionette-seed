import { headers } from '../../lib'

export default function (options) {
  const { db, logger } = options

  return async function (req, res) {
    const modelId = parseInt(req.params.id)

    let result, status
    options.startTime = Date.now()

    try {
      result = await db.one('update models set first_name=$1, last_name=$2, email=$3, optional=$4 where id=$5 returning id, first_name, last_name, email, optional', [req.body.first_name, req.body.last_name, req.body.email, req.body.optional, modelId])
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
