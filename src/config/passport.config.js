import passport from "passport";
import local from "passport-local";
import { usersManager } from "../dao/models/User.js";
import { isValidPassword } from "../utils/hashing.js";

const LocalStrategy = local.Strategy;
const initializePassport = () => {
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await usersManager.findOne({ email: username });
          if (!user) {
            console.log("User does not exist");
            return done(null, false, { message: "User does not exist" });
          }
          if (!isValidPassword(password, user.password)) {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

passport.serializeUser((user, done) => {
  // @ts-ignore
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await usersManager.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default initializePassport;
