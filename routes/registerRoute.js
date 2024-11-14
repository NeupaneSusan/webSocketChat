const express = require("express");


const router = express.Router();

const { registerControllerForm, registerController } = require("../controllers/registerController")


router.get("/", registerControllerForm);
router.post("/", registerController
)


module.exports = router;