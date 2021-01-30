import passport from "passport";
import routes from "../routes";

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = (accessToken, refreshToken, profile, cb) => {
  console.log(accessToken, refreshToken, profile, cb);
};

export const githubLoginPOSTLogin = (req, res) => {
  res.send(routes.home);
};
