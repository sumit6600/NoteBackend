const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
// var nodemailer = require("nodemailer");
const app = express();
const path = require("path");

require("dotenv").config({
  path: "./config/config.env",
});

// dotenv.config();
connectDB();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/message", messageRoutes);

//-------------deployment---------------

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/fontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "fontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

//--------------------------------------------------------------
// var smtpTransport = nodemailer.createTransport("SMTP", {
//   service: "Gmail",
//   auth: {
//     user: "Your Gmail ID",
//     pass: "Gmail Password",
//   },
// });

//--------------------------------------

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on PORT ${PORT}`));
