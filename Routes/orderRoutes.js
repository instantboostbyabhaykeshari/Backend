const express = require("express");
const router = express.Router();

const {orderStatus, getAllOrders} = require("../Controllers/Order.js");

router.post("/allOrder", orderStatus);

router.get("/getAllOrders", getAllOrders);

module.exports = router;