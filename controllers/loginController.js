const userModel = require("../model/userModel");

const bcrypt = require("bcrypt");
const loginControllerForm = (req, res) => {
    return res.render("login")
}

const loginController = async (req, res) => {
    const { email, password } = req.body;
    const userData = await userModel.findOne({ email: email });
    if (userData) {
        const match = bcrypt.compare(password, userData.password);
        if (match) {
            req.session.user = userData;
            return res.redirect('/dashboard');
        }
        return res.send('not found');

    }
    return res.send('not found')
}


module.exports = {
    loginControllerForm,
    loginController
}
