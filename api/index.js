const express = require('express')
var cors = require('cors')

const postData = require('./post-data')









const app = express()
app.use(cors())
//app.use(bodyParser.urlencoded({ extended: true }));// to support URL-encoded bodies
// parse application/json
//app.use(bodyParser.json())
app.use(express.json({
    limit: "16mb"
}))

postData(app)




module.exports = app