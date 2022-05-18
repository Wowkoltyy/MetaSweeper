const express = require('express')
const path = require("path")
const app = express()

// app.set('view engine', 'ejs')
// app.set('views', path.resolve(__dirname, 'ejs'))

app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(3000)