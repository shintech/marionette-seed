import { headers } from '../../lib'

export default function (options) {
  const { db, logger } = options

  return async function (req, res) {
    const deviceId = parseInt(req.params.id)

    let result, message, status, response
    options.startTime = Date.now()

    try {
      result = await db.one('update devices set manufacturer=$1, model=$2, serial=$3 where id=$4 returning id', [req.body.manufacturer, req.body.model, req.body.serial, deviceId])
      status = 'success'
      message = `Updated device id: ${result.id}...`
    } catch (err) {
      status = 'error'
      message = err.message

      logger.error(err.message)
    }

    response = { result, status, message }

    res.status(200)
      .format({
        json: () => {
          res.set(headers(response, options))
            .write(JSON.stringify(response))

          res.end()
        }
      })
  }
}
