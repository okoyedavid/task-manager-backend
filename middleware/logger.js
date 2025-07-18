const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logname) => {
  const logDate = `${format(new Date(), "ddMMyyyy-HH:mm:ss")}`;
  const logItem = `${logDate}\t${uuid()}\t${message}\n`;

  try {
    await fsPromises.mkdir(path.join(__dirname, "..", "logs"), {
      recursive: true,
    });

    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logname),
      logItem
    );
  } catch (error) {
    console.error(
      `Encountered an error while logging event cause: ${error.message}`
    );
    throw new Error(error);
  }
};

const logger = async (req, res, next) => {
  logEvents(
    `${req.method}\t${req.headers.origin}\t${req.url}`,
    "requestLogs.txt"
  );

  next();
};

module.exports = { logger, logEvents };
