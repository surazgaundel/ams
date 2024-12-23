const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MusicSchema = new Schema({
    title:{
        type:String,
        required:true,
        min:5
    },
    artistId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Artist', 
        required: true 
    },
    albumName:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        enum:['rnb','country','classic','rock','jazz'],
        required:true
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


module.exports = mongoose.model('MusicSchema', MusicSchema);