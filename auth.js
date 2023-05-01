import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'; 


const GOOGLE_CLIENT_ID = "645825230516-mae2g5qhkn9t1kqsv2d828l8h9qg55lc.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

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