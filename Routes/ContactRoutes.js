const express = require("express");
const router = express.Router();

const {contactUsController} = require("../Controllers/ContactUs");

router.post("/contact-us", contactUsController);


module.exports = router;
