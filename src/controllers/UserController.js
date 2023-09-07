const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signUp = async (req, res) => {
  try {
    console.log("hello");
    const { name, email, role, password } = req.body;

    //   check if user already exists
    const findUser = await User.findOne({
      email,
    });

    if (findUser) {
      return res.json({
        success: false,
        message: "user already exists",
      });
    }

    // if user does not exists then create a hash password to store in the database

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    return res.status(200).json({
      success: true,
      err: {},
      message: "Successfully created User",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      err: { error },
      message: "not able to create User",
      data: {},
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    console.log(user);

    if (!user) {
      return res.status(401).json({
        message: "user is not registered",
      });
    }

    // now if user is registered then compare passwords

    let compareAns = await bcrypt.compare(password, user.password);

    if (!compareAns) {
      return res.status(403).json({
        message: "password does not match",
      });
    }

    // now if passwords match then
    // create a token

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    console.log(token);

    user = user.toObject();
    user.token = token;
    user.password = undefined;

    const options = {
      // when the cookie expires
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true, // which means client side pe aap isko access nahi kar sakte(cookie ko)
    };

    res.cookie("cookie", token, options).status(200).json({
      success: true,
      token,
      user,
      message: "User Logged In Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong not able to logged in user",
      data: {},
      err: { error },
    });
  }
};

module.exports = {
  signUp,
  login,
};
