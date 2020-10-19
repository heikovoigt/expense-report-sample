var express = require("express"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");
var fs = require("fs-extra");
var https = require("https");
const openApiDocumentation = require('./openApiDocumentation');

//const swaggerDocument = require('./swagger.json');

//var http = require('http');
const config = require("./config/config");
var cors = require("cors");
var app = express().use("*", cors());
port = process.env.PORT || 8084;
bodyParser = require("body-parser");
const RateLimit = require("express-rate-limit"); // Limit requests to prevent DoS-Attacks
const limiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0, // disable delaying — full speed until the max limit is  reached
});

try {
  app.use(limiter);

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  //Optional: SSL Certifikates
  var options = {
    key: fs.readFileSync(config.apiSSLKey),
    cert: fs.readFileSync(config.apiSSLCert),
  };

  var routes = require("./api/routes/routes"); //importing route
  routes(app);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
  // Start Server using https
  var server = https.createServer(options, app).listen(port, function () {
    // Start server using http behind NGINX
    //var server = http.createServer(app).listen(port, function () {
    console.log("C3UG REST API - API server started on: " + port);
  });

  // Now, let's add a static route for files
  app.use("/public", express.static("public"));

  //app.listen(port);
  app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + " not found." });
  });
} catch (error) {
  console.error(error);
}
