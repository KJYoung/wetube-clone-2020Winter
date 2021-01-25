import routes from "../routes";

export const joinGETController = (req, res) => {
    return res.render('join', { pageTitle : "Join"})
};

export const joinPOSTController = (req, res) => {
    const {
        body: { name, email, password, password2}
    } = req;
    if(password !== password2){
        res.status(400); //error code. Bad request.
        return res.render("join", { pageTitle : "Join"});
    } else {
        //TODO : Register USER & Log in.
        res.redirect(routes.home);
    }
};

export const loginGETController = (req, res) => {
    res.render('login', { pageTitle : "Login" })
};

export const loginPOSTController = (req, res) => {
    res.redirect(routes.home);
};
export const logoutController = (req, res) => {
    //TODO Process log out
    res.redirect(routes.home);
}
export const usersController = (req, res) => res.render('users', { pageTitle : "Users"});
export const userDetailController = (req, res) => res.render('userDetail', { pageTitle : "UserDetail"});
export const editProfileController = (req, res) => res.render('editProfile', { pageTitle : "EditProfile"});
export const changePasswordController = (req, res) => res.render('changePassword', { pageTitle : "ChangePassword"});
