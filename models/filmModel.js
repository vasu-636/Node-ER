const mongoose = require('mongoose');
const filmSchema = new mongoose.Schema({
    title:{
        type:String,
        required : true
    },
    description:{
        type: String,
        required: true
    },
    release_Year : {
        type : Number,
        required: true
    },
    language_id : {
        type : mongoose.Schema.Types.ObjectId.ref("Language"),
        required: true
    },
    rentalDuration : {
        type: String,
        required: true
    },
    rentalRate : {
        type: Number,
        required : true
    },
    length : {
        type: String,
        required: true
    },
    replacement_cost : {
        type: Number,
        required: true
    },
    ratiing: {
        type : Number,
        required : true
    },
    last_update: {
        type: Date,
        default: Date.now(),
        required: true
    },
    revenue_projection: {
        type: Number,
        required : true
    }
});

module.exports = mongoose.model("Film",filmSchema);