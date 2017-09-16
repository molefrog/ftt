const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.use(bodyParser.json())

// Serve static files
app.use(express.static(path.resolve('./public')))
app.listen(9000)
