
const mongoose = require('mongoose')
module.exports = mongoose.model('user', 
{
    Name: {type: String},
    Password: {type: String},
    Location: {type: String},
    Sport: {type: String},
    TransportType: {type: String}
})















// // // models/User.js
// // const mongoose = require('mongoose');
// // const bcrypt = require('bcryptjs');

// // const UserSchema = new mongoose.Schema({
// //   username: { type: String, required: true, unique: true },
// //   password: { type: String, required: true }
// // });

// // // Hashowanie hasła przed zapisem
// // UserSchema.pre('save', async function(next) {
// //   if (!this.isModified('password')) return next();
// //   const salt = await bcrypt.genSalt(10);
// //   this.password = await bcrypt.hash(this.password, salt);
// //   next();
// // });

// // // Porównywanie hasła
// // UserSchema.methods.comparePassword = function(candidatePassword) {
// //   return bcrypt.compare(candidatePassword, this.password);
// // };

// // module.exports = mongoose.model('User', UserSchema);
