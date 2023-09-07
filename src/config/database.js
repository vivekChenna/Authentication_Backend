const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const connectWithDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("successfully connected with Mongodb");
  } catch (error) {
    console.log("something went wrong while connecting with db");
    console.log(error);
  }
};

module.exports = {
  PORT: process.env.PORT,
  connectWithDB,
};
