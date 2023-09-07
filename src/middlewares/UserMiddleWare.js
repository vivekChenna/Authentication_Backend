 exports.CheckDetails = (req, res , next) => {

    console.log(req.body.email);
    console.log(req.body.password);
  if (!req.body.password || !req.body.email) {
    return res.status(400).json({
      message: "please fill all the details",
    });
  }

  next();
};
