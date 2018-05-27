import bcrypt from 'bcryptjs'
import { headers } from '../../lib'

export default function (options) {
  const { db, logger } = options

  return async function (req, res) {
    let result, status
    options.startTime = Date.now()

    const encryptedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
    req.body.password = encryptedPassword

    try {
      result = await db.one('insert into users(first_name, last_name, email, optional, username, password)' + 'values( ${first_name}, ${last_name}, ${email}, ${optional}, ${username}, ${password} ) returning id', req.body) // eslint-disable-line
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
