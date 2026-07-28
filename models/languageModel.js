const mongoose = require('mongoose');
const languageSchema = new mongoose.Schema({

    name:{
        type:String,
        required: true
    },
    last_update: {
        type: Date,
        default: Date.now(),
        required: true   
    }
});

module.exports = mongoose.model("Language",languageSchema);