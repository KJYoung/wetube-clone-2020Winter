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

export const meController = async (req, res) => {
  const user = await User.findById(req.user.id).populate("videos");
  res.render("userDetail", { pageTitle: "MyDetail", user });
};

export const userDetailController = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
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

  const oldEmail = req.user.email;
  const newEmail = req.body.email ? req.body.email : oldEmail;

  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email: newEmail,
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });
    if (newEmail === oldEmail) {
      res.redirect(routes.me);
    } else {
      res.redirect(routes.home);
    }
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};

export const changePasswordGETController = (req, res) => {
  res.render("changePassword", { pageTitle: "ChangePassword" });
};

export const changePasswordPOSTController = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.redirect(400, `/users${routes.changePassword}`);
    } else {
      await req.user.changePassword(oldPassword, newPassword);
      res.redirect(routes.me);
    }
  } catch (error) {
    res.redirect(400, `/users${routes.changePassword}`);
  }
};
