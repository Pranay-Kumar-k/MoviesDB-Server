// Connecting the application to MongoDB with .env

const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
    try {
        const connection  = await mongoose.connect(process.env.ATLAS_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify:true
        });
        console.log(`Mongodb connected: ${connection.connection.host}`);
    }
    catch(err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB