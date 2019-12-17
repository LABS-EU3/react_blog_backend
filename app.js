const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require("./routes/auths");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
// routes(app);

app.use("/api/auth", authRouter);

module.exports = app;
