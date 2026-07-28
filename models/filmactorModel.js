const mongoose = require('mongoose');
const filmActorSchema = new mongoose.Schema({
    actor_id: {
        type: mongoose.Schema.Types.ObjectId.ref("Actor"),
        required: true,
    },
    film_id: {
        type: mongoose.Schema.Types.ObjectId.ref("Film"),
        required: true
    },
    last_update : {
        type: Date,
        default : Date.now(),
        required: true
    }
});

module.exports = mongoose.model("FilmActor",filmActorSchema);