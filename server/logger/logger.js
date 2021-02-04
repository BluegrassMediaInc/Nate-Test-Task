const log4js = require("log4js");

const log4jsConfig = {
  appenders: {
    output: {
      type: "file",
      filename: "log/out.log",
      maxLogSize: 10485760,
      backups: 3,
      compress: true,
    },
  },
  categories: { default: { appenders: ["output"], level: "debug" } },
};

log4js.configure(log4jsConfig);

const logger = log4js.getLogger("output");

const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const getLogMessage = (message) => {
  if (isJson(message)) {
    return message;
  }
  return JSON.stringify(message);
};

const logLog = (level, message) => {
  logger.debug(getLogMessage(message));
};

const logInfo = (message) => {
  logger.info(getLogMessage(message));
};

const logDebug = (message) => {
  if (process.env.NODE_ENV !== "production") {
    logger.info(getLogMessage(message));
  }
};

const logWarn = (message) => {
  logger.warn(getLogMessage(message));
};

const logError = (message) => {
  logger.error(getLogMessage(message));
};

module.exports = {
  logLog,
  logWarn,
  logInfo,
  logError,
  logDebug,
};
