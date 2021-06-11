const app = require("express").Router();
var cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "do5myffsz",
  api_key: "867162412586856",
  api_secret: "YaL6VCn5vfpGbZbPoDhzFtLjq00",
});
import userLogin from "../controller/Login";
import UserSignUp from "./../controller/Signup";
import userProfile from "./../controller/showProfile";
import auth from "./../../auth";
import Medicine from './../controller/MedicineDetail';
import Cart from './../controller/Cart';
const upload = async (req, resp, next) => {
  if (req.files) {
    if (req.files.image.mimetype == "image/png") {
      const file = req.files.image;
      let result = await cloudinary.uploader.upload(file.tempFilePath);
      req.result = result.url;
      return next();
    } else {
      let err = new Error("please upload the image file in png format");
      return next(err);
    }
  } else {
    return next();
  }
};
app.post("/signup", upload, UserSignUp.PostSignUpUser);
app.post("/login", userLogin.postUserLogin);
app.get("/profile", auth.userValidation, userProfile.ShowProfile);
app.post("/updateprofile", auth.userValidation,upload, userProfile.changeProfile);
app.get("/medicine/detail/:id", auth.userValidation,Medicine.medicineDetail);
app.post("/add/medicine/cart/:id",auth.userValidation,Cart.AddingMedicineCart)
app.get("/show/Allmedicine/cart",auth.userValidation,Cart.showcartItems)
export default app;
