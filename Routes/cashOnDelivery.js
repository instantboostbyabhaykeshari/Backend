const express = require("express");
const router = express.Router();

const {auth} = require("../Middlewares/authorization.js");
const {cashOnDelivery} = require("../Controllers/CashOnDelivery.js");

router.post("/cashOnDelivery", auth, cashOnDelivery);

module.exports = router;