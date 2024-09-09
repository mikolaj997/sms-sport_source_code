const mongoose = require('mongoose')
module.exports = mongoose.model('PhysicalActivity', 
{
    Date: {type: String},
    Name: {type: String},
    Time: {type: Number},
    ActivityCost: {type: Number}, 
    Transport: {type: String},
    Calories: {type: Number},
    CalorieCost:{type: Number},
    IsPlaned: {type: Boolean},
    User: {type: String}
   
})


