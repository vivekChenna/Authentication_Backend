const express = require("express");
const app = express();
const { PORT, connectWithDB } = require("./config/database");
const UserRoutes = require("./routes/userRoutes");

app.use(express.json());

app.use("/api/v1/user", UserRoutes);

app.listen(PORT, () => {
  console.log(`server started successfully at ${PORT}`);
  connectWithDB();
});
