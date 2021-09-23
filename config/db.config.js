function connectDB() {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost:27017/tblog')
    mongoose.connection.once('connected', () => console.log('DB connection Established Successfully'))
}


module.exports = {connectDB}