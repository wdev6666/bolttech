const dbServices = require("./mongo.util");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "secret";

const createUser = async (request, response) => {
  try {
    const { email, name, password } = request.body;

    const user = await dbServices.checkUserExists(email);

    if (user)
      return response.json({
        status: "error",
        message: "Email is already exist!",
      });

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const { _id } = await dbServices.createUser(email, name, hashedPassword);
    return response.status(200).json({ email, name, _id });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

const findUserByEmail = async (request, response) => {
  const { email } = request.query;
  const user = await dbServices.findUserByEmail(email);

  return response.status(200).json(user);
};

const login = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await dbServices.findUserByEmail(email);
    if (!user)
      response.status(200).json({ status: "error", message: "User not found" });

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect)
      return response
        .status(200)
        .json({ status: "error", message: "Invalid password" });
    const token = jwt.sign({ sub: user._id }, secret, {
      expiresIn: "24h",
    });
    const loggedInUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    };
    return response.status(200).json({ loggedInUser });
  } catch (error) {
    console.error(error);
    return response
      .status(200)
      .json({ status: "error", message: error.message });
  }
};

module.exports = {
  createUser,
  findUserByEmail,
  login,
};
