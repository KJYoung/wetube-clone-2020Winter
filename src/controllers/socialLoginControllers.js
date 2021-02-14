import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const githubLogin = passport.authenticate("github", {
  successFlash: "Welcome to Wetube!",
  failureFlash: "Can't log in. Check the inputs",
});

export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;

      //정보 덮어쓰기 : #6.9 댓글에서 보고 떠오름.
      user.avatarUrl = avatarUrl;

      user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({
        email,
        name,
        githubId: id,
        avatarUrl,
        localId: false,
      });
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};

export const githubLoginPOST = (req, res) => {
  res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate("facebook", {
  successFlash: "Welcome to Wetube!",
  failureFlash: "Can't log in. Check the inputs",
});

export const facebookLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const {
    _json: { id, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    const avatarUrl = `https://graph.facebook.com/${id}/picture?type=large&access_token=${accessToken}`;
    if (user) {
      user.facebookId = id;

      //정보 덮어쓰기 : #6.9 댓글에서 보고 떠오름.
      user.avatarUrl = avatarUrl;

      user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({
        email,
        name,
        facebookId: id,
        avatarUrl,
        localId: false,
      });
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};

export const facebookLoginPOST = (req, res) => {
  res.redirect(routes.home);
};
