const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ContactSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name : {
        type: String,
        required: true,
    },
    contactNumber: {
        type: Number,
        required: true,
    },
    email : {
        type: String,
        required : true
    },
    address : {
        type: String,
        required: true,
    },
    
})


module.exports = mongoose.model('Contact',ContactSchema)