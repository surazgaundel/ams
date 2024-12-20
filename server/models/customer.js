const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    fullName:{
        type: String,
        required: true,
        min:5,
        max:10
    },
    email: {
        type:String,
        required:true
    },
    password:{
        type:String,
        required: true,
        min:6,
        max:12
    }
})


module.exports = mongoose.model('CustomerSchema',CustomerSchema);