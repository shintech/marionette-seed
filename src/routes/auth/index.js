import _login from './login'

export default function (options) {
  return {
    login: _login(options)
  }
}
