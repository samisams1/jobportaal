import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../models";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findByPk(payload.userId);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
});

export { jwtStrategy };