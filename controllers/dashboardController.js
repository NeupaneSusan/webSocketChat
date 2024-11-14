const userModel = require("../model/userModel");

const dashboardController = async (req, res) => {
    const user = req.session.user;
    const userlist = await userModel.find({ _id: { $nin: [user._id] } }, { password: 0 });
    return res.render("dashboard", { user, userlist })
}


module.exports = {
    dashboardController
}