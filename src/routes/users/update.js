import bcrypt from 'bcryptjs'
import { headers } from '../../lib'

export default function (options) {
  const { db, logger } = options

  return async function (req, res) {
    const userId = parseInt(req.params.id)

    let result, status
    options.startTime = Date.now()

    const encryptedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
    req.body.password = encryptedPassword

    try {
      result = await db.one('update users set first_name=$1, last_name=$2, email=$3, optional=$4, username=$5, password=$6 where id=$6 returning id, first_name, last_name, email, optional, username, password', [req.body.first_name, req.body.last_name, req.body.email, req.body.optional, req.body.username, req.body.password, userId])
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
