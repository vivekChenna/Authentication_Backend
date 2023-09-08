const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.CheckDetails = (req, res, next) => {
  console.log(req.body.email);
  console.log(req.body.password);
  if (!req.body.password || !req.body.email) {
    return res.status(400).json({
      message: "please fill all the details",
    });
  }

  next();
};

exports.Auth = (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token Missing",
      });
    }

    // now if token is present then

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("printing decode");
      req.user = decode;
      console.log(decode); // now we will send the decoded payload in the req object
    } catch (error) {
      console.log("something went wrong while verifying JwT Token");
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "something went wrong while verifying JWT Token",
      });
    }


    console.log("printing req.user");
    console.log(req.user);
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong ",
      err: { error },
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Students",
      });
    }

    next();
  } catch (error) {
    console.log("something went wrong ");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User role is not matching ",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admin",
      });
    }

    next();
  } catch (error) {
    console.log("something went wrong ");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User role is not matching ",
    });
  }
};
