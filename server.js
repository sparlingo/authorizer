const express = require('express')
const _ = require('lodash')
const cors = require('cors')
const morgan = require('morgan')

//const storage = require('./storage')

const app = express()
app.use(cors({
  credentials: true,
  origin: true
}))
app.use(morgan('tiny'))
app.disable('x-powered-by')
app.use(express.json())

require('./db/mongoose')
const userRouter = require('./routers/User')

app.use('/api', userRouter)
//app.use('/storage', storage)

app.use((err, req, res, next) => {
  if (err) {
    console.error(err.message)
    console.error(err.stack)
    return res.status(err.output.statusCode || 500).json(err.output.payload)
  }
})

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;
app.listen(port, () => {
  console.log("server running on port " + port)
})
