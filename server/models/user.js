const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const saltrounds = 10

const UserSchema = new Schema({
    username : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required: true,
    },
    contactNumber: {
        type: Number,
        required: true,
    }
})
UserSchema.pre('save',function(next){
    this.password = bcrypt.hashSync(this.password,saltrounds)
    next()
})
UserSchema.methods.comparePassword = function(plaintext, callback){
    return callback(null,bcrypt.compareSync(plaintext,this.password))
}



module.exports = mongoose.model('User',UserSchema)