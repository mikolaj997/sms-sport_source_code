const mongoose = require('mongoose')

const dbUri = 'url'

mongoose.set('strictQuery', false)

module.exports = () => {
    return mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true})
    }