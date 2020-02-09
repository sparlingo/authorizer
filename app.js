const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

require('./models/User')
const authRoutes = require('./routes/auth-routes')
const requireAuth = require('./middleware/auth')

const app = express()
app.use(bodyParser.json())
app.use(authRoutes)

let mongoUri = '' 
if (process.env.NODE_ENV === "development") {
  mongoUri = 'mongodb://localhost:27017/potassium_test'
} else {
  mongoUri = 'mongodb+srv://dbUser:futtbucker@cluster0-uthwo.mongodb.net/potassium?retryWrites=true'
}
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
  console.log('connected on mongo instance')
  console.log(mongoUri)
})
mongoose.connection.on('error', err => {
  console.log('error connecting to mongo', err)
})

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`)
})

app.listen(3000, () => {
  console.log('running on port 3000')
})
