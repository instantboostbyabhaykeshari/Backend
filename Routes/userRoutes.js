const express = require("express");
const router = express.Router();

const {sendOTP, signUp, getEmailPhoneNumber, logout} = require("../Controllers/auth.js");

router.post("/sendOtp", sendOTP);
router.post("/signUp", signUp);

router.get("/profile", getEmailPhoneNumber);

router.delete("/deleteUser", logout);

module.exports = router;
