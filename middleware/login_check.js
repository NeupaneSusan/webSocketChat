function checkLogin(req, res, next) {
    if (req.session.user) {
        next();
        return;
    }
    return res.redirect('/login')
}


module.exports = checkLogin;