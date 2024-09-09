// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema({
//   text: {
//     type: String,
//     required: true,
//   },
//   sender: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Message = mongoose.model('Message', messageSchema);

// module.exports = Message;


const mongoose = require('mongoose')
module.exports = mongoose.model('messageBadminton', 
{
    Name: {type: String},
    User: {type: String},
    Date: {type: String},
   
})









