const mongoose = require('mongoose');

const db = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ER';
        await mongoose.connect(mongoUri);
        console.log("Database Connected");
    } catch (err) {
        console.error("Database Connection Failed:", err.message);
    }
};

module.exports = db;