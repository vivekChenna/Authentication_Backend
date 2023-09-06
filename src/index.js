const express = require("express");
const app = express();
const { PORT  , connectWithDB} = require("./config/database");

app.use(express.json());

app.listen(PORT, () => {
  console.log(`server started successfully at ${PORT}`);
  connectWithDB();
});
