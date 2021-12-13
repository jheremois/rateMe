import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { pool } from "../config/database";
import appConfig from "../config/environments";
import { userType } from "../models/interfaces/user.type";
const conf = appConfig.passport.JWT

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: conf.CLIENT_SECRET
};

export default new Strategy(opts, async (payload, done) => {
console.log("playload", payload.username);
  try {
    const user = await pool.query(`SELECT * from users WHERE user_id = '${payload.user_id}'`, (err, response: userType[])=>{
        console.log("playload ->", payload.user_id);
        
        return response
    })
    if (user) {
        console.log("playload", payload.username);
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    console.log(error);
  }
});