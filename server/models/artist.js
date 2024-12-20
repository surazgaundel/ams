const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name:{
        type:String,
        required:true,
        min:5
    },
    dob:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        enum:['male','female','other'],
        required:true
    },
    address:{
        type:String,
    },
    firstReleaseYear:{
        type:Number,
    },
    noOfAlbumReleased:{
        type:Number,
        default:0
    },
    createdAt:{
        type:String,
        default: Date.now()
    },
    updatedAt:{
        type:String,
        default: Date.now()
    },
})


module.exports = mongoose.model('ArtistSchema', ArtistSchema);