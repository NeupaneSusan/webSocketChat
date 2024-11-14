const express = require("express");


const router = express.Router();

const { chatSaveController } = require("../controllers/chatController");


router.post("/", chatSaveController);


module.exports = router;