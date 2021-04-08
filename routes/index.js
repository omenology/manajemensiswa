const route = require("express").Router({ mergeParams: true }); // create route

// import route
const userRoute = require("./user");
const authRoute = require("./auth");

// define route
route.use("/auth", authRoute);
route.use("/user", userRoute);

module.exports = route;
