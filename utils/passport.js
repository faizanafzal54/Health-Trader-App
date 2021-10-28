var passport = require("passport");
var FacebookTokenStrategy = require("passport-facebook-token");
var config = require("../config").development;
const userDao = require("../daos/userDao");

module.exports.facebookStrategy = () => {
  passport.use(
    new FacebookTokenStrategy(
      {
        clientID: config.facebookAuth.appId,
        clientSecret: config.facebookAuth.appSecret,
        fbGraphVersion: "v3.0",
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          const prevUser = await userDao.findOneByEmail(profile._json.email);
          if (prevUser === null) {
            return done(null, profile, "signup");
          } else {
            if (
              prevUser.socialId === profile.id &&
              prevUser.socialProvider === profile.provider
            ) {
              return done(null, prevUser, "login");
            } else {
              let err = new Error("Account not valid");
              err.statusCode = 400;
              return done(err);
            }
          }
        } catch (err) {
          console.log("Error,", err);
          return done(err);
        }
      }
    )
  );
};
