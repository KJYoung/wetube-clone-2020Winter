import passport from "passport";
import GithubStarategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import {
  facebookLoginCallback,
  githubLoginCallback,
} from "./controllers/socialLoginControllers";
import routes from "./routes";

passport.use(User.createStrategy());
passport.use(
  new GithubStarategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://shrouded-scrubland-35699.herokuapp.com${routes.githubCallback}`
        : `https://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://shrouded-scrubland-35699.herokuapp.com${routes.facebookCallback}`
        : `https://localhost:4000${routes.facebookCallback}`,
      profileFields: ["id", "displayName", "photos", "email"],
      scope: ["public_profile", "email"],
    },
    facebookLoginCallback
  )
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
