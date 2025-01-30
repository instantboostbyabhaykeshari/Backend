const Order = require("../Models/Order.js");
const User = require("../Models/User.js");



exports.cashOnDelivery = async(req, res) => {
    try{
      console.log("hello phle hi aa gya error")
        const {foodItems, totalAmount} = req.body;

        //Validations
        if(!foodItems || !totalAmount) {
            return res.status(401).json({
                success: false,
                message: "Please provide foodItems and totalAmount."
            });
        }

        //Add new order
        const userId = (await User.find({userEmail: req.user.email}).sort({createdAt: -1}).limit(1))[0]._id;
        const newOrder = await Order.create({
        user: userId,
        email: req.user.email,
        items: foodItems.map((item) => ({
          foodItem: item.foodItemName,
          quantity: item.quantity,
          price: item.foodItemPrice,
        })),

        totalAmount,
        paymentMethod: "Cash On Delivery",
        paymentStatus: "Unpaid",
        status: "Processing",
        shippingAddress: {
          street: "Ramgarh, Sonebhadra",
          city: "Ramgarh",
          state: "Uttar Pradesh",
          zipCode: "231213",
          country: "India",
        },
      });

      console.log("Cash on delivery api newOrder: ", newOrder);

      return res.status(200).json({
        success: true,
        message: "Order successfully created for cash on delivery."
      });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something get wrong in cash on delivery api."
        });
    }
}