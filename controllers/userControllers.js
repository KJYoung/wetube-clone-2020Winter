import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const joinGETController = (req, res) =>
  res.render("join", { pageTitle: "Join" });

export const joinPOSTController = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400); //error code. Bad request.
    return res.render("join", { pageTitle: "Join" });
  } else {
    //TODO : Register USER & Log in.
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home); //개선 지점.
    }
  }
};

export const loginGETController = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

export const loginPOSTController = passport.authenticate("local", {
  successRedirect: routes.home,
  failureRedirect: routes.login,
});

export const logoutController = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
export const usersController = (req, res) =>
  res.render("users", { pageTitle: "Users" });
export const userDetailController = (req, res) =>
  res.render("userDetail", { pageTitle: "UserDetail" });
export const editProfileController = (req, res) =>
  res.render("editProfile", { pageTitle: "EditProfile" });
export const changePasswordController = (req, res) =>
  res.render("changePassword", { pageTitle: "ChangePassword" });
