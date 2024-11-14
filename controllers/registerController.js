const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

const registerControllerForm = (req, res) => {
    return res.render("register")
}

const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const user = userModel({
            name: name,
            email: email,
            password: passwordHash
        });
        await user.save();
        return res.redirect('/login');
    } catch (eror) {
        console.log(error);
    }
}


module.exports = {
    registerControllerForm,
    registerController
}
