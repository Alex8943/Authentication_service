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
}, 
    function(request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.serializeUser(function( user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});