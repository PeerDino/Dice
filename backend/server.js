const app = require("./app");
const connectDatabase = require("./config/database");
// const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

// handle the uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR:${err.stack}`);
  console.log("Shutting down server due to uncaught exception");
  process.exit(1);
});
//setting up the config file
if (process.env.MODE_ENV !== "PRODUCTION")
  require("dotenv").config({ path: "backend/config/config.env" });
// dotenv.config({ path: "backend/config/config.env" });

// connecting to databse
connectDatabase();

// Setting up config file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`server started on PORT :${process.env.PORT} in
    ${process.env.MODE_ENV} mode.`);
});

// handle unhandled promise rejections
process.on("unhandleRejection", (err) => {
  console.log(`ERROR:${err.stack}`);
  console.log("shutting down the server due to unhandled Promise rejection");
  server.close(() => {
    process.exixt(1);
  });
});
