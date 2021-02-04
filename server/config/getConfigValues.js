const fs = require("fs");

module.exports = {
  CLIENT_BASE_URL: "localhost:8080",
  database: {
    DB: "lead-developer",
    dialect: "mysql",
    HOST: "localhost",
    PASSWORD: "root",
    USER: "root",
    pool: {
      max: 99,
      min: 0,
      acquire: 1000000,
      idle: 200000,
    },
  },
  express: {
    PORT: 8080,
  },
};
