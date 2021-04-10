// App is initialized using express using on port 2021
// connecting the application to mongoDB database using mongoose

const express = require('express');

const connect = require("./config/db");

const {register,login} = require('./controllers/auth.controller')

const app = express();

app.use(express.json());

app.post("/register", register);

app.post("/login", login);

const start = async () => {
    await connect();

    app.listen(2020, () => {
        console.log("Server is up and running on port 2020")
    });    
}

start();