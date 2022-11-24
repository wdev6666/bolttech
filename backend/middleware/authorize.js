const expressJwt = require("express-jwt"); //got error expressJwt is not a function, then installed express-jwt@5.3.1 and it worked
const secret = "secret";
const User = require("../models/User");

const authorize = () => {
  return [
    expressJwt({ secret, algorithms: ["HS256"] }),
    async (req, res, next) => {
      const user = await User.findById(req.user.sub);
      if (user === null)
        return res.status(401).json({ message: "Unauthorized" });
      req.user = user;
      next();
    },
  ];
};

module.exports = authorize;
