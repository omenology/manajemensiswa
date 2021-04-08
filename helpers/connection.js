const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb://root:password@mongo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "manajemenSiswa",
});

module.exports = connection;
