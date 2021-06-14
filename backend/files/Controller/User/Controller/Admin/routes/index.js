const app=require('express').Router()
import ShoapkeperSignup from './../controller/Signup';
import shoapkeprLogin from './../controller/Login';
import shoapkeperProfile from './../controller/showProfile'
import auth from './../../auth'
import medicine from './../controller/Addmedicine'
import singleShopkeperMedicine from './../controller/oneShopkepeprMedicine';

var cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "do5myffsz",
  api_key: "867162412586856",
  api_secret: "YaL6VCn5vfpGbZbPoDhzFtLjq00",
});
const upload = async (req, resp, next) => {
    if (req.files) {
      if (req.files.image.mimetype == "image/png") {
        const file = req.files.image;
        let result = await cloudinary.uploader.upload(file.tempFilePath);
        req.result = result.url;
        return next();
      } else {
        let err = new Error("please upload the single image file in png format ");
        return next(err);
      }
    } else {
      return next();
    }
  };
  const medicineImage = async (req, resp, next) => {
    if (req.files) {
      if (req.files.image.mimetype == "image/png") {
        const file = req.files.image;
        let result = await cloudinary.uploader.upload(file.tempFilePath);
        req.result = result.url;
        return next();
      } else {
        let err = new Error("please upload the single image file in png format ");
        return next(err);
      }
    } else {
      return next();
    }
  };

app.post('/signup',upload,ShoapkeperSignup.PostSignUpUser)
app.post('/login',shoapkeprLogin.postshoapKeprLogin)
app.get('/profile',auth.Shoapkepervalidation,shoapkeperProfile.ShowProfile)
app.post('/updateprofile',auth.Shoapkepervalidation,upload,shoapkeperProfile.changeProfile)
app.post('/addmedicine',auth.Shoapkepervalidation,medicineImage,medicine.addMedicine)
app.get('/allmedicine',medicine.showmedicine)
app.get('/single/allmedicine',auth.Shoapkepervalidation,singleShopkeperMedicine.detailOfMedicine)
app.post('/update/medicine/:id',auth.Shoapkepervalidation,singleShopkeperMedicine.editMedicine)
export default app
