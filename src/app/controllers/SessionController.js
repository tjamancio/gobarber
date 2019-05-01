const { User } = require('../models')

class SessionController {
  async create (req, res) {
    return res.render('auth/signin')
  }

  async store (req, res) {
    console.log(req.body)
    const { email, password } = req.body

    if (email === undefined) {
      return res.send('Merda')
    }
    const user = await User.findOne({ where: { email } })
    if (!user) {
      console.log('Usuário não encontrado')
      return res.redirect('/')
    }

    if (!(await user.checkPassword(password))) {
      console.log('Senha incorreta')
      return res.redirect('/')
    }

    return res.redirect('app/dashboard')
  }
}

module.exports = new SessionController()
