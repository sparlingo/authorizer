const express = require('express')
const _ = require('lodash')

const app = express()

require('./db/mongoose')
const userRouter = require('./routers/User')
app.use(express.json())
app.use('/api', userRouter)

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, () => {
  console.log("server running on port " + port)
})
