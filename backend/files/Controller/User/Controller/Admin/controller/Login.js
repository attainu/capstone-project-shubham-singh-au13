const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import AllShoapkeper from "./../../../Model/Schema/shopkeperProfile";
const shoapkeprLogin = {
  postshoapKeprLogin: async (req, resp) => {
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
      let checkShoapkeper = await AllShoapkeper.findOne({ email: req.body.email });
      if (!checkShoapkeper) {
        return resp.status(400).json({
          data: [{ email: req.body.email }],
          err: { msg: "please enter the correct email id" },
        });
      }
      let passwordCheck = await bcrypt.compare(
        req.body.password,
        checkShoapkeper.password
      );
      if (passwordCheck == false) {
        return resp.status(400).json({
          data: [{ email: req.body.email, password: req.body.password }],
          err: { msg: "enter the correct password" },
        });
      }
      const token = await jwt.sign(
        { id: checkShoapkeper._id, type: "shoapkepr" },
        "medicine"
      );
      resp.cookie("token", token, { maxAge: 900000 });
      return resp.status(200).json({
        data: [token,checkShoapkeper.type],
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
export default shoapkeprLogin