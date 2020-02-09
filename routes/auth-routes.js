const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const User = mongoose.model('User')

router.post('/signup', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = new User({ email, password })
    await user.save()

    const token = jwt.sign({ userId: user._id }, 'thisismylittlesecret')
    res.status(200).send({token})
  } catch (err) {
    return res.status(422).send(err.message)
  }

})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if(!email || !password) {
    return res.status(422).send({ error: 'please provide an email and password'})
  }

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(422).send({ error: 'No user like dat yo' })
  }

  try {
    await user.comparePassword(password)
    const token = jwt.sign({ userId: user._id }, 'thisismylittlesecret')
    res.send({ token })
  } catch (err) {
    return res.status(422).send({ error: 'Invalid password or email' })
  }
})

module.exports = router