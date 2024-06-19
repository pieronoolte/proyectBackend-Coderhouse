const { Strategy } = require('passport-jwt');
const { config } = require('../../../../config');

const options = {
  jwtFromRequest: (req) => {
    let token = null;
    if (req && req.signedCookies) {
      console.log(req)
        token = req.signedCookies['jwt'];
    }
    return token;
},
  secretOrKey: config.jwtSecret
}

const JwtStrategy = new Strategy(
  options,
  (payload, done) => {
    return done(null, payload)
  }

);

module.exports = JwtStrategy;
