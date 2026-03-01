require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const app = express()
const Router = require('./router/listRouter')
const userRouter = require('./router/userRouter')


const DbURI = process.env.DB_URI
const PORT = process.env.PORT

mongoose.connect(DbURI)
                    .then(app.listen(PORT, () => {
                        console.log(`Server running`)
                    }))
                    .catch((err) => console.log(err))

app.use(express.json())      
app.use(userRouter)
app.use("/toDo",Router)



