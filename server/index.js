const swaggerUi = require("swagger-ui-express");
const configValues = require("./config/getConfigValues");
const app = require("./config/express.js");
const routes = require("./routes/index.route");
const { logInfo } = require("./logger/logger");
const swagger = require("./config/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));

// Router
app.use("/api", routes);

// Handle 404
app.use((req, res) => {
  res.redirect("/404");
});

const port = configValues.express.PORT;
app.listen(port, () => {
  console.log(`http server listening on port ${port}`);
  logInfo(`Log Info : http server listening on port ${port}`);
});
