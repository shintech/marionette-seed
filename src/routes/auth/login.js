import bcrypt from 'bcryptjs'
import { headers } from '../../lib'

export default function (options) {
  const { db, logger } = options

  return async function (req, res) {
    let user, response, status

    try {
      user = await db.one('select username, password from users where username = $1', req.body.username)
      response = await bcrypt.compare(req.body.password, user.password)
      status = 200
    } catch (err) {
      response = { error: err.message || err }
      status = (err.constructor.name === 'QueryResultError') ? 404 : 500

      logger.error(response.error)
    }

    let obj = {
      response: response
    }

    res.status(status)
      .format({
        json: () => {
          res.set(headers(obj, options))
            .write(JSON.stringify(obj))

          res.end()
        }
      })
  }
}
