import { headers } from '../../lib'

export default function (options) {
  const { db, logger } = options

  return async function (req, res) {
    const userId = parseInt(req.params.id)

    let result, status
    options.startTime = Date.now()

    try {
      result = await db.one('delete from users where id = $1 returning id', userId)
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
