const User = require('./database/user.js');

if(process.env !== 'production'){
    require('dotenv').config();
};
    
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20'); 


GOOGLE_CLIENT_ID = "xxxxxx";
GOOGLE_CLIENT_SECRET = "xxxxx"

passport.use(new GoogleStrategy({

    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback", 
    passReqToCallback: true
}, function(accessToken, refreshToken, profile, done) {
    // Try to find the user in our database
    User.findOne({ where: { googleId: profile.id } })
        .then((existingUser) => {
            if (existingUser) {
                // If the user already exists, call `done` with the user
                done(null, existingUser);
            } else {
                // If the user doesn't exist, create a new user
                User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    picture: profile.photos[0].value
                }).then((newUser) => {
                    done(null, newUser);
                });
            }
        })
        .catch((err) => {
            done(err);
        });
}));


passport.serializeUser(function( user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});