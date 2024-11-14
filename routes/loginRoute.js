const express = require("express");


const router = express.Router();

const { loginControllerForm, loginController } = require("../controllers/loginController")


router.get("/", loginControllerForm);

router.post("/", loginController);


module.exports = router;