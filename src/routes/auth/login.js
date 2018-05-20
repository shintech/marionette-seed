import bcrypt from 'bcryptjs'

export default function (options) {
  const { db } = options

  return async function (req, res) {
    let user, response

    try {
      user = await db.one('select username, password from users where username = $1', req.body.username)
    } catch (err) {
      console.log(err)
      res.send(err)
    }

    response = bcrypt.compareSync(req.body.password, user.password)

    res.send(response)
  }
}
