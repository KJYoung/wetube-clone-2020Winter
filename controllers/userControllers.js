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
        localId: true,
        avatarUrl: routes.defaultAvatar,
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

export const meController = (req, res) => {
  console.log(`후:${req.user}`);
  res.render("userDetail", { pageTitle: "UserDetail", user: req.user });
};

export const userDetailController = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id);
    res.render("userDetail", { pageTitle: "UserDetail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const editProfileGETController = (req, res) => {
  res.render("editProfile", { pageTitle: "EditProfile" });
};

export const editProfilePOSTController = async (req, res) => {
  const {
    body: { name },
    file,
  } = req;
  const email = req.body.email ? req.body.email : req.user.email;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });
    res.redirect(routes.home);
  } catch (error) {
    res.render("editProfile", { pageTitle: "EditProfile" });
  }
};

export const changePasswordController = (req, res) =>
  res.render("changePassword", { pageTitle: "ChangePassword" });
