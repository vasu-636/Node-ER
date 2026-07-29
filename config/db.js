const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/ER');
        console.log("Database Connected");
    } catch (err) {
        console.error("Database Connection Failed:", err.message);
    }
};

module.exports = db;