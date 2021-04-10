// App is initialized using express using on port 2021
// connecting the application to mongoDB database using mongoose

const express = require('express');

const connect = require("./config/db");

const {register,login} = require('./controllers/auth.controller')

const userController = require("./controllers/user.controller");

const allUsersController = require("./controllers/users.controller");

const moviesController = require("./controllers/movie.controller");

const app = express();

app.use(express.json());

app.post("/account/register", register);

app.post("/account/login", login);

app.use("/user", userController);

app.use("/users", allUsersController);

app.use("/movie", moviesController);

const start = async () => {
    await connect();

    app.listen(2020, () => {
        console.log("Server is up and running on port 2020")
    });    
}

start();