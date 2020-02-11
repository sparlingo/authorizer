const express = require('express')
const _ = require('lodash')
const cors = require('cors')

const app = express()
app.use(cors)
app.use(express.json())

require('./db/mongoose')
const userRouter = require('./routers/User')

app.use('/api', userRouter)

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8000;
const server = app.listen(port, () => {
  console.log("server running on port " + port)
})
