const jwt = require("jsonwebtoken");
// const validationWithresp = {
//   userValidation: async (req, resp, next) => {
//     try {
//       if (!req.cookies.token) {
//         return resp.status(400).json({
//           data: [],
//           err: { msg: "please login" },
//         });
//       }
//       const decode = await jwt.verify(req.cookies.token, "private");
//       req.userId = decode.id;
//       req.types = decode.type;
//       return next();
//     } catch (e) {
//       return resp.status(400).json({
//         data: [],
//         err: { msg: "please login" },
//       });
//     }
//   },
//   Shoapkepervalidation: async (req, resp, next) => {
//     try {
//       if (!req.cookies.token) {
//         return resp.status(400).json({
//           data: [],
//           err: { msg: "please login" },
//         });
//       }
//       const decode = await jwt.verify(req.cookies.token, "medicine");
//       req.ShoapkeperId = decode.id;
//       req.types = decode.type;
//       return next();
//     } catch (e) {
//       return resp.status(400).json({
//         data: [],
//         err: { msg: "please login" },
//       });
//     }
//   },
// };
// export default validationWithresp

const validationWithresp = {
  userValidation:async (req, resp, next) => {
    try {
      const token = req.header("token");
      if (!token) {
        return resp.status(200).json({
          data: [],
          err: { msg: "please login" },
        });
      }
      const decode = await jwt.verify(req.header("token"), "private");
      req.userId = decode.id;
      req.types = decode.type;
      return next();
    } catch (e) {
      return resp.status(400).json({
        data: [],
        err: { msg: "please login" },
      });
    }
  },
    Shoapkepervalidation:async (req, resp, next) => {
      try {
        const token = req.header("token");
        if (!token) {
          return resp.status(200).json({
            data: [],
            err: { msg: "please login" },
          });
        }
        const decode = await jwt.verify(req.header("token"), "medicine");
        req.ShoapkeperId = decode.id;
        req.types = decode.type;
        return next();
      } catch (e) {
        return resp.status(400).json({
          data: [],
          err: { msg: "please login" },
        });
      }
    }

};
export default validationWithresp