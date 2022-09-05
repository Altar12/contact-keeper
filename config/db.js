const mongoose = require('mongoose');
const config = require('config');

const connectDB = async () => {
    try {
        await mongoose.connect(config.get('mongoUri'));
        console.log('connected to database');
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;