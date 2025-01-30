const express = require("express");
const app = express();
const cors = require("cors");
const database = require("./Config/Database.js");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const { cloudinaryConnect } = require("./Config/Cloudinary.js");
const reverseGeocodeRoute = require("./Routes/reverseGeocode.js");
cloudinaryConnect();

const cookieParser = require("cookie-parser");
app.use(cookieParser());


const dotenv = require("dotenv");
dotenv.config();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads/tmp/", // Ensure this directory exists
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
    abortOnLimit: true, // Stop processing if file exceeds limit
    createParentPath: true, // Automatically create directories if they don't exist
  })
);
app.use(cors({
  origin: "https://foodfunstore.vercel.app"
}));

//DataBase connection
database.connect();

//Routes import
const userRoutes = require("./Routes/userRoutes.js");
const categoryRoutes = require("./Routes/categoryRoutes.js");
const foodItemRoutes = require("./Routes/foodItemRoutes.js");
const paymentRoutes = require("./Routes/Payment.js");
const orderRoutes = require("./Routes/orderRoutes.js");
const contactRoutes = require("./Routes/ContactRoutes.js");
const cashOnDeliveryRoutes = require("./Routes/cashOnDelivery.js");

app.use("/api/v1", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/food-items", foodItemRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1", contactRoutes);
app.use("/api", reverseGeocodeRoute);
app.use("/api/v1", cashOnDeliveryRoutes);

app.get("/", (req, res) => {
    res.send("Hello, I am BiteTasty.");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port} successfully.`);
});