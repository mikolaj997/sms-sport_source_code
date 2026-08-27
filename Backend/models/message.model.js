

const mongoose = require('mongoose')
module.exports = mongoose.model('message', 
{
    Name: {type: String},
    User: {type: String},
    Date: {type: String},
   
})








