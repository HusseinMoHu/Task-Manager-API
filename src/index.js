const express = require('express')
require('./db/mongoose') // To run mongoose.js file to connect to database
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

// Parses incoming requests with JSON
app.use(express.json())
// register our Routers with the express app
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
