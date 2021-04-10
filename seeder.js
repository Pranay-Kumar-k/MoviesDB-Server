const mongoose = require("mongoose");

const movies = require("./data/data.json");

const Movie = require("./models/movie.model");

const connectDB = require("./config/db");

connectDB();

const importData = async() => {
    try {
        await Movie.deleteMany();
        await Movie.insertMany(movies);
        console.log("Data imported successfully");
        process.exit();
    }
    catch(err) {
        console.log(`Error : ${err}`);
        process.exit(1);
    }
}

const destroyData = async() => {
    try {
        await Movie.deleteMany();
        console.log("Data destroyed successfully");
        process.exit();
    }
    catch(err) {
        console.log(`Error : ${err}`);
        process.exit(1);
    }
}

if(process.argv[2] === "-d") {
    destroyData();
}
else {
    importData();
}