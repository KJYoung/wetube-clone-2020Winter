export const joinController = (req, res) => res.render('join', { pageTitle : "Join"});
export const loginController = (req, res) => res.render('login', { pageTitle : "Login" });
export const logoutController = (req, res) => res.render('logout', { pageTitle : "Logout"});
export const usersController = (req, res) => res.render('users', { pageTitle : "Users"});
export const userDetailController = (req, res) => res.render('userDetail', { pageTitle : "UserDetail"});
export const editProfileController = (req, res) => res.render('editProfile', { pageTitle : "EditProfile"});
export const changePasswordController = (req, res) => res.render('changePassword', { pageTitle : "ChangePassword"});
