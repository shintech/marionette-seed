import { headers } from '../../lib'

export default function (options) {
  const { db, logger } = options

  return async function (req, res) {
    const modelId = parseInt(req.params.id)

    let result, message, status, response
    options.startTime = Date.now()

    try {
      result = await db.one('update models set name=$1, attribute=$2 where id=$3 returning id, name, attribute', [req.body.name, req.body.attribute, modelId])
      status = 'success'
      message = `Updated model id: ${result.id}...`

      logger.info(message)
    } catch (err) {
      status = 'error'
      message = err.message

      logger.error(err.message)
    }

    response = {
      body: { result, status, message }
    }

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
