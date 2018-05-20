import { headers } from '../../lib'

export default function (options) {
  const { db, logger } = options

  return async function (req, res) {
    let result, status
    options.startTime = Date.now()

    try {
      result = await db.one('insert into devices(manufacturer, model, serial)' + 'values( ${manufacturer}, ${model}, ${serial} ) returning id', req.body) // eslint-disable-line
      status = 200
    } catch (err) {
      status = 500
      result = { error: err.message || err }

      logger.error(err.message)
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
