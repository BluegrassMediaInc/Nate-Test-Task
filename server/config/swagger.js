const path = require("path");
const swaggerJsDoc = require("swagger-jsdoc");
const configValues = require("./getConfigValues");

/**
 * Swagger definition.
 */
const swaggerDefinition = {
  info: {
    title: "Express React",
    version: "1.0.0",
    description: "RESTful API description with Swagger",
  },
  host: configValues.CLIENT_BASE_URL,
  basePath: "/api",
};

/**
 * Options for the swagger docs.
 */
const swaggerOptions = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: [path.join(__dirname, "/../routes/*.js")],
};

/**
 * Initialize swagger-jsdoc.
 */
const swagger = swaggerJsDoc(swaggerOptions);
module.exports = swagger;
