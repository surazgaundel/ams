// user schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    firstName:{
        type: String,
		required: true,
		min:3
    },
    lastName:{
        type: String,
		required: true,
		min:3
    },
    email:{
        type: String,
		required: true,
    },
    password:{
        type:String,
        required: true,
        min:6,
        max:12
    },
    phone:{
        type:Number,
        required: true,
    },
    dob:{
        type:String,
        required: true,
    },
    gender:{
        type:String,
        enum: ['male', 'female','other'],
        required: true
    },
    address:{
        type:String,
        required: true,
    },
    createdAt:{
        type:String,
        default: Date.now()
    },
    updatedAt:{
        type:String,
        default: Date.now()
    }
})

module.exports = mongoose.model('UserSchema',UserSchema)