const logoutController = (req, res) => {
    req.session.destroy();
    return res.redirect('/login')
}


module.exports = {
    logoutController
}