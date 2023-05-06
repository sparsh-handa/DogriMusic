const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());
const userRoute = require("./routes/userRoute");
const songsRoute = require("./routes/songsRoute");
const adminRoute = require("./routes/adminRoute");
app.use("/api/users", userRoute);
app.use("/api/songs", songsRoute);
app.use("/api/admin", adminRoute);

const port = 5000;

app.listen(port, () => console.log(`Node js server started at port ${port}!`));
