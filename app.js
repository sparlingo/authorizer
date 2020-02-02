const express = require('express')
const _ = require('lodash')

const app = express()
var server_port = process.env.SERVER_PORT || 8080

require('./db/mongoose')
const userRouter = require('./routers/User')
app.use(express.json())
app.use('/api', userRouter)

app.listen(server_port, () => {
  console.log("server running on port " + server_port)
})