const allowedOrigins = [
  "http://localhost:3500/",
  "http://127.0.0.1:5500",
  "http://localhost:3000",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} is not allowed by cors`));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
