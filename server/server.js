const express = require("express")
const app = express()
const mongoose = require("mongoose")
const xss = require("xss-clean")
const mongoSanitize = require("express-mongo-sanitize")
const routes = require("./routes")
require("dotenv").config()
const { handleError, convertToApiError } = require("./middleware/apiError")
const passport = require("passport")
const { jwtStrategy } = require("./middleware/passport")

//mongodb+srv://admin:<password>@cluster0.llcdi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`
mongoose.connect(mongoUri)

app.use(express.json())




app.use(xss())
app.use(mongoSanitize())

//passport
app.use(passport.initialize())
passport.use('jwt', jwtStrategy)

app.use("/api", routes)

// Error API
app.use(convertToApiError)
app.use((err, req, res, next) => {
    handleError(err, res)
})

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

