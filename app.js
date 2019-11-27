const express = require('express')
const app = express()
const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI
const users = require('./routes/api/users')
const tweets = require('./routes/api/tweets')
const passport = require('passport')
const bodyParser = require('body-parser')
const User = require('./models/User')


mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err))

app.use(bodyParser.urlencoded({
    extended: false
})) // respond to other stuff like Postman
app.use(bodyParser.json()) // respond to json requests

app.use(passport.initialize()) // middleware for passport
require('./config/passport')(passport) 

app.use("/api/users", users)
app.use("/api/tweets", tweets)

const port = process.env.PORT || 5000

app.listen(port, () => {console.log(`Listening on port ${port}`)} )