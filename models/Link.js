const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
    wordFind:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: false
    },
    user:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

mongoose.model('links', LinkSchema)