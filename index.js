require("dotenv/config");

// Library init
const express = require("express");
const helmet = require("helmet");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");

const connection = require("./helpers/connection");
const route = require("./routes");

// init express app
const app = express();

// cors

app.use(cors());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use helmet
app.use(helmet()); // Default settings - https://www.npmjs.com/package/helmet

// swagger init
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Sentralisasi Siswa",
      version: "1.0.0",
      description: "Documentasi API untuk sentralisasi siswa (beta)",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

// init route
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/", route);
app.use("*", (req, res) => {
  res.status(404).send("Endpoint Not Found");
});

// starting server
connection
  .then((result) => {
    app.listen(4000);
    console.log("connected to db and app listen on port 4000");
  })
  .catch((err) => {
    console.log("connection to db error", err);
  });
