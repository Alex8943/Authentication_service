import express from "express";
import passport from "passport";
import session from "express-session";
import "./auth.js";


const app = express();

app.use(session({secret: "cats", resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());



function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
    
}


app.get("/", (req, res) => {
    res.render('index.ejs')
});

app.get("/auth/google",passport.authenticate('google', {scope: ['email', 'profile'] })
); 


app.get("/google/callback",
    passport.authenticate('google', {
        successRedirect: '/protected', 
        failureRedirect: '/auth/google/failure' 
    })
);

app.get("/auth/google/failure", (req, res) => {
    res.send("Failed to authenticate")
});

app.get("/protected", isLoggedIn, (req, res) => {
    res.render("login.ejs", {user: req.user})
});

app.get("/logoutNow", (req, res) => {
    res.render("login.ejs")
});

app.get('/logout', function(req, res){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});

const port = 3000;
app.listen(port, () => {console.log("Server is now running on port " + port)});