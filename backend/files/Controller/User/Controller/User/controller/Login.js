const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import AllUser from "./../../../Model/Schema/userProfile";
const userLogin = {
  postUserLogin: async (req, resp) => {
    try {
      if (!req.body.email) {
        return resp.status(400).json({
          data: [],
          err: { msg: "please enter the email" },
        });
      } else if (!req.body.password) {
        return resp.status(400).json({
          data: [],
          err: { msg: "please enter the password" },
        });
      }
      let checkuser = await AllUser.findOne({ email: req.body.email });
      if (!checkuser) {
        return resp.status(400).json({
          data: [{ email: req.body.email }],
          err: { msg: "please enter the correct email id" },
        });
      }
      let passwordCheck = await bcrypt.compare(
        req.body.password,
        checkuser.password
      );
      if (passwordCheck == false) {
        return resp.status(400).json({
          data: [{ email: req.body.email, password: req.body.password }],
          err: { msg: "enter the correct password" },
        });
      }
      const token = await jwt.sign(
        { id: checkuser._id, type: "user" },
        "private"
      );
      resp.cookie("token", token, { maxAge: 900000 });
      return resp.status(200).json({
        data: [token,checkuser.type],
        err: {},
      });
    } catch (e) {
      return resp.status(400).json({
        data: [],
        err: { msg: e.message },
      });
    }
  },
};
export default userLogin