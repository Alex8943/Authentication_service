const express = require('express');
const passport = require("passport");
const session = require("express-session");
require("./auth.js");
const app = express();

//I want to use ejs as my view engine



app.set("view engine", "ejs");

app.get("/auth", isNotLoggedIn, (req, res, ) => {
    res.render("index.ejs" );
});

app.get("/auth/google", 
    passport.authenticate("google", {scope: ["profile", "email"]})
);

app.get("/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/auth/failure", 
        successRedirect: "http://localhost:3000/" 
}));



app.get("/auth/failure", isNotLoggedIn, (req, res) => {
    res.send("Something went wrong");

}); 


function isLoggedIn (req, res, next) {
    if(req.user ? next() : res.sendStatus(401));
}

function isNotLoggedIn (req, res, next) {
    if(!req.user ? next() : res.sendStatus(401));
}

const port = 8080;
app.listen(port, () => {console.log("Server is now running on port " + port)});